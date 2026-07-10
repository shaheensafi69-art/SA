import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { className, courseId, teacherId, scheduleInfo } = await req.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ message: "Supabase configuration missing." }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // ۱. تولید آیدی واحد (Unified ID) برای کل اکوسیستم کلاس (ویدیو + چت)
    const unifiedClassId = uuidv4();

    /* 
      ۲. اتصال به Agora Chat REST API (در اینجا پیاده‌سازی منطقی آن قرار دارد)
      در محیط پروداکشن، شما با استفاده از App Token آگورا، یک درخواست به سرور آگورا می‌فرستید 
      تا گروه چت ساخته شود و Agora Chat Group ID را دریافت کنید.
      مثال: 
      const agoraGroup = await fetch(`https://{org_name}.chat.agora.io/{app_name}/chatgroups`, { ... })
      const agoraChatGroupId = agoraGroup.data.groupid;
    */
    const agoraChatGroupId = `agora_temp_${Date.now()}`; // این مقدار بعداً با آیدی واقعی آگورا جایگزین می‌شود

    // ۳. ذخیره آیدی واحد در دیتابیس (جدول class_groups)
    const { data: newClass, error } = await supabase
      .from("class_groups")
      .insert({
        id: unifiedClassId, // این آیدی، همان Channel Name برای Agora Video خواهد بود
        course_id: courseId,
        teacher_id: teacherId,
        class_name: className,
        schedule_info: scheduleInfo,
        agora_chat_id: agoraChatGroupId, // فیلد جدید در دیتابیس برای اتصال چت آگورا به این کلاس
        is_active: true
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ 
      message: "Class group created successfully.", 
      unifiedId: unifiedClassId,
      classData: newClass 
    });

  } catch (error: any) {
    console.error("Group Creation Error:", error);
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message}` }, 
      { status: 500 }
    );
  }
}