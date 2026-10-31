"use client";

import { usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import {
  Loader2,
  ArrowLeft,
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Search,
  X,
  Building,
  Download,
  Filter,
  RefreshCw,
  Sparkles,
  Calendar,
  Check,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

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
  reference_id?: string;
  user: { first_name: string; last_name: string; email: string; avatar_url: string | null } | null;
};

export default function AdminFinancePage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

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
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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
        .order("wallet_balance", { ascending: false });

      if (facultyData) setTeachers(facultyData);

      // 2. Fetch All Transactions
      const { data: txData } = await supabase
        .from("transactions")
        .select(`
          id, amount, transaction_type, status, created_at, reference_id,
          user:profiles!student_id(first_name, last_name, email, avatar_url)
        `)
        .order("created_at", { ascending: false });

      if (txData) {
        const formattedTxs = txData.map((tx: any) => ({
          ...tx,
          user: Array.isArray(tx.user) ? tx.user[0] : tx.user
        }));

        const inflows = formattedTxs.filter(tx => ["deposit", "payment", "course_fee"].includes(tx.transaction_type));
        setStudentPayments(inflows);

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
      setMessage({ type: "error", text: "Invalid payout amount specified." });
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
      const refId = `PAYOUT-${Date.now().toString().slice(-8)}`;
      const { data: newTx, error: txError } = await supabase
        .from("transactions")
        .insert({
          student_id: selectedTeacher.id,
          amount: -payoutAmount,
          transaction_type: "withdrawal",
          status: "COMPLETED",
          reference_id: refId
        })
        .select(`
          id, amount, transaction_type, status, created_at, reference_id,
          user:profiles!student_id(first_name, last_name, email, avatar_url)
        `)
        .single();

      if (txError) throw txError;

      // Update UI State instantly
      setTeachers(prev =>
        prev.map(item => (item.id === selectedTeacher.id ? { ...item, wallet_balance: newBalance } : item))
      );

      const formattedNewTx = { ...newTx, user: Array.isArray(newTx.user) ? newTx.user[0] : newTx.user };
      setPayoutHistory(prev => [formattedNewTx, ...prev]);

      setMessage({
        type: "success",
        text: `Successfully settled $${payoutAmount.toFixed(2)} to ${selectedTeacher.first_name} (Ref: ${refId})`
      });

      setTimeout(() => {
        setSelectedTeacher(null);
        setMessage(null);
        setPayoutAmount(0);
      }, 2500);
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to process payout." });
    } finally {
      setIsProcessingPayout(false);
    }
  };

  // Export CSV Ledger
  const handleExportCSV = () => {
    let rows: string[][] = [];
    if (activeTab === "faculty") {
      rows = [["Teacher ID", "First Name", "Last Name", "Email", "Unpaid Balance"]];
      teachers.forEach(t => {
        rows.push([t.id, t.first_name, t.last_name, t.email, `$${t.wallet_balance.toFixed(2)}`]);
      });
    } else if (activeTab === "inflows") {
      rows = [["Transaction ID", "User Name", "Email", "Amount", "Type", "Status", "Date"]];
      studentPayments.forEach(tx => {
        rows.push([
          tx.id,
          `${tx.user?.first_name || ""} ${tx.user?.last_name || ""}`.trim(),
          tx.user?.email || "",
          `$${tx.amount.toFixed(2)}`,
          tx.transaction_type,
          tx.status,
          new Date(tx.created_at).toISOString()
        ]);
      });
    } else {
      rows = [["Payout ID", "Recipient", "Email", "Amount", "Reference", "Status", "Date"]];
      payoutHistory.forEach(tx => {
        rows.push([
          tx.id,
          `${tx.user?.first_name || ""} ${tx.user?.last_name || ""}`.trim(),
          tx.user?.email || "",
          `$${Math.abs(tx.amount).toFixed(2)}`,
          tx.reference_id || "N/A",
          tx.status,
          new Date(tx.created_at).toISOString()
        ]);
      });
    }

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `academy_finance_${activeTab}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Metrics Calculations
  const stats = useMemo(() => {
    const totalGrossRevenue = studentPayments
      .filter(tx => tx.status === "COMPLETED")
      .reduce((acc, tx) => acc + (Number(tx.amount) || 0), 0);
    const totalFacultyLiability = teachers.reduce((acc, t) => acc + (Number(t.wallet_balance) || 0), 0);
    const totalPayoutsDistributed = payoutHistory.reduce((acc, tx) => acc + Math.abs(Number(tx.amount) || 0), 0);
    const platformNetProfit = totalGrossRevenue - totalPayoutsDistributed - totalFacultyLiability;

    return { totalGrossRevenue, totalFacultyLiability, totalPayoutsDistributed, platformNetProfit };
  }, [studentPayments, teachers, payoutHistory]);

  const filteredTeachers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return teachers;
    return teachers.filter(
      t =>
        t.first_name.toLowerCase().includes(q) ||
        t.last_name.toLowerCase().includes(q) ||
        t.email.toLowerCase().includes(q)
    );
  }, [teachers, searchQuery]);

  const filteredInflows = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return studentPayments;
    return studentPayments.filter(
      tx =>
        tx.user?.first_name?.toLowerCase().includes(q) ||
        tx.user?.last_name?.toLowerCase().includes(q) ||
        tx.user?.email?.toLowerCase().includes(q) ||
        tx.transaction_type.toLowerCase().includes(q) ||
        String(tx.amount).includes(q)
    );
  }, [studentPayments, searchQuery]);

  const filteredOutflows = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return payoutHistory;
    return payoutHistory.filter(
      tx =>
        tx.user?.first_name?.toLowerCase().includes(q) ||
        tx.user?.last_name?.toLowerCase().includes(q) ||
        tx.user?.email?.toLowerCase().includes(q) ||
        tx.reference_id?.toLowerCase().includes(q) ||
        String(tx.amount).includes(q)
    );
  }, [payoutHistory, searchQuery]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030308] flex flex-col items-center justify-center space-y-4 text-white">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest animate-pulse">
          {t.adminPages.auditingFinancialRecords}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030308] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10 font-sans" dir={isRtl ? "rtl" : "ltr"}>

      {/* Ambient background glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-teal-600/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-[fadeIn_0.4s_ease-out]">

        {/* ================= HEADER ================= */}
        <header className="bg-gradient-to-r from-[#0a0a14] via-[#0d0d1a] to-[#07070d] p-6 sm:p-8 rounded-3xl border border-white/[0.08] backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10">
            <Link
              href={`/${currentLocale}/admin`}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-emerald-400 transition-colors mb-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/5"
            >
              <ArrowLeft size={13} /> Command Center
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
              {t.adminPages.financialLedger}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-xl leading-relaxed">
              Audit global platform revenue, manage the 60/40 revenue shares, and process faculty payouts securely with real-time audit ledger.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10">
            <button
              onClick={fetchFinanceData}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-bold text-neutral-300 hover:text-white transition-all active:scale-95"
            >
              <RefreshCw size={14} className="text-emerald-400" />
              <span>Refresh Ledger</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 font-black text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-emerald-500/10"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </div>
        </header>

        {/* ================= METRICS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#090913]/90 p-6 rounded-3xl border border-white/[0.08] shadow-xl backdrop-blur-xl group hover:border-emerald-500/30 transition-all">
            <div className="w-11 h-11 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-4 border border-emerald-500/20">
              <TrendingUp size={20} />
            </div>
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">
              {t.adminPages.grossRevenueInflows}
            </p>
            <p className="text-3xl font-black text-emerald-400 font-mono">
              ${stats.totalGrossRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <span className="text-[10px] text-neutral-500 mt-2 block font-mono">
              {studentPayments.length} Completed Inflows
            </span>
          </div>

          <div className="bg-[#090913]/90 p-6 rounded-3xl border border-amber-500/20 shadow-xl backdrop-blur-xl relative overflow-hidden group hover:border-amber-500/40 transition-all">
            <div className="absolute inset-0 bg-amber-500/[0.02]" />
            <div className="relative z-10 w-11 h-11 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mb-4 border border-amber-500/20">
              <Wallet size={20} />
            </div>
            <p className="relative z-10 text-[10px] font-black text-amber-400/90 uppercase tracking-widest mb-1">
              {t.adminPages.facultyLiabilityUnpaid}
            </p>
            <p className="relative z-10 text-3xl font-black text-amber-400 font-mono">
              ${stats.totalFacultyLiability.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <span className="relative z-10 text-[10px] text-amber-500/70 mt-2 block font-mono">
              {teachers.filter(t => t.wallet_balance > 0).length} Faculty with Balance
            </span>
          </div>

          <div className="bg-[#090913]/90 p-6 rounded-3xl border border-white/[0.08] shadow-xl backdrop-blur-xl group hover:border-blue-500/30 transition-all">
            <div className="w-11 h-11 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-4 border border-blue-500/20">
              <CreditCard size={20} />
            </div>
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">
              {t.adminPages.totalDistributedPayouts}
            </p>
            <p className="text-3xl font-black text-white font-mono">
              ${stats.totalPayoutsDistributed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <span className="text-[10px] text-neutral-500 mt-2 block font-mono">
              {payoutHistory.length} Settled Withdrawals
            </span>
          </div>

          <div className="bg-[#090913]/90 p-6 rounded-3xl border-l-4 border-emerald-500 shadow-xl backdrop-blur-xl">
            <div className="w-11 h-11 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-4 border border-emerald-500/20">
              <Building size={20} />
            </div>
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">
              {t.adminPages.estimatedNetProfit}
            </p>
            <p className="text-3xl font-black text-emerald-400 font-mono">
              ${Math.max(0, stats.platformNetProfit).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <span className="text-[10px] text-neutral-500 mt-2 block font-mono">
              Platform Treasury Reserve
            </span>
          </div>
        </div>

        {/* ================= TABS & SEARCH NAVIGATION ================= */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-3xl bg-[#090913]/90 border border-white/[0.08] backdrop-blur-xl shadow-xl">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            <button
              onClick={() => setActiveTab("faculty")}
              className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "faculty"
                  ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                  : "bg-white/[0.03] text-neutral-400 hover:text-white border border-white/5"
              }`}
            >
              <Users size={14} />
              <span>Faculty Wallets</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${activeTab === "faculty" ? "bg-black/20 text-black" : "bg-white/10 text-neutral-300"}`}>
                {teachers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("inflows")}
              className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "inflows"
                  ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                  : "bg-white/[0.03] text-neutral-400 hover:text-white border border-white/5"
              }`}
            >
              <TrendingUp size={14} />
              <span>Student Inflows</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${activeTab === "inflows" ? "bg-black/20 text-black" : "bg-white/10 text-neutral-300"}`}>
                {studentPayments.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("outflows")}
              className={`px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === "outflows"
                  ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                  : "bg-white/[0.03] text-neutral-400 hover:text-white border border-white/5"
              }`}
            >
              <TrendingDown size={14} />
              <span>Payout History</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${activeTab === "outflows" ? "bg-black/20 text-black" : "bg-white/10 text-neutral-300"}`}>
                {payoutHistory.length}
              </span>
            </button>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name, email, or ref..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-black/40 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:border-emerald-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* ================= TAB 1: FACULTY WALLETS ================= */}
        {activeTab === "faculty" && (
          <div className="bg-[#090913]/90 border border-white/[0.08] rounded-3xl p-6 sm:p-8 backdrop-blur-3xl shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-white/[0.06]">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Wallet size={18} className="text-amber-400" />
                <span>{t.adminPages.pendingFacultyPayouts}</span>
              </h3>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
              {filteredTeachers.length === 0 ? (
                <div className="text-center py-16 text-neutral-500 border border-dashed border-white/5 rounded-3xl bg-black/20">
                  {t.adminPages.noInstructorsFound}
                </div>
              ) : (
                filteredTeachers.map(teacher => (
                  <div
                    key={teacher.id}
                    className="w-full rounded-2xl border border-white/[0.06] bg-black/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-500/30 transition-all shadow-md"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shrink-0 flex items-center justify-center shadow-inner">
                        {teacher.avatar_url ? (
                          <img src={teacher.avatar_url} alt={teacher.first_name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-black text-emerald-400 text-lg">
                            {teacher.first_name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-white text-sm truncate">
                          {teacher.first_name} {teacher.last_name}
                        </p>
                        <p className="text-xs text-neutral-400 font-mono mt-0.5 truncate">{teacher.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full border-t border-white/5 sm:border-0 pt-4 sm:pt-0">
                      <div className="text-left sm:text-right">
                        <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500">
                          {t.adminPages.unpaidShare}
                        </p>
                        <p
                          className={`text-xl font-black font-mono tracking-tight ${
                            teacher.wallet_balance > 0 ? "text-amber-400" : "text-neutral-400"
                          }`}
                        >
                          ${teacher.wallet_balance.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedTeacher(teacher);
                          setPayoutAmount(teacher.wallet_balance);
                        }}
                        disabled={teacher.wallet_balance <= 0}
                        className="px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 shadow-md shadow-emerald-500/10"
                      >
                        <CreditCard size={14} /> Settle Payout
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
          <div className="bg-[#090913]/90 border border-white/[0.08] rounded-3xl p-6 sm:p-8 backdrop-blur-3xl shadow-2xl space-y-4">
            <h3 className="text-base font-black text-white flex items-center gap-2 pb-3 border-b border-white/[0.06]">
              <TrendingUp size={18} className="text-emerald-400" />
              <span>{t.adminPages.studentPaymentsLedger}</span>
            </h3>

            <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
              {filteredInflows.length === 0 ? (
                <div className="text-center py-16 text-neutral-500 border border-dashed border-white/5 rounded-3xl bg-black/20">
                  {t.adminPages.noPaymentRecords}
                </div>
              ) : (
                filteredInflows.map(tx => (
                  <div
                    key={tx.id}
                    className="w-full rounded-2xl border border-white/[0.06] bg-black/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-500/20 transition-all shadow-md"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-11 h-11 rounded-2xl overflow-hidden bg-neutral-900 border border-emerald-500/20 shrink-0 flex items-center justify-center text-emerald-400 bg-emerald-500/5">
                        <DollarSign size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-white text-sm truncate">
                          {tx.user?.first_name} {tx.user?.last_name}
                        </p>
                        <p className="text-[11px] text-neutral-400 font-mono mt-0.5 truncate uppercase tracking-wider">
                          {tx.transaction_type.replace("_", " ")} &bull; {new Date(tx.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-emerald-400 font-mono">+${tx.amount.toFixed(2)}</p>
                      <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 inline-block mt-1">
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: PAYOUT HISTORY (OUTFLOWS) ================= */}
        {activeTab === "outflows" && (
          <div className="bg-[#090913]/90 border border-white/[0.08] rounded-3xl p-6 sm:p-8 backdrop-blur-3xl shadow-2xl space-y-4">
            <h3 className="text-base font-black text-white flex items-center gap-2 pb-3 border-b border-white/[0.06]">
              <TrendingDown size={18} className="text-rose-400" />
              <span>Distributed Payouts & Faculty Settlements Ledger</span>
            </h3>

            <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
              {filteredOutflows.length === 0 ? (
                <div className="text-center py-16 text-neutral-500 border border-dashed border-white/5 rounded-3xl bg-black/20">
                  {t.adminPages.noPayoutsProcessed}
                </div>
              ) : (
                filteredOutflows.map(tx => (
                  <div
                    key={tx.id}
                    className="w-full rounded-2xl border border-white/[0.06] bg-black/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-rose-500/20 transition-all shadow-md"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-11 h-11 rounded-2xl overflow-hidden bg-neutral-900 border border-rose-500/20 shrink-0 flex items-center justify-center text-rose-400 bg-rose-500/5">
                        <CreditCard size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-white text-sm truncate">
                          Paid to: {tx.user?.first_name} {tx.user?.last_name}
                        </p>
                        <p className="text-[11px] text-neutral-400 font-mono mt-0.5 truncate uppercase tracking-wider">
                          REF: {tx.reference_id || "N/A"} &bull; {new Date(tx.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-white font-mono">
                        -${Math.abs(tx.amount).toFixed(2)}
                      </p>
                      <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 inline-block mt-1">
                        {tx.status}
                      </span>
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#020202]/90 backdrop-blur-md"
            onClick={() => !isProcessingPayout && setSelectedTeacher(null)}
          />

          <div className="relative w-full max-w-md bg-[#0a0a14] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col space-y-6">
            <div className="p-6 border-b border-white/[0.08] bg-black/40 flex justify-between items-center">
              <div>
                <h2 className="text-base font-black text-white">{t.adminPages.processFacultyPayout}</h2>
                <p className="text-xs text-emerald-400 font-mono mt-0.5">
                  Beneficiary: {selectedTeacher.first_name} {selectedTeacher.last_name}
                </p>
              </div>
              <button
                disabled={isProcessingPayout}
                onClick={() => setSelectedTeacher(null)}
                className="w-9 h-9 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white rounded-full flex items-center justify-center transition-all"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 pt-0 space-y-5">
              {message && (
                <div
                  className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-bold border ${
                    message.type === "success"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                  }`}
                >
                  {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <p>{message.text}</p>
                </div>
              )}

              <form onSubmit={handleProcessPayout} className="space-y-5">
                <div className="bg-black/60 border border-white/5 rounded-2xl p-5 shadow-inner text-center">
                  <p className="text-[10px] text-neutral-400 font-black uppercase tracking-widest mb-1">
                    {t.adminPages.unpaidBalance}
                  </p>
                  <p className="text-3xl font-black text-amber-400 font-mono">
                    ${selectedTeacher.wallet_balance.toFixed(2)}
                  </p>
                </div>

                {/* Preset quick percentage buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {[0.25, 0.5, 0.75, 1.0].map(pct => {
                    const val = Number((selectedTeacher.wallet_balance * pct).toFixed(2));
                    return (
                      <button
                        type="button"
                        key={pct}
                        onClick={() => setPayoutAmount(val)}
                        className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                          payoutAmount === val
                            ? "bg-emerald-500 text-black border-emerald-500"
                            : "bg-white/5 hover:bg-white/10 text-neutral-300 border-white/5"
                        }`}
                      >
                        {pct * 100}%
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block ml-1">
                    {t.adminPages.transferAmount}
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-emerald-400 font-black font-mono text-lg">$</span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      max={selectedTeacher.wallet_balance}
                      value={payoutAmount}
                      onChange={e => setPayoutAmount(parseFloat(e.target.value) || 0)}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-10 pr-4 py-4 text-white text-xl font-black font-mono focus:outline-none focus:border-emerald-400 transition-colors shadow-inner"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-neutral-500 px-1 pt-1 font-mono">
                    <span>Remaining Balance:</span>
                    <span className="text-neutral-300">
                      ${Math.max(0, selectedTeacher.wallet_balance - (payoutAmount || 0)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessingPayout || payoutAmount <= 0 || payoutAmount > selectedTeacher.wallet_balance}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-black rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessingPayout ? <Loader2 size={16} className="animate-spin text-black" /> : <CreditCard size={16} />}
                  <span>{isProcessingPayout ? "Recording Transaction..." : "Confirm & Record Payout"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}