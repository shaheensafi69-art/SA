import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import BackgroundWaves from "@/components/ui/background-waves";
import {
  Wallet,
  ArrowRight,
  Sparkles,
  BookOpen,
  GraduationCap,
  Award,
  Clock,
  CheckCircle2,
  Users,
  Zap,
  ShieldCheck,
  Globe,
  Code2,
  HelpCircle,
  ChevronRight,
  Layers,
  Flame
} from "lucide-react";

export default async function CoursesPage() {
  const supabase = await createClient();

  const {
    data: { session }
  } = await supabase.auth.getSession();

  let userWalletBalance = 0;
  if (session?.user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("wallet_balance")
      .eq("id", session.user.id)
      .single();

    if (profile?.wallet_balance) {
      userWalletBalance = profile.wallet_balance;
    }
  }

  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  const categories = Array.from(
    new Set(courses?.map((course) => course.category).filter(Boolean))
  );

  // --------------------------------------------------------------------------
  // Core Value Pillars of Safi Academy Curriculums
  // --------------------------------------------------------------------------
  const learningPillars = [
    {
      title: "Production-Grade Portfolio Projects",
      desc: "Stop building trivial to-do lists. Our students construct scalable full-stack applications, real-time microservices, mobile apps, and autonomous AI agents designed to impress technical hiring managers.",
      icon: Code2,
      badge: "Hands-On Execution"
    },
    {
      title: "Direct Senior Developer Code Reviews",
      desc: "Never program in isolation. Submit your pull requests to seasoned senior software engineers for detailed architectural feedback, optimization tips, and industry best practices.",
      icon: Users,
      badge: "1-on-1 Mentorship"
    },
    {
      title: "Verifiable Blockchain & Digital Diplomas",
      desc: "Every graduate receives an official, cryptographically verifiable digital certificate with a unique credential ID that can be authenticated instantly by employers on LinkedIn and company portals.",
      icon: Award,
      badge: "Global Credential"
    },
    {
      title: "Global Alumni Hub & Remote Career Pipeline",
      desc: "Join an exclusive international network of founders, developers, and tech leads. Access collaborative hackathons, peer study pods, and direct referrals to remote freelance and engineering opportunities.",
      icon: Globe,
      badge: "Career Outcomes"
    }
  ];

  // --------------------------------------------------------------------------
  // 4-Stage Student Success Roadmap
  // --------------------------------------------------------------------------
  const successSteps = [
    {
      step: "01",
      title: "Select Specialization & Enroll",
      desc: "Browse our industry-curated curriculums and choose your career track in Software Engineering, Mobile Development, AI, or Tech Business."
    },
    {
      step: "02",
      title: "Immersive Project-Based Learning",
      desc: "Follow deep, modular video masterclasses, interactive coding milestones, and build real-world systems in browser sandbox labs."
    },
    {
      step: "03",
      title: "Live Mentorship & Code Audits",
      desc: "Attend weekly live mentor office hours, participate in collaborative Q&As, and have your code audited line-by-line by industry veterans."
    },
    {
      step: "04",
      title: "Graduate, Verify & Get Hired",
      desc: "Complete your capstone project, claim your accredited diploma, and leverage our career templates and alumni network to land remote roles."
    }
  ];

  // --------------------------------------------------------------------------
  // Frequently Asked Questions
  // --------------------------------------------------------------------------
  const faqs = [
    {
      q: "Are these courses suitable for complete beginners?",
      a: "Yes! While our curriculums culminate in advanced production-grade architectures, each program is structured with clear progressive learning modules. Complete beginners are guided step-by-step from core syntax to complex systems with dedicated mentor support."
    },
    {
      q: "How do Safi Academy verified certificates work?",
      a: "Upon completing all required curriculum modules and your final capstone project, an accredited certificate is issued automatically. It includes a unique verification hash and digital URL that potential employers, universities, and clients can verify anytime."
    },
    {
      q: "Can I learn at my own pace around a full-time job or studies?",
      a: "Absolutely. All video lessons, coding labs, and project repositories are accessible 24/7 with lifetime access. You can watch lessons whenever you want and join live mentor office hours according to your personal schedule."
    },
    {
      q: "What happens if I get stuck on a coding bug or error?",
      a: "You are never alone. Students have access to dedicated private discussion channels, peer mastermind groups, and weekly live office hours where senior instructors troubleshoot errors and explain complex concepts in real time."
    },
    {
      q: "How does the Wallet Balance discount work at checkout?",
      a: "If your student profile has a positive wallet balance (earned via referral rewards, platform bonuses, or scholarship grants), it is automatically deducted from your course tuition upon checkout—saving you money instantly."
    },
    {
      q: "Are financial scholarships available for underprivileged students?",
      a: "Yes! Safi Academy is deeply committed to educational equity. We offer 100% fully-funded scholarships for disadvantaged youth and Afghan women barred from formal schooling. You can apply directly through our Scholarships portal."
    }
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020202] text-white font-sans selection:bg-amber-500 selection:text-black pb-28">
      {/* Background Animated Canvas Waves */}
      <BackgroundWaves />

      <div className="relative z-10 px-4 py-20 sm:px-6 md:py-24 lg:px-12 xl:px-20 max-w-[1600px] mx-auto">
        {/* ================================================================== */}
        {/* 1. HEADER & HERO SECTION */}
        {/* ================================================================== */}
        <section className="mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between animate-[fadeInDown_0.6s_ease-out]">
          <div className="max-w-3xl relative">
            {userWalletBalance > 0 && (
              <div className="mb-4 inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.25)] backdrop-blur-md">
                <Wallet size={14} className="animate-pulse text-emerald-400" />
                <span>Wallet Credit Available: ${userWalletBalance.toFixed(2)} USD Applied</span>
              </div>
            )}

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-black uppercase tracking-[0.25em] text-neutral-300 backdrop-blur-md mb-6">
              <Sparkles size={14} className="text-amber-400" />
              <span>World-Class Technical Curriculums</span>
            </div>

            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl leading-[1.08]">
              Master In-Demand Skills. <br />
              <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm">
                Build Real Systems.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-neutral-300 font-normal max-w-2xl">
              Step away from passive tutorials. Safi Academy curriculums are engineered for ambitious builders who want production mastery, senior code reviews, and verifiable career credentials.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/en"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-xs font-black uppercase tracking-widest text-white transition-all duration-300 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-400 group shadow-lg backdrop-blur-md"
            >
              <span>Back to Hub</span>
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/en/scholarships"
              className="inline-flex items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 px-7 py-4 text-xs font-black uppercase tracking-widest text-amber-300 transition-all duration-300 hover:bg-amber-500/20 shadow-lg backdrop-blur-md"
            >
              <GraduationCap size={16} className="mr-2" />
              <span>Apply for Scholarship</span>
            </Link>
          </div>
        </section>

        {/* ================================================================== */}
        {/* STATS STRIP: PROOF & ACCREDITATION */}
        {/* ================================================================== */}
        <div className="mb-24 p-6 sm:p-8 rounded-[2.5rem] bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white">15,000+</div>
            <div className="text-xs text-neutral-400 uppercase tracking-wider font-bold mt-1">Students Enrolled</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400">94%</div>
            <div className="text-xs text-neutral-400 uppercase tracking-wider font-bold mt-1">Hiring & Promotion Rate</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white">100%</div>
            <div className="text-xs text-neutral-400 uppercase tracking-wider font-bold mt-1">Project-Driven Labs</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400">24/7</div>
            <div className="text-xs text-neutral-400 uppercase tracking-wider font-bold mt-1">Mentor Office Hours</div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* DATABASE SYNC ERROR NOTIFICATION */}
        {/* ================================================================== */}
        {error && (
          <div className="mb-12 rounded-2xl border border-red-800/50 bg-red-950/40 p-6 text-red-400 backdrop-blur-md text-sm font-bold text-center shadow-xl">
            Database Sync Notice: {error.message}
          </div>
        )}

        {/* ================================================================== */}
        {/* 2. COURSES SHOWCASE BY CATEGORY */}
        {/* ================================================================== */}
        {!courses || courses.length === 0 ? (
          <div className="py-28 text-center flex flex-col items-center justify-center bg-black/40 border border-white/10 rounded-[3rem] backdrop-blur-xl shadow-2xl mb-24">
            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="w-8 h-8 text-neutral-500" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Curriculums Deploying</h3>
            <p className="text-neutral-400 text-sm max-w-md mx-auto">
              Our engineering faculty is currently deploying newly updated course tracks. Check back shortly or browse our scholarships.
            </p>
          </div>
        ) : (
          <div className="space-y-24 mb-32">
            {categories.map((categoryName) => {
              const categoryCourses = courses.filter((c) => c.category === categoryName);

              return (
                <section key={categoryName as string} className="relative">
                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-white/10 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-inner">
                        <BookOpen size={22} />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                          {categoryName}
                        </h2>
                        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mt-1">
                          {categoryCourses.length} Comprehensive {categoryCourses.length === 1 ? "Program" : "Programs"} Available
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-semibold text-neutral-400">
                      Accredited by Safi Academy Faculty
                    </span>
                  </div>

                  {/* Course Cards Grid */}
                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {categoryCourses.map((course) => {
                      const originalPrice = Number(course.price);
                      const hasDiscount = userWalletBalance > 0;
                      const applicableDiscount = Math.min(userWalletBalance, originalPrice);
                      const finalPrice = originalPrice - applicableDiscount;

                      return (
                        <article
                          key={course.id}
                          className="group flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#090810]/80 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-amber-500/40 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(245,158,11,0.12)] relative"
                        >
                          {/* Wallet Discount Badge */}
                          {hasDiscount && (
                            <div className="absolute top-4 right-4 z-30 bg-emerald-500 text-black px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-1.5">
                              <Sparkles size={12} />
                              <span>-${applicableDiscount.toFixed(2)} Wallet Credit</span>
                            </div>
                          )}

                          {/* Thumbnail / Hero Area */}
                          <div className="relative flex h-56 sm:h-64 items-center justify-center overflow-hidden bg-black border-b border-white/10 p-4">
                            {/* Animated Grid Pattern */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none">
                              <div
                                className="w-full h-full"
                                style={{
                                  backgroundImage:
                                    "linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
                                  backgroundSize: "24px 24px"
                                }}
                              />
                            </div>

                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                            <div
                              className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[45px] pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 ${
                                hasDiscount ? "bg-emerald-500/15" : "bg-amber-500/15"
                              }`}
                            ></div>

                            {course.thumbnail_url ? (
                              <img
                                src={course.thumbnail_url}
                                alt={course.title}
                                className="relative z-20 max-h-full w-full object-contain transition-all duration-700 group-hover:scale-105 filter group-hover:brightness-110 drop-shadow-2xl rounded-xl"
                              />
                            ) : (
                              <div className="relative z-20 flex h-full w-full flex-col items-center justify-center">
                                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                                  <span className="text-2xl font-black text-amber-400">S</span>
                                </div>
                                <span className="text-xs font-black tracking-[0.25em] text-neutral-500 uppercase">
                                  SAFI ACADEMY
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Content Body */}
                          <div className="flex flex-1 flex-col p-6 sm:p-7 relative z-20 bg-gradient-to-b from-transparent to-black/60 justify-between">
                            <div>
                              <div className="mb-4 flex items-center justify-between gap-3">
                                <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-amber-300">
                                  {course.category}
                                </span>

                                <div className="flex flex-col items-end">
                                  {hasDiscount ? (
                                    <>
                                      <span className="text-[11px] font-bold text-neutral-500 line-through decoration-red-500/60 decoration-2">
                                        ${originalPrice.toFixed(2)}
                                      </span>
                                      <span className="text-lg font-black text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                                        ${finalPrice.toFixed(2)}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-lg font-black text-white">
                                      ${originalPrice.toFixed(2)}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight transition-colors duration-300 group-hover:text-amber-300 line-clamp-2">
                                {course.title}
                              </h3>

                              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-neutral-300 line-clamp-3 font-normal">
                                {course.description ||
                                  "A rigorous, project-driven masterclass engineered to build confidence, deep technical competence, and career-ready execution."}
                              </p>

                              {/* Curriculum Highlights Tags */}
                              <div className="mt-5 flex flex-wrap gap-1.5">
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-neutral-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded-md">
                                  <Award size={11} className="text-amber-400" /> Certificate
                                </span>
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-neutral-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded-md">
                                  <Clock size={11} className="text-blue-400" /> Self-Paced
                                </span>
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-neutral-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded-md">
                                  <Zap size={11} className="text-emerald-400" /> Real Projects
                                </span>
                              </div>
                            </div>

                            {/* Action Footer */}
                            <div className="mt-7 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
                              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                                {course.language || "English"}
                              </span>
                              <Link
                                href={`/en/courses/${course.id}`}
                                className={`rounded-xl px-5 py-3 text-xs font-black uppercase tracking-wider text-black transition-all duration-300 active:scale-95 flex items-center gap-1.5 shadow-md ${
                                  hasDiscount
                                    ? "bg-emerald-400 hover:bg-emerald-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                                    : "bg-amber-400 hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                                }`}
                              >
                                <span>Enroll Now</span>
                                <ArrowRight size={14} />
                              </Link>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* ================================================================== */}
        {/* 3. THE 4 PILLARS OF EXCELLENCE */}
        {/* ================================================================== */}
        <div className="bg-gradient-to-br from-[#0e0c18] via-[#090812] to-[#040408] border border-amber-500/25 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400 mb-3">
              The Safi Academy Method
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
              Why Our Graduates Stand Out
            </h2>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
              We reject shallow crash courses and passive lectures. Every curriculum is built around deep technical rigor, direct mentor accountability, and tangible project deliverables.
            </p>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {learningPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/[0.03] border border-white/5 hover:border-amber-500/30 rounded-2xl p-6 flex flex-col justify-between transition-all hover:bg-white/[0.05]"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 mb-5">
                      <Icon size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400/90 mb-2 block">
                      {pillar.badge}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                    <p className="text-xs text-neutral-300 leading-relaxed font-normal">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 4. 4-STAGE STUDENT SUCCESS ROADMAP */}
        {/* ================================================================== */}
        <div className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400 mb-3">
              The Student Journey
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              From Enrollment to Global Placement
            </h2>
            <p className="mt-3 text-neutral-400 text-sm md:text-base">
              A clear, proven trajectory designed to transform aspiring learners into high-earning technical professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {successSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#0a0a14] border border-white/10 rounded-2xl p-7 relative flex flex-col justify-between hover:border-amber-500/30 transition-colors"
              >
                <div className="text-3xl font-black text-amber-500/30 mb-4 font-mono">
                  {step.step}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">{step.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-amber-400 font-semibold">
                  <span>Milestone {step.step}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 5. FREQUENTLY ASKED QUESTIONS */}
        {/* ================================================================== */}
        <div className="max-w-4xl mx-auto mb-32">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400 mb-3">
              Common Questions
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Everything You Need to Know Before Enrolling
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#0b0a14] border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-colors"
              >
                <h3 className="text-base md:text-lg font-bold text-white mb-2 flex items-start gap-3">
                  <span className="text-amber-400 font-mono">Q.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs md:text-sm text-neutral-300 leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 6. GRAND FINALE ENROLLMENT & SCHOLARSHIP BANNER */}
        {/* ================================================================== */}
        <div className="w-full bg-gradient-to-br from-[#120f20] via-[#0d0a17] to-[#06050b] border border-amber-500/30 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden text-center flex flex-col items-center">
          <div className="w-18 h-18 rounded-3xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 p-4 shadow-inner">
            <GraduationCap className="w-10 h-10 text-amber-400" />
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 max-w-3xl leading-tight">
            Invest in Your Mind. Build the Future.
          </h2>

          <p className="text-neutral-300 text-sm md:text-base max-w-2xl mb-10 leading-relaxed">
            Gain immediate access to full curriculums, interactive coding milestones, senior mentor reviews, and verified certifications. Begin your transformation today.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="#top"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-sm uppercase tracking-wider rounded-2xl transition-all shadow-[0_10px_35px_rgba(245,158,11,0.35)] hover:scale-105"
            >
              <span>Explore Curriculums Above</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/en/scholarships"
              className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white font-bold text-sm rounded-2xl border border-white/10 transition-colors"
            >
              <span>Apply for Student Scholarship</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Verified Accreditation ID
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Lifetime Curriculum Access
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              100% Satisfaction Guarantee
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}