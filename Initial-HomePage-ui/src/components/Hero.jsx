import React from "react";
import {
  ArrowRight,
  Command,
  Database,
  Gauge,
  Play,
  Sparkles,
  Zap,
} from "lucide-react";
import useReveal from "../hooks/useReveal";
import Orb from "./Orb";

export default function Hero() {
  const ref = useReveal();

  return (
    <section id="top" className="relative min-h-[700px] overflow-hidden bg-[#F3F8F8] pb-0 pt-[140px] sm:min-h-[750px] sm:pt-[155px]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(11,61,63,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(11,61,63,.035)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[50%] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,.98),transparent_65%)]" />

      <div ref={ref} className="reveal relative z-10 mx-auto w-[calc(100%-30px)] max-w-[1160px] text-center sm:w-[calc(100%-48px)]">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#B4D5D5] bg-[#EAF5F5] px-4 py-2 text-[13px] font-extrabold uppercase tracking-[.14em] text-[#0B5C60]">
          <Sparkles size={15} /> AI-powered automation
        </div>

        <h1 className="mx-auto mt-6 max-w-[900px] font-[Manrope] text-[52px] font-black leading-[.98] tracking-[-.065em] text-[#033232] sm:text-[68px] lg:text-[82px]">
          Automate Your Workflow<br />with{" "}
          <span className="bg-gradient-to-r from-[#033232] via-[#0B3D3F] to-[#18818D] bg-clip-text text-transparent">
            Smart AI
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-[680px] text-[17px] font-medium leading-[1.7] text-[#557172]">
          Powerful automation tools that simplify complex workflows, connect your systems, and help your team work smarter.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <a href="#pricing" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[11px] bg-[#0B3D3F] px-6 text-[15px] font-extrabold text-white shadow-[0_12px_26px_rgba(11,61,63,.18)] transition hover:-translate-y-1 hover:bg-[#033232]">
            Get Started <ArrowRight size={18} />
          </a>
          <a href="#how-it-works" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[11px] border border-[#D6E2E2] bg-white px-6 text-[15px] font-extrabold text-[#0B3D3F] transition hover:-translate-y-1 hover:border-[#18818D]/40 hover:bg-[#F7FBFB]">
            <Play size={15} fill="currentColor" /> Book Demo
          </a>
        </div>

        <div className="relative mx-auto mt-8 h-[330px] max-w-[760px] sm:h-[365px]">
          <div className="absolute left-1/2 top-[65px] h-[280px] w-[650px] max-w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,#D9EEEE_0%,transparent_70%)] opacity-90" />

          <div className="absolute left-[3%] top-[55px] z-20 hidden items-center gap-2 rounded-[11px] border border-[#D9E5E5] bg-white/95 px-3 py-2 shadow-[0_12px_24px_rgba(11,61,63,.08)] sm:flex animate-float">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#E9F5F5] text-[#0B6A70]"><Database size={16} /></span>
            <div className="text-left"><b className="block text-[12px] font-extrabold text-[#173D3E]">Data</b><small className="block text-[10px] font-semibold text-[#8A9A9A]">Connected</small></div>
          </div>

          <div className="absolute right-[3%] top-[165px] z-20 hidden items-center gap-2 rounded-[11px] border border-[#D9E5E5] bg-white/95 px-3 py-2 shadow-[0_12px_24px_rgba(11,61,63,.08)] sm:flex animate-float-delay">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#E9F5F5] text-[#0B6A70]"><Zap size={16} /></span>
            <div className="text-left"><b className="block text-[12px] font-extrabold text-[#173D3E]">AI</b><small className="block text-[10px] font-semibold text-[#8A9A9A]">Optimized</small></div>
          </div>

          <Orb />

          {[
            ["left-[18%] top-[95px]", Database],
            ["right-[15%] top-[75px]", Command],
            ["left-[27%] top-[220px]", Gauge],
          ].map(([pos, Icon], i) => (
            <div key={i} className={`absolute ${pos} grid h-[54px] w-[54px] place-items-center rounded-[14px] border border-[#DCE7E7] bg-white shadow-[0_15px_30px_rgba(11,61,63,.08)] ${i === 1 ? "animate-float-delay" : "animate-float"}`}>
              <span className="grid h-[32px] w-[32px] place-items-center rounded-[9px] bg-[#EDF7F7] text-[#0B6C73]"><Icon size={19} /></span>
            </div>
          ))}

          <div className="absolute left-[23%] top-[125px] h-px w-[180px] rotate-[16deg] bg-gradient-to-r from-transparent via-[#18818D]/40 to-transparent" />
          <div className="absolute right-[23%] top-[120px] h-px w-[190px] rotate-[166deg] bg-gradient-to-r from-transparent via-[#18818D]/40 to-transparent" />
          <div className="absolute left-[31%] top-[235px] h-px w-[150px] rotate-[-17deg] bg-gradient-to-r from-transparent via-[#18818D]/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
