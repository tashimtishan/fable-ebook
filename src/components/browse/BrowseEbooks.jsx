'use client';
import React, { useEffect, useState } from 'react';
import { getAllEbooks } from '@/lib/actions/ebook';
import BrowseFilters from './BrowseFilters';
import EbookGrid from './EbookGrid';
import Pagination from './Pagination';

const BrowseEbooks = () => {
    const [filters, setFilters] = useState({
        search: '', genre: '', minPrice: '', maxPrice: '', availability: '', sort: 'newest', page: 1
    });
    const [ebooks, setEbooks] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEbooks = async () => {
            setLoading(true);
            const params = { ...filters, limit: 8 };
            Object.keys(params).forEach((k) => !params[k] && delete params[k]);
            const result = await getAllEbooks(params);
            setEbooks(result.ebooks || []);
            setTotalPages(result.totalPages || 1);
            setLoading(false);
        };

        const debounce = setTimeout(fetchEbooks, 300);
        return () => clearTimeout(debounce);
    }, [filters]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-2xl font-bold text-[#2B2420] mb-6">Browse Ebooks</h1>
            <BrowseFilters filters={filters} setFilters={setFilters} />
            <EbookGrid ebooks={ebooks} loading={loading} />
            <Pagination page={filters.page} totalPages={totalPages} filters={filters} setFilters={setFilters} />
        </div>
    );
};

export default BrowseEbooks;