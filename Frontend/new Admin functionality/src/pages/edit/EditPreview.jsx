import React from 'react';
import { Car, Eye, Users } from 'lucide-react';
import carPreview from '../../assets/car-preview.png';
import SectionCard from '../../components/common/SectionCard';
export default function EditPreview({ car }) {
    return <SectionCard
        icon={<Eye size={19} />}
        title="Live preview"
        subtitle="This is how the car will appear in the catalog." className="mb-3">
        <div className="h-[192px] overflow-hidden rounded-[8px] bg-[#eeeef0]">
            <img src={carPreview} alt={car.model} className="h-full w-full object-cover" />
        </div>
        <h3 className="mb-[3px] mt-[7px] text-[17px]">{car.brand} {car.model}</h3>
        <p className="m-0 text-[12px] text-[#6f6874]">{car.category}
            <span className="px-1">•</span>{car.year}
            <span className="px-1">•</span>{car.registration}
        </p>
        <div className="my-[15px] flex justify-between gap-1 text-[9px] text-[#38323d]">
            <span className="flex items-center gap-1">
                <Users size={15} />{car.seats} seats</span>
            <span className="flex items-center gap-1">
                <Car size={15} />{car.doors} doors</span>
            <span className="flex items-center gap-1">⛽{car.fuel}</span>
        </div>
        <div className="grid grid-cols-3 border border-[#ececf0] text-center">
            <div className="p-2"><b>${car.daily}</b>
                <small className="block text-[8px]">/ day</small>
            </div>
            <div className="border-x border-[#ececf0] p-2">
                <b>${car.weekly}</b>
                <small className="block text-[8px]">/ week</small>
            </div>
            <div className="p-2">
                <b>${car.monthly}</b>
                <small className="block text-[8px]">/ month</small>
            </div>
        </div>
        <div className="mt-3 text-[10px] text-[#21865d]">● {car.status}</div>
    </SectionCard>;
}
