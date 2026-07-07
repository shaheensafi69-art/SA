"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import StudentVideoPlayer from "@/components/agora/StudentVideoPlayer";

type Message = {
  id: string;
  sender_id: string;
  message_text: string;
  created_at: string;
  profiles: { first_name: string; last_name: string; avatar_url: string; role: string } | null;
};

type UserProfile = {
  id: string;
  role: string;
  first_name: string;
};

export default function ClassHubPage() {
  const params = useParams();
  const router = useRouter();
  const classId = params.classId as string;
  
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isClassLive, setIsClassLive] = useState(false);
  const [className, setClassName] = useState("Loading Classroom...");
  
  // سیستم تب‌ها: 'group' (واتساپ) | 'live' (استودیو) | 'recordings' (ضبط شده‌ها)
  const [activeTab, setActiveTab] = useState<"group" | "live" | "recordings">("group");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    checkAccessAndLoadData();
    setupRealtimeChat();
    return () => { supabase.channel(`room_${classId}`).unsubscribe(); };
  }, [classId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeTab]);

  const checkAccessAndLoadData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return router.push("/login");

    const { data: profile } = await supabase.from("profiles").select("id, role, first_name").eq("id", session.user.id).single();
    setCurrentUser(profile);

    // بررسی ثبت‌نام شاگرد (جلوگیری از ورود افراد متفرقه)
    if (profile?.role === "student") {
      const { data: enrollment } = await supabase.from("class_students").select("id").eq("class_group_id", classId).eq("student_id", profile.id).single();
      if (!enrollment) {
        alert("You are not enrolled in this class.");
        return router.push("/dashboard/live-classes");
      }
    }

    const { data: classData } = await supabase.from("class_groups").select("class_name, is_active").eq("id", classId).single();
    if (classData) {
      setClassName(classData.class_name);
      setIsClassLive(classData.is_active);
      // اگر کلاس لایو بود، خودکار تب را روی لایو می‌بریم
      if (classData.is_active) setActiveTab("live");
    }

    const { data: chatHistory } = await supabase
      .from("class_messages")
      .select(`id, sender_id, message_text, created_at, profiles(first_name, last_name, avatar_url, role)`)
      .eq("class_group_id", classId)
      .order("created_at", { ascending: true });
      
    if (chatHistory) setMessages(chatHistory as any);
  };

  const setupRealtimeChat = () => {
    supabase
      .channel(`room_${classId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'class_messages', filter: `class_group_id=eq.${classId}` }, 
        async (payload) => {
          const { data: senderInfo } = await supabase.from("profiles").select("first_name, last_name, avatar_url, role").eq("id", payload.new.sender_id).single();
          const newMsg = { ...payload.new, profiles: senderInfo };
          setMessages((prev) => [...prev, newMsg as any]);
          
          if (payload.new.message_text.includes("🔴 LIVE_STARTED")) setIsClassLive(true);
          if (payload.new.message_text.includes("⏹ LIVE_ENDED")) setIsClassLive(false);
      })
      .subscribe();
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;
    const { error } = await supabase.from("class_messages").insert({
      class_group_id: classId,
      sender_id: currentUser.id,
      message_text: newMessage.trim(),
    });
    if (!error) setNewMessage("");
  };

  const toggleLiveStatus = async () => {
    if (!currentUser || (currentUser.role !== "teacher" && currentUser.role !== "super_admin")) return;
    
    const newStatus = !isClassLive;
    await supabase.from("class_groups").update({ is_active: newStatus }).eq("id", classId);
    setIsClassLive(newStatus);

    await supabase.from("class_messages").insert({
      class_group_id: classId,
      sender_id: currentUser.id,
      message_text: newStatus ? "🔴 LIVE_STARTED: The instructor has started the live session." : "⏹ LIVE_ENDED: The live session has ended.",
    });
  };

  // کامپوننت مشترک چت (استفاده در هر دو تب)
  const ChatInterface = ({ isSidebar = false }) => (
    <div className={`flex flex-col h-full ${isSidebar ? 'bg-[#080808] border-l border-white/5' : 'bg-[#0a0a0a] rounded-3xl border border-white/5 shadow-2xl overflow-hidden'}`}>
      {!isSidebar && (
        <div className="p-5 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center text-lg">💬</div>
             <div>
               <h2 className="font-bold text-white">Class Group Chat</h2>
               <p className="text-xs text-neutral-500">Ask questions and share updates anytime</p>
             </div>
           </div>
        </div>
      )}
      
      {/* پیام‌ها */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
        {messages.map((msg) => {
          const isMe = msg.sender_id === currentUser?.id;
          const isSystem = msg.message_text.includes("LIVE_STARTED") || msg.message_text.includes("LIVE_ENDED");
          const isStaff = msg.profiles?.role === "teacher" || msg.profiles?.role === "super_admin";

          if (isSystem) {
            return (
              <div key={msg.id} className="text-center my-4">
                <span className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold text-neutral-400 inline-block">
                  {msg.message_text.replace("🔴 LIVE_STARTED:", "🔴 Live Session Started:").replace("⏹ LIVE_ENDED:", "⏹ Live Session Ended:")}
                </span>
              </div>
            );
          }

          return (
            <div key={msg.id} className={`flex gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-[10px] font-bold overflow-hidden border border-white/5 ${isStaff ? "bg-indigo-600 text-white" : "bg-neutral-800 text-neutral-400"}`}>
                {msg.profiles?.avatar_url ? <img src={msg.profiles.avatar_url} className="w-full h-full object-cover" /> : msg.profiles?.first_name?.charAt(0) || "U"}
              </div>
              <div className={`max-w-[75%] ${isMe ? "text-right" : "text-left"}`}>
                <p className="text-[10px] text-neutral-500 mb-1 font-bold">
                  {msg.profiles?.first_name} {isStaff && <span className="text-indigo-400 text-[8px] uppercase font-black ml-1 bg-indigo-500/10 px-1 py-0.5 rounded">[Instructor]</span>}
                </p>
                <div className={`p-3.5 text-sm rounded-2xl inline-block leading-relaxed shadow-sm ${isMe ? "bg-indigo-600 text-white rounded-tr-none" : "bg-white/5 text-neutral-200 rounded-tl-none border border-white/5"}`}>
                  {msg.message_text}
                </div>
                <p className="text-[9px] text-neutral-600 mt-1">{new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* ورودی متن */}
      <div className="p-4 bg-black/40 border-t border-white/5 backdrop-blur-xl">
        <form onSubmit={handleSendMessage} className="relative flex items-center">
          <input 
            type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all shadow-inner"
          />
          <button type="submit" disabled={!newMessage.trim()} className="absolute right-2 w-9 h-9 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:bg-neutral-800 rounded-lg flex items-center justify-center transition-all">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-[#020202] text-white font-sans flex flex-col p-4 sm:p-6 animate-[fadeIn_0.3s_ease-out]">
      
      {/* ================= HEADER & TABS ================= */}
      <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white mb-1">{className}</h1>
          <p className="text-xs text-neutral-500 font-mono">Class ID: {classId}</p>
        </div>

        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-full md:w-auto">
          <button onClick={() => setActiveTab("group")} className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${activeTab === "group" ? "bg-white/10 text-white shadow-md" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}>
            💬 Group Chat
          </button>
          <button onClick={() => setActiveTab("live")} className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${activeTab === "live" ? "bg-white/10 text-white shadow-md" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}>
            {isClassLive && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
            🔴 Live Studio
          </button>
          <button onClick={() => setActiveTab("recordings")} className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${activeTab === "recordings" ? "bg-white/10 text-white shadow-md" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}>
            📼 Recordings
          </button>
        </div>
      </header>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex-1 w-full h-[calc(100vh-14rem)]">
        
        {/* حالت اول: گروه واتساپی مستقل */}
        {activeTab === "group" && (
          <div className="max-w-4xl mx-auto h-full animate-[fadeIn_0.3s_ease-out]">
            <ChatInterface />
          </div>
        )}

        {/* حالت دوم: استودیو لایو (ویدیو + سایدبار چت) */}
        {activeTab === "live" && (
          <div className="w-full h-full flex flex-col lg:flex-row bg-[#080808] rounded-3xl border border-white/5 shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            
            <div className="flex-1 relative flex items-center justify-center bg-black">
              {!isClassLive ? (
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">☕</div>
                  <h3 className="text-xl font-bold text-white mb-2">Instructor is offline</h3>
                  <p className="text-neutral-400 text-sm max-w-sm mx-auto">The live broadcast has not started yet. You can chat with your classmates in the meantime.</p>
                  
                  {currentUser && (currentUser.role === "teacher" || currentUser.role === "super_admin") && (
                    <button onClick={toggleLiveStatus} className="mt-8 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm py-3 px-8 rounded-xl shadow-[0_10px_30px_rgba(220,38,38,0.3)] transition-all hover:scale-105">
                      🔴 Go Live Now
                    </button>
                  )}
                </div>
              ) : (
                <div className="w-full h-full relative group">
                  <StudentVideoPlayer channelName={classId} />
                  
                  {currentUser && (currentUser.role === "teacher" || currentUser.role === "super_admin") && (
                    <div className="absolute top-4 right-4 z-50">
                      <button onClick={toggleLiveStatus} className="bg-red-600/90 hover:bg-red-500 backdrop-blur-md text-white font-bold text-xs py-2 px-4 rounded-lg shadow-lg border border-red-400/30 transition-all">
                        End Stream
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* سایدبار چت در حالت لایو (همان پیام‌های گروه) */}
            <div className="w-full lg:w-[350px] xl:w-[400px] h-[350px] lg:h-full">
              <ChatInterface isSidebar={true} />
            </div>
          </div>
        )}

        {/* حالت سوم: رکوردهای ضبط شده */}
        {activeTab === "recordings" && (
          <div className="w-full h-full bg-[#0a0a0a] rounded-3xl border border-white/5 p-8 flex flex-col items-center justify-center animate-[fadeIn_0.3s_ease-out]">
            <span className="text-5xl mb-4 opacity-50">📼</span>
            <h3 className="text-xl font-bold text-white mb-2">No recordings yet</h3>
            <p className="text-neutral-500 text-sm">Past live sessions will automatically appear here once processed.</p>
          </div>
        )}
        
      </div>
    </div>
  );
}