import React, { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Brand from "./Brand";

const links = ["Home", "About", "How it works", "Features", "Pricing"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute left-0 right-0 top-4 z-50">
      <nav className="mx-auto flex h-[66px] w-[calc(100%-30px)] max-w-[1160px] items-center rounded-[16px] border border-[#B8D0D0]/80 bg-white/80 px-4 pl-5 shadow-[0_8px_30px_rgba(0,0,0,.04)] backdrop-blur-[18px] sm:w-[calc(100%-48px)]">
        <Brand />

        <div
          className={`absolute left-0 right-0 top-[74px] flex-col gap-0 rounded-[14px] border border-[#D9E5E5] bg-white p-3 shadow-[0_18px_35px_rgba(0,0,0,.08)] md:static md:ml-auto md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0 md:shadow-none ${
            open ? "flex" : "hidden"
          }`}
        >
          {links.map((link, i) => (
            <a
              key={link}
              href={i === 0 ? "#top" : `#${link.toLowerCase().replaceAll(" ", "-")}`}
              onClick={() => setOpen(false)}
              className="px-3 py-3 text-[15px] font-semibold text-[#496667] transition-colors hover:text-[#0B3D3F] md:px-0 md:py-0"
            >
              {link}
            </a>
          ))}
        </div>

        <a
          className="ml-auto flex h-10 items-center gap-1.5 rounded-[10px] bg-[#0B3D3F] px-4 text-[14px] font-bold text-white shadow-[0_8px_20px_rgba(11,61,63,.18)] transition hover:-translate-y-0.5 hover:bg-[#033232] md:ml-8"
          href="#pricing"
        >
          Connect AI <ArrowUpRight size={16} />
        </a>

        <button
          className="ml-2 grid h-10 w-10 place-items-center rounded-lg border-0 bg-transparent text-[#0B3D3F] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
    </header>
  );
}
