"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Loader2, ArrowLeft, Megaphone, Send, Trash2, Users, Target, MessageSquare, AlertCircle, CheckCircle2, Radio, BellRing, UserCheck, GraduationCap } from "lucide-react";

type AnnouncementItem = {
  id: string;
  title: string;
  message: string;
  target_role: "all" | "student" | "teacher";
  created_at: string;
  created_by: string | null;
};

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [form, setForm] = useState({
    title: "",
    messageText: "",
    target_role: "all" as "all" | "student" | "teacher",
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setIsLoading(true);
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.messageText) {
      setToastMessage({ type: 'error', text: 'Title and message content are required.' });
      return;
    }

    setIsSubmitting(true);
    setToastMessage(null);
    const supabase = createClient();

    try {
      // دریافت آیدی ادمینی که در حال ارسال پیام است
      const { data: { session } } = await supabase.auth.getSession();
      const adminId = session?.user?.id;

      const { data, error } = await supabase
        .from("announcements")
        .insert({
          title: form.title.trim(),
          message: form.messageText.trim(),
          target_role: form.target_role,
          created_by: adminId,
        })
        .select()
        .single();

      if (error) throw error;

      // اضافه کردن اعلان جدید به ابتدای لیست
      setAnnouncements(prev => [data, ...prev]);
      setToastMessage({ type: 'success', text: 'Announcement successfully broadcasted!' });
      
      // ریست کردن فرم
      setForm({ title: "", messageText: "", target_role: "all" });
      setTimeout(() => setToastMessage(null), 3000);

    } catch (error: any) {
      setToastMessage({ type: 'error', text: error.message || 'Failed to dispatch announcement.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to recall this broadcast? It will be removed from all target dashboards.")) return;

    setDeletingId(id);
    const supabase = createClient();

    try {
      const { error } = await supabase.from("announcements").delete().eq("id", id);
      if (error) throw error;

      setAnnouncements(prev => prev.filter(a => a.id !== id));
    } catch (error: any) {
      alert("Failed to delete: " + error.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-rose-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Initializing Broadcast Tower...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10" dir="ltr">
      
      {/* Background Ambience (Rose/Orange) */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto space-y-6 sm:space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between md:items-start gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <Link href="/en/admin" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-rose-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <ArrowLeft size={14} /> Command Center
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2 flex items-center gap-3">
              Broadcast <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-500">Tower</span> <Radio size={32} className="text-rose-500 animate-pulse hidden sm:block"/>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-xl">
              Dispatch critical updates, academy news, and system alerts to specific user roles or across the entire Safi Ecosystem instantly.
            </p>
          </div>

          <div className="flex gap-3 shrink-0 relative z-10">
            <div className="bg-black/40 border border-white/5 px-6 py-4 rounded-2xl flex flex-col items-center justify-center shadow-inner">
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1 flex items-center gap-1.5"><BellRing size={12}/> Total Dispatches</p>
              <p className="text-3xl font-black text-rose-400">{announcements.length}</p>
            </div>
          </div>
        </header>

        {/* ================= MAIN LAYOUT (Form + List) ================= */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] xl:grid-cols-[0.7fr_1.3fr]">
          
          {/* LEFT: BROADCAST FORM */}
          <aside className="space-y-6">
            <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-3xl shadow-2xl sticky top-28 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[40px] pointer-events-none"></div>

              <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-white/5 pb-4 relative z-10">
                <Megaphone size={18} className="text-rose-400"/> Compose Signal
              </h3>

              {toastMessage && (
                <div className={`p-4 rounded-2xl mb-6 flex items-center gap-3 text-xs font-bold border relative z-10 ${toastMessage.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                  {toastMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <p>{toastMessage.text}</p>
                </div>
              )}

              <form onSubmit={handleBroadcast} className="space-y-6 relative z-10">
                
                {/* Target Audience Toggle */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1 flex items-center gap-1.5"><Target size={12}/> Target Audience</label>
                  <div className="grid grid-cols-3 gap-2 bg-black/60 border border-white/10 rounded-2xl p-2 shadow-inner">
                    <button
                      type="button"
                      onClick={() => setForm({...form, target_role: "all"})}
                      className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        form.target_role === "all" ? "bg-rose-500/20 text-rose-400 border border-rose-500/30 shadow-md" : "text-neutral-500 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Users size={16}/> All Users
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({...form, target_role: "student"})}
                      className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        form.target_role === "student" ? "bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-md" : "text-neutral-500 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <GraduationCap size={16}/> Students
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({...form, target_role: "teacher"})}
                      className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        form.target_role === "teacher" ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-md" : "text-neutral-500 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <UserCheck size={16}/> Faculty
                    </button>
                  </div>
                </div>

                {/* Announcement Title */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Transmission Title *</label>
                  <input 
                    required type="text" placeholder="e.g. System Maintenance Update"
                    value={form.title} onChange={(e) => setForm({...form, title: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm font-bold focus:outline-none focus:border-rose-500/50 shadow-inner" 
                  />
                </div>

                {/* Message Body */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Message Content *</label>
                  <textarea 
                    required rows={5} placeholder="Write your broadcast message here..."
                    value={form.messageText} onChange={(e) => setForm({...form, messageText: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-rose-500/50 shadow-inner resize-y custom-scrollbar" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(225,29,72,0.3)] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16}/>}
                  {isSubmitting ? "Dispatching..." : "Transmit Broadcast"}
                </button>
              </form>
            </div>
          </aside>

          {/* RIGHT: BROADCAST HISTORY */}
          <section className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-3xl shadow-2xl flex flex-col h-full">
            <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
              <MessageSquare size={18} className="text-orange-400"/> Transmission Log
            </h3>

            <div className="flex-1 max-h-[700px] overflow-y-auto custom-scrollbar pr-2 space-y-4">
              {announcements.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/5 rounded-3xl bg-black/20 text-neutral-500 flex flex-col items-center">
                  <Radio size={48} className="mb-4 opacity-30"/>
                  <p className="text-sm font-bold">The frequency is clear.</p>
                  <p className="text-[10px] mt-1 uppercase tracking-widest">No signals have been dispatched yet.</p>
                </div>
              ) : (
                announcements.map((announcement) => {
                  
                  // تعیین استایل Badge بر اساس تارگت
                  const targetStyles = 
                    announcement.target_role === "all" ? "bg-rose-500/10 text-rose-400 border-rose-500/20" :
                    announcement.target_role === "student" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                    "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
                    
                  const TargetIcon = 
                    announcement.target_role === "all" ? Users :
                    announcement.target_role === "student" ? GraduationCap : UserCheck;

                  return (
                    <div key={announcement.id} className="group w-full text-left rounded-2xl border border-white/5 bg-black/40 p-5 sm:p-6 hover:bg-white/[0.02] hover:border-white/10 transition-all flex flex-col gap-4">
                      
                      {/* Top Row: Info & Actions */}
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border flex items-center gap-1.5 ${targetStyles}`}>
                            <TargetIcon size={12}/> {announcement.target_role === "all" ? "Global" : announcement.target_role}
                          </span>
                          <span className="text-[10px] text-neutral-500 font-mono flex items-center gap-1.5 before:w-1 before:h-1 before:bg-white/20 before:rounded-full">
                            {new Date(announcement.created_at).toLocaleString()}
                          </span>
                        </div>
                        
                        <button 
                          onClick={() => handleDelete(announcement.id)}
                          disabled={deletingId === announcement.id}
                          className="w-8 h-8 rounded-lg bg-red-500/5 hover:bg-red-500/20 border border-transparent hover:border-red-500/20 text-neutral-500 hover:text-red-400 flex items-center justify-center transition-all disabled:opacity-50"
                          title="Recall Broadcast"
                        >
                          {deletingId === announcement.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14}/>}
                        </button>
                      </div>

                      {/* Content */}
                      <div>
                        <h4 className="font-black text-white text-lg mb-2 group-hover:text-rose-300 transition-colors">{announcement.title}</h4>
                        <p className="text-sm text-neutral-400 leading-relaxed whitespace-pre-wrap">{announcement.message}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}