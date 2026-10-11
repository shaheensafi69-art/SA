import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_KEY is missing in environment variables.");
      return NextResponse.json(
        { error: "Stripe gateway is not configured. STRIPE_SECRET_KEY is missing." },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);

    const { amount, note } = await req.json();

    if (!amount || amount < 5) {
      return NextResponse.json({ error: "Minimum donation is $5" }, { status: 400 });
    }

    // پاکسازی آدرس سایت جهت جلوگیری از تکرار لوکال (مانند en/en/donate)
    const rawBaseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://safiacademy.vercel.app").trim();
    const baseUrl = rawBaseUrl
      .replace(/\/$/, "")
      .replace(/\/(en|fa|ps|es|fr|ar|de|ru|tr|uz|id|ko|hi|pt|it|ur|nl|ja|zh)$/i, "");

    // ساخت سشن پرداخت در حالت تعبیه‌شده (Embedded Checkout)
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded_page' as any,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Safi Academy Donation',
              description: 'Supporting underground educational infrastructure and female scholarships in Afghanistan.',
            },
            unit_amount: Math.round(Number(amount) * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        donation_note: note ? String(note).slice(0, 500) : 'No note provided',
      },
      return_url: `${baseUrl}/en/donate/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error.message || error);
    return NextResponse.json({ error: error.message || "Failed to create checkout session" }, { status: 500 });
  }
}