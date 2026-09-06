import React from "react";
import { ArrowRight, Database, Gauge, GitBranch, Layers3, Zap } from "lucide-react";
import useReveal from "../hooks/useReveal";

const featureCards = [
  { icon: Gauge, title: "Smart Automation", text: "Automate repetitive work with intelligent flows that run continuously." },
  { icon: GitBranch, title: "Easy Integration", text: "Connect your tools and systems without rebuilding your stack." },
  { icon: Zap, title: "Real-Time Results", text: "See execution status, insights, and outcomes as they happen." },
  { icon: Layers3, title: "Scalable Systems", text: "Build reliable automations that grow with your operation." },
];

export default function Workflow() {
  const ref = useReveal();

  return (
    <section id="about" className="relative overflow-hidden bg-[#F6FAFA] py-[82px] sm:py-[105px]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(11,61,63,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(11,61,63,.025)_1px,transparent_1px)] bg-[size:28px_28px]" />

      <div ref={ref} className="reveal relative z-10 mx-auto grid w-[calc(100%-30px)] max-w-[1160px] gap-10 sm:w-[calc(100%-48px)] lg:grid-cols-[1fr_1.12fr] lg:gap-[65px]">
        <div className="pt-2">
          <div className="text-[13px] font-extrabold uppercase tracking-[.14em] text-[#0B777D]">Why Fenovo?</div>
          <h2 className="mt-3 font-[Manrope] text-[41px] font-black leading-[1.02] tracking-[-.06em] text-[#033232] sm:text-[50px]">
            Built to Simplify Complex<br className="hidden sm:block" /> Workflows with AI
          </h2>
          <p className="mt-5 max-w-[430px] text-[16px] font-medium leading-[1.75] text-[#637879]">
            From repetitive tasks to complex operations, Fenovo brings your workflows together in one intelligent automation system.
          </p>
          <a href="#how-it-works" className="mt-6 inline-flex items-center gap-2 text-[14px] font-extrabold text-[#0B6870]">
            Learn More <ArrowRight size={17} />
          </a>
        </div>

        <div className="grid grid-cols-1 border-l border-t border-[#DDE7E7] sm:grid-cols-2">
          {featureCards.map(({ icon: Icon, title, text }) => (
            <article key={title} className="border-b border-r border-[#DDE7E7] bg-white/40 p-8 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_35px_rgba(11,61,63,.06)]">
              <span className="mb-5 grid h-10 w-10 place-items-center rounded-[10px] bg-[#E5F3F3] text-[#0B6A72]"><Icon size={19} /></span>
              <h3 className="mb-2 font-[Manrope] text-[17px] font-extrabold tracking-[-.025em] text-[#173D3E]">{title}</h3>
              <p className="text-[14px] font-medium leading-[1.65] text-[#738384]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
