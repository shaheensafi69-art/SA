"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Loader2, Copy, CheckCircle2, Gift, CreditCard, History, Users, LockKeyhole, UserPlus } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<"transactions" | "referrals">("referrals");
  
  const [wallet, setWallet] = useState({
    balance: 0,
    referralCode: "Generating...",
    totalRewards: 0,
    invitedBy: "" 
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isCodeCopied, setIsCodeCopied] = useState(false);

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

        const { data: txData } = await supabase
          .from("transactions")
          .select("*")
          .eq("student_id", userId)
          .order("created_at", { ascending: false });

        const { data: backupRefData } = await supabase
          .from("referrals")
          .select(`
            id, 
            reward_amount, 
            is_paid, 
            created_at,
            referred_student_id
          `)
          .eq("referrer_id", userId)
          .order("created_at", { ascending: false });

        if (profile) {
          let totalRefRewards = 0;
          const formattedRefs: Referral[] = [];

          if (backupRefData && backupRefData.length > 0) {
            const studentIds = backupRefData.map((ref: any) => ref.referred_student_id).filter(Boolean);
            
            let profilesMap: Record<string, string> = {};
            if (studentIds.length > 0) {
               const { data: profilesData } = await supabase
                 .from("profiles")
                 .select("id, first_name, last_name")
                 .in("id", studentIds);
                 
               if (profilesData) {
                 profilesData.forEach(p => {
                   profilesMap[p.id] = `${p.first_name} ${p.last_name}`;
                 });
               }
            }

            backupRefData.forEach((ref: any) => {
              totalRefRewards += ref.reward_amount || 0;
              formattedRefs.push({
                id: ref.id,
                reward_amount: ref.reward_amount,
                is_paid: ref.is_paid,
                created_at: ref.created_at,
                referred_name: profilesMap[ref.referred_student_id] || "Unknown Student"
              });
            });
          }

          setWallet({
            balance: profile.wallet_balance || 0,
            referralCode: profile.referral_code || "SAFI-...",
            totalRewards: totalRefRewards,
            invitedBy: invitedByName
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

  const copyLink = () => {
    const inviteLink = `https://safiacademy.org/en/register?ref=${wallet.referralCode}`;
    navigator.clipboard.writeText(inviteLink);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(wallet.referralCode);
    setIsCodeCopied(true);
    setTimeout(() => setIsCodeCopied(false), 2000);
  };

  return (
    <div className="w-full relative overflow-hidden bg-[#020202] font-sans pb-20 min-h-screen">
      
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-[1600px] mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out] relative z-10 px-4 sm:px-6 md:px-10 pt-8">
        
        {/* ================= HEADER ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-3">
              Wallet & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Assets</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-xl leading-relaxed">
              Manage your digital funds, track transactions, and earn instant cash bonuses by expanding the Safi network.
            </p>
          </div>

          {!isLoading && wallet.invitedBy && (
            <div className="relative z-10 flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl shadow-inner">
              <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 flex items-center justify-center rounded-xl">
                <UserPlus size={20} />
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Invited By</p>
                <p className="text-sm font-bold text-white mt-1">{wallet.invitedBy}</p>
              </div>
            </div>
          )}
        </header>

        {/* ================= MAIN LAYOUT ================= */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ================= LEFT COLUMN: CARDS ================= */}
          <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 flex flex-col gap-6">
            
            {/* 1. Digital Wallet Card */}
            <div className="bg-gradient-to-br from-neutral-900/90 to-black p-8 sm:p-10 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-[50px] pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-700"></div>
              
              <div className="flex justify-between items-start mb-10 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center p-2 shadow-lg backdrop-blur-sm">
                    <img src="/logo-without-b.png" alt="Safi" className="w-full h-full object-contain drop-shadow-md" />
                  </div>
                  <div>
                    <span className="font-black text-white tracking-widest text-xs uppercase opacity-90 block">SAFI PAY</span>
                    <span className="text-[9px] text-emerald-400 font-bold tracking-widest uppercase">Verified Node</span>
                  </div>
                </div>
                <CreditCard className="w-6 h-6 text-neutral-500" />
              </div>

              <div className="mb-10 relative z-10">
                <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  Available Balance
                </p>
                <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tight flex items-center gap-1">
                  <span className="text-emerald-500 opacity-80 text-4xl">$</span>
                  {isLoading ? <span className="animate-pulse">---</span> : wallet.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
              </div>

              <div className="flex gap-3 relative z-10">
                <div className="flex-1 relative group/btn cursor-not-allowed">
                   <div className="absolute inset-0 bg-white/5 rounded-2xl blur-md"></div>
                   <button disabled className="w-full relative py-4 bg-white/5 border border-white/10 text-neutral-500 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 opacity-50">
                     Add Funds
                   </button>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 px-3 py-1 rounded-md text-[8px] font-black tracking-widest uppercase shadow-[0_0_15px_rgba(234,179,8,0.3)] backdrop-blur-md flex items-center gap-1">
                     <LockKeyhole size={10} /> Coming Soon
                   </div>
                </div>

                <div className="flex-1 relative group/btn cursor-not-allowed">
                   <div className="absolute inset-0 bg-white/5 rounded-2xl blur-md"></div>
                   <button disabled className="w-full relative py-4 bg-white/5 border border-white/10 text-neutral-500 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 opacity-50">
                     Withdraw
                   </button>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 px-3 py-1 rounded-md text-[8px] font-black tracking-widest uppercase shadow-[0_0_15px_rgba(234,179,8,0.3)] backdrop-blur-md flex items-center gap-1">
                     <LockKeyhole size={10} /> Coming Soon
                   </div>
                </div>
              </div>
            </div>

            {/* 2. Referral Invite Card */}
            <div className="bg-gradient-to-br from-amber-900/20 to-black p-8 sm:p-10 rounded-[2.5rem] border border-amber-500/20 backdrop-blur-xl relative overflow-hidden group shadow-2xl">
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-amber-500/10 rounded-full blur-[50px] pointer-events-none group-hover:bg-amber-500/20 transition-all duration-700"></div>
              
              <div className="relative z-10 mb-8 flex justify-between items-start">
                <div>
                  <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-4 border border-amber-500/20 shadow-inner">
                    <Gift size={24} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-2">Invite & Earn $5</h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-[280px]">
                    Share your unique link. When your friends register and <strong className="text-amber-500 font-bold">enroll in their first course</strong>, you will instantly receive a $5 cash bonus in your wallet!
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 relative z-10">
                <div className="bg-black/60 border border-white/5 p-4 rounded-2xl flex flex-col gap-3">
                  <p className="text-[9px] text-neutral-500 font-black uppercase tracking-widest px-1">Your Referral Code</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-white/5 px-4 py-3 rounded-xl border border-white/10 flex items-center">
                      <p className="font-mono text-amber-400 text-sm font-bold tracking-wider truncate">
                        {isLoading ? "..." : wallet.referralCode}
                      </p>
                    </div>
                    <button onClick={copyCode} className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all active:scale-95 ${isCodeCopied ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "bg-white/10 text-white hover:bg-white/20 border border-white/10"}`}>
                      {isCodeCopied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>

                <div className="bg-black/60 border border-white/5 p-4 rounded-2xl flex flex-col gap-3">
                  <p className="text-[9px] text-neutral-500 font-black uppercase tracking-widest px-1">Your Master Link</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-white/5 px-4 py-3 rounded-xl border border-white/10 flex items-center overflow-hidden">
                      <p className="font-mono text-neutral-400 text-xs truncate">
                        {isLoading ? "Generating..." : `safiacademy.org/en/register?ref=${wallet.referralCode}`}
                      </p>
                    </div>
                    <button onClick={copyLink} className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all active:scale-95 ${isLinkCopied ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "bg-white/10 text-white hover:bg-white/20 border border-white/10"}`}>
                      {isLinkCopied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6 relative z-10">
                <div className="flex items-center gap-2">
                   <Users size={16} className="text-neutral-500" />
                   <span className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Total Cash Earned</span>
                </div>
                <span className="text-emerald-400 font-black text-2xl font-mono">${isLoading ? "-" : wallet.totalRewards.toFixed(2)}</span>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: LISTS ================= */}
          <div className="flex-1 w-full flex flex-col gap-6">
            
            <div className="flex items-center gap-2 bg-[#0a0a0f]/80 p-2 rounded-[1.5rem] border border-white/5 shadow-inner w-full sm:w-fit backdrop-blur-xl">
              <button
                onClick={() => setActiveTab("referrals")}
                className={`flex-1 sm:flex-none px-6 sm:px-8 py-3.5 rounded-[1.2rem] text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  activeTab === "referrals" ? "bg-amber-500/10 text-amber-500 shadow-md border border-amber-500/20" : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
                }`}
              >
                <Users size={16} /> Network
              </button>
              <button
                onClick={() => setActiveTab("transactions")}
                className={`flex-1 sm:flex-none px-6 sm:px-8 py-3.5 rounded-[1.2rem] text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  activeTab === "transactions" ? "bg-white/10 text-white shadow-md border border-white/10" : "text-neutral-500 hover:text-neutral-300 hover:bg-white/5"
                }`}
              >
                <History size={16} /> Transactions
              </button>
            </div>

            <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-4 sm:p-8 min-h-[600px] backdrop-blur-3xl shadow-xl">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-24 bg-white/5 rounded-2xl animate-pulse"></div>)}
                </div>
              ) : activeTab === "transactions" ? (
                
                transactions.length > 0 ? (
                  <div className="space-y-3">
                    {transactions.map(tx => (
                      <div key={tx.id} className="bg-black/40 hover:bg-white/5 p-4 sm:p-6 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all group">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg shrink-0 shadow-inner ${
                            tx.transaction_type === 'DEPOSIT' || tx.transaction_type === 'REFERRAL_REWARD' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                            tx.transaction_type === 'WITHDRAWAL' ? 'bg-white/5 text-white border border-white/10' : 
                            'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                          }`}>
                            {tx.transaction_type === 'DEPOSIT' ? '↓' : tx.transaction_type === 'WITHDRAWAL' ? '↑' : tx.transaction_type === 'REFERRAL_REWARD' ? <Gift size={18}/> : '🛒'}
                          </div>
                          <div>
                            <h4 className="font-black text-white text-sm tracking-wide">{tx.transaction_type.replace("_", " ")}</h4>
                            <p className="text-[10px] text-neutral-500 font-mono mt-1 uppercase tracking-wider">
                              {new Date(tx.created_at).toLocaleDateString()} • {new Date(tx.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                          <p className={`font-black text-lg font-mono ${tx.transaction_type === 'DEPOSIT' || tx.transaction_type === 'REFERRAL_REWARD' ? 'text-emerald-400' : 'text-white'}`}>
                            {tx.transaction_type === 'DEPOSIT' || tx.transaction_type === 'REFERRAL_REWARD' ? '+' : '-'}${tx.amount.toFixed(2)}
                          </p>
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md mt-1 inline-block ${
                            tx.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-500' : tx.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                          }`}>
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-32">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                       <CreditCard className="w-10 h-10 text-neutral-600" />
                    </div>
                    <p className="text-xl font-black text-white mb-2">No Transactions Found</p>
                    <p className="text-neutral-500 text-sm max-w-sm">Your payment, deposit, and withdrawal history will be securely logged here.</p>
                  </div>
                )

              ) : (

                referrals.length > 0 ? (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {referrals.map(ref => (
                      <div key={ref.id} className="bg-black/40 hover:bg-amber-900/10 p-5 rounded-2xl border border-white/5 hover:border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all group shadow-inner">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-lg font-black text-amber-500 border border-amber-500/20 shrink-0">
                            {ref.referred_name?.charAt(0) || "U"}
                          </div>
                          <div>
                            <h4 className="font-black text-white text-sm">{ref.referred_name}</h4>
                            <p className="text-[10px] text-neutral-500 font-mono mt-1 uppercase tracking-wider">Joined: {new Date(ref.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                          <p className={`font-black font-mono text-lg ${ref.is_paid ? 'text-emerald-400' : 'text-neutral-500'}`}>
                            ${ref.reward_amount.toFixed(2)}
                          </p>
                          <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md mt-1 inline-block ${ref.is_paid ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-white/5 text-neutral-400 border border-white/10'}`}>
                            {ref.is_paid ? 'Reward Paid' : 'Awaiting Enrollment'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-32">
                    <div className="w-20 h-20 bg-amber-500/5 rounded-full flex items-center justify-center mb-6">
                       <Users className="w-10 h-10 text-amber-600/50" />
                    </div>
                    <p className="text-xl font-black text-white mb-2">Network is Empty</p>
                    <p className="text-neutral-500 text-sm max-w-sm">Share your unique link with friends to expand your network and earn cash bonuses.</p>
                  </div>
                )
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}