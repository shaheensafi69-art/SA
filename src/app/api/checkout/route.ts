import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2026-06-24.dahlia' as any,
});

export async function POST(req: Request) {
  try {
    const { amount, note } = await req.json();

    if (!amount || amount < 5) {
      return NextResponse.json({ error: "Minimum donation is $5" }, { status: 400 });
    }

    const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://safiacademy.vercel.app").replace(/\/$/, "");

    // ساخت سشن پرداخت در حالت تعبیه‌شده
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded' as any, // Fix: Type '"embedded"' is not assignable to type 'UiMode'.
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Safi Academy Donation',
              description: 'Supporting educational infrastructure and global scholarships.',
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // انتقال متادیتا به بخش اصلی سشن جهت دسترسی آسان و بدون ارور در وب‌هوک
      metadata: {
        donation_note: note || 'No note provided',
      },
      return_url: `${baseUrl}/en/donate/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}