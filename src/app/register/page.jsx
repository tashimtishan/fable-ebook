'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { FcGoogle } from 'react-icons/fc';

const RegisterPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);

        const { data, error } = await authClient.signUp.email({
            name: formData.name,
            email: formData.email,
            password: formData.password,
        });

        setLoading(false);

        if (error) {
            setError(error.message || 'Registration failed. Please try again.');
            return;
        }

        router.push('/choose-role');
    };

    const handleGoogleSignUp = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0] px-4">
            <div className="w-full max-w-md bg-white border border-[#E8DFD3] rounded-xl shadow-sm p-8">

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-[#2B2420]">Create Account</h1>
                    <p className="text-sm text-[#6B5F55] mt-1">Join Fable and start your journey</p>
                </div>

                {error && (
                    <div className="mb-4 px-4 py-2 rounded-md bg-[#B3453A]/10 border border-[#B3453A]/30 text-sm text-[#B3453A]">
                        {error}
                    </div>
                )}

                {/* Google Sign-Up Button */}
                <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    className="w-full flex items-center justify-center gap-3 py-2.5 rounded-md border border-[#E8DFD3] bg-white text-[#2B2420] text-sm font-medium hover:bg-[#FAF6F0] hover:border-[#C4622D] transition-colors mb-4"
                >
                    <FcGoogle size={20} />
                    Sign up with Google
                </button>

                <div className="relative mb-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#E8DFD3]" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="px-2 bg-white text-[#6B5F55]">OR</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-[#2B2420] mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            className="w-full px-3 py-2 rounded-md border border-[#E8DFD3] bg-white text-[#2B2420] placeholder-[#6B5F55]/60 focus:outline-none focus:border-[#C4622D] transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#2B2420] mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full px-3 py-2 rounded-md border border-[#E8DFD3] bg-white text-[#2B2420] placeholder-[#6B5F55]/60 focus:outline-none focus:border-[#C4622D] transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#2B2420] mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-3 py-2 rounded-md border border-[#E8DFD3] bg-white text-[#2B2420] placeholder-[#6B5F55]/60 focus:outline-none focus:border-[#C4622D] transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#2B2420] mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-3 py-2 rounded-md border border-[#E8DFD3] bg-white text-[#2B2420] placeholder-[#6B5F55]/60 focus:outline-none focus:border-[#C4622D] transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full py-2.5 rounded-md bg-[#C4622D] text-white text-sm font-medium hover:bg-[#A34E22] transition-colors disabled:opacity-60"
                    >
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                </form>

                <p className="text-center text-sm text-[#6B5F55] mt-6">
                    Already have an account?{' '}
                    <Link href="/Login" className="text-[#C4622D] font-medium hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;