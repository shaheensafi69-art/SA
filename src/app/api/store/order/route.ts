import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// اتصال امن به سوپابیس با Service Role Key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// آیدی پروفایل پشتیبان برای خریداران مهمان (Guest Profile)
const FALLBACK_GUEST_PROFILE_ID = "134264aa-bdcf-482e-8adc-52bc0e9e4081";

// تابع ارسال پیام به بات تلگرام برای ثبت سفارش جدید یا تأیید پرداخت
async function sendOrderTelegramNotification(orderData: {
  orderId: string;
  customerName: string;
  email: string;
  whatsapp: string;
  telegram?: string;
  productName: string;
  productId: string;
  category?: string;
  quantity: number;
  totalUSD: number;
  totalAFN: number;
  exchangeRate?: number;
  paymentMethod?: string;
  txId?: string;
  notes?: string;
  isPaymentProof?: boolean;
}) {
  const botToken =
    process.env.TELEGRAM_BOT_TOKEN ||
    process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN ||
    "8668673040:AAEI6Q4r28KWiTAGwvQrT0Y9j6S92KhtwiI";
  const chatId =
    process.env.TELEGRAM_CHAT_ID ||
    process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID ||
    "5195615040";

  let message = "";

  if (orderData.isPaymentProof) {
    message = `
💳 <b>رسید پرداخت جدید ثبت شد (Safi Academy Store)</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔖 <b>شناسه سفارش:</b> <code>${orderData.orderId}</code>
📦 <b>محصول:</b> ${orderData.productName}
🔢 <b>تعداد:</b> ${orderData.quantity}

👤 <b>اطلاعات پرداخت‌کننده:</b>
• نام: ${orderData.customerName}
• واتساپ / شماره: ${orderData.whatsapp}
• ایمیل: ${orderData.email}

🏦 <b>جزئیات پرداخت:</b>
• درگاه / روش: <b>${orderData.paymentMethod || 'Manual'}</b>
• شناسه تراکنش (TxID): <code>${orderData.txId || 'ثبت نشده'}</code>
• مبلغ: <b>$${orderData.totalUSD.toFixed(2)} USD</b> (${orderData.totalAFN.toLocaleString()} AFN)
• توضیحات: <i>${orderData.notes || 'ندارد'}</i>

⚡ <b>اقدام لازم:</b> لطفاً واریز وجه را در حساب بررسی و تأیید نمایید.
`;
  } else {
    message = `
🆕 <b>سفارش جدید در فروشگاه صافی ثبت شد!</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛒 <b>شناسه سفارش:</b> <code>${orderData.orderId}</code>

👤 <b>اطلاعات مشتری:</b>
• نام کامل: <b>${orderData.customerName}</b>
• ایمیل: ${orderData.email}
• واتساپ: <a href="https://wa.me/${orderData.whatsapp.replace(/[^0-9]/g, '')}">${orderData.whatsapp}</a>
• تلگرام: ${orderData.telegram ? `@${orderData.telegram.replace('@', '')}` : 'ثبت نشده'}

📦 <b>اطلاعات محصول:</b>
• نام: <b>${orderData.productName}</b>
• دسته‌بندی: ${orderData.category || 'General'}
• شناسه محصول: <code>${orderData.productId}</code>
• تعداد: <b>${orderData.quantity}</b>

💰 <b>مبلغ قابل پرداخت:</b>
• مجموع ارزی: <b>$${orderData.totalUSD.toFixed(2)} USD</b>
• معادل افغانی: <b>${orderData.totalAFN.toLocaleString()} AFN</b>
${orderData.exchangeRate ? `• نرخ تبدیل: 1 USD = ${orderData.exchangeRate} AFN` : ''}

⏳ <b>وضعیت:</b> در انتظار بررسی و پرداخت (تحویل ۲۴ ساعته)
`;
  }

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
      console.warn("Telegram dispatch warning:", result.description);
    }
  } catch (err) {
    console.error("Failed to send Telegram notification:", err);
  }
}

// ۱. ثبت سفارش جدید (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      productId,
      quantity = 1,
      fullName,
      email,
      whatsapp,
      telegram,
      totalUSD,
      totalAFN,
      effectiveRate,
      productName,
      category,
      costPrice,
      sellingPrice
    } = body;

    if (!productId || !fullName || !email) {
      return NextResponse.json(
        { error: "Product ID, full name, and email are required." },
        { status: 400 }
      );
    }

    const qty = Math.max(1, Number(quantity) || 1);

    // واکشی مشخصات محصول از دیتابیس جهت اطمینان از قیمت دقیق
    const { data: product, error: productErr } = await supabaseAdmin
      .from('reseller_products')
      .select('*')
      .eq('id', productId)
      .single();

    if (productErr || !product) {
      console.error("Product fetch error:", productErr);
      return NextResponse.json(
        { error: "Product not found or currently unavailable." },
        { status: 404 }
      );
    }

    const itemCostPrice = Number(product.cost_price || costPrice || product.selling_price * 0.7);
    const itemSalePrice = Number(product.selling_price || sellingPrice || totalUSD / qty);

    const totalCost = itemCostPrice * qty;
    const totalSale = itemSalePrice * qty;
    const computedTotalUSD = totalUSD ? Number(totalUSD) : totalSale;
    const computedTotalAFN = totalAFN ? Number(totalAFN) : Math.round(computedTotalUSD * (effectiveRate || 70));

    // ۲. یافتن یا انتساب student_id معتبر (برای رعایت قید NOT NULL)
    let assignedStudentId = FALLBACK_GUEST_PROFILE_ID;

    // الف) بررسی اینکه آیا حسابی با این ایمیل وجود دارد
    const { data: userProfile } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('email', email.trim().toLowerCase())
      .limit(1)
      .maybeSingle();

    if (userProfile && userProfile.id) {
      assignedStudentId = userProfile.id;
    }

    // ۳. درج سفارش در جدول reseller_orders (بدون profit_amount به دلیل generated بودن در Postgres)
    const { data: orderData, error: orderError } = await supabaseAdmin
      .from('reseller_orders')
      .insert({
        student_id: assignedStudentId,
        product_id: product.id,
        cost_price: totalCost,
        sale_price: totalSale,
        status: 'pending',
        order_payload: {
          customer_name: fullName.trim(),
          email: email.trim(),
          whatsapp: (whatsapp || '').trim(),
          telegram: (telegram || '').trim(),
          quantity: qty,
          total_usd: computedTotalUSD,
          total_afn: computedTotalAFN,
          exchange_rate: effectiveRate || 70,
          product_name: product.name,
          category: product.category,
          created_at: new Date().toISOString()
        }
      })
      .select()
      .single();

    if (orderError) {
      console.error("Failed to insert reseller order:", orderError);
      return NextResponse.json(
        { error: "Failed to record order in database: " + orderError.message },
        { status: 500 }
      );
    }

    // ۴. ارسال پیام به بات تلگرام
    await sendOrderTelegramNotification({
      orderId: orderData.id,
      customerName: fullName.trim(),
      email: email.trim(),
      whatsapp: (whatsapp || '').trim(),
      telegram: (telegram || '').trim(),
      productName: product.name,
      productId: product.id,
      category: product.category,
      quantity: qty,
      totalUSD: computedTotalUSD,
      totalAFN: computedTotalAFN,
      exchangeRate: effectiveRate || 70,
      isPaymentProof: false
    });

    return NextResponse.json({
      success: true,
      orderId: orderData.id,
      message: "Order placed successfully."
    });
  } catch (err: any) {
    console.error("Store order API error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error." },
      { status: 500 }
    );
  }
}

// ۲. به‌روزرسانی رسید پرداخت (PATCH)
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const {
      orderId,
      payerName,
      payerPhone,
      txId,
      paidAmount,
      notes,
      paymentMethod,
      productName,
      quantity
    } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required." },
        { status: 400 }
      );
    }

    // دریافت اطلاعات فعلی سفارش
    const { data: existingOrder } = await supabaseAdmin
      .from('reseller_orders')
      .select('order_payload')
      .eq('id', orderId)
      .maybeSingle();

    const currentPayload = existingOrder?.order_payload || {};
    const updatedPayload = {
      ...currentPayload,
      payment_method: paymentMethod || "Manual",
      tx_id: txId,
      payer_name: payerName,
      payer_phone: payerPhone,
      paid_amount: paidAmount,
      notes: notes,
      payment_submitted_at: new Date().toISOString()
    };

    const { error: updateError } = await supabaseAdmin
      .from('reseller_orders')
      .update({
        status: 'payment_submitted',
        order_payload: updatedPayload,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId);

    if (updateError) {
      console.error("Failed to update order payment proof:", updateError);
      return NextResponse.json(
        { error: "Failed to update payment status: " + updateError.message },
        { status: 500 }
      );
    }

    // ارسال اعلان رسید پرداخت به تلگرام
    await sendOrderTelegramNotification({
      orderId: orderId,
      customerName: payerName || currentPayload.customer_name || 'Anonymous',
      email: currentPayload.email || 'N/A',
      whatsapp: payerPhone || currentPayload.whatsapp || 'N/A',
      productName: productName || currentPayload.product_name || 'Store Item',
      productId: currentPayload.product_id || 'N/A',
      quantity: quantity || currentPayload.quantity || 1,
      totalUSD: currentPayload.total_usd || 0,
      totalAFN: currentPayload.total_afn || 0,
      paymentMethod: paymentMethod || "Manual",
      txId: txId,
      notes: notes,
      isPaymentProof: true
    });

    return NextResponse.json({
      success: true,
      message: "Payment proof submitted successfully."
    });
  } catch (err: any) {
    console.error("Payment proof API error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error." },
      { status: 500 }
    );
  }
}
