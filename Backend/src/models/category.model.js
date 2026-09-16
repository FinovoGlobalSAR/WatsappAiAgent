const pool = require('../config/db');

async function create({ name, description, isActive = true }) {
  const [result] = await pool.execute(
    'INSERT INTO car_categories (name, description, is_active) VALUES (?, ?, ?)',
    [name, description ?? null, isActive]
  );
  return findById(result.insertId);
}

async function findAll({ search = '', isActive, limit = 100, offset = 0 } = {}) {
  const conditions = [];
  const params = [];
  if (search) {
    conditions.push('(name LIKE ? OR description LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }
  if (isActive !== undefined) {
    conditions.push('is_active = ?');
    params.push(isActive);
  }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const [rows] = await pool.execute(
    `SELECT id, name, description, is_active AS isActive, created_at AS createdAt, updated_at AS updatedAt
     FROM car_categories ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, Number(limit), Number(offset)]
  );
  return rows;
}

async function findById(id) {
  const [rows] = await pool.execute(
    `SELECT id, name, description, is_active AS isActive, created_at AS createdAt, updated_at AS updatedAt
     FROM car_categories WHERE id = ? LIMIT 1`,
    [id]
  );
  return rows[0] || null;
}

async function findByName(name, excludeId = null) {
  const sql = excludeId
    ? 'SELECT id FROM car_categories WHERE name = ? AND id <> ? LIMIT 1'
    : 'SELECT id FROM car_categories WHERE name = ? LIMIT 1';
  const params = excludeId ? [name, excludeId] : [name];
  const [rows] = await pool.execute(sql, params);
  return rows[0] || null;
}

async function update(id, data) {
  const fields = [];
  const params = [];
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined) continue;
    fields.push(`${key} = ?`);
    params.push(value);
  }
  if (!fields.length) return findById(id);
  params.push(id);
  await pool.execute(`UPDATE car_categories SET ${fields.join(', ')} WHERE id = ?`, params);
  return findById(id);
}

async function remove(id) {
  const [result] = await pool.execute('DELETE FROM car_categories WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = { create, findAll, findById, findByName, update, remove };
