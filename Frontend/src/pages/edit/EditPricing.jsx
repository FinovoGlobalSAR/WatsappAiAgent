import React from 'react';
import { Check, Tag } from 'lucide-react';
import SectionCard from '../../components/common/SectionCard';
import Field from '../../components/common/Field';

export default function EditPricing({ car, update }) {
  const statuses = [
    ['Available', 'Ready for rent', 'green'],
    ['Rented', 'Currently rented', 'blue'],
    ['Maintenance', 'Under service', 'gold']
  ];

  const periods = Array.isArray(car?.periods) ? car.periods : ['Daily', 'Weekly', 'Monthly'];

  const togglePeriod = (p) => {
    const next = periods.includes(p) ? periods.filter((x) => x !== p) : [...periods, p];
    update('periods', next);
  };

  return (
    <SectionCard
      icon={<Tag size={19} />}
      title="Pricing & availability"
      subtitle="Set the rental rate and availability status."
      className="mb-3"
    >
      <div className="mb-2 text-[10px] font-semibold text-[#343043]">Available For</div>
      <div className="mb-3 flex gap-3">
        {['Daily', 'Weekly', 'Monthly'].map((p) => {
          const isSelected = periods.includes(p);
          return (
            <button
              type="button"
              key={p}
              onClick={() => togglePeriod(p)}
              className={`flex h-9 items-center gap-1.5 rounded-[8px] px-3 text-[11px] font-medium transition-all ${
                isSelected
                  ? 'bg-[#3f003d] text-white shadow-xs'
                  : 'bg-[#f0f0f1] text-[#786f81] hover:bg-gray-200'
              }`}
            >
              {isSelected && <Check size={14} />}
              <span>{p}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-[13px]">
        {[
          ['Daily Rate ($)', 'daily', '/ day'],
          ['Weekly Rate', 'weekly', '/ week'],
          ['Monthly Rate', 'monthly', '/ month']
        ].map(([label, key, suffix]) => (
          <Field key={key} label={label}>
            <div className="flex h-[35px] items-center gap-2 rounded-[9px] border border-[#dcdbe1] bg-[#f1f1f2] px-[10px] focus-within:border-[#3f003d]">
              <b className="text-[11px] text-[#25212c]">$</b>
              <input
                className="min-w-0 flex-1 bg-transparent text-[11px] text-[#25212c] outline-none"
                value={car[key] || ''}
                onChange={(e) => update(key, e.target.value)}
              />
              <span className="text-[9px] text-[#888195]">{suffix}</span>
            </div>
          </Field>
        ))}
      </div>

      <div className="mb-2 mt-4 text-[10px] font-semibold text-[#343043]">Status</div>
      <div className="grid grid-cols-3 gap-[11px]">
        {statuses.map(([name, desc, colorType]) => {
          const isSelected = car.status === name;
          return (
            <button
              type="button"
              key={name}
              onClick={() => update('status', name)}
              className={`flex h-[53px] items-start gap-[8px] rounded-[9px] border px-2.5 py-2 text-left transition-all ${
                isSelected
                  ? colorType === 'green'
                    ? 'border-[1.5px] border-[#377f64] bg-[#edf8f2]'
                    : colorType === 'blue'
                    ? 'border-[1.5px] border-[#2864cf] bg-[#eef4ff]'
                    : 'border-[1.5px] border-[#c7880a] bg-[#fff6e5]'
                  : 'border-[#dcdbe1] bg-[#f0f0f1] hover:bg-gray-100'
              }`}
            >
              <span
                className={`mt-1 h-[11px] w-[11px] shrink-0 rounded-full ${
                  colorType === 'green'
                    ? 'bg-[#319a70]'
                    : colorType === 'blue'
                    ? 'bg-[#2864cf]'
                    : 'bg-[#b27c09]'
                } shadow-[inset_0_0_0_3px_#fff]`}
              />
              <span>
                <b className="block text-[10px] text-[#25212c]">{name}</b>
                <small className="block text-[8px] text-[#827c92]">{desc}</small>
              </span>
            </button>
          );
        })}
      </div>
    </SectionCard>
  );
}
