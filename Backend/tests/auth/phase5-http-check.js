const crypto = require('crypto');
const app = require('../../src/app');
const { closeDatabase, pool } = require('../../src/config/database');
const User = require('../../src/models/User');
const RefreshToken = require('../../src/models/RefreshToken');
const { hashPassword } = require('../../src/utils/password');
const { hashToken } = require('../../src/utils/jwt');

let base = `http://127.0.0.1:${process.env.PORT || 5000}`;
let server = null;

async function post(path, body) {
  const response = await fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return { status: response.status, body: await response.json() };
}

(async () => {
  let isRunning = false;
  try {
    const probe = await fetch(`${base}/health`, { signal: AbortSignal.timeout(1000) });
    if (probe.ok) isRunning = true;
  } catch {
    isRunning = false;
  }

  if (!isRunning) {
    await new Promise((resolve) => {
      server = app.listen(0, '127.0.0.1', () => {
        const addr = server.address();
        base = `http://127.0.0.1:${addr.port}`;
        resolve();
      });
    });
  }

  try {
    // 1. Invalid input check
    const badInput = await post('/api/v1/auth/login', { email: 'bad-email', password: '' });

    // 2. Non-existent user check
    const missingUser = await post('/api/v1/auth/login', {
      email: 'nonexistent@example.com',
      password: 'StrongPassword!123'
    });

    // 3. Create verified test user
    const password = 'StrongPassword!123';
    const passwordHash = await hashPassword(password);
    const email = `phase5-probe-${Date.now()}-${crypto.randomBytes(3).toString('hex')}@example.com`;
    const user = await User.create({
      firstName: 'Phase5',
      lastName: 'Tester',
      email,
      passwordHash
    });

    await pool.query(
      'UPDATE users SET email_verified_at = CURRENT_TIMESTAMP WHERE id = ?',
      [user.id]
    );

    // 4. Successful login
    const loginResult = await post('/api/v1/auth/login', { email, password });

    // 5. Verify hashed refresh token stored in MySQL
    let dbTokenFound = false;
    if (loginResult.body?.data?.tokens?.refreshToken) {
      const tokenHash = hashToken(loginResult.body.data.tokens.refreshToken);
      const row = await RefreshToken.findActiveByTokenHash(tokenHash);
      dbTokenFound = Boolean(row && row.user_id === user.id);
    }

    // Clean up
    await pool.query('DELETE FROM users WHERE id = ?', [user.id]);

    console.log(JSON.stringify({
      badInput,
      missingUser,
      successfulLogin: {
        status: loginResult.status,
        success: loginResult.body.success,
        message: loginResult.body.message,
        hasAccessToken: Boolean(loginResult.body?.data?.tokens?.accessToken),
        hasRefreshToken: Boolean(loginResult.body?.data?.tokens?.refreshToken),
        userEmailVerified: loginResult.body?.data?.user?.emailVerified,
        userPasswordHashExposed: Boolean(loginResult.body?.data?.user?.password_hash),
        dbRefreshTokenHashedAndStored: dbTokenFound
      }
    }, null, 2));
  } finally {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
    await closeDatabase();
  }
})().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
