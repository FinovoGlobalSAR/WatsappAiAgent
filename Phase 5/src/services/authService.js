const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const { hashPassword, verifyPassword } = require('../utils/password');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  hashToken
} = require('../utils/jwt');
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

async function resendOtp({ email }) {
  const connection = await pool.getConnection();
  let user;
  let otpDetails;

  try {
    await connection.beginTransaction();

    user = await User.findByEmail(email, connection);
    if (!user) throw new AppError(404, 'Account not found.', 'USER_NOT_FOUND');
    if (user.email_verified_at) throw new AppError(409, 'Email is already verified.', 'EMAIL_ALREADY_VERIFIED');
    if (user.status !== 'ACTIVE') throw new AppError(403, 'This account is not active.', 'ACCOUNT_NOT_ACTIVE');

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
    throw new AppError(503, 'A new verification OTP was generated, but the email could not be sent. Please try again later.', 'EMAIL_SEND_FAILED');
  }

  return { email: user.email, expiresInMinutes: otpDetails.expiresInMinutes };
}

async function login({ email, password }) {
  const user = await User.findByEmail(email);
  if (!user) {
    throw new AppError(401, 'Invalid email or password.', 'INVALID_CREDENTIALS');
  }

  const passwordValid = await verifyPassword(password, user.password_hash);
  if (!passwordValid) {
    throw new AppError(401, 'Invalid email or password.', 'INVALID_CREDENTIALS');
  }

  if (!user.email_verified_at) {
    throw new AppError(403, 'Email is not verified. Please verify your email before logging in.', 'EMAIL_NOT_VERIFIED');
  }

  if (user.status !== 'ACTIVE') {
    throw new AppError(403, 'This account is not active.', 'ACCOUNT_NOT_ACTIVE');
  }

  const accessToken = generateAccessToken(user);
  const refreshTokenData = generateRefreshToken(user);

  await RefreshToken.create({
    userId: user.id,
    tokenHash: refreshTokenData.tokenHash,
    expiresAt: refreshTokenData.expiresAt
  });

  return {
    user: sanitizeUser(user),
    tokens: {
      accessToken,
      refreshToken: refreshTokenData.token,
      tokenType: 'Bearer',
      expiresIn: 15 * 60
    }
  };
}

async function refreshTokens({ refreshToken }) {
  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new AppError(401, 'Refresh token has expired.', 'REFRESH_TOKEN_EXPIRED');
    }
    throw new AppError(401, 'Invalid refresh token.', 'INVALID_REFRESH_TOKEN');
  }

  const tokenHash = hashToken(refreshToken);
  const storedToken = await RefreshToken.findByTokenHash(tokenHash);

  if (!storedToken) {
    throw new AppError(401, 'Invalid refresh token.', 'INVALID_REFRESH_TOKEN');
  }

  if (storedToken.revoked_at) {
    // Possible token theft / replay: revoke all sessions for this user
    await RefreshToken.revokeAllByUserId(storedToken.user_id);
    throw new AppError(401, 'Refresh token has been revoked.', 'REFRESH_TOKEN_REVOKED');
  }

  if (new Date(storedToken.expires_at).getTime() <= Date.now()) {
    throw new AppError(401, 'Refresh token has expired.', 'REFRESH_TOKEN_EXPIRED');
  }

  const user = await User.findById(storedToken.user_id);
  if (!user) {
    throw new AppError(401, 'User account no longer exists.', 'USER_NOT_FOUND');
  }

  if (!user.email_verified_at) {
    throw new AppError(403, 'Email is not verified.', 'EMAIL_NOT_VERIFIED');
  }

  if (user.status !== 'ACTIVE') {
    throw new AppError(403, 'This account is not active.', 'ACCOUNT_NOT_ACTIVE');
  }

  const connection = await pool.getConnection();
  let newAccessToken;
  let newRefreshTokenData;

  try {
    await connection.beginTransaction();

    await RefreshToken.revokeByTokenHash(tokenHash, connection);

    newAccessToken = generateAccessToken(user);
    newRefreshTokenData = generateRefreshToken(user);

    await RefreshToken.create(
      {
        userId: user.id,
        tokenHash: newRefreshTokenData.tokenHash,
        expiresAt: newRefreshTokenData.expiresAt
      },
      connection
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }

  return {
    tokens: {
      accessToken: newAccessToken,
      refreshToken: newRefreshTokenData.token,
      tokenType: 'Bearer',
      expiresIn: 15 * 60
    }
  };
}

async function logout({ refreshToken, userId, allDevices }) {
  if (allDevices && userId) {
    await RefreshToken.revokeAllByUserId(userId);
    return;
  }

  if (refreshToken) {
    const tokenHash = hashToken(refreshToken);
    await RefreshToken.revokeByTokenHash(tokenHash);
    return;
  }

  if (userId) {
    await RefreshToken.revokeAllByUserId(userId);
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

module.exports = {
  register,
  verifyEmail,
  resendOtp,
  login,
  refreshTokens,
  logout,
  sanitizeUser
};
