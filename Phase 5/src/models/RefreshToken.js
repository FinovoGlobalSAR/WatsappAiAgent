const { pool } = require('../config/database');

async function create({ userId, tokenHash, expiresAt }, connection = pool) {
  const [result] = await connection.query(
    `INSERT INTO refresh_tokens (user_id, token_hash, expires_at)
     VALUES (?, ?, ?)`,
    [userId, tokenHash, expiresAt]
  );
  return result.insertId;
}

async function findByTokenHash(tokenHash, connection = pool) {
  const [rows] = await connection.query(
    `SELECT id, user_id, token_hash, expires_at, revoked_at, created_at
     FROM refresh_tokens
     WHERE token_hash = ?
     LIMIT 1`,
    [tokenHash]
  );
  return rows[0] || null;
}

async function findActiveByTokenHash(tokenHash, connection = pool) {
  const [rows] = await connection.query(
    `SELECT id, user_id, token_hash, expires_at, revoked_at, created_at
     FROM refresh_tokens
     WHERE token_hash = ? AND revoked_at IS NULL AND expires_at > CURRENT_TIMESTAMP
     LIMIT 1`,
    [tokenHash]
  );
  return rows[0] || null;
}

async function revokeByTokenHash(tokenHash, connection = pool) {
  await connection.query(
    `UPDATE refresh_tokens
     SET revoked_at = CURRENT_TIMESTAMP
     WHERE token_hash = ? AND revoked_at IS NULL`,
    [tokenHash]
  );
}

async function revokeAllByUserId(userId, connection = pool) {
  await connection.query(
    `UPDATE refresh_tokens
     SET revoked_at = CURRENT_TIMESTAMP
     WHERE user_id = ? AND revoked_at IS NULL`,
    [userId]
  );
}

module.exports = {
  create,
  findByTokenHash,
  findActiveByTokenHash,
  revokeByTokenHash,
  revokeAllByUserId
};
