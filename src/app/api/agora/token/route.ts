import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error: "Deprecated endpoint. Use /api/agora/video for Agora RTC tokens or /api/agora/chat for Agora chat tokens.",
      endpoints: {
        rtc: "/api/agora/video",
        chat: "/api/agora/chat",
      },
    },
    { status: 400 }
  );
}
