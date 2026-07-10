import { NextResponse } from "next/server";
import { ChatTokenBuilder } from "agora-token";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized: User ID is required." }, { status: 401 });
    }

    const appId = process.env.AGORA_APP_ID;
    const appCertificate = process.env.AGORA_APP_CERTIFICATE;

    if (!appId || !appCertificate) {
      return NextResponse.json(
        { message: "Server Configuration Error: Agora credentials are missing." },
        { status: 500 }
      );
    }

    // تنظیم زمان انقضای توکن (مثلاً ۲۴ ساعت معادل ۸۶۴۰۰ ثانیه)
    const expirationInSeconds = 3600 * 24;

    // 🔥 ساخت توکن اختصاصی کاربر برای دسترسی به شبکه چت آگورا 🔥
    const token = ChatTokenBuilder.buildUserToken(
      appId,
      appCertificate,
      userId,
      expirationInSeconds
    );

    return NextResponse.json({ token: token });

  } catch (error: any) {
    console.error("Agora Token Generation Error:", error);
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}