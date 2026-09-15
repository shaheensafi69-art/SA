"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import {
  Loader2, Search, Hourglass, Headset, CheckCircle2,
  RefreshCw, ChevronRight, User, Clock
} from "lucide-react";

type TicketItem = {
  id: string;
  student_id: string;
  subject: string;
  department: string;
  status: string;
  created_at: string;
  student?: {
    first_name: string;
    last_name: string;
    avatar_url: string | null;
    role: string;
  } | null;
  last_message?: string;
};

export default function AdminTicketsListPage() {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"ALL" | "STUDENTS" | "TEACHERS">("ALL");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const supabase = createClient();
    try {
      setIsLoading(true);

      // ۱. دریافت تمام تیکت‌ها
      const { data: ticketsData, error: ticketsError } = await supabase
        .from("tickets")
        .select("*")
        .order("created_at", { ascending: false });

      if (ticketsError) throw ticketsError;

      if (!ticketsData || ticketsData.length === 0) {
        setTickets([]);
        setIsLoading(false);
        setIsRefreshing(false);
        return;
      }

      // ۲. استخراج شناسه‌ها برای گرفتن پروفایل‌ها و آخرین پیام‌ها به صورت امن
      const studentIds = Array.from(new Set(ticketsData.map(t => t.student_id).filter(Boolean)));
      const ticketIds = ticketsData.map(t => t.id);

      // گرفتن پروفایل‌ها
      let profilesMap: Record<string, any> = {};
      if (studentIds.length > 0) {
        const { data: profilesData } = await supabase
          .from("profiles")
          .select("id, first_name, last_name, avatar_url, role")
          .in("id", studentIds);

        if (profilesData) {
          profilesMap = profilesData.reduce((acc, p) => {
            acc[p.id] = p;
            return acc;
          }, {} as Record<string, any>);
        }
      }

      // گرفتن آخرین پیام‌های هر تیکت
      let messagesMap: Record<string, string> = {};
      if (ticketIds.length > 0) {
        const { data: messagesData } = await supabase
          .from("ticket_messages")
          .select("ticket_id, message_text, created_at")
          .in("ticket_id", ticketIds)
          .order("created_at", { ascending: false });

        if (messagesData) {
          messagesData.forEach(m => {
            if (!messagesMap[m.ticket_id]) {
              messagesMap[m.ticket_id] = m.message_text;
            }
          });
        }
      }

      // ترکیب اطلاعات
      const formatted = ticketsData.map(t => ({
        ...t,
        student: profilesMap[t.student_id] || null,
        last_message: messagesMap[t.id] || "No messages yet..."
      }));

      setTickets(formatted);

    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchTickets();
  };

  const timeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d`;
  };

  const filteredTickets = useMemo(() => {
    let result = tickets;

    if (filterTab === "STUDENTS") {
      result = result.filter(t => !t.student?.role || t.student.role === "student");
    } else if (filterTab === "TEACHERS") {
      result = result.filter(t => t.student?.role?.includes("teacher") || t.student?.role === "admin");
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.subject?.toLowerCase().includes(query) ||
        t.department?.toLowerCase().includes(query) ||
        t.student?.first_name?.toLowerCase().includes(query) ||
        t.student?.last_name?.toLowerCase().includes(query) ||
        t.last_message?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [tickets, searchQuery, filterTab]);

  const stats = useMemo(() => {
    return {
      pending: tickets.filter(t => t.status?.toLowerCase() === "escalated" || t.status?.toLowerCase() === "pending").length,
      active: tickets.filter(t => t.status?.toLowerCase() === "open").length,
      closed: tickets.filter(t => t.status?.toLowerCase() === "closed").length,
    };
  }, [tickets]);

  if (isLoading && !isRefreshing) {
    return (
      <div className="min-h-screen bg-[#030305] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-rose-500 animate-spin" />
        <p className="text-rose-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Command Center...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030305] text-white p-4 sm:p-6 md:p-8 relative overflow-hidden pb-32 lg:pb-8 font-sans">

      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto animate-[fadeIn_0.4s_ease-out]">

        {/* HEADER */}
        <header className="flex items-center justify-between mb-8 mt-2 sm:mt-0">
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">Support Command Center</h1>
            <p className="text-[11px] font-bold tracking-widest uppercase text-neutral-500 mt-1">Manage Live Chat Escalations</p>
          </div>
          <button
            onClick={handleRefresh}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-all active:scale-95 shadow-lg"
          >
            <RefreshCw size={18} className={isRefreshing ? "animate-spin text-rose-400" : ""} />
          </button>
        </header>

        {/* STATS CARDS */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
          <div className="bg-[#0a0a0e]/80 backdrop-blur-xl border border-white/5 rounded-[1.5rem] p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <Hourglass size={20} className="text-amber-400" />
              <span className="text-2xl sm:text-3xl font-black text-white leading-none">{stats.pending}</span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-neutral-500 relative z-10">Pending</span>
          </div>

          <div className="bg-[#0a0a0e]/80 backdrop-blur-xl border border-white/5 rounded-[1.5rem] p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <Headset size={20} className="text-emerald-400" />
              <span className="text-2xl sm:text-3xl font-black text-white leading-none">{stats.active}</span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-neutral-500 relative z-10">Active</span>
          </div>

          <div className="bg-[#0a0a0e]/80 backdrop-blur-xl border border-white/5 rounded-[1.5rem] p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <CheckCircle2 size={20} className="text-rose-500" />
              <span className="text-2xl sm:text-3xl font-black text-white leading-none">{stats.closed}</span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-neutral-500 relative z-10">Closed</span>
          </div>
        </div>

        {/* SEARCH & TABS */}
        <div className="mb-6 space-y-4">
          <div className="bg-[#0a0a0e] border border-white/10 rounded-full px-4 py-3.5 flex items-center gap-3 shadow-inner focus-within:border-rose-500/50 focus-within:bg-[#0c0c12] transition-colors">
            <Search size={18} className="text-neutral-500" />
            <input
              type="text"
              placeholder="Search name, subject or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none w-full text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-0"
            />
          </div>

          <div className="flex bg-[#0a0a0e]/50 backdrop-blur-md p-1.5 rounded-full border border-white/5">
            <button
              onClick={() => setFilterTab("ALL")}
              className={`flex-1 py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all ${filterTab === "ALL" ? "bg-rose-500 text-white shadow-md" : "text-neutral-500 hover:text-white"}`}
            >
              All
            </button>
            <button
              onClick={() => setFilterTab("STUDENTS")}
              className={`flex-1 py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all ${filterTab === "STUDENTS" ? "bg-white/10 text-white shadow-md" : "text-neutral-500 hover:text-white"}`}
            >
              Students
            </button>
            <button
              onClick={() => setFilterTab("TEACHERS")}
              className={`flex-1 py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all ${filterTab === "TEACHERS" ? "bg-white/10 text-white shadow-md" : "text-neutral-500 hover:text-white"}`}
            >
              Teachers
            </button>
          </div>
        </div>

        {/* TICKET LIST */}
        <div className="space-y-3 pb-10">
          {filteredTickets.length === 0 ? (
            <div className="text-center py-16 bg-white/[0.02] border border-white/5 rounded-[2rem]">
              <Headset size={40} className="mx-auto mb-3 text-neutral-600" />
              <p className="text-sm font-bold text-neutral-400">No tickets found in database.</p>
            </div>
          ) : (
            filteredTickets.map((ticket) => {
              const status = ticket.status?.toLowerCase();
              let statusBorder = "border-l-neutral-600";
              let statusBg = "bg-neutral-500/10";
              let statusText = "text-neutral-400";

              if (status === "escalated" || status === "pending") {
                statusBorder = "border-l-amber-500";
                statusBg = "bg-amber-500/10";
                statusText = "text-amber-500";
              } else if (status === "open") {
                statusBorder = "border-l-emerald-500";
                statusBg = "bg-emerald-500/10";
                statusText = "text-emerald-500";
              } else if (status === "closed") {
                statusBorder = "border-l-rose-500";
                statusBg = "bg-rose-500/10";
                statusText = "text-rose-500";
              }

              return (
                <Link
                  href={`/en/admin/tickets/chat/${ticket.id}`}
                  key={ticket.id}
                  className="block relative bg-[#0c0c12]/80 backdrop-blur-xl border border-white/5 rounded-[1.5rem] p-4 sm:p-5 hover:bg-[#12121a] hover:border-white/10 hover:scale-[1.01] transition-all duration-300 shadow-md group overflow-hidden"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${statusBorder} border-l-[6px]`}></div>

                  <div className="flex gap-4 ml-2">
                    <div className={`w-12 h-12 rounded-full border border-white/10 shrink-0 flex items-center justify-center overflow-hidden ${statusBg}`}>
                      {ticket.student?.avatar_url ? (
                        <img src={ticket.student.avatar_url} className="w-full h-full object-cover" alt="User" />
                      ) : (
                        <User size={20} className={statusText} />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-sm sm:text-base font-black text-white truncate pr-2">
                          {ticket.student ? `${ticket.student.first_name} ${ticket.student.last_name}` : "Unknown User"}
                        </h3>
                        <span className="text-[10px] font-bold text-neutral-500 shrink-0 flex items-center gap-1">
                          <Clock size={10} /> {timeAgo(ticket.created_at)}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-neutral-400 mb-1.5 truncate">
                        {ticket.subject || ticket.department || "General Live Support"}
                      </p>

                      <p className="text-[11px] text-neutral-500 truncate" style={{ direction: /[\u0600-\u06FF]/.test(ticket.last_message || "") ? 'rtl' : 'ltr' }}>
                        {ticket.last_message}
                      </p>
                    </div>

                    <div className="flex items-center justify-center shrink-0 pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight size={18} className="text-rose-400" />
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}