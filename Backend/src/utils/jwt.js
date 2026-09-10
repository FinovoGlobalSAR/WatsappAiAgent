const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { AppError } = require('./errors');

function hashToken(token) {
  return crypto.createHash('sha256').update(String(token)).digest('hex');
}

function getAccessSecret() {
  if (!env.jwt.accessSecret) {
    throw new AppError(500, 'JWT access secret is not configured on the server.', 'CONFIG_ERROR');
  }
  return env.jwt.accessSecret;
}

function getRefreshSecret() {
  if (!env.jwt.refreshSecret) {
    throw new AppError(500, 'JWT refresh secret is not configured on the server.', 'CONFIG_ERROR');
  }
  return env.jwt.refreshSecret;
}

function generateAccessToken(user) {
  const secret = getAccessSecret();
  const jti = crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString('hex');
  const payload = {
    sub: String(user.id),
    role: user.role,
    jti
  };

  return jwt.sign(payload, secret, {
    expiresIn: env.jwt.accessExpiresIn,
    algorithm: 'HS256'
  });
}

function generateRefreshToken(user) {
  const secret = getRefreshSecret();
  const jti = crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString('hex');
  const payload = {
    sub: String(user.id),
    type: 'refresh',
    jti
  };

  const token = jwt.sign(payload, secret, {
    expiresIn: `${env.jwt.refreshExpiresInDays}d`,
    algorithm: 'HS256'
  });

  const expiresAt = new Date(Date.now() + env.jwt.refreshExpiresInDays * 24 * 60 * 60 * 1000);
  const tokenHash = hashToken(token);

  return { token, tokenHash, expiresAt };
}

function verifyAccessToken(token) {
  const secret = getAccessSecret();
  return jwt.verify(token, secret, { algorithms: ['HS256'] });
}

function verifyRefreshToken(token) {
  const secret = getRefreshSecret();
  return jwt.verify(token, secret, { algorithms: ['HS256'] });
}

module.exports = {
  hashToken,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};
