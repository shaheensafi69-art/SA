"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalAnnouncementModal({ isOpen, onClose }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: "", message: "", target_role: "all" });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const supabase = createClient();

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error("Not authenticated");

      const { error } = await supabase.from("announcements").insert({
        title: formData.title,
        message: formData.message,
        target_role: formData.target_role,
        created_by: session.user.id,
      });

      if (error) throw error;

      alert("Announcement broadcasted successfully! 📢");
      setFormData({ title: "", message: "", target_role: "all" });
      onClose();
    } catch (error: any) {
      console.error("Broadcast Error:", error);
      alert(error.message || "Failed to send announcement.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-[fadeIn_0.3s_ease-out]">
      <div className="absolute inset-0 bg-[#020202]/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2rem] shadow-2xl p-8 z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📢</span>
            <h2 className="text-xl font-bold text-white">Broadcast Announcement</h2>
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-neutral-400 mb-1.5 block">Target Audience</label>
            <select 
              value={formData.target_role}
              onChange={(e) => setFormData({...formData, target_role: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 appearance-none"
            >
              <option value="all">Everyone (Students & Teachers)</option>
              <option value="student">Students Only</option>
              <option value="teacher">Teachers Only</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-neutral-400 mb-1.5 block">Title</label>
            <input 
              required type="text" placeholder="E.g. System Maintenance Update"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-neutral-400 mb-1.5 block">Message</label>
            <textarea 
              required placeholder="Type your announcement here..."
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 min-h-[120px] resize-none"
            ></textarea>
          </div>

          <button 
            type="submit" disabled={isSubmitting}
            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] disabled:opacity-50"
          >
            {isSubmitting ? "Broadcasting..." : "Send Announcement 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}