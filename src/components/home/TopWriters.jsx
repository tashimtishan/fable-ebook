'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getTopWriters } from '@/lib/actions/home';
import { HiOutlineBookOpen } from 'react-icons/hi';

const SkeletonCard = () => (
    <div className="bg-white border border-[#E8DFD3] rounded-xl p-6 animate-pulse text-center">
        <div className="w-16 h-16 rounded-full bg-[#F3DCC9] mx-auto" />
        <div className="h-4 bg-[#E8DFD3] rounded w-1/2 mx-auto mt-4" />
        <div className="h-3 bg-[#E8DFD3] rounded w-1/3 mx-auto mt-2" />
    </div>
);

const rankStyles = [
    { badge: 'bg-[#C4622D] text-white', ring: 'ring-[#C4622D]', label: '#1' },
    { badge: 'bg-[#2B2420] text-white', ring: 'ring-[#2B2420]/30', label: '#2' },
    { badge: 'bg-[#A38B6D] text-white', ring: 'ring-[#A38B6D]/40', label: '#3' },
];

const TopWriters = () => {
    const [writers, setWriters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const data = await getTopWriters();
            setWriters(data);
            setLoading(false);
        };
        fetch();
    }, []);

    return (
        <section className="bg-white py-16 border-y border-[#E8DFD3]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-10">
                    <p className="text-sm font-semibold tracking-wide text-[#C4622D] uppercase">Community Spotlight</p>
                    <h2 className="text-3xl font-bold text-[#2B2420] mt-1">Top Writers</h2>
                    <p className="text-sm text-[#6B5F55] mt-2 max-w-md mx-auto">
                        The most-read voices on Fable this month.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : writers.length === 0 ? (
                    <div className="text-center py-10 bg-[#FAF6F0] border border-[#E8DFD3] rounded-xl max-w-md mx-auto">
                        <p className="text-[#6B5F55] text-sm">No writers yet — be the first to publish.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {writers.map((writer, i) => {
                            const rank = rankStyles[i] || rankStyles[2];
                            return (
                                <motion.div
                                    key={writer.writerId}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.4, ease: 'easeOut' }}
                                    className="relative bg-[#FAF6F0] border border-[#E8DFD3] rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                >
                                    <span className={`absolute top-3 left-3 text-[11px] font-bold px-2 py-0.5 rounded-full ${rank.badge}`}>
                                        {rank.label}
                                    </span>

                                    <div className={`w-16 h-16 rounded-full bg-[#C4622D] text-white text-2xl font-bold flex items-center justify-center mx-auto ring-4 ${rank.ring}`}>
                                        {writer.initial}
                                    </div>

                                    <h3 className="font-semibold text-[#2B2420] mt-4">{writer.name}</h3>

                                    <p className="inline-flex items-center gap-1.5 text-xs text-[#6B5F55] mt-1.5">
                                        <HiOutlineBookOpen size={14} />
                                        {writer.totalSales} ebook{writer.totalSales !== 1 ? 's' : ''} sold
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TopWriters;