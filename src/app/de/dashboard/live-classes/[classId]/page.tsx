"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";

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

export default function LiveRoomStudioPage() {
  const params = useParams();
  const router = useRouter();
  const classId = params.classId as string;
  
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isClassLive, setIsClassLive] = useState(false);
  const [className, setClassName] = useState("Loading Classroom...");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const supabase = createClient();

  useEffect(() => {
    checkAccessAndLoadData();
    setupRealtimeChat();

    return () => {
      supabase.channel(`room_${classId}`).unsubscribe();
    };
  }, [classId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const checkAccessAndLoadData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return router.push("/en/login");

    const { data: profile } = await supabase.from("profiles").select("id, role, first_name").eq("id", session.user.id).single();
    setCurrentUser(profile);

    // دریافت نام و وضعیت واقعی کلاس از دیتابیس
    const { data: classData } = await supabase.from("class_groups").select("class_name, is_active").eq("id", classId).single();
    if (classData) {
      setClassName(classData.class_name);
      setIsClassLive(classData.is_active);
    }

    // تاریخچه چت‌ها
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

  const startLiveClass = async () => {
    if (!currentUser || (currentUser.role !== "teacher" && currentUser.role !== "super_admin")) return;
    
    await supabase.from("class_groups").update({ is_active: true }).eq("id", classId);
    setIsClassLive(true);

    await supabase.from("class_messages").insert({
      class_group_id: classId,
      sender_id: currentUser.id,
      message_text: "🔴 The live video stream has started! Connect now to join the discussion.",
    });
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-[#020202] text-white overflow-hidden rounded-[2rem] border border-white/5 shadow-2xl animate-[fadeIn_0.3s_ease-out]">
      
      {/* بخش مرکزی: ویدیو پلیر */}
      <main className="flex-1 flex flex-col p-6 relative bg-black/20">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white">{className}</h1>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-0.5">Room ID: {classId.substring(0,8)}</p>
          </div>
          
          {isClassLive ? (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 px-4 py-1.5 rounded-full">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Live</span>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-neutral-400 text-[10px] font-bold uppercase tracking-widest">Standby</div>
          )}
        </div>

        {/* فریم رندر ویدیو آگورا */}
        <div className="flex-1 bg-black rounded-3xl border border-white/5 overflow-hidden relative flex items-center justify-center shadow-inner">
          {!isClassLive ? (
             <div className="text-center p-6">
               <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">☕</div>
               <h3 className="text-md font-bold text-white mb-1">Classroom is on Standby Mode</h3>
               <p className="text-neutral-500 max-w-xs mx-auto text-xs leading-relaxed">Students can chat, share analyses, and wait until the instructor starts broadcasting.</p>
               
               {currentUser && (currentUser.role === "teacher" || currentUser.role === "super_admin") && (
                 <button onClick={startLiveClass} className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-lg transition-all hover:scale-105">
                   ▶ Launch Broadcast
                 </button>
               )}
             </div>
          ) : (
             <div className="w-full h-full flex items-center justify-center bg-neutral-950">
                <span className="text-xs font-mono text-neutral-600">Agora RTC Screen Render Area</span>
             </div>
          )}
        </div>
      </main>

      {/* بخش سمت راست: چت روم گروهی مستقل */}
      <aside className="w-80 sm:w-96 border-l border-white/5 bg-[#080808] flex flex-col">
        <div className="p-5 border-b border-white/5 bg-black/40">
          <h3 className="font-extrabold text-sm tracking-wide">Class Discussion</h3>
          <p className="text-[10px] text-neutral-500 mt-0.5">Real-time collaboration group</p>
        </div>

        {/* لیست پیام‌ها */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
          {messages.map((msg) => {
            const isMe = msg.sender_id === currentUser?.id;
            const isSystem = msg.message_text.startsWith("🔴");
            const isStaff = msg.profiles?.role === "teacher" || msg.profiles?.role === "super_admin";

            if (isSystem) {
              return (
                <div key={msg.id} className="text-center my-2">
                  <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-xl text-[11px] font-bold inline-block">
                    {msg.message_text}
                  </span>
                </div>
              );
            }

            return (
              <div key={msg.id} className={`flex gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-[10px] font-bold ${isStaff ? "bg-indigo-600 text-white" : "bg-neutral-800 text-neutral-400"}`}>
                  {msg.profiles?.first_name?.charAt(0) || "U"}
                </div>
                <div className={`max-w-[80%] ${isMe ? "text-right" : "text-left"}`}>
                  <p className="text-[9px] text-neutral-500 mb-0.5 font-bold">
                    {msg.profiles?.first_name} {isStaff && <span className="text-indigo-400 text-[8px] uppercase font-black ml-1">[Staff]</span>}
                  </p>
                  <div className={`p-3 text-xs rounded-xl inline-block leading-relaxed ${isMe ? "bg-indigo-600 text-white rounded-tr-none" : "bg-white/5 text-neutral-200 rounded-tl-none border border-white/5"}`}>
                    {msg.message_text}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* باکس تکست باکس پیام */}
        <div className="p-4 bg-black/40 border-t border-white/5">
          <form onSubmit={handleSendMessage} className="relative flex items-center">
            <input 
              type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your reply..." 
              className="w-full bg-white/5 border border-white/5 rounded-xl pl-4 pr-12 py-3.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all"
            />
            <button type="submit" disabled={!newMessage.trim()} className="absolute right-2 w-8 h-8 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:bg-neutral-800 rounded-lg flex items-center justify-center transition-all">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
}