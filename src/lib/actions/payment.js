'use server';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
const APP_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// ✅ Existing subscription function (writer verification)
export const subscription = async (data) => {
    const res = await fetch(`${SERVER_URL}/subscription`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
};

// ✅ Check if user purchased a specific ebook (uses Next.js API)
export const checkIfUserPurchased = async (userId, ebookId) => {
    try {
        const res = await fetch(
            `${APP_URL}/api/purchases/check?userId=${userId}&ebookId=${ebookId}`,
            { cache: 'no-store' }
        );
        const data = await res.json();
        return data.purchased || false;
    } catch (error) {
        console.error('Error checking purchase:', error);
        return false;
    }
};

// ✅ Get all purchases for a user (uses Express backend)
export const getUserPurchases = async (userId) => {
    try {
        const res = await fetch(
            `${SERVER_URL}/purchases/${userId}`,
            { cache: 'no-store' }
        );
        const data = await res.json();
        return data.library || [];
    } catch (error) {
        console.error('Error fetching user purchases:', error);
        return [];
    }
};

export const toggleBookmark = async (userId, ebookId) => {
    try {
        const res = await fetch(`${SERVER_URL}/bookmarks/toggle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, ebookId }),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error toggling bookmark:', error);
        return { success: false, error: error.message };
    }
};

// Get user's bookmarks
export const getUserBookmarks = async (userId) => {
    try {
        const res = await fetch(
            `${SERVER_URL}/bookmarks/${userId}`,
            { cache: 'no-store' }
        );
        const data = await res.json();
        return data.bookmarks || [];
    } catch (error) {
        console.error('Error fetching bookmarks:', error);
        return [];
    }
};

// Check if user bookmarked an ebook
export const checkIfBookmarked = async (userId, ebookId) => {
    try {
        const res = await fetch(
            `${SERVER_URL}/bookmarks/check?userId=${userId}&ebookId=${ebookId}`,
            { cache: 'no-store' }
        );
        const data = await res.json();
        return data.isBookmarked || false;
    } catch (error) {
        console.error('Error checking bookmark:', error);
        return false;
    }
};

// Update user profile (uses Express backend)
export const updateUserProfile = async (userId, name) => {
    try {
        const res = await fetch(`${SERVER_URL}/user/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, name }),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error updating profile:', error);
        return { success: false, error: error.message };
    }
};

// Get writer's sales history
export const getWriterSales = async (writerId) => {
    try {
        const res = await fetch(
            `${SERVER_URL}/writer/sales/${writerId}`,
            { cache: 'no-store' }
        );
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching writer sales:', error);
        return { sales: [], totalSales: 0, totalRevenue: 0 };
    }
};

export const updateUserAvatar = async (userId, avatarUrl) => {
    try {
        const res = await fetch(`${SERVER_URL}/user/avatar`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, avatarUrl }),
        });
        return res.json();
    } catch (error) {
        console.error('Error updating avatar:', error);
        return { success: false, error: error.message };
    }
};
