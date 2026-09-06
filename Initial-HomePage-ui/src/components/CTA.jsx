import React from "react";
import { ArrowRight } from "lucide-react";
import useReveal from "../hooks/useReveal";

export default function CTA() {
  const ref = useReveal();

  return (
    <section id="cta" className="relative min-h-[325px] overflow-hidden bg-gradient-to-r from-[#033232] via-[#0B5D62] to-[#18818D] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,.18),transparent_22%),radial-gradient(circle_at_75%_65%,rgba(255,255,255,.16),transparent_25%)]" />
      <div className="absolute -left-[35px] -top-[75px] h-[170px] w-[170px] rotate-45 rounded-[16px] border border-white/10" />
      <div className="absolute -bottom-[105px] -right-[20px] h-[210px] w-[210px] rotate-45 rounded-[16px] border border-white/10" />

      <div ref={ref} className="reveal relative z-10 mx-auto px-5 py-[70px] text-center">
        <div className="text-[13px] font-extrabold uppercase tracking-[.14em] text-[#C9E9E9]">Get started today</div>
        <h2 className="mt-3 font-[Manrope] text-[41px] font-black leading-[1.02] tracking-[-.06em] sm:text-[49px]">Power Your Work<br />with Intelligent Automation</h2>
        <p className="mx-auto mt-4 max-w-[560px] text-[14px] font-medium leading-[1.65] text-white/80">Build smarter systems, eliminate repetitive work, and give your team more time to focus on what matters.</p>
        <div className="mt-7 flex justify-center gap-3">
          <a href="#pricing" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-white px-6 text-[15px] font-extrabold text-[#0B3D3F] transition hover:-translate-y-1">Get Started <ArrowRight size={18} /></a>
          <a href="#how-it-works" className="inline-flex min-h-12 items-center justify-center rounded-[10px] border border-white/35 bg-white/10 px-6 text-[15px] font-extrabold text-white transition hover:-translate-y-1 hover:bg-white/15">Book Demo</a>
        </div>
      </div>
    </section>
  );
}
