"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Loader2, ArrowLeft, Trophy, Plus, Trash2, Award, Medal, CheckCircle2, AlertCircle, Type, AlignLeft, Target, Image as ImageIcon } from "lucide-react";

type AwardItem = {
  id: string;
  title: string;
  description: string;
  icon_url: string;
  points_required: number;
};

export default function AdminAwardsPage() {
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    icon_url: "🏆", // ایموجی پیش‌فرض
    points_required: 0,
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
    if (!form.title || !form.description) {
      setMessage({ type: 'error', text: 'Title and description are required.' });
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
          points_required: form.points_required,
        })
        .select()
        .single();

      if (error) throw error;

      setAwards(prev => [...prev, data].sort((a, b) => a.points_required - b.points_required));
      setMessage({ type: 'success', text: 'Honor badge successfully created!' });
      
      // ریست کردن فرم
      setForm({ title: "", description: "", icon_url: "🏆", points_required: 0 });
      setTimeout(() => setMessage(null), 3000);

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to create badge.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAward = async (id: string) => {
    if (!confirm("Are you sure you want to delete this badge? Students who already have it might lose it from their profile.")) return;

    setDeletingId(id);
    const supabase = createClient();

    try {
      const { error } = await supabase.from("awards").delete().eq("id", id);
      if (error) throw error;

      setAwards(prev => prev.filter(a => a.id !== id));
    } catch (error: any) {
      alert("Failed to delete: " + error.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Honors System...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10" dir="ltr">
      
      {/* Background Ambience */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-[1600px] mx-auto space-y-6 sm:space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between md:items-start gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <Link href="/en/admin" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-amber-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <ArrowLeft size={14} /> Command Center
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
              Honors & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Badges</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-xl">
              Create and manage official academy badges. Instructors can award these to students for outstanding achievements.
            </p>
          </div>

          <div className="flex gap-3 shrink-0 relative z-10">
            <div className="bg-black/40 border border-white/5 px-6 py-4 rounded-2xl flex flex-col items-center justify-center shadow-inner">
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1 flex items-center gap-1.5"><Trophy size={12}/> Total Badges</p>
              <p className="text-3xl font-black text-amber-400">{awards.length}</p>
            </div>
          </div>
        </header>

        {/* ================= MAIN LAYOUT (Form + List) ================= */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] xl:grid-cols-[0.7fr_1.3fr]">
          
          {/* LEFT: CREATE NEW BADGE FORM */}
          <aside className="space-y-6">
            <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-3xl shadow-2xl sticky top-28">
              <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
                <Plus size={18} className="text-amber-400"/> Create New Badge
              </h3>

              {message && (
                <div className={`p-4 rounded-2xl mb-6 flex items-center gap-3 text-xs font-bold border ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                  {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <p>{message.text}</p>
                </div>
              )}

              <form onSubmit={handleCreateAward} className="space-y-5">
                {/* Badge Title */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Badge Title *</label>
                  <div className="relative">
                    <Type size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input 
                      required type="text" placeholder="e.g. Top Scholar"
                      value={form.title} onChange={(e) => setForm({...form, title: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-sm font-bold focus:outline-none focus:border-amber-500/50 shadow-inner" 
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Description *</label>
                  <div className="relative">
                    <AlignLeft size={16} className="absolute left-4 top-4 text-neutral-500" />
                    <textarea 
                      required rows={3} placeholder="What is this badge awarded for?"
                      value={form.description} onChange={(e) => setForm({...form, description: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-amber-500/50 shadow-inner resize-y" 
                    />
                  </div>
                </div>

                {/* Icon & Points Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Icon / Emoji</label>
                    <div className="relative">
                      <ImageIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input 
                        type="text" placeholder="🏅"
                        value={form.icon_url} onChange={(e) => setForm({...form, icon_url: e.target.value})}
                        className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-lg focus:outline-none focus:border-amber-500/50 shadow-inner" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Points Value</label>
                    <div className="relative">
                      <Target size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input 
                        type="number" min="0" required
                        value={form.points_required} onChange={(e) => setForm({...form, points_required: Number(e.target.value)})}
                        className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-sm font-mono focus:outline-none focus:border-amber-500/50 shadow-inner" 
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full mt-2 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(245,158,11,0.3)] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Award size={16}/>}
                  {isSubmitting ? "Creating..." : "Save Badge"}
                </button>
              </form>
            </div>
          </aside>

          {/* RIGHT: LIST OF BADGES */}
          <section className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-3xl shadow-2xl flex flex-col h-full">
            <h3 className="text-lg font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
              <Medal size={18} className="text-amber-400"/> Academy Registry
            </h3>

            <div className="flex-1 max-h-[600px] overflow-y-auto custom-scrollbar pr-2 space-y-3">
              {awards.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/5 rounded-3xl bg-black/20 text-neutral-500 flex flex-col items-center">
                  <Trophy size={48} className="mb-4 opacity-30"/>
                  <p className="text-sm font-bold">No badges have been created yet.</p>
                  <p className="text-[10px] mt-1 uppercase tracking-widest">Use the form to add the first honor.</p>
                </div>
              ) : (
                awards.map((award) => (
                  <div key={award.id} className="group w-full text-left rounded-2xl border border-white/5 bg-black/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-white/[0.02] hover:border-white/10 transition-all">
                    
                    <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-white/10 to-transparent border border-white/10 flex items-center justify-center text-3xl shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                        {award.icon_url.includes("http") ? (
                          <img src={award.icon_url} alt={award.title} className="w-8 h-8 object-contain" />
                        ) : (
                          <span>{award.icon_url}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-white text-base truncate group-hover:text-amber-400 transition-colors">{award.title}</h4>
                        <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">{award.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t border-white/5 sm:border-0 pt-4 sm:pt-0 shrink-0">
                      <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-center min-w-[70px]">
                        <p className="text-[8px] font-black uppercase tracking-widest text-neutral-500">Points</p>
                        <p className="text-sm font-bold text-amber-400 font-mono">{award.points_required}</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteAward(award.id)}
                        disabled={deletingId === award.id}
                        className="w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 flex items-center justify-center transition-all disabled:opacity-50"
                        title="Delete Badge"
                      >
                        {deletingId === award.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16}/>}
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