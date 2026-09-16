const express = require("express");
const controller = require("../controllers/car.controller");
const upload = require("../middlewares/uploads.middleware");
const { requireAuth } = require("../middleware/authMiddleware");
const {
  requireRole,
  ROLES,
} = require("../middleware/roleMiddleware");
const router = express.Router();
router.get("/", requireAuth, controller.getAllCars);
router.get("/:id", requireAuth, controller.getCarById);
router.post(
  "/",
  upload.single("image"),
  controller.createCar,
);
router.put(
  "/:id",
  upload.single("image"),
  controller.updateCar,
);
router.delete(
  "/:id",
  controller.deleteCar,
);
module.exports = router;
