"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminSettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const [profileData, setProfileData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    avatar_url: ""
  });

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    setIsLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push("/en/login");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (profile) {
      setProfileData({
        id: profile.id,
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
        bio: profile.bio || "",
        avatar_url: profile.avatar_url || ""
      });
    }
    setIsLoading(false);
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          bio: profileData.bio,
        })
        .eq("id", profileData.id);

      if (error) throw error;
      alert("Profile updated successfully!");
    } catch (error: any) {
      alert("Error updating profile: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/en/login");
  };

  return (
    <div className="min-h-full bg-[#020202] text-white p-6 sm:p-10 relative overflow-hidden font-sans">
      
      {/* افکت‌های نوری پس‌زمینه */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40vw] h-[20vw] bg-indigo-600/10 rounded-[100%] blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto space-y-10 relative z-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <Link href="/en/admin" className="text-neutral-500 hover:text-white text-sm font-bold flex items-center gap-2 mb-4 transition-colors">
              <span>←</span> Back to Dashboard
            </Link>
            <h1 className="text-4xl font-black tracking-tight">Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Settings</span></h1>
            <p className="text-neutral-400 text-sm mt-2">Manage your personal information, system preferences, and account security.</p>
          </div>
          
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-6 py-3 rounded-2xl font-bold transition-all"
          >
            {isLoggingOut ? "Logging out..." : "Log Out Securely"}
            <span className="text-xl">🚪</span>
          </button>
        </header>

        {isLoading ? (
          <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>
        ) : (
          <form onSubmit={handleSaveChanges} className="space-y-8">
            
            {/* Profile Section */}
            <section className="rounded-[2.5rem] border border-white/5 bg-neutral-950/60 p-8 sm:p-10 backdrop-blur-3xl shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-8 border-b border-white/5 pb-4">Personal Information</h2>
              
              <div className="grid gap-8 sm:grid-cols-2">
                {/* Avatar Preview */}
                <div className="sm:col-span-2 flex items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1">
                    <div className="w-full h-full bg-neutral-900 rounded-xl flex items-center justify-center text-3xl font-black">
                      {profileData.first_name?.charAt(0)}{profileData.last_name?.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg">Profile Avatar</p>
                    <p className="text-xs text-neutral-500 mt-1">Avatars are synced with your Safi ID.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-2">First Name</label>
                  <input 
                    required
                    type="text" 
                    value={profileData.first_name}
                    onChange={(e) => setProfileData({...profileData, first_name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 focus:bg-white/10 transition-all outline-none"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-2">Last Name</label>
                  <input 
                    required
                    type="text" 
                    value={profileData.last_name}
                    onChange={(e) => setProfileData({...profileData, last_name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-indigo-500 focus:bg-white/10 transition-all outline-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-3">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-2">Email Address (Read-Only)</label>
                  <input 
                    type="email" 
                    value={profileData.email}
                    disabled
                    className="w-full bg-black/50 border border-white/5 rounded-2xl px-5 py-4 text-neutral-500 cursor-not-allowed"
                  />
                </div>

                <div className="sm:col-span-2 space-y-3">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest pl-2">Professional Bio</label>
                  <textarea 
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    placeholder="Write a short biography about your expertise..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white min-h-[120px] focus:border-indigo-500 focus:bg-white/10 transition-all outline-none custom-scrollbar"
                  />
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button 
                type="button"
                onClick={() => router.push("/en/admin")}
                className="px-8 py-4 rounded-2xl font-bold text-neutral-400 hover:text-white hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isSaving}
                className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 disabled:opacity-50 text-white font-bold rounded-2xl shadow-[0_10px_30px_rgba(99,102,241,0.3)] transition-all"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}