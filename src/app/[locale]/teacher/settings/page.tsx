"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { 
  Loader2, Save, User, Mail, Phone, MapPin, 
  Calendar, BookOpen, Shield, Key, Camera, CheckCircle2, 
  AlertCircle, Lock, Share2, Percent, Link as LinkIcon, Copy 
} from "lucide-react";

export default function TeacherSettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // استیت فرم پروفایل شامل تمامی ستون‌های جدول profiles از صفر تا صد
  const [profile, setProfile] = useState({
    id: "",
    first_name: "",
    last_name: "",
    father_name: "",
    email: "",
    phone_number: "",
    country: "",
    date_of_birth: "",
    bio: "",
    avatar_url: "",
    referral_code: "",
    referral_link: "",
    referral_discount_rate: 0,
  });

  // استیت تغییر رمز عبور
  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    const supabase = createClient();
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      router.push("/en/login");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfile({
          id: data.id,
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          father_name: data.father_name || "",
          email: data.email || session.user.email || "",
          phone_number: data.phone_number || "",
          country: data.country || "",
          date_of_birth: data.date_of_birth || "",
          bio: data.bio || "",
          avatar_url: data.avatar_url || "",
          referral_code: data.referral_code || "",
          referral_link: data.referral_link || "",
          referral_discount_rate: data.referral_discount_rate || 0,
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setMessage(null);
    const supabase = createClient();

    try {
      // ایمیل، شماره تلفن و سه فیلد رفرال تغییر نمی‌کنند؛ فیلدهای دیگر قابل آپدیت هستند
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: profile.first_name.trim(),
          last_name: profile.last_name.trim(),
          father_name: profile.father_name.trim(),
          country: profile.country.trim(),
          date_of_birth: profile.date_of_birth,
          bio: profile.bio.trim(),
          avatar_url: profile.avatar_url.trim(),
        })
        .eq("id", profile.id);

      if (error) throw error;
      
      setMessage({ type: 'success', text: 'Instructor profile updated successfully!' });
      setTimeout(() => setMessage(null), 4000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile.' });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }

    setIsSavingPassword(true);
    setMessage(null);
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword
      });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Security credentials and password updated successfully!' });
      setPasswordForm({ newPassword: "", confirmPassword: "" });
      setTimeout(() => setMessage(null), 4000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update password.' });
    } finally {
      setIsSavingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030305] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Settings Panel...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030305] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-32" dir="ltr">
      
      {/* Background Ambience (Teacher Theme Glows) */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8 animate-[fadeIn_0.4s_ease-out]">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between md:items-center gap-6 bg-[#0a0a0f]/80 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500/20 to-purple-500/5 text-fuchsia-400 rounded-2xl flex items-center justify-center border border-fuchsia-500/20 shadow-inner shrink-0">
              <User size={32} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
                Account <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400">Settings</span>
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium">Manage your complete profile database, referrals, and security credentials.</p>
            </div>
          </div>
        </header>

        {/* Global Alert Messages */}
        {message && (
          <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-bold animate-[fadeInDown_0.3s_ease-out] border ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
            {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <p>{message.text}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ================= LEFT COLUMN: AVATAR & QUICK INFO ================= */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-[50px] pointer-events-none"></div>

              <div className="relative w-32 h-32 mb-6 group">
                <div className="w-full h-full rounded-full bg-neutral-900 border-2 border-fuchsia-500/30 overflow-hidden shadow-inner flex items-center justify-center">
                  {profile.avatar_url ? (
                    <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-neutral-600" />
                  )}
                </div>
              </div>

              <h2 className="text-xl font-black text-white">{profile.first_name || profile.last_name ? `${profile.first_name} ${profile.last_name}` : 'Instructor'}</h2>
              <p className="text-xs text-fuchsia-400 font-black uppercase tracking-widest mt-1 mb-6">Academy Instructor</p>
              
              <div className="w-full space-y-3 pt-6 border-t border-white/5 text-left">
                <div className="flex items-center gap-3 text-xs text-neutral-400 font-medium bg-black/40 p-3.5 rounded-2xl border border-white/5">
                  <Mail size={14} className="text-neutral-500 shrink-0"/> <span className="truncate">{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-400 font-medium bg-black/40 p-3.5 rounded-2xl border border-white/5">
                  <Shield size={14} className="text-emerald-500 shrink-0"/> <span>Security: Protected</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: FORMS ================= */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Form 1: General Profile & Referral Information */}
            <form onSubmit={handleUpdateProfile} className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
              <h3 className="text-lg font-black text-fuchsia-400 flex items-center gap-2 border-b border-white/5 pb-4">
                <User size={18} /> Complete Profile & Referral Data
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">First Name *</label>
                  <input 
                    type="text" required value={profile.first_name} onChange={e => setProfile({...profile, first_name: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 shadow-inner" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Last Name *</label>
                  <input 
                    type="text" required value={profile.last_name} onChange={e => setProfile({...profile, last_name: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 shadow-inner" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Father Name</label>
                <input 
                  type="text" value={profile.father_name} onChange={e => setProfile({...profile, father_name: e.target.value})}
                  className="w-full bg-black/60 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 shadow-inner" 
                />
              </div>

              {/* Locked Fields: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-2xl bg-white/[0.01] border border-white/5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Email Address</label>
                    <span className="text-[9px] font-bold text-amber-400/80 flex items-center gap-1"><Lock size={9}/> Locked</span>
                  </div>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" />
                    <input 
                      type="text" disabled value={profile.email}
                      className="w-full bg-black/40 border border-white/5 rounded-2xl pl-11 pr-4 py-3.5 text-neutral-400 text-sm opacity-60 cursor-not-allowed select-none" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Phone Number</label>
                    <span className="text-[9px] font-bold text-amber-400/80 flex items-center gap-1"><Lock size={9}/> Locked</span>
                  </div>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" />
                    <input 
                      type="text" disabled value={profile.phone_number}
                      className="w-full bg-black/40 border border-white/5 rounded-2xl pl-11 pr-4 py-3.5 text-neutral-400 text-sm opacity-60 cursor-not-allowed select-none" 
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Country / Region</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input 
                      type="text" value={profile.country} onChange={e => setProfile({...profile, country: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 shadow-inner" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Date of Birth</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input 
                      type="date" value={profile.date_of_birth} onChange={e => setProfile({...profile, date_of_birth: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 shadow-inner [color-scheme:dark]" 
                    />
                  </div>
                </div>
              </div>

              {/* Locked Referral Settings Section (قابل کپی، غیرقابل تغییر) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white/[0.01] border border-white/5">
                
                {/* Referral Code */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Referral Code</label>
                    <button 
                      type="button" 
                      onClick={() => copyToClipboard(profile.referral_code, 'code')}
                      className="text-[9px] font-bold text-fuchsia-400 hover:text-fuchsia-300 flex items-center gap-1 transition-colors"
                    >
                      <Copy size={10}/> {copiedField === 'code' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="relative">
                    <Share2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" />
                    <input 
                      type="text" disabled value={profile.referral_code}
                      className="w-full bg-black/40 border border-white/5 rounded-xl pl-9 pr-3.5 py-2.5 text-neutral-400 text-xs font-mono opacity-60 cursor-not-allowed select-none" 
                    />
                  </div>
                </div>

                {/* Referral Link */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Referral Link</label>
                    <button 
                      type="button" 
                      onClick={() => copyToClipboard(profile.referral_link, 'link')}
                      className="text-[9px] font-bold text-fuchsia-400 hover:text-fuchsia-300 flex items-center gap-1 transition-colors"
                    >
                      <Copy size={10}/> {copiedField === 'link' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="relative">
                    <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" />
                    <input 
                      type="text" disabled value={profile.referral_link}
                      className="w-full bg-black/40 border border-white/5 rounded-xl pl-9 pr-3.5 py-2.5 text-neutral-400 text-xs font-mono opacity-60 cursor-not-allowed select-none truncate" 
                    />
                  </div>
                </div>

                {/* Discount Rate */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Discount Rate</label>
                    <span className="text-[9px] font-bold text-amber-400/80 flex items-center gap-1"><Lock size={9}/> Locked</span>
                  </div>
                  <div className="relative">
                    <Percent size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" />
                    <input 
                      type="text" disabled value={`${profile.referral_discount_rate}%`}
                      className="w-full bg-black/40 border border-white/5 rounded-xl pl-9 pr-3.5 py-2.5 text-neutral-400 text-xs font-mono opacity-60 cursor-not-allowed select-none" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Avatar Image URL</label>
                <div className="relative">
                  <Camera size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input 
                    type="url" placeholder="https://..." value={profile.avatar_url} onChange={e => setProfile({...profile, avatar_url: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 shadow-inner" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Professional Biography</label>
                <div className="relative">
                  <BookOpen size={16} className="absolute left-4 top-4 text-neutral-500" />
                  <textarea 
                    rows={4} placeholder="Write a short bio about your expertise and background..."
                    value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})}
                    className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 resize-none shadow-inner custom-scrollbar" 
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button 
                  type="submit" disabled={isSavingProfile}
                  className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-[0_10px_30px_rgba(217,70,239,0.3)] disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95"
                >
                  {isSavingProfile ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save Profile Updates
                </button>
              </div>
            </form>

            {/* Form 2: Security & Password */}
            <form onSubmit={handleUpdatePassword} className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8">
              <h3 className="text-lg font-black text-fuchsia-400 flex items-center gap-2 border-b border-white/5 pb-4">
                <Shield size={18} /> Security & Authentication
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">New Password</label>
                  <div className="relative">
                    <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input 
                      type="password" placeholder="••••••••" required
                      value={passwordForm.newPassword} onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 shadow-inner" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                  <div className="relative">
                    <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="password" placeholder="••••••••" required
                      value={passwordForm.confirmPassword}
                      onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                      className="w-full bg-black/60 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 shadow-inner"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button 
                  type="submit" disabled={isSavingPassword}
                  className="w-full sm:w-auto px-10 py-4 bg-white/5 hover:bg-fuchsia-500/20 border border-white/10 hover:border-fuchsia-500/30 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95"
                >
                  {isSavingPassword ? <Loader2 size={16} className="animate-spin" /> : <Shield size={16} />} Update Password
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}