import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage = 1,
  setCurrentPage = () => {},
  pageSize = 10,
  setPageSize = () => {},
  totalCount = 0
}) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const start = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalCount);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex flex-col gap-3 px-5 py-4 text-[13px] text-[#667085] sm:flex-row sm:items-center sm:justify-between">
      <span>
        Showing {start} to {end} of {totalCount} cars
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage <= 1}
          className="grid h-[34px] w-[34px] place-items-center rounded-md border border-[#e4e7ec] bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setCurrentPage(p)}
            className={`grid h-[34px] w-[34px] place-items-center rounded-md text-[13px] font-medium transition-colors ${
              currentPage === p
                ? 'bg-[#3f003d] text-white shadow-xs'
                : 'border border-[#e4e7ec] bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {p}
          </button>
        ))}

        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          className="grid h-[34px] w-[34px] place-items-center rounded-md border border-[#e4e7ec] bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>

        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="h-[34px] rounded-md border border-[#e4e7ec] bg-white px-2 text-[13px] text-gray-700 outline-none cursor-pointer"
        >
          <option value={10}>10 per page</option>
          <option value={25}>25 per page</option>
          <option value={50}>50 per page</option>
        </select>
      </div>
    </div>
  );
}
