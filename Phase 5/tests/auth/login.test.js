const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { pingDatabase, closeDatabase, pool } = require('../../src/config/database');
const User = require('../../src/models/User');
const RefreshToken = require('../../src/models/RefreshToken');
const { hashPassword } = require('../../src/utils/password');
const {
  hashToken,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
} = require('../../src/utils/jwt');
const { validateLogin } = require('../../src/validators/authValidator');
const authService = require('../../src/services/authService');
const { AppError } = require('../../src/utils/errors');

let dbAvailable = false;
let passwordHash;

async function createVerifiedUser(status = 'ACTIVE') {
  const email = `login-unit-${Date.now()}-${crypto.randomBytes(4).toString('hex')}@example.com`;
  const user = await User.create({
    firstName: 'Login',
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

async function createUnverifiedUser() {
  const email = `unverified-${Date.now()}-${crypto.randomBytes(4).toString('hex')}@example.com`;
  return User.create({
    firstName: 'Unverified',
    lastName: 'User',
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
});

test.after(async () => {
  await closeDatabase();
});

test('login validation normalizes email and detects missing fields', () => {
  const empty = validateLogin({});
  assert.ok(empty.errors.some((e) => e.field === 'email'));
  assert.ok(empty.errors.some((e) => e.field === 'password'));

  const malformed = validateLogin({ email: 'not-an-email', password: 'Password!123' });
  assert.ok(malformed.errors.some((e) => e.field === 'email'));

  const valid = validateLogin({ email: ' USER@Example.COM ', password: 'Password!123' });
  assert.equal(valid.errors.length, 0);
  assert.equal(valid.value.email, 'user@example.com');
  assert.equal(valid.value.password, 'Password!123');
});

test('JWT utilities generate and verify tokens with standard claims', () => {
  const mockUser = { id: 42, role: 'CUSTOMER' };
  const accessToken = generateAccessToken(mockUser);
  const decodedAccess = verifyAccessToken(accessToken);

  assert.equal(decodedAccess.sub, '42');
  assert.equal(decodedAccess.role, 'CUSTOMER');
  assert.ok(decodedAccess.exp);
  assert.ok(decodedAccess.iat);

  const { token, tokenHash, expiresAt } = generateRefreshToken(mockUser);
  assert.notEqual(token, tokenHash);
  assert.equal(hashToken(token), tokenHash);
  assert.ok(expiresAt instanceof Date);

  const decodedRefresh = verifyRefreshToken(token);
  assert.equal(decodedRefresh.sub, '42');
  assert.equal(decodedRefresh.type, 'refresh');
});

test('RefreshToken model stores token hash, finds active, and revokes', async (t) => {
  if (!dbAvailable) return t.skip('MySQL is not available');

  const user = await createVerifiedUser();
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const insertId = await RefreshToken.create({ userId: user.id, tokenHash, expiresAt });
  assert.ok(insertId > 0);

  // Raw token is not stored in DB
  const [dbRows] = await pool.query('SELECT * FROM refresh_tokens WHERE id = ?', [insertId]);
  assert.equal(dbRows[0].token_hash, tokenHash);
  assert.notEqual(dbRows[0].token_hash, rawToken);

  const found = await RefreshToken.findActiveByTokenHash(tokenHash);
  assert.ok(found);
  assert.equal(found.user_id, user.id);
  assert.equal(found.revoked_at, null);

  // Revoke token
  await RefreshToken.revokeByTokenHash(tokenHash);
  const afterRevocation = await RefreshToken.findActiveByTokenHash(tokenHash);
  assert.equal(afterRevocation, null);

  const rawRow = await RefreshToken.findByTokenHash(tokenHash);
  assert.ok(rawRow.revoked_at);
});

test('login rejects unknown email with generic 401', async (t) => {
  if (!dbAvailable) return t.skip('MySQL is not available');

  await assert.rejects(
    () => authService.login({ email: 'unknown-phase5-user@example.com', password: 'StrongPassword!123' }),
    (err) => err instanceof AppError && err.statusCode === 401 && err.code === 'INVALID_CREDENTIALS'
  );
});

test('login rejects incorrect password with generic 401', async (t) => {
  if (!dbAvailable) return t.skip('MySQL is not available');

  const user = await createVerifiedUser();
  await assert.rejects(
    () => authService.login({ email: user.email, password: 'WrongPassword!999' }),
    (err) => err instanceof AppError && err.statusCode === 401 && err.code === 'INVALID_CREDENTIALS'
  );
});

test('login rejects unverified email with 403 EMAIL_NOT_VERIFIED', async (t) => {
  if (!dbAvailable) return t.skip('MySQL is not available');

  const user = await createUnverifiedUser();
  await assert.rejects(
    () => authService.login({ email: user.email, password: 'StrongPassword!123' }),
    (err) => err instanceof AppError && err.statusCode === 403 && err.code === 'EMAIL_NOT_VERIFIED'
  );
});

test('login rejects non-active user with 403 ACCOUNT_NOT_ACTIVE', async (t) => {
  if (!dbAvailable) return t.skip('MySQL is not available');

  const user = await createVerifiedUser('SUSPENDED');
  await assert.rejects(
    () => authService.login({ email: user.email, password: 'StrongPassword!123' }),
    (err) => err instanceof AppError && err.statusCode === 403 && err.code === 'ACCOUNT_NOT_ACTIVE'
  );
});

test('login succeeds for verified active user and persists hashed refresh token', async (t) => {
  if (!dbAvailable) return t.skip('MySQL is not available');

  const user = await createVerifiedUser();
  const result = await authService.login({
    email: user.email,
    password: 'StrongPassword!123'
  });

  assert.equal(result.user.id, user.id);
  assert.equal(result.user.email, user.email);
  assert.equal(result.user.emailVerified, true);
  assert.equal(result.user.status, 'ACTIVE');
  assert.equal(result.user.password_hash, undefined);
  assert.equal(result.user.passwordHash, undefined);

  assert.ok(result.tokens.accessToken);
  assert.ok(result.tokens.refreshToken);
  assert.equal(result.tokens.tokenType, 'Bearer');
  assert.equal(result.tokens.expiresIn, 900);

  // Validate that refresh token was hashed and persisted in MySQL
  const tokenHash = hashToken(result.tokens.refreshToken);
  const activeToken = await RefreshToken.findActiveByTokenHash(tokenHash);
  assert.ok(activeToken);
  assert.equal(activeToken.user_id, user.id);
});
