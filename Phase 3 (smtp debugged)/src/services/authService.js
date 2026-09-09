const { pool } = require('../config/database');
const User = require('../models/User');
const { hashPassword } = require('../utils/password');
const { issueVerificationOtp, verifyEmailOtp } = require('./otpService');
const { sendVerificationOtp } = require('./emailService');
const { AppError } = require('../utils/errors');

async function register({ firstName, lastName, email, password }) {
  const connection = await pool.getConnection();
  let user;
  let otpDetails;

  try {
    await connection.beginTransaction();

    const existing = await User.findByEmail(email, connection);
    if (existing) throw new AppError(409, 'An account with this email already exists.', 'EMAIL_ALREADY_EXISTS');

    const passwordHash = await hashPassword(password);
    user = await User.create({ firstName, lastName, email, passwordHash }, connection);
    otpDetails = await issueVerificationOtp(user, connection);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }

  try {
    await sendVerificationOtp({
      to: user.email,
      firstName: user.first_name,
      otp: otpDetails.otp,
      expiresInMinutes: otpDetails.expiresInMinutes
    });
  } catch (error) {
    throw new AppError(503, 'Account created, but the verification email could not be sent. Please try again later.', 'EMAIL_SEND_FAILED');
  }

  return sanitizeUser(user);
}

async function verifyEmail({ email, otp }) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const user = await User.findByEmail(email, connection);
    if (!user) throw new AppError(404, 'Account not found.', 'USER_NOT_FOUND');
    if (user.email_verified_at) throw new AppError(409, 'Email is already verified.', 'EMAIL_ALREADY_VERIFIED');
    if (user.status !== 'ACTIVE') throw new AppError(403, 'This account is not active.', 'ACCOUNT_NOT_ACTIVE');

    await verifyEmailOtp(user, otp, connection);
    const verifiedUser = await User.markEmailVerified(user.id, connection);

    await connection.commit();
    return sanitizeUser(verifiedUser);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

function sanitizeUser(user) {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    role: user.role,
    emailVerified: Boolean(user.email_verified_at),
    status: user.status,
    createdAt: user.created_at,
    updatedAt: user.updated_at
  };
}

module.exports = { register, verifyEmail };
