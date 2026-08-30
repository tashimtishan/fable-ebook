'use client';
import React, { useEffect, useState } from 'react';
import { getAdminTransactions } from '@/lib/actions/admin';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const data = await getAdminTransactions();
            setTransactions(data.transactions || []);
            setLoading(false);
        };
        fetch();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#2B2420] mb-6">Transactions</h1>
            <div className="bg-white border border-[#E8DFD3] rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#F3DCC9] border-b border-[#E8DFD3]">
                        <tr>
                            <th className="p-3 text-sm font-semibold">Type</th>
                            <th className="p-3 text-sm font-semibold">User</th>
                            <th className="p-3 text-sm font-semibold">Amount</th>
                            <th className="p-3 text-sm font-semibold">Status</th>
                            <th className="p-3 text-sm font-semibold">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DFD3]">
                        {transactions.map((t, idx) => (
                            <tr key={idx} className="hover:bg-[#FAF6F0]">
                                <td className="p-3 capitalize">{t.type}</td>
                                <td className="p-3">{t.userEmail || t.userId}</td>
                                <td className="p-3">${t.amount}</td>
                                <td className="p-3">
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#6B8F71]/10 text-[#6B8F71]">
                                        ✓ Completed
                                    </span>
                                </td>
                                <td className="p-3">{new Date(t.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transactions;