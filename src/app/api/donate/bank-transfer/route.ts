import { NextResponse } from 'next/server';

// تابع ارسال پیام به تلگرام برای ثبت فیش و اطلاعات انتقال بانکی دستی (Bank Transfer)
async function sendBankTransferTelegramAlert(data: {
  referenceId: string;
  donorName: string;
  donorEmail: string;
  amount: number | string;
  currency: string;
  selectedAccount: string;
  txId?: string;
  notes?: string;
}) {
  const botToken =
    process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN2 ||
    process.env.TELEGRAM_BOT_TOKEN2 ||
    "8994358206:AAHUpoHpMpqdnTxA_J30-xMipDg4l0vhBV8";
  const chatId =
    process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID2 ||
    process.env.TELEGRAM_CHAT_ID2 ||
    "5195615040";

  const message = `
🏛️ <b>اعلان انتقال بانکی جدید (Manual Bank Transfer)</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔖 <b>کد رهگیری:</b> <code>${data.referenceId}</code>

👤 <b>اطلاعات حامی:</b>
• نام: <b>${data.donorName}</b>
• ایمیل: ${data.donorEmail}

💰 <b>مبلغ و حساب مقصد:</b>
• مبلغ واریزی: <b>${data.amount} ${data.currency}</b>
• حساب انتخابی: <b>${data.selectedAccount}</b>
• شناسه تراکنش / فیش (TxID): <code>${data.txId || 'ثبت نشده'}</code>
• توضیحات یا پیام حامی: <i>"${data.notes || 'ندارد'}"</i>

⚡ <b>اقدام ادمین:</b> لطفاً صورت‌حساب بانکی را بررسی نموده و واریز را تطبیق دهید.
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
      console.warn("Telegram bank transfer alert warning:", result.description);
    }
  } catch (err) {
    console.error("Failed to send Telegram bank transfer message:", err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { donorName, donorEmail, amount, currency, selectedAccount, txId, notes } = body;

    if (!donorName || !donorEmail || !amount) {
      return NextResponse.json(
        { error: "Donor name, email, and amount are required." },
        { status: 400 }
      );
    }

    const referenceId = `BT-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    await sendBankTransferTelegramAlert({
      referenceId,
      donorName: donorName.trim(),
      donorEmail: donorEmail.trim(),
      amount,
      currency: currency || "EUR",
      selectedAccount: selectedAccount || "SEPA Account",
      txId: txId?.trim(),
      notes: notes?.trim()
    });

    return NextResponse.json({
      success: true,
      referenceId,
      message: "Bank transfer notification received successfully."
    });
  } catch (err: any) {
    console.error("Bank transfer API error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to process bank transfer notification." },
      { status: 500 }
    );
  }
}
