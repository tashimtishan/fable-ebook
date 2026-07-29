import React from 'react';
import EbookCard from './EbookCard';

const SkeletonCard = () => (
    <div className="bg-white border border-[#E8DFD3] rounded-xl overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-[#F3DCC9]" />
        <div className="p-4 flex flex-col gap-2">
            <div className="h-4 bg-[#E8DFD3] rounded w-3/4" />
            <div className="h-3 bg-[#E8DFD3] rounded w-1/2" />
            <div className="h-3 bg-[#E8DFD3] rounded w-1/4" />
        </div>
    </div>
);

const EbookGrid = ({ ebooks, loading }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
        );
    }

    if (ebooks.length === 0) {
        return <p className="text-center text-[#6B5F55] py-16">No ebooks match your filters.</p>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {ebooks.map((ebook) => <EbookCard key={ebook._id} ebook={ebook} />)}
        </div>
    );
};

export default EbookGrid;