import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { verifyOnboardingToken } from "@/utils/onboardingSecurity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { appId, token, password } = body;

    if (!appId || !token || !password) {
      return NextResponse.json(
        { error: "Application ID, authorization token, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // 1. Fetch application details
    const { data: app, error: fetchErr } = await supabase
      .from("instructor_applications")
      .select("*")
      .eq("id", appId)
      .single();

    if (fetchErr || !app) {
      return NextResponse.json(
        { error: "Instructor application record not found." },
        { status: 404 }
      );
    }

    // 2. Validate token again on server
    const validation = verifyOnboardingToken(token, app);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error || "Access Denied: Invalid or expired security token." },
        { status: 403 }
      );
    }

    const email = app.email.trim().toLowerCase();
    let userId = app.user_id;

    // 3. Create or update user in Supabase Auth via Admin Client
    if (!userId) {
      // Check if user with this email already exists in Supabase Auth
      const { data: usersList } = await supabase.auth.admin.listUsers();
      const existingAuthUser = (usersList?.users || []).find(
        (u: any) => u.email?.toLowerCase() === email
      );

      if (existingAuthUser) {
        userId = existingAuthUser.id;
        const { error: updateAuthErr } = await supabase.auth.admin.updateUserById(
          userId,
          {
            password,
            email_confirm: true,
            user_metadata: {
              first_name: app.first_name,
              last_name: app.last_name,
              role: "teacher"
            }
          }
        );
        if (updateAuthErr) throw updateAuthErr;
      } else {
        const { data: newAuthUser, error: createAuthErr } =
          await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
              first_name: app.first_name,
              last_name: app.last_name,
              role: "teacher"
            }
          });

        if (createAuthErr || !newAuthUser.user) {
          throw createAuthErr || new Error("Failed to create authentication user.");
        }
        userId = newAuthUser.user.id;
      }
    } else {
      // User ID already exists, update their password and role
      const { error: updateAuthErr } = await supabase.auth.admin.updateUserById(
        userId,
        {
          password,
          email_confirm: true,
          user_metadata: {
            first_name: app.first_name,
            last_name: app.last_name,
            role: "teacher"
          }
        }
      );
      if (updateAuthErr) throw updateAuthErr;
    }

    // 4. Update profiles table (role = 'teacher')
    await supabase.from("profiles").upsert({
      id: userId,
      first_name: app.first_name,
      last_name: app.last_name,
      email,
      phone_number: app.phone || null,
      country: app.country || null,
      date_of_birth: app.date_of_birth || null,
      avatar_url: app.avatar_url || null,
      bio: app.bio || "",
      role: "teacher"
    });

    // 5. Update teacher_info table
    await supabase.from("teacher_info").upsert({
      id: userId,
      first_name: app.first_name,
      last_name: app.last_name,
      date_of_birth: app.date_of_birth || null,
      bio: app.bio || "",
      achievements: app.achievements || "",
      avatar_url: app.avatar_url || null
    });

    // 6. Link user_id in instructor_applications table
    await supabase
      .from("instructor_applications")
      .update({ user_id: userId })
      .eq("id", app.id);

    // 7. Post welcome notification
    try {
      await supabase.from("user_notifications").insert({
        user_id: userId,
        title: "🎉 Welcome to Safi Academy Faculty!",
        message: `Your instructor account has been activated for "${app.course_title}". You now have full access to the faculty teaching command center.`,
        notification_type: "system",
        link_url: "/en/admin/live-classes",
        is_read: false
      });
    } catch (notifErr) {
      console.warn("Notification warning:", notifErr);
    }

    return NextResponse.json({
      success: true,
      message: "Faculty account successfully activated."
    });
  } catch (error: any) {
    console.error("Teacher onboarding registration error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to complete faculty activation." },
      { status: 500 }
    );
  }
}
