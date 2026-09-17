import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
export default function Pagination({ count }) {
    return <div className="flex flex-col gap-3 px-5 py-4 text-[13px] text-[#667085] sm:flex-row sm:items-center sm:justify-between">
        <span>Showing 1 to {count} of {count} cars</span>
        <div className="flex items-center gap-2">
            <button disabled className="grid h-[34px] w-[34px] place-items-center rounded-md border border-[#e4e7ec] bg-white disabled:opacity-50">
                <ChevronLeft size={16} />
            </button>
            <button className="grid h-[34px] w-[34px] place-items-center rounded-md bg-[#3f003d] text-white">1</button>
            <button disabled className="grid h-[34px] w-[34px] place-items-center rounded-md border border-[#e4e7ec] bg-white disabled:opacity-50">
                <ChevronRight size={16} />
            </button>
            <select defaultValue="10" className="h-[34px] rounded-md border border-[#e4e7ec] bg-white px-2 text-[13px]">
                <option value="10">10 per page</option>
                <option value="25">25 per page</option>
                <option value="50">50 per page</option>
            </select>
        </div>
    </div>;
}
