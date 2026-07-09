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
  referred_name?: string; 
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
        const { data: profile } = await supabase
          .from("profiles")
          .select("wallet_balance, referral_code, first_name")
          .eq("id", userId)
          .single();

        const { data: txData } = await supabase
          .from("transactions")
          .select("*")
          .eq("student_id", userId)
          .order("created_at", { ascending: false });

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
            referralCode: profile.referral_code || "Generating...",
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
    const inviteLink = `https://safipro.site/en/register?ref=${wallet.referralCode}`;
    navigator.clipboard.writeText(inviteLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full relative overflow-hidden bg-[#020202] font-sans pb-10">
      
      {/* Global Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* ================= Header ================= */}
      <header className="px-6 md:px-12 pt-8 md:pt-12 flex flex-col gap-2 relative z-10 mb-8">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Wallet & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Referrals</span>
        </h1>
        <p className="text-neutral-500 text-sm md:text-base font-medium max-w-xl">Manage your digital funds and earn exclusive bonuses by inviting friends.</p>
      </header>

      {/* ================= بدنه اصلی تعاملی دو ستونه ================= */}
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto relative z-10 flex flex-col lg:flex-row gap-8 items-start">

        {/* ================= ستون سمت چپ: کارت‌ها (Wallet + Referral) ================= */}
        <div className="w-full lg:w-96 shrink-0 flex flex-col gap-6">
          
          {/* 1. Digital Wallet Card (پرمیوم و شیشه‌ای) */}
          <div className="bg-gradient-to-br from-neutral-900/80 to-black p-8 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-[50px] pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-700"></div>
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center p-1.5 shadow-lg">
                  <img src="/logo-without-b.png" alt="Safi" className="w-full h-full object-contain drop-shadow-md" />
                </div>
                <span className="font-black text-white tracking-widest text-xs uppercase opacity-80">SAFI PAY</span>
              </div>
              <svg className="w-6 h-6 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg>
            </div>

            <div className="mb-8 relative z-10">
              <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2">Available Balance</p>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                <span className="text-emerald-500 mr-1 opacity-80">$</span>
                {isLoading ? "..." : wallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
            </div>

            <div className="flex gap-3 relative z-10">
              <button className="flex-1 py-4 bg-gradient-to-r from-emerald-400 to-teal-500 text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-[0_10px_20px_rgba(16,185,129,0.3)]">
                Add Funds
              </button>
              <button className="flex-1 py-4 bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all">
                Withdraw
              </button>
            </div>
          </div>

          {/* 2. Referral Invite Card (کارت طلایی دعوت) */}
          <div className="bg-gradient-to-br from-amber-900/20 to-black p-8 rounded-[2.5rem] border border-amber-500/20 backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute -bottom-10 -right-10 text-8xl opacity-[0.03] pointer-events-none group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">🎁</div>
            
            <div className="relative z-10 mb-6">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-[1.2rem] flex items-center justify-center text-xl mb-4 border border-amber-500/20 shadow-inner">🤝</div>
              <h3 className="text-xl font-black text-white mb-2">Invite & Earn Rewards</h3>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Share your unique code. When friends register and purchase a course, you both earn a <strong className="text-amber-500 font-bold">$20 bonus</strong>!
              </p>
            </div>

            <div className="bg-black/60 border border-white/5 p-3 rounded-2xl flex flex-col gap-3 relative z-10">
              <div>
                <p className="text-[9px] text-neutral-500 font-black uppercase tracking-widest mb-1 px-1">Your Unique Code</p>
                <div className="bg-white/5 px-4 py-3 rounded-xl border border-white/5 flex items-center justify-between">
                  <p className="font-mono text-amber-400 text-sm font-bold tracking-wider">
                    {isLoading ? "..." : wallet.referralCode}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={copyToClipboard}
                className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  isCopied 
                    ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-[1.02]" 
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/5 hover:border-white/10"
                }`}
              >
                {isCopied ? (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> Link Copied!</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> Copy Invite Link</>
                )}
              </button>
            </div>
            
            <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 relative z-10">
              <span className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Total Earned</span>
              <span className="text-amber-400 font-black text-xl">${isLoading ? "-" : wallet.totalRewards.toFixed(2)}</span>
            </div>
          </div>

        </div>

        {/* ================= ستون سمت راست: لیست تراکنش‌ها و رفرال‌ها ================= */}
        <div className="flex-1 w-full flex flex-col gap-6">
          
          {/* تب‌های کپسولی برای تعویض لیست */}
          <div className="flex items-center gap-2 bg-neutral-900/60 p-1.5 rounded-[1.5rem] border border-white/5 shadow-inner w-full md:w-fit">
            <button
              onClick={() => setActiveTab("transactions")}
              className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === "transactions" ? "bg-white/10 text-white shadow-md border border-white/10" : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab("referrals")}
              className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === "referrals" ? "bg-amber-500/10 text-amber-500 shadow-md border border-amber-500/20" : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              My Referrals
            </button>
          </div>

          {/* محتوای لیست */}
          <div className="bg-neutral-900/30 border border-white/5 rounded-[2.5rem] p-4 md:p-6 min-h-[500px] backdrop-blur-xl">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-20 bg-neutral-800/30 rounded-2xl animate-pulse"></div>)}
              </div>
            ) : activeTab === "transactions" ? (
              // ================= لیست تراکنش‌ها =================
              transactions.length > 0 ? (
                <div className="space-y-3">
                  {transactions.map(tx => (
                    <div key={tx.id} className="bg-black/40 hover:bg-neutral-800/50 p-5 rounded-[1.5rem] border border-white/5 flex items-center justify-between transition-all group hover:-translate-y-0.5">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-[1rem] flex items-center justify-center text-lg shrink-0 shadow-inner ${
                          tx.transaction_type === 'DEPOSIT' || tx.transaction_type === 'REFERRAL_REWARD' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                          tx.transaction_type === 'WITHDRAWAL' ? 'bg-white/5 text-white border border-white/10' : 
                          'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                        }`}>
                          {tx.transaction_type === 'DEPOSIT' ? '↓' : tx.transaction_type === 'WITHDRAWAL' ? '↑' : tx.transaction_type === 'REFERRAL_REWARD' ? '🎁' : '🛒'}
                        </div>
                        <div>
                          <h4 className="font-black text-white text-sm tracking-wide">{tx.transaction_type.replace("_", " ")}</h4>
                          <p className="text-[10px] text-neutral-500 font-mono mt-1 uppercase tracking-wider">
                            {new Date(tx.created_at).toLocaleDateString()} • {new Date(tx.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className={`font-black text-lg font-mono ${tx.transaction_type === 'DEPOSIT' || tx.transaction_type === 'REFERRAL_REWARD' ? 'text-emerald-400' : 'text-white'}`}>
                          {tx.transaction_type === 'DEPOSIT' || tx.transaction_type === 'REFERRAL_REWARD' ? '+' : '-'}${tx.amount.toFixed(2)}
                        </p>
                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md mt-1 inline-block ${
                          tx.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500' : tx.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="text-6xl mb-4 opacity-50">💳</div>
                  <p className="text-xl font-black text-white mb-2">No Transactions Yet</p>
                  <p className="text-neutral-500 text-sm max-w-xs">Your payment, deposit, and withdrawal history will appear here.</p>
                </div>
              )
            ) : (
              // ================= لیست معرفی‌ها (Referrals) =================
              referrals.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {referrals.map(ref => (
                    <div key={ref.id} className="bg-black/40 hover:bg-neutral-800/50 p-5 rounded-[1.5rem] border border-amber-500/10 flex items-center justify-between transition-all group hover:-translate-y-0.5 shadow-inner hover:shadow-[0_5px_15px_rgba(245,158,11,0.05)]">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-500/10 rounded-[1rem] flex items-center justify-center text-lg font-black text-amber-500 border border-amber-500/20 shrink-0">
                          {ref.referred_name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <h4 className="font-black text-white text-sm">{ref.referred_name}</h4>
                          <p className="text-[10px] text-neutral-500 font-mono mt-1 uppercase tracking-wider">Joined: {new Date(ref.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-emerald-400 font-mono text-lg">+${ref.reward_amount.toFixed(2)}</p>
                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md mt-1 inline-block ${ref.is_paid ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                          {ref.is_paid ? 'Paid' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="text-6xl mb-4 opacity-50">🤝</div>
                  <p className="text-xl font-black text-white mb-2">No Referrals Yet</p>
                  <p className="text-neutral-500 text-sm max-w-xs">Share your unique link with friends to start earning instant rewards.</p>
                </div>
              )
            )}
          </div>

        </div>
      </div>
    </div>
  );
}