import { useNavigate } from "react-router-dom";
import { Car, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { brand } from "../data/authContent";

export default function CustomerHome() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top nav */}
      <header className="border-b border-ink-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-900">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 12L12 4L20 12L12 20L4 12Z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
                <path d="M8 12L12 8L16 12L12 16L8 12Z" fill="#fff" />
              </svg>
            </span>
            <span className="text-lg font-bold text-ink-900">{brand.name}</span>
          </div>

          {/* User info + logout */}
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 sm:flex">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100">
                <User className="h-4 w-4 text-brand-600" strokeWidth={2} />
              </span>
              <span className="text-sm font-medium text-ink-900">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl border border-ink-200 px-4 py-2 text-sm font-medium text-ink-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" strokeWidth={2} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Welcome banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-900 to-brand-700 px-8 py-10 text-white">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" />
          <div className="absolute -bottom-6 right-20 h-24 w-24 rounded-full bg-brand-300/20" />
          <div className="relative">
            <p className="text-sm font-semibold tracking-widest text-brand-300/80 uppercase">
              Welcome back
            </p>
            <h1 className="mt-1 text-3xl font-extrabold">
              Hello, {user?.firstName}! 👋
            </h1>
            <p className="mt-2 text-[15px] text-white/70">
              Ready for your next adventure? Explore our fleet and book your perfect ride.
            </p>
          </div>
        </div>

        {/* Stats / quick cards */}
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {[
            {
              icon: Car,
              label: "Browse Cars",
              desc: "Explore our full fleet",
              color: "text-brand-600",
              bg: "bg-brand-50",
            },
            {
              icon: User,
              label: "My Account",
              desc: user?.email,
              color: "text-ink-600",
              bg: "bg-ink-50",
            },
            {
              icon: LogOut,
              label: "Sign Out",
              desc: "End your session",
              color: "text-red-500",
              bg: "bg-red-50",
              onClick: handleLogout,
            },
          ].map((card) => (
            <button
              key={card.label}
              onClick={card.onClick}
              className="group flex items-center gap-4 rounded-2xl border border-ink-200 bg-white px-6 py-5 text-left shadow-sm transition-shadow hover:shadow-md"
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.bg}`}>
                <card.icon className={`h-5 w-5 ${card.color}`} strokeWidth={2} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink-900">{card.label}</p>
                <p className="mt-0.5 text-xs text-ink-400 truncate max-w-[160px]">{card.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Account details */}
        <div className="mt-8 rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-ink-900">Account Details</h2>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            {[
              ["Name", `${user?.firstName} ${user?.lastName}`],
              ["Email", user?.email],
              ["Role", user?.role],
              ["Account Status", user?.status],
              ["Email Verified", user?.emailVerified ? "Yes ✓" : "No"],
              ["Member Since", user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"],
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
