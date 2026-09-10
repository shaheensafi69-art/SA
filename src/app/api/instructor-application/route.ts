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

    // 1. If user is logged in, try upserting into teacher_info
    let targetUserId = userId || null;
    if (!targetUserId) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        targetUserId = user.id;
      }
    }

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

    // 2. Insert into tickets table for Admin review
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

        // 3. If targetUserId exists, send in-app notification
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
    const TELEGRAM_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID;

    if (TELEGRAM_TOKEN && TELEGRAM_CHAT_ID) {
      const telegramMessage = `
🎓 *NEW INSTRUCTOR APPLICATION* 🎓

👤 *Name:* ${firstName} ${lastName}
📧 *Email:* ${email}
📱 *Phone:* ${phone || 'N/A'}
🌍 *Country:* ${country || 'N/A'}
📂 *Category:* ${category}
🎯 *Course:* ${courseTitle}
⏳ *Experience:* ${experienceLevel || 'N/A'}
🗣 *Format:* ${teachingFormat || 'N/A'} (${language || 'English'})

🔗 *Portfolio:* ${portfolioUrl || 'N/A'}
🎥 *Audition Video:* ${sampleVideoUrl || 'N/A'}
📄 *CV / Resume:* ${resumeUrl || 'N/A'}
      `.trim();

      try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: 'Markdown'
          })
        });
      } catch (tgError) {
        console.error('Error sending Telegram notification:', tgError);
      }
    }

    return NextResponse.json({
      success: true,
      applicationId: ticketId || `APP-${Date.now().toString().slice(-6)}`,
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
