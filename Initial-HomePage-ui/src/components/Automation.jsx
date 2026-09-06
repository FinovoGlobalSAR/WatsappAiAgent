import React from "react";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import useReveal from "../hooks/useReveal";

const steps = [
  ["Describe Your Task", "Tell Cuffy what you want to accomplish."],
  ["Set Up AI Automation", "Cuffy builds the workflow and connects the right tools."],
  ["Get Instant Results", "Watch your automation run and return the outcome."],
];

export default function Automation() {
  const ref = useReveal();

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-white py-[75px] sm:py-[95px]">
      <div ref={ref} className="reveal mx-auto grid w-[calc(100%-30px)] max-w-[1160px] items-center gap-10 sm:w-[calc(100%-48px)] lg:grid-cols-2 lg:gap-[80px]">
        <div className="relative h-[300px] overflow-hidden rounded-[4px] bg-gradient-to-br from-[#033232] via-[#0B5D62] to-[#18818D] shadow-[0_30px_50px_rgba(11,61,63,.18)] sm:h-[360px]">
          <div className="absolute inset-[-30%] bg-[radial-gradient(circle_at_30%_35%,rgba(255,255,255,.28),transparent_25%),radial-gradient(circle_at_75%_70%,rgba(255,255,255,.2),transparent_20%)] blur-lg" />
          <div className="absolute left-1/2 top-[52px] grid h-[58px] w-[58px] -translate-x-1/2 place-items-center rounded-[15px] border border-white/50 bg-white/10 text-white shadow-[0_10px_30px_rgba(0,0,0,.12)]">
            <Sparkles size={30} />
          </div>
          <div className="absolute left-[10%] top-[125px] h-[132px] w-[80%] rounded-[13px] bg-white p-3 shadow-[0_25px_45px_rgba(3,50,50,.28)] h-100">
            <div className="flex h-[59px] items-start justify-between rounded-[9px] border border-[#DCE7E7] p-3 text-[12px] font-semibold text-[#9AA9AA]">
              <span>Ask anything...</span>
              <button className="grid h-8 w-8 place-items-center rounded-lg bg-[#0B3D3F] text-white"><ArrowRight size={16} /></button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["Automate Tasks", "Build Workflow", "Analyse Data","Integrate Tools"].map((t) => (
                <span key={t} className="rounded-md bg-[#E8F5F5] px-2.5 py-1.5 text-[10px] font-bold text-[#0B6970]">{t}</span>
              ))}
            </div>
          </div>
          <div className="absolute -left-[55px] top-[185px] h-[130px] w-[130px] animate-pulse-ring rounded-full border border-white/30" />
          <div className="absolute -right-[90px] top-[50px] h-[180px] w-[180px] animate-pulse-ring rounded-full border border-white/25 [animation-delay:-1.4s]" />
        </div>

        <div>
          <div className="text-[13px] font-extrabold uppercase tracking-[.14em] text-[#0B777D]">Smart Automation</div>
          <h2 className="mt-3 font-[Manrope] text-[41px] font-black leading-[1.03] tracking-[-.06em] text-[#033232] sm:text-[49px]">
            Let AI Handle the Work<br className="hidden sm:block" /> for You
          </h2>
          <p className="mt-5 max-w-[480px] text-[15px] font-medium leading-[1.75] text-[#66797A]">
            Describe what you need. Cuffy turns natural language into reliable, repeatable workflows that execute across your connected tools.
          </p>

          <div className="mt-7">
            {steps.map(([title, description], i) => (
              <div key={title} className="flex items-center gap-3 border-t border-[#DDE7E7] py-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#E5F3F3] text-[11px] font-extrabold text-[#0B6870]">{i + 1}</span>
                <div className="flex-1">
                  <b className="block text-[14px] font-extrabold text-[#173D3E]">{title}</b>
                  <small className="mt-1 block text-[12px] font-medium text-[#849394]">{description}</small>
                </div>
                <ChevronRight size={17} className="text-[#789091]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
