'use client';

import React, { useState } from 'react';
import { HiOutlineBookOpen, HiCheckCircle } from 'react-icons/hi';

const WriterVerificationPage = () => {
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        setLoading(true);
        // TODO: call your Stripe checkout session creation here
        // e.g. const res = await fetch('/api/stripe/writer-verification', { method: 'POST' });
        // const { url } = await res.json();
        // window.location.href = url;
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0] px-4">
            <div className="w-full max-w-md bg-white border border-[#E8DFD3] rounded-2xl shadow-sm p-8 text-center">

                <div className="w-14 h-14 rounded-full bg-[#F3DCC9] flex items-center justify-center mx-auto mb-5">
                    <HiOutlineBookOpen className="text-[#C4622D]" size={26} />
                </div>

                <h1 className="text-2xl font-bold text-[#2B2420]">Become a Verified Writer</h1>
                <p className="text-sm text-[#6B5F55] mt-2">
                    Complete a one-time verification payment to unlock your Writer dashboard and start publishing ebooks.
                </p>

                <div className="mt-8 border border-[#E8DFD3] rounded-xl p-6 text-left">
                    <p className="text-xs uppercase tracking-wide text-[#9098B1]">One-time fee</p>
                    <p className="text-3xl font-bold text-[#2B2420] mt-1">$13.00</p>

                    <ul className="mt-5 flex flex-col gap-2.5">
                        {[
                            'Publish unlimited ebooks',
                            'Track your sales history',
                            'Get a verified writer badge',
                        ].map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-[#6B5F55]">
                                <HiCheckCircle className="text-[#6B8F71] shrink-0" size={16} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

               <form  method="POST" action={'/api/checkout_sessions'}>
                 <button
                    onClick={handleUpgrade}
                    disabled={loading}
                    className="mt-6 w-full py-3 rounded-md bg-[#C4622D] text-white text-sm font-semibold hover:bg-[#A34E22] transition-colors disabled:opacity-60"
                >
                    {loading ? 'Redirecting to payment...' : 'Pay & Get Verified'}
                </button>
               </form>

                <p className="text-xs text-[#9098B1] mt-4">
                    Secure payment powered by Stripe.
                </p>
            </div>
        </div>
    );
};

export default WriterVerificationPage;