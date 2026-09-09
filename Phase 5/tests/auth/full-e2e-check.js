const crypto = require('crypto');
const app = require('../../src/app');
const { closeDatabase, pool } = require('../../src/config/database');
const User = require('../../src/models/User');
const EmailOTP = require('../../src/models/EmailOTP');
const RefreshToken = require('../../src/models/RefreshToken');
const emailService = require('../../src/services/emailService');
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

  let testUserId = null;
  let sentOtp = null;

  // Intercept email sending to extract OTP for automated verification
  const originalSendVerificationOtp = emailService.sendVerificationOtp;
  emailService.sendVerificationOtp = async ({ to, firstName, otp, expiresInMinutes }) => {
    sentOtp = otp;
    return { messageId: 'e2e-mock' };
  };

  try {
    const email = `e2e-${Date.now()}-${crypto.randomBytes(3).toString('hex')}@example.com`;
    const password = 'StrongPassword!123';

    // 1. Register User
    const regRes = await request('/api/v1/auth/register', {
      method: 'POST',
      body: { firstName: 'E2E', lastName: 'Tester', email, password }
    });
    testUserId = regRes.body.data?.user?.id;

    // 2. Verify Email using intercepted OTP
    const verifyRes = await request('/api/v1/auth/verify-email', {
      method: 'POST',
      body: { email, otp: sentOtp }
    });

    // 3. Login
    const loginRes = await request('/api/v1/auth/login', {
      method: 'POST',
      body: { email, password }
    });
    const { accessToken: token1, refreshToken: refresh1 } = loginRes.body.data.tokens;

    // 4. Access /me profile
    const meRes = await request('/api/v1/auth/me', {
      headers: { Authorization: `Bearer ${token1}` }
    });

    // 5. Test Role Authorization (Customer should receive 403 on Admin Dashboard)
    const adminCustomerRes = await request('/api/v1/admin/dashboard', {
      headers: { Authorization: `Bearer ${token1}` }
    });

    // 6. Token Rotation
    const refreshRes = await request('/api/v1/auth/refresh', {
      method: 'POST',
      body: { refreshToken: refresh1 }
    });
    const { accessToken: token2, refreshToken: refresh2 } = refreshRes.body.data.tokens;

    // 7. Verify new access token works
    const me2Res = await request('/api/v1/auth/me', {
      headers: { Authorization: `Bearer ${token2}` }
    });

    // 8. Verify old refresh token is rejected (Reuse prevention)
    const reuseRes = await request('/api/v1/auth/refresh', {
      method: 'POST',
      body: { refreshToken: refresh1 }
    });

    // 9. Elevate user to ADMIN and verify access to /admin/dashboard
    await pool.query('UPDATE users SET role = "ADMIN" WHERE id = ?', [testUserId]);
    const adminLoginRes = await request('/api/v1/auth/login', {
      method: 'POST',
      body: { email, password }
    });
    const adminToken = adminLoginRes.body.data.tokens.accessToken;

    const adminDashboardRes = await request('/api/v1/admin/dashboard', {
      headers: { Authorization: `Bearer ${adminToken}` }
    });

    // 10. Logout
    const logoutRes = await request('/api/v1/auth/logout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: { refreshToken: refresh2 }
    });

    const isRevoked = await RefreshToken.findByTokenHash(hashToken(refresh2));

    console.log(
      JSON.stringify(
        {
          registration: { status: regRes.status, success: regRes.body.success, userId: testUserId },
          emailVerification: { status: verifyRes.status, success: verifyRes.body.success },
          login: { status: loginRes.status, success: loginRes.body.success },
          getMeProfile: {
            status: meRes.status,
            success: meRes.body.success,
            email: meRes.body.data?.user?.email,
            role: meRes.body.data?.user?.role
          },
          roleAuthForbiddenForCustomer: {
            status: adminCustomerRes.status,
            message: adminCustomerRes.body.message
          },
          tokenRotation: {
            status: refreshRes.status,
            success: refreshRes.body.success,
            newTokensIssued: refresh1 !== refresh2,
            newAccessTokenWorks: me2Res.status === 200,
            oldTokenReuseRejectedStatus: reuseRes.status
          },
          adminRoleGrantedAccess: {
            status: adminDashboardRes.status,
            success: adminDashboardRes.body.success,
            adminEmail: adminDashboardRes.body.data?.admin?.email,
            adminRole: adminDashboardRes.body.data?.admin?.role
          },
          logout: {
            status: logoutRes.status,
            success: logoutRes.body.success,
            tokenRevokedInDatabase: Boolean(isRevoked?.revoked_at)
          }
        },
        null,
        2
      )
    );
  } finally {
    emailService.sendVerificationOtp = originalSendVerificationOtp;
    if (testUserId) {
      await pool.query('DELETE FROM users WHERE id = ?', [testUserId]);
    }
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
    await closeDatabase();
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
