const express = require("express");
const controller = require("../controllers/category.controller");
const { requireAuth } = require("../middleware/authMiddleware");
const {
  requireRole,
  ROLES,
} = require("../middleware/roleMiddleware");
const router = express.Router();
router.get("/",controller.getAllCategories);
router.get("/:id", controller.getCategoryById);
router.post("/", controller.createCategory);
router.put("/:id", controller.updateCategory);
router.delete("/:id", controller.deleteCategory);
module.exports = router;
