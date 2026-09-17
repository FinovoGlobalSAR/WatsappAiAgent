import React, { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Shell from '../components/layout/Shell';
import CarStats from '../components/car-list/CarStats';
import CarFilters from '../components/car-list/CarFilters';
import CarTable from '../components/car-list/CarTable';
import Pagination from '../components/car-list/Pagination';

export default function CarStatusList() {
  const nav = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All categories');
  const [status, setStatus] = useState('All statuses');
  const cars = [
    [1, 'Toyota Corolla', 'Toyota', 'Sedan', 2024, 'ABC-1234', '$45 / day', 'Maintenance'],
    [2, 'Toyota Corolla', 'Toyota', 'Sedan', 2024, 'ABC-1234', '$45 / day', 'Rented'],
    [3, 'Toyota Corolla', 'Toyota', 'Sedan', 2024, 'ABC-1234', '$45 / day', 'Available'],
    [4, 'Toyota Corolla', 'Toyota', 'Sedan', 2024, 'ABC-1234', '$45 / day', 'Maintenance'],
    [5, 'Toyota Corolla', 'Toyota', 'Sedan', 2024, 'ABC-1234', '$45 / day', 'Maintenance'],
    [6, 'Toyota Corolla', 'Toyota', 'Sedan', 2024, 'ABC-1234', '$45 / day', 'Rented'],
    [7, 'Toyota Corolla', 'Toyota', 'Sedan', 2024, 'ABC-1234', '$45 / day', 'Available'],
    [8, 'Toyota Corolla', 'Toyota', 'Sedan', 2024, 'ABC-1234', '$45 / day', 'Maintenance']
  ].map(([id, model, brand, cat, year, registration, price, status]) =>
    ({ id, model, brand, category: cat, year, registration, price, status }));
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return cars.filter(c => (!q || [c.brand, c.model, c.registration].some(v => v.toLowerCase().includes(q)))
      && (category === 'All categories' || c.category === category) && (status === 'All statuses' || c.status === status));
  }, [search, category, status]);

  return <Shell kind="list">
    <main className="mx-auto max-w-[1600px] px-4 pb-10 pt-[31px] lg:px-8">

      <div className="mb-[25px] flex items-start justify-between gap-5">
        <div>
          <h1 className="m-0 mb-[7px] text-[26px] font-bold leading-tight tracking-[-.7px] text-[#111827]">Cars</h1>
          <p className="m-0 text-[13px] text-[#7b8494]">Manage your vehicle fleet. Add new cars, edit details, or update availability</p>
        </div>

        <button onClick={() => nav('/add-car')} className="inline-flex h-[38px] items-center gap-[7px] rounded-[7px] bg-[#ffbd22] px-[15px] text-[13px] font-semibold text-[#1e1a18] shadow-sm hover:bg-[#ffbd22]">
          <Plus size={17} />Add Car
        </button>

      </div>

      <CarStats />

      <section className="overflow-hidden rounded-[9px] border border-[#e8ebf0] bg-white shadow-[0_8px_20px_rgba(29,34,50,.04)]">

        <CarFilters {...{ search, setSearch, category, setCategory, status, setStatus }} />
        <CarTable cars={filtered} />

        <Pagination count={filtered.length} />
        
      </section>
    </main>
  </Shell>;
}
