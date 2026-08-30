"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  ArrowLeft, Send, Loader2, ShieldCheck, User as UserIcon,
  BotMessageSquare, Paperclip, FileText, Download, X
} from "lucide-react";

type TicketMessage = {
  id: string;
  sender_id: string | null;
  message_text: string;
  attachment_url: string | null;
  created_at: string;
};

type TicketInfo = {
  id: string;
  subject: string;
  department: string;
  status: string;
  student_id: string;
};

export default function AdminTicketChatScreen({ params }: { params: { id: string } }) {
  const router = useRouter();
  const supabase = createClient();
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [ticket, setTicket] = useState<TicketInfo | null>(null);
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const initChat = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/en/login");
        return;
      }
      setAdminId(user.id);

      if (params.id) {
        await fetchTicketAndMessages(params.id);
      }
    };
    initChat();
  }, [params.id]);

  useEffect(() => {
    if (!params.id) return;
    const interval = setInterval(() => {
      fetchTicketAndMessages(params.id, true);
    }, 3000);

    return () => clearInterval(interval);
  }, [params.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchTicketAndMessages = async (ticketId: string, isSilent = false) => {
    try {
      const { data: ticketData, error: ticketError } = await supabase
        .from("tickets")
        .select("*")
        .eq("id", ticketId)
        .single();

      if (ticketError) throw ticketError;
      if (ticketData) setTicket(ticketData as TicketInfo);

      const { data: msgsData, error: msgsError } = await supabase
        .from("ticket_messages")
        .select("*")
        .eq("ticket_id", ticketId)
        .order("created_at", { ascending: true });

      if (msgsError) throw msgsError;
      if (msgsData) setMessages(msgsData as TicketMessage[]);

    } catch (error) {
      console.error("Error fetching ticket chat data:", error);
    } finally {
      if (!isSilent) setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = newMessage.trim();
    if ((!text && !selectedFile) || !ticket || !adminId) return;

    setNewMessage("");
    setIsSending(true);

    try {
      let attachmentUrl = null;

      if (selectedFile) {
        setIsUploading(true);
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${ticket.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('support')
          .upload(filePath, selectedFile);

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from('support')
            .getPublicUrl(filePath);
          attachmentUrl = publicUrlData.publicUrl;
        }
        setSelectedFile(null);
        setIsUploading(false);
      }

      const { error: insertError } = await supabase.from("ticket_messages").insert({
        ticket_id: ticket.id,
        sender_id: adminId,
        message_text: text || "File attached",
        attachment_url: attachmentUrl
      });

      if (insertError) throw insertError;

      if (ticket.status !== "open") {
        await supabase.from("tickets").update({ status: "open" }).eq("id", ticket.id);
        setTicket(prev => prev ? { ...prev, status: "open" } : null);
      }

      await fetchTicketAndMessages(ticket.id, true);

    } catch (error) {
      console.error("Failed to send admin reply:", error);
    } finally {
      setIsSending(false);
      setIsUploading(false);
    }
  };

  const toggleCloseTicket = async () => {
    if (!ticket) return;
    const newStatus = ticket.status === "closed" ? "open" : "closed";

    try {
      const { error } = await supabase
        .from("tickets")
        .update({ status: newStatus })
        .eq("id", ticket.id);

      if (!error) {
        setTicket(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="h-full w-full bg-[#030305] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-rose-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative flex-1 h-screen bg-[#030305] text-white font-sans flex flex-col overflow-hidden">

      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-rose-600/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/5 rounded-full blur-[150px]"></div>
      </div>

      {/* HEADER */}
      <header className="h-[80px] shrink-0 bg-[#060609]/90 backdrop-blur-3xl border-b border-white/[0.06] flex items-center justify-between px-6 sm:px-10 z-20 relative shadow-xl">
        <div className="flex items-center gap-5">
          <button
            onClick={() => router.push("/en/admin/tickets")}
            className="w-10 h-10 rounded-full bg-white/[0.03] hover:bg-white/[0.08] flex items-center justify-center transition-all border border-white/[0.08]"
          >
            <ArrowLeft size={18} className="text-neutral-400 hover:text-white" />
          </button>
          <div className="flex flex-col">
            <h2 className="text-sm font-black tracking-widest uppercase text-white truncate max-w-[200px] sm:max-w-md">
              {ticket?.subject || "Support Live Chat"}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${ticket?.status === "closed" ? "bg-rose-500" : "bg-emerald-400 animate-pulse"}`}></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                Status: {ticket?.status}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={toggleCloseTicket}
          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${ticket?.status === "closed"
            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
            : "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20"
            }`}
        >
          {ticket?.status === "closed" ? "Reopen Ticket" : "Close Ticket"}
        </button>
      </header>

      {/* CHAT MESSAGES CONTAINER */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-8 pt-10 pb-36 space-y-6 custom-scrollbar scroll-smooth relative z-10">

        {messages.map((msg) => {
          const isAIOrSystem = msg.sender_id === null;
          const isStudent = msg.sender_id === ticket?.student_id;
          const isAdmin = !isAIOrSystem && !isStudent;

          let bubbleClass = "";
          let icon = null;
          let senderName = "";

          if (isAdmin) {
            bubbleClass = "bg-gradient-to-br from-rose-600/90 to-purple-800/90 text-white rounded-[1.5rem] rounded-br-[4px] shadow-lg";
            icon = <ShieldCheck size={12} className="text-rose-200" />;
            senderName = "Support Agent (You)";
          } else if (isStudent) {
            bubbleClass = "bg-white/[0.04] backdrop-blur-2xl border border-white/10 text-neutral-200 rounded-[1.5rem] rounded-tl-sm shadow-xl";
            icon = <UserIcon size={12} className="text-blue-400" />;
            senderName = "Student";
          } else {
            bubbleClass = "bg-white/[0.02] backdrop-blur-2xl border border-amber-500/20 text-neutral-300 rounded-[1.5rem] rounded-tl-sm shadow-xl";
            icon = <BotMessageSquare size={12} className="text-amber-400" />;
            senderName = "Safi AI / System";
          }

          return (
            <div key={msg.id} className={`flex w-full ${isAdmin ? "justify-end" : "justify-start"}`}>
              <div className={`flex flex-col gap-1.5 max-w-[85%] sm:max-w-[65%] ${isAdmin ? "items-end" : "items-start"}`}>
                <div className={`flex items-center gap-2 px-1 ${isAdmin ? "flex-row-reverse" : "flex-row"}`}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-white/[0.05]">{icon}</div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{senderName}</span>
                </div>

                <div className={`px-6 py-4 w-fit ${bubbleClass}`} style={{ direction: /[\u0600-\u06FF]/.test(msg.message_text) ? 'rtl' : 'ltr' }}>
                  <p className="text-[14px] font-medium leading-[1.7] whitespace-pre-wrap tracking-wide">{msg.message_text}</p>

                  {msg.attachment_url && (
                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
                      <a href={msg.attachment_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-rose-300 hover:underline">
                        <FileText size={16} /> View Attachment <Download size={14} />
                      </a>
                    </div>
                  )}
                </div>

                <span className="text-[9px] text-neutral-600 font-bold px-2">{formatTime(msg.created_at)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* INPUT AREA */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 pb-safe bg-gradient-to-t from-[#030305] via-[#030305]/90 to-transparent z-35">
        {selectedFile && (
          <div className="max-w-3xl mx-auto mb-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 flex items-center justify-between">
            <span className="text-xs text-neutral-300 truncate">📎 {selectedFile.name}</span>
            <button onClick={() => setSelectedFile(null)} className="text-neutral-400 hover:text-white"><X size={16} /></button>
          </div>
        )}

        <form
          onSubmit={handleSendMessage}
          className="max-w-3xl mx-auto bg-[#0a0a0e]/90 backdrop-blur-3xl border border-white/[0.08] rounded-full p-2 flex items-center gap-2 shadow-2xl transition-all focus-within:border-rose-500/40"
        >
          <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*,.pdf,.doc,.docx" />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-all ml-1"
          >
            <Paperclip size={18} />
          </button>

          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={ticket?.status === "closed" || isSending || isUploading}
            placeholder={ticket?.status === "closed" ? "Ticket is closed. Reopen to reply." : "Type your official response as support..."}
            className="flex-1 bg-transparent border-none px-4 py-3.5 text-[14px] font-medium text-white placeholder-neutral-600 focus:outline-none focus:ring-0 disabled:opacity-50"
            style={{ direction: /[\u0600-\u06FF]/.test(newMessage) ? 'rtl' : 'ltr' }}
          />

          <button
            type="submit"
            disabled={(!newMessage.trim() && !selectedFile) || ticket?.status === "closed" || isSending || isUploading}
            className="w-[46px] h-[46px] rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shrink-0 disabled:opacity-30 transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            {isSending || isUploading ? <Loader2 size={18} className="animate-spin" /> : <Send size={16} className="ml-0.5" />}
          </button>
        </form>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
}