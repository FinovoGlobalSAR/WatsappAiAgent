const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 12;

function validateRegistration(body = {}) {
  const errors = [];
  const firstName = typeof body.firstName === 'string' ? body.firstName.trim() : '';
  const lastName = typeof body.lastName === 'string' ? body.lastName.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!firstName) errors.push({ field: 'firstName', message: 'First name is required.' });
  else if (firstName.length > 100) errors.push({ field: 'firstName', message: 'First name must not exceed 100 characters.' });

  if (!lastName) errors.push({ field: 'lastName', message: 'Last name is required.' });
  else if (lastName.length > 100) errors.push({ field: 'lastName', message: 'Last name must not exceed 100 characters.' });

  if (!email) errors.push({ field: 'email', message: 'Email is required.' });
  else if (email.length > 254 || !EMAIL_REGEX.test(email)) errors.push({ field: 'email', message: 'A valid email address is required.' });

  if (!password) errors.push({ field: 'password', message: 'Password is required.' });
  else {
    if (password.length < PASSWORD_MIN_LENGTH) errors.push({ field: 'password', message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.` });
    if (!/[a-z]/.test(password)) errors.push({ field: 'password', message: 'Password must contain a lowercase letter.' });
    if (!/[A-Z]/.test(password)) errors.push({ field: 'password', message: 'Password must contain an uppercase letter.' });
    if (!/[0-9]/.test(password)) errors.push({ field: 'password', message: 'Password must contain a number.' });
    if (!/[^A-Za-z0-9]/.test(password)) errors.push({ field: 'password', message: 'Password must contain a special character.' });
    if (password.length > 128) errors.push({ field: 'password', message: 'Password must not exceed 128 characters.' });
  }

  return { errors, value: { firstName, lastName, email, password } };
}

function validateEmailVerification(body = {}) {
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const otp = typeof body.otp === 'string' ? body.otp.trim() : (typeof body.otp === 'number' ? String(body.otp) : '');
  const errors = [];

  if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) errors.push({ field: 'email', message: 'A valid email address is required.' });
  if (!/^\d{6}$/.test(otp)) errors.push({ field: 'otp', message: 'OTP must be exactly 6 digits.' });

  return { errors, value: { email, otp } };
}

function validateResendOtp(body = {}) {
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const errors = [];

  if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
    errors.push({ field: 'email', message: 'A valid email address is required.' });
  }

  return { errors, value: { email } };
}

function validateLogin(body = {}) {
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  const errors = [];

  if (!email) {
    errors.push({ field: 'email', message: 'Email is required.' });
  } else if (email.length > 254 || !EMAIL_REGEX.test(email)) {
    errors.push({ field: 'email', message: 'A valid email address is required.' });
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required.' });
  }

  return { errors, value: { email, password } };
}

function validateRefreshToken(body = {}) {
  const refreshToken = typeof body.refreshToken === 'string' ? body.refreshToken.trim() : '';
  const errors = [];

  if (!refreshToken) {
    errors.push({ field: 'refreshToken', message: 'Refresh token is required.' });
  }

  return { errors, value: { refreshToken } };
}

function validateLogout(body = {}) {
  const refreshToken = typeof body.refreshToken === 'string' ? body.refreshToken.trim() : '';
  const allDevices = Boolean(body.allDevices);

  return { errors: [], value: { refreshToken, allDevices } };
}

function validateForgotPassword(body = {}) {
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const errors = [];

  if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
    errors.push({ field: 'email', message: 'A valid email address is required.' });
  }

  return { errors, value: { email } };
}

function validateVerifyResetOtp(body = {}) {
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const otp = typeof body.otp === 'string' ? body.otp.trim() : (typeof body.otp === 'number' ? String(body.otp) : '');
  const errors = [];

  if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
    errors.push({ field: 'email', message: 'A valid email address is required.' });
  }
  if (!/^\d{6}$/.test(otp)) {
    errors.push({ field: 'otp', message: 'OTP must be exactly 6 digits.' });
  }

  return { errors, value: { email, otp } };
}

function validateResetPassword(body = {}) {
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const resetToken = typeof body.resetToken === 'string' ? body.resetToken.trim() : '';
  const otp = typeof body.otp === 'string' ? body.otp.trim() : (typeof body.otp === 'number' ? String(body.otp) : '');
  const password = typeof body.newPassword === 'string' ? body.newPassword : (typeof body.password === 'string' ? body.password : '');
  const errors = [];

  if (email && (email.length > 254 || !EMAIL_REGEX.test(email))) {
    errors.push({ field: 'email', message: 'A valid email address is required.' });
  }

  if (!resetToken && !otp) {
    errors.push({ field: 'resetToken', message: 'Either resetToken or otp is required to reset password.' });
  }

  if (otp && !/^\d{6}$/.test(otp)) {
    errors.push({ field: 'otp', message: 'OTP must be exactly 6 digits.' });
  }

  if (!password) {
    errors.push({ field: 'newPassword', message: 'New password is required.' });
  } else {
    if (password.length < PASSWORD_MIN_LENGTH) {
      errors.push({ field: 'newPassword', message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.` });
    }
    if (!/[a-z]/.test(password)) {
      errors.push({ field: 'newPassword', message: 'Password must contain a lowercase letter.' });
    }
    if (!/[A-Z]/.test(password)) {
      errors.push({ field: 'newPassword', message: 'Password must contain an uppercase letter.' });
    }
    if (!/[0-9]/.test(password)) {
      errors.push({ field: 'newPassword', message: 'Password must contain a number.' });
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push({ field: 'newPassword', message: 'Password must contain a special character.' });
    }
    if (password.length > 128) {
      errors.push({ field: 'newPassword', message: 'Password must not exceed 128 characters.' });
    }
  }

  return { errors, value: { email, resetToken, otp, newPassword: password } };
}

module.exports = {
  validateRegistration,
  validateEmailVerification,
  validateResendOtp,
  validateLogin,
  validateRefreshToken,
  validateLogout,
  validateForgotPassword,
  validateVerifyResetOtp,
  validateResetPassword,
  PASSWORD_MIN_LENGTH
};

