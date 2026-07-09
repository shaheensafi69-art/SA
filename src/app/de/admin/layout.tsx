"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isReady, setIsReady] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const supabase = createClient();
    
    // Initial fetch of profile
    const fetchProfile = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (user && !userError) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, last_name, avatar_url, role")
          .eq("id", user.id)
          .single();
        if (profile) {
          if (profile.role !== "admin" && profile.role !== "super_admin") {
            router.replace("/en/dashboard");
            return;
          }
          setUserProfile(profile);
        }
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
    { name: "Overview", path: "/en/admin", icon: "📊" },
    { name: "Course Builder", path: "/en/admin/add-course", icon: "➕" },
    { name: "Faculty Mgmt", path: "/en/admin/manage-teachers", icon: "👥" },
    { name: "Live Studio", path: "/en/admin/live-classes", icon: "🔴" },
    { name: "Support Tickets", path: "/en/admin/tickets", icon: "🎧" },
    { name: "Settings", path: "/en/admin/settings", icon: "⚙️" },
  ];

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
         <span className="text-blue-500 font-bold animate-pulse">Loading Admin Panel...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col lg:flex-row items-start text-white font-sans overflow-hidden">
      {/* Mobile Top Header (Just Logo) */}
      <div className="lg:hidden w-full flex items-center p-4 bg-black/40 border-b border-white/5 relative z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src="/logo-without-b.png" alt="Safi Academy" className="w-full h-full object-contain drop-shadow-2xl" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white uppercase">Admin Panel</span>
        </div>
      </div>
      
      {/* ================= Sidebar (Desktop only since original admin didn't have one, but we add it for consistency) ================= */}
      <aside className="hidden lg:flex w-72 bg-black/40 border-r border-white/5 backdrop-blur-3xl flex-col relative z-10 h-screen shrink-0">
        <div className="h-24 px-8 flex items-center gap-4 border-b border-white/5 shrink-0">
           <div className="w-16 h-16 flex items-center justify-center">
             <img src="/logo-without-b.png" alt="Safi Academy" className="w-full h-full object-contain drop-shadow-2xl" />
           </div>
           <div>
             <h2 className="text-lg font-bold text-white tracking-tight">Safi Academy</h2>
             <p className="text-xs text-blue-500 font-semibold uppercase tracking-widest">Admin</p>
           </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path} 
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-all ${
                  isActive 
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5 bg-neutral-900/20 shrink-0">
          {userProfile && (
            <div className="flex items-center gap-3 mb-6">
              <img src={userProfile.avatar_url || "https://i.pravatar.cc/150"} alt="User" className="w-10 h-10 rounded-full border border-blue-500 object-cover" />
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{userProfile.first_name} {userProfile.last_name}</p>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Admin</p>
              </div>
            </div>
          )}
          <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-3 text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-xl font-bold transition-all w-full border border-red-500/10">
             Logout
          </button>
        </div>
      </aside>

      {/* ================= Main Content ================= */}
      <main className="flex-1 relative z-10 h-screen overflow-y-auto pb-20 lg:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-white/10 z-50 px-2 py-2 flex justify-between items-center backdrop-blur-xl">
        <Link href="/en/admin" className={`flex flex-col items-center p-2 rounded-xl transition-colors ${pathname === "/en/admin" ? "text-blue-400" : "text-neutral-500"}`}>
          <span className="text-xl mb-1">📊</span>
          <span className="text-[10px] font-bold">Overview</span>
        </Link>
        <Link href="/en/admin/add-course" className={`flex flex-col items-center p-2 rounded-xl transition-colors ${pathname === "/en/admin/add-course" ? "text-blue-400" : "text-neutral-500"}`}>
          <span className="text-xl mb-1">➕</span>
          <span className="text-[10px] font-bold">Courses</span>
        </Link>
        <Link href="/en/admin/live-classes" className={`flex flex-col items-center p-2 rounded-xl transition-colors ${pathname === "/en/admin/live-classes" ? "text-blue-400" : "text-neutral-500"}`}>
          <span className="text-xl mb-1">🔴</span>
          <span className="text-[10px] font-bold">Live</span>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(true)} className="flex flex-col items-center p-2 rounded-xl transition-colors text-neutral-500">
          <span className="text-xl mb-1">⚙️</span>
          <span className="text-[10px] font-bold">Menu</span>
        </button>
      </div>

      {/* Mobile Menu Modal (Full Screen) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#050505] z-[100] flex flex-col animate-[fadeIn_0.2s_ease-out] lg:hidden">
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8">
                <img src="/logo-without-b.png" alt="Safi Academy" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-white uppercase text-sm">Menu</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white bg-white/5 rounded-full">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-24">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 px-4 py-4 rounded-xl font-bold transition-all ${
                    isActive 
                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" 
                      : "text-neutral-300 bg-white/5"
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
            
            <div className="mt-8 pt-4 border-t border-white/10">
               {userProfile && (
                <div className="flex items-center gap-3 mb-6 bg-white/5 p-4 rounded-2xl">
                  <img src={userProfile.avatar_url || "https://i.pravatar.cc/150"} alt="User" className="w-12 h-12 rounded-full border border-blue-500 object-cover" />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">{userProfile.first_name} {userProfile.last_name}</p>
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Admin</p>
                  </div>
                </div>
              )}
              <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-4 text-red-400 bg-red-500/10 rounded-xl font-bold transition-all w-full border border-red-500/20">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
