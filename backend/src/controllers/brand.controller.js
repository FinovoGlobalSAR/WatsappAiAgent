const Brand = require("../models/brand.model");

const createBrand = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    if (!name) {
      return res
        .status(403)
        .json({ success: false, message: "Brand name is required" });
    }
    const existingBrand = await Brand.findOne({ where: { name } });
    if (existingBrand) {
      return res
        .status(409)
        .json({ success: false, message: "Brand already exists" });
    }
    const newBrand = await Brand.create({
      name,
      description,
      isActive,
    });
    return res.status(201).json({ success: true, data: newBrand });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll();
    return res.status(200).json({
      success: true,
      count: brands.length,
      data: brands,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch brands",
      error: error.message,
    });
  }
};

const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: brand,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch brand",
      error: error.message,
    });
  }
};

const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findByPk(id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    const { name, description, isActive } = req.body;

    if (name && name.trim() !== brand.name) {
      const existingBrand = await Brand.findOne({
        where: {
          name: name.trim(),
        },
      });

      if (existingBrand) {
        return res.status(409).json({
          success: false,
          message: "Another brand with this name already exists",
        });
      }
    }

    await brand.update({
      name: name ? name.trim() : brand.name,
      description: description !== undefined ? description : brand.description,
      isActive: isActive !== undefined ? isActive : brand.isActive,
    });

    return res.status(200).json({
      success: true,
      message: "Brand updated successfully",
      data: brand,
    });
  } catch (error) {
    console.error("Update brand error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update brand",
      error: error.message,
    });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findByPk(id);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    await brand.destroy();

    return res.status(200).json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete brand. It may be linked to existing cars.",
      error: error.message,
    });
  }
};

module.exports = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};
