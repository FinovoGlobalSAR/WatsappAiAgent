import React from 'react';
import { Car, CheckCircle2, Wrench } from 'lucide-react';
import { useCars } from '../../context/CarContext';

export default function CarStats() {
  const { stats } = useCars();

  const cards = [
    ['Total Cars', String(stats.total), Car, '#315ee7', '#eef3ff'],
    ['Available', String(stats.available), CheckCircle2, '#0f9f6e', '#eafaf4'],
    ['Rented', String(stats.rented), Car, '#7957d5', '#f2efff'],
    ['Maintenance', String(stats.maintenance), Wrench, '#dc8b20', '#fff6e7']
  ];

  return (
    <section className="mb-[23px] grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(([label, value, Icon, color, bg]) => (
        <div
          key={label}
          className="flex min-h-[98px] items-center justify-between rounded-[9px] border border-[#e8ebf0] bg-white px-[17px] py-[18px] shadow-[0_5px_8px_rgba(29,34,50,.08)] transition-transform hover:-translate-y-0.5"
        >
          <div>
            <p className="mb-[7px] text-[12px] text-[#7b8494]">{label}</p>
            <strong className="text-[23px] font-bold leading-none text-[#111827]">{value}</strong>
          </div>
          <div
            className="grid h-10 w-10 place-items-center rounded-[8px]"
            style={{ color, background: bg }}
          >
            <Icon size={20} />
          </div>
        </div>
      ))}
    </section>
  );
}
