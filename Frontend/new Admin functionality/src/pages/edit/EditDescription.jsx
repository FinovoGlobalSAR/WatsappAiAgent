import React from 'react';
import { FileText } from 'lucide-react';
import SectionCard from '../../components/common/SectionCard';

export default function EditDescription({ car, update }) {
    return <SectionCard icon={
        <FileText size={19} />} title="Description" subtitle="Add notes and additional information about this vehicle">
        <textarea className="block h-[55px] w-full resize-y rounded-[9px] border border-[#dcdbe1] bg-[#f1f1f2] p-2.5 text-[10px] outline-none" value={car.notes} onChange={e => update('notes', e.target.value)} />

    </SectionCard>;
}
