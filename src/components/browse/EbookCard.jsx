import React from 'react';
import Link from 'next/link';

const EbookCard = ({ ebook }) => {
    return (
        <Link
            href={`/ebooks/${ebook._id}`}
            className="bg-white border border-[#E8DFD3] rounded-xl overflow-hidden hover:shadow-md transition-shadow block"
        >
            <div className="relative">
                <img src={ebook.coverImage} alt={ebook.title} className="w-full h-48 object-cover" />
                {ebook.isSold && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium bg-[#B3453A] text-white">
                        Sold
                    </span>
                )}
            </div>
            <div className="p-4">
                <p className="font-semibold text-[#2B2420] truncate">{ebook.title}</p>
                <p className="text-sm text-[#6B5F55] mt-1">{ebook.writerName}</p>
                <p className="text-sm font-medium text-[#C4622D] mt-2">${ebook.price}</p>
            </div>
        </Link>
    );
};

export default EbookCard;