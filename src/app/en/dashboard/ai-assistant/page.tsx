"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

// تایپ برای پیام‌های چت در رابط کاربری
type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  created_at: string;
};

export default function AIAssistantPage() {
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [studentName, setStudentName] = useState("");
  
  // رفرنس برای اسکرول خودکار به پایین چت
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // واکشی تاریخچه چت از دیتابیس
  useEffect(() => {
    const fetchChatHistory = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) return;
      const userId = session.user.id;

      // دریافت نام کاربر برای شخصی‌سازی پیام‌ها
      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("id", userId)
        .single();
      
      if (profile) setStudentName(profile.first_name);

      // دریافت تاریخچه چت از جدول ai_chat_history
      const { data: history } = await supabase
        .from("ai_chat_history")
        .select("*")
        .eq("student_id", userId)
        .order("created_at", { ascending: true });

      if (history && history.length > 0) {
        // تبدیل فرمت دیتابیس به فرمت رابط کاربری
        const formattedMessages: Message[] = [];
        history.forEach((chat) => {
          formattedMessages.push({
            id: `user-${chat.id}`,
            role: "user",
            content: chat.user_prompt,
            created_at: chat.created_at,
          });
          if (chat.ai_response) {
            formattedMessages.push({
              id: `ai-${chat.id}`,
              role: "ai",
              content: chat.ai_response,
              created_at: chat.created_at,
            });
          }
        });
        setMessages(formattedMessages);
      }
      setIsLoadingHistory(false);
    };

    fetchChatHistory();
  }, []);

  // اسکرول خودکار به آخرین پیام
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ارسال پیام جدید
  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    setInputValue(""); // پاک کردن باکس متن

    // 1. اضافه کردن موقت پیام کاربر به صفحه
    const tempUserId = `temp-user-${Date.now()}`;
    setMessages(prev => [...prev, { id: tempUserId, role: "user", content: userText, created_at: new Date().toISOString() }]);
    setIsTyping(true);

    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;

    if (!userId) return;

    try {
      // =====================================================================
      // ⚠️ فراخوانی API امن سرور برای صحبت با هوش مصنوعی
      // =====================================================================
      const aiResponseCall = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userText }),
      });

      if (!aiResponseCall.ok) throw new Error("Failed to fetch from AI API");
      
      const { message: realAIResponse } = await aiResponseCall.json();

      // 2. ذخیره کامل در دیتابیس
      const { data: savedChat, error } = await supabase
        .from("ai_chat_history")
        .insert({
          student_id: userId,
          user_prompt: userText,
          ai_response: realAIResponse
        })
        .select()
        .single();

      if (error) throw error;

      // 3. جایگزین کردن پیام‌های موقت با دیتای واقعی و اضافه کردن جواب هوش مصنوعی
      setMessages(prev => {
        // حذف پیام موقت کاربر
        const filtered = prev.filter(m => m.id !== tempUserId);
        return [
          ...filtered,
          { id: `user-${savedChat.id}`, role: "user", content: savedChat.user_prompt, created_at: savedChat.created_at },
          { id: `ai-${savedChat.id}`, role: "ai", content: savedChat.ai_response, created_at: savedChat.created_at }
        ];
      });

    } catch (error) {
      console.error("Error sending message:", error);
      // نمایش پیام خطای موقت در رابط کاربری برای اطلاع دانشجو
      setMessages(prev => [
        ...prev,
        { id: `error-${Date.now()}`, role: "ai", content: "Connection error. Please try again.", created_at: new Date().toISOString() }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // پیشنهادهای آماده برای شروع چت
  const suggestedPrompts = [
    "Explain Stripe Treasury BaaS integration.",
    "Review my latest Trading Journal entry.",
    "How do I set up Dropshipping on Shopify?",
    "Debug my Next.js & Supabase connection."
  ];

  return (
    <div className="flex flex-col h-screen w-full relative">
      
      {/* ================= Header (تراز با سایدبار) ================= */}
      <header className="h-24 px-8 md:px-12 flex justify-between items-center animate-[fadeIn_0.5s_ease-out] border-b border-white/5 shrink-0 bg-[#050505]/80 backdrop-blur-md z-20 relative">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.3)]">
            <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Safi <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">AI Assistant</span>
            </h1>
            <p className="text-neutral-500 mt-1 text-sm hidden md:block">Your personal 24/7 financial & tech tutor.</p>
          </div>
        </div>
      </header>

      {/* ================= Chat Area ================= */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 custom-scrollbar scroll-smooth">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          
          {isLoadingHistory ? (
            <div className="flex justify-center items-center h-40">
               <div className="flex gap-2">
                 <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"></div>
                 <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                 <div className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce [animation-delay:-.5s]"></div>
               </div>
            </div>
          ) : messages.length === 0 ? (
            // ================= حالت خالی (خوش‌آمدگویی و پیشنهادها) =================
            <div className="flex flex-col items-center justify-center text-center mt-10 md:mt-20 animate-[fadeIn_0.5s_ease-out]">
              <div className="w-24 h-24 bg-gradient-to-br from-neutral-800 to-black border border-white/10 rounded-full flex items-center justify-center mb-6 shadow-2xl relative">
                <div className="absolute inset-0 bg-yellow-500/20 blur-[30px] rounded-full"></div>
                <img src="/logo-without-b.png" alt="Safi AI" className="w-14 h-14 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-3">How can I help you, {studentName}?</h2>
              <p className="text-neutral-400 mb-10 max-w-lg">I am here to help you code, analyze markets, build your e-commerce store, and answer any questions.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                {suggestedPrompts.map((prompt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => {
                      setInputValue(prompt);
                      setTimeout(() => document.getElementById("ai-chat-input")?.focus(), 100);
                    }}
                    className="p-4 bg-neutral-900/40 border border-white/5 rounded-2xl text-sm font-medium text-neutral-300 hover:bg-neutral-800 hover:border-yellow-500/30 hover:text-white transition-all text-left group"
                  >
                    <span className="block text-yellow-500 mb-1 group-hover:translate-x-1 transition-transform">→</span>
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // ================= لیست پیام‌ها =================
            <>
              <div className="flex justify-center mb-8">
                <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-neutral-500 uppercase tracking-widest">
                  Chat History Loaded
                </span>
              </div>

              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-[fadeIn_0.3s_ease-out]`}>
                  <div className={`flex gap-4 max-w-[85%] md:max-w-[75%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    
                    {/* آواتار */}
                    <div className="shrink-0 mt-1">
                      {msg.role === "ai" ? (
                        <div className="w-10 h-10 bg-gradient-to-br from-neutral-800 to-black border border-yellow-500/30 rounded-xl flex items-center justify-center shadow-lg">
                           <img src="/logo-without-b.png" alt="Safi AI" className="w-6 h-6 object-contain" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-neutral-800 border border-white/10 rounded-xl flex items-center justify-center text-sm font-bold text-neutral-400">
                           {studentName.charAt(0) || "U"}
                        </div>
                      )}
                    </div>

                    {/* حباب پیام */}
                    <div 
                      className={`p-5 rounded-2xl text-[15px] leading-relaxed shadow-lg ${
                        msg.role === "user" 
                          ? "bg-yellow-500 text-black rounded-tr-sm font-medium" 
                          : "bg-neutral-900/80 border border-white/5 text-neutral-200 rounded-tl-sm backdrop-blur-xl"
                      }`}
                    >
                      {msg.content}
                      <span className={`block text-[10px] mt-3 font-bold opacity-60 ${msg.role === "user" ? "text-right text-black" : "text-left text-neutral-500"}`}>
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* انیمیشن در حال تایپ... */}
          {isTyping && (
            <div className="flex justify-start animate-[fadeIn_0.3s_ease-out]">
              <div className="flex gap-4 max-w-[75%]">
                <div className="shrink-0 mt-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-neutral-800 to-black border border-yellow-500/30 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                     <img src="/logo-without-b.png" alt="Safi AI" className="w-6 h-6 object-contain animate-pulse" />
                  </div>
                </div>
                <div className="p-5 rounded-2xl rounded-tl-sm bg-neutral-900/80 border border-white/5 backdrop-blur-xl flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce [animation-delay:-.2s]"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce [animation-delay:-.4s]"></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ================= Input Area ================= */}
      <div className="p-6 md:p-8 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent shrink-0">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative group">
          {/* افکت نوری پشت باکس تکست */}
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600/0 via-yellow-500/10 to-yellow-600/0 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative flex items-end bg-neutral-900/80 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl transition-all focus-within:border-yellow-500/50 focus-within:shadow-[0_0_30px_rgba(234,179,8,0.1)]">
            <textarea
              id="ai-chat-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Message Safi AI..."
              className="w-full max-h-48 min-h-[60px] bg-transparent text-white p-5 resize-none focus:outline-none custom-scrollbar text-[15px]"
              rows={1}
            />
            
            <div className="p-3 shrink-0">
              <button 
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="w-12 h-12 bg-yellow-500 hover:bg-yellow-400 text-black rounded-xl flex items-center justify-center transition-all disabled:opacity-30 disabled:hover:bg-yellow-500 hover:scale-105"
              >
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19V5m0 0l-7 7m7-7l7 7"></path></svg>
              </button>
            </div>
          </div>
          <p className="text-center text-[11px] text-neutral-600 font-medium mt-3">
            Safi AI can make mistakes. Consider verifying important financial or code information.
          </p>
        </form>
      </div>

    </div>
  );
}