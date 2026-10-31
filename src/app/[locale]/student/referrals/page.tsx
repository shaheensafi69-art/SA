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
  Award
} from "lucide-react";

interface ReferralRecord {
  id: string;
  referred_student_id: string;
  reward_amount: number;
  is_paid: boolean;
  created_at: string;
}

export default function StudentReferralsPage() {
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

  useEffect(() => {
    let isMounted = true;

    async function loadReferralData() {
      try {
        const supabase = createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

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
            .order("created_at", { ascending: false })
        ]);

        if (!isMounted) return;

        if (profileRes.data) {
          setReferralCode(profileRes.data.referral_code || user.id.slice(0, 8).toUpperCase());
          setWalletBalance(Number(profileRes.data.wallet_balance || 0));
          setDiscountRate(Number(profileRes.data.referral_discount_rate || 10));
        }

        if (referralsRes.data) {
          setReferrals(referralsRes.data);
        }
      } catch (err) {
        console.error("Error loading referral data:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadReferralData();

    return () => {
      isMounted = false;
    };
  }, [router, currentLocale]);

  const referralLink = `https://www.safiacademy.org/${currentLocale}/register?ref=${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2500);
  };

  const handleShareTelegram = () => {
    const text = encodeURIComponent(
      `به آکادمی صافی بپیوندید و با کد تخفیف اختصاصی من (${referralCode}) در معتبرترین دوره‌های بازارهای مالی و تریدینگ ثبت‌نام کنید:\n${referralLink}`
    );
    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${text}`, "_blank");
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `سلام! با استفاده از لینک دعوت اختصاصی من با ${discountRate}٪ تخفیف در صنف‌های آکادمی صافی ثبت نام کن:\n${referralLink}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const totalEarnings = referrals
    .filter(r => r.is_paid)
    .reduce((acc, r) => acc + (Number(r.reward_amount) || 0), 0);

  const pendingEarnings = referrals
    .filter(r => !r.is_paid)
    .reduce((acc, r) => acc + (Number(r.reward_amount) || 0), 0);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#030305] text-white p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-pulse" dir={isRtl ? "rtl" : "ltr"}>
        <div className="h-44 bg-neutral-900/60 rounded-[2.5rem] border border-white/5"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-28 bg-neutral-900/50 rounded-2xl border border-white/5"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#030305] text-white font-sans selection:bg-[#C2185B] selection:text-white pb-32" dir={isRtl ? "rtl" : "ltr"}>

      {/* Background Ambience */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-yellow-500/10 via-[#C2185B]/10 to-transparent rounded-full blur-[160px] pointer-events-none -z-10"></div>

      <div className="px-4 sm:px-6 md:px-10 pt-6 md:pt-10 max-w-7xl mx-auto space-y-8 relative z-10">

        {/* 1. HERO BANNER */}
        <section className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-[#120e0a]/95 via-[#0c0906]/90 to-[#030306] border border-white/10 p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/15 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                <Gift size={12} className="text-yellow-400" />
                {isRtl ? "باشگاه معرفی دوستان و پاداش دلاری" : "Scholar Referral & Affiliate Club"}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                {isRtl ? "دعوت از دوستان و کسب درآمد" : "Refer Friends & Earn Cash"}
              </h1>

              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
                {isRtl
                  ? `لینک اختصاصی خود را با علاقه‌مندان به بازارهای مالی به اشتراک بگذارید. دوستان شما ${discountRate}٪ تخفیف ثبت‌نام دریافت می‌کنند و پاداش دلاری هر ثبت‌نام مستقیماً به کیف پول شما واریز می‌شود.`
                  : `Share your exclusive invite link. Your friends receive an instant ${discountRate}% tuition discount and you earn cash rewards directly deposited to your student wallet.`
                }
              </p>
            </div>

            {/* Wallet Quick Balance */}
            <div className="flex items-center gap-3">
              <div className="px-6 py-4 rounded-2xl bg-white/[0.04] border border-white/10 shadow-lg flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Wallet size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400 block">
                    {isRtl ? "موجودی قابل برداشت" : "Withdrawable Wallet"}
                  </span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">
                    ${walletBalance.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Referral Link Copy Bar */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-2xl">
            <div className="flex-1 flex items-center justify-between px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 font-mono text-xs text-yellow-400 overflow-hidden">
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

            <div className="flex items-center gap-2">
              <button
                onClick={handleShareTelegram}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-sky-500/15 text-sky-400 border border-sky-500/30 hover:bg-sky-500 hover:text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
              >
                <Send size={14} />
                <span>Telegram</span>
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-black text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
              >
                <MessageCircle size={14} />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </section>

        {/* 2. STATS KPI STRIP */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
              <span>{isRtl ? "کل دعوت‌شدگان" : "Total Referrals"}</span>
              <Users size={16} className="text-yellow-400" />
            </div>
            <span className="text-2xl font-black text-white font-mono">{referrals.length}</span>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
              <span>{isRtl ? "ثبت‌نام‌های موفق" : "Enrolled Scholars"}</span>
              <ShieldCheck size={16} className="text-emerald-400" />
            </div>
            <span className="text-2xl font-black text-emerald-400 font-mono">
              {referrals.filter(r => r.is_paid).length}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
              <span>{isRtl ? "کل پاداش دریافتی" : "Total Earned"}</span>
              <DollarSign size={16} className="text-emerald-400" />
            </div>
            <span className="text-2xl font-black text-emerald-400 font-mono">${totalEarnings.toFixed(2)}</span>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
              <span>{isRtl ? "پاداش در انتظار واریز" : "Pending Commission"}</span>
              <TrendingUp size={16} className="text-amber-400" />
            </div>
            <span className="text-2xl font-black text-amber-400 font-mono">${pendingEarnings.toFixed(2)}</span>
          </div>
        </section>

        {/* 3. REFERRALS HISTORY */}
        <section className="rounded-[2.5rem] bg-gradient-to-br from-[#0c0c16] via-[#08080f] to-[#040407] border border-white/10 p-6 sm:p-8 md:p-10 shadow-[0_20px_45px_rgba(0,0,0,0.7)] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-white">
                {isRtl ? "تاریخچه معرفی و پاداش‌ها" : "Referral & Commission Activity"}
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                {isRtl ? "فهرست کاربرانی که با لینک شما به خانواده آکادمی پیوسته‌اند" : "Scholars registered under your affiliate referral network"}
              </p>
            </div>
          </div>

          {referrals.length > 0 ? (
            <div className="space-y-3">
              {referrals.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center font-bold text-xs">
                      #{idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">
                        {isRtl ? "دانشجوی معرفی‌شده" : "Referred Scholar"}
                      </h4>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-black font-mono text-emerald-400">
                      +${Number(item.reward_amount || 0).toFixed(2)}
                    </span>
                    <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-md ${
                      item.is_paid
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {item.is_paid ? (isRtl ? "واریز شده" : "Paid") : (isRtl ? "در حال پردازش" : "Pending")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-neutral-500 text-xs font-bold space-y-3">
              <Gift size={32} className="mx-auto text-neutral-600" />
              <p>{isRtl ? "هنوز دوستی با لینک شما ثبت‌نام نکرده است. با کپی لینک بالا شروع کنید!" : "No referral activity yet. Share your referral link to earn rewards!"}</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
