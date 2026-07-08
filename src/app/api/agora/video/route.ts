import { NextResponse } from "next/server";
import { RtcTokenBuilder, RtcRole } from "agora-token";

type AgoraVideoTokenRequest = {
  channelName?: string;
  uid?: string | number;
  role?: string;
  durationSeconds?: number;
};

const DEFAULT_VIDEO_TOKEN_EXPIRATION = 7200; // 2 hours

// استانداردسازی آیدی کاربر برای آگورا
function normalizeUid(uid: unknown): number | null {
  if (uid === undefined || uid === null) return null;
  const value = typeof uid === "number" ? uid : String(uid).trim();
  if (value === "") return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
}

// تشخیص نقش کاربر
function resolveRtcRole(role?: string) {
  const normalizedRole = String(role || "").toLowerCase();
  return ["teacher", "host", "publisher", "presenter", "super_admin"].includes(normalizedRole)
    ? RtcRole.PUBLISHER
    : RtcRole.SUBSCRIBER;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as AgoraVideoTokenRequest;
    const { channelName, uid, role, durationSeconds } = body;

    if (!channelName || typeof channelName !== "string" || !channelName.trim()) {
      return NextResponse.json(
        { error: "Missing required parameter: channelName is mandatory." },
        { status: 400 }
      );
    }

    const normalizedUid = normalizeUid(uid);
    if (normalizedUid === null) {
      return NextResponse.json(
        { error: "Missing or invalid uid. Provide a numeric UID." },
        { status: 400 }
      );
    }

    // 🔥 حل مشکل اول: خواندن هر دو فرمت متغیر محیطی
    const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID || process.env.AGORA_APP_ID;
    const appCertificate = process.env.AGORA_APP_CERTIFICATE;

    if (!appId || !appCertificate) {
      console.error("Server Config Error: Agora App ID or Certificate is missing.");
      return NextResponse.json(
        { error: "Server misconfiguration: AGORA credentials are missing." },
        { status: 500 }
      );
    }

    // 🔥 حل مشکل دوم: ارسال فقط ثانیه (بدون تایم استمپ Date.now)
    const parsedDuration = durationSeconds !== undefined ? Number(durationSeconds) : NaN;
    const tokenExpiration = parsedDuration > 0 ? Math.floor(parsedDuration) : DEFAULT_VIDEO_TOKEN_EXPIRATION;
    const rtcRole = resolveRtcRole(role);

    // ساخت توکن امنیتی
    const token = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      normalizedUid,
      rtcRole,
      tokenExpiration, // tokenExpire
      tokenExpiration  // privilegeExpire
    );

    return NextResponse.json({
      token,
      channelName,
      uid: normalizedUid,
      role: rtcRole === RtcRole.PUBLISHER ? "publisher" : "subscriber",
      expiresIn: tokenExpiration,
    });
    
  } catch (error) {
    console.error("Agora RTC Token Generation Critical Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error during Agora RTC token creation." },
      { status: 500 }
    );
  }
}