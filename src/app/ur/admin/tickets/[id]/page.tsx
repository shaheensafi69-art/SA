"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useParams, useRouter } from "next/navigation";

// --- Types ---
type TicketInfo = {
  id: string;
  student_id: string;
  subject: string;
  department: string;
  status: string;
  created_at: string;
  profiles: { first_name: string; last_name: string; avatar_url: string; role: string; email: string } | null;
};

type TicketMessage = {
  id: string;
  sender_id: string;
  message_text: string;
  created_at: string;
  profiles: { first_name: string; last_name: string; avatar_url: string; role: string } | null;
};

export default function TicketDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const ticketId = params.id as string;
  
  const [ticket, setTicket] = useState<TicketInfo | null>(null);
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const supabase = createClient();

  useEffect(() => {
    loadTicketData();

    // اتصال به WebSockets برای چت زنده (آنی)
    const channel = supabase
      .channel(`ticket_${ticketId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'ticket_messages', filter: `ticket_id=eq.${ticketId}` }, 
        async (payload) => {
          // گرفتن اطلاعات فرستنده برای پیام جدید
          const { data: senderInfo } = await supabase.from("profiles").select("first_name, last_name, avatar_url, role").eq("id", payload.new.sender_id).single();
          const newMsg = { ...payload.new, profiles: senderInfo };
          setMessages((prev) => [...prev, newMsg as any]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [ticketId]);

  // اسکرول خودکار به آخرین پیام
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, ticket]);

  const loadTicketData = async () => {
    setIsLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (session) setCurrentUser(session.user);

    try {
      // ۱. دریافت اطلاعات اصلی تیکت
      const { data: ticketData, error: ticketError } = await supabase
        .from("tickets")
        .select(`id, student_id, subject, department, status, created_at, profiles!student_id(first_name, last_name, avatar_url, role, email)`)
        .eq("id", ticketId)
        .single();

      if (ticketError) throw ticketError;

      setTicket({
        ...ticketData,
        profiles: Array.isArray(ticketData.profiles) ? ticketData.profiles[0] : ticketData.profiles
      } as unknown as TicketInfo);

      // ۲. دریافت چت‌ها (پیام‌ها)
      const { data: msgData, error: msgError } = await supabase
        .from("ticket_messages")
        .select(`id, sender_id, message_text, created_at, profiles!sender_id(first_name, last_name, avatar_url, role)`)
        .eq("ticket_id", ticketId)
        .order("created_at", { ascending: true });

      if (msgData) {
        const formattedMsgs = msgData.map((msg: any) => ({
          ...msg,
          profiles: Array.isArray(msg.profiles) ? msg.profiles[0] : msg.profiles
        }));
        setMessages(formattedMsgs as TicketMessage[]);
      }
    } catch (error) {
      console.error("Error loading ticket:", error);
      alert("Ticket not found or access denied.");
      router.push("/en/admin/tickets");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;

    // ذخیره پیام جدید در دیتابیس
    const { error } = await supabase.from("ticket_messages").insert({
      ticket_id: ticketId,
      sender_id: currentUser.id,
      message_text: newMessage.trim(),
    });

    if (!error) {
      setNewMessage("");
      // تغییر وضعیت تیکت به در حال بررسی (in_progress) اگر پیام از طرف ادمین باشد
      if (ticket?.status === "open") {
        await supabase.from("tickets").update({ status: "in_progress" }).eq("id", ticketId);
        setTicket(prev => prev ? { ...prev, status: "in_progress" } : prev);
      }
    } else {
      alert("Error sending message: " + error.message);
    }
  };

  const handleUpdateStatus = async (newStatus: string) => {
    const { error } = await supabase.from("tickets").update({ status: newStatus }).eq("id", ticketId);
    if (!error) {
      setTicket(prev => prev ? { ...prev, status: newStatus } : prev);
    }
  };

  if (isLoading) return <div className="min-h-screen bg-[#020202] flex items-center justify-center"><div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!ticket) return null;

  const isClosed = ticket.status === "closed" || ticket.status === "resolved";

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 sm:p-10 relative overflow-hidden font-sans flex flex-col items-center">
      
      {/* Background glow */}
      <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-5xl h-[calc(100vh-5rem)] flex flex-col relative z-10 animate-[fadeIn_0.3s_ease-out]">
        
        {/* ================= Header ================= */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div>
            <Link href="/en/admin/tickets" className="text-neutral-500 hover:text-white text-xs font-bold flex items-center gap-2 mb-3 transition-colors w-max">
              <span>←</span> Back to Support Center
            </Link>
            <h1 className="text-2xl font-black tracking-tight">{ticket.subject}</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="bg-white/10 text-neutral-300 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest">{ticket.department}</span>
              <p className="text-neutral-500 text-xs font-mono">ID: {ticket.id.substring(0,8)}...</p>
            </div>
          </div>

          <div className="flex gap-3">
            {!isClosed ? (
              <button onClick={() => handleUpdateStatus("closed")} className="px-6 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-xs font-bold text-red-400 transition-all shadow-sm">
                Mark as Resolved (Close)
              </button>
            ) : (
              <button onClick={() => handleUpdateStatus("open")} className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-white transition-all shadow-sm">
                Reopen Ticket
              </button>
            )}
          </div>
        </header>

        {/* ================= Chat Interface ================= */}
        <div className="flex-1 bg-neutral-950/60 border border-white/5 rounded-[2rem] backdrop-blur-3xl shadow-2xl flex flex-col overflow-hidden">
          
          <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
             <span className="text-xs text-neutral-400">Created by: <strong className="text-white">{ticket.profiles?.first_name} {ticket.profiles?.last_name}</strong></span>
             <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${isClosed ? "bg-green-500/20 text-green-400" : "bg-indigo-500/20 text-indigo-400"}`}>{ticket.status.replace('_', ' ')}</span>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-black/20">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-neutral-500 text-sm">
                 <span className="text-4xl mb-3 opacity-50">💬</span>
                 No messages yet.
              </div>
            ) : (
              messages.map((msg) => {
                const isAdmin = msg.profiles?.role === "super_admin";
                return (
                  <div key={msg.id} className={`flex gap-4 ${isAdmin ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center font-bold text-xs ${isAdmin ? "bg-indigo-600 text-white" : "bg-neutral-800 text-neutral-500"}`}>
                       {msg.profiles?.avatar_url ? <img src={msg.profiles.avatar_url} className="w-full h-full object-cover" alt="avatar" /> : msg.profiles?.first_name?.charAt(0)}
                    </div>
                    <div className={`max-w-[85%] sm:max-w-[75%] ${isAdmin ? "text-right" : "text-left"}`}>
                      <p className="text-[10px] font-bold text-neutral-500 mb-1">
                        {msg.profiles?.first_name} {isAdmin && <span className="text-indigo-400 ml-1">(Support)</span>}
                      </p>
                      <div className={`p-4 text-sm rounded-2xl inline-block leading-relaxed shadow-sm ${isAdmin ? "bg-indigo-600 text-white rounded-tr-none" : "bg-white/5 text-neutral-200 border border-white/5 rounded-tl-none"}`}>
                        {msg.message_text}
                      </div>
                      <p className="text-[9px] text-neutral-600 mt-1">{new Date(msg.created_at).toLocaleTimeString()}</p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-black/40 border-t border-white/5">
            {isClosed ? (
              <div className="text-center p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">
                This ticket is closed. Reopen it to send a message.
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="relative flex items-center">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your reply..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-20 py-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                />
                <button 
                  type="submit" 
                  disabled={!newMessage.trim()} 
                  className="absolute right-2 px-5 h-10 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 rounded-lg text-xs font-bold transition-all shadow-md"
                >
                  Send
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}