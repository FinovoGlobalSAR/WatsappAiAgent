const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const app = require('../../src/app');
const { pingDatabase, closeDatabase, pool } = require('../../src/config/database');
const User = require('../../src/models/User');
const { hashPassword } = require('../../src/utils/password');
const { generateAccessToken } = require('../../src/utils/jwt');

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

async function createVerifiedUser(role = 'CUSTOMER') {
  const email = `role-http-${Date.now()}-${crypto.randomBytes(4).toString('hex')}@example.com`;
  const user = await User.create({
    firstName: 'Role',
    lastName: role,
    email,
    passwordHash,
    role,
    status: 'ACTIVE'
  });

  await pool.query(
    'UPDATE users SET email_verified_at = CURRENT_TIMESTAMP, role = ?, status = "ACTIVE" WHERE id = ?',
    [role, user.id]
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

test('HTTP: GET /api/v1/admin/dashboard rejects unauthenticated request with 401', async () => {
  const res = await requestJson('/api/v1/admin/dashboard');
  assert.equal(res.status, 401);
  assert.equal(res.body.success, false);
  assert.equal(res.body.message, 'Authentication required. Missing or malformed authorization header.');
});

test('HTTP: GET /api/v1/admin/dashboard rejects CUSTOMER role with 403 FORBIDDEN', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  const customer = await createVerifiedUser('CUSTOMER');
  const token = generateAccessToken(customer);

  const res = await requestJson('/api/v1/admin/dashboard', {
    headers: { Authorization: `Bearer ${token}` }
  });

  assert.equal(res.status, 403);
  assert.equal(res.body.success, false);
  assert.equal(res.body.message, 'Access forbidden. You do not have the required permissions.');
});

test('HTTP: GET /api/v1/admin/dashboard allows ADMIN role with 200 OK', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  const admin = await createVerifiedUser('ADMIN');
  const token = generateAccessToken(admin);

  const res = await requestJson('/api/v1/admin/dashboard', {
    headers: { Authorization: `Bearer ${token}` }
  });

  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.admin.id, admin.id);
  assert.equal(res.body.data.admin.role, 'ADMIN');
});

test('HTTP: GET /api/v1/admin/users returns sanitized user list for ADMIN', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  const admin = await createVerifiedUser('ADMIN');
  const token = generateAccessToken(admin);

  const res = await requestJson('/api/v1/admin/users', {
    headers: { Authorization: `Bearer ${token}` }
  });

  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  assert.ok(Array.isArray(res.body.data.users));
  assert.ok(res.body.data.users.length > 0);

  // Check sanitization (no passwords leaked)
  for (const u of res.body.data.users) {
    assert.equal(u.password_hash, undefined);
    assert.equal(u.passwordHash, undefined);
    assert.ok(u.id);
    assert.ok(u.email);
    assert.ok(u.role);
  }
});
