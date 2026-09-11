import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/utils/supabase/server';

// ایجاد کلاینت با دسترسی ادمین (Service Role) جهت عبور از موانع RLS و تضمین ثبت در دیتابیس
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseAdmin = createSupabaseClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      dateOfBirth,
      category,
      courseTitle,
      courseDescription,
      experienceLevel,
      teachingFormat,
      language,
      bio,
      achievements,
      portfolioUrl,
      sampleVideoUrl,
      resumeUrl,
      avatarUrl,
      userId
    } = body;

    // اعتبارسنجی فیلدهای اجباری
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !category?.trim() || !courseTitle?.trim() || !avatarUrl) {
      return NextResponse.json(
        { error: 'Missing required applicant fields (including mandatory profile photo).' },
        { status: 400 }
      );
    }

    // شناسایی کاربر لاگین شده در صورت عدم ارسال دستی userId
    let targetUserId = userId && userId.trim() !== '' ? userId : null;
    if (!targetUserId) {
      try {
        const userClient = await createServerClient();
        const { data: { user } } = await userClient.auth.getUser();
        if (user) {
          targetUserId = user.id;
        }
      } catch (authErr) {
        console.warn('Could not retrieve user session:', authErr);
      }
    }

    // تمیزسازی داده‌ها برای جلوگیری از ارورهای نوع داده پستگرس (UUID و DATE)
    const sanitizedDateOfBirth = dateOfBirth && dateOfBirth.trim() !== '' ? dateOfBirth.trim() : null;
    const sanitizedUserId = targetUserId && targetUserId.trim() !== '' ? targetUserId : null;

    let applicationRecordId = '';

    // ۱. ثبت قطعی در جدول ۶۲ (instructor_applications)
    const applicationPayload = {
      user_id: sanitizedUserId,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      country: country?.trim() || null,
      date_of_birth: sanitizedDateOfBirth,
      category: category.trim(),
      course_title: courseTitle.trim(),
      course_description: courseDescription?.trim() || null,
      experience_level: experienceLevel || '3-5 Years',
      teaching_format: teachingFormat || 'Hybrid (Live Cohorts & Recorded)',
      language: language || 'English',
      bio: bio?.trim() || '',
      achievements: achievements?.trim() || null,
      portfolio_url: portfolioUrl?.trim() || null,
      sample_video_url: sampleVideoUrl?.trim() || null,
      resume_url: resumeUrl?.trim() || null,
      avatar_url: avatarUrl.trim(),
      status: 'pending',
      admin_notes: null,
      reviewed_at: null
    };

    const { data: appData, error: appError } = await supabaseAdmin
      .from('instructor_applications')
      .insert([applicationPayload])
      .select('id')
      .single();

    if (appError) {
      console.error('CRITICAL: Error inserting into instructor_applications:', appError);
      return NextResponse.json(
        { error: `Database error: ${appError.message}` },
        { status: 500 }
      );
    }

    if (appData) {
      applicationRecordId = appData.id;
      console.log('Instructor application saved successfully with ID:', applicationRecordId);
    }

    // ۲. همگام‌سازی با پروفایل مدرس در صورت لاگین بودن کاربر (جدول ۵۰: teacher_info)
    if (sanitizedUserId) {
      try {
        await supabaseAdmin.from('teacher_info').upsert({
          id: sanitizedUserId,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          date_of_birth: sanitizedDateOfBirth,
          bio: bio?.trim() || '',
          achievements: achievements?.trim() || '',
          avatar_url: avatarUrl.trim()
        });
      } catch (teacherErr) {
        console.warn('Could not sync into teacher_info:', teacherErr);
      }
    }

    // ۳. ایجاد تیکت پشتیبانی برای پیگیری در پنل ادمین (در صورت وجود حساب کاربری)
    let ticketId: string = '';
    if (sanitizedUserId) {
      try {
        const formattedTicketMessage = `
🎓 **NEW INSTRUCTOR APPLICATION SUBMITTED**

👤 **Personal Information:**
- Name: ${firstName} ${lastName}
- Email: ${email}
- Phone/WhatsApp: ${phone || 'Not provided'}
- Country: ${country || 'Not provided'}
- Date of Birth: ${sanitizedDateOfBirth || 'Not provided'}

📚 **Course & Teaching Domain:**
- Category: ${category}
- Proposed Course Title: ${courseTitle}
- Teaching Format: ${teachingFormat}
- Language: ${language}
- Experience Level: ${experienceLevel}

📝 **Course Description:**
${courseDescription || 'Not provided'}

🏆 **Bio & Achievements:**
- Bio: ${bio || 'Not provided'}
- Key Achievements: ${achievements || 'Not provided'}

🔗 **Audition Materials & Uploads:**
- Avatar Photo: ${avatarUrl}
- Resume / CV: ${resumeUrl || 'None attached'}
- Sample Video: ${sampleVideoUrl || 'None attached'}
- Portfolio / LinkedIn: ${portfolioUrl || 'Not provided'}
        `.trim();

        const { data: ticket, error: ticketError } = await supabaseAdmin
          .from('tickets')
          .insert({
            student_id: sanitizedUserId,
            subject: `Instructor Application: ${firstName} ${lastName} (${category})`,
            department: 'Instructor Application',
            status: 'open'
          })
          .select('id')
          .single();

        if (!ticketError && ticket) {
          ticketId = ticket.id;

          await supabaseAdmin.from('ticket_messages').insert({
            ticket_id: ticket.id,
            sender_id: sanitizedUserId,
            message_text: formattedTicketMessage,
            attachment_url: resumeUrl || sampleVideoUrl || null
          });

          await supabaseAdmin.from('user_notifications').insert({
            user_id: sanitizedUserId,
            title: 'Instructor Application Received',
            message: 'Your application to join Safi Academy as an instructor has been received. Our faculty committee will review your proposal within 48-72 hours.',
            notification_type: 'system',
            link_url: `/en/support/chat/${ticket.id}`,
            is_read: false
          });
        }
      } catch (ticketErr) {
        console.warn('Ticket creation skipped or encountered an error:', ticketErr);
      }
    }

    // ۴. ارسال فوری هشدار تلگرام به مدیریت با تمام لینک‌های آپلود شده
    const TELEGRAM_TOKEN =
      process.env.TELEGRAM_BOT_TOKEN ||
      process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN ||
      '8668673040:AAEI6Q4r28KWiTAGwvQrT0Y9j6S92KhtwiI';

    const TELEGRAM_CHAT_ID =
      process.env.TELEGRAM_CHAT_ID ||
      process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID ||
      '5195615040';

    if (TELEGRAM_TOKEN && TELEGRAM_CHAT_ID) {
      const escapeHtml = (str: string = '') =>
        str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      const appRefId = applicationRecordId
        ? `APP-${applicationRecordId.slice(0, 8).toUpperCase()}`
        : (ticketId ? `TCK-${ticketId.slice(0, 8).toUpperCase()}` : `APP-${Date.now().toString().slice(-6)}`);

      const telegramMessage = `
🎓 <b>درخواست جدید تدریس در آکادمی صافی</b> 🎓
━━━━━━━━━━━━━━━━━━━━━
🆔 <b>کد پیگیری دیتابیس:</b> <code>${escapeHtml(appRefId)}</code>

👤 <b>مشخصات متقاضی:</b>
• <b>نام و تخلص:</b> ${escapeHtml(firstName)} ${escapeHtml(lastName)}
• <b>ایمیل:</b> ${escapeHtml(email)}
• <b>شماره تماس:</b> ${escapeHtml(phone || 'ثبت نشده')}
• <b>کشور محل سکونت:</b> ${escapeHtml(country || 'ثبت نشده')}
• <b>تاریخ تولد:</b> ${escapeHtml(sanitizedDateOfBirth || 'ثبت نشده')}

📚 <b>دوره و تخصص:</b>
• <b>حوزه تدریس:</b> ${escapeHtml(category)}
• <b>عنوان دوره:</b> ${escapeHtml(courseTitle)}
• <b>سابقه تدریس:</b> ${escapeHtml(experienceLevel || 'ثبت نشده')}
• <b>فرمت تدریس:</b> ${escapeHtml(teachingFormat || 'ثبت نشده')}
• <b>زبان آموزش:</b> ${escapeHtml(language || 'English')}

📝 <b>توضیحات دوره:</b>
${escapeHtml(courseDescription || 'توضیحاتی درج نشده است')}

🏆 <b>بیوگرافی:</b>
${escapeHtml(bio || 'ثبت نشده')}
${achievements ? `\n🏅 <b>دستاوردها:</b>\n${escapeHtml(achievements)}` : ''}

🔗 <b>مدارک و فایل‌های آپلود شده (Cloudflare Vault):</b>
• 🖼 <b>عکس پرسنلی:</b> ${avatarUrl ? `<a href="${avatarUrl}">مشاهده عکس پروفایل</a>` : 'ندارد'}
• 📄 <b>رزومه / CV:</b> ${resumeUrl ? `<a href="${resumeUrl}">دانلود رزومه</a>` : 'ندارد'}
• 🎥 <b>ویدیو نمونه تدریس:</b> ${sampleVideoUrl ? `<a href="${sampleVideoUrl}">مشاهده و دانلود ویدیو</a>` : 'ارائه نشده'}
• 🌐 <b>لینکدین / پورتفولیو:</b> ${portfolioUrl ? `<a href="${portfolioUrl}">مشاهده لینک پورتفولیو</a>` : 'ارائه نشده'}
━━━━━━━━━━━━━━━━━━━━━
⏰ <b>زمان ثبت:</b> ${new Date().toLocaleString('fa-IR', { timeZone: 'Asia/Kabul' })}
      `.trim();

      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: 'HTML',
            disable_web_page_preview: false
          })
        });

        if (!tgRes.ok) {
          const tgErrData = await tgRes.text();
          console.error('Telegram notification error:', tgErrData);
        }
      } catch (tgError) {
        console.error('Error sending Telegram message:', tgError);
      }
    }

    const finalAppId = applicationRecordId
      ? `APP-${applicationRecordId.slice(0, 8).toUpperCase()}`
      : `APP-${Date.now().toString().slice(-6)}`;

    return NextResponse.json({
      success: true,
      applicationId: finalAppId,
      message: 'Your instructor application has been submitted and stored in the database successfully.'
    });

  } catch (error: any) {
    console.error('Instructor application API error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to submit application' },
      { status: 500 }
    );
  }
}