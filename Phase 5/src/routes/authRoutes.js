const express = require('express');
const authController = require('../controllers/authController');
const {
  verifyEmailLimiter,
  resendOtpLimiter,
  loginLimiter,
  refreshLimiter
} = require('../middleware/rateLimitMiddleware');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/verify-email', verifyEmailLimiter, authController.verifyEmail);
router.post('/resend-otp', resendOtpLimiter, authController.resendOtp);
router.post('/login', loginLimiter, authController.login);
router.post('/refresh', refreshLimiter, authController.refreshToken);
router.post('/logout', (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return requireAuth(req, res, next);
  }
  next();
}, authController.logout);
router.get('/me', requireAuth, authController.getMe);

module.exports = router;
