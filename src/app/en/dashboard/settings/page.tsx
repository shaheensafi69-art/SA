"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type UserProfile = {
  first_name: string;
  last_name: string;
  father_name: string;
  date_of_birth: string;
  email: string;
  phone_number: string;
  country: string;
  bio: string;
  avatar_url: string;
};

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "preferences">("profile");

  // استیت‌های اطلاعات کاربر کاملاً منطبق بر دیتابیس
  const [profile, setProfile] = useState<UserProfile>({
    first_name: "",
    last_name: "",
    father_name: "",
    date_of_birth: "",
    email: "",
    phone_number: "",
    country: "",
    bio: "",
    avatar_url: "",
  });

  // استیت‌های تغییر رمز عبور
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [notification, setNotification] = useState<{ type: "success" | "error", message: string } | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) return;

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (profileData) {
      setProfile({
        first_name: profileData.first_name || "",
        last_name: profileData.last_name || "",
        father_name: profileData.father_name || "",
        date_of_birth: profileData.date_of_birth || "",
        email: session.user.email || profileData.email || "", 
        phone_number: profileData.phone_number || "",
        country: profileData.country || "",
        bio: profileData.bio || "",
        avatar_url: profileData.avatar_url || "",
      });
    }
    setIsLoading(false);
  };

  // ================= تابع آپلود عکس پروفایل =================
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsSaving(true);
    showNotification("success", "Uploading avatar...");

    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${session.user.id}-${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(fileName);
      const newAvatarUrl = publicUrlData.publicUrl;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: newAvatarUrl })
        .eq('id', session.user.id);

      if (updateError) throw updateError;

      setProfile(prev => ({ ...prev, avatar_url: newAvatarUrl }));
      showNotification("success", "Profile picture updated instantly!");
    } catch (error: any) {
      console.error("Avatar upload error:", error);
      showNotification("error", "Failed to upload. Make sure 'avatars' bucket is public.");
    } finally {
      setIsSaving(false);
    }
  };

  // ================= تابع ذخیره اطلاعات پروفایل =================
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          father_name: profile.father_name,
          date_of_birth: profile.date_of_birth || null, 
          phone_number: profile.phone_number,
          country: profile.country,
          bio: profile.bio,
        })
        .eq('id', session.user.id);

      if (error) throw error;
      showNotification("success", "Account details saved successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      showNotification("error", "Database error. Failed to save details.");
    } finally {
      setIsSaving(false);
    }
  };

  // ================= تابع تغییر رمز عبور =================
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.newPassword.length < 6) {
      showNotification("error", "Password must be at least 6 characters.");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      showNotification("error", "Passwords do not match.");
      return;
    }

    setIsSaving(true);
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.newPassword
      });

      if (error) throw error;
      showNotification("success", "Your password has been secured!");
      setPasswords({ newPassword: "", confirmPassword: "" });
    } catch (error: any) {
      console.error("Password update error:", error);
      showNotification("error", error.message || "Failed to update password.");
    } finally {
      setIsSaving(false);
    }
  };

  // نمایش موقت پیام (Toast)
  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="w-full relative overflow-hidden bg-[#020202] font-sans pb-12">
      
      {/* ================= پس‌زمینه نوری زنده ================= */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* ================= Header ================= */}
      <header className="px-6 md:px-12 pt-8 md:pt-12 flex flex-col gap-2 relative z-10 mb-8">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Account <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">Settings</span>
        </h1>
        <p className="text-neutral-500 text-sm md:text-base font-medium max-w-xl">Customize your identity, secure your data, and manage preferences.</p>
      </header>

      {/* ================= نوتیفیکیشن شناور (Dynamic Toast) ================= */}
      {notification && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-3 animate-[fadeInDown_0.4s_ease-out] border backdrop-blur-2xl ${
          notification.type === "success" ? "bg-emerald-900/80 border-emerald-500/30 text-emerald-400" : "bg-red-900/80 border-red-500/30 text-red-400"
        }`}>
          <span className="text-lg">{notification.type === "success" ? "✅" : "⚠️"}</span>
          <span className="font-bold text-sm tracking-wide">{notification.message}</span>
        </div>
      )}

      {/* ================= بدنه اصلی تعاملی دو ستونه ================= */}
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto relative z-10 flex flex-col md:flex-row gap-8 items-start">

        {/* ================= سایدبار تنظیمات (تب‌های عمودی) ================= */}
        <div className="w-full md:w-80 shrink-0">
          {/* ساختار کاملاً عمودی (flex-col) برای تمام دستگاه‌ها */}
          <div className="flex flex-col bg-neutral-900/40 backdrop-blur-2xl p-3 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-2 md:sticky md:top-32 animate-[fadeIn_0.3s_ease-out]">
            <p className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] px-4 pt-4 pb-2">Settings Menu</p>
            
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === "profile" 
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-[0_10px_25px_rgba(245,158,11,0.25)] scale-[1.02]" 
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-xl">👤</span> Personal Info
            </button>

            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === "security" 
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-[0_10px_25px_rgba(245,158,11,0.25)] scale-[1.02]" 
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-xl">🔒</span> Security
            </button>

            <button
              onClick={() => setActiveTab("preferences")}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === "preferences" 
                  ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black shadow-[0_10px_25px_rgba(245,158,11,0.25)] scale-[1.02]" 
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-xl">⚙️</span> Preferences
            </button>
          </div>
        </div>

        {/* ================= فرم‌های تنظیمات ================= */}
        <div className="flex-1 w-full max-w-4xl">
          {isLoading ? (
            <div className="bg-neutral-900/40 rounded-[2.5rem] border border-white/5 p-8 animate-pulse h-[600px]"></div>
          ) : (
            <div className="bg-neutral-900/40 rounded-[2.5rem] border border-white/5 backdrop-blur-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
              
              {/* هاله نوری ظریف داخل فرم */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none"></div>

              {/* ================= تب پروفایل ================= */}
              {activeTab === "profile" && (
                <div className="animate-[fadeIn_0.3s_ease-out] relative z-10">
                  <h2 className="text-2xl font-black text-white mb-8 border-b border-white/5 pb-4">Personal Identity</h2>
                  
                  {/* بخش تغییر عکس پروفایل زنده */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
                    <div className="relative group cursor-pointer">
                      {/* حلقه نورانی متحرک دور آواتار */}
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
                      <div className="relative w-28 h-28 rounded-[2rem] border border-white/10 overflow-hidden bg-neutral-900 shadow-2xl flex items-center justify-center z-10 transition-transform duration-500 group-hover:scale-105">
                        {profile.avatar_url ? (
                          <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-4xl text-neutral-600 font-black">{profile.first_name.charAt(0) || "U"}</span>
                        )}
                        {/* هاله آپلود روی عکس */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-8 h-8 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        </div>
                      </div>
                      <input type="file" accept="image/*" onChange={handleAvatarUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" disabled={isSaving} />
                    </div>
                    <div className="text-center sm:text-left mt-2 sm:mt-4">
                      <h3 className="text-white font-black text-lg mb-1">Profile Photo</h3>
                      <p className="text-neutral-500 text-xs font-bold leading-relaxed max-w-xs">Tap the image to upload a new avatar. Recommended size: 500x500px (PNG, JPG).</p>
                    </div>
                  </div>

                  {/* فرم اطلاعات فردی فول آپشن */}
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    
                    <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest border-l-2 border-amber-500 pl-2">Basic Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">First Name</label>
                        <input required type="text" value={profile.first_name} onChange={(e) => setProfile({...profile, first_name: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-amber-500/50 focus:bg-black/60 transition-all shadow-inner" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Last Name</label>
                        <input required type="text" value={profile.last_name} onChange={(e) => setProfile({...profile, last_name: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-amber-500/50 focus:bg-black/60 transition-all shadow-inner" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Father's Name</label>
                        <input type="text" value={profile.father_name} onChange={(e) => setProfile({...profile, father_name: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-amber-500/50 focus:bg-black/60 transition-all shadow-inner" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Date of Birth</label>
                        <input type="date" value={profile.date_of_birth} onChange={(e) => setProfile({...profile, date_of_birth: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-2xl px-4 py-3.5 text-white text-sm font-mono focus:outline-none focus:border-amber-500/50 focus:bg-black/60 transition-all shadow-inner" />
                      </div>
                    </div>

                    <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest border-l-2 border-amber-500 pl-2 pt-2">Contact Info</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Email Address</label>
                        <input type="email" value={profile.email} disabled className="w-full bg-white/5 border border-transparent rounded-2xl px-4 py-4 text-neutral-400 text-sm cursor-not-allowed opacity-70" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Phone Number</label>
                        <input type="tel" placeholder="+1 234 567 890" value={profile.phone_number} onChange={(e) => setProfile({...profile, phone_number: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-2xl px-4 py-4 text-white text-sm font-mono focus:outline-none focus:border-amber-500/50 focus:bg-black/60 transition-all shadow-inner" />
                      </div>
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Country / Region</label>
                        <input type="text" placeholder="e.g. United Kingdom" value={profile.country} onChange={(e) => setProfile({...profile, country: e.target.value})} className="w-full bg-black/40 border border-white/5 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-amber-500/50 focus:bg-black/60 transition-all shadow-inner" />
                      </div>
                    </div>

                    <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest border-l-2 border-amber-500 pl-2 pt-2">About You</h4>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Bio / Headline</label>
                      <textarea 
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        placeholder="E.g. Aspiring Forex Trader & Software Engineer..."
                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-amber-500/50 focus:bg-black/60 transition-all shadow-inner resize-none h-28 custom-scrollbar"
                      />
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/5">
                      <button 
                        type="submit" 
                        disabled={isSaving}
                        className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-[0_10px_30px_rgba(245,158,11,0.3)] flex items-center justify-center"
                      >
                        {isSaving ? "Saving Updates..." : "Save Profile Details"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ================= تب امنیت (تغییر رمز) ================= */}
              {activeTab === "security" && (
                <div className="animate-[fadeIn_0.3s_ease-out] relative z-10">
                  <h2 className="text-2xl font-black text-white mb-2">Vault Security</h2>
                  <p className="text-neutral-500 text-sm mb-8 font-medium border-b border-white/5 pb-6">Update your password to keep your assets and data heavily secured.</p>
                  
                  <form onSubmit={handleUpdatePassword} className="space-y-6 max-w-md">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">New Secure Password</label>
                      <input 
                        required type="password" minLength={6}
                        value={passwords.newPassword}
                        onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                        placeholder="••••••••"
                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-4 py-4 text-white text-lg tracking-widest focus:outline-none focus:border-amber-500/50 focus:bg-black/60 transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Confirm Password</label>
                      <input 
                        required type="password" minLength={6}
                        value={passwords.confirmPassword}
                        onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                        placeholder="••••••••"
                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-4 py-4 text-white text-lg tracking-widest focus:outline-none focus:border-amber-500/50 focus:bg-black/60 transition-all shadow-inner"
                      />
                    </div>

                    <div className="pt-6">
                      <button 
                        type="submit" 
                        disabled={isSaving || !passwords.newPassword}
                        className="w-full py-4 bg-white/5 text-white border border-white/10 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all disabled:opacity-50"
                      >
                        {isSaving ? "Updating Vault..." : "Update Vault Password"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ================= تب Preferences (تنظیمات اعلانات) ================= */}
              {activeTab === "preferences" && (
                <div className="animate-[fadeIn_0.3s_ease-out] relative z-10">
                  <h2 className="text-2xl font-black text-white mb-2">Notification Center</h2>
                  <p className="text-neutral-500 text-sm mb-8 font-medium border-b border-white/5 pb-6">Manage how the Academy communicates with you.</p>
                  
                  <div className="space-y-4">
                    {/* Toggle 1 */}
                    <div className="flex items-center justify-between p-6 bg-black/40 border border-white/5 rounded-[1.5rem] hover:border-white/10 transition-colors">
                      <div className="pr-4">
                        <h4 className="text-white font-bold mb-1">Academy Updates & Emails</h4>
                        <p className="text-[11px] text-neutral-500 font-bold leading-relaxed">Receive instant alerts about your live classes, course progress, and assignment grades.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-12 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-amber-400 peer-checked:to-amber-600 shadow-inner"></div>
                      </label>
                    </div>

                    {/* Toggle 2 */}
                    <div className="flex items-center justify-between p-6 bg-black/40 border border-white/5 rounded-[1.5rem] hover:border-white/10 transition-colors">
                      <div className="pr-4">
                        <h4 className="text-white font-bold mb-1">Marketing & Exclusive Offers</h4>
                        <p className="text-[11px] text-neutral-500 font-bold leading-relaxed">Get notified about new courses, discounts, and referral program bonuses.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-12 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-amber-400 peer-checked:to-amber-600 shadow-inner"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}