"use client";

import { useEffect, useState, forwardRef } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Building2, 
  ExternalLink, 
  Award, 
  BookOpen, 
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Users,
  Sparkles,
  GraduationCap,
  Code,
  TrendingUp,
  ShoppingBag,
  Briefcase,
  Layers,
  Cpu,
  Video,
  Lock,
  Compass,
  Check,
  ChevronDown,
  Mail,
  MapPin,
  FileCheck,
  HeartHandshake
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { cn } from "@/lib/utils";

// ==========================================
// 3D TILT CARD COMPONENT
// ==========================================
interface Interactive3DCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  actionText: string;
  href: string;
  onActionClick?: () => void;
  className?: string;
  badge?: string;
  borderClass?: string;
  textClass?: string;
}

const Interactive3DCard = forwardRef<HTMLDivElement, Interactive3DCardProps>(
  (
    { title, subtitle, imageUrl, actionText, href, onActionClick, className, badge, borderClass = "border-border/30", textClass = "text-white" },
    ref
  ) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], ["10.5deg", "-10.5deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-10.5deg", "10.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const { width, height, left, top } = rect;
      const mouseXVal = e.clientX - left;
      const mouseYVal = e.clientY - top;
      const xPct = mouseXVal / width - 0.5;
      const yPct = mouseYVal / height - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
        className={cn(
          "relative h-[32rem] w-full rounded-[2.5rem] bg-[#0a0a0e] shadow-2xl border transition-colors duration-300 overflow-hidden group",
          borderClass,
          className
        )}
      >
        <div
          style={{
            transform: "translateZ(50px)",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-4 grid h-[calc(100%-2rem)] w-[calc(100%-2rem)] grid-rows-[1fr_auto] rounded-2xl"
        >
          {/* Background Image */}
          <img
            src={imageUrl}
            alt={`${title}, ${subtitle}`}
            className="absolute inset-0 h-full w-full rounded-2xl object-cover filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${title.replace(" ", "+")}&background=random&size=512`;
            }}
          />
          
          {/* Darkening overlay for contrast */}
          <div className="absolute inset-0 h-full w-full rounded-2xl bg-gradient-to-b from-black/30 via-black/40 to-black/90" />

          {/* Badge if present */}
          {badge && (
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-widest text-yellow-400">
                {badge}
              </span>
            </div>
          )}

          {/* Card Content (Header & Footer) */}
          <div className="relative flex flex-col justify-between rounded-2xl p-6 text-white z-10">
            
            {/* Header section with link */}
            <div className="flex items-start justify-end">
              <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: "2.5deg" }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Learn more about ${title}`}
                style={{ transform: "translateZ(60px)" }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md ring-1 ring-inset ring-white/30 transition-colors hover:bg-white/30"
              >
                <ArrowUpRight className="h-5 w-5 text-white" />
              </motion.a>
            </div>

            {/* Bottom info & action */}
            <div className="space-y-4">
              <motion.div style={{ transform: "translateZ(40px)" }}>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1">
                  {title}
                </h3>
                <p className={cn("text-xs font-black uppercase tracking-[0.2em]", textClass)}>
                  {subtitle}
                </p>
              </motion.div>

              <motion.div style={{ transform: "translateZ(40px)" }}>
                <Link
                  href={href}
                  onClick={(e) => {
                    if (onActionClick) {
                      e.preventDefault();
                      onActionClick();
                    }
                  }}
                  className="flex items-center justify-center w-full rounded-xl py-3 text-center text-xs font-black uppercase tracking-widest text-black bg-white transition-all duration-300 hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]"
                >
                  {actionText} <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </motion.div>
    );
  }
);
Interactive3DCard.displayName = "Interactive3DCard";

// ==========================================
// TYPES & DATA
// ==========================================
type TeacherInfo = {
  id: string;
  first_name: string;
  last_name: string;
  bio: string;
  achievements: string;
  avatar_url: string;
  teacher_info_courses: { courses: { title: string } }[] | null;
};

const teamMembers = [
  {
    name: "Shaheen Safi",
    role: "FOUNDER & CHIEF EXECUTIVE OFFICER",
    slug: "shaheen-safi",
    image: "/team/shaheen.jpeg",
    borderClass: "border-yellow-500/30 hover:border-yellow-500",
    textClass: "text-yellow-500",
  },
  {
    name: "Mujtaba Rahmani",
    role: "CHIEF OPERATING OFFICER & CISO",
    slug: "mujtaba-rahmani",
    image: "/team/mujtaba.jpeg",
    borderClass: "border-blue-500/30 hover:border-blue-500",
    textClass: "text-blue-500",
  },
  {
    name: "Sahel Salem",
    role: "CO FOUNDER & LEADER ECOSYSTEM PARTNERSHIPS",
    slug: "sahel-salem",
    image: "/team/sahel.jpeg",
    borderClass: "border-emerald-500/30 hover:border-emerald-500",
    textClass: "text-emerald-500",
  },
  {
    name: "Shirin Gol Ahmadi",
    role: "CHIEF CREATIVE OFFICER & AI LEAD",
    slug: "shirin-gol-ahmadi",
    image: "/team/shirin.jpeg",
    borderClass: "border-rose-500/30 hover:border-rose-500",
    textClass: "text-rose-500",
  }
];

const ecosystemCompanies = [
  {
    name: "Safi International Capital LTD",
    url: "https://safiinternationalcapitalltd.site",
    logo: "/company/Safi International Capital LTD.png",
    description: "The global financial and corporate parent entity of the Safi Ecosystem, registered in England and Wales under company number 17063286.",
    borderHover: "group-hover:border-yellow-500/50",
    textGlow: "text-yellow-500"
  },
  {
    name: "SafiPay",
    url: "https://safipay.net",
    logo: "/company/SafiPay.png",
    description: "A digital fintech application facilitating international account creation, Visa card issuance, and instant multi-currency global student payouts.",
    borderHover: "group-hover:border-blue-500/50",
    textGlow: "text-blue-500"
  },
  {
    name: "Safi TopUp",
    url: "https://www.safitopup.site/en",
    logo: "/company/Safi TopUp.jpg",
    description: "Cross-border telecommunications, mobile credit distribution, and digital gift cards seamlessly connecting over 150 countries worldwide.",
    borderHover: "group-hover:border-emerald-500/50",
    textGlow: "text-emerald-500"
  },
  {
    name: "SafiPro",
    url: "https://www.safipro.site/",
    logo: "/company/SafiPro.jpeg",
    description: "Modern lifestyle, hardware tools, and premium apparel crafted with exacting quality standards for an ambitious international audience.",
    borderHover: "group-hover:border-rose-500/50",
    textGlow: "text-rose-500"
  },
  {
    name: "Safi AI",
    url: "https://www.safiai.site/",
    logo: "/company/Safi Ai.png",
    description: "Our proprietary artificial intelligence engine powering automated student tutoring, real-time code analysis, and smart operational tools.",
    borderHover: "group-hover:border-fuchsia-500/50",
    textGlow: "text-fuchsia-500"
  },
  {
    name: "Shaheen Safi Blog",
    url: "https://shaheensafi.blog/",
    logo: "/company/shaheenblog.png",
    description: "Exclusive strategic analysis, architectural fintech frameworks, and macroeconomic insights directly from our Founder, Shaheen Safi.",
    borderHover: "group-hover:border-amber-500/50",
    textGlow: "text-amber-500"
  }
];

const academicDisciplines = [
  {
    title: "Full-Stack & AI Engineering",
    desc: "From Next.js 15 and TypeScript to building autonomous agentic AI workflows, vector embeddings, and cloud architecture.",
    icon: Code,
    color: "amber"
  },
  {
    title: "Global E-Commerce & Logistics",
    desc: "End-to-end mastering of Amazon FBA, Shopify private labeling, international freight forwarding, and multi-channel sales.",
    icon: ShoppingBag,
    color: "emerald"
  },
  {
    title: "Institutional Financial Markets",
    desc: "Smart Money Concepts (SMC), liquidity algorithms, risk mitigation, and algorithmic trading designed for funded prop firm success.",
    icon: TrendingUp,
    color: "blue"
  },
  {
    title: "Cross-Border Business Formation",
    desc: "Forming US LLCs & UK Ltd entities, federal EIN acquisition, US registered agents, corporate banking, and FinCEN compliance.",
    icon: Briefcase,
    color: "purple"
  },
  {
    title: "UI/UX & Modern Creative Media",
    desc: "Human-centric interface design, Figma masteries, 3D motion graphics, brand identity, and video production.",
    icon: Sparkles,
    color: "rose"
  },
  {
    title: "Academic & Business Languages",
    desc: "Professional English for remote global careers, academic TOEFL/IELTS preparation, and multilingual business communication.",
    icon: Globe,
    color: "yellow"
  }
];

const techPillars = [
  {
    title: "Agora RTC Live Classrooms",
    desc: "Sub-200ms ultra-low latency real-time video broadcasting with screen sharing, multi-camera hosts, and live student interaction.",
    icon: Video
  },
  {
    title: "Safi AI 24/7 Smart Tutor",
    desc: "Embedded Gemini-powered artificial intelligence that answers student questions, debugs code, and analyzes financial setups in real time.",
    icon: Cpu
  },
  {
    title: "Verifiable Cryptographic Certificates",
    desc: "Every graduation certificate includes a unique verification code backed by our London corporate registrar for global employer verification.",
    icon: FileCheck
  },
  {
    title: "Global Cloudflare R2 Content Delivery",
    desc: "Zero-buffering video streaming and lightning-fast file downloads across 300+ edge locations worldwide.",
    icon: Layers
  }
];

export default function AboutPage() {
  const [teachers, setTeachers] = useState<TeacherInfo[]>([]);
  const [isLoadingTeachers, setIsLoadingTeachers] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      setIsLoadingTeachers(true);
      const supabase = createClient();
      try {
        const { data, error } = await supabase
          .from("teacher_info")
          .select(`
            id, first_name, last_name, bio, achievements, avatar_url,
            teacher_info_courses (
              courses ( title )
            )
          `)
          .order("created_at", { ascending: true });
        
        if (error) throw error;
        if (data) {
          setTeachers(data as unknown as TeacherInfo[]);
        }
      } catch (err) {
        console.error("Error fetching teachers:", err);
      } finally {
        setIsLoadingTeachers(false);
      }
    };

    fetchTeachers();
  }, []);

  const faqs = [
    {
      q: "What is Safi Academy and who owns it?",
      a: "Safi Academy is the flagship digital educational institution of Safi International Capital LTD, a prestigious financial and corporate holding company registered in England and Wales under company number 17063286, headquartered in Covent Garden, London, United Kingdom."
    },
    {
      q: "How does Safi Academy differ from generic online platforms like Udemy or Coursera?",
      a: "Unlike generic marketplaces that sell static, unmonitored videos, Safi Academy operates as an elite, structured academy. We combine live interactive Agora RTC broadcasts with hands-on project reviews, direct teacher mentorship, automated coding/trading quizzes, and an integrated fintech ecosystem (SafiPay) that helps students monetize their skills immediately."
    },
    {
      q: "Are graduation certificates verifiable by international employers?",
      a: "Yes. Every student who successfully completes a course, passes the required threshold on quizzes, and submits final assignments receives an official Certificate of Completion containing a unique, verifiable Certificate Code. Employers and partners can authenticate any certificate directly through our verification portal."
    },
    {
      q: "How do live cohort classes work across different global time zones?",
      a: "Our student body spans the UK, Europe, Middle East, Central Asia, and the Americas. Live cohort classes are scheduled at times convenient for international attendees, and every single live session is automatically recorded in HD and archived into the student's dashboard within minutes for 24/7 on-demand review."
    },
    {
      q: "What payment methods are supported for course enrollment?",
      a: "We support seamless global payments via international Visa, Mastercard, American Express (processed securely via Stripe), SafiPay digital accounts, direct bank wire transfer, and approved digital assets. We ensure students in developing nations can enroll without financial friction."
    },
    {
      q: "How does Safi Academy support female students and learners in restricted regions?",
      a: "Empowerment and equal access are fundamental pillars of our mission. Through our scholarship funds and community grants, we provide free and heavily subsidized access to thousands of motivated female students and underprivileged youth who face geographical or political barriers to quality education."
    },
    {
      q: "What is the relationship between Safi Academy and external corporate partners?",
      a: "To help our students form legitimate international businesses, Safi Academy provides educational resources and vetted referral pathways to trusted providers such as Registered Agents Inc for US LLC/Corporation formation, US registered agent representation, and state compliance."
    },
    {
      q: "Can I teach at Safi Academy as an instructor?",
      a: "Yes! We continuously recruit elite practitioners, engineers, traders, and founders. You can apply directly through our official Instructor Application portal. Faculty members earn up to 70% revenue share and gain access to our live classroom broadcast suite."
    }
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-yellow-500/30 overflow-hidden" dir="ltr">
      
      {/* ================= AMBIENT BACKGROUND LIGHTING ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute top-[-5%] left-[-10%] w-[50vw] h-[50vw] bg-yellow-600/10 rounded-full blur-[180px]"></div>
        <div className="absolute bottom-[15%] right-[-10%] w-[50vw] h-[50vw] bg-amber-500/10 rounded-full blur-[180px]"></div>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 md:pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto z-10 text-center">
        
        {/* Verification Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-black uppercase tracking-widest mb-8 animate-[fadeInDown_0.5s_ease-out] shadow-[0_0_20px_rgba(234,179,8,0.2)]">
          <ShieldCheck size={16} />
          <span>Part of Safi International Capital LTD • London, UK</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-8 leading-[1.08] animate-[fadeInUp_0.6s_ease-out]">
          Architecting The Future of <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-600 drop-shadow-2xl">
            Global Education.
          </span>
        </h1>
        
        <p className="text-neutral-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12 animate-[fadeInUp_0.7s_ease-out]">
          Safi Academy is the premier international institution within the Safi Ecosystem. Headquartered in London, we bridge the gap between real-world industry mastery and modern educational technology, empowering tens of thousands of global students to achieve financial, technological, and intellectual independence.
        </p>

        {/* Core Institutional Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto p-4 bg-neutral-900/80 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl">
          <div className="p-4 text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-yellow-400 font-mono">50,000+</div>
            <div className="text-[11px] uppercase font-bold tracking-wider text-neutral-400 mt-1">Students Enrolled</div>
          </div>
          <div className="p-4 text-center border-l border-white/5">
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-mono">150+</div>
            <div className="text-[11px] uppercase font-bold tracking-wider text-neutral-400 mt-1">Countries Reached</div>
          </div>
          <div className="p-4 text-center border-l border-white/5">
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-yellow-400 font-mono">17063286</div>
            <div className="text-[11px] uppercase font-bold tracking-wider text-neutral-400 mt-1">UK Registered Entity</div>
          </div>
          <div className="p-4 text-center border-l border-white/5">
            <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-mono">98.4%</div>
            <div className="text-[11px] uppercase font-bold tracking-wider text-neutral-400 mt-1">Graduate Success Rate</div>
          </div>
        </div>
      </section>

      {/* ================= OUR FOUNDING STORY & PHILOSOPHY ================= */}
      <section className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto z-10">
        <div className="bg-gradient-to-br from-neutral-900/90 via-neutral-950 to-[#0c0c12] border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-yellow-500">
              <Compass className="w-4 h-4" /> The Safi Academy Manifesto
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Why We Built Safi Academy: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
                Skills Over Theory. Execution Over Speculation.
              </span>
            </h2>

            <div className="space-y-6 text-neutral-300 text-sm md:text-base leading-relaxed">
              <p>
                For decades, traditional higher education has failed to keep pace with the hyper-accelerated evolution of modern capitalism and technology. Students spend years accumulating debt for theoretical degrees that are rendered obsolete before graduation. Meanwhile, geographic barriers continue to prevent brilliant minds in emerging economies from accessing world-class financial and technological knowledge.
              </p>
              <p>
                <strong>Safi Academy was founded to shatter these limitations.</strong> Initiated by visionary entrepreneur <strong className="text-white">Shaheen Safi</strong> and backed by the financial infrastructure of <strong className="text-white">Safi International Capital LTD</strong>, we set out to build an uncompromising institution where teaching is delivered exclusively by active practitioners—senior engineers who write production code, e-commerce titans who generate millions in revenue, and institutional traders who manage substantial market capital.
              </p>
              <p>
                From our corporate headquarters in Covent Garden, London, we serve as an educational launching pad. We do not simply teach students; we integrate them into our global network, connect them with our fintech platform <strong className="text-yellow-400">SafiPay</strong>, guide them through forming legal US entities, and celebrate their victories on our public Wall of Fame.
              </p>
            </div>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">Uncompromising Excellence</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">Every lesson, project, and code repository is audited to meet international enterprise benchmarks.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mb-4">
                  <Globe className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">Borderless Opportunity</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">Talent is universally distributed; opportunity is not. We bring global education to every corner of the earth.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mb-4">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">Student-First Prosperity</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">We measure our institutional success not by enrollment numbers, but by the financial sovereignty of our graduates.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= ACADEMIC DISCIPLINES (BENTO GRID) ================= */}
      <section className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-yellow-500 mb-3">
            Comprehensive Curriculum
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Our Academic Disciplines
          </h2>
          <p className="mt-4 text-neutral-400 text-sm md:text-base leading-relaxed">
            Six high-demand faculties engineered to equip founders, software engineers, and traders with career-defining mastery.
          </p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {academicDisciplines.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-neutral-900/60 border border-white/5 hover:border-yellow-500/30 p-8 rounded-3xl backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-500/5"
              >
                <div>
                  <div className="w-14 h-14 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-center justify-center text-yellow-400 mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-yellow-400 font-bold">
                  <Check className="w-4 h-4" /> Full Certification Included
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= PROPRIETARY TECHNOLOGY & LMS INFRASTRUCTURE ================= */}
      <section className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 bg-[#07070a]/60 border-y border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-yellow-500 mb-3">
            Advanced Virtual Campus
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Next-Generation Educational Tech
          </h2>
          <p className="mt-4 text-neutral-400 text-sm md:text-base leading-relaxed">
            We don't use off-the-shelf third-party course plugins. Safi Academy is built from the ground up on our own proprietary cloud architecture.
          </p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-neutral-900/80 border border-white/5 rounded-3xl p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-yellow-400 mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{pillar.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 text-[11px] font-mono text-neutral-500 uppercase">
                  Institutional Standard
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= EXECUTIVE BOARD / LEADERSHIP ================= */}
      <section className="relative py-24 px-4 md:px-12 max-w-7xl mx-auto z-10">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-yellow-500 mb-3">
            Leadership & Governance
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-wider uppercase mb-4 text-center">
            The Executive Board
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full mb-6"></div>
          <p className="text-neutral-400 text-xs sm:text-sm font-bold tracking-widest uppercase text-center max-w-2xl">
            The Visionaries, Engineers, and Strategists Guiding The Safi Ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member) => (
            <Interactive3DCard
              key={member.slug}
              title={member.name}
              subtitle={member.role}
              imageUrl={member.image}
              actionText="Read Full Bio"
              href={`/en/founder/${member.slug}`}
              borderClass={member.borderClass}
              textClass={member.textClass}
              badge="Executive Board"
            />
          ))}
        </div>
      </section>

      {/* ================= ACADEMY FACULTY (DYNAMIC FROM DB) ================= */}
      <section className="relative py-24 px-4 md:px-12 max-w-7xl mx-auto z-10 bg-[#07070a]/50 border-y border-white/5">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-fuchsia-400 mb-3">
            Elite Faculty
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-wider uppercase mb-4 text-center">
            Instructors & Department Leads
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-fuchsia-600 rounded-full mb-6"></div>
          <p className="text-neutral-400 text-xs sm:text-sm font-bold tracking-widest uppercase text-center max-w-2xl">
            Learn directly from senior software architects, professional institutional traders, and industry leaders.
          </p>
        </div>

        {isLoadingTeachers ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : teachers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-neutral-500 font-bold">Faculty listings are currently synchronizing with the central registry.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="group bg-[#0a0a0e] border border-purple-500/15 hover:border-purple-500/40 rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-8 items-center md:items-start transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(168,85,247,0.1)] relative overflow-hidden h-full">
                
                {/* Ambient Glow Effect */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-fuchsia-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-fuchsia-500/20 transition-all"></div>

                {/* Avatar */}
                <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-[2rem] bg-gradient-to-br from-neutral-800 to-black border border-white/10 overflow-hidden shadow-xl p-1 relative z-10 group-hover:scale-105 transition-transform duration-500 mx-auto md:mx-0">
                  <img 
                    src={teacher.avatar_url || `https://ui-avatars.com/api/?name=${teacher.first_name}+${teacher.last_name}&background=random`} 
                    alt={teacher.first_name} 
                    className="w-full h-full object-cover rounded-[1.5rem]"
                  />
                </div>

                {/* Info & Badges Section */}
                <div className="flex flex-col flex-1 text-center md:text-left relative z-10 h-full">
                  
                  <h3 className="text-2xl font-black text-white mb-2">{teacher.first_name} {teacher.last_name}</h3>
                  <p className="text-xs text-neutral-400 font-medium leading-relaxed mb-4 line-clamp-3">
                    {teacher.bio}
                  </p>

                  {teacher.achievements && (
                    <div className="bg-black/40 border border-white/5 p-4 rounded-2xl mb-5">
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-fuchsia-400">
                        <Award size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Key Credentials</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed italic">
                        "{teacher.achievements}"
                      </p>
                    </div>
                  )}

                  <div className="mt-auto flex flex-wrap items-center justify-center md:justify-start gap-2 pt-4 border-t border-white/5">
                    {teacher.teacher_info_courses && teacher.teacher_info_courses.length > 0 ? (
                      teacher.teacher_info_courses.map((item, idx) => (
                        <span key={idx} className="inline-block px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md text-[9px] font-black uppercase tracking-widest">
                          {item.courses?.title || "Expert Faculty"}
                        </span>
                      ))
                    ) : (
                      <span className="inline-block px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md text-[9px] font-black uppercase tracking-widest">
                        Faculty Expert
                      </span>
                    )}
                  </div>
                  
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Join Faculty Callout */}
        <div className="text-center mt-14">
          <Link
            href="/en/instructor-application"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-fuchsia-600/20 hover:bg-fuchsia-600/30 border border-fuchsia-500/40 text-fuchsia-300 font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 shadow-xl"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Apply to Join the Faculty Board</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ================= THE SAFI ECOSYSTEM ================= */}
      <section className="relative py-24 px-6 md:px-12 max-w-7xl mx-auto z-10">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-yellow-500 mb-3">
            Synergy & Infrastructure
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-wider uppercase mb-4 text-center">
            The Safi Ecosystem
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full mb-6"></div>
          <p className="text-neutral-400 text-xs sm:text-sm font-bold tracking-widest uppercase text-center max-w-2xl">
            A Unified Network of Finance, Education, Artificial Intelligence, and Global Commerce
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ecosystemCompanies.map((company, i) => (
            <a 
              key={i}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative bg-[#0a0a0f] border border-white/5 rounded-[2rem] p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${company.borderHover} block`}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-20 h-20 bg-black rounded-2xl border border-white/10 p-2 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500 flex items-center justify-center overflow-hidden shrink-0">
                  <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                </div>
                
                <h3 className={`text-xl font-black text-white mb-3 transition-colors duration-300 ${company.textGlow}`}>
                  {company.name}
                </h3>
                
                <p className="text-sm text-neutral-400 leading-relaxed mb-8 flex-1">
                  {company.description}
                </p>
                
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors mt-auto">
                  <ExternalLink className="w-4 h-4" /> Explore Platform
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ================= CORPORATE REGISTRATION DETAILS (THE BLUEPRINT) ================= */}
      <section className="relative py-28 px-6 md:px-12 bg-gradient-to-b from-[#050508] via-[#08080a] to-[#020202] z-10 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          
          <div className="flex justify-center mb-16 relative">
            <div className="absolute inset-0 bg-yellow-500/20 blur-[100px] rounded-full"></div>
            <img 
              src="/logo-without-b.png" 
              alt="Safi Ecosystem Logo" 
              className="w-48 h-48 sm:w-64 sm:h-64 object-contain relative z-10 drop-shadow-[0_0_40px_rgba(234,179,8,0.4)]"
            />
          </div>

          <div className="space-y-12 text-neutral-300 text-sm sm:text-base leading-relaxed">
            
            <div className="bg-white/[0.02] p-8 sm:p-14 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-500/5 rounded-full blur-[80px]"></div>
              
              <div className="w-14 h-14 bg-yellow-500/10 text-yellow-500 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                <Building2 className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl sm:text-4xl font-black text-white mb-6">
                Corporate Governance & UK Registry
              </h3>
              
              <p className="text-neutral-300">
                Safi Academy is the educational flagship of <strong className="text-white text-lg">Safi International Capital LTD</strong>, a premier corporate financial entity officially registered in the United Kingdom under Company Number <span className="text-yellow-400 font-bold bg-yellow-500/10 px-2.5 py-1 rounded-md font-mono">17063286</span>.
              </p>
              
              <p className="mt-4 text-neutral-300">
                Our global corporate headquarters is situated in the prestigious commercial heart of London at <strong className="text-white">71-75 Shelton Street, Covent Garden, London, WC2H 9JQ</strong>. Our filings and corporate structure are fully verifiable with the UK Registrar of Companies (Companies House Tracker ID: <span className="text-yellow-400 font-bold bg-yellow-500/10 px-2 py-0.5 rounded font-mono">114-030414</span>).
              </p>

              {/* Corporate Identity Key Facts Table */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-black/40 p-6 rounded-2xl border border-white/5">
                <div><span className="text-neutral-500">Legal Name:</span> Safi International Capital LTD</div>
                <div><span className="text-neutral-500">Company Number:</span> 17063286</div>
                <div><span className="text-neutral-500">Jurisdiction:</span> England and Wales (UK)</div>
                <div><span className="text-neutral-500">Corporate Status:</span> Active & In Good Standing</div>
                <div className="sm:col-span-2 pt-2 border-t border-white/5">
                  <span className="text-neutral-500">Headquarters:</span> 71-75 Shelton Street, Covent Garden, London, UK
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 text-center">
                <p className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 italic">
                  "We do not merely adapt to the future; we architect it."
                </p>
                <p className="text-xs text-neutral-500 mt-4 uppercase tracking-[0.3em] font-bold">
                  — The Safi Executive Board
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= EXHAUSTIVE FAQ SECTION ================= */}
      <section className="relative py-24 px-6 md:px-12 max-w-4xl mx-auto z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-yellow-500 mb-3">
            Clear Answers
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-neutral-400 text-sm md:text-base">
            Everything you need to know about Safi Academy, our standards, certifications, and operations.
          </p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-neutral-900/60 border border-white/5 hover:border-white/15 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-7 py-5 text-left flex items-center justify-between gap-4 font-bold text-sm md:text-base text-white hover:text-yellow-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown 
                  className={`w-4 h-4 text-yellow-400 shrink-0 transition-transform duration-300 ${
                    openFaq === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-7 pb-6 text-xs md:text-sm text-neutral-300 leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================= INSTITUTIONAL CONTACT & CAMPUS LOCATIONS ================= */}
      <section className="relative py-20 px-6 md:px-12 max-w-5xl mx-auto z-10">
        <div className="bg-neutral-950 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Global Headquarters</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom
              </p>
            </div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Admissions & Support</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                support@safi-academy.com<br />
                admissions@safi-academy.com
              </p>
            </div>

            <div>
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Legal & Corporate</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Safi International Capital LTD<br />
                UK Registry: 17063286
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER CTA ================= */}
      <section className="relative py-24 px-6 md:px-12 max-w-4xl mx-auto z-10 text-center">
        <div className="bg-gradient-to-br from-yellow-500/20 to-amber-600/5 border border-yellow-500/20 rounded-[3rem] p-12 backdrop-blur-md shadow-[0_0_50px_rgba(234,179,8,0.1)]">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Ready to Shape Your Future?</h2>
          <p className="text-neutral-300 text-sm md:text-base mb-10 max-w-xl mx-auto leading-relaxed">
            Join thousands of ambitious students worldwide who are acquiring elite skills, earning verifiable certifications, and thriving in the Safi Ecosystem.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              href="/en/register" 
              className="inline-block px-10 py-5 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(234,179,8,0.4)]"
            >
              Enroll as a Student
            </Link>

            <Link 
              href="/en/instructor-application" 
              className="inline-block px-8 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold uppercase tracking-widest text-sm rounded-2xl transition-all"
            >
              Apply as Instructor
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}