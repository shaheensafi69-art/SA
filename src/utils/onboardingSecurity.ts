import crypto from "crypto";

const SECRET_KEY =
  process.env.CRON_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "safi-academy-faculty-secret-key-2026";

/**
 * Generates a tamper-proof cryptographic invitation token for an approved instructor.
 * The token binds the application ID, the applicant's email, and timestamp.
 */
export function generateOnboardingToken(applicationId: string, email: string): string {
  const cleanEmail = (email || "").trim().toLowerCase();
  const timestamp = Date.now();
  const rawPayload = `${applicationId}:${cleanEmail}:${timestamp}`;

  const signature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(rawPayload)
    .digest("hex");

  const tokenObject = {
    id: applicationId,
    email: cleanEmail,
    t: timestamp,
    sig: signature
  };

  return Buffer.from(JSON.stringify(tokenObject), "utf8").toString("base64url");
}

/**
 * Validates the cryptographic token and ensures it has not expired or been tampered with.
 */
export function verifyOnboardingToken(
  token: string,
  targetApp: { id: string; email: string; status: string }
): { valid: boolean; error?: string } {
  try {
    if (!token) {
      return { valid: false, error: "Access token is missing." };
    }

    const jsonStr = Buffer.from(token, "base64url").toString("utf8");
    const payload = JSON.parse(jsonStr);

    const { id, email, t, sig } = payload;

    if (!id || !email || !t || !sig) {
      return { valid: false, error: "Invalid token payload structure." };
    }

    if (id !== targetApp.id) {
      return { valid: false, error: "Application identifier does not match this authorization token." };
    }

    if (email.toLowerCase() !== (targetApp.email || "").trim().toLowerCase()) {
      return { valid: false, error: "Email mismatch with candidate dossier." };
    }

    if (targetApp.status !== "approved") {
      return { valid: false, error: "This application has not been approved by the Faculty Board." };
    }

    // Check signature
    const expectedRaw = `${id}:${email.toLowerCase()}:${t}`;
    const expectedSig = crypto
      .createHmac("sha256", SECRET_KEY)
      .update(expectedRaw)
      .digest("hex");

    if (sig !== expectedSig) {
      return { valid: false, error: "Cryptographic signature validation failed. Tampering detected." };
    }

    // Check expiration: 30 days
    const MAX_AGE = 30 * 24 * 60 * 60 * 1000;
    if (Date.now() - t > MAX_AGE) {
      return { valid: false, error: "This invitation link has expired. Please request a new activation link." };
    }

    return { valid: true };
  } catch (err: any) {
    return { valid: false, error: "Malformed or invalid authorization token." };
  }
}
