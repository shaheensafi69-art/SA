"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const router = useRouter();
  
  const [instructor, setInstructor] = useState({ first_name: "Instructor", avatar: "" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const supabase = createClient();
    
    const fetchUser = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (user && !userError) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("first_name, avatar_url")
          .eq("id", user.id)
          .single();
        if (profile) {
          setInstructor({
            first_name: profile.first_name || "Instructor",
            avatar: profile.avatar_url || ""
          });
        }
      } else {
        router.replace("/en/login");
      }
    };
    
    fetchUser();

    
  }, [router]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/en/login");
  };

  // دسته‌بندی منوها برای طراحی حرفه‌ای‌تر
  const menuGroups = [
    {
      title: "Main Hub",
      items: [
        { name: "Overview", path: "/en/teacher", icon: "📊" },
        { name: "My Courses", path: "/en/teacher/courses", icon: "📚" },
        { name: "Live Classes", path: "/en/teacher/live-classes", icon: "🔴" },
        { name: "My Students", path: "/en/teacher/students", icon: "👥" },
      ]
    },
    {
      title: "Academic & Review",
      items: [
        { name: "Assignments", path: "/en/teacher/assignments", icon: "📝" },
        { name: "Exams & Quizzes", path: "/en/teacher/quizzes", icon: "🎯" },
        { name: "Trading Journal", path: "/en/teacher/trading-journal", icon: "📈" },
      ]
    },
    {
      title: "System Tools",
      items: [
        { name: "AI Assistant", path: "/en/teacher/ai-assistant", icon: "🤖" },
        { name: "Support Tickets", path: "/en/teacher/support", icon: "🎧" },
        { name: "Settings", path: "/en/teacher/settings", icon: "⚙️" },
      ]
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#020202] text-white overflow-hidden font-sans">
      {/* Mobile Top Header (Just Logo) */}
      <div className="lg:hidden w-full flex items-center p-4 bg-[#080808] border-b border-white/5 relative z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src="/logo-without-b.png" alt="Safi Academy" className="w-full h-full object-contain drop-shadow-2xl" />
          </div>
          <span className="font-extrabold text-sm tracking-widest text-white uppercase">Safi Academy</span>
        </div>
      </div>
      
      {/* ================= Sidebar اساتید ================= */}
      <aside className={`fixed lg:relative inset-y-0 left-0 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out w-[260px] bg-[#080808] border-r border-white/5 flex flex-col shrink-0 z-50`}>
        
        {/* افکت نوری پس‌زمینه سایدبار */}
        <div className="absolute top-0 left-0 w-full h-40 bg-fuchsia-600/5 blur-[50px] pointer-events-none"></div>

        {/* لوگو */}
        <div className="h-24 flex items-center px-6 border-b border-white/5 relative z-10">
          <Link href="/en/teacher" className="flex items-center gap-3 group">
            <div className="w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform">
      <img src="/logo-without-b.png" alt="Safi Academy" className="w-full h-full object-contain drop-shadow-2xl" />
   </div>
            <div>
              <h1 className="font-extrabold text-sm tracking-widest text-white uppercase">Safi Academy</h1>
              <p className="text-[9px] text-fuchsia-400 font-black uppercase tracking-[0.2em] mt-0.5">Instructor Panel</p>
            </div>
          </Link>
        </div>

        {/* منوهای مجاز */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar relative z-10 space-y-6">
          {menuGroups.map((group, index) => (
            <div key={index}>
              <p className="px-3 text-[10px] font-bold text-neutral-600 uppercase tracking-[0.15em] mb-3">
                {group.title}
              </p>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  // تشخیص هوشمند مسیر: اگر در صفحه اصلی است فقط تطابق دقیق، اگر زیرمجموعه است تطابق نسبی
                  const isActive = item.path === "/en/teacher" 
                    ? pathname === "/en/teacher" 
                    : pathname.startsWith(item.path);

                  return (
                    <li key={item.path}>
                      <Link 
                        href={item.path}
                        className={`flex items-center gap-3.5 px-3 py-3 rounded-xl transition-all duration-300 font-bold text-sm relative overflow-hidden group ${
                          isActive 
                            ? "text-white shadow-lg" 
                            : "text-neutral-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {/* پس‌زمینه اکتیو (گرادیانت لاکچری) */}
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/90 to-purple-600/90 opacity-100"></div>
                        )}
                        
                        {/* خط نشانگر کنار آیتم اکتیو */}
                        {isActive && (
                          <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-white rounded-r-full shadow-[0_0_10px_white]"></div>
                        )}

                        <span className={`relative z-10 text-lg transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                          {item.icon}
                        </span>
                        <span className="relative z-10 tracking-wide">{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* پروفایل و خروج */}
        <div className="p-4 border-t border-white/5 bg-neutral-950/40 relative z-10">
          <div className="bg-white/5 border border-white/10 p-3 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-fuchsia-500/30 shadow-[0_0_10px_rgba(192,38,211,0.2)] bg-neutral-900 flex items-center justify-center">
                {instructor.avatar ? (
                  <img src={instructor.avatar} alt="Instructor" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-bold text-fuchsia-400">{instructor.first_name.charAt(0) || "I"}</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate">{instructor.first_name}</p>
                <button onClick={handleLogout} className="text-[10px] text-red-400 hover:text-red-300 uppercase tracking-widest transition-colors font-bold text-left flex items-center gap-1 mt-0.5">
                  Sign Out <span className="text-xs">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= محتوای اصلی (پاس داده شده از pages) ================= */}
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar relative bg-[#020202] pb-20 lg:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#080808] border-t border-white/10 z-50 px-2 py-2 flex justify-between items-center backdrop-blur-xl">
        <Link href="/en/teacher" className={`flex flex-col items-center p-2 rounded-xl transition-colors ${pathname === "/en/teacher" ? "text-fuchsia-400" : "text-neutral-500"}`}>
          <span className="text-xl mb-1">📊</span>
          <span className="text-[10px] font-bold">Overview</span>
        </Link>
        <Link href="/en/teacher/courses" className={`flex flex-col items-center p-2 rounded-xl transition-colors ${pathname === "/en/teacher/courses" ? "text-fuchsia-400" : "text-neutral-500"}`}>
          <span className="text-xl mb-1">📚</span>
          <span className="text-[10px] font-bold">Courses</span>
        </Link>
        <Link href="/en/teacher/live-classes" className={`flex flex-col items-center p-2 rounded-xl transition-colors ${pathname === "/en/teacher/live-classes" ? "text-fuchsia-400" : "text-neutral-500"}`}>
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
        <div className="fixed inset-0 bg-[#020202] z-[100] flex flex-col animate-[fadeIn_0.2s_ease-out] lg:hidden">
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8">
                <img src="/logo-without-b.png" alt="Safi Academy" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-white uppercase text-sm tracking-widest">Menu</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white bg-white/5 rounded-full">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
            {menuGroups.map((group, index) => (
              <div key={index}>
                <p className="px-2 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.15em] mb-2">
                  {group.title}
                </p>
                <ul className="space-y-2">
                  {group.items.map((item) => {
                    const isActive = item.path === "/en/teacher" 
                      ? pathname === "/en/teacher" 
                      : pathname.startsWith(item.path);
                    return (
                      <li key={item.path}>
                        <Link 
                          href={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-4 px-4 py-4 rounded-xl font-bold transition-all ${
                            isActive 
                              ? "bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20" 
                              : "text-neutral-300 bg-white/5"
                          }`}
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <span className="text-sm">{item.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            
            <div className="mt-8 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3 mb-6 bg-white/5 p-4 rounded-2xl">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-fuchsia-500/30 bg-neutral-900 flex items-center justify-center">
                  {instructor.avatar ? (
                    <img src={instructor.avatar} alt="Instructor" className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-bold text-fuchsia-400 text-lg">{instructor.first_name.charAt(0) || "I"}</span>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold text-white truncate">{instructor.first_name}</p>
                  <p className="text-[10px] text-fuchsia-400 font-bold uppercase tracking-widest">Instructor</p>
                </div>
              </div>
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