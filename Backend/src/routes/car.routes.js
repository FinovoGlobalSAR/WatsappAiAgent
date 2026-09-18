const express = require("express");
const controller = require("../controllers/car.controller");
const upload = require("../middlewares/uploads.middleware");
const { requireAuth } = require("../middleware/authMiddleware");
const { requireRole, ROLES } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", controller.getAllCars);
router.get("/:id", controller.getCarById);

router.post("/", upload.array("images", 6), controller.createCar);

router.put("/:id", upload.array("images", 6), controller.updateCar);

router.delete("/:id", controller.deleteCar);

module.exports = router;
