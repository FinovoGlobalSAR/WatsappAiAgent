const test = require('node:test');
const assert = require('node:assert/strict');
const { generateOtp, hashOtp, verifyOtp } = require('../../src/utils/otp');

test('OTP generation produces a six-digit code and verification works', async () => {
  const otp = generateOtp();
  assert.match(otp, /^\d{6}$/);
  const hash = await hashOtp(otp);
  assert.notEqual(hash, otp);
  assert.equal(await verifyOtp(otp, hash), true);
  assert.equal(await verifyOtp('000000' === otp ? '000001' : '000000', hash), false);
});
