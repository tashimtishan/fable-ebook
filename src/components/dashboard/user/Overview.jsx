'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { getUserPurchases } from '@/lib/actions/payment';
import { HiBookOpen, HiShoppingBag, HiCurrencyDollar, HiArrowRight } from 'react-icons/hi';

const Overview = () => {
    const { data: session } = authClient.useSession();
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (session?.user?.id) {
                const data = await getUserPurchases(session.user.id);
                setPurchases(data);
                setLoading(false);
            }
        };
        fetchData();
    }, [session]);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-8 bg-[#E8DFD3] rounded w-1/3 animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-white border border-[#E8DFD3] rounded-xl p-6 animate-pulse">
                            <div className="h-4 bg-[#E8DFD3] rounded w-1/2" />
                            <div className="h-8 bg-[#E8DFD3] rounded w-1/3 mt-2" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const totalSpent = purchases.reduce((sum, p) => sum + p.amount, 0);
    const recentPurchases = purchases.slice(0, 5);

    return (
        <div>
            {/* Welcome */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#2B2420]">
                    Welcome back, {session?.user?.name || 'Reader'}! 👋
                </h1>
                <p className="text-[#6B5F55] mt-1">
                    Here&apos;s a summary of your reading activity.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white border border-[#E8DFD3] rounded-xl p-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#F3DCC9] rounded-lg">
                            <HiBookOpen className="w-5 h-5 text-[#C4622D]" />
                        </div>
                        <div>
                            <p className="text-sm text-[#6B5F55]">Books Purchased</p>
                            <p className="text-2xl font-bold text-[#2B2420]">{purchases.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-[#E8DFD3] rounded-xl p-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#F3DCC9] rounded-lg">
                            <HiCurrencyDollar className="w-5 h-5 text-[#C4622D]" />
                        </div>
                        <div>
                            <p className="text-sm text-[#6B5F55]">Total Spent</p>
                            <p className="text-2xl font-bold text-[#2B2420]">${totalSpent.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-[#E8DFD3] rounded-xl p-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#F3DCC9] rounded-lg">
                            <HiShoppingBag className="w-5 h-5 text-[#C4622D]" />
                        </div>
                        <div>
                            <p className="text-sm text-[#6B5F55]">Library</p>
                            <p className="text-2xl font-bold text-[#2B2420]">{purchases.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Link
                    href="/dashboard/user/purchases"
                    className="flex items-center justify-between p-4 bg-white border border-[#E8DFD3] rounded-xl hover:border-[#C4622D] transition-colors group"
                >
                    <span className="font-medium text-[#2B2420]">📚 My Library</span>
                    <HiArrowRight className="text-[#C4622D] group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                    href="/dashboard/user/purchases"
                    className="flex items-center justify-between p-4 bg-white border border-[#E8DFD3] rounded-xl hover:border-[#C4622D] transition-colors group"
                >
                    <span className="font-medium text-[#2B2420]">📋 Purchase History</span>
                    <HiArrowRight className="text-[#C4622D] group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Recent Purchases */}
            {recentPurchases.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold text-[#2B2420] mb-4">Recent Purchases</h2>
                    <div className="bg-white border border-[#E8DFD3] rounded-xl overflow-hidden">
                        {recentPurchases.map((item, index) => (
                            <div
                                key={item._id}
                                className={`flex items-center justify-between p-4 ${
                                    index !== recentPurchases.length - 1 ? 'border-b border-[#E8DFD3]' : ''
                                } hover:bg-[#FAF6F0] transition-colors`}
                            >
                                <div>
                                    <p className="font-medium text-[#2B2420]">
                                        {item.ebook?.title || 'Unknown Title'}
                                    </p>
                                    <p className="text-sm text-[#6B5F55]">
                                        {item.ebook?.writerName || 'Unknown Writer'}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium text-[#C4622D]">${item.amount}</p>
                                    <p className="text-xs text-[#6B5F55]">
                                        {new Date(item.purchaseDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {purchases.length > 5 && (
                        <Link
                            href="/dashboard/user/purchase-history"
                            className="inline-block mt-4 text-sm text-[#C4622D] hover:underline"
                        >
                            View all purchases →
                        </Link>
                    )}
                </div>
            )}

            {purchases.length === 0 && (
                <div className="text-center py-12 bg-white border border-[#E8DFD3] rounded-xl">
                    <p className="text-[#6B5F55]">You haven&apos;t purchased any ebooks yet.</p>
                    <Link
                        href="/browse"
                        className="mt-4 inline-block px-6 py-2.5 rounded-md bg-[#C4622D] text-white hover:bg-[#A34E22] transition-colors"
                    >
                        Browse Ebooks
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Overview;