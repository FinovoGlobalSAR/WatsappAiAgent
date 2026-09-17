import React from 'react';
import { LogOut, Menu, Search } from 'lucide-react';

export default function Topbar({ kind = 'list', onMenu }) {
  return <header className="flex h-[70px] items-center justify-between border-b border-[#e8ebf0] bg-white px-[17px] lg:pl-[31px] lg:pr-[31px]">
    <button className="mr-2 text-[#667085] lg:hidden" onClick={onMenu}>
      <Menu size={22} />
    </button>
    <div className="hidden items-center text-[13px] text-[#9a9caf] lg:flex">{kind === 'list' ? null : <>
      <span>{kind === 'add' ? 'Car' : 'Car'}</span>
      <span className="px-2">/</span>
      <b className="text-[#28233a]">{kind === 'add' ? 'Add Car' : 'Edit Car'}</b>
    </>}
    </div>
    <div className="flex h-[38px] w-full max-w-[455px] items-center gap-[9px] rounded-[7px] border border-[#e4e7ec] px-[11px] text-[13px] text-[#98a2b3] lg:mx-5">
      <Search size={17} />
      <span>Search car, customers, items...</span>
      <kbd className="ml-auto rounded border border-[#e4e7ec] bg-[#f8fafc] px-[6px] py-[1px] text-[11px] text-[#667085]">/</kbd>
    </div>
    <div className="ml-3 flex items-center gap-2 text-[#535366] lg:gap-3">
      <button className="hidden h-[34px] rounded px-2 sm:inline-flex">

      </button>
      <button className="hidden items-center gap-1.5 rounded px-2 text-[13px] sm:inline-flex"><LogOut size={17} /><span>
      </span>
      </button>
      <div className="grid h-[35px] w-[35px] place-items-center rounded-full bg-[#111827] text-[11px] font-semibold text-white">NR</div>
    </div>
  </header>;
}
