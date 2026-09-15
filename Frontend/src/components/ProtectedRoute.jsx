import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute
 *
 * Props:
 *   children  — the protected page
 *   role      — optional required role: 'CUSTOMER' | 'ADMIN'
 *
 * Behaviour:
 *   - While loading: show a full-screen spinner
 *   - Not authenticated: redirect to /login
 *   - Wrong role: redirect to the correct home for the actual role
 */
export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Redirect each role to its correct home
    if (user.role === 'ADMIN') return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/home" replace />;
  }

  return children;
}
