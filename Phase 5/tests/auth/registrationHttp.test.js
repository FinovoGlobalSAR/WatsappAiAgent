const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const app = require('../../src/app');
const { pingDatabase, closeDatabase, pool } = require('../../src/config/database');
const emailService = require('../../src/services/emailService');

let server;
let baseUrl;
let dbAvailable = false;

async function postJson(path, body) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await response.json().catch(() => null);
  return { status: response.status, headers: response.headers, body: data };
}

test.before(async () => {
  try {
    await pingDatabase();
    dbAvailable = true;
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

test('HTTP: POST /api/v1/auth/register rejects missing fields and invalid inputs with 400', async () => {
  // Empty payload
  const emptyRes = await postJson('/api/v1/auth/register', {});
  assert.equal(emptyRes.status, 400);
  assert.equal(emptyRes.body.success, false);
  assert.ok(Array.isArray(emptyRes.body.errors));
  assert.ok(emptyRes.body.errors.length >= 4);

  // Weak password (too short, missing special char)
  const weakRes = await postJson('/api/v1/auth/register', {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'weak'
  });
  assert.equal(weakRes.status, 400);
  assert.equal(weakRes.body.success, false);
  assert.ok(weakRes.body.errors.some((d) => d.field === 'password'));

  // Invalid email format
  const badEmailRes = await postJson('/api/v1/auth/register', {
    firstName: 'John',
    lastName: 'Doe',
    email: 'not-an-email',
    password: 'StrongPassword!123'
  });
  assert.equal(badEmailRes.status, 400);
  assert.equal(badEmailRes.body.success, false);
  assert.ok(badEmailRes.body.errors.some((d) => d.field === 'email'));
});

test('HTTP: POST /api/v1/auth/register creates user and returns 201 with sanitized profile', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  t.mock.method(emailService, 'sendVerificationOtp', async () => ({ messageId: 'mock-test-id' }));

  const email = `http-reg-${Date.now()}-${crypto.randomBytes(3).toString('hex')}@example.com`;
  const res = await postJson('/api/v1/auth/register', {
    firstName: 'Alice',
    lastName: 'Smith',
    email,
    password: 'StrongPassword!123'
  });

  assert.equal(res.status, 201);
  assert.equal(res.body.success, true);
  assert.ok(res.body.data.user.id);
  assert.equal(res.body.data.user.email, email);
  assert.equal(res.body.data.user.role, 'CUSTOMER');
  assert.equal(res.body.data.user.emailVerified, false);
  assert.equal(res.body.data.user.password_hash, undefined);
  assert.equal(res.body.data.user.passwordHash, undefined);

  // Attempt duplicate registration
  const dupRes = await postJson('/api/v1/auth/register', {
    firstName: 'Alice',
    lastName: 'Smith',
    email,
    password: 'StrongPassword!123'
  });
  assert.equal(dupRes.status, 409);
  assert.equal(dupRes.body.success, false);
  assert.equal(dupRes.body.message, 'An account with this email already exists.');

  // Cleanup
  await pool.query('DELETE FROM users WHERE id = ?', [res.body.data.user.id]);
});
