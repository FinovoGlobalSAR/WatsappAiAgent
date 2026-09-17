import React from 'react';
import { Car, Eye, Users, CarFront } from 'lucide-react';
import defaultCarPreview from '../../assets/car-preview.png';
import SectionCard from '../../components/common/SectionCard';

export default function EditPreview({ car }) {
  if (!car) return null;

  const photoSrc = car.photo !== undefined ? car.photo : defaultCarPreview;

  const statusColor =
    car.status === 'Available'
      ? 'text-[#21865d]'
      : car.status === 'Rented'
      ? 'text-[#2167d9]'
      : 'text-[#c7880a]';

  return (
    <SectionCard
      icon={<Eye size={19} />}
      title="Live preview"
      subtitle="This is how the car will appear in the catalog."
      className="mb-3"
    >
      <div className="relative h-[192px] overflow-hidden rounded-[8px] bg-[#eeeef0] flex items-center justify-center">
        {photoSrc ? (
          <img
            src={photoSrc}
            alt={car.model || 'Vehicle'}
            className="h-full w-full object-cover transition-all duration-200"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <CarFront size={48} className="text-gray-300" />
            <span className="mt-2 text-[10px]">No photo available</span>
          </div>
        )}
      </div>

      <h3 className="mb-[3px] mt-[7px] text-[17px] font-bold text-[#111827]">
        {car.brand || ''} {car.model || 'Vehicle'}
      </h3>

      <p className="m-0 text-[12px] text-[#6f6874]">
        <span>{car.category || 'Category'}</span>
        <span className="px-1">•</span>
        <span>{car.year || 'Year'}</span>
        <span className="px-1">•</span>
        <span className="font-mono">{car.registration || 'Registration'}</span>
      </p>

      <div className="my-[15px] flex justify-between gap-1 text-[9px] text-[#38323d]">
        <span className="flex items-center gap-1">
          <Users size={15} />
          {car.seats || 5} seats
        </span>
        <span className="flex items-center gap-1">
          <Car size={15} />
          {car.doors || 4} doors
        </span>
        <span className="flex items-center gap-1">⛽ {car.fuel || 'Petrol'}</span>
      </div>

      <div className="grid grid-cols-3 rounded-[6px] border border-[#ececf0] text-center bg-white">
        <div className="p-2">
          <b className="text-[12px] text-[#111827]">${car.daily || '0'}</b>
          <small className="block text-[8px] text-gray-500">/ day</small>
        </div>
        <div className="border-x border-[#ececf0] p-2">
          <b className="text-[12px] text-[#111827]">${car.weekly || '0'}</b>
          <small className="block text-[8px] text-gray-500">/ week</small>
        </div>
        <div className="p-2">
          <b className="text-[12px] text-[#111827]">${car.monthly || '0'}</b>
          <small className="block text-[8px] text-gray-500">/ month</small>
        </div>
      </div>

      <div className={`mt-3 text-[11px] font-semibold ${statusColor}`}>
        ● {car.status || 'Available'}
      </div>
    </SectionCard>
  );
}
