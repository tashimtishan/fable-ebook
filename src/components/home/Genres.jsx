'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineBookOpen, HiOutlineSearch, HiOutlineHeart, HiOutlineSparkles, HiOutlineFire, HiOutlineMoon } from 'react-icons/hi';

const genres = [
    { name: 'Fiction', icon: HiOutlineBookOpen },
    { name: 'Mystery', icon: HiOutlineSearch },
    { name: 'Romance', icon: HiOutlineHeart },
    { name: 'Sci-Fi', icon: HiOutlineSparkles },
    { name: 'Fantasy', icon: HiOutlineFire },
    { name: 'Horror', icon: HiOutlineMoon },
];

const Genres = () => {
    return (
        <section className="bg-[#FAF6F0] py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-10">
                    <p className="text-sm font-semibold tracking-wide text-[#C4622D] uppercase">Explore by Genre</p>
                    <h2 className="text-3xl font-bold text-[#2B2420] mt-1">Find Your Next Read</h2>
                    <p className="text-sm text-[#6B5F55] mt-2 max-w-md mx-auto">
                        Pick a genre and dive straight into a curated shelf.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                    {genres.map((genre, i) => {
                        const Icon = genre.icon;
                        return (
                            <motion.div
                                key={genre.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06, duration: 0.4, ease: 'easeOut' }}
                                whileHover={{ y: -4 }}
                            >
                                <Link
                                    href={`/browse?genre=${genre.name}`}
                                    className="group relative overflow-hidden bg-white border border-[#E8DFD3] rounded-2xl p-6 text-center hover:border-[#C4622D] hover:shadow-lg transition-all duration-300 block"
                                >
                                    <div className="absolute inset-0 bg-[#F3DCC9]/0 group-hover:bg-[#F3DCC9]/40 transition-colors duration-300" />

                                    <div className="relative w-14 h-14 rounded-full bg-[#F3DCC9] flex items-center justify-center mx-auto group-hover:bg-[#C4622D] group-hover:scale-110 transition-all duration-300">
                                        <Icon className="w-6 h-6 text-[#C4622D] group-hover:text-white transition-colors duration-300" />
                                    </div>

                                    <p className="relative font-semibold text-[#2B2420] text-sm mt-4 group-hover:text-[#C4622D] transition-colors">
                                        {genre.name}
                                    </p>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Genres;