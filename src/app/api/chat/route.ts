import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // استفاده از API رسمی گوگل جمینای
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{ text: `You are Safi AI, the senior assistant for the Safi ecosystem (Founder: Shaheen Safi). Provide professional, accurate, and luxurious answers. User query: ${prompt}` }]
        }]
      }),
    });

    if (!response.ok) throw new Error("Failed to connect to Gemini API");
    
    const data = await response.json();
    const aiMessage = data.candidates[0].content.parts[0].text;

    return NextResponse.json({ message: aiMessage });

  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json({ message: "Connection issue. Please try again." }, { status: 500 });
  }
}