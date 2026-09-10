const { pool } = require('../config/database');

async function findByEmail(email, connection = pool) {
  const [rows] = await connection.query(
    `SELECT id, first_name, last_name, email, password_hash, role, email_verified_at, status, created_at, updated_at
     FROM users WHERE email = ? LIMIT 1`,
    [email]
  );
  return rows[0] || null;
}

async function findById(id, connection = pool) {
  const [rows] = await connection.query(
    `SELECT id, first_name, last_name, email, password_hash, role, email_verified_at, status, created_at, updated_at
     FROM users WHERE id = ? LIMIT 1`,
    [id]
  );
  return rows[0] || null;
}

async function create(user, connection = pool) {
  const role = user.role || 'CUSTOMER';
  const status = user.status || 'ACTIVE';
  const [result] = await connection.query(
    `INSERT INTO users (first_name, last_name, email, password_hash, role, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [user.firstName, user.lastName, user.email, user.passwordHash, role, status]
  );
  return findById(result.insertId, connection);
}

async function markEmailVerified(userId, connection = pool) {
  await connection.query(
    `UPDATE users SET email_verified_at = CURRENT_TIMESTAMP WHERE id = ? AND email_verified_at IS NULL`,
    [userId]
  );
  return findById(userId, connection);
}

async function updateRole(userId, role, connection = pool) {
  await connection.query(
    `UPDATE users SET role = ? WHERE id = ?`,
    [role, userId]
  );
  return findById(userId, connection);
}

async function updatePassword(userId, passwordHash, connection = pool) {
  await connection.query(
    `UPDATE users SET password_hash = ? WHERE id = ?`,
    [passwordHash, userId]
  );
  return findById(userId, connection);
}

module.exports = { findByEmail, findById, create, markEmailVerified, updateRole, updatePassword };


