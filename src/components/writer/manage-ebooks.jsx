'use client';
import React, { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { getWriterEbooks, deleteEbook, toggleEbookStatus } from '@/lib/actions/ebook';
import Link from 'next/link';

const ManageEbooks = () => {
    const { data: session } = authClient.useSession();
    const [ebooks, setEbooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session?.user?.id) return;

        const fetchEbooks = async () => {
            const result = await getWriterEbooks(session.user.id);
            setEbooks(result);
            setLoading(false);
        };

        fetchEbooks();
    }, [session?.user?.id]);
    const handleDelete = async (id) => {
        if (!confirm('Delete this ebook permanently?')) return;
        await deleteEbook(id);
        setEbooks(ebooks.filter((e) => e._id !== id));
    };

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'published' ? 'unpublished' : 'published';
        await toggleEbookStatus(id, newStatus);
        setEbooks(ebooks.map((e) => e._id === id ? { ...e, status: newStatus } : e));
    };
    if (loading) {
        return <p className="text-sm text-[#6B5F55]">Loading your ebooks...</p>;
    }

    if (ebooks.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-[#6B5F55]">You haven&apos;t added any ebooks yet.</p>
                <Link
                    href="/dashboard/writer/add-ebook"
                    className="inline-block mt-4 px-5 py-2.5 rounded-md bg-[#C4622D] text-white text-sm font-medium hover:bg-[#A34E22] transition-colors"
                >
                    Add Your First Ebook
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-[#2B2420]">Manage Ebooks</h1>
                <Link
                    href="/dashboard/writer/add-ebook"
                    className="px-4 py-2 rounded-md bg-[#C4622D] text-white text-sm font-medium hover:bg-[#A34E22] transition-colors"
                >
                    + Add Ebook
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {ebooks.map((ebook) => (
                    <div key={ebook._id} className="bg-white border border-[#E8DFD3] rounded-xl overflow-hidden">
                        <img src={ebook.coverImage} alt={ebook.title} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <p className="font-semibold text-[#2B2420]">{ebook.title}</p>
                            <p className="text-sm text-[#6B5F55] mt-1">{ebook.genre} · ${ebook.price}</p>
                            <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium bg-[#F3DCC9] text-[#C4622D]">
                                {ebook.status}
                            </span>

                            <div className="flex items-center gap-2 mt-4">
                                <Link
                                    href={`/dashboard/writer/ebooks/edit/${ebook._id}`}
                                    className="flex-1 text-center px-3 py-1.5 rounded-md text-xs font-medium border border-[#E8DFD3] text-[#2B2420] hover:border-[#C4622D] hover:text-[#C4622D] transition-colors"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleToggleStatus(ebook._id, ebook.status)}
                                    className="flex-1 px-3 py-1.5 rounded-md text-xs font-medium border border-[#E8DFD3] text-[#2B2420] hover:border-[#C4622D] hover:text-[#C4622D] transition-colors"
                                >
                                    {ebook.status === 'published' ? 'Unpublish' : 'Publish'}
                                </button>
                                <button
                                    onClick={() => handleDelete(ebook._id)}
                                    className="flex-1 px-3 py-1.5 rounded-md text-xs font-medium border border-[#B3453A]/30 text-[#B3453A] hover:bg-[#B3453A]/10 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageEbooks;