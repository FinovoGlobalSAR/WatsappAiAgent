import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { adminApi } from "../lib/api";
import { brand } from "../data/authContent";

export default function AdminUsers() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi
      .users()
      .then((res) => setUsers(res.data.users))
      .catch((err) => setError(err.message || "Failed to load users."))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const roleBadge = (role) => (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
        role === "ADMIN"
          ? "bg-brand-100 text-brand-700"
          : "bg-ink-100 text-ink-600"
      }`}
    >
      {role}
    </span>
  );

  const statusBadge = (status) => (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
        status === "ACTIVE"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-600"
      }`}
    >
      {status}
    </span>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="border-b border-ink-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-ink-900"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              Dashboard
            </Link>
            <span className="text-ink-200">|</span>
            <Link
              to="/cars"
              className="text-sm font-medium text-ink-600 hover:text-ink-900"
            >
              Fleet & Cars
            </Link>
            <span className="text-ink-200">|</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-ink-900">{brand.name}</span>
              <span className="rounded-md bg-brand-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-brand-700">
                Admin
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-xl border border-ink-200 px-4 py-2 text-sm font-medium text-ink-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" strokeWidth={2} />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-ink-900">Users</h1>
            <p className="mt-0.5 text-sm text-ink-400">
              {loading ? "Loading…" : `${users.length} user${users.length !== 1 ? "s" : ""} found`}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-ink-200 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-200 bg-ink-50">
                    {["ID", "Name", "Email", "Role", "Email Verified", "Status", "Joined"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-ink-400"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-200">
                  {users.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-12 text-center text-ink-400"
                      >
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((u) => (
                      <tr
                        key={u.id}
                        className="bg-white transition-colors hover:bg-brand-50/40"
                      >
                        <td className="px-4 py-3 font-mono text-xs text-ink-400">
                          #{u.id}
                        </td>
                        <td className="px-4 py-3 font-medium text-ink-900 whitespace-nowrap">
                          {u.firstName} {u.lastName}
                        </td>
                        <td className="px-4 py-3 text-ink-600">{u.email}</td>
                        <td className="px-4 py-3">{roleBadge(u.role)}</td>
                        <td className="px-4 py-3">
                          {u.emailVerified ? (
                            <CheckCircle className="h-4 w-4 text-green-500" strokeWidth={2} />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-400" strokeWidth={2} />
                          )}
                        </td>
                        <td className="px-4 py-3">{statusBadge(u.status)}</td>
                        <td className="px-4 py-3 text-ink-400 whitespace-nowrap">
                          {u.createdAt
                            ? new Date(u.createdAt).toLocaleDateString()
                            : "—"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
