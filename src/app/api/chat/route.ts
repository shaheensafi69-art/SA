import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { prompt, userId } = await req.json();

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { message: "API Configuration Error: GOOGLE_GEMINI_API_KEY is missing." },
        { status: 500 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    let userClassesText = "هیچ کلاسی (None)";
    let coursesKnowledgeBase = "";

    if (userId && supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { data: enrollments } = await supabase
        .from("class_students")
        .select(`class_group_id, class_groups ( class_name )`)
        .eq("student_id", userId);

      if (enrollments && enrollments.length > 0) {
        const classNames = enrollments
          .map((e: any) => e.class_groups?.class_name)
          .filter(Boolean);
        if (classNames.length > 0) {
          userClassesText = classNames.join(", ");
        }
      }

      const { data: courses } = await supabase
        .from("courses")
        .select("title, description, category, price, instructor_name, instructor_bio")
        .eq("is_published", true);

      if (courses && courses.length > 0) {
        coursesKnowledgeBase = courses.map(c => 
          `- Course: "${c.title}" (Category: ${c.category}, Price: $${c.price})
           Description: ${c.description}
           Instructor: ${c.instructor_name}
           Instructor Bio: ${c.instructor_bio || "N/A"}`
        ).join("\n\n");
      }
    }

    const url = "https://generativelanguage.googleapis.com/v1beta/interactions";

    const combinedInput = `
      [SYSTEM INSTRUCTIONS]
      You are "Safi AI", the highly advanced, senior assistant for Safi Academy and the Safi ecosystem.
      
      [SAFI ECOSYSTEM INFO]:
      Alliance Equity Capital Group (London). Safi International Capital LTD. SafiPay, Safi TopUp, SafiPro.
      Team: Mr. Shaheen Safi (Founder), Mr. Mujtaba Rahmani, Mr. Sahel Salem, Ms. Shirin Gol Ahmadi.

      [ACADEMY COURSES & INSTRUCTORS]:
      ${coursesKnowledgeBase || "Data syncing."}

      [STUDENT ACCESS LEVEL]:
      This student is ONLY enrolled in: [${userClassesText}].

      [CRITICAL DIRECTIVES]:
      1. Answer general questions about Safi Academy, its founders, and course/instructor details freely.
      2. If the user asks a TECHNICAL or EDUCATIONAL question (e.g., how to code, how to trade), verify their "STUDENT ACCESS LEVEL".
      3. If the educational topic is NOT in their enrolled classes, YOU MUST REFUSE TO ANSWER THE TECHNICAL PART.
      4. REFUSAL FORMAT: "درود! شما هنوز در دوره‌های مربوط به این مبحث ثبت‌نام نکرده‌اید (کلاس‌های فعلی شما: ${userClassesText}). لطفاً ابتدا در دوره مربوطه ثبت‌نام کنید."
      5. COMPLETELY UNRELATED TOPICS (politics, cooking, jokes): Refuse completely.
      [END SYSTEM INSTRUCTIONS]

      User's actual question:
      ${prompt}
    `;

    const controller = new AbortController();
    // 🔥 تغییر مهم: افزایش مهلت ارتباط از ۱۵ به ۳۰ ثانیه برای عبور از کندی فیلترشکن 🔥
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    let response;
    try {
      response = await fetch(url, {
        method: "POST",
        signal: controller.signal,
        headers: { 
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey 
        },
        body: JSON.stringify({
          model: "gemini-3.5-flash",
          input: combinedInput
        }),
      });
    } catch (fetchError: any) {
      console.error("Fetch Failure:", fetchError);
      return NextResponse.json(
        { message: "Network Timeout: Cannot reach AI servers. Ensure your terminal proxy is active." },
        { status: 503 }
      );
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Gemini Interactions API Error:", errorData);
      return NextResponse.json(
        { message: `Gemini API Error: ${errorData?.error?.message || "Interaction failed."}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    const modelOutputStep = data?.steps?.find((step: any) => step.type === "model_output");
    const aiMessage = modelOutputStep?.content?.find((c: any) => c.type === "text")?.text;

    if (!aiMessage) {
      return NextResponse.json(
        { message: "API Error: Could not extract text from the Interactions response." },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: aiMessage });

  } catch (error: any) {
    console.error("AI Route Crash:", error);
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message}` }, 
      { status: 500 }
    );
  }
}