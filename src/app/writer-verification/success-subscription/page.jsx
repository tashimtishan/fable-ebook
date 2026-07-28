import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import { HiCheckCircle } from 'react-icons/hi';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { subscription } from '@/lib/actions/payment';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  console.log(user)
  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
   const result=  await subscription({user, session_id})
   console.log(result)
    return (
      <section id="success" className="min-h-screen flex items-center justify-center bg-[#FAF6F0] px-4">
        <div className="w-full max-w-md bg-white border border-[#E8DFD3] rounded-2xl shadow-sm p-8 text-center">

          <div className="w-16 h-16 rounded-full bg-[#6B8F71]/10 flex items-center justify-center mx-auto mb-5">
            <HiCheckCircle className="text-[#6B8F71]" size={32} />
          </div>

          <h1 className="text-2xl font-bold text-[#2B2420]">Payment Successful</h1>
          <p className="text-sm text-[#6B5F55] mt-3">
            We appreciate your business! A confirmation email will be sent to{' '}
            <span className="font-medium text-[#2B2420]">{customerEmail}</span>.
          </p>

          <Link
            href="/"
            className="mt-8 inline-block w-full py-3 rounded-md bg-[#C4622D] text-white text-sm font-semibold hover:bg-[#A34E22] transition-colors"
          >
            Go to Homepage
          </Link>

          <p className="text-xs text-[#9098B1] mt-5">
            Questions? Email{' '}
            <a href="mailto:orders@example.com" className="text-[#C4622D] hover:underline">
              orders@example.com
            </a>
          </p>
        </div>
      </section>
    );
  }
}