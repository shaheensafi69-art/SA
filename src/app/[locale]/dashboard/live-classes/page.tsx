"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Globe, Video, MessageSquare, ExternalLink, Calendar, User, Clock, LockKeyhole, ShieldCheck } from "lucide-react";

type ClassGroup = {
  id: string;
  class_name: string;
  schedule_info: string;
  is_active: boolean;
  start_date: string;
  meeting_link: string | null; 
  signal_group_link: string | null; 
  is_paid: boolean; // 👈 وضعیت تایید پرداخت از جدول class_students
  teacher: { first_name: string; last_name: string } | null;
};

export default function LiveClassesDashboard() {
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;
      
      const userId = session.user.id;

      // واکشی کلاس‌ها و وضعیت is_paid از جدول پیوند class_students
      const { data, error } = await supabase
        .from("class_groups")
        .select(`
          id, class_name, schedule_info, is_active, start_date, meeting_link, signal_group_link,
          teacher:profiles!teacher_id(first_name, last_name),
          class_students!inner(student_id, is_paid) 
        `)
        .eq("class_students.student_id", userId)
        .order("is_active", { ascending: false })
        .order("start_date", { ascending: false });

      if (error) throw error;

      if (data) {
        const formatted = data.map((cls: any) => {
          // استخراج فیلد is_paid از آرایه یا آبجکت class_students
          const studentRelation = Array.isArray(cls.class_students) 
            ? cls.class_students.find((cs: any) => cs.student_id === userId) 
            : cls.class_students;

          return {
            id: cls.id,
            class_name: cls.class_name,
            schedule_info: cls.schedule_info,
            is_active: cls.is_active,
            start_date: cls.start_date,
            meeting_link: cls.meeting_link,
            signal_group_link: cls.signal_group_link,
            is_paid: studentRelation?.is_paid ?? false, // 👈 مقدار تایید پرداخت
            teacher: Array.isArray(cls.teacher) ? cls.teacher[0] : cls.teacher
          };
        });
        setClasses(formatted as ClassGroup[]);
      }
    } catch (error) {
      console.error("Error loading enrolled classes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const liveSessions = classes.filter((c) => c.is_active);
  const generalClasses = classes.filter((c) => !c.is_active);

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 sm:p-10 relative overflow-hidden" dir="ltr">
      
      {/* Background Effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[35vw] h-[35vw] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[35vw] h-[35vw] bg-red-600/5 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-10 relative z-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* Header */}
        <header className="rounded-[2rem] border border-white/5 bg-neutral-950/40 p-8 backdrop-blur-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-indigo-400 mb-2">Safi Academy Headquarters</p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Live Campus & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Hubs</span></h1>
            <p className="text-neutral-400 text-sm mt-2 max-w-xl">Access your official Microsoft Teams corporate lecture rooms and sync with your secure Signal encrypted operations networks upon payment verification.</p>
          </div>
          <div className="flex bg-white/5 border border-white/10 p-4 rounded-2xl items-center gap-4">
             <div className="w-12 h-12 bg-indigo-500/20 text-indigo-400 flex items-center justify-center rounded-xl text-xl">🎓</div>
             <div>
                <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">Enrolled Channels</p>
                <p className="text-2xl font-black">{isLoading ? "-" : classes.length}</p>
             </div>
          </div>
        </header>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* ================= LIVE CLASSES SECTION ================= */}
            <div>
              <h2 className="text-xl font-extrabold flex items-center gap-2.5 mb-6">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                Live Transmissions ({liveSessions.length})
              </h2>

              {liveSessions.length === 0 ? (
                <div className="rounded-3xl border border-white/5 bg-white/[0.01] p-10 text-center text-neutral-500 text-sm backdrop-blur-sm">
                  There are no live broadcasts running for your enrolled courses at this exact moment.
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {liveSessions.map((room) => (
                    <div 
                      key={room.id} 
                      className={`relative rounded-3xl border p-6 flex flex-col h-full group transition-all duration-300 ${
                        room.is_paid 
                          ? "border-red-500/30 bg-gradient-to-br from-red-950/20 via-black to-black shadow-[0_15px_40px_rgba(239,68,68,0.1)]" 
                          : "border-white/10 bg-neutral-950/70 opacity-80"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        {room.is_paid ? (
                          <span className="bg-red-500 text-black text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md shadow-md animate-pulse">Live Now</span>
                        ) : (
                          <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md flex items-center gap-1.5">
                            <LockKeyhole size={12} /> Pending Payment Verification
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">{room.class_name}</h3>
                      <p className="text-xs text-neutral-400 mt-2 font-medium flex items-center gap-1.5">
                        <User size={14} className="text-neutral-600" /> Instructor: {room.teacher ? `${room.teacher.first_name} ${room.teacher.last_name}` : "Faculty Member"}
                      </p>
                      <p className="text-xs text-neutral-500 mt-2 flex items-center gap-1.5">
                        <Clock size={14} className="text-neutral-600" /> {room.schedule_info}
                      </p>
                      
                      <div className="mt-auto pt-6 flex flex-col gap-2.5">
                        {room.is_paid ? (
                          <>
                            {room.meeting_link ? (
                              <a 
                                href={room.meeting_link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-full bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-widest py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-500/20"
                              >
                                <Video size={14} /> Join Teams Lecture <ExternalLink size={12} className="opacity-50" />
                              </a>
                            ) : (
                              <button disabled className="w-full bg-neutral-900 border border-white/5 text-neutral-600 text-xs font-black uppercase tracking-widest py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
                                Teams Room Processing
                              </button>
                            )}

                            {room.signal_group_link ? (
                              <a 
                                href={room.signal_group_link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-black uppercase tracking-widest py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                              >
                                <MessageSquare size={14} className="text-indigo-400" /> Signal Operations <ExternalLink size={12} className="opacity-30" />
                              </a>
                            ) : (
                              <span className="w-full text-center text-[10px] text-neutral-600 font-bold uppercase tracking-widest py-2">
                                Signal Sync Pending
                              </span>
                            )}
                          </>
                        ) : (
                          <div className="bg-black/60 border border-white/5 rounded-2xl p-4 text-center space-y-2">
                            <p className="text-xs font-bold text-neutral-400">Class channel is locked until support confirms tuition payment.</p>
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-500/80 block">Contact WhatsApp Support</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ================= SCHEDULED / ARCHIVED CLASSES SECTION ================= */}
            <div>
              <h2 className="text-xl font-extrabold text-neutral-300 mb-6 flex items-center gap-2">
                <span>📚</span> Scheduled & Standby Channels ({generalClasses.length})
              </h2>

              {generalClasses.length === 0 ? (
                <div className="rounded-3xl border border-white/5 p-10 text-center text-neutral-600 text-sm">
                  You are not enrolled in any upcoming or standby classes at the moment.
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {generalClasses.map((room) => (
                    <div 
                      key={room.id} 
                      className={`rounded-3xl border p-6 transition-all duration-300 flex flex-col h-full group ${
                        room.is_paid 
                          ? "border-white/5 bg-white/5 hover:border-indigo-500/30" 
                          : "border-white/5 bg-neutral-950/70 opacity-80"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        {room.is_paid ? (
                          <span className="bg-white/5 border border-white/10 text-neutral-400 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">Standby</span>
                        ) : (
                          <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md flex items-center gap-1.5">
                            <LockKeyhole size={12} /> Locked
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{room.class_name}</h3>
                      <p className="text-xs text-neutral-400 mt-2 flex items-center gap-1.5">
                        <User size={14} className="text-neutral-600" /> Instructor: {room.teacher ? `${room.teacher.first_name} ${room.teacher.last_name}` : "Faculty Member"}
                      </p>
                      <p className="text-xs text-neutral-500 mt-2 flex items-center gap-1.5">
                        <Calendar size={14} className="text-neutral-600" /> {room.schedule_info}
                      </p>
                      
                      <div className="mt-auto pt-6 flex flex-col gap-2">
                        {room.is_paid ? (
                          <>
                            {room.signal_group_link ? (
                              <a 
                                href={room.signal_group_link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-full py-3.5 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 text-indigo-400 hover:text-white rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-all"
                              >
                                <MessageSquare size={14} /> Open Signal Hub
                              </a>
                            ) : (
                              <button disabled className="w-full py-3.5 bg-white/[0.02] border border-white/5 text-neutral-600 rounded-xl text-xs font-black uppercase tracking-widest cursor-not-allowed">
                                Channel Locked
                              </button>
                            )}
                          </>
                        ) : (
                          <div className="bg-black/60 border border-white/5 rounded-2xl p-4 text-center">
                            <p className="text-xs font-bold text-neutral-500">Awaiting payment validation from support team.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}