import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

// تابع اختصاصی ارسال پیام به تلگرام هنگام دریافت دونیت
async function sendTelegramDonationNotification(amount: number, note: string, donorEmail?: string, sessionId?: string) {
  const botToken =
    process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN2 ||
    process.env.TELEGRAM_BOT_TOKEN2 ||
    "8994358206:AAHUpoHpMpqdnTxA_J30-xMipDg4l0vhBV8";
  const chatId =
    process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID2 ||
    process.env.TELEGRAM_CHAT_ID2 ||
    "5195615040";

  const message =
    `❤️ <b>کمک مالی جدید دریافت شد! (New Live Donation)</b>\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `💰 <b>مبلغ:</b> <b>$${amount.toLocaleString()} USD</b>\n` +
    (donorEmail && donorEmail !== 'Anonymous' ? `📧 <b>ایمیل حامی:</b> ${donorEmail}\n` : '') +
    `📝 <b>پیام حامی:</b>\n<i>"${note}"</i>\n\n` +
    (sessionId ? `🔖 <b>شناسه پرداخت:</b> <code>${sessionId}</code>\n` : '') +
    `🚀 <code>Safi Academy Donation Engine</code>`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message.trim(),
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });
    const result = await res.json();
    if (!result.ok) {
      console.warn("Telegram notification warning:", result.description);
    } else {
      console.log("Telegram donation notification sent successfully.");
    }
  } catch (err) {
    console.error("Failed to send Telegram donation message:", err);
  }
}

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature');

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey) {
    console.error("STRIPE_SECRET_KEY is missing in webhook route.");
    return NextResponse.json({ error: "Server Stripe key not configured" }, { status: 500 });
  }

  if (!endpointSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is missing in webhook route.");
    return NextResponse.json({ error: "Server Webhook Secret not configured" }, { status: 500 });
  }

  if (!signature) {
    return NextResponse.json({ error: 'No stripe signature header found' }, { status: 400 });
  }

  const stripe = new Stripe(stripeSecretKey);
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // رویدادهای تکمیل موفقیت‌آمیز پرداخت سشن استرایپ
  if (
    event.type === 'checkout.session.completed' ||
    event.type === 'checkout.session.async_payment_succeeded'
  ) {
    const session = event.data.object as Stripe.Checkout.Session;

    const donationAmount = (session.amount_total || 0) / 100;
    const donationNote = session.metadata?.donation_note || 'No note provided';
    const donorEmail = session.customer_details?.email || session.customer_email || 'Anonymous';
    const sessionId = session.id;

    if (donationAmount > 0) {
      // ۱. ارسال بلادرنگ اعلان به تلگرام
      try {
        await sendTelegramDonationNotification(donationAmount, donationNote, donorEmail, sessionId);
      } catch (tgErr) {
        console.error("Failed dispatching donation Telegram alert:", tgErr);
      }

      // ۲. افزایش میزان وجه جمع‌آوری شده در جدول کمپین دیتابیس
      try {
        const { data: campaign, error: fetchError } = await supabaseAdmin
          .from('donation_campaigns')
          .select('raised_amount')
          .eq('language', 'en')
          .maybeSingle();

        if (fetchError) {
          console.error("Fetch campaign raised_amount error:", fetchError);
        } else if (campaign) {
          const newTotal = Number(campaign.raised_amount || 0) + donationAmount;
          const { error: updateError } = await supabaseAdmin
            .from('donation_campaigns')
            .update({ raised_amount: newTotal })
            .eq('language', 'en');

          if (updateError) {
            console.error("Failed updating campaign raised_amount:", updateError);
          } else {
            console.log(`Successfully updated campaign raised_amount to $${newTotal}`);
          }
        }
      } catch (dbError) {
        console.error('Database update error in webhook:', dbError);
      }

      console.log(`Processed donation webhook for $${donationAmount}`);
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}