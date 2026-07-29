'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { getEbookById } from '@/lib/actions/ebook';
import {
    checkIfUserPurchased,
    toggleBookmark,
    checkIfBookmarked
} from '@/lib/actions/payment';
import { HiBookmark, HiCheckCircle, HiOutlineBookmark } from 'react-icons/hi';

const EbookDetails = ({ ebookId }) => {
    const { data: session } = authClient.useSession();
    const [ebook, setEbook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasPurchased, setHasPurchased] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [bookmarkLoading, setBookmarkLoading] = useState(false);

    // Single useEffect to handle all data fetching
    useEffect(() => {
        let isMounted = true;

        const fetchAllData = async () => {
            setLoading(true);

            try {
                // 1. Fetch ebook details
                const ebookData = await getEbookById(ebookId);
                if (!isMounted) return;
                setEbook(ebookData);

                // 2. Check if user purchased (only if logged in and ebook exists)
                if (session?.user?.id && ebookData?._id) {
                    try {
                        const purchased = await checkIfUserPurchased(
                            session.user.id,
                            ebookData._id
                        );
                        if (isMounted) {
                            setHasPurchased(purchased);
                        }
                    } catch (err) {
                        console.error('Error checking purchase:', err);
                        if (isMounted) {
                            setHasPurchased(false);
                        }
                    }
                } else {
                    if (isMounted) {
                        setHasPurchased(false);
                    }
                }
            } catch (error) {
                console.error('Error fetching ebook:', error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchAllData();

        // Cleanup function to prevent state updates on unmounted component
        return () => {
            isMounted = false;
        };
    }, [ebookId, session?.user?.id]);
    // Check if user bookmarked this ebook
    // Check if user bookmarked this ebook
    useEffect(() => {
        let isMounted = true;

        if (session?.user?.id && ebook?._id) {
            const checkBookmark = async () => {
                try {
                    const bookmarked = await checkIfBookmarked(
                        session.user.id,
                        ebook._id
                    );
                    if (isMounted) {
                        setIsBookmarked(bookmarked);
                    }
                } catch (error) {
                    console.error('Error checking bookmark:', error);
                }
            };
            checkBookmark();
        }

        return () => {
            isMounted = false;
        };
    }, [session?.user?.id, ebook?._id]);


    const handleToggleBookmark = async () => {
        if (!session) {
            router.push('/login');
            return;
        }

        setBookmarkLoading(true);
        try {
            const result = await toggleBookmark(session.user.id, ebook._id);
            if (result.success) {
                setIsBookmarked(result.isBookmarked);
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error);
        } finally {
            setBookmarkLoading(false);
        }
    };
    // Show loading state
    if (loading) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-16 text-[#6B5F55]">
                <p>Loading...</p>
            </div>
        );
    }

    if (!ebook || !ebook._id) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-16 text-[#6B5F55]">
                <p>Ebook not found.</p>
            </div>
        );
    }

    const isOwner = session?.user?.id === ebook.writerId;
    const isPurchased = hasPurchased || isOwner;

    // Determine what content to show
    const showFullContent = isPurchased;
    const displayDescription = showFullContent
        ? ebook.description
        : ebook.description?.slice(0, 400);

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Cover Image */}
            <img
                src={ebook.coverImage}
                alt={ebook.title}
                className="w-full h-96 object-cover rounded-xl border border-[#E8DFD3]"
            />

            {/* Details */}
            <div className="md:col-span-2">
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-[#F3DCC9] text-[#C4622D]">
                    {ebook.genre}
                </span>

                <h1 className="text-3xl font-bold text-[#2B2420] mt-3">
                    {ebook.title}
                </h1>
                <p className="text-sm text-[#6B5F55] mt-1">
                    by {ebook.writerName}
                </p>

                <div className="flex items-center gap-4 mt-4">
                    <span className="text-2xl font-bold text-[#2B2420]">
                        ${ebook.price}
                    </span>
                    {ebook.isSold ? (
                        <span className="text-sm font-medium text-[#B3453A]">
                            Sold
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-[#6B8F71]">
                            <HiCheckCircle /> Available
                        </span>
                    )}
                </div>

                {/* Buy Button */}
                <div className="flex items-center gap-3 mt-6">
                    <form action="/api/payment" method="POST">
                        <input type="hidden" defaultValue={ebook.price} name="price" />
                        <input type="hidden" defaultValue={ebook.title} name="title" />
                        <input type="hidden" defaultValue={ebook._id} name="ebookId" />
                        <button
                            type="submit"
                            disabled={isOwner || isPurchased || ebook.isSold}
                            className="px-6 py-2.5 rounded-md bg-[#C4622D] text-white text-sm font-semibold hover:bg-[#A34E22] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPurchased
                                ? 'Already Purchased'
                                : isOwner
                                    ? 'Your Own Ebook'
                                    : ebook.isSold
                                        ? 'Sold Out'
                                        : 'Buy Now'}
                        </button>
                    </form>

                    <button
                        onClick={handleToggleBookmark}
                        disabled={!session || bookmarkLoading}
                        className={`p-2.5 rounded-md border border-[#E8DFD3] transition-colors ${isBookmarked
                            ? 'bg-[#C4622D] text-white border-[#C4622D] hover:bg-[#A34E22]'
                            : 'text-[#6B5F55] hover:border-[#C4622D] hover:text-[#C4622D]'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        <HiBookmark size={20} className={isBookmarked ? 'fill-white' : ''} />
                    </button>
                </div>

                {/* Content */}
                <div className="mt-8">
                    <h2 className="text-sm font-semibold text-[#2B2420] mb-2">
                        {showFullContent ? 'Full Content' : 'Preview'}
                    </h2>
                    <div className="relative">
                        <p className="text-[#4B4038] leading-relaxed whitespace-pre-line font-serif">
                            {displayDescription}
                        </p>
                        {!showFullContent && (
                            <div className="relative -mt-16 h-16 bg-gradient-to-t from-[#FAF6F0] to-transparent flex items-end justify-center">
                                <p className="text-sm text-[#6B5F55] pb-1">
                                    Purchase to continue reading
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Show "Full Content Available" badge if purchased */}
                    {showFullContent && (
                        <div className="mt-4 p-3 bg-[#F3DCC9] rounded-md border border-[#C4622D]">
                            <p className="text-sm text-[#2B2420] font-medium">
                                ✅ Full content unlocked — you purchased this ebook.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EbookDetails;