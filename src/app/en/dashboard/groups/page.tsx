"use client";

import { useEffect, useState, useRef } from "react";
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
  const supabase = createClient();

  useEffect(() => {
    fetchMyGroups();
    
    // 🔥 اتصال ریل‌تایم: گوش دادن به پیام‌های جدید در تمام گروه‌ها
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'class_messages' },
        (payload) => {
          // آپدیت هوشمند آخرین پیام در لیست بدون رفرش
          updateLatestMessageRealtime(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateLatestMessageRealtime = (newMessage: any) => {
    setGroups((prevGroups) => {
      const updatedGroups = prevGroups.map((g) => {
        if (g.id === newMessage.class_group_id) {
          return {
            ...g,
            latest_message: {
              message_text: newMessage.message_text,
              created_at: newMessage.created_at,
            },
          };
        }
        return g;
      });
      // مرتب‌سازی مجدد: گروهی که پیام جدید دارد بیاید بالا
      return [...updatedGroups].sort((a, b) => {
        const timeA = a.latest_message ? new Date(a.latest_message.created_at).getTime() : 0;
        const timeB = b.latest_message ? new Date(b.latest_message.created_at).getTime() : 0;
        return timeB - timeA;
      });
    });
  };

  const fetchMyGroups = async () => {
    setIsLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const userId = session.user.id;

    try {
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", userId).single();
      let groupIds: string[] = [];

      if (profile?.role === "student") {
        const { data: enrollments } = await supabase.from("class_students").select("class_group_id").eq("student_id", userId);
        groupIds = enrollments?.map(e => e.class_group_id) || [];
      }

      let query = supabase.from("class_groups").select(`
        id, class_name, 
        teacher:profiles!teacher_id(first_name, last_name, avatar_url)
      `);

      if (profile?.role === "student") {
        if (groupIds.length === 0) { setGroups([]); setIsLoading(false); return; }
        query = query.in("id", groupIds);
      } else if (profile?.role === "teacher") {
        query = query.eq("teacher_id", userId);
      }

      const { data: classGroups } = await query;

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

        setGroups(groupsWithMessages.sort((a, b) => {
          const timeA = a.latest_message ? new Date(a.latest_message.created_at).getTime() : 0;
          const timeB = b.latest_message ? new Date(b.latest_message.created_at).getTime() : 0;
          return timeB - timeA;
        }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const filteredGroups = groups.filter(g => g.class_name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-8 lg:p-12 relative overflow-hidden font-sans">
      
      {/* 🔥 چراغ‌های بک‌لایت پشت زمینه */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto space-y-10 relative z-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* ================= Header ================= */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
              Safi <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-400">Community</span>
            </h1>
            <p className="text-neutral-500 text-sm md:text-base font-medium mt-3 max-w-lg">
              Experience real-time collaboration. Your learning network is now live and synchronized.
            </p>
          </div>
          
          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..." 
              className="relative w-full bg-neutral-900/80 border border-white/10 rounded-[1.2rem] pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all backdrop-blur-md"
            />
            <svg className="w-5 h-5 text-neutral-500 absolute left-4 top-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </header>

        {/* ================= Groups Content ================= */}
        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-neutral-500 font-black uppercase tracking-widest text-xs">Synchronizing Groups...</p>
            </div>
          ) : filteredGroups.length === 0 ? (
            <div className="bg-neutral-900/20 border border-white/5 border-dashed rounded-[3rem] py-32 text-center">
               <span className="text-7xl block mb-6 opacity-20">💬</span>
               <h3 className="text-2xl font-black text-white">No Active Channels</h3>
               <p className="text-neutral-500 max-w-xs mx-auto mt-2">Join a course to unlock your community access and start chatting.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {filteredGroups.map((group) => {
                const isLive = group.latest_message?.message_text.includes("LIVE_STARTED");

                return (
                  <Link 
                    href={`/en/dashboard/groups/${group.id}`} 
                    key={group.id}
                    className="relative group block"
                  >
                    {/* 🔥 امبینت لایت پشت کارت در هنگام هاور */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]"></div>

                    <div className="relative bg-neutral-900/40 border border-white/5 p-5 sm:p-7 rounded-[2.5rem] backdrop-blur-3xl transition-all duration-300 group-hover:border-white/20 group-hover:-translate-y-1 flex items-center gap-6 shadow-2xl">
                      
                      {/* Avatar with Status */}
                      <div className="relative shrink-0">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.8rem] bg-gradient-to-br from-indigo-950 to-black border border-indigo-500/20 flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition-transform duration-500">
                          {group.class_name.charAt(0)}
                        </div>
                        {isLive && (
                          <span className="absolute -top-1 -right-1 flex h-5 w-5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 border-4 border-[#020202]"></span>
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg sm:text-2xl font-black text-white truncate group-hover:text-indigo-400 transition-colors">
                            {group.class_name}
                          </h3>
                          {group.latest_message && (
                            <span className="text-[10px] font-black text-neutral-500 uppercase tracking-tighter bg-white/5 px-2 py-1 rounded-lg">
                              {formatTime(group.latest_message.created_at)}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full shrink-0">
                            <div className="w-4 h-4 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px]">👤</div>
                            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                              {group.teacher?.first_name || "Staff"}
                            </span>
                          </div>
                          
                          <p className="text-sm text-neutral-500 truncate italic">
                            {group.latest_message ? (
                              isLive ? <span className="text-red-400 font-bold not-italic">🔴 Live Session In Progress...</span> : group.latest_message.message_text
                            ) : "Start the first conversation..."}
                          </p>
                        </div>
                      </div>

                      {/* Action Arrow */}
                      <div className="hidden lg:flex w-14 h-14 rounded-2xl bg-white/5 border border-white/5 items-center justify-center text-neutral-500 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-all group-hover:rotate-[360deg] duration-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </div>
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