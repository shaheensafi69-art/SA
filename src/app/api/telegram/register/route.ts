import type { NextRequest } from 'next/server';

function getTelegramConfig() {
  const token = process.env.TELEGRAM_BOT_TOKEN || process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID || process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
  return { token, chatId };
}

export async function POST(request: NextRequest) {
  try {
    const { token: TELEGRAM_TOKEN, chatId: TELEGRAM_CHAT_ID } = getTelegramConfig();
    if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
      return new Response(JSON.stringify({ error: 'Telegram bot token or chat id is not configured.' }), { status: 500 });
    }

    const body = await request.json();
    const {
      fullName,
      fatherName,
      email,
      phone,
      courseId,
      courseTitle,
      instructor,
    } = body;

    const message = `New course registration request:\n\nName: ${fullName}\nFather's Name: ${fatherName}\nEmail: ${email}\nPhone: ${phone}\nCourse: ${courseTitle} (${courseId})\nInstructor: ${instructor}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message, parse_mode: 'HTML' }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return new Response(JSON.stringify({ error: errorData.description || 'Telegram send failed' }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unexpected error' }), { status: 500 });
  }
}
