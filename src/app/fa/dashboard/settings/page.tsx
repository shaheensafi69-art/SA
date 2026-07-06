"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type UserProfile = {
  first_name: string;
  last_name: string;
  phone: string;
  bio: string;
  avatar_url: string;
  email: string;
};

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "preferences">("profile");

  // استیت‌های اطلاعات کاربر
  const [profile, setProfile] = useState<UserProfile>({
    first_name: "",
    last_name: "",
    phone: "",
    bio: "",
    avatar_url: "",
    email: "",
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

    // گرفتن اطلاعات از جدول profiles
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (profileData) {
      setProfile({
        first_name: profileData.first_name || "",
        last_name: profileData.last_name || "",
        phone: profileData.phone || "",
        bio: profileData.bio || "",
        avatar_url: profileData.avatar_url || "",
        email: session.user.email || "", // ایمیل از سشن گرفته می‌شود
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
      
      // آپلود در باکت avatars
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // گرفتن لینک عمومی عکس
      const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(fileName);
      const newAvatarUrl = publicUrlData.publicUrl;

      // آپدیت دیتابیس
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: newAvatarUrl })
        .eq('id', session.user.id);

      if (updateError) throw updateError;

      setProfile(prev => ({ ...prev, avatar_url: newAvatarUrl }));
      showNotification("success", "Avatar updated successfully!");
    } catch (error: any) {
      console.error("Avatar upload error:", error);
      showNotification("error", "Failed to upload avatar.");
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
          phone: profile.phone,
          bio: profile.bio,
        })
        .eq('id', session.user.id);

      if (error) throw error;
      showNotification("success", "Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      showNotification("error", "Failed to update profile.");
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
      showNotification("success", "Password updated successfully!");
      setPasswords({ newPassword: "", confirmPassword: "" });
    } catch (error: any) {
      console.error("Password update error:", error);
      showNotification("error", error.message || "Failed to update password.");
    } finally {
      setIsSaving(false);
    }
  };

  // نمایش موقت پیام موفقیت/خطا
  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="w-full relative min-h-screen pb-12">
      
      {/* ================= Header ================= */}
      <header className="h-24 px-8 md:px-12 flex justify-between items-center animate-[fadeIn_0.5s_ease-out] border-b border-white/5 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-20">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Account <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Settings</span>
          </h1>
          <p className="text-neutral-500 mt-1 text-sm hidden md:block">Manage your profile, security, and preferences.</p>
        </div>
      </header>

      {/* ================= نوتیفیکیشن شناور ================= */}
      {notification && (
        <div className={`fixed top-28 right-8 z-50 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-[fadeIn_0.3s_ease-out] border ${
          notification.type === "success" ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-400"
        }`}>
          {notification.type === "success" ? "✅" : "⚠️"}
          <span className="font-bold text-sm">{notification.message}</span>
        </div>
      )}

      {/* ================= بدنه اصلی ================= */}
      <div className="px-8 md:px-12 pt-8 max-w-6xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-12">

        {/* ================= سایدبار تنظیمات (تب‌ها) ================= */}
        <div className="w-full md:w-64 shrink-0">
          <div className="flex flex-row md:flex-col gap-2 overflow-x-auto custom-scrollbar pb-4 md:pb-0 sticky top-32">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-5 py-4 rounded-2xl text-sm font-bold transition-all flex items-center gap-3 text-left whitespace-nowrap ${
                activeTab === "profile" ? "bg-neutral-900/80 text-white border border-white/10 shadow-lg" : "text-neutral-500 hover:bg-neutral-900/40 hover:text-white"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`px-5 py-4 rounded-2xl text-sm font-bold transition-all flex items-center gap-3 text-left whitespace-nowrap ${
                activeTab === "security" ? "bg-neutral-900/80 text-white border border-white/10 shadow-lg" : "text-neutral-500 hover:bg-neutral-900/40 hover:text-white"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              Security & Password
            </button>
            <button
              onClick={() => setActiveTab("preferences")}
              className={`px-5 py-4 rounded-2xl text-sm font-bold transition-all flex items-center gap-3 text-left whitespace-nowrap ${
                activeTab === "preferences" ? "bg-neutral-900/80 text-white border border-white/10 shadow-lg" : "text-neutral-500 hover:bg-neutral-900/40 hover:text-white"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Preferences
            </button>
          </div>
        </div>

        {/* ================= فرم‌های تنظیمات ================= */}
        <div className="flex-1 max-w-3xl">
          {isLoading ? (
            <div className="space-y-6">
              <div className="h-32 w-32 bg-neutral-900/40 rounded-full animate-pulse"></div>
              <div className="h-16 bg-neutral-900/40 rounded-xl animate-pulse"></div>
              <div className="h-16 bg-neutral-900/40 rounded-xl animate-pulse"></div>
            </div>
          ) : (
            <>
              {/* تب پروفایل */}
              {activeTab === "profile" && (
                <div className="animate-[fadeIn_0.3s_ease-out]">
                  <h2 className="text-2xl font-bold text-white mb-8">Personal Information</h2>
                  
                  {/* بخش تغییر عکس پروفایل */}
                  <div className="flex items-center gap-6 mb-10">
                    <div className="relative group cursor-pointer">
                      <div className="w-24 h-24 rounded-full border-2 border-white/10 overflow-hidden bg-neutral-800 shadow-xl flex items-center justify-center">
                        {profile.avatar_url ? (
                          <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-3xl text-neutral-500 font-bold">{profile.first_name.charAt(0) || "U"}</span>
                        )}
                      </div>
                      <label className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-sm">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" disabled={isSaving} />
                      </label>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">Profile Picture</h3>
                      <p className="text-neutral-500 text-xs mb-3">PNG, JPG up to 2MB. Click image to upload.</p>
                    </div>
                  </div>

                  {/* فرم اطلاعات فردی */}
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-400 ml-1">First Name</label>
                        <input 
                          type="text" 
                          value={profile.first_name}
                          onChange={(e) => setProfile({...profile, first_name: e.target.value})}
                          className="w-full bg-neutral-900/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-yellow-500/50 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-400 ml-1">Last Name</label>
                        <input 
                          type="text" 
                          value={profile.last_name}
                          onChange={(e) => setProfile({...profile, last_name: e.target.value})}
                          className="w-full bg-neutral-900/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-yellow-500/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-400 ml-1">Email Address</label>
                        <input 
                          type="email" 
                          value={profile.email}
                          disabled
                          className="w-full bg-black/50 border border-white/5 rounded-xl px-4 py-3.5 text-neutral-500 cursor-not-allowed"
                        />
                        <p className="text-[10px] text-neutral-600 ml-1 mt-1">Email cannot be changed.</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-400 ml-1">Phone Number</label>
                        <input 
                          type="tel" 
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          placeholder="+1 234 567 890"
                          className="w-full bg-neutral-900/40 border border-white/10 rounded-xl px-4 py-3.5 text-white font-mono focus:outline-none focus:border-yellow-500/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-400 ml-1">Bio / Headline</label>
                      <textarea 
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        placeholder="E.g. Senior Trader & Full-Stack Developer"
                        className="w-full bg-neutral-900/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-yellow-500/50 transition-colors resize-none h-24 custom-scrollbar"
                      />
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <button 
                        type="submit" 
                        disabled={isSaving}
                        className="px-8 py-3.5 bg-yellow-500 text-black font-extrabold rounded-xl hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:hover:bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                      >
                        {isSaving ? "Saving Changes..." : "Save Changes"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* تب امنیت (تغییر رمز) */}
              {activeTab === "security" && (
                <div className="animate-[fadeIn_0.3s_ease-out]">
                  <h2 className="text-2xl font-bold text-white mb-2">Security & Password</h2>
                  <p className="text-neutral-500 text-sm mb-8">Update your password to keep your account secure.</p>
                  
                  <form onSubmit={handleUpdatePassword} className="space-y-6 max-w-lg">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-400 ml-1">New Password</label>
                      <input 
                        required
                        type="password" 
                        minLength={6}
                        value={passwords.newPassword}
                        onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                        placeholder="Enter new password"
                        className="w-full bg-neutral-900/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-yellow-500/50 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-400 ml-1">Confirm New Password</label>
                      <input 
                        required
                        type="password" 
                        minLength={6}
                        value={passwords.confirmPassword}
                        onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                        placeholder="Re-enter new password"
                        className="w-full bg-neutral-900/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-yellow-500/50 transition-colors"
                      />
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <button 
                        type="submit" 
                        disabled={isSaving || !passwords.newPassword}
                        className="px-8 py-3.5 bg-neutral-800 text-white border border-white/10 font-bold rounded-xl hover:bg-neutral-700 transition-all disabled:opacity-50"
                      >
                        {isSaving ? "Updating..." : "Update Password"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* تب Preferences (تنظیمات اعلانات) */}
              {activeTab === "preferences" && (
                <div className="animate-[fadeIn_0.3s_ease-out]">
                  <h2 className="text-2xl font-bold text-white mb-2">Preferences</h2>
                  <p className="text-neutral-500 text-sm mb-8">Manage how we communicate with you.</p>
                  
                  <div className="space-y-6">
                    {/* Toggle 1 */}
                    <div className="flex items-center justify-between p-5 bg-neutral-900/40 border border-white/5 rounded-2xl">
                      <div>
                        <h4 className="text-white font-bold mb-1">Email Notifications</h4>
                        <p className="text-xs text-neutral-500">Receive updates about your course progress and new assignments.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                      </label>
                    </div>

                    {/* Toggle 2 */}
                    <div className="flex items-center justify-between p-5 bg-neutral-900/40 border border-white/5 rounded-2xl">
                      <div>
                        <h4 className="text-white font-bold mb-1">Marketing & Offers</h4>
                        <p className="text-xs text-neutral-500">Receive promotional emails from Safi Academy and partners.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
}