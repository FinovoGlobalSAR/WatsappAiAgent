const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const jwt = require('jsonwebtoken');
const env = require('../../src/config/env');
const { pingDatabase, closeDatabase, pool } = require('../../src/config/database');
const User = require('../../src/models/User');
const RefreshToken = require('../../src/models/RefreshToken');
const { hashPassword } = require('../../src/utils/password');
const {
  hashToken,
  generateAccessToken,
  generateRefreshToken
} = require('../../src/utils/jwt');
const { requireAuth } = require('../../src/middleware/authMiddleware');
const authService = require('../../src/services/authService');
const { AppError } = require('../../src/utils/errors');

let dbAvailable = false;
let passwordHash;

async function createVerifiedUser(status = 'ACTIVE') {
  const email = `phase6-unit-${Date.now()}-${crypto.randomBytes(4).toString('hex')}@example.com`;
  const user = await User.create({
    firstName: 'Phase6',
    lastName: 'Tester',
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
});

test.after(async () => {
  await closeDatabase();
});

test('requireAuth middleware rejects missing or invalid authorization headers', async () => {
  const reqNoHeader = { headers: {} };
  await new Promise((resolve) => {
    requireAuth(reqNoHeader, {}, (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.statusCode, 401);
      assert.equal(err.code, 'UNAUTHORIZED');
      resolve();
    });
  });

  const reqBadFormat = { headers: { authorization: 'Basic 12345' } };
  await new Promise((resolve) => {
    requireAuth(reqBadFormat, {}, (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.statusCode, 401);
      assert.equal(err.code, 'UNAUTHORIZED');
      resolve();
    });
  });

  const reqMalformedToken = { headers: { authorization: 'Bearer not-a-jwt' } };
  await new Promise((resolve) => {
    requireAuth(reqMalformedToken, {}, (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.statusCode, 401);
      assert.equal(err.code, 'TOKEN_INVALID');
      resolve();
    });
  });
});

test('requireAuth rejects expired access token with TOKEN_EXPIRED', async () => {
  const expiredToken = jwt.sign(
    { sub: '1', role: 'CUSTOMER' },
    env.jwt.accessSecret,
    { expiresIn: '-10s', algorithm: 'HS256' }
  );

  const req = { headers: { authorization: `Bearer ${expiredToken}` } };
  await new Promise((resolve) => {
    requireAuth(req, {}, (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.statusCode, 401);
      assert.equal(err.code, 'TOKEN_EXPIRED');
      resolve();
    });
  });
});

test('requireAuth attaches user and calls next on valid access token', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  const user = await createVerifiedUser();
  const token = generateAccessToken(user);

  const req = { headers: { authorization: `Bearer ${token}` } };
  await new Promise((resolve, reject) => {
    requireAuth(req, {}, (err) => {
      if (err) return reject(err);
      assert.ok(req.user);
      assert.equal(req.user.id, user.id);
      assert.equal(req.user.email, user.email);
      assert.equal(req.user.role, 'CUSTOMER');
      assert.equal(req.user.emailVerified, true);
      assert.equal(req.user.password_hash, undefined);
      resolve();
    });
  });
});

test('refreshTokens rotates refresh token and invalidates old token', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  const user = await createVerifiedUser();
  const loginResult = await authService.login({
    email: user.email,
    password: 'StrongPassword!123'
  });

  const oldRefreshToken = loginResult.tokens.refreshToken;
  const oldTokenHash = hashToken(oldRefreshToken);

  // First refresh: should succeed and rotate tokens
  const refreshResult = await authService.refreshTokens({ refreshToken: oldRefreshToken });
  assert.ok(refreshResult.tokens.accessToken);
  assert.ok(refreshResult.tokens.refreshToken);
  assert.notEqual(refreshResult.tokens.refreshToken, oldRefreshToken);

  // Check database: old refresh token is marked revoked
  const oldRecord = await RefreshToken.findByTokenHash(oldTokenHash);
  assert.ok(oldRecord.revoked_at);

  // Check database: new refresh token is active
  const newRecord = await RefreshToken.findActiveByTokenHash(hashToken(refreshResult.tokens.refreshToken));
  assert.ok(newRecord);
  assert.equal(newRecord.user_id, user.id);

  // Second refresh with old token: should be rejected as revoked (triggering reuse detection)
  await assert.rejects(
    () => authService.refreshTokens({ refreshToken: oldRefreshToken }),
    (err) => err instanceof AppError && err.statusCode === 401 && err.code === 'REFRESH_TOKEN_REVOKED'
  );

  // Reuse detection should have revoked the newly rotated token as well
  const afterReuseCheck = await RefreshToken.findActiveByTokenHash(hashToken(refreshResult.tokens.refreshToken));
  assert.equal(afterReuseCheck, null);
});

test('logout revokes specific refresh token and all devices if requested', async (t) => {
  if (!dbAvailable) return t.skip('MySQL not available');

  const user = await createVerifiedUser();
  const session1 = await authService.login({ email: user.email, password: 'StrongPassword!123' });
  const session2 = await authService.login({ email: user.email, password: 'StrongPassword!123' });

  const hash1 = hashToken(session1.tokens.refreshToken);
  const hash2 = hashToken(session2.tokens.refreshToken);

  // Logout session 1 specifically
  await authService.logout({ refreshToken: session1.tokens.refreshToken });
  assert.equal(await RefreshToken.findActiveByTokenHash(hash1), null);
  assert.ok(await RefreshToken.findActiveByTokenHash(hash2)); // session 2 still active

  // Logout all devices
  await authService.logout({ userId: user.id, allDevices: true });
  assert.equal(await RefreshToken.findActiveByTokenHash(hash2), null);
});
