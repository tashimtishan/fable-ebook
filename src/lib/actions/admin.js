'use server';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

export const getAdminStats = async () => {
    const res = await fetch(`${SERVER_URL}/admin/stats`, { cache: 'no-store' });
    return res.json();
};

export const getAdminUsers = async () => {
    const res = await fetch(`${SERVER_URL}/admin/users`, { cache: 'no-store' });
    return res.json();
};

export const updateUserRole = async (userId, role) => {
    const res = await fetch(`${SERVER_URL}/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
    });
    return res.json();
};

export const deleteUser = async (userId) => {
    const res = await fetch(`${SERVER_URL}/admin/users/${userId}`, {
        method: 'DELETE',
    });
    return res.json();
};

export const getAdminEbooks = async () => {
    const res = await fetch(`${SERVER_URL}/admin/ebooks`, { cache: 'no-store' });
    return res.json();
};

export const toggleEbookStatus = async (ebookId, status) => {
    const res = await fetch(`${SERVER_URL}/admin/ebooks/${ebookId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    });
    return res.json();
};

export const deleteEbook = async (ebookId) => {
    const res = await fetch(`${SERVER_URL}/admin/ebooks/${ebookId}`, {
        method: 'DELETE',
    });
    return res.json();
};

export const getAdminTransactions = async () => {
    const res = await fetch(`${SERVER_URL}/admin/transactions`, { cache: 'no-store' });
    return res.json();
};