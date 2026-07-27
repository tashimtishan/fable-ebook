'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiOutlineHome, HiOutlineBookOpen, HiOutlineShoppingBag, HiOutlineUser, HiMenu, HiX } from 'react-icons/hi';

const links = [
    { name: 'Overview', href: '/dashboard', icon: HiOutlineHome },
    { name: 'My Ebooks', href: '/dashboard/ebooks', icon: HiOutlineBookOpen },
    { name: 'Purchases', href: '/dashboard/purchases', icon: HiOutlineShoppingBag },
    { name: 'Profile', href: '/dashboard/profile', icon: HiOutlineUser },
];

export default function DashboardLayout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="min-h-screen flex bg-[#FAF6F0]">

            {/* Sidebar - desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#E8DFD3] p-6">
                <h2 className="text-lg font-bold text-[#2B2420] mb-8">Dashboard</h2>
                <nav className="flex flex-col gap-1">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                                    isActive
                                        ? 'bg-[#F3DCC9] text-[#C4622D]'
                                        : 'text-[#6B5F55] hover:bg-[#FAF6F0] hover:text-[#2B2420]'
                                }`}
                            >
                                <Icon size={18} />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Mobile top bar */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#E8DFD3] flex items-center justify-between px-4 h-14">
                <h2 className="text-base font-bold text-[#2B2420]">Dashboard</h2>
                <button onClick={() => setIsOpen(!isOpen)} className="text-[#2B2420]">
                    {isOpen ? <HiX size={22} /> : <HiMenu size={22} />}
                </button>
            </div>

            {/* Mobile sidebar drawer */}
            {isOpen && (
                <div className="md:hidden fixed inset-0 z-30 bg-black/30" onClick={() => setIsOpen(false)}>
                    <aside
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-14 left-0 bottom-0 w-64 bg-white border-r border-[#E8DFD3] p-6"
                    >
                        <nav className="flex flex-col gap-1">
                            {links.map((link) => {
                                const isActive = pathname === link.href;
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                                            isActive
                                                ? 'bg-[#F3DCC9] text-[#C4622D]'
                                                : 'text-[#6B5F55] hover:bg-[#FAF6F0] hover:text-[#2B2420]'
                                        }`}
                                    >
                                        <Icon size={18} />
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </aside>
                </div>
            )}

            {/* Main content */}
            <main className="flex-1 p-6 md:p-10 mt-14 md:mt-0">
                {children}
            </main>
        </div>
    );
}