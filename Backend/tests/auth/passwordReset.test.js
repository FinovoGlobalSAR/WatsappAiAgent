const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { pingDatabase, closeDatabase, pool } = require('../../src/config/database');
const User = require('../../src/models/User');
const PasswordResetOTP = require('../../src/models/PasswordResetOTP');
const RefreshToken = require('../../src/models/RefreshToken');
const authService = require('../../src/services/authService');
const emailService = require('../../src/services/emailService');
const { hashPassword, verifyPassword } = require('../../src/utils/password');
const { AppError } = require('../../src/utils/errors');

let dbAvailable = false;
let defaultPasswordHash;

async function createVerifiedUser() {
  const email = `pwd-reset-${Date.now()}-${crypto.randomBytes(4).toString('hex')}@example.com`;
  const user = await User.create({
    firstName: 'Reset',
    lastName: 'Tester',
    email,
    passwordHash: defaultPasswordHash
  });

  await pool.query(
    'UPDATE users SET email_verified_at = CURRENT_TIMESTAMP, status = "ACTIVE" WHERE id = ?',
    [user.id]
  );

  return User.findById(user.id);
}

test.before(async () => {
  try {
    await pingDatabase();
    dbAvailable = true;
    defaultPasswordHash = await hashPassword('InitialPassword!123');
  } catch {
    dbAvailable = false;
  }
});

test.after(async () => {
  await closeDatabase();
});

test('forgotPassword generates hashed OTP, calls email service, and enforces cooldown', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  let sentEmailDetails = null;
  t.mock.method(emailService, 'sendPasswordResetOtp', async (details) => {
    sentEmailDetails = details;
    return { messageId: 'mock-reset-email-id' };
  });

  const user = await createVerifiedUser();

  // 1. First forgot-password request
  const result = await authService.forgotPassword({ email: user.email });
  assert.equal(result.email, user.email);
  assert.ok(result.expiresInMinutes > 0);
  assert.ok(sentEmailDetails);
  assert.equal(sentEmailDetails.to, user.email);
  assert.ok(/^\d{6}$/.test(sentEmailDetails.otp));

  // Verify stored OTP in database is hashed, not plaintext
  const dbRecord = await PasswordResetOTP.findLatestByUserId(user.id);
  assert.ok(dbRecord);
  assert.notEqual(dbRecord.otp_hash, sentEmailDetails.otp);
  assert.equal(dbRecord.attempts, 0);
  assert.equal(dbRecord.consumed_at, null);

  // 2. Second request immediately after should hit 60-second cooldown
  await assert.rejects(
    () => authService.forgotPassword({ email: user.email }),
    (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.statusCode, 429);
      assert.equal(err.code, 'OTP_RESEND_COOLDOWN');
      return true;
    }
  );

  // Cleanup
  await pool.query('DELETE FROM users WHERE id = ?', [user.id]);
});

test('verifyResetOtp rejects invalid OTP, increments attempts, and issues resetToken on success', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  let capturedOtp = null;
  t.mock.method(emailService, 'sendPasswordResetOtp', async ({ otp }) => {
    capturedOtp = otp;
    return { messageId: 'mock' };
  });

  const user = await createVerifiedUser();
  await authService.forgotPassword({ email: user.email });

  // Verify with invalid OTP -> rejects and increments attempts
  await assert.rejects(
    () => authService.verifyResetOtp({ email: user.email, otp: '000000' }),
    (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.statusCode, 400);
      assert.equal(err.code, 'OTP_INVALID');
      return true;
    }
  );

  const afterFail = await PasswordResetOTP.findLatestByUserId(user.id);
  assert.equal(afterFail.attempts, 1);

  // Verify with correct OTP -> issues resetToken
  const verified = await authService.verifyResetOtp({ email: user.email, otp: capturedOtp });
  assert.equal(verified.email, user.email);
  assert.ok(verified.resetToken);
  assert.equal(typeof verified.resetToken, 'string');

  // Verify reset_token_hash is stored in database
  const afterVerify = await PasswordResetOTP.findLatestByUserId(user.id);
  assert.ok(afterVerify.reset_token_hash);

  // Cleanup
  await pool.query('DELETE FROM users WHERE id = ?', [user.id]);
});

test('resetPassword updates user password, marks token consumed, and revokes active sessions', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  let capturedOtp = null;
  t.mock.method(emailService, 'sendPasswordResetOtp', async ({ otp }) => {
    capturedOtp = otp;
    return { messageId: 'mock' };
  });

  const user = await createVerifiedUser();

  // Create an active login session first
  const loginSession = await authService.login({
    email: user.email,
    password: 'InitialPassword!123'
  });
  assert.ok(loginSession.tokens.accessToken);
  assert.ok(loginSession.tokens.refreshToken);

  // Request password reset and verify OTP
  await authService.forgotPassword({ email: user.email });
  const { resetToken } = await authService.verifyResetOtp({ email: user.email, otp: capturedOtp });

  // Perform reset password
  const newPassword = 'BrandNewPassword!999';
  const resetResult = await authService.resetPassword({
    email: user.email,
    resetToken,
    newPassword
  });
  assert.equal(resetResult.email, user.email);

  // 1. Verify password hash updated in users table
  const updatedUser = await User.findById(user.id);
  assert.notEqual(updatedUser.password_hash, defaultPasswordHash);
  assert.ok(await verifyPassword(newPassword, updatedUser.password_hash));

  // 2. Verify prior reset token is marked consumed and cannot be reused
  const usedRecord = await PasswordResetOTP.findLatestByUserId(user.id);
  assert.ok(usedRecord.consumed_at);

  await assert.rejects(
    () => authService.resetPassword({ email: user.email, resetToken, newPassword: 'AnotherPassword!111' }),
    (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.statusCode, 400);
      return true;
    }
  );

  // 3. Verify all active refresh tokens for the user were revoked
  const activeTokens = await pool.query(
    'SELECT * FROM refresh_tokens WHERE user_id = ? AND revoked_at IS NULL',
    [user.id]
  );
  assert.equal(activeTokens[0].length, 0);

  // 4. Old password fails login
  await assert.rejects(
    () => authService.login({ email: user.email, password: 'InitialPassword!123' }),
    (err) => err instanceof AppError && err.statusCode === 401
  );

  // 5. New password succeeds login
  const newLogin = await authService.login({ email: user.email, password: newPassword });
  assert.ok(newLogin.tokens.accessToken);

  // Cleanup
  await pool.query('DELETE FROM users WHERE id = ?', [user.id]);
});
