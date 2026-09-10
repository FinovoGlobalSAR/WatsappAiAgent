const test = require('node:test');
const assert = require('node:assert/strict');
const {
  isOtpExpired,
  hasExceededAttempts,
  isWithinResendCooldown,
  getResendRetryAfterSeconds,
  OTP_MAX_ATTEMPTS,
  OTP_RESEND_COOLDOWN_SECONDS
} = require('../../src/utils/otp');

test('expired OTP timestamps are detected', () => {
  assert.equal(isOtpExpired(new Date(Date.now() - 1000)), true);
  assert.equal(isOtpExpired(new Date(Date.now() + 60_000)), false);
});

test('OTP attempt limit uses stored max_attempts', () => {
  assert.equal(hasExceededAttempts({ attempts: 4, max_attempts: OTP_MAX_ATTEMPTS }), false);
  assert.equal(hasExceededAttempts({ attempts: 5, max_attempts: OTP_MAX_ATTEMPTS }), true);
});

test('resend cooldown is enforced from the last issue time', () => {
  const createdAt = new Date(Date.now() - 10_000);
  assert.equal(isWithinResendCooldown(createdAt), true);
  assert.equal(isWithinResendCooldown(new Date(Date.now() - (OTP_RESEND_COOLDOWN_SECONDS + 1) * 1000)), false);
  assert.ok(getResendRetryAfterSeconds(createdAt) >= 1);
  assert.ok(getResendRetryAfterSeconds(createdAt) <= OTP_RESEND_COOLDOWN_SECONDS);
});
