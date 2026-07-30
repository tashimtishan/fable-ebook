'use client';
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#C4622D', '#6B8F71', '#2B2420', '#A38B6D', '#B3453A', '#9098B1'];

const GenrePieChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="bg-white border border-[#E8DFD3] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-[#2B2420] mb-4">Ebooks by Genre</h3>
                <p className="text-sm text-[#6B5F55] text-center py-10">No ebooks yet.</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-[#E8DFD3] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[#2B2420] mb-4">Ebooks by Genre</h3>
            <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                    <Pie data={data} dataKey="count" nameKey="genre" cx="50%" cy="50%" outerRadius={85} label={({ genre }) => genre}>
                        {data.map((entry, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #E8DFD3', borderRadius: 8, fontSize: 13 }} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GenrePieChart;