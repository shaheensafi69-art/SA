"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Loader2, ArrowLeft, Save, LogOut, User, Mail, FileText, Camera, 
  CheckCircle2, AlertCircle, ShieldCheck, Phone, MapPin, Calendar, 
  Award, Wallet, Fingerprint 
} from "lucide-react";

export default function AdminSettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [profileData, setProfileData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    father_name: "",
    date_of_birth: "",
    email: "",
    phone_number: "",
    country: "",
    role: "",
    avatar_url: "",
    total_score: 0,
    wallet_balance: 0,
    bio: "",
    referral_code: ""
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
        father_name: profile.father_name || "",
        date_of_birth: profile.date_of_birth || "",
        email: profile.email || "",
        phone_number: profile.phone_number || "",
        country: profile.country || "",
        role: profile.role || "admin",
        avatar_url: profile.avatar_url || "",
        total_score: profile.total_score || 0,
        wallet_balance: profile.wallet_balance || 0,
        bio: profile.bio || "",
        referral_code: profile.referral_code || ""
      });
    }
    setIsLoading(false);
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: profileData.first_name.trim(),
          last_name: profileData.last_name.trim(),
          father_name: profileData.father_name.trim(),
          date_of_birth: profileData.date_of_birth || null,
          phone_number: profileData.phone_number.trim(),
          country: profileData.country.trim(),
          bio: profileData.bio.trim(),
          avatar_url: profileData.avatar_url.trim()
        })
        .eq("id", profileData.id);

      if (error) throw error;
      
      setMessage({ type: 'success', text: 'System configuration and profile metrics synced successfully!' });
      setTimeout(() => setMessage(null), 3000);

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update configuration.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to securely log out of the command center?");
    if (!confirmLogout) return;

    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/en/login");
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32 lg:pb-10" dir="ltr">
      
      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= HEADER ================= */}
        <header className="bg-[#0a0a0f]/80 p-6 sm:p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <Link href="/en/admin" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-indigo-400 transition-colors mb-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <ArrowLeft size={14} /> Command Center
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-2">
              System <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Settings</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-medium max-w-md">
              Manage your master administrator profile, configure contact parameters, and monitor node parameters.
            </p>
          </div>
          
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="relative z-10 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 shrink-0"
          >
            {isLoggingOut ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
            {isLoggingOut ? "Logging out..." : "Secure Logout"}
          </button>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
            <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Synchronizing Core Engine...</p>
          </div>
        ) : (
          <form onSubmit={handleSaveChanges} className="space-y-6 sm:space-y-8">
            
            {message && (
              <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-bold border backdrop-blur-md animate-[fadeInDown_0.3s_ease-out] ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <p>{message.text}</p>
              </div>
            )}

            {/* ================= SECTION 1: IDENTITY ================= */}
            <section className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-3xl shadow-2xl">
              <h2 className="text-lg font-black text-white flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                <User size={20} className="text-indigo-400" /> Identity Configuration
              </h2>
              
              <div className="grid gap-6 sm:grid-cols-2">
                
                {/* Avatar Meta */}
                <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-2">
                  <div className="w-24 h-24 sm:w-28 sm:h-32 rounded-3xl bg-neutral-900 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-2xl relative group">
                    {profileData.avatar_url ? (
                      <img src={profileData.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl font-black text-indigo-500">{profileData.first_name.charAt(0)}{profileData.last_name.charAt(0)}</span>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="text-white" />
                    </div>
                  </div>
                  
                  <div className="w-full space-y-2">
                    <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Avatar Vector URL</label>
                    <input 
                      type="url" placeholder="https://example.com/photo.jpg"
                      value={profileData.avatar_url}
                      onChange={(e) => setProfileData({...profileData, avatar_url: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-indigo-500/50 shadow-inner"
                    />
                    <p className="text-[10px] text-neutral-500 ml-1">Sync your graphic nodes via absolute web link.</p>
                  </div>
                </div>

                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">First Name *</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input 
                      required type="text" value={profileData.first_name}
                      onChange={(e) => setProfileData({...profileData, first_name: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm font-bold focus:outline-none focus:border-indigo-500/50 shadow-inner"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Last Name *</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input 
                      required type="text" value={profileData.last_name}
                      onChange={(e) => setProfileData({...profileData, last_name: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm font-bold focus:outline-none focus:border-indigo-500/50 shadow-inner"
                    />
                  </div>
                </div>

                {/* Father Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Father's Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input 
                      type="text" value={profileData.father_name} placeholder="Father's Name"
                      onChange={(e) => setProfileData({...profileData, father_name: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm font-bold focus:outline-none focus:border-indigo-500/50 shadow-inner"
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Date of Birth</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input 
                      type="date" value={profileData.date_of_birth}
                      onChange={(e) => setProfileData({...profileData, date_of_birth: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm font-bold focus:outline-none focus:border-indigo-500/50 shadow-inner custom-calendar-input"
                    />
                  </div>
                </div>

              </div>
            </section>

            {/* ================= SECTION 2: COMMUNICATIONS & LOCATION ================= */}
            <section className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-3xl shadow-2xl">
              <h2 className="text-lg font-black text-white flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                <Phone size={20} className="text-indigo-400" /> Communications & Geography
              </h2>
              
              <div className="grid gap-6 sm:grid-cols-2">
                
                {/* Email (Read Only) */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Primary Email (Protected)</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" />
                    <input 
                      type="email" value={profileData.email} disabled
                      className="w-full bg-[#050508] border border-white/5 rounded-2xl pl-11 pr-4 py-4 text-neutral-500 text-sm font-mono cursor-not-allowed shadow-inner"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input 
                      type="tel" value={profileData.phone_number} placeholder="+44..."
                      onChange={(e) => setProfileData({...profileData, phone_number: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm font-bold focus:outline-none focus:border-indigo-500/50 shadow-inner font-mono"
                    />
                  </div>
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Country Node</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input 
                      type="text" value={profileData.country} placeholder="e.g. United Kingdom"
                      onChange={(e) => setProfileData({...profileData, country: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm font-bold focus:outline-none focus:border-indigo-500/50 shadow-inner"
                    />
                  </div>
                </div>

                {/* Clearance (Read Only) */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">System Clearance</label>
                  <div className="relative">
                    <ShieldCheck size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                    <input 
                      type="text" value={profileData.role.toUpperCase().replace('_', ' ')} disabled
                      className="w-full bg-[#050508] border border-emerald-500/10 rounded-2xl pl-11 pr-4 py-4 text-emerald-500 font-black text-sm tracking-widest cursor-not-allowed shadow-inner"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Professional Biography</label>
                  <div className="relative">
                    <FileText size={16} className="absolute left-4 top-4 text-neutral-500" />
                    <textarea 
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      placeholder="Write your professional credentials..."
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-indigo-500/50 shadow-inner min-h-[100px] resize-y custom-scrollbar"
                    />
                  </div>
                </div>

              </div>
            </section>

            {/* ================= SECTION 3: METRICS & CRYPTO (SYSTEM READ-ONLY) ================= */}
            <section className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-3xl shadow-2xl">
              <h2 className="text-lg font-black text-white flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                <Fingerprint size={20} className="text-indigo-400" /> Internal Metrics & Affiliates
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Total Score */}
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-center border-l-2 border-l-indigo-500">
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1 flex items-center gap-1.5"><Award size={12}/> Academic Score</p>
                  <p className="text-xl font-black text-white font-mono">{profileData.total_score} Pts</p>
                </div>

                {/* Wallet Balance */}
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-center border-l-2 border-l-amber-500">
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1 flex items-center gap-1.5"><Wallet size={12}/> Wallet Balance</p>
                  <p className="text-xl font-black text-amber-400 font-mono">${profileData.wallet_balance.toFixed(2)}</p>
                </div>

                {/* Referral Code */}
                <div className="bg-black/40 border border-white/5 p-5 rounded-2xl flex flex-col justify-center border-l-2 border-l-purple-500">
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1 flex items-center gap-1.5"><Fingerprint size={12}/> Affiliate Code</p>
                  <p className="text-xl font-black text-purple-400 font-mono uppercase tracking-wider">{profileData.referral_code || "NONE"}</p>
                </div>

              </div>
            </section>

            {/* ================= ACTIONS ================= */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 sticky bottom-4 sm:static z-20 pt-4">
              <button 
                type="button"
                onClick={() => router.push("/en/admin")}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-neutral-400 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all shadow-lg backdrop-blur-md"
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(99,102,241,0.3)] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 border border-white/10"
              >
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {isSaving ? "Saving Config..." : "Save Configuration"}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}