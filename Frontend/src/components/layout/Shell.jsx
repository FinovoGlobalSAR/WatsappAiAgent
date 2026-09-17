import React, { useState } from 'react';
import SharedSidebar from './SharedSidebar';
import Topbar from './Topbar';

export default function Shell({ children, kind = 'list' }) {
  const [mobile, setMobile] = useState(false);
  return <div className="min-h-screen bg-[#f7f8fa] font-sans text-[#172033]">
    <SharedSidebar mobileNav={mobile} setMobileNav={setMobile} />
    <div className="min-w-0 lg:ml-[224px]">
      <Topbar kind={kind} onMenu={() => setMobile(true)} />
      {children}
    </div>
  </div>;
}
