const Category = require('../models/category.model');
function idOk(id) { return /^\d+$/.test(String(id)) && Number(id) > 0; }
const createCategory = async (req, res, next) => {
  try {
    const name = String(req.body.name || '').trim();
    if (!name) return res.status(400).json({ success: false, message: 'Category name is required' });
    if (await Category.findByName(name)) return res.status(409).json({ success: false, message: 'Category already exists' });
    const category = await Category.create({ name, description: req.body.description, isActive: req.body.isActive });
    res.status(201).json({ success: true, message: 'Category created successfully', data: category });
  } catch (e) { next(e); }
};
const getAllCategories = async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 100);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const categories = await Category.findAll({ search: req.query.search, isActive: req.query.isActive === undefined ? undefined : req.query.isActive === 'true', limit, offset: (page - 1) * limit });
    res.json({ success: true, count: categories.length, page, limit, data: categories });
  } catch (e) { next(e); }
};
const getCategoryById = async (req, res, next) => {
  try { if (!idOk(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid category id' }); const category = await Category.findById(Number(req.params.id)); if (!category) return res.status(404).json({ success: false, message: 'Category not found' }); res.json({ success: true, data: category }); } catch (e) { next(e); }
};
const updateCategory = async (req, res, next) => {
  try { if (!idOk(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid category id' }); const id = Number(req.params.id); const current = await Category.findById(id); if (!current) return res.status(404).json({ success: false, message: 'Category not found' }); const name = req.body.name === undefined ? current.name : String(req.body.name).trim(); if (!name) return res.status(400).json({ success: false, message: 'Category name cannot be empty' }); if (await Category.findByName(name, id)) return res.status(409).json({ success: false, message: 'Another category with this name already exists' }); const category = await Category.update(id, { name, description: req.body.description, is_active: req.body.isActive }); res.json({ success: true, message: 'Category updated successfully', data: category }); } catch (e) { next(e); }
};
const deleteCategory = async (req, res, next) => {
  try { if (!idOk(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid category id' }); try { const deleted = await Category.remove(Number(req.params.id)); if (!deleted) return res.status(404).json({ success: false, message: 'Category not found' }); res.json({ success: true, message: 'Category deleted successfully' }); } catch (e) { if (e.code === 'ER_ROW_IS_REFERENCED_2' || e.code === 'ER_ROW_IS_REFERENCED') return res.status(409).json({ success: false, message: 'Category cannot be deleted because it is linked to cars' }); throw e; } } catch (e) { next(e); }
};
module.exports = { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory };
