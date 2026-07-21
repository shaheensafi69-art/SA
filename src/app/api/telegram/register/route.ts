import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
  try {
    const TELEGRAM_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID;
    
    if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json(
        { error: 'Telegram configuration is missing on server environment (.env.local).' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      studentId,
      fullName,
      fatherName,
      email,
      phone,
      courseId,
      courseTitle,
      instructor,
      classGroupId,
      className,
      classTime,
      classDays,
      finalPrice,
      walletDeduction,
      notes
    } = body;

    // ۱. ثبت در دیتابیس Supabase
    if (studentId) {
      try {
        // الف) ثبت در enrollments
        if (courseId) {
          await supabase.from('enrollments').upsert({
            student_id: studentId,
            course_id: courseId,
            progress_percentage: 0
          }, { onConflict: 'student_id, course_id' });
        }

        // ب) ثبت در class_students همراه با کلاس انتخاب‌شده و is_paid = false
        if (classGroupId) {
          await supabase.from('class_students').upsert({
            class_group_id: classGroupId,
            student_id: studentId,
            is_paid: false 
          }, { onConflict: 'class_group_id, student_id' });
        }
      } catch (dbError) {
        console.error("Database Exception:", dbError);
      }
    }

    // ۲. ساخت پیام حرفه‌ای برای تلگرام
    let message = `🆕 <b>NEW ENROLLMENT REQUEST</b> 🆕\n\n`;
    message += `👤 <b>Student:</b> ${fullName}\n`;
    message += `👨‍👦 <b>Father:</b> ${fatherName}\n`;
    message += `📧 <b>Email:</b> ${email}\n`;
    message += `📱 <b>WhatsApp:</b> ${phone}\n\n`;
    
    message += `📚 <b>Course:</b> ${courseTitle}\n`;
    message += `🔸 <b>Instructor:</b> ${instructor}\n`;
    if (className) {
      message += `🏛️ <b>Class:</b> ${className}\n`;
      message += `⏰ <b>Time:</b> ${classTime || 'N/A'}\n`;
      message += `📅 <b>Days:</b> ${classDays || 'N/A'}\n`;
    }
    message += `\n`;
    
    if (notes) {
      message += `📝 <b>Notes:</b> ${notes}\n\n`;
    }

    message += `💰 <b>Financial Summary:</b>\n`;
    if (walletDeduction && walletDeduction > 0) {
      message += `💎 <b>Wallet Bonus Used:</b> $${walletDeduction}\n`;
    }
    message += `💳 <b>Pending Payment:</b> $${finalPrice}\n\n`;
    message += `⚠️ <i>Status: Awaiting Payment Confirmation in DB (is_paid = false).</i>`;

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    
    const telegramRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        chat_id: TELEGRAM_CHAT_ID, 
        text: message, 
        parse_mode: 'HTML' 
      }),
    });

    const telegramData = await telegramRes.json();

    if (!telegramRes.ok) {
      return NextResponse.json(
        { error: `Telegram API Error: ${telegramData.description || 'Failed to send'}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: telegramData }, { status: 200 });

  } catch (error: any) {
    console.error("API Catch Error:", error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}