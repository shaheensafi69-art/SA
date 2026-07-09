"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Ticket = {
  id: string;
  subject: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: string;
  created_at: string;
};

export default function TeacherSupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("tickets").select("*").order("created_at", { ascending: false });
      if (data) setTickets(data as Ticket[]);
      setIsLoading(false);
    };
    fetchTickets();
  }, []);

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020202] text-white animate-[fadeIn_0.4s_ease-out]">
      <header className="mb-10 bg-neutral-950/40 p-6 rounded-3xl border border-white/5 backdrop-blur-xl">
        <h1 className="text-2xl font-black">Student Inquiry Queue</h1>
        <p className="text-xs text-neutral-500 mt-1">Resolve dedicated engineering and financial support tickets assigned to you.</p>
      </header>

      {isLoading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin"></div></div>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-neutral-900/40 border border-white/5 p-5 rounded-2xl flex items-center justify-between hover:bg-neutral-900/60 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4 min-w-0">
                <span className="text-xl">🎧</span>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white group-hover:text-fuchsia-400 transition-colors truncate">{ticket.subject || "Question regarding smart contract security layout"}</h3>
                  <p className="text-[10px] text-neutral-500 mt-1 font-mono">ID: {ticket.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-md text-[9px] font-black tracking-wider uppercase ${ticket.priority === 'HIGH' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                  {ticket.priority || "HIGH"}
                </span>
                <span className="text-neutral-500 text-xs font-bold group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}