import React from 'react';
export default function SectionCard({ icon, title, subtitle, children, className = '' }) {
    return <section className={`rounded-[10px] border border-[#e2e0e7] bg-white p-4 ${className}`}>
        <div className="flex items-center gap-[11px]">
            <div className="grid h-[34px] w-[34px] place-items-center rounded-[7px] bg-[#f3edf5] text-[#4b0750]">{icon}
            </div>
            <div>
                <h2 className="mb-1 text-[12px] font-bold text-[#343043]">{title}
                </h2>
                <p className="m-0 text-[9px] text-[#928ba8]">{subtitle}</p>
            </div>
        </div>
        <div className="my-[10px] h-px bg-[#e7e5eb]" />{children}
    </section>;
}
