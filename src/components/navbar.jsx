'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Browse Ebooks', href: '/browse' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();
     if (pathname.startsWith('/dashboard')) return null;
    return (
        <nav className="bg-[#FAF6F0] border-b border-[#E8DFD3] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo - empty, user will add image */}
                    <Link href="/" className="flex items-center">
                        <div className='flex gap-2 items-center'>
                            <Image src={"/ebook (1).png"} height={40} width={40} alt='e-book logo'></Image>
                            <p className='font-bold text-2xl text-[#d67845]'>Fable</p>
                        </div>
                    </Link>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`text-md font-medium transition-colors ${isActive
                                        ? 'text-[#C4622D]'
                                        : 'text-[#2B2420] hover:text-[#C4622D]'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                        {session?.user && (
                            <Link
                                href={`/dashboard/${session.user.role}`}
                                className={`text-md font-medium transition-colors ${pathname.startsWith('/dashboard')
                                    ? 'text-[#C4622D]'
                                    : 'text-[#2B2420] hover:text-[#C4622D]'
                                    }`}
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>

                    {/* Login/Register buttons - desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        {isPending ? null : session?.user ? (
                            <>
                                <span className="text-sm font-medium text-[#2B2420]">
                                    <p className='font-bold text-md'>hello {session.user.name}!!!</p>
                                </span>
                                <button
                                    onClick={async () => {
                                        await authClient.signOut();
                                        window.location.href = '/';
                                    }}
                                    className="px-4 py-2 rounded-md text-sm font-medium text-[#2B2420] border border-[#E8DFD3] hover:border-[#C4622D] hover:text-[#C4622D] transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-4 py-2 rounded-md text-sm font-medium text-[#2B2420] border border-[#E8DFD3] hover:border-[#C4622D] hover:text-[#C4622D] transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 rounded-md bg-[#C4622D] text-white text-sm font-medium hover:bg-[#A34E22] transition-colors"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Hamburger - mobile */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-[#2B2420]"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden pb-4 flex flex-col gap-4">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-sm font-medium ${isActive
                                        ? 'text-[#C4622D]'
                                        : 'text-[#2B2420] hover:text-[#C4622D]'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                        {session?.user && (
                            <Link
                                href={`/dashboard/${session.user.role}`}
                                onClick={() => setIsOpen(false)}
                                className={`text-sm font-medium ${pathname.startsWith('/dashboard')
                                        ? 'text-[#C4622D]'
                                        : 'text-[#2B2420] hover:text-[#C4622D]'
                                    }`}
                            >
                                Dashboard
                            </Link>
                        )}

                        {isPending ? null : session?.user ? (
                            <>
                                <span className="text-sm font-medium text-[#2B2420]">
                                    <p className='font-bold text-md'>hello {session.user.name}!!!</p>
                                </span>
                                <button
                                    onClick={async () => {
                                        setIsOpen(false);
                                        await authClient.signOut();
                                        window.location.href = '/';
                                    }}
                                    className="px-4 py-2 rounded-md text-sm font-medium text-center text-[#2B2420] border border-[#E8DFD3] hover:border-[#C4622D] hover:text-[#C4622D] transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 rounded-md text-sm font-medium text-center text-[#2B2420] border border-[#E8DFD3] hover:border-[#C4622D] hover:text-[#C4622D] transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 rounded-md bg-[#C4622D] text-white text-sm font-medium text-center hover:bg-[#A34E22] transition-colors"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;