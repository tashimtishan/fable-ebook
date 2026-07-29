'use client';
import React, { useEffect, useState } from 'react';
import { getAdminEbooks, toggleEbookStatus, deleteEbook } from '@/lib/actions/admin';
import { HiTrash } from 'react-icons/hi';

const Ebooks = () => {
    const [ebooks, setEbooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEbooks = async () => {
        const data = await getAdminEbooks();
        setEbooks(data.ebooks || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchEbooks();
    }, []);

    const handleToggle = async (ebookId, currentStatus) => {
        const newStatus = currentStatus === 'published' ? 'unpublished' : 'published';
        await toggleEbookStatus(ebookId, newStatus);
        fetchEbooks();
    };

    const handleDelete = async (ebookId) => {
        if (confirm('Delete this ebook?')) {
            await deleteEbook(ebookId);
            fetchEbooks();
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#2B2420] mb-6">Manage Ebooks</h1>
            <div className="bg-white border border-[#E8DFD3] rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#F3DCC9] border-b border-[#E8DFD3]">
                        <tr>
                            <th className="p-3 text-sm font-semibold">Title</th>
                            <th className="p-3 text-sm font-semibold">Writer</th>
                            <th className="p-3 text-sm font-semibold">Price</th>
                            <th className="p-3 text-sm font-semibold">Status</th>
                            <th className="p-3 text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DFD3]">
                        {ebooks.map((ebook) => (
                            <tr key={ebook._id} className="hover:bg-[#FAF6F0]">
                                <td className="p-3">{ebook.title}</td>
                                <td className="p-3">{ebook.writerName}</td>
                                <td className="p-3">${ebook.price}</td>
                                <td className="p-3 capitalize">{ebook.status}</td>
                                <td className="p-3 flex gap-2">
                                    <button
                                        onClick={() => handleToggle(ebook._id, ebook.status)}
                                        className="px-3 py-1 border border-[#E8DFD3] rounded-md text-sm hover:border-[#C4622D]"
                                    >
                                        {ebook.status === 'published' ? 'Unpublish' : 'Publish'}
                                    </button>
                                    <button onClick={() => handleDelete(ebook._id)} className="text-[#B3453A] hover:opacity-70">
                                        <HiTrash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Ebooks;