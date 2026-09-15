const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const { requireRole, ROLES } = require('../middleware/roleMiddleware');
const { pool } = require('../config/database');

const router = express.Router();

// Enforce authentication across all admin endpoints
router.use(requireAuth);

// Enforce ADMIN role across all admin endpoints
router.use(requireRole(ROLES.ADMIN));

/**
 * GET /api/v1/admin/dashboard
 * Protected admin dashboard overview
 */
router.get('/dashboard', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the admin dashboard.',
    data: {
      admin: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role
      },
      system: {
        status: 'healthy',
        timestamp: new Date().toISOString()
      }
    }
  });
});

/**
 * GET /api/v1/admin/users
 * Retrieve list of users for administration (excluding password hashes)
 */
router.get('/users', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, first_name, last_name, email, role, email_verified_at, status, created_at, updated_at
       FROM users
       ORDER BY id DESC
       LIMIT 50`
    );

    const users = rows.map((u) => ({
      id: u.id,
      firstName: u.first_name,
      lastName: u.last_name,
      email: u.email,
      role: u.role,
      emailVerified: Boolean(u.email_verified_at),
      status: u.status,
      createdAt: u.created_at,
      updatedAt: u.updated_at
    }));

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully.',
      data: { users }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
