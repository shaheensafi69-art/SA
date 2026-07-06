"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

// کلیدهای ربات اول برای تیکت‌ها
const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

type Ticket = {
  id: string;
  subject: string;
  department: string;
  status: "open" | "answered" | "closed";
  created_at: string;
};

type ChatMessage = {
  id: string;
  role: "user" | "ai" | "agent";
  content: string;
  time: string;
};

export default function SupportPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"tickets" | "live-chat">("tickets");
  
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [studentName, setStudentName] = useState("Student");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketForm, setTicketForm] = useState({ subject: "", department: "Technical", message: "" });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isAgentMode, setIsAgentMode] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isAiTyping]);

  const fetchTickets = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    const { data: profile } = await supabase.from("profiles").select("first_name").eq("id", session.user.id).single();
    if (profile) setStudentName(profile.first_name);

    const { data } = await supabase.from("tickets").select("*").eq("student_id", session.user.id).order("created_at", { ascending: false });

    if (data) setTickets(data as Ticket[]);
    setIsLoading(false);
  };

  const sendTicketAlert = async (subject: string, department: string, message: string, student: string) => {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
    const text = `🚨 *New Ticket*\n\n👤 *Student:* ${student}\n🏢 *Dept:* ${department}\n📌 *Subject:* ${subject}\n\n💬 *Message:*\n${message}`;
    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: text, parse_mode: "Markdown" })
      });
    } catch (err) {
      console.error("Ticket alert failed", err);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    try {
      const { data: newTicket, error: ticketError } = await supabase.from("tickets").insert({
        student_id: session.user.id, subject: ticketForm.subject, department: ticketForm.department, status: "open"
      }).select().single();
      if (ticketError) throw ticketError;

      await supabase.from("ticket_messages").insert({
        ticket_id: newTicket.id, sender_id: session.user.id, message_text: ticketForm.message
      });

      await sendTicketAlert(ticketForm.subject, ticketForm.department, ticketForm.message, studentName);

      setIsModalOpen(false);
      setTicketForm({ subject: "", department: "Technical", message: "" });
      fetchTickets();
      alert("Ticket submitted!");
    } catch (error) {
      console.error("Error creating ticket:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendLiveChat = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!chatInput.trim() || isAiTyping) return;

    const userText = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { id: Date.now().toString(), role: "user", content: userText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setIsAiTyping(true);

    try {
      const historyForApi = chatMessages.map(msg => ({
        role: msg.role === "user" ? "user" : "model", parts: [{ text: msg.content }]
      }));
      historyForApi.push({ role: "user", parts: [{ text: userText }] });

      const res = await fetch("/api/support/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userText, history: historyForApi, studentName, isAgentMode })
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      if (data.isTransfer && !isAgentMode) setIsAgentMode(true);

      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), role: isAgentMode || data.isTransfer ? "agent" : "ai",
        content: data.text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error: any) {
      setChatMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), role: "ai",
        content: `Error: ${error.message}. Please create a ticket.`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsAiTyping(false);
    }
  };

  return (
    <div className="w-full relative min-h-screen pb-12">
      <header className="h-24 px-8 md:px-12 flex justify-between items-center animate-[fadeIn_0.5s_ease-out] border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-20">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Support <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Center</span></h1>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex px-6 py-3 bg-white/5 hover:bg-yellow-500 text-white hover:text-black font-extrabold rounded-xl transition-all items-center gap-2">New Ticket</button>
      </header>

      <div className="px-8 md:px-12 pt-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-8 bg-neutral-900/40 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md w-fit">
            <button onClick={() => setActiveTab("tickets")} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "tickets" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-white"}`}>My Tickets</button>
            <button onClick={() => setActiveTab("live-chat")} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "live-chat" ? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]" : "text-neutral-500 hover:text-white"}`}>Live Chat</button>
          </div>

          {activeTab === "tickets" && (
            <div className="space-y-4">
              {isLoading ? (
                [1, 2].map(i => <div key={i} className="h-24 bg-neutral-900/40 rounded-2xl border border-white/5 animate-pulse"></div>)
              ) : tickets.length > 0 ? (
                tickets.map(t => (
                  <div key={t.id} className="bg-neutral-900/40 border border-white/5 p-5 rounded-2xl flex items-center justify-between">
                    <div><span className="text-yellow-500 text-[10px] font-bold uppercase">{t.status}</span><h4 className="text-lg font-extrabold text-white">{t.subject}</h4></div>
                  </div>
                ))
              ) : (
                <div className="bg-neutral-900/40 p-12 rounded-[2rem] border border-white/5 text-center"><h3 className="text-xl font-bold text-white mb-2">No Support Tickets</h3><button onClick={() => setIsModalOpen(true)} className="px-6 py-2.5 bg-white/10 text-white font-bold rounded-xl mt-4">Create Ticket</button></div>
              )}
            </div>
          )}

          {activeTab === "live-chat" && (
            <div className="bg-neutral-900/60 border border-white/10 rounded-[2rem] overflow-hidden flex flex-col h-[600px] shadow-2xl">
              <div className="bg-black/40 p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center relative ${isAgentMode ? "bg-blue-500/20 text-blue-500" : "bg-gradient-to-br from-yellow-400 to-yellow-600"}`}>
                    {isAgentMode ? <span className="text-xl">🎧</span> : <img src="/logo-without-b.png" alt="AI" className="w-6 h-6 object-contain" />}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">{isAgentMode ? "Live Agent" : "Safi AI Support v4.1"}</h3>
                    <p className="text-green-400 text-[10px] font-bold uppercase">{isAgentMode ? "Human Connected" : "Online"}</p>
                  </div>
                </div>
                {!isAgentMode && <button onClick={() => setChatInput("Talk to agent")} className="text-[10px] bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-neutral-400 hover:text-white">Talk to Human</button>}
              </div>

              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4">
                <div className="flex justify-start"><div className="bg-neutral-800 border border-white/5 text-neutral-200 p-4 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">Hello {studentName}! I'm Safi AI. How can I assist you?</div></div>
                {chatMessages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`p-4 rounded-2xl max-w-[80%] text-sm ${msg.role === "user" ? "bg-yellow-500 text-black rounded-tr-sm font-medium" : msg.role === "agent" ? "bg-blue-600/20 border border-blue-500/30 text-white rounded-tl-sm" : "bg-neutral-800 border border-white/5 text-neutral-200 rounded-tl-sm"}`}>{msg.content}</div>
                  </div>
                ))}
                {isAiTyping && <div className="flex justify-start"><div className="bg-neutral-800 p-4 rounded-2xl flex gap-1.5"><div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:-.2s]"></div><div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:-.4s]"></div></div></div>}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendLiveChat} className="p-4 bg-black/40 border-t border-white/5 flex gap-2">
                <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Type message..." className="flex-1 bg-neutral-900 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-yellow-500/50" />
                <button type="submit" disabled={!chatInput.trim() || isAiTyping} className="w-12 h-12 bg-yellow-500 text-black rounded-xl hover:bg-yellow-400 disabled:opacity-50">↗</button>
              </form>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-[#050505]/80" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-neutral-900/95 border border-white/10 rounded-[2.5rem] p-8 z-10">
            <h2 className="text-2xl font-extrabold text-white mb-6">Open Support Ticket</h2>
            <form onSubmit={handleCreateTicket} className="space-y-5">
              <input required placeholder="Subject" value={ticketForm.subject} onChange={e => setTicketForm({...ticketForm, subject: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white" />
              <textarea required placeholder="Message" value={ticketForm.message} onChange={e => setTicketForm({...ticketForm, message: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white min-h-[120px]" />
              <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-yellow-500 text-black font-extrabold rounded-xl hover:bg-yellow-400 disabled:opacity-50">Submit Ticket</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}