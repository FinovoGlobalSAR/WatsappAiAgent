import React from 'react';
export default function Segment({ items, value, onChange }) {
    return <div className="grid h-[35px] grid-cols-2 rounded-[9px] border border-[#dddbe2] bg-[#efeff1] p-px">{items.map(x =>
        <button type="button" key={x} onClick={() => onChange(x)} className={`rounded-[7px] text-[10px] ${value === x ? 'bg-[#3f003d] text-white' : 'bg-transparent text-[#786f81]'}`}>{x}</button>)}
    </div>;
}
