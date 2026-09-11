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
    Loader2,
    ShieldCheck,
    ShieldAlert,
    Sparkles,
    AlertCircle,
    Eye,
    EyeOff,
    KeyRound,
    Home,
    ExternalLink,
    BookOpen,
    Globe,
    Layers,
    Award
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

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

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        async function verifyAccess() {
            let activeAppId = appId;
            let activeToken = token;
            let activeEmail = "";

            // 1. Fallback: Check if user arrived via Supabase invite session
            if (!activeAppId && !activeToken) {
                try {
                    const supabase = createClient();
                    const { data: { session } } = await supabase.auth.getSession();
                    if (session?.user?.email) {
                        activeEmail = session.user.email;
                    }
                } catch (sessionErr) {
                    console.warn("No active session detected:", sessionErr);
                }
            }

            // 2. Strict Security Lock
            if (!activeAppId && !activeToken && !activeEmail) {
                setAccessDenied(true);
                setDenialReason("Missing cryptographic authorization credentials. Access to this onboarding portal is strictly restricted to approved faculty members via their invitation email.");
                setIsVerifying(false);
                return;
            }

            const queryParam = activeAppId
                ? `appId=${encodeURIComponent(activeAppId)}${activeToken ? `&token=${encodeURIComponent(activeToken)}` : ""}`
                : `email=${encodeURIComponent(activeEmail)}`;

            try {
                const res = await fetch(`/api/teacher-onboarding/verify?${queryParam}&_t=${Date.now()}`, {
                    cache: "no-store"
                });
                const data = await res.json();

                if (!res.ok || !data.valid) {
                    setAccessDenied(true);
                    setDenialReason(data.error || "Invalid, revoked, or expired faculty onboarding token.");
                } else if (data.alreadyRegistered) {
                    setAlreadyRegistered(true);
                    setApplicantData(data.candidate);
                } else {
                    setApplicantData(data.candidate);
                    setVerifiedToken(data.token || activeToken || "");
                }
            } catch (err) {
                console.error("Verification network error:", err);
                setAccessDenied(true);
                setDenialReason("Unable to reach verification servers. Please try again later.");
            } finally {
                setIsVerifying(false);
            }
        }

        verifyAccess();
    }, [appId, token]);

    const handleRegisterTeacher = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        if (password.length < 8) {
            setErrorMsg("رمز عبور باید حداقل ۸ کاراکتر باشد (ترکیب حروف و اعداد پیشنهاد می‌شود).");
            return;
        }
        if (password !== confirmPassword) {
            setErrorMsg("رمز عبور و تکرار آن یکسان نیستند.");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/teacher-onboarding/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    appId: applicantData?.id,
                    token: verifiedToken || token,
                    password
                })
            });

            const data = await res.json();
            if (!res.ok || data.error) {
                throw new Error(data.error || "خطا در فعال‌سازی حساب کاربری استاد.");
            }

            // Attempt seamless automatic login
            try {
                const supabase = createClient();
                await supabase.auth.signInWithPassword({
                    email: applicantData.email,
                    password
                });
            } catch (loginErr) {
                console.warn("Auto-login optional error:", loginErr);
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/en/teacher");
            }, 2500);

        } catch (err: any) {
            console.error("Teacher onboarding error:", err);
            setErrorMsg(err.message || "خطایی در ثبت رمز عبور و فعال‌سازی حساب رخ داد.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 1. Loading State
    if (isVerifying) {
        return (
            <div className="py-24 text-center space-y-4">
                <div className="relative w-16 h-16 mx-auto">
                    <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 animate-ping"></div>
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                        <KeyRound className="w-7 h-7 animate-pulse" />
                    </div>
                </div>
                <div>
                    <h3 className="text-base font-bold text-white tracking-wide">
                        Loading Candidate Dossier & Validating Token...
                    </h3>
                    <p className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-widest">
                        Checking Faculty Admissions Board Registry
                    </p>
                </div>
            </div>
        );
    }

    // 2. LOCKED ACCESS DENIED SCREEN
    if (accessDenied) {
        return (
            <div className="w-full max-w-lg mx-auto p-4">
                <div className="bg-[#0b0b12] border border-rose-500/20 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden text-center">
                    <div className="w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto mb-6 shadow-xl shadow-rose-500/10">
                        <ShieldAlert className="w-10 h-10" />
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
                        <Lock size={13} /> Access Restricted &bull; Locked
                    </div>

                    <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3">
                        Invitation Only Portal
                    </h1>

                    <p className="text-xs md:text-sm text-neutral-300 leading-relaxed mb-6 max-w-md mx-auto">
                        دسترسی مستقیم به این صفحه قفل است. این پورتال صرفاً از طریق <strong className="text-amber-400">لینک اختصاصی و دارای توکن امنیتی</strong> که به ایمیل اساتید برگزیده و تأییدشده ارسال شده، قابل دسترسی است.
                    </p>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-neutral-400 mb-8 font-mono text-left">
                        <div className="text-[10px] uppercase tracking-wider text-rose-400 font-bold mb-1">Security Alert</div>
                        <div>{denialReason}</div>
                    </div>

                    <div className="space-y-3">
                        <Link
                            href="/en"
                            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
                        >
                            <Home size={15} />
                            <span>Return to Safi Academy Home</span>
                        </Link>
                        <Link
                            href="/en/instructor-application"
                            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-2xl text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                        >
                            <span>Submit an Instructor Application</span>
                            <ExternalLink size={13} />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // 3. ALREADY ACTIVATED SCREEN
    if (alreadyRegistered) {
        return (
            <div className="w-full max-w-lg mx-auto p-4">
                <div className="bg-[#0b0b12] border border-emerald-500/20 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden text-center">
                    <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-6 shadow-xl shadow-emerald-500/10">
                        <ShieldCheck className="w-10 h-10" />
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
                        <CheckCircle2 size={13} /> Account Active
                    </div>

                    <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3">
                        Welcome Back, {applicantData?.first_name}!
                    </h1>

                    <p className="text-xs md:text-sm text-neutral-300 leading-relaxed mb-6 max-w-md mx-auto">
                        حساب کاربری استادی شما قبلاً فعال شده است. نیازی به ثبت‌نام مجدد نیست. می‌توانید مستقیماً وارد پنل تدریس خود شوید.
                    </p>

                    <Link
                        href="/en/teacher"
                        className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20"
                    >
                        <span>Access Teacher Command Center</span>
                        <ArrowRight size={15} />
                    </Link>
                </div>
            </div>
        );
    }

    // 4. VERIFIED FACULTY ONBOARDING DOSSIER & ACTIVATION FORM
    return (
        <div className="w-full max-w-xl mx-auto p-4">
            <div className="bg-[#0c0c14] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

                {!success ? (
                    <div className="space-y-6">

                        {/* Top Header & Official Appointment Badge */}
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold uppercase tracking-wider mb-3 shadow-lg shadow-emerald-500/10">
                                <Award size={15} /> Official Faculty Appointment &bull; Cohort 2026
                            </div>
                            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                                Welcome to Safi Academy, {applicantData?.first_name}!
                            </h1>
                            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                                شورای علمی آکادمی صافی درخواست تدریس شما را رسماً تایید نموده است. لطفاً رمز عبور خود را تعیین کنید تا پنل مدیریت دوره برای شما فعال گردد.
                            </p>
                        </div>

                        {/* Candidate & Approved Course Dossier Card */}
                        <div className="p-5 rounded-2xl bg-white/[0.02] border border-amber-500/20 relative overflow-hidden space-y-4">
                            <div className="flex items-center gap-4 pb-4 border-b border-white/5">
                                <div className="w-14 h-14 rounded-2xl bg-neutral-800 border border-amber-500/30 overflow-hidden shrink-0 flex items-center justify-center shadow-lg">
                                    {applicantData?.avatar_url ? (
                                        <img
                                            src={applicantData.avatar_url}
                                            alt={applicantData.first_name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="font-mono font-black text-xl text-amber-400">
                                            {applicantData?.first_name?.[0] || "T"}
                                        </span>
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                                        Faculty Member
                                    </div>
                                    <h3 className="text-base font-extrabold text-white truncate">
                                        {applicantData?.first_name} {applicantData?.last_name}
                                    </h3>
                                    <p className="text-xs text-neutral-400 truncate font-mono">
                                        {applicantData?.email}
                                    </p>
                                </div>
                            </div>

                            {/* Approved Curriculum Details */}
                            <div className="space-y-2">
                                <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                                    <BookOpen size={13} className="text-amber-400" />
                                    <span>Approved Curriculum Track:</span>
                                </div>
                                <div className="text-sm font-black text-white bg-white/5 p-3 rounded-xl border border-white/5">
                                    {applicantData?.course_title}
                                </div>

                                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-neutral-400 font-mono">
                                    {applicantData?.category && (
                                        <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20">
                                            {applicantData.category}
                                        </span>
                                    )}
                                    {applicantData?.teaching_format && (
                                        <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                                            {applicantData.teaching_format}
                                        </span>
                                    )}
                                    {applicantData?.language && (
                                        <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1">
                                            <Globe size={11} /> {applicantData.language}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {errorMsg && (
                            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                                <AlertCircle size={16} className="shrink-0" />
                                <span>{errorMsg}</span>
                            </div>
                        )}

                        {/* Password Setup Form */}
                        <form onSubmit={handleRegisterTeacher} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-neutral-300 block mb-2 uppercase tracking-wider">
                                    Create Account Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        required
                                        minLength={8}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:border-amber-400 focus:outline-none transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-neutral-300 block mb-2 uppercase tracking-wider">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        required
                                        minLength={8}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-neutral-600 focus:border-amber-400 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>Activating Faculty Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={15} />
                                        <span>Activate Faculty Account & Launch Portal</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="py-8 text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-xl shadow-emerald-500/10 animate-bounce">
                            <CheckCircle2 size={32} />
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight">
                            🎉 Faculty Portal Activated!
                        </h2>
                        <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mx-auto">
                            حساب کاربری استادی شما برای دوره <strong className="text-white">"{applicantData?.course_title}"</strong> فعال شد. در حال انتقال به پنل مدیریت اساتید...
                        </p>
                        <div className="pt-3">
                            <Link
                                href="/en/teacher"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20"
                            >
                                <span>Go to Teacher Dashboard</span>
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function TeacherOnboardingPage() {
    return (
        <main className="min-h-screen bg-[#020202] text-white flex items-center justify-center px-4 py-20">
            <Suspense fallback={<Loader2 className="w-10 h-10 text-amber-500 animate-spin" />}>
                <TeacherOnboardingForm />
            </Suspense>
        </main>
    );
}