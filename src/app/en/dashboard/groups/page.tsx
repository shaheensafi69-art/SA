"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

type GroupCard = {
  id: string;
  class_name: string;
  teacher: { first_name: string; last_name: string; avatar_url: string | null } | null;
  latest_message: { message_text: string; created_at: string } | null;
};

export default function MyGroupsPage() {
  const [groups, setGroups] = useState<GroupCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMyGroups();
  }, []);

  const fetchMyGroups = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) return;
    const userId = session.user.id;

    try {
      // ۱. تشخیص نقش کاربر
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", userId).single();
      let groupIds: string[] = [];

      // ۲. اگر شاگرد است، فقط کلاس‌هایی که ثبت‌نام کرده را پیدا کن
      if (profile?.role === "student") {
        const { data: enrollments } = await supabase.from("class_students").select("class_group_id").eq("student_id", userId);
        groupIds = enrollments?.map(e => e.class_group_id) || [];
      }

      // ۳. ساخت کوئری برای دریافت اطلاعات کلاس‌ها
      let query = supabase.from("class_groups").select(`
        id, class_name, 
        teacher:profiles!teacher_id(first_name, last_name, avatar_url)
      `);

      if (profile?.role === "student") {
        if (groupIds.length === 0) {
          setGroups([]);
          setIsLoading(false);
          return;
        }
        query = query.in("id", groupIds);
      } else if (profile?.role === "teacher") {
        // استاد فقط کلاس‌های خودش را می‌بیند
        query = query.eq("teacher_id", userId);
      }
      // super_admin همه گروه‌ها را می‌بیند (بدون فیلتر)

      const { data: classGroups, error } = await query;
      if (error) throw error;

      // ۴. دریافت آخرین پیام هر گروه برای نمایش در لیست (مثل واتساپ)
      if (classGroups) {
        const groupsWithMessages = await Promise.all(classGroups.map(async (group: any) => {
          const { data: lastMsg } = await supabase
            .from("class_messages")
            .select("message_text, created_at")
            .eq("class_group_id", group.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();

          return {
            ...group,
            teacher: Array.isArray(group.teacher) ? group.teacher[0] : group.teacher,
            latest_message: lastMsg || null
          };
        }));

        // مرتب‌سازی گروه‌ها بر اساس تاریخ آخرین پیام (گروه فعال‌تر در بالا)
        groupsWithMessages.sort((a, b) => {
          const timeA = a.latest_message ? new Date(a.latest_message.created_at).getTime() : 0;
          const timeB = b.latest_message ? new Date(b.latest_message.created_at).getTime() : 0;
          return timeB - timeA;
        });

        setGroups(groupsWithMessages);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredGroups = groups.filter(g => g.class_name.toLowerCase().includes(searchQuery.toLowerCase()));

  // تابع کمکی برای فرمت زمان آخرین پیام (مثل: 10:30 AM یا Yesterday)
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-8 lg:p-10 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto space-y-8 relative z-10 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= Header ================= */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-neutral-950/60 border border-white/5 p-6 rounded-[2rem] backdrop-blur-3xl shadow-xl">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <span>💬</span> Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Groups</span>
            </h1>
            <p className="text-neutral-400 text-sm mt-1">Connect, discuss, and collaborate with your classmates.</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search groups..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all shadow-inner"
            />
            <svg className="w-4 h-4 text-neutral-500 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </header>

        {/* ================= Group List (Telegram/WhatsApp Style) ================= */}
        <div className="bg-neutral-950/40 border border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-xl shadow-2xl">
          {isLoading ? (
            <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>
          ) : filteredGroups.length === 0 ? (
            <div className="text-center py-20">
               <span className="text-5xl opacity-50 block mb-4">📭</span>
               <h3 className="text-lg font-bold text-white mb-2">No groups found</h3>
               <p className="text-neutral-500 text-sm">You are not enrolled in any classes yet, or no groups match your search.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {filteredGroups.map((group) => {
                const isSystemMessage = group.latest_message?.message_text.startsWith("🔴") || group.latest_message?.message_text.startsWith("⏹");
                
                return (
                  <Link 
                    href={`/en/dashboard/live-classes/${group.id}`} 
                    key={group.id}
                    className="flex items-center gap-4 p-4 sm:p-5 hover:bg-white/[0.02] transition-colors group/item"
                  >
                    {/* آواتار گروه */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-indigo-900 to-black border border-indigo-500/30 flex items-center justify-center text-xl shadow-inner flex-shrink-0 group-hover/item:scale-105 transition-transform duration-300">
                       🎓
                    </div>

                    {/* اطلاعات پیام و گروه */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-base sm:text-lg font-bold text-white truncate pr-2 group-hover/item:text-indigo-400 transition-colors">
                          {group.class_name}
                        </h3>
                        {group.latest_message && (
                          <span className="text-[10px] sm:text-xs text-neutral-500 flex-shrink-0">
                            {formatTime(group.latest_message.created_at)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400/80 bg-indigo-500/10 px-2 py-0.5 rounded flex-shrink-0 hidden sm:inline-block">
                          {group.teacher ? `${group.teacher.first_name}` : "Staff"}
                        </span>
                        
                        <p className={`text-sm truncate ${isSystemMessage ? "text-red-400 font-medium" : "text-neutral-400"}`}>
                          {group.latest_message 
                            ? (isSystemMessage 
                                ? group.latest_message.message_text.replace("🔴 LIVE_STARTED:", "Live Session Started").replace("⏹ LIVE_ENDED:", "Live Session Ended") 
                                : group.latest_message.message_text)
                            : <span className="italic opacity-50">No messages yet...</span>}
                        </p>
                      </div>
                    </div>

                    {/* فلش ورود */}
                    <div className="hidden sm:flex w-10 h-10 rounded-full bg-white/5 items-center justify-center text-neutral-500 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-all transform group-hover/item:translate-x-1">
                      →
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}