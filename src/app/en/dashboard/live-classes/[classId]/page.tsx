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
  const [activeTab, setActiveTab] = useState<"group" | "live" | "recordings">("group");
  
  // استیت و رفرنس برای مدیریت حرفه‌ای فول‌اسکرین
  const [videoMode, setVideoMode] = useState<"normal" | "fullscreen" | "minimized">("normal");
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const supabase = createClient();

  useEffect(() => {
    checkAccessAndLoadData();
    setupRealtimeChat();
    return () => { supabase.channel(`room_${classId}`).unsubscribe(); };
  }, [classId]);

  // اسکرول خودکار چت
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeTab]);

  // شنودگر (Listener) برای زمانی که کاربر با دکمه Back گوشی یا دکمه Esc کیبورد از فول‌اسکرین خارج می‌شود
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setVideoMode("normal");
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const checkAccessAndLoadData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return router.push("/login");

    const { data: profile } = await supabase.from("profiles").select("id, role, first_name").eq("id", session.user.id).single();
    setCurrentUser(profile);

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
      .channel(`chat_room_${classId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'class_messages', filter: `class_group_id=eq.${classId}` }, 
        async (payload) => {
          const { data: senderInfo } = await supabase.from("profiles").select("first_name, last_name, avatar_url, role").eq("id", payload.new.sender_id).single();
          const newMsg = { ...payload.new, profiles: senderInfo };
          setMessages((prev) => [...prev, newMsg as any]);
          
          if (payload.new.message_text.includes("🔴 LIVE_STARTED")) setIsClassLive(true);
          if (payload.new.message_text.includes("⏹ LIVE_ENDED")) setIsClassLive(false);
      })
      .subscribe();

    supabase
      .channel(`video_status_${classId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'class_groups', filter: `id=eq.${classId}` },
        (payload) => {
          setIsClassLive(payload.new.is_active);
          if (payload.new.is_active) {
            setIsClassLive(true);
            setActiveTab("live");
          } else {
            setIsClassLive(false);
          }
        }
      )
      .subscribe();
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;
    const currentText = newMessage.trim();
    setNewMessage(""); 

    const { error } = await supabase.from("class_messages").insert({
      class_group_id: classId,
      sender_id: currentUser.id,
      message_text: currentText,
    });
    if (error) console.error(error);
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

  // تابع حرفه‌ای برای مدیریت فول‌اسکرین واقعی مرورگر
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (videoContainerRef.current?.requestFullscreen) {
          await videoContainerRef.current.requestFullscreen();
          setVideoMode("fullscreen");
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          setVideoMode("normal");
        }
      }
    } catch (err) {
      console.warn("Fullscreen API is not supported on this device/browser.", err);
      // Fallback به فول‌اسکرین CSS در صورت عدم پشتیبانی مرورگر
      setVideoMode(videoMode === "fullscreen" ? "normal" : "fullscreen");
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-[#020202] text-white font-sans flex flex-col p-4 sm:p-6 relative">
      
      {/* ================= HEADER & TABS ================= */}
      <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white mb-1">{className}</h1>
          <p className="text-xs text-neutral-500 font-mono">Class ID: {classId}</p>
        </div>

        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-full md:w-auto shrink-0">
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
      <div className="flex-1 w-full h-[calc(100vh-14rem)] relative">
        
        {/* حالت اول: گروه مستقل */}
        {activeTab === "group" && (
          <div className="max-w-4xl mx-auto h-full animate-[fadeIn_0.3s_ease-out]">
            <ChatInterface 
              isSidebar={false} 
              messages={messages} 
              currentUser={currentUser} 
              newMessage={newMessage} 
              setNewMessage={setNewMessage} 
              handleSendMessage={handleSendMessage} 
              messagesEndRef={messagesEndRef}
            />
          </div>
        )}

        {/* حالت دوم: استودیو لایو */}
        {activeTab === "live" && (
          <div className="w-full h-full flex flex-col lg:flex-row bg-[#080808] rounded-3xl border border-white/5 shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out] relative">
            
            {/* باکس رندر ویدیو پلیر با پشتیبانی از فول اسکرین */}
            <div 
              ref={videoContainerRef}
              className={`flex-1 relative flex items-center justify-center bg-black transition-all duration-300 ${
                videoMode === "fullscreen" ? "fixed inset-0 z-[9999] w-screen h-screen rounded-none" : 
                videoMode === "minimized" ? "fixed bottom-24 right-6 w-48 h-32 z-[50] rounded-2xl border border-white/20 shadow-2xl overflow-hidden" : "w-full h-full"
              }`}
            >
              {!isClassLive ? (
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">☕</div>
                  <h3 className="text-xl font-bold text-white mb-2">Instructor is offline</h3>
                  <p className="text-neutral-400 text-sm max-w-sm mx-auto">The live broadcast has not started yet.</p>
                  
                  {currentUser && (currentUser.role === "teacher" || currentUser.role === "super_admin") && (
                    <button onClick={toggleLiveStatus} className="mt-8 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-sm py-3 px-8 rounded-xl hover:scale-105 transition-transform">
                      🔴 Go Live Now
                    </button>
                  )}
                </div>
              ) : (
                <div className="w-full h-full relative group">
                  {/* این کامپوننت خودش به صورت اتوماتیک توکن را از فایل API می‌گیرد! */}
                  <StudentVideoPlayer channelName={classId} />
                  
                  {/* دکمه‌های کنترل فول‌اسکرین و مینی‌مایز */}
                  <div className="absolute bottom-4 right-4 z-[9999] flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-2 rounded-xl backdrop-blur-md border border-white/10">
                    <button 
                      onClick={toggleFullscreen}
                      className="p-2 hover:bg-white/10 rounded-lg text-xs font-bold text-white transition-colors"
                      title="Toggle Fullscreen"
                    >
                      {videoMode === "fullscreen" ? "🔲 Exit Fullscreen" : "📺 Fullscreen"}
                    </button>
                    <button 
                      onClick={() => setVideoMode(videoMode === "minimized" ? "normal" : "minimized")}
                      className="p-2 hover:bg-white/10 rounded-lg text-xs font-bold text-white transition-colors hidden sm:block"
                    >
                      {videoMode === "minimized" ? "🔼 Maximize" : "🔽 Minimize"}
                    </button>
                    {videoMode !== "normal" && (
                      <button onClick={() => {
                          if (document.fullscreenElement) document.exitFullscreen();
                          setVideoMode("normal");
                      }} className="p-2 hover:bg-red-500 text-red-400 hover:text-white rounded-lg text-xs font-bold transition-colors">✕</button>
                    )}
                  </div>

                  {currentUser && (currentUser.role === "teacher" || currentUser.role === "super_admin") && (
                    <div className="absolute top-4 right-4 z-50">
                      <button onClick={toggleLiveStatus} className="bg-red-600/90 text-white font-bold text-xs py-2 px-4 rounded-lg shadow-lg">
                        End Stream
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* سایدبار چت در حالت لایو */}
            <div className={`w-full lg:w-[350px] xl:w-[400px] transition-all ${videoMode === "fullscreen" ? "hidden" : "h-[350px] lg:h-full"}`}>
              <ChatInterface 
                isSidebar={true} 
                messages={messages} 
                currentUser={currentUser} 
                newMessage={newMessage} 
                setNewMessage={setNewMessage} 
                handleSendMessage={handleSendMessage} 
                messagesEndRef={messagesEndRef}
              />
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

// =====================================================================
// کامپوننت چت
// =====================================================================
function ChatInterface({ isSidebar, messages, currentUser, newMessage, setNewMessage, handleSendMessage, messagesEndRef }: any) {
  return (
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
      
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
        {messages.map((msg: any) => {
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
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-black/40 border-t border-white/5 backdrop-blur-xl">
        <form onSubmit={handleSendMessage} className="relative flex items-center">
          <input 
            type="text" 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)}
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
}