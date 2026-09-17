import React from 'react';
import { Globe2 } from 'lucide-react';

export default function Catalog({ car, update }) {
  const isPublic = car?.public !== undefined ? car.public : true;

  return (
    <div className="flex items-center justify-between rounded-[10px] border border-[#e2e0e7] bg-white p-4">
      <div>
        <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold text-[#25212c]">
          <Globe2 size={17} className="text-[#4b0750]" />
          <span>Catalog visibility</span>
        </div>
        <p className="m-0 text-[9px] text-[#928ba8]">
          {isPublic
            ? 'This vehicle is visible in your public catalog.'
            : 'This vehicle is hidden from the public catalog.'}
        </p>
      </div>

      {update && (
        <button
          type="button"
          aria-label="Toggle catalog visibility"
          onClick={() => update('public', !isPublic)}
          className={`relative h-[26px] w-[46px] rounded-full p-[2px] transition-colors ${
            isPublic ? 'bg-[#3f003d]' : 'bg-[#ddd]'
          }`}
        >
          <span
            className={`block h-5 w-5 rounded-full bg-white shadow-xs transition-transform ${
              isPublic ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      )}
    </div>
  );
}
