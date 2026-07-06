"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client"; // فراخوانی سوپابیس

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  // استیت‌های مربوط به نمایش/مخفی کردن پسوردها
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // استیت برای پیش‌نمایش و نگهداری فایل عکس پروفایل
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    // ۱. دریافت تمام اطلاعات فرم
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const firstName = formData.get("first_name") as string;
    const lastName = formData.get("last_name") as string;
    const fatherName = formData.get("father_name") as string;
    const dob = formData.get("date_of_birth") as string;
    const country = formData.get("country") as string;
    const phone = formData.get("phone_number") as string;

    // ۲. چک کردن تطابق پسوردها
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please try again.");
      setIsLoading(false);
      return;
    }

    const supabase = createClient();

    try {
      // ۳. ثبت‌نام کاربر در سیستم احراز هویت سوپابیس (Auth)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      const userId = authData.user?.id;
      if (!userId) throw new Error("Failed to create user ID.");

      // ۴. آپلود عکس پروفایل در استوریج سوپابیس
      let avatar_url = "";
      if (photoFile) {
        const fileExt = photoFile.name.split('.').pop();
        const fileName = `${userId}-${Math.random()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, photoFile);
          
        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(fileName);
          avatar_url = publicUrlData.publicUrl;
        } else {
          console.error("Image upload failed:", uploadError);
        }
      }

      // ۵. ثبت اطلاعات تکمیلی در جدول profiles
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: userId,
        first_name: firstName,
        last_name: lastName,
        father_name: fatherName,
        date_of_birth: dob,
        country: country,
        phone_number: phone,
        email: email,
        avatar_url: avatar_url,
        role: 'student' 
      });

      if (profileError) throw profileError;

      // ۶. نمایش پیام موفقیت و انتقال مستقیم به داشبورد
      setSuccessMsg("Account created successfully! Preparing your dashboard...");
      setTimeout(() => {
        router.push("/en/dashboard"); // <-- تغییر مسیر به داشبورد
      }, 2000); // زمان انتظار را به ۲ ثانیه کاهش دادم تا کاربر سریع‌تر وارد شود

    } catch (error: any) {
      setErrorMsg(error.message || "An unexpected error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#050505]">
      
      {/* واترمارک‌های لوگو در پس‌زمینه */}
      <div className="absolute top-[-5%] left-[-15%] w-[60vw] h-[60vw] opacity-5 pointer-events-none rotate-[-15deg] blur-sm mix-blend-screen">
        <img src="/logo-without-b.png" alt="Safi Academy Watermark" className="w-full h-full object-contain grayscale" />
      </div>
      <div className="absolute bottom-[-10%] right-[-15%] w-[70vw] h-[70vw] opacity-[0.03] pointer-events-none rotate-[20deg] blur-md mix-blend-screen">
        <img src="/logo-without-b.png" alt="Safi Academy Watermark" className="w-full h-full object-contain grayscale" />
      </div>

      {/* افکت‌های نوری کهکشانی */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-yellow-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none animate-[pulse_4s_ease-in-out_infinite]"></div>

      <div className="w-full max-w-4xl relative z-10 mt-10 mb-10">
        
        {/* هدر شامل لوگو اصلی و تایتل */}
        <div className="text-center mb-10 flex flex-col items-center">
          <Link href="/en" className="inline-block mb-2 transition-transform hover:scale-105 duration-300">
             <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center mx-auto">
               <img src="/logo-without-b.png" alt="Safi Academy Logo" className="w-full h-full object-contain drop-shadow-[0_10px_25px_rgba(234,179,8,0.3)]" />
             </div>
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">Create Your Account</h1>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">Join Safi Academy and unlock your financial potential in global markets.</p>
        </div>

        {/* فرم ثبت‌نام شیشه‌ای و پریمیوم */}
        <div className="bg-neutral-900/40 p-8 md:p-12 rounded-[2.5rem] border border-white/5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleRegister} className="space-y-8">
            
            {/* 1. بخش آپلود عکس پروفایل */}
            <div className="flex flex-col items-center justify-center space-y-4 mb-10">
              <div className="relative group cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*" 
                  required 
                  name="avatar"
                  onChange={handlePhotoChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className={`w-32 h-32 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 shadow-2xl ${photoPreview ? 'border-2 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]' : 'border-2 border-dashed border-white/20 group-hover:border-yellow-500 bg-black/40 group-hover:bg-black/60'}`}>
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-10 h-10 text-neutral-500 group-hover:text-yellow-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  )}
                </div>
                <div className="absolute bottom-1 right-1 bg-gradient-to-br from-yellow-400 to-yellow-600 text-black w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-4 border-[#0a0a0a] z-10 transform group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
                </div>
              </div>
              <p className="text-sm font-semibold text-neutral-400 tracking-wide">Upload Professional Photo *</p>
            </div>

            {/* بخش اطلاعات شخصی */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 relative group">
                <label className="text-sm font-bold text-neutral-300 ml-1">First Name *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-yellow-500 transition-colors">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </div>
                  <input required type="text" name="first_name" placeholder="John" className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-black/60 focus:ring-4 focus:ring-yellow-500/10 transition-all"/>
                </div>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-sm font-bold text-neutral-300 ml-1">Last Name *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-yellow-500 transition-colors">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg>
                  </div>
                  <input required type="text" name="last_name" placeholder="Doe" className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-black/60 focus:ring-4 focus:ring-yellow-500/10 transition-all"/>
                </div>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-sm font-bold text-neutral-300 ml-1">Father's Name *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-yellow-500 transition-colors">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  </div>
                  <input required type="text" name="father_name" placeholder="Michael Doe" className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-black/60 focus:ring-4 focus:ring-yellow-500/10 transition-all"/>
                </div>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-sm font-bold text-neutral-300 ml-1">Date of Birth *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-yellow-500 transition-colors">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                  <input required type="date" name="date_of_birth" className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-5 py-4 text-neutral-300 focus:outline-none focus:border-yellow-500/50 focus:bg-black/60 focus:ring-4 focus:ring-yellow-500/10 transition-all [color-scheme:dark]"/>
                </div>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-sm font-bold text-neutral-300 ml-1">Country *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-yellow-500 transition-colors">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <input required type="text" name="country" placeholder="United Kingdom" className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-black/60 focus:ring-4 focus:ring-yellow-500/10 transition-all"/>
                </div>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-sm font-bold text-neutral-300 ml-1">Phone Number *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-yellow-500 transition-colors">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <input required type="tel" name="phone_number" placeholder="+44 20 1234 5678" className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-black/60 focus:ring-4 focus:ring-yellow-500/10 transition-all"/>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-8 my-8"></div>

            {/* نمایش پیغام‌های خطا یا موفقیت */}
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl text-center font-bold">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-6 py-4 rounded-xl text-center font-bold">
                {successMsg}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2 relative group">
                <label className="text-sm font-bold text-neutral-300 ml-1">Email Address *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-yellow-500 transition-colors">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <input required type="email" name="email" placeholder="shaheen@safipro.site" className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-5 py-4 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-black/60 focus:ring-4 focus:ring-yellow-500/10 transition-all"/>
                </div>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-sm font-bold text-neutral-300 ml-1">Password *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-yellow-500 transition-colors">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </div>
                  <input required type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-12 py-4 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-black/60 focus:ring-4 focus:ring-yellow-500/10 transition-all"/>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-yellow-500 transition-colors">
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-sm font-bold text-neutral-300 ml-1">Confirm Password *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-yellow-500 transition-colors">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                  </div>
                  <input required type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="••••••••" className="w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-12 py-4 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-black/60 focus:ring-4 focus:ring-yellow-500/10 transition-all"/>
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-yellow-500 transition-colors">
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-5 mt-6 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-extrabold text-xl rounded-xl transition-all shadow-[0_10px_30px_rgba(234,179,8,0.3)] hover:shadow-[0_15px_40px_rgba(234,179,8,0.4)] hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-6 w-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </>
              ) : (
                "Create Account 🚀"
              )}
            </button>
            
            <p className="text-center text-neutral-500 text-xs mt-4">
              By creating an account, you agree to Safi Academy's Terms of Service and Privacy Policy.
            </p>

          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-neutral-400">
              Already have an account? <Link href="/en/login" className="text-yellow-500 font-bold hover:text-yellow-400 transition-colors ml-2">Sign In securely</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}