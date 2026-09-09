const { pool } = require('../config/database');

async function create({ userId, otpHash, expiresAt }, connection = pool) {
  const [result] = await connection.query(
    `INSERT INTO email_verification_otps (user_id, otp_hash, expires_at)
     VALUES (?, ?, ?)`,
    [userId, otpHash, expiresAt]
  );
  return result.insertId;
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

async function markConsumed(id, connection = pool) {
  await connection.query(
    `UPDATE email_verification_otps SET consumed_at = CURRENT_TIMESTAMP WHERE id = ? AND consumed_at IS NULL`,
    [id]
  );
}

module.exports = { create, findLatestUsableByUserId, markConsumed };
