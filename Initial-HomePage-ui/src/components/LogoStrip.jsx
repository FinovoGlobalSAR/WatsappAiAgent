import React from "react";

const logos = ["Explorious", "Acme Corp", "Netsche", "Polymath"];

export default function LogoStrip() {
  return (
    <section className="relative z-10 border-y border-[#DDE7E7] bg-white py-7">
      <div className="mx-auto grid w-[calc(100%-30px)] max-w-[1160px] grid-cols-2 gap-5 sm:w-[calc(100%-48px)] md:grid-cols-4">
        {logos.map((logo) => (
          <div key={logo} className="flex items-center justify-center gap-2 text-[14px] font-extrabold text-[#778889]">
            <span className="h-[16px] w-[16px] rotate-45 rounded-[5px] bg-gradient-to-br from-[#B8D0D0] to-[#587879]" />
            {logo}
          </div>
        ))}
      </div>
    </section>
  );
}
