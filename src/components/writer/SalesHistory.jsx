'use client';
import React, { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { getWriterSales } from '@/lib/actions/payment';
import { HiEye } from 'react-icons/hi';
import Link from 'next/link';

const SalesHistory = () => {
    const { data: session } = authClient.useSession();
    const [sales, setSales] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSales = async () => {
            if (session?.user?.id) {
                const data = await getWriterSales(session.user.id);
                setSales(data.sales || []);
                setTotalRevenue(data.totalRevenue || 0);
                setLoading(false);
            }
        };
        fetchSales();
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

    if (sales.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-[#6B5F55] text-lg">No sales yet.</p>
                <p className="text-sm text-[#6B5F55] mt-1">
                    Your ebooks will appear here once they&apos;re purchased.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#2B2420] mb-6">Sales History</h1>

            <div className="grid grid-cols-2 gap-4 mb-6 max-w-md">
                <div className="bg-white border border-[#E8DFD3] rounded-xl p-4">
                    <p className="text-xs text-[#6B5F55]">Total Sales</p>
                    <p className="text-2xl font-bold text-[#2B2420] mt-1">{sales.length}</p>
                </div>
                <div className="bg-white border border-[#E8DFD3] rounded-xl p-4">
                    <p className="text-xs text-[#6B5F55]">Total Revenue</p>
                    <p className="text-2xl font-bold text-[#C4622D] mt-1">${totalRevenue.toFixed(2)}</p>
                </div>
            </div>

            <div className="bg-white border border-[#E8DFD3] rounded-xl overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-[#F3DCC9] border-b border-[#E8DFD3] text-sm font-semibold text-[#2B2420]">
                    <div className="col-span-4">Ebook Title</div>
                    <div className="col-span-3">Buyer</div>
                    <div className="col-span-2">Amount</div>
                    <div className="col-span-2">Purchase Date</div>
                    <div className="col-span-1 text-center">Action</div>
                </div>

                <div className="divide-y divide-[#E8DFD3]">
                    {sales.map((sale) => (
                        <div key={sale._id} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 p-4 hover:bg-[#FAF6F0] transition-colors">
                            <div className="md:hidden">
                                <p className="font-semibold text-[#2B2420]">{sale.ebookTitle}</p>
                                <p className="text-sm text-[#6B5F55]">Buyer: {sale.buyerName}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-sm font-medium text-[#C4622D]">${sale.amount}</span>
                                    <span className="text-xs text-[#6B5F55]">
                                        {new Date(sale.purchaseDate).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <div className="hidden md:block md:col-span-4 text-[#2B2420] truncate">
                                {sale.ebookTitle}
                            </div>
                            <div className="hidden md:block md:col-span-3 text-[#6B5F55] truncate">
                                {sale.buyerName}
                            </div>
                            <div className="hidden md:block md:col-span-2 font-medium text-[#C4622D]">
                                ${sale.amount}
                            </div>
                            <div className="hidden md:block md:col-span-2 text-sm text-[#6B5F55]">
                                {new Date(sale.purchaseDate).toLocaleDateString()}
                            </div>
                            <div className="hidden md:block md:col-span-1 text-center">
                                <Link
                                    href={`/ebooks/${sale.ebookId}`}
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

export default SalesHistory;