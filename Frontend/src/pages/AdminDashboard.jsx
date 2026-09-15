import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users, LogOut, Activity, Shield } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { adminApi } from "../lib/api";
import { brand } from "../data/authContent";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dashData, setDashData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi
      .dashboard()
      .then((res) => setDashData(res.data))
      .catch((err) => setError(err.message || "Failed to load dashboard."));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top nav */}
      <header className="border-b border-ink-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-900">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 12L12 4L20 12L12 20L4 12Z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
                <path d="M8 12L12 8L16 12L12 16L8 12Z" fill="#fff" />
              </svg>
            </span>
            <span className="text-lg font-bold text-ink-900">{brand.name}</span>
            <span className="ml-1 rounded-md bg-brand-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-brand-700">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/users"
              className="flex items-center gap-1.5 rounded-xl border border-ink-200 px-4 py-2 text-sm font-medium text-ink-600 transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
            >
              <Users className="h-4 w-4" strokeWidth={2} />
              Users
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl border border-ink-200 px-4 py-2 text-sm font-medium text-ink-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" strokeWidth={2} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Welcome */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-900 to-brand-700 px-8 py-10 text-white">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" />
          <div className="absolute -bottom-6 right-20 h-24 w-24 rounded-full bg-brand-300/20" />
          <div className="relative">
            <p className="text-sm font-semibold tracking-widest text-brand-300/80 uppercase">
              Admin Panel
            </p>
            <h1 className="mt-1 text-3xl font-extrabold">
              Welcome, {user?.firstName}! 🛡️
            </h1>
            <p className="mt-2 text-[15px] text-white/70">
              Manage users, monitor system health, and keep Finovo running smoothly.
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Stat cards */}
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50">
              <Shield className="h-5 w-5 text-brand-600" strokeWidth={2} />
            </div>
            <p className="mt-4 text-xs font-medium uppercase tracking-widest text-ink-400">
              Admin ID
            </p>
            <p className="mt-1 text-2xl font-extrabold text-ink-900">
              #{dashData?.admin?.id ?? user?.id ?? "—"}
            </p>
          </div>

          <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
              <Activity className="h-5 w-5 text-green-600" strokeWidth={2} />
            </div>
            <p className="mt-4 text-xs font-medium uppercase tracking-widest text-ink-400">
              System Status
            </p>
            <p className="mt-1 text-2xl font-extrabold capitalize text-green-700">
              {dashData?.system?.status ?? "—"}
            </p>
          </div>

          <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50">
              <Users className="h-5 w-5 text-brand-600" strokeWidth={2} />
            </div>
            <p className="mt-4 text-xs font-medium uppercase tracking-widest text-ink-400">
              Manage Users
            </p>
            <Link
              to="/admin/users"
              className="mt-1 block text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              View all users →
            </Link>
          </div>
        </div>

        {/* Admin details */}
        <div className="mt-8 rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-ink-900">Your Admin Account</h2>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            {[
              ["Name", `${user?.firstName} ${user?.lastName}`],
              ["Email", user?.email],
              ["Role", user?.role],
              ["Account Status", user?.status],
              ["Last Check", dashData?.system?.timestamp
                ? new Date(dashData.system.timestamp).toLocaleString()
                : "—"],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-[11px] font-medium uppercase tracking-widest text-ink-400">
                  {label}
                </span>
                <span className="font-medium text-ink-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
