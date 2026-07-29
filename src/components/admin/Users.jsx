'use client';
import React, { useEffect, useState } from 'react';
import { getAdminUsers, updateUserRole, deleteUser } from '@/lib/actions/admin';
import { HiTrash, HiPencil } from 'react-icons/hi';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        const data = await getAdminUsers();
        setUsers(data.users || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        await updateUserRole(userId, newRole);
        fetchUsers();
    };

    const handleDelete = async (userId) => {
        if (confirm('Delete this user?')) {
            await deleteUser(userId);
            fetchUsers();
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#2B2420] mb-6">Manage Users</h1>
            <div className="bg-white border border-[#E8DFD3] rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#F3DCC9] border-b border-[#E8DFD3]">
                        <tr>
                            <th className="p-3 text-sm font-semibold">Name</th>
                            <th className="p-3 text-sm font-semibold">Email</th>
                            <th className="p-3 text-sm font-semibold">Role</th>
                            <th className="p-3 text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8DFD3]">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-[#FAF6F0]">
                                <td className="p-3">{user.name}</td>
                                <td className="p-3">{user.email}</td>
                                <td className="p-3 capitalize">{user.role}</td>
                                <td className="p-3 flex gap-2">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className="px-2 py-1 border border-[#E8DFD3] rounded-md text-sm"
                                    >
                                        <option value="user">User</option>
                                        <option value="writer">Writer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <button onClick={() => handleDelete(user._id)} className="text-[#B3453A] hover:opacity-70">
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

export default Users;