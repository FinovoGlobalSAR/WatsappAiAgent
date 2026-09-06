import React from "react";
import { ArrowRight } from "lucide-react";
import Brand from "./Brand";

const columns = [
  ["Product", ["Features", "How it works", "Pricing", "Integrations"]],
  ["Company", ["About", "Careers", "Resources", "Contact"]],
  ["Resources", ["Documentation", "Help Center", "Community", "Status"]],
];

export default function Footer() {
  return (
    <footer className="bg-white px-0 pb-5 pt-[60px]">
      <div className="mx-auto w-[calc(100%-30px)] max-w-[1160px] sm:w-[calc(100%-48px)]">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1.8fr] lg:gap-[100px]">
          <div>
            <Brand />
            <p className="mt-4 max-w-[290px] text-[13px] font-medium leading-[1.6] text-[#7C8B8C]">
              Simple automation with AI-powered workflows for modern teams.
            </p>

            <div className="mt-5 flex h-11 w-full max-w-[310px] overflow-hidden rounded-[9px] border border-[#DDE7E7]">
              <input
                className="min-w-0 flex-1 border-0 px-3 text-[12px] font-medium outline-none placeholder:text-[#9AA7A7]"
                placeholder="Enter your email"
                type="email"
              />
              <button aria-label="Subscribe" className="grid w-11 place-items-center bg-[#0B3D3F] text-white">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-7 sm:grid-cols-3">
            {columns.map(([title, items]) => (
              <div key={title} className="flex flex-col gap-3">
                <b className="mb-1 text-[13px] font-extrabold text-[#173D3E]">{title}</b>
                {items.map((item) => (
                  <a key={item} href="#top" className="text-[12px] font-medium text-[#899697] transition hover:text-[#0B3D3F]">
                    {item}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#DDE7E7] pt-4 text-[11px] font-medium text-[#9AA7A7] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Fenovo Global. All rights reserved.</span>
          <div className="flex gap-5"><a href="#top">Privacy Policy</a><a href="#top">Terms of Service</a></div>
          <span>Made for smarter work.</span>
        </div>
      </div>
    </footer>
  );
}
