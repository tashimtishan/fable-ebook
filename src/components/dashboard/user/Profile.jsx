'use client';
import React, { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { updateUserProfile, updateUserAvatar } from '@/lib/actions/payment';
import { imageUploader } from '@/lib/imageUpload';
import { HiUser, HiMail, HiShieldCheck, HiCalendar, HiCamera } from 'react-icons/hi';

const Profile = () => {
    const { data: session, refetch } = authClient.useSession();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(session?.user?.name || '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    // Update name when session changes
    useEffect(() => {
        if (session?.user?.name && name !== session.user.name) {
            setName(session.user.name);
        }
    }, [session?.user?.name]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const result = await updateUserProfile(session.user.id, name);
            if (result.success) {
                await refetch();
                setMessage({ text: '✅ Profile updated successfully!', type: 'success' });
                setIsEditing(false);
            } else {
                setMessage({ text: `❌ ${result.error || 'Failed to update profile'}`, type: 'error' });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage({ text: '❌ Failed to update profile. Please try again.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    if (!session) {
        return (
            <div className="text-center py-16">
                <p className="text-[#6B5F55]">Please log in to view your profile.</p>
            </div>
        );
    }

    const user = session.user;
    const joinDate = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : 'N/A';

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#2B2420] mb-6">My Profile</h1>

            {message.text && (
                <div className={`p-3 rounded-md mb-6 ${
                    message.type === 'success'
                        ? 'bg-[#F3DCC9] border border-[#C4622D] text-[#2B2420]'
                        : 'bg-red-50 border border-[#B3453A] text-[#B3453A]'
                }`}>
                    {message.text}
                </div>
            )}

            <div className="bg-white border border-[#E8DFD3] rounded-xl overflow-hidden max-w-2xl">
                <div className="bg-[#F3DCC9] p-6 border-b border-[#E8DFD3]">
                    <div className="flex items-center gap-4">
                        {/* Avatar with upload button */}
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-[#C4622D] flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    user.name?.[0]?.toUpperCase() || 'U'
                                )}
                            </div>
                            <button
                                onClick={() => document.getElementById('avatar-upload').click()}
                                className="absolute -bottom-1 -right-1 p-1.5 bg-[#C4622D] text-white rounded-full hover:bg-[#A34E22] transition-colors"
                            >
                                <HiCamera size={14} />
                            </button>
                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;
                                    try {
                                        const result = await imageUploader(file);
                                        await updateUserAvatar(session.user.id, result.url);
                                        await refetch();
                                        setMessage({ text: '✅ Avatar updated!', type: 'success' });
                                    } catch (err) {
                                        console.error(err);
                                        setMessage({ text: '❌ Failed to upload avatar.', type: 'error' });
                                    }
                                }}
                            />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#2B2420]">{user.name}</h2>
                            <p className="text-sm text-[#6B5F55]">
                                {user.role === 'admin' ? '👑 Admin' :
                                 user.role === 'writer' ? '✍️ Writer' :
                                 '📖 Reader'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-4">
                    {!isEditing ? (
                        <>
                            <div className="flex items-center gap-3 py-2 border-b border-[#E8DFD3]">
                                <HiUser className="text-[#C4622D] w-5 h-5" />
                                <div>
                                    <p className="text-xs text-[#6B5F55]">Full Name</p>
                                    <p className="font-medium text-[#2B2420]">{user.name}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 py-2 border-b border-[#E8DFD3]">
                                <HiMail className="text-[#C4622D] w-5 h-5" />
                                <div>
                                    <p className="text-xs text-[#6B5F55]">Email</p>
                                    <p className="font-medium text-[#2B2420]">{user.email}</p>
                                    {user.emailVerified && (
                                        <span className="text-xs text-[#6B8F71]">✅ Verified</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 py-2 border-b border-[#E8DFD3]">
                                <HiShieldCheck className="text-[#C4622D] w-5 h-5" />
                                <div>
                                    <p className="text-xs text-[#6B5F55]">Role</p>
                                    <p className="font-medium text-[#2B2420] capitalize">{user.role}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 py-2">
                                <HiCalendar className="text-[#C4622D] w-5 h-5" />
                                <div>
                                    <p className="text-xs text-[#6B5F55]">Joined</p>
                                    <p className="font-medium text-[#2B2420]">{joinDate}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsEditing(true)}
                                className="mt-4 px-6 py-2.5 rounded-md bg-[#C4622D] text-white text-sm font-semibold hover:bg-[#A34E22] transition-colors"
                            >
                                Edit Profile
                            </button>
                        </>
                    ) : (
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#2B2420] mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 rounded-md border border-[#E8DFD3] bg-white text-[#2B2420] focus:outline-none focus:border-[#C4622D]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#2B2420] mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="w-full px-4 py-2 rounded-md border border-[#E8DFD3] bg-[#FAF6F0] text-[#6B5F55] cursor-not-allowed"
                                />
                                <p className="text-xs text-[#6B5F55] mt-1">
                                    Email cannot be changed.
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#2B2420] mb-1">
                                    Role
                                </label>
                                <input
                                    type="text"
                                    value={user.role}
                                    disabled
                                    className="w-full px-4 py-2 rounded-md border border-[#E8DFD3] bg-[#FAF6F0] text-[#6B5F55] capitalize cursor-not-allowed"
                                />
                                <p className="text-xs text-[#6B5F55] mt-1">
                                    Role cannot be changed.
                                </p>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2.5 rounded-md bg-[#C4622D] text-white text-sm font-semibold hover:bg-[#A34E22] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setName(session?.user?.name || '');
                                        setMessage({ text: '', type: '' });
                                    }}
                                    className="px-6 py-2.5 rounded-md border border-[#E8DFD3] text-[#6B5F55] text-sm font-medium hover:border-[#C4622D] hover:text-[#2B2420] transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;