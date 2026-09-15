const authService = require('../services/authService');
const {
  validateRegistration,
  validateEmailVerification,
  validateResendOtp,
  validateLogin,
  validateRefreshToken,
  validateLogout,
  validateForgotPassword,
  validateVerifyResetOtp,
  validateResetPassword
} = require('../validators/authValidator');
const { AppError } = require('../utils/errors');

async function register(req, res, next) {
  try {
    const { errors, value } = validateRegistration(req.body);
    if (errors.length) throw new AppError(400, 'Request validation failed.', 'VALIDATION_ERROR');

    const user = await authService.register(value);
    res.status(201).json({
      success: true,
      message: 'Registration successful. Check your email for the verification OTP.',
      data: { user }
    });
  } catch (error) {
    if (error.code === 'VALIDATION_ERROR') error.details = validateRegistration(req.body).errors;
    next(error);
  }
}

async function verifyEmail(req, res, next) {
  try {
    const { errors, value } = validateEmailVerification(req.body);
    if (errors.length) {
      const error = new AppError(400, 'Request validation failed.', 'VALIDATION_ERROR');
      error.details = errors;
      throw error;
    }

    const user = await authService.verifyEmail(value);
    res.status(200).json({ success: true, message: 'Email verified successfully.', data: { user } });
  } catch (error) {
    next(error);
  }
}

async function resendOtp(req, res, next) {
  try {
    const { errors, value } = validateResendOtp(req.body);
    if (errors.length) {
      const error = new AppError(400, 'Request validation failed.', 'VALIDATION_ERROR');
      error.details = errors;
      throw error;
    }

    const data = await authService.resendOtp(value);
    res.status(200).json({ success: true, message: 'A new verification OTP has been sent to your email.', data });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { errors, value } = validateLogin(req.body);
    if (errors.length) {
      const error = new AppError(400, 'Request validation failed.', 'VALIDATION_ERROR');
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
      const error = new AppError(400, 'Request validation failed.', 'VALIDATION_ERROR');
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
      throw new AppError(400, 'Refresh token or authentication is required to log out.', 'LOGOUT_PAYLOAD_REQUIRED');
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

async function forgotPassword(req, res, next) {
  try {
    const { errors, value } = validateForgotPassword(req.body);
    if (errors.length) {
      const error = new AppError(400, 'Request validation failed.', 'VALIDATION_ERROR');
      error.details = errors;
      throw error;
    }

    const data = await authService.forgotPassword(value);
    res.status(200).json({
      success: true,
      message: 'A password reset OTP has been sent to your email.',
      data
    });
  } catch (error) {
    next(error);
  }
}

async function verifyResetOtp(req, res, next) {
  try {
    const { errors, value } = validateVerifyResetOtp(req.body);
    if (errors.length) {
      const error = new AppError(400, 'Request validation failed.', 'VALIDATION_ERROR');
      error.details = errors;
      throw error;
    }

    const data = await authService.verifyResetOtp(value);
    res.status(200).json({
      success: true,
      message: 'Password reset OTP verified successfully.',
      data
    });
  } catch (error) {
    next(error);
  }
}

async function resetPassword(req, res, next) {
  try {
    const { errors, value } = validateResetPassword(req.body);
    if (errors.length) {
      const error = new AppError(400, 'Request validation failed.', 'VALIDATION_ERROR');
      error.details = errors;
      throw error;
    }

    const data = await authService.resetPassword(value);
    res.status(200).json({
      success: true,
      message: 'Password reset successful. Please log in with your new password.',
      data
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  verifyEmail,
  resendOtp,
  login,
  refreshToken,
  logout,
  getMe,
  forgotPassword,
  verifyResetOtp,
  resetPassword
};

