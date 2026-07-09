"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

type TicketProfile = {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  avatar_url: string | null;
};

type Ticket = {
  id: string;
  subject: string;
  department: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  created_at: string;
  student_id: string;
  profiles: TicketProfile | null;
};

export default function AdminTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false); // اضافه شده برای جلوگیری از خطای Hydration افزونه‌ها
  const [activeFilter, setActiveFilter] = useState<"all" | "open" | "resolved">("all");

  useEffect(() => {
    setIsMounted(true); // تأیید می‌کند که صفحه در کلاینت رندر شده است
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      // استفاده از !student_id ضروری است تا سوپابیس بین چند ارتباط گیج نشود (ارور Could not embed)
      const { data, error } = await supabase
        .from("tickets")
        .select(`
          id, 
          subject, 
          department, 
          status, 
          created_at, 
          student_id,
          profiles!student_id (first_name, last_name, email, role, avatar_url)
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase SQL Error Message:", error.message);
        console.error("Supabase SQL Error Details:", error.details);
        throw error;
      }

      if (data) {
        const formattedTickets = data.map((ticket: any) => ({
          ...ticket,
          profiles: Array.isArray(ticket.profiles) ? ticket.profiles[0] : ticket.profiles
        }));
        setTickets(formattedTickets as Ticket[]);
      }
    } catch (error: any) {
      console.error("Error fetching tickets - Full object:", error);
      alert("Failed to load tickets. Please check the browser console for exact details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseTicket = async (ticketId: string) => {
    const confirmClose = window.confirm("Are you sure you want to close this ticket?");
    if (!confirmClose) return;

    const supabase = createClient();
    const { error } = await supabase.from("tickets").update({ status: "closed" }).eq("id", ticketId);

    if (!error) {
      setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: "closed" } : t));
    } else {
      alert("Failed to close ticket: " + error.message);
    }
  };

  // جلوگیری از خطای Hydration (عدم تطابق HTML سرور و کلاینت به خاطر افزونه‌هایی مثل Trust Wallet)
  if (!isMounted) return null;

  const totalTickets = tickets.length;
  const openTicketsCount = tickets.filter(t => t.status === "open").length;
  const resolvedTicketsCount = tickets.filter(t => t.status === "resolved" || t.status === "closed").length;

  const filteredTickets = tickets.filter(ticket => {
    if (activeFilter === "all") return true;
    if (activeFilter === "open") return ticket.status === "open" || ticket.status === "in_progress";
    if (activeFilter === "resolved") return ticket.status === "resolved" || ticket.status === "closed";
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-red-500/10 text-red-400 border-red-500/20";
      case "in_progress": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "resolved": 
      case "closed": return "bg-green-500/10 text-green-400 border-green-500/20";
      default: return "bg-white/10 text-neutral-400 border-white/10";
    }
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(dateString));
  };

  return (
    <div className="min-h-full bg-[#020202] text-white p-6 sm:p-10 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10 animate-[fadeIn_0.5s_ease-out]">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <Link href="/en/admin" className="text-neutral-500 hover:text-white text-sm font-bold flex items-center gap-2 mb-4 transition-colors w-max">
              <span>←</span> Back to Dashboard
            </Link>
            <h1 className="text-4xl font-black tracking-tight">Support <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Center</span></h1>
            <p className="text-neutral-400 text-sm mt-2">Manage user inquiries and platform support tickets.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Stats Box 1 */}
          <div className="rounded-3xl border border-white/5 bg-neutral-950/60 backdrop-blur-xl p-6 flex items-center justify-between shadow-xl">
             <div><p className="text-[10px] font-bold uppercase tracking-[0.35em] text-neutral-500 mb-1">Total Tickets</p><p className="text-3xl font-black text-white">{isLoading ? "-" : totalTickets}</p></div>
             <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl">📥</div>
          </div>
          {/* Stats Box 2 */}
          <div className="rounded-3xl border border-red-500/10 bg-red-950/10 backdrop-blur-xl p-6 flex items-center justify-between shadow-xl">
             <div><p className="text-[10px] font-bold uppercase tracking-[0.35em] text-red-400 mb-1">Requires Action</p><p className="text-3xl font-black text-red-400">{isLoading ? "-" : openTicketsCount}</p></div>
             <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-xl">🔥</div>
          </div>
          {/* Stats Box 3 */}
          <div className="rounded-3xl border border-green-500/10 bg-green-950/10 backdrop-blur-xl p-6 flex items-center justify-between shadow-xl">
             <div><p className="text-[10px] font-bold uppercase tracking-[0.35em] text-green-400 mb-1">Resolved</p><p className="text-3xl font-black text-green-400">{isLoading ? "-" : resolvedTicketsCount}</p></div>
             <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-xl">✅</div>
          </div>
        </div>

        <div className="flex gap-3 border-b border-white/10 pb-4">
          <button onClick={() => setActiveFilter("all")} className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeFilter === "all" ? "bg-white text-black" : "bg-white/5 text-neutral-400 hover:bg-white/10"}`}>All Tickets</button>
          <button onClick={() => setActiveFilter("open")} className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeFilter === "open" ? "bg-indigo-500 text-white" : "bg-white/5 text-neutral-400 hover:bg-white/10"}`}>Open & Pending</button>
          <button onClick={() => setActiveFilter("resolved")} className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeFilter === "resolved" ? "bg-green-500 text-white" : "bg-white/5 text-neutral-400 hover:bg-white/10"}`}>Resolved</button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>
        ) : filteredTickets.length === 0 ? (
          <div className="text-center py-20 bg-neutral-950/40 rounded-[2rem] border border-white/5 backdrop-blur-xl">
             <span className="text-5xl block mb-4 opacity-50">📭</span><h3 className="text-xl font-bold text-white mb-2">No Tickets Found</h3>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="group flex flex-col md:flex-row justify-between gap-6 p-6 rounded-[2rem] border border-white/5 bg-neutral-950/60 backdrop-blur-xl hover:bg-neutral-900/80 transition-all shadow-lg hover:-translate-y-1">
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-neutral-800 flex-shrink-0 flex items-center justify-center font-black text-neutral-500">
                    {ticket.profiles?.avatar_url ? <img src={ticket.profiles.avatar_url} className="w-full h-full object-cover" alt="avatar" /> : ticket.profiles?.first_name?.charAt(0) || "?"}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg group-hover:text-indigo-300 transition-colors mb-2">{ticket.subject}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 font-medium">
                      <span className="text-indigo-400">{ticket.department}</span><span>•</span>
                      <span className="text-neutral-300">{ticket.profiles?.first_name} {ticket.profiles?.last_name}</span><span>•</span>
                      <span>{formatDate(ticket.created_at)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t border-white/5 md:border-0 pt-4 md:pt-0">
                  <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(ticket.status)}`}>{ticket.status.replace('_', ' ')}</span>
                  {(ticket.status === 'open' || ticket.status === 'in_progress') && (
                    <button onClick={() => handleCloseTicket(ticket.id)} className="px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-xs font-bold text-red-400 transition-all">Close</button>
                  )}
                  <Link href={`/en/admin/tickets/${ticket.id}`} className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-indigo-600 text-xs font-bold text-white transition-all">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}