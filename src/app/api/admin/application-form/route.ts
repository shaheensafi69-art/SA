import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const id = searchParams.get("id");

    if (id) {
      const { data, error } = await supabase
        .from("instructor_applications")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return NextResponse.json({ application: data });
    }

    let query = supabase
      .from("instructor_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ applications: data || [] });
  } catch (error: any) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: error?.message || "Failed to fetch applications" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, adminNotes } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Application ID and Status are required" }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Fetch the application
    const { data: application, error: fetchError } = await supabase
      .from("instructor_applications")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    const updates: Record<string, any> = {
      status,
      reviewed_at: new Date().toISOString()
    };

    if (adminNotes !== undefined) {
      updates.admin_notes = adminNotes;
    }

    // 2. Update application status
    const { data: updatedApp, error: updateError } = await supabase
      .from("instructor_applications")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (updateError) throw updateError;

    // 3. If Approved and user_id exists: promote to teacher
    if (status === "approved" && application.user_id) {
      try {
        // Upgrade role to teacher
        await supabase
          .from("profiles")
          .update({ role: "teacher" })
          .eq("id", application.user_id);

        // Upsert into teacher_info
        await supabase
          .from("teacher_info")
          .upsert({
            id: application.user_id,
            first_name: application.first_name,
            last_name: application.last_name,
            date_of_birth: application.date_of_birth || null,
            bio: application.bio || "",
            achievements: application.achievements || "",
            avatar_url: application.avatar_url || null
          });

        // Send in-app notification
        await supabase.from("user_notifications").insert({
          user_id: application.user_id,
          title: "🎉 Congratulations! Instructor Application Approved",
          message: `Your faculty proposal for "${application.course_title}" has been accepted! Your account has been upgraded to Instructor status. Welcome to the Safi Academy faculty!`,
          notification_type: "system",
          link_url: "/en/admin/live-classes",
          is_read: false
        });
      } catch (promotionErr) {
        console.warn("Could not auto-promote user profile:", promotionErr);
      }
    } else if (status === "rejected" && application.user_id) {
      try {
        await supabase.from("user_notifications").insert({
          user_id: application.user_id,
          title: "Instructor Application Status Update",
          message: `Thank you for your interest in teaching at Safi Academy. After reviewing your proposal for "${application.course_title}", we regret to inform you that we cannot proceed at this time.`,
          notification_type: "system",
          link_url: "/en/courses",
          is_read: false
        });
      } catch (rejectNotifErr) {
        console.warn("Could not send rejection notification:", rejectNotifErr);
      }
    }

    // 4. Send Telegram status update notification to Management
    const TELEGRAM_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN || "8668673040:AAEI6Q4r28KWiTAGwvQrT0Y9j6S92KhtwiI";
    const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID || "5195615040";

    if (TELEGRAM_TOKEN && TELEGRAM_CHAT_ID) {
      const escapeHtml = (str: string = "") =>
        str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

      const statusEmoji = status === "approved" ? "✅" : status === "rejected" ? "❌" : "⏳";
      const statusText = status === "approved" ? "APPROVED (تایید شد)" : status === "rejected" ? "REJECTED (رد شد)" : "PENDING (در انتظار بررسی)";

      const message = `
${statusEmoji} <b>بروزرسانی وضعیت درخواست تدریس</b> ${statusEmoji}
━━━━━━━━━━━━━━━━━━━━━
🆔 <b>شناسه:</b> <code>${application.id}</code>
👤 <b>متقاضی:</b> ${escapeHtml(application.first_name)} ${escapeHtml(application.last_name)}
📧 <b>ایمیل:</b> ${escapeHtml(application.email)}
🎯 <b>دوره:</b> ${escapeHtml(application.course_title)}
📌 <b>وضعیت جدید:</b> <b>${statusText}</b>
${adminNotes ? `📝 <b>یادداشت ادمین:</b> ${escapeHtml(adminNotes)}` : ""}
━━━━━━━━━━━━━━━━━━━━━
⏰ زمان تغییر: ${new Date().toISOString()}
      `.trim();

      try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "HTML"
          })
        });
      } catch (tgErr) {
        console.warn("Telegram status update warning:", tgErr);
      }
    }

    return NextResponse.json({
      success: true,
      application: updatedApp,
      message: `Application marked as ${status}`
    });
  } catch (error: any) {
    console.error("Error updating application:", error);
    return NextResponse.json({ error: error?.message || "Failed to update application" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from("instructor_applications")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true, message: "Application deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting application:", error);
    return NextResponse.json({ error: error?.message || "Failed to delete application" }, { status: 500 });
  }
}
