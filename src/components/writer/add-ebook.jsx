'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { imageUploader } from '@/lib/imageUpload';
import { addEbook } from '@/lib/actions/ebook';

const genres = ['Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Horror'];

const AddEbook = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        genre: genres[0],
    });
    const [coverFile, setCoverFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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

        if (!coverFile) {
            setError('Please upload a cover image.');
            return;
        }

        setLoading(true);

        try {
            const uploaded = await imageUploader(coverFile);

            const ebookData = {
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                genre: formData.genre,
                coverImage: uploaded.url,
                writerId: session?.user?.id,
                writerName: session?.user?.name,
            };

            const result = await addEbook(ebookData);

            if (result?.insertedId) {
                router.push('/dashboard/writer/ebooks');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to add ebook. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-[#2B2420] mb-6">Add New Ebook</h1>

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
                        placeholder="Book title"
                        className="w-full px-3 py-2 rounded-md border border-[#E8DFD3] bg-white text-[#2B2420] placeholder-[#6B5F55]/60 focus:outline-none focus:border-[#C4622D]"
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
                        placeholder="4.99"
                        className="w-full px-3 py-2 rounded-md border border-[#E8DFD3] bg-white text-[#2B2420] placeholder-[#6B5F55]/60 focus:outline-none focus:border-[#C4622D]"
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
                        placeholder="Write your full ebook content here..."
                        className="w-full px-3 py-2 rounded-md border border-[#E8DFD3] bg-white text-[#2B2420] placeholder-[#6B5F55]/60 focus:outline-none focus:border-[#C4622D] resize-y"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 py-2.5 rounded-md bg-[#C4622D] text-white text-sm font-semibold hover:bg-[#A34E22] transition-colors disabled:opacity-60"
                >
                    {loading ? 'Publishing...' : 'Publish Ebook'}
                </button>
            </form>
        </div>
    );
};

export default AddEbook;