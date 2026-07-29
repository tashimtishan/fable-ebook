'use client';
import React, { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { getWriterSales } from '@/lib/actions/payment';
import { HiBookOpen, HiCurrencyDollar, HiShoppingBag } from 'react-icons/hi';

const Overview = () => {
    const { data: session } = authClient.useSession();
    const [stats, setStats] = useState({ totalSales: 0, totalRevenue: 0, ebookCount: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (session?.user?.id) {
                const data = await getWriterSales(session.user.id);
                setStats({
                    totalSales: data.totalSales || 0,
                    totalRevenue: data.totalRevenue || 0,
                    ebookCount: data.sales?.length || 0,
                });
                setLoading(false);
            }
        };
        fetchStats();
    }, [session]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-white border border-[#E8DFD3] rounded-xl p-6 animate-pulse">
                        <div className="h-4 bg-[#E8DFD3] rounded w-1/2" />
                        <div className="h-8 bg-[#E8DFD3] rounded w-1/3 mt-2" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#2B2420] mb-6">Writer Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white border border-[#E8DFD3] rounded-xl p-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#F3DCC9] rounded-lg">
                            <HiBookOpen className="w-5 h-5 text-[#C4622D]" />
                        </div>
                        <div>
                            <p className="text-sm text-[#6B5F55]">Total Ebooks</p>
                            <p className="text-2xl font-bold text-[#2B2420]">{stats.ebookCount}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-[#E8DFD3] rounded-xl p-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#F3DCC9] rounded-lg">
                            <HiShoppingBag className="w-5 h-5 text-[#C4622D]" />
                        </div>
                        <div>
                            <p className="text-sm text-[#6B5F55]">Total Sales</p>
                            <p className="text-2xl font-bold text-[#2B2420]">{stats.totalSales}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-[#E8DFD3] rounded-xl p-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#F3DCC9] rounded-lg">
                            <HiCurrencyDollar className="w-5 h-5 text-[#C4622D]" />
                        </div>
                        <div>
                            <p className="text-sm text-[#6B5F55]">Total Revenue</p>
                            <p className="text-2xl font-bold text-[#2B2420]">${stats.totalRevenue.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;