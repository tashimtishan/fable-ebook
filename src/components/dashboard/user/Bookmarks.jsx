'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { getUserBookmarks } from '@/lib/actions/payment';
import { HiBookmark } from 'react-icons/hi';

const Bookmarks = () => {
    const { data: session } = authClient.useSession();
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookmarks = async () => {
            if (session?.user?.id) {
                const data = await getUserBookmarks(session.user.id);
                setBookmarks(data);
                setLoading(false);
            }
        };
        fetchBookmarks();
    }, [session]);

    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white border border-[#E8DFD3] rounded-xl overflow-hidden animate-pulse">
                        <div className="w-full h-48 bg-[#F3DCC9]" />
                        <div className="p-4 flex flex-col gap-2">
                            <div className="h-4 bg-[#E8DFD3] rounded w-3/4" />
                            <div className="h-3 bg-[#E8DFD3] rounded w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (bookmarks.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="flex justify-center mb-4">
                    <HiBookmark className="w-16 h-16 text-[#E8DFD3]" />
                </div>
                <p className="text-[#6B5F55] text-lg">You haven&apos;t bookmarked any ebooks yet.</p>
                <p className="text-[#6B5F55] text-sm mt-1">
                    Browse ebooks and click the bookmark icon to save them here.
                </p>
                <Link
                    href="/browse"
                    className="mt-4 inline-block px-6 py-2.5 rounded-md bg-[#C4622D] text-white hover:bg-[#A34E22] transition-colors"
                >
                    Browse Ebooks
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#2B2420] mb-6">My Bookmarks</h1>
            <p className="text-[#6B5F55] mb-6">
                {bookmarks.length} bookmarked ebook{bookmarks.length > 1 ? 's' : ''}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {bookmarks.map((ebook) => (
                    <Link
                        key={ebook._id}
                        href={`/ebooks/${ebook._id}`}
                        className="bg-white border border-[#E8DFD3] rounded-xl overflow-hidden hover:shadow-md transition-shadow block group"
                    >
                        <div className="relative">
                            <img
                                src={ebook.coverImage || '/placeholder-cover.jpg'}
                                alt={ebook.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-2 right-2 p-1.5 bg-white rounded-full">
                                <HiBookmark className="w-4 h-4 text-[#C4622D] fill-[#C4622D]" />
                            </div>
                            {ebook.isSold && (
                                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium bg-[#B3453A] text-white">
                                    Sold
                                </span>
                            )}
                        </div>
                        <div className="p-4">
                            <p className="font-semibold text-[#2B2420] truncate">{ebook.title}</p>
                            <p className="text-sm text-[#6B5F55] mt-1">by {ebook.writerName}</p>
                            <p className="text-sm font-medium text-[#C4622D] mt-2">${ebook.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Bookmarks;