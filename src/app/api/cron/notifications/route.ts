import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const expectedKey = process.env.CRON_SECRET_KEY;

    if (!authHeader || authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ success: false, error: "Unauthorized request." }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const now = new Date().toISOString();

    const { data: pendingNotifs, error: fetchError } = await supabase
      .from('scheduled_notifications')
      .select('*')
      .lte('scheduled_at', now)
      .eq('is_sent', false);

    if (fetchError) throw fetchError;

    if (!pendingNotifs || pendingNotifs.length === 0) {
      return NextResponse.json({ success: true, message: "No pending notifications." });
    }

    const results = [];
    for (const notif of pendingNotifs) {
      console.log(`Sending Notification via PushAlert: ${notif.title}`);

      try {
        // تغییر مهم: تبدیل به فرمت URLSearchParams استانداردِ PushAlert
        const pushAlertPayload = new URLSearchParams({
          title: notif.title,
          message: notif.message,
          url: "https://www.safiacademy.org"
        });

        // آدرس صحیح API
        const pushResponse = await fetch('https://api.pushalert.co/rest/v1/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `api_key=${process.env.PUSHALERT_API_KEY}`
          },
          body: pushAlertPayload.toString(),
        });

        if (!pushResponse.ok) {
          const errorData = await pushResponse.text();
          throw new Error(`PushAlert API Error: ${errorData}`);
        }

        const pushResult = await pushResponse.json();
        results.push({ title: notif.title, status: 'success', pushAlert: pushResult });

        await supabase
          .from('scheduled_notifications')
          .update({ is_sent: true })
          .eq('id', notif.id);

      } catch (pushErr: any) {
        console.error(`Failed to send "${notif.title}":`, pushErr.message);
        results.push({ title: notif.title, status: 'failed', error: pushErr.message });
      }
    }

    return NextResponse.json({
      success: true,
      processedCount: pendingNotifs.length,
      details: results
    });

  } catch (err: any) {
    console.error("Cron Notifications Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}