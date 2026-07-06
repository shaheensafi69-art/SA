"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Transaction = {
  id: string;
  amount: number;
  currency: string;
  transaction_type: "DEPOSIT" | "WITHDRAWAL" | "PURCHASE" | "REFERRAL_REWARD";
  status: "COMPLETED" | "PENDING" | "FAILED";
  created_at: string;
};

type Referral = {
  id: string;
  reward_amount: number;
  is_paid: boolean;
  created_at: string;
  referred_name?: string; // اگر جوین با پروفایل جواب بدهد
};

export default function WalletPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"transactions" | "referrals">("transactions");
  
  const [wallet, setWallet] = useState({
    balance: 0,
    referralCode: "SAFI-...",
    totalRewards: 0
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const fetchWalletData = async () => {
      setIsLoading(true);
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) return;
      const userId = session.user.id;

      try {
        // 1. دریافت موجودی و کد معرف از پروفایل
        const { data: profile } = await supabase
          .from("profiles")
          .select("wallet_balance, referral_code, first_name")
          .eq("id", userId)
          .single();

        // 2. دریافت تراکنش‌ها
        const { data: txData } = await supabase
          .from("transactions")
          .select("*")
          .eq("student_id", userId)
          .order("created_at", { ascending: false });

        // 3. دریافت لیست رفرال‌ها (کسانی که دعوت کرده)
        // سعی می‌کنیم نام شخص دعوت شده را هم بگیریم (اگر در دیتابیس کلید خارجی ست شده باشد)
        const { data: refData } = await supabase
          .from("referrals")
          .select(`
            id, 
            reward_amount, 
            is_paid, 
            created_at,
            profiles!referred_student_id(first_name, last_name)
          `)
          .eq("referrer_id", userId)
          .order("created_at", { ascending: false });

        if (profile) {
          // محاسبه کل درآمد از دعوت‌ها
          let totalRefRewards = 0;
          const formattedRefs: Referral[] = [];

          if (refData) {
            refData.forEach((ref: any) => {
              totalRefRewards += ref.reward_amount || 0;
              const referredProfile = Array.isArray(ref.profiles) ? ref.profiles[0] : ref.profiles;
              formattedRefs.push({
                id: ref.id,
                reward_amount: ref.reward_amount,
                is_paid: ref.is_paid,
                created_at: ref.created_at,
                referred_name: referredProfile ? `${referredProfile.first_name} ${referredProfile.last_name}` : "Unknown Student"
              });
            });
          }

          setWallet({
            balance: profile.wallet_balance || 0,
            referralCode: profile.referral_code || `SAFI-${profile.first_name?.toUpperCase() || "USER"}`,
            totalRewards: totalRefRewards
          });

          setTransactions(txData || []);
          setReferrals(formattedRefs);
        }

      } catch (error) {
        console.error("Error fetching wallet data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  const copyToClipboard = () => {
    // ساخت لینک دعوت فرضی بر اساس دامین سایت
    const inviteLink = `https://safipro.site/en/register?ref=${wallet.referralCode}`;
    navigator.clipboard.writeText(inviteLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full">
      
      {/* ================= Header (فیکس با سایدبار) ================= */}
      <header className="h-24 px-8 md:px-12 flex justify-between items-center animate-[fadeIn_0.5s_ease-out] border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-20">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Wallet & <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Referrals</span>
          </h1>
          <p className="text-neutral-500 mt-1 text-sm hidden md:block">Manage your funds and earn rewards by inviting friends.</p>
        </div>
      </header>

      {/* ================= بدنه اصلی ================= */}
      <div className="px-8 md:px-12 pt-8 pb-12 max-w-7xl mx-auto">

        {/* ================= بخش بالایی (کارت‌ها) ================= */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-12">
          
          {/* 1. کارت کیف پول دیجیتال (Digital Wallet Card) */}
          <div className="w-full lg:w-[40%] bg-gradient-to-br from-[#111] to-[#050505] p-8 rounded-[2rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-yellow-500/20 transition-all"></div>
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="flex items-center gap-2">
                <img src="/logo-without-b.png" alt="Safi" className="w-8 h-8 object-contain drop-shadow-lg" />
                <span className="font-extrabold text-white tracking-widest text-sm">SAFI PAY</span>
              </div>
              <svg className="w-8 h-8 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg>
            </div>

            <div className="mb-8 relative z-10">
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">Available Balance</p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                <span className="text-yellow-500 mr-1">$</span>
                {isLoading ? "..." : wallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
            </div>

            <div className="flex gap-3 relative z-10">
              <button className="flex-1 py-3 bg-yellow-500 text-black font-extrabold rounded-xl hover:bg-yellow-400 hover:scale-105 transition-all shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                Add Funds
              </button>
              <button className="flex-1 py-3 bg-white/5 border border-white/10 text-white font-extrabold rounded-xl hover:bg-white/10 transition-all">
                Withdraw
              </button>
            </div>
          </div>

          {/* 2. سیستم معرفی (Referral Program) */}
          <div className="w-full lg:w-[60%] bg-neutral-900/40 p-8 rounded-[2rem] border border-white/5 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 text-9xl opacity-5 pointer-events-none">🎁</div>
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-yellow-500/10 text-yellow-500 rounded-xl flex items-center justify-center text-xl">🤝</div>
                <h3 className="text-xl font-bold text-white">Invite & Earn Rewards</h3>
              </div>
              <p className="text-neutral-400 text-sm mb-6 max-w-md leading-relaxed">
                Share your unique referral code with friends. When they register and purchase a course, you both earn <strong className="text-yellow-500">$20 bonus</strong> in your wallet!
              </p>
            </div>

            <div className="bg-black/50 border border-white/10 p-2 pl-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1">Your Referral Link</p>
                <p className="font-mono text-white text-sm md:text-base font-bold truncate max-w-[200px] md:max-w-[300px]">
                  safipro.site/register?ref={isLoading ? "..." : wallet.referralCode}
                </p>
              </div>
              <button 
                onClick={copyToClipboard}
                className={`px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  isCopied ? "bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]" : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {isCopied ? (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> Copied!</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> Copy Link</>
                )}
              </button>
            </div>
            
            <div className="mt-6 flex items-center gap-3">
              <span className="text-xs text-neutral-500 font-bold uppercase tracking-widest">Total Earned:</span>
              <span className="text-green-400 font-extrabold text-lg">${isLoading ? "-" : wallet.totalRewards.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* ================= تب‌های پایین (تراکنش‌ها / معرفی‌ها) ================= */}
        <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-1">
          <button
            onClick={() => setActiveTab("transactions")}
            className={`pb-3 px-2 text-sm font-bold transition-all border-b-2 ${
              activeTab === "transactions" ? "border-yellow-500 text-yellow-500" : "border-transparent text-neutral-500 hover:text-white"
            }`}
          >
            Transaction History
          </button>
          <button
            onClick={() => setActiveTab("referrals")}
            className={`pb-3 px-2 text-sm font-bold transition-all border-b-2 ${
              activeTab === "referrals" ? "border-yellow-500 text-yellow-500" : "border-transparent text-neutral-500 hover:text-white"
            }`}
          >
            My Referrals
          </button>
        </div>

        {/* ================= محتوای تب‌ها ================= */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => <div key={i} className="h-20 bg-neutral-900/40 rounded-2xl border border-white/5 animate-pulse"></div>)}
          </div>
        ) : activeTab === "transactions" ? (
          // ================= لیست تراکنش‌ها =================
          transactions.length > 0 ? (
            <div className="space-y-3">
              {transactions.map(tx => (
                <div key={tx.id} className="bg-neutral-900/30 hover:bg-neutral-900/60 p-5 rounded-2xl border border-white/5 flex items-center justify-between transition-all group">
                  <div className="flex items-center gap-4">
                    {/* آیکون بر اساس نوع تراکنش */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-inner ${
                      tx.transaction_type === 'DEPOSIT' || tx.transaction_type === 'REFERRAL_REWARD' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                      tx.transaction_type === 'WITHDRAWAL' ? 'bg-neutral-800 text-white border border-white/10' : 
                      'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                    }`}>
                      {tx.transaction_type === 'DEPOSIT' ? '↓' : tx.transaction_type === 'WITHDRAWAL' ? '↑' : tx.transaction_type === 'REFERRAL_REWARD' ? '🎁' : '🛒'}
                    </div>
                    <div>
                      <h4 className="font-bold text-white capitalize">{tx.transaction_type.replace("_", " ")}</h4>
                      <p className="text-xs text-neutral-500 font-mono mt-1">
                        {new Date(tx.created_at).toLocaleDateString()} • {new Date(tx.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`font-extrabold text-lg ${tx.transaction_type === 'DEPOSIT' || tx.transaction_type === 'REFERRAL_REWARD' ? 'text-green-400' : 'text-white'}`}>
                      {tx.transaction_type === 'DEPOSIT' || tx.transaction_type === 'REFERRAL_REWARD' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </p>
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md mt-1 inline-block ${
                      tx.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500' : tx.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center border border-white/5 rounded-[2rem] bg-neutral-900/20">
              <span className="text-4xl opacity-50 block mb-4">💳</span>
              <p className="text-white font-bold mb-2">No Transactions Yet</p>
              <p className="text-neutral-500 text-sm">Your payment and deposit history will appear here.</p>
            </div>
          )
        ) : (
          // ================= لیست معرفی‌ها =================
          referrals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {referrals.map(ref => (
                <div key={ref.id} className="bg-neutral-900/30 p-5 rounded-2xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-sm font-bold text-neutral-400">
                      {ref.referred_name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{ref.referred_name}</h4>
                      <p className="text-xs text-neutral-500 mt-0.5">Joined: {new Date(ref.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-green-400">+${ref.reward_amount.toFixed(2)}</p>
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md mt-1 inline-block ${ref.is_paid ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                      {ref.is_paid ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center border border-white/5 rounded-[2rem] bg-neutral-900/20">
              <span className="text-4xl opacity-50 block mb-4">🤝</span>
              <p className="text-white font-bold mb-2">No Referrals Yet</p>
              <p className="text-neutral-500 text-sm">Share your link with friends to earn rewards.</p>
            </div>
          )
        )}

      </div>
    </div>
  );
}