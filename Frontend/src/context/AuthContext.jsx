import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../lib/api';
import { setTokens, clearTokens, getAccessToken, getRefreshToken } from '../lib/tokenStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true while restoring session

  // On mount: try to restore the authenticated session using the stored access token
  useEffect(() => {
    async function restoreSession() {
      const token = getAccessToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await authApi.me();
        setUser(res.data.user);
      } catch {
        // Token invalid or expired and refresh failed — already handled by api.js
        clearTokens();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    restoreSession();
  }, []);

  /**
   * Call after a successful login response.
   * Stores tokens and sets the user in context.
   */
  const login = useCallback((userData, tokens) => {
    setTokens(tokens);
    setUser(userData);
  }, []);

  /**
   * Clears all auth state and stored tokens.
   * Callers are responsible for navigating to /login.
   */
  const logout = useCallback(async () => {
    // Best-effort: tell the backend to revoke the refresh token
    try {
      const rt = getRefreshToken();
      if (rt) await authApi.logout(rt);
    } catch {
      // Ignore network errors on logout — clear locally regardless
    }
    clearTokens();
    setUser(null);
  }, []);

  const value = { user, loading, login, logout, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
