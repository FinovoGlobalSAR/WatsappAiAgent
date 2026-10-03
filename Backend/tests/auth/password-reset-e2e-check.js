const crypto = require('crypto');
const app = require('../../src/app');
const { closeDatabase, pool } = require('../../src/config/database');
const User = require('../../src/models/User');
const RefreshToken = require('../../src/models/RefreshToken');
const PasswordResetOTP = require('../../src/models/PasswordResetOTP');
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
  let sentResetOtp = null;

  const originalSendReset = emailService.sendPasswordResetOtp;
  emailService.sendPasswordResetOtp = async ({ to, firstName, otp, expiresInMinutes }) => {
    sentResetOtp = otp;
    return { messageId: 'mock-pwd-reset-e2e' };
  };

  try {
    const email = `pwd-e2e-${Date.now()}-${crypto.randomBytes(3).toString('hex')}@example.com`;
    const initialPassword = 'InitialPassword!123';
    const newPassword = 'BrandNewPassword!999';

    // 1. Create and verify user
    const { hashPassword } = require('../../src/utils/password');
    const pwdHash = await hashPassword(initialPassword);
    const user = await User.create({
      firstName: 'ResetE2E',
      lastName: 'User',
      email,
      passwordHash: pwdHash
    });
    testUserId = user.id;
    await pool.query('UPDATE users SET email_verified_at = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);

    // 2. User logs in (generating active refresh token session)
    const login1 = await request('/api/v1/auth/login', {
      method: 'POST',
      body: { email, password: initialPassword }
    });
    const oldRefreshToken = login1.body.data.tokens.refreshToken;

    // 3. User requests password reset
    const forgotRes = await request('/api/v1/auth/forgot-password', {
      method: 'POST',
      body: { email }
    });

    // 4. User verifies OTP received in email
    const verifyOtpRes = await request('/api/v1/auth/verify-reset-otp', {
      method: 'POST',
      body: { email, otp: sentResetOtp }
    });
    const resetToken = verifyOtpRes.body.data.resetToken;

    // 5. User submits new password
    const resetRes = await request('/api/v1/auth/reset-password', {
      method: 'POST',
      body: { email, resetToken, newPassword }
    });

    // 6. Verify old session refresh token is now revoked
    const oldTokenDb = await RefreshToken.findByTokenHash(hashToken(oldRefreshToken));

    // 7. Verify login with old password fails
    const oldLoginRes = await request('/api/v1/auth/login', {
      method: 'POST',
      body: { email, password: initialPassword }
    });

    // 8. Verify login with new password succeeds
    const newLoginRes = await request('/api/v1/auth/login', {
      method: 'POST',
      body: { email, password: newPassword }
    });

    console.log(
      JSON.stringify(
        {
          forgotPassword: { status: forgotRes.status, success: forgotRes.body.success },
          verifyResetOtp: { status: verifyOtpRes.status, success: verifyOtpRes.body.success, tokenReceived: Boolean(resetToken) },
          resetPassword: { status: resetRes.status, success: resetRes.body.success },
          sessionRevocation: { oldRefreshTokenRevokedInDB: Boolean(oldTokenDb?.revoked_at) },
          oldPasswordRejected: { status: oldLoginRes.status, message: oldLoginRes.body.message },
          newPasswordAccepted: { status: newLoginRes.status, success: newLoginRes.body.success, newAccessToken: Boolean(newLoginRes.body.data?.tokens?.accessToken) }
        },
        null,
        2
      )
    );
  } finally {
    emailService.sendPasswordResetOtp = originalSendReset;
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
