import React from "react";
import { Database, Gauge, GitBranch, Sparkles } from "lucide-react";
import useReveal from "../hooks/useReveal";

const powerful = [
  { icon: Sparkles, title: "Advanced Analytics", text: "Turn performance data into useful actions and better decisions." },
  { icon: Database, title: "Seamless Integration", text: "Connect your favorite apps and move information between them." },
  { icon: Gauge, title: "Real-Time Processing", text: "Keep critical workflows moving with instant processing." },
  { icon: GitBranch, title: "Smart Workflow Automation", text: "Create adaptive workflows that react to what is happening." },
];

const stats = [
  ["98.4%", "Automation success", "+12.4%"],
  ["24.8k", "Tasks completed", "+18.1%"],
  ["1.8s", "Average response", "-24.2%"],
];

export default function Powerful() {
  const ref = useReveal();

  return (
    <section id="features" className="relative overflow-hidden bg-[#F6FAFA] py-[85px] sm:py-[105px]">
      <div ref={ref} className="reveal relative z-10 mx-auto w-[calc(100%-30px)] max-w-[1160px] sm:w-[calc(100%-48px)]">
        <div className="text-center">
          <div className="text-[13px] font-extrabold uppercase tracking-[.14em] text-[#0B777D]">Features</div>
          <h2 className="mt-3 font-[Manrope] text-[41px] font-black leading-[1.02] tracking-[-.06em] text-[#033232] sm:text-[50px]">
            Powerful Features for<br />
            <span className="bg-gradient-to-r from-[#033232] to-[#18818D] bg-clip-text text-transparent">Smarter Automation</span>
          </h2>
          <p className="mt-4 text-[15px] font-medium text-[#738384]">Everything you need to build, monitor, and improve intelligent workflows.</p>
        </div>

        <div className="mt-12 border border-[#DDE7E7] bg-white p-5 sm:p-8">
          <div className="grid items-center gap-7 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <span className="text-[12px] font-extrabold uppercase tracking-[.12em] text-[#0B777D]">Advanced Analytics</span>
              <h3 className="mt-2 font-[Manrope] text-[25px] font-extrabold tracking-[-.04em] text-[#173D3E]">See every workflow at a glance</h3>
              <p className="mt-2 max-w-[350px] text-[14px] font-medium leading-[1.6] text-[#819091]">Track performance, system health, and automation activity in real time.</p>
            </div>

            <div className="relative h-[170px] border-b border-[#DDE7E7] bg-[repeating-linear-gradient(0deg,transparent,transparent_33px,#E8EEEE_34px)]">
              <div className="absolute inset-[35px_10px_20px] flex items-end justify-between gap-2">
                {[35, 54, 42, 75, 63, 88, 100].map((height, i) => (
                  <i key={i} className="block w-[8%] rounded-t-lg bg-gradient-to-t from-[#0B3D3F] to-[#18818D] animate-bars" style={{ height: `${height}%`, animationDelay: `${-i * .2}s` }} />
                ))}
              </div>
              <div className="absolute inset-x-[10px] bottom-0 h-[75%] bg-gradient-to-t from-[#18818D]/10 to-transparent [clip-path:polygon(0_75%,16%_58%,31%_66%,47%_40%,62%_50%,78%_23%,100%_4%,100%_100%,0_100%)]" />
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 border-t border-[#DDE7E7] sm:grid-cols-3">
            {stats.map(([value, label, change]) => (
              <div key={label} className="border-b border-[#DDE7E7] p-5 sm:border-b-0 sm:border-r last:border-0">
                <b className="block font-[Manrope] text-[26px] font-extrabold tracking-[-.04em] text-[#173D3E]">{value}</b>
                <span className="text-[12px] font-semibold text-[#879596]">{label}</span>
                <em className="mt-1.5 block text-[11px] font-extrabold not-italic text-[#0B777D]">{change}</em>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {powerful.map(({ icon: Icon, title, text }) => (
            <article key={title} className="min-h-[175px] border-b border-r border-t border-[#DDE7E7] bg-white/50 p-7 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_35px_rgba(11,61,63,.05)]">
              <span className="mb-4 grid h-10 w-10 place-items-center rounded-[9px] bg-[#E5F3F3] text-[#0B6A72]"><Icon size={20} /></span>
              <h3 className="mb-2 font-[Manrope] text-[16px] font-extrabold tracking-[-.025em] text-[#173D3E]">{title}</h3>
              <p className="text-[13px] font-medium leading-[1.65] text-[#7C8B8C]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
