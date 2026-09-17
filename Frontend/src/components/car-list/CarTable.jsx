import React, { useState, useRef, useEffect } from 'react';
import { Settings, Trash2, ChevronDown, Check, Car as CarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
import { STATUSES } from '../../data/carOptions';

function QuickStatusSelector({ currentStatus, onSelectStatus }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group inline-flex items-center gap-1 cursor-pointer transition-opacity hover:opacity-85"
        title="Click to change status"
      >
        <StatusBadge status={currentStatus} />
        <ChevronDown size={12} className="text-gray-400 group-hover:text-gray-600" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-1 min-w-[140px] rounded-lg border border-[#e8ebf0] bg-white p-1 shadow-lg animate-in fade-in zoom-in-95 duration-100">
          <div className="px-2 py-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
            Change Status
          </div>
          {STATUSES.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => {
                onSelectStatus(st);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-left text-[12px] transition-colors ${
                currentStatus === st
                  ? 'bg-gray-100 font-semibold text-[#3f003d]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{st}</span>
              {currentStatus === st && <Check size={14} className="text-[#3f003d]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CarTable({ cars, onDeleteCar, onStatusChange }) {
  const nav = useNavigate();

  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full min-w-[900px] border-separate border-spacing-0 overflow-hidden rounded-[9px] border border-[#edf0f3] text-left text-[13px]">
        <thead>
          <tr className="bg-[#f4f6fa] text-[#283047]">
            {['Car', 'Brand', 'Category', 'Year', 'Registration', 'Pricing', 'Status', 'Actions'].map((h) => (
              <th key={h} className="px-3 py-[13px] text-[13px] font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cars.length ? (
            cars.map((c, i) => (
              <tr
                key={c.id}
                className={`${i % 2 === 1 ? 'bg-white' : 'bg-[#fcfdfd]'} border-t border-[#edf0f3] hover:bg-[#faf6fd] transition-colors`}
              >
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative grid h-[42px] w-[72px] shrink-0 place-items-center overflow-hidden rounded-md bg-[#f1f3f6] border border-[#e4e7ec]">
                      {c.photo ? (
                        <img
                          src={c.photo}
                          alt={c.model}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <span className={`${c.photo ? 'hidden' : ''} text-[18px] font-bold text-[#3f003d]`}>
                        {c.brand?.[0] || <CarIcon size={20} />}
                      </span>
                    </div>
                    <div>
                      <strong className="block font-semibold text-[#111827]">{c.model}</strong>
                      <small className="text-[#7b8494]">{c.brand}</small>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 text-[#667085]">{c.brand}</td>
                <td className="px-3 py-3 text-[#667085]">{c.category}</td>
                <td className="px-3 py-3 text-[#667085]">{c.year}</td>
                <td className="px-3 py-3 font-mono text-[12px] text-[#4b5563]">{c.registration}</td>
                <td className="px-3 py-3 font-medium text-[#1f2937]">{c.price || `$${c.daily || 45} / day`}</td>
                <td className="px-3 py-3">
                  <QuickStatusSelector
                    currentStatus={c.status}
                    onSelectStatus={(newStatus) => onStatusChange?.(c.id, newStatus)}
                  />
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => nav(`/cars/edit/${c.id}`)}
                      className="grid h-9 w-9 place-items-center rounded-md border border-[#e1e5eb] bg-white text-[#334155] transition-colors hover:border-[#3f003d] hover:bg-[#fbf7fc] hover:text-[#3f003d]"
                      aria-label={`Edit ${c.model}`}
                      title="Edit car details"
                    >
                      <Settings size={17} />
                    </button>
                    <button
                      onClick={() => onDeleteCar?.(c)}
                      className="grid h-9 w-9 place-items-center rounded-md border border-[#e1e5eb] bg-white text-gray-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      aria-label={`Delete ${c.model}`}
                      title="Delete car"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="p-12 text-center text-[#7b8494]">
                <div className="flex flex-col items-center justify-center">
                  <span className="mb-2 text-2xl">🚗</span>
                  <p className="font-semibold text-gray-700">No cars found</p>
                  <span className="text-xs text-gray-500">
                    Try adjusting your search query or filter criteria.
                  </span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
