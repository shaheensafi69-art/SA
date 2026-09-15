"use client";

import { useEffect, useState } from "react";
import {
  X, Sparkles, LogOut, Bell, Wallet, LayoutDashboard,
  Rss, User, Megaphone, Video,
  FileText, Target, TrendingUp, Trophy, Bot, Headset, Settings, Grid
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() || "";

  const [isReady, setIsReady] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isFullScreenRoute = pathname.includes('/dashboard/ai-assistant') || pathname.includes('/en/support/chat');

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const supabase = createClient();

    const fetchProfile = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (user && !userError) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, last_name, avatar_url, wallet_balance, role")
          .eq("id", user.id)
          .single();

        if (profile) setUserProfile({ ...profile, id: user.id });
        setIsReady(true);
      } else {
        router.replace("/en/login");
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/en/login");
  };

  const myProfilePath = userProfile?.id ? `/en/feed/profile/${userProfile.id}` : "/en/feed/profile";

  const menuItems = [
    { name: "Overview", path: "/en/dashboard", icon: <LayoutDashboard size={22} /> },
    { name: "Academy Feed", path: "/en/feed", icon: <Rss size={22} /> },
    { name: "My Profile", path: myProfilePath, icon: <User size={22} /> },
    { name: "Announcements", path: "/en/dashboard/announcements", icon: <Megaphone size={22} /> },
    { name: "Live Campus", path: "/en/dashboard/live-classes", icon: <Video size={22} /> },
    { name: "Assignments", path: "/en/dashboard/assignments", icon: <FileText size={22} /> },
    { name: "Exams & Quizzes", path: "/en/dashboard/quizzes", icon: <Target size={22} /> },
    { name: "Trading Journal", path: "/en/dashboard/trading-journal", icon: <TrendingUp size={22} /> },
    { name: "Wallet & Referral", path: "/en/dashboard/wallet", icon: <Wallet size={22} /> },
    { name: "Achievements", path: "/en/dashboard/achievements", icon: <Trophy size={22} /> },
    { name: "AI Assistant", path: "#", icon: <Bot size={22} />, disabled: true },
    { name: "Support Tickets", path: "/en/support", icon: <Headset size={22} /> },
    { name: "Settings", path: "/en/dashboard/settings", icon: <Settings size={22} /> },
  ];

  const getMenuColor = (name: string) => {
    switch (name) {
      case "Overview": return "from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/30";
      case "Academy Feed": return "from-pink-500/20 to-pink-500/5 text-pink-400 border-pink-500/30";
      case "My Profile": return "from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30";
      case "Announcements": return "from-orange-500/20 to-orange-500/5 text-orange-400 border-orange-500/30";
      case "Live Campus": return "from-red-500/20 to-red-500/5 text-red-400 border-red-500/30";
      case "Assignments": return "from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/30";
      case "Exams & Quizzes": return "from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30";
      case "Trading Journal": return "from-teal-500/20 to-teal-500/5 text-teal-400 border-teal-500/30";
      case "Wallet & Referral": return "from-yellow-500/20 to-yellow-500/5 text-yellow-400 border-yellow-500/30";
      case "Achievements": return "from-fuchsia-500/20 to-fuchsia-500/5 text-fuchsia-400 border-fuchsia-500/30";
      case "Support Tickets": return "from-sky-500/20 to-sky-500/5 text-sky-400 border-sky-500/30";
      case "Settings": return "from-slate-500/20 to-slate-500/5 text-slate-400 border-slate-500/30";
      default: return "from-neutral-500/20 to-neutral-500/5 text-neutral-400 border-neutral-500/30";
    }
  };

  if (!isReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#020202] text-white">
        <div className="w-16 h-16 border-4 border-[#C2185B] border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_25px_rgba(194,24,91,0.4)]"></div>
        <span className="text-[#C2185B] font-bold uppercase tracking-widest text-xs animate-pulse">Initializing Portal...</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#030305] text-white font-sans overflow-hidden relative selection:bg-[#C2185B] selection:text-white">

      {/* هاله‌های نوری پس‌زمینه */}
      <div className="absolute top-[-15%] left-[-15%] w-[50vw] h-[50vw] bg-yellow-600/10 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[-15%] right-[-15%] w-[40vw] h-[40vw] bg-[#C2185B]/10 rounded-full blur-[130px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '6s' }}></div>

      {/* ================= 1. DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex w-[295px] bg-[#060609]/90 backdrop-blur-2xl border-r border-white/[0.06] flex-col relative z-20 shrink-0 p-4 shadow-[15px_0_40px_rgba(0,0,0,0.9)]">

        <div className="mb-5 p-4 rounded-2xl bg-gradient-to-br from-[#0c0c14] to-[#07070a] shadow-[inset_0_2px_6px_rgba(0,0,0,0.9),0_6px_20px_rgba(0,0,0,0.5)] border border-white/5 shrink-0 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C2185B] to-yellow-500 rounded-2xl opacity-20 blur group-hover:opacity-40 transition duration-500"></div>
          <Link href="/en/dashboard" className="flex items-center gap-3.5 relative z-10">
            <div className="relative flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 bg-[#C2185B]/30 blur-[10px] rounded-full"></div>
              <img src="/logo-without-b.png" alt="Safi Academy" className="relative z-10 w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(194,24,91,0.7)]" />
            </div>
            <div>
              <h2 className="text-xs font-black text-white tracking-widest uppercase flex items-center gap-1.5">
                Safi Academy <Sparkles size={10} className="text-[#C2185B] animate-spin" style={{ animationDuration: '4s' }} />
              </h2>
              <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-[0.2em] mt-0.5">Welcome Back</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-1">
          {menuItems.map((item) => {
            if (item.disabled) {
              return (
                <div key={item.name} className="flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-xs transition-all duration-300 relative group overflow-hidden text-neutral-500 opacity-60 cursor-not-allowed bg-[#08080c]/50 border border-white/[0.02]">
                  <span className="text-neutral-500">{item.icon}</span>
                  <span className="tracking-wide">{item.name}</span>
                  <span className="absolute right-4 text-[8px] font-black uppercase tracking-widest bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded border border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.2)]">Soon</span>
                </div>
              );
            }

            const isActive = item.name === "My Profile"
              ? pathname.includes("/en/feed/profile")
              : item.path === "/en/dashboard"
                ? pathname === "/en/dashboard"
                : pathname.startsWith(item.path);

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-xs transition-all duration-300 relative group overflow-hidden ${isActive
                  ? "bg-gradient-to-r from-[#1c1a12] to-[#0a0a0e] text-white shadow-[inset_0_2px_5px_rgba(0,0,0,0.9),0_0_20px_rgba(194,24,91,0.15)] border border-[#C2185B]/30 translate-x-1"
                  : "bg-[#08080c]/80 text-neutral-400 hover:text-white hover:bg-[#0c0c14] shadow-[0_2px_8px_rgba(0,0,0,0.5)] border border-white/[0.03] hover:border-white/10"
                  }`}
              >
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#C2185B] rounded-r-full shadow-[0_0_10px_#C2185B]"></div>}
                <span className={`transition-all duration-300 ${isActive ? "scale-110 text-[#C2185B]" : "group-hover:scale-110 group-hover:text-white"}`}>
                  {item.icon}
                </span>
                <span className="tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-3 shrink-0">
          <div className="bg-[#09090e] border border-white/[0.05] p-3 rounded-2xl flex items-center justify-between shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] relative overflow-hidden group">
            <div className="flex items-center gap-3 overflow-hidden relative z-10">
              <div className="w-10 h-10 rounded-xl border border-[#C2185B]/40 overflow-hidden shrink-0 bg-neutral-900 flex items-center justify-center shadow-inner">
                {userProfile?.avatar_url ? (
                  <img src={userProfile.avatar_url} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#C2185B] font-bold">{userProfile?.first_name?.charAt(0) || "S"}</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {userProfile?.first_name} {userProfile?.last_name}
                </p>
                <p className="text-[10px] text-emerald-400 font-black tracking-widest uppercase mt-0.5 flex items-center gap-1">
                  <Wallet size={10} /> ${userProfile?.wallet_balance ? Number(userProfile.wallet_balance).toFixed(2) : "0.00"}
                </p>
              </div>
            </div>
          </div>

          <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-3 text-neutral-400 hover:text-red-400 bg-[#08080c] hover:bg-red-500/10 rounded-2xl text-xs font-bold transition-all w-full border border-white/[0.04]">
            <LogOut size={14} /> Sign Out Account
          </button>
        </div>
      </aside>

      {/* ================= 2. DESKTOP FLOATING NOTIFICATION ================= */}
      <div className="hidden lg:flex absolute top-6 right-10 z-50">
        <Link href="/en/dashboard/announcements" className="w-12 h-12 bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-[#C2185B] transition-all relative group shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse"></span>
        </Link>
      </div>

      {/* ================= 3. MOBILE TOP HEADER ================= */}
      {!isFullScreenRoute && (
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-5 bg-[#030305]/90 backdrop-blur-2xl border-b border-white/[0.06] z-40 shadow-md">
          <div className="flex items-center gap-3 relative">
            <img src="/logo-without-b.png" alt="Safi Academy" className="relative z-10 w-8 h-8 object-contain" />
            <span className="relative z-10 font-black text-xs tracking-widest text-white uppercase">Safi Academy</span>
          </div>
          <Link href="/en/dashboard/announcements" className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-neutral-400 hover:text-[#C2185B]">
            <Bell size={18} />
          </Link>
        </div>
      )}

      {/* ================= 4. MAIN CONTENT ================= */}
      <main className={`flex-1 relative z-10 h-screen overflow-y-auto custom-scrollbar ${isFullScreenRoute ? 'pt-0 pb-0' : 'pt-16 pb-28'} lg:pt-0 lg:pb-0`}>
        {children}
      </main>

      {/* ================= 5. FLOATING MOBILE BOTTOM NAV ================= */}
      {!isFullScreenRoute && (
        <div className="lg:hidden fixed bottom-4 left-4 right-4 h-[70px] bg-[#09090e]/95 backdrop-blur-3xl border border-white/10 z-50 px-2 rounded-[2.2rem] flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
          <Link href="/en/dashboard" className="relative flex flex-col items-center justify-center w-[25%] h-full group">
            <LayoutDashboard size={20} className={pathname === "/en/dashboard" ? "text-white" : "text-neutral-500"} />
            <span className="text-[8px] font-bold uppercase mt-1">Overview</span>
          </Link>
          <Link href="/en/feed" className="relative flex flex-col items-center justify-center w-[25%] h-full group">
            <Rss size={20} className={pathname.startsWith("/en/feed") ? "text-[#C2185B]" : "text-neutral-500"} />
            <span className="text-[8px] font-bold uppercase mt-1">Feed</span>
          </Link>
          <Link href="/en/dashboard/live-classes" className="relative flex flex-col items-center justify-center w-[25%] h-full group">
            <Video size={20} className={pathname.includes("/dashboard/live-classes") ? "text-red-500" : "text-neutral-500"} />
            <span className="text-[8px] font-bold uppercase mt-1">Live</span>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(true)} className="relative flex flex-col items-center justify-center w-[25%] h-full group">
            <Grid size={20} className="text-neutral-500" />
            <span className="text-[8px] font-bold uppercase mt-1">Menu</span>
          </button>
        </div>
      )}

      {/* ================= 6. MOBILE MENU DRAWER ================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#030305]/95 backdrop-blur-3xl z-[100] flex flex-col lg:hidden">
          <div className="h-16 px-5 border-b border-white/[0.06] flex justify-between items-center bg-black/50 shrink-0">
            <span className="font-black text-white uppercase tracking-widest text-xs">Tools & Features</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-8 h-8 flex items-center justify-center text-neutral-400 bg-white/5 rounded-full">
              <X size={16} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-6">
            <div className="grid grid-cols-2 gap-3.5">
              {menuItems.map((item) => {
                const isActive = item.name === "My Profile" ? pathname.includes("/en/feed/profile") : item.path !== "#" && pathname.startsWith(item.path);
                const colorClasses = getMenuColor(item.name);
                if (item.disabled) {
                  return (
                    <div key={item.name} className={`flex flex-col items-center justify-center gap-3 p-5 rounded-[1.8rem] font-bold border opacity-50 cursor-not-allowed ${colorClasses}`}>
                      <span className="opacity-70">{item.icon}</span>
                      <span className="text-[10px] tracking-widest uppercase">{item.name}</span>
                    </div>
                  );
                }
                return (
                  <Link key={item.name} href={item.path} onClick={() => setIsMobileMenuOpen(false)} className={`flex flex-col items-center justify-center gap-2 p-5 rounded-[1.8rem] font-bold border bg-gradient-to-br ${colorClasses} ${isActive ? "ring-2 ring-white/20" : ""}`}>
                    <div>{item.icon}</div>
                    <span className="text-[10px] tracking-widest uppercase">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* 🟢 دکمه ساین اوت در موبایل */}
            <div className="pt-2 pb-6">
              <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-3.5 text-neutral-300 hover:text-red-400 bg-[#08080c] hover:bg-red-500/10 rounded-2xl text-xs font-bold transition-all w-full border border-white/[0.06] shadow-md">
                <LogOut size={16} /> Sign Out Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}