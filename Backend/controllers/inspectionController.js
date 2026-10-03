import { pool } from "../config/database.js";

import { detectDamage } from "../Ai/services/damageDetector.js";
import { addSeverityToDetections } from "../Ai/services/severityCalculator.js";
import { aggregateDamage } from "../Ai/services/damageAggregator.js";
import { calculateConditionScore } from "../Ai/services/conditionScore.js";

export async function analyzeInspection(req, res, next) {
  const connection = await pool.getConnection();

  try {
    const { imagePath } = req.body;

    if (!imagePath) {
      return res.status(400).json({
        success: false,
        message: "imagePath is required",
        data: null,
      });
    }

    const detectionResult = await detectDamage(imagePath);

    const severityDetections = addSeverityToDetections(
      detectionResult.detections,
      detectionResult.imageSize.width,
      detectionResult.imageSize.height
    );

    

    const aggregatedResult = aggregateDamage(severityDetections);

    const conditionResult = calculateConditionScore(
      aggregatedResult.detections
    );

    await connection.beginTransaction();

    try {
      const [inspectionResult] = await connection.query(
        `
          INSERT INTO inspections (
            user_id,
            image_path,
            image_width,
            image_height,
            total_damages,
            total_damage_area_percentage,
            condition_score,
            condition_status
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          req.user.id,
          detectionResult.image,
          detectionResult.imageSize.width,
          detectionResult.imageSize.height,
          aggregatedResult.summary.totalDamages,
          aggregatedResult.summary.totalDamageAreaPercentage,
          conditionResult.conditionScore,
          conditionResult.status,
        ]
      );

      const inspectionId = inspectionResult.insertId;

      for (const detection of aggregatedResult.detections) {
        await connection.query(
          `
            INSERT INTO inspection_damages (
              inspection_id,
              damage_type,
              class_id,
              confidence,
              damage_area_percentage,
              severity,
              severity_score,
              damage_area_ratio,
              x1,
              y1,
              x2,
              y2
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `,
          [
            inspectionId,
            detection.damageType,
            detection.classId,
            detection.confidence,
            detection.damageAreaPercentage || 0,
            detection.severity,
            detection.severityScore || 0,
            detection.damageAreaRatio || 0,
            detection.boundingBox.x1,
            detection.boundingBox.y1,
            detection.boundingBox.x2,
            detection.boundingBox.y2,
          ]
        );
      }

      await connection.commit();

      return res.status(200).json({
        success: true,
        message: "Vehicle inspection completed successfully",
        data: {
          inspectionId,
          image: detectionResult.image,
          imageSize: detectionResult.imageSize,
          detections: aggregatedResult.detections,
          summary: aggregatedResult.summary,
          condition: conditionResult,
        },
      });
    } catch (databaseError) {
      await connection.rollback();
      throw databaseError;
    }
  } catch (error) {
    next(error);
  } finally {
    connection.release();
  }
}

export async function getInspections(req, res, next) {
  const connection = await pool.getConnection();

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
      connection.query(
        `
          SELECT COUNT(*) AS total
          FROM inspections
          WHERE user_id = ?
        `,
        [req.user.id]
      ),

      connection.query(
        `
          SELECT
            id,
            image_path,
            image_width,
            image_height,
            total_damages,
            total_damage_area_percentage,
            condition_score,
            condition_status,
            created_at,
            updated_at
          FROM inspections
          WHERE user_id = ?
          ORDER BY id DESC
          LIMIT ? OFFSET ?
        `,
        [req.user.id, limit, offset]
      ),
    ]);

    const total = Number(countResult[0].total);
    const totalPages = Math.ceil(total / limit);

    const inspections = inspectionRows.map((inspection) => ({
      inspectionId: inspection.id,

      image: inspection.image_path,

      imageSize: {
        width: inspection.image_width,
        height: inspection.image_height,
      },

      summary: {
        totalDamages: inspection.total_damages,
        totalDamageAreaPercentage: Number(
          inspection.total_damage_area_percentage
        ),
      },

      condition: {
        conditionScore: inspection.condition_score,
        status: inspection.condition_status,
      },

      createdAt: inspection.created_at,
      updatedAt: inspection.updated_at,
    }));

    return res.status(200).json({
      success: true,
      message: "Inspections retrieved successfully",
      data: {
        inspections,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      },
    });
  } catch (error) {
    next(error);
  } finally {
    connection.release();
  }
}

export async function getInspectionById(req, res, next) {
  const connection = await pool.getConnection();

  try {
    const { id } = req.params;

    if (!id || !/^\d+$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Valid inspection ID is required",
        data: null,
      });
    }

    const [inspectionRows] = await connection.query(
      `
        SELECT
          id,
          image_path,
          image_width,
          image_height,
          total_damages,
          total_damage_area_percentage,
          condition_score,
          condition_status,
          created_at,
          updated_at
        FROM inspections
        WHERE id = ?
          AND user_id = ?
        LIMIT 1
      `,
      [id, req.user.id]
    );

    if (inspectionRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Inspection not found",
        data: null,
      });
    }

    const inspection = inspectionRows[0];

    const [damageRows] = await connection.query(
      `
        SELECT
          id,
          damage_type,
          class_id,
          confidence,
          damage_area_percentage,
          severity,
          severity_score,
          damage_area_ratio,
          x1,
          y1,
          x2,
          y2,
          created_at
        FROM inspection_damages
        WHERE inspection_id = ?
        ORDER BY id ASC
      `,
      [id]
    );

    const detections = damageRows.map((damage) => ({
      id: damage.id,
      damageType: damage.damage_type,
      classId: damage.class_id,
      confidence: Number(damage.confidence),
      damageAreaPercentage: Number(damage.damage_area_percentage),
      severity: damage.severity,
      severityScore: damage.severity_score,
      damageAreaRatio: Number(damage.damage_area_ratio),
      boundingBox: {
        x1: Number(damage.x1),
        y1: Number(damage.y1),
        x2: Number(damage.x2),
        y2: Number(damage.y2),
      },
      createdAt: damage.created_at,
    }));

    const damageTypes = {};

    for (const detection of detections) {
      if (!damageTypes[detection.damageType]) {
        damageTypes[detection.damageType] = 0;
      }

      damageTypes[detection.damageType]++;
    }

    return res.status(200).json({
      success: true,
      message: "Inspection retrieved successfully",
      data: {
        inspectionId: inspection.id,
        image: inspection.image_path,
        imageSize: {
          width: inspection.image_width,
          height: inspection.image_height,
        },
        detections,
        summary: {
          totalDamages: inspection.total_damages,
          damageTypes,
          totalDamageAreaPercentage: Number(
            inspection.total_damage_area_percentage
          ),
        },
        condition: {
          conditionScore: inspection.condition_score,
          status: inspection.condition_status,
        },
        createdAt: inspection.created_at,
        updatedAt: inspection.updated_at,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    connection.release();
  }
}

export async function deleteInspection(req, res, next) {
  const connection = await pool.getConnection();

  try {
    const { id } = req.params;

    if (!id || !/^\d+$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Valid inspection ID is required",
        data: null,
      });
    }

    const [result] = await connection.query(
      `
        DELETE FROM inspections
        WHERE id = ?
          AND user_id = ?
      `,
      [id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Inspection not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inspection deleted successfully",
      data: {
        inspectionId: Number(id),
      },
    });
  } catch (error) {
    next(error);
  } finally {
    connection.release();
  }
}