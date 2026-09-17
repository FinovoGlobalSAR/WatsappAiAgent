import React from 'react';
import { CarFront, LayoutDashboard, LogOut, Sun, X,Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import FinovoLogo from './FinovoLogo';
import { useState } from "react";

export default function SharedSidebar({ mobileNav, setMobileNav = false }) {
  const [isDark, setIsDark] = useState(false);
  return <>
    {mobileNav && <div className="fixed inset-0 z-40 bg-black/30 lg:hidden"
      onClick={() => setMobileNav(false)}
    />}
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-[224px] flex-col bg-[#330231] px-[14px] py-[25px] text-white transition-transform duration-200 ${mobileNav ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="px-[14px] pb-[31px]">
        <FinovoLogo />

        <button className="absolute right-3 top-3 rounded p-1 text-white lg:hidden" onClick={() => setMobileNav(false)}><X size={20} /></button>
      </div>

      <nav className="grid gap-[6px]">
        <Link to="/car-status-list" className="flex h-[42px] items-center gap-[11px] rounded-[8px] bg-[#330231] px-[13px] text-[14px] font-medium text-white transition-colors duration-300 hover:bg-[#571353]">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>
        <Link to="/car-status-list" className="flex h-[42px] items-center gap-[11px] rounded-[8px] bg-[#330231] px-[13px] text-[14px] font-medium text-white transition-colors duration-300 hover:bg-[#571353]"><CarFront size={18} /><span>Cars</span>
        </Link>
      </nav>
      <div className="mt-auto grid gap-5">
        <button className="flex h-[42px] items-center gap-[11px] rounded-[8px] px-[13px] text-left text-[14px] font-medium text-[#ead8ea]">
          <LogOut size={18} />
          <span>Log out</span>
        </button>


        <div className="flex items-center gap-[11px] px-[13px] pb-1 text-[14px] text-[#d8bfd8]">
          <Sun size={19} />

          <span>Light mode</span>

          <button
            onClick={() => setIsDark(!isDark)}
            className={`ml-auto relative h-[27px] w-[49px] rounded-full p-[3px] transition-all duration-300 ease-in-out ${isDark ? "bg-[#330231]" : "bg-white"
              }`}
            aria-label="Toggle theme"
          >
            <span
              className={`flex h-[21px] w-[21px] items-center justify-center rounded-full shadow-md transition-all duration-300 ease-in-out ${isDark
                  ? "translate-x-[22px] bg-[#ffffff]"
                  : "translate-x-0 bg-[#571353]"
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
  </>;
}
