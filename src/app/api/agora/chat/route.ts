import { NextResponse } from "next/server";
import { ChatTokenBuilder } from "agora-token";

type AgoraChatTokenRequest = {
  userUuid?: string | number;
  durationSeconds?: number;
};

const DEFAULT_CHAT_TOKEN_EXPIRATION = 86400;

function normalizeUserUuid(userUuid: unknown): string | null {
  if (userUuid === undefined || userUuid === null) return null;
  const normalized = typeof userUuid === "string" ? userUuid.trim() : String(userUuid);
  return normalized === "" ? null : normalized;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as AgoraChatTokenRequest;
    const { userUuid, durationSeconds } = body;

    const normalizedUserUuid = normalizeUserUuid(userUuid);
    if (!normalizedUserUuid) {
      return NextResponse.json(
        { error: "Missing required parameter: userUuid is mandatory for Agora chat authentication." },
        { status: 400 }
      );
    }

    const appId = process.env.AGORA_APP_ID;
    const appCertificate = process.env.AGORA_APP_CERTIFICATE;

    if (!appId || !appCertificate) {
      return NextResponse.json(
        { error: "Server misconfiguration: AGORA_APP_ID or AGORA_APP_CERTIFICATE is missing." },
        { status: 500 }
      );
    }

    const tokenExpiration = durationSeconds && Number(durationSeconds) > 0 ? Math.floor(durationSeconds) : DEFAULT_CHAT_TOKEN_EXPIRATION;
    const chatToken = ChatTokenBuilder.buildUserToken(
      appId,
      appCertificate,
      normalizedUserUuid,
      tokenExpiration
    );

    return NextResponse.json({
      chatToken,
      userUuid: normalizedUserUuid,
      expiresIn: tokenExpiration,
    });
  } catch (error) {
    console.error("Agora Chat Token Generation Critical Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error while generating Agora chat token." },
      { status: 500 }
    );
  }
}
