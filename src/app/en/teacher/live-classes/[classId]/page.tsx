"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";
import TeacherBroadcaster from "@/components/agora/TeacherBroadcaster";

export default function TeacherLiveStudio() {
  const params = useParams();
  const router = useRouter();
  const classId = params.classId as string;
  
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isClassLive, setIsClassLive] = useState(false);
  const [className, setClassName] = useState("Loading Classroom...");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    checkAccessAndLoadData();
    setupRealtimeChat();
    return () => { supabase.channel(`room_${classId}`).unsubscribe(); };
  }, [classId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const checkAccessAndLoadData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return router.push("/en/login");

    const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
    if (profile?.role !== "teacher" && profile?.role !== "super_admin") {
      alert("Unauthorized Access. Teachers only.");
      return router.push("/en/dashboard");
    }
    setCurrentUser(profile);

    const { data: classData } = await supabase.from("class_groups").select("class_name, is_active").eq("id", classId).single();
    if (classData) {
      setClassName(classData.class_name);
      setIsClassLive(classData.is_active);
    }

    const { data: chatHistory } = await supabase
      .from("class_messages")
      .select(`id, sender_id, message_text, created_at, profiles(first_name, avatar_url, role)`)
      .eq("class_group_id", classId)
      .order("created_at", { ascending: true });
    if (chatHistory) setMessages(chatHistory);
  };

  const setupRealtimeChat = () => {
    supabase
      .channel(`room_${classId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'class_messages', filter: `class_group_id=eq.${classId}` }, 
        async (payload) => {
          const { data: senderInfo } = await supabase.from("profiles").select("first_name, avatar_url, role").eq("id", payload.new.sender_id).single();
          setMessages((prev) => [...prev, { ...payload.new, profiles: senderInfo }]);
      })
      .subscribe();
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;
    const { error } = await supabase.from("class_messages").insert({
      class_group_id: classId, sender_id: currentUser.id, message_text: newMessage.trim(),
    });
    if (!error) setNewMessage("");
  };

  // تابع حیاتی: شروع کردن کلاس
  const startLiveClass = async () => {
    await supabase.from("class_groups").update({ is_active: true }).eq("id", classId);
    setIsClassLive(true);
    await supabase.from("class_messages").insert({
      class_group_id: classId, sender_id: currentUser.id,
      message_text: "🔴 LIVE_STARTED: The instructor has started the live session.",
    });
  };

  // تابع حیاتی: پایان دادن به کلاس
  const endLiveClass = async () => {
    const confirmEnd = window.confirm("Are you sure you want to end this live broadcast?");
    if (!confirmEnd) return;

    await supabase.from("class_groups").update({ is_active: false }).eq("id", classId);
    setIsClassLive(false);
    await supabase.from("class_messages").insert({
      class_group_id: classId, sender_id: currentUser.id,
      message_text: "⏹ LIVE_ENDED: The live session has ended.",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-5rem)] bg-[#020202] text-white rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden">
      
      {/* ================= Instructor Video Hub ================= */}
      <main className="flex-1 flex flex-col p-6 bg-gradient-to-b from-neutral-950 to-black">
        <header className="flex justify-between items-center mb-6">
          <div>
            <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded">Instructor Panel</span>
            <h1 className="text-2xl font-black mt-2">{className}</h1>
          </div>
        </header>

        <div className="flex-1 bg-neutral-900/50 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center shadow-2xl">
          {!isClassLive ? (
             <div className="text-center p-8">
               <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🎥</div>
               <h3 className="text-xl font-bold text-white mb-2">Ready to broadcast?</h3>
               <p className="text-neutral-400 text-sm max-w-sm mx-auto mb-8">When you click start, your camera and microphone will turn on and students will see your video automatically.</p>
               <button onClick={startLiveClass} className="bg-gradient-to-r from-red-600 to-red-700 text-white font-extrabold py-4 px-10 rounded-xl shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:scale-105 transition-all">
                 🔴 Start Broadcast
               </button>
             </div>
          ) : (
             <div className="w-full h-full p-2">
                {/* کامپوننت تیچر که الان ساختیم */}
                <TeacherBroadcaster channelName={classId} onEndClass={endLiveClass} />
             </div>
          )}
        </div>
      </main>

      {/* ================= Chat Area ================= */}
      <aside className="w-full lg:w-96 border-l border-white/5 bg-[#080808] flex flex-col">
        <div className="p-5 border-b border-white/5 bg-black/40">
          <h3 className="font-extrabold text-sm text-white">Class Discussion</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
          {messages.map((msg) => {
            const isMe = msg.sender_id === currentUser?.id;
            const isSystem = msg.message_text.includes("LIVE_STARTED") || msg.message_text.includes("LIVE_ENDED");

            if (isSystem) return <div key={msg.id} className="text-center text-[10px] font-bold text-neutral-500 my-2">{msg.message_text}</div>;

            return (
              <div key={msg.id} className={`flex gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`p-3 text-xs rounded-2xl max-w-[80%] ${isMe ? "bg-indigo-600 text-white rounded-tr-none" : "bg-white/5 text-neutral-200 rounded-tl-none"}`}>
                  {!isMe && <p className="text-[9px] text-neutral-500 font-bold mb-1">{msg.profiles?.first_name}</p>}
                  {msg.message_text}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-4 bg-black/40 border-t border-white/5 flex gap-2">
          <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Message class..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none" />
          <button type="submit" disabled={!newMessage.trim()} className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shrink-0"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zM12 19v-8"></path></svg></button>
        </form>
      </aside>
    </div>
  );
}