import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2026-06-24.dahlia' as any,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

// تابع اختصاصی ارسال پیام به تلگرام
async function sendTelegramNotification(amount: number, note: string) {
  const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN2 || "8994358206:AAHUpoHpMpqdnTxA_J30-xMipDg4l0vhBV8";
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID2 || "5195615040";

  const message = `❤️ <b>New Live Donation Received!</b>\n\n` +
                  `💰 <b>Amount:</b> $${amount.toLocaleString()}\n` +
                  `📝 <b>Contributor Note:</b>\n<i>"${note}"</i>\n\n` +
                  `🚀 <code>Safi Academy Platform Analytics</code>`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    });
    console.log("Telegram notification sent successfully.");
  } catch (err) {
    console.error("Failed to send Telegram message:", err);
  }
}

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No stripe signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const donationAmount = (session.amount_total || 0) / 100;
    // دریافت یادداشت ثبت شده از بخش متادیتا
    const donationNote = session.metadata?.donation_note || 'No note provided';

    if (donationAmount > 0) {
      try {
        // ۱. خواندن میزان وجه جمع‌آوری شده فعلی
        const { data: campaign, error: fetchError } = await supabaseAdmin
          .from('donation_campaigns')
          .select('raised_amount')
          .eq('language', 'en')
          .single();

        if (fetchError) throw fetchError;

        const newTotal = Number(campaign.raised_amount) + donationAmount;

        // ۲. به روز رسانی اطلاعات جدول دیتابیس
        const { error: updateError } = await supabaseAdmin
          .from('donation_campaigns')
          .update({ raised_amount: newTotal })
          .eq('language', 'en');

        if (updateError) throw updateError;

        // ۳. ارسال خودکار اعلان به بات تلگرام شما
        await sendTelegramNotification(donationAmount, donationNote);

        console.log(`Successfully completed webhook workflow for $${donationAmount}`);
      } catch (dbError) {
        console.error('Internal execution failed:', dbError);
        return NextResponse.json({ error: 'Internal process failed' }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}