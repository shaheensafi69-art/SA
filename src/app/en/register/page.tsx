"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";

// کامپوننت اصلی فرم که داخل Suspense قرار می‌گیرد
function RegisterFormContent() {
  const searchParams = useSearchParams();
  const refCode = searchParams?.get("ref") || ""; // گرفتن کد ریفرال از لینک

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
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
    const bio = formData.get("bio") as string;
    const referralInput = formData.get("referral_code") as string;

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please ensure both fields are identical.");
      setIsLoading(false);
      return;
    }

    const supabase = createClient();

    try {
      let validReferrerId = null;
      if (referralInput) {
        const { data: referrerData, error: refError } = await supabase
          .from('profiles')
          .select('id')
          .eq('referral_code', referralInput.toUpperCase())
          .single();
        
        if (refError || !referrerData) {
          throw new Error("The Referral Code you entered is invalid. Please check it or leave it blank.");
        }
        validReferrerId = referrerData.id;
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      const userId = authData.user?.id;
      if (!userId) throw new Error("Failed to create secure user ID.");

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
        bio: bio || "",
        role: 'student' 
      });

      if (profileError) throw profileError;

      if (validReferrerId) {
        await supabase.from('referrals').insert({
          referrer_id: validReferrerId,
          referred_student_id: userId,
          reward_amount: 5,
          is_paid: false
        });
      }

      // پیام موفقیت بسیار شیک و انتقال به داشبورد
      setSuccessMsg("Identity Verified & Node Created! 🚀 Establishing secure connection to your headquarters. Syncing profile data and preparing your digital empire...");
      
      setTimeout(() => {
        window.location.href = "/en/dashboard"; 
      }, 3500);

    } catch (error: any) {
      setErrorMsg(error.message || "An unexpected error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl relative z-10 mt-10 mb-10">
      <div className="text-center mb-10 flex flex-col items-center animate-[fadeInDown_0.5s_ease-out]">
        <Link href="/en" className="inline-block mb-2 transition-transform hover:scale-105 duration-300">
           <div className="relative w-40 h-40 flex items-center justify-center mx-auto">
             <div className="absolute inset-0 bg-yellow-500/20 blur-[30px] rounded-full"></div>
             <img src="/logo-without-b.png" alt="Safi Academy Logo" className="relative z-10 w-full h-full object-contain drop-shadow-[0_10px_25px_rgba(234,179,8,0.3)]" />
           </div>
        </Link>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">Create Your Account</h1>
        <p className="text-neutral-400 text-base md:text-lg max-w-xl mx-auto font-medium">Join Safi Academy and unlock your potential in global E-Commerce, Tech, and Financial Markets.</p>
      </div>

      <div className="bg-[#0a0a0f]/80 p-6 sm:p-10 md:p-12 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] animate-[fadeInUp_0.5s_ease-out]">
        
        {successMsg ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 animate-[fadeIn_0.5s_ease-out]">
            <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)] mb-4">
              <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Registration Complete!</h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-md leading-relaxed">{successMsg}</p>
            <Loader2 className="w-8 h-8 text-yellow-500 animate-spin mt-4" />
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-8">
            
            {/* آپلود عکس پروفایل */}
            <div className="flex flex-col items-center justify-center space-y-4 mb-10">
              <div className="relative group cursor-pointer">
                <input 
                  type="file" accept="image/*" required name="avatar" onChange={handlePhotoChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                />
                <div className={`w-32 h-32 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 shadow-2xl ${photoPreview ? 'border-2 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.2)]' : 'border-2 border-dashed border-white/20 group-hover:border-yellow-500 bg-black/40 group-hover:bg-black/60'}`}>
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
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Upload ID Photo *</p>
            </div>

            {/* Grid 1: Personal Info */}
            <div className="grid md:grid-cols-2 gap-6 border-b border-white/5 pb-8">
              <div className="space-y-2 relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">First Name *</label>
                <input required type="text" name="first_name" placeholder="John" className="w-full bg-black/60 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-black shadow-inner transition-all"/>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Last Name *</label>
                <input required type="text" name="last_name" placeholder="Doe" className="w-full bg-black/60 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-black shadow-inner transition-all"/>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Father's Name *</label>
                <input required type="text" name="father_name" placeholder="Michael Doe" className="w-full bg-black/60 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-black shadow-inner transition-all"/>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Date of Birth *</label>
                <input required type="date" name="date_of_birth" className="w-full bg-black/60 border border-white/5 rounded-2xl px-5 py-4 text-neutral-300 focus:outline-none focus:border-yellow-500/50 focus:bg-black shadow-inner transition-all [color-scheme:dark]"/>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Country / Node *</label>
                <input required type="text" name="country" placeholder="United Kingdom" className="w-full bg-black/60 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-black shadow-inner transition-all"/>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Phone Number *</label>
                <input required type="tel" name="phone_number" placeholder="+44 20 1234 5678" className="w-full bg-black/60 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-black shadow-inner transition-all font-mono"/>
              </div>
            </div>

            {/* Grid 2: Additional Info */}
            <div className="grid md:grid-cols-2 gap-6 border-b border-white/5 pb-8">
              <div className="space-y-2 relative group md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Professional Biography</label>
                <textarea name="bio" rows={3} placeholder="Tell us a bit about your goals, background, or current profession..." className="w-full bg-black/60 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-black shadow-inner transition-all resize-y custom-scrollbar"></textarea>
              </div>

              <div className="space-y-2 relative group md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1 flex items-center gap-2">
                  Referral Code <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2 py-0.5 rounded text-[8px]">Optional</span>
                </label>
                {/* خواندن اتوماتیک کد از لینک */}
                <input type="text" name="referral_code" defaultValue={refCode} placeholder="e.g. SAFI-X9A2B" className="w-full bg-black/60 border border-white/5 rounded-2xl px-5 py-4 text-yellow-500 font-mono font-bold tracking-widest focus:outline-none focus:border-yellow-500/50 focus:bg-black shadow-inner transition-all uppercase placeholder:text-neutral-600"/>
                <p className="text-[10px] text-neutral-500 ml-1 mt-1">Enter a friend's referral code to unlock a 5% tuition discount.</p>
              </div>
            </div>

            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-2xl text-xs font-bold flex items-center gap-3">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {errorMsg}
              </div>
            )}

            {/* Grid 3: Credentials */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 relative group md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Email Address *</label>
                <input required type="email" name="email" placeholder="john@safipro.site" className="w-full bg-black/60 border border-white/5 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-black shadow-inner transition-all"/>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Password *</label>
                <div className="relative">
                  <input required type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" className="w-full bg-black/60 border border-white/5 rounded-2xl px-5 py-4 pr-12 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-black shadow-inner transition-all"/>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-yellow-500 transition-colors">
                    {showPassword ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>}
                  </button>
                </div>
              </div>

              <div className="space-y-2 relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Confirm Password *</label>
                <div className="relative">
                  <input required type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="••••••••" className="w-full bg-black/60 border border-white/5 rounded-2xl px-5 py-4 pr-12 text-white focus:outline-none focus:border-yellow-500/50 focus:bg-black shadow-inner transition-all"/>
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-yellow-500 transition-colors">
                    {showConfirmPassword ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>}
                  </button>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-5 mt-6 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-[0_10px_30px_rgba(234,179,8,0.3)] hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0 disabled:active:scale-100 disabled:shadow-none flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <><Loader2 size={18} className="animate-spin" /> Authorizing Profile...</>
              ) : (
                "Create Account & Enter Ecosystem"
              )}
            </button>
            
            <p className="text-center text-neutral-600 text-[10px] font-bold uppercase tracking-widest mt-4">
              By creating an account, you agree to Safi Academy's Terms of Service and Privacy Protocols.
            </p>

          </form>
        )}

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-neutral-400 text-sm">
            Already possess an identity node? <Link href="/en/login" className="text-yellow-500 font-bold hover:text-yellow-400 transition-colors ml-1">Sign In Securely</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// رپر اصلی برای جلوگیری از ارور Suspense در Next.js
export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 relative overflow-hidden bg-[#020202] font-sans">
      <div className="absolute top-[-5%] left-[-15%] w-[60vw] h-[60vw] opacity-[0.03] pointer-events-none rotate-[-15deg] blur-sm mix-blend-screen">
        <img src="/logo-without-b.png" alt="Watermark" className="w-full h-full object-contain grayscale" />
      </div>
      <div className="absolute bottom-[-10%] right-[-15%] w-[70vw] h-[70vw] opacity-[0.02] pointer-events-none rotate-[20deg] blur-md mix-blend-screen">
        <img src="/logo-without-b.png" alt="Watermark" className="w-full h-full object-contain grayscale" />
      </div>
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-yellow-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-amber-900/10 rounded-full blur-[150px] pointer-events-none animate-[pulse_4s_ease-in-out_infinite]"></div>

      <Suspense fallback={<div className="flex flex-col items-center"><Loader2 className="w-10 h-10 text-yellow-500 animate-spin"/><p className="mt-4 text-yellow-500 font-bold tracking-widest text-xs">INITIALIZING...</p></div>}>
        <RegisterFormContent />
      </Suspense>
    </main>
  );
}