"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useParams } from "next/navigation";

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
};

type Message = {
  id: string;
  class_group_id: string;
  sender_id: string;
  message_text: string;
  created_at: string;
  profiles: Profile | null;
};

type GroupDetails = {
  id: string;
  class_name: string;
};

export default function GroupChatPage() {
  const params = useParams();
  const groupId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [groupDetails, setGroupDetails] = useState<GroupDetails | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  
  // استیت‌های قابلیت‌های پرمیوم
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const [replyingTo, setReplyingTo] = useState<{ senderName: string; snippet: string } | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const initChat = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setCurrentUserId(session.user.id);

      // دریافت اطلاعات گروه
      const { data: groupData } = await supabase
        .from("class_groups")
        .select("id, class_name")
        .eq("id", groupId)
        .single();
      
      if (groupData) setGroupDetails(groupData);

      // دریافت تاریخچه پیام‌ها
      const { data: msgData } = await supabase
        .from("class_messages")
        .select(`
          *,
          profiles!sender_id (id, first_name, last_name, avatar_url)
        `)
        .eq("class_group_id", groupId)
        .order("created_at", { ascending: true });

      if (msgData) {
        const formattedMessages = msgData.map((msg: any) => ({
          ...msg,
          profiles: Array.isArray(msg.profiles) ? msg.profiles[0] : msg.profiles
        }));
        setMessages(formattedMessages);
      }
      setIsLoading(false);
      setTimeout(scrollToBottom, 100);

      // اتصال ریل‌تایم
      const channel = supabase
        .channel(`room_${groupId}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'class_messages', filter: `class_group_id=eq.${groupId}` },
          async (payload) => {
            const { data: senderProfile } = await supabase
              .from("profiles")
              .select("id, first_name, last_name, avatar_url")
              .eq("id", payload.new.sender_id)
              .single();

            const newMsg: Message = {
              ...(payload.new as Message),
              profiles: senderProfile || null
            };

            setMessages((prev) => [...prev, newMsg]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    };

    if (groupId) initChat();
  }, [groupId]);

  // هندلر ارسال پیام با پشتیبانی از ریپلای
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUserId) return;

    let finalMessageText = newMessage.trim();
    
    // اگر کاربر در حال ریپلای است، آن را با یک ساختار خاص در متن پیام ذخیره می‌کنیم
    if (replyingTo) {
      // Format: [REPLY:SenderName|MessageSnippet] Actual Message
      finalMessageText = `[REPLY:${replyingTo.senderName}|${replyingTo.snippet}] ${finalMessageText}`;
    }

    setNewMessage(""); 
    setShowEmojiPanel(false);
    setReplyingTo(null);

    const supabase = createClient();
    const { error } = await supabase
      .from("class_messages")
      .insert({
        class_group_id: groupId,
        sender_id: currentUserId,
        message_text: finalMessageText
      });

    if (error) {
      console.error("Failed to send:", error);
    }
  };

  // فعال کردن حالت ریپلای
  const handleReplyClick = (msg: Message) => {
    const senderName = msg.sender_id === currentUserId 
      ? "You" 
      : `${msg.profiles?.first_name || 'User'} ${msg.profiles?.last_name || ''}`.trim();
    
    // پاک کردن تگ ریپلای از پیام اصلی اگر خودِ پیام هم ریپلای بود
    let cleanText = msg.message_text;
    const replyMatch = cleanText.match(/^\[REPLY:([^|]+)\|(.*?)\]\s*([\s\S]*)$/);
    if (replyMatch) cleanText = replyMatch[3];

    const snippet = cleanText.length > 40 ? cleanText.substring(0, 40) + "..." : cleanText;
    
    setReplyingTo({ senderName, snippet });
  };

  const formatMessageTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    // 🔥 کلاس fixed و h-screen در اینجا حذف شد و از h-full relative استفاده کردیم تا چت در دسکتاپ دقیقاً کنار سایدبار بنشیند 🔥
    <div className="relative w-full h-full flex flex-col bg-[#030305] font-sans overflow-hidden select-none">
      
      {/* ================= افکت‌های نوری آمبیانس و بک‌گراند ================= */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-fuchsia-600/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      
      {/* 🌟 واترمارک لوگو در مرکز صفحه 🌟 */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.03] scale-150 grayscale">
         <img src="/logo-without-b.png" alt="watermark" className="w-full max-w-2xl object-contain blur-[2px]" />
      </div>

      {/* ================= هدر چت روم ================= */}
      <header className="h-16 sm:h-20 px-4 sm:px-6 flex justify-between items-center bg-[#050508]/80 backdrop-blur-3xl border-b border-white/5 relative z-20 shrink-0 shadow-2xl">
        <div className="flex items-center gap-3">
          <Link href="/en/dashboard/groups" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:text-indigo-400 active:scale-95 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
          </Link>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-600 rounded-[0.8rem] flex items-center justify-center text-white text-base shadow-[0_4px_15px_rgba(99,102,241,0.3)] font-black border border-white/10">
              {groupDetails?.class_name?.charAt(0) || "C"}
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-white tracking-tight leading-tight">
                {isLoading ? "Connecting Securely..." : groupDetails?.class_name}
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
                <span className="text-[9px] text-indigo-400 font-bold uppercase tracking-widest">Live Secured</span>
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => alert("Connecting to Agora...")} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all text-[10px] uppercase tracking-widest hover:text-indigo-400">
           <svg className="w-4 h-4 animate-pulse text-indigo-400" fill="currentColor" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
           <span className="hidden sm:inline">Join Room</span>
        </button>
      </header>

      {/* ================= بخش اسکرول پیام‌ها ================= */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-3 custom-scrollbar relative z-10 scroll-smooth"
      >
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-[60vh] gap-3">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] opacity-60">
              <div className="w-20 h-24 text-6xl animate-bounce mb-2">⚡</div>
              <h3 className="text-lg font-black text-white">No messages here yet</h3>
              <p className="text-neutral-500 text-xs mt-1">Start the conversation</p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isMe = msg.sender_id === currentUserId;
              const showAvatar = index === 0 || messages[index - 1].sender_id !== msg.sender_id;

              // پردازش متن برای بررسی ریپلای بودن
              let replySender = "";
              let replySnippet = "";
              let actualText = msg.message_text;

              const replyMatch = msg.message_text.match(/^\[REPLY:([^|]+)\|(.*?)\]\s*([\s\S]*)$/);
              if (replyMatch) {
                replySender = replyMatch[1];
                replySnippet = replyMatch[2];
                actualText = replyMatch[3];
              }

              return (
                <div key={msg.id} className={`flex w-full group/message ${isMe ? "justify-end" : "justify-start"} items-end gap-2 animate-[fadeInUp_0.2s_ease-out]`}>
                  
                  {/* دکمه ریپلای مخفی (Hover Action) */}
                  {isMe && (
                    <button onClick={() => handleReplyClick(msg)} className="opacity-0 group-hover/message:opacity-100 transition-opacity p-2 text-neutral-500 hover:text-white mb-2 cursor-pointer">
                      <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg>
                    </button>
                  )}

                  {!isMe && (
                    <div className="w-8 h-8 rounded-full bg-neutral-900 border border-white/10 shrink-0 overflow-hidden flex items-center justify-center shadow-md">
                      {showAvatar ? (
                        msg.profiles?.avatar_url ? (
                          <img src={msg.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[11px] font-black text-indigo-400">{msg.profiles?.first_name?.charAt(0)}</span>
                        )
                      ) : null}
                    </div>
                  )}

                  <div className="flex flex-col max-w-[80%] sm:max-w-[60%]">
                    {!isMe && showAvatar && (
                      <span className="text-[10px] font-black text-indigo-400/80 uppercase tracking-wider mb-1 ml-2">
                        {msg.profiles?.first_name} {msg.profiles?.last_name}
                      </span>
                    )}
                    
                    <div className={`relative px-4 py-2.5 shadow-2xl transition-all duration-300 text-[13px] sm:text-sm ${
                      isMe 
                        ? "bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-2xl rounded-br-none border border-white/10 shadow-[0_4px_20px_rgba(79,70,229,0.15)]" 
                        : "bg-[#16161e]/90 backdrop-blur-xl border border-white/5 text-neutral-100 rounded-2xl rounded-bl-none"
                    }`}>
                      
                      {/* اگر پیام ریپلای بود، باکس ریپلای را نشان بده */}
                      {replyMatch && (
                        <div className={`mb-2 pl-2.5 border-l-2 rounded-r-md py-1 px-2 ${isMe ? "border-white/50 bg-black/10" : "border-indigo-500 bg-white/5"}`}>
                          <p className={`text-[10px] font-black mb-0.5 ${isMe ? "text-white" : "text-indigo-400"}`}>{replySender}</p>
                          <p className="text-[11px] opacity-80 truncate max-w-[200px]">{replySnippet}</p>
                        </div>
                      )}

                      <p className="font-medium leading-relaxed whitespace-pre-wrap break-words">{actualText}</p>
                      
                      <div className={`flex items-center gap-1 mt-1 text-[9px] font-black tracking-tighter ${isMe ? "text-blue-200/80 justify-end" : "text-neutral-500 justify-start"}`}>
                        <span>{formatMessageTime(msg.created_at)}</span>
                        {isMe && <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                      </div>
                    </div>
                  </div>

                  {/* دکمه ریپلای مخفی (Hover Action) */}
                  {!isMe && (
                    <button onClick={() => handleReplyClick(msg)} className="opacity-0 group-hover/message:opacity-100 transition-opacity p-2 text-neutral-500 hover:text-white mb-2 cursor-pointer">
                      <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg>
                    </button>
                  )}

                </div>
              );
            })
          )}
          <div ref={messagesEndRef} className="h-2"></div>
        </div>
      </div>

      {/* ================= Composer (ورودی پیام و ریپلای) ================= */}
      <div className="p-3 sm:p-5 bg-[#050508]/95 backdrop-blur-3xl border-t border-white/5 relative z-20 shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-4xl mx-auto flex flex-col gap-2">
          
          {/* نمایش حالت ریپلای فعال در کامپوزر */}
          {replyingTo && (
            <div className="flex items-center justify-between bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-xl animate-[fadeIn_0.2s_ease-out]">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
                <div className="truncate">
                  <p className="text-[10px] font-black text-indigo-400">Replying to {replyingTo.senderName}</p>
                  <p className="text-xs text-neutral-300 truncate">{replyingTo.snippet}</p>
                </div>
              </div>
              <button onClick={() => setReplyingTo(null)} className="p-1.5 bg-black/40 hover:bg-black/60 rounded-full text-neutral-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex items-center gap-2 sm:gap-3 bg-[#0d0d12] border border-white/10 p-1.5 sm:p-2 rounded-2xl">
            
            <button 
              type="button" 
              onClick={() => setShowEmojiPanel(!showEmojiPanel)}
              className={`w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-xl flex items-center justify-center text-xl transition-all ${showEmojiPanel ? "bg-indigo-500/20 text-indigo-400" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}
            >
              {showEmojiPanel ? "⌨️" : "😀"}
            </button>

            <button type="button" className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 flex items-center justify-center transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
            </button>

            <div className="flex-1 relative">
              <input 
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Write a message..."
                className="w-full bg-transparent px-2 py-2 text-white text-[13px] sm:text-sm focus:outline-none placeholder-neutral-600 font-medium"
              />
            </div>

            <button 
              type="submit" 
              disabled={!newMessage.trim()}
              className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-[0.8rem] sm:rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100 shadow-[0_4px_12px_rgba(99,102,241,0.3)]"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 transform rotate-45 -translate-x-0.5 translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>

          </form>

          {/* پنل اموجی */}
          {showEmojiPanel && (
            <div className="mt-2 p-3 bg-black/40 border border-white/5 rounded-2xl flex flex-wrap justify-center gap-2 sm:gap-3 text-xl sm:text-2xl animate-[fadeIn_0.2s_ease-out]">
              {["🔥", "🚀", "📈", "🎯", "💰", "💎", "👑", "👍", "👏", "🙌", "🎉", "📚", "💡", "🧠"].map(emoji => (
                <span 
                  key={emoji} 
                  onClick={() => setNewMessage(prev => prev + emoji)}
                  className="cursor-pointer hover:scale-125 transition-transform p-1.5 select-none active:scale-90"
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