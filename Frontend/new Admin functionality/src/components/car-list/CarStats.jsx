import React from 'react';
import { Car, CheckCircle2, Wrench } from 'lucide-react';
export default function CarStats() {
    const stats = [['Total Cars', '24', Car, '#315ee7', '#eef3ff'], ['Available', '16', CheckCircle2, '#0f9f6e', '#eafaf4'],
    ['Rented', '5', Car, '#7957d5', '#f2efff'],
    ['Maintenance', '3', Wrench, '#dc8b20', '#fff6e7']];

    return <>
        <section className="mb-[23px] grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(([l, v, I, c, bg]) =>
            <div key={l} className="flex min-h-[98px] items-center justify-between rounded-[9px] border border-[#e8ebf0] bg-white px-[17px] py-[18px] shadow-[0_5px_8px_rgba(29,34,50,.08)]">
                <div>
                    <p className="mb-[7px] text-[12px] text-[#7b8494]">{l}</p>
                    <strong className="text-[23px] leading-none">{v}</strong>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-[8px]" style={{ color: c, background: bg }}><I size={20} />
                </div>
            </div>)}
        </section>
    </>;
}
