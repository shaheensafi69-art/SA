"use client";

import { usePathname } from "next/navigation";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import {
  Loader2,
  ArrowLeft,
  Trophy,
  Plus,
  Trash2,
  Award,
  Medal,
  CheckCircle2,
  AlertCircle,
  Type,
  AlignLeft,
  Target,
  Image as ImageIcon,
  Search,
  Sparkles,
  Zap,
  Flame,
  Crown,
  Star,
  Shield,
  GraduationCap
} from "lucide-react";

type AwardItem = {
  id: string;
  title: string;
  description: string;
  icon_url: string;
  points_required: number;
};

const EMOJI_PRESETS = ["🏆", "👑", "🌟", "🎓", "🔥", "💎", "🎖️", "🚀", "⭐", "⚡", "🧠", "🛡️", "🎯", "🥇"];

export default function AdminAwardsPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    icon_url: "🏆",
    points_required: 100
  });

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    setIsLoading(true);
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from("awards")
        .select("*")
        .order("points_required", { ascending: true });

      if (error) throw error;
      if (data) setAwards(data);
    } catch (error) {
      console.error("Error fetching awards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAward = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setMessage({ type: "error", text: "Badge title and description are required." });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from("awards")
        .insert({
          title: form.title.trim(),
          description: form.description.trim(),
          icon_url: form.icon_url.trim() || "🏆",
          points_required: Number(form.points_required) || 0
        })
        .select()
        .single();

      if (error) throw error;

      setAwards(prev => [...prev, data].sort((a, b) => a.points_required - b.points_required));
      setMessage({ type: "success", text: "Honor badge successfully registered to academy registry!" });

      // Reset form
      setForm({ title: "", description: "", icon_url: "🏆", points_required: 100 });
      setTimeout(() => setMessage(null), 3500);
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to create badge." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAward = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this academy badge?")) return;

    setDeletingId(id);
    const supabase = createClient();

    try {
      const { error } = await supabase.from("awards").delete().eq("id", id);
      if (error) throw error;

      setAwards(prev => prev.filter(a => a.id !== id));
      setMessage({ type: "success", text: "Badge removed from registry." });
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      setMessage({ type: "error", text: "Failed to delete: " + error.message });
    } finally {
      setDeletingId(null);
    }
  };

  const filteredAwards = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return awards;
    return awards.filter(
      a =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        String(a.points_required).includes(q)
    );
  }, [awards, searchQuery]);

  const stats = useMemo(() => {
    const total = awards.length;
    if (total === 0) return { total: 0, min: 0, max: 0, avg: 0 };
    const points = awards.map(a => a.points_required);
    const min = Math.min(...points);
    const max = Math.max(...points);
    const avg = Math.round(points.reduce((a, b) => a + b, 0) / total);
    return { total, min, max, avg };
  }, [awards]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030308] flex flex-col items-center justify-center space-y-4 text-white">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest animate-pulse">
          {t.adminPages.loadingHonorsSystem}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030308] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10 font-sans" dir={isRtl ? "rtl" : "ltr"}>

      {/* Background Ambience */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-6 sm:space-y-8 animate-[fadeIn_0.4s_ease-out]">

        {/* ================= HEADER ================= */}
        <header className="bg-gradient-to-r from-[#0a0a14] via-[#0d0d1a] to-[#07070d] p-6 sm:p-8 rounded-3xl border border-white/[0.08] backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between md:items-center gap-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10">
            <Link
              href={`/${currentLocale}/admin`}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-amber-400 transition-colors mb-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/5"
            >
              <ArrowLeft size={13} /> Command Center
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
              {t.teacherPages.honorsWord} <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">{t.adminPages.badges}</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-xl leading-relaxed">
              Define and calibrate official academy honor badges. Instructors award these based on scholar academic achievement, cohort participation, and project milestones.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <div className="bg-black/60 border border-white/10 px-6 py-4 rounded-2xl flex flex-col items-center justify-center shadow-inner">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-1 flex items-center gap-1.5">
                <Trophy size={13} className="text-amber-400" /> {t.adminPages.totalBadges}
              </span>
              <span className="text-3xl font-black text-amber-400 font-mono">{stats.total}</span>
            </div>
          </div>
        </header>

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#090913]/90 border border-white/[0.08] backdrop-blur-xl">
            <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block">Total Badges</span>
            <span className="text-2xl font-black text-white font-mono mt-1 block">{stats.total}</span>
          </div>
          <div className="p-5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 backdrop-blur-xl">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">Min Points</span>
            <span className="text-2xl font-black text-amber-400 font-mono mt-1 block">{stats.min} PTS</span>
          </div>
          <div className="p-5 rounded-2xl bg-yellow-500/[0.04] border border-yellow-500/20 backdrop-blur-xl">
            <span className="text-[10px] font-black uppercase tracking-wider text-yellow-400 block">Max Points</span>
            <span className="text-2xl font-black text-yellow-400 font-mono mt-1 block">{stats.max} PTS</span>
          </div>
          <div className="p-5 rounded-2xl bg-purple-500/[0.04] border border-purple-500/20 backdrop-blur-xl">
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 block">Average Threshold</span>
            <span className="text-2xl font-black text-purple-300 font-mono mt-1 block">~{stats.avg} PTS</span>
          </div>
        </div>

        {/* ================= MAIN LAYOUT (Form + List) ================= */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] xl:grid-cols-[0.7fr_1.3fr]">

          {/* LEFT: CREATE NEW BADGE FORM */}
          <aside className="space-y-6">
            <div className="bg-[#090913]/90 border border-white/[0.08] rounded-3xl p-6 sm:p-8 backdrop-blur-3xl shadow-2xl sticky top-28 space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Plus size={18} className="text-amber-400" /> Create New Honor Badge
                </h3>
                <span className="text-[10px] font-mono text-amber-400/80 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">
                  Registry v2
                </span>
              </div>

              {message && (
                <div
                  className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-bold border transition-all ${
                    message.type === "success"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                  }`}
                >
                  {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <p>{message.text}</p>
                </div>
              )}

              {/* Live Preview Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-black/40 to-black/60 border border-amber-500/30 shadow-inner flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-amber-500/40 flex items-center justify-center text-3xl shadow-lg shrink-0">
                  {form.icon_url.includes("http") ? (
                    <img src={form.icon_url} alt="Badge" className="w-9 h-9 object-contain" />
                  ) : (
                    <span>{form.icon_url || "🏆"}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-black text-white truncate">
                      {form.title || "Honor Badge Title"}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[10px] font-black shrink-0">
                      {form.points_required || 0} PTS
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {form.description || "Badge criteria and achievement rationale preview."}
                  </p>
                </div>
              </div>

              <form onSubmit={handleCreateAward} className="space-y-5">
                {/* Badge Title */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                    {t.adminPages.badgeTitle}
                  </label>
                  <div className="relative">
                    <Type size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      required
                      type="text"
                      placeholder={t.adminPages.badgeTitlePlaceholder}
                      value={form.title}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-sm font-bold focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                    {t.adminPages.badgeDescription}
                  </label>
                  <div className="relative">
                    <AlignLeft size={16} className="absolute left-4 top-4 text-neutral-500" />
                    <textarea
                      required
                      rows={3}
                      placeholder={t.adminPages.badgeDescPlaceholder}
                      value={form.description}
                      onChange={e => setForm({ ...form, description: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-xs leading-relaxed focus:outline-none focus:border-amber-400 transition-colors shadow-inner resize-y"
                    />
                  </div>
                </div>

                {/* Quick Emoji Presets */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                    Quick Emoji Presets
                  </label>
                  <div className="flex flex-wrap gap-1.5 p-2 rounded-2xl bg-black/40 border border-white/5">
                    {EMOJI_PRESETS.map(emoji => (
                      <button
                        type="button"
                        key={emoji}
                        onClick={() => setForm({ ...form, icon_url: emoji })}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-base transition-all hover:scale-110 active:scale-95 ${
                          form.icon_url === emoji ? "bg-amber-500/20 border border-amber-500/50" : "hover:bg-white/5"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Icon & Points Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                      {t.adminPages.iconEmoji}
                    </label>
                    <div className="relative">
                      <ImageIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type="text"
                        placeholder="🏅 or https://..."
                        value={form.icon_url}
                        onChange={e => setForm({ ...form, icon_url: e.target.value })}
                        className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-base font-bold focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">
                      {t.adminPages.pointsValue}
                    </label>
                    <div className="relative">
                      <Target size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type="number"
                        min="0"
                        required
                        value={form.points_required}
                        onChange={e => setForm({ ...form, points_required: Number(e.target.value) })}
                        className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-sm font-mono font-bold focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(245,158,11,0.2)] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin text-black" /> : <Award size={16} />}
                  <span>{isSubmitting ? "Registering Badge..." : "Save Badge to Registry"}</span>
                </button>
              </form>
            </div>
          </aside>

          {/* RIGHT: LIST OF BADGES */}
          <section className="bg-[#090913]/90 border border-white/[0.08] rounded-3xl p-6 sm:p-8 backdrop-blur-3xl shadow-2xl flex flex-col h-full space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
              <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Medal size={18} className="text-amber-400" /> Academy Honors Registry
              </h3>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search badges..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-2xl bg-black/40 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex-1 max-h-[750px] overflow-y-auto custom-scrollbar pr-2 space-y-3">
              {filteredAwards.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/5 rounded-3xl bg-black/20 text-neutral-500 flex flex-col items-center">
                  <Trophy size={48} className="mb-4 opacity-30 text-amber-500" />
                  <p className="text-sm font-bold text-white">{t.adminPages.noBadgesCreatedYet}</p>
                  <p className="text-xs mt-1 text-neutral-400">{t.adminPages.useFormAddFirstHonor}</p>
                </div>
              ) : (
                filteredAwards.map(award => (
                  <div
                    key={award.id}
                    className="group w-full rounded-2xl border border-white/[0.06] bg-black/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] hover:border-amber-500/30 transition-all shadow-md hover:-translate-y-0.5"
                  >
                    <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-white/10 to-transparent border border-white/10 flex items-center justify-center text-3xl shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                        {award.icon_url.includes("http") ? (
                          <img src={award.icon_url} alt={award.title} className="w-8 h-8 object-contain" />
                        ) : (
                          <span>{award.icon_url}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-white text-base truncate group-hover:text-amber-400 transition-colors">
                          {award.title}
                        </h4>
                        <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                          {award.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 border-t border-white/5 sm:border-0 pt-4 sm:pt-0 shrink-0">
                      <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl text-center min-w-[80px]">
                        <p className="text-[8px] font-black uppercase tracking-widest text-amber-500/80">{t.adminPages.points}</p>
                        <p className="text-sm font-black text-amber-400 font-mono">{award.points_required}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteAward(award.id)}
                        disabled={deletingId === award.id}
                        className="w-10 h-10 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 flex items-center justify-center transition-all disabled:opacity-50 active:scale-95"
                        title={t.adminPages.deleteBadge}
                      >
                        {deletingId === award.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}