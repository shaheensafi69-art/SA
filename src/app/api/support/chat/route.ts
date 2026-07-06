import { NextResponse } from 'next/server';

// کلیدها با امنیت کامل در سمت سرور خوانده می‌شوند
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY;

// =====================================================================
// تغییر به ربات دوم تلگرام (برای لایو چت)
// =====================================================================
const TELEGRAM_BOT_TOKEN2 = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN2;
const TELEGRAM_CHAT_ID2 = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID2;

// =====================================================================
// تابع هوشمند: تشخیص خودکار مدل فعال از گوگل
// =====================================================================
async function getAvailableModel(apiKey: string) {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await res.json();
    
    if (data.models) {
      // جستجو برای مدل فلش 1.5 که از تولید متن پشتیبانی می‌کند
      const flashModel = data.models.find((m: any) => 
        m.name.includes("gemini-1.5-flash") && 
        m.supportedGenerationMethods.includes("generateContent")
      );
      if (flashModel) return flashModel.name.replace('models/', '');
      
      // اگر فلش 1.5 نبود، اولین مدل جمینای که کار می‌کند را بردار
      const backupModel = data.models.find((m: any) => 
        m.name.includes("gemini") && 
        m.supportedGenerationMethods.includes("generateContent")
      );
      if (backupModel) return backupModel.name.replace('models/', '');
    }
  } catch (e) {
    console.error("Error detecting models:", e);
  }
  // در بدترین حالت، به این نام پیش‌فرض فال‌بک می‌کند
  return "gemini-1.5-flash";
}

// =====================================================================
// تابع ارسال هشدار به تلگرام (تنظیم شده روی ربات دوم)
// =====================================================================
async function sendTelegramAlert(subject: string, message: string, studentName: string) {
  if (!TELEGRAM_BOT_TOKEN2 || !TELEGRAM_CHAT_ID2) return;
  const text = `🚨 *${subject}*\n\n👤 *Student:* ${studentName}\n💬 *Message:*\n${message}`;
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN2}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID2, text: text, parse_mode: "Markdown" })
    });
  } catch (err) {
    console.error("Telegram error:", err);
  }
}

export async function POST(req: Request) {
  try {
    const { userText, history, studentName, isAgentMode } = await req.json();

    // =====================================================================
    // ۱. حالت انسانی (لایو چت متصل به مدیر):
    // =====================================================================
    if (isAgentMode) {
      await sendTelegramAlert("Live Chat Message (Agent Mode)", userText, studentName);
      return NextResponse.json({ 
        text: "پیام شما دریافت شد. لطفاً چند لحظه منتظر بمانید تا کارمند پشتیبانی پاسخ دهد...", 
        isTransfer: true 
      });
    }

    // =====================================================================
    // ۲. حالت هوش مصنوعی (Safi AI):
    // =====================================================================
    if (!GEMINI_API_KEY) throw new Error("Google Gemini API Key is missing in .env");

    // پیدا کردن نام دقیق مدل بدون هاردکد کردن
    const activeModel = await getAvailableModel(GEMINI_API_KEY);

    // پرامپت فوق‌پیشرفته و هویت‌سازی دقیق
    const systemPrompt = `شما "Safi AI" هستید، دستیار ارشد مجموعه Safi.
شما باید به زبان کاربری که سوال می‌پرسد (فارسی، انگلیسی یا پشتو) با احترام، حرفه‌ای، دوستانه و با انرژی پاسخ دهید.

اطلاعات حیاتی که باید حفظ باشید:
- وب‌سایت اختصاصی شما: www.safiai.site (پلتفرم تخصصی هوش مصنوعی مجموعه صافی).
- تیم مدیریتی: جناب آقای شاهین صافی (بنیان‌گذار)، جناب آقای مجتبی رحمانی (مدیر عملیات)، جناب آقای ساحل سالم (مدیر روابط اروپا)، خانم شیرین گل احمدی (منیجر شرکت و متخصص هوش مصنوعی) و خانم حسنی‌فر شاداب ظفر (مدیر دیتابیس).
- بخش‌های مجموعه:
۱. Safi Academy: آموزش حرفه‌ای فین‌تک، ترید، دراپ‌شیپینگ، توسعه وب/هوش مصنوعی و زبان.
۲. Safi International Capital LTD: خدمات مالی و سرمایه‌گذاری (ثبت انگلستان: 17063286، مستقر در لندن، منطقه Covent Garden).
۳. SafiPay: اپلیکیشن افتتاح حساب بین‌المللی و صدور ویزاکارت (www.safipay.net).
۴. Safi TopUp: ارسال شارژ جهانی و گیفت‌کارت (www.safitopup.site).
۵. SafiPro: تولید و عرضه لباس و محصولات مدرن (www.safipro.site).

🚨 قانون بسیار مهم (TRANSFER_TO_AGENT):
اگر کاربر صراحتاً درخواست صحبت با "انسان"، "کارمند واقعی"، "مدیر"، "پشتیبان" را داشت، یا شما قادر به حل مشکل او نبودید، **باید حتماً** عبارت [TRANSFER_TO_AGENT] را در انتهای پاسخ خود قرار دهید تا سیستم چت را به صورت خودکار به تلگرام مدیران وصل کند.`;

    // ارسال درخواست با مدل داینامیک و امن
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${activeModel}:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: history
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    let aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "متأسفانه در پردازش پاسخ خطایی رخ داد.";
    let isTransfer = false;

    // بررسی کلمه رمز برای انتقال به کارمند انسانی
    if (aiResponseText.includes("[TRANSFER_TO_AGENT]")) {
      isTransfer = true;
      aiResponseText = aiResponseText.replace("[TRANSFER_TO_AGENT]", "").trim();
      
      if (!aiResponseText) {
        aiResponseText = "در حال انتقال چت شما به پشتیبان آنلاین... لطفاً چند لحظه شکیبا باشید.";
      }
      
      // هشدار فوری به تلگرام
      await sendTelegramAlert("🔴 LIVE CHAT ESCALATION (Agent Requested)", `کاربر درخواست صحبت با پشتیبان واقعی را دارد.\nآخرین پیام: ${userText}`, studentName);
    }

    return NextResponse.json({ text: aiResponseText, isTransfer });

  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}