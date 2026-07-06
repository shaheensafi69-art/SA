"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/en/login";
  };

  const navItems = [
    { name: "Overview", path: "/en/teacher", icon: "📊" },
    { name: "My Live Classes", path: "/en/teacher/classes", icon: "🔴" },
    { name: "My Students", path: "/en/teacher/students", icon: "👥" },
    { name: "Assignments", path: "/en/teacher/assignments", icon: "📝" },
    { name: "Exams & Quizzes", path: "/en/teacher/quizzes", icon: "🎯" },
    { name: "Time Schedule", path: "/en/teacher/schedule", icon: "📅" },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
      
      {/* ================= Sidebar اساتید ================= */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col shrink-0">
        
        {/* لوگو */}
        <div className="h-24 flex items-center px-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <img src="/logo-without-b.png" alt="Safi Academy" className="w-8 h-8 object-contain" />
            <div>
              <h1 className="font-extrabold text-sm tracking-widest text-white">SAFI ACADEMY</h1>
              <p className="text-[9px] text-blue-400 font-bold uppercase tracking-[0.2em]">Instructor Panel</p>
            </div>
          </div>
        </div>

        {/* منوهای مجاز */}
        <nav className="flex-1 px-4 py-8 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-4">Teaching Tools</p>
          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.path}>
                  <Link 
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
                      isActive 
                        ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* پروفایل و خروج */}
        <div className="p-4 border-t border-white/5">
          <div className="bg-white/5 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600/20 text-blue-500 border border-blue-500/30 rounded-xl flex items-center justify-center font-bold">
                T
              </div>
              <div>
                <p className="text-sm font-bold text-white">Instructor</p>
                <button onClick={handleLogout} className="text-xs text-red-400 hover:text-red-300 transition-colors font-bold text-left">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ================= محتوای اصلی (پاس داده شده از pages) ================= */}
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar relative">
        {children}
      </main>

    </div>
  );
}