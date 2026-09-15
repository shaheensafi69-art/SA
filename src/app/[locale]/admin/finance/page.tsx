"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Loader2, ArrowLeft, Wallet, TrendingUp, TrendingDown, DollarSign, Users, CreditCard, CheckCircle2, AlertCircle, Search, X, Building } from "lucide-react";

type TeacherWallet = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url: string | null;
  wallet_balance: number;
};

type FinancialTransaction = {
  id: string;
  amount: number;
  transaction_type: string;
  status: string;
  created_at: string;
  user: { first_name: string; last_name: string; email: string; avatar_url: string | null } | null;
};

export default function AdminFinancePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"faculty" | "inflows" | "outflows">("faculty");
  const [searchQuery, setSearchQuery] = useState("");

  const [teachers, setTeachers] = useState<TeacherWallet[]>([]);
  const [studentPayments, setStudentPayments] = useState<FinancialTransaction[]>([]);
  const [payoutHistory, setPayoutHistory] = useState<FinancialTransaction[]>([]);

  // Payout Modal State
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherWallet | null>(null);
  const [payoutAmount, setPayoutAmount] = useState<number>(0);
  const [isProcessingPayout, setIsProcessingPayout] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchFinanceData();
  }, []);

  const fetchFinanceData = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      // 1. Fetch Teachers Wallets
      const { data: facultyData } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, email, avatar_url, wallet_balance")
        .in("role", ["teacher", "super_admin"])
        .order("wallet_balance", { ascending: false }); // مرتب‌سازی: اساتیدی که بیشترین پول را طلبکارند اول باشند

      if (facultyData) setTeachers(facultyData);

      // 2. Fetch All Transactions
      const { data: txData } = await supabase
        .from("transactions")
        .select(`
          id, amount, transaction_type, status, created_at,
          user:profiles!student_id(first_name, last_name, email, avatar_url)
        `)
        .order("created_at", { ascending: false });

      if (txData) {
        const formattedTxs = txData.map((tx: any) => ({
          ...tx,
          user: Array.isArray(tx.user) ? tx.user[0] : tx.user
        }));

        // فیلتر کردن پرداختی‌های شاگردان (Inflows)
        const inflows = formattedTxs.filter(tx => ["deposit", "payment", "course_fee"].includes(tx.transaction_type));
        setStudentPayments(inflows);

        // فیلتر کردن تسویه‌های اساتید (Outflows)
        const outflows = formattedTxs.filter(tx => tx.transaction_type === "withdrawal");
        setPayoutHistory(outflows);
      }

    } catch (error) {
      console.error("Error fetching finance data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProcessPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeacher) return;
    if (payoutAmount <= 0 || payoutAmount > selectedTeacher.wallet_balance) {
      setMessage({ type: 'error', text: 'Invalid payout amount.' });
      return;
    }

    setIsProcessingPayout(true);
    setMessage(null);
    const supabase = createClient();

    try {
      const newBalance = selectedTeacher.wallet_balance - payoutAmount;

      // Deduct from teacher's wallet
      const { error: walletError } = await supabase
        .from("profiles")
        .update({ wallet_balance: newBalance })
        .eq("id", selectedTeacher.id);

      if (walletError) throw walletError;

      // Record the payout transaction
      const { data: newTx, error: txError } = await supabase
        .from("transactions")
        .insert({
          student_id: selectedTeacher.id,
          amount: -payoutAmount,
          transaction_type: "withdrawal",
          status: "COMPLETED",
          reference_id: `PAYOUT-${Date.now()}`
        })
        .select(`
          id, amount, transaction_type, status, created_at,
          user:profiles!student_id(first_name, last_name, email, avatar_url)
        `)
        .single();

      if (txError) throw txError;

      // Update UI State instantly
      setTeachers(prev => prev.map(t => t.id === selectedTeacher.id ? { ...t, wallet_balance: newBalance } : t));
      
      const formattedNewTx = { ...newTx, user: Array.isArray(newTx.user) ? newTx.user[0] : newTx.user };
      setPayoutHistory(prev => [formattedNewTx, ...prev]);

      setMessage({ type: 'success', text: `Successfully paid $${payoutAmount.toFixed(2)} to ${selectedTeacher.first_name}.` });
      
      setTimeout(() => {
        setSelectedTeacher(null);
        setMessage(null);
        setPayoutAmount(0);
      }, 2000);

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to process payout.' });
    } finally {
      setIsProcessingPayout(false);
    }
  };

  // Metrics Calculations
  const stats = useMemo(() => {
    const totalGrossRevenue = studentPayments.filter(tx => tx.status === 'COMPLETED').reduce((acc, tx) => acc + tx.amount, 0);
    const totalFacultyLiability = teachers.reduce((acc, t) => acc + (t.wallet_balance || 0), 0);
    const totalPayoutsDistributed = payoutHistory.reduce((acc, tx) => acc + Math.abs(tx.amount), 0);
    const platformNetProfit = totalGrossRevenue - totalPayoutsDistributed - totalFacultyLiability; // سود خالص تقریبی پلتفرم (60%)

    return { totalGrossRevenue, totalFacultyLiability, totalPayoutsDistributed, platformNetProfit };
  }, [studentPayments, teachers, payoutHistory]);

  const filteredTeachers = useMemo(() => {
    if (!searchQuery) return teachers;
    return teachers.filter(t => t.first_name.toLowerCase().includes(searchQuery.toLowerCase()) || t.last_name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [teachers, searchQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Auditing Financial Records...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10" dir="ltr">
      
      {/* Background Ambience */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-teal-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto space-y-6 sm:space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <Link href="/en/admin" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-emerald-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <ArrowLeft size={14} /> Command Center
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
              Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Ledger</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-xl">
              Audit global platform revenue, manage the 60/40 profit splits, and process faculty payouts securely.
            </p>
          </div>
        </header>

        {/* ================= METRICS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#0a0a0f]/80 p-5 sm:p-6 rounded-[2rem] border border-white/5 shadow-xl backdrop-blur-xl">
            <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-4"><TrendingUp size={20}/></div>
            <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Gross Revenue (Inflows)</p>
            <p className="text-3xl font-black text-emerald-400">${stats.totalGrossRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
          </div>
          
          <div className="bg-[#0a0a0f]/80 p-5 sm:p-6 rounded-[2rem] border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)] backdrop-blur-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-amber-500/5"></div>
            <div className="relative z-10 w-10 h-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center mb-4 border border-amber-500/20"><Wallet size={20}/></div>
            <p className="relative z-10 text-[10px] font-black text-amber-500/70 uppercase tracking-widest mb-1">Faculty Liability (Unpaid)</p>
            <p className="relative z-10 text-3xl font-black text-amber-400">${stats.totalFacultyLiability.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
          </div>

          <div className="bg-[#0a0a0f]/80 p-5 sm:p-6 rounded-[2rem] border border-white/5 shadow-xl backdrop-blur-xl">
            <div className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-4"><CreditCard size={20}/></div>
            <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Total Distributed Payouts</p>
            <p className="text-3xl font-black text-white">${stats.totalPayoutsDistributed.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
          </div>

          <div className="bg-[#0a0a0f]/80 p-5 sm:p-6 rounded-[2rem] border-l-2 border-emerald-500/50 shadow-[inset_10px_0_20px_rgba(16,185,129,0.05)] backdrop-blur-xl">
            <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-4"><Building size={20}/></div>
            <p className="text-[10px] font-black text-emerald-500/70 uppercase tracking-widest mb-1">Estimated Net Profit (60%)</p>
            <p className="text-3xl font-black text-emerald-400">${Math.max(0, stats.platformNetProfit).toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
          </div>
        </div>

        {/* ================= TABS NAVIGATION ================= */}
        <div className="flex flex-wrap gap-2 bg-[#0a0a0f]/60 p-2 rounded-[1.5rem] border border-white/5 backdrop-blur-xl w-fit">
          <button onClick={() => setActiveTab("faculty")} className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === "faculty" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-neutral-500 hover:text-white"}`}>
            <Users size={14}/> Faculty Wallets
          </button>
          <button onClick={() => setActiveTab("inflows")} className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === "inflows" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-neutral-500 hover:text-white"}`}>
            <TrendingUp size={14}/> Student Payments
          </button>
          <button onClick={() => setActiveTab("outflows")} className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === "outflows" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-neutral-500 hover:text-white"}`}>
            <TrendingDown size={14}/> Payout History
          </button>
        </div>

        {/* ================= TAB 1: FACULTY WALLETS ================= */}
        {activeTab === "faculty" && (
          <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-3xl shadow-2xl animate-[fadeIn_0.3s_ease-out]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h3 className="text-xl font-black text-white flex items-center gap-2"><Wallet size={20} className="text-amber-400"/> Pending Faculty Payouts</h3>
              <div className="bg-black/40 p-2 rounded-2xl border border-white/5 flex items-center gap-2 w-full sm:max-w-xs shadow-inner">
                <div className="pl-3 text-neutral-500"><Search size={14} /></div>
                <input 
                  type="text" placeholder="Find instructor..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-white text-xs focus:outline-none py-2 pr-3 font-medium placeholder:text-neutral-600"
                />
              </div>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
              {filteredTeachers.length === 0 ? (
                <div className="text-center py-12 text-neutral-500">No instructors found.</div>
              ) : (
                filteredTeachers.map((teacher) => (
                  <div key={teacher.id} className="w-full text-left rounded-2xl border border-white/5 bg-black/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shrink-0 flex items-center justify-center shadow-inner">
                        {teacher.avatar_url ? <img src={teacher.avatar_url} className="w-full h-full object-cover" /> : <span className="font-black text-emerald-500">{teacher.first_name.charAt(0)}</span>}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-white text-sm truncate">{teacher.first_name} {teacher.last_name}</p>
                        <p className="text-[10px] text-neutral-500 font-mono mt-0.5 truncate">{teacher.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full border-t border-white/5 sm:border-0 pt-4 sm:pt-0">
                      <div className="text-left sm:text-right">
                        <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Unpaid Share (40%)</p>
                        <p className={`text-lg font-black tracking-tight ${teacher.wallet_balance > 0 ? "text-amber-400" : "text-white"}`}>
                          ${teacher.wallet_balance.toFixed(2)}
                        </p>
                      </div>
                      <button 
                        onClick={() => { setSelectedTeacher(teacher); setPayoutAmount(teacher.wallet_balance); }}
                        disabled={teacher.wallet_balance <= 0}
                        className="px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20"
                      >
                        <CreditCard size={14}/> Settle
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 2: STUDENT PAYMENTS (INFLOWS) ================= */}
        {activeTab === "inflows" && (
          <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-3xl shadow-2xl animate-[fadeIn_0.3s_ease-out]">
            <h3 className="text-xl font-black text-white flex items-center gap-2 mb-6 border-b border-white/5 pb-4"><TrendingUp size={20} className="text-emerald-400"/> Student Payments Ledger</h3>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
              {studentPayments.length === 0 ? (
                <div className="text-center py-12 text-neutral-500">No payment records found.</div>
              ) : (
                studentPayments.map((tx) => (
                  <div key={tx.id} className="w-full text-left rounded-2xl border border-white/5 bg-black/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-neutral-900 border border-emerald-500/20 shrink-0 flex items-center justify-center text-emerald-400 bg-emerald-500/5">
                        <DollarSign size={16}/>
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-white text-sm truncate">{tx.user?.first_name} {tx.user?.last_name}</p>
                        <p className="text-[10px] text-neutral-500 font-mono mt-0.5 truncate uppercase tracking-widest">{tx.transaction_type.replace('_', ' ')} • {new Date(tx.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-black text-emerald-400">+${tx.amount.toFixed(2)}</p>
                      <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500">{tx.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: PAYOUT HISTORY (OUTFLOWS) ================= */}
        {activeTab === "outflows" && (
          <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-3xl shadow-2xl animate-[fadeIn_0.3s_ease-out]">
            <h3 className="text-xl font-black text-white flex items-center gap-2 mb-6 border-b border-white/5 pb-4"><TrendingDown size={20} className="text-rose-400"/> Distributed Payouts Ledger</h3>
            
            <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
              {payoutHistory.length === 0 ? (
                <div className="text-center py-12 text-neutral-500">No payouts have been processed yet.</div>
              ) : (
                payoutHistory.map((tx) => (
                  <div key={tx.id} className="w-full text-left rounded-2xl border border-white/5 bg-black/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-neutral-900 border border-rose-500/20 shrink-0 flex items-center justify-center text-rose-400 bg-rose-500/5">
                        <CreditCard size={16}/>
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-white text-sm truncate">Paid to: {tx.user?.first_name} {tx.user?.last_name}</p>
                        <p className="text-[10px] text-neutral-500 font-mono mt-0.5 truncate uppercase tracking-widest">{new Date(tx.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-black text-white">${Math.abs(tx.amount).toFixed(2)}</p>
                      <span className="text-[8px] font-black uppercase tracking-widest text-neutral-400">{tx.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>

      {/* ================= MODAL: PROCESS PAYOUT ================= */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-[slideInUp_0.2s_ease-out] sm:animate-[fadeIn_0.2s_ease-out]">
          <div className="absolute inset-0 bg-[#020202]/95 backdrop-blur-md" onClick={() => !isProcessingPayout && setSelectedTeacher(null)}></div>
          
          <div className="relative w-full max-w-md bg-[#0a0a0f] border-t sm:border border-white/10 rounded-t-[2rem] sm:rounded-[2.5rem] shadow-[0_-20px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
            
            <div className="p-6 border-b border-white/5 bg-neutral-900/40 shrink-0 flex justify-between items-center">
              <div>
                <h2 className="text-base font-black text-white">Process Faculty Payout</h2>
                <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mt-0.5">To: {selectedTeacher.first_name} {selectedTeacher.last_name}</p>
              </div>
              <button disabled={isProcessingPayout} onClick={() => setSelectedTeacher(null)} className="w-10 h-10 bg-white/5 hover:bg-white/10 text-neutral-400 rounded-full flex items-center justify-center transition-all shrink-0">
                <X size={16} />
              </button>
            </div>
            
            <div className="p-6 sm:p-8 bg-[#050508] space-y-6">
              {message && (
                <div className={`p-4 rounded-xl flex items-center gap-3 text-xs font-bold border ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                  {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <p>{message.text}</p>
                </div>
              )}

              <form onSubmit={handleProcessPayout} className="space-y-6">
                <div className="bg-black/40 border border-white/5 rounded-2xl p-5 shadow-inner text-center">
                  <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">Unpaid Balance</p>
                  <p className="text-3xl font-black text-amber-400">${selectedTeacher.wallet_balance.toFixed(2)}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest block ml-1">Transfer Amount ($)</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-emerald-500 font-black">$</span>
                    <input 
                      type="number" step="0.01" required
                      max={selectedTeacher.wallet_balance}
                      value={payoutAmount}
                      onChange={(e) => setPayoutAmount(parseFloat(e.target.value) || 0)}
                      className="w-full bg-black border border-white/10 rounded-xl pl-8 pr-4 py-4 text-white text-lg font-black focus:outline-none focus:border-emerald-500/50 shadow-inner"
                    />
                  </div>
                  <p className="text-[9px] text-neutral-500 ml-1">This will deduct funds from the instructor's wallet and log a payout receipt.</p>
                </div>

                <button 
                  type="submit" 
                  disabled={isProcessingPayout || payoutAmount <= 0 || payoutAmount > selectedTeacher.wallet_balance}
                  className="w-full py-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessingPayout ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18}/>}
                  {isProcessingPayout ? "Processing..." : "Confirm & Record Payout"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}