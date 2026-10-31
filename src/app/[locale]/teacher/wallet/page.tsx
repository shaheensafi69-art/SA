"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import { createClient } from "@/utils/supabase/client";
import {
  CreditCard,
  Gift,
  History,
  Users,
  Copy,
  CheckCircle2,
  LockKeyhole,
  UserPlus,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  TrendingUp,
  Sparkles,
  Send,
  MessageCircle,
  HelpCircle,
  Building2,
  ExternalLink,
  ShieldCheck,
  Check,
} from "lucide-react";
import Link from "next/link";

type Transaction = {
  id: string;
  amount: number;
  currency?: string;
  transaction_type: string;
  status: "COMPLETED" | "PENDING" | "FAILED";
  reference_id?: string;
  created_at: string;
};

type Referral = {
  id: string;
  reward_amount: number;
  is_paid: boolean;
  created_at: string;
  referred_name?: string;
};

export default function TeacherWalletPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"referrals" | "transactions" | "payouts">("referrals");

  const [wallet, setWallet] = useState({
    balance: 0,
    referralCode: "Generating...",
    totalRewards: 0,
    invitedBy: "",
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);

  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isCodeCopied, setIsCodeCopied] = useState(false);

  useEffect(() => {
    const fetchWalletData = async () => {
      setIsLoading(true);
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.push(`/${currentLocale}/login`);
        return;
      }
      const userId = session.user.id;

      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("wallet_balance, referral_code, referred_by")
          .eq("id", userId)
          .single();

        let invitedByName = "";

        if (profile?.referred_by) {
          const { data: referrerData } = await supabase
            .from("profiles")
            .select("first_name, last_name")
            .eq("id", profile.referred_by)
            .single();

          if (referrerData) {
            invitedByName = `${referrerData.first_name} ${referrerData.last_name}`;
          }
        }

        // Fetch transactions for this teacher
        const { data: txData } = await supabase
          .from("transactions")
          .select("*")
          .eq("student_id", userId)
          .order("created_at", { ascending: false });

        // Fetch referrals made by this teacher
        const { data: refData } = await supabase
          .from("referrals")
          .select("id, reward_amount, is_paid, created_at, referred_student_id")
          .eq("referrer_id", userId)
          .order("created_at", { ascending: false });

        let totalRefRewards = 0;
        const formattedRefs: Referral[] = [];

        if (refData && refData.length > 0) {
          const studentIds = refData
            .map((ref: any) => ref.referred_student_id)
            .filter(Boolean);

          let profilesMap: Record<string, string> = {};
          if (studentIds.length > 0) {
            const { data: profilesData } = await supabase
              .from("profiles")
              .select("id, first_name, last_name")
              .in("id", studentIds);

            if (profilesData) {
              profilesData.forEach((p: any) => {
                profilesMap[p.id] = `${p.first_name || ""} ${p.last_name || ""}`.trim() || (isRtl ? "شاگرد ثبت‌نامی" : "Scholar");
              });
            }
          }

          refData.forEach((ref: any) => {
            if (ref.is_paid) {
              totalRefRewards += Number(ref.reward_amount) || 0;
            }
            formattedRefs.push({
              id: ref.id,
              reward_amount: Number(ref.reward_amount) || 0,
              is_paid: Boolean(ref.is_paid),
              created_at: ref.created_at,
              referred_name: profilesMap[ref.referred_student_id] || (isRtl ? "شاگرد عضو شده" : "Scholar Member"),
            });
          });
        }

        setWallet({
          balance: Number(profile?.wallet_balance) || 0,
          referralCode: profile?.referral_code || userId.slice(0, 8).toUpperCase(),
          totalRewards: totalRefRewards,
          invitedBy: invitedByName,
        });

        setTransactions(txData || []);
        setReferrals(formattedRefs);
      } catch (error) {
        console.error("Error fetching teacher wallet data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletData();
  }, [currentLocale, router, isRtl]);

  const referralLink = `https://safiacademy.org/${currentLocale}/register?ref=${wallet.referralCode}`;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(wallet.referralCode);
    setIsCodeCopied(true);
    setTimeout(() => setIsCodeCopied(false), 2000);
  };

  const shareTelegram = () => {
    const text = encodeURIComponent(
      isRtl
        ? `به آکادمی صافی بپیوندید و با کد معرف من (${wallet.referralCode}) با ۱۰٪ تخفیف اختصاصی در برترین دوره‌های بازارهای مالی ثبت‌نام کنید:\n${referralLink}`
        : `Join Safi Academy with my faculty discount code (${wallet.referralCode}) to get 10% off top financial markets courses:\n${referralLink}`
    );
    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${text}`, "_blank");
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      isRtl
        ? `سلام! با استفاده از لینک دعوت اختصاصی من، با ۱۰٪ تخفیف در صنف‌های آکادمی صافی ثبت‌نام کن:\n${referralLink}`
        : `Hello! Register for Safi Academy classes using my exclusive faculty invite link and enjoy 10% discount:\n${referralLink}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div
      className="w-full relative overflow-hidden bg-[#020202] font-sans pb-28 min-h-screen text-white"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background Ambient Cosmic Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-fuchsia-600/10 rounded-full blur-[160px] pointer-events-none z-0"></div>
      <div className="absolute top-[40%] right-[20%] w-[35vw] h-[35vw] bg-amber-600/5 rounded-full blur-[180px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto space-y-8 animate-[fadeIn_0.35s_ease-out] relative z-10 px-4 sm:px-6 md:px-10 pt-6 sm:pt-8">
        
        {/* ================= HEADER ================= */}
        <header className="bg-[#0a0a0f]/90 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none"></div>

          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-400">
              <Sparkles size={12} className="text-emerald-400 animate-pulse" />
              <span>{isRtl ? "سیستم مالی و درآمدهای استاد" : "Faculty Financial & Revenue Terminal"}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              {isRtl ? "کیف پول اساتید" : "Faculty"}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400">
                SafiPay
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-xl leading-relaxed">
              {isRtl
                ? "مدیریت جامع موجودی دلاری، درآمدهای حق‌التدریس، پاداش‌های معرفی و تاریخچه تراکنش‌های مالی حساب شما."
                : "Manage your available tuition balances, referral earnings, withdrawals, and full transaction ledgers."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10">
            <Link
              href={`/${currentLocale}/teacher/referrals`}
              className="px-5 py-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 text-amber-400 text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95 shadow-md"
            >
              <Gift size={16} />
              <span>{isRtl ? "باشگاه رفرال و پاداش" : "Referral Club"}</span>
            </Link>

            {!isLoading && wallet.invitedBy && (
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3.5 rounded-2xl shadow-inner">
                <div className="w-10 h-10 bg-indigo-500/20 text-indigo-400 flex items-center justify-center rounded-xl shrink-0">
                  <UserPlus size={18} />
                </div>
                <div>
                  <p className="text-[9px] text-neutral-500 font-black uppercase tracking-widest">
                    {t.wallet?.invitedBy || (isRtl ? "معرفی‌شده توسط" : "Invited By")}
                  </p>
                  <p className="text-xs font-bold text-white mt-0.5 truncate max-w-[150px]">{wallet.invitedBy}</p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* ================= MAIN LAYOUT ================= */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* ================= LEFT COLUMN: CARDS ================= */}
          <div className="w-full lg:w-[420px] xl:w-[450px] shrink-0 flex flex-col gap-6">
            
            {/* 1. Digital Wallet Card (Faculty Edition) */}
            <div className="bg-gradient-to-br from-neutral-900/95 via-[#0b0f0e] to-black p-8 sm:p-10 rounded-[2.5rem] border border-emerald-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-52 h-52 bg-emerald-500/15 rounded-full blur-[60px] pointer-events-none group-hover:bg-emerald-500/25 transition-all duration-700"></div>

              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center p-2 shadow-lg backdrop-blur-sm">
                    <img src="/logo-without-b.png" alt="Safi" className="w-full h-full object-contain drop-shadow-md" />
                  </div>
                  <div>
                    <span className="font-black text-white tracking-widest text-xs uppercase opacity-90 block">
                      {t.wallet?.safiPay || "SafiPay Faculty"}
                    </span>
                    <span className="text-[9px] text-emerald-400 font-bold tracking-widest uppercase flex items-center gap-1">
                      <ShieldCheck size={11} />
                      <span>{isRtl ? "گره اعتباری اساتید" : "Verified Faculty Node"}</span>
                    </span>
                  </div>
                </div>
                <CreditCard className="w-6 h-6 text-neutral-400" />
              </div>

              <div className="mb-8 relative z-10">
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Wallet size={13} className="text-emerald-400" />
                  <span>{t.wallet?.availableBalance || (isRtl ? "موجودی قابل تسویه حساب" : "Available Balance")}</span>
                </p>
                <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tight flex items-baseline gap-1">
                  <span className="text-emerald-500 text-3xl sm:text-4xl">$</span>
                  {isLoading ? (
                    <span className="animate-pulse">---</span>
                  ) : (
                    wallet.balance.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  )}
                </h2>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 relative z-10">
                <div className="flex-1 relative group/btn cursor-not-allowed">
                  <button
                    disabled
                    className="w-full py-4 bg-white/5 border border-white/10 text-neutral-500 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 opacity-50"
                  >
                    {isRtl ? "افزایش موجودی" : "Add Funds"}
                  </button>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 px-3 py-1 rounded-md text-[8px] font-black tracking-widest uppercase shadow-[0_0_15px_rgba(234,179,8,0.3)] backdrop-blur-md flex items-center gap-1">
                    <LockKeyhole size={10} /> {isRtl ? "به‌زودی" : "Coming Soon"}
                  </div>
                </div>

                <div className="flex-1 relative group/btn cursor-not-allowed">
                  <button
                    disabled
                    className="w-full py-4 bg-emerald-500/10 border border-emerald-500/20 text-neutral-400 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 opacity-50"
                  >
                    {isRtl ? "تسویه‌حساب بانکی" : "Withdraw Funds"}
                  </button>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 px-3 py-1 rounded-md text-[8px] font-black tracking-widest uppercase shadow-[0_0_15px_rgba(234,179,8,0.3)] backdrop-blur-md flex items-center gap-1">
                    <LockKeyhole size={10} /> {isRtl ? "به‌زودی" : "Coming Soon"}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Referral Invite Card */}
            <div className="bg-gradient-to-br from-amber-950/20 via-[#0d0a07] to-black p-8 sm:p-10 rounded-[2.5rem] border border-amber-500/25 backdrop-blur-xl relative overflow-hidden group shadow-2xl">
              <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-amber-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-amber-500/20 transition-all duration-700"></div>

              <div className="relative z-10 mb-6">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mb-4 border border-amber-500/20 shadow-inner">
                  <Gift size={24} />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                  {isRtl ? "معرفی دانشجو و کسب پاداش نقدی" : "Invite & Earn Direct Bonus"}
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  {isRtl
                    ? "لینک اختصاصی خود را با شاگردان و همکاران به اشتراک بگذارید. آن‌ها ۱۰٪ تخفیف ثبت‌نام دریافت می‌کنند و پاداش دلاری مستقیماً به کیف پول شما واریز می‌شود."
                    : "Share your unique faculty referral link. Students get a 10% discount and cash rewards are credited straight to your SafiPay wallet."}
                </p>
              </div>

              {/* Referral Code & Master Link */}
              <div className="flex flex-col gap-3.5 relative z-10">
                {/* Code */}
                <div className="bg-black/60 border border-white/5 p-4 rounded-2xl flex flex-col gap-2">
                  <p className="text-[9px] text-neutral-400 font-black uppercase tracking-widest px-1">
                    {t.wallet?.yourReferralCode || (isRtl ? "کد معرف اختصاصی شما" : "Your Referral Code")}
                  </p>
                  <div className="flex items-center gap-2.5">
                    <div className="flex-1 bg-white/5 px-4 py-3 rounded-xl border border-white/10 flex items-center">
                      <p className="font-mono text-amber-400 text-sm font-bold tracking-wider truncate">
                        {isLoading ? "..." : wallet.referralCode}
                      </p>
                    </div>
                    <button
                      onClick={copyCode}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all active:scale-95 ${
                        isCodeCopied
                          ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                          : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                      }`}
                    >
                      {isCodeCopied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>

                {/* Master Link */}
                <div className="bg-black/60 border border-white/5 p-4 rounded-2xl flex flex-col gap-2">
                  <p className="text-[9px] text-neutral-400 font-black uppercase tracking-widest px-1">
                    {t.wallet?.yourMasterLink || (isRtl ? "لینک مستقیم ثبت‌نام" : "Direct Registration Link")}
                  </p>
                  <div className="flex items-center gap-2.5">
                    <div className="flex-1 bg-white/5 px-4 py-3 rounded-xl border border-white/10 flex items-center overflow-hidden">
                      <p className="font-mono text-neutral-300 text-xs truncate">
                        {isLoading ? "Generating..." : referralLink}
                      </p>
                    </div>
                    <button
                      onClick={copyLink}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all active:scale-95 ${
                        isLinkCopied
                          ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                          : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                      }`}
                    >
                      {isLinkCopied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>

                {/* Social Share Buttons */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button
                    onClick={shareTelegram}
                    className="py-3 px-4 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/25 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <Send size={14} />
                    <span>Telegram</span>
                  </button>
                  <button
                    onClick={shareWhatsApp}
                    className="py-3 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/25 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Total Referral Cash Earned */}
              <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6 relative z-10">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-neutral-400" />
                  <span className="text-[10px] text-neutral-400 font-black uppercase tracking-widest">
                    {t.wallet?.totalCashEarned || (isRtl ? "کل پاداش رفرال پرداخت‌شده" : "Total Cash Earned")}
                  </span>
                </div>
                <span className="text-emerald-400 font-black text-2xl font-mono">
                  ${isLoading ? "-" : wallet.totalRewards.toFixed(2)}
                </span>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: TABS & LISTS ================= */}
          <div className="flex-1 w-full flex flex-col gap-6">
            
            {/* Tab Switcher */}
            <div className="flex items-center gap-2 bg-[#0a0a0f]/90 p-2 rounded-[1.5rem] border border-white/5 shadow-inner w-full sm:w-fit backdrop-blur-xl">
              <button
                onClick={() => setActiveTab("referrals")}
                className={`flex-1 sm:flex-none px-6 sm:px-8 py-3.5 rounded-[1.2rem] text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  activeTab === "referrals"
                    ? "bg-amber-500/15 text-amber-400 shadow-md border border-amber-500/30"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Users size={16} />
                <span>{isRtl ? "شبکه دعوت‌شدگان" : "Affiliate Network"} ({referrals.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("transactions")}
                className={`flex-1 sm:flex-none px-6 sm:px-8 py-3.5 rounded-[1.2rem] text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  activeTab === "transactions"
                    ? "bg-white/10 text-white shadow-md border border-white/15"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <History size={16} />
                <span>{isRtl ? "دفتر کل تراکنش‌ها" : "Transactions"} ({transactions.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("payouts")}
                className={`flex-1 sm:flex-none px-6 sm:px-8 py-3.5 rounded-[1.2rem] text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  activeTab === "payouts"
                    ? "bg-emerald-500/15 text-emerald-400 shadow-md border border-emerald-500/30"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Building2 size={16} />
                <span>{isRtl ? "شرایط تسویه‌حساب" : "Payout Terms"}</span>
              </button>
            </div>

            {/* Tab Content Container */}
            <div className="bg-[#0a0a0f]/90 border border-white/5 rounded-[2.5rem] p-4 sm:p-8 min-h-[550px] backdrop-blur-3xl shadow-xl">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse"></div>
                  ))}
                </div>
              ) : activeTab === "transactions" ? (
                /* ================= TRANSACTIONS TAB ================= */
                transactions.length > 0 ? (
                  <div className="space-y-3">
                    {transactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="bg-black/40 hover:bg-white/5 p-4 sm:p-6 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg shrink-0 shadow-inner ${
                              tx.transaction_type === "DEPOSIT" ||
                              tx.transaction_type === "REFERRAL_REWARD" ||
                              tx.transaction_type === "deposit" ||
                              tx.transaction_type === "course_fee"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : tx.transaction_type === "WITHDRAWAL" || tx.transaction_type === "withdrawal"
                                ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            }`}
                          >
                            {tx.transaction_type === "DEPOSIT" || tx.transaction_type === "deposit" ? (
                              <ArrowDownLeft size={20} />
                            ) : tx.transaction_type === "WITHDRAWAL" || tx.transaction_type === "withdrawal" ? (
                              <ArrowUpRight size={20} />
                            ) : tx.transaction_type === "REFERRAL_REWARD" ? (
                              <Gift size={20} />
                            ) : (
                              <DollarSign size={20} />
                            )}
                          </div>
                          <div>
                            <h4 className="font-black text-white text-sm tracking-wide">
                              {tx.transaction_type.replace(/_/g, " ").toUpperCase()}
                            </h4>
                            <p className="text-[10px] text-neutral-400 font-mono mt-1 uppercase tracking-wider">
                              {new Date(tx.created_at).toLocaleDateString()} •{" "}
                              {new Date(tx.created_at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                          <p
                            className={`font-black text-lg font-mono ${
                              tx.amount > 0 ? "text-emerald-400" : "text-white"
                            }`}
                          >
                            {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                          </p>
                          <span
                            className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md mt-1 inline-block ${
                              tx.status === "COMPLETED"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : tx.status === "PENDING"
                                ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                : "bg-red-500/10 text-red-400 border border-red-500/20"
                            }`}
                          >
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-24 sm:py-32">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                      <CreditCard className="w-10 h-10 text-neutral-600" />
                    </div>
                    <p className="text-xl font-black text-white mb-2">
                      {t.wallet?.noTransactionsFound || (isRtl ? "هیچ تراکنشی یافت نشد" : "No Transactions Recorded")}
                    </p>
                    <p className="text-neutral-400 text-xs sm:text-sm max-w-sm">
                      {isRtl
                        ? "با انجام اولین پرداخت یا دریافت پاداش، تاریخچه تراکنش‌های شما در این بخش ثبت خواهد شد."
                        : "Your teaching revenues and reward deposits will appear here as transactions occur."}
                    </p>
                  </div>
                )
              ) : activeTab === "referrals" ? (
                /* ================= REFERRALS NETWORK TAB ================= */
                referrals.length > 0 ? (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {referrals.map((ref) => (
                      <div
                        key={ref.id}
                        className="bg-black/40 hover:bg-amber-900/10 p-5 rounded-2xl border border-white/5 hover:border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all group shadow-inner"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-lg font-black text-amber-400 border border-amber-500/20 shrink-0">
                            {ref.referred_name?.charAt(0) || "S"}
                          </div>
                          <div>
                            <h4 className="font-black text-white text-sm">{ref.referred_name}</h4>
                            <p className="text-[10px] text-neutral-400 font-mono mt-1 uppercase tracking-wider">
                              {isRtl ? "تاریخ عضویت: " : "Joined: "}
                              {new Date(ref.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                          <span className="text-amber-400 font-mono font-black text-base">
                            +${ref.reward_amount.toFixed(2)}
                          </span>
                          <span
                            className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md mt-1 inline-block ${
                              ref.is_paid
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-white/5 text-neutral-400 border border-white/10"
                            }`}
                          >
                            {ref.is_paid ? (isRtl ? "واریز شده" : "Paid") : (isRtl ? "در انتظار" : "Pending")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-24 sm:py-32">
                    <div className="w-20 h-20 bg-amber-500/5 rounded-full flex items-center justify-center mb-6">
                      <Users className="w-10 h-10 text-amber-600/50" />
                    </div>
                    <p className="text-xl font-black text-white mb-2">
                      {t.wallet?.networkIsEmpty || (isRtl ? "شبکه معرف شما خالی است" : "Affiliate Network Is Empty")}
                    </p>
                    <p className="text-neutral-400 text-xs sm:text-sm max-w-sm mb-6">
                      {isRtl
                        ? "لینک اختصاصی خود را در گروه‌ها و شبکه‌های اجتماعی به اشتراک بگذارید تا شاگردان با تخفیف به آکادمی بپیوندند."
                        : "Share your exclusive faculty invite link on Telegram or WhatsApp to invite students and earn cash rewards."}
                    </p>
                    <button
                      onClick={copyLink}
                      className="px-6 py-3 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2"
                    >
                      <Copy size={15} />
                      <span>{isRtl ? "کپی لینک اختصاصی معرف" : "Copy Faculty Invite Link"}</span>
                    </button>
                  </div>
                )
              ) : (
                /* ================= PAYOUTS INFORMATION TAB ================= */
                <div className="space-y-6 max-w-2xl py-4">
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4">
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      <Building2 size={18} className="text-emerald-400" />
                      <span>{isRtl ? "دستورالعمل و ضوابط تسویه‌حساب اساتید" : "Faculty Payout Regulations"}</span>
                    </h3>

                    <ul className="space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed list-disc list-inside">
                      <li>
                        {isRtl
                          ? "حداقل موجودی مجاز برای ثبت درخواست تسویه‌حساب بانکی، ۵۰ دلار می‌باشد."
                          : "Minimum wallet threshold for bank settlement withdrawal is $50.00."}
                      </li>
                      <li>
                        {isRtl
                          ? "واریزی‌های تسویه‌حساب اساتید در روزهای اول هر ماه میلادی به‌صورت خودکار به حساب بانکی یا تتر (USDT) ارسال می‌گردد."
                          : "Faculty earnings are disbursed on the 1st of each calendar month via direct wire or USDT."}
                      </li>
                      <li>
                        {isRtl
                          ? "جهت ثبت یا تغییر شماره حساب بانکی و آدرس والت کریپتو، می‌توانید با واحد مالی آکادمی از طریق پشتیبانی هماهنگ فرمایید."
                          : "To update your payout accounts, please reach out to Academy Finance via the Support tab."}
                      </li>
                    </ul>
                  </div>

                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-white">
                        {isRtl ? "نیاز به تسویه حساب فوری دارید؟" : "Need an expedited settlement?"}
                      </p>
                      <p className="text-xs text-neutral-400 mt-1">
                        {isRtl
                          ? "تیکت پشتیبانی مالی ثبت کنید تا همکاران بخش حسابداری در اسرع وقت اقدام نمایند."
                          : "Open a finance support ticket for rapid review and dispatch."}
                      </p>
                    </div>

                    <Link
                      href={`/${currentLocale}/teacher/support`}
                      className="px-5 py-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider shrink-0 transition-all"
                    >
                      {isRtl ? "ارسال تیکت مالی" : "Contact Finance"}
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
