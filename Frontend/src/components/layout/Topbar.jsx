import React, { useRef, useEffect } from 'react';
import { LogOut, Menu, Search, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCars } from '../../context/CarContext';

export default function Topbar({ kind = 'list', onMenu }) {
  const { user, logout } = useAuth();
  const { navbarSearch, setNavbarSearch } = useCars();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // ignore
    }
    navigate('/login', { replace: true });
  };

  // Keyboard shortcut '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setNavbarSearch(val);
  };

  const handleKeyDownInput = (e) => {
    if (e.key === 'Enter') {
      if (window.location.pathname !== '/cars' && window.location.pathname !== '/car-status-list') {
        navigate('/cars');
      }
    }
  };

  const getInitials = () => {
    if (!user) return 'AD';
    const first = user.firstName ? user.firstName[0].toUpperCase() : '';
    const last = user.lastName ? user.lastName[0].toUpperCase() : '';
    return first + last || 'AD';
  };

  return (
    <header className="flex h-[70px] items-center justify-between border-b border-[#e8ebf0] bg-white px-[17px] lg:pl-[31px] lg:pr-[31px]">
      <div className="flex items-center gap-2">
        <button
          className="mr-2 text-[#667085] lg:hidden p-1 rounded hover:bg-gray-100"
          onClick={onMenu}
          aria-label="Open sidebar navigation"
        >
          <Menu size={22} />
        </button>

        <div className="hidden items-center text-[13px] text-[#9a9caf] lg:flex">
          {kind === 'list' ? (
            <span className="font-semibold text-[#28233a]">Cars</span>
          ) : (
            <>
              <Link to="/cars" className="hover:text-[#28233a] transition-colors">
                Cars
              </Link>
              <span className="px-2 text-gray-400">/</span>
              <b className="text-[#28233a]">{kind === 'add' ? 'Add Car' : 'Edit Car'}</b>
            </>
          )}
        </div>
      </div>

      {/* Functional Navbar Search */}
      <div className="relative flex h-[38px] w-full max-w-[455px] items-center gap-[9px] rounded-[7px] border border-[#e4e7ec] bg-white px-[11px] text-[13px] text-[#98a2b3] transition-colors focus-within:border-[#3f003d] focus-within:ring-2 focus-within:ring-[#3f003d]/10 lg:mx-5">
        <Search size={17} className="shrink-0 text-[#98a2b3]" />
        <input
          ref={inputRef}
          type="text"
          value={navbarSearch}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDownInput}
          placeholder="Search car by brand, model, registration..."
          className="h-full w-full bg-transparent text-[13px] text-[#28233a] outline-none placeholder:text-[#98a2b3]"
          aria-label="Search vehicles"
        />
        {navbarSearch ? (
          <button
            type="button"
            onClick={() => setNavbarSearch('')}
            className="rounded p-0.5 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        ) : (
          <kbd className="ml-auto shrink-0 rounded border border-[#e4e7ec] bg-[#f8fafc] px-[6px] py-[1px] text-[11px] text-[#667085]">
            /
          </kbd>
        )}
      </div>

      <div className="ml-3 flex items-center gap-2 text-[#535366] lg:gap-3">
        <button
          onClick={handleLogout}
          className="hidden items-center gap-1.5 rounded-lg border border-[#e4e7ec] px-3 py-1.5 text-[13px] font-medium text-gray-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:inline-flex"
          title="Sign out of Admin"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>

        <div
          className="grid h-[35px] w-[35px] select-none place-items-center rounded-full bg-[#330231] text-[11px] font-semibold text-white shadow-sm"
          title={user ? `${user.firstName} ${user.lastName} (${user.role})` : 'Admin User'}
        >
          {getInitials()}
        </div>
      </div>
    </header>
  );
}
