'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { imageUploader } from '@/lib/imageUpload';
import { getEbookById, updateEbook } from '@/lib/actions/ebook';

const genres = ['Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Horror'];

const EditEbook = ({ ebookId }) => {
    const router = useRouter();
    const [formData, setFormData] = useState(null);
    const [coverFile, setCoverFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEbook = async () => {
            const data = await getEbookById(ebookId);
            setFormData(data);
            setPreview(data.coverImage);
        };
        fetchEbook();
    }, [ebookId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let coverImage = formData.coverImage;
            if (coverFile) {
                const uploaded = await imageUploader(coverFile);
                coverImage = uploaded.url;
            }

            await updateEbook(ebookId, {
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                genre: formData.genre,
                coverImage,
            });

            router.push('/dashboard/writer/ebooks');
        } catch (err) {
            console.error(err);
            setError('Failed to update ebook. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!formData) return <p className="text-sm text-[#6B5F55]">Loading...</p>;

    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-[#2B2420] mb-6">Edit Ebook</h1>

            {error && (
                <div className="mb-4 px-4 py-2 rounded-md bg-[#B3453A]/10 border border-[#B3453A]/30 text-sm text-[#B3453A]">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                    <label className="block text-sm font-medium text-[#2B2420] mb-1">Cover Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full text-sm text-[#6B5F55] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#C4622D] file:text-white file:text-sm file:font-medium hover:file:bg-[#A34E22]"
                    />
                    {preview && (
                        <img src={preview} alt="Cover preview" className="mt-3 w-32 h-44 object-cover rounded-md border border-[#E8DFD3]" />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#2B2420] mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-md border border-[#E8DFD3] bg-white text-[#2B2420] focus:outline-none focus:border-[#C4622D]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#2B2420] mb-1">Genre</label>
                    <select
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-md border border-[#E8DFD3] bg-white text-[#2B2420] focus:outline-none focus:border-[#C4622D]"
                    >
                        {genres.map((g) => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#2B2420] mb-1">Price ($)</label>
                    <input
                        type="number"
                        name="price"
                        required
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-md border border-[#E8DFD3] bg-white text-[#2B2420] focus:outline-none focus:border-[#C4622D]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#2B2420] mb-1">Description (Full Content)</label>
                    <textarea
                        name="description"
                        required
                        rows={10}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-md border border-[#E8DFD3] bg-white text-[#2B2420] focus:outline-none focus:border-[#C4622D] resize-y"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 py-2.5 rounded-md bg-[#C4622D] text-white text-sm font-semibold hover:bg-[#A34E22] transition-colors disabled:opacity-60"
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default EditEbook;