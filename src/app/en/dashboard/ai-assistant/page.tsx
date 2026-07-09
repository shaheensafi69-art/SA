"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

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
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) return;
      const userId = session.user.id;

      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("id", userId)
        .single();
      
      if (profile) setStudentName(profile.first_name);

      const { data: history } = await supabase
        .from("ai_chat_history")
        .select("*")
        .eq("student_id", userId)
        .order("created_at", { ascending: true });

      if (history && history.length > 0) {
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
      setTimeout(scrollToBottom, 100);
    };

    fetchChatHistory();
  }, []);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    setInputValue("");
    setShowEmojiPanel(false);

    const tempUserId = `temp-user-${Date.now()}`;
    setMessages(prev => [...prev, { id: tempUserId, role: "user", content: userText, created_at: new Date().toISOString() }]);
    setIsTyping(true);

    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;

    if (!userId) return;

    try {
      const aiResponseCall = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userText }),
      });

      if (!aiResponseCall.ok) throw new Error("Failed to fetch from AI API");
      
      const { message: realAIResponse } = await aiResponseCall.json();

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

      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== tempUserId);
        return [
          ...filtered,
          { id: `user-${savedChat.id}`, role: "user", content: savedChat.user_prompt, created_at: savedChat.created_at },
          { id: `ai-${savedChat.id}`, role: "ai", content: savedChat.ai_response, created_at: savedChat.created_at }
        ];
      });

    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [
        ...prev,
        { id: `error-${Date.now()}`, role: "ai", content: "Connection error. Please try again.", created_at: new Date().toISOString() }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatMessageTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const suggestedPrompts = [
    "Explain Stripe Treasury BaaS integration.",
    "Review my latest Trading Journal entry.",
    "How do I set up Dropshipping on Shopify?",
    "Debug my Next.js & Supabase connection."
  ];

  return (
    <div className="relative w-full h-full flex flex-col bg-[#030305] font-sans overflow-hidden select-none">
      
      {/* ================= افکت‌های نوری آمبیانس و هوشمند پس‌زمینه ================= */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      
      {/* 🌟 برندینگ واترمارک اختصاصی در قلب صفحه چت 🌟 */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.02] grayscale scale-125">
         <img src="/logo-without-b.png" alt="watermark" className="w-full max-w-xl object-contain blur-[1px]" />
      </div>

      {/* ================= هدر پرمیوم دستیار صوتی/متنی هوش مصنوعی ================= */}
      <header className="h-16 sm:h-20 px-4 sm:px-6 flex justify-between items-center bg-[#050508]/80 backdrop-blur-3xl border-b border-white/5 relative z-20 shrink-0 shadow-2xl">
        <div className="flex items-center gap-3">
          <Link href="/en/dashboard" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:text-indigo-400 active:scale-95 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-[0.8rem] flex items-center justify-center text-white text-base shadow-[0_4px_15px_rgba(99,102,241,0.3)] font-black border border-white/10 animate-pulse">
              🤖
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-white tracking-tight leading-tight">
                Safi AI Assistant
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                <span className="text-[9px] text-purple-400 font-bold uppercase tracking-widest">Quantum Core Live</span>
              </div>
            </div>
          </div>
        </div>

        <div onClick={() => setMessages([])} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-neutral-400 text-[10px] font-black uppercase tracking-widest hover:text-red-400 hover:bg-red-500/10 cursor-pointer transition-all">
          Clear Chat
        </div>
      </header>

      {/* ================= خط زمانی اسکرول چت (پیام‌ها) ================= */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-4 custom-scrollbar relative z-10 scroll-smooth"
      >
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          {isLoadingHistory ? (
            <div className="flex flex-col justify-center items-center h-[60vh] gap-3">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-neutral-500 text-[9px] font-black uppercase tracking-widest">Waking up Neural Networks...</p>
            </div>
          ) : messages.length === 0 ? (
            
            // ================= حالت اتمسفریک خالی (Suggested State) =================
            <div className="flex flex-col items-center justify-center text-center py-10 md:py-16 animate-[fadeIn_0.5s_ease-out]">
              <div className="w-20 h-24 text-6xl mb-4 drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">⚡</div>
              <h3 className="text-xl md:text-2xl font-black text-white">How can I assist you, {studentName || "Trader"}?</h3>
              <p className="text-neutral-500 text-xs mt-2 max-w-sm font-medium leading-relaxed">Ask anything about trading architectures, full-stack systems, or e-commerce models.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl mt-10">
                {suggestedPrompts.map((prompt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setInputValue(prompt)}
                    className="p-4 bg-[#0d0d12]/60 backdrop-blur-md border border-white/5 rounded-2xl text-xs font-bold text-neutral-400 hover:bg-neutral-900 hover:border-indigo-500/30 hover:text-white transition-all text-left flex flex-col justify-between group shadow-xl"
                  >
                    <span className="text-indigo-400 mb-2 group-hover:translate-x-1 transition-transform">👉</span>
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            
            // ================= تایم‌لاین چت فعال =================
            messages.map((msg) => {
              const isMe = msg.role === "user";

              return (
                <div key={msg.id} className={`flex w-full ${isMe ? "justify-end" : "justify-start"} items-end gap-2 animate-[fadeInUp_0.2s_ease-out]`}>
                  
                  {!isMe && (
                    <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-white/10 shrink-0 overflow-hidden flex items-center justify-center shadow-md">
                      <img src="/logo-without-b.png" alt="AI" className="w-5 h-5 object-contain" />
                    </div>
                  )}

                  <div className="flex flex-col max-w-[85%] sm:max-w-[70%]">
                    <div className={`relative px-4 py-3 shadow-2xl transition-all duration-300 text-[13px] sm:text-sm ${
                      isMe 
                        ? "bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-2xl rounded-br-none border border-white/10 shadow-[0_4px_20px_rgba(79,70,229,0.15)] font-medium" 
                        : "bg-[#14141c]/90 backdrop-blur-xl border border-white/5 text-neutral-200 rounded-2xl rounded-tl-none leading-relaxed"
                    }`}>
                      <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                      
                      <div className={`flex items-center gap-1.5 mt-2 text-[9px] font-black tracking-tighter ${isMe ? "text-blue-200/60 justify-end" : "text-neutral-500 justify-start"}`}>
                        <span>{formatMessageTime(msg.created_at)}</span>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })
          )}

          {/* انیمیشن لودینگ و تایپ هوش مصنوعی */}
          {isTyping && (
            <div className="flex justify-start items-end gap-2 animate-[fadeIn_0.2s_ease-out]">
              <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-white/10 shrink-0 flex items-center justify-center shadow-md">
                <img src="/logo-without-b.png" alt="AI" className="w-5 h-5 object-contain animate-spin" />
              </div>
              <div className="px-4 py-3.5 bg-[#14141c]/90 border border-white/5 rounded-2xl rounded-tl-none flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-.2s]"></div>
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-.4s]"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-2" />
        </div>
      </div>

      {/* ================= باکس تایپ و کامپوزر چت (Composer) ================= */}
      <div className="p-4 bg-[#050508]/95 backdrop-blur-3xl border-t border-white/5 relative z-20 shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-4xl mx-auto flex flex-col gap-2">
          
          <form onSubmit={handleSendMessage} className="flex items-center gap-2.5 bg-[#0d0d13] border border-white/10 p-1.5 sm:p-2 rounded-2xl group transition-all focus-within:border-indigo-500/50">
            
            <button 
              type="button" 
              onClick={() => setShowEmojiPanel(!showEmojiPanel)}
              className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-xl transition-all ${showEmojiPanel ? "bg-indigo-500/20 text-indigo-400" : "text-neutral-500 hover:text-white"}`}
            >
              {showEmojiPanel ? " Keyboard " : "😀"}
            </button>

            <div className="flex-1 relative">
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask anything from Safi AI..."
                className="w-full bg-transparent px-1 py-2 text-white text-[13px] sm:text-sm focus:outline-none placeholder-neutral-600 font-medium"
              />
            </div>

            <button 
              type="submit" 
              disabled={!inputValue.trim() || isTyping}
              className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-20 disabled:hover:scale-100 shadow-[0_4px_12px_rgba(99,102,241,0.3)]"
            >
              <svg className="w-4 h-4 transform rotate-45 -translate-x-0.5 translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>

          </form>

          {/* پنل اموجی‌ها */}
          {showEmojiPanel && (
            <div className="p-3 bg-black/40 border border-white/5 rounded-2xl flex flex-wrap justify-center gap-2 text-xl animate-[fadeIn_0.2s_ease-out]">
              {["🔥", "🚀", "💻", "📈", "📊", "🎯", "💰", "💎", "💡", "🧠", "👍", "🙌", "🎉", "👑"].map(emoji => (
                <span 
                  key={emoji} 
                  onClick={() => setInputValue(prev => prev + emoji)}
                  className="cursor-pointer hover:scale-125 transition-transform p-1 select-none active:scale-90"
                >
                  {emoji}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}