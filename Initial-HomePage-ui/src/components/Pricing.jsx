import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import useReveal from "../hooks/useReveal";

const plans = [
  {
    name: "Starter Plan",
    price: "$0",
    desc: "Perfect for exploring AI-powered automation.",
    icon: "starter",
    cta: "Get Started Free",
    items: ["Basic workflow automation", "Limited AI actions", "3 active workflows", "Community support"],
  },
  {
    name: "Pro Plan",
    price: "$25",
    desc: "For teams ready to automate serious work.",
    icon: "pro",
    cta: "Upgrade to Pro",
    featured: true,
    items: ["Unlimited workflows", "Advanced AI actions", "Real-time analytics", "Priority support"],
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const ref = useReveal();

  return (
    <section id="pricing" className="relative overflow-hidden bg-white py-[85px] sm:py-[105px]">
      <div ref={ref} className="reveal mx-auto w-[calc(100%-30px)] max-w-[1160px] sm:w-[calc(100%-48px)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-[13px] font-extrabold uppercase tracking-[.14em] text-[#0B777D]">Pricing</div>
            <h2 className="mt-3 font-[Manrope] text-[41px] font-black leading-[1.02] tracking-[-.06em] text-[#033232] sm:text-[49px]">Simple, Transparent Pricing</h2>
            <p className="mt-3 text-[14px] font-medium text-[#7C8B8C]">Start free and upgrade when your workflows grow.</p>
          </div>

          <div className="flex w-fit rounded-[10px] border border-[#DDE7E7] bg-white p-1">
            <button onClick={() => setAnnual(false)} className={`rounded-[7px] px-4 py-2.5 text-[12px] font-bold transition ${!annual ? "bg-[#E5F3F3] text-[#0B6870]" : "text-[#879596]"}`}>Monthly</button>
            <button onClick={() => setAnnual(true)} className={`rounded-[7px] px-4 py-2.5 text-[12px] font-bold transition ${annual ? "bg-[#E5F3F3] text-[#0B6870]" : "text-[#879596]"}`}>Annually</button>
          </div>
        </div>

        <div className="mt-9 grid grid-cols-1 border border-[#DDE7E7] md:grid-cols-2">
          {plans.map((plan) => (
            <article key={plan.name} className={`min-h-[380px] bg-white p-8 sm:p-9 ${plan.featured ? "border-t-2 border-[#18818D] shadow-[inset_0_0_0_1px_#18818D]" : ""} ${!plan.featured ? "md:border-r md:border-[#DDE7E7]" : ""}`}>
              <div className="flex min-h-[150px] justify-between gap-5">
                <div>
                  <span className="text-[12px] font-extrabold uppercase tracking-[.12em] text-[#0B777D]">{plan.name}</span>
                  <div className="mt-2 font-[Manrope] text-[48px] font-black tracking-[-.06em] text-[#033232]">
                    {plan.featured && annual ? "$20" : plan.price}
                    <small className="font-[DM_Sans] text-[12px] font-semibold tracking-normal text-[#929F9F]">/month</small>
                  </div>
                  <p className="mt-1 max-w-[240px] text-[12px] font-medium leading-[1.5] text-[#849394]">{plan.desc}</p>
                </div>

                <div className={`grid h-[82px] w-[82px] shrink-0 rotate-[-12deg] place-items-center rounded-[16px] bg-gradient-to-br from-white to-[#DCE8E8] text-[28px] shadow-[14px_16px_20px_rgba(11,61,63,.1),inset_0_0_20px_rgba(11,61,63,.06)] ${plan.featured ? "text-[#18818D]" : "text-[#0B6870]"}`}>
                  {plan.icon === "pro" ? "◆" : "✦"}
                </div>
              </div>

              <ul className="mb-7">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 py-2.5 text-[13px] font-semibold text-[#647879]">
                    <Check size={16} className="text-[#18818D]" /> {item}
                  </li>
                ))}
              </ul>

              <a href="#cta" className={`flex w-full items-center justify-center gap-2 rounded-[10px] px-4 py-3.5 text-[14px] font-extrabold transition hover:-translate-y-0.5 ${plan.featured ? "bg-[#0B3D3F] text-white shadow-[0_10px_24px_rgba(11,61,63,.16)] hover:bg-[#033232]" : "border border-[#DDE7E7] bg-white text-[#0B3D3F] hover:border-[#18818D]/40"}`}>
                {plan.cta}<ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
