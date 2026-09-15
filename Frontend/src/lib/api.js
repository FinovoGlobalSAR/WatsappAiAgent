/**
 * Centralized API client.
 *
 * - Base URL comes from VITE_API_URL (falls back to '' so the Vite proxy handles /api)
 * - Automatically attaches Authorization: Bearer <accessToken> header
 * - On 401 TOKEN_EXPIRED: silently refreshes tokens and retries once
 * - On unrecoverable 401: clears tokens and redirects to /login
 */

import { getAccessToken, getRefreshToken, setTokens, clearTokens } from './tokenStorage';

const BASE = (import.meta.env.VITE_API_URL || '') + '/api/v1';

let isRefreshing = false;
let refreshQueue = []; // pending requests waiting for the refresh

function processQueue(error, token = null) {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  refreshQueue = [];
}

async function doRefresh() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error('No refresh token');

  const res = await fetch(`${BASE}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || 'Refresh failed');
  }

  const body = await res.json();
  const tokens = body.data?.tokens;
  if (!tokens?.accessToken) throw new Error('Invalid refresh response');

  setTokens({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
  return tokens.accessToken;
}

/**
 * Core request function.
 * @param {string} path  - e.g. '/auth/login'
 * @param {RequestInit} options
 * @param {boolean} _isRetry - internal flag to prevent infinite refresh loops
 */
async function request(path, options = {}, _isRetry = false) {
  const accessToken = getAccessToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers,
  });

  // Parse JSON body (gracefully)
  let body;
  try {
    body = await res.json();
  } catch {
    body = {};
  }

  // Attempt silent token refresh on expired access token
  if (res.status === 401 && body.code === 'TOKEN_EXPIRED' && !_isRetry) {
    if (isRefreshing) {
      // Queue this request until the ongoing refresh completes
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      }).then((newToken) => {
        const retryHeaders = { ...headers, Authorization: `Bearer ${newToken}` };
        return request(path, { ...options, headers: retryHeaders }, true);
      });
    }

    isRefreshing = true;
    try {
      const newToken = await doRefresh();
      processQueue(null, newToken);
      isRefreshing = false;
      return request(path, options, true);
    } catch (err) {
      processQueue(err);
      isRefreshing = false;
      clearTokens();
      window.location.href = '/login';
      throw err;
    }
  }

  // Any other non-OK response: throw with backend message
  if (!res.ok) {
    const error = new Error(body.message || `Request failed: ${res.status}`);
    error.status = res.status;
    error.code = body.code;
    error.details = body.details;
    error.body = body;
    throw error;
  }

  return body;
}

// ─── Auth endpoints ────────────────────────────────────────────────────────

export const authApi = {
  register: (data) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),

  verifyEmail: (data) =>
    request('/auth/verify-email', { method: 'POST', body: JSON.stringify(data) }),

  resendOtp: (data) =>
    request('/auth/resend-otp', { method: 'POST', body: JSON.stringify(data) }),

  login: (data) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),

  me: () =>
    request('/auth/me', { method: 'GET' }),

  refresh: (refreshToken) =>
    request('/auth/refresh', { method: 'POST', body: JSON.stringify({ refreshToken }) }),

  logout: (refreshToken) =>
    request('/auth/logout', { method: 'POST', body: JSON.stringify({ refreshToken }) }),

  forgotPassword: (data) =>
    request('/auth/forgot-password', { method: 'POST', body: JSON.stringify(data) }),

  verifyResetOtp: (data) =>
    request('/auth/verify-reset-otp', { method: 'POST', body: JSON.stringify(data) }),

  resetPassword: (data) =>
    request('/auth/reset-password', { method: 'POST', body: JSON.stringify(data) }),
};

// ─── Admin endpoints ───────────────────────────────────────────────────────

export const adminApi = {
  dashboard: () =>
    request('/admin/dashboard', { method: 'GET' }),

  users: () =>
    request('/admin/users', { method: 'GET' }),
};
