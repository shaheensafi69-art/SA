"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        router.replace("/en/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, last_name, avatar_url, wallet_balance")
        .eq("id", data.session.user.id)
        .single();

      if (profile) setUserProfile(profile);
      setIsReady(true);
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/en/login");
  };

  const menuItems = [
    { name: "Overview", path: "/en/dashboard", icon: "📊" },
    { name: "My Courses", path: "/en/dashboard/courses", icon: "📚" },
    { name: "Live Classes", path: "/en/dashboard/live-classes", icon: "🔴" },
    { name: "Assignments", path: "/en/dashboard/assignments", icon: "📝" },
    { name: "Exams & Quizzes", path: "/en/dashboard/quizzes", icon: "🎯" },
    { name: "Trading Journal", path: "/en/dashboard/trading-journal", icon: "📈" },
    { name: "Wallet & Referral", path: "/en/dashboard/wallet", icon: "💰" },
    { name: "Achievements", path: "/en/dashboard/achievements", icon: "🏆" },
    { name: "AI Assistant", path: "/en/dashboard/ai-assistant", icon: "🤖" },
    { name: "Support Tickets", path: "/en/dashboard/support", icon: "🎧" },
    { name: "Settings", path: "/en/dashboard/settings", icon: "⚙️" },
  ];

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
         <span className="text-yellow-500 font-bold animate-pulse">Loading Academy...</span>
      </div>
    );
  }

  return (
    // با items-start مطمئن میشیم هیچ چیز در مرکز صفحه هول داده نمیشه
    <div className="min-h-screen bg-[#050505] flex items-start text-white font-sans overflow-hidden">
      
      {/* بک‌گراند نوری */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-yellow-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* ================= Sidebar ================= */}
      <aside className="w-72 bg-black/40 border-r border-white/5 backdrop-blur-3xl flex flex-col relative z-10 hidden lg:flex h-screen shrink-0">
        
        {/* هدر سایدبار - با ارتفاع فیکس شده h-24 */}
        <div className="h-24 px-8 flex items-center gap-4 border-b border-white/5 shrink-0">
           <div className="relative w-12 h-12 flex items-center justify-center">
             <img src="/logo-without-b.png" alt="Safi Academy" className="w-full h-full object-contain" />
           </div>
           <div>
             <h2 className="text-lg font-bold text-white tracking-tight">Safi Academy</h2>
             <p className="text-xs text-yellow-500 font-semibold uppercase tracking-widest">Ecosystem</p>
           </div>
        </div>

        {/* منوی ناوبری */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path} 
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-all ${
                  isActive 
                    ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.1)]" 
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* بخش پایین سایدبار */}
        <div className="p-6 border-t border-white/5 bg-neutral-900/20 shrink-0">
          {userProfile && (
            <div className="flex items-center gap-3 mb-6">
              <img src={userProfile.avatar_url || "https://i.pravatar.cc/150"} alt="User" className="w-10 h-10 rounded-full border border-yellow-500 object-cover" />
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{userProfile.first_name} {userProfile.last_name}</p>
                <p className="text-xs text-green-400 font-bold">${userProfile.wallet_balance || "0.00"}</p>
              </div>
            </div>
          )}
          <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-3 text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-xl font-bold transition-all w-full border border-red-500/10">
             Logout
          </button>
        </div>
      </aside>

      {/* ================= Main Content ================= */}
      <main className="flex-1 relative z-10 h-screen overflow-y-auto">
        {children}
      </main>

    </div>
  );
}