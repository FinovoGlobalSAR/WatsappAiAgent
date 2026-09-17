import React from 'react';
import { MoreHorizontal, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';
export default function CarTable({ cars }) {
    const nav = useNavigate();
    return <div
        className="overflow-x-auto p-4">
        <table className="w-full min-w-[900px] border-separate border-spacing-0 overflow-hidden rounded-[9px] border border-[#edf0f3] text-left text-[13px]">
            <thead>
                <tr className="bg-[#f4f6fa] text-[#283047]">{['Car', 'Brand', 'Category', 'Year', 'Registration', 'Pricing', 'Status', 'Actions'].map((h) =>
                    <th key={h} className="px-3 py-[13px] text-[13px] font-semibold">{h}
                    </th>)}
                </tr>
            </thead>
            <tbody>{cars.length ? cars.map((c, i) =>
                <tr key={c.id} className={`${i === 0 ? 'bg-[#fbf6ff]' : ''} border-t border-[#edf0f3]`}>
                    <td className="px-3 py-3">
                        <div className="flex items-center gap-3">
                            <div className="grid h-[42px] w-[72px] place-items-center overflow-hidden rounded-md bg-[#f1f3f6]">
                                <span className="text-[20px] font-bold text-[#3f003d]">{c.brand[0]}</span>
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
                    <td className="px-3 py-3 text-[#667085]">{c.registration}</td>
                    <td className="px-3 py-3 text-[#667085]">{c.price}</td>
                    <td className="px-3 py-3">
                        <StatusBadge status={c.status} />
                    </td>
                    <td className="px-3 py-3">
                        <div className="flex gap-2">
                            <button className="grid h-9 w-9 place-items-center rounded-md border border-[#e1e5eb] bg-white text-[#334155]" aria-label={`Actions for ${c.model}`}>
                                <MoreHorizontal size={18} />
                            </button>
                            <button onClick={() => nav('/cars/edit')} className="grid h-9 w-9 place-items-center rounded-md border border-[#e1e5eb] bg-white text-[#334155]" aria-label="Edit car"><Settings size={17} />
                            </button>
                        </div>
                    </td>
                </tr>) : <tr>
                <td colSpan="8" className="p-8 text-center text-[#7b8494]">No cars found.</td>
            </tr>}</tbody>
        </table>
    </div>;
}
