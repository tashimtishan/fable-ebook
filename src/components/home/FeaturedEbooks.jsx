'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getFeaturedEbooks } from '@/lib/actions/home';

const SkeletonCard = () => (
    <div className="bg-white border border-[#E8DFD3] rounded-xl overflow-hidden animate-pulse">
        <div className="w-full aspect-[3/4] bg-[#F3DCC9]" />
        <div className="p-4 space-y-2">
            <div className="h-4 bg-[#E8DFD3] rounded w-3/4" />
            <div className="h-3 bg-[#E8DFD3] rounded w-1/2" />
        </div>
    </div>
);

const FeaturedEbooks = () => {
    const [ebooks, setEbooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const data = await getFeaturedEbooks(6);
            setEbooks(data);
            setLoading(false);
        };
        fetch();
    }, []);

    return (
        <section className="bg-[#FAF6F0] py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-sm font-semibold tracking-wide text-[#C4622D] uppercase">Handpicked for you</p>
                        <h2 className="text-3xl font-bold text-[#2B2420] mt-1">Featured Ebooks</h2>
                    </div>
                    <Link
                        href="/browse"
                        className="hidden sm:inline-block text-sm font-semibold text-[#C4622D] hover:text-[#A34E22] transition-colors"
                    >
                        View All →
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                        {ebooks.map((ebook, i) => (
                            <motion.div
                                key={ebook._id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07, duration: 0.4, ease: 'easeOut' }}
                            >
                                <Link href={`/ebooks/${ebook._id}`} className="group block">
                                    <div className="relative rounded-xl overflow-hidden border border-[#E8DFD3] shadow-sm group-hover:shadow-xl group-hover:-translate-y-1.5 transition-all duration-300 bg-white">
                                        <div className="relative aspect-[3/4] overflow-hidden">
                                            <img
                                                src={ebook.coverImage}
                                                alt={ebook.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                                <span className="text-white text-xs font-semibold bg-[#C4622D] px-2.5 py-1 rounded-full">
                                                    ${ebook.price}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h3 className="font-semibold text-[#2B2420] text-sm leading-snug line-clamp-2">
                                                {ebook.title}
                                            </h3>
                                            <p className="text-xs text-[#6B5F55] mt-1">{ebook.writerName}</p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}

                <Link
                    href="/browse"
                    className="sm:hidden mt-8 inline-flex items-center justify-center w-full py-2.5 rounded-md border border-[#E8DFD3] text-[#2B2420] text-sm font-semibold hover:border-[#C4622D] hover:text-[#C4622D] transition-colors"
                >
                    View All Ebooks
                </Link>
            </div>
        </section>
    );
};

export default FeaturedEbooks;