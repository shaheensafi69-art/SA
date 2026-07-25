import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, budget, details } = body;

    // توکن ربات و آیدی چت با امنیت کامل و بدون NEXT_PUBLIC_ فراخوانی می‌شوند
    const TELEGRAM_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json({ error: "Telegram credentials are not configured." }, { status: 500 });
    }

    const message = `
🚀 *New Development Request* 🚀

👤 *Name:* ${name}
📧 *Email:* ${email}
📱 *WhatsApp/Phone:* ${phone}
🛠 *Service Required:* ${service}
💰 *Estimated Budget:* ${budget}

📝 *Project Details:*
${details}
    `;

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        chat_id: TELEGRAM_CHAT_ID, 
        text: message, 
        parse_mode: 'Markdown' 
      })
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.description || 'Failed to send message to Telegram');
    }

    return NextResponse.json({ success: true, message: "Request sent successfully!" });
    
  } catch (error: any) {
    console.error("Telegram API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}