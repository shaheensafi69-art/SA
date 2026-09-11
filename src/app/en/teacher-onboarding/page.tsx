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
    Sparkles,
    AlertCircle,
    Eye,
    EyeOff
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

function TeacherOnboardingForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const appId = searchParams.get("appId");
    const emailParam = searchParams.get("email");

    const [loadingApp, setLoadingApp] = useState(true);
    const [applicantData, setApplicantData] = useState<any>(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        async function loadApplication() {
            if (!appId) {
                setLoadingApp(false);
                return;
            }
            try {
                const res = await fetch(`/api/admin/application-form?id=${appId}`);
                const data = await res.json();
                if (data.application) {
                    setApplicantData(data.application);
                }
            } catch (err) {
                console.error("Could not fetch application details:", err);
            } finally {
                setLoadingApp(false);
            }
        }
        loadApplication();
    }, [appId]);

    const handleRegisterTeacher = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        if (password.length < 8) {
            setErrorMsg("رمز عبور باید حداقل ۸ کاراکتر باشد.");
            return;
        }
        if (password !== confirmPassword) {
            setErrorMsg("رمز عبور و تکرار آن یکسان نیستند.");
            return;
        }

        const email = (applicantData?.email || emailParam || "").trim().toLowerCase();
        if (!email) {
            setErrorMsg("آدرس ایمیل معتبر یافت نشد.");
            return;
        }

        setIsSubmitting(true);
        try {
            const supabase = createClient();

            // ۱. ثبت‌نام در سیستم احراز هویت Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: applicantData?.first_name || "",
                        last_name: applicantData?.last_name || "",
                        role: "teacher"
                    }
                }
            });

            if (authError) throw authError;

            const newUserId = authData.user?.id;

            if (newUserId) {
                // ۲. انتقال اطلاعات به جدول ۳۰ (profiles) با نقش قطعی teacher
                await supabase
                    .from("profiles")
                    .upsert({
                        id: newUserId,
                        first_name: applicantData?.first_name || "",
                        last_name: applicantData?.last_name || "",
                        email,
                        phone_number: applicantData?.phone || null,
                        country: applicantData?.country || null,
                        date_of_birth: applicantData?.date_of_birth || null,
                        avatar_url: applicantData?.avatar_url || null,
                        bio: applicantData?.bio || "",
                        role: "teacher"
                    });

                // ۳. ایجاد یا به‌روزرسانی رکورد در جدول ۵۰ (teacher_info)
                await supabase
                    .from("teacher_info")
                    .upsert({
                        id: newUserId,
                        first_name: applicantData?.first_name || "",
                        last_name: applicantData?.last_name || "",
                        date_of_birth: applicantData?.date_of_birth || null,
                        bio: applicantData?.bio || "",
                        achievements: applicantData?.achievements || "",
                        avatar_url: applicantData?.avatar_url || null
                    });

                // ۴. پیوند دادن user_id به جدول ۶۲ (instructor_applications)
                if (appId) {
                    await supabase
                        .from("instructor_applications")
                        .update({ user_id: newUserId })
                        .eq("id", appId);
                }
            }

            setSuccess(true);
            setTimeout(() => {
                router.push("/en/login");
            }, 3000);

        } catch (err: any) {
            console.error("Teacher onboarding error:", err);
            setErrorMsg(err.message || "خطایی در ساخت حساب کاربری استاد رخ داد.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loadingApp) {
        return (
            <div className="py-24 text-center">
                <Loader2 className="w-10 h-10 text-amber-500 animate-spin mx-auto mb-4" />
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                    Verifying Instructor Authorization Token...
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="bg-[#0c0c14] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

                {!success ? (
                    <div>
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3 shadow-lg shadow-emerald-500/5">
                                <CheckCircle2 size={14} /> Approved Faculty Member
                            </div>
                            <h1 className="text-2xl md:text-3xl font-black text-white">
                                Complete Faculty Setup
                            </h1>
                            <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                                {applicantData?.first_name
                                    ? `Welcome, ${applicantData.first_name}! Set your password to activate your teacher account and launch "${applicantData.course_title}".`
                                    : "Set your password to activate your official instructor portal."}
                            </p>
                        </div>

                        {errorMsg && (
                            <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                                <AlertCircle size={16} className="shrink-0" />
                                <span>{errorMsg}</span>
                            </div>
                        )}

                        <form onSubmit={handleRegisterTeacher} className="space-y-5">
                            <div>
                                <label className="text-xs font-bold text-neutral-400 block mb-2 uppercase tracking-wider">
                                    Approved Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
                                    <input
                                        type="email"
                                        readOnly
                                        value={applicantData?.email || emailParam || ""}
                                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-neutral-300 text-xs font-mono cursor-not-allowed select-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-neutral-300 block mb-2 uppercase tracking-wider">
                                    Create Account Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        placeholder="Minimum 8 characters"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-11 pr-11 py-3.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
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
                                        required
                                        placeholder="Re-enter password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        <span>Activating Instructor Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Activate Instructor Portal</span>
                                        <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="text-center py-8 space-y-4">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                            <CheckCircle2 size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Account Activated!</h3>
                        <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mx-auto">
                            پروفایل شما با موفقیت ایجاد شد و دسترسی‌های مدرس به شما اعطا گردید. در حال انتقال به صفحه ورود...
                        </p>
                        <div className="pt-2">
                            <Link
                                href="/en/login"
                                className="text-xs font-bold text-amber-400 underline"
                            >
                                برای ورود سریع اینجا کلیک کنید
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