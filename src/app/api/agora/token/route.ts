import { NextResponse } from "next/server";
import { RtcTokenBuilder, RtcRole } from "agora-token";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { channelName, uid, isTeacher } = body;

    // خواندن کلیدها از فایل env
    const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID;
    const appCertificate = process.env.AGORA_APP_CERTIFICATE;

    if (!appId || !appCertificate) {
      return NextResponse.json({ error: "Agora credentials are missing in server." }, { status: 500 });
    }

    if (!channelName || uid === undefined) {
      return NextResponse.json({ error: "channelName and uid are required." }, { status: 400 });
    }

    // تعیین زمان انقضای توکن (مثلاً کلاس حداکثر ۴ ساعت طول می‌کشد)
    const expirationTimeInSeconds = 3600 * 4; 
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // تعیین نقش: اگر استاد است بتواند تصویر و صدا بفرستد، در غیر این صورت فقط دریافت کند
    const role = isTeacher ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

    // تولید توکن رمزنگاری شده
    const token = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      uid,
      role,
      expirationTimeInSeconds,
      privilegeExpiredTs
    );

    return NextResponse.json({ token });
  } catch (error: any) {
    console.error("Token Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate token." }, { status: 500 });
  }
}