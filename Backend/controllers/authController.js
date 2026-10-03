import authService from '../services/authService.js';

import {
  validateRegistration,
  validateLogin,
  validateRefreshToken,
  validateLogout
} from '../validators/authValidator.js';

import { AppError } from '../utils/errors.js';

async function register(req, res, next) {
  try {
    const { errors, value } = validateRegistration(req.body);

    if (errors.length) {
      const error = new AppError(
        400,
        'Request validation failed.',
        'VALIDATION_ERROR'
      );

      error.details = errors;

      throw error;
    }

    const user = await authService.register(value);

    res.status(201).json({
      success: true,
      message: 'Registration successful.',
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { errors, value } = validateLogin(req.body);

    if (errors.length) {
      const error = new AppError(
        400,
        'Request validation failed.',
        'VALIDATION_ERROR'
      );

      error.details = errors;

      throw error;
    }

    const data = await authService.login(value);

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data
    });
  } catch (error) {
    next(error);
  }
}

async function refreshToken(req, res, next) {
  try {
    const { errors, value } = validateRefreshToken(req.body);

    if (errors.length) {
      const error = new AppError(
        400,
        'Request validation failed.',
        'VALIDATION_ERROR'
      );

      error.details = errors;

      throw error;
    }

    const data = await authService.refreshTokens(value);

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully.',
      data
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    const { value } = validateLogout(req.body);

    const userId = req.user?.id || null;

    if (!value.refreshToken && !userId) {
      throw new AppError(
        400,
        'Refresh token or authentication is required to log out.',
        'LOGOUT_PAYLOAD_REQUIRED'
      );
    }

    await authService.logout({
      refreshToken: value.refreshToken,
      userId,
      allDevices: value.allDevices
    });

    res.status(200).json({
      success: true,
      message: 'Logout successful.',
      data: null
    });
  } catch (error) {
    next(error);
  }
}

async function getMe(req, res, next) {
  try {
    res.status(200).json({
      success: true,
      message: 'User profile retrieved successfully.',
      data: {
        user: req.user
      }
    });
  } catch (error) {
    next(error);
  }
}

export default {
  register,
  login,
  refreshToken,
  logout,
  getMe
};