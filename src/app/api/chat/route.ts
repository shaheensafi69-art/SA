import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // اتصال به API هوش مصنوعی (اینجا کلید شما از فایل env. خوانده می‌شود)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // همان کلیدی که برای ساپورت استفاده کردید را در فایل env. با این نام ذخیره کنید
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, 
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // مدل سریع و اقتصادی برای چت
        messages: [
          {
            role: "system",
            content: `You are Safi AI, the senior assistant and official spokesperson for the Safi ecosystem (including Safi Academy, Safi International Capital LTD, SafiPay, Safi TopUp, and SafiPro). 
            The founder is Shaheen Safi. 
            You must provide professional, accurate, and helpful answers to students learning tech, e-commerce, and financial markets. Keep your tone highly professional, encouraging, and luxurious.`
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    return NextResponse.json({ message: aiMessage });

  } catch (error) {
    console.error("AI Assistant API Error:", error);
    return NextResponse.json(
      { message: "I apologize, but my connection to the server is currently experiencing issues. Please try again later." },
      { status: 500 }
    );
  }
}