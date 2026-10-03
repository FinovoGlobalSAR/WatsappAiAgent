import jwt from 'jsonwebtoken';
import { pool } from '../config/database.js';
import * as User from '../models/User.js';
import * as RefreshToken from '../models/RefreshToken.js';

import { hashPassword, verifyPassword } from '../utils/password.js';

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  hashToken
} from '../utils/jwt.js';

import { AppError } from '../utils/errors.js';

async function register({ firstName, lastName, email, password }) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const existing = await User.findByEmail(email, connection);

    if (existing) {
      throw new AppError(
        409,
        'An account with this email already exists.',
        'EMAIL_ALREADY_EXISTS'
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await User.create(
      {
        firstName,
        lastName,
        email,
        passwordHash,
        emailVerifiedAt: new Date()
      },
      connection
    );

    // Email/OTP verification is currently disabled.
    // Company can add email verification later.

    await connection.commit();

    return sanitizeUser(user);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function login({ email, password }) {
  const user = await User.findByEmail(email);

  if (!user) {
    throw new AppError(
      401,
      'Invalid email or password.',
      'INVALID_CREDENTIALS'
    );
  }

  const passwordValid = await verifyPassword(
    password,
    user.password_hash
  );

  if (!passwordValid) {
    throw new AppError(
      401,
      'Invalid email or password.',
      'INVALID_CREDENTIALS'
    );
  }

  if (user.status !== 'ACTIVE') {
    throw new AppError(
      403,
      'This account is not active.',
      'ACCOUNT_NOT_ACTIVE'
    );
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
      throw new AppError(
        401,
        'Refresh token has expired.',
        'REFRESH_TOKEN_EXPIRED'
      );
    }

    throw new AppError(
      401,
      'Invalid refresh token.',
      'INVALID_REFRESH_TOKEN'
    );
  }

  const tokenHash = hashToken(refreshToken);

  const storedToken =
    await RefreshToken.findByTokenHash(tokenHash);

  if (!storedToken) {
    throw new AppError(
      401,
      'Invalid refresh token.',
      'INVALID_REFRESH_TOKEN'
    );
  }

  if (storedToken.revoked_at) {
    await RefreshToken.revokeAllByUserId(
      storedToken.user_id
    );

    throw new AppError(
      401,
      'Refresh token has been revoked.',
      'REFRESH_TOKEN_REVOKED'
    );
  }

  if (
    new Date(storedToken.expires_at).getTime() <= Date.now()
  ) {
    throw new AppError(
      401,
      'Refresh token has expired.',
      'REFRESH_TOKEN_EXPIRED'
    );
  }

  const user = await User.findById(
    storedToken.user_id
  );

  if (!user) {
    throw new AppError(
      401,
      'User account no longer exists.',
      'USER_NOT_FOUND'
    );
  }

  if (user.status !== 'ACTIVE') {
    throw new AppError(
      403,
      'This account is not active.',
      'ACCOUNT_NOT_ACTIVE'
    );
  }

  const connection = await pool.getConnection();

  let newAccessToken;
  let newRefreshTokenData;

  try {
    await connection.beginTransaction();

    await RefreshToken.revokeByTokenHash(
      tokenHash,
      connection
    );

    newAccessToken = generateAccessToken(user);

    newRefreshTokenData =
      generateRefreshToken(user);

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

async function logout({
  refreshToken,
  userId,
  allDevices
}) {
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

export default {
  register,
  login,
  refreshTokens,
  logout,
  sanitizeUser
};