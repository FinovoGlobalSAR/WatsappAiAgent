const EmailOTP = require('../models/EmailOTP');
const { generateOtp, hashOtp, verifyOtp, getOtpExpiry, OTP_TTL_MINUTES } = require('../utils/otp');
const { AppError } = require('../utils/errors');

async function issueVerificationOtp(user, connection) {
  const otp = generateOtp();
  const otpHash = await hashOtp(otp);
  const expiresAt = getOtpExpiry();
  const otpId = await EmailOTP.create({ userId: user.id, otpHash, expiresAt }, connection);

  return { otpId, otp, expiresAt, expiresInMinutes: OTP_TTL_MINUTES };
}

async function verifyEmailOtp(user, otp, connection) {
  const record = await EmailOTP.findLatestUsableByUserId(user.id, connection);
  if (!record) throw new AppError(400, 'No active verification OTP was found.', 'OTP_NOT_FOUND');
  if (new Date(record.expires_at).getTime() <= Date.now()) throw new AppError(400, 'The verification OTP has expired.', 'OTP_EXPIRED');

  const valid = await verifyOtp(otp, record.otp_hash);
  if (!valid) throw new AppError(400, 'Invalid verification OTP.', 'OTP_INVALID');

  await EmailOTP.markConsumed(record.id, connection);
}

module.exports = { issueVerificationOtp, verifyEmailOtp };
