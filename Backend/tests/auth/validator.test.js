const test = require('node:test');
const assert = require('node:assert/strict');
const { validateRegistration, validateEmailVerification, validateResendOtp } = require('../../src/validators/authValidator');

test('registration validation accepts valid input and normalizes email', () => {
  const result = validateRegistration({ firstName: 'John', lastName: 'Doe', email: ' JOHN@Example.COM ', password: 'StrongPassword!123' });
  assert.equal(result.errors.length, 0);
  assert.equal(result.value.email, 'john@example.com');
});

test('registration validation rejects weak passwords and malformed email', () => {
  const result = validateRegistration({ firstName: 'John', lastName: 'Doe', email: 'not-an-email', password: 'weak' });
  assert.ok(result.errors.some((e) => e.field === 'email'));
  assert.ok(result.errors.some((e) => e.field === 'password'));
});

test('OTP validation requires exactly six digits', () => {
  assert.equal(validateEmailVerification({ email: 'john@example.com', otp: '12345' }).errors.length, 1);
  assert.equal(validateEmailVerification({ email: 'john@example.com', otp: '123456' }).errors.length, 0);
});

test('resend OTP validation requires a valid email', () => {
  assert.ok(validateResendOtp({ email: 'not-an-email' }).errors.length > 0);
  assert.equal(validateResendOtp({ email: ' JOHN@Example.COM ' }).errors.length, 0);
  assert.equal(validateResendOtp({ email: ' JOHN@Example.COM ' }).value.email, 'john@example.com');
});
