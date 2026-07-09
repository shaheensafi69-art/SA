"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function TeacherSettingsPage() {
  const [firstName, setFirstName] = useState("");
  const [bio, setBio] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase.from("profiles").select("first_name, bio").eq("id", session.user.id).single();
      if (data) {
        setFirstName(data.first_name || "");
        setBio(data.bio || "");
      }
    };
    loadProfile();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await supabase.from("profiles").update({ first_name: firstName, bio: bio }).eq("id", session.user.id);
      alert("Instructor Profile Updated Successfully.");
    }
    setIsSaving(false);
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020202] text-white animate-[fadeIn_0.4s_ease-out]">
      <header className="mb-10 bg-neutral-950/40 p-6 rounded-3xl border border-white/5 backdrop-blur-xl">
        <h1 className="text-2xl font-black">Studio Configuration</h1>
        <p className="text-xs text-neutral-500 mt-1">Configure your official instructor biographical information and public avatar credentials.</p>
      </header>

      <form onSubmit={handleSave} className="max-w-xl bg-neutral-950/40 border border-white/5 rounded-3xl p-6 space-y-6 backdrop-blur-xl">
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">Display Full Name</label>
          <input value={firstName} onChange={e => setFirstName(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-fuchsia-500 transition-colors text-white" required />
        </div>
        
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">Public Instructor Bio</label>
          <textarea value={bio} onChange={e => setBio(e.target.value)} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-fuchsia-500 transition-colors text-white resize-none" placeholder="Explain your professional backgrounds in financial markets or software engineering..." />
        </div>

        <button type="submit" disabled={isSaving} className="w-full py-4 bg-fuchsia-600 hover:bg-fuchsia-500 disabled:bg-neutral-800 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg">
          {isSaving ? "Saving Credentials..." : "Update Profiles"}
        </button>
      </form>
    </div>
  );
}