"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { LineChart, Loader2, Search, ArrowUpRight, ArrowDownRight, Eye, X, Save, ShieldAlert, Star, MessageSquare, Image, Landmark } from "lucide-react";

// شناسه ثابت کورس فارکس (فقط اساتید این دوره می‌توانند به ژورنال دسترسی داشته باشند)
const FOREX_COURSE_ID = "d9fa8678-76b4-4705-b579-7860407d43e8";

type TradingJournal = {
  id: string;
  student_id: string;
  trade_date: string;
  symbol: string;
  position_type: string;
  setup_strategy: string;
  lot_size: number;
  entry_price: number;
  stop_loss: number;
  take_profit: number;
  exit_price: number;
  profit_loss_usd: number;
  rr_multiple: number;
  emotions: string;
  analysis_notes: string;
  chart_image_url: string | null;
  teacher_score: number | null;
  teacher_feedback: string | null;
  // پروفایل شاگرد
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string;
};

export default function TeacherTradingJournalDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [journals, setJournals] = useState<TradingJournal[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasAccess, setHasAccess] = useState(false); // کنترل دسترسی استاد

  // مدیریت مودال بررسی ژورنال
  const [selectedJournal, setSelectedJournal] = useState<TradingJournal | null>(null);
  const [scoreInput, setScoreInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");
  const [isSubmittingGrade, setIsSubmittingGrade] = useState(false);

  useEffect(() => {
    checkAccessAndFetchJournals();
  }, []);

  const checkAccessAndFetchJournals = async () => {
    setIsLoading(true);
    const supabase = createClient();

    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      router.push("/en/login");
      return;
    }

    try {
      // 🔒 مرحله ۱: آیا این استاد اصلا کلاسی برای دوره "فارکس" دارد؟
      const { data: forexClassGroups } = await supabase
        .from("class_groups")
        .select("id")
        .eq("teacher_id", session.user.id)
        .eq("course_id", FOREX_COURSE_ID); // فیلتر اختصاصی دوره فارکس

      if (!forexClassGroups || forexClassGroups.length === 0) {
        // اگر کلاسی برای فارکس نداشت، دسترسی به صفحه ჟورنال‌ها رد می‌شود
        setHasAccess(false);
        setIsLoading(false);
        return;
      }

      setHasAccess(true);
      const classIds = forexClassGroups.map(cg => cg.id);

      // 🔓 مرحله ۲: گرفتن لیست شاگردانی که در کلاس‌های فارکس این استاد هستند
      const { data: classStudents } = await supabase
        .from("class_students")
        .select("student_id")
        .in("class_group_id", classIds);

      if (!classStudents || classStudents.length === 0) {
        setJournals([]);
        setIsLoading(false);
        return;
      }

      const studentIds = Array.from(new Set(classStudents.map(cs => cs.student_id)));

      // 🔓 مرحله ۳: واکشی پروفایل و ژورنال‌های این شاگردان خاص
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, email, avatar_url")
        .in("id", studentIds);

      const { data: journalsData, error: journalError } = await supabase
        .from("trading_journals")
        .select("*")
        .in("student_id", studentIds)
        .order("trade_date", { ascending: false });

      if (journalError) throw journalError;

      if (journalsData) {
        const formatted = journalsData.map((j: any) => {
          const p = profiles?.find((prof: any) => prof.id === j.student_id);
          return {
            ...j,
            first_name: p?.first_name || "Unknown",
            last_name: p?.last_name || "Scholar",
            email: p?.email || "No Email",
            avatar_url: p?.avatar_url || "",
          };
        });
        setJournals(formatted);
      }

    } catch (error) {
      console.error("Error loading trading journals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenReviewModal = (j: TradingJournal) => {
    setSelectedJournal(j);
    setScoreInput(j.teacher_score !== null ? j.teacher_score.toString() : "");
    setFeedbackInput(j.teacher_feedback || "");
  };

  const handleSaveEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJournal) return;

    setIsSubmittingGrade(true);
    const supabase = createClient();

    try {
      const scoreNum = scoreInput ? Number(scoreInput) : null;

      const { error } = await supabase
        .from("trading_journals")
        .update({
          teacher_score: scoreNum,
          teacher_feedback: feedbackInput.trim() || null,
        })
        .eq("id", selectedJournal.id);

      if (error) throw error;

      setJournals(prev => prev.map(item => 
        item.id === selectedJournal.id 
          ? { ...item, teacher_score: scoreNum, teacher_feedback: feedbackInput.trim() }
          : item
      ));

      setSelectedJournal(null);
    } catch (err: any) {
      alert("Evaluation failed: " + err.message);
    } finally {
      setIsSubmittingGrade(false);
    }
  };

  const filteredJournals = useMemo(() => {
    if (!searchQuery) return journals;
    return journals.filter(j => 
      j.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.setup_strategy?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [journals, searchQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Syncing Trading Terminals...</p>
      </div>
    );
  }

  // ============================================================================
  // UI 1: اگر استاد کلاسی برای دوره فارکس نداشت (عدم دسترسی)
  // ============================================================================
  if (!hasAccess) {
    return (
      <div className="w-full relative overflow-hidden bg-[#020202] font-sans h-screen flex flex-col items-center justify-center px-4">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-fuchsia-600/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="bg-[#0a0a0f]/80 p-10 md:p-16 rounded-[3rem] border border-white/5 backdrop-blur-3xl shadow-2xl flex flex-col items-center justify-center text-center max-w-2xl relative z-10 animate-[fadeInUp_0.5s_ease-out]">
          <div className="w-24 h-24 bg-purple-500/10 border border-purple-500/20 rounded-3xl flex items-center justify-center text-purple-500 mb-8 shadow-[inset_0_0_20px_rgba(168,85,247,0.2)]">
            <LineChart size={40} />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Access Restricted</h2>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6 max-w-md">
            The Trading Journal Audit system is exclusively available for instructors actively teaching the <strong className="text-purple-400">Financial Markets & Forex Trading</strong> masterclass.
          </p>
          <p className="text-neutral-600 text-xs font-bold uppercase tracking-widest">
            You do not have any active groups assigned for this specific course.
          </p>
        </div>
      </div>
    );
  }

  // ============================================================================
  // UI 2: داشبورد اصلی ژورنال برای اساتید مجاز
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-24" dir="ltr">
      
      {/* Background Neon Shadows */}
      <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-purple-600/5 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-600/5 rounded-full blur-[160px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 sm:space-y-12 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 bg-[#0a0a0f]/80 p-5 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 relative z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500/20 to-emerald-500/5 text-purple-400 rounded-2xl flex items-center justify-center border border-purple-500/20 shadow-inner shrink-0">
              <LineChart size={28} className="sm:w-8 sm:h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-1 sm:mb-2">
                Trading <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">Journals</span>
              </h1>
              <p className="text-[11px] sm:text-sm md:text-base text-neutral-400 font-medium max-w-md leading-relaxed tracking-wide">
                Audit student ledger submissions, verify chart parameters, and grade risk compliance execution.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-80 relative group shrink-0 mt-2 lg:mt-0">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-purple-400 transition-colors" />
            <input 
              type="text" placeholder="Search student, symbol..." 
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 sm:py-4 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors shadow-inner"
            />
          </div>
        </header>

        {/* ================= DATA TERMINAL TABLE ================= */}
        <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-[1000px]">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] sm:text-[11px] font-black text-neutral-500 uppercase tracking-widest">
                  <th className="p-4 sm:p-6">Trader (Student)</th>
                  <th className="p-4 sm:p-6">Execution Date</th>
                  <th className="p-4 sm:p-6">Asset / Order</th>
                  <th className="p-4 sm:p-6">Risk Profile (Lot / R&R)</th>
                  <th className="p-4 sm:p-6 text-center">Net Return (USD)</th>
                  <th className="p-4 sm:p-6 text-center">Status</th>
                  <th className="p-4 sm:p-6 text-right">Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredJournals.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 sm:p-20 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4 opacity-40">
                        <ShieldAlert size={40} className="text-neutral-600 sm:w-12 sm:h-12" />
                        <p className="text-neutral-400 text-xs sm:text-sm font-bold whitespace-normal max-w-[250px] sm:max-w-none mx-auto">No trading journals reported by your students yet.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredJournals.map((journal) => {
                    const isWin = journal.profit_loss_usd >= 0;
                    const isGraded = journal.teacher_score !== null;

                    return (
                      <tr key={journal.id} className="hover:bg-white/[0.01] transition-colors group">
                        
                        {/* Student */}
                        <td className="p-4 sm:p-6">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-11 sm:h-12 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                              {journal.avatar_url ? <img src={journal.avatar_url} alt="avatar" className="w-full h-full object-cover" /> : <span className="text-sm font-black text-purple-400">{journal.first_name.charAt(0)}</span>}
                            </div>
                            <div>
                              <p className="font-black text-white text-sm sm:text-base">{journal.first_name} {journal.last_name}</p>
                              <p className="text-[9px] sm:text-[10px] text-neutral-500 font-mono mt-0.5">UID: {journal.student_id.substring(0,8)}</p>
                            </div>
                          </div>
                        </td>

                        {/* Date */}
                        <td className="p-4 sm:p-6 font-mono text-[11px] sm:text-xs text-neutral-300">
                          {new Date(journal.trade_date).toLocaleDateString()}
                        </td>

                        {/* Symbol & Position */}
                        <td className="p-4 sm:p-6">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black tracking-tight text-white">{journal.symbol}</span>
                            <span className={`px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-black uppercase tracking-wider ${journal.position_type.toUpperCase() === 'BUY' || journal.position_type.toUpperCase() === 'LONG' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                              {journal.position_type}
                            </span>
                          </div>
                          <p className="text-[9px] sm:text-[10px] text-neutral-500 font-medium mt-1 truncate max-w-[120px] sm:max-w-none">Strategy: {journal.setup_strategy || "N/A"}</p>
                        </td>

                        {/* Lot & R&R */}
                        <td className="p-4 sm:p-6 font-mono text-[11px] sm:text-xs">
                          <p className="text-neutral-300">Size: <strong className="text-white">{journal.lot_size || "-"} Lots</strong></p>
                          <p className="text-neutral-500 mt-0.5">R&R Factor: <strong className="text-purple-400">{journal.rr_multiple || "-"}R</strong></p>
                        </td>

                        {/* PnL USD */}
                        <td className="p-4 sm:p-6 text-center font-mono font-black text-xs sm:text-sm">
                          {journal.profit_loss_usd !== null && journal.profit_loss_usd !== undefined ? (
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg sm:rounded-xl border ${isWin ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10' : 'bg-rose-500/5 text-rose-400 border-rose-500/10'}`}>
                              {isWin ? <ArrowUpRight size={12} className="sm:w-3.5 sm:h-3.5"/> : <ArrowDownRight size={12} className="sm:w-3.5 sm:h-3.5" />}
                              {isWin ? `+$${journal.profit_loss_usd}` : `-$${Math.abs(journal.profit_loss_usd)}`}
                            </span>
                          ) : (
                            <span className="text-neutral-500 italic text-[10px]">Open Trade</span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="p-4 sm:p-6 text-center">
                          <span className={`px-2 sm:px-2.5 py-1 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest border ${isGraded ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'}`}>
                            {isGraded ? `Audited (${journal.teacher_score})` : "Pending Audit"}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="p-4 sm:p-6 text-right">
                          <button 
                            onClick={() => handleOpenReviewModal(journal)}
                            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-white/5 hover:bg-purple-500/10 border border-white/5 hover:border-purple-500/30 text-[11px] sm:text-xs font-black uppercase tracking-widest text-neutral-300 hover:text-white rounded-lg sm:rounded-xl transition-all active:scale-95 shadow-md flex items-center gap-1.5 ml-auto"
                          >
                            <Eye size={14}/> Audit
                          </button>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ==================== AUDIT JOURNAL REPORT MODAL ======================== */}
      {/* ========================================================================= */}
      {selectedJournal && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 animate-[slideInUp_0.2s_ease-out] sm:animate-[fadeIn_0.2s_ease-out]">
          <div className="absolute inset-0 bg-[#020202]/95 backdrop-blur-md" onClick={() => setSelectedJournal(null)}></div>
          
          <div className="relative w-full max-w-5xl bg-[#0a0a0f] border border-white/10 rounded-t-[2rem] sm:rounded-[2.5rem] shadow-[0_-10px_80px_rgba(0,0,0,0.8)] sm:shadow-[0_40px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-white/5 bg-neutral-900/40 shrink-0 flex justify-between items-start relative z-10">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-black border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                  {selectedJournal.avatar_url ? <img src={selectedJournal.avatar_url} alt="avatar" className="w-full h-full object-cover" /> : <span className="text-base sm:text-lg font-black text-purple-500">{selectedJournal.first_name.charAt(0)}</span>}
                </div>
                <div className="pr-4">
                  <h2 className="text-base sm:text-xl font-black text-white truncate max-w-[200px] sm:max-w-none">Trade Sheet: {selectedJournal.first_name} {selectedJournal.last_name}</h2>
                  <p className="text-[10px] sm:text-xs text-neutral-500 font-mono mt-0.5 truncate max-w-[200px] sm:max-w-none">Target: {selectedJournal.symbol} ({selectedJournal.position_type})</p>
                </div>
              </div>
              <button onClick={() => setSelectedJournal(null)} className="w-8 h-8 sm:w-10 sm:h-10 bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 rounded-full flex items-center justify-center transition-all border border-white/5 shrink-0">
                <X size={16} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-8 bg-[#050508] space-y-5 sm:space-y-6 relative z-10 pb-20 sm:pb-8">
              
              {/* Technical Execution Metrics Box */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 bg-black/40 border border-white/5 p-4 sm:p-5 rounded-2xl">
                <div>
                  <p className="text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-widest font-black">Entry Metric</p>
                  <p className="text-xs sm:text-sm font-bold font-mono text-white mt-0.5">${selectedJournal.entry_price || "-"}</p>
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-widest font-black">Exit Metric</p>
                  <p className="text-xs sm:text-sm font-bold font-mono text-white mt-0.5">${selectedJournal.exit_price || "-"}</p>
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] text-rose-400 uppercase tracking-widest font-black">Stop Loss (SL)</p>
                  <p className="text-xs sm:text-sm font-bold font-mono text-rose-400 mt-0.5">${selectedJournal.stop_loss || "-"}</p>
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] text-emerald-400 uppercase tracking-widest font-black">Take Profit (TP)</p>
                  <p className="text-xs sm:text-sm font-bold font-mono text-emerald-400 mt-0.5">${selectedJournal.take_profit || "-"}</p>
                </div>
              </div>

              {/* Layout Split: Left (Chart Screenshot) & Right (Trader notes) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
                
                {/* Left: Chart Attachment */}
                <div className="space-y-2">
                  <label className="text-[9px] sm:text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1 flex items-center gap-1.5"><Image size={14}/> Chart Attachment Asset</label>
                  {selectedJournal.chart_image_url ? (
                    <div className="w-full aspect-video bg-black rounded-xl sm:rounded-2xl border border-white/10 overflow-hidden relative shadow-inner group">
                      <img src={selectedJournal.chart_image_url} alt="Trade Chart Setup" className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div className="w-full aspect-video bg-neutral-900/60 border border-dashed border-white/5 rounded-xl sm:rounded-2xl flex flex-col justify-center items-center opacity-40 p-4 text-center">
                      <Landmark size={28} className="text-neutral-500 mb-2 sm:w-9 sm:h-9"/>
                      <p className="text-[10px] sm:text-xs font-bold text-neutral-400">No chart snapshot uploaded by student</p>
                    </div>
                  )}
                </div>

                {/* Right: Notes & Psychological metrics */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] sm:text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Psychological/Emotions State</label>
                    <div className="w-full bg-black/40 border border-white/5 p-3 sm:p-4 rounded-xl text-xs sm:text-sm font-medium text-purple-300">
                      {selectedJournal.emotions || "No psychological notes logged."}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] sm:text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Analysis & Trade Log Notes</label>
                    <div className="w-full bg-black/40 border border-white/5 p-3 sm:p-4 rounded-xl text-xs sm:text-sm font-medium text-neutral-200 min-h-[100px] sm:min-h-[120px] whitespace-pre-wrap custom-scrollbar">
                      {selectedJournal.analysis_notes || "No trade execution notes provided."}
                    </div>
                  </div>
                </div>
              </div>

              {/* Evaluation Form Submittal Section */}
              <form onSubmit={handleSaveEvaluation} className="pt-5 sm:pt-6 border-t border-white/5 grid grid-cols-1 gap-4 sm:gap-5">
                
                {/* Score Input */}
                <div className="space-y-1.5">
                  <label className="text-[9px] sm:text-[10px] font-black text-purple-400 uppercase tracking-widest ml-1 flex items-center gap-1"><Star size={12} className="fill-purple-400"/> Execution Score (0-100) *</label>
                  <input 
                    required type="number" min="0" max="100" placeholder="e.g. 95"
                    value={scoreInput} onChange={e => setScoreInput(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl sm:rounded-2xl px-4 py-3 sm:py-4 text-purple-400 text-base sm:text-lg font-black focus:outline-none focus:border-purple-500/50 shadow-inner"
                  />
                </div>

                {/* Feedback Input & Button */}
                <div className="space-y-1.5">
                  <label className="text-[9px] sm:text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1 flex items-center gap-1"><MessageSquare size={12}/> Academic Audit Feedback</label>
                  
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                    <textarea 
                      rows={2} placeholder="Provide tactical strategy feedback..."
                      value={feedbackInput} onChange={e => setFeedbackInput(e.target.value)}
                      className="w-full sm:flex-1 bg-black border border-white/10 rounded-xl sm:rounded-2xl px-4 py-3 sm:py-4 text-white text-xs sm:text-sm focus:outline-none focus:border-purple-500/50 resize-none shadow-inner"
                    />
                    <button 
                      type="submit" disabled={isSubmittingGrade}
                      className="w-full sm:w-auto px-6 py-3.5 sm:py-4 bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 text-white font-black uppercase tracking-widest text-xs rounded-xl sm:rounded-2xl transition-all shadow-md shrink-0 flex items-center justify-center gap-2 sm:h-[54px] active:scale-95 disabled:opacity-40"
                    >
                      {isSubmittingGrade ? <Loader2 size={16} className="animate-spin" /> : <Save size={16}/>} Save
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}