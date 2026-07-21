"use client";

import { useMemo, useState, useEffect } from "react";
import { Loader2, CheckCircle2, AlertCircle, User, Mail, Phone, BookOpen, LockKeyhole, Clock, Calendar, Users } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

type CourseOption = {
  id: string;
  title: string;
  instructor_name?: string | null;
  instructor_2_name?: string | null;
};

type ClassGroup = {
  id: string;
  class_name: string;
  class_time: string;
  class_days: string;
  schedule_info?: string;
};

type CourseRegistrationFormProps = {
  courses: CourseOption[];
  finalPayableAmount?: number;
  walletDeduction?: number;
  studentId?: string;
};

export default function CourseRegistrationForm({ 
  courses, 
  finalPayableAmount = 0, 
  walletDeduction = 0,
  studentId 
}: CourseRegistrationFormProps) {
  
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(courses?.[0]?.id ?? "");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  
  // استیت‌های مربوط به کلاس و زمان‌بندی
  const [classGroups, setClassGroups] = useState<ClassGroup[]>([]);
  const [selectedClassGroupId, setSelectedClassGroupId] = useState("");
  const [isLoadingClasses, setIsLoadingClasses] = useState(false);

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const selectedCourse = useMemo(
    () => courses.find((course) => course.id === selectedCourseId) ?? courses[0],
    [courses, selectedCourseId]
  );

  const instructorOptions = useMemo(() => {
    const options: string[] = [];
    if (selectedCourse?.instructor_name) options.push(selectedCourse.instructor_name);
    if (selectedCourse?.instructor_2_name) options.push(selectedCourse.instructor_2_name);
    return options.length > 0 ? options : ["Not specified"];
  }, [selectedCourse]);

  useMemo(() => {
    if (instructorOptions.length > 0 && (!selectedInstructor || !instructorOptions.includes(selectedInstructor))) {
      setSelectedInstructor(instructorOptions[0]);
    }
  }, [instructorOptions, selectedInstructor]);

  // واکشی کلاس‌های فعال بر اساس کورس انتخاب‌شده
  useEffect(() => {
    if (!selectedCourseId) return;

    const fetchClassGroups = async () => {
      setIsLoadingClasses(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("class_groups")
        .select("id, class_name, class_time, class_days, schedule_info")
        .eq("course_id", selectedCourseId)
        .eq("is_active", true);

      if (data && data.length > 0) {
        setClassGroups(data);
        setSelectedClassGroupId(data[0].id);
      } else {
        setClassGroups([]);
        setSelectedClassGroupId("");
      }
      setIsLoadingClasses(false);
    };

    fetchClassGroups();
  }, [selectedCourseId]);

  const handleCourseChange = (value: string) => {
    setSelectedCourseId(value);
    const course = courses.find((courseItem) => courseItem.id === value);
    const firstInstructor = course?.instructor_name || course?.instructor_2_name || "Safi Academy Faculty";
    setSelectedInstructor(firstInstructor);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMsg(null);

    const chosenClass = classGroups.find(cg => cg.id === selectedClassGroupId);

    const payload = {
      studentId: studentId,
      fullName,
      fatherName,
      email,
      phone,
      courseId: selectedCourseId,
      courseTitle: selectedCourse?.title || "Unknown course",
      instructor: selectedInstructor || "Safi Academy Faculty",
      classGroupId: selectedClassGroupId || null,
      className: chosenClass?.class_name || "Standard Group",
      classTime: chosenClass?.class_time || "TBD",
      classDays: chosenClass?.class_days || "TBD",
      finalPrice: finalPayableAmount,
      walletDeduction: walletDeduction,
      notes: message
    };

    try {
      const response = await fetch("/api/telegram/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      let result;

      try {
        result = JSON.parse(responseText);
      } catch (e) {
        throw new Error(`Server returned non-JSON response (Status: ${response.status}).`);
      }

      if (!response.ok) {
        throw new Error(result.error || "Failed to send registration request.");
      }

      setStatus("success");
    } catch (error: any) {
      console.error("Registration error:", error);
      setStatus("error");
      setErrorMsg(error.message || "An unexpected error occurred.");
    }
  };

  if (!studentId) {
    return (
      <section className="mt-12 rounded-[2.5rem] border border-white/5 bg-neutral-900/40 p-8 shadow-2xl backdrop-blur-3xl text-center relative overflow-hidden flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mb-5 shadow-[inset_0_0_20px_rgba(245,158,11,0.2)]">
          <LockKeyhole size={28} />
        </div>
        <h3 className="text-2xl font-black text-white mb-2">Authentication Required</h3>
        <p className="text-neutral-400 text-sm max-w-md mb-6 leading-relaxed">
          To enroll in this course, secure your seat, and use your wallet discounts, you must be logged into your Safi Academy account.
        </p>
        <Link
          href="/en/login"
          className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-neutral-200 hover:scale-105 shadow-lg"
        >
          Sign In to Continue
        </Link>
      </section>
    );
  }

  if (status === "success") {
    return (
      <section className="mt-12 flex flex-col items-center justify-center p-10 bg-emerald-500/10 border border-emerald-500/20 rounded-[2.5rem] text-center animate-[fadeInUp_0.5s_ease-out] shadow-[0_20px_50px_rgba(16,185,129,0.15)] backdrop-blur-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-[50px]"></div>
        
        <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.4)] border border-emerald-500/30 relative z-10">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-2xl font-black text-white mb-3 tracking-tight relative z-10">Application Received!</h3>
        <p className="text-neutral-400 text-sm max-w-sm mb-6 leading-relaxed relative z-10 font-medium">
          Your enrollment request and class selection have been saved. Our support team will verify your payment and activate your class.
        </p>
        <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500 shadow-inner relative z-10 animate-pulse flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
          Status: Pending Payment
        </span>
      </section>
    );
  }

  return (
    <section className="mt-12 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-neutral-900/90 via-black/90 to-black p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-3xl relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none rounded-[2.5rem]"></div>
      
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between relative z-10">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-yellow-500 flex items-center gap-2 mb-2">
            <BookOpen size={14} /> Secure Checkout
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Reserve Your Seat & Class</h2>
          <p className="mt-2 max-w-xl text-neutral-400 text-sm leading-relaxed font-medium">
            Select your schedule, submit your details, and finalize your enrollment via SafiPay.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex w-full sm:w-auto items-center justify-center whitespace-nowrap rounded-2xl px-8 py-4 text-xs tracking-widest uppercase font-black transition-all duration-300 shadow-lg ${
            isOpen 
              ? "bg-white/5 text-neutral-400 border border-white/10 hover:bg-white/10 hover:text-white" 
              : "bg-yellow-500 text-black border border-yellow-500 hover:bg-yellow-400 shadow-[0_15px_40px_rgba(234,179,8,0.3)]"
          }`}
        >
          {isOpen ? 'Close Registration' : 'Open Registration'}
        </button>
      </div>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-10 border-t border-white/5 pt-8 animate-[fadeIn_0.4s_ease-out] relative z-10">
          
          {status === 'error' && errorMsg && (
            <div className="mb-8 flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-bold text-red-400 shadow-inner">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p>{errorMsg}</p>
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            
            {/* Personal Details */}
            <div className="space-y-5 sm:col-span-2">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2 mb-2 border-l-2 border-yellow-500 pl-2">
                <User size={14} /> Personal Details
              </h4>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Full Name *</span>
                  <input
                    required value={fullName} onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-sm text-white placeholder-neutral-600 shadow-inner transition-all hover:border-white/20 focus:border-yellow-500/50 focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
                    placeholder="John Doe"
                  />
                </label>

                <label className="block space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Father's Name *</span>
                  <input
                    required value={fatherName} onChange={(e) => setFatherName(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-sm text-white placeholder-neutral-600 shadow-inner transition-all hover:border-white/20 focus:border-yellow-500/50 focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
                    placeholder="Michael Doe"
                  />
                </label>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-5 sm:col-span-2 pt-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2 mb-2 border-l-2 border-yellow-500 pl-2">
                <Mail size={14} /> Contact Information
              </h4>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Email Address *</span>
                  <input
                    required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-sm text-white placeholder-neutral-600 shadow-inner transition-all hover:border-white/20 focus:border-yellow-500/50 focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="block space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500/80 ml-1 flex items-center gap-1.5">
                    <Phone size={12} className="text-yellow-500"/> WhatsApp Number *
                  </span>
                  <input
                    required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-sm font-mono text-white placeholder-neutral-600 shadow-inner transition-all hover:border-white/20 focus:border-yellow-500/50 focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
                    placeholder="+1 234 567 8900"
                  />
                </label>
              </div>
            </div>

            {/* Academic Selection & Class Schedule */}
            <div className="space-y-5 sm:col-span-2 pt-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-2 mb-2 border-l-2 border-yellow-500 pl-2">
                <BookOpen size={14} /> Academic & Class Schedule Selection
              </h4>
              <div className="grid gap-5 sm:grid-cols-2">
                
                {/* Curriculum */}
                <label className="block space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Selected Curriculum *</span>
                  <select
                    required value={selectedCourseId} onChange={(e) => handleCourseChange(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-sm text-white placeholder-neutral-600 shadow-inner transition-all hover:border-white/20 focus:border-yellow-500/50 focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
                  >
                    {courses.map((course) => (
                      <option key={course.id} value={course.id} className="bg-neutral-950 text-white">
                        {course.title}
                      </option>
                    ))}
                  </select>
                </label>

                {/* Preferred Instructor */}
                <label className="block space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Preferred Instructor *</span>
                  <select
                    required value={selectedInstructor} onChange={(e) => setSelectedInstructor(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-sm text-white placeholder-neutral-600 shadow-inner transition-all hover:border-white/20 focus:border-yellow-500/50 focus:outline-none focus:ring-1 focus:ring-yellow-500/50"
                  >
                    {instructorOptions.map((instructor) => (
                      <option key={instructor} value={instructor} className="bg-neutral-950 text-white">
                        {instructor}
                      </option>
                    ))}
                  </select>
                </label>

                {/* Class Group / Schedule Selection (New!) */}
                <label className="block sm:col-span-2 space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500/90 ml-1 flex items-center gap-1.5">
                    <Clock size={12} className="text-yellow-500" /> Select Class & Schedule (Time & Days) *
                  </span>
                  {isLoadingClasses ? (
                    <div className="w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-sm text-neutral-400 flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin text-yellow-500" /> Loading available classes...
                    </div>
                  ) : classGroups.length > 0 ? (
                    <select
                      required value={selectedClassGroupId} onChange={(e) => setSelectedClassGroupId(e.target.value)}
                      className="w-full rounded-2xl border border-yellow-500/30 bg-black/60 px-5 py-4 text-sm text-white placeholder-neutral-600 shadow-inner transition-all hover:border-yellow-500/50 focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                    >
                      {classGroups.map((group) => (
                        <option key={group.id} value={group.id} className="bg-neutral-950 text-white">
                          🏛️ {group.class_name} | ⏰ {group.class_time} | 📅 {group.class_days} {group.schedule_info ? `(${group.schedule_info})` : ''}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="w-full rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-xs font-bold text-amber-400">
                      No active classes scheduled for this course yet. You can still register and our team will assign you to the best schedule.
                    </div>
                  )}
                </label>

                <label className="block sm:col-span-2 space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Additional Notes (Optional)</span>
                  <textarea
                    value={message} onChange={(e) => setMessage(e.target.value)}
                    className="h-28 w-full rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-sm text-white placeholder-neutral-600 shadow-inner transition-all hover:border-white/20 focus:border-yellow-500/50 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 custom-scrollbar resize-none"
                    placeholder="Any specific questions or requirements before enrollment..."
                  />
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2 mt-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-600 px-8 py-5 text-sm font-black uppercase tracking-widest text-black shadow-[0_10px_40px_rgba(245,158,11,0.25)] transition-all hover:scale-[1.02] hover:shadow-[0_15px_50px_rgba(245,158,11,0.4)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Processing Securely...
                  </>
                ) : (
                  "Finalize Registration"
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </section>
  );
}