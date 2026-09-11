import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getApprovalEmailHtml, getRejectionEmailHtml } from "@/utils/email";

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
      ? `🎓 Official Faculty Appointment: Welcome to Safi Academy | مبارکباد: عضویت در هیئت علمی | مبارکي: علمي پلاوي ته ښه راغلاست (${courseTitle || "Faculty"})`
      : `A Personal Note on Your Faculty Proposal | یادداشت صمیمانه شورای علمی | د صافي اکاډمۍ پيغام (${courseTitle || "Faculty"})`;

    const html = isApproved
      ? getApprovalEmailHtml({ name, courseTitle, onboardingUrl, adminNotes })
      : getRejectionEmailHtml({ name, courseTitle, adminNotes });

    // Resolve SMTP settings (from passed config or env)
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
