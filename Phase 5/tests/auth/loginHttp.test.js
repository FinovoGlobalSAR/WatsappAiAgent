const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const app = require('../../src/app');
const { pingDatabase, closeDatabase, pool } = require('../../src/config/database');
const User = require('../../src/models/User');
const RefreshToken = require('../../src/models/RefreshToken');
const { hashPassword } = require('../../src/utils/password');
const { hashToken, verifyAccessToken } = require('../../src/utils/jwt');

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

async function createVerifiedUser(status = 'ACTIVE') {
  const email = `login-http-${Date.now()}-${crypto.randomBytes(4).toString('hex')}@example.com`;
  const user = await User.create({
    firstName: 'Http',
    lastName: 'LoginTester',
    email,
    passwordHash
  });

  await pool.query(
    'UPDATE users SET email_verified_at = CURRENT_TIMESTAMP, status = ? WHERE id = ?',
    [status, user.id]
  );

  return User.findById(user.id);
}

async function createUnverifiedUser() {
  const email = `login-unverified-${Date.now()}-${crypto.randomBytes(4).toString('hex')}@example.com`;
  return User.create({
    firstName: 'Unverified',
    lastName: 'HttpUser',
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

test('HTTP: POST /api/v1/auth/login validates input and returns 400 with details', async () => {
  const res = await postJson('/api/v1/auth/login', { email: 'not-an-email', password: '' });
  assert.equal(res.status, 400);
  assert.equal(res.body.success, false);
  assert.ok(Array.isArray(res.body.errors));
  assert.ok(res.body.errors.some((e) => e.field === 'email'));
  assert.ok(res.body.errors.some((e) => e.field === 'password'));
});

test('HTTP: POST /api/v1/auth/login returns 401 generic message for unknown user', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  const res = await postJson('/api/v1/auth/login', {
    email: 'nonexistent-user@example.com',
    password: 'StrongPassword!123'
  });

  assert.equal(res.status, 401);
  assert.equal(res.body.success, false);
  assert.equal(res.body.message, 'Invalid email or password.');
});

test('HTTP: POST /api/v1/auth/login returns 401 generic message for invalid password', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  const user = await createVerifiedUser();
  const res = await postJson('/api/v1/auth/login', {
    email: user.email,
    password: 'IncorrectPassword!999'
  });

  assert.equal(res.status, 401);
  assert.equal(res.body.success, false);
  assert.equal(res.body.message, 'Invalid email or password.');
});

test('HTTP: POST /api/v1/auth/login returns 403 if email is not verified', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  const user = await createUnverifiedUser();
  const res = await postJson('/api/v1/auth/login', {
    email: user.email,
    password: 'StrongPassword!123'
  });

  assert.equal(res.status, 403);
  assert.equal(res.body.success, false);
  assert.equal(res.body.message, 'Email is not verified. Please verify your email before logging in.');
});

test('HTTP: POST /api/v1/auth/login returns 403 if account is suspended', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  const user = await createVerifiedUser('SUSPENDED');
  const res = await postJson('/api/v1/auth/login', {
    email: user.email,
    password: 'StrongPassword!123'
  });

  assert.equal(res.status, 403);
  assert.equal(res.body.success, false);
  assert.equal(res.body.message, 'This account is not active.');
});

test('HTTP: POST /api/v1/auth/login succeeds and returns valid JWT and refresh tokens', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  const user = await createVerifiedUser();
  const res = await postJson('/api/v1/auth/login', {
    email: user.email,
    password: 'StrongPassword!123'
  });

  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.message, 'Login successful.');

  // User payload
  assert.equal(res.body.data.user.id, user.id);
  assert.equal(res.body.data.user.email, user.email);
  assert.equal(res.body.data.user.emailVerified, true);
  assert.equal(res.body.data.user.status, 'ACTIVE');

  // Security: never return passwords or hashes
  assert.equal(res.body.data.user.password_hash, undefined);
  assert.equal(res.body.data.user.passwordHash, undefined);
  assert.equal(res.body.data.user.tokenHash, undefined);

  // Tokens payload
  const { tokens } = res.body.data;
  assert.ok(tokens.accessToken);
  assert.ok(tokens.refreshToken);
  assert.equal(tokens.tokenType, 'Bearer');
  assert.equal(tokens.expiresIn, 900);

  // Validate access token format and claims
  const decoded = verifyAccessToken(tokens.accessToken);
  assert.equal(decoded.sub, String(user.id));
  assert.equal(decoded.role, user.role);

  // Validate database has stored refresh token hash
  const tokenHash = hashToken(tokens.refreshToken);
  const dbRecord = await RefreshToken.findActiveByTokenHash(tokenHash);
  assert.ok(dbRecord);
  assert.equal(dbRecord.user_id, user.id);
});

test('HTTP: Rate limiting headers are present on login endpoint', async () => {
  const email = `ratelimit-login-${Date.now()}@example.com`;
  const res = await postJson('/api/v1/auth/login', { email, password: 'StrongPassword!123' });

  assert.ok(res.headers.get('ratelimit-limit'));
  assert.ok(res.headers.get('ratelimit-remaining'));
  assert.ok(res.headers.get('ratelimit-reset'));
});
