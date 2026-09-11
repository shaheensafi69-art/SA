import nodemailer from "nodemailer";
import { createAdminClient } from "@/utils/supabase/admin";

interface SendInstructorEmailParams {
  to: string;
  name: string;
  courseTitle: string;
  type: "approved" | "rejected";
  onboardingUrl?: string;
  adminNotes?: string;
}

export async function sendInstructorDecisionEmail({
  to,
  name,
  courseTitle,
  type,
  onboardingUrl,
  adminNotes
}: SendInstructorEmailParams) {
  const isApproved = type === "approved";

  // 1. If approved, also trigger Supabase Auth invite if possible
  if (isApproved && onboardingUrl) {
    try {
      const supabaseAdmin = createAdminClient();
      await supabaseAdmin.auth.admin.inviteUserByEmail(to, {
        redirectTo: onboardingUrl,
        data: {
          role: "teacher",
          full_name: name
        }
      });
      console.log("Supabase Auth invite dispatched to:", to);
    } catch (inviteErr: any) {
      console.warn("Supabase inviteUserByEmail note (user might already exist or handled by custom link):", inviteErr.message);
    }
  }

  // 2. Prepare Rich HTML Email
  const subject = isApproved
    ? `🎉 Congratulations! Your Instructor Application at Safi Academy has been Approved`
    : `A Personal Note on Your Safi Academy Instructor Application (${courseTitle})`;

  const htmlContent = isApproved
    ? `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to Safi Academy Faculty</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050508; color: #ffffff; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background-color: #0d0d14; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #1a1500 0%, #0d0d14 100%); padding: 40px 30px; text-align: center; border-bottom: 1px solid rgba(245, 158, 11, 0.2); }
    .badge { display: inline-block; padding: 6px 16px; border-radius: 9999px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; }
    .title { font-size: 26px; font-weight: 900; color: #ffffff; margin: 0 0 10px 0; }
    .subtitle { color: #f59e0b; font-size: 15px; font-weight: 600; margin: 0; }
    .content { padding: 35px 30px; line-height: 1.7; color: #d4d4d8; font-size: 14px; }
    .card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 20px; margin: 24px 0; }
    .btn { display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); color: #000000 !important; font-size: 14px; font-weight: 900; text-decoration: none; padding: 16px 36px; border-radius: 14px; text-transform: uppercase; letter-spacing: 1px; margin-top: 10px; }
    .footer { text-align: center; padding: 25px 30px; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 11px; color: #71717a; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">Official Faculty Appointment</div>
      <h1 class="title">Welcome to Safi Academy</h1>
      <p class="subtitle">Cohort 2026 Faculty Admissions</p>
    </div>
    <div class="content">
      <p>Dear <strong>${name}</strong>,</p>
      <p>On behalf of the Safi Academy Academic Board and Executive Leadership, it is our distinct honor to inform you that your instructor application has been <strong>officially accepted</strong>!</p>
      
      <div class="card">
        <div style="font-size: 11px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Approved Curriculum</div>
        <div style="font-size: 16px; font-weight: 800; color: #ffffff;">${courseTitle}</div>
      </div>

      <p>Your demonstrated industry expertise, pedagogical vision, and professional credentials greatly impressed our admissions committee. We are thrilled to partner with you to deliver world-class learning experiences to ambitious students worldwide.</p>

      ${adminNotes ? `<div class="card" style="border-left: 3px solid #f59e0b;"><div style="font-size: 12px; color: #f59e0b; font-weight: 700; margin-bottom: 4px;">Admissions Board Note:</div><div style="color: #e4e4e7; font-size: 13px;">${adminNotes}</div></div>` : ""}

      <p><strong>Next Steps:</strong> Please click the button below to establish your faculty account credentials, configure your instructor profile, and access your teaching command center:</p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${onboardingUrl || 'https://safiacademy.vercel.app/en/login'}" class="btn">Complete Faculty Setup & Activate Portal</a>
      </div>

      <p style="font-size: 12px; color: #a1a1aa; margin-top: 25px;">If the button above does not work, copy and paste this link into your browser:<br><span style="color: #fbbf24; word-break: break-all;">${onboardingUrl}</span></p>
    </div>
    <div class="footer">
      &copy; 2026 Safi Academy. Excellence in Modern Education.<br>
      Academic Admissions Office &bull; London &bull; Kabul &bull; Dubai
    </div>
  </div>
</body>
</html>
    `
    : `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>A Personal Message from Safi Academy</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050508; color: #ffffff; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background-color: #0c0c12; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 24px; overflow: hidden; }
    .header { padding: 40px 30px 25px 30px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
    .title { font-size: 22px; font-weight: 800; color: #ffffff; margin: 0 0 8px 0; }
    .subtitle { color: #a1a1aa; font-size: 13px; margin: 0; }
    .content { padding: 35px 30px; line-height: 1.8; color: #d4d4d8; font-size: 14px; }
    .quote-box { background: rgba(245, 158, 11, 0.03); border-left: 3px solid #f59e0b; padding: 18px 20px; border-radius: 0 16px 16px 0; margin: 24px 0; font-style: italic; color: #e4e4e7; }
    .persian-note { margin-top: 30px; padding: 22px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 16px; font-family: system-ui, Tahoma, sans-serif; direction: rtl; text-align: right; color: #d4d4d8; font-size: 13px; line-height: 1.9; }
    .footer { text-align: center; padding: 25px 30px; border-top: 1px solid rgba(255, 255, 255, 0.05); font-size: 11px; color: #71717a; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="title">A Personal Note on Your Application</h1>
      <p class="subtitle">Safi Academy Academic Admissions Committee</p>
    </div>
    <div class="content">
      <p>Dear <strong>${name}</strong>,</p>
      
      <p>First and foremost, we want to extend our heartfelt gratitude for the passion, time, and sincere dedication you invested in your application to teach <strong>"${courseTitle}"</strong> at Safi Academy.</p>

      <p>Reviewing your professional credentials and syllabus proposal, our committee was genuinely inspired by your ambition to mentor the next generation and share practical, transformative knowledge with students worldwide.</p>

      <div class="quote-box">
        "The courage to step forward, craft an educational vision, and offer your mentorship to learners across borders is a profound and commendable pursuit."
      </div>

      <p>In this admissions cycle, we experienced an unprecedented volume of outstanding educator applications, competing for an extremely limited number of inaugural cohort slots. Because of these strict capacity limits, we are regrettably unable to extend an active teaching placement for this specific term.</p>

      <p>Please know that this outcome is by no means a reflection of your talent, dedication, or capabilities. With your gracious permission, we will proudly maintain your dossier in our priority faculty talent registry as we expand into new subject tracks and international cohorts.</p>

      ${adminNotes ? `<div style="background: rgba(255, 255, 255, 0.03); border-radius: 14px; padding: 16px; margin: 20px 0; font-size: 13px; color: #a1a1aa;"><strong style="color: #ffffff;">Reviewer Feedback:</strong> ${adminNotes}</div>` : ""}

      <!-- Persian Section with heartfelt emotional tone -->
      <div class="persian-note">
        <strong style="color: #f59e0b; display: block; margin-bottom: 8px;">پیام صمیمانه شورای علمی آکادمی صافی:</strong>
        استاد گرامی، از صمیم قلب بابت اشتیاق ستودنی، جسارت علمی و تمایل ارزشمندتان برای انتقال دانش سپاسگزاریم. بررسی رزومه و طرح درس شما مایه افتخار ما بود. اگرچه در این دوره به دلیل محدودیت شدید ظرفیت دپارتمان‌ها امکان آغاز همکاری بلافاصله میسر نگردید، اما پیشینه ارزشمند شما در اولویت بررسی‌های آتی آکادمی محفوظ خواهد ماند. برای شما در مسیر بالندگی علمی و حرفه‌ای آرزوی درخشش و پیروزی روزافزون داریم.
      </div>

      <p style="margin-top: 25px;">We warmly invite you to stay in touch and consider future faculty announcements as our community grows.</p>

      <p style="margin-top: 30px; font-weight: 600; color: #ffffff;">
        With deep respect and warmest regards,<br>
        <span style="color: #f59e0b; font-weight: 700;">Faculty Admissions Committee</span><br>
        <span style="font-size: 12px; color: #a1a1aa;">Safi Academy Global</span>
      </p>
    </div>
    <div class="footer">
      &copy; 2026 Safi Academy. Dedicated to Academic Integrity & Global Empowerment.
    </div>
  </div>
</body>
</html>
    `;

  // 3. Dispatch Email via Nodemailer if SMTP configured
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const fromEmail = process.env.SMTP_FROM || `"Safi Academy Admissions" <admissions@safiacademy.org>`;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      await transporter.sendMail({
        from: fromEmail,
        to,
        subject,
        html: htmlContent
      });

      console.log(`[Email Dispatched via SMTP] to: ${to} | type: ${type}`);
      return { success: true, method: "smtp" };
    } catch (smtpErr) {
      console.error("[SMTP Dispatch Error]:", smtpErr);
    }
  }

  console.log(`[Email Handled] to: ${to} | type: ${type} (Supabase invite / log fallback executed)`);
  return { success: true, method: isApproved ? "supabase_invite" : "logged" };
}
