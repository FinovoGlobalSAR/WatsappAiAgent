import express from 'express';

import { requireAuth } from '../middleware/authMiddleware.js';
import { requireRole, ROLES } from '../middleware/roleMiddleware.js';
import { pool } from '../config/database.js';

const router = express.Router();

router.use(requireAuth);
router.use(requireRole(ROLES.ADMIN));

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

router.get('/users', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT
        id,
        first_name,
        last_name,
        email,
        role,
        email_verified_at,
        status,
        created_at,
        updated_at
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

router.get('/inspections', async (req, res, next) => {
  try {
    const page = Math.max(
      Number.parseInt(req.query.page, 10) || 1,
      1
    );

    const limit = Math.min(
      Math.max(
        Number.parseInt(req.query.limit, 10) || 20,
        1
      ),
      100
    );

    const offset = (page - 1) * limit;

    const [[countResult], [inspectionRows]] = await Promise.all([
      pool.query(`
        SELECT COUNT(*) AS total
        FROM inspections
      `),

      pool.query(
        `
          SELECT
            i.id,
            i.user_id,
            i.image_path,
            i.image_width,
            i.image_height,
            i.total_damages,
            i.total_damage_area_percentage,
            i.condition_score,
            i.condition_status,
            i.created_at,
            i.updated_at,
            u.first_name,
            u.last_name,
            u.email
          FROM inspections i
          LEFT JOIN users u ON u.id = i.user_id
          ORDER BY i.id DESC
          LIMIT ? OFFSET ?
        `,
        [limit, offset]
      )
    ]);

    const total = Number(countResult[0].total);
    const totalPages = Math.ceil(total / limit);

    const inspections = inspectionRows.map((inspection) => ({
      inspectionId: inspection.id,

      user: {
        id: inspection.user_id,
        firstName: inspection.first_name,
        lastName: inspection.last_name,
        email: inspection.email
      },

      image: inspection.image_path,

      imageSize: {
        width: inspection.image_width,
        height: inspection.image_height
      },

      summary: {
        totalDamages: inspection.total_damages,
        totalDamageAreaPercentage: Number(
          inspection.total_damage_area_percentage
        )
      },

      condition: {
        conditionScore: inspection.condition_score,
        status: inspection.condition_status
      },

      createdAt: inspection.created_at,
      updatedAt: inspection.updated_at
    }));

    res.status(200).json({
      success: true,
      message: 'All inspections retrieved successfully.',
      data: {
        inspections,
        pagination: {
          page,
          limit,
          total,
          totalPages
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;