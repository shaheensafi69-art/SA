"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Loader2, ArrowLeft, Mail, Wallet, BookOpen, Users, CheckCircle2, AlertCircle, TrendingUp, History, CreditCard, Award, X } from "lucide-react";

type TeacherProfile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  bio: string | null;
  avatar_url: string | null;
  wallet_balance: number;
  created_at: string;
};

type TeacherClass = {
  id: string;
  class_name: string;
  is_active: boolean;
  students_count: number;
  course: { title: string } | null;
};

type PayoutTransaction = {
  id: string;
  amount: number;
  status: string;
  created_at: string;
};

export default function TeacherProfileAdminPage() {
  const params = useParams();
  const router = useRouter();
  const teacherId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [teacher, setTeacher] = useState<TeacherProfile | null>(null);
  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [payouts, setPayouts] = useState<PayoutTransaction[]>([]);
  const [totalStudents, setTotalStudents] = useState(0);

  // استیت‌های مودال تسویه حساب (Payout)
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState<number>(0);
  const [isProcessingPayout, setIsProcessingPayout] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (teacherId) {
      fetchTeacherData();
    }
  }, [teacherId]);

  const fetchTeacherData = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      // ۱. اطلاعات پروفایل استاد
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", teacherId)
        .single();

      if (profileError) throw profileError;
      setTeacher(profileData);

      // ۲. کلاس‌های تحت مدیریت استاد
      const { data: classesData } = await supabase
        .from("class_groups")
        .select(`
          id, class_name, is_active,
          course:courses(title),
          class_students(student_id)
        `)
        .eq("teacher_id", teacherId);

      let uniqueStudents = new Set();
      let formattedClasses: TeacherClass[] = [];

      if (classesData) {
        formattedClasses = classesData.map((cls: any) => {
          if (cls.class_students) {
            cls.class_students.forEach((cs: any) => uniqueStudents.add(cs.student_id));
          }
          return {
            id: cls.id,
            class_name: cls.class_name,
            is_active: cls.is_active,
            students_count: cls.class_students?.length || 0,
            course: Array.isArray(cls.course) ? cls.course[0] : cls.course,
          };
        });
      }

      setClasses(formattedClasses);
      setTotalStudents(uniqueStudents.size);

      // ۳. تاریخچه پرداختی‌ها (تسویه‌حساب‌ها)
      const { data: transactionsData } = await supabase
        .from("transactions")
        .select("id, amount, status, created_at")
        .eq("student_id", teacherId)
        .eq("transaction_type", "withdrawal")
        .order("created_at", { ascending: false });

      if (transactionsData) {
        setPayouts(transactionsData);
      }

    } catch (error) {
      console.error("Error fetching teacher details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProcessPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacher) return;
    if (payoutAmount <= 0) {
      setMessage({ type: 'error', text: 'Payout amount must be greater than zero.' });
      return;
    }
    if (payoutAmount > teacher.wallet_balance) {
      setMessage({ type: 'error', text: 'Payout amount exceeds current wallet balance.' });
      return;
    }

    setIsProcessingPayout(true);
    setMessage(null);
    const supabase = createClient();

    try {
      const newBalance = teacher.wallet_balance - payoutAmount;

      // ۱. کسر از کیف پول استاد
      const { error: walletError } = await supabase
        .from("profiles")
        .update({ wallet_balance: newBalance })
        .eq("id", teacher.id);

      if (walletError) throw walletError;

      // ۲. ثبت تراکنش خروجی (Withdrawal / Payout)
      const { error: txError } = await supabase
        .from("transactions")
        .insert({
          student_id: teacher.id,
          amount: -payoutAmount, // ثبت منفی به عنوان خروجی
          transaction_type: "withdrawal",
          status: "COMPLETED",
          reference_id: `PAYOUT-${Date.now()}`
        });

      if (txError) throw txError;

      // بروزرسانی UI
      setTeacher({ ...teacher, wallet_balance: newBalance });
      setPayouts([
        { id: `temp-${Date.now()}`, amount: -payoutAmount, status: "COMPLETED", created_at: new Date().toISOString() },
        ...payouts
      ]);
      
      setMessage({ type: 'success', text: `Successfully paid out $${payoutAmount.toFixed(2)} to ${teacher.first_name}.` });
      setTimeout(() => {
        setIsPayoutModalOpen(false);
        setMessage(null);
        setPayoutAmount(0);
      }, 2500);

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to process payout.' });
    } finally {
      setIsProcessingPayout(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Instructor Data...</p>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center p-6 text-center">
        <ShieldAlert size={48} className="text-neutral-600 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Instructor Not Found</h2>
        <p className="text-neutral-500 mb-6">The requested faculty member does not exist or has been removed.</p>
        <Link href="/en/admin/manage-teachers" className="px-6 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition">Return to Directory</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10" dir="ltr">
      
      {/* Background Ambience */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto space-y-6 sm:space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER & PROFILE CARD ================= */}
        <section className="bg-[#0a0a0f]/80 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between md:items-end gap-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10 w-full">
            <Link href="/en/admin/manage-teachers" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-indigo-400 transition-colors mb-8 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 w-fit">
              <ArrowLeft size={14} /> Back to Faculty
            </Link>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-neutral-900 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-2xl">
                {teacher.avatar_url ? (
                  <img src={teacher.avatar_url} alt={teacher.first_name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-black text-indigo-500">{teacher.first_name.charAt(0)}{teacher.last_name.charAt(0)}</span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">{teacher.first_name} {teacher.last_name}</h1>
                  <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-[10px] font-black uppercase tracking-widest">
                    {teacher.role.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-medium text-neutral-400">
                  <p className="flex items-center gap-1.5"><Mail size={14} className="text-neutral-500"/> {teacher.email}</p>
                  <p className="flex items-center gap-1.5"><History size={14} className="text-neutral-500"/> Joined: {new Date(teacher.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= METRICS GRID ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#0a0a0f]/80 p-5 sm:p-6 rounded-[2rem] border border-white/5 shadow-xl backdrop-blur-xl">
            <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 rounded-xl flex items-center justify-center mb-4"><BookOpen size={20}/></div>
            <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Assigned Classes</p>
            <p className="text-3xl font-black text-white">{classes.length}</p>
          </div>
          <div className="bg-[#0a0a0f]/80 p-5 sm:p-6 rounded-[2rem] border border-white/5 shadow-xl backdrop-blur-xl">
            <div className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-4"><Users size={20}/></div>
            <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Total Students</p>
            <p className="text-3xl font-black text-white">{totalStudents}</p>
          </div>
          <div className="bg-[#0a0a0f]/80 p-5 sm:p-6 rounded-[2rem] border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)] backdrop-blur-xl lg:col-span-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-500/5"></div>
            <div className="relative z-10">
              <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-4 border border-emerald-500/20"><Wallet size={20}/></div>
              <p className="text-[10px] font-black text-emerald-500/70 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                Current Wallet Balance <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[8px]">40% Share</span>
              </p>
              <p className="text-4xl font-black text-emerald-400 tracking-tight">${teacher.wallet_balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
            </div>
            <button 
              onClick={() => { setPayoutAmount(teacher?.wallet_balance || 0); setIsPayoutModalOpen(true); }}
              disabled={teacher.wallet_balance <= 0}
              className="relative z-10 w-full sm:w-auto px-6 py-4 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95"
            >
              <CreditCard size={16}/> Process Payout
            </button>
          </div>
        </div>

        {/* ================= 2 COLUMN LAYOUT ================= */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 xl:grid-cols-[1.2fr_0.8fr]">
          
          {/* LEFT: CLASSES LIST */}
          <div className="space-y-6 sm:space-y-8">
            <section className="bg-[#0a0a0f]/80 border border-white/5 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-3xl h-full flex flex-col">
              <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
                <BookOpen size={18} className="text-indigo-400"/> Assigned Cohorts
              </h3>
              
              <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2 flex-1">
                {classes.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl bg-black/20 text-neutral-500 text-sm">
                    This instructor is not assigned to any classes yet.
                  </div>
                ) : (
                  classes.map((cls) => (
                    <div key={cls.id} className="w-full text-left rounded-2xl border border-white/5 bg-black/20 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/10 transition-colors">
                      <div>
                        <p className="font-bold text-white text-sm sm:text-base">{cls.class_name}</p>
                        <p className="text-[10px] uppercase tracking-widest text-neutral-500 mt-1 font-mono">Course: {cls.course?.title}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-lg text-[10px] font-black text-neutral-300 border border-white/5">
                          <Users size={12}/> {cls.students_count}
                        </span>
                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                          cls.is_active ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-neutral-800 text-neutral-400 border-neutral-700"
                        }`}>
                          {cls.is_active ? "Active" : "Closed"}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* RIGHT: FINANCIAL HISTORY */}
          <div className="space-y-6 sm:space-y-8">
            <section className="bg-[#0a0a0f]/80 border border-white/5 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-3xl h-full flex flex-col">
              <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
                <History size={18} className="text-emerald-400"/> Payout History
              </h3>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2 flex-1">
                {payouts.length === 0 ? (
                  <div className="text-center py-12 text-neutral-500 text-sm">
                    No payouts have been processed for this instructor yet.
                  </div>
                ) : (
                  payouts.map((tx) => (
                    <div key={tx.id} className="flex justify-between items-center bg-black/40 border border-white/5 rounded-xl p-4 gap-4">
                      <div>
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Withdrawal</p>
                        <p className="text-[10px] text-neutral-600 font-mono mt-1">{new Date(tx.created_at).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-base font-black text-white">
                          ${Math.abs(tx.amount).toFixed(2)}
                        </p>
                        <p className="text-[8px] font-black uppercase tracking-widest text-emerald-500 mt-0.5">Paid</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>

      </div>

      {/* ================= MODAL: PROCESS PAYOUT ================= */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-[slideInUp_0.2s_ease-out] sm:animate-[fadeIn_0.2s_ease-out]">
          <div className="absolute inset-0 bg-[#020202]/95 backdrop-blur-md" onClick={() => !isProcessingPayout && setIsPayoutModalOpen(false)}></div>
          
          <div className="relative w-full max-w-md bg-[#0a0a0f] border-t sm:border border-white/10 rounded-t-[2rem] sm:rounded-[2.5rem] shadow-[0_-20px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
            
            <div className="p-6 border-b border-white/5 bg-neutral-900/40 shrink-0 flex justify-between items-center">
              <div>
                <h2 className="text-base font-black text-white">Process Instructor Payout</h2>
                <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mt-0.5">Settle Wallet Balance</p>
              </div>
              <button disabled={isProcessingPayout} onClick={() => setIsPayoutModalOpen(false)} className="w-10 h-10 bg-white/5 hover:bg-white/10 text-neutral-400 rounded-full flex items-center justify-center transition-all shrink-0">
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
                  <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-1">Available Funds</p>
                  <p className="text-3xl font-black text-white">${teacher?.wallet_balance.toFixed(2)}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest block ml-1">Amount to Transfer/Pay</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-emerald-500 font-black">$</span>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      max={teacher?.wallet_balance}
                      value={payoutAmount}
                      onChange={(e) => setPayoutAmount(parseFloat(e.target.value) || 0)}
                      className="w-full bg-black border border-white/10 rounded-xl pl-8 pr-4 py-4 text-white text-lg font-black focus:outline-none focus:border-emerald-500/50 transition-colors shadow-inner"
                    />
                  </div>
                  <p className="text-[9px] text-neutral-500 ml-1">This amount will be deducted from their wallet and recorded as a paid withdrawal.</p>
                </div>

                <button 
                  type="submit" 
                  disabled={isProcessingPayout || payoutAmount <= 0 || payoutAmount > (teacher?.wallet_balance || 0)}
                  className="w-full py-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessingPayout ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18}/>}
                  {isProcessingPayout ? "Processing..." : "Confirm & Settle Payout"}
                </button>
              </form>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}