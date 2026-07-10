import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { className, courseId, teacherId, scheduleInfo } = await req.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ message: "Supabase configuration missing." }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 🔥 استفاده از متد بومی و استاندارد بدون نیاز به هیچ پکیج خارجی 🔥
    const unifiedClassId = crypto.randomUUID();

    /* ۲. اتصال به Agora Chat REST API 
    */
    const agoraChatGroupId = `agora_temp_${Date.now()}`; 

    // ۳. ذخیره آیدی واحد در دیتابیس (جدول class_groups)
    const { data: newClass, error } = await supabase
      .from("class_groups")
      .insert({
        id: unifiedClassId, 
        course_id: courseId,
        teacher_id: teacherId,
        class_name: className,
        schedule_info: scheduleInfo,
        agora_chat_id: agoraChatGroupId, 
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