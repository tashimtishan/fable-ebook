'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

const roles = [
    {
        value: 'user',
        title: 'Reader',
        description: 'Browse, purchase, and read ebooks from talented writers.',
    },
    {
        value: 'writer',
        title: 'Writer',
        description: 'Upload and manage your own ebooks after a one-time verification.',
    },
];

const ChooseRolePage = () => {
    const router = useRouter();
    const [selected, setSelected] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleContinue = async () => {
        if (!selected) {
            setError('Please select a role to continue.');
            return;
        }

        setError('');
        setLoading(true);

        const { data, error } = await authClient.updateUser({
            role: selected,
        });

        setLoading(false);

        if (error) {
            setError(error.message || 'Something went wrong. Please try again.');
            return;
        }

        router.push('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0] px-4">
            <div className="w-full max-w-md bg-white border border-[#E8DFD3] rounded-xl shadow-sm p-8">

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-[#2B2420]">Choose Your Role</h1>
                    <p className="text-sm text-[#6B5F55] mt-1">How do you want to use Fable?</p>
                </div>

                {error && (
                    <div className="mb-4 px-4 py-2 rounded-md bg-[#B3453A]/10 border border-[#B3453A]/30 text-sm text-[#B3453A]">
                        {error}
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    {roles.map((role) => (
                        <button
                            key={role.value}
                            type="button"
                            onClick={() => setSelected(role.value)}
                            className={`text-left px-4 py-3 rounded-lg border transition-colors ${
                                selected === role.value
                                    ? 'border-[#C4622D] bg-[#F3DCC9]/40'
                                    : 'border-[#E8DFD3] hover:border-[#C4622D]/50'
                            }`}
                        >
                            <p className="font-semibold text-[#2B2420]">{role.title}</p>
                            <p className="text-sm text-[#6B5F55] mt-1">{role.description}</p>
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleContinue}
                    disabled={loading}
                    className="mt-6 w-full py-2.5 rounded-md bg-[#C4622D] text-white text-sm font-medium hover:bg-[#A34E22] transition-colors disabled:opacity-60"
                >
                    {loading ? 'Saving...' : 'Continue'}
                </button>
            </div>
        </div>
    );
};

export default ChooseRolePage;