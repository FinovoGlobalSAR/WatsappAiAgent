const crypto = require('crypto');
const EmailOTP = require('../models/EmailOTP');
const PasswordResetOTP = require('../models/PasswordResetOTP');
const { hashToken } = require('../utils/jwt');
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

  if (latest && !latest.consumed_at) {
    await EmailOTP.markConsumed(latest.id, connection);
  }

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

async function issuePasswordResetOtp(user, connection) {
  const latest = await PasswordResetOTP.findLatestByUserId(user.id, connection);
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

  if (latest && !latest.consumed_at) {
    await PasswordResetOTP.markConsumed(latest.id, connection);
  }

  const otp = generateOtp();
  const otpHash = await hashOtp(otp);
  const expiresAt = getOtpExpiry();
  const otpId = await PasswordResetOTP.create(
    { userId: user.id, otpHash, expiresAt, maxAttempts: OTP_MAX_ATTEMPTS },
    connection
  );

  return { otpId, otp, expiresAt, expiresInMinutes: OTP_TTL_MINUTES };
}

async function verifyPasswordResetOtp(user, otp, connection) {
  const record = await PasswordResetOTP.findLatestUsableByUserId(user.id, connection);
  if (!record) throw new AppError(400, 'No active password reset OTP was found.', 'OTP_NOT_FOUND');
  if (hasExceededAttempts(record)) {
    throw new AppError(400, 'OTP attempt limit exceeded. Request a new verification code.', 'OTP_ATTEMPTS_EXCEEDED');
  }
  if (isOtpExpired(record.expires_at)) {
    throw new AppError(400, 'The password reset OTP has expired.', 'OTP_EXPIRED');
  }

  const valid = await verifyOtp(otp, record.otp_hash);
  if (!valid) {
    await PasswordResetOTP.incrementAttempts(record.id);
    throw new AppError(400, 'Invalid verification OTP.', 'OTP_INVALID');
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenHash = hashToken(resetToken);
  await PasswordResetOTP.setResetTokenHash(record.id, resetTokenHash, connection);

  return { resetToken, recordId: record.id };
}

async function validateAndConsumeResetToken({ user, resetToken, otp, connection }) {
  if (resetToken) {
    const resetTokenHash = hashToken(resetToken);
    const record = await PasswordResetOTP.findActiveByResetTokenHash(resetTokenHash, connection);
    if (!record || (user && record.user_id !== user.id)) {
      throw new AppError(400, 'Invalid or expired password reset token.', 'INVALID_RESET_TOKEN');
    }
    await PasswordResetOTP.markConsumed(record.id, connection);
    return record;
  }

  if (otp && user) {
    await verifyPasswordResetOtp(user, otp, connection);
    const record = await PasswordResetOTP.findLatestByUserId(user.id, connection);
    await PasswordResetOTP.markConsumed(record.id, connection);
    return record;
  }

  throw new AppError(400, 'Reset token or OTP is required to reset password.', 'RESET_PAYLOAD_REQUIRED');
}

module.exports = {
  issueVerificationOtp,
  verifyEmailOtp,
  issuePasswordResetOtp,
  verifyPasswordResetOtp,
  validateAndConsumeResetToken
};

