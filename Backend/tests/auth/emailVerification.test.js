const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { pingDatabase, closeDatabase, pool } = require('../../src/config/database');
const User = require('../../src/models/User');
const EmailOTP = require('../../src/models/EmailOTP');
const { hashPassword } = require('../../src/utils/password');
const { hashOtp, OTP_MAX_ATTEMPTS } = require('../../src/utils/otp');
const { issueVerificationOtp } = require('../../src/services/otpService');
const authService = require('../../src/services/authService');
const { AppError } = require('../../src/utils/errors');

let dbAvailable = false;
let passwordHash;

async function createUnverifiedUser() {
  const email = `phase4-${Date.now()}-${crypto.randomBytes(4).toString('hex')}@example.com`;
  return User.create({
    firstName: 'Phase',
    lastName: 'Four',
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

test('invalid OTP is rejected, hashed at rest, and attempt-limited', async (t) => {
  if (!dbAvailable) {
    t.skip('MySQL is not available');
    return;
  }

  const user = await createUnverifiedUser();
  const otpHash = await hashOtp('123456');
  await EmailOTP.create({
    userId: user.id,
    otpHash,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    maxAttempts: OTP_MAX_ATTEMPTS
  });

  const [storedRows] = await pool.query(
    'SELECT otp_hash, attempts FROM email_verification_otps WHERE user_id = ? ORDER BY id DESC LIMIT 1',
    [user.id]
  );
  assert.notEqual(storedRows[0].otp_hash, '123456');
  assert.equal(storedRows[0].attempts, 0);

  for (let i = 0; i < OTP_MAX_ATTEMPTS; i += 1) {
    await assert.rejects(
      () => authService.verifyEmail({ email: user.email, otp: '000000' }),
      (error) => error instanceof AppError && error.code === 'OTP_INVALID'
    );
  }

  await assert.rejects(
    () => authService.verifyEmail({ email: user.email, otp: '123456' }),
    (error) => error instanceof AppError && error.code === 'OTP_ATTEMPTS_EXCEEDED'
  );
});

test('expired OTP cannot be used', async (t) => {
  if (!dbAvailable) {
    t.skip('MySQL is not available');
    return;
  }

  const user = await createUnverifiedUser();
  const otpHash = await hashOtp('123456');
  await EmailOTP.create({
    userId: user.id,
    otpHash,
    expiresAt: new Date(Date.now() - 1000),
    maxAttempts: OTP_MAX_ATTEMPTS
  });

  await assert.rejects(
    () => authService.verifyEmail({ email: user.email, otp: '123456' }),
    (error) => error instanceof AppError && error.code === 'OTP_EXPIRED'
  );
});

test('successful verification marks email verified and prevents OTP reuse', async (t) => {
  if (!dbAvailable) {
    t.skip('MySQL is not available');
    return;
  }

  const user = await createUnverifiedUser();
  const issued = await issueVerificationOtp(user);
  const verified = await authService.verifyEmail({ email: user.email, otp: issued.otp });

  assert.equal(verified.emailVerified, true);
  assert.equal(verified.email, user.email);

  await assert.rejects(
    () => authService.verifyEmail({ email: user.email, otp: issued.otp }),
    (error) => error instanceof AppError && error.code === 'EMAIL_ALREADY_VERIFIED'
  );
});

test('resend cooldown and previous OTP invalidation work', async (t) => {
  if (!dbAvailable) {
    t.skip('MySQL is not available');
    return;
  }

  const user = await createUnverifiedUser();
  const first = await issueVerificationOtp(user);

  await assert.rejects(
    () => issueVerificationOtp(user),
    (error) => error instanceof AppError && error.code === 'OTP_RESEND_COOLDOWN'
  );

  await pool.query(
    'UPDATE email_verification_otps SET created_at = DATE_SUB(UTC_TIMESTAMP(), INTERVAL 2 MINUTE) WHERE id = ?',
    [first.otpId]
  );

  const second = await issueVerificationOtp(user);
  assert.notEqual(second.otpId, first.otpId);

  await assert.rejects(
    () => authService.verifyEmail({ email: user.email, otp: first.otp }),
    (error) => error instanceof AppError && error.code === 'OTP_INVALID'
  );

  const verified = await authService.verifyEmail({ email: user.email, otp: second.otp });
  assert.equal(verified.emailVerified, true);
});

test('already verified accounts cannot request another OTP', async (t) => {
  if (!dbAvailable) {
    t.skip('MySQL is not available');
    return;
  }

  const user = await createUnverifiedUser();
  const issued = await issueVerificationOtp(user);
  await authService.verifyEmail({ email: user.email, otp: issued.otp });

  await assert.rejects(
    () => authService.resendOtp({ email: user.email }),
    (error) => error instanceof AppError && error.code === 'EMAIL_ALREADY_VERIFIED'
  );
});
