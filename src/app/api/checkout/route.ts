import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// راه‌اندازی استرایپ
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  try {
    const { amount, note } = await req.json();

    if (!amount || amount < 5) {
      return NextResponse.json({ error: "Minimum donation is $5" }, { status: 400 });
    }

    const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://safiacademy.vercel.app").replace(/\/$/, "");

    // ساخت سشن پرداخت در حالت تعبیه‌شده (اصلاح ارور ورژن جدید استرایپ)
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded_page' as any, // 🔥 کلمه جدیدی که استرایپ درخواست کرده بود
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
      // ذخیره پیام کاربر برای ارسال به تلگرام و داشبورد استرایپ
      metadata: {
        donation_note: note || 'No note provided',
      },
      // در حالت Embedded فقط باید return_url داشته باشیم
      return_url: `${baseUrl}/en/donate/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}