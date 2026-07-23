"use client";

import { useEffect, useState } from "react";
import { X, Sparkles, LogOut, Bell, ShieldCheck, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() || "";
  
  const [isReady, setIsReady] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isGroupChatRoute = pathname.includes('/teacher/groups/') && pathname.split('/').length > 4;
  const isLiveMeetRoute = pathname.includes('/teacher/live-classes/') && pathname.split('/').length > 4;
  const isFullScreenRoute = isGroupChatRoute || isLiveMeetRoute;

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
          .select("first_name, last_name, avatar_url, wallet_balance")
          .eq("id", user.id)
          .single();
        if (profile) setUserProfile(profile);
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

  const menuItems = [
    { name: "Overview", path: "/en/teacher", icon: "📊" },
    { name: "Announcements", path: "/en/teacher/announcements", icon: "📢" },
    { name: "My Courses", path: "/en/teacher/courses", icon: "📚" },
    { name: "Live Classes", path: "/en/teacher/live-classes", icon: "🔴" },
    { name: "My Students", path: "/en/teacher/students", icon: "👥" },
    { name: "Assignments", path: "/en/teacher/assignments", icon: "📝" },
    { name: "Exams & Quizzes", path: "/en/teacher/quizzes", icon: "🎯" },
    { name: "Trading Journal", path: "/en/teacher/trading-journal", icon: "📈" },
    { name: "Achievements", path: "/en/teacher/achievements", icon: "🏆" },
    { name: "Settings", path: "/en/teacher/settings", icon: "⚙️" },
  ];

  const getMenuColor = (name: string) => {
    switch(name) {
      case "Overview": return "from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/30";
      case "Announcements": return "from-indigo-500/20 to-indigo-500/5 text-indigo-400 border-indigo-500/30";
      case "My Courses": return "from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30";
      case "Live Classes": return "from-red-500/20 to-red-500/5 text-red-400 border-red-500/30";
      case "My Students": return "from-fuchsia-500/20 to-fuchsia-500/5 text-fuchsia-400 border-fuchsia-500/30";
      case "Assignments": return "from-orange-500/20 to-orange-500/5 text-orange-400 border-orange-500/30";
      case "Exams & Quizzes": return "from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30";
      case "Trading Journal": return "from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/30";
      case "Achievements": return "from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/30";
      case "Settings": return "from-slate-500/20 to-slate-500/5 text-slate-400 border-slate-500/30";
      default: return "from-neutral-500/20 to-neutral-500/5 text-neutral-400 border-neutral-500/30";
    }
  };

  if (!isReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#020202] text-white">
         <div className="w-16 h-16 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_25px_rgba(217,70,239,0.4)]"></div>
         <span className="text-fuchsia-500 font-bold uppercase tracking-widest text-xs animate-pulse">Initializing Instructor Portal...</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#030305] text-white font-sans overflow-hidden relative selection:bg-fuchsia-500 selection:text-white">
      
      {/* 🌟 هاله‌های نوری پویا و زنده‌ی پس‌زمینه با طیف فوشیا/بنفش اساتید */}
      <div className="absolute top-[-15%] left-[-15%] w-[50vw] h-[50vw] bg-fuchsia-600/15 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[-15%] right-[-15%] w-[40vw] h-[40vw] bg-purple-700/10 rounded-full blur-[130px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '6s' }}></div>

      {/* ================= 1. NEUMORPHIC LIVE DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex w-[295px] bg-[#060609]/90 backdrop-blur-2xl border-r border-white/[0.06] flex-col relative z-20 shrink-0 p-4 shadow-[15px_0_40px_rgba(0,0,0,0.9)]">
        
        {/* کپسول بالای سایدبار با لوگو و افکت درخشش فوشیا */}
        <div className="mb-5 p-4 rounded-2xl bg-gradient-to-br from-[#0c0c14] to-[#07070a] shadow-[inset_0_2px_6px_rgba(0,0,0,0.9),0_6px_20px_rgba(0,0,0,0.5)] border border-fuchsia-500/10 shrink-0 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-2xl opacity-20 blur group-hover:opacity-45 transition duration-500"></div>
          <Link href="/en/teacher" className="flex items-center gap-3.5 relative z-10">
             <div className="relative flex items-center justify-center transform group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300">
               <div className="absolute inset-0 bg-fuchsia-500/30 blur-[10px] rounded-full"></div>
               <img src="/logo-without-b.png" alt="Safi Academy" className="relative z-10 w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(217,70,239,0.7)]" />
             </div>
             <div>
               <h2 className="text-xs font-black text-white tracking-widest uppercase flex items-center gap-1.5">
                 Safi Academy <Sparkles size={10} className="text-fuchsia-400 animate-spin" style={{ animationDuration: '4s' }} />
               </h2>
               <p className="text-[9px] text-fuchsia-400 font-bold uppercase tracking-[0.2em] mt-0.5">Instructor Portal</p>
             </div>
          </Link>
        </div>

        {/* لیست منوها با افکت کپسولی پویا */}
        <nav className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-1">
          {menuItems.map((item) => {
            const isActive = item.path === "/en/teacher" ? pathname === "/en/teacher" : pathname.startsWith(item.path);
            return (
              <Link 
                key={item.path} 
                href={item.path} 
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-xs transition-all duration-300 relative group overflow-hidden ${
                  isActive 
                    ? "bg-gradient-to-r from-[#1c121d] to-[#0a0a0e] text-white shadow-[inset_0_2px_5px_rgba(0,0,0,0.9),0_0_20px_rgba(217,70,239,0.2)] border border-fuchsia-500/40 translate-x-1" 
                    : "bg-[#08080c]/80 text-neutral-400 hover:text-white hover:bg-[#0c0c14] shadow-[0_2px_8px_rgba(0,0,0,0.5)] border border-white/[0.03] hover:border-white/10"
                }`}
              >
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-fuchsia-500 rounded-r-full shadow-[0_0_10px_#d946ef]"></div>}
                <span className={`text-lg transition-all duration-300 ${isActive ? "scale-125 text-fuchsia-400 rotate-3" : "group-hover:scale-110 group-hover:text-white"}`}>{item.icon}</span>
                <span className="tracking-wide">{item.name}</span>
                {isActive && item.name === "Live Classes" && <span className="absolute right-4 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>}
                {item.name === "Announcements" && <span className="absolute right-4 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]"></span>}
              </Link>
            );
          })}
        </nav>

        {/* بخش پروفایل، کیف پول و خروج زنده در پایین سایدبار */}
        <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-3 shrink-0">
          <div className="bg-[#09090e] border border-white/[0.05] p-3 rounded-2xl flex items-center justify-between shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-3 overflow-hidden relative z-10">
              <div className="w-10 h-10 rounded-xl border border-fuchsia-500/40 overflow-hidden shrink-0 bg-neutral-900 flex items-center justify-center shadow-inner group-hover:border-fuchsia-400 transition-colors">
                {userProfile?.avatar_url ? (
                  <img src={userProfile.avatar_url} alt="Instructor" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <span className="text-fuchsia-500 font-bold">{userProfile?.first_name?.charAt(0) || "I"}</span>
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
            <div className="relative z-10 flex items-center justify-center w-2.5 h-2.5">
              <div className="absolute w-full h-full rounded-full bg-emerald-400 animate-ping opacity-75"></div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></div>
            </div>
          </div>

          <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-3 text-neutral-400 hover:text-red-400 bg-[#08080c] hover:bg-red-500/10 rounded-2xl text-xs font-bold transition-all w-full border border-white/[0.04] hover:border-red-500/30 shadow-[0_2px_8px_rgba(0,0,0,0.5)] group">
             <LogOut size={14} className="group-hover:-translate-x-1 transition-transform" /> Sign Out Account
          </button>
        </div>
      </aside>

      {/* ================= 2. DESKTOP FLOATING NOTIFICATION ================= */}
      <div className="hidden lg:flex absolute top-6 right-10 z-50">
         <Link href="/en/teacher/announcements" className="w-12 h-12 bg-[#0a0a0f]/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-fuchsia-400 hover:border-fuchsia-500/40 transition-all relative group shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
           <Bell className="w-5 h-5 transition-transform group-hover:rotate-12 group-hover:scale-110" />
           <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_#6366f1]"></span>
           <span className="absolute -inset-0.5 bg-fuchsia-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"></span>
         </Link>
      </div>

      {/* ================= 3. MOBILE TOP HEADER ================= */}
      {!isFullScreenRoute && (
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-5 bg-[#030305]/90 backdrop-blur-2xl border-b border-white/[0.06] z-40">
          <div className="flex items-center gap-3 relative">
            <div className="absolute inset-0 bg-fuchsia-500/20 blur-[12px] rounded-full scale-150"></div>
            <img src="/logo-without-b.png" alt="Safi Academy" className="relative z-10 w-9 h-9 object-contain filter drop-shadow-[0_0_8px_rgba(217,70,239,0.6)]" />
            <span className="relative z-10 font-black text-xs tracking-widest text-white uppercase">Safi Academy</span>
          </div>
          
          <Link href="/en/teacher/announcements" className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-neutral-400 hover:text-fuchsia-400 transition-colors relative shadow-inner">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_6px_#6366f1]"></span>
          </Link>
        </div>
      )}

      {/* ================= 4. MAIN CONTENT ================= */}
      <main className={`flex-1 relative z-10 h-screen overflow-y-auto custom-scrollbar ${isFullScreenRoute ? 'pt-0 pb-0' : 'pt-16 pb-32'} lg:pt-0 lg:pb-0`}>
        {children}
      </main>

      {/* ================= 5. FLOATING MOBILE BOTTOM NAV ================= */}
      {!isFullScreenRoute && (
        <div className="lg:hidden fixed bottom-6 left-5 right-5 h-[70px] bg-[#09090e]/90 backdrop-blur-3xl border border-white/10 z-50 px-3 rounded-full flex justify-around items-center shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(217,70,239,0.1)]">
          {[
            { name: "Overview", path: "/en/teacher", icon: "📊" },
            { name: "Courses", path: "/en/teacher/courses", icon: "📚" },
            { name: "Live", path: "/en/teacher/live-classes", icon: "🔴" },
          ].map((item) => {
            const isActive = item.path === "/en/teacher" ? pathname === "/en/teacher" : pathname.startsWith(item.path);
            return (
              <Link key={item.path} href={item.path} className="relative flex flex-col items-center justify-center w-16 h-full group">
                {isActive && <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-500/20 to-transparent rounded-full opacity-100 transition-all duration-300"></div>}
                <span className={`text-xl transition-all duration-300 ease-out z-10 ${isActive ? "-translate-y-2.5 scale-125 drop-shadow-[0_0_10px_rgba(217,70,239,0.6)]" : "text-neutral-500 group-hover:-translate-y-1 group-hover:text-neutral-300"}`}>{item.icon}</span>
                <span className={`absolute bottom-1.5 text-[9px] font-black tracking-widest uppercase transition-all duration-300 z-10 ${isActive ? "text-fuchsia-400 opacity-100 translate-y-0" : "text-neutral-500 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"}`}>{item.name}</span>
                {isActive && <div className="absolute bottom-1 w-1 h-1 rounded-full bg-fuchsia-400 shadow-[0_0_6px_#d946ef]"></div>}
              </Link>
            );
          })}
          <button onClick={() => setIsMobileMenuOpen(true)} className="relative flex flex-col items-center justify-center w-16 h-full group">
            <span className="text-xl transition-all duration-300 ease-out z-10 text-neutral-500 group-hover:-translate-y-1 group-hover:text-neutral-300">⚙️</span>
            <span className="absolute bottom-1.5 text-[9px] font-black tracking-widest uppercase transition-all duration-300 z-10 text-neutral-500 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">More</span>
          </button>
        </div>
      )}

      {/* ================= 6. MOBILE MENU TERMINAL (Drawer) ================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#030305]/95 backdrop-blur-3xl z-[100] flex flex-col animate-[fadeIn_0.2s_ease-out] lg:hidden">
          <div className="h-16 px-5 border-b border-white/[0.06] flex justify-between items-center bg-black/50 shrink-0">
            <span className="font-black text-white uppercase tracking-widest text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-ping"></span> Instructor Tools
            </span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white bg-white/5 rounded-full border border-white/10 transition-colors">
              <X size={16} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
            <div className="grid grid-cols-2 gap-3.5">
              {menuItems.map((item) => {
                const isActive = item.path === "/en/teacher" ? pathname === "/en/teacher" : pathname.startsWith(item.path);
                const colorClasses = getMenuColor(item.name);
                
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`relative flex flex-col items-center justify-center gap-3 p-5 rounded-[1.8rem] font-bold transition-all border bg-gradient-to-br hover:scale-105 active:scale-95 shadow-lg ${colorClasses} ${
                      isActive ? "ring-2 ring-fuchsia-400/50 shadow-[0_0_20px_rgba(217,70,239,0.3)] opacity-150 scale-102" : "opacity-90 hover:opacity-100"
                    }`}
                  >
                    <span className="text-3xl drop-shadow-md">{item.icon}</span>
                    <span className="text-[10px] tracking-widest uppercase text-center line-clamp-1">{item.name}</span>
                    {item.name === "Announcements" && <div className="absolute top-3 right-3 w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_#6366f1]"></div>}
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
               {userProfile && (
                <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] p-4 rounded-3xl shadow-inner">
                  <img src={userProfile.avatar_url || "https://i.pravatar.cc/150"} alt="User" className="w-12 h-12 rounded-xl border border-fuchsia-500/50 object-cover shadow-md" />
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