import React from "react";

export default function Brand({ light = false }) {
  return (
    <a
      className={`flex items-center gap-2 font-[Manrope] text-[20px] font-extrabold tracking-[-0.05em] ${light ? "text-white" : "text-[#033232]"
        }`}
      href="#top"
      aria-label="Cuffy home"
    >
      <span className="relative grid h-7 w-7 rotate-[-8deg] place-items-center rounded-[8px] bg-gradient-to-br from-[#0B3D3F] via-[#18818D] to-[#55C9C9] shadow-[0_5px_12px_rgba(11,61,63,.22)]">
        <span className="absolute h-[11px] w-[11px] translate-x-[-2px] translate-y-[-2px] rounded-[2px] bg-white/95" />
        <span className="absolute h-[11px] w-[11px] translate-x-[2px] translate-y-[2px] rounded-[2px] bg-white/65" />
        <span className="relative h-1 w-1 rounded-full bg-[#0B3D3F]" />
      </span>
      <span>Fenovo Global</span>
    </a>
  );
}
