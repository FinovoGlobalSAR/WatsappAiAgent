const crypto = require('crypto');
const { promisify } = require('util');

const scryptAsync = promisify(crypto.scrypt);
const OTP_LENGTH = 6;
const OTP_TTL_MINUTES = 10;
const OTP_MAX_ATTEMPTS = 5;
const OTP_RESEND_COOLDOWN_SECONDS = 60;
const KEY_LENGTH = 32;
const SCRYPT_OPTIONS = { N: 32768, r: 8, p: 1, maxmem: 128 * 1024 * 1024 };

function generateOtp() {
  return crypto.randomInt(0, 1_000_000).toString().padStart(OTP_LENGTH, '0');
}

async function hashOtp(otp) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = await scryptAsync(otp, salt, KEY_LENGTH, SCRYPT_OPTIONS);
  return `scrypt$${SCRYPT_OPTIONS.N}$${SCRYPT_OPTIONS.r}$${SCRYPT_OPTIONS.p}$${salt}$${derivedKey.toString('hex')}`;
}

async function verifyOtp(otp, storedHash) {
  try {
    const parts = String(storedHash).split('$');
    if (parts.length !== 6 || parts[0] !== 'scrypt') return false;

    const [, n, r, p, salt, expectedHex] = parts;
    const numN = Number(n);
    const numR = Number(r);
    const numP = Number(p);
    if (!numN || !numR || !numP || !salt) return false;

    const expected = Buffer.from(expectedHex, 'hex');
    if (expected.length !== KEY_LENGTH) return false;

    const derivedKey = await scryptAsync(String(otp), salt, KEY_LENGTH, {
      N: numN,
      r: numR,
      p: numP,
      maxmem: 128 * 1024 * 1024
    });

    return crypto.timingSafeEqual(derivedKey, expected);
  } catch {
    return false;
  }
}

function getOtpExpiry() {
  return new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);
}

function isOtpExpired(expiresAt, now = Date.now()) {
  return new Date(expiresAt).getTime() <= now;
}

function hasExceededAttempts(record) {
  return Number(record.attempts) >= Number(record.max_attempts);
}

function isWithinResendCooldown(createdAt, now = Date.now()) {
  const elapsedMs = now - new Date(createdAt).getTime();
  if (elapsedMs < 0) {
    return Math.abs(elapsedMs) < 5000;
  }
  return elapsedMs < OTP_RESEND_COOLDOWN_SECONDS * 1000;
}

function getResendRetryAfterSeconds(createdAt, now = Date.now()) {
  const elapsedMs = Math.max(0, now - new Date(createdAt).getTime());
  const remainingMs = OTP_RESEND_COOLDOWN_SECONDS * 1000 - elapsedMs;
  return Math.min(OTP_RESEND_COOLDOWN_SECONDS, Math.max(1, Math.ceil(remainingMs / 1000)));
}

module.exports = {
  generateOtp,
  hashOtp,
  verifyOtp,
  getOtpExpiry,
  isOtpExpired,
  hasExceededAttempts,
  isWithinResendCooldown,
  getResendRetryAfterSeconds,
  OTP_TTL_MINUTES,
  OTP_MAX_ATTEMPTS,
  OTP_RESEND_COOLDOWN_SECONDS
};
