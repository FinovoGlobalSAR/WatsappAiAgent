import React from 'react';
import { RotateCcw, Search } from 'lucide-react';
import { CATEGORIES } from '../../data/carOptions';

export default function CarFilters({ search, setSearch, category, setCategory, status, setStatus }) {
  const reset = () => {
    setSearch('');
    setCategory('All categories');
    setStatus('All statuses');
  };

  return (
    <div className="grid gap-[10px] border-b border-[#edf0f3] p-4 md:grid-cols-[minmax(280px,1fr)_170px_160px_auto]">
      <label className="flex h-[38px] items-center gap-2 rounded-[6px] border border-[#dfe3e8] bg-white px-[11px] text-[#98a2b3] focus-within:border-[#3f003d]">
        <Search size={16} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by brand, model, or registration number..."
          className="min-w-0 w-full bg-transparent text-[13px] text-[#344054] outline-none placeholder:text-[#98a2b3]"
        />
      </label>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="h-[38px] rounded-[6px] border border-[#dfe3e8] bg-white px-3 text-[13px] text-[#344054] outline-none cursor-pointer focus:border-[#3f003d]"
      >
        <option>All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="h-[38px] rounded-[6px] border border-[#dfe3e8] bg-white px-3 text-[13px] text-[#344054] outline-none cursor-pointer focus:border-[#3f003d]"
      >
        <option>All statuses</option>
        <option>Available</option>
        <option>Rented</option>
        <option>Maintenance</option>
      </select>

      <button
        type="button"
        onClick={reset}
        className="inline-flex h-[38px] items-center justify-center gap-1.5 rounded-[6px] border border-[#dfe3e8] bg-[#f8fafc] px-4 text-[13px] font-medium text-[#344054] transition-colors hover:bg-gray-100"
      >
        <RotateCcw size={15} />
        <span>Reset</span>
      </button>
    </div>
  );
}
