import React from 'react';
import Req from './Req';
export default function Field({ label, required = true, hint, children }) {
    return <div className="min-w-0">
        <label className="mb-[5px] block text-[9px] font-semibold text-[#343043]">{label} {required && <Req />}
        </label>{children}{hint &&
            <small className="mt-1 block px-1.5 text-[8px] text-[#aaa3b0]">{hint}
            </small>}
    </div>;
}
