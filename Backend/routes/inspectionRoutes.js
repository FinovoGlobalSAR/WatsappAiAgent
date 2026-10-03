import express from "express";

import { requireAuth } from "../middleware/authMiddleware.js";

import {
  analyzeInspection,
  getInspections,
  getInspectionById,
  deleteInspection,
} from "../controllers/inspectionController.js";

const router = express.Router();

router.use(requireAuth);

router.post("/analyze", analyzeInspection);

router.get("/", getInspections);

router.get("/:id", getInspectionById);

router.delete("/:id", deleteInspection);

export default router;