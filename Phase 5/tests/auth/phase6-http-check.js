const crypto = require('crypto');
const app = require('../../src/app');
const { closeDatabase, pool } = require('../../src/config/database');
const User = require('../../src/models/User');
const RefreshToken = require('../../src/models/RefreshToken');
const { hashPassword } = require('../../src/utils/password');
const { hashToken } = require('../../src/utils/jwt');

let base = `http://127.0.0.1:${process.env.PORT || 5000}`;
let server = null;

async function request(path, { method = 'GET', headers = {}, body = null } = {}) {
  const options = { method, headers: { ...headers } };
  if (body !== null) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }
  const response = await fetch(`${base}${path}`, options);
  return { status: response.status, body: await response.json().catch(() => null) };
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
    // 1. Create a verified user for Phase 6 test
    const password = 'StrongPassword!123';
    const passwordHash = await hashPassword(password);
    const email = `phase6-probe-${Date.now()}-${crypto.randomBytes(3).toString('hex')}@example.com`;
    const user = await User.create({
      firstName: 'Phase6',
      lastName: 'ProbeUser',
      email,
      passwordHash
    });

    await pool.query(
      'UPDATE users SET email_verified_at = CURRENT_TIMESTAMP WHERE id = ?',
      [user.id]
    );

    // 2. Login to get initial tokens
    const loginRes = await request('/api/v1/auth/login', {
      method: 'POST',
      body: { email, password }
    });

    const token1 = loginRes.body.data.tokens.accessToken;
    const refresh1 = loginRes.body.data.tokens.refreshToken;

    // 3. Test GET /me with Bearer token
    const meRes = await request('/api/v1/auth/me', {
      headers: { Authorization: `Bearer ${token1}` }
    });

    // 4. Test POST /refresh to rotate tokens
    const refreshRes = await request('/api/v1/auth/refresh', {
      method: 'POST',
      body: { refreshToken: refresh1 }
    });

    const token2 = refreshRes.body.data.tokens.accessToken;
    const refresh2 = refreshRes.body.data.tokens.refreshToken;

    // 5. Verify new access token on /me
    const me2Res = await request('/api/v1/auth/me', {
      headers: { Authorization: `Bearer ${token2}` }
    });

    // 6. Verify old refresh token is now rejected (rotation / reuse prevention)
    const reuseRes = await request('/api/v1/auth/refresh', {
      method: 'POST',
      body: { refreshToken: refresh1 }
    });

    // 7. Test POST /logout
    const logoutRes = await request('/api/v1/auth/logout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token2}` },
      body: { refreshToken: refresh2 }
    });

    // 8. Verify refresh token is revoked in database
    const dbRecord = await RefreshToken.findByTokenHash(hashToken(refresh2));

    // Cleanup
    await pool.query('DELETE FROM users WHERE id = ?', [user.id]);

    console.log(JSON.stringify({
      login: { status: loginRes.status, success: loginRes.body.success },
      getMe: {
        status: meRes.status,
        success: meRes.body.success,
        userId: meRes.body.data?.user?.id,
        email: meRes.body.data?.user?.email,
        role: meRes.body.data?.user?.role
      },
      tokenRotation: {
        status: refreshRes.status,
        success: refreshRes.body.success,
        tokensRotated: refresh1 !== refresh2,
        newAccessTokenWorks: me2Res.status === 200,
        oldTokenRejectedStatus: reuseRes.status
      },
      logout: {
        status: logoutRes.status,
        success: logoutRes.body.success,
        tokenMarkedRevokedInDB: Boolean(dbRecord?.revoked_at)
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
