"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Loader2, ArrowLeft, Video, Radio, Clock, CalendarDays, ExternalLink, Edit3, Link as LinkIcon, ShieldAlert, CheckCircle2, AlertCircle, X, Users, MessageCircle, Search } from "lucide-react";

type LiveClassItem = {
  id: string;
  class_name: string;
  is_active: boolean;
  class_time: string | null;
  class_days: string | null;
  meeting_link: string | null;
  signal_group_link: string | null;
  course: { title: string } | null;
  teacher: { first_name: string; last_name: string; avatar_url: string | null } | null;
};

export default function AdminLiveClassesPage() {
  const [classes, setClasses] = useState<LiveClassItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // استیت‌های مودال ویرایش لینک
  const [selectedClass, setSelectedClass] = useState<LiveClassItem | null>(null);
  const [meetingLink, setMeetingLink] = useState("");
  const [signalLink, setSignalLink] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchLiveClasses();
  }, []);

  const fetchLiveClasses = async () => {
    setIsLoading(true);
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from("class_groups")
        .select(`
          id, class_name, is_active, class_time, class_days, meeting_link, signal_group_link,
          course:courses(title),
          teacher:profiles!teacher_id(first_name, last_name, avatar_url)
        `)
        .order("is_active", { ascending: false }) // کلاس‌های فعال اول بیایند
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      if (data) {
        const formatted = data.map((cls: any) => ({
          ...cls,
          course: Array.isArray(cls.course) ? cls.course[0] : cls.course,
          teacher: Array.isArray(cls.teacher) ? cls.teacher[0] : cls.teacher,
        }));
        setClasses(formatted);
      }
    } catch (error) {
      console.error("Error fetching live classes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredClasses = useMemo(() => {
    if (!searchQuery) return classes;
    const query = searchQuery.toLowerCase();
    return classes.filter(c => 
      c.class_name?.toLowerCase().includes(query) || 
      c.course?.title?.toLowerCase().includes(query) ||
      c.teacher?.first_name?.toLowerCase().includes(query)
    );
  }, [classes, searchQuery]);

  const openLinkModal = (cls: LiveClassItem) => {
    setSelectedClass(cls);
    setMeetingLink(cls.meeting_link || "");
    setSignalLink(cls.signal_group_link || "");
    setMessage(null);
  };

  const handleUpdateLinks = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass) return;

    setIsSaving(true);
    setMessage(null);
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from("class_groups")
        .update({ 
          meeting_link: meetingLink.trim() || null,
          signal_group_link: signalLink.trim() || null
        })
        .eq("id", selectedClass.id);

      if (error) throw error;

      // آپدیت UI
      setClasses(prev => prev.map(c => 
        c.id === selectedClass.id ? { ...c, meeting_link: meetingLink, signal_group_link: signalLink } : c
      ));

      setMessage({ type: 'success', text: 'Room links updated successfully!' });
      setTimeout(() => {
        setSelectedClass(null);
        setMessage(null);
      }, 2000);

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update links.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-rose-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Establishing Live Connection...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10" dir="ltr">
      
      {/* Background Ambience */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto space-y-6 sm:space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between md:items-start gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <Link href="/en/admin" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-rose-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <ArrowLeft size={14} /> Command Center
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2 flex items-center gap-3">
              Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500">Sessions</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-xl">
              Monitor active class rooms, manage meeting URLs (Zoom/Meet), and ensure students have correct access to live environments.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative z-10 shrink-0 w-full sm:w-80">
            <div className="bg-black/60 p-2 rounded-2xl border border-white/5 flex items-center gap-3 shadow-inner">
              <div className="pl-4 text-neutral-500"><Search size={16} /></div>
              <input 
                type="text" placeholder="Search cohorts..."
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-white text-sm focus:outline-none py-2 pr-4 font-medium placeholder:text-neutral-600"
              />
            </div>
          </div>
        </header>

        {/* ================= LIVE CLASSES GRID ================= */}
        {filteredClasses.length === 0 ? (
           <div className="text-center py-20 bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
             <ShieldAlert size={48} className="mx-auto text-neutral-600 mb-4" />
             <h3 className="text-xl font-black text-white mb-2">No Sessions Found</h3>
             <p className="text-neutral-500 text-sm">There are no classes matching your criteria.</p>
           </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredClasses.map((cls, index) => (
              <div 
                key={cls.id} 
                className="group flex flex-col bg-[#0a0a0f]/80 border border-white/5 rounded-[2rem] p-6 backdrop-blur-3xl shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(225,29,72,0.15)] hover:border-rose-500/30 relative overflow-hidden"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Glow effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-rose-500/10 transition-colors"></div>

                {/* Status & Title */}
                <div className="relative z-10 mb-5">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border flex items-center gap-1.5 shadow-sm ${
                      cls.is_active 
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20" 
                        : "bg-neutral-900 text-neutral-500 border-neutral-800"
                    }`}>
                      {cls.is_active ? <Radio size={10} className="animate-pulse"/> : <Clock size={10}/>}
                      {cls.is_active ? "Live Cohort" : "Archived"}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white line-clamp-1 group-hover:text-rose-300 transition-colors">
                    {cls.class_name}
                  </h3>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mt-1 truncate">
                    {cls.course?.title}
                  </p>
                </div>

                {/* Schedule Info */}
                <div className="bg-black/40 border border-white/5 rounded-xl p-3 mb-5 space-y-2 relative z-10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-500 flex items-center gap-1.5"><CalendarDays size={14}/> Days</span>
                    <span className="font-bold text-neutral-300 truncate pl-2">{cls.class_days || "Not set"}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-500 flex items-center gap-1.5"><Clock size={14}/> Time</span>
                    <span className="font-bold text-neutral-300 font-mono">{cls.class_time || "Not set"}</span>
                  </div>
                </div>

                {/* Links Status */}
                <div className="space-y-2 mb-6 relative z-10 flex-1">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-neutral-500 flex items-center gap-1"><Video size={12}/> Meeting URL</span>
                    {cls.meeting_link ? <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 size={10}/> Active</span> : <span className="text-rose-400">Missing</span>}
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-neutral-500 flex items-center gap-1"><MessageCircle size={12}/> Comms Group</span>
                    {cls.signal_group_link ? <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 size={10}/> Active</span> : <span className="text-rose-400">Missing</span>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 relative z-10 mt-auto pt-4 border-t border-white/5">
                  {cls.meeting_link ? (
                    <a 
                      href={cls.meeting_link} target="_blank" rel="noopener noreferrer"
                      className="flex-1 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 px-3 py-3 text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Video size={14}/> Join
                    </a>
                  ) : (
                    <button disabled className="flex-1 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-600 px-3 py-3 text-[10px] font-black uppercase tracking-widest cursor-not-allowed flex items-center justify-center gap-2">
                      No Link
                    </button>
                  )}
                  
                  <button 
                    onClick={() => openLinkModal(cls)}
                    className="flex-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white px-3 py-3 text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
                  >
                    <Edit3 size={14}/> Manage
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* ================= MODAL: EDIT LINKS ================= */}
      {selectedClass && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-[slideInUp_0.2s_ease-out] sm:animate-[fadeIn_0.2s_ease-out]">
          <div className="absolute inset-0 bg-[#020202]/95 backdrop-blur-md" onClick={() => !isSaving && setSelectedClass(null)}></div>
          
          <div className="relative w-full max-w-md bg-[#0a0a0f] border-t sm:border border-white/10 rounded-t-[2rem] sm:rounded-[2.5rem] shadow-[0_-20px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
            
            <div className="p-6 border-b border-white/5 bg-neutral-900/40 shrink-0 flex justify-between items-center">
              <div>
                <h2 className="text-base font-black text-white">Manage Access Links</h2>
                <p className="text-[10px] text-rose-400 font-black uppercase tracking-widest mt-0.5 truncate max-w-[200px]">{selectedClass.class_name}</p>
              </div>
              <button disabled={isSaving} onClick={() => setSelectedClass(null)} className="w-10 h-10 bg-white/5 hover:bg-white/10 text-neutral-400 rounded-full flex items-center justify-center transition-all shrink-0">
                <X size={16} />
              </button>
            </div>
            
            <div className="p-6 sm:p-8 bg-[#050508] space-y-6">
              
              {message && (
                <div className={`p-4 rounded-xl flex items-center gap-3 text-xs font-bold border ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                  {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <p>{message.text}</p>
                </div>
              )}

              <form onSubmit={handleUpdateLinks} className="space-y-6">
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1 flex items-center gap-1.5"><Video size={12}/> Live Meeting URL</label>
                  <div className="relative">
                    <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input 
                      type="url" placeholder="https://zoom.us/j/..."
                      value={meetingLink} onChange={(e) => setMeetingLink(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-rose-500/50 transition-colors shadow-inner"
                    />
                  </div>
                  <p className="text-[9px] text-neutral-600 ml-1">Paste Zoom, Google Meet, or Microsoft Teams link.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1 flex items-center gap-1.5"><MessageCircle size={12}/> Communication Group URL</label>
                  <div className="relative">
                    <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input 
                      type="url" placeholder="https://t.me/joinchat/..."
                      value={signalLink} onChange={(e) => setSignalLink(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors shadow-inner"
                    />
                  </div>
                  <p className="text-[9px] text-neutral-600 ml-1">Paste Telegram, WhatsApp, or Signal group link.</p>
                </div>

                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="w-full py-5 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(225,29,72,0.3)] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                >
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18}/>}
                  {isSaving ? "Updating Network..." : "Save & Update Links"}
                </button>
              </form>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}