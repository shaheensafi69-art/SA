"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // نقش انتخاب شده توسط کاربر در UI (تب‌های بالای فرم)
  const [selectedRoleTab, setSelectedRoleTab] = useState<"student" | "teacher" | "super_admin">("student");
  
  // اطلاعات کاربر پیدا شده در دیتابیس (شامل role واقعی)
  const [userData, setUserData] = useState<{ first_name: string; last_name: string; avatar_url: string; role: string } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // جستجوی زنده ایمیل کاربر و پیدا کردن نقش او
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!email.includes("@") || !email.includes(".")) {
        setUserData(null);
        return;
      }

      setIsSearching(true);
      const supabase = createClient();
      
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("first_name, last_name, avatar_url, role")
          .eq("email", email.toLowerCase().trim())
          .single();

        if (data && !error) {
          setUserData(data as any);
          
          // اگر خواستید سیستم هوشمندتر باشد، به محض پیدا کردن ایمیل، 
          // تب مربوطه را برایش فعال کنید (این کار اختیاری است، ولی UI را جذاب‌تر می‌کند)
          if(data.role === 'super_admin' || data.role === 'teacher' || data.role === 'student'){
              setSelectedRoleTab(data.role);
          }

        } else {
          setUserData(null);
        }
      } catch (err) {
        setUserData(null);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchUserProfile();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [email]);

  // منطق اصلی لاگین و اعتبارسنجی نقش
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    // ۱. قبل از ارسال به سرور، نقش انتخابی را با نقش واقعی دیتابیس چک می‌کنیم
    if (userData && userData.role !== selectedRoleTab) {
      setErrorMsg(`Access Denied: You are not authorized to login as a ${selectedRoleTab.replace('_', ' ')}.`);
      setIsLoading(false);
      return;
    }

    const supabase = createClient();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // ۲. اگر لاگین موفق بود، کاربر را بر اساس نقشش به مسیر درست هدایت کن
      if (data.session) {
        // برای اطمینان مجدد، نقش را از دیتابیس می‌گیریم (چون ممکن است کاربر قبل از تایپ کامل ایمیل دکمه را زده باشد)
        const { data: finalProfile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", data.session.user.id)
            .single();
            
        const finalRole = finalProfile?.role || 'student';

        // اگر کاربری سعی کرد نقش دیگری را در UI انتخاب کند اما نقش واقعی‌اش فرق داشت
        if(finalRole !== selectedRoleTab) {
            await supabase.auth.signOut();
            setErrorMsg(`Access Denied: Your account role (${finalRole}) does not match the selected login portal.`);
            setIsLoading(false);
            return;
        }

        // هدایت هوشمند به پوشه‌های ایزوله‌ای که ساختیم
        if (finalRole === "super_admin") {
            router.push("/en/admin");
        } else if (finalRole === "teacher") {
            router.push("/en/teacher");
        } else {
            router.push("/en/dashboard");
        }
      }
    } catch (error: any) {
      setErrorMsg(error.message || "Invalid email or password.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#050505]">
      
      {/* پس‌زمینه‌ها */}
      <div className="absolute top-[-5%] left-[-15%] w-[60vw] h-[60vw] opacity-5 pointer-events-none rotate-[-15deg] blur-sm mix-blend-screen">
        <img src="/logo-without-b.png" alt="Safi Academy Watermark" className="w-full h-full object-contain grayscale" />
      </div>
      <div className="absolute bottom-[-10%] right-[-15%] w-[70vw] h-[70vw] opacity-[0.03] pointer-events-none rotate-[20deg] blur-md mix-blend-screen">
        <img src="/logo-without-b.png" alt="Safi Academy Watermark" className="w-full h-full object-contain grayscale" />
      </div>

      <div className={`absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full blur-[150px] pointer-events-none animate-pulse ${selectedRoleTab === 'super_admin' ? 'bg-purple-600/10' : selectedRoleTab === 'teacher' ? 'bg-blue-600/10' : 'bg-yellow-600/10'}`}></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none animate-[pulse_4s_ease-in-out_infinite]"></div>

      <div className="w-full max-w-lg relative z-10 mt-10 mb-10">
        
        <div className="text-center mb-8 flex flex-col items-center">
          <Link href="/en" className="inline-block mb-2 transition-transform hover:scale-105 duration-300">
             <div className="relative w-40 h-40 flex items-center justify-center mx-auto">
               <img src="/logo-without-b.png" alt="Safi Academy Logo" className="w-full h-full object-contain" />
             </div>
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">Welcome Back</h1>
          <p className="text-neutral-400 text-sm">Select your portal and sign in securely.</p>
        </div>

        {/* ================= تب‌های انتخاب نقش ================= */}
        <div className="flex bg-neutral-900/60 p-1.5 rounded-2xl border border-white/5 mb-6 backdrop-blur-md">
            <button 
                onClick={() => setSelectedRoleTab("student")}
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${selectedRoleTab === "student" ? "bg-yellow-500 text-black shadow-md" : "text-neutral-400 hover:text-white"}`}
            >
                Student
            </button>
            <button 
                onClick={() => setSelectedRoleTab("teacher")}
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${selectedRoleTab === "teacher" ? "bg-blue-600 text-white shadow-md" : "text-neutral-400 hover:text-white"}`}
            >
                Instructor
            </button>
            <button 
                onClick={() => setSelectedRoleTab("super_admin")}
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${selectedRoleTab === "super_admin" ? "bg-purple-600 text-white shadow-md" : "text-neutral-400 hover:text-white"}`}
            >
                Admin
            </button>
        </div>

        {/* فرم لاگین */}
        <div className="bg-neutral-900/40 p-8 md:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500">
          
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 rounded-xl text-center text-sm font-bold mb-6">
              {errorMsg}
            </div>
          )}

          <div className={`overflow-hidden transition-all duration-500 ease-in-out flex flex-col items-center justify-center ${userData ? 'max-h-48 opacity-100 mb-8' : 'max-h-0 opacity-0 mb-0'}`}>
            {userData && (
              <div className="flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
                <div className={`w-20 h-20 rounded-full overflow-hidden border-2 shadow-lg mb-3 bg-neutral-800 flex items-center justify-center ${
                    selectedRoleTab === 'super_admin' ? 'border-purple-500' : selectedRoleTab === 'teacher' ? 'border-blue-500' : 'border-yellow-500'
                }`}>
                   {userData.avatar_url ? (
                     <img src={userData.avatar_url} alt={userData.first_name} className="w-full h-full object-cover" />
                   ) : (
                     <span className={`text-2xl font-bold ${selectedRoleTab === 'super_admin' ? 'text-purple-500' : selectedRoleTab === 'teacher' ? 'text-blue-500' : 'text-yellow-500'}`}>{userData.first_name.charAt(0)}</span>
                   )}
                </div>
                <h3 className="text-lg font-bold text-white">Hi, {userData.first_name}! 👋</h3>
                <p className="text-xs text-neutral-400 mt-1 capitalize">{userData.role.replace('_', ' ')} Portal</p>
              </div>
            )}
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2 relative group">
              <label className="text-xs font-bold text-neutral-300 ml-1">Email Address</label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 transition-colors ${selectedRoleTab === 'super_admin' ? 'group-focus-within:text-purple-500' : selectedRoleTab === 'teacher' ? 'group-focus-within:text-blue-500' : 'group-focus-within:text-yellow-500'}`}>
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <input 
                  required 
                  type="email" 
                  name="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  className={`w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-10 py-3.5 text-white focus:outline-none focus:bg-black/60 focus:ring-2 transition-all ${
                      selectedRoleTab === 'super_admin' ? 'focus:border-purple-500/50 focus:ring-purple-500/20' : 
                      selectedRoleTab === 'teacher' ? 'focus:border-blue-500/50 focus:ring-blue-500/20' : 
                      'focus:border-yellow-500/50 focus:ring-yellow-500/20'
                  }`}
                />
                {isSearching && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <svg className="animate-spin h-4 w-4 text-neutral-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2 relative group">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-neutral-300">Password</label>
                <Link href="/en/forgot-password" className="text-[10px] text-neutral-400 hover:text-white font-bold transition-colors">Forgot Password?</Link>
              </div>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 transition-colors ${selectedRoleTab === 'super_admin' ? 'group-focus-within:text-purple-500' : selectedRoleTab === 'teacher' ? 'group-focus-within:text-blue-500' : 'group-focus-within:text-yellow-500'}`}>
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <input 
                  required 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  className={`w-full bg-black/40 border border-white/5 rounded-xl pl-12 pr-12 py-3.5 text-white focus:outline-none focus:bg-black/60 focus:ring-2 transition-all ${
                      selectedRoleTab === 'super_admin' ? 'focus:border-purple-500/50 focus:ring-purple-500/20' : 
                      selectedRoleTab === 'teacher' ? 'focus:border-blue-500/50 focus:ring-blue-500/20' : 
                      'focus:border-yellow-500/50 focus:ring-yellow-500/20'
                  }`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors">
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-4 mt-2 font-extrabold text-lg rounded-xl transition-all hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-3 ${
                  selectedRoleTab === 'super_admin' ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-[0_10px_30px_rgba(168,85,247,0.3)]' : 
                  selectedRoleTab === 'teacher' ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-[0_10px_30px_rgba(59,130,246,0.3)]' : 
                  'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-[0_10px_30px_rgba(234,179,8,0.3)]'
              }`}
            >
              {isLoading ? "Authenticating..." : "Sign In 🚀"}
            </button>
          </form>

          {/* متن ثبت نام فقط برای دانشجوها (چون اساتید و ادمین‌ها فقط توسط شما ثبت می‌شوند) */}
          {selectedRoleTab === 'student' && (
              <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <p className="text-xs text-neutral-400">
                  Don't have an account? <Link href="/en/register" className="text-yellow-500 font-bold hover:text-yellow-400 transition-colors ml-1">Create one</Link>
                </p>
              </div>
          )}
        </div>
      </div>
    </main>
  );
}