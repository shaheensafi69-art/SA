"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { MessageCircle, Clock3, ChevronRight, Sparkles, LifeBuoy, ArrowLeft, Loader2 } from "lucide-react";

type SupportTicket = {
  id: string;
  subject: string;
  status: "open" | "answered" | "closed" | "escalated";
  created_at: string;
  last_message?: string;
};

export default function MinimalSupportPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false); // جلوگیری از کلیک‌های همزمان
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [firstName, setFirstName] = useState("");

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}`;
  };

  useEffect(() => {
    const fetchSupportData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name")
          .eq("id", user.id)
          .single();
        if (profile) setFirstName(profile.first_name);

        const { data, error } = await supabase
          .from("tickets")
          .select("id, subject, status, created_at")
          .eq("student_id", user.id)
          .order("created_at", { ascending: false });

        if (data && !error) {
          setTickets(data as SupportTicket[]);
        }
      } else {
        router.push("/en/login");
      }
      setIsLoading(false);
    };

    fetchSupportData();
  }, [router]);

  const getStatusStyle = (status: SupportTicket["status"]) => {
    switch (status) {
      case "open": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "answered": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "escalated": return "bg-pink-500/10 text-pink-400 border-pink-500/20";
      default: return "bg-white/5 text-neutral-400 border-white/10";
    }
  };

  const getStatusText = (status: SupportTicket["status"]) => {
    switch (status) {
      case "open": return "Pending";
      case "answered": return "Answered";
      case "escalated": return "Admin";
      default: return "Closed";
    }
  };

  // 🟢 تیکت جدید دقیقاً همینجا فقط یک‌بار ساخته می‌شود و بعد کاربر به صفحه چت می‌رود
  const startNewChat = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCreating) return; // جلوگیری از ساخت تیکت تکراری در صورت کلیک سریع
    setIsCreating(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/en/login");
      return;
    }

    // ساخت تیکت جدید در دیتابیس
    const { data: newTicket, error } = await supabase.from("tickets").insert({
      student_id: user.id,
      subject: "General Live Support",
      department: "Technical",
      status: "open"
    }).select().single();

    if (error || !newTicket) {
      alert("Error creating chat session.");
      setIsCreating(false);
      return;
    }

    // ثبت پیام خوش‌آمدگویی اولیه هوش مصنوعی
    await supabase.from("ticket_messages").insert({
      ticket_id: newTicket.id,
      sender_id: null,
      message_text: "Hello! I am Safi AI Support. How can I help you today? (سلام! من پشتیبان هوشمند سافی هستم. چطور می‌توانم کمکتان کنم؟)"
    });

    // هدایت به صفحه چت با شناسه واقعی تیکت (دیگر از /new استفاده نمی‌کنیم)
    router.push(`/en/support/chat/${newTicket.id}`);
  };

  const openChat = (ticketId: string) => {
    router.push(`/en/support/chat/${ticketId}`);
  };

  return (
    <div className="fixed inset-0 z-[9999] w-full h-[100dvh] bg-[#030305] text-white font-sans overflow-y-auto">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-[800px] h-[400px] bg-[#C2185B]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <button
        onClick={() => router.push("/en/dashboard")}
        className="absolute top-6 left-6 z-50 w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-neutral-400 hover:text-white transition-all shadow-lg backdrop-blur-md"
      >
        <ArrowLeft size={18} />
      </button>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-20 sm:pt-24 pb-20 relative z-10">

        <div className="text-center mb-12 sm:mb-16">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-b from-white/10 to-white/5 rounded-3xl border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-xl">
            <LifeBuoy className="w-8 h-8 sm:w-10 sm:h-10 text-pink-300" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
            How can we help, <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-[#C2185B]">{firstName || "Student"}</span>?
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base font-medium max-w-lg mx-auto leading-relaxed">
            Our AI assistant is ready to provide instant answers. For complex issues, human support is just a tap away.
          </p>
        </div>

        <div
          className="group relative bg-[#0a0a0f] border border-white/[0.08] hover:border-pink-500/30 rounded-[2rem] p-6 sm:p-8 transition-all duration-500 overflow-hidden mb-12 shadow-2xl hover:shadow-[0_20px_40px_rgba(194,24,91,0.1)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C2185B] to-pink-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(194,24,91,0.4)] shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-white group-hover:text-pink-300 transition-colors">Start Live Chat</h2>
                <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">Connect with AI or human agent instantly.</p>
              </div>
            </div>
            <button
              onClick={startNewChat}
              disabled={isCreating}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-pink-500/20 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer border border-white/10 hover:border-pink-500/40 disabled:opacity-50"
            >
              {isCreating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={14} className="text-pink-400" />}
              {isCreating ? "Initializing..." : "New Chat"}
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6 px-2">
            <Clock3 className="w-5 h-5 text-neutral-500" />
            <h3 className="text-sm font-black text-neutral-300 uppercase tracking-widest">Recent Conversations</h3>
          </div>

          <div className="space-y-3">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-white/[0.02] rounded-2xl border border-white/5 animate-pulse"></div>
              ))
            ) : tickets.length > 0 ? (
              tickets.map((ticket) => {
                const statusStyle = getStatusStyle(ticket.status);
                const statusText = getStatusText(ticket.status);

                return (
                  <div
                    key={ticket.id}
                    onClick={() => openChat(ticket.id)}
                    className="flex items-center justify-between bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.05] hover:border-white/10 p-4 sm:p-5 rounded-2xl cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-black/50 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/5 transition-colors">
                        <MessageCircle className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-neutral-200 group-hover:text-white truncate transition-colors">
                          {ticket.subject}
                        </h4>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${statusStyle}`}>
                            {statusText}
                          </span>
                          <span className="text-[10px] text-neutral-500 font-medium tracking-wide">
                            {formatDate(ticket.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-neutral-600 group-hover:text-neutral-300 transition-colors shrink-0 ml-4" />
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 bg-white/[0.01] border border-white/[0.03] rounded-3xl">
                <LifeBuoy className="w-10 h-10 mx-auto text-neutral-700 mb-4" strokeWidth={1.5} />
                <p className="text-neutral-400 text-sm font-medium">No active support history.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}