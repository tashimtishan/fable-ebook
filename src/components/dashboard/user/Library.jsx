'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { getUserPurchases } from '@/lib/actions/payment';

const Library = () => {
    const { data: session } = authClient.useSession();
    const [library, setLibrary] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLibrary = async () => {
            if (session?.user?.id) {
                const data = await getUserPurchases(session.user.id);
                setLibrary(data);
                setLoading(false);
            }
        };
        fetchLibrary();
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

    if (library.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-[#6B5F55] text-lg">You haven&apos;t purchased any ebooks yet.</p>
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
            <h1 className="text-2xl font-bold text-[#2B2420] mb-6">My Library</h1>
            <p className="text-[#6B5F55] mb-6">
                {library.length} ebook{library.length > 1 ? 's' : ''} purchased
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {library.map((item) => (
                    <Link
                        key={item._id}
                        href={`/ebooks/${item.ebookId}`}
                        className="bg-white border border-[#E8DFD3] rounded-xl overflow-hidden hover:shadow-md transition-shadow block"
                    >
                        <img
                            src={item.ebook?.coverImage || '/placeholder-cover.jpg'}
                            alt={item.ebook?.title || 'Ebook'}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <p className="font-semibold text-[#2B2420] truncate">
                                {item.ebook?.title || 'Unknown Title'}
                            </p>
                            <p className="text-sm text-[#6B5F55] mt-1">
                                by {item.ebook?.writerName || 'Unknown Writer'}
                            </p>
                            <p className="text-xs text-[#6B5F55] mt-2">
                                Purchased: {new Date(item.purchaseDate).toLocaleDateString()}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Library;