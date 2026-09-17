import React, { useState, useEffect, useRef } from 'react';
import { FileText, ChevronDown, Check } from 'lucide-react';
import SectionCard from '../../components/common/SectionCard';
import { BRANDS, CATEGORIES } from '../../data/carOptions';

function CustomSelectField({ label, value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="mb-1.5 block text-[11px] font-semibold text-[#333]">{label}</label>

      {/* Select button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-10 w-full items-center justify-between rounded-[8px] border bg-white px-3 text-left text-[12px] transition-all duration-200 ease-out ${
          open
            ? 'border-[#4c2d5c] shadow-[0_0_0_3px_rgba(76,45,92,0.08)]'
            : 'border-[#d9d9dd] hover:border-[#bca9c5]'
        }`}
      >
        <span className={selectedOption || value ? 'text-[#333]' : 'text-[#999]'}>
          {selectedOption?.label || value || placeholder}
        </span>

        <ChevronDown
          size={16}
          className={`text-[#4c2d5c] transition-transform duration-200 ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute left-0 right-0 z-50 mt-1.5 origin-top overflow-hidden rounded-[9px] border border-[#e2dce5] bg-white shadow-[0_8px_24px_rgba(47,24,57,0.12)] transition-all duration-200 ease-out ${
          open
            ? 'visible translate-y-0 scale-100 opacity-100'
            : 'invisible -translate-y-1 scale-[0.98] opacity-0'
        }`}
      >
        <div className="max-h-[190px] overflow-y-auto p-1">
          {options.map((option) => {
            const selected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-[7px] px-3 py-2.5 text-left text-[12px] transition-colors duration-150 ${
                  selected
                    ? 'bg-[#f3edf5] font-semibold text-[#4c2d5c]'
                    : 'text-[#444] hover:bg-[#f8f4f9] hover:text-[#4c2d5c]'
                }`}
              >
                <span>{option.label}</span>
                {selected && <Check size={14} className="text-[#4c2d5c]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function EditIdentification({ car, update }) {
  const currentBrand = car.brand || '';
  const brandList = Array.from(new Set([...BRANDS, currentBrand].filter(Boolean)));
  const brandOptions = brandList.map((b) => ({ value: b, label: b }));

  const currentCat = car.category || '';
  const catList = Array.from(new Set([...CATEGORIES, currentCat].filter(Boolean)));
  const categoryOptions = catList.map((c) => ({ value: c, label: c }));

  const currentYear = new Date().getFullYear();
  const yearList = Array.from({ length: 25 }, (_, i) => String(currentYear + 1 - i));
  if (car.year && !yearList.includes(String(car.year))) {
    yearList.unshift(String(car.year));
  }
  const yearOptions = yearList.map((y) => ({ value: y, label: y }));

  return (
    <SectionCard
      icon={<FileText size={19} />}
      title="Identification"
      subtitle="Basic information about the vehicle"
      className="mb-3"
    >
      <div className="grid grid-cols-2 gap-x-[17px] gap-y-3">
        <CustomSelectField
          label="Brand"
          value={car.brand}
          onChange={(value) => update('brand', value)}
          options={brandOptions}
          placeholder="Select brand"
        />

        <CustomSelectField
          label="Category"
          value={car.category}
          onChange={(value) => update('category', value)}
          options={categoryOptions}
          placeholder="Select category"
        />

        <div>
          <label className="mb-1.5 block text-[11px] font-semibold text-[#333]">Model</label>
          <input
            type="text"
            value={car.model || ''}
            onChange={(e) => update('model', e.target.value)}
            placeholder="e.g. Corolla"
            className="h-10 w-full rounded-[8px] border border-[#d9d9dd] bg-white px-3 text-[12px] text-[#333] outline-none transition-all duration-200 placeholder:text-[#999] hover:border-[#bca9c5] focus:border-[#4c2d5c] focus:shadow-[0_0_0_3px_rgba(76,45,92,0.08)]"
          />
        </div>

        <CustomSelectField
          label="Year"
          value={String(car.year || '')}
          onChange={(value) => update('year', value)}
          options={yearOptions}
          placeholder="Select year"
        />

        {/* Registration Number */}
        <div className="col-span-2">
          <label className="mb-1.5 block text-[11px] font-semibold text-[#333]">
            Registration Number
          </label>
          <input
            type="text"
            value={car.registration || ''}
            onChange={(e) => update('registration', e.target.value)}
            placeholder="Enter registration number"
            className="h-10 w-full rounded-[8px] border border-[#d9d9dd] bg-white px-3 font-mono text-[12px] text-[#333] outline-none transition-all duration-200 placeholder:text-[#999] hover:border-[#bca9c5] focus:border-[#4c2d5c] focus:shadow-[0_0_0_3px_rgba(76,45,92,0.08)]"
          />
        </div>
      </div>
    </SectionCard>
  );
}
