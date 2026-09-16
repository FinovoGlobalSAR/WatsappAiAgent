const Brand = require('../models/brand.model');

function idOk(id) { return /^\d+$/.test(String(id)) && Number(id) > 0; }

const createBrand = async (req, res, next) => {
  try {
    const name = String(req.body.name || '').trim();
    if (!name) return res.status(400).json({ success: false, message: 'Brand name is required' });
    if (await Brand.findByName(name)) return res.status(409).json({ success: false, message: 'Brand already exists' });
    const brand = await Brand.create({ name, description: req.body.description, isActive: req.body.isActive });
    res.status(201).json({ success: true, message: 'Brand created successfully', data: brand });
  } catch (e) { next(e); }
};

const getAllBrands = async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 100);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const brands = await Brand.findAll({ search: req.query.search, isActive: req.query.isActive === undefined ? undefined : req.query.isActive === 'true', limit, offset: (page - 1) * limit });
    res.json({ success: true, count: brands.length, page, limit, data: brands });
  } catch (e) { next(e); }
};

const getBrandById = async (req, res, next) => {
  try {
    if (!idOk(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid brand id' });
    const brand = await Brand.findById(Number(req.params.id));
    if (!brand) return res.status(404).json({ success: false, message: 'Brand not found' });
    res.json({ success: true, data: brand });
  } catch (e) { next(e); }
};

const updateBrand = async (req, res, next) => {
  try {
    if (!idOk(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid brand id' });
    const id = Number(req.params.id);
    const current = await Brand.findById(id);
    if (!current) return res.status(404).json({ success: false, message: 'Brand not found' });
    const name = req.body.name === undefined ? current.name : String(req.body.name).trim();
    if (!name) return res.status(400).json({ success: false, message: 'Brand name cannot be empty' });
    if (await Brand.findByName(name, id)) return res.status(409).json({ success: false, message: 'Another brand with this name already exists' });
    const brand = await Brand.update(id, { name, description: req.body.description, is_active: req.body.isActive });
    res.json({ success: true, message: 'Brand updated successfully', data: brand });
  } catch (e) { next(e); }
};

const deleteBrand = async (req, res, next) => {
  try {
    if (!idOk(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid brand id' });
    try {
      const deleted = await Brand.remove(Number(req.params.id));
      if (!deleted) return res.status(404).json({ success: false, message: 'Brand not found' });
      res.json({ success: true, message: 'Brand deleted successfully' });
    } catch (e) {
      if (e.code === 'ER_ROW_IS_REFERENCED_2' || e.code === 'ER_ROW_IS_REFERENCED') return res.status(409).json({ success: false, message: 'Brand cannot be deleted because it is linked to cars' });
      throw e;
    }
  } catch (e) { next(e); }
};

module.exports = { createBrand, getAllBrands, getBrandById, updateBrand, deleteBrand };
