"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import {
  Headset,
  Send,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Paperclip,
  Check,
  User,
  ShieldCheck,
  LifeBuoy
} from "lucide-react";

interface Ticket {
  id: string;
  student_id: string;
  subject: string;
  department: string;
  status: "open" | "in_progress" | "resolved" | "closed" | string;
  created_at: string;
  student: {
    first_name: string;
    last_name: string;
    avatar_url: string | null;
    email: string;
  } | null;
}

interface TicketMessage {
  id: string;
  ticket_id: string;
  sender_id: string | null;
  message_text: string;
  attachment_url: string | null;
  created_at: string;
}

export default function TeacherSupportPage() {
  const router = useRouter();
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [newMessageText, setNewMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "resolved">("all");

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

        setCurrentUserId(user.id);

        // Fetch tickets
        const { data, error } = await supabase
          .from("tickets")
          .select(`
            id,
            student_id,
            subject,
            department,
            status,
            created_at,
            profiles:student_id (
              first_name,
              last_name,
              avatar_url,
              email
            )
          `)
          .order("created_at", { ascending: false });

        if (!isMounted) return;

        if (data && data.length > 0) {
          const formatted: Ticket[] = data.map((t: any) => ({
            id: t.id,
            student_id: t.student_id,
            subject: t.subject,
            department: t.department,
            status: t.status,
            created_at: t.created_at,
            student: Array.isArray(t.profiles) ? t.profiles[0] : t.profiles
          }));

          setTickets(formatted);
          setActiveTicket(formatted[0]);
        }
      } catch (err) {
        console.error("Error loading tickets for teacher:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadTickets();

    return () => {
      isMounted = false;
    };
  }, [router, currentLocale]);

  // Load ticket conversation
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
    if (!newMessageText.trim() || !activeTicket || !currentUserId) return;

    try {
      setIsSending(true);
      const supabase = createClient();

      const { data, error } = await supabase
        .from("ticket_messages")
        .insert({
          ticket_id: activeTicket.id,
          sender_id: currentUserId,
          message_text: newMessageText.trim(),
        })
        .select()
        .single();

      if (!error && data) {
        setMessages(prev => [...prev, data]);
        setNewMessageText("");

        // If ticket was open, mark as in_progress
        if (activeTicket.status === "open") {
          await supabase
            .from("tickets")
            .update({ status: "in_progress" })
            .eq("id", activeTicket.id);

          setActiveTicket(prev => prev ? { ...prev, status: "in_progress" } : null);
          setTickets(prev =>
            prev.map(t => t.id === activeTicket.id ? { ...t, status: "in_progress" } : t)
          );
        }
      }
    } catch (err) {
      console.error("Error sending response:", err);
    } finally {
      setIsSending(false);
    }
  };

  // Toggle ticket status (resolve / reopen)
  const handleToggleStatus = async () => {
    if (!activeTicket) return;

    const newStatus = activeTicket.status === "resolved" ? "in_progress" : "resolved";

    try {
      const supabase = createClient();
      await supabase
        .from("tickets")
        .update({ status: newStatus })
        .eq("id", activeTicket.id);

      setActiveTicket(prev => prev ? { ...prev, status: newStatus } : null);
      setTickets(prev =>
        prev.map(t => t.id === activeTicket.id ? { ...t, status: newStatus } : t)
      );
    } catch (err) {
      console.error("Error updating ticket status:", err);
    }
  };

  const filteredTickets = tickets.filter(t => {
    if (statusFilter === "open") return t.status === "open" || t.status === "in_progress";
    if (statusFilter === "resolved") return t.status === "resolved" || t.status === "closed";
    return true;
  });

  const openCount = tickets.filter(t => t.status === "open" || t.status === "in_progress").length;
  const resolvedCount = tickets.filter(t => t.status === "resolved" || t.status === "closed").length;

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
    <div className="w-full min-h-screen bg-[#030305] text-white font-sans selection:bg-fuchsia-500 selection:text-white pb-32" dir={isRtl ? "rtl" : "ltr"}>

      {/* Background Ambience */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-fuchsia-500/10 via-purple-600/10 to-transparent rounded-full blur-[160px] pointer-events-none -z-10"></div>

      <div className="px-4 sm:px-6 md:px-10 pt-6 md:pt-10 max-w-7xl mx-auto space-y-8 relative z-10">

        {/* 1. HERO BANNER */}
        <section className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-[#140a18]/95 via-[#0d0610]/90 to-[#030306] border border-white/10 p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-500/15 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                <LifeBuoy size={12} className="text-fuchsia-400" />
                {isRtl ? "میز پاسخ‌گویی مستقیم اساتید به دانشجویان" : "Faculty Scholar Helpdesk"}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                {isRtl ? "پاسخ‌گویی به تیکت‌ها و سوالات درسی" : "Scholar Support & Inquiries"}
              </h1>

              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
                {isRtl
                  ? "پاسخ به ابهامات آموزشی، رفع اشکال تکالیف و ارتباط مستقیم با دانشجویان صنف‌های تحت نظارت شما."
                  : "Resolve academic inquiries, address assignment questions, and provide direct scholar guidance."
                }
              </p>
            </div>

            {/* Stats Pill */}
            <div className="flex items-center gap-3">
              <div className="px-6 py-4 rounded-2xl bg-white/[0.04] border border-white/10 shadow-lg flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Clock size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                    {isRtl ? "در انتظار پاسخ" : "Pending Replies"}
                  </span>
                  <span className="text-2xl font-black text-amber-400 font-mono">
                    {openCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. TICKETS WORKSPACE */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left Column: Tickets List (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-gradient-to-br from-[#0c0d16] to-[#05060a] border border-white/10 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-1.5 bg-white/[0.04] p-1 rounded-xl text-xs">
                <button
                  onClick={() => setStatusFilter("all")}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${statusFilter === "all" ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"}`}
                >
                  {isRtl ? "همه" : "All"} ({tickets.length})
                </button>
                <button
                  onClick={() => setStatusFilter("open")}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${statusFilter === "open" ? "bg-amber-500/20 text-amber-300" : "text-neutral-400 hover:text-white"}`}
                >
                  {isRtl ? "باز" : "Open"} ({openCount})
                </button>
                <button
                  onClick={() => setStatusFilter("resolved")}
                  className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${statusFilter === "resolved" ? "bg-emerald-500/20 text-emerald-300" : "text-neutral-400 hover:text-white"}`}
                >
                  {isRtl ? "حل‌شده" : "Resolved"} ({resolvedCount})
                </button>
              </div>
            </div>

            {filteredTickets.length > 0 ? (
              <div className="space-y-2.5 max-h-[580px] overflow-y-auto custom-scrollbar">
                {filteredTickets.map((t) => {
                  const isSelected = activeTicket?.id === t.id;
                  const isOpen = t.status === "open";
                  const isResolved = t.status === "resolved" || t.status === "closed";

                  return (
                    <div
                      key={t.id}
                      onClick={() => setActiveTicket(t)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                        isSelected
                          ? "bg-white/[0.08] border-fuchsia-500/40 shadow-md"
                          : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-neutral-800 border border-white/10 overflow-hidden flex items-center justify-center text-[10px] text-fuchsia-400 font-bold shrink-0">
                            {t.student?.avatar_url ? (
                              <img src={t.student.avatar_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              t.student?.first_name?.charAt(0) || "S"
                            )}
                          </div>
                          <span className="text-xs font-bold text-white truncate max-w-[130px]">
                            {t.student?.first_name} {t.student?.last_name}
                          </span>
                        </div>

                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                          isOpen ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          isResolved ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}>
                          {t.status}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-neutral-200 truncate mb-1">
                        {t.subject}
                      </h4>

                      <div className="flex items-center justify-between text-[9px] text-neutral-500 font-mono">
                        <span>{t.department}</span>
                        <span>{new Date(t.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-neutral-500 text-xs font-bold">
                {isRtl ? "تیکتی در این بخش وجود ندارد." : "No tickets in this section."}
              </div>
            )}
          </div>

          {/* Right Column: Ticket Conversation Window (8 cols) */}
          <div className="lg:col-span-8 rounded-3xl bg-gradient-to-br from-[#0c0d16] to-[#05060a] border border-white/10 p-6 flex flex-col justify-between min-h-[580px] shadow-xl">
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
                      {isRtl ? "دانشجو:" : "Scholar:"} {activeTicket.student?.first_name} {activeTicket.student?.last_name} ({activeTicket.student?.email})
                    </span>
                  </div>

                  {/* Resolve / Reopen Button */}
                  <button
                    onClick={handleToggleStatus}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      activeTicket.status === "resolved"
                        ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-black border border-amber-500/30"
                        : "bg-emerald-500 text-black hover:bg-emerald-400 shadow-md"
                    }`}
                  >
                    <CheckCircle2 size={14} />
                    {activeTicket.status === "resolved"
                      ? (isRtl ? "بازگشایی تیکت" : "Reopen Ticket")
                      : (isRtl ? "علامت‌گذاری حل‌شده" : "Mark as Resolved")
                    }
                  </button>
                </div>

                {/* Messages Chat Stream */}
                <div className="flex-1 space-y-4 max-h-[380px] overflow-y-auto custom-scrollbar pr-2 pl-2">
                  {messages.map((m) => {
                    const isFaculty = m.sender_id === currentUserId;

                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col ${isFaculty ? 'items-end' : 'items-start'}`}
                      >
                        <div className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed ${
                          isFaculty
                            ? 'bg-fuchsia-600/20 border border-fuchsia-500/30 text-white rounded-br-none'
                            : 'bg-white/[0.05] border border-white/10 text-neutral-200 rounded-bl-none'
                        }`}>
                          <span className="text-[9px] font-black uppercase text-neutral-400 block mb-1">
                            {isFaculty ? (isRtl ? "شما (استاد)" : "You (Faculty)") : (isRtl ? "پیام دانشجو" : "Scholar Message")}
                          </span>
                          <p className="whitespace-pre-wrap">{m.message_text}</p>
                          {m.attachment_url && (
                            <a
                              href={m.attachment_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center gap-1.5 text-[10px] text-fuchsia-400 underline"
                            >
                              <Paperclip size={12} /> {isRtl ? "مشاهده فایل پیوست" : "View Attached File"}
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
                    placeholder={isRtl ? "پاسخ راهنمایی به دانشجو را بنویسید..." : "Write educational reply to scholar..."}
                    className="flex-1 py-3 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-fuchsia-500/50 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isSending || !newMessageText.trim()}
                    className="px-6 py-3 rounded-xl bg-fuchsia-500 hover:bg-fuchsia-400 disabled:opacity-50 text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send size={14} className={isRtl ? "rotate-180" : ""} />
                    {isRtl ? "ارسال پاسخ" : "Send Reply"}
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
    </div>
  );
}
