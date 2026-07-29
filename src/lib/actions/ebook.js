'use server'
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const addEbook = async (data) => {
    const res = await fetch(`${SERVER_URL}/ebooks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    return result;
};

export const getWriterEbooks = async (writerId) => {
    const res = await fetch(`${SERVER_URL}/ebooks/writer/${writerId}`, {
        cache: 'no-store'
    });
    const result = await res.json();
    return result;
};

export const getEbookById = async (id) => {
    const res = await fetch(`${SERVER_URL}/ebooks/${id}`, { cache: 'no-store' });
    return res.json();
};

export const updateEbook = async (id, data) => {
    const res = await fetch(`${SERVER_URL}/ebooks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return res.json();
};

export const deleteEbook = async (id) => {
    const res = await fetch(`${SERVER_URL}/ebooks/${id}`, { method: "DELETE" });
    return res.json();
};

export const toggleEbookStatus = async (id, status) => {
    const res = await fetch(`${SERVER_URL}/ebooks/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
    });
    return res.json();
};


export const getAllEbooks = async (params) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${SERVER_URL}/ebooks?${query}`, { cache: 'no-store' });
    return res.json();
};