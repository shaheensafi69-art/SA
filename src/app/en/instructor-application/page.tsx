"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  User,
  Mail,
  Phone,
  Globe,
  Video,
  BookOpen,
  FileText,
  Award,
  Share2,
  DollarSign,
  Users,
  Monitor,
  ShieldCheck,
  HelpCircle,
  Clock,
  Calendar,
  AlertCircle,
  Check,
  ChevronDown,
  Loader2,
  Film
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function InstructorApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    dateOfBirth: "",
    category: "Technology & Software Engineering",
    courseTitle: "",
    courseDescription: "",
    experienceLevel: "3-5 Years",
    teachingFormat: "Hybrid (Live Cohorts & Recorded)",
    language: "English",
    bio: "",
    achievements: "",
    portfolioUrl: "",
    sampleVideoUrl: "",
    videoFileName: "",
    resumeUrl: "",
    resumeFileName: "",
    avatarUrl: "",
    agreeToTerms: false
  });

  // Prefill logged-in user details if available
  useEffect(() => {
    async function loadUserData() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserId(user.id);
          const { data: profile } = await supabase
            .from("profiles")
            .select("first_name, last_name, email, phone_number, country, date_of_birth, avatar_url, bio")
            .eq("id", user.id)
            .single();

          if (profile) {
            setFormData(prev => ({
              ...prev,
              firstName: profile.first_name || prev.firstName,
              lastName: profile.last_name || prev.lastName,
              email: profile.email || user.email || prev.email,
              phone: profile.phone_number || prev.phone,
              country: profile.country || prev.country,
              dateOfBirth: profile.date_of_birth || prev.dateOfBirth,
              avatarUrl: profile.avatar_url || prev.avatarUrl,
              bio: profile.bio || prev.bio
            }));
          }
        }
      } catch (err) {
        console.warn("Could not prefill user profile data:", err);
      }
    }
    loadUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Upload Resume to Cloudflare R2 via /api/upload (folder: instructor_resumes)
  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert("File size exceeds 15MB limit. Please upload a smaller document.");
      return;
    }

    setIsUploadingResume(true);
    setErrorMessage("");

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("folder", "instructor_resumes");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to upload CV");
      }

      setFormData(prev => ({
        ...prev,
        resumeUrl: data.url,
        resumeFileName: file.name
      }));
    } catch (err: any) {
      console.error("Resume upload failed:", err);
      setErrorMessage(err.message || "Failed to upload resume. Please try again.");
    } finally {
      setIsUploadingResume(false);
    }
  };

  // Upload Profile Avatar (folder: instructor_image)
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAvatar(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("folder", "instructor_image");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData
      });

      const data = await res.json();
      if (data.url) {
        setFormData(prev => ({ ...prev, avatarUrl: data.url }));
      }
    } catch (err) {
      console.error("Avatar upload failed:", err);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // Upload Sample Video to Cloudflare R2 (folder: instructor_video)
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 200 * 1024 * 1024) {
      alert("Video size exceeds 200MB limit. Please upload a smaller video or provide a link.");
      return;
    }

    setIsUploadingVideo(true);
    setErrorMessage("");

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("folder", "instructor_video");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to upload video");
      }

      setFormData(prev => ({
        ...prev,
        sampleVideoUrl: data.url,
        videoFileName: file.name
      }));
    } catch (err: any) {
      console.error("Video upload failed:", err);
      setErrorMessage(err.message || "Failed to upload video.");
    } finally {
      setIsUploadingVideo(false);
    }
  };

  // Step validation
  const validateStep = (step: number) => {
    if (step === 1) {
      if (!formData.avatarUrl) {
        setErrorMessage("Instructor profile photo is mandatory. Please upload your profile photo to continue. (آپلود عکس پروفایل الزامی است)");
        return false;
      }
      if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
        setErrorMessage("Please fill in all mandatory personal details (First Name, Last Name, and Email).");
        return false;
      }
    }
    if (step === 2) {
      if (!formData.category.trim() || !formData.courseTitle.trim()) {
        setErrorMessage("Please specify your primary subject category and proposed course title.");
        return false;
      }
    }
    if (step === 3) {
      if (!formData.bio.trim()) {
        setErrorMessage("Please provide a brief professional biography.");
        return false;
      }
    }
    setErrorMessage("");
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setErrorMessage("");
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Submit Application
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.avatarUrl) {
      setErrorMessage("Please upload your profile avatar photo. Photo upload is mandatory. (آپلود عکس پروفایل الزامی است)");
      return;
    }
    if (!formData.agreeToTerms) {
      setErrorMessage("Please accept the Safi Academy Instructor Terms to submit.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/instructor-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId })
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to submit application");
      }

      setApplicationId(data.applicationId || `APP-${Date.now().toString().slice(-6)}`);
      setApplicationSubmitted(true);
    } catch (err: any) {
      console.error("Submission failed:", err);
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Benefits
  const instructorBenefits = [
    {
      title: "Up to 70% Revenue Share",
      desc: "Earn high dividends from student enrollments with direct global payouts via SafiPay, bank transfer, or crypto.",
      icon: DollarSign,
      highlight: "High Earnings"
    },
    {
      title: "Built-in Agora Live Classrooms",
      desc: "Broadcast HD interactive lectures with zero lag, screen sharing, student chat, and multi-host moderation.",
      icon: Video,
      highlight: "Advanced Tech"
    },
    {
      title: "Automated Student LMS",
      desc: "Comprehensive tools for assignment grading, quiz attempts, attendance logs, and automatic certificate issuance.",
      icon: Monitor,
      highlight: "Time Saving"
    },
    {
      title: "Global Audience & Marketing",
      desc: "We promote your courses across our 50,000+ student network in the US, UK, Middle East, Central Asia, and Europe.",
      icon: Globe,
      highlight: "Global Reach"
    }
  ];

  // Hiring Stages
  const stages = [
    {
      num: "01",
      title: "Application Review",
      desc: "Our admissions board reviews your background, credentials, and proposed syllabus within 48 to 72 hours."
    },
    {
      num: "02",
      title: "Pedagogical Audition",
      desc: "A brief video interview and demonstration lecture to align on audio/video quality and teaching delivery."
    },
    {
      num: "03",
      title: "Agreement & Setup",
      desc: "Finalize your course outline, sign the faculty revenue-sharing agreement, and receive teacher portal access."
    },
    {
      num: "04",
      title: "Course Launch & Scale",
      desc: "Record modules or schedule live cohorts. Begin welcoming students and tracking revenue in real time."
    }
  ];

  // FAQs
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = [
    {
      q: "What qualifications are required to teach at Safi Academy?",
      a: "We prioritize demonstrable real-world experience, practical industry mastery, and a passion for teaching over formal academic degrees. Whether you are a senior software architect, successful Amazon FBA seller, institutional trader, or business consultant, practical expertise is what matters most."
    },
    {
      q: "Can I teach live cohorts, pre-recorded masterclasses, or both?",
      a: "Yes! Our platform supports both synchronous live classes (powered by low-latency Agora RTC video broadcasts) and asynchronous pre-recorded video modules with auto-graded quizzes and assignments."
    },
    {
      q: "How and when are instructor payouts distributed?",
      a: "Instructors receive payouts monthly for both course enrollments and cohort subscriptions. Payouts can be processed via SafiPay, international wire transfer (SWIFT/SEPA), PayPal, or digital currency."
    },
    {
      q: "Do I retain ownership of my teaching curriculum?",
      a: "Yes. You maintain ownership of your proprietary instructional methods and materials, granting Safi Academy a non-exclusive distribution license to host, market, and broadcast the course to our global community."
    },
    {
      q: "Can I teach in languages other than English?",
      a: "Absolutely. Safi Academy caters to an international student base. We actively welcome courses taught in English, Persian/Dari, Pashto, and bilingual instruction."
    }
  ];

  return (
    <main className="w-full relative bg-[#020202] text-white font-sans overflow-hidden min-h-screen pt-28 md:pt-36 pb-32">

      {/* Background Lighting */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute top-[-5%] left-[-10%] w-[50vw] h-[50vw] bg-amber-500/10 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] bg-yellow-600/10 rounded-full blur-[180px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

        {/* Top Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-400 mb-6 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
          >
            <GraduationCap size={16} /> Safi Academy Faculty Recruitment • Cohort 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6"
          >
            Teach the Future. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
              Earn With Global Impact.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Share your real-world mastery in Tech, E-Commerce, Financial Markets, and Corporate Strategy with ambitious learners worldwide. Enjoy high revenue share, state-of-the-art live classrooms, and full LMS support.
          </motion.p>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto p-3 bg-neutral-900/80 border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl"
          >
            <div className="p-3 text-center">
              <div className="text-xl md:text-2xl font-black text-amber-400 font-mono">Up to 70%</div>
              <div className="text-[11px] uppercase font-bold tracking-wider text-neutral-400 mt-0.5">Revenue Share</div>
            </div>
            <div className="p-3 text-center border-l border-white/5">
              <div className="text-xl md:text-2xl font-black text-white font-mono">50,000+</div>
              <div className="text-[11px] uppercase font-bold tracking-wider text-neutral-400 mt-0.5">Global Students</div>
            </div>
            <div className="p-3 text-center border-l border-white/5">
              <div className="text-xl md:text-2xl font-black text-amber-400 font-mono">Agora HD</div>
              <div className="text-[11px] uppercase font-bold tracking-wider text-neutral-400 mt-0.5">Live Classrooms</div>
            </div>
            <div className="p-3 text-center border-l border-white/5">
              <div className="text-xl md:text-2xl font-black text-white font-mono">48-72h</div>
              <div className="text-[11px] uppercase font-bold tracking-wider text-neutral-400 mt-0.5">Review Window</div>
            </div>
          </motion.div>
        </div>

        {/* Benefits Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-28">
          {instructorBenefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-neutral-900/60 border border-white/5 hover:border-amber-500/30 p-7 rounded-3xl backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-neutral-400 border border-white/5">
                      {benefit.highlight}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white mb-2">{benefit.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{benefit.desc}</p>
                </div>
                <div className="mt-5 pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                  <Check className="w-3.5 h-3.5" /> Faculty Benefit
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Application Container */}
        <div id="apply-form" className="max-w-4xl mx-auto mb-32 scroll-mt-32">

          <div className="bg-gradient-to-br from-neutral-900/90 via-neutral-950 to-[#08080c] border border-white/10 rounded-[2.5rem] p-8 md:p-14 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Header / Step Indicator */}
            {!applicationSubmitted && (
              <div className="mb-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block mb-1">
                      Faculty Admissions Application
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-white">
                      Step {currentStep} of 4: {
                        currentStep === 1 ? "Personal Profile" :
                          currentStep === 2 ? "Teaching Domain & Course" :
                            currentStep === 3 ? "Experience & Audition Video" :
                              "Credentials & Review"
                      }
                    </h2>
                  </div>

                  {/* Step Progress Pills */}
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold transition-all ${currentStep === step
                          ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                          : currentStep > step
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-white/5 text-neutral-500 border border-white/5"
                          }`}
                      >
                        {currentStep > step ? <Check size={14} /> : step}
                      </div>
                    ))}
                  </div>
                </div>

                {errorMessage && (
                  <div className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-xs md:text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </div>
            )}

            {/* Form Steps */}
            {!applicationSubmitted ? (
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">

                  {/* STEP 1: Personal & Contact Profile */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className={`flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-white/[0.02] border transition-colors ${formData.avatarUrl ? "border-emerald-500/30" : "border-amber-500/40"
                        }`}>
                        <div className="relative group shrink-0">
                          <div className={`w-20 h-20 rounded-2xl border flex items-center justify-center overflow-hidden ${formData.avatarUrl ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-neutral-800"
                            }`}>
                            {formData.avatarUrl ? (
                              <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                              <User className="w-8 h-8 text-amber-400" />
                            )}
                          </div>
                          <label className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-amber-500 text-black cursor-pointer hover:bg-amber-400 transition-colors shadow-lg">
                            <Upload className="w-3.5 h-3.5" />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleAvatarUpload}
                              disabled={isUploadingAvatar}
                            />
                          </label>
                        </div>
                        <div className="text-center sm:text-left">
                          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                            <h4 className="text-sm font-bold text-white">Instructor Profile Photo</h4>
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              Mandatory *
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400">
                            {isUploadingAvatar ? (
                              <span className="text-amber-400 font-semibold animate-pulse">Uploading photo to secure vault...</span>
                            ) : formData.avatarUrl ? (
                              <span className="text-emerald-400 font-semibold flex items-center gap-1 justify-center sm:justify-start">
                                <Check size={14} /> Profile photo uploaded & verified
                              </span>
                            ) : (
                              <span className="text-amber-300">Upload a professional photo. Photo upload is mandatory for faculty acceptance.</span>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-xs font-bold text-neutral-300 mb-2 block uppercase tracking-wider">
                            First Name <span className="text-amber-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="e.g. Shaheen"
                            required
                            className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/90 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-neutral-300 mb-2 block uppercase tracking-wider">
                            Last Name <span className="text-amber-400">*</span>
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="e.g. Safi"
                            required
                            className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/90 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-xs font-bold text-neutral-300 mb-2 block uppercase tracking-wider">
                            Email Address <span className="text-amber-400">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="instructor@example.com"
                            required
                            className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/90 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-neutral-300 mb-2 block uppercase tracking-wider">
                            Phone / WhatsApp (With Country Code)
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+44 7123 456789"
                            className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/90 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-xs font-bold text-neutral-300 mb-2 block uppercase tracking-wider">
                            Country of Residence
                          </label>
                          <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="e.g. United Kingdom, Turkey, UAE"
                            className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/90 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-neutral-300 mb-2 block uppercase tracking-wider">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/90 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Teaching Domain & Proposed Course */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-xs font-bold text-neutral-300 mb-2 block uppercase tracking-wider">
                            Primary Teaching Category <span className="text-amber-400">*</span>
                          </label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/90 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                          >
                            <option value="Technology & Software Engineering">Technology & Software Engineering</option>
                            <option value="AI, Machine Learning & Data">AI, Machine Learning & Data</option>
                            <option value="E-Commerce & Amazon/Shopify">E-Commerce & Amazon/Shopify</option>
                            <option value="Financial Markets & Trading">Financial Markets & Trading</option>
                            <option value="Business, Formation & Corporate Law">Business, Formation & Corporate Law</option>
                            <option value="Graphic Design, 3D & Video Editing">Graphic Design, 3D & Video Editing</option>
                            <option value="Languages & Academic Prep">Languages & Academic Prep</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-neutral-300 mb-2 block uppercase tracking-wider">
                            Teaching Experience
                          </label>
                          <select
                            name="experienceLevel"
                            value={formData.experienceLevel}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/90 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                          >
                            <option value="1-2 Years">1-2 Years</option>
                            <option value="3-5 Years">3-5 Years</option>
                            <option value="5-8 Years">5-8 Years</option>
                            <option value="8+ Years Senior / Master">8+ Years Senior / Master</option>
                            <option value="First-Time Instructor (Strong Industry Practice)">First-Time Instructor (Strong Industry Practice)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-neutral-300 mb-2 block uppercase tracking-wider">
                          Proposed Course Title <span className="text-amber-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="courseTitle"
                          value={formData.courseTitle}
                          onChange={handleChange}
                          placeholder="e.g. Masterclass: Full-Stack Next.js 15 & Autonomous AI Agents"
                          required
                          className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/90 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-xs font-bold text-neutral-300 mb-2 block uppercase tracking-wider">
                            Teaching Format Preference
                          </label>
                          <select
                            name="teachingFormat"
                            value={formData.teachingFormat}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/90 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                          >
                            <option value="Hybrid (Live Cohorts & Recorded)">Hybrid (Live Cohorts & Recorded)</option>
                            <option value="Live Cohort Broadcasts (Agora RTC)">Live Cohort Broadcasts (Agora RTC)</option>
                            <option value="Pre-Recorded Video Masterclasses">Pre-Recorded Video Masterclasses</option>
                            <option value="1-on-1 Mentorship & Live Workshops">1-on-1 Mentorship & Live Workshops</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs font-bold text-neutral-300 mb-2 block uppercase tracking-wider">
                            Language of Instruction
                          </label>
                          <select
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/90 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                          >
                            <option value="English">English</option>
                            <option value="Persian / Dari (فارسی / دری)">Persian / Dari (فارسی / دری)</option>
                            <option value="Pashto (پښتو)">Pashto (پښتو)</option>
                            <option value="Bilingual (English + Persian)">Bilingual (English + Persian)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-neutral-300 mb-2 block uppercase tracking-wider">
                          Course Overview & Key Learning Objectives
                        </label>
                        <textarea
                          name="courseDescription"
                          value={formData.courseDescription}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Briefly describe what students will build or master by the end of this course..."
                          className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/90 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors resize-none"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Experience, Bio & Audition Video (Direct Upload + URL Option) */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="text-xs font-bold text-neutral-300 mb-2 block uppercase tracking-wider">
                          Professional Biography <span className="text-amber-400">*</span>
                        </label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Summarize your professional background, companies worked with, and passion for educating students..."
                          required
                          className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/90 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors resize-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-neutral-300 mb-2 block uppercase tracking-wider">
                          Key Achievements, Projects or Certifications
                        </label>
                        <textarea
                          name="achievements"
                          value={formData.achievements}
                          onChange={handleChange}
                          rows={3}
                          placeholder="List any notable software products built, revenue figures generated, certifications, or awards won..."
                          className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/90 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors resize-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-neutral-300 mb-2 block uppercase tracking-wider">
                          LinkedIn / GitHub / Portfolio Link
                        </label>
                        <input
                          type="url"
                          name="portfolioUrl"
                          value={formData.portfolioUrl}
                          onChange={handleChange}
                          placeholder="https://linkedin.com/in/username"
                          className="w-full px-4 py-3.5 rounded-xl bg-neutral-900/90 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Audition Video: Direct Upload to Cloudflare R2 (folder: instructor_video) OR URL */}
                      <div className="p-5 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-2">
                            <Film className="w-4 h-4 text-amber-400" />
                            Sample Lecture or Demo Video (Audition)
                          </label>
                          <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                            Upload File or Link
                          </span>
                        </div>

                        {/* File Upload Zone for Video */}
                        <div className="border border-dashed border-white/20 hover:border-amber-500/40 rounded-2xl p-4 text-center relative bg-white/[0.01]">
                          <input
                            type="file"
                            accept="video/*,.mp4,.mov,.webm,.mkv"
                            onChange={handleVideoUpload}
                            disabled={isUploadingVideo}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="flex items-center justify-center gap-3">
                            {isUploadingVideo ? (
                              <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
                            ) : formData.sampleVideoUrl && formData.videoFileName ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <Upload className="w-5 h-5 text-amber-400" />
                            )}
                            <div className="text-xs text-left">
                              {isUploadingVideo ? (
                                <span className="text-amber-400 font-semibold">Uploading video to media vault...</span>
                              ) : formData.sampleVideoUrl && formData.videoFileName ? (
                                <span className="text-emerald-400 font-semibold">
                                  Video Uploaded: <span className="font-mono text-white">{formData.videoFileName}</span>
                                </span>
                              ) : (
                                <span>Click or drag to upload sample video (MP4, WEBM up to 200MB)</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="relative flex py-1 items-center">
                          <div className="flex-grow border-t border-white/10"></div>
                          <span className="flex-shrink mx-3 text-[10px] text-neutral-500 uppercase tracking-widest font-mono">OR PASTE EXTERNAL LINK</span>
                          <div className="flex-grow border-t border-white/10"></div>
                        </div>

                        <input
                          type="url"
                          name="sampleVideoUrl"
                          value={formData.sampleVideoUrl}
                          onChange={handleChange}
                          placeholder="https://youtube.com/watch?v=... or Loom / Google Drive link"
                          className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-neutral-300 flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-amber-300">Audition Tip:</span> A 3-5 minute video sample teaching any technical concept significantly accelerates your application review and elevates you to top priority!
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Resume / CV Upload & Review */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* File Upload Zone */}
                      <div>
                        <label className="text-xs font-bold text-neutral-300 mb-2 block uppercase tracking-wider">
                          Curriculum Vitae (CV) / Resume Document (PDF or DOCX)
                        </label>

                        <div className="border-2 border-dashed border-white/15 hover:border-amber-500/40 rounded-3xl p-8 text-center bg-white/[0.01] hover:bg-white/[0.03] transition-all relative">
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeUpload}
                            disabled={isUploadingResume}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />

                          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-4">
                            {isUploadingResume ? (
                              <Loader2 className="w-6 h-6 animate-spin" />
                            ) : formData.resumeUrl ? (
                              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                            ) : (
                              <Upload className="w-6 h-6" />
                            )}
                          </div>

                          {isUploadingResume ? (
                            <div className="text-sm font-bold text-amber-400">Uploading document to secure vault...</div>
                          ) : formData.resumeUrl ? (
                            <div className="space-y-1">
                              <div className="text-sm font-bold text-emerald-400 flex items-center justify-center gap-1.5">
                                <Check size={16} /> File Uploaded Successfully
                              </div>
                              <div className="text-xs text-neutral-400 font-mono">{formData.resumeFileName}</div>
                              <div className="text-[11px] text-amber-400 pt-1">Click or drop another file to replace</div>
                            </div>
                          ) : (
                            <div>
                              <div className="text-sm font-bold text-white mb-1">
                                Drag and drop your CV or <span className="text-amber-400 underline">Browse files</span>
                              </div>
                              <p className="text-xs text-neutral-400">Supports PDF, DOC, DOCX up to 15MB.</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Summary Review Card */}
                      <div className="p-6 rounded-2xl bg-neutral-900/90 border border-white/10 space-y-3 text-xs">
                        <div className="text-amber-400 font-bold uppercase tracking-wider text-[11px] pb-2 border-b border-white/5">
                          Application Summary
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-neutral-300">
                          <div><span className="text-neutral-500">Applicant:</span> {formData.firstName} {formData.lastName}</div>
                          <div><span className="text-neutral-500">Email:</span> {formData.email}</div>
                          <div><span className="text-neutral-500">Category:</span> {formData.category}</div>
                          <div><span className="text-neutral-500">Format:</span> {formData.teachingFormat}</div>
                        </div>
                        <div className="pt-2">
                          <span className="text-neutral-500 block mb-1">Proposed Course:</span>
                          <span className="text-white font-semibold text-sm">{formData.courseTitle}</span>
                        </div>
                      </div>

                      {/* Terms Acceptance */}
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="agreeTerms"
                          checked={formData.agreeToTerms}
                          onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                          className="mt-1 w-4 h-4 rounded border-white/20 bg-neutral-900 text-amber-500 focus:ring-amber-400 cursor-pointer"
                        />
                        <label htmlFor="agreeTerms" className="text-xs text-neutral-300 leading-relaxed cursor-pointer">
                          I certify that all information submitted is accurate. I agree to the <Link href="/en/terms" className="text-amber-400 underline" target="_blank">Terms of Service</Link> and understand that Safi Academy will review my credentials and contact me for a demo audition.
                        </label>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

                {/* Form Navigation Buttons */}
                <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-neutral-300 hover:text-white transition-colors"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                  ) : <div></div>}

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_10px_25px_rgba(245,158,11,0.25)] hover:scale-105 active:scale-95"
                    >
                      <span>Continue</span>
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.agreeToTerms}
                      className="inline-flex items-center gap-2 px-9 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-sm uppercase tracking-wider transition-all shadow-[0_10px_30px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Instructor Application</span>
                          <CheckCircle2 size={16} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            ) : (
              /* Success Confirmation Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                    Application Received
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                    Welcome to the Safi Academy Admissions Pipeline
                  </h3>
                  <p className="text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.firstName}</strong>. Your proposal for <strong className="text-amber-400">{formData.courseTitle}</strong> has been logged in our admissions database.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900 border border-white/10 inline-block max-w-sm w-full font-mono text-xs text-neutral-300">
                  <div className="text-neutral-500 text-[10px] uppercase tracking-wider mb-1">Application Reference Code</div>
                  <div className="text-lg font-bold text-amber-400">{applicationId}</div>
                  <div className="text-[11px] text-neutral-500 mt-2">Check your email for confirmation and updates.</div>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/en/courses"
                    className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-colors"
                  >
                    Browse Existing Courses
                  </Link>

                  <button
                    onClick={() => {
                      setApplicationSubmitted(false);
                      setCurrentStep(1);
                    }}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider transition-colors"
                  >
                    Submit Another Proposal
                  </button>
                </div>
              </motion.div>
            )}

          </div>

        </div>

        {/* 4-Stage Admissions Journey */}
        <div className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400 mb-3">
              Roadmap to Launch
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Our 4-Stage Onboarding Process
            </h2>
            <p className="mt-3 text-neutral-400 text-sm md:text-base">
              From application review to course broadcasting, here is how we partner with top educators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stages.map((st, idx) => (
              <div
                key={idx}
                className="bg-neutral-900/40 border border-white/5 rounded-3xl p-7 relative flex flex-col justify-between hover:border-amber-500/20 transition-all group"
              >
                <div>
                  <div className="text-4xl font-black text-amber-500/20 group-hover:text-amber-500/40 transition-colors font-mono mb-4">
                    {st.num}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{st.title}</h3>
                  <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">{st.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                  <span>Phase {st.num}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructor FAQ Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400 mb-3">
              Common Questions
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Frequently Asked Questions for Instructors
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-neutral-900/50 border border-white/5 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-sm md:text-base text-white hover:text-amber-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-xs md:text-sm text-neutral-400 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-transparent border border-amber-500/30 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto backdrop-blur-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black text-white">
              Ready to Teach Ambitious Students Worldwide?
            </h3>
            <p className="text-sm text-neutral-400 max-w-xl">
              Apply today. Our faculty recruitment team will evaluate your course proposal and schedule your introductory audition.
            </p>
          </div>

          <a
            href="#apply-form"
            className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl shrink-0"
          >
            Start Application Now
          </a>
        </div>

      </div>
    </main>
  );
}