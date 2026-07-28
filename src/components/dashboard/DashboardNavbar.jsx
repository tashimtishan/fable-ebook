'use client';

import React from 'react';
import { authClient } from '@/lib/auth-client';
import { HiMenu, HiX } from 'react-icons/hi';

const DashboardNavbar = ({ isOpen, setIsOpen }) => {
    const { data: session, isPending } = authClient.useSession();

    return (
        <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-[#E8DFD3] flex items-center justify-between px-4 md:px-10 h-14 md:left-64">
            <div className="flex items-center gap-3">
                <h2 className="text-base font-bold text-[#2B2420] md:hidden">Dashboard</h2>
                <div className="hidden md:flex items-center gap-2">
                    <span className="text-base font-bold text-[#2B2420]">Dashboard</span>
                    {!isPending && session?.user && (
                        <span className="text-sm text-[#6B5F55]">
                            — Welcome back, {session.user.name}
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4">
                {!isPending && session?.user && (
                    <>
                        <span className="text-sm font-medium text-[#2B2420] md:hidden">
                            {session.user.name}
                        </span>
                        <button
                            onClick={async () => {
                                await authClient.signOut();
                                window.location.href = '/';
                            }}
                            className="px-3 py-1.5 rounded-md text-sm font-medium text-[#2B2420] border border-[#E8DFD3] hover:border-[#C4622D] hover:text-[#C4622D] transition-colors"
                        >
                            Logout
                        </button>
                    </>
                )}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#2B2420]">
                    {isOpen ? <HiX size={22} /> : <HiMenu size={22} />}
                </button>
            </div>
        </div>
    );
};

export default DashboardNavbar;