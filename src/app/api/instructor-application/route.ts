import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

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

    if (!firstName || !lastName || !email || !category || !courseTitle || !avatarUrl) {
      return NextResponse.json(
        { error: 'Missing required applicant fields (including mandatory profile photo).' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    let targetUserId = userId || null;
    if (!targetUserId) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        targetUserId = user.id;
      }
    }

    let applicationRecordId = '';

    // 1. Primary: Try inserting directly into dedicated instructor_applications table
    try {
      const { data: appData, error: appError } = await supabase
        .from('instructor_applications')
        .insert({
          user_id: targetUserId,
          first_name: firstName,
          last_name: lastName,
          email,
          phone: phone || null,
          country: country || null,
          date_of_birth: dateOfBirth || null,
          category,
          course_title: courseTitle,
          course_description: courseDescription || null,
          experience_level: experienceLevel || null,
          teaching_format: teachingFormat || null,
          language: language || 'English',
          bio: bio || null,
          achievements: achievements || null,
          portfolio_url: portfolioUrl || null,
          sample_video_url: sampleVideoUrl || null,
          resume_url: resumeUrl || null,
          avatar_url: avatarUrl,
          status: 'pending'
        })
        .select()
        .single();

      if (!appError && appData) {
        applicationRecordId = appData.id;
      } else if (appError) {
        console.warn('Note on instructor_applications insert:', appError.message);
      }
    } catch (appErr) {
      console.warn('instructor_applications table might not exist yet:', appErr);
    }

    // 2. If user is logged in, sync to teacher_info if available
    if (targetUserId) {
      try {
        await supabase.from('teacher_info').upsert({
          id: targetUserId,
          first_name: firstName,
          last_name: lastName,
          date_of_birth: dateOfBirth || null,
          bio: bio || '',
          achievements: achievements || '',
          avatar_url: avatarUrl || null
        });
      } catch (err) {
        console.warn('Could not upsert into teacher_info:', err);
      }
    }

    // 3. Fallback/Sync: Insert into tickets table for Admin dashboard visibility
    const applicationSummary = {
      fullName: `${firstName} ${lastName}`,
      email,
      phone: phone || 'Not provided',
      country: country || 'Not provided',
      dateOfBirth: dateOfBirth || 'Not provided',
      category,
      courseTitle,
      courseDescription: courseDescription || 'Not provided',
      experienceLevel: experienceLevel || 'Not specified',
      teachingFormat: teachingFormat || 'Live & Recorded',
      language: language || 'English',
      bio: bio || 'Not provided',
      achievements: achievements || 'Not provided',
      portfolioUrl: portfolioUrl || 'Not provided',
      sampleVideoUrl: sampleVideoUrl || 'Not provided',
      resumeUrl: resumeUrl || null,
      avatarUrl: avatarUrl || null,
      submittedAt: new Date().toISOString()
    };

    const formattedMessage = `
🎓 **NEW INSTRUCTOR APPLICATION SUBMITTED**

👤 **Personal Information:**
- Name: ${applicationSummary.fullName}
- Email: ${applicationSummary.email}
- Phone/WhatsApp: ${applicationSummary.phone}
- Country: ${applicationSummary.country}
- Date of Birth: ${applicationSummary.dateOfBirth}

📚 **Course & Teaching Domain:**
- Category: ${applicationSummary.category}
- Proposed Course Title: ${applicationSummary.courseTitle}
- Teaching Format: ${applicationSummary.teachingFormat}
- Language: ${applicationSummary.language}
- Experience Level: ${applicationSummary.experienceLevel}

📝 **Course Description / Syllabus Outline:**
${applicationSummary.courseDescription}

🏆 **Bio & Achievements:**
- Bio: ${applicationSummary.bio}
- Key Achievements: ${applicationSummary.achievements}

🔗 **Links & Audition Materials:**
- Avatar Photo: ${applicationSummary.avatarUrl || 'None'}
- Portfolio / LinkedIn: ${applicationSummary.portfolioUrl}
- Sample Lecture / Demo Video: ${applicationSummary.sampleVideoUrl}
- Resume / CV Document: ${applicationSummary.resumeUrl || 'None attached'}
    `.trim();

    let ticketId: string = '';
    try {
      const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .insert({
          student_id: targetUserId,
          subject: `Instructor Application: ${firstName} ${lastName} (${category})`,
          department: 'Instructor Application',
          status: 'open'
        })
        .select()
        .single();

      if (!ticketError && ticket) {
        ticketId = ticket.id;

        await supabase.from('ticket_messages').insert({
          ticket_id: ticket.id,
          sender_id: targetUserId,
          message_text: formattedMessage,
          attachment_url: resumeUrl || null
        });

        // If targetUserId exists, send in-app notification
        if (targetUserId) {
          await supabase.from('user_notifications').insert({
            user_id: targetUserId,
            title: 'Instructor Application Received',
            message: 'Your application to join Safi Academy as an instructor has been received. Our faculty committee will review your proposal within 48-72 hours.',
            notification_type: 'system',
            link_url: `/en/support/chat/${ticket.id}`,
            is_read: false
          });
        }
      }
    } catch (dbError) {
      console.warn('Database ticket creation note:', dbError);
    }

    // 4. Send Instant Telegram Alert to Management
    const TELEGRAM_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || '8668673040:AAEI6Q4r28KWiTAGwvQrT0Y9j6S92KhtwiI';
    const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID || '5195615040';

    if (TELEGRAM_TOKEN && TELEGRAM_CHAT_ID) {
      const escapeHtml = (str: string = '') =>
        str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      const appRefId = applicationRecordId ? `APP-${applicationRecordId.slice(0, 8)}` : (ticketId ? `TCK-${ticketId.slice(0, 8)}` : `APP-${Date.now().toString().slice(-6)}`);

      const telegramMessage = `
🎓 <b>درخواست جدید تدریس در آکادمی صافی</b> 🎓
━━━━━━━━━━━━━━━━━━━━━
🆔 <b>کد پیگیری:</b> <code>${escapeHtml(appRefId)}</code>

👤 <b>مشخصات متقاضی:</b>
• <b>نام و تخلص:</b> ${escapeHtml(firstName)} ${escapeHtml(lastName)}
• <b>ایمیل:</b> ${escapeHtml(email)}
• <b>شماره تماس:</b> ${escapeHtml(phone || 'ثبت نشده')}
• <b>کشور محل سکونت:</b> ${escapeHtml(country || 'ثبت نشده')}
• <b>تاریخ تولد:</b> ${escapeHtml(dateOfBirth || 'ثبت نشده')}

📚 <b>دوره و تخصص:</b>
• <b>حوزه تدریس:</b> ${escapeHtml(category)}
• <b>عنوان دوره:</b> ${escapeHtml(courseTitle)}
• <b>سابقه تدریس:</b> ${escapeHtml(experienceLevel || 'ثبت نشده')}
• <b>فرمت تدریس:</b> ${escapeHtml(teachingFormat || 'ثبت نشده')}
• <b>زبان آموزش:</b> ${escapeHtml(language || 'English')}

📝 <b>توضیحات دوره:</b>
${escapeHtml(courseDescription || 'توضیحاتی درج نشده است')}

🏆 <b>بیوگرافی و دستاوردها:</b>
${escapeHtml(bio || 'ثبت نشده')}
${achievements ? `\n🏅 <b>دستاوردها:</b>\n${escapeHtml(achievements)}` : ''}

🔗 <b>مدارک و لینک‌ها:</b>
• <b>عکس پروفایل:</b> ${avatarUrl ? `<a href="${avatarUrl}">مشاهده عکس پرسنلی</a>` : 'ندارد'}
• <b>فایل رزومه / CV:</b> ${resumeUrl ? `<a href="${resumeUrl}">دانلود رزومه (PDF/DOC)</a>` : 'ندارد'}
• <b>پورتفولیو / لینکدین:</b> ${portfolioUrl ? `<a href="${portfolioUrl}">مشاهده پورتفولیو</a>` : 'ارائه نشده'}
• <b>ویدیوی دمو / تدریس:</b> ${sampleVideoUrl ? `<a href="${sampleVideoUrl}">مشاهده ویدیو نمونه</a>` : 'ارائه نشده'}
━━━━━━━━━━━━━━━━━━━━━
⏰ <b>زمان ثبت:</b> ${new Date().toISOString()}
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
          console.error('Telegram notification responded with error:', tgErrData);
        } else {
          console.log('Telegram notification sent successfully to chat:', TELEGRAM_CHAT_ID);
        }
      } catch (tgError) {
        console.error('Error sending Telegram notification:', tgError);
      }
    }

    const finalAppId = applicationRecordId
      ? `APP-${applicationRecordId.slice(0, 8)}`
      : (ticketId ? `TCK-${ticketId.slice(0, 8)}` : `APP-${Date.now().toString().slice(-6)}`);

    return NextResponse.json({
      success: true,
      applicationId: finalAppId,
      message: 'Your instructor application has been submitted successfully.'
    });
  } catch (error: any) {
    console.error('Instructor application API error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to submit application' },
      { status: 500 }
    );
  }
}
