import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { verifyOnboardingToken } from "@/utils/onboardingSecurity";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      appId,
      token,
      password,
      first_name,
      last_name,
      father_name,
      date_of_birth,
      country,
      phone_number,
      avatar_url,
      bio,
      achievements
    } = body;

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
        { error: "Instructor application record not found in database." },
        { status: 404 }
      );
    }

    // 2. Validate cryptographic token on server
    const validation = verifyOnboardingToken(token, app);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error || "Access Denied: Invalid or expired faculty onboarding token." },
        { status: 403 }
      );
    }

    const email = app.email.trim().toLowerCase();
    const finalFirstName = (first_name || app.first_name || "").trim();
    const finalLastName = (last_name || app.last_name || "").trim();
    const finalFatherName = (father_name || "").trim();
    const finalDob = date_of_birth || app.date_of_birth || null;
    const finalCountry = (country || app.country || "").trim();
    const finalPhone = (phone_number || app.phone || "").trim();
    const finalAvatar = avatar_url || app.avatar_url || null;
    const finalBio = (bio || app.bio || "").trim();
    const finalAchievements = (achievements || app.achievements || "").trim();

    let userId = app.user_id;

    // 3. Create or update user in Supabase Auth via Admin Client
    if (!userId) {
      // Check if an auth user with this email already exists
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
              first_name: finalFirstName,
              last_name: finalLastName,
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
              first_name: finalFirstName,
              last_name: finalLastName,
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
            first_name: finalFirstName,
            last_name: finalLastName,
            role: "teacher"
          }
        }
      );
      if (updateAuthErr) throw updateAuthErr;
    }

    // 4. Update profiles table (role is strictly set to 'teacher')
    const profilePayload: Record<string, any> = {
      id: userId,
      first_name: finalFirstName,
      last_name: finalLastName,
      date_of_birth: finalDob,
      country: finalCountry || null,
      phone_number: finalPhone || null,
      email: email,
      avatar_url: finalAvatar,
      bio: finalBio,
      role: "teacher"
    };

    if (finalFatherName) {
      profilePayload.father_name = finalFatherName;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .upsert(profilePayload);

    if (profileError) {
      console.error("Profile upsert error:", profileError);
      throw profileError;
    }

    // 5. Update teacher_info table
    const { error: teacherInfoError } = await supabase
      .from("teacher_info")
      .upsert({
        id: userId,
        first_name: finalFirstName,
        last_name: finalLastName,
        date_of_birth: finalDob,
        bio: finalBio,
        achievements: finalAchievements,
        avatar_url: finalAvatar
      });

    if (teacherInfoError) {
      console.warn("teacher_info upsert notice:", teacherInfoError);
    }

    // 6. Link user_id in instructor_applications table and update synced details
    await supabase
      .from("instructor_applications")
      .update({
        user_id: userId,
        first_name: finalFirstName,
        last_name: finalLastName,
        phone: finalPhone || app.phone,
        country: finalCountry || app.country,
        date_of_birth: finalDob,
        avatar_url: finalAvatar,
        bio: finalBio,
        achievements: finalAchievements
      })
      .eq("id", app.id);

    // 7. Post welcome notification to instructor
    try {
      await supabase.from("user_notifications").insert({
        user_id: userId,
        title: "🎉 Welcome to Safi Academy Faculty!",
        message: `Your faculty account is fully activated. You are officially appointed to teach "${app.course_title}". Welcome to the Safi Academy teaching leadership team!`,
        notification_type: "system",
        link_url: "/en/teacher",
        is_read: false
      });
    } catch (notifErr) {
      console.warn("Welcome notification notice:", notifErr);
    }

    return NextResponse.json({
      success: true,
      userId,
      email,
      role: "teacher",
      message: "Faculty account activated successfully with Teacher privileges."
    });
  } catch (error: any) {
    console.error("Error activating teacher account:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error activating teacher account." },
      { status: 500 }
    );
  }
}
