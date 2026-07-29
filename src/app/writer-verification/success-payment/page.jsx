import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { HiCheckCircle } from 'react-icons/hi';
import { MongoClient, ObjectId } from 'mongodb';

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams;

    if (!session_id) {
        throw new Error('Please provide a valid session_id (`cs_test_...`)');
    }

    // 1. Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent'],
    });

    const { status, customer_details, metadata } = session;

    if (status === 'open') {
        return redirect('/');
    }

    if (status === 'complete') {
        // 2. Update database
        const { userId, ebookId } = metadata || {};

        if (userId && ebookId) {
            const uri = process.env.MONGODB_URI;
            const client = new MongoClient(uri);

            try {
                await client.connect();
                const db = client.db('FableEbook_DB');
                const ebookCollection = db.collection('ebooks');
                const purchaseCollection = db.collection('purchases');

                // Check if purchase already exists (avoid duplicates on refresh)
                const existingPurchase = await purchaseCollection.findOne({
                    sessionId: session_id,
                });

                if (!existingPurchase) {
                    // Mark ebook as sold
                    await ebookCollection.updateOne(
                        { _id: new ObjectId(ebookId) },
                        { $set: { isSold: true } }
                    );

                    // Create purchase record
                    await purchaseCollection.insertOne({
                        ebookId: new ObjectId(ebookId),
                        userId: new ObjectId(userId),
                        userEmail: customer_details.email,
                        purchaseDate: new Date(),
                        amount: session.amount_total / 100,
                        sessionId: session_id,
                    });

                    console.log('✅ Purchase recorded for ebook:', ebookId);
                } else {
                    console.log('ℹ️ Purchase already exists for session:', session_id);
                }
            } catch (dbError) {
                console.error('❌ Database update failed:', dbError);
            } finally {
                await client.close();
            }
        } else {
            console.warn('⚠️ No userId or ebookId in metadata:', metadata);
        }

        // 3. Show success UI
        const amount = (session.amount_total / 100).toFixed(2);

        return (
            <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-[#FAF6F0]">
                <div className="bg-white border border-[#E8DFD3] rounded-2xl shadow-sm max-w-lg w-full p-8 md:p-12 text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-[#F3DCC9] flex items-center justify-center mb-6">
                        <HiCheckCircle className="w-10 h-10 text-[#C4622D]" />
                    </div>

                    <h1 className="text-2xl font-bold text-[#2B2420]">Payment Successful! 🎉</h1>

                    <div className="mt-4 space-y-2">
                        <p className="text-[#6B5F55]">
                            Thank you for your purchase of{' '}
                            <span className="font-semibold text-[#2B2420]">${amount}</span>
                        </p>
                        <p className="text-sm text-[#6B5F55]">
                            A confirmation email has been sent to{' '}
                            <span className="font-medium text-[#2B2420]">{customer_details.email}</span>
                        </p>
                    </div>

                    <div className="mt-6 text-sm text-[#6B5F55]">
                        <p>You can now access the full content of your ebook.</p>
                        <p className="mt-1 text-xs">
                            If you have any questions, please email{' '}
                            <a href="mailto:orders@fable.com" className="text-[#C4622D] hover:underline">
                                orders@fable.com
                            </a>
                        </p>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            href="/dashboard/user/purchases"
                            className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-[#C4622D] text-white text-sm font-semibold hover:bg-[#A34E22] transition-colors"
                        >
                            Go to My Library
                        </Link>
                        <Link
                            href="/browse"
                            className="w-full sm:w-auto px-6 py-2.5 rounded-md border border-[#E8DFD3] text-[#2B2420] text-sm font-medium hover:border-[#C4622D] hover:text-[#C4622D] transition-colors"
                        >
                            Browse More Ebooks
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Fallback for any unexpected status
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-[#FAF6F0]">
            <div className="bg-white border border-[#E8DFD3] rounded-2xl shadow-sm max-w-lg w-full p-8 text-center">
                <h1 className="text-2xl font-bold text-[#2B2420]">Payment Status Unknown</h1>
                <p className="mt-4 text-[#6B5F55]">Please check your email for confirmation.</p>
                <Link href="/" className="mt-6 inline-block px-6 py-2.5 rounded-md bg-[#C4622D] text-white hover:bg-[#A34E22] transition-colors">
                    Go Home
                </Link>
            </div>
        </div>
    );
}