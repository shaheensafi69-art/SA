"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const router = useRouter();
  
  const [instructor, setInstructor] = useState({ first_name: "Instructor", avatar: "" });

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;
      
      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, avatar_url")
        .eq("id", session.user.id)
        .single();
        
      if (profile) {
        setInstructor({
          first_name: profile.first_name || "Instructor",
          avatar: profile.avatar_url || ""
        });
      }
    };
    fetchUser();
  }, []);

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
        { name: "Trading Journals", path: "/en/teacher/trading-journals", icon: "📈" },
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
    <div className="flex h-screen bg-[#020202] text-white overflow-hidden font-sans">
      
      {/* ================= Sidebar اساتید ================= */}
      <aside className="w-[260px] bg-[#080808] border-r border-white/5 flex flex-col shrink-0 relative z-50">
        
        {/* افکت نوری پس‌زمینه سایدبار */}
        <div className="absolute top-0 left-0 w-full h-40 bg-fuchsia-600/5 blur-[50px] pointer-events-none"></div>

        {/* لوگو */}
        <div className="h-24 flex items-center px-6 border-b border-white/5 relative z-10">
          <Link href="/en/teacher" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(192,38,211,0.3)] group-hover:scale-105 transition-transform">
              <img src="/logo-without-b.png" alt="Safi Academy" className="w-6 h-6 object-contain" />
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
      <main className="flex-1 h-screen overflow-y-auto custom-scrollbar relative bg-[#020202]">
        {children}
      </main>

    </div>
  );
}