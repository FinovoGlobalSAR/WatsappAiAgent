import React from 'react';
import { Settings, ChevronDown } from 'lucide-react';
import SectionCard from '../../components/common/SectionCard';
import Field from '../../components/common/Field';
import Segment from '../../components/common/Segment';
import Counter from '../../components/common/Counter';
import TextField from '../../components/common/TextField';
import { inputCls } from '../../components/common/inputStyles';
import { COLORS } from '../../data/carOptions';

export default function EditSpecifications({ car, update }) {
  return (
    <SectionCard
      icon={<Settings size={19} />}
      title="Specifications"
      subtitle="Technical details and features"
      className="mb-3"
    >
      <div className="grid grid-cols-2 gap-x-[17px] gap-y-3">
        <Field label="Transmission">
          <Segment
            items={['Automatic', 'Manual']}
            value={car.transmission || 'Automatic'}
            onChange={(v) => update('transmission', v)}
          />
        </Field>

        <Field label="Fuel type">
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {['Petrol', 'Diesel', 'Hybrid', 'Electric'].map((v) => (
              <button
                type="button"
                key={v}
                onClick={() => update('fuel', v)}
                className={`h-[35px] rounded-[17px] border px-2 text-[10px] transition-colors ${
                  car.fuel === v
                    ? 'border-[#5b0a58] bg-[#f8f2f9] text-[#4d0750] font-semibold'
                    : 'border-[#dfdde4] bg-[#f0f0f1] text-[#7b748e] hover:bg-gray-200'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </Field>

        <Counter
          label="Seats"
          value={car.seats || 5}
          onChange={(d) => update('seats', Math.max(1, (Number(car.seats) || 1) + d))}
        />
        <Counter
          label="Doors"
          value={car.doors || 4}
          onChange={(d) => update('doors', Math.max(1, (Number(car.doors) || 1) + d))}
        />

        <Field label="Color" required={false}>
          <div className="flex gap-2">
            <div
              className="h-[35px] w-[34px] shrink-0 rounded-[7px] border border-[#d5d5d5]"
              style={{ backgroundColor: car.color ? car.color.toLowerCase() : '#ccc' }}
            />
            <div className="relative flex-1">
              <select
                className={`${inputCls} appearance-none pr-8`}
                value={car.color || ''}
                onChange={(e) => update('color', e.target.value)}
              >
                <option value="">Select color</option>
                {COLORS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-[10px] top-[9px] text-[#6d6577]"
              />
            </div>
          </div>
        </Field>

        <TextField
          label="Mileage"
          value={car.mileage || ''}
          placeholder="e.g. 15000"
          max="50"
          onChange={(v) => update('mileage', v)}
        />
      </div>
    </SectionCard>
  );
}
