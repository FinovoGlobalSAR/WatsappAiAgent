import React from 'react';
import { Minus, Plus } from 'lucide-react';
import Field from './Field';
export default function Counter({ label, value, onChange, required = true }) {
    return <>
        <Field label={label} required={required}>
            <div className="flex h-[35px] w-[106px] overflow-hidden rounded-[8px] border border-[#dddbe2] bg-[#f1f1f2]">
                <button type="button" onClick={() => onChange(-1)}
                    className="w-[34px] bg-transparent text-[#79727e]">
                    <Minus size={15} className="mx-auto" />
                </button>
                <span className="grid flex-1 place-items-center border-x border-[#e0dfe4] text-[10px] text-[#77717d]">{value}</span>
                <button type="button" onClick={() => onChange(1)} className="w-[34px] bg-transparent text-[#79727e]"><Plus size={15} className="mx-auto" />
                </button>
            </div>
        </Field>
    </>;
}
