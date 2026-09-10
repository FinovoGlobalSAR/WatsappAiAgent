const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { pingDatabase, closeDatabase, pool } = require('../../src/config/database');
const User = require('../../src/models/User');
const EmailOTP = require('../../src/models/EmailOTP');
const authService = require('../../src/services/authService');
const emailService = require('../../src/services/emailService');
const { verifyPassword } = require('../../src/utils/password');
const { AppError } = require('../../src/utils/errors');

let dbAvailable = false;

test.before(async () => {
  try {
    await pingDatabase();
    dbAvailable = true;
  } catch {
    dbAvailable = false;
  }
});

test.after(async () => {
  await closeDatabase();
});

test('registration service creates user, persists hashed password and OTP, and sanitizes output', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  t.mock.method(emailService, 'sendVerificationOtp', async () => ({ messageId: 'mock-test-id' }));

  const rawEmail = `RegisterTest-${Date.now()}-${crypto.randomBytes(3).toString('hex')}@Example.COM`;
  const normalizedEmail = rawEmail.toLowerCase();
  const password = 'StrongPassword!123';

  const user = await authService.register({
    firstName: 'Jane',
    lastName: 'Doe',
    email: normalizedEmail,
    password
  });

  // Verify sanitized output
  assert.ok(user.id);
  assert.equal(user.email, normalizedEmail);
  assert.equal(user.firstName, 'Jane');
  assert.equal(user.lastName, 'Doe');
  assert.equal(user.role, 'CUSTOMER');
  assert.equal(user.emailVerified, false);
  assert.equal(user.status, 'ACTIVE');
  assert.equal(user.password_hash, undefined);
  assert.equal(user.passwordHash, undefined);

  // Verify database record
  const dbUser = await User.findById(user.id);
  assert.ok(dbUser);
  assert.notEqual(dbUser.password_hash, password);
  const passwordMatches = await verifyPassword(password, dbUser.password_hash);
  assert.equal(passwordMatches, true);

  // Verify OTP was created in database
  const latestOtp = await EmailOTP.findLatestByUserId(user.id);
  assert.ok(latestOtp);
  assert.equal(latestOtp.user_id, user.id);
  assert.equal(latestOtp.consumed_at, null);

  // Cleanup
  await pool.query('DELETE FROM users WHERE id = ?', [user.id]);
});

test('registration rejects duplicate email with 409 EMAIL_ALREADY_EXISTS', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  t.mock.method(emailService, 'sendVerificationOtp', async () => ({ messageId: 'mock-test-id' }));

  const email = `duplicate-${Date.now()}-${crypto.randomBytes(3).toString('hex')}@example.com`;
  const password = 'StrongPassword!123';

  const user = await authService.register({
    firstName: 'First',
    lastName: 'User',
    email,
    password
  });

  // Attempt to register again with same email
  await assert.rejects(
    () =>
      authService.register({
        firstName: 'Duplicate',
        lastName: 'User',
        email,
        password
      }),
    (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.statusCode, 409);
      assert.equal(err.code, 'EMAIL_ALREADY_EXISTS');
      return true;
    }
  );

  // Cleanup
  await pool.query('DELETE FROM users WHERE id = ?', [user.id]);
});
