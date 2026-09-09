const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const app = require('../../src/app');
const { pingDatabase, closeDatabase, pool } = require('../../src/config/database');
const User = require('../../src/models/User');
const RefreshToken = require('../../src/models/RefreshToken');
const { hashPassword } = require('../../src/utils/password');
const { hashToken } = require('../../src/utils/jwt');

let server;
let baseUrl;
let dbAvailable = false;
let passwordHash;

async function requestJson(path, { method = 'GET', headers = {}, body = null } = {}) {
  const options = {
    method,
    headers: { ...headers }
  };
  if (body !== null) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${baseUrl}${path}`, options);
  const data = await response.json().catch(() => null);
  return { status: response.status, headers: response.headers, body: data };
}

async function createVerifiedUser(status = 'ACTIVE') {
  const email = `jwt-http-${Date.now()}-${crypto.randomBytes(4).toString('hex')}@example.com`;
  const user = await User.create({
    firstName: 'Jwt',
    lastName: 'HttpUser',
    email,
    passwordHash
  });

  await pool.query(
    'UPDATE users SET email_verified_at = CURRENT_TIMESTAMP, status = ? WHERE id = ?',
    [status, user.id]
  );

  return User.findById(user.id);
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

test('HTTP: GET /api/v1/auth/me rejects unauthenticated requests', async () => {
  const res = await requestJson('/api/v1/auth/me');
  assert.equal(res.status, 401);
  assert.equal(res.body.success, false);
});

test('HTTP: GET /api/v1/auth/me returns authenticated user profile', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  const user = await createVerifiedUser();
  const loginRes = await requestJson('/api/v1/auth/login', {
    method: 'POST',
    body: { email: user.email, password: 'StrongPassword!123' }
  });

  const { accessToken } = loginRes.body.data.tokens;

  const meRes = await requestJson('/api/v1/auth/me', {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  assert.equal(meRes.status, 200);
  assert.equal(meRes.body.success, true);
  assert.equal(meRes.body.data.user.id, user.id);
  assert.equal(meRes.body.data.user.email, user.email);
  assert.equal(meRes.body.data.user.role, 'CUSTOMER');
  assert.equal(meRes.body.data.user.password_hash, undefined);
  assert.equal(meRes.body.data.user.passwordHash, undefined);
});

test('HTTP: POST /api/v1/auth/refresh rotates token and rejects old token', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  const user = await createVerifiedUser();
  const loginRes = await requestJson('/api/v1/auth/login', {
    method: 'POST',
    body: { email: user.email, password: 'StrongPassword!123' }
  });

  const initialRefreshToken = loginRes.body.data.tokens.refreshToken;

  // Refresh token
  const refreshRes = await requestJson('/api/v1/auth/refresh', {
    method: 'POST',
    body: { refreshToken: initialRefreshToken }
  });

  assert.equal(refreshRes.status, 200);
  assert.equal(refreshRes.body.success, true);
  assert.ok(refreshRes.body.data.tokens.accessToken);
  assert.ok(refreshRes.body.data.tokens.refreshToken);
  assert.notEqual(refreshRes.body.data.tokens.refreshToken, initialRefreshToken);

  // New access token works on /me
  const meRes = await requestJson('/api/v1/auth/me', {
    headers: { Authorization: `Bearer ${refreshRes.body.data.tokens.accessToken}` }
  });
  assert.equal(meRes.status, 200);

  // Reusing the old refresh token should be rejected (401 REFRESH_TOKEN_REVOKED)
  const reusedRes = await requestJson('/api/v1/auth/refresh', {
    method: 'POST',
    body: { refreshToken: initialRefreshToken }
  });
  assert.equal(reusedRes.status, 401);
  assert.equal(reusedRes.body.success, false);
});

test('HTTP: POST /api/v1/auth/logout revokes refresh token successfully', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  const user = await createVerifiedUser();
  const loginRes = await requestJson('/api/v1/auth/login', {
    method: 'POST',
    body: { email: user.email, password: 'StrongPassword!123' }
  });

  const { accessToken, refreshToken } = loginRes.body.data.tokens;

  // Call logout with Authorization and refreshToken
  const logoutRes = await requestJson('/api/v1/auth/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: { refreshToken }
  });

  assert.equal(logoutRes.status, 200);
  assert.equal(logoutRes.body.success, true);
  assert.equal(logoutRes.body.message, 'Logout successful.');

  // Subsequent refresh should fail
  const refreshRes = await requestJson('/api/v1/auth/refresh', {
    method: 'POST',
    body: { refreshToken }
  });
  assert.equal(refreshRes.status, 401);

  // Database check: token is revoked
  const tokenHash = hashToken(refreshToken);
  const dbRecord = await RefreshToken.findByTokenHash(tokenHash);
  assert.ok(dbRecord.revoked_at);
});

test('HTTP: Rate limiting headers are present on /refresh endpoint', async () => {
  const res = await requestJson('/api/v1/auth/refresh', {
    method: 'POST',
    body: { refreshToken: 'dummy-token' }
  });

  assert.ok(res.headers.get('ratelimit-limit'));
  assert.ok(res.headers.get('ratelimit-remaining'));
  assert.ok(res.headers.get('ratelimit-reset'));
});
