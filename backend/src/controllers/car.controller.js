const fs = require("fs");
const path = require("path");
const Car = require("../models/car.model");
const Brand = require("../models/brand.model");
const Category = require("../models/category.model");

const deleteImage = (imagePath) => {
  if (!imagePath) return;

  const fullPath = path.join(
    __dirname,
    "..",
    imagePath.replace(/^\/+/, "")
  );

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

const createCar = async (req, res) => {
  try {
    const {
      brandId,
      categoryId,
      model,
      year,
      registrationNumber,
      color,
      transmission,
      fuelType,
      seats,
      doors,
      mileage,
      pricePerDay,
      status,
      description,
      isActive,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Car image is required",
      });
    }

    const brand = await Brand.findByPk(brandId);

    if (!brand) {
      deleteImage(`/uploads/images/cars/${req.file.filename}`);

      return res.status(400).json({
        success: false,
        message: "Invalid brandId",
      });
    }

    const category = await Category.findByPk(categoryId);

    if (!category) {
      deleteImage(`/uploads/images/cars/${req.file.filename}`);

      return res.status(400).json({
        success: false,
        message: "Invalid categoryId",
      });
    }

    const existingCar = await Car.findOne({
      where: { registrationNumber },
    });

    if (existingCar) {
      deleteImage(`/uploads/images/cars/${req.file.filename}`);

      return res.status(409).json({
        success: false,
        message: "A car with this registration number already exists",
      });
    }

    const image = `/uploads/images/cars/${req.file.filename}`;

    const newCar = await Car.create({
      brandId,
      categoryId,
      model,
      year,
      registrationNumber,
      color,
      transmission,
      fuelType,
      seats,
      doors,
      mileage,
      pricePerDay,
      status,
      description,
      image,
      isActive,
    });

    const car = await Car.findByPk(newCar.id, {
      include: [
        {
          model: Brand,
          as: "brand",
        },
        {
          model: Category,
          as: "category",
        },
      ],
    });

    return res.status(201).json({
      success: true,
      message: "Car created successfully",
      data: car,
    });
  } catch (error) {
    console.error("Create car error:", error);

    if (req.file) {
      deleteImage(`/uploads/images/cars/${req.file.filename}`);
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create car",
      error: error.message,
    });
  }
};

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.findAll({
      include: [
        {
          model: Brand,
          as: "brand",
        },
        {
          model: Category,
          as: "category",
        },
      ],
      order: [["created_at", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      count: cars.length,
      data: cars,
    });
  } catch (error) {
    console.error("Get cars error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch cars",
      error: error.message,
    });
  }
};

const getCarById = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findByPk(id, {
      include: [
        {
          model: Brand,
          as: "brand",
        },
        {
          model: Category,
          as: "category",
        },
      ],
    });

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: car,
    });
  } catch (error) {
    console.error("Get car error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch car",
      error: error.message,
    });
  }
};

const updateCar = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findByPk(id);

    if (!car) {
      if (req.file) {
        deleteImage(`/uploads/images/cars/${req.file.filename}`);
      }

      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    const {
      brandId,
      categoryId,
      model,
      year,
      registrationNumber,
      color,
      transmission,
      fuelType,
      seats,
      doors,
      mileage,
      pricePerDay,
      status,
      description,
      isActive,
    } = req.body;

    if (brandId !== undefined) {
      const brand = await Brand.findByPk(brandId);

      if (!brand) {
        if (req.file) {
          deleteImage(`/uploads/images/cars/${req.file.filename}`);
        }

        return res.status(400).json({
          success: false,
          message: "Invalid brandId",
        });
      }
    }

    if (categoryId !== undefined) {
      const category = await Category.findByPk(categoryId);

      if (!category) {
        if (req.file) {
          deleteImage(`/uploads/images/cars/${req.file.filename}`);
        }

        return res.status(400).json({
          success: false,
          message: "Invalid categoryId",
        });
      }
    }

    if (
      registrationNumber &&
      registrationNumber !== car.registrationNumber
    ) {
      const existingCar = await Car.findOne({
        where: { registrationNumber },
      });

      if (existingCar) {
        if (req.file) {
          deleteImage(`/uploads/images/cars/${req.file.filename}`);
        }

        return res.status(409).json({
          success: false,
          message:
            "Another car with this registration number already exists",
        });
      }
    }

    let image = car.image;

    if (req.file) {
      image = `/uploads/images/cars/${req.file.filename}`;

      if (car.image) {
        deleteImage(car.image);
      }
    }

    await car.update({
      brandId: brandId ?? car.brandId,
      categoryId: categoryId ?? car.categoryId,
      model: model ?? car.model,
      year: year ?? car.year,
      registrationNumber:
        registrationNumber ?? car.registrationNumber,
      color: color ?? car.color,
      transmission: transmission ?? car.transmission,
      fuelType: fuelType ?? car.fuelType,
      seats: seats ?? car.seats,
      doors: doors ?? car.doors,
      mileage: mileage ?? car.mileage,
      pricePerDay: pricePerDay ?? car.pricePerDay,
      status: status ?? car.status,
      description: description ?? car.description,
      image,
      isActive: isActive ?? car.isActive,
    });

    const updatedCar = await Car.findByPk(id, {
      include: [
        {
          model: Brand,
          as: "brand",
        },
        {
          model: Category,
          as: "category",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Car updated successfully",
      data: updatedCar,
    });
  } catch (error) {
    console.error("Update car error:", error);

    if (req.file) {
      deleteImage(`/uploads/images/cars/${req.file.filename}`);
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update car",
      error: error.message,
    });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findByPk(id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    if (car.image) {
      deleteImage(car.image);
    }

    await car.destroy();

    return res.status(200).json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (error) {
    console.error("Delete car error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete car",
      error: error.message,
    });
  }
};

module.exports = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
};