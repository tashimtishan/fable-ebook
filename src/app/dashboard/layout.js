'use client';

import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import Link from 'next/link';

export default function DashboardLayout({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-[#FAF6F0]">

            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#E8DFD3] p-6 fixed top-0 left-0 bottom-0">
               <Link href={"/"}>
                <h2 className="text-lg font-bold text-[#2B2420] mb-8">Fable</h2>
               </Link>
                <DashboardSidebar />
            </aside>

            <DashboardNavbar isOpen={isOpen} setIsOpen={setIsOpen} />

            {isOpen && (
                <div className="md:hidden fixed inset-0 z-30 bg-black/30" onClick={() => setIsOpen(false)}>
                    <aside
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-14 left-0 bottom-0 w-64 bg-white border-r border-[#E8DFD3] p-6"
                    >
                        <DashboardSidebar onLinkClick={() => setIsOpen(false)} />
                    </aside>
                </div>
            )}

            <main className="flex-1 p-6 md:p-10 mt-14 md:ml-64 md:mt-14">
                {children}
            </main>
        </div>
    );
}