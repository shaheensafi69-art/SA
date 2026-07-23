"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Loader2, Eye, EyeOff, Sparkles } from "lucide-react";

// کامپوننت تایپر متن برای ایجاد حس زنده بودن
function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <span className="text-neutral-300 font-medium">
      {displayText}
      <span className="animate-pulse text-yellow-400">|</span>
    </span>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [selectedRoleTab, setSelectedRoleTab] = useState<"student" | "teacher" | "super_admin">("student");
  const [userData, setUserData] = useState<{ first_name: string; last_name: string; avatar_url: string; role: string } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

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

      if (error) throw error;

      if (data.session) {
        const { data: finalProfile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", data.session.user.id)
            .single();
            
        const finalRole = finalProfile?.role || 'student';

        if(finalRole !== selectedRoleTab) {
            await supabase.auth.signOut();
            setErrorMsg(`Access Denied: Your account role (${finalRole}) does not match the selected login portal.`);
            setIsLoading(false);
            return;
        }

        if (finalRole === "super_admin") {
            window.location.href = "/en/admin";
        } else if (finalRole === "teacher") {
            window.location.href = "/en/teacher";
        } else {
            window.location.href = "/en/dashboard";
        }
      }
    } catch (error: any) {
      setErrorMsg(error.message || "Invalid email or password.");
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[#020202] text-white flex flex-col lg:grid lg:grid-cols-2 font-sans overflow-hidden relative">
      
      {/* 🌟 پس‌زمینه تمام صفحه پرستاره و کهکشانی */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter brightness-[0.3] scale-105 pointer-events-none"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2070&auto=format&fit=crop')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-black/60 pointer-events-none" />

      {/* ستون چپ: فرم لاگین فیکس بدون نیاز به اسکرول */}
      <div className="flex flex-col justify-center items-center h-full relative z-10 overflow-hidden px-4">
        <div className="w-full max-w-md mx-auto">
          
          {/* لوگو و عنوان */}
          <div className="text-center mb-5 flex flex-col items-center shrink-0">
            <Link href="/en" className="inline-block mb-2 transition-transform hover:scale-105 duration-300">
               <div className="relative w-16 h-16 flex items-center justify-center mx-auto">
                 <div className="absolute inset-0 bg-yellow-500/20 blur-[15px] rounded-full"></div>
                 <img src="/logo-without-b.png" alt="Safi Academy Logo" className="relative z-10 w-full h-full object-contain drop-shadow-[0_6px_12px_rgba(234,179,8,0.3)]" />
               </div>
            </Link>
            <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              Welcome Back <Sparkles size={16} className="text-yellow-400 animate-spin" style={{ animationDuration: '5s' }} />
            </h1>
            <p className="text-xs text-neutral-400 h-5 mt-1">
              <TypewriterText text="Step into your digital campus and master your skills." />
            </p>
          </div>

          {/* تب‌های انتخاب نقش */}
          <div className="w-full flex bg-neutral-950/90 p-1.5 rounded-2xl border border-white/10 mb-4 backdrop-blur-xl shadow-2xl shrink-0">
              <button 
                  onClick={() => setSelectedRoleTab("student")}
                  className={`flex-1 py-2 text-[11px] font-black uppercase tracking-wider rounded-xl transition-all duration-300 ${selectedRoleTab === "student" ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]" : "text-neutral-400 hover:text-white"}`}
              >
                  Student
              </button>
              <button 
                  onClick={() => setSelectedRoleTab("teacher")}
                  className={`flex-1 py-2 text-[11px] font-black uppercase tracking-wider rounded-xl transition-all duration-300 ${selectedRoleTab === "teacher" ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]" : "text-neutral-400 hover:text-white"}`}
              >
                  Instructor
              </button>
              <button 
                  onClick={() => setSelectedRoleTab("super_admin")}
                  className={`flex-1 py-2 text-[11px] font-black uppercase tracking-wider rounded-xl transition-all duration-300 ${selectedRoleTab === "super_admin" ? "bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]" : "text-neutral-400 hover:text-white"}`}
              >
                  Admin
              </button>
          </div>

          {/* کارت شیشه‌ای اصلی لاگین */}
          <div className="bg-[#0a0a0f]/90 p-6 sm:p-7 rounded-[2rem] border border-white/10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/20 via-transparent to-amber-500/20 rounded-[2.1rem] opacity-30 blur group-hover:opacity-60 transition duration-700 pointer-events-none"></div>

            <div className="relative z-10">
              {errorMsg && (
                <div className="bg-red-500/15 border border-red-500/30 text-red-400 px-3 py-2 rounded-xl text-xs font-bold mb-3 text-center">
                  {errorMsg}
                </div>
              )}

              {userData && (
                <div className="flex flex-col items-center mb-3 animate-[fadeIn_0.3s_ease-out]">
                  <div className={`w-12 h-12 rounded-full overflow-hidden border-2 shadow-lg mb-1 bg-neutral-900 flex items-center justify-center ${
                      selectedRoleTab === 'super_admin' ? 'border-purple-500' : selectedRoleTab === 'teacher' ? 'border-blue-500' : 'border-yellow-500'
                  }`}>
                     {userData.avatar_url ? (
                       <img src={userData.avatar_url} alt={userData.first_name} className="w-full h-full object-cover" />
                     ) : (
                       <span className={`text-base font-bold ${selectedRoleTab === 'super_admin' ? 'text-purple-400' : selectedRoleTab === 'teacher' ? 'text-blue-400' : 'text-yellow-400'}`}>{userData.first_name.charAt(0)}</span>
                     )}
                  </div>
                  <h3 className="text-xs font-bold text-white">Welcome back, <span className="text-yellow-400">{userData.first_name}</span>!</h3>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-3.5" autoComplete="on">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Email Address</label>
                  <div className="relative">
                    <input 
                      required 
                      type="email" 
                      name="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com" 
                      className="w-full bg-black/70 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-500 transition-all shadow-inner"
                      autoComplete="email"
                    />
                    {isSearching && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Loader2 className="animate-spin h-4 w-4 text-yellow-400" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Password</label>
                    <Link href="/en/forgot-password" className="text-[10px] text-yellow-400 hover:text-yellow-300 font-bold transition-colors">Forgot?</Link>
                  </div>
                  <div className="relative">
                    <input 
                      required 
                      type={showPassword ? "text" : "password"} 
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                      placeholder="••••••••" 
                      className="w-full bg-black/70 border border-white/10 rounded-xl px-3.5 py-2.5 pr-9 text-xs text-white focus:outline-none focus:border-yellow-500 transition-all shadow-inner"
                      autoComplete="current-password"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors">
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className={`w-full py-3 mt-2 font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2 ${
                      selectedRoleTab === 'super_admin' ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-[0_10px_25px_rgba(168,85,247,0.4)]' : 
                      selectedRoleTab === 'teacher' ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-[0_10px_25px_rgba(59,130,246,0.4)]' : 
                      'bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-[0_10px_25px_rgba(234,179,8,0.4)]'
                  }`}
                >
                  {isLoading ? <><Loader2 size={14} className="animate-spin" /> Authenticating...</> : "Sign In & Access Portal 🚀"}
                </button>
              </form>

              {selectedRoleTab === 'student' && (
                <div className="mt-4 pt-3 border-t border-white/10 text-center text-xs">
                  <span className="text-neutral-400">Don't have an account?</span>{" "}
                  <Link href="/en/register" className="text-yellow-400 font-bold hover:text-yellow-300 transition-colors ml-1">
                    Create one
                  </Link>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ستون راست: فضای ۳D زنده با کاراکتر فضانورد شناور (دقیقاً مثل صفحه ثبت‌نام) */}
      <div className="hidden lg:relative lg:flex flex-col justify-end overflow-hidden">
        
        <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
          <img 
            src="https://i.ibb.co/HTZ6DPsS/original-33b8479c324a5448d6145b3cad7c51e7-removebg-preview.png" 
            alt="3D Astronaut Space Character" 
            className="w-[85%] h-[85%] object-contain drop-shadow-[0_20px_50px_rgba(234,179,8,0.2)] animate-float"
          />
        </div>

        <div className="relative z-10 p-10 pb-14 flex flex-col items-center text-center bg-gradient-to-t from-[#020202] via-transparent to-transparent">
          <blockquote className="space-y-2 max-w-md">
            <p className="text-lg font-bold tracking-tight text-white leading-relaxed drop-shadow-md">
              “Education is the passport to the future, for tomorrow belongs to those who prepare for it today.”
            </p>
            <cite className="block text-[10px] font-black uppercase tracking-[0.25em] text-yellow-400 not-italic">
              — Safi Academy Learning Philosophy
            </cite>
          </blockquote>
        </div>
      </div>

      {/* استایل انیمیشن شناور سه‌بعدی */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(2deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
}