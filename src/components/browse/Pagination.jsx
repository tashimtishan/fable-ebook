import React from 'react';

const Pagination = ({ page, totalPages, setFilters, filters }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }).map((_, i) => (
                <button
                    key={i}
                    onClick={() => setFilters({ ...filters, page: i + 1 })}
                    className={`w-9 h-9 rounded-md text-sm font-medium transition-colors ${
                        page === i + 1
                            ? 'bg-[#C4622D] text-white'
                            : 'border border-[#E8DFD3] text-[#2B2420] hover:border-[#C4622D]'
                    }`}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;