import React from 'react';
import { Settings } from 'lucide-react';
import SectionCard from '../../components/common/SectionCard';
import Field from '../../components/common/Field';
import Segment from '../../components/common/Segment';
import Counter from '../../components/common/Counter';
import TextField from '../../components/common/TextField';
import { inputCls } from '../../components/common/inputStyles';
export default function EditSpecifications({ car, update }) {
    return <SectionCard
        icon={<Settings size={19} />}
        title="Specifications"
        subtitle="Technical details and features"
        className="mb-3">
        <div className="grid grid-cols-2 gap-x-[17px] gap-y-3">
            <Field label="Transmission">
                <Segment items={['Automatic', 'Manual']} value={car.transmission} onChange={v => update('transmission', v)} />
            </Field>
            <Field label="Fuel type">
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">{['Petrol', 'Diesel', 'Hybrid', 'Electric'].map(v =>
                    <button type="button" key={v} onClick={() => update('fuel', v)} className={`h-[35px] rounded-[17px] border px-2 text-[9px] ${car.fuel === v ? 'border-[#5b0a58] bg-[#f8f2f9] text-[#4d0750]' : 'border-[#dfdde4] bg-[#f0f0f1] text-[#7b748e]'}`}>{v}</button>)}
                </div>
            </Field>
            <Counter label="Seats" value={car.seats} onChange={d => update('seats', Math.max(1, car.seats + d))} />
            <Counter label="Doors" value={car.doors} onChange={d => update('doors', Math.max(1, car.doors + d))} />
            <Field label="Color" required={false}>
                <div className="flex gap-2">
                    <div className="h-[35px] w-[31px] rounded-[5px] border border-[#d5d5d5] bg-black" />
                    <input className={`${inputCls} flex-1`} value={car.color} onChange={e => update('color', e.target.value)} />
                </div>
            </Field>
            <TextField label="Mileage" value={car.mileage} max="50" onChange={v => update('mileage', v)} />
        </div>
    </SectionCard>;
}
