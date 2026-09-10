const { pool } = require('../config/database');

async function create({ userId, otpHash, expiresAt, maxAttempts }, connection = pool) {
  const [result] = await connection.query(
    `INSERT INTO email_verification_otps (user_id, otp_hash, expires_at, max_attempts)
     VALUES (?, ?, ?, ?)`,
    [userId, otpHash, expiresAt, maxAttempts]
  );
  return result.insertId;
}

async function findLatestByUserId(userId, connection = pool) {
  const [rows] = await connection.query(
    `SELECT id, user_id, otp_hash, expires_at, attempts, max_attempts, consumed_at, created_at
     FROM email_verification_otps
     WHERE user_id = ?
     ORDER BY id DESC LIMIT 1`,
    [userId]
  );
  return rows[0] || null;
}

async function findLatestUsableByUserId(userId, connection = pool) {
  const [rows] = await connection.query(
    `SELECT id, user_id, otp_hash, expires_at, attempts, max_attempts, consumed_at, created_at
     FROM email_verification_otps
     WHERE user_id = ? AND consumed_at IS NULL
     ORDER BY id DESC LIMIT 1`,
    [userId]
  );
  return rows[0] || null;
}

async function incrementAttempts(id, connection = pool) {
  await connection.query(
    `UPDATE email_verification_otps
     SET attempts = attempts + 1
     WHERE id = ? AND consumed_at IS NULL AND attempts < max_attempts`,
    [id]
  );
}

async function invalidateUnconsumedByUserId(userId, connection = pool) {
  await connection.query(
    `UPDATE email_verification_otps
     SET consumed_at = CURRENT_TIMESTAMP
     WHERE user_id = ? AND consumed_at IS NULL`,
    [userId]
  );
}

async function markConsumed(id, connection = pool) {
  await connection.query(
    `UPDATE email_verification_otps SET consumed_at = CURRENT_TIMESTAMP WHERE id = ? AND consumed_at IS NULL`,
    [id]
  );
}

module.exports = {
  create,
  findLatestByUserId,
  findLatestUsableByUserId,
  incrementAttempts,
  invalidateUnconsumedByUserId,
  markConsumed
};
