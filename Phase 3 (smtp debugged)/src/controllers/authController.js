const authService = require('../services/authService');
const { validateRegistration, validateEmailVerification } = require('../validators/authValidator');
const { AppError } = require('../utils/errors');

async function register(req, res, next) {
  try {
    const { errors, value } = validateRegistration(req.body);
    if (errors.length) throw new AppError(400, 'Request validation failed.', 'VALIDATION_ERROR');

    const user = await authService.register(value);
    res.status(201).json({ success: true, message: 'Registration successful. Check your email for the verification OTP.', data: { user } });
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

module.exports = { register, verifyEmail };
