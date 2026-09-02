"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { uploadFileToR2 } from "@/utils/upload";
import { Loader2, Eye, EyeOff, Sparkles, ArrowRight, ArrowLeft, Mail, ShieldCheck } from "lucide-react";

// ==========================================
// 0. CUSTOM CONFETTI EFFECT (جشن گل‌ها)
// ==========================================
function ConfettiEffect() {
  const [pieces, setPieces] = useState<any[]>([]);

  useEffect(() => {
    // تولید ۵۰ تکه کاغذ رنگی با موقعیت و سرعت تصادفی
    const colors = ['#facc15', '#3b82f6', '#ec4899', '#10b981', '#ffffff'];
    const newPieces = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 2}s`,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      rotate: `${Math.random() * 360}deg`,
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute top-[-10vh] w-2.5 h-4 opacity-90 animate-confetti-fall rounded-sm shadow-sm"
          style={{
            left: piece.left,
            backgroundColor: piece.backgroundColor,
            animationDuration: piece.animationDuration,
            animationDelay: piece.animationDelay,
            transform: `rotate(${piece.rotate})`,
          }}
        />
      ))}
    </div>
  );
}

// ==========================================
// 1. TYPEWRITER COMPONENT FOR BRAND SIDEBAR
// ==========================================
export interface TypewriterProps {
  text: string | string[];
  speed?: number;
  cursor?: string;
  loop?: boolean;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
}

export function Typewriter({
  text,
  speed = 100,
  cursor = "|",
  loop = false,
  deleteSpeed = 50,
  delay = 1500,
  className,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);

  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textArrayIndex] || "";

  useEffect(() => {
    if (!currentText) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < currentText.length) {
            setDisplayText((prev) => prev + currentText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else if (loop) {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText((prev) => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(0);
            setTextArrayIndex((prev) => (prev + 1) % textArray.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    );

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, currentText, loop, speed, deleteSpeed, delay, displayText, textArray]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">{cursor}</span>
    </span>
  );
}

// ==========================================
// 2. MULTI-STEP REGISTER FORM COMPONENT
// ==========================================
function RegisterFormContent() {
  const searchParams = useSearchParams();
  const refCode = searchParams?.get("ref") || "";

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [formDataState, setFormDataState] = useState({
    first_name: "",
    last_name: "",
    father_name: "",
    date_of_birth: "",
    country: "",
    phone_number: "",
    bio: "",
    referral_code: refCode,
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormDataState({ ...formDataState, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const nextStep = () => {
    setErrorMsg(null);
    if (step === 1) {
      if (!photoFile) {
        setErrorMsg("Please upload your ID profile photo.");
        return;
      }
      if (!formDataState.first_name || !formDataState.last_name || !formDataState.father_name || !formDataState.date_of_birth) {
        setErrorMsg("Please fill in all required personal details.");
        return;
      }
    } else if (step === 2) {
      if (!formDataState.country || !formDataState.phone_number) {
        setErrorMsg("Please fill in your location and phone number.");
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setErrorMsg(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    if (formDataState.password !== formDataState.confirmPassword) {
      setErrorMsg("Passwords do not match. Please ensure both fields are identical.");
      setIsLoading(false);
      return;
    }

    const supabase = createClient();

    try {
      let validReferrerId = null;
      if (formDataState.referral_code) {
        const { data: referrerData, error: refError } = await supabase
          .from('profiles')
          .select('id')
          .eq('referral_code', formDataState.referral_code.toUpperCase())
          .single();
        
        if (refError || !referrerData) {
          throw new Error("The Referral Code you entered is invalid. Please check it or leave it blank.");
        }
        validReferrerId = referrerData.id;
      }

      // ثبت‌نام در دیتابیس با لینک بازگشتی به صفحه لاگین
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formDataState.email,
        password: formDataState.password,
        options: {
          emailRedirectTo: `${window.location.origin}/en/login`,
        }
      });

      if (authError) throw authError;

      const userId = authData.user?.id;
      if (!userId) throw new Error("Failed to create secure user ID.");

      let avatar_url = "";
      if (photoFile) {
        try {
          avatar_url = await uploadFileToR2(photoFile, 'avatars');
        } catch (err) {
          console.error("Avatar upload error:", err);
        }
      }

      const { error: profileError } = await supabase.from('profiles').upsert({
        id: userId,
        first_name: formDataState.first_name,
        last_name: formDataState.last_name,
        father_name: formDataState.father_name,
        date_of_birth: formDataState.date_of_birth,
        country: formDataState.country,
        phone_number: formDataState.phone_number,
        email: formDataState.email,
        avatar_url: avatar_url,
        bio: formDataState.bio || "",
        role: 'student',
        referred_by: validReferrerId
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

      // فعال‌سازی صفحه موفقیت (جشن)
      setIsSuccess(true);

    } catch (error: any) {
      setErrorMsg(error.message || "An unexpected error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-4 relative z-10">
      
      {/* هدر */}
      {!isSuccess && (
        <div className="text-center mb-6 flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
          <Link href="/en" className="inline-block mb-2 transition-transform hover:scale-105 duration-300">
             <div className="relative w-16 h-16 flex items-center justify-center mx-auto">
               <div className="absolute inset-0 bg-yellow-500/20 blur-[20px] rounded-full"></div>
               <img src="/logo-without-b.png" alt="Safi Academy Logo" className="relative z-10 w-full h-full object-contain drop-shadow-[0_8px_15px_rgba(234,179,8,0.3)]" />
             </div>
          </Link>
          <h1 className="text-2xl font-black text-white tracking-tight">Create Account</h1>
          <p className="text-neutral-400 text-xs">Join Safi Academy digital ecosystem.</p>
        </div>
      )}

      {/* نوار پیشرفت */}
      {!isSuccess && (
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 1 ? 'w-10 bg-yellow-400 shadow-[0_0_10px_#facc15]' : 'w-6 bg-yellow-500/40'}`} />
          <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 2 ? 'w-10 bg-yellow-400 shadow-[0_0_10px_#facc15]' : 'w-6 bg-yellow-500/40'}`} />
          <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 3 ? 'w-10 bg-yellow-400 shadow-[0_0_10px_#facc15]' : 'w-6 bg-yellow-500/40'}`} />
        </div>
      )}

      {/* افکت جشن گل‌ها */}
      {isSuccess && <ConfettiEffect />}

      {/* کارت شیشه‌ای اصلی */}
      <div className="bg-[#0a0a0f]/90 p-6 sm:p-8 rounded-[2rem] border border-white/10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative overflow-hidden">
        
        {isSuccess ? (
          // ==========================================
          // 💎 BILINGUAL CELEBRATION & SUCCESS STATE UI
          // ==========================================
          <div className="flex flex-col items-center justify-center py-4 text-center space-y-5 animate-[fadeInUp_0.6s_ease-out]">
            
            {/* Animated Mail Icon with Glow */}
            <div className="relative mb-2">
              <div className="absolute inset-0 bg-yellow-400/30 blur-[40px] rounded-full animate-pulse"></div>
              <div className="w-20 h-20 bg-gradient-to-tr from-yellow-500/20 to-amber-500/10 rounded-[1.5rem] flex items-center justify-center border border-yellow-500/40 relative shadow-[0_0_50px_rgba(234,179,8,0.3)]">
                <Mail className="w-10 h-10 text-yellow-400" />
              </div>
            </div>
            
            {/* English Texts */}
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight mb-1">Registration Complete!</h2>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Welcome to Safi Academy. We've sent a secure verification link to your email address.
              </p>
            </div>

            {/* User Email */}
            <div className="bg-black/60 border border-white/10 rounded-xl px-6 py-3 shadow-inner w-full">
              <span className="text-yellow-400 font-black text-base tracking-wide">{formDataState.email}</span>
            </div>

            {/* Persian Texts (RTL) */}
            <div className="w-full space-y-1" dir="rtl">
              <h3 className="text-lg font-black text-white tracking-tight">ثبت‌نام با موفقیت انجام شد!</h3>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                به آکادمی صافی خوش آمدید. ما یک لینک تایید امن به آدرس ایمیل شما ارسال کردیم.
              </p>
            </div>

            {/* Warning Box */}
            <div className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl p-4 w-full text-center mt-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
              <p className="text-yellow-400/90 text-[10px] font-black uppercase tracking-[0.1em] mb-3 flex items-center justify-center gap-1">
                <ShieldCheck size={14} /> Action Required / اقدام مورد نیاز
              </p>
              
              <div className="space-y-3">
                <p className="text-neutral-300 text-[11px] leading-relaxed">
                  Please check your inbox and click the verification button to activate your account.
                </p>
                <div className="w-full h-px bg-yellow-500/20"></div>
                <p className="text-neutral-300 text-[11px] leading-relaxed font-medium" dir="rtl">
                  لطفاً وارد صندوق ورودی خود شده و روی دکمه تایید کلیک کنید.<br/>
                  <span className="text-yellow-500/80 font-bold block mt-1">
                    (در صورت عدم مشاهده، حتماً پوشه Spam یا Junk را بررسی نمایید)
                  </span>
                </p>
              </div>
            </div>

            <Link 
              href="/en/login" 
              className="mt-4 w-full py-4 bg-gradient-to-r from-yellow-400 to-amber-500 hover:scale-[1.02] rounded-xl text-black font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(234,179,8,0.25)] flex items-center justify-center gap-2 group"
            >
              Proceed to Login <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* مرحله اول: عکس پروفایل و اطلاعات شخصی */}
            {step === 1 && (
              <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="relative group cursor-pointer">
                    <input type="file" accept="image/*" name="avatar" onChange={handlePhotoChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center overflow-hidden transition-all shadow-lg ${photoPreview ? 'border-2 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.4)]' : 'border-2 border-dashed border-white/20 bg-black/50 hover:bg-black/30'}`}>
                      {photoPreview ? <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" /> : <Sparkles className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform" />}
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">ID Photo *</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1">First Name *</label>
                    <input type="text" name="first_name" value={formDataState.first_name} onChange={handleChange} placeholder="John" className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_10px_rgba(250,204,21,0.1)] transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1">Last Name *</label>
                    <input type="text" name="last_name" value={formDataState.last_name} onChange={handleChange} placeholder="Doe" className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_10px_rgba(250,204,21,0.1)] transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1">Father's Name *</label>
                    <input type="text" name="father_name" value={formDataState.father_name} onChange={handleChange} placeholder="Michael" className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_10px_rgba(250,204,21,0.1)] transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1">Date of Birth *</label>
                    <input type="date" name="date_of_birth" value={formDataState.date_of_birth} onChange={handleChange} className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-neutral-300 focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_10px_rgba(250,204,21,0.1)] transition-all [color-scheme:dark]" />
                  </div>
                </div>
              </div>
            )}

            {/* مرحله دوم: لوکیشن، تلفن و کد ریفرال */}
            {step === 2 && (
              <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1">Country *</label>
                    <input type="text" name="country" value={formDataState.country} onChange={handleChange} placeholder="United Kingdom" className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_10px_rgba(250,204,21,0.1)] transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1">Phone *</label>
                    <input type="tel" name="phone_number" value={formDataState.phone_number} onChange={handleChange} placeholder="+44 20..." className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400 font-mono focus:shadow-[0_0_10px_rgba(250,204,21,0.1)] transition-all" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1">Biography</label>
                  <textarea name="bio" rows={2} value={formDataState.bio} onChange={handleChange} placeholder="Brief background..." className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400 resize-none focus:shadow-[0_0_10px_rgba(250,204,21,0.1)] transition-all"></textarea>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1">Referral Code (Optional)</label>
                  <input type="text" name="referral_code" value={formDataState.referral_code} onChange={handleChange} placeholder="e.g. SAFI-X" className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-yellow-400 font-mono font-bold uppercase focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_10px_rgba(250,204,21,0.1)] transition-all" />
                </div>
              </div>
            )}

            {/* مرحله سوم: ایمیل، رمز عبور و ثبت نهایی */}
            {step === 3 && (
              <div className="space-y-4 animate-[fadeIn_0.3s_ease-out]">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1">Email Address *</label>
                  <input type="email" name="email" value={formDataState.email} onChange={handleChange} placeholder="name@example.com" className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_10px_rgba(250,204,21,0.1)] transition-all" />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1">Password *</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} name="password" value={formDataState.password} onChange={handleChange} placeholder="••••••••" className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 pr-9 text-xs text-white focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_10px_rgba(250,204,21,0.1)] transition-all" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors">
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1">Confirm Password *</label>
                  <div className="relative">
                    <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formDataState.confirmPassword} onChange={handleChange} placeholder="••••••••" className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 pr-9 text-xs text-white focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_10px_rgba(250,204,21,0.1)] transition-all" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors">
                      {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="bg-red-500/15 border border-red-500/30 text-red-400 px-3 py-2 rounded-xl text-[11px] font-bold text-center animate-[fadeIn_0.2s_ease-out]">
                {errorMsg}
              </div>
            )}

            {/* دکمه‌های کنترل مراحل */}
            <div className="flex items-center gap-3 pt-2">
              {step > 1 && (
                <button type="button" onClick={prevStep} className="px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1">
                  <ArrowLeft size={14} /> Back
                </button>
              )}

              {step < 3 ? (
                <button type="button" onClick={nextStep} className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group">
                  Next Step <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button type="submit" disabled={isLoading} className="flex-1 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_15px_rgba(234,179,8,0.4)] disabled:opacity-70 flex items-center justify-center gap-2 group hover:scale-[1.02]">
                  {isLoading ? <><Loader2 size={14} className="animate-spin" /> Authorizing...</> : "Complete & Register 🚀"}
                </button>
              )}
            </div>

          </form>
        )}

        {!isSuccess && (
          <div className="mt-5 text-center text-xs">
            <span className="text-neutral-400">Already have an account?</span>{" "}
            <Link href="/en/login" className="text-yellow-400 font-bold hover:text-yellow-300 transition-colors ml-1">
              Sign In
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

// ==========================================
// 3. MAIN REGISTER PAGE WITH 3D ASTRONAUT & STARS BACKGROUND
// ==========================================
export default function RegisterPage() {
  return (
    <div className="h-screen w-full bg-[#020202] text-white flex flex-col lg:grid lg:grid-cols-2 font-sans overflow-hidden relative">
      
      {/* 🌟 پس‌زمینه تمام صفحه پرستاره و کهکشانی */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter brightness-[0.3] scale-105 pointer-events-none"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2070&auto=format&fit=crop')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-black/60 pointer-events-none" />

      {/* ستون چپ: فرم ثبت‌نام مرحله‌ای فیکس */}
      <div className="flex flex-col justify-center items-center h-full relative z-10 overflow-hidden w-full">
        <Suspense fallback={<div className="flex justify-center items-center py-20"><Loader2 className="w-8 h-8 text-yellow-400 animate-spin" /></div>}>
          <RegisterFormContent />
        </Suspense>
      </div>

      {/* ستون راست: فضای ۳D زنده با کاراکتر شناور */}
      <div className="hidden lg:relative lg:flex flex-col justify-end overflow-hidden pointer-events-none">
        
        {/* تصویر فضانورد با انیمیشن حرکت و شناور بودن سه‌بعدی */}
        <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
          <img 
            src="https://i.ibb.co/HTZ6DPsS/original-33b8479c324a5448d6145b3cad7c51e7-removebg-preview.png" 
            alt="3D Astronaut Space Character" 
            className="w-[85%] h-[85%] object-contain drop-shadow-[0_20px_50px_rgba(234,179,8,0.2)] animate-float"
          />
        </div>

        <div className="relative z-10 p-10 pb-14 flex flex-col items-center text-center bg-gradient-to-t from-[#020202] via-transparent to-transparent pointer-events-auto">
          <blockquote className="space-y-2 max-w-md">
            <p className="text-lg font-bold tracking-tight text-white leading-relaxed drop-shadow-md">
              “<Typewriter
                text="Create an account. A new chapter awaits in global digital architecture."
                speed={50}
                loop={true}
                delay={2000}
              />”
            </p>
            <cite className="block text-[10px] font-black uppercase tracking-[0.25em] text-yellow-400 not-italic">
              — Safi Ecosystem Core
            </cite>
          </blockquote>
        </div>
      </div>

      {/* استایل‌های جامع (انیمیشن‌ها، شناور و سقوط کاغذ رنگی) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        @keyframes confetti-fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-confetti-fall {
          animation-name: confetti-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}} />

    </div>
  );
}