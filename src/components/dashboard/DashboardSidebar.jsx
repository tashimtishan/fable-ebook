'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import {
    HiOutlineHome, HiOutlineBookOpen, HiOutlineShoppingBag, HiOutlineUser,
    HiOutlineBookmark, HiOutlineUsers, HiOutlineCollection, HiOutlineCurrencyDollar
} from 'react-icons/hi';

const navMenu = {
    user: [
        { title: 'Overview', href: '/dashboard/user', icon: HiOutlineHome },
        { title: 'Purchase History', href: '/dashboard/user/purchases', icon: HiOutlineShoppingBag },
        { title: 'My Library', href: '/dashboard/user/library', icon: HiOutlineBookOpen },
        { title: 'Bookmarks', href: '/dashboard/user/bookmarks', icon: HiOutlineBookmark },
        { title: 'Profile', href: '/dashboard/user/profile', icon: HiOutlineUser },
    ],
    writer: [
        { title: 'Overview', href: '/dashboard/writer', icon: HiOutlineHome },
        { title: 'Manage Ebooks', href: '/dashboard/writer/ebooks', icon: HiOutlineCollection },
        { title: 'Add Ebook', href: '/dashboard/writer/add-ebook', icon: HiOutlineBookOpen },
        { title: 'Sales History', href: '/dashboard/writer/sales', icon: HiOutlineCurrencyDollar },
        { title: 'Bookmarks', href: '/dashboard/writer/bookmarks', icon: HiOutlineBookmark },
        { title: 'Profile', href: '/dashboard/writer/profile', icon: HiOutlineUser },
    ],
    admin: [
        { title: 'Overview', href: '/dashboard/admin', icon: HiOutlineHome },
        { title: 'Manage Users', href: '/dashboard/admin/users', icon: HiOutlineUsers },
        { title: 'Manage Ebooks', href: '/dashboard/admin/ebooks', icon: HiOutlineCollection },
        { title: 'Transactions', href: '/dashboard/admin/transactions', icon: HiOutlineCurrencyDollar },
        { title: 'Profile', href: '/dashboard/admin/profile', icon: HiOutlineUser },
    ],
};

const DashboardSidebar = ({ onLinkClick }) => {
    const pathname = usePathname();
    const { data: session } = authClient.useSession();
    const role = session?.user?.role || 'user';
    const menu = navMenu[role];

    return (
        <nav className="flex flex-col gap-1">
            {menu.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={onLinkClick}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                            isActive
                                ? 'bg-[#F3DCC9] text-[#C4622D]'
                                : 'text-[#6B5F55] hover:bg-[#FAF6F0] hover:text-[#2B2420]'
                        }`}
                    >
                        <Icon size={18} />
                        {item.title}
                    </Link>
                );
            })}
        </nav>
    );
};

export default DashboardSidebar;