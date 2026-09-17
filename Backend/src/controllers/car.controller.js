const fs = require("fs");
const path = require("path");
const Car = require("../models/car.model");

const imageDiskPath = (image) =>
  image ? path.join(__dirname, "..", image.replace(/^\/+/, "")) : null;
function deleteImage(image) {
  const p = imageDiskPath(image);
  if (p && fs.existsSync(p)) fs.unlinkSync(p);
}
function idOk(id) {
  return /^\d+$/.test(String(id)) && Number(id) > 0;
}
function cleanupUpload(req) {
  if (req.file) {
    try {
      fs.unlinkSync(req.file.path);
    } catch (_) {}
  }
}

function validateCar(body, partial = false) {
  const errors = [];
  const required = [
    "brandId",
    "categoryId",
    "model",
    "year",
    "registrationNumber",
    "transmission",
    "fuelType",
    "seats",
    "pricePerDay",
    "pricePerWeek",
    "pricePerMonth",
  ];
  if (!partial)
    for (const f of required)
      if (body[f] === undefined || body[f] === "")
        errors.push(`${f} is required`);
  if (
    body.year !== undefined &&
    (!Number.isInteger(Number(body.year)) ||
      Number(body.year) < 1900 ||
      Number(body.year) > new Date().getFullYear() + 1)
  )
    errors.push("year is invalid");
  if (
    body.seats !== undefined &&
    (!Number.isInteger(Number(body.seats)) ||
      Number(body.seats) < 1 ||
      Number(body.seats) > 20)
  )
    errors.push("seats is invalid");
  if (
    body.doors !== undefined &&
    body.doors !== "" &&
    (!Number.isInteger(Number(body.doors)) ||
      Number(body.doors) < 1 ||
      Number(body.doors) > 10)
  )
    errors.push("doors is invalid");
  if (
    body.mileage !== undefined &&
    body.mileage !== "" &&
    Number(body.mileage) < 0
  )
    errors.push("mileage cannot be negative");
  if (body.pricePerDay !== undefined && Number(body.pricePerDay) <= 0)
    errors.push("pricePerDay must be greater than 0");
  if (body.pricePerWeek !== undefined && Number(body.pricePerWeek) <= 0)
    errors.push("pricePerWeek must be greater than 0");
  if (body.pricePerMonth !== undefined && Number(body.pricePerMonth) <= 0)
    errors.push("pricePerMonth must be greater than 0");
  if (
    body.transmission !== undefined &&
    !["Automatic", "Manual"].includes(body.transmission)
  )
    errors.push("transmission must be Automatic or Manual");
  if (
    body.fuelType !== undefined &&
    !["Petrol", "Diesel", "Hybrid", "Electric"].includes(body.fuelType)
  )
    errors.push("fuelType is invalid");
  if (
    body.status !== undefined &&
    !["Available", "Rented", "Maintenance"].includes(body.status)
  )
    errors.push("status is invalid");
  return errors;
}

const createCar = async (req, res, next) => {
  try {
    const errors = validateCar(req.body);
    if (!req.file) errors.push("Car image is required");
    if (errors.length) {
      cleanupUpload(req);
      return res
        .status(400)
        .json({ success: false, message: "Validation failed", errors });
    }
    const b = Number(req.body.brandId),
      c = Number(req.body.categoryId);
    if (!(await Car.brandExists(b))) {
      cleanupUpload(req);
      return res
        .status(400)
        .json({ success: false, message: "Invalid brandId" });
    }
    if (!(await Car.categoryExists(c))) {
      cleanupUpload(req);
      return res
        .status(400)
        .json({ success: false, message: "Invalid categoryId" });
    }
    if (
      await Car.findByRegistrationNumber(req.body.registrationNumber.trim())
    ) {
      cleanupUpload(req);
      return res
        .status(409)
        .json({
          success: false,
          message: "A car with this registration number already exists",
        });
    }
    const image = `/uploads/images/cars/${req.file.filename}`;
    const car = await Car.create({
      ...req.body,
      brandId: b,
      categoryId: c,
      year: Number(req.body.year),
      seats: Number(req.body.seats),
      doors: req.body.doors === "" ? null : Number(req.body.doors),
      mileage: req.body.mileage === "" ? null : Number(req.body.mileage),
      pricePerDay: Number(req.body.pricePerDay),
      pricePerWeek: Number(req.body.pricePerWeek),
      pricePerMonth: Number(req.body.pricePerMonth),
      registrationNumber: req.body.registrationNumber.trim(),
      image,
      isActive:
        req.body.isActive === undefined
          ? true
          : req.body.isActive === true || req.body.isActive === "true",
    });
    res
      .status(201)
      .json({ success: true, message: "Car created successfully", data: car });
  } catch (e) {
    cleanupUpload(req);
    next(e);
  }
};

const getAllCars = async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 100);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const bool = (v) => (v === undefined ? undefined : v === "true");
    const filters = {
      ...req.query,
      brandId:
        req.query.brandId === undefined ? undefined : Number(req.query.brandId),
      categoryId:
        req.query.categoryId === undefined
          ? undefined
          : Number(req.query.categoryId),
      isActive: bool(req.query.isActive),
      minPrice:
        req.query.minPrice === undefined
          ? undefined
          : Number(req.query.minPrice),
      maxPrice:
        req.query.maxPrice === undefined
          ? undefined
          : Number(req.query.maxPrice),
      minYear:
        req.query.minYear === undefined ? undefined : Number(req.query.minYear),
      maxYear:
        req.query.maxYear === undefined ? undefined : Number(req.query.maxYear),
      seats:
        req.query.seats === undefined ? undefined : Number(req.query.seats),
      limit,
      offset: (page - 1) * limit,
    };
    const cars = await Car.findAll(filters);
    res.json({ success: true, count: cars.length, page, limit, data: cars });
  } catch (e) {
    next(e);
  }
};

const getCarById = async (req, res, next) => {
  try {
    if (!idOk(req.params.id))
      return res
        .status(400)
        .json({ success: false, message: "Invalid car id" });
    const car = await Car.findById(Number(req.params.id));
    if (!car)
      return res.status(404).json({ success: false, message: "Car not found" });
    res.json({ success: true, data: car });
  } catch (e) {
    next(e);
  }
};

const updateCar = async (req, res, next) => {
  try {
    if (!idOk(req.params.id)) {
      cleanupUpload(req);
      return res
        .status(400)
        .json({ success: false, message: "Invalid car id" });
    }
    const id = Number(req.params.id);
    const current = await Car.findById(id);
    if (!current) {
      cleanupUpload(req);
      return res.status(404).json({ success: false, message: "Car not found" });
    }
    const errors = validateCar(req.body, true);
    if (errors.length) {
      cleanupUpload(req);
      return res
        .status(400)
        .json({ success: false, message: "Validation failed", errors });
    }
    if (
      req.body.brandId !== undefined &&
      !(await Car.brandExists(Number(req.body.brandId)))
    ) {
      cleanupUpload(req);
      return res
        .status(400)
        .json({ success: false, message: "Invalid brandId" });
    }
    if (
      req.body.categoryId !== undefined &&
      !(await Car.categoryExists(Number(req.body.categoryId)))
    ) {
      cleanupUpload(req);
      return res
        .status(400)
        .json({ success: false, message: "Invalid categoryId" });
    }
    const reg = req.body.registrationNumber?.trim();
    if (reg && (await Car.findByRegistrationNumber(reg, id))) {
      cleanupUpload(req);
      return res
        .status(409)
        .json({
          success: false,
          message: "Another car with this registration number already exists",
        });
    }
    const data = {};
    for (const k of [
      "brandId",
      "categoryId",
      "model",
      "year",
      "registrationNumber",
      "color",
      "transmission",
      "fuelType",
      "seats",
      "doors",
      "mileage",
      "pricePerDay",
      "pricePerWeek",
      "pricePerMonth",
      "status",
      "description",
    ])
      if (req.body[k] !== undefined) data[k] = req.body[k];
    if (data.brandId !== undefined) data.brandId = Number(data.brandId);
    if (data.categoryId !== undefined)
      data.categoryId = Number(data.categoryId);
    if (data.year !== undefined) data.year = Number(data.year);
    if (data.seats !== undefined) data.seats = Number(data.seats);
    if (data.doors !== undefined)
      data.doors = data.doors === "" ? null : Number(data.doors);
    if (data.mileage !== undefined)
      data.mileage = data.mileage === "" ? null : Number(data.mileage);
    if (data.pricePerDay !== undefined)
      data.pricePerDay = Number(data.pricePerDay);
    if (data.pricePerWeek !== undefined)
      data.pricePerWeek = Number(data.pricePerWeek);
    if (data.pricePerMonth !== undefined)
      data.pricePerMonth = Number(data.pricePerMonth);
    if (data.registrationNumber !== undefined)
      data.registrationNumber = String(data.registrationNumber).trim();
    if (req.body.isActive !== undefined)
      data.isActive =
        req.body.isActive === true || req.body.isActive === "true";
    if (req.file) data.image = `/uploads/images/cars/${req.file.filename}`;
    const car = await Car.update(id, data);
    if (req.file && current.image) deleteImage(current.image);
    res.json({ success: true, message: "Car updated successfully", data: car });
  } catch (e) {
    cleanupUpload(req);
    next(e);
  }
};

const deleteCar = async (req, res, next) => {
  try {
    if (!idOk(req.params.id))
      return res
        .status(400)
        .json({ success: false, message: "Invalid car id" });
    const id = Number(req.params.id);
    const car = await Car.findById(id);
    if (!car)
      return res.status(404).json({ success: false, message: "Car not found" });
    await Car.remove(id);
    if (car.image) deleteImage(car.image);
    res.json({ success: true, message: "Car deleted successfully" });
  } catch (e) {
    next(e);
  }
};

module.exports = { createCar, getAllCars, getCarById, updateCar, deleteCar };
