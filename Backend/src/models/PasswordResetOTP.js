const { pool } = require('../config/database');

async function create({ userId, otpHash, expiresAt, maxAttempts }, connection = pool) {
  const [result] = await connection.query(
    `INSERT INTO password_reset_otps (user_id, otp_hash, expires_at, max_attempts)
     VALUES (?, ?, ?, ?)`,
    [userId, otpHash, expiresAt, maxAttempts]
  );
  return result.insertId;
}

async function findLatestByUserId(userId, connection = pool) {
  const [rows] = await connection.query(
    `SELECT id, user_id, otp_hash, reset_token_hash, expires_at, attempts, max_attempts, consumed_at, created_at
     FROM password_reset_otps
     WHERE user_id = ?
     ORDER BY id DESC LIMIT 1`,
    [userId]
  );
  return rows[0] || null;
}

async function findLatestUsableByUserId(userId, connection = pool) {
  const [rows] = await connection.query(
    `SELECT id, user_id, otp_hash, reset_token_hash, expires_at, attempts, max_attempts, consumed_at, created_at
     FROM password_reset_otps
     WHERE user_id = ? AND consumed_at IS NULL
     ORDER BY id DESC LIMIT 1`,
    [userId]
  );
  return rows[0] || null;
}

async function incrementAttempts(id, connection = pool) {
  await connection.query(
    `UPDATE password_reset_otps
     SET attempts = attempts + 1
     WHERE id = ? AND consumed_at IS NULL AND attempts < max_attempts`,
    [id]
  );
}

async function invalidateUnconsumedByUserId(userId, connection = pool) {
  await connection.query(
    `UPDATE password_reset_otps
     SET consumed_at = CURRENT_TIMESTAMP
     WHERE user_id = ? AND consumed_at IS NULL`,
    [userId]
  );
}

async function setResetTokenHash(id, resetTokenHash, connection = pool) {
  await connection.query(
    `UPDATE password_reset_otps
     SET reset_token_hash = ?
     WHERE id = ? AND consumed_at IS NULL`,
    [resetTokenHash, id]
  );
}

async function findActiveByResetTokenHash(resetTokenHash, connection = pool) {
  const [rows] = await connection.query(
    `SELECT id, user_id, otp_hash, reset_token_hash, expires_at, attempts, max_attempts, consumed_at, created_at
     FROM password_reset_otps
     WHERE reset_token_hash = ? AND consumed_at IS NULL AND expires_at > CURRENT_TIMESTAMP
     LIMIT 1`,
    [resetTokenHash]
  );
  return rows[0] || null;
}

async function markConsumed(id, connection = pool) {
  await connection.query(
    `UPDATE password_reset_otps
     SET consumed_at = CURRENT_TIMESTAMP
     WHERE id = ? AND consumed_at IS NULL`,
    [id]
  );
}

module.exports = {
  create,
  findLatestByUserId,
  findLatestUsableByUserId,
  incrementAttempts,
  invalidateUnconsumedByUserId,
  setResetTokenHash,
  findActiveByResetTokenHash,
  markConsumed
};
