const Car = require("../models/car.model");
const cloudinary = require("../config/cloudinary");

const MIN_IMAGES = 4;
const MAX_IMAGES = 6;
const CLOUDINARY_FOLDER = "car-rental/cars";

function idOk(id) {
  return /^\d+$/.test(String(id)) && Number(id) > 0;
}

function validateImageCount(files, required = false) {
  if (!files) files = [];
  if (required && files.length < MIN_IMAGES) {
    return [`At least ${MIN_IMAGES} car images are required`];
  }
  if (files.length > MAX_IMAGES) {
    return [`A maximum of ${MAX_IMAGES} car images is allowed`];
  }
  if (!required && files.length > 0 && files.length < MIN_IMAGES) {
    return [`If images are provided, upload between ${MIN_IMAGES} and ${MAX_IMAGES} images`];
  }
  return [];
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

  if (!partial) {
    for (const f of required) {
      if (body[f] === undefined || body[f] === "") {
        errors.push(`${f} is required`);
      }
    }
  }

  if (
    body.year !== undefined &&
    (!Number.isInteger(Number(body.year)) ||
      Number(body.year) < 1900 ||
      Number(body.year) > new Date().getFullYear() + 1)
  ) {
    errors.push("year is invalid");
  }

  if (
    body.seats !== undefined &&
    (!Number.isInteger(Number(body.seats)) ||
      Number(body.seats) < 1 ||
      Number(body.seats) > 20)
  ) {
    errors.push("seats is invalid");
  }

  if (
    body.doors !== undefined &&
    body.doors !== "" &&
    (!Number.isInteger(Number(body.doors)) ||
      Number(body.doors) < 1 ||
      Number(body.doors) > 10)
  ) {
    errors.push("doors is invalid");
  }

  if (
    body.mileage !== undefined &&
    body.mileage !== "" &&
    (!Number.isFinite(Number(body.mileage)) || Number(body.mileage) < 0)
  ) {
    errors.push("mileage cannot be negative");
  }

  for (const field of ["pricePerDay", "pricePerWeek", "pricePerMonth"]) {
    if (
      body[field] !== undefined &&
      (!Number.isFinite(Number(body[field])) || Number(body[field]) <= 0)
    ) {
      errors.push(`${field} must be greater than 0`);
    }
  }

  if (
    body.transmission !== undefined &&
    !["Automatic", "Manual"].includes(body.transmission)
  ) {
    errors.push("transmission must be Automatic or Manual");
  }

  if (
    body.fuelType !== undefined &&
    !["Petrol", "Diesel", "Hybrid", "Electric"].includes(body.fuelType)
  ) {
    errors.push("fuelType is invalid");
  }

  if (
    body.status !== undefined &&
    !["Available", "Rented", "Maintenance"].includes(body.status)
  ) {
    errors.push("status is invalid");
  }

  return errors;
}

function normalizeCarData(body) {
  const data = { ...body };
  data.brandId = Number(data.brandId);
  data.categoryId = Number(data.categoryId);
  data.year = Number(data.year);
  data.seats = Number(data.seats);
  data.doors = data.doors === "" || data.doors === undefined ? null : Number(data.doors);
  data.mileage = data.mileage === "" || data.mileage === undefined ? null : Number(data.mileage);
  data.pricePerDay = Number(data.pricePerDay);
  data.pricePerWeek = Number(data.pricePerWeek);
  data.pricePerMonth = Number(data.pricePerMonth);
  data.registrationNumber = String(data.registrationNumber).trim();

  if (data.isActive !== undefined) {
    data.isActive = data.isActive === true || data.isActive === "true";
  }

  return data;
}

function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: CLOUDINARY_FOLDER,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          imageUrl: result.secure_url,
          publicId: result.public_id,
        });
      },
    );

    stream.end(file.buffer);
  });
}

async function uploadImages(files) {
  const uploaded = [];
  try {
    for (const file of files) {
      uploaded.push(await uploadToCloudinary(file));
    }
    return uploaded;
  } catch (error) {
    await deleteCloudinaryImages(uploaded);
    throw error;
  }
}

async function deleteCloudinaryImages(images) {
  for (const image of images || []) {
    if (!image?.publicId) continue;
    try {
      await cloudinary.uploader.destroy(image.publicId, {
        resource_type: "image",
      });
    } catch (error) {
      console.error(`Failed to delete Cloudinary image ${image.publicId}:`, error.message);
    }
  }
}

const createCar = async (req, res, next) => {
  let uploadedImages = [];

  try {
    const errors = [
      ...validateCar(req.body),
      ...validateImageCount(req.files, true),
    ];

    if (errors.length) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const b = Number(req.body.brandId);
    const c = Number(req.body.categoryId);

    if (!(await Car.brandExists(b))) {
      return res.status(400).json({
        success: false,
        message: "Invalid brandId",
      });
    }

    if (!(await Car.categoryExists(c))) {
      return res.status(400).json({
        success: false,
        message: "Invalid categoryId",
      });
    }

    const registrationNumber = req.body.registrationNumber.trim();

    if (await Car.findByRegistrationNumber(registrationNumber)) {
      return res.status(409).json({
        success: false,
        message: "A car with this registration number already exists",
      });
    }

    uploadedImages = await uploadImages(req.files);

    const car = await Car.create({
      ...normalizeCarData(req.body),
      brandId: b,
      categoryId: c,
      registrationNumber,
      isActive:
        req.body.isActive === undefined
          ? true
          : req.body.isActive === true || req.body.isActive === "true",
      images: uploadedImages,
    });

    res.status(201).json({
      success: true,
      message: "Car created successfully",
      data: car,
    });
  } catch (error) {
    await deleteCloudinaryImages(uploadedImages);
    next(error);
  }
};

const getAllCars = async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 100);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const bool = (v) => (v === undefined ? undefined : v === "true");

    const filters = {
      ...req.query,
      brandId: req.query.brandId === undefined ? undefined : Number(req.query.brandId),
      categoryId: req.query.categoryId === undefined ? undefined : Number(req.query.categoryId),
      isActive: bool(req.query.isActive),
      minPrice: req.query.minPrice === undefined ? undefined : Number(req.query.minPrice),
      maxPrice: req.query.maxPrice === undefined ? undefined : Number(req.query.maxPrice),
      minYear: req.query.minYear === undefined ? undefined : Number(req.query.minYear),
      maxYear: req.query.maxYear === undefined ? undefined : Number(req.query.maxYear),
      seats: req.query.seats === undefined ? undefined : Number(req.query.seats),
      limit,
      offset: (page - 1) * limit,
    };

    const cars = await Car.findAll(filters);

    res.json({
      success: true,
      count: cars.length,
      page,
      limit,
      data: cars,
    });
  } catch (error) {
    next(error);
  }
};

const getCarById = async (req, res, next) => {
  try {
    if (!idOk(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid car id",
      });
    }

    const car = await Car.findById(Number(req.params.id));

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    res.json({
      success: true,
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

const updateCar = async (req, res, next) => {
  let uploadedImages = [];

  try {
    if (!idOk(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid car id",
      });
    }

    const id = Number(req.params.id);
    const current = await Car.findById(id);

    if (!current) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    const errors = [
      ...validateCar(req.body, true),
      ...validateImageCount(req.files, false),
    ];

    if (errors.length) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    if (
      req.body.brandId !== undefined &&
      !(await Car.brandExists(Number(req.body.brandId)))
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid brandId",
      });
    }

    if (
      req.body.categoryId !== undefined &&
      !(await Car.categoryExists(Number(req.body.categoryId)))
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid categoryId",
      });
    }

    const reg = req.body.registrationNumber?.trim();

    if (reg && (await Car.findByRegistrationNumber(reg, id))) {
      return res.status(409).json({
        success: false,
        message: "Another car with this registration number already exists",
      });
    }

    const data = {};
    for (const key of [
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
    ]) {
      if (req.body[key] !== undefined) data[key] = req.body[key];
    }

    if (req.body.isActive !== undefined) {
      data.isActive = req.body.isActive === true || req.body.isActive === "true";
    }

    if (Object.keys(data).length) {
      const normalized = normalizeCarData(data);
      delete normalized.isActive;
      if (data.isActive !== undefined) normalized.isActive = data.isActive;
      await Car.update(id, normalized);
    }

    if (req.files && req.files.length > 0) {
      uploadedImages = await uploadImages(req.files);
      const oldImages = await Car.getImageRecords(id);
      await Car.replaceImages(id, uploadedImages);
      await deleteCloudinaryImages(oldImages);
    }

    const car = await Car.findById(id);

    res.json({
      success: true,
      message: "Car updated successfully",
      data: car,
    });
  } catch (error) {
    await deleteCloudinaryImages(uploadedImages);
    next(error);
  }
};

const deleteCar = async (req, res, next) => {
  try {
    if (!idOk(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid car id",
      });
    }

    const id = Number(req.params.id);
    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    const images = await Car.getImageRecords(id);
    await Car.remove(id);
    await deleteCloudinaryImages(images);

    res.json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
};
