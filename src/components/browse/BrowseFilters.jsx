'use client';
import React from 'react';

const genres = ['Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy', 'Horror'];

const BrowseFilters = ({ filters, setFilters }) => {
    const handleChange = (key, value) => {
        setFilters({ ...filters, [key]: value, page: 1 });
    };

    return (
        <div className="flex flex-col md:flex-row gap-3 mb-8">
            <input
                type="text"
                placeholder="Search by title or writer..."
                value={filters.search}
                onChange={(e) => handleChange('search', e.target.value)}
                className="flex-1 px-3 py-2 rounded-md border border-[#E8DFD3] bg-white text-[#2B2420] focus:outline-none focus:border-[#C4622D]"
            />

            <select
                value={filters.genre}
                onChange={(e) => handleChange('genre', e.target.value)}
                className="px-3 py-2 rounded-md border border-[#E8DFD3] bg-white text-[#2B2420] focus:outline-none focus:border-[#C4622D]"
            >
                <option value="">All Genres</option>
                {genres.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>

            <input
                type="number"
                placeholder="Min $"
                value={filters.minPrice}
                onChange={(e) => handleChange('minPrice', e.target.value)}
                className="w-24 px-3 py-2 rounded-md border border-[#E8DFD3] bg-white text-[#2B2420] focus:outline-none focus:border-[#C4622D]"
            />
            <input
                type="number"
                placeholder="Max $"
                value={filters.maxPrice}
                onChange={(e) => handleChange('maxPrice', e.target.value)}
                className="w-24 px-3 py-2 rounded-md border border-[#E8DFD3] bg-white text-[#2B2420] focus:outline-none focus:border-[#C4622D]"
            />

            <select
                value={filters.availability}
                onChange={(e) => handleChange('availability', e.target.value)}
                className="px-3 py-2 rounded-md border border-[#E8DFD3] bg-white text-[#2B2420] focus:outline-none focus:border-[#C4622D]"
            >
                <option value="">All</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
            </select>

            <select
                value={filters.sort}
                onChange={(e) => handleChange('sort', e.target.value)}
                className="px-3 py-2 rounded-md border border-[#E8DFD3] bg-white text-[#2B2420] focus:outline-none focus:border-[#C4622D]"
            >
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
            </select>
        </div>
    );
};

export default BrowseFilters;