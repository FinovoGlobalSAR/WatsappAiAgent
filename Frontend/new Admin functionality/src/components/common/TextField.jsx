import React from 'react';
import Field from './Field';
import { inputCls } from './inputStyles';
export default function TextField({ label, required = true, value, placeholder, max, onChange }) {
    return <Field label={label} required={required} hint={max ? `Max ${max} chars` : null}>
        <input className={inputCls} value={value} placeholder={placeholder} maxLength={max} onChange={e => onChange(e.target.value)} />
    </Field>;
}
