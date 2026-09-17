import React from 'react';
import { Check, Tag } from 'lucide-react';
import SectionCard from '../../components/common/SectionCard';
import Field from '../../components/common/Field';
export default function EditPricing({ car, update }) {
    const statuses = [['Available', 'Ready for rent', 'green'], ['Rented', 'Currently rented', 'blue'], ['Maintenance', 'Under service', 'gold']];
    return <SectionCard
        icon={<Tag size={19} />}
        title="Pricing & availability" subtitle="Set the rental rate and availability status."
        className="mb-3">
        <div className="mb-3 flex gap-3">
            {['Daily', 'Weekly', 'Monthly'].map(p =>
                <button type="button" key={p} className="flex h-9 items-center gap-1.5 rounded-[8px] bg-[#3f003d] px-3 text-[10px] text-white">
                    <Check size={15} />{p}
                </button>)}
        </div>
        <div className="grid grid-cols-3 gap-[13px]">{[['Daily Rate ($)', 'daily', '/ day'], ['Weekly Rate', 'weekly', '/ week'],
        ['Monthly Rate', 'monthly', '/ month']].map(([l, k, s]) =>
            <Field key={k} label={l}>
                <div className="flex h-[35px] items-center gap-2 rounded-[9px] border border-[#dcdbe1] bg-[#f1f1f2] px-[10px]">
                    <b>$</b>
                    <input className="min-w-0 flex-1 bg-transparent text-[11px] outline-none" value={car[k]} onChange={e => update(k, e.target.value)} />
                    <span className="text-[8px] text-[#888195]">{s}</span>
                </div>
            </Field>)}</div>
        <div className="mb-2 mt-3 text-[9px] font-semibold">Status</div>
        <div className="grid grid-cols-3 gap-[11px]">{statuses.map(([n, d, t]) =>
            <button type="button" key={n} onClick={() => update('status', n)}
                className={`flex h-[53px] items-start gap-[7px] rounded-[9px] border px-2 py-2 text-left ${car.status === n && t === 'green' ? 'border-[#377f64] bg-[#edf8f2]' : 'border-[#dcdbe1] bg-[#f0f0f1]'}`}>
                <span className={`mt-px h-[11px] w-[11px] rounded-full ${t === 'green' ? 'bg-[#319a70]' : t === 'blue' ? 'bg-[#2864cf]' : 'bg-[#b27c09]'} shadow-[inset_0_0_0_3px_#fff]`} />
                <span>
                    <b className="block text-[9px]">{n}</b>
                    <small className="text-[8px] text-[#827c92]">{d}</small>
                </span>
            </button>)}
        </div>
    </SectionCard>;
}
