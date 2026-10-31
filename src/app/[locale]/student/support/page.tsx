"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import {
  Headset,
  Plus,
  Send,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Paperclip,
  ChevronRight,
  ShieldCheck,
  LifeBuoy,
  X
} from "lucide-react";

interface Ticket {
  id: string;
  subject: string;
  department: string;
  status: "open" | "in_progress" | "resolved" | "closed" | string;
  created_at: string;
}

interface TicketMessage {
  id: string;
  ticket_id: string;
  sender_id: string | null;
  message_text: string;
  attachment_url: string | null;
  created_at: string;
}

export default function StudentSupportPage() {
  const router = useRouter();
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [newMessageText, setNewMessageText] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  // New ticket modal
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newDepartment, setNewDepartment] = useState("academic");
  const [newInitialMessage, setNewInitialMessage] = useState("");
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadTickets() {
      try {
        const supabase = createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          router.replace(`/${currentLocale}/login`);
          return;
        }

        setUserId(user.id);

        const { data, error } = await supabase
          .from("tickets")
          .select("id, subject, department, status, created_at")
          .eq("student_id", user.id)
          .order("created_at", { ascending: false });

        if (!isMounted) return;

        if (data && data.length > 0) {
          setTickets(data);
          setActiveTicket(data[0]);
        }
      } catch (err) {
        console.error("Error loading tickets:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadTickets();

    return () => {
      isMounted = false;
    };
  }, [router, currentLocale]);

  // Load messages whenever activeTicket changes
  useEffect(() => {
    if (!activeTicket) return;

    let isMounted = true;

    async function loadMessages() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("ticket_messages")
          .select("id, ticket_id, sender_id, message_text, attachment_url, created_at")
          .eq("ticket_id", activeTicket.id)
          .order("created_at", { ascending: true });

        if (isMounted && data) {
          setMessages(data);
        }
      } catch (err) {
        console.error("Error loading ticket messages:", err);
      }
    }

    loadMessages();

    return () => {
      isMounted = false;
    };
  }, [activeTicket]);

  // Send message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() || !activeTicket || !userId) return;

    try {
      setIsSendingMessage(true);
      const supabase = createClient();

      const { data, error } = await supabase
        .from("ticket_messages")
        .insert({
          ticket_id: activeTicket.id,
          sender_id: userId,
          message_text: newMessageText.trim(),
        })
        .select()
        .single();

      if (!error && data) {
        setMessages(prev => [...prev, data]);
        setNewMessageText("");
      }
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setIsSendingMessage(false);
    }
  };

  // Create new ticket
  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newInitialMessage.trim() || !userId) return;

    try {
      setIsSubmittingTicket(true);
      const supabase = createClient();

      // 1. Insert ticket
      const { data: ticketData, error: ticketError } = await supabase
        .from("tickets")
        .insert({
          student_id: userId,
          subject: newSubject.trim(),
          department: newDepartment,
          status: "open"
        })
        .select()
        .single();

      if (ticketError || !ticketData) {
        throw ticketError || new Error("Failed to create ticket");
      }

      // 2. Insert initial message
      await supabase
        .from("ticket_messages")
        .insert({
          ticket_id: ticketData.id,
          sender_id: userId,
          message_text: newInitialMessage.trim()
        });

      setTickets(prev => [ticketData, ...prev]);
      setActiveTicket(ticketData);
      setIsNewModalOpen(false);
      setNewSubject("");
      setNewInitialMessage("");
    } catch (err) {
      console.error("Error creating ticket:", err);
    } finally {
      setIsSubmittingTicket(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#030305] text-white p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-pulse" dir={isRtl ? "rtl" : "ltr"}>
        <div className="h-44 bg-neutral-900/60 rounded-[2.5rem] border border-white/5"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-96 bg-neutral-900/50 rounded-3xl border border-white/5"></div>
          <div className="lg:col-span-2 h-96 bg-neutral-900/50 rounded-3xl border border-white/5"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#030305] text-white font-sans selection:bg-[#C2185B] selection:text-white pb-32" dir={isRtl ? "rtl" : "ltr"}>

      {/* Background Ambience */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-sky-500/10 via-[#C2185B]/10 to-transparent rounded-full blur-[160px] pointer-events-none -z-10"></div>

      <div className="px-4 sm:px-6 md:px-10 pt-6 md:pt-10 max-w-7xl mx-auto space-y-8 relative z-10">

        {/* 1. HERO BANNER */}
        <section className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-[#0c0f18]/95 via-[#080a10]/90 to-[#030306] border border-white/10 p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/15 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <LifeBuoy size={12} className="text-sky-400" />
                {isRtl ? "مرکز پشتیبانی مستقیم دانشجویان" : "Direct Scholar Desk"}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                {isRtl ? "تیکت‌ها و مکاتبات پشتیبانی" : "Support Tickets & Helpdesk"}
              </h1>

              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
                {isRtl
                  ? "ارسال درخواست‌های پشتیبانی آموزشی، مالی و فنی. تیم اساتید و کارشناسان آکادمی صافی به‌صورت پیوسته پاسخ‌گوی شما هستند."
                  : "Submit and track academic inquiries, financial matters, and technical questions directly with faculty and support agents."
                }
              </p>
            </div>

            <button
              onClick={() => setIsNewModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-black text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(14,165,233,0.3)] cursor-pointer"
            >
              <Plus size={16} />
              {isRtl ? "ثبت تیکت جدید" : "Create New Ticket"}
            </button>
          </div>
        </section>

        {/* 2. TICKETS WORKSPACE */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left Column: Tickets List (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-[#0c0d16] to-[#05060a] border border-white/10 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span className="text-xs font-black uppercase tracking-wider text-neutral-400">
                {isRtl ? "تیکت‌های من" : "My Tickets"}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400">
                {tickets.length}
              </span>
            </div>

            {tickets.length > 0 ? (
              <div className="space-y-2.5 max-h-[560px] overflow-y-auto custom-scrollbar">
                {tickets.map((t) => {
                  const isSelected = activeTicket?.id === t.id;
                  const isOpen = t.status === "open";
                  const isResolved = t.status === "resolved" || t.status === "closed";

                  return (
                    <div
                      key={t.id}
                      onClick={() => setActiveTicket(t)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                        isSelected
                          ? "bg-white/[0.08] border-sky-500/40 shadow-md"
                          : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-neutral-400">
                          {t.department}
                        </span>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                          isOpen ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          isResolved ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}>
                          {t.status}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-white truncate mb-1">
                        {t.subject}
                      </h4>

                      <span className="text-[9px] text-neutral-500 font-mono">
                        {new Date(t.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-neutral-500 text-xs font-bold">
                {isRtl ? "تیکتی ثبت نشده است." : "No tickets yet."}
              </div>
            )}
          </div>

          {/* Right Column: Ticket Conversation Window (8 cols) */}
          <div className="lg:col-span-8 rounded-3xl bg-gradient-to-br from-[#0c0d16] to-[#05060a] border border-white/10 p-6 flex flex-col justify-between min-h-[560px] shadow-xl">
            {activeTicket ? (
              <div className="flex flex-col h-full justify-between space-y-6">

                {/* Ticket Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/5">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2.5 h-2.5 rounded-full ${activeTicket.status === 'open' ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
                      <h3 className="text-base font-black text-white">{activeTicket.subject}</h3>
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {isRtl ? "دپارتمان:" : "Department:"} {activeTicket.department} | {new Date(activeTicket.created_at).toLocaleString()}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                    Status: {activeTicket.status}
                  </span>
                </div>

                {/* Messages Chat Stream */}
                <div className="flex-1 space-y-4 max-h-[360px] overflow-y-auto custom-scrollbar pr-2 pl-2">
                  {messages.map((m) => {
                    const isMe = m.sender_id === userId;

                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                      >
                        <div className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed ${
                          isMe
                            ? 'bg-sky-600/20 border border-sky-500/30 text-white rounded-br-none'
                            : 'bg-white/[0.05] border border-white/10 text-neutral-200 rounded-bl-none'
                        }`}>
                          <span className="text-[9px] font-black uppercase text-neutral-400 block mb-1">
                            {isMe ? (isRtl ? "شما" : "You") : (isRtl ? "پشتیبان آکادمی صافی" : "Safi Support Team")}
                          </span>
                          <p className="whitespace-pre-wrap">{m.message_text}</p>
                          {m.attachment_url && (
                            <a
                              href={m.attachment_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center gap-1.5 text-[10px] text-sky-400 underline"
                            >
                              <Paperclip size={12} /> {isRtl ? "مشاهده پیوست" : "View Attachment"}
                            </a>
                          )}
                        </div>
                        <span className="text-[9px] text-neutral-500 font-mono mt-1 px-1">
                          {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSendMessage} className="pt-4 border-t border-white/5 flex items-center gap-3">
                  <input
                    type="text"
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    placeholder={isRtl ? "پاسخ خود را بنویسید..." : "Type your reply message..."}
                    className="flex-1 py-3 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-sky-500/50 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isSendingMessage || !newMessageText.trim()}
                    className="px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send size={14} className={isRtl ? "rotate-180" : ""} />
                    {isRtl ? "ارسال" : "Send"}
                  </button>
                </form>

              </div>
            ) : (
              <div className="py-24 text-center text-neutral-500 text-xs font-bold space-y-3">
                <MessageSquare size={32} className="mx-auto text-neutral-600" />
                <p>{isRtl ? "یک تیکت را برای مشاهده پیام‌ها انتخاب کنید." : "Select a ticket from the left to view messages."}</p>
              </div>
            )}
          </div>

        </section>

      </div>

      {/* CREATE NEW TICKET MODAL */}
      {isNewModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b0c15] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 relative">
            <button
              onClick={() => setIsNewModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-black text-white">
              {isRtl ? "ثبت تیکت پشتیبانی جدید" : "Create Support Ticket"}
            </h3>

            <form onSubmit={handleCreateTicket} className="space-y-4 text-start">
              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1.5">
                  {isRtl ? "عنوان درخواست" : "Subject"}
                </label>
                <input
                  type="text"
                  required
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder={isRtl ? "مثال: سوال درباره ویدیوی جلسه چهارم..." : "e.g. Question regarding Session 4 assignment..."}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-sky-500/50"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1.5">
                  {isRtl ? "دپارتمان مربوطه" : "Department"}
                </label>
                <select
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-sky-500/50"
                >
                  <option value="academic" className="bg-[#0b0b14]">{isRtl ? "آموزشی و اساتید" : "Academic & Faculty"}</option>
                  <option value="technical" className="bg-[#0b0b14]">{isRtl ? "فنی و دسترسی کلاس" : "Technical & Platform"}</option>
                  <option value="finance" className="bg-[#0b0b14]">{isRtl ? "مالی و کیف پول" : "Financial & Wallet"}</option>
                  <option value="general" className="bg-[#0b0b14]">{isRtl ? "عمومی و راهنمایی" : "General Inquiries"}</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1.5">
                  {isRtl ? "شرح درخواست یا مشکل" : "Detailed Message"}
                </label>
                <textarea
                  required
                  rows={4}
                  value={newInitialMessage}
                  onChange={(e) => setNewInitialMessage(e.target.value)}
                  placeholder={isRtl ? "شرح کامل سوال یا موضوع مورد نظر..." : "Provide full context so we can resolve your issue quickly..."}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-sky-500/50"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold"
                >
                  {isRtl ? "انصراف" : "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingTicket}
                  className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black text-xs font-black uppercase tracking-wider disabled:opacity-50"
                >
                  {isSubmittingTicket ? (isRtl ? "در حال ثبت..." : "Submitting...") : (isRtl ? "ثبت تیکت" : "Submit Ticket")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
