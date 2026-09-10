const jwt = require('jsonwebtoken');
const { verifyAccessToken } = require('../utils/jwt');
const User = require('../models/User');
const { AppError } = require('../utils/errors');

async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(401, 'Authentication required. Missing or malformed authorization header.', 'UNAUTHORIZED');
    }

    const token = authHeader.slice(7).trim();
    if (!token) {
      throw new AppError(401, 'Authentication required. Missing token.', 'UNAUTHORIZED');
    }

    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        throw new AppError(401, 'Access token has expired.', 'TOKEN_EXPIRED');
      }
      throw new AppError(401, 'Invalid access token.', 'TOKEN_INVALID');
    }

    const userId = Number(payload.sub);
    if (!userId) {
      throw new AppError(401, 'Invalid token payload.', 'TOKEN_INVALID');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(401, 'User account no longer exists.', 'USER_NOT_FOUND');
    }

    if (!user.email_verified_at) {
      throw new AppError(403, 'Email is not verified.', 'EMAIL_NOT_VERIFIED');
    }

    if (user.status !== 'ACTIVE') {
      throw new AppError(403, 'This account is not active.', 'ACCOUNT_NOT_ACTIVE');
    }

    req.user = {
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

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { requireAuth };
