import React from 'react';
import { Globe2 } from 'lucide-react';


export default function Catalog() {
    return <div className="rounded-[10px] border border-[#e2e0e7] bg-white p-4">
        <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold">
            <Globe2 size={17} />Catalog visibility</div>
        <p className="m-0 text-[9px] text-[#928ba8]">This vehicle is visible in your public catalog.</p>
    </div>;
}
