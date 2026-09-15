"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  CheckCircle2,
  Lock,
  Mail,
  User,
  ArrowRight,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  AlertCircle,
  Eye,
  EyeOff,
  KeyRound,
  BookOpen,
  Globe,
  Layers,
  Award,
  Phone,
  Calendar,
  Camera,
  Check,
  Building2,
  CheckSquare
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { uploadFileToR2 } from "@/utils/upload";

// ==========================================
// 0. CONFETTI CELEBRATION EFFECT (جشن گل‌ها)
// ==========================================
function ConfettiEffect() {
  const [pieces, setPieces] = useState<any[]>([]);

  useEffect(() => {
    const colors = ["#facc15", "#f59e0b", "#10b981", "#3b82f6", "#ffffff"];
    const newPieces = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 2}s`,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      rotate: `${Math.random() * 360}deg`
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
            transform: `rotate(${piece.rotate})`
          }}
        />
      ))}
    </div>
  );
}

// ==========================================
// 1. TEACHER MULTI-STEP ONBOARDING COMPONENT
// ==========================================
function TeacherOnboardingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const appId = searchParams.get("appId");
  const token = searchParams.get("token");

  const [isVerifying, setIsVerifying] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [denialReason, setDenialReason] = useState("");
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [applicantData, setApplicantData] = useState<any>(null);
  const [verifiedToken, setVerifiedToken] = useState<string>("");

  // Multi-step state (1: Identity & Personal, 2: Academic & Track, 3: Account & Password)
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // Form Fields matching profiles & teacher_info & instructor_applications tables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [achievements, setAchievements] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Credentials
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    async function verifyAccess() {
      let activeAppId = appId;
      let activeToken = token;
      let activeEmail = "";

      // 1. Fallback: Check if user arrived via Supabase invite session
      if (!activeAppId && !activeToken) {
        try {
          const supabase = createClient();
          const {
            data: { session }
          } = await supabase.auth.getSession();
          if (session?.user?.email) {
            activeEmail = session.user.email;
          }
        } catch (sessionErr) {
          console.warn("No active session detected:", sessionErr);
        }
      }

      // 2. Strict Security Lock: deny access if no credentials present
      if (!activeAppId && !activeToken && !activeEmail) {
        setAccessDenied(true);
        setDenialReason(
          "Missing cryptographic authorization credentials. Access to this onboarding portal is strictly restricted to approved faculty members via their official invitation email."
        );
        setIsVerifying(false);
        return;
      }

      const queryParam = activeAppId
        ? `appId=${encodeURIComponent(activeAppId)}${activeToken ? `&token=${encodeURIComponent(activeToken)}` : ""
        }`
        : `email=${encodeURIComponent(activeEmail)}`;

      try {
        const res = await fetch(
          `/api/teacher-onboarding/verify?${queryParam}&_t=${Date.now()}`,
          { cache: "no-store" }
        );
        const data = await res.json();

        if (!res.ok || !data.valid) {
          setAccessDenied(true);
          setDenialReason(
            data.error || "Invalid, revoked, or expired faculty onboarding token."
          );
        } else if (data.alreadyRegistered) {
          setAlreadyRegistered(true);
          setApplicantData(data.candidate);
        } else {
          setApplicantData(data.candidate);
          setVerifiedToken(data.token || activeToken || "");

          // Pre-populate fields from candidate application dossier
          if (data.candidate) {
            setFirstName(data.candidate.first_name || "");
            setLastName(data.candidate.last_name || "");
            setDateOfBirth(data.candidate.date_of_birth || "");
            setCountry(data.candidate.country || "");
            setPhoneNumber(data.candidate.phone || "");
            setBio(data.candidate.bio || "");
            setAchievements(data.candidate.achievements || "");
            if (data.candidate.avatar_url) {
              setAvatarUrl(data.candidate.avatar_url);
              setPhotoPreview(data.candidate.avatar_url);
            }
          }
        }
      } catch (err) {
        console.error("Verification network error:", err);
        setAccessDenied(true);
        setDenialReason(
          "Unable to communicate with authorization servers. Please try again later."
        );
      } finally {
        setIsVerifying(false);
      }
    }

    verifyAccess();
  }, [appId, token]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const nextStep = () => {
    setErrorMsg("");
    if (step === 1) {
      if (!firstName.trim() || !lastName.trim()) {
        setErrorMsg("Please provide your full first and last name.");
        return;
      }
      if (!fatherName.trim()) {
        setErrorMsg("Father's Name is required for official faculty records (نام پدر الزامی است).");
        return;
      }
      if (!dateOfBirth) {
        setErrorMsg("Please select your date of birth.");
        return;
      }
      if (!country.trim() || !phoneNumber.trim()) {
        setErrorMsg("Please provide your country of residence and contact phone.");
        return;
      }
    } else if (step === 2) {
      if (!bio.trim() || bio.trim().length < 15) {
        setErrorMsg("Please provide an instructor biography of at least 15 characters.");
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setErrorMsg("");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleRegisterTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters long (رمز عبور باید حداقل ۸ کاراکتر باشد).");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match (رمز عبور و تکرار آن یکسان نیستند).");
      return;
    }
    if (!agreeTerms) {
      setErrorMsg("Please accept the Safi Academy Faculty Code of Conduct to proceed.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload new photo to Cloudflare R2 if a fresh file was selected
      let finalAvatarUrl = avatarUrl;
      if (photoFile) {
        try {
          finalAvatarUrl = await uploadFileToR2(photoFile, "avatars");
        } catch (uploadErr) {
          console.warn("Avatar upload warning:", uploadErr);
        }
      }

      // 2. Call backend onboarding register endpoint (role is strictly set to 'teacher')
      const res = await fetch("/api/teacher-onboarding/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: applicantData?.id || appId,
          token: verifiedToken || token,
          password,
          first_name: firstName,
          last_name: lastName,
          father_name: fatherName,
          date_of_birth: dateOfBirth,
          country,
          phone_number: phoneNumber,
          avatar_url: finalAvatarUrl,
          bio,
          achievements
        })
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to complete faculty activation.");
      }

      // 3. Authenticate session automatically in browser
      const supabase = createClient();
      await supabase.auth.signInWithPassword({
        email: applicantData?.email,
        password
      });

      setSuccess(true);

      // 4. Redirect directly to Teacher Command Center
      setTimeout(() => {
        router.push("/en/teacher");
      }, 2500);
    } catch (err: any) {
      console.error("Activation error:", err);
      setErrorMsg(
        err.message || "An error occurred while finalizing your faculty account."
      );
      setIsSubmitting(false);
    }
  };

  // ----------------------------------------------------
  // Loading State
  // ----------------------------------------------------
  if (isVerifying) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4 animate-fade-in">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.2)]">
            <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          </div>
        </div>
        <div className="text-center space-y-1">
          <h3 className="text-white text-base font-bold">Verifying Faculty Credentials</h3>
          <p className="text-neutral-400 text-xs">Authenticating your one-time cryptographic admissions token...</p>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // Access Denied State (Locked Vault)
  // ----------------------------------------------------
  if (accessDenied) {
    return (
      <div className="w-full max-w-lg mx-auto p-6 sm:p-8 rounded-[2rem] bg-[#0c0c14]/90 border border-red-500/30 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.2)]">
          <ShieldAlert className="w-10 h-10 text-red-400" />
        </div>

        <div className="space-y-2">
          <div className="inline-block px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-extrabold uppercase tracking-widest">
            Security Authorization Failed
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Access Strictly Restricted</h2>
          <p className="text-neutral-400 text-xs leading-relaxed max-w-sm mx-auto">
            {denialReason}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-right space-y-1" dir="rtl">
          <span className="text-amber-400 font-bold text-xs block">راهنمای فعال‌سازی حساب اساتید:</span>
          <p className="text-neutral-300 text-[11px] leading-relaxed">
            این پرتال مختص اساتید تاییدشده آکادمی صافی است. دسترسی به این صفحه تنها از طریق کلیک بر روی لینک اختصاصی ارسالی به ایمیل شما امکان‌پذیر می‌باشد.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/en"
            className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs transition-colors"
          >
            Return to Homepage
          </Link>
          <a
            href="mailto:info@safiacademy.org"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-black text-xs transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
          >
            Contact Admissions Board
          </a>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // Already Registered State
  // ----------------------------------------------------
  if (alreadyRegistered) {
    return (
      <div className="w-full max-w-lg mx-auto p-6 sm:p-8 rounded-[2rem] bg-[#0c0c14]/90 border border-amber-500/30 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.25)]">
          <ShieldCheck className="w-10 h-10 text-amber-400" />
        </div>

        <div className="space-y-2">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-extrabold uppercase tracking-widest">
            Faculty Account Active
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Account Already Activated</h2>
          <p className="text-neutral-400 text-xs leading-relaxed max-w-sm mx-auto">
            Your instructor credentials for <strong>{applicantData?.course_title}</strong> have already been activated with Teacher privileges.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-right space-y-1" dir="rtl">
          <span className="text-amber-400 font-bold text-xs block">وضعیت حساب کاربری:</span>
          <p className="text-neutral-300 text-[11px] leading-relaxed">
            حساب استادی شما قبلاً فعال گردیده است. برای شروع تدریس یا مدیریت کلاس‌ها وارد پنل اختصاصی اساتید شوید.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/en/teacher"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2"
          >
            Enter Faculty Portal <ArrowRight size={14} />
          </Link>
          <Link
            href="/en/login"
            className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs transition-colors"
          >
            Sign In with Password
          </Link>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // Success Celebration State
  // ----------------------------------------------------
  if (success) {
    return (
      <div className="w-full max-w-lg mx-auto p-8 rounded-[2rem] bg-[#0c0c14]/90 border border-amber-500/40 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-center space-y-6 animate-fade-in">
        <ConfettiEffect />

        <div className="relative">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500/20 to-yellow-400/20 border border-amber-500/40 flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.4)]">
            <GraduationCap className="w-12 h-12 text-yellow-400 animate-bounce" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold uppercase tracking-widest">
            Privileges Granted: Official Faculty Instructor
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Welcome to Safi Academy!
          </h2>
          <p className="text-neutral-300 text-xs max-w-md mx-auto">
            Your instructor account has been created with direct Faculty privileges. Redirecting to your command center...
          </p>
        </div>

        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-right space-y-1" dir="rtl">
          <span className="text-amber-400 font-bold text-xs block">عضویت رسمی در هیئت علمی:</span>
          <p className="text-neutral-300 text-[11px] leading-relaxed">
            استاد گرامی، حساب شما با موفقیت به رول استادی (Teacher) ارتقاء یافت و پنل تدریس برای شما فعال گردید. در حال انتقال به پرتال اساتید...
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/en/teacher"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 group"
          >
            Launch Faculty Portal Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // Active Multi-Step Registration Form
  // ----------------------------------------------------
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-4 relative z-10 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-6 flex flex-col items-center">
        <Link href="/en" className="inline-block mb-2 transition-transform hover:scale-105 duration-300">
          <div className="relative w-16 h-16 flex items-center justify-center mx-auto">
            <div className="absolute inset-0 bg-yellow-500/20 blur-[20px] rounded-full"></div>
            <img
              src="/logo-without-b.png"
              alt="Safi Academy"
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_8px_15px_rgba(234,179,8,0.3)]"
            />
          </div>
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-extrabold uppercase tracking-widest mb-1">
          <Sparkles size={12} /> Faculty Appointment Registration
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Complete Teacher Setup
        </h1>
        <p className="text-neutral-400 text-xs mt-1">
          Role: <span className="text-amber-400 font-bold">Teacher</span> &bull; Approved Track: {applicantData?.course_title}
        </p>
      </div>

      {/* Multi-Step Progress Indicator */}
      <div className="flex items-center justify-between max-w-md mx-auto mb-6 px-4">
        {/* Step 1 Indicator */}
        <div className="flex flex-col items-center space-y-1">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black transition-all ${step === 1
              ? "bg-amber-400 text-black shadow-[0_0_15px_#f59e0b]"
              : step > 1
                ? "bg-emerald-500 text-black"
                : "bg-white/10 text-neutral-400"
              }`}
          >
            {step > 1 ? <Check size={16} /> : "1"}
          </div>
          <span className="text-[10px] font-bold text-neutral-400">Personal</span>
        </div>

        <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${step > 1 ? "bg-emerald-500" : "bg-white/10"}`} />

        {/* Step 2 Indicator */}
        <div className="flex flex-col items-center space-y-1">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black transition-all ${step === 2
              ? "bg-amber-400 text-black shadow-[0_0_15px_#f59e0b]"
              : step > 2
                ? "bg-emerald-500 text-black"
                : "bg-white/10 text-neutral-400"
              }`}
          >
            {step > 2 ? <Check size={16} /> : "2"}
          </div>
          <span className="text-[10px] font-bold text-neutral-400">Academic</span>
        </div>

        <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${step > 2 ? "bg-emerald-500" : "bg-white/10"}`} />

        {/* Step 3 Indicator */}
        <div className="flex flex-col items-center space-y-1">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black transition-all ${step === 3
              ? "bg-amber-400 text-black shadow-[0_0_15px_#f59e0b]"
              : "bg-white/10 text-neutral-400"
              }`}
          >
            3
          </div>
          <span className="text-[10px] font-bold text-neutral-400">Security</span>
        </div>
      </div>

      {/* Main Glassmorphic Card */}
      <div className="bg-[#0b0b14]/90 p-6 sm:p-8 rounded-[2rem] border border-amber-500/25 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative overflow-hidden">
        <form onSubmit={handleRegisterTeacher} className="space-y-4">
          {/* ======================================================== */}
          {/* STEP 1: Personal & Identity Information */}
          {/* ======================================================== */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-b border-white/10 pb-3 mb-2">
                <h3 className="text-white text-sm font-black flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-400" />
                  Step 1: Personal Profile & Verification (اطلاعات فردی و هویتی)
                </h3>
                <p className="text-neutral-400 text-[11px] mt-0.5">
                  Ensure your faculty identity details match your government identification.
                </p>
              </div>

              {/* Photo Upload with live preview */}
              <div className="flex flex-col items-center justify-center space-y-2 py-2">
                <div className="relative group cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center overflow-hidden transition-all shadow-lg ${photoPreview
                      ? "border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                      : "border-2 border-dashed border-white/20 bg-black/50 hover:bg-black/30"
                      }`}
                  >
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-8 h-8 text-amber-400 group-hover:scale-110 transition-transform" />
                    )}
                  </div>
                  <div className="absolute bottom-0 right-0 bg-amber-500 text-black p-1.5 rounded-full shadow-md z-10">
                    <Camera size={12} />
                  </div>
                </div>
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-wider">
                  Faculty Profile Photo * (عکس پروفایل رسمی)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 focus:shadow-[0_0_10px_rgba(245,158,11,0.15)] transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 focus:shadow-[0_0_10px_rgba(245,158,11,0.15)] transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1">
                    Father's Name * (نام پدر)
                  </label>
                  <input
                    type="text"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    placeholder="نام پدر"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 focus:shadow-[0_0_10px_rgba(245,158,11,0.15)] transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1">
                    Date of Birth * (تاریخ تولد)
                  </label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-neutral-300 focus:outline-none focus:border-amber-400 focus:shadow-[0_0_10px_rgba(245,158,11,0.15)] transition-all [color-scheme:dark]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1">
                    Country * (کشور محل اقامت)
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. United Kingdom"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 focus:shadow-[0_0_10px_rgba(245,158,11,0.15)] transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1">
                    Phone * (شماره تماس / واتساپ)
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+44 7400..."
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400 focus:shadow-[0_0_10px_rgba(245,158,11,0.15)] transition-all"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 2: Academic Dossier & Approved Track */}
          {/* ======================================================== */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-b border-white/10 pb-3 mb-2">
                <h3 className="text-white text-sm font-black flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  Step 2: Faculty Dossier & Course Track (کرسی تدریس و سوابق علمی)
                </h3>
                <p className="text-neutral-400 text-[11px] mt-0.5">
                  Confirm your approved course leadership track and teaching credentials.
                </p>
              </div>

              {/* Approved Track Card */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                    <GraduationCap size={14} /> Approved Academic Track
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    Officially Approved
                  </span>
                </div>
                <div className="text-white font-black text-base">
                  {applicantData?.course_title || "Instructor Track"}
                </div>
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-neutral-300">
                  <span className="px-2 py-1 rounded-lg bg-black/40 border border-white/10 flex items-center gap-1">
                    <Layers size={12} className="text-amber-400" /> {applicantData?.category || "General"}
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-black/40 border border-white/10 flex items-center gap-1">
                    <Globe size={12} className="text-amber-400" /> {applicantData?.teaching_format || "Live Broadcast"}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1">
                  Instructor Biography * (بیوگرافی رسمی استاد)
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Summarize your teaching philosophy, domain experience, and pedagogical approach..."
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 resize-none focus:shadow-[0_0_10px_rgba(245,158,11,0.15)] transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1">
                  Key Achievements & Certifications (دستاوردها و افتخارات علمی)
                </label>
                <textarea
                  rows={2}
                  value={achievements}
                  onChange={(e) => setAchievements(e.target.value)}
                  placeholder="List notable awards, degrees, authored publications, or industry recognitions..."
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 resize-none focus:shadow-[0_0_10px_rgba(245,158,11,0.15)] transition-all"
                />
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* STEP 3: Security & Credentials */}
          {/* ======================================================== */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="border-b border-white/10 pb-3 mb-2">
                <h3 className="text-white text-sm font-black flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  Step 3: Security & Credentials (حساب کاربری و تعیین رمز عبور)
                </h3>
                <p className="text-neutral-400 text-[11px] mt-0.5">
                  Establish your secure password to access the Safi Academy Faculty Portal.
                </p>
              </div>

              {/* Locked Verified Email Display */}
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1 flex items-center justify-between">
                  <span>Verified Faculty Email (ایمیل تاییدشده)</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <ShieldCheck size={12} /> Locked & Verified
                  </span>
                </label>
                <div className="w-full bg-black/80 border border-emerald-500/30 rounded-xl px-3 py-2.5 text-xs text-emerald-300 font-mono flex items-center justify-between shadow-inner">
                  <span>{applicantData?.email}</span>
                  <Lock size={14} className="text-emerald-400" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1">
                  New Faculty Password * (حداقل ۸ کاراکتر)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 pr-9 text-xs text-white focus:outline-none focus:border-amber-400 focus:shadow-[0_0_10px_rgba(245,158,11,0.15)] transition-all font-mono"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-neutral-400 ml-1">
                  Confirm Password * (تکرار رمز عبور)
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2.5 pr-9 text-xs text-white focus:outline-none focus:border-amber-400 focus:shadow-[0_0_10px_rgba(245,158,11,0.15)] transition-all font-mono"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Terms Agreement Checkbox */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/10 cursor-pointer group hover:bg-white/[0.04] transition-colors mt-3">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 accent-amber-500 rounded w-4 h-4 cursor-pointer"
                  required
                />
                <span className="text-[11px] text-neutral-300 leading-relaxed">
                  I commit to upholding Safi Academy's <strong>Academic Code of Conduct</strong>, mentoring students with integrity, and adhering to international educational standards.
                  <span className="block text-neutral-400 text-[10px] mt-0.5" dir="rtl">
                    اینجانب متعهد به رعایت اخلاق حرفه‌ای آموزش و استانداردهای علمی آکادمی صافی می‌باشم.
                  </span>
                </span>
              </label>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="bg-red-500/15 border border-red-500/30 text-red-400 px-3 py-2 rounded-xl text-[11px] font-bold text-center animate-fade-in flex items-center justify-center gap-1.5">
              <AlertCircle size={14} />
              {errorMsg}
            </div>
          )}

          {/* Wizard Controls */}
          <div className="flex items-center gap-3 pt-2">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1"
              >
                <ArrowLeft size={14} /> Previous
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.25)] flex items-center justify-center gap-2 group"
              >
                Continue to Step {step + 1}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_25px_rgba(245,158,11,0.4)] disabled:opacity-60 flex items-center justify-center gap-2 group hover:scale-[1.01]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Activating Faculty Role...
                  </>
                ) : (
                  <>
                    Complete & Enter Faculty Portal 🎓
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 2. MAIN TEACHER ONBOARDING PAGE
// ==========================================
export default function TeacherOnboardingPage() {
  return (
    <div className="min-h-screen w-full bg-[#030307] text-white flex flex-col justify-center items-center font-sans overflow-x-hidden relative py-12 px-4">
      {/* Background Starfield and Golden Glows */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-[0.25] pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=2070&auto=format&fit=crop')`
        }}
      />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
            <span className="text-xs text-neutral-400 font-mono">Initializing Faculty Onboarding...</span>
          </div>
        }
      >
        <TeacherOnboardingForm />
      </Suspense>

      {/* Global Style Definitions */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes confetti-fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.35s ease-out forwards;
        }
        .animate-confetti-fall {
          animation-name: confetti-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `
        }}
      />
    </div>
  );
}