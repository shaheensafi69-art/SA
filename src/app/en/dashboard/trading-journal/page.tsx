"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";

// تایپ اسکریپت حرفه‌ای منطبق بر دیتابیس
type JournalEntry = {
  id: string;
  trade_date: string;
  symbol: string;
  position_type: "LONG" | "SHORT";
  setup_strategy?: string;
  lot_size?: number;
  entry_price: number;
  stop_loss?: number;
  take_profit?: number;
  exit_price?: number;
  profit_loss_usd?: number;
  rr_multiple?: number;
  emotions?: string;
  analysis_notes?: string;
  chart_image_url?: string;
  created_at: string;
};

// شناسه ثابت کورس فارکس
const FOREX_COURSE_ID = "d9fa8678-76b4-4705-b579-7860407d43e8";

export default function TradingJournalPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false); // استیت کنترل دسترسی
  
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [filter, setFilter] = useState<"all" | "win" | "loss" | "open">("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [chartFile, setChartFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    trade_date: new Date().toISOString().split('T')[0],
    symbol: "",
    position_type: "LONG" as "LONG" | "SHORT",
    setup_strategy: "",
    lot_size: "",
    entry_price: "",
    stop_loss: "",
    take_profit: "",
    exit_price: "",
    profit_loss_usd: "",
    rr_multiple: "",
    emotions: "",
    analysis_notes: "",
  });

  const [stats, setStats] = useState({
    totalTrades: 0,
    winRate: 0,
    totalProfitLoss: 0,
    bestTrade: 0,
  });

  useEffect(() => {
    checkAccessAndFetchJournal();
  }, []);

  const checkAccessAndFetchJournal = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) return;

    try {
      // 🔒 مرحله ۱: بررسی دسترسی (آیا شاگرد در دوره فارکس ثبت‌نام کرده است؟)
      const { data: enrollmentData } = await supabase
        .from("enrollments")
        .select("id")
        .eq("student_id", session.user.id)
        .eq("course_id", FOREX_COURSE_ID)
        .maybeSingle();

      if (!enrollmentData) {
        // اگر ثبت‌نام نکرده بود، دسترسی رد می‌شود
        setHasAccess(false);
        setIsLoading(false);
        return;
      }

      // اگر ثبت‌نام کرده بود، دسترسی تایید می‌شود
      setHasAccess(true);

      // 🔓 مرحله ۲: واکشی اطلاعات ژورنال
      const { data, error } = await supabase
        .from("trading_journals")
        .select("*")
        .eq("student_id", session.user.id)
        .order("trade_date", { ascending: false })
        .order("created_at", { ascending: false });

      if (data && !error) {
        const formattedEntries = data as JournalEntry[];
        setEntries(formattedEntries);

        let closedTrades = 0;
        let winningTrades = 0;
        let netProfitLoss = 0;
        let maxProfit = 0;

        formattedEntries.forEach(entry => {
          if (entry.profit_loss_usd !== null && entry.profit_loss_usd !== undefined) {
            closedTrades++;
            netProfitLoss += Number(entry.profit_loss_usd);
            if (entry.profit_loss_usd > 0) winningTrades++;
            if (entry.profit_loss_usd > maxProfit) maxProfit = Number(entry.profit_loss_usd);
          }
        });

        setStats({
          totalTrades: formattedEntries.length,
          winRate: closedTrades > 0 ? Math.round((winningTrades / closedTrades) * 100) : 0,
          totalProfitLoss: netProfitLoss,
          bestTrade: maxProfit,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTrade = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    try {
      let uploadedChartUrl = null;

      if (chartFile) {
        const fileExt = chartFile.name.split('.').pop();
        const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('journal_charts')
          .upload(fileName, chartFile);

        if (uploadError) {
          alert(`Image Upload Error: ${uploadError.message}`);
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage.from('journal_charts').getPublicUrl(fileName);
        uploadedChartUrl = publicUrlData.publicUrl;
      }

      const { error } = await supabase
        .from("trading_journals")
        .insert({
          student_id: session.user.id,
          trade_date: formData.trade_date,
          symbol: formData.symbol.toUpperCase(),
          position_type: formData.position_type,
          setup_strategy: formData.setup_strategy || null,
          lot_size: formData.lot_size ? parseFloat(formData.lot_size) : null,
          entry_price: parseFloat(formData.entry_price),
          stop_loss: formData.stop_loss ? parseFloat(formData.stop_loss) : null,
          take_profit: formData.take_profit ? parseFloat(formData.take_profit) : null,
          exit_price: formData.exit_price ? parseFloat(formData.exit_price) : null,
          profit_loss_usd: formData.profit_loss_usd ? parseFloat(formData.profit_loss_usd) : null,
          rr_multiple: formData.rr_multiple ? parseFloat(formData.rr_multiple) : null,
          emotions: formData.emotions || null,
          analysis_notes: formData.analysis_notes || null,
          chart_image_url: uploadedChartUrl, 
        });

      if (error) {
        alert(`Database Error: ${error.message}`);
        throw error;
      }

      setIsModalOpen(false);
      setFormData({
        trade_date: new Date().toISOString().split('T')[0],
        symbol: "", position_type: "LONG", setup_strategy: "", lot_size: "",
        entry_price: "", stop_loss: "", take_profit: "", exit_price: "",
        profit_loss_usd: "", rr_multiple: "", emotions: "", analysis_notes: "",
      });
      setChartFile(null);
      checkAccessAndFetchJournal(); // ریفرش اطلاعات
    } catch (error) {
      console.error("Failed to add trade");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredEntries = entries.filter(entry => {
    const isClosed = entry.profit_loss_usd !== null && entry.profit_loss_usd !== undefined;
    if (filter === "win") return isClosed && entry.profit_loss_usd! > 0;
    if (filter === "loss") return isClosed && entry.profit_loss_usd! <= 0;
    if (filter === "open") return !isClosed;
    return true; 
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020202]">
        <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // ============================================================================
  // UI 1: اگر کاربر دسترسی نداشت (بدون ثبت‌نام در دوره فارکس)
  // ============================================================================
  if (!hasAccess) {
    return (
      <div className="w-full relative overflow-hidden bg-[#020202] font-sans h-screen flex flex-col items-center justify-center px-4">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-red-600/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-yellow-600/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="bg-[#0a0a0f]/80 p-10 md:p-16 rounded-[3rem] border border-white/5 backdrop-blur-3xl shadow-2xl flex flex-col items-center justify-center text-center max-w-2xl relative z-10 animate-[fadeInUp_0.5s_ease-out]">
          <div className="w-24 h-24 bg-red-500/10 border border-red-500/20 rounded-3xl flex items-center justify-center text-red-500 mb-8 shadow-[inset_0_0_20px_rgba(239,68,68,0.2)]">
            <LockKeyhole size={40} />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Access Restricted</h2>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-10 max-w-md">
            The Professional Trading Journal is an exclusive tool reserved strictly for students enrolled in the <strong className="text-yellow-500">Financial Markets & Forex Trading</strong> masterclass.
          </p>
          <Link href="/en/dashboard/courses" className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-105 transition-all shadow-[0_10px_30px_rgba(245,158,11,0.3)]">
            Explore Courses
          </Link>
        </div>
      </div>
    );
  }

  // ============================================================================
  // UI 2: اگر کاربر دسترسی داشت (ژورنال اصلی)
  // ============================================================================
  return (
    <div className="w-full relative overflow-hidden bg-[#020202] font-sans pb-10 min-h-screen">
      
      {/* Global Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* ================= Header ================= */}
      <header className="px-6 md:px-12 pt-8 md:pt-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10 mb-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Trading <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Journal</span>
          </h1>
          <p className="text-neutral-500 text-sm md:text-base font-medium max-w-xl mt-2">Log your executions, manage risk, and track your edge in the markets.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-yellow-300 hover:to-amber-500 text-black font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-[0_10px_30px_rgba(245,158,11,0.3)] hover:shadow-[0_10px_40px_rgba(245,158,11,0.5)] items-center justify-center gap-3 hover:scale-105 shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
          Log New Trade
        </button>
      </header>

      {/* ================= Main Layout (Two Columns) ================= */}
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto relative z-10 flex flex-col md:flex-row gap-8 items-start">
        
        {/* ================= Left Sidebar: Vertical Stats & Filters ================= */}
        <div className="w-full md:w-80 shrink-0 flex flex-col gap-6">
          
          {/* Vertical Stats */}
          <div className="flex flex-col gap-4">
            
            {/* Net PNL */}
            <div className={`p-6 rounded-[2rem] border backdrop-blur-xl flex flex-col justify-between shadow-2xl relative overflow-hidden group ${
              stats.totalProfitLoss >= 0 ? "bg-emerald-900/20 border-emerald-500/30" : "bg-red-900/20 border-red-500/30"
            }`}>
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] pointer-events-none opacity-30 ${stats.totalProfitLoss >= 0 ? "bg-emerald-500" : "bg-red-500"}`}></div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-[1rem] flex items-center justify-center text-xl shadow-lg ${stats.totalProfitLoss >= 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>💰</div>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black text-neutral-300 uppercase tracking-widest">Net PnL (USD)</span>
              </div>
              <h3 className={`text-4xl font-black relative z-10 tracking-tight ${stats.totalProfitLoss >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {stats.totalProfitLoss >= 0 ? "+" : ""}${stats.totalProfitLoss.toFixed(2)}
              </h3>
            </div>

            <div className="bg-gradient-to-br from-neutral-900/50 to-black p-5 rounded-[2rem] border border-white/10 backdrop-blur-xl flex items-center gap-5 cursor-default">
              <div className="w-12 h-12 bg-white/5 rounded-[1rem] flex items-center justify-center text-xl text-white border border-white/10 shrink-0">📊</div>
              <div>
                <p className="text-neutral-500 text-[9px] font-black uppercase tracking-widest mb-0.5">Total Entries</p>
                <h3 className="text-2xl font-black text-white leading-none">{stats.totalTrades}</h3>
              </div>
            </div>

            <div className="bg-gradient-to-br from-neutral-900/50 to-black p-5 rounded-[2rem] border border-white/10 backdrop-blur-xl flex items-center gap-5 cursor-default">
              <div className="w-12 h-12 bg-amber-500/10 rounded-[1rem] flex items-center justify-center text-xl text-amber-500 border border-amber-500/20 shrink-0">🎯</div>
              <div>
                <p className="text-amber-500/80 text-[9px] font-black uppercase tracking-widest mb-0.5">Win Rate</p>
                <h3 className="text-2xl font-black text-white leading-none">{stats.winRate}%</h3>
              </div>
            </div>
          </div>

          {/* Vertical Filters */}
          <div className="flex flex-col bg-neutral-900/40 backdrop-blur-2xl p-2.5 rounded-[2rem] border border-white/10 shadow-2xl space-y-1.5">
            <p className="text-[9px] font-black text-neutral-500 uppercase tracking-[0.2em] px-4 pt-3 pb-1 hidden md:block">Filter Trades</p>
            {([
              { id: "all", label: "All Trades", icon: "📋", color: "hover:text-yellow-400" },
              { id: "open", label: "Open Positions", icon: "⏳", color: "hover:text-amber-400" },
              { id: "win", label: "Winning Trades", icon: "🏆", color: "hover:text-emerald-400" },
              { id: "loss", label: "Losing Trades", icon: "📉", color: "hover:text-red-400" }
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`flex items-center justify-between w-full px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 group ${
                  filter === tab.id 
                    ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-lg scale-[1.02]" 
                    : `text-neutral-400 bg-white/[0.02] border border-white/5 ${tab.color}`
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-base transition-transform duration-300 ${filter === tab.id ? "" : "group-hover:scale-110"}`}>{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ================= Right Content: Trade Cards ================= */}
        <div className="flex-1 w-full">
          {filteredEntries.length > 0 ? (
            <div className="space-y-5">
              {filteredEntries.map((entry) => {
                const isOpen = entry.profit_loss_usd === null || entry.profit_loss_usd === undefined;
                const isWin = !isOpen && entry.profit_loss_usd! > 0;
                const isLoss = !isOpen && entry.profit_loss_usd! < 0;

                return (
                  <div 
                    key={entry.id} 
                    className={`relative overflow-hidden bg-gradient-to-br from-neutral-900/60 to-black rounded-[2rem] border backdrop-blur-2xl p-6 transition-all duration-500 hover:-translate-y-1 group flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl ${
                      isOpen ? "border-amber-500/20 hover:border-amber-500/40 hover:shadow-[0_10px_30px_rgba(245,158,11,0.1)]" :
                      isWin ? "border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-[0_10px_30px_rgba(16,185,129,0.1)]" :
                      "border-red-500/20 hover:border-red-500/40 hover:shadow-[0_10px_30px_rgba(239,68,68,0.1)]"
                    }`}
                  >
                    {/* Glowing Backlight */}
                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100 ${
                      isOpen ? "bg-amber-500/20" : isWin ? "bg-emerald-500/20" : "bg-red-500/20"
                    }`}></div>

                    {/* Left: Symbol & Type */}
                    <div className="flex items-center gap-5 lg:w-1/4 relative z-10">
                      <div className={`w-16 h-16 rounded-[1.2rem] flex flex-col items-center justify-center border shadow-inner shrink-0 ${
                        entry.position_type === 'LONG' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'
                      }`}>
                         <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={entry.position_type === 'LONG' ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"}></path>
                         </svg>
                         <span className="text-[9px] font-black uppercase tracking-wider">{entry.position_type}</span>
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-white tracking-tight">{entry.symbol}</h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <span className="text-[10px] text-neutral-500 font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">{entry.trade_date}</span>
                          {entry.setup_strategy && <span className="text-[10px] text-amber-500/80 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/10 truncate max-w-[80px]">{entry.setup_strategy}</span>}
                          {entry.chart_image_url && (
                            <a href={entry.chart_image_url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 flex items-center gap-1 hover:bg-blue-500/20 transition-colors">
                              🖼️ Chart
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Center: Execution Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:flex-1 relative z-10 py-4 lg:py-0 border-y lg:border-y-0 border-white/5">
                      <div>
                        <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest mb-1">Entry</p>
                        <p className="font-mono font-bold text-neutral-200 text-sm">{entry.entry_price}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest mb-1">Exit</p>
                        <p className="font-mono font-bold text-sm">
                          {entry.exit_price ? <span className="text-neutral-200">{entry.exit_price}</span> : <span className="text-amber-500 animate-pulse">Running</span>}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest mb-1">Lot Size</p>
                        <p className="font-mono font-bold text-neutral-300 text-sm">{entry.lot_size || "-"}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest mb-1">Risk:Reward</p>
                        <p className="font-mono font-bold text-neutral-300 text-sm">{entry.rr_multiple ? `${entry.rr_multiple}R` : "-"}</p>
                      </div>
                    </div>

                    {/* Right: PNL */}
                    <div className="flex justify-between items-center lg:justify-end lg:w-1/4 relative z-10">
                      <div className="text-left lg:text-right">
                        <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Net PnL</p>
                        {!isOpen ? (
                          <p className={`text-2xl font-black tracking-tight drop-shadow-[0_0_10px_currentColor] ${isWin ? "text-emerald-400" : isLoss ? "text-red-400" : "text-neutral-400"}`}>
                            {isWin ? "+" : ""}${Number(entry.profit_loss_usd).toFixed(2)}
                          </p>
                        ) : (
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-500">
                            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-black uppercase tracking-widest">Open</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-neutral-900/40 to-black p-12 rounded-[3rem] border border-white/5 flex flex-col items-center justify-center text-center shadow-2xl min-h-[500px]">
              <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-5xl mb-6 shadow-2xl">📈</div>
              <h3 className="text-2xl font-black text-white mb-2">No Trades Found</h3>
              <p className="text-neutral-400 font-medium mb-8 max-w-sm">Your trading journal is empty. Log your first setup to start building your edge.</p>
              <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-black uppercase tracking-widest text-xs rounded-xl hover:scale-105 transition-all shadow-[0_10px_20px_rgba(245,158,11,0.3)]">
                Log First Trade
              </button>
            </div>
          )}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* ================= MODAL: ADD NEW TRADE ================= */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="absolute inset-0 bg-[#020202]/90 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative w-full max-w-2xl bg-gradient-to-b from-neutral-900/95 to-black border border-white/10 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02] shrink-0 relative z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/10 blur-[50px] pointer-events-none"></div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Log Execution</h2>
                <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest mt-1">Record your setup & manage risk</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 rounded-full flex items-center justify-center transition-all border border-white/5 hover:border-red-500/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar flex-1 relative z-10">
              <form id="tradeForm" onSubmit={handleAddTrade} className="space-y-8">
                
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-widest border-l-2 border-amber-500 pl-3 mb-4">Core Info</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Date *</label>
                      <input type="date" required value={formData.trade_date} onChange={(e) => setFormData({...formData, trade_date: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-amber-500/50 transition-colors" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Pair / Symbol *</label>
                      <input required type="text" placeholder="e.g. XAUUSD" value={formData.symbol} onChange={(e) => setFormData({...formData, symbol: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-white font-mono uppercase text-sm focus:outline-none focus:border-amber-500/50 transition-colors" />
                    </div>
                    <div className="space-y-1.5 col-span-2 sm:col-span-1">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Position Type *</label>
                      <div className="flex p-1 bg-black/50 border border-white/10 rounded-2xl">
                        <button type="button" onClick={() => setFormData({...formData, position_type: "LONG"})} className={`flex-1 py-2.5 rounded-xl text-xs font-black tracking-widest transition-all ${formData.position_type === "LONG" ? "bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.3)]" : "text-neutral-500 hover:text-white"}`}>LONG</button>
                        <button type="button" onClick={() => setFormData({...formData, position_type: "SHORT"})} className={`flex-1 py-2.5 rounded-xl text-xs font-black tracking-widest transition-all ${formData.position_type === "SHORT" ? "bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.3)]" : "text-neutral-500 hover:text-white"}`}>SHORT</button>
                      </div>
                    </div>
                    <div className="space-y-1.5 col-span-2 sm:col-span-1">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Strategy / Setup</label>
                      <input type="text" placeholder="e.g. SMC, Breakout" value={formData.setup_strategy} onChange={(e) => setFormData({...formData, setup_strategy: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-widest border-l-2 border-amber-500 pl-3 mb-4">Execution</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Lot Size</label>
                      <input type="number" step="any" placeholder="0.10" value={formData.lot_size} onChange={(e) => setFormData({...formData, lot_size: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-3 py-3 text-white font-mono text-sm focus:outline-none focus:border-amber-500/50" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-amber-500 uppercase tracking-widest ml-1">Entry *</label>
                      <input required type="number" step="any" placeholder="0.00" value={formData.entry_price} onChange={(e) => setFormData({...formData, entry_price: e.target.value})} className="w-full bg-black/50 border border-amber-500/30 rounded-2xl px-3 py-3 text-white font-mono text-sm focus:outline-none focus:border-amber-500/80 shadow-[inset_0_0_10px_rgba(245,158,11,0.05)]" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Stop Loss</label>
                      <input type="number" step="any" placeholder="0.00" value={formData.stop_loss} onChange={(e) => setFormData({...formData, stop_loss: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-3 py-3 text-white font-mono text-sm focus:outline-none focus:border-red-500/50" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Take Profit</label>
                      <input type="number" step="any" placeholder="0.00" value={formData.take_profit} onChange={(e) => setFormData({...formData, take_profit: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-3 py-3 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/50" />
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-white/[0.02] border border-white/5 rounded-[2rem]">
                  <h4 className="text-xs font-black text-white uppercase tracking-widest border-l-2 border-emerald-500 pl-3 mb-4">Results (Leave blank if open)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Exit Price</label>
                      <input type="number" step="any" placeholder="0.00" value={formData.exit_price} onChange={(e) => setFormData({...formData, exit_price: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-amber-500/50" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Net PnL ($)</label>
                      <input type="number" step="any" placeholder="e.g. 150 or -50" value={formData.profit_loss_usd} onChange={(e) => setFormData({...formData, profit_loss_usd: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-amber-500/50" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Risk/Reward (R)</label>
                      <input type="number" step="any" placeholder="e.g. 2.5" value={formData.rr_multiple} onChange={(e) => setFormData({...formData, rr_multiple: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-amber-500/50" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Chart Screenshot (Optional)</label>
                    <label className="group/file relative flex items-center gap-4 p-4 border-2 border-dashed border-white/10 rounded-2xl hover:border-amber-500/50 hover:bg-amber-500/5 cursor-pointer transition-all">
                      <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setChartFile(e.target.files?.[0] || null)} />
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 group-hover/file:text-amber-500 transition-colors shrink-0">🖼️</div>
                      <span className="text-xs font-bold text-neutral-400 truncate group-hover/file:text-amber-400 leading-relaxed">
                        {chartFile ? chartFile.name : "Tap to upload chart image (PNG, JPG)"}
                      </span>
                    </label>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Emotions / Psychology</label>
                    <input type="text" placeholder="e.g. FOMO, Patient, Confident" value={formData.emotions} onChange={(e) => setFormData({...formData, emotions: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Analysis / Mistakes</label>
                    <textarea placeholder="Write down your thoughts about this execution..." value={formData.analysis_notes} onChange={(e) => setFormData({...formData, analysis_notes: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500/50 resize-none h-20 custom-scrollbar"></textarea>
                  </div>
                </div>

              </form>
            </div>

            <div className="p-6 border-t border-white/5 bg-black/80 shrink-0">
               <button 
                type="submit" 
                form="tradeForm"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-black uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-[0_10px_30px_rgba(245,158,11,0.3)] flex items-center justify-center"
              >
                {isSubmitting ? "Logging Execution & Uploading Chart..." : "Save Trade to Journal"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}