import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
  try {
    // ۱. بررسی امنیت (همان توکنی که برای کرون جاب قبلی ساختید)
    const authHeader = req.headers.get('authorization');
    const expectedKey = process.env.CRON_SECRET_KEY;

    if (!authHeader || authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ success: false, error: "Unauthorized request." }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // ۲. پیدا کردن روز فعلی به وقت کابل (Asia/Kabul)
    const options = { timeZone: 'Asia/Kabul', weekday: 'long' as const };
    const todayKabulStr = new Date().toLocaleDateString('en-US', options);
    // خروجی مثلاً: "Monday"

    // ۳. گرفتن صنف‌هایی که فعال هستند و امروز کلاس دارند
    const { data: classes, error: fetchError } = await supabase
      .from('class_groups')
      .select('*')
      .eq('is_active', true)
      .contains('class_days', [todayKabulStr]); // جستجو در آرایه روزها

    if (fetchError) throw fetchError;

    if (!classes || classes.length === 0) {
      return NextResponse.json({ success: true, message: `No classes scheduled for today (${todayKabulStr}).` });
    }

    const notificationsToInsert = [];

    // ۴. محاسبه زمان و ساخت پیام برای هر کلاس
    for (const cls of classes) {
      if (!cls.class_time) continue;

      // گرفتن ساعت و دقیقه کلاس (فرض بر این است که تایم کلاس به وقت کابل در دیتابیس ذخیره شده، مثلاً "16:00")
      const [hours, minutes] = cls.class_time.split(':').map(Number);

      // ساخت یک آبجکت تاریخ برای امروز به وقت کابل
      const classDateTime = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kabul" }));
      classDateTime.setHours(hours, minutes, 0, 0);

      // کم کردن ۱۰ دقیقه از زمان کلاس برای ارسال یادآوری
      classDateTime.setMinutes(classDateTime.getMinutes() - 10);

      // تبدیل زمان به فرمت استاندارد UTC برای ذخیره در دیتابیس (تا کرون جاب ۵ دقیقه‌ای بتواند آن را بخواند)
      const scheduledUtcTime = classDateTime.toISOString();

      notificationsToInsert.push({
        title: `یادآوری صنف: ${cls.class_name}`,
        message: `صنف ${cls.class_name} تا ۱۰ دقیقه دیگر آغاز می‌شود. لطفاً آماده باشید.`,
        scheduled_at: scheduledUtcTime,
        is_sent: false
      });
    }

    // ۵. درج دسته‌جمعی تمام یادآوری‌های امروز در جدول scheduled_notifications
    if (notificationsToInsert.length > 0) {
      const { error: insertError } = await supabase
        .from('scheduled_notifications')
        .insert(notificationsToInsert);

      if (insertError) throw insertError;
    }

    return NextResponse.json({
      success: true,
      message: `Successfully scheduled ${notificationsToInsert.length} class reminders for today.`
    });

  } catch (err: any) {
    console.error("Daily Class Reminder Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}