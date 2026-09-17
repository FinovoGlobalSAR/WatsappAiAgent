import React, { useState } from 'react';
import { CarFront, LayoutDashboard, LogOut, Sun, X, Moon, Users } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FinovoLogo from './FinovoLogo';
import { useAuth } from '../../context/AuthContext';

export default function SharedSidebar({ mobileNav, setMobileNav = () => {} }) {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // ignore
    }
    navigate('/login', { replace: true });
  };

  const isCarsActive = location.pathname.includes('/car') || location.pathname.includes('/cars');
  const isDashboardActive = location.pathname === '/admin/dashboard';
  const isUsersActive = location.pathname === '/admin/users';

  return (
    <>
      {mobileNav && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setMobileNav(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[224px] flex-col bg-[#330231] px-[14px] py-[25px] text-white transition-transform duration-200 ${
          mobileNav ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="px-[14px] pb-[31px]">
          <FinovoLogo />

          <button
            className="absolute right-3 top-3 rounded p-1 text-white lg:hidden"
            onClick={() => setMobileNav(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="grid gap-[6px]">
          <Link
            to="/admin/dashboard"
            onClick={() => setMobileNav(false)}
            className={`flex h-[42px] items-center gap-[11px] rounded-[8px] px-[13px] text-[14px] font-medium transition-colors duration-300 ${
              isDashboardActive ? 'bg-[#571353] text-white' : 'text-white/80 hover:bg-[#571353] hover:text-white'
            }`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/cars"
            onClick={() => setMobileNav(false)}
            className={`flex h-[42px] items-center gap-[11px] rounded-[8px] px-[13px] text-[14px] font-medium transition-colors duration-300 ${
              isCarsActive ? 'bg-[#571353] text-white' : 'text-white/80 hover:bg-[#571353] hover:text-white'
            }`}
          >
            <CarFront size={18} />
            <span>Cars</span>
          </Link>

          <Link
            to="/admin/users"
            onClick={() => setMobileNav(false)}
            className={`flex h-[42px] items-center gap-[11px] rounded-[8px] px-[13px] text-[14px] font-medium transition-colors duration-300 ${
              isUsersActive ? 'bg-[#571353] text-white' : 'text-white/80 hover:bg-[#571353] hover:text-white'
            }`}
          >
            <Users size={18} />
            <span>Users</span>
          </Link>
        </nav>

        <div className="mt-auto grid gap-5">
          <button
            onClick={handleLogout}
            className="flex h-[42px] items-center gap-[11px] rounded-[8px] px-[13px] text-left text-[14px] font-medium text-[#ead8ea] transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut size={18} />
            <span>Log out</span>
          </button>

          <div className="flex items-center gap-[11px] px-[13px] pb-1 text-[14px] text-[#d8bfd8]">
            <Sun size={19} />
            <span>{isDark ? 'Dark mode' : 'Light mode'}</span>

            <button
              type="button"
              onClick={() => setIsDark(!isDark)}
              className={`ml-auto relative h-[27px] w-[49px] rounded-full p-[3px] transition-all duration-300 ease-in-out ${
                isDark ? 'bg-[#330231]' : 'bg-white'
              }`}
              aria-label="Toggle theme"
            >
              <span
                className={`flex h-[21px] w-[21px] items-center justify-center rounded-full shadow-md transition-all duration-300 ease-in-out ${
                  isDark ? 'translate-x-[22px] bg-[#ffffff]' : 'translate-x-0 bg-[#571353]'
                }`}
              >
                {isDark ? (
                  <Moon size={13} className="text-[#330231]" />
                ) : (
                  <Sun size={13} className="text-white" />
                )}
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
