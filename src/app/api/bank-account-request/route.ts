import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      accountType,
      firstName,
      lastName,
      email,
      phone,
      country,
      companyName,
      companyRegNumber,
    } = body;

    if (!firstName?.trim() || !email?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: 'Missing required applicant fields.' },
        { status: 400 }
      );
    }

    const telegramBotToken =
      process.env.TELEGRAM_BOT_TOKEN ||
      process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN ||
      "8668673040:AAEI6Q4r28KWiTAGwvQrT0Y9j6S92KhtwiI";
    const telegramChatId =
      process.env.TELEGRAM_CHAT_ID ||
      process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID ||
      "5195615040";

    const message = `
🏛️ *NEW BANK ACCOUNT INQUIRY (Safi Academy)*
---------------------------------------------
📋 *Account Type:* ${accountType || 'Personal'}

👤 *Applicant Details:*
• Name: ${firstName} ${lastName || ''}
• Email: ${email}
• Phone / WhatsApp: ${phone}
• Country of Residence: ${country || 'Not specified'}

${accountType === 'Business' ? `🏢 *Company Profile:*
• Company Name: ${companyName || 'Not specified'}
• Reg Number: ${companyRegNumber || 'Not specified'}
` : ''}
⏱️ *Submitted At:* ${new Date().toISOString()}
    `;

    try {
      await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });
    } catch (telegramErr) {
      console.warn('Could not dispatch bank inquiry telegram notification:', telegramErr);
    }

    return NextResponse.json({ success: true, message: 'Application received.' });
  } catch (error: any) {
    console.error('Error processing bank account request:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error.' },
      { status: 500 }
    );
  }
}
