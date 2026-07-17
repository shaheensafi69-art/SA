"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Loader2, ArrowLeft, Ticket, Search, CheckCircle2, AlertCircle, XCircle, Send, Clock, User, MessageSquare, ShieldAlert, Check } from "lucide-react";

type ProfileInfo = {
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  email: string;
};

type TicketItem = {
  id: string;
  student_id: string;
  subject: string;
  department: string;
  status: "OPEN" | "CLOSED" | "PENDING";
  created_at: string;
  student: ProfileInfo | null;
};

type TicketMessage = {
  id: string;
  ticket_id: string;
  sender_id: string;
  message_text: string;
  created_at: string;
  sender: ProfileInfo | null;
};

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "OPEN" | "CLOSED">("ALL");

  // Selected Ticket State
  const [selectedTicket, setSelectedTicket] = useState<TicketItem | null>(null);
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const fetchTickets = async () => {
    setIsLoading(true);
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from("tickets")
        .select(`
          *,
          student:profiles!student_id(first_name, last_name, avatar_url, email)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) {
        const formatted = data.map((t: any) => ({
          ...t,
          student: Array.isArray(t.student) ? t.student[0] : t.student
        }));
        setTickets(formatted);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTicket = async (ticket: TicketItem) => {
    setSelectedTicket(ticket);
    setIsLoadingMessages(true);
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from("ticket_messages")
        .select(`
          *,
          sender:profiles!sender_id(first_name, last_name, avatar_url, email)
        `)
        .eq("ticket_id", ticket.id)
        .order("created_at", { ascending: true });

      if (error) throw error;
      
      if (data) {
        const formattedMessages = data.map((m: any) => ({
          ...m,
          sender: Array.isArray(m.sender) ? m.sender[0] : m.sender
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const toggleTicketStatus = async () => {
    if (!selectedTicket) return;
    
    const newStatus = selectedTicket.status === "CLOSED" ? "OPEN" : "CLOSED";
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from("tickets")
        .update({ status: newStatus })
        .eq("id", selectedTicket.id);

      if (error) throw error;

      // Update Local State
      const updatedTicket = { ...selectedTicket, status: newStatus as "OPEN" | "CLOSED" };
      setSelectedTicket(updatedTicket);
      setTickets(prev => prev.map(t => t.id === updatedTicket.id ? updatedTicket : t));

    } catch (error) {
      console.error("Error updating ticket status:", error);
      alert("Failed to update status.");
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !replyText.trim()) return;

    setIsSending(true);
    const supabase = createClient();

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const adminId = session?.user?.id;

      const { data: newMessage, error } = await supabase
        .from("ticket_messages")
        .insert({
          ticket_id: selectedTicket.id,
          sender_id: adminId,
          message_text: replyText.trim()
        })
        .select(`
          *,
          sender:profiles!sender_id(first_name, last_name, avatar_url, email)
        `)
        .single();

      if (error) throw error;

      // If ticket was closed, reopen it automatically when admin replies
      if (selectedTicket.status === "CLOSED") {
        await supabase.from("tickets").update({ status: "OPEN" }).eq("id", selectedTicket.id);
        const updatedTicket = { ...selectedTicket, status: "OPEN" as const };
        setSelectedTicket(updatedTicket);
        setTickets(prev => prev.map(t => t.id === updatedTicket.id ? updatedTicket : t));
      }

      const formattedMessage = { ...newMessage, sender: Array.isArray(newMessage.sender) ? newMessage.sender[0] : newMessage.sender };
      setMessages(prev => [...prev, formattedMessage]);
      setReplyText("");

    } catch (error) {
      console.error("Error sending reply:", error);
      alert("Failed to send reply.");
    } finally {
      setIsSending(false);
    }
  };

  const filteredTickets = useMemo(() => {
    let result = tickets;
    if (filterStatus !== "ALL") {
      result = result.filter(t => t.status === filterStatus);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.subject.toLowerCase().includes(query) || 
        t.student?.first_name.toLowerCase().includes(query) ||
        t.student?.last_name.toLowerCase().includes(query)
      );
    }
    return result;
  }, [tickets, searchQuery, filterStatus]);

  const stats = useMemo(() => {
    const open = tickets.filter(t => t.status === "OPEN").length;
    const closed = tickets.filter(t => t.status === "CLOSED").length;
    return { open, closed, total: tickets.length };
  }, [tickets]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Support Desk...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-8 relative overflow-hidden pb-32 lg:pb-8" dir="ltr">
      
      {/* Background Ambience */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto space-y-6 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 rounded-[2rem] border border-white/5 backdrop-blur-3xl shadow-xl flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div>
            <Link href="/en/admin" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-blue-400 transition-colors mb-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <ArrowLeft size={14} /> Command Center
            </Link>
            <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
              Support <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Desk</span>
            </h1>
          </div>

          <div className="flex gap-3">
            <div className="bg-blue-500/10 border border-blue-500/20 px-4 py-3 rounded-xl flex items-center gap-3">
              <AlertCircle size={16} className="text-blue-400"/>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-blue-500/70">Open Tickets</p>
                <p className="text-xl font-black text-blue-400 leading-none">{stats.open}</p>
              </div>
            </div>
            <div className="bg-neutral-900/50 border border-white/5 px-4 py-3 rounded-xl flex items-center gap-3 hidden sm:flex">
              <CheckCircle2 size={16} className="text-neutral-500"/>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Resolved</p>
                <p className="text-xl font-black text-neutral-400 leading-none">{stats.closed}</p>
              </div>
            </div>
          </div>
        </header>

        {/* ================= MAIN LAYOUT (2 Columns) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] xl:grid-cols-[400px_1fr] gap-6 h-[calc(100vh-220px)] min-h-[600px]">
          
          {/* LEFT COLUMN: TICKET LIST */}
          <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2rem] flex flex-col overflow-hidden shadow-xl backdrop-blur-xl">
            
            {/* Search & Filters */}
            <div className="p-5 border-b border-white/5 space-y-4 shrink-0">
              <div className="bg-black/60 p-2 rounded-xl border border-white/5 flex items-center gap-2 shadow-inner">
                <div className="pl-2 text-neutral-500"><Search size={14} /></div>
                <input 
                  type="text" placeholder="Search subject or student..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-white text-xs focus:outline-none py-1.5 pr-2 placeholder:text-neutral-600"
                />
              </div>
              <div className="flex bg-black/40 rounded-xl p-1 border border-white/5">
                <button onClick={() => setFilterStatus("ALL")} className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${filterStatus === "ALL" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-white"}`}>All</button>
                <button onClick={() => setFilterStatus("OPEN")} className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${filterStatus === "OPEN" ? "bg-blue-500/20 text-blue-400" : "text-neutral-500 hover:text-white"}`}>Open</button>
                <button onClick={() => setFilterStatus("CLOSED")} className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${filterStatus === "CLOSED" ? "bg-neutral-800 text-neutral-300" : "text-neutral-500 hover:text-white"}`}>Closed</button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
              {filteredTickets.length === 0 ? (
                <div className="text-center py-10 text-neutral-600">
                  <Ticket size={32} className="mx-auto mb-2 opacity-30"/>
                  <p className="text-xs font-bold uppercase tracking-widest">No tickets found</p>
                </div>
              ) : (
                filteredTickets.map(ticket => (
                  <button 
                    key={ticket.id}
                    onClick={() => handleSelectTicket(ticket)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex flex-col gap-3 ${
                      selectedTicket?.id === ticket.id 
                        ? "bg-blue-500/10 border-blue-500/30" 
                        : "bg-black/20 border-transparent hover:bg-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h4 className={`text-sm font-bold line-clamp-1 ${selectedTicket?.id === ticket.id ? "text-blue-300" : "text-white"}`}>{ticket.subject}</h4>
                      <span className={`shrink-0 w-2 h-2 rounded-full ${ticket.status === "OPEN" ? "bg-blue-500 shadow-[0_0_8px_#3b82f6]" : "bg-neutral-600"}`}></span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-neutral-800 overflow-hidden flex items-center justify-center shrink-0">
                        {ticket.student?.avatar_url ? <img src={ticket.student.avatar_url} className="w-full h-full object-cover"/> : <User size={12} className="text-neutral-500"/>}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-neutral-400 truncate">{ticket.student?.first_name} {ticket.student?.last_name}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-neutral-500 pt-2 border-t border-white/5">
                      <span>{ticket.department}</span>
                      <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: CHAT & DETAILS */}
          <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2rem] flex flex-col overflow-hidden shadow-xl backdrop-blur-xl relative">
            {!selectedTicket ? (
              <div className="flex-1 flex flex-col items-center justify-center text-neutral-600">
                <MessageSquare size={64} className="mb-4 opacity-20"/>
                <p className="text-sm font-bold">Select a ticket from the left panel to view details.</p>
              </div>
            ) : (
              <>
                {/* Chat Header */}
                <div className="p-5 sm:p-6 border-b border-white/5 shrink-0 bg-black/20 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-white mb-1">{selectedTicket.subject}</h2>
                    <div className="flex items-center gap-3 text-xs text-neutral-400 font-medium">
                      <span className="flex items-center gap-1"><User size={12}/> {selectedTicket.student?.first_name} {selectedTicket.student?.last_name}</span>
                      <span className="flex items-center gap-1"><Clock size={12}/> {new Date(selectedTicket.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                  <button 
                    onClick={toggleTicketStatus}
                    className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-sm shrink-0 ${
                      selectedTicket.status === "OPEN" 
                        ? "bg-white/5 border border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 text-neutral-300"
                        : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                    }`}
                  >
                    {selectedTicket.status === "OPEN" ? <><XCircle size={14}/> Close Ticket</> : <><Check size={14}/> Reopen Ticket</>}
                  </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-8 space-y-6">
                  {isLoadingMessages ? (
                    <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 text-blue-500 animate-spin" /></div>
                  ) : messages.length === 0 ? (
                    <div className="text-center py-10 text-neutral-600 text-sm">No messages in this ticket yet.</div>
                  ) : (
                    messages.map((msg, i) => {
                      const isAdmin = msg.sender_id !== selectedTicket.student_id;
                      return (
                        <div key={msg.id} className={`flex gap-4 max-w-[85%] ${isAdmin ? "ml-auto flex-row-reverse" : ""}`}>
                          {/* Avatar */}
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-neutral-800 border border-white/10 shrink-0 overflow-hidden flex items-center justify-center">
                            {msg.sender?.avatar_url ? <img src={msg.sender.avatar_url} className="w-full h-full object-cover" /> : <User size={16} className="text-neutral-500"/>}
                          </div>
                          
                          {/* Bubble */}
                          <div className={`flex flex-col ${isAdmin ? "items-end" : "items-start"}`}>
                            <div className="flex items-center gap-2 mb-1.5 px-1">
                              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                                {isAdmin ? "Support Agent" : msg.sender?.first_name}
                              </span>
                              <span className="text-[9px] text-neutral-600 font-mono">{new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </div>
                            <div className={`p-4 sm:p-5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                              isAdmin 
                                ? "bg-blue-600 text-white rounded-tr-sm shadow-[0_5px_15px_rgba(37,99,235,0.2)]" 
                                : "bg-white/5 border border-white/10 text-neutral-200 rounded-tl-sm"
                            }`}>
                              {msg.message_text}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Reply Input Area */}
                <div className="p-4 sm:p-5 border-t border-white/5 bg-black/40 shrink-0">
                  {selectedTicket.status === "CLOSED" && (
                    <div className="text-center p-3 mb-3 bg-neutral-900/50 border border-white/5 rounded-xl text-xs text-neutral-400 flex items-center justify-center gap-2">
                      <ShieldAlert size={14}/> This ticket is marked as resolved. Replying will reopen it automatically.
                    </div>
                  )}
                  <form onSubmit={handleSendReply} className="relative">
                    <textarea 
                      required
                      placeholder="Type your official response..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendReply(e);
                        }
                      }}
                      className="w-full bg-black border border-white/10 rounded-2xl pl-4 pr-16 py-4 text-white text-sm focus:outline-none focus:border-blue-500/50 shadow-inner resize-none min-h-[60px] max-h-[150px] custom-scrollbar"
                      rows={2}
                    />
                    <button 
                      type="submit"
                      disabled={isSending || !replyText.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-white rounded-xl flex items-center justify-center transition-all shadow-md active:scale-95"
                    >
                      {isSending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="ml-1" />}
                    </button>
                  </form>
                </div>

              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}