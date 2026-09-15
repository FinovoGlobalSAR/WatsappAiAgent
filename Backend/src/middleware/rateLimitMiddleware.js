const { AppError } = require('../utils/errors');

const VERIFY_EMAIL_WINDOW_MS = 15 * 60 * 1000;
const VERIFY_EMAIL_MAX = 10;
const RESEND_OTP_WINDOW_MS = 15 * 60 * 1000;
const RESEND_OTP_MAX = 5;

function createRateLimiter({ windowMs, max, keyPrefix, message }) {
  const hits = new Map();

  function prune(now) {
    for (const [key, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(key);
    }
  }

  return function rateLimitMiddleware(req, res, next) {
    const now = Date.now();
    if (hits.size > 5000) prune(now);

    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const key = `${keyPrefix}:${req.ip || 'unknown'}:${email}`;
    let entry = hits.get(key);

    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + windowMs };
      hits.set(key, entry);
    }

    entry.count += 1;
    const remaining = Math.max(0, max - entry.count);
    res.set('RateLimit-Limit', String(max));
    res.set('RateLimit-Remaining', String(remaining));
    res.set('RateLimit-Reset', String(Math.ceil(entry.resetAt / 1000)));

    if (entry.count > max) {
      const retryAfterSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
      res.set('Retry-After', String(retryAfterSeconds));
      const error = new AppError(429, message, 'RATE_LIMITED');
      error.retryAfterSeconds = retryAfterSeconds;
      return next(error);
    }

    next();
  };
}

const verifyEmailLimiter = createRateLimiter({
  windowMs: VERIFY_EMAIL_WINDOW_MS,
  max: VERIFY_EMAIL_MAX,
  keyPrefix: 'verify-email',
  message: 'Too many email verification attempts. Please try again later.'
});

const resendOtpLimiter = createRateLimiter({
  windowMs: RESEND_OTP_WINDOW_MS,
  max: RESEND_OTP_MAX,
  keyPrefix: 'resend-otp',
  message: 'Too many OTP resend requests. Please try again later.'
});

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX = 10;

const loginLimiter = createRateLimiter({
  windowMs: LOGIN_WINDOW_MS,
  max: LOGIN_MAX,
  keyPrefix: 'login',
  message: 'Too many login attempts. Please try again later.'
});

const REFRESH_WINDOW_MS = 15 * 60 * 1000;
const REFRESH_MAX = 30;

const refreshLimiter = createRateLimiter({
  windowMs: REFRESH_WINDOW_MS,
  max: REFRESH_MAX,
  keyPrefix: 'refresh',
  message: 'Too many token refresh attempts. Please try again later.'
});

const FORGOT_PASSWORD_WINDOW_MS = 15 * 60 * 1000;
const FORGOT_PASSWORD_MAX = 5;

const forgotPasswordLimiter = createRateLimiter({
  windowMs: FORGOT_PASSWORD_WINDOW_MS,
  max: FORGOT_PASSWORD_MAX,
  keyPrefix: 'forgot-password',
  message: 'Too many password reset requests. Please try again later.'
});

const RESET_PASSWORD_WINDOW_MS = 15 * 60 * 1000;
const RESET_PASSWORD_MAX = 10;

const resetPasswordLimiter = createRateLimiter({
  windowMs: RESET_PASSWORD_WINDOW_MS,
  max: RESET_PASSWORD_MAX,
  keyPrefix: 'reset-password',
  message: 'Too many password reset attempts. Please try again later.'
});

module.exports = {
  createRateLimiter,
  verifyEmailLimiter,
  resendOtpLimiter,
  loginLimiter,
  refreshLimiter,
  forgotPasswordLimiter,
  resetPasswordLimiter
};

