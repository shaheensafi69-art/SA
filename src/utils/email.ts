import nodemailer from "nodemailer";

interface SendInstructorEmailParams {
  to: string;
  name: string;
  courseTitle: string;
  type: "approved" | "rejected";
  onboardingUrl?: string;
  adminNotes?: string;
}

export function getApprovalEmailHtml({
  name,
  courseTitle,
  onboardingUrl,
  adminNotes
}: {
  name: string;
  courseTitle: string;
  onboardingUrl?: string;
  adminNotes?: string;
}): string {
  const safeName = name || "Educator";
  const safeCourse = courseTitle || "Faculty Track";
  const safeUrl = onboardingUrl || "https://safiacademy.org/en/teacher-onboarding";

  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>Official Faculty Appointment - Safi Academy</title>
  <style>
    * { box-sizing: border-box; }
    body, html { margin: 0; padding: 0; width: 100% !important; background-color: #030307; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; outline: none; text-decoration: none; }
    @media only screen and (max-width: 480px) {
      .email-card { border-radius: 18px !important; }
      .email-pad { padding: 22px 16px !important; }
      .header-pad { padding: 28px 16px 20px 16px !important; }
      .email-title { font-size: 21px !important; line-height: 1.3 !important; }
      .email-btn { display: block !important; width: 100% !important; padding: 16px 12px !important; font-size: 13px !important; text-align: center !important; }
      .lang-box { padding: 18px 14px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #030307; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <!-- Main Centered Container Table -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #030307; width: 100%;">
    <tr>
      <td align="center" style="padding: 24px 10px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-card" style="max-width: 580px; width: 100%; background-color: #0c0c14; border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8); table-layout: fixed;">
          
          <!-- Header Banner -->
          <tr>
            <td align="center" class="header-pad" style="background: linear-gradient(135deg, #221804 0%, #0c0c14 100%); padding: 36px 24px 26px 24px; border-bottom: 1px solid rgba(245, 158, 11, 0.15); text-align: center;">
              <div style="display: inline-block; padding: 5px 14px; border-radius: 9999px; background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.35); color: #fbbf24; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px;">
                Official Faculty Appointment &bull; هیئت علمی
              </div>
              <h1 class="email-title" style="margin: 0 0 6px 0; font-size: 24px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px; line-height: 1.3;">
                Welcome to Safi Academy
              </h1>
              <p style="margin: 0; color: #a1a1aa; font-size: 12px; font-weight: 500;">
                Academic Advisory Council &bull; Cohort 2026 Admissions
              </p>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td class="email-pad" style="padding: 30px 24px; color: #d4d4d8; font-size: 13.5px; line-height: 1.8; word-break: break-word; overflow-wrap: break-word;">
              
              <!-- 🇬🇧 SECTION 1: ENGLISH -->
              <div style="margin-bottom: 24px;">
                <div style="font-size: 10px; font-weight: 800; color: #fbbf24; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">
                  🇬🇧 English (Official Notice)
                </div>
                <p style="margin: 0 0 12px 0;">Dear <strong>${safeName}</strong>,</p>
                <p style="margin: 0 0 14px 0;">
                  On behalf of the Safi Academy Academic Advisory Council, it is our great pleasure to inform you that your proposal to lead instruction at Safi Academy has been <strong style="color: #10b981;">OFFICIALLY APPROVED</strong>.
                </p>

                <!-- Course Track Badge -->
                <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-left: 4px solid #f59e0b; border-radius: 12px; padding: 14px 16px; margin: 16px 0;">
                  <div style="font-size: 10px; color: #fbbf24; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 800; margin-bottom: 3px;">Approved Teaching Track</div>
                  <div style="font-size: 16px; font-weight: 800; color: #ffffff; word-break: break-word;">${safeCourse}</div>
                </div>

                <p style="margin: 0 0 14px 0;">
                  Your demonstrated subject expertise, audition demonstration, and pedagogical vision distinguished your submission. We are thrilled to welcome you to our distinguished global faculty.
                </p>

                ${adminNotes ? `
                <div style="background: rgba(245, 158, 11, 0.05); border: 1px dashed rgba(245, 158, 11, 0.3); border-radius: 12px; padding: 12px 14px; margin: 14px 0; font-size: 12.5px;">
                  <strong style="color: #fbbf24; display: block; margin-bottom: 2px;">Admissions Feedback:</strong>
                  <span style="color: #e4e4e7;">${adminNotes}</span>
                </div>
                ` : ""}

                <div style="background: rgba(16, 185, 129, 0.06); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 12px; padding: 12px 14px; margin: 16px 0; font-size: 11.5px; color: #a7f3d0; line-height: 1.6;">
                  🔒 <strong>Cryptographic Single-Use Setup:</strong> This activation link is digitally signed for your credentials. Direct access without this token is restricted.
                </div>
              </div>

              <!-- CTA BUTTON (FLUID ON MOBILE) -->
              <div style="text-align: center; margin: 26px 0;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: 100%; max-width: 440px;">
                  <tr>
                    <td align="center">
                      <a href="${safeUrl}" class="email-btn" style="display: block; width: 100%; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #000000 !important; font-size: 13px; font-weight: 900; text-decoration: none; padding: 16px 20px; border-radius: 14px; text-transform: uppercase; letter-spacing: 0.8px; box-shadow: 0 8px 25px rgba(245, 158, 11, 0.35); text-align: center; box-sizing: border-box;">
                        Activate Faculty Account &bull; فعال‌سازی حساب استاد
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- 🇦🇫 SECTION 2: PERSIAN / DARI (فارسی / دری) -->
              <div class="lang-box" style="margin-top: 24px; padding: 20px 18px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 16px; direction: rtl; text-align: right; font-family: system-ui, -apple-system, Tahoma, Arial, sans-serif; font-size: 12.5px; line-height: 2; color: #e4e4e7;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                  <strong style="color: #fbbf24; font-size: 13px;">🇦🇫 پیام شورای عالی علمی آکادمی صافی (فارسی):</strong>
                </div>
                استاد فرهیخته و گرامی، با کمال افتخار به اطلاع می‌رساند که پس از بررسی دقیق رزومه، نمونه تدریس و سرفصل‌های پیشنهادی شما، صلاحیت علمی‌تان جهت تدریس دوره <strong>«${safeCourse}»</strong> مورد تصویب قطعی هیئت پذیرش آکادمی صافی قرار گرفت. شما اکنون رسماً به عنوان عضوی از هیئت علمی بین‌المللی این آکادمی برگزیده شده‌اید. خواهشمند است با کلیک بر روی دکمه طلایی بالا، مشخصات نهایی خود را ثبت، رمز عبور پرتال تدریس را تعیین و فعالیت خود را آغاز نمایید.
              </div>

              <!-- 🇦🇫 SECTION 3: PASHTO (پښتو) -->
              <div class="lang-box" style="margin-top: 18px; padding: 20px 18px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 16px; direction: rtl; text-align: right; font-family: system-ui, -apple-system, Tahoma, Arial, sans-serif; font-size: 12.5px; line-height: 2; color: #e4e4e7;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                  <strong style="color: #fbbf24; font-size: 13px;">🇦🇫 د صافي اکاډمۍ د علمي شورا رسمي پیغام (پښتو):</strong>
                </div>
                دروند او محترم استاده، په ډېر ویاړ او خوښۍ تاسو ته خبر درکوو چې ستاسو د علمي وړتیا، تدریسي تجربې او د <strong>«${safeCourse}»</strong> کورس د درسي پلان له پوره څېړنې وروسته، په صافي اکاډمۍ کې ستاسو ګمارنه په رسمي ډول تایید شوه. موږ ډېر ویاړو چې تاسو زموږ د نړیوال علمي پلاوي برخه شوئ. مهرباني وکړئ د پورتنۍ طلایي تڼۍ په کېکاږلو سره د خپل تدریسي حساب پټنوم (رمز) وټاکئ او خپل درسي پرتال فعال کړئ.
              </div>

              <!-- Direct Link Fallback (Wrapped safely to prevent mobile scroll) -->
              <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 11px; color: #71717a; line-height: 1.6; word-break: break-all; overflow-wrap: anywhere;">
                If the button does not open, copy and paste this secure link directly into your browser:<br>
                <a href="${safeUrl}" style="color: #fbbf24; text-decoration: underline; word-break: break-all; overflow-wrap: anywhere;">${safeUrl}</a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 22px 20px; border-top: 1px solid rgba(255, 255, 255, 0.05); font-size: 11px; color: #71717a; background-color: #07070b; text-align: center; line-height: 1.6;">
              &copy; 2026 <strong>Safi Academy</strong>. Dedicated to Academic Integrity & Global Empowerment.<br>
              Offices: London &bull; Kabul &bull; Dubai &bull; <a href="https://safiacademy.org" style="color: #a1a1aa; text-decoration: none;">safiacademy.org</a> &bull; info@safiacademy.org
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function getRejectionEmailHtml({
  name,
  courseTitle,
  adminNotes
}: {
  name: string;
  courseTitle: string;
  adminNotes?: string;
}): string {
  const safeName = name || "Educator";
  const safeCourse = courseTitle || "Faculty Proposal";

  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>A Personal Note on Your Proposal - Safi Academy</title>
  <style>
    * { box-sizing: border-box; }
    body, html { margin: 0; padding: 0; width: 100% !important; background-color: #030307; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; outline: none; text-decoration: none; }
    @media only screen and (max-width: 480px) {
      .email-card { border-radius: 18px !important; }
      .email-pad { padding: 22px 16px !important; }
      .header-pad { padding: 28px 16px 20px 16px !important; }
      .email-title { font-size: 20px !important; line-height: 1.3 !important; }
      .lang-box { padding: 18px 14px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #030307; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #030307; width: 100%;">
    <tr>
      <td align="center" style="padding: 24px 10px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-card" style="max-width: 580px; width: 100%; background-color: #0a0a12; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8); table-layout: fixed;">
          
          <!-- Header Banner -->
          <tr>
            <td align="center" class="header-pad" style="background: linear-gradient(135deg, #13131e 0%, #0a0a12 100%); padding: 36px 24px 24px 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); text-align: center;">
              <div style="display: inline-block; padding: 5px 14px; border-radius: 9999px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: #a1a1aa; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px;">
                Faculty Admissions Update &bull; ارزیابی تدریس
              </div>
              <h1 class="email-title" style="margin: 0 0 6px 0; font-size: 22px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px; line-height: 1.3;">
                A Personal Note on Your Proposal
              </h1>
              <p style="margin: 0; color: #a1a1aa; font-size: 12px; font-weight: 500;">
                Safi Academy Admissions &bull; Track: "${safeCourse}"
              </p>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td class="email-pad" style="padding: 30px 24px; color: #d4d4d8; font-size: 13.5px; line-height: 1.8; word-break: break-word; overflow-wrap: break-word;">
              
              <!-- 🇬🇧 SECTION 1: ENGLISH -->
              <div style="margin-bottom: 24px;">
                <div style="font-size: 10px; font-weight: 800; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">
                  🇬🇧 English (Admissions Committee Notice)
                </div>
                <p style="margin: 0 0 12px 0;">Dear <strong>${safeName}</strong>,</p>
                <p style="margin: 0 0 14px 0;">
                  First and foremost, we want to express our deepest gratitude for the immense dedication, domain expertise, and sincere pedagogical passion you shared in your proposal for <strong>"${safeCourse}"</strong> at Safi Academy.
                </p>

                <div style="background: rgba(245, 158, 11, 0.03); border-left: 3px solid #f59e0b; padding: 14px 16px; border-radius: 0 12px 12px 0; margin: 16px 0; font-style: italic; color: #f4f4f5; font-size: 13px; line-height: 1.7;">
                  "The commitment to share one's intellect and empower aspiring learners is among the most noble of human endeavors."
                </div>

                <p style="margin: 0 0 14px 0;">
                  During this cohort admissions cycle, our committee received an extraordinary volume of exceptional educator proposals. Due to tight inaugural course scheduling limits and strict department quotas, we are regrettably unable to extend an active teaching slot for this upcoming term.
                </p>

                <p style="margin: 0 0 14px 0;">
                  Please understand that this decision in no way diminishes your professional qualifications or character. Your candidate dossier will remain actively preserved in our <strong>Priority Faculty Talent Pool</strong> for future cohort expansions.
                </p>

                ${adminNotes ? `
                <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 12px 14px; margin: 14px 0; font-size: 12.5px;">
                  <strong style="color: #d4d4d8; display: block; margin-bottom: 2px;">Reviewer Notes:</strong>
                  <span style="color: #ffffff;">${adminNotes}</span>
                </div>
                ` : ""}
              </div>

              <!-- 🇦🇫 SECTION 2: PERSIAN / DARI (فارسی / دری) -->
              <div class="lang-box" style="margin-top: 22px; padding: 20px 18px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 16px; direction: rtl; text-align: right; font-family: system-ui, -apple-system, Tahoma, Arial, sans-serif; font-size: 12.5px; line-height: 2; color: #e4e4e7;">
                <strong style="color: #fbbf24; font-size: 13px; display: block; margin-bottom: 8px;">
                  🇦🇫 پیام صمیمانه و ارج‌گذاری شورای علمی آکادمی صافی (فارسی):
                </strong>
                استاد گرامی، از صمیم قلب بابت اشتیاق ستودنی، جسارت علمی و تمایل ارزشمندتان برای انتقال دانش به نسل نو سپاسگزاریم. بررسی طرح درس و پیشینه علمی شما برای کمیته ارزیابی مایه افتخار و خرسندی بود. با این حال، به دلیل سقف محدود کرسی‌های تدریس در دوره فعلی و تکمیل ظرفیت دپارتمان مربوطه، در این سمستر امکان آغاز همکاری فوری فراهم نشد. این تصمیم به هیچ وجه به معنای نادیده گرفتن شایستگی‌های والای شما نیست؛ سوابق ارزشمندتان در بانک استعدادهای برگزیده آکادمی محفوظ خواهد ماند و در دوره‌های آتی در اولویت بررسی خواهد بود. برای شما در تمامی مراحل زندگی و آموزش آرزوی توفیق روزافزون داریم.
              </div>

              <!-- 🇦🇫 SECTION 3: PASHTO (پښتو) -->
              <div class="lang-box" style="margin-top: 18px; padding: 20px 18px; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 16px; direction: rtl; text-align: right; font-family: system-ui, -apple-system, Tahoma, Arial, sans-serif; font-size: 12.5px; line-height: 2; color: #e4e4e7;">
                <strong style="color: #fbbf24; font-size: 13px; display: block; margin-bottom: 8px;">
                  🇦🇫 د صافي اکاډمۍ د علمي شورا صمیمانه پیغام (پښتو):
                </strong>
                محترم او دروند استاده، د خپل تدریسي پلان او علمي تجربې د وړاندې کولو له امله ستاسو له اخلاصه د زړه له تله مننه کوو. زموږ علمي کمېټې ستاسو د وړتیا ستاینه وکړه. که څه هم په دې سمستر کې د دپارتمانونو د مهالوېش او ټولګیو د محدود ظرفیت له کبله سمدستي د تدریس د پیل امکان برابر نشو، خو دا هېڅکله ستاسو د لوړو علمي او مسلکي وړتیاوو د نشتوالي په مانا نه ده. ستاسو ټول اسناد او طرحه به زموږ د علمي کادرونو په ځانګړي زېرمتون کې خوندي وي او په راتلونکو دورو کې به په لومړیتوب کې وساتل شي. تاسو ته په ټولو علمي او مسلکي چارو کې بریا غواړو.
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 22px 20px; border-top: 1px solid rgba(255, 255, 255, 0.05); font-size: 11px; color: #71717a; background-color: #06060a; text-align: center; line-height: 1.6;">
              &copy; 2026 <strong>Safi Academy</strong>. Dedicated to Academic Integrity & Global Empowerment.<br>
              Offices: London &bull; Kabul &bull; Dubai &bull; <a href="https://safiacademy.org" style="color: #a1a1aa; text-decoration: none;">safiacademy.org</a> &bull; info@safiacademy.org
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function sendInstructorDecisionEmail({
  to,
  name,
  courseTitle,
  type,
  onboardingUrl,
  adminNotes
}: SendInstructorEmailParams): Promise<{ success: boolean; method: string; error?: string }> {
  const isApproved = type === "approved";

  // Check valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cleanEmail = (to || "").trim();

  if (!emailRegex.test(cleanEmail)) {
    console.warn(`[Email Skipped] Invalid email address: "${cleanEmail}"`);
    return {
      success: false,
      method: "validation_failed",
      error: `Invalid email address format: "${cleanEmail}". Email must be in format user@example.com.`
    };
  }

  // Generate Trilingual Subjects
  const subject = isApproved
    ? `🎓 Official Faculty Appointment: Welcome to Safi Academy | مبارکباد: عضویت در هیئت علمی | مبارکي: علمي پلاوي ته ښه راغلاست (${courseTitle || "Faculty"})`
    : `A Personal Note on Your Faculty Proposal | یادداشت صمیمانه شورای علمی | د صافي اکاډمۍ پيغام (${courseTitle || "Faculty"})`;

  // Generate 100% Fluid Mobile-Optimized Trilingual HTML
  const htmlContent = isApproved
    ? getApprovalEmailHtml({ name, courseTitle, onboardingUrl, adminNotes })
    : getRejectionEmailHtml({ name, courseTitle, adminNotes });

  // SMTP configuration parameters
  const smtpHost = process.env.SMTP_HOST || "smtp.hostinger.com";
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const smtpUser = process.env.SMTP_USER || "info@safiacademy.org";
  const smtpPass = process.env.SMTP_PASS || "Jan##123@@";
  const fromEmail = process.env.SMTP_FROM || `"Safi Academy" <info@safiacademy.org>`;
  const cronSecret = process.env.CRON_SECRET_KEY || "Hhu9HU8RmfP8RJ4lep24KMmku2GVY2+7ch8zTpPCxsA=";

  // 1. Try Direct SMTP first (Works natively on Vercel AWS in production)
  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      },
      connectionTimeout: 4000,
      greetingTimeout: 4000,
      socketTimeout: 5000,
      tls: {
        rejectUnauthorized: false
      }
    });

    const info = await transporter.sendMail({
      from: fromEmail,
      to: cleanEmail,
      subject,
      html: htmlContent
    });

    console.log(`[Hostinger SMTP Direct Dispatched] MessageId: ${info.messageId} | to: ${cleanEmail} | type: ${type}`);
    return { success: true, method: "smtp_direct" };
  } catch (directSmtpErr: any) {
    console.warn("[Direct SMTP Failed (Local ISP Block, falling back to Cloud Relay)]:", directSmtpErr?.message);

    // 2. Cloud Relay via HTTPS Port 443 (Using safiacademy.org & vercel.app)
    const cloudEndpoints = [
      "https://safiacademy.org/api/admin/send-email",
      "https://www.safiacademy.org/api/admin/send-email",
      "https://safiacademy.vercel.app/api/admin/send-email"
    ];

    for (const endpoint of cloudEndpoints) {
      try {
        console.log(`[Attempting Cloud Email Relay via HTTPS]: ${endpoint}`);
        const cloudRes = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cronSecret}`
          },
          body: JSON.stringify({
            to: cleanEmail,
            name,
            courseTitle,
            type,
            onboardingUrl,
            adminNotes,
            smtpConfig: {
              host: smtpHost,
              port: smtpPort,
              user: smtpUser,
              pass: smtpPass,
              from: fromEmail
            }
          }),
          signal: AbortSignal.timeout(15000)
        });

        const cloudData = await cloudRes.json();
        if (cloudRes.ok && cloudData.success) {
          console.log(`[Cloud Email Relay Succeeded] MsgId: ${cloudData.messageId} | to: ${cleanEmail} | type: ${type}`);
          return { success: true, method: "cloud_relay" };
        } else {
          console.warn(`[Cloud Email Relay Endpoint Note (${endpoint})]:`, cloudData);
        }
      } catch (cloudErr: any) {
        console.warn(`[Cloud Email Relay Endpoint Exception (${endpoint})]:`, cloudErr?.message);
      }
    }

    return {
      success: false,
      method: "smtp_error",
      error: directSmtpErr?.message || "Failed to deliver email through Hostinger SMTP."
    };
  }
}
