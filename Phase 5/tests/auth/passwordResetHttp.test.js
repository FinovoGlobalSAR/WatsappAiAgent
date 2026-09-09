const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const app = require('../../src/app');
const { pingDatabase, closeDatabase, pool } = require('../../src/config/database');
const User = require('../../src/models/User');
const emailService = require('../../src/services/emailService');
const { hashPassword } = require('../../src/utils/password');

let server;
let baseUrl;
let dbAvailable = false;
let defaultPasswordHash;

async function postJson(path, body) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await response.json().catch(() => null);
  return { status: response.status, headers: response.headers, body: data };
}

async function createVerifiedUser() {
  const email = `pwd-http-${Date.now()}-${crypto.randomBytes(4).toString('hex')}@example.com`;
  const user = await User.create({
    firstName: 'HttpReset',
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

  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', () => {
      const address = server.address();
      baseUrl = `http://127.0.0.1:${address.port}`;
      resolve();
    });
  });
});

test.after(async () => {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
  await closeDatabase();
});

test('HTTP: GET /forgot-password and /reset-password serve clean UI pages', async () => {
  const forgotRes = await fetch(`${baseUrl}/forgot-password`);
  assert.equal(forgotRes.status, 200);
  assert.ok(forgotRes.headers.get('content-type').includes('text/html'));
  const forgotHtml = await forgotRes.text();
  assert.ok(forgotHtml.includes('Reset Your Password'));
  assert.ok(forgotHtml.includes('forgotPasswordForm'));

  const resetRes = await fetch(`${baseUrl}/reset-password`);
  assert.equal(resetRes.status, 200);
  assert.ok(resetRes.headers.get('content-type').includes('text/html'));
  const resetHtml = await resetRes.text();
  assert.ok(resetHtml.includes('Set New Password'));
  assert.ok(resetHtml.includes('resetPasswordForm'));
});

test('HTTP: POST /api/v1/auth/forgot-password validates input and sends OTP', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  let sentOtp = null;
  t.mock.method(emailService, 'sendPasswordResetOtp', async ({ otp }) => {
    sentOtp = otp;
    return { messageId: 'mock' };
  });

  // Invalid email
  const badRes = await postJson('/api/v1/auth/forgot-password', { email: 'not-an-email' });
  assert.equal(badRes.status, 400);
  assert.equal(badRes.body.success, false);
  assert.ok(Array.isArray(badRes.body.errors));

  // Non-existent user
  const notFoundRes = await postJson('/api/v1/auth/forgot-password', { email: 'unknown@example.com' });
  assert.equal(notFoundRes.status, 404);
  assert.equal(notFoundRes.body.success, false);

  // Existing user
  const user = await createVerifiedUser();
  const okRes = await postJson('/api/v1/auth/forgot-password', { email: user.email });
  assert.equal(okRes.status, 200);
  assert.equal(okRes.body.success, true);
  assert.ok(sentOtp);

  // Rate limiting headers present
  assert.ok(okRes.headers.get('ratelimit-limit'));

  // Cleanup
  await pool.query('DELETE FROM users WHERE id = ?', [user.id]);
});

test('HTTP: Complete password reset flow via API endpoints', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  let capturedOtp = null;
  t.mock.method(emailService, 'sendPasswordResetOtp', async ({ otp }) => {
    capturedOtp = otp;
    return { messageId: 'mock' };
  });

  const user = await createVerifiedUser();

  // 1. Forgot password
  const forgotRes = await postJson('/api/v1/auth/forgot-password', { email: user.email });
  assert.equal(forgotRes.status, 200);
  assert.ok(capturedOtp);

  // 2. Verify OTP
  const verifyRes = await postJson('/api/v1/auth/verify-reset-otp', {
    email: user.email,
    otp: capturedOtp
  });
  assert.equal(verifyRes.status, 200);
  assert.equal(verifyRes.body.success, true);
  assert.ok(verifyRes.body.data.resetToken);

  const resetToken = verifyRes.body.data.resetToken;

  // 3. Reset password validation: rejects weak password
  const weakRes = await postJson('/api/v1/auth/reset-password', {
    email: user.email,
    resetToken,
    newPassword: 'weak'
  });
  assert.equal(weakRes.status, 400);
  assert.equal(weakRes.body.success, false);

  // 4. Reset password success
  const newPassword = 'BrandNewPassword!999';
  const resetRes = await postJson('/api/v1/auth/reset-password', {
    email: user.email,
    resetToken,
    newPassword
  });
  assert.equal(resetRes.status, 200);
  assert.equal(resetRes.body.success, true);

  // 5. Test login with new password
  const loginRes = await postJson('/api/v1/auth/login', {
    email: user.email,
    password: newPassword
  });
  assert.equal(loginRes.status, 200);
  assert.equal(loginRes.body.success, true);
  assert.ok(loginRes.body.data.tokens.accessToken);

  // Cleanup
  await pool.query('DELETE FROM users WHERE id = ?', [user.id]);
});
