import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

// تشخیص محیط پی‌پال (Live یا Sandbox)
const isLive = process.env.PAYPAL_MODE !== 'sandbox';
const PAYPAL_BASE_URL = isLive ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

// تابع دریافت توکن احراز هویت از پی‌پال
async function getPayPalAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials are not configured in environment variables.");
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const res = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  });

  const data = await res.json();
  if (!res.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || 'Failed to authenticate with PayPal.');
  }

  return data.access_token;
}

// ارسال اعلان خودکار دریافت دونیت پی‌پال به تلگرام
async function sendPayPalTelegramNotification(amount: number, note: string, donorName?: string, donorEmail?: string, orderId?: string) {
  const botToken =
    process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN2 ||
    process.env.TELEGRAM_BOT_TOKEN2 ||
    "8994358206:AAHUpoHpMpqdnTxA_J30-xMipDg4l0vhBV8";
  const chatId =
    process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID2 ||
    process.env.TELEGRAM_CHAT_ID2 ||
    "5195615040";

  const message = `
🅿️ <b>کمک مالی جدید با پی‌پال دریافت شد! (PayPal Donation)</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 <b>مبلغ:</b> <b>$${amount.toLocaleString()} USD</b>
👤 <b>نام پرداخت‌کننده:</b> ${donorName || 'حامی ناشناس'}
📧 <b>ایمیل:</b> ${donorEmail || 'ثبت نشده'}
📝 <b>یادداشت حامی:</b>
<i>"${note || 'بدون پیام'}"</i>

🔖 <b>شناسه سفارش پی‌پال:</b> <code>${orderId || 'N/A'}</code>
🚀 <code>Safi Academy Donation Engine</code>
`;

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
      console.warn("Telegram PayPal alert warning:", result.description);
    }
  } catch (err) {
    console.error("Failed to send Telegram PayPal notification:", err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, amount, note, orderId } = body;

    // ۱. ساخت اردر در پی‌پال (Create Order)
    if (action === 'create') {
      if (!amount || Number(amount) < 1) {
        return NextResponse.json({ error: "Minimum donation is $1" }, { status: 400 });
      }

      const accessToken = await getPayPalAccessToken();

      const orderPayload = {
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: 'donation',
            description: 'Safi Academy Student Scholarship & Underground Education Fund',
            amount: {
              currency_code: 'USD',
              value: Number(amount).toFixed(2),
            },
            custom_id: note ? String(note).slice(0, 127) : 'Safi Academy Donation',
          },
        ],
        application_context: {
          brand_name: 'Safi Academy',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: `${(process.env.NEXT_PUBLIC_SITE_URL || 'https://safiacademy.org').replace(/\/$/, '')}/en/donate/success`,
          cancel_url: `${(process.env.NEXT_PUBLIC_SITE_URL || 'https://safiacademy.org').replace(/\/$/, '')}/en/donate`,
        },
      };

      const res = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      const orderData = await res.json();
      if (!res.ok) {
        throw new Error(orderData.message || 'Failed to create PayPal order.');
      }

      return NextResponse.json({ orderId: orderData.id });
    }

    // ۲. تسویه و ثبت نهایی پرداخت در پی‌پال (Capture Order)
    if (action === 'capture') {
      if (!orderId) {
        return NextResponse.json({ error: "Order ID is required for capture." }, { status: 400 });
      }

      const accessToken = await getPayPalAccessToken();

      const res = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const captureData = await res.json();
      if (!res.ok) {
        throw new Error(captureData.message || 'Failed to capture PayPal transaction.');
      }

      const capturedUnit = captureData.purchase_units?.[0]?.payments?.captures?.[0];
      const capturedAmount = Number(capturedUnit?.amount?.value || amount || 0);
      const payerName = `${captureData.payer?.name?.given_name || ''} ${captureData.payer?.name?.surname || ''}`.trim();
      const payerEmail = captureData.payer?.email_address;

      if (capturedAmount > 0) {
        // ارسال اعلان به تلگرام
        await sendPayPalTelegramNotification(capturedAmount, note, payerName, payerEmail, orderId);

        // به‌روزرسانی جدول کمپین در سوپابیس
        try {
          const { data: campaign } = await supabaseAdmin
            .from('donation_campaigns')
            .select('raised_amount')
            .eq('language', 'en')
            .maybeSingle();

          if (campaign) {
            const newTotal = Number(campaign.raised_amount || 0) + capturedAmount;
            await supabaseAdmin
              .from('donation_campaigns')
              .update({ raised_amount: newTotal })
              .eq('language', 'en');
          }
        } catch (dbErr) {
          console.error("Supabase campaign increment error for PayPal:", dbErr);
        }
      }

      return NextResponse.json({
        success: true,
        orderId: orderDataFallback(orderId),
        captureId: capturedUnit?.id,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    console.error("PayPal API Route Error:", err);
    return NextResponse.json({ error: err.message || "PayPal processing failed." }, { status: 500 });
  }
}

function orderDataFallback(id: string) {
  return id;
}
