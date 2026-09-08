const express = require("express");
const carController = require("../controllers/car.controller");
const upload = require("../middlewares/uploads.middleware");

const router = express.Router();

router.post("/", upload.single("image"), carController.createCar);

router.get("/", carController.getAllCars);

router.get("/:id", carController.getCarById);

router.put("/:id", upload.single("image"), carController.updateCar);

router.delete("/:id", carController.deleteCar);

module.exports = router;
