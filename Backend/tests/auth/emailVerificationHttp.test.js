const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const app = require('../../src/app');
const { pingDatabase, closeDatabase, pool } = require('../../src/config/database');
const User = require('../../src/models/User');
const EmailOTP = require('../../src/models/EmailOTP');
const { hashPassword } = require('../../src/utils/password');
const { hashOtp, OTP_MAX_ATTEMPTS } = require('../../src/utils/otp');
const { issueVerificationOtp } = require('../../src/services/otpService');

let server;
let baseUrl;
let dbAvailable = false;
let passwordHash;

async function postJson(path, body) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await response.json().catch(() => null);
  return { status: response.status, headers: response.headers, body: data };
}

async function createTestUser() {
  const email = `http-phase4-${Date.now()}-${crypto.randomBytes(4).toString('hex')}@example.com`;
  return User.create({
    firstName: 'Http',
    lastName: 'Tester',
    email,
    passwordHash
  });
}

test.before(async () => {
  try {
    await pingDatabase();
    dbAvailable = true;
    passwordHash = await hashPassword('StrongPassword!123');
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

test('HTTP: GET /health returns standard envelope', async () => {
  const response = await fetch(`${baseUrl}/health`);
  assert.equal(response.status, 200);
  const json = await response.json();
  assert.equal(json.success, true);
  assert.equal(json.data.status, 'ok');
});

test('HTTP: POST /api/v1/auth/verify-email validates input and returns 400 with details', async () => {
  const res = await postJson('/api/v1/auth/verify-email', { email: 'invalid-email', otp: '12' });
  assert.equal(res.status, 400);
  assert.equal(res.body.success, false);
  assert.ok(Array.isArray(res.body.errors));
  assert.ok(res.body.errors.some((e) => e.field === 'email'));
  assert.ok(res.body.errors.some((e) => e.field === 'otp'));
});

test('HTTP: POST /api/v1/auth/verify-email returns 404 for unknown account', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  const res = await postJson('/api/v1/auth/verify-email', {
    email: 'nonexistent-phase4-user@example.com',
    otp: '123456'
  });
  assert.equal(res.status, 404);
  assert.equal(res.body.success, false);
  assert.equal(res.body.message, 'Account not found.');
});

test('HTTP: POST /api/v1/auth/verify-email enforces attempt limits and rejects invalid OTP', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  const user = await createTestUser();
  const issued = await issueVerificationOtp(user);

  // Send wrong OTP
  const wrongRes = await postJson('/api/v1/auth/verify-email', {
    email: user.email,
    otp: '000000' === issued.otp ? '111111' : '000000'
  });
  assert.equal(wrongRes.status, 400);
  assert.equal(wrongRes.body.success, false);
  assert.equal(wrongRes.body.message, 'Invalid verification OTP.');

  // Exhaust remaining attempts (4 more times to reach 5 total attempts)
  for (let i = 1; i < OTP_MAX_ATTEMPTS; i += 1) {
    await postJson('/api/v1/auth/verify-email', {
      email: user.email,
      otp: '000000' === issued.otp ? '111111' : '000000'
    });
  }

  // Attempt 6 should report limit exceeded even with the correct OTP
  const exceededRes = await postJson('/api/v1/auth/verify-email', {
    email: user.email,
    otp: issued.otp
  });
  assert.equal(exceededRes.status, 400);
  assert.equal(exceededRes.body.message, 'OTP attempt limit exceeded. Request a new verification code.');
});

test('HTTP: POST /api/v1/auth/verify-email rejects expired OTP', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  const user = await createTestUser();
  const otpHash = await hashOtp('654321');
  await EmailOTP.create({
    userId: user.id,
    otpHash,
    expiresAt: new Date(Date.now() - 5000),
    maxAttempts: OTP_MAX_ATTEMPTS
  });

  const res = await postJson('/api/v1/auth/verify-email', {
    email: user.email,
    otp: '654321'
  });
  assert.equal(res.status, 400);
  assert.equal(res.body.message, 'The verification OTP has expired.');
});

test('HTTP: POST /api/v1/auth/verify-email verifies user, prevents reuse, and never leaks secrets', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  const user = await createTestUser();
  const issued = await issueVerificationOtp(user);

  const res = await postJson('/api/v1/auth/verify-email', {
    email: user.email,
    otp: issued.otp
  });

  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.message, 'Email verified successfully.');
  assert.equal(res.body.data.user.emailVerified, true);
  assert.equal(res.body.data.user.email, user.email);

  // Security: sensitive data must never be leaked
  assert.equal(res.body.data.user.password_hash, undefined);
  assert.equal(res.body.data.user.passwordHash, undefined);
  assert.equal(res.body.data.user.otp, undefined);
  assert.equal(res.body.data.user.otp_hash, undefined);

  // Attempt reuse should fail with 409
  const reuseRes = await postJson('/api/v1/auth/verify-email', {
    email: user.email,
    otp: issued.otp
  });
  assert.equal(reuseRes.status, 409);
  assert.equal(reuseRes.body.message, 'Email is already verified.');
});

test('HTTP: POST /api/v1/auth/resend-otp enforces cooldown and returns Retry-After', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  const user = await createTestUser();
  await issueVerificationOtp(user);

  const res = await postJson('/api/v1/auth/resend-otp', {
    email: user.email
  });

  assert.equal(res.status, 429);
  assert.equal(res.body.success, false);
  assert.ok(res.headers.get('retry-after'));
  assert.ok(Number(res.headers.get('retry-after')) >= 1);
  assert.ok(Number(res.headers.get('retry-after')) <= 60);
});

test('HTTP: Rate limiting headers are present on verification routes', async () => {
  const email = `ratelimit-${Date.now()}@example.com`;
  const res = await postJson('/api/v1/auth/verify-email', { email, otp: '123456' });

  assert.ok(res.headers.get('ratelimit-limit'));
  assert.ok(res.headers.get('ratelimit-remaining'));
  assert.ok(res.headers.get('ratelimit-reset'));
});
