import express from 'express';

import authController from '../controllers/authController.js';

import {
  loginLimiter,
  refreshLimiter
} from '../middleware/rateLimitMiddleware.js';

import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
  '/register',
  authController.register
);

router.post(
  '/login',
  loginLimiter,
  authController.login
);

router.post(
  '/refresh',
  refreshLimiter,
  authController.refreshToken
);

router.post(
  '/logout',
  (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      return requireAuth(req, res, next);
    }

    next();
  },
  authController.logout
);

router.get(
  '/me',
  requireAuth,
  authController.getMe
);

export default router;