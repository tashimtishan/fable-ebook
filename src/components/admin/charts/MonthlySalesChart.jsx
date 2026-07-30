'use client';
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const MonthlySalesChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="bg-white border border-[#E8DFD3] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-[#2B2420] mb-4">Monthly Sales</h3>
                <p className="text-sm text-[#6B5F55] text-center py-10">No sales data yet.</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-[#E8DFD3] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[#2B2420] mb-4">Monthly Sales Revenue</h3>
            <ResponsiveContainer width="100%" height={260}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E8DFD3" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B5F55' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#6B5F55' }} />
                    <Tooltip
                        contentStyle={{ background: '#fff', border: '1px solid #E8DFD3', borderRadius: 8, fontSize: 13 }}
                        formatter={(value) => [`$${value.toFixed(2)}`, 'Revenue']}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#C4622D" strokeWidth={2.5} dot={{ fill: '#C4622D', r: 4 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MonthlySalesChart;