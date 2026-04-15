import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with dummy key fallback for testing/compilation
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2023-10-16' as any, // use appropriate API version or bypass type if needed, Next.js typing could be strict depending on stripe package version
});

export async function POST(req: Request) {
  try {
    const { birthDate } = await req.json();

    if (!birthDate) {
      return NextResponse.json({ error: 'Birth date is required' }, { status: 400 });
    }

    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const isDev = process.env.NODE_ENV !== 'production';
    
    // Safety check for dummy mode: Only allow bypass in dev if keys are missing/placeholder
    if (isDev && (!stripeKey || stripeKey === 'sk_test_dummy' || stripeKey.includes('ใส่คีย์ลับ'))) {
      console.warn("Using dummy stripe key or placeholder. Bypassing real checkout.");
      return NextResponse.json({ url: `${baseUrl}/report?session_id=dummy_session_123_birth_${encodeURIComponent(birthDate)}` });
    }

    if (!stripeKey || stripeKey === 'sk_test_dummy') {
      throw new Error('Stripe Secret Key is missing or invalid in production.');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'promptpay'],
      line_items: [
        {
          price_data: {
            currency: 'thb',
            product_data: {
              name: 'The Soul Report + Digital Amulet',
              description: 'Unlock your detailed memento mori report and exclusive digital amulet.',
            },
            unit_amount: 4900, // 49 THB in satang
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/report?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/`,
      metadata: {
        birthDate: birthDate,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
