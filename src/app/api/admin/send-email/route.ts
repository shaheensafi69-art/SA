import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

interface EmailRequestBody {
  to: string;
  name: string;
  courseTitle: string;
  type: "approved" | "rejected";
  onboardingUrl?: string;
  adminNotes?: string;
  smtpConfig?: {
    host?: string;
    port?: number;
    user?: string;
    pass?: string;
    from?: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate request using CRON_SECRET_KEY or Bearer token
    const authHeader = req.headers.get("authorization") || req.headers.get("x-secret-key");
    const expectedSecret = process.env.CRON_SECRET_KEY || "Hhu9HU8RmfP8RJ4lep24KMmku2GVY2+7ch8zTpPCxsA=";

    const token = authHeader?.replace(/^Bearer\s+/i, "").trim();
    if (!token || token !== expectedSecret) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid secret key." },
        { status: 401 }
      );
    }

    const body: EmailRequestBody = await req.json();
    const { to, name, courseTitle, type, onboardingUrl, adminNotes, smtpConfig } = body;

    if (!to || !type) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: to, type" },
        { status: 400 }
      );
    }

    const isApproved = type === "approved";
    const subject = isApproved
      ? `🎓 Official Faculty Appointment: Welcome to Safi Academy (${courseTitle || "Faculty"})`
      : `A Personal Note on Your Safi Academy Faculty Proposal (${courseTitle || "Faculty"})`;

    const approvalHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Official Faculty Appointment</title>
  <style>
    body { margin: 0; padding: 0; background-color: #030307; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff; }
    .wrapper { width: 100%; background-color: #030307; padding: 40px 15px; }
    .card { max-width: 620px; margin: 0 auto; background-color: #0c0c14; border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 28px; overflow: hidden; box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7); }
    .header { background: linear-gradient(135deg, #1f1704 0%, #0c0c14 100%); padding: 45px 35px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.08); position: relative; }
    .gold-badge { display: inline-block; padding: 6px 18px; border-radius: 9999px; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); color: #fbbf24; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; }
    .title { font-size: 28px; font-weight: 900; color: #ffffff; margin: 0 0 10px 0; letter-spacing: -0.5px; }
    .subtitle { color: #d4d4d8; font-size: 14px; margin: 0; }
    .body { padding: 40px 35px; color: #d4d4d8; font-size: 14px; line-height: 1.8; }
    .course-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 18px; padding: 22px; margin: 26px 0; border-left: 4px solid #f59e0b; }
    .btn-wrap { text-align: center; margin: 35px 0 25px 0; }
    .btn { display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #000000 !important; font-size: 14px; font-weight: 900; text-decoration: none; padding: 18px 40px; border-radius: 16px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 10px 30px rgba(245, 158, 11, 0.35); }
    .security-box { background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 16px; padding: 18px; margin: 25px 0; font-size: 12px; color: #a7f3d0; }
    .persian-section { margin-top: 30px; padding: 25px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 20px; direction: rtl; text-align: right; font-family: system-ui, Tahoma, sans-serif; font-size: 13px; line-height: 2; color: #e4e4e7; }
    .footer { text-align: center; padding: 28px 35px; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 11px; color: #71717a; background-color: #07070b; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <div class="gold-badge">Official Faculty Appointment</div>
        <h1 class="title">Welcome to Safi Academy</h1>
        <p class="subtitle">Cohort 2026 Faculty Admissions &bull; Academic Leadership Board</p>
      </div>

      <div class="body">
        <p>Dear <strong>${name || "Applicant"}</strong>,</p>

        <p>On behalf of the Safi Academy Academic Advisory Council and Executive Faculty, it is our greatest pleasure to officially inform you that your application to teach at Safi Academy has been <strong style="color: #10b981;">OFFICIALLY APPROVED</strong>!</p>

        <div class="course-card">
          <div style="font-size: 11px; color: #fbbf24; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 800; margin-bottom: 5px;">Approved Teaching Track</div>
          <div style="font-size: 18px; font-weight: 800; color: #ffffff;">${courseTitle || "Instructor Track"}</div>
        </div>

        <p>Your demonstrated domain expertise, audition lecture, and pedagogical philosophy stood out among hundreds of candidates. We are excited to collaborate with you to deliver high-impact, transformative education to students globally.</p>

        ${adminNotes ? `
        <div style="background: rgba(245, 158, 11, 0.05); border: 1px dashed rgba(245, 158, 11, 0.3); border-radius: 14px; padding: 18px; margin: 20px 0;">
          <div style="font-size: 11px; font-weight: 800; color: #fbbf24; text-transform: uppercase; margin-bottom: 4px;">Admissions Board Feedback:</div>
          <div style="color: #ffffff; font-size: 13px;">${adminNotes}</div>
        </div>` : ""}

        <div class="security-box">
          <strong>🔒 Security & Single-Use Activation:</strong>
          This activation link is embedded with a one-time cryptographic authorization signature generated specifically for your credentials. For security, direct access without this link is disabled.
        </div>

        ${onboardingUrl ? `
        <div class="btn-wrap">
          <a href="${onboardingUrl}" class="btn">Activate Faculty Account & Set Password</a>
        </div>
        ` : ""}

        <div class="persian-section">
          <strong style="color: #fbbf24; font-size: 14px; display: block; margin-bottom: 10px;">پیام شورای علمی آکادمی صافی:</strong>
          استاد فرهیخته و گرامی، با افتخار به اطلاع می‌رساند که پس از ارزیابی دقیق رزومه، نمونه تدریس و سرفصل‌های پیشنهادی شما، عضویت رسمی‌تان در هیئت علمی آکادمی صافی به تصویب رسید. خواهشمند است با کلیک بر روی دکمه طلایی بالا یا لینک ارائه‌شده، رمز عبور اختصاصی خود را تعیین و پنل تدریس را فعال نمایید.
        </div>

        ${onboardingUrl ? `
        <p style="font-size: 11px; color: #71717a; margin-top: 25px; word-break: break-all;">
          If the button does not respond, copy and paste this secure link directly into your browser:<br>
          <a href="${onboardingUrl}" style="color: #fbbf24; text-decoration: underline;">${onboardingUrl}</a>
        </p>
        ` : ""}
      </div>

      <div class="footer">
        &copy; 2026 Safi Academy. Dedicated to Academic Integrity & Global Empowerment.<br>
        Admissions Office: London &bull; Kabul &bull; Dubai &bull; info@safiacademy.org
      </div>
    </div>
  </div>
</body>
</html>
    `;

    const rejectionHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>A Message from Safi Academy Admissions</title>
  <style>
    body { margin: 0; padding: 0; background-color: #030307; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff; }
    .wrapper { width: 100%; background-color: #030307; padding: 40px 15px; }
    .card { max-width: 620px; margin: 0 auto; background-color: #0b0b12; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 28px; overflow: hidden; box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7); }
    .header { padding: 45px 35px 25px 35px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
    .badge { display: inline-block; padding: 6px 16px; border-radius: 9999px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: #a1a1aa; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; }
    .title { font-size: 24px; font-weight: 900; color: #ffffff; margin: 0 0 8px 0; }
    .subtitle { color: #a1a1aa; font-size: 13px; margin: 0; }
    .body { padding: 40px 35px; color: #d4d4d8; font-size: 14px; line-height: 1.9; }
    .quote-box { background: rgba(245, 158, 11, 0.03); border-left: 3px solid #f59e0b; padding: 20px 22px; border-radius: 0 16px 16px 0; margin: 26px 0; font-style: italic; color: #f4f4f5; font-size: 14px; }
    .persian-section { margin-top: 30px; padding: 25px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 20px; direction: rtl; text-align: right; font-family: system-ui, Tahoma, sans-serif; font-size: 13px; line-height: 2; color: #e4e4e7; }
    .footer { text-align: center; padding: 28px 35px; border-top: 1px solid rgba(255, 255, 255, 0.05); font-size: 11px; color: #71717a; background-color: #07070a; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <div class="badge">Faculty Admissions Update</div>
        <h1 class="title">A Personal Letter on Your Proposal</h1>
        <p class="subtitle">Safi Academy Academic Admissions &bull; Course: "${courseTitle || "Faculty Proposal"}"</p>
      </div>

      <div class="body">
        <p>Dear <strong>${name || "Educator"}</strong>,</p>

        <p>First and foremost, we want to express our deepest gratitude for the immense dedication, expertise, and sincere passion you shared in your proposal to lead <strong>"${courseTitle || "your course"}"</strong> at Safi Academy.</p>

        <p>Our academic committee was genuinely inspired by your ambition to mentor the next generation of students and by your desire to make advanced, accessible education possible across international boundaries.</p>

        <div class="quote-box">
          "The decision to share your knowledge, inspire aspiring minds, and dedicate your intellect to teaching is among the noblest of human endeavors."
        </div>

        <p>In this admissions cycle, we received an extraordinary volume of exceptional educator submissions. Due to strict inaugural department quotas and course scheduling limits, we are regrettably unable to extend an active teaching slot for this upcoming term.</p>

        <p>Please understand that this decision is in no way a reflection of your professional qualifications, character, or capabilities. With your gracious permission, your candidate dossier will remain actively archived in our <strong>Priority Faculty Registry</strong> for forthcoming cohort expansions.</p>

        ${adminNotes ? `
        <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 18px; margin: 20px 0;">
          <div style="font-size: 11px; font-weight: 800; color: #d4d4d8; text-transform: uppercase; margin-bottom: 4px;">Reviewer Notes:</div>
          <div style="color: #ffffff; font-size: 13px;">${adminNotes}</div>
        </div>` : ""}

        <div class="persian-section">
          <strong style="color: #fbbf24; font-size: 14px; display: block; margin-bottom: 10px;">پیام صمیمانه و ارج‌گذاری شورای علمی آکادمی صافی:</strong>
          استاد گرامی، از صمیم قلب بابت اشتیاق ستودنی، جسارت علمی و تمایل ارزشمندتان برای آموزش نسل نو سپاسگزاریم. بررسی طرح درس و پیشینه علمی شما مایه افتخار و خرسندی ما بود. اگرچه در دوره فعلی به دلیل محدودیت سقف پذیرش دپارتمان امکان آغاز همکاری فوری فراهم نگردید، اما سوابق ارزشمند شما در سامانه استعدادهای برگزیده آکادمی در اولویت خواهد بود. ما صمیمانه برای شما در تمامی عرصه‌های تخصصی و آموزشی آرزوی سربلندی و موفقیت داریم.
        </div>

        <p style="margin-top: 30px; font-weight: 600; color: #ffffff;">
          With profound respect and warmest regards,<br>
          <span style="color: #fbbf24;">Faculty Admissions Board</span><br>
          <span style="font-size: 12px; color: #a1a1aa;">Safi Academy Global Leadership</span>
        </p>
      </div>

      <div class="footer">
        &copy; 2026 Safi Academy. Dedicated to Academic Integrity & Global Empowerment.<br>
        London &bull; Kabul &bull; Dubai &bull; info@safiacademy.org
      </div>
    </div>
  </div>
</body>
</html>
    `;

    const html = isApproved ? approvalHtml : rejectionHtml;

    // Resolve SMTP settings (from env or passed payload)
    const host = smtpConfig?.host || process.env.SMTP_HOST || "smtp.hostinger.com";
    const port = Number(smtpConfig?.port || process.env.SMTP_PORT) || 465;
    const user = smtpConfig?.user || process.env.SMTP_USER || "info@safiacademy.org";
    const pass = smtpConfig?.pass || process.env.SMTP_PASS || "Jan##123@@";
    const from = smtpConfig?.from || process.env.SMTP_FROM || `"Safi Academy" <info@safiacademy.org>`;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
      tls: {
        rejectUnauthorized: false
      }
    });

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html
    });

    console.log(`[Cloud Send-Email Success] to: ${to}, type: ${type}, msgId: ${info.messageId}`);

    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      method: "cloud_hostinger_smtp"
    });
  } catch (error: any) {
    console.error("[Cloud Send-Email Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal server error dispatching email."
      },
      { status: 500 }
    );
  }
}
