import React from 'react';
import { ChevronDown } from 'lucide-react';
import Field from './Field';
import { inputCls } from './inputStyles';
export default function SelectField(
    { label,
        required = true,
        value,
        placeholder,
        options,
        onChange }) {
    return <Field label={label} required={required}>
        <div className="relative">
            <select className={`${inputCls} appearance-none pr-8`} value={value} onChange={e => onChange(e.target.value)}>
                <option value="">{placeholder}</option>
                {options.map(o =>
                    <option key={o}>{o}</option>)}
            </select>
            <ChevronDown size={17} className="pointer-events-none absolute right-[10px] top-[9px] text-[#6d6577]" />
        </div>
    </Field>;
}
