'use client';
import React, { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { HiUsers, HiUserGroup, HiBookOpen, HiCurrencyDollar } from 'react-icons/hi';
import { getAdminStats, getAdminAnalytics } from '@/lib/actions/admin';
import MonthlySalesChart from './charts/MonthlySalesChart';
import GenrePieChart from './charts/GenrePieChart';

const Overview = () => {
    const { data: session } = authClient.useSession();
    const [stats, setStats] = useState({});
    const [analytics, setAnalytics] = useState({ monthlySales: [], genreDistribution: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const [statsData, analyticsData] = await Promise.all([
                getAdminStats(),
                getAdminAnalytics(),
            ]);
            setStats(statsData);
            setAnalytics(analyticsData);
            setLoading(false);
        };
        fetch();
    }, []);
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white border border-[#E8DFD3] rounded-xl p-6 animate-pulse">
                        <div className="h-4 bg-[#E8DFD3] rounded w-1/2" />
                        <div className="h-8 bg-[#E8DFD3] rounded w-1/3 mt-2" />
                    </div>
                ))}
            </div>
        );
    }

    const cards = [
        { label: 'Total Users', value: stats.totalUsers, icon: HiUsers },
        { label: 'Total Writers', value: stats.totalWriters, icon: HiUserGroup },
        { label: 'Ebooks Sold', value: stats.totalEbooksSold, icon: HiBookOpen },
        { label: 'Total Revenue', value: `$${stats.totalRevenue?.toFixed(2) || 0}`, icon: HiCurrencyDollar },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#2B2420] mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {cards.map((card, i) => (
                    <div key={i} className="bg-white border border-[#E8DFD3] rounded-xl p-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#F3DCC9] rounded-lg">
                                <card.icon className="w-5 h-5 text-[#C4622D]" />
                            </div>
                            <div>
                                <p className="text-sm text-[#6B5F55]">{card.label}</p>
                                <p className="text-2xl font-bold text-[#2B2420]">{card.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
                <MonthlySalesChart data={analytics.monthlySales} />
                <GenrePieChart data={analytics.genreDistribution} />
            </div>
        </div>
    );
};

export default Overview;