'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiCheckCircle, HiOutlineBookOpen } from "react-icons/hi";

const genres = ["Fiction", "Mystery", "Romance", "Sci-Fi", "Fantasy", "Horror"];

const Banner = () => {
    return (
        <section className="bg-[#FAF6F0] p-5 pb-20">
            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
                {/* Left: text content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[#C4622D] uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6B8F71] animate-pulse motion-reduce:animate-none"></span>
                        New releases every week
                    </p>

                    <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2B2420] leading-[1.1]">
                        Discover & Read <span className="text-[#C4622D]">Original Ebooks</span>
                    </h1>

                    <p className="mt-6 text-base sm:text-lg text-[#6B5F55] max-w-xl">
                        Explore stories from independent writers around the world. Read instantly, support creators directly, and build your own digital library.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/browse"
                            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#C4622D] text-white font-semibold hover:bg-[#A34E22] transition-colors"
                        >
                            Browse Ebooks
                        </Link>
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-[#E8DFD3] text-[#2B2420] font-semibold hover:border-[#C4622D] hover:text-[#C4622D] transition-colors"
                        >
                            Become a Writer
                        </Link>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-2">
                        {genres.map((genre) => (
                            <span
                                key={genre}
                                className="px-3 py-1 rounded-full bg-white border border-[#E8DFD3] text-xs font-medium text-[#6B5F55]"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Right: book preview card */}
                {/* Right: floating book mockup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="relative max-w-sm mx-auto lg:max-w-md lg:mx-0 h-[420px]"
                >
                    {/* Soft background glow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-72 h-72 rounded-full bg-[#C4622D]/10 blur-3xl"></div>
                    </div>

                    {/* 3D tilted book */}
                    <div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-80"
                        style={{ perspective: "1000px" }}
                    >
                        <div
                            className="relative w-full h-full transition-transform duration-500 hover:rotate-y-0"
                            style={{
                                transformStyle: "preserve-3d",
                                transform: "rotateY(-25deg) rotateX(4deg)",
                            }}
                        >
                            {/* Book spine */}
                            <div
                                className="absolute left-0 top-0 h-full w-6 bg-[#A34E22] rounded-l-sm"
                                style={{
                                    transform: "rotateY(90deg) translateZ(-12px)",
                                    transformOrigin: "left",
                                }}
                            ></div>

                            {/* Book cover */}
                            <div className="relative w-full h-full rounded-r-md rounded-l-sm bg-gradient-to-br from-[#C4622D] to-[#A34E22] shadow-2xl shadow-[#2B2420]/30 flex flex-col justify-between p-6 text-white">
                                <div>
                                    <HiOutlineBookOpen size={28} className="opacity-80" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest opacity-70 mb-1">Fiction</p>
                                    <h3 className="text-xl font-bold leading-tight">The Last Letter</h3>
                                    <p className="text-sm opacity-80 mt-1">Amara Chowdhury</p>
                                </div>
                            </div>

                            {/* Page edges effect */}
                            <div
                                className="absolute top-1 right-0 w-2 h-[calc(100%-8px)] bg-[#FAF6F0]"
                                style={{
                                    transform: "rotateY(90deg) translateZ(2px)",
                                    transformOrigin: "right",
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* Floating badge: rating */}
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-6 left-0 bg-white border border-[#E8DFD3] rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2"
                    >
                        <span className="text-[#C4622D] font-bold text-sm">4.8</span>
                        <span className="text-xs text-[#6B5F55]">reader rating</span>
                    </motion.div>

                    {/* Floating badge: writer count */}
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute bottom-10 right-0 bg-white border border-[#E8DFD3] rounded-xl shadow-lg px-4 py-2.5 flex items-center gap-2"
                    >
                        <HiCheckCircle className="text-[#6B8F71]" size={16} />
                        <span className="text-xs font-medium text-[#2B2420]">Instant access</span>
                    </motion.div>

                    {/* Floating badge: price */}
                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-0 left-4 bg-[#2B2420] text-white rounded-xl shadow-lg px-4 py-2.5"
                    >
                        <span className="text-sm font-semibold">$4.99</span>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

export default Banner;