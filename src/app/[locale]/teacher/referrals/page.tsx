"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import {
  Share2,
  Users,
  Wallet,
  Copy,
  Check,
  Gift,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Send,
  DollarSign,
  TrendingUp,
  Award,
  Layers,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface ReferralRecord {
  id: string;
  referred_student_id: string;
  reward_amount: number;
  is_paid: boolean;
  created_at: string;
  referred_name?: string;
}

export default function TeacherReferralsPage() {
  const router = useRouter();
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [isLoading, setIsLoading] = useState(true);
  const [referralCode, setReferralCode] = useState<string>("SAFI");
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [discountRate, setDiscountRate] = useState<number>(10);
  const [referrals, setReferrals] = useState<ReferralRecord[]>([]);
  const [hasCopied, setHasCopied] = useState(false);
  const [hasCopiedCode, setHasCopiedCode] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadReferralData() {
      try {
        const supabase = createClient();
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user) {
          router.replace(`/${currentLocale}/login`);
          return;
        }

        const [profileRes, referralsRes] = await Promise.all([
          supabase
            .from("profiles")
            .select("referral_code, wallet_balance, referral_discount_rate")
            .eq("id", user.id)
            .single(),
          supabase
            .from("referrals")
            .select("id, referred_student_id, reward_amount, is_paid, created_at")
            .eq("referrer_id", user.id)
            .order("created_at", { ascending: false }),
        ]);

        if (!isMounted) return;

        if (profileRes.data) {
          setReferralCode(
            profileRes.data.referral_code || user.id.slice(0, 8).toUpperCase()
          );
          setWalletBalance(Number(profileRes.data.wallet_balance || 0));
          setDiscountRate(Number(profileRes.data.referral_discount_rate || 10));
        }

        if (referralsRes.data && referralsRes.data.length > 0) {
          const studentIds = referralsRes.data
            .map((r: any) => r.referred_student_id)
            .filter(Boolean);

          let profilesMap: Record<string, string> = {};
          if (studentIds.length > 0) {
            const { data: profilesData } = await supabase
              .from("profiles")
              .select("id, first_name, last_name")
              .in("id", studentIds);

            if (profilesData) {
              profilesData.forEach((p: any) => {
                profilesMap[p.id] = `${p.first_name || ""} ${p.last_name || ""}`.trim() || (isRtl ? "دانشجوی عضو شده" : "Scholar");
              });
            }
          }

          const formatted: ReferralRecord[] = referralsRes.data.map((r: any) => ({
            id: r.id,
            referred_student_id: r.referred_student_id,
            reward_amount: Number(r.reward_amount) || 0,
            is_paid: Boolean(r.is_paid),
            created_at: r.created_at,
            referred_name: profilesMap[r.referred_student_id] || (isRtl ? "شاگرد ثبت‌نامی" : "Scholar Member"),
          }));

          setReferrals(formatted);
        } else {
          setReferrals([]);
        }
      } catch (err) {
        console.error("Error loading faculty referral data:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadReferralData();

    return () => {
      isMounted = false;
    };
  }, [router, currentLocale, isRtl]);

  const referralLink = `https://safiacademy.org/${currentLocale}/register?ref=${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setHasCopiedCode(true);
    setTimeout(() => setHasCopiedCode(false), 2500);
  };

  const handleShareTelegram = () => {
    const text = encodeURIComponent(
      isRtl
        ? `به آکادمی صافی بپیوندید و با کد معرف من (${referralCode}) با ${discountRate}٪ تخفیف اختصاصی در معتبرترین دوره‌های مالی و تریدینگ ثبت‌نام کنید:\n${referralLink}`
        : `Join Safi Academy using my faculty referral code (${referralCode}) to get an exclusive ${discountRate}% tuition discount:\n${referralLink}`
    );
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${text}`,
      "_blank"
    );
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      isRtl
        ? `سلام! با استفاده از لینک دعوت اختصاصی من، با ${discountRate}٪ تخفیف در صنف‌های آکادمی صافی ثبت نام کن:\n${referralLink}`
        : `Hello! Register for Safi Academy classes using my exclusive faculty invite link and enjoy a ${discountRate}% discount:\n${referralLink}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const totalEarnings = referrals
    .filter((r) => r.is_paid)
    .reduce((acc, r) => acc + (Number(r.reward_amount) || 0), 0);

  const pendingEarnings = referrals
    .filter((r) => !r.is_paid)
    .reduce((acc, r) => acc + (Number(r.reward_amount) || 0), 0);

  if (isLoading) {
    return (
      <div
        className="w-full min-h-screen bg-[#020202] text-white p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-pulse"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="h-48 bg-neutral-900/60 rounded-[2.5rem] border border-white/5"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-28 bg-neutral-900/50 rounded-2xl border border-white/5"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen bg-[#020202] text-white font-sans pb-32"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background Ambience Cosmic Glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/10 via-fuchsia-600/10 to-transparent rounded-full blur-[170px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 right-10 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[170px] pointer-events-none -z-10"></div>

      <div className="px-4 sm:px-6 md:px-10 pt-6 md:pt-10 max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* 1. HERO BANNER */}
        <section className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-[#120e0a]/95 via-[#0c0906]/90 to-[#030306] border border-amber-500/20 p-6 sm:p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Gift size={12} className="text-amber-400" />
                <span>{isRtl ? "باشگاه سفیران و همکاران آکادمی صافی" : "Faculty Affiliate & Ambassador Club"}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                {isRtl ? "دعوت از شاگردان و همکاران،" : "Refer Scholars & Faculty,"}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
                  {isRtl ? "کسب پاداش دلاری مستقیم" : "Earn Direct Cash Rewards"}
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed font-medium">
                {isRtl
                  ? `لینک و کد اختصاصی خود را با شاگردان و علاقه‌مندان به بازارهای مالی به اشتراک بگذارید. آن‌ها ${discountRate}٪ تخفیف در ثبت‌نام تمام دوره‌ها دریافت می‌کنند و پاداش دلاری ثبت‌نام مستقیماً به کیف پول شما واریز می‌شود.`
                  : `Share your exclusive invite link. Students receive ${discountRate}% tuition discounts, and cash referral rewards are deposited directly into your faculty wallet.`}
              </p>
            </div>

            {/* Wallet Quick Balance */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/${currentLocale}/teacher/wallet`}
                className="px-6 py-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 shadow-xl flex items-center gap-4 transition-all group active:scale-95"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                  <Wallet size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                    {isRtl ? "موجودی کیف پول" : "Withdrawable Wallet"}
                  </span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">
                    ${walletBalance.toFixed(2)}
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Referral Link & Code Copy Bar */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-stretch md:items-center gap-3 max-w-3xl">
            {/* Code Chip */}
            <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 shrink-0">
              <span className="text-[10px] text-amber-400 uppercase font-black mr-2">
                {isRtl ? "کد معرف:" : "Code:"}
              </span>
              <span className="font-mono text-sm font-black text-white px-2">
                {referralCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="text-amber-400 hover:text-white transition-colors ml-2 shrink-0 p-1 rounded-lg"
                title="Copy Code"
              >
                {hasCopiedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
            </div>

            {/* Master Link */}
            <div className="flex-1 flex items-center justify-between px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 font-mono text-xs text-amber-400 overflow-hidden">
              <span className="truncate">{referralLink}</span>
              <button
                onClick={handleCopyLink}
                className="text-neutral-400 hover:text-white transition-colors ml-3 shrink-0 flex items-center gap-1.5 font-bold cursor-pointer"
              >
                {hasCopied ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-400">{isRtl ? "کپی شد" : "Copied"}</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>{isRtl ? "کپی لینک" : "Copy"}</span>
                  </>
                )}
              </button>
            </div>

            {/* Share Shortcuts */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleShareTelegram}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-sky-500/15 text-sky-400 border border-sky-500/30 hover:bg-sky-500 hover:text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                <Send size={14} />
                <span>Telegram</span>
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md"
              >
                <MessageCircle size={14} />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </section>

        {/* 2. STATS KPI STRIP */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0a0a0f]/80 border border-white/5 space-y-1 backdrop-blur-xl">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
              <span>{isRtl ? "کل دعوت‌شدگان" : "Total Referrals"}</span>
              <Users size={16} className="text-amber-400" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {referrals.length}
            </span>
            <p className="text-[10px] text-neutral-500 font-medium">
              {isRtl ? "عضو ثبت‌شده با کد شما" : "Registered via code"}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0a0a0f]/80 border border-white/5 space-y-1 backdrop-blur-xl">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
              <span>{isRtl ? "ثبت‌نام‌های نهایی" : "Enrolled Scholars"}</span>
              <ShieldCheck size={16} className="text-emerald-400" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              {referrals.filter((r) => r.is_paid).length}
            </span>
            <p className="text-[10px] text-emerald-500/70 font-medium">
              {isRtl ? "پرداخت پاداش تکمیل‌شده" : "Rewarded and active"}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0a0a0f]/80 border border-white/5 space-y-1 backdrop-blur-xl">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
              <span>{isRtl ? "کل پاداش دریافتی" : "Total Earned"}</span>
              <TrendingUp size={16} className="text-emerald-400" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              ${totalEarnings.toFixed(2)}
            </span>
            <p className="text-[10px] text-neutral-500 font-medium">
              {isRtl ? "واریز شده به کیف پول" : "Credited to wallet"}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0a0a0f]/80 border border-white/5 space-y-1 backdrop-blur-xl">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
              <span>{isRtl ? "در انتظار تایید" : "Pending Payout"}</span>
              <DollarSign size={16} className="text-yellow-400" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-yellow-400 font-mono">
              ${pendingEarnings.toFixed(2)}
            </span>
            <p className="text-[10px] text-yellow-500/70 font-medium">
              {isRtl ? "در حال پردازش مالی" : "Processing clearance"}
            </p>
          </div>
        </section>

        {/* 3. HOW IT WORKS WORKFLOW */}
        <section className="bg-[#0a0a0f]/90 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-xl space-y-6 shadow-xl">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-amber-400" />
            <h2 className="text-lg sm:text-xl font-black text-white">
              {isRtl ? "نحوه کارکرد سیستم معرف در ۳ گام ساده" : "How Faculty Referral Works"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <span className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-black text-sm font-mono border border-amber-500/30">
                1
              </span>
              <h3 className="font-bold text-white text-base">
                {isRtl ? "اشتراک‌گذاری لینک یا کد" : "Share Your Link"}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-medium">
                {isRtl
                  ? "لینک اختصاصی خود را در تلگرام، اینستاگرام، یا در صنف‌های درسی برای دانشجویان ارسال کنید."
                  : "Distribute your unique faculty referral URL or invite code across social networks or student groups."}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <span className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-black text-sm font-mono border border-amber-500/30">
                2
              </span>
              <h3 className="font-bold text-white text-base">
                {isRtl ? "ثبت‌نام دانشجو با تخفیف" : "Student Enrolls"}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-medium">
                {isRtl
                  ? `مخاطب شما با کد شما ثبت‌نام کرده و ${discountRate}٪ تخفیف شهریه دریافت می‌کند.`
                  : `Your invitee registers with your code and receives a guaranteed ${discountRate}% discount.`}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <span className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-black text-sm font-mono border border-emerald-500/30">
                3
              </span>
              <h3 className="font-bold text-white text-base">
                {isRtl ? "دریافت پاداش دلاری نقدی" : "Earn Cash Rewards"}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-medium">
                {isRtl
                  ? "پورسانت هر خرید دوره بلافاصله در کیف پول SafiPay شما شارژ و قابل برداشت می‌شود."
                  : "Bonus cash is credited directly to your SafiPay wallet upon course checkout, fully withdrawable."}
              </p>
            </div>
          </div>
        </section>

        {/* 4. REFERRED MEMBERS ROSTER */}
        <section className="bg-[#0a0a0f]/90 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-xl space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Users size={18} className="text-amber-400" />
                <span>{isRtl ? "فهرست اعضای دعوت‌شده توسط شما" : "Your Invited Scholar Roster"}</span>
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                {isRtl
                  ? `مجموعاً ${referrals.length} کاربر با کد شما در آکادمی ثبت‌نام کرده‌اند.`
                  : `A total of ${referrals.length} students enrolled with your faculty referral.`}
              </p>
            </div>

            <Link
              href={`/${currentLocale}/teacher/wallet`}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Wallet size={14} className="text-emerald-400" />
              <span>{isRtl ? "مشاهده در کیف پول" : "View in Wallet"}</span>
            </Link>
          </div>

          {referrals.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 bg-white/[0.01] border border-dashed border-white/10 rounded-2xl p-6">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Users size={28} />
              </div>
              <h3 className="text-base font-bold text-white">
                {isRtl ? "هنوز کاربری با کد شما ثبت‌نام نکرده است" : "No Referred Scholars Yet"}
              </h3>
              <p className="text-xs text-neutral-400 max-w-sm">
                {isRtl
                  ? "لینک بالا را کپی کرده و برای دانشجویان بفرستید تا اولین پاداش دلاری خود را کسب کنید."
                  : "Copy your faculty referral link and start inviting students to earn lifetime rewards."}
              </p>
              <button
                onClick={handleCopyLink}
                className="px-6 py-3 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider rounded-xl transition-all"
              >
                {isRtl ? "کپی لینک دعوت" : "Copy Invite Link"}
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto custom-scrollbar">
              <table
                className="w-full text-left border-collapse whitespace-nowrap min-w-[700px]"
                dir={isRtl ? "rtl" : "ltr"}
              >
                <thead>
                  <tr className="border-b border-white/10 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">{isRtl ? "دانشجو / همکار" : "Invited Scholar"}</th>
                    <th className="py-3 px-4">{isRtl ? "تاریخ ثبت‌نام" : "Date Joined"}</th>
                    <th className="py-3 px-4 text-center">{isRtl ? "مبلغ پاداش" : "Reward Amount"}</th>
                    <th className="py-3 px-4 text-right">{isRtl ? "وضعیت تسویه" : "Settlement Status"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium text-xs">
                  {referrals.map((r, index) => (
                    <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 font-mono text-neutral-500">{index + 1}</td>
                      <td className="py-4 px-4 font-bold text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-black text-xs shrink-0">
                          {r.referred_name?.charAt(0) || "S"}
                        </div>
                        <span>{r.referred_name}</span>
                      </td>
                      <td className="py-4 px-4 text-neutral-400 font-mono text-xs">
                        {new Date(r.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-center font-mono font-black text-emerald-400 text-sm">
                        +${r.reward_amount.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span
                          className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                            r.is_paid
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                              : "bg-white/5 text-neutral-400 border border-white/10"
                          }`}
                        >
                          {r.is_paid
                            ? (isRtl ? "واریز شده به کیف‌پول" : "Paid to Wallet")
                            : (isRtl ? "در انتظار تکمیل صنف" : "Pending")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
