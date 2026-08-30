'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { getUserPurchases } from '@/lib/actions/payment';
import { HiEye } from 'react-icons/hi';

const PurchaseHistory = () => {
    const { data: session } = authClient.useSession();
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPurchases = async () => {
            if (session?.user?.id) {
                const data = await getUserPurchases(session.user.id);
                setPurchases(data);
                setLoading(false);
            }
        };
        fetchPurchases();
    }, [session]);

    if (loading) {
        return (
            <div className="bg-white border border-[#E8DFD3] rounded-xl overflow-hidden animate-pulse">
                <div className="p-4 border-b border-[#E8DFD3]">
                    <div className="h-6 bg-[#E8DFD3] rounded w-1/4" />
                </div>
                <div className="p-4 space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-12 bg-[#F3DCC9] rounded" />
                    ))}
                </div>
            </div>
        );
    }

    if (purchases.length === 0) {
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
            <h1 className="text-2xl font-bold text-[#2B2420] mb-6">Purchase History</h1>
            <p className="text-[#6B5F55] mb-6">
                {purchases.length} purchase{purchases.length > 1 ? 's' : ''} total
            </p>

            <div className="bg-white border border-[#E8DFD3] rounded-xl overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-[#F3DCC9] border-b border-[#E8DFD3] text-sm font-semibold text-[#2B2420]">
                    <div className="col-span-3">Ebook Title</div>
                    <div className="col-span-2">Writer</div>
                    <div className="col-span-2">Price</div>
                    <div className="col-span-2">Purchase Date</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-1 text-center">Action</div>
                </div>

             
                <div className="divide-y divide-[#E8DFD3]">
                    {purchases.map((item) => (
                        <div
                            key={item._id}
                            className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 p-4 hover:bg-[#FAF6F0] transition-colors"
                        >
                            <div className="md:hidden">
                                <p className="font-semibold text-[#2B2420]">{item.ebook?.title || 'Unknown'}</p>
                                <p className="text-sm text-[#6B5F55]">by {item.ebook?.writerName || 'Unknown'}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-sm font-medium text-[#C4622D]">${item.amount}</span>
                                    <span className="text-xs text-[#6B5F55]">
                                        {new Date(item.purchaseDate).toLocaleDateString()}
                                    </span>
                                </div>
                                <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-xs font-medium bg-[#6B8F71]/10 text-[#6B8F71]">
                                    ✓ Completed
                                </span>
                                <Link
                                    href={`/ebooks/${item.ebookId}`}
                                    className="mt-2 block text-sm text-[#C4622D] hover:underline"
                                >
                                    View Ebook →
                                </Link>
                            </div>

                            <div className="hidden md:block md:col-span-3 text-[#2B2420] truncate">
                                {item.ebook?.title || 'Unknown'}
                            </div>
                            <div className="hidden md:block md:col-span-2 text-[#6B5F55] truncate">
                                {item.ebook?.writerName || 'Unknown'}
                            </div>
                            <div className="hidden md:block md:col-span-2 font-medium text-[#C4622D]">
                                ${item.amount}
                            </div>
                            <div className="hidden md:block md:col-span-2 text-sm text-[#6B5F55]">
                                {new Date(item.purchaseDate).toLocaleDateString()}
                            </div>
                            <div className="hidden md:block md:col-span-2">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#6B8F71]/10 text-[#6B8F71]">
                                    ✓ Completed
                                </span>
                            </div>
                            <div className="hidden md:block md:col-span-1 text-center">
                                <Link
                                    href={`/ebooks/${item.ebookId}`}
                                    className="inline-flex items-center gap-1 text-sm text-[#C4622D] hover:underline"
                                >
                                    <HiEye /> View
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PurchaseHistory;