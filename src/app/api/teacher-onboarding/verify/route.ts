import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { verifyOnboardingToken, generateOnboardingToken } from "@/utils/onboardingSecurity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const appId = searchParams.get("appId");
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const supabase = createAdminClient();
    let application: any = null;

    if (appId) {
      const { data, error } = await supabase
        .from("instructor_applications")
        .select("*")
        .eq("id", appId)
        .single();

      if (!error && data) {
        application = data;
      }
    } else if (email) {
      const cleanEmail = email.trim().toLowerCase();
      const { data, error } = await supabase
        .from("instructor_applications")
        .select("*")
        .eq("email", cleanEmail)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        application = data;
      }
    }

    if (!application) {
      return NextResponse.json(
        {
          valid: false,
          error: "Candidate application dossier not found in faculty database."
        },
        {
          status: 404,
          headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" }
        }
      );
    }

    // If token provided, strictly verify it
    if (token) {
      const validation = verifyOnboardingToken(token, application);
      if (!validation.valid) {
        return NextResponse.json(
          {
            valid: false,
            error: validation.error || "Access Denied: Invalid or expired security token."
          },
          {
            status: 403,
            headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" }
          }
        );
      }
    } else {
      // If token wasn't in URL (e.g. redirected with session or email), ensure application status is strictly approved
      if (application.status !== "approved") {
        return NextResponse.json(
          {
            valid: false,
            error: "This application has not been approved by the Admissions Board."
          },
          {
            status: 403,
            headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" }
          }
        );
      }
    }

    // Check if user already fully registered
    let alreadyRegistered = false;
    if (application.user_id) {
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id, role")
        .eq("id", application.user_id)
        .single();

      if (existingProfile && existingProfile.role === "teacher") {
        alreadyRegistered = true;
      }
    }

    // Generate/refresh valid token for the client session
    const validToken = token || generateOnboardingToken(application.id, application.email);

    return NextResponse.json(
      {
        valid: true,
        alreadyRegistered,
        token: validToken,
        candidate: {
          id: application.id,
          first_name: application.first_name,
          last_name: application.last_name,
          email: application.email,
          phone: application.phone,
          country: application.country,
          course_title: application.course_title,
          course_description: application.course_description,
          category: application.category,
          experience_level: application.experience_level,
          teaching_format: application.teaching_format,
          language: application.language,
          bio: application.bio,
          avatar_url: application.avatar_url,
          created_at: application.created_at
        }
      },
      {
        headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" }
      }
    );
  } catch (error: any) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { valid: false, error: "Internal verification failure." },
      {
        status: 500,
        headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" }
      }
    );
  }
}
