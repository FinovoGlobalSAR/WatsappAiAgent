import React from 'react';
export default function StatusBadge({ status }) {
    const s = {
        Available: 'border-[#bde8d7] bg-[#eafaf4] text-[#17805b]',
        Rented: 'border-[#cfe0ff] bg-[#eef4ff] text-[#2167d9]',
        Maintenance: 'border-[#f8dfad] bg-[#fff6e5] text-[#c7880a]'
    }
    [status] || '';
    return <span className={`inline-flex items-center gap-1.5 rounded-full border px-[9px] py-[5px] text-[11px] font-semibold ${s}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" />{status}
    </span>;
}
