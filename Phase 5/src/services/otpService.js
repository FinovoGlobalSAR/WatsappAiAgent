const EmailOTP = require('../models/EmailOTP');
const {
  generateOtp,
  hashOtp,
  verifyOtp,
  getOtpExpiry,
  isOtpExpired,
  hasExceededAttempts,
  isWithinResendCooldown,
  getResendRetryAfterSeconds,
  OTP_TTL_MINUTES,
  OTP_MAX_ATTEMPTS
} = require('../utils/otp');
const { AppError } = require('../utils/errors');

async function issueVerificationOtp(user, connection) {
  const latest = await EmailOTP.findLatestByUserId(user.id, connection);
  if (latest && isWithinResendCooldown(latest.created_at)) {
    const retryAfterSeconds = getResendRetryAfterSeconds(latest.created_at);
    const error = new AppError(
      429,
      `Please wait ${retryAfterSeconds} seconds before requesting another OTP.`,
      'OTP_RESEND_COOLDOWN'
    );
    error.retryAfterSeconds = retryAfterSeconds;
    throw error;
  }

  await EmailOTP.invalidateUnconsumedByUserId(user.id, connection);

  const otp = generateOtp();
  const otpHash = await hashOtp(otp);
  const expiresAt = getOtpExpiry();
  const otpId = await EmailOTP.create(
    { userId: user.id, otpHash, expiresAt, maxAttempts: OTP_MAX_ATTEMPTS },
    connection
  );

  return { otpId, otp, expiresAt, expiresInMinutes: OTP_TTL_MINUTES };
}

async function verifyEmailOtp(user, otp, connection) {
  const record = await EmailOTP.findLatestUsableByUserId(user.id, connection);
  if (!record) throw new AppError(400, 'No active verification OTP was found.', 'OTP_NOT_FOUND');
  if (hasExceededAttempts(record)) {
    throw new AppError(400, 'OTP attempt limit exceeded. Request a new verification code.', 'OTP_ATTEMPTS_EXCEEDED');
  }
  if (isOtpExpired(record.expires_at)) {
    throw new AppError(400, 'The verification OTP has expired.', 'OTP_EXPIRED');
  }

  const valid = await verifyOtp(otp, record.otp_hash);
  if (!valid) {
    // Persist the failed attempt even if the surrounding verification transaction rolls back.
    await EmailOTP.incrementAttempts(record.id);
    throw new AppError(400, 'Invalid verification OTP.', 'OTP_INVALID');
  }

  await EmailOTP.markConsumed(record.id, connection);
}

module.exports = { issueVerificationOtp, verifyEmailOtp };
