"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

// تعریف تایپ برای ژورنال‌ها
type JournalEntry = {
  id: string;
  symbol: string;
  position_type: "LONG" | "SHORT";
  entry_price: number;
  exit_price: number | null;
  profit_loss_usd: number | null;
  analysis_notes: string;
  chart_image_url: string | null;
  created_at: string;
};

export default function TradingJournalPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [filter, setFilter] = useState<"all" | "win" | "loss" | "open">("all");

  // استیت‌های مربوط به مودال Add New Trade
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // استیت فرم ترید جدید
  const [formData, setFormData] = useState({
    symbol: "",
    position_type: "LONG" as "LONG" | "SHORT",
    entry_price: "",
    exit_price: "",
    profit_loss_usd: "",
    analysis_notes: "",
  });

  const [stats, setStats] = useState({
    totalTrades: 0,
    winRate: 0,
    totalProfitLoss: 0,
  });

  useEffect(() => {
    fetchJournal();
  }, []);

  const fetchJournal = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) return;

    try {
      const { data, error } = await supabase
        .from("trading_journals")
        .select("*")
        .eq("student_id", session.user.id)
        .order("created_at", { ascending: false });

      if (data && !error) {
        const formattedEntries = data as JournalEntry[];
        setEntries(formattedEntries);

        let closedTrades = 0;
        let winningTrades = 0;
        let netProfitLoss = 0;

        formattedEntries.forEach(entry => {
          if (entry.profit_loss_usd !== null) {
            closedTrades++;
            netProfitLoss += entry.profit_loss_usd;
            if (entry.profit_loss_usd > 0) winningTrades++;
          }
        });

        setStats({
          totalTrades: formattedEntries.length,
          winRate: closedTrades > 0 ? Math.round((winningTrades / closedTrades) * 100) : 0,
          totalProfitLoss: netProfitLoss,
        });
      }
    } catch (error) {
      console.error("Error fetching trading journal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // فانکشن ارسال ترید به دیتابیس
  const handleAddTrade = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) return;

    try {
      const { error } = await supabase
        .from("trading_journals")
        .insert({
          student_id: session.user.id,
          symbol: formData.symbol.toUpperCase(),
          position_type: formData.position_type,
          entry_price: parseFloat(formData.entry_price),
          // اگر فیلدها خالی بودند null رد کن تا پوزیشن باز در نظر گرفته شود
          exit_price: formData.exit_price ? parseFloat(formData.exit_price) : null,
          profit_loss_usd: formData.profit_loss_usd ? parseFloat(formData.profit_loss_usd) : null,
          analysis_notes: formData.analysis_notes,
        });

      if (error) throw error;

      // موفقیت! ریست کردن فرم و بستن مودال
      setIsModalOpen(false);
      setFormData({
        symbol: "",
        position_type: "LONG",
        entry_price: "",
        exit_price: "",
        profit_loss_usd: "",
        analysis_notes: "",
      });
      
      // رفرش کردن دیتا برای نمایش ترید جدید در لیست
      fetchJournal();

    } catch (error) {
      console.error("Error adding trade:", error);
      alert("Failed to add trade. Check the console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredEntries = entries.filter(entry => {
    if (filter === "win") return entry.profit_loss_usd !== null && entry.profit_loss_usd > 0;
    if (filter === "loss") return entry.profit_loss_usd !== null && entry.profit_loss_usd <= 0;
    if (filter === "open") return entry.profit_loss_usd === null;
    return true; 
  });

  return (
    <div className="w-full relative min-h-screen">
      
      {/* ================= Header ================= */}
      <header className="h-24 px-8 md:px-12 flex justify-between items-center animate-[fadeIn_0.5s_ease-out] border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-20">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Trading <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Journal</span>
          </h1>
          <p className="text-neutral-500 mt-1 text-sm hidden md:block">Track, analyze, and master your trading performance.</p>
        </div>
        
        {/* دکمه باز کردن مودال */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold rounded-xl transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:shadow-[0_0_25px_rgba(234,179,8,0.5)] items-center gap-2 group hover:scale-105"
        >
          <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
          <span className="hidden sm:inline">Add New Trade</span>
        </button>
      </header>

      {/* ================= بدنه اصلی ================= */}
      <div className="px-8 md:px-12 pt-8 pb-12 max-w-7xl mx-auto">
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-neutral-900/40 p-6 rounded-3xl border border-white/5 backdrop-blur-xl flex flex-col justify-between shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-xl">📊</div>
              <span className="px-2.5 py-1 bg-white/5 rounded-md text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Total Entries</span>
            </div>
            <h3 className="text-3xl font-extrabold text-white">{isLoading ? "-" : stats.totalTrades}</h3>
          </div>

          <div className="bg-neutral-900/40 p-6 rounded-3xl border border-white/5 backdrop-blur-xl flex flex-col justify-between shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-yellow-500/10 text-yellow-500 rounded-2xl flex items-center justify-center text-xl">🎯</div>
              <span className="px-2.5 py-1 bg-white/5 rounded-md text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Win Rate</span>
            </div>
            <h3 className="text-3xl font-extrabold text-white">{isLoading ? "-" : `${stats.winRate}%`}</h3>
          </div>

          <div className="bg-neutral-900/40 p-6 rounded-3xl border border-white/5 backdrop-blur-xl flex flex-col justify-between shadow-lg relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] pointer-events-none opacity-20 ${stats.totalProfitLoss >= 0 ? "bg-green-500" : "bg-red-500"}`}></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${stats.totalProfitLoss >= 0 ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>💰</div>
              <span className="px-2.5 py-1 bg-white/5 rounded-md text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Net PnL (USD)</span>
            </div>
            <h3 className={`text-3xl font-extrabold relative z-10 ${stats.totalProfitLoss >= 0 ? "text-green-400" : "text-red-400"}`}>
              {isLoading ? "-" : `${stats.totalProfitLoss >= 0 ? "+" : ""}$${stats.totalProfitLoss.toFixed(2)}`}
            </h3>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 md:gap-4 mb-8 overflow-x-auto pb-2 custom-scrollbar">
          {([
            { id: "all", label: "All Trades" },
            { id: "open", label: "Open Positions" },
            { id: "win", label: "Winning Trades" },
            { id: "loss", label: "Losing Trades" }
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                filter === tab.id 
                  ? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]" 
                  : "bg-neutral-900/50 text-neutral-400 border border-white/5 hover:text-white hover:bg-neutral-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Trades List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-neutral-900/40 rounded-[1.5rem] border border-white/5 animate-pulse"></div>)}
          </div>
        ) : filteredEntries.length > 0 ? (
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <div key={entry.id} className="bg-neutral-900/40 rounded-[1.5rem] border border-white/5 backdrop-blur-xl p-5 hover:bg-neutral-900/60 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-yellow-500/20 group">
                <div className="flex items-center gap-4 md:w-1/4">
                  <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-inner border ${entry.position_type === 'LONG' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                     <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={entry.position_type === 'LONG' ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"}></path>
                     </svg>
                     <span className="text-[9px] font-extrabold uppercase">{entry.position_type}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-extrabold text-white tracking-wide">{entry.symbol}</h4>
                    <p className="text-xs text-neutral-500 font-mono mt-0.5">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 justify-center md:w-2/4 border-y md:border-y-0 border-white/5 py-4 md:py-0">
                  <div className="text-center md:text-left">
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Entry Price</p>
                    <p className="font-mono font-bold text-neutral-200">${entry.entry_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5 })}</p>
                  </div>
                  <div className="flex items-center text-neutral-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></div>
                  <div className="text-center md:text-left">
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">Exit Price</p>
                    <p className="font-mono font-bold text-neutral-200">{entry.exit_price ? `$${entry.exit_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5 })}` : <span className="text-yellow-500">Open Position</span>}</p>
                  </div>
                </div>

                <div className="flex justify-end gap-6 md:w-1/4">
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-1">PnL (USD)</p>
                    {entry.profit_loss_usd !== null ? (
                      <p className={`text-xl font-extrabold ${entry.profit_loss_usd > 0 ? "text-green-400" : entry.profit_loss_usd < 0 ? "text-red-400" : "text-neutral-400"}`}>
                        {entry.profit_loss_usd > 0 ? "+" : ""}{entry.profit_loss_usd.toFixed(2)}
                      </p>
                    ) : <p className="text-xl font-extrabold text-neutral-500">--</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-neutral-900/40 p-12 rounded-[2rem] border border-white/5 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-lg min-h-[400px]">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-5xl mb-6">📈</div>
            <h3 className="text-2xl font-extrabold text-white mb-2">No Trades Found</h3>
            <p className="text-neutral-400 font-medium mb-8 max-w-md">Your trading journal is empty. Log your first trade to start tracking your performance.</p>
            <button onClick={() => setIsModalOpen(true)} className="px-8 py-3 bg-yellow-500 text-black font-extrabold rounded-xl hover:bg-yellow-400 transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              Log First Trade
            </button>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* ================= MODAL: ADD NEW TRADE (پاپ‌آپ شیشه‌ای) ================= */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-[fadeIn_0.3s_ease-out]">
          {/* پس‌زمینه تاریک پشت مودال */}
          <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          {/* بدنه مودال */}
          <div className="relative w-full max-w-lg bg-neutral-900/90 border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* افکت نوری طلایی در بالای مودال */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-yellow-500/10 blur-[50px] pointer-events-none"></div>
            
            <div className="p-8 md:p-10 relative z-10">
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Log a Trade</h2>
                  <p className="text-neutral-400 text-xs mt-1">Leave Exit Price & PnL blank for Open Positions</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 rounded-full flex items-center justify-center transition-all border border-white/5 hover:border-red-500/30">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              <form onSubmit={handleAddTrade} className="space-y-5">
                
                {/* Symbol & Position Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-400 ml-1">Pair / Symbol *</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. BTCUSDT" 
                      value={formData.symbol}
                      onChange={(e) => setFormData({...formData, symbol: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white font-mono uppercase focus:outline-none focus:border-yellow-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-400 ml-1">Position Type *</label>
                    <div className="flex p-1 bg-black/50 border border-white/10 rounded-xl">
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, position_type: "LONG"})}
                        className={`flex-1 py-2.5 rounded-lg text-xs font-extrabold transition-all ${formData.position_type === "LONG" ? "bg-green-500 text-black shadow-md" : "text-neutral-500 hover:text-white"}`}
                      >LONG</button>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, position_type: "SHORT"})}
                        className={`flex-1 py-2.5 rounded-lg text-xs font-extrabold transition-all ${formData.position_type === "SHORT" ? "bg-red-500 text-white shadow-md" : "text-neutral-500 hover:text-white"}`}
                      >SHORT</button>
                    </div>
                  </div>
                </div>

                {/* Entry & Exit Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-400 ml-1">Entry Price *</label>
                    <input 
                      required 
                      type="number" 
                      step="any"
                      placeholder="0.00" 
                      value={formData.entry_price}
                      onChange={(e) => setFormData({...formData, entry_price: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white font-mono focus:outline-none focus:border-yellow-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-400 ml-1">Exit Price (Optional)</label>
                    <input 
                      type="number" 
                      step="any"
                      placeholder="0.00" 
                      value={formData.exit_price}
                      onChange={(e) => setFormData({...formData, exit_price: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white font-mono focus:outline-none focus:border-yellow-500/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Profit/Loss USD */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-400 ml-1">Profit/Loss in USD (Optional)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 font-bold">$</span>
                    <input 
                      type="number" 
                      step="any"
                      placeholder="e.g. 150.50 or -50.00" 
                      value={formData.profit_loss_usd}
                      onChange={(e) => setFormData({...formData, profit_loss_usd: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl pl-8 pr-4 py-3.5 text-white font-mono focus:outline-none focus:border-yellow-500/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Analysis Notes */}
                <div className="space-y-1.5 pb-4">
                  <label className="text-xs font-bold text-neutral-400 ml-1">Analysis / Lesson Learned</label>
                  <textarea 
                    placeholder="Why did you take this trade? What happened?" 
                    value={formData.analysis_notes}
                    onChange={(e) => setFormData({...formData, analysis_notes: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-yellow-500/50 transition-colors resize-none h-24 custom-scrollbar"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-yellow-500 text-black font-extrabold rounded-xl hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:hover:bg-yellow-500 flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                >
                  {isSubmitting ? "Saving..." : "Save Trade to Journal"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}