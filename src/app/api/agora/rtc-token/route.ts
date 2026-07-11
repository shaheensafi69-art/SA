import { NextResponse } from "next/server";
import { RtcTokenBuilder, RtcRole } from "agora-token";

export async function POST(req: Request) {
  try {
    // channelName همان class_id (Unified ID) است
    // account همان آیدی سوپابیس (UUID) دانشجو است
    const { channelName, account } = await req.json();

    if (!channelName || !account) {
      return NextResponse.json({ message: "Channel name and account are required." }, { status: 400 });
    }

    const appId = process.env.AGORA_APP_ID;
    const appCertificate = process.env.AGORA_APP_CERTIFICATE;

    if (!appId || !appCertificate) {
      return NextResponse.json(
        { message: "Server Configuration Error: Agora credentials are missing." },
        { status: 500 }
      );
    }

    // تنظیم نقش کاربر (PUBLISHER می‌تواند صحبت کند و تصویر بدهد)
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 3600 * 4; // اعتبار ۴ ساعته برای کلاس
    const currentTimestamp = Math.floor(Date.now() / 1000);
    
    // متغیر زمان انقضا
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // 🔥 ساخت توکن ویدیویی بر اساس آیدی رشته‌ای (String UID) سوپابیس 🔥
    // ارسال دقیق هر دو پارامتر زمان انقضا برای جلوگیری از ارور
    const token = RtcTokenBuilder.buildTokenWithUserAccount(
      appId,
      appCertificate,
      channelName,
      account,
      role,
      privilegeExpiredTs, // tokenExpire
      privilegeExpiredTs  // privilegeExpire
    );

    return NextResponse.json({ token });

  } catch (error: any) {
    console.error("Agora RTC Token Error:", error);
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}