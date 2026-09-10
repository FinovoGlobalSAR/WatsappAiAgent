// Frontend Auth Client for Car Rental Platform API
const TOKEN_KEY_ACCESS = 'car_rental_access_token';
const TOKEN_KEY_REFRESH = 'car_rental_refresh_token';

// Token Storage Helpers
function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY_ACCESS);
}

function getRefreshToken() {
  return localStorage.getItem(TOKEN_KEY_REFRESH);
}

function setTokens(accessToken, refreshToken) {
  if (accessToken) localStorage.setItem(TOKEN_KEY_ACCESS, accessToken);
  if (refreshToken) localStorage.setItem(TOKEN_KEY_REFRESH, refreshToken);
}

function clearTokens() {
  localStorage.removeItem(TOKEN_KEY_ACCESS);
  localStorage.removeItem(TOKEN_KEY_REFRESH);
}

function isAuthenticated() {
  return Boolean(getAccessToken());
}

// Unified API Caller with Automatic Token Refresh
async function apiCall(endpoint, { method = 'GET', body = null, requireAuth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (requireAuth || getAccessToken()) {
    headers['Authorization'] = `Bearer ${getAccessToken()}`;
  }

  const config = { method, headers };
  if (body !== null) {
    config.body = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(endpoint, config);
  } catch (netErr) {
    return {
      status: 0,
      ok: false,
      data: { success: false, message: 'Network error. Please check backend server status.' }
    };
  }

  let data;
  try {
    data = await response.json();
  } catch {
    data = { success: false, message: 'Invalid JSON response from server' };
  }

  // Handle Token Expiration: Attempt Auto Refresh
  if (response.status === 401 && data.message && data.message.includes('expired')) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        const refreshRes = await fetch('/api/v1/auth/refresh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken })
        });
        const refreshData = await refreshRes.json();

        if (refreshRes.ok && refreshData.success && refreshData.data?.tokens) {
          setTokens(refreshData.data.tokens.accessToken, refreshData.data.tokens.refreshToken);
          headers['Authorization'] = `Bearer ${refreshData.data.tokens.accessToken}`;
          const retryRes = await fetch(endpoint, { method, headers, body: config.body });
          const retryData = await retryRes.json();
          return { status: retryRes.status, ok: retryRes.ok, data: retryData };
        }
      } catch (e) {
        console.error('Token auto-refresh failed:', e);
      }
    }

    clearTokens();
    if (requireAuth && !window.location.pathname.endsWith('login.html')) {
      window.location.href = 'login.html?expired=1';
    }
  }

  return {
    status: response.status,
    ok: response.ok,
    data
  };
}

// UI Alert Helper
function showAlert(containerId, message, type = 'error', errors = []) {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.className = `alert alert-${type} visible`;
  let html = `<strong>${escapeHtml(message)}</strong>`;

  if (Array.isArray(errors) && errors.length > 0) {
    html += '<ul>';
    errors.forEach((err) => {
      html += `<li>${escapeHtml(err.message || `${err.field}: invalid`)}</li>`;
    });
    html += '</ul>';
  }

  el.innerHTML = html;
}

function clearAlert(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.className = 'alert';
  el.innerHTML = '';
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// --- Page Specific Initialization Handlers ---

// Register Page Handler
function initRegisterPage() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlert('alertBox');

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating account...';

    const payload = {
      firstName: document.getElementById('firstName').value.trim(),
      lastName: document.getElementById('lastName').value.trim(),
      email: document.getElementById('email').value.trim(),
      password: document.getElementById('password').value
    };

    const res = await apiCall('/api/v1/auth/register', { method: 'POST', body: payload });
    submitBtn.disabled = false;
    submitBtn.textContent = 'Create Account';

    if (res.ok && res.data.success) {
      showAlert('alertBox', res.data.message || 'Registration successful! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = `verify.html?email=${encodeURIComponent(payload.email)}`;
      }, 1500);
    } else {
      showAlert('alertBox', res.data.message || 'Registration failed.', 'error', res.data.errors);
    }
  });
}

// Verify OTP Page Handler
function initVerifyPage() {
  const form = document.getElementById('verifyForm');
  if (!form) return;

  const urlParams = new URLSearchParams(window.location.search);
  const emailParam = urlParams.get('email');
  const emailInput = document.getElementById('email');
  if (emailParam && emailInput) {
    emailInput.value = emailParam;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlert('alertBox');

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Verifying...';

    const payload = {
      email: document.getElementById('email').value.trim(),
      otp: document.getElementById('otp').value.trim()
    };

    const res = await apiCall('/api/v1/auth/verify-email', { method: 'POST', body: payload });
    submitBtn.disabled = false;
    submitBtn.textContent = 'Verify Email';

    if (res.ok && res.data.success) {
      showAlert('alertBox', res.data.message || 'Email verified! Redirecting to login...', 'success');
      setTimeout(() => {
        window.location.href = `login.html?verified=1&email=${encodeURIComponent(payload.email)}`;
      }, 1500);
    } else {
      showAlert('alertBox', res.data.message || 'Verification failed.', 'error', res.data.errors);
    }
  });

  const resendBtn = document.getElementById('resendBtn');
  if (resendBtn) {
    resendBtn.addEventListener('click', async () => {
      clearAlert('alertBox');
      const email = document.getElementById('email').value.trim();
      if (!email) {
        showAlert('alertBox', 'Please enter your email address to resend the code.', 'error');
        return;
      }

      resendBtn.disabled = true;
      resendBtn.textContent = 'Sending...';

      const res = await apiCall('/api/v1/auth/resend-otp', { method: 'POST', body: { email } });
      if (res.ok && res.data.success) {
        showAlert('alertBox', res.data.message || 'New OTP sent to your email!', 'success');
        startCooldownTimer(resendBtn, 60);
      } else {
        showAlert('alertBox', res.data.message || 'Could not resend OTP.', 'error', res.data.errors);
        resendBtn.disabled = false;
        resendBtn.textContent = 'Resend Code';
      }
    });
  }
}

function startCooldownTimer(button, seconds) {
  let remaining = seconds;
  button.disabled = true;
  button.textContent = `Resend available in ${remaining}s`;

  const interval = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      clearInterval(interval);
      button.disabled = false;
      button.textContent = 'Resend Code';
    } else {
      button.textContent = `Resend available in ${remaining}s`;
    }
  }, 1000);
}

// Login Page Handler
function initLoginPage() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('verified') === '1') {
    showAlert('alertBox', 'Email successfully verified! Please log in.', 'success');
  } else if (urlParams.get('reset') === '1') {
    showAlert('alertBox', 'Password reset successfully! Please log in with your new password.', 'success');
  } else if (urlParams.get('expired') === '1') {
    showAlert('alertBox', 'Your session has expired. Please log in again.', 'error');
  }

  const emailParam = urlParams.get('email');
  if (emailParam) {
    document.getElementById('email').value = emailParam;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlert('alertBox');

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in...';

    const payload = {
      email: document.getElementById('email').value.trim(),
      password: document.getElementById('password').value
    };

    const res = await apiCall('/api/v1/auth/login', { method: 'POST', body: payload });
    submitBtn.disabled = false;
    submitBtn.textContent = 'Log In';

    if (res.ok && res.data.success && res.data.data?.tokens) {
      setTokens(res.data.data.tokens.accessToken, res.data.data.tokens.refreshToken);
      showAlert('alertBox', 'Login successful! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 800);
    } else {
      showAlert('alertBox', res.data.message || 'Login failed.', 'error', res.data.errors);
    }
  });
}

// Dashboard Page Handler
async function initDashboardPage() {
  const profileTable = document.getElementById('profileTable');
  if (!profileTable) return;

  if (!isAuthenticated()) {
    window.location.href = 'login.html';
    return;
  }

  clearAlert('alertBox');
  const res = await apiCall('/api/v1/auth/me', { requireAuth: true });

  if (!res.ok || !res.data.success) {
    clearTokens();
    window.location.href = 'login.html?expired=1';
    return;
  }

  const user = res.data.data.user;
  document.getElementById('userName').textContent = `${user.firstName} ${user.lastName}`;
  document.getElementById('userEmail').textContent = user.email;
  document.getElementById('userId').textContent = `#${user.id}`;
  document.getElementById('userCreatedAt').textContent = new Date(user.createdAt).toLocaleString();

  const roleEl = document.getElementById('userRole');
  roleEl.textContent = user.role;
  roleEl.className = `badge ${user.role === 'ADMIN' ? 'badge-admin' : 'badge-customer'}`;

  const verifiedEl = document.getElementById('userVerified');
  verifiedEl.textContent = user.emailVerified ? 'Verified' : 'Unverified';
  verifiedEl.className = `badge ${user.emailVerified ? 'badge-active' : 'badge-unverified'}`;

  const statusEl = document.getElementById('userStatus');
  statusEl.textContent = user.status;
  statusEl.className = `badge ${user.status === 'ACTIVE' ? 'badge-active' : 'badge-unverified'}`;

  // Test Admin Endpoint Button
  const testAdminBtn = document.getElementById('testAdminBtn');
  if (testAdminBtn) {
    testAdminBtn.addEventListener('click', async () => {
      const output = document.getElementById('outputBox');
      output.style.display = 'block';
      output.textContent = 'Calling GET /api/v1/admin/dashboard...';

      const adminRes = await apiCall('/api/v1/admin/dashboard', { requireAuth: true });
      output.textContent = `Status: ${adminRes.status} ${adminRes.ok ? 'OK' : 'Error'}\n\n` + JSON.stringify(adminRes.data, null, 2);
    });
  }

  // Rotate Token Button
  const rotateTokenBtn = document.getElementById('rotateTokenBtn');
  if (rotateTokenBtn) {
    rotateTokenBtn.addEventListener('click', async () => {
      const output = document.getElementById('outputBox');
      output.style.display = 'block';
      output.textContent = 'Rotating refresh token via POST /api/v1/auth/refresh...';

      const refreshToken = getRefreshToken();
      const refRes = await apiCall('/api/v1/auth/refresh', {
        method: 'POST',
        body: { refreshToken }
      });

      if (refRes.ok && refRes.data.success && refRes.data.data?.tokens) {
        setTokens(refRes.data.data.tokens.accessToken, refRes.data.data.tokens.refreshToken);
        output.textContent = `Token Rotated Successfully! (Status ${refRes.status})\n\nNew tokens stored in localStorage.`;
      } else {
        output.textContent = `Token Rotation Failed (Status ${refRes.status}):\n\n` + JSON.stringify(refRes.data, null, 2);
      }
    });
  }

  // Logout Button (Single Device)
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      const refreshToken = getRefreshToken();
      await apiCall('/api/v1/auth/logout', {
        method: 'POST',
        requireAuth: true,
        body: { refreshToken, allDevices: false }
      });
      clearTokens();
      window.location.href = 'login.html';
    });
  }

  // Logout All Devices Button
  const logoutAllBtn = document.getElementById('logoutAllBtn');
  if (logoutAllBtn) {
    logoutAllBtn.addEventListener('click', async () => {
      const refreshToken = getRefreshToken();
      await apiCall('/api/v1/auth/logout', {
        method: 'POST',
        requireAuth: true,
        body: { refreshToken, allDevices: true }
      });
      clearTokens();
      window.location.href = 'login.html';
    });
  }
}

// Forgot Password Page Handler
function initForgotPasswordPage() {
  const form = document.getElementById('forgotPasswordForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlert('alertBox');

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending code...';

    const email = document.getElementById('email').value.trim();
    const res = await apiCall('/api/v1/auth/forgot-password', {
      method: 'POST',
      body: { email }
    });

    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Reset Code';

    if (res.ok && res.data.success) {
      showAlert('alertBox', res.data.message || 'Reset code sent! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = `reset-password.html?email=${encodeURIComponent(email)}`;
      }, 1200);
    } else {
      showAlert('alertBox', res.data.message || 'Failed to send reset code.', 'error', res.data.errors);
    }
  });
}

// Reset Password Page Handler
function initResetPasswordPage() {
  const form = document.getElementById('resetPasswordForm');
  if (!form) return;

  const urlParams = new URLSearchParams(window.location.search);
  const emailParam = urlParams.get('email');
  if (emailParam) {
    document.getElementById('email').value = emailParam;
  }

  const verifyOtpBtn = document.getElementById('verifyOtpBtn');
  const resendOtpBtn = document.getElementById('resendOtpBtn');
  const resetTokenInput = document.getElementById('resetToken');

  if (verifyOtpBtn) {
    verifyOtpBtn.addEventListener('click', async () => {
      clearAlert('alertBox');
      const email = document.getElementById('email').value.trim();
      const otp = document.getElementById('otp').value.trim();

      if (!email || !otp) {
        showAlert('alertBox', 'Please provide both email and 6-digit OTP code to verify.', 'error');
        return;
      }

      verifyOtpBtn.disabled = true;
      verifyOtpBtn.textContent = 'Verifying...';

      const res = await apiCall('/api/v1/auth/verify-reset-otp', {
        method: 'POST',
        body: { email, otp }
      });

      verifyOtpBtn.disabled = false;
      verifyOtpBtn.textContent = 'Verify Code';

      if (res.ok && res.data.success && res.data.data?.resetToken) {
        resetTokenInput.value = res.data.data.resetToken;
        showAlert('alertBox', 'Code verified! Now choose and confirm your new password.', 'success');
        document.getElementById('otp').disabled = true;
        verifyOtpBtn.disabled = true;
        verifyOtpBtn.textContent = 'Verified ✓';
      } else {
        showAlert('alertBox', res.data.message || 'Invalid or expired code.', 'error', res.data.errors);
      }
    });
  }

  if (resendOtpBtn) {
    resendOtpBtn.addEventListener('click', async () => {
      clearAlert('alertBox');
      const email = document.getElementById('email').value.trim();
      if (!email) {
        showAlert('alertBox', 'Please enter your email address to resend code.', 'error');
        return;
      }

      resendOtpBtn.disabled = true;
      resendOtpBtn.textContent = 'Sending...';

      const res = await apiCall('/api/v1/auth/forgot-password', {
        method: 'POST',
        body: { email }
      });

      if (res.ok && res.data.success) {
        showAlert('alertBox', 'A new reset code has been sent to your email!', 'success');
        startCooldownTimer(resendOtpBtn, 60);
      } else {
        showAlert('alertBox', res.data.message || 'Could not resend code.', 'error', res.data.errors);
        resendOtpBtn.disabled = false;
        resendOtpBtn.textContent = 'Resend Code';
      }
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlert('alertBox');

    const email = document.getElementById('email').value.trim();
    const otp = document.getElementById('otp').value.trim();
    const resetToken = resetTokenInput.value.trim();
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
      showAlert('alertBox', 'Passwords do not match. Please verify.', 'error');
      return;
    }

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Updating password...';

    const payload = { email, newPassword };
    if (resetToken) {
      payload.resetToken = resetToken;
    } else if (otp) {
      payload.otp = otp;
    }

    const res = await apiCall('/api/v1/auth/reset-password', {
      method: 'POST',
      body: payload
    });

    submitBtn.disabled = false;
    submitBtn.textContent = 'Reset Password';

    if (res.ok && res.data.success) {
      showAlert('alertBox', res.data.message || 'Password reset successfully! Redirecting to login...', 'success');
      setTimeout(() => {
        window.location.href = 'login.html?reset=1';
      }, 1500);
    } else {
      showAlert('alertBox', res.data.message || 'Password reset failed.', 'error', res.data.errors);
    }
  });
}

// Auto-run matching initializer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  if (path.endsWith('register.html')) initRegisterPage();
  else if (path.endsWith('verify.html')) initVerifyPage();
  else if (path.endsWith('login.html')) initLoginPage();
  else if (path.endsWith('dashboard.html')) initDashboardPage();
  else if (path.endsWith('forgot-password.html') || path.endsWith('forgot-password')) initForgotPasswordPage();
  else if (path.endsWith('reset-password.html') || path.endsWith('reset-password')) initResetPasswordPage();
});

