import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';


export async function POST(request) {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')
        const formData = await request.formData();

        const userSession = await auth.api.getSession({
            headers: await headers(),
        });

        const user = userSession?.user
        const price = formData.get('price')
        const title = formData.get('title')
        const ebookId = formData.get('ebookId')
        const userId = user.id
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email: user?.email,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: title
                        },
                        unit_amount: Number(price) *100
                    },
                    quantity: 1,
                },
            ],
            metadata : {
                userId,
                ebookId,
                title,
                price
            },
            mode: 'payment',
            success_url: `${origin}/writer-verification/success-payment?session_id={CHECKOUT_SESSION_ID}`,
            // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}