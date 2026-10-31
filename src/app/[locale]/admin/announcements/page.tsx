"use client";
import { usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { 
  Loader2, ArrowLeft, Megaphone, Send, Trash2, Users, Target, 
  MessageSquare, AlertCircle, CheckCircle2, Radio, BellRing, 
  UserCheck, GraduationCap, Sparkles, Search, Layers, Clock,
  Eye, RefreshCw, Zap, ShieldCheck
} from "lucide-react";

type AnnouncementItem = {
  id: string;
  title: string;
  message: string;
  target_role: "all" | "student" | "teacher";
  created_at: string;
  created_by: string | null;
};

export default function AdminAnnouncementsPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [audienceFilter, setAudienceFilter] = useState<"ALL" | "all" | "student" | "teacher">("ALL");

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
    if (!form.title.trim() || !form.messageText.trim()) {
      setToastMessage({ type: 'error', text: 'Broadcast transmission requires both title and message content.' });
      return;
    }

    setIsSubmitting(true);
    setToastMessage(null);
    const supabase = createClient();

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const adminId = session?.user?.id;

      // 1. Insert into announcements table
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

      // 2. Dynamic Routing URL for push notification
      let targetUrl = "https://safiacademy.org"; 
      if (form.target_role === "student" || form.target_role === "all") {
        targetUrl = `https://safiacademy.org/${currentLocale}/student/announcements`;
      } else if (form.target_role === "teacher") {
        targetUrl = `https://safiacademy.org/${currentLocale}/teacher/announcements`;
      }

      // 3. PushAlert trigger
      try {
        const payload = new URLSearchParams({
          title: form.title.trim(),
          message: form.messageText.trim(),
          url: targetUrl
        });

        await fetch('https://api.pushalert.co/rest/v1/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `api_key=9ee7b804a99eae5f6381e9b6f024746a`
          },
          body: payload.toString(),
        });
      } catch (pushErr) {
        console.warn("PushAlert dispatch omitted or network failed:", pushErr);
      }

      setAnnouncements(prev => [data, ...prev]);
      setToastMessage({ type: 'success', text: 'Broadcast signal successfully beamed across Safi Academy!' });
      
      setForm({ title: "", messageText: "", target_role: "all" });
      setTimeout(() => setToastMessage(null), 3500);

    } catch (error: any) {
      setToastMessage({ type: 'error', text: error.message || 'Transmission failed.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to recall this broadcast? It will be removed from all student & faculty feeds.")) return;

    setDeletingId(id);
    const supabase = createClient();

    try {
      const { error } = await supabase.from("announcements").delete().eq("id", id);
      if (error) throw error;

      setAnnouncements(prev => prev.filter(a => a.id !== id));
      setToastMessage({ type: 'success', text: 'Broadcast recalled and wiped from feed.' });
      setTimeout(() => setToastMessage(null), 3000);
    } catch (error: any) {
      setToastMessage({ type: 'error', text: "Failed to recall: " + error.message });
    } finally {
      setDeletingId(null);
    }
  };

  const applyTemplate = (title: string, message: string, role: "all" | "student" | "teacher") => {
    setForm({ title, messageText: message, target_role: role });
  };

  // Filtered log
  const filteredAnnouncements = useMemo(() => {
    return announcements.filter(a => {
      if (audienceFilter !== "ALL" && a.target_role !== audienceFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = a.title?.toLowerCase().includes(q);
        const matchesMsg = a.message?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesMsg) return false;
      }

      return true;
    });
  }, [announcements, audienceFilter, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = announcements.length;
    const globalCount = announcements.filter(a => a.target_role === "all").length;
    const studentCount = announcements.filter(a => a.target_role === "student").length;
    const teacherCount = announcements.filter(a => a.target_role === "teacher").length;
    return { total, globalCount, studentCount, teacherCount };
  }, [announcements]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020205] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-rose-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">
          {t.adminPages.initializingBroadcastTower}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10" dir={isRtl ? "rtl" : "ltr"}>
      
      {/* Background Ambience */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto space-y-6 sm:space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <Link href={`/${currentLocale}/admin`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-rose-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <ArrowLeft size={14} /> Command Center
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2 flex items-center gap-3">
              {t.adminPages.broadcastTower}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-xl">
              Dispatch high-priority transmissions, urgent alerts, and institutional directives to selected cohorts or global network users in real time.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <button
              onClick={fetchAnnouncements}
              className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white transition-colors"
              title="Refresh Transmission Stream"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </header>

        {/* Feedback alert */}
        {toastMessage && (
          <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-3 animate-[fadeInDown_0.3s_ease-out] backdrop-blur-md ${
            toastMessage.type === 'success' 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
          }`}>
            {toastMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <p>{toastMessage.text}</p>
          </div>
        )}

        {/* ================= METRICS ROW ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0a0a0f]/80 p-5 rounded-[2rem] border border-white/5 backdrop-blur-xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/20">
              <BellRing size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Total Transmissions</p>
              <p className="text-2xl font-black text-white font-mono">{stats.total}</p>
            </div>
          </div>

          <div className="bg-[#0a0a0f]/80 p-5 rounded-[2rem] border border-rose-500/20 backdrop-blur-xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/20">
              <Users size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-rose-400/80">Global Network</p>
              <p className="text-2xl font-black text-rose-400 font-mono">{stats.globalCount}</p>
            </div>
          </div>

          <div className="bg-[#0a0a0f]/80 p-5 rounded-[2rem] border border-orange-500/20 backdrop-blur-xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/20">
              <GraduationCap size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-orange-400/80">Scholars Channel</p>
              <p className="text-2xl font-black text-orange-400 font-mono">{stats.studentCount}</p>
            </div>
          </div>

          <div className="bg-[#0a0a0f]/80 p-5 rounded-[2rem] border border-indigo-500/20 backdrop-blur-xl shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/20">
              <UserCheck size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400/80">Faculty Encrypted</p>
              <p className="text-2xl font-black text-indigo-400 font-mono">{stats.teacherCount}</p>
            </div>
          </div>
        </div>

        {/* ================= MAIN 2-COLUMN LAYOUT ================= */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] xl:grid-cols-[0.75fr_1.25fr]">
          
          {/* LEFT: COMPOSER & PRESETS */}
          <aside className="space-y-6">
            <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[40px] pointer-events-none"></div>

              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/5 relative z-10">
                <h3 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <Megaphone size={18} className="text-rose-400"/> Compose Signal
                </h3>
                <span className="text-[10px] font-mono text-neutral-500 flex items-center gap-1">
                  <Zap size={11} className="text-amber-400" /> Push Enabled
                </span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="mb-6 space-y-2 relative z-10">
                <span className="text-[9px] font-black uppercase tracking-wider text-neutral-500 block">Quick Dispatch Presets:</span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => applyTemplate("⚡ Platform Update & Optimization", "We have updated platform capabilities with faster servers and improved classroom experience.", "all")}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[9px] font-bold text-neutral-300 border border-white/5"
                  >
                    Platform Update
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTemplate("📚 New Masterclass Unlocked", "A new professional masterclass curriculum is now available in your learning dashboard.", "student")}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[9px] font-bold text-neutral-300 border border-white/5"
                  >
                    New Masterclass
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTemplate("💼 Faculty Sync & Monthly Review", "Faculty members are requested to review assigned cohort rosters and confirm lesson plans.", "teacher")}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[9px] font-bold text-neutral-300 border border-white/5"
                  >
                    Faculty Briefing
                  </button>
                </div>
              </div>

              <form onSubmit={handleBroadcast} className="space-y-6 relative z-10">
                
                {/* Target Audience Segment */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                    <Target size={12} className="text-rose-400"/> {t.adminPages.targetAudience}
                  </label>
                  <div className="grid grid-cols-3 gap-2 bg-black/60 border border-white/10 rounded-2xl p-2 shadow-inner">
                    <button
                      type="button"
                      onClick={() => setForm({...form, target_role: "all"})}
                      className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        form.target_role === "all" 
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-md" 
                          : "text-neutral-500 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Users size={16}/> All Users
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({...form, target_role: "student"})}
                      className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        form.target_role === "student" 
                          ? "bg-orange-500/20 text-orange-300 border border-orange-500/40 shadow-md" 
                          : "text-neutral-500 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <GraduationCap size={16}/> Students
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({...form, target_role: "teacher"})}
                      className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        form.target_role === "teacher" 
                          ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-md" 
                          : "text-neutral-500 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <UserCheck size={16}/> Faculty
                    </button>
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                    <span>{t.adminPages.transmissionTitle} *</span>
                    <span className="font-mono text-neutral-500">{form.title.length}/100</span>
                  </div>
                  <input 
                    required 
                    maxLength={100}
                    type="text" 
                    placeholder={t.adminPages.transmissionPlaceholder}
                    value={form.title} 
                    onChange={(e) => setForm({...form, title: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm font-bold focus:outline-none focus:border-rose-500/50 shadow-inner" 
                  />
                </div>

                {/* Message Body */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                    <span>{t.adminPages.messageContent} *</span>
                    <span className="font-mono text-neutral-500">{form.messageText.length}/1000</span>
                  </div>
                  <textarea 
                    required 
                    maxLength={1000}
                    rows={5} 
                    placeholder={t.adminPages.messageContentPlaceholder}
                    value={form.messageText} 
                    onChange={(e) => setForm({...form, messageText: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-rose-500/50 shadow-inner resize-y custom-scrollbar leading-relaxed" 
                  />
                </div>

                {/* Live Preview Card */}
                {form.title && (
                  <div className="bg-black/50 border border-white/10 rounded-2xl p-4 space-y-2 shadow-inner">
                    <span className="text-[8px] font-black uppercase tracking-wider text-neutral-500 flex items-center gap-1">
                      <Eye size={10} /> Live Notification Preview
                    </span>
                    <p className="text-xs font-black text-white">{form.title}</p>
                    <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">{form.messageText}</p>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting || !form.title.trim() || !form.messageText.trim()}
                  className="w-full py-4 bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(225,29,72,0.3)] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16}/>}
                  {isSubmitting ? "Beaming Signal..." : "Transmit Broadcast Now"}
                </button>
              </form>
            </div>
          </aside>

          {/* RIGHT: TRANSMISSION LOG */}
          <section className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-3xl shadow-2xl flex flex-col h-full">
            
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 mb-6 border-b border-white/5">
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare size={18} className="text-orange-400"/> Transmission Log ({announcements.length})
                </h3>
              </div>

              {/* Audience Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { id: "ALL", label: "All" },
                  { id: "all", label: "Global" },
                  { id: "student", label: "Scholars" },
                  { id: "teacher", label: "Faculty" },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setAudienceFilter(tab.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                      audienceFilter === tab.id
                        ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                        : "bg-white/5 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Search inside log */}
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Search transmission records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-rose-500/50"
              />
            </div>

            {/* List */}
            <div className="flex-1 max-h-[700px] overflow-y-auto custom-scrollbar pr-2 space-y-4">
              {filteredAnnouncements.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/5 rounded-3xl bg-black/20 text-neutral-500 flex flex-col items-center">
                  <Radio size={48} className="mb-4 opacity-30"/>
                  <p className="text-sm font-bold">{t.adminPages.frequencyClear}</p>
                  <p className="text-[10px] mt-1 uppercase tracking-widest">{t.adminPages.noSignalsDispatched}</p>
                </div>
              ) : (
                filteredAnnouncements.map((announcement) => {
                  const targetStyles = 
                    announcement.target_role === "all" ? "bg-rose-500/10 text-rose-400 border-rose-500/20" :
                    announcement.target_role === "student" ? "bg-orange-500/10 text-orange-400 border-orange-500/20" :
                    "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
                    
                  const TargetIcon = 
                    announcement.target_role === "all" ? Users :
                    announcement.target_role === "student" ? GraduationCap : UserCheck;

                  const isDeleting = deletingId === announcement.id;

                  return (
                    <div key={announcement.id} className="group w-full text-left rounded-2xl border border-white/5 bg-black/40 p-5 sm:p-6 hover:bg-white/[0.02] hover:border-white/10 transition-all flex flex-col gap-4 relative overflow-hidden">
                      
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border flex items-center gap-1.5 ${targetStyles}`}>
                            <TargetIcon size={12}/> {announcement.target_role === "all" ? "Global" : announcement.target_role}
                          </span>
                          <span className="text-[10px] text-neutral-500 font-mono flex items-center gap-1.5 before:w-1 before:h-1 before:bg-white/20 before:rounded-full">
                            <Clock size={11} /> {new Date(announcement.created_at).toLocaleString()}
                          </span>
                        </div>
                        
                        <button 
                          onClick={() => handleDelete(announcement.id)}
                          disabled={isDeleting}
                          className="w-8 h-8 rounded-lg bg-red-500/5 hover:bg-red-500/20 border border-transparent hover:border-red-500/20 text-neutral-500 hover:text-red-400 flex items-center justify-center transition-all disabled:opacity-50 shrink-0"
                          title={t.adminPages.recallBroadcast}
                        >
                          {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14}/>}
                        </button>
                      </div>

                      <div>
                        <h4 className="font-black text-white text-base sm:text-lg mb-2 group-hover:text-rose-300 transition-colors leading-snug">
                          {announcement.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">
                          {announcement.message}
                        </p>
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
