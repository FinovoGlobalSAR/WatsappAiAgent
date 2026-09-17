import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Shell from '../components/layout/Shell';
import EditIdentification from './edit/EditIdentification';
import EditSpecifications from './edit/EditSpecifications';
import EditPricing from './edit/EditPricing';
import EditDescription from './edit/EditDescription';
import EditPhoto from './edit/EditPhoto';
import EditPreview from './edit/EditPreview';
import Catalog from './edit/Catalog';
import { initialCar } from '../data/carOptions';

export default function EditCarPage() {
  const [car, setCar] = useState(initialCar);
  const nav = useNavigate();
  const update = (k, v) => setCar(c => ({ ...c, [k]: v }));

  return <Shell kind="edit">
    <main className="bg-[#f4f6fb] p-5 lg:px-11">
      <div className="mx-auto max-w-[1200px] rounded-[14px] bg-white p-4 shadow-[0_8px_20px_rgba(29,34,50,.04)]">
        <div className="flex items-start justify-between px-3 pb-[9px]">
          <div>
            <div className="mb-[7px] flex items-center gap-[11px] text-[10px] text-[#7e7b99]">
              <span>Cars</span>
              <b className="text-[15px] text-[#aaa7b6]">›</b>
              <strong className="text-[#463653]">Edit a car</strong>
            </div>
            <h1 className="text-[25px] font-bold leading-tight text-[#242036]">Edit a Car</h1>
            <p className="mt-[5px] text-[12px] text-[#807c9a]">Update the vehicle details below. Make any changes and save when you're</p>
          </div>
          <div className="flex gap-3 pt-[17px]">
            <button onClick={() => nav('/cars/edit')} className="h-9 rounded-[7px] border border-[#d7dae3] bg-white px-[17px] text-[12px] font-semibold text-[#383249]">Cancel</button>
            <button onClick={() => alert('Changes saved')} className="flex h-9 items-center gap-1.5 rounded-[7px] bg-[#ffbf2d] px-[17px] text-[12px] font-semibold text-[#28231c]">
              <Check size={16} />Save changes</button>
          </div>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_260px] gap-[21px] max-lg:grid-cols-1">
          <div className="min-w-0">
            <EditIdentification car={car} update={update} />
            <EditSpecifications car={car} update={update} />
            <EditPricing car={car} update={update} />
            <EditDescription car={car} update={update} />
          </div>
          <div className="min-w-0">
            <EditPhoto />
            <EditPreview car={car} />
            <Catalog />
          </div>
        </div>
      </div>
    </main>
  </Shell>;
}
