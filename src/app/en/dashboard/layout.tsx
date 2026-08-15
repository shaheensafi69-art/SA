"use client";

import { useEffect, useState } from "react";
import { 
  X, Sparkles, LogOut, Bell, Wallet, LayoutDashboard, 
  Rss, Users, SquarePen, User, Megaphone, Video, 
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

  // بررسی مسیر برای نمایش حالت تمام‌صفحه
  const isFullScreenRoute = pathname.includes('/dashboard/ai-assistant');
  
  // بررسی اینکه آیا کاربر در بخش‌های فید/سوشال قرار دارد یا خیر
  const isSocialRoute = pathname.includes('/dashboard/feed') || 
                        pathname.includes('/dashboard/network') || 
                        pathname.includes('/dashboard/feed/network') || 
                        pathname.includes('/dashboard/feed/profile');
  
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
        
        // ذخیره اطلاعات پروفایل به همراه ID کاربر برای لینک‌دهی داینامیک
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

  // ساخت آدرس داینامیک برای پروفایل کاربر
  const myProfilePath = userProfile?.id ? `/en/dashboard/feed/profile/${userProfile.id}` : "/en/dashboard/feed/profile";

  // لیست منوها با استفاده از آیکون‌های حرفه‌ای لوساید (Lucide)
  const menuItems = [
    { name: "Overview", path: "/en/dashboard", icon: <LayoutDashboard size={22} /> },
    { name: "Academy Feed", path: "/en/dashboard/feed", icon: <Rss size={22} /> },
    { name: "Manage Network", path: "/en/dashboard/feed/network", icon: <Users size={22} /> },
    { name: "Create Post", path: "/en/dashboard/feed/create", icon: <SquarePen size={22} /> },
    { name: "My Profile", path: myProfilePath, icon: <User size={22} /> },
    { name: "Announcements", path: "/en/dashboard/announcements", icon: <Megaphone size={22} /> },
    { name: "Live Campus", path: "/en/dashboard/live-classes", icon: <Video size={22} /> },
    { name: "Assignments", path: "/en/dashboard/assignments", icon: <FileText size={22} /> },
    { name: "Exams & Quizzes", path: "/en/dashboard/quizzes", icon: <Target size={22} /> },
    { name: "Trading Journal", path: "/en/dashboard/trading-journal", icon: <TrendingUp size={22} /> },
    { name: "Wallet & Referral", path: "/en/dashboard/wallet", icon: <Wallet size={22} /> },
    { name: "Achievements", path: "/en/dashboard/achievements", icon: <Trophy size={22} /> },
    { name: "AI Assistant", path: "#", icon: <Bot size={22} />, disabled: true },
    { name: "Support Tickets", path: "/en/dashboard/support", icon: <Headset size={22} /> },
    { name: "Settings", path: "/en/dashboard/settings", icon: <Settings size={22} /> },
  ];

  const getMenuColor = (name: string) => {
    switch(name) {
      case "Overview": return "from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/30";
      case "Academy Feed": return "from-pink-500/20 to-pink-500/5 text-pink-400 border-pink-500/30";
      case "Manage Network": return "from-indigo-500/20 to-indigo-500/5 text-indigo-400 border-indigo-500/30";
      case "Create Post": return "from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/30";
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
      
      {/* 🌟 هاله‌های نوری پس‌زمینه */}
      <div className="absolute top-[-15%] left-[-15%] w-[50vw] h-[50vw] bg-yellow-600/10 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[-15%] right-[-15%] w-[40vw] h-[40vw] bg-[#C2185B]/10 rounded-full blur-[130px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '6s' }}></div>

      {/* ================= 1. DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex w-[295px] bg-[#060609]/90 backdrop-blur-2xl border-r border-white/[0.06] flex-col relative z-20 shrink-0 p-4 shadow-[15px_0_40px_rgba(0,0,0,0.9)]">
        
        {/* کپسول بالای سایدبار با لوگو */}
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

        {/* لیست منوها */}
        <nav className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-1">
          {menuItems.map((item) => {
            if (item.disabled) {
              return (
                <div key={item.name} className="flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-xs transition-all duration-300 relative overflow-hidden group text-neutral-500 opacity-60 cursor-not-allowed bg-[#08080c]/50 border border-white/[0.02]">
                  <span className="text-neutral-500">{item.icon}</span>
                  <span className="tracking-wide">{item.name}</span>
                  <span className="absolute right-4 text-[8px] font-black uppercase tracking-widest bg-yellow-500/10 text-yellow-500 px-2 py-0.5 rounded border border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.2)]">Soon</span>
                </div>
              );
            }

            // چک کردن فعال بودن منو (بررسی برای Profile به شکل ویژه انجام می‌شود)
            const isActive = item.name === "My Profile" 
                ? pathname.includes("/dashboard/feed/profile")
                : item.path === "/en/dashboard" 
                    ? pathname === "/en/dashboard" 
                    : pathname.startsWith(item.path);

            return (
              <Link 
                key={item.name} 
                href={item.path} 
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-xs transition-all duration-300 relative group overflow-hidden ${
                  isActive 
                    ? "bg-gradient-to-r from-[#1c1a12] to-[#0a0a0e] text-white shadow-[inset_0_2px_5px_rgba(0,0,0,0.9),0_0_20px_rgba(194,24,91,0.15)] border border-[#C2185B]/30 translate-x-1" 
                    : "bg-[#08080c]/80 text-neutral-400 hover:text-white hover:bg-[#0c0c14] shadow-[0_2px_8px_rgba(0,0,0,0.5)] border border-white/[0.03] hover:border-white/10"
                }`}
              >
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#C2185B] rounded-r-full shadow-[0_0_10px_#C2185B]"></div>}
                <span className={`transition-all duration-300 ${isActive ? "scale-110 text-[#C2185B]" : "group-hover:scale-110 group-hover:text-white"}`}>
                  {item.icon}
                </span>
                <span className="tracking-wide">{item.name}</span>
                {isActive && item.name === "Live Campus" && <span className="absolute right-4 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>}
                {item.name === "Announcements" && <span className="absolute right-4 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]"></span>}
              </Link>
            );
          })}
        </nav>

        {/* بخش پروفایل و خروج */}
        <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-3 shrink-0">
          <div className="bg-[#09090e] border border-white/[0.05] p-3 rounded-2xl flex items-center justify-between shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#C2185B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-3 overflow-hidden relative z-10">
              <div className="w-10 h-10 rounded-xl border border-[#C2185B]/40 overflow-hidden shrink-0 bg-neutral-900 flex items-center justify-center shadow-inner group-hover:border-[#C2185B] transition-colors">
                {userProfile?.avatar_url ? (
                  <img src={userProfile.avatar_url} alt="User" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <span className="text-[#C2185B] font-bold">{userProfile?.first_name?.charAt(0) || "S"}</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate flex items-center gap-1">
                  {userProfile?.first_name} {userProfile?.last_name}
                </p>
                <p className="text-[10px] text-emerald-400 font-black tracking-widest uppercase mt-0.5 flex items-center gap-1">
                  <Wallet size={10} /> ${userProfile?.wallet_balance ? Number(userProfile.wallet_balance).toFixed(2) : "0.00"}
                </p>
              </div>
            </div>
          </div>

          <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-3 text-neutral-400 hover:text-red-400 bg-[#08080c] hover:bg-red-500/10 rounded-2xl text-xs font-bold transition-all w-full border border-white/[0.04] hover:border-red-500/30 shadow-[0_2px_8px_rgba(0,0,0,0.5)] group">
             <LogOut size={14} className="group-hover:-translate-x-1 transition-transform" /> Sign Out Account
          </button>
        </div>
      </aside>

      {/* ================= 2. DESKTOP FLOATING NOTIFICATION ================= */}
      <div className="hidden lg:flex absolute top-6 right-10 z-50">
         <Link href="/en/dashboard/announcements" className="w-12 h-12 bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-[#C2185B] hover:border-[#C2185B]/40 transition-all relative group shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
           <Bell className="w-5 h-5 transition-transform group-hover:rotate-12 group-hover:scale-110" />
           <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_#6366f1]"></span>
           <span className="absolute -inset-0.5 bg-[#C2185B]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></span>
         </Link>
      </div>

      {/* ================= 3. MOBILE TOP HEADER ================= */}
      {!isFullScreenRoute && (
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-5 bg-[#030305]/90 backdrop-blur-2xl border-b border-white/[0.06] z-40 shadow-md">
          <div className="flex items-center gap-3 relative">
            <div className="absolute inset-0 bg-yellow-500/20 blur-[12px] rounded-full scale-150"></div>
            <img src="/logo-without-b.png" alt="Safi Academy" className="relative z-10 w-8 h-8 object-contain filter drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
            <span className="relative z-10 font-black text-xs tracking-widest text-white uppercase">Safi Academy</span>
          </div>
          
          <Link href="/en/dashboard/announcements" className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-neutral-400 hover:text-[#C2185B] transition-colors relative shadow-inner">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#C2185B] rounded-full animate-pulse shadow-[0_0_6px_#C2185B]"></span>
          </Link>
        </div>
      )}

      {/* ================= 4. MAIN CONTENT ================= */}
      <main className={`flex-1 relative z-10 h-screen overflow-y-auto custom-scrollbar ${isFullScreenRoute ? 'pt-0 pb-0' : 'pt-16 pb-32'} lg:pt-0 lg:pb-0`}>
        {children}
      </main>

      {/* ================= 5. FLOATING MOBILE BOTTOM NAV ================= */}
      {!isFullScreenRoute && (
        <div className="lg:hidden fixed bottom-6 left-4 right-4 h-[75px] bg-[#09090e]/95 backdrop-blur-3xl border border-white/10 z-50 px-2 rounded-[2.5rem] flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(194,24,91,0.05)]">
          
          {isSocialRoute ? (
            <>
              {/* FEED NAV */}
              <Link href="/en/dashboard/feed" className="relative flex flex-col items-center justify-center w-[20%] h-full group">
                {pathname === "/en/dashboard/feed" && <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent rounded-[2rem] opacity-100"></div>}
                <Rss size={22} className={`z-10 transition-all ${pathname === "/en/dashboard/feed" ? "-translate-y-2 text-[#C2185B]" : "text-neutral-500 group-hover:text-neutral-300"}`} />
                <span className={`absolute bottom-2 text-[9px] font-black tracking-widest uppercase transition-all z-10 ${pathname === "/en/dashboard/feed" ? "text-[#C2185B] opacity-100 translate-y-0" : "text-neutral-500 opacity-0 translate-y-2"}`}>Feed</span>
              </Link>

              {/* NETWORK NAV */}
              <Link href="/en/dashboard/feed/network" className="relative flex flex-col items-center justify-center w-[20%] h-full group">
                {pathname.includes("/dashboard/feed/network") && <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent rounded-[2rem] opacity-100"></div>}
                <Users size={22} className={`z-10 transition-all ${pathname.includes("/dashboard/feed/network") ? "-translate-y-2 text-[#C2185B]" : "text-neutral-500 group-hover:text-neutral-300"}`} />
                <span className={`absolute bottom-2 text-[9px] font-black tracking-widest uppercase transition-all z-10 ${pathname.includes("/dashboard/feed/network") ? "text-[#C2185B] opacity-100 translate-y-0" : "text-neutral-500 opacity-0 translate-y-2"}`}>Network</span>
              </Link>

              {/* CREATE POST (FAB CENTER) */}
              <Link href="/en/dashboard/feed/create" className="relative flex flex-col items-center justify-start w-[20%] h-full group -mt-8">
                <div className="absolute top-1 w-16 h-16 bg-amber-500/40 blur-[12px] rounded-full group-hover:bg-amber-500/60 transition-all duration-300"></div>
                <div className="relative z-10 w-[56px] h-[56px] bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center border-[5px] border-[#09090e] shadow-xl group-hover:scale-105 transition-transform duration-300">
                  <SquarePen size={22} className="text-black ml-0.5" strokeWidth={2.5} />
                </div>
                <span className="text-[9px] font-black tracking-widest uppercase text-yellow-500 mt-1.5 drop-shadow-[0_0_8px_#f59e0b] group-hover:text-yellow-400 transition-colors">Post</span>
              </Link>

              {/* PROFILE NAV (DYNAMIC LINK) */}
              <Link href={myProfilePath} className="relative flex flex-col items-center justify-center w-[20%] h-full group">
                {pathname.includes("/dashboard/feed/profile") && <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent rounded-[2rem] opacity-100"></div>}
                <User size={22} className={`z-10 transition-all ${pathname.includes("/dashboard/feed/profile") ? "-translate-y-2 text-[#C2185B]" : "text-neutral-500 group-hover:text-neutral-300"}`} />
                <span className={`absolute bottom-2 text-[9px] font-black tracking-widest uppercase transition-all z-10 ${pathname.includes("/dashboard/feed/profile") ? "text-[#C2185B] opacity-100 translate-y-0" : "text-neutral-500 opacity-0 translate-y-2"}`}>Profile</span>
              </Link>

              {/* MENU NAV */}
              <button onClick={() => setIsMobileMenuOpen(true)} className="relative flex flex-col items-center justify-center w-[20%] h-full group">
                <Grid size={22} className="z-10 transition-all text-neutral-500 group-hover:text-neutral-300" />
                <span className="absolute bottom-2 text-[9px] font-black tracking-widest uppercase transition-all z-10 text-neutral-500 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">Menu</span>
              </button>
            </>
          ) : (
            <>
              {/* OVERVIEW NAV */}
              <Link href="/en/dashboard" className="relative flex flex-col items-center justify-center w-[25%] h-full group">
                <LayoutDashboard size={22} className={`z-10 transition-all ${pathname === "/en/dashboard" ? "-translate-y-2 text-white" : "text-neutral-500 group-hover:text-neutral-300"}`} />
                <span className={`absolute bottom-2 text-[9px] font-black tracking-widest uppercase transition-all z-10 ${pathname === "/en/dashboard" ? "text-white opacity-100 translate-y-0" : "text-neutral-500 opacity-0 translate-y-2"}`}>Overview</span>
              </Link>

              {/* FEED ENTRY NAV */}
              <Link href="/en/dashboard/feed" className="relative flex flex-col items-center justify-center w-[25%] h-full group">
                <Rss size={22} className="z-10 transition-all text-neutral-500 group-hover:text-neutral-300" />
                <span className="absolute bottom-2 text-[9px] font-black tracking-widest uppercase transition-all z-10 text-neutral-500 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">Feed</span>
              </Link>

              {/* LIVE NAV */}
              <Link href="/en/dashboard/live-classes" className="relative flex flex-col items-center justify-center w-[25%] h-full group">
                <Video size={22} className={`z-10 transition-all ${pathname.includes("/dashboard/live-classes") ? "-translate-y-2 text-red-500" : "text-neutral-500 group-hover:text-neutral-300"}`} />
                <span className={`absolute bottom-2 text-[9px] font-black tracking-widest uppercase transition-all z-10 ${pathname.includes("/dashboard/live-classes") ? "text-red-500 opacity-100 translate-y-0" : "text-neutral-500 opacity-0 translate-y-2"}`}>Live</span>
              </Link>

              {/* MENU NAV */}
              <button onClick={() => setIsMobileMenuOpen(true)} className="relative flex flex-col items-center justify-center w-[25%] h-full group">
                <Grid size={22} className="z-10 transition-all text-neutral-500 group-hover:text-neutral-300" />
                <span className="absolute bottom-2 text-[9px] font-black tracking-widest uppercase transition-all z-10 text-neutral-500 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">Menu</span>
              </button>
            </>
          )}
        </div>
      )}

      {/* ================= 6. MOBILE MENU TERMINAL (Drawer) ================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#030305]/95 backdrop-blur-3xl z-[100] flex flex-col animate-[fadeIn_0.2s_ease-out] lg:hidden">
          <div className="h-16 px-5 border-b border-white/[0.06] flex justify-between items-center bg-black/50 shrink-0">
            <span className="font-black text-white uppercase tracking-widest text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C2185B] animate-ping"></span> Tools & Features
            </span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white bg-white/5 rounded-full border border-white/10 transition-colors">
              <X size={16} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
            <div className="grid grid-cols-2 gap-3.5">
              {menuItems.map((item) => {
                const isActive = item.name === "My Profile" 
                  ? pathname.includes("/dashboard/feed/profile")
                  : item.path !== "#" && (pathname === item.path || pathname.startsWith(`${item.path}/`));
                
                const colorClasses = getMenuColor(item.name);
                
                if (item.disabled) {
                  return (
                    <div key={item.name} className={`relative flex flex-col items-center justify-center gap-3 p-5 rounded-[1.8rem] font-bold border bg-gradient-to-br opacity-50 cursor-not-allowed ${colorClasses} grayscale`}>
                      <span className="opacity-70">{item.icon}</span>
                      <span className="text-[10px] tracking-widest uppercase text-center line-clamp-1 mt-1">{item.name}</span>
                      <div className="absolute top-2 right-2 bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest">Soon</div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`relative flex flex-col items-center justify-center gap-2 p-5 rounded-[1.8rem] font-bold transition-all border bg-gradient-to-br hover:scale-105 active:scale-95 shadow-lg ${colorClasses} ${
                      isActive ? "ring-2 ring-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] opacity-150 scale-102" : "opacity-90 hover:opacity-100"
                    }`}
                  >
                    <div className={isActive ? "text-white scale-110" : ""}>{item.icon}</div>
                    <span className={`text-[10px] tracking-widest uppercase text-center line-clamp-1 mt-1 ${isActive ? "text-white" : ""}`}>{item.name}</span>
                    {item.name === "Announcements" && <div className="absolute top-3 right-3 w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_#6366f1]"></div>}
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10 space-y-4 pb-8">
               {userProfile && (
                <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] p-4 rounded-3xl shadow-inner">
                  <img src={userProfile.avatar_url || "https://i.pravatar.cc/150"} alt="User" className="w-12 h-12 rounded-xl border border-[#C2185B]/50 object-cover shadow-md" />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">{userProfile.first_name} {userProfile.last_name}</p>
                    <p className="text-xs text-emerald-400 font-bold mt-1 flex items-center gap-1">
                      <Wallet size={12} /> ${userProfile.wallet_balance ? Number(userProfile.wallet_balance).toFixed(2) : "0.00"}
                    </p>
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
                </div>
              )}
              <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-4 text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-2xl font-bold transition-all w-full border border-red-500/20 shadow-lg">
                <LogOut size={16} /> Sign Out Account
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}