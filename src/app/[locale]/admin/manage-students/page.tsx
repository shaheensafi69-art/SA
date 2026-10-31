"use client";
import { usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { 
  Loader2, Search, Users, Wallet, ArrowLeft, Edit3, ShieldAlert, 
  CheckCircle2, AlertCircle, X, Save, TrendingUp, Phone, Mail, 
  BadgeCent, Sparkles, Plus, Minus
} from "lucide-react";

type StudentProfile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  referral_code: string | null;
  avatar_url: string | null;
  wallet_balance: number;
  total_score: number;
  created_at: string;
};

export default function ManageStudentsPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"ALL" | "FUNDED" | "LEADERBOARD">("ALL");
  
  // Modal State (Wallet Adjustment)
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [newWalletBalance, setNewWalletBalance] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setIsLoading(true);
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, email, phone_number, referral_code, avatar_url, wallet_balance, total_score, created_at")
        .eq("role", "student")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredStudents = useMemo(() => {
    let result = students;

    if (filterTab === "FUNDED") {
      result = result.filter(s => (s.wallet_balance || 0) > 0);
    } else if (filterTab === "LEADERBOARD") {
      result = [...result].sort((a, b) => (b.total_score || 0) - (a.total_score || 0));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(s => 
        s.first_name?.toLowerCase().includes(query) || 
        s.last_name?.toLowerCase().includes(query) || 
        s.email?.toLowerCase().includes(query) ||
        s.phone_number?.toLowerCase().includes(query) ||
        s.referral_code?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [students, searchQuery, filterTab]);

  const stats = useMemo(() => {
    const total = students.length;
    const totalWalletFunds = students.reduce((acc, curr) => acc + (curr.wallet_balance || 0), 0);
    const totalPoints = students.reduce((acc, curr) => acc + (curr.total_score || 0), 0);
    const fundedCount = students.filter(s => (s.wallet_balance || 0) > 0).length;
    return { total, totalWalletFunds, totalPoints, fundedCount };
  }, [students]);

  const openEditModal = (student: StudentProfile) => {
    setSelectedStudent(student);
    setNewWalletBalance(student.wallet_balance || 0);
    setMessage(null);
  };

  const adjustPreset = (delta: number) => {
    setNewWalletBalance(prev => Math.max(0, parseFloat((prev + delta).toFixed(2))));
  };

  const handleUpdateWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;
    
    setIsSaving(true);
    setMessage(null);
    const supabase = createClient();

    try {
      const oldBalance = selectedStudent.wallet_balance || 0;
      const delta = parseFloat((newWalletBalance - oldBalance).toFixed(2));

      // 1. Update wallet balance in profiles
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ wallet_balance: newWalletBalance })
        .eq("id", selectedStudent.id);

      if (profileError) throw profileError;

      // 2. Audit record in transactions if there's a change
      if (delta !== 0) {
        try {
          await supabase.from("transactions").insert({
            student_id: selectedStudent.id,
            amount: delta,
            transaction_type: delta > 0 ? "deposit" : "adjustment",
            status: "COMPLETED",
            reference_id: `ADMIN-ADJ-${Date.now()}`
          });
        } catch (txErr) {
          console.warn("Failed to record audit transaction:", txErr);
        }
      }

      // Update state
      setStudents(prev => prev.map(s => 
        s.id === selectedStudent.id ? { ...s, wallet_balance: newWalletBalance } : s
      ));

      setMessage({ type: 'success', text: `Wallet updated to $${newWalletBalance.toFixed(2)}!` });
      setTimeout(() => {
        setSelectedStudent(null);
        setMessage(null);
      }, 1600);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update wallet.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">
          {t.adminPages.loadingStudentRecords}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* Background Ambience */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-teal-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto space-y-6 sm:space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between md:items-start gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div>
            <Link href={`/${currentLocale}/admin`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-emerald-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <ArrowLeft size={14} /> {t.adminStudents.commandCenter}
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2 flex items-center gap-3">
              {t.adminStudents.title}
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-mono font-bold">
                {students.length}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-xl">
              Inspect student accounts, regulate wallet treasury balances, and track academic achievements across Safi Academy.
            </p>
          </div>

          {/* Quick Stats in Header */}
          <div className="flex gap-3 shrink-0 relative z-10">
            <div className="bg-black/40 border border-white/5 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-inner">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400"><Users size={18}/></div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500">{t.adminStudents.totalUsers}</p>
                <p className="text-xl font-black text-white font-mono">{stats.total}</p>
              </div>
            </div>
            <div className="bg-black/40 border border-white/5 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-inner hidden sm:flex">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400"><Wallet size={18}/></div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500">{t.adminStudents.totalFunds}</p>
                <p className="text-xl font-black text-emerald-400 font-mono">${stats.totalWalletFunds.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
              </div>
            </div>
          </div>
        </header>

        {/* ================= SEARCH & FILTER BAR ================= */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-[#0a0a0f]/60 p-3 rounded-2xl border border-white/5 backdrop-blur-xl">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search by name, email, phone, referral..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-xs font-medium focus:outline-none focus:border-emerald-500/50 placeholder:text-neutral-600"
            />
          </div>

          <div className="flex items-center gap-1.5">
            {[
              { id: "ALL", label: "All Scholars" },
              { id: "FUNDED", label: `Funded (${stats.fundedCount})` },
              { id: "LEADERBOARD", label: "Top Points" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filterTab === tab.id
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30"
                    : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ================= STUDENTS TABLE / CARDS ================= */}
        <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
          
          {filteredStudents.length === 0 ? (
            <div className="p-16 text-center flex flex-col items-center">
              <ShieldAlert size={40} className="text-neutral-600 mb-4" />
              <p className="text-neutral-400 text-sm font-bold">{t.adminStudents.noStudents}</p>
            </div>
          ) : (
            <>
              {/* === DESKTOP TABLE === */}
              <div className="hidden md:block overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse whitespace-nowrap min-w-[950px]">
                  <thead>
                    <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                      <th className="p-5 pl-8">{t.common.profile}</th>
                      <th className="p-5">Contact Details</th>
                      <th className="p-5">{t.adminPages.joined}</th>
                      <th className="p-5 text-center">{t.adminPages.points}</th>
                      <th className="p-5 text-right">{t.teacherPages.walletBalance}</th>
                      <th className="p-5 text-right pr-8">{t.common.actions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="p-5 pl-8">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                              {student.avatar_url ? (
                                <img src={student.avatar_url} className="w-full h-full object-cover" />
                              ) : (
                                <span className="font-black text-emerald-500">{student.first_name.charAt(0)}</span>
                              )}
                            </div>
                            <div>
                              <p className="font-black text-white text-sm">{student.first_name} {student.last_name}</p>
                              {student.referral_code && (
                                <p className="text-[10px] text-emerald-400/80 font-mono mt-0.5">Ref: {student.referral_code}</p>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="p-5">
                          <p className="text-xs text-neutral-300 font-mono">{student.email}</p>
                          {student.phone_number && (
                            <p className="text-[10px] text-neutral-500 font-mono mt-0.5">{student.phone_number}</p>
                          )}
                        </td>

                        <td className="p-5 font-mono text-xs text-neutral-400">
                          {new Date(student.created_at).toLocaleDateString()}
                        </td>

                        <td className="p-5 text-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black bg-white/5 text-neutral-300 border border-white/10">
                            <TrendingUp size={12} className="text-amber-400"/> {student.total_score || 0}
                          </span>
                        </td>

                        <td className="p-5 text-right">
                          <span className={`font-mono text-lg font-black tracking-tight ${student.wallet_balance > 0 ? "text-emerald-400" : "text-neutral-400"}`}>
                            ${student.wallet_balance?.toFixed(2) || "0.00"}
                          </span>
                        </td>

                        <td className="p-5 text-right pr-8">
                          <button 
                            onClick={() => openEditModal(student)}
                            className="px-4 py-2 hover:bg-emerald-500/10 border border-white/5 hover:border-emerald-500/30 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ml-auto flex items-center gap-2 text-neutral-400 hover:text-emerald-400 bg-white/5 shadow-sm"
                          >
                            <Edit3 size={14} /> Adjust Wallet
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* === MOBILE CARDS === */}
              <div className="md:hidden flex flex-col divide-y divide-white/5">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="p-5 flex flex-col gap-4 bg-black/20">
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                        {student.avatar_url ? (
                          <img src={student.avatar_url} className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-black text-emerald-500">{student.first_name.charAt(0)}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-white text-base truncate">{student.first_name} {student.last_name}</p>
                        <p className="text-[10px] text-neutral-500 font-mono truncate mt-0.5">{student.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-end justify-between gap-4 border-t border-white/5 pt-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[9px] font-black text-neutral-500 uppercase tracking-widest block">{t.teacherPages.walletBalance}</span>
                        <span className={`font-mono text-xl font-black tracking-tight ${student.wallet_balance > 0 ? "text-emerald-400" : "text-white"}`}>
                          ${student.wallet_balance?.toFixed(2) || "0.00"}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-400 bg-white/5 px-2 py-0.5 rounded w-fit">
                          <TrendingUp size={10} className="text-amber-400"/> Points: {student.total_score || 0}
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => openEditModal(student)}
                        className="px-5 py-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 flex items-center gap-2 text-emerald-400 shadow-md shrink-0"
                      >
                        <Edit3 size={14} /> Adjust Wallet
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </>
          )}
        </div>

      </div>

      {/* ================= MODAL: EDIT STUDENT WALLET ================= */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-[slideInUp_0.2s_ease-out] sm:animate-[fadeIn_0.2s_ease-out]">
          <div className="absolute inset-0 bg-[#020202]/95 backdrop-blur-md" onClick={() => !isSaving && setSelectedStudent(null)}></div>
          
          <div className="relative w-full max-w-md bg-[#0a0a0f] border-t sm:border border-white/10 rounded-t-[2rem] sm:rounded-[2.5rem] shadow-[0_-20px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/5 bg-neutral-900/40 shrink-0 flex justify-between items-center relative z-10">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                  {selectedStudent.avatar_url ? <img src={selectedStudent.avatar_url} className="w-full h-full object-cover" /> : <span className="font-black text-emerald-500">{selectedStudent.first_name.charAt(0)}</span>}
                </div>
                <div className="min-w-0">
                  <h2 className="text-base font-black text-white truncate">{selectedStudent.first_name} {selectedStudent.last_name}</h2>
                  <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mt-0.5 truncate">{selectedStudent.email}</p>
                </div>
              </div>
              <button disabled={isSaving} onClick={() => setSelectedStudent(null)} className="w-10 h-10 bg-white/5 hover:bg-white/10 text-neutral-400 rounded-full flex items-center justify-center transition-all shrink-0">
                <X size={16} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 sm:p-8 bg-[#050508] space-y-6">
              
              {message && (
                <div className={`p-4 rounded-xl flex items-center gap-3 text-xs font-bold border ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                  {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <p>{message.text}</p>
                </div>
              )}

              <form onSubmit={handleUpdateWallet} className="space-y-6">
                <div className="bg-black/40 border border-white/5 rounded-2xl p-5 shadow-inner">
                  <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest block mb-4 text-center">{t.adminPages.adjustWalletBalance}</label>
                  
                  <div className="relative flex items-center justify-center mb-4">
                    <span className="absolute left-6 text-2xl font-black text-neutral-600">$</span>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      value={newWalletBalance}
                      onChange={(e) => setNewWalletBalance(parseFloat(e.target.value) || 0)}
                      className="w-full bg-transparent border-b-2 border-emerald-500/30 px-12 py-2 text-center text-4xl font-black text-emerald-400 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                    />
                  </div>

                  {/* Preset Quick Delta Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-white/5">
                    <button type="button" onClick={() => adjustPreset(10)} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-black">+ $10</button>
                    <button type="button" onClick={() => adjustPreset(25)} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-black">+ $25</button>
                    <button type="button" onClick={() => adjustPreset(50)} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-black">+ $50</button>
                    <button type="button" onClick={() => adjustPreset(100)} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-black">+ $100</button>
                    <button type="button" onClick={() => adjustPreset(-10)} className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[10px] font-black">- $10</button>
                  </div>
                  
                  <p className="text-[9px] text-neutral-500 text-center mt-3">{t.adminPages.overwriteBalanceDesc}</p>
                </div>

                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="w-full py-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18}/>}
                  {isSaving ? "Updating Ledger..." : "Confirm & Save Balance"}
                </button>
              </form>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
