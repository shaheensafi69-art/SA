"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() || "";
  
  const [isReady, setIsReady] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🔥 تشخیص هوشمند تمام صفحات فول‌اسکرین اساتید (چت هوش مصنوعی، گروه‌ها و کلاس زنده) 🔥
  const isGroupChatRoute = pathname.includes('/teacher/groups/') && pathname.split('/').length > 4;
  const isAIRoute = pathname.includes('/teacher/ai-assistant');
  const isLiveMeetRoute = pathname.includes('/teacher/live-classes/') && pathname.split('/').length > 4;
  
  // ترکیب هر سه مسیر برای پنهان‌سازی هدر و فوتر در موبایل
  const isFullScreenRoute = isGroupChatRoute || isAIRoute || isLiveMeetRoute;

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
    { name: "My Courses", path: "/en/teacher/courses", icon: "📚" },
    { name: "Live Classes", path: "/en/teacher/live-classes", icon: "🔴" },
    { name: "My Students", path: "/en/teacher/students", icon: "👥" },
    { name: "Assignments", path: "/en/teacher/assignments", icon: "📝" },
    { name: "Exams & Quizzes", path: "/en/teacher/quizzes", icon: "🎯" },
    { name: "Trading Journal", path: "/en/teacher/trading-journal", icon: "📈" },
    { name: "AI Assistant", path: "/en/teacher/ai-assistant", icon: "🤖" },
    { name: "Support Tickets", path: "/en/teacher/support", icon: "🎧" },
    { name: "Settings", path: "/en/teacher/settings", icon: "⚙️" },
  ];

  const getMenuColor = (name: string) => {
    switch(name) {
      case "Overview": return "from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/30";
      case "My Courses": return "from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30";
      case "Live Classes": return "from-red-500/20 to-red-500/5 text-red-400 border-red-500/30";
      case "My Students": return "from-indigo-500/20 to-indigo-500/5 text-indigo-400 border-indigo-500/30";
      case "Assignments": return "from-orange-500/20 to-orange-500/5 text-orange-400 border-orange-500/30";
      case "Exams & Quizzes": return "from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30";
      case "Trading Journal": return "from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/30";
      case "AI Assistant": return "from-fuchsia-500/20 to-fuchsia-500/5 text-fuchsia-400 border-fuchsia-500/30";
      case "Support Tickets": return "from-teal-500/20 to-teal-500/5 text-teal-400 border-teal-500/30";
      case "Settings": return "from-slate-500/20 to-slate-500/5 text-slate-400 border-slate-500/30";
      default: return "from-neutral-500/20 to-neutral-500/5 text-neutral-400 border-neutral-500/30";
    }
  };

  if (!isReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#020202] text-white">
         <div className="w-16 h-16 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_20px_rgba(217,70,239,0.3)]"></div>
         <span className="text-fuchsia-500 font-bold uppercase tracking-widest text-sm animate-pulse">Loading Panel...</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#020202] text-white font-sans overflow-hidden relative">
      
      {/* هاله‌های نوری اختصاصی اساتید */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* ================= 1. DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex w-[280px] bg-[#050505]/80 backdrop-blur-3xl border-r border-white/5 flex-col relative z-20 shrink-0">
        <div className="h-24 px-8 flex items-center gap-4 border-b border-white/5 shrink-0">
           <Link href="/en/teacher" className="flex items-center gap-4 group">
             <div className="w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.3)] group-hover:scale-105 transition-transform">
               <img src="/logo-without-b.png" alt="Safi Academy" className="w-7 h-7 object-contain drop-shadow-2xl" />
             </div>
             <div>
               <h2 className="text-sm font-black text-white tracking-widest uppercase">Safi Academy</h2>
               <p className="text-[9px] text-fuchsia-400 font-bold uppercase tracking-[0.2em] mt-0.5">Instructor Portal</p>
             </div>
           </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-5 space-y-1.5 custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = item.path === "/en/teacher" ? pathname === "/en/teacher" : pathname.startsWith(item.path);
            return (
              <Link 
                key={item.path} 
                href={item.path} 
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 relative overflow-hidden group ${
                  isActive ? "text-white shadow-[0_10px_20px_rgba(217,70,239,0.15)] scale-[1.02]" : "text-neutral-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {isActive && <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-purple-600 opacity-100"></div>}
                <span className={`relative z-10 text-xl transition-transform ${isActive ? "" : "group-hover:scale-110"}`}>{item.icon}</span>
                <span className="relative z-10 tracking-wide">{item.name}</span>
                {isActive && item.name === "Live Classes" && <span className="absolute right-4 w-2 h-2 rounded-full bg-red-600 animate-pulse border border-white/50 z-10"></span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-5 border-t border-white/5 bg-black/40 shrink-0">
          <div className="bg-white/5 border border-white/10 p-3 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl border border-fuchsia-500/30 overflow-hidden shrink-0 bg-neutral-900 flex items-center justify-center">
                {userProfile?.avatar_url ? (
                  <img src={userProfile.avatar_url} alt="Instructor" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-fuchsia-500 font-bold">{userProfile?.first_name?.charAt(0) || "I"}</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{userProfile?.first_name} {userProfile?.last_name}</p>
                <p className="text-[10px] text-green-400 font-bold mt-0.5">${userProfile?.wallet_balance || "0.00"}</p>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="mt-3 flex items-center justify-center gap-2 px-4 py-3 text-red-400 bg-red-500/10 hover:bg-red-500/20 hover:text-red-300 rounded-xl text-xs font-bold transition-all w-full border border-red-500/20">
             Sign Out Account
          </button>
        </div>
      </aside>

      {/* ================= 2. DESKTOP FLOATING NOTIFICATION ================= */}
      <div className="hidden lg:flex absolute top-6 right-10 z-50">
         <button className="w-12 h-12 bg-neutral-900/60 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-fuchsia-400 hover:border-fuchsia-500/30 transition-all relative group shadow-lg">
           <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
           <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_red]"></span>
         </button>
      </div>

      {/* ================= 3. MOBILE TOP HEADER ================= */}
      {!isFullScreenRoute && (
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-5 bg-[#020202]/80 backdrop-blur-2xl border-b border-white/5 z-40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8">
              <img src="/logo-without-b.png" alt="Safi Academy" className="w-full h-full object-contain filter drop-shadow-[0_0_5px_rgba(217,70,239,0.5)]" />
            </div>
            <span className="font-black text-xs tracking-widest text-white uppercase">Safi Academy</span>
          </div>
          
          <button className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-neutral-400 hover:text-fuchsia-400 transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_red]"></span>
          </button>
        </div>
      )}

      {/* ================= 4. MAIN CONTENT ================= */}
      {/* پدینگ‌های موبایل با توجه به وضعیت فول اسکرین تنظیم می‌شوند */}
      <main className={`flex-1 relative z-10 h-screen overflow-y-auto custom-scrollbar ${isFullScreenRoute ? 'pt-0 pb-0' : 'pt-16 pb-32'} lg:pt-0 lg:pb-0`}>
        {children}
      </main>

      {/* ================= 5. FLOATING MOBILE BOTTOM NAV ================= */}
      {!isFullScreenRoute && (
        <div className="lg:hidden fixed bottom-6 left-6 right-6 h-[72px] bg-neutral-950/80 backdrop-blur-3xl border border-white/10 z-50 px-3 rounded-full flex justify-around items-center shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(217,70,239,0.05)]">
          {[
            { name: "Overview", path: "/en/teacher", icon: "📊" },
            { name: "Courses", path: "/en/teacher/courses", icon: "📚" },
            { name: "Live", path: "/en/teacher/live-classes", icon: "🔴" },
          ].map((item) => {
            const isActive = item.path === "/en/teacher" ? pathname === "/en/teacher" : pathname.startsWith(item.path);
            return (
              <Link key={item.path} href={item.path} className="relative flex flex-col items-center justify-center w-16 h-full group">
                {isActive && <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-500/15 to-transparent rounded-full opacity-100 transition-opacity duration-300"></div>}
                <span className={`text-xl transition-all duration-500 ease-out z-10 ${isActive ? "-translate-y-2 scale-110 drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]" : "text-neutral-500 group-hover:-translate-y-1 group-hover:text-neutral-300"}`}>{item.icon}</span>
                <span className={`absolute bottom-2 text-[9px] font-black tracking-widest uppercase transition-all duration-500 z-10 ${isActive ? "text-fuchsia-400 opacity-100 translate-y-0" : "text-neutral-500 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"}`}>{item.name}</span>
                {isActive && <div className="absolute bottom-1 w-1 h-1 rounded-full bg-fuchsia-400 shadow-[0_0_5px_#d946ef]"></div>}
              </Link>
            );
          })}
          <button onClick={() => setIsMobileMenuOpen(true)} className="relative flex flex-col items-center justify-center w-16 h-full group">
            <span className="text-xl transition-all duration-500 ease-out z-10 text-neutral-500 group-hover:-translate-y-1 group-hover:text-neutral-300">⚙️</span>
            <span className="absolute bottom-2 text-[9px] font-black tracking-widest uppercase transition-all duration-500 z-10 text-neutral-500 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">More</span>
          </button>
        </div>
      )}

      {/* ================= 6. COLORFUL FULL SCREEN MOBILE MENU (Drawer) ================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#020202]/95 backdrop-blur-3xl z-[100] flex flex-col animate-[fadeIn_0.2s_ease-out] lg:hidden">
          <div className="h-16 px-5 border-b border-white/5 flex justify-between items-center bg-black/40 shrink-0">
            <span className="font-black text-white uppercase tracking-widest text-xs">Instructor Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white bg-white/5 rounded-full border border-white/10 transition-colors">
              <X size={16} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
            <div className="grid grid-cols-2 gap-3">
              {menuItems.map((item) => {
                const isActive = item.path === "/en/teacher" ? pathname === "/en/teacher" : pathname.startsWith(item.path);
                const colorClasses = getMenuColor(item.name);
                
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex flex-col items-center justify-center gap-3 p-5 rounded-[1.5rem] font-bold transition-all border bg-gradient-to-br hover:scale-105 active:scale-95 ${colorClasses} ${
                      isActive ? "ring-2 ring-white/20 shadow-xl opacity-100" : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    <span className="text-3xl drop-shadow-md">{item.icon}</span>
                    <span className="text-[10px] tracking-widest uppercase text-center line-clamp-1">{item.name}</span>
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10">
               {userProfile && (
                <div className="flex items-center gap-4 mb-6 bg-white/[0.02] border border-white/5 p-4 rounded-3xl">
                  <img src={userProfile.avatar_url || "https://i.pravatar.cc/150"} alt="User" className="w-12 h-12 rounded-xl border border-fuchsia-500 object-cover" />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">{userProfile.first_name} {userProfile.last_name}</p>
                    <p className="text-xs text-green-400 font-bold mt-1">${userProfile.wallet_balance || "0.00"}</p>
                  </div>
                </div>
              )}
              <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-4 text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-2xl font-bold transition-all w-full border border-red-500/20 shadow-lg">
                Sign Out Account
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}