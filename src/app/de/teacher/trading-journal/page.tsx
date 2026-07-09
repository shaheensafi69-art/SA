"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type JournalEntry = {
  id: string;
  asset_pair: string;
  position_type: "LONG" | "SHORT";
  pnl: number;
  status: string;
  profiles: { first_name: string } | null;
};

export default function TeacherTradingJournals() {
  const [logs, setLogs] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("trading_journals")
        .select("id, asset_pair, position_type, pnl, status, profiles(first_name)")
        .order("created_at", { ascending: false });
      
      if (data) setLogs(data as any);
      setIsLoading(false);
    };
    fetchLogs();
  }, []);

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020202] text-white animate-[fadeIn_0.4s_ease-out]">
      <header className="mb-10 bg-neutral-950/40 p-6 rounded-3xl border border-white/5 backdrop-blur-xl">
        <h1 className="text-2xl font-black flex items-center gap-3">📈 Risk & Performance Audit</h1>
        <p className="text-xs text-neutral-500 mt-1">Review live execution journals, trading logic, and risk frameworks submitted by students.</p>
      </header>

      {isLoading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>
      ) : (
        <div className="bg-neutral-950/40 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01] text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                <th className="p-5">Student</th>
                <th className="p-5">Asset</th>
                <th className="p-5">Type</th>
                <th className="p-5">P&L Result</th>
                <th className="p-5">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-5 font-bold">{log.profiles?.first_name || "Student"}</td>
                  <td className="p-5 font-mono text-neutral-300">{log.asset_pair}</td>
                  <td className="p-5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${log.position_type === 'LONG' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                      {log.position_type}
                    </span>
                  </td>
                  <td className={`p-5 font-mono font-bold ${log.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {log.pnl >= 0 ? `+$${log.pnl}` : `-$${Math.abs(log.pnl)}`}
                  </td>
                  <td className="p-5">
                    <button className="text-xs font-bold text-indigo-400 hover:underline">Leave Review →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}