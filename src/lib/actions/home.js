'use server';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

export const getFeaturedEbooks = async (limit = 6) => {
    const res = await fetch(`${SERVER_URL}/ebooks?limit=${limit}&sort=newest`, { cache: 'no-store' });
    const data = await res.json();
    return data.ebooks || [];
};

export const getTopWriters = async () => {
    const res = await fetch(`${SERVER_URL}/top-writers`, { cache: 'no-store' });
    return res.json();
};