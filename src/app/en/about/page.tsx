"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Building2, ExternalLink, Award, BookOpen } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

// آپدیت تایپ برای دریافت آرایه‌ای از کورس‌ها
type TeacherInfo = {
  id: string;
  first_name: string;
  last_name: string;
  bio: string;
  achievements: string;
  avatar_url: string;
  teacher_info_courses: { courses: { title: string } }[] | null;
};

// دیتای تیم با رنگ‌بندی اختصاصی
const teamMembers = [
  {
    name: "Shaheen Safi",
    role: "FOUNDER & CHIEF EXECUTIVE OFFICER",
    slug: "shaheen-safi",
    image: "/team/shaheen.jpeg",
    borderClass: "border-yellow-500",
    textClass: "text-yellow-500",
    glowClass: "group-hover:bg-yellow-500/10",
    shadowClass: "group-hover:shadow-[0_0_40px_rgba(234,179,8,0.15)]",
  },
  {
    name: "Mujtaba Rahmani",
    role: "CHIEF OPERATING OFFICER & CISO",
    slug: "mujtaba-rahmani",
    image: "/team/mujtaba.jpeg",
    borderClass: "border-blue-500",
    textClass: "text-blue-500",
    glowClass: "group-hover:bg-blue-500/10",
    shadowClass: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]",
  },
  {
    name: "Sahel Salem",
    role: "CO FOUNDER & LEADER ECOSYSTEM PARTNERSHIPS",
    slug: "sahel-salem",
    image: "/team/sahel.jpeg",
    borderClass: "border-emerald-500",
    textClass: "text-emerald-500",
    glowClass: "group-hover:bg-emerald-500/10",
    shadowClass: "group-hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]",
  },
  {
    name: "Shirin Gol Ahmadi",
    role: "CHIEF CREATIVE OFFICER & AI LEAD",
    slug: "shirin-gol-ahmadi",
    image: "/team/shirin.jpeg",
    borderClass: "border-rose-500",
    textClass: "text-rose-500",
    glowClass: "group-hover:bg-rose-500/10",
    shadowClass: "group-hover:shadow-[0_0_40px_rgba(225,29,72,0.15)]",
  },
  {
    name: "Husnafar Shadab Zafer",
    role: "HEAD OF DATABASE MANAGEMENT",
    slug: "husnafar",
    image: "/team/Husnafar Shadab Zafer.jpeg",
    borderClass: "border-purple-500",
    textClass: "text-purple-500",
    glowClass: "group-hover:bg-purple-500/10",
    shadowClass: "group-hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]",
  }
];

// دیتای اکوسیستم شرکت‌ها
const ecosystemCompanies = [
  {
    name: "Safi International Capital LTD",
    url: "https://safiinternationalcapitalltd.site",
    logo: "/company/Safi International Capital LTD.png",
    description: "The global financial and corporate backbone of the Safi Ecosystem, officially registered in the United Kingdom.",
    color: "from-yellow-500/20 to-transparent",
    borderHover: "group-hover:border-yellow-500/50",
    textGlow: "group-hover:text-yellow-400"
  },
  {
    name: "SafiPay",
    url: "https://safipay.net",
    logo: "/company/SafiPay.png",
    description: "A professional fintech application for international account creation and secure multi-currency transactions.",
    color: "from-blue-500/20 to-transparent",
    borderHover: "group-hover:border-blue-500/50",
    textGlow: "group-hover:text-blue-400"
  },
  {
    name: "Safi TopUp",
    url: "https://www.safitopup.site/en",
    logo: "/company/Safi TopUp.jpg",
    description: "Global mobile credit transfers, digital gift cards, and utility payments seamlessly connecting over 150 countries.",
    color: "from-emerald-500/20 to-transparent",
    borderHover: "group-hover:border-emerald-500/50",
    textGlow: "group-hover:text-emerald-400"
  },
  {
    name: "SafiPro",
    url: "https://www.safipro.site/",
    logo: "/company/SafiPro.jpeg",
    description: "Premium lifestyle, apparel, and modern design products delivered with uncompromising quality to a global audience.",
    color: "from-rose-500/20 to-transparent",
    borderHover: "group-hover:border-rose-500/50",
    textGlow: "group-hover:text-rose-400"
  },
  {
    name: "Safi AI",
    url: "https://www.safiai.site/",
    logo: "/company/Safi Ai.png",
    description: "The advanced artificial intelligence core powering our ecosystem with intelligent, real-time corporate assistance.",
    color: "from-fuchsia-500/20 to-transparent",
    borderHover: "group-hover:border-fuchsia-500/50",
    textGlow: "group-hover:text-fuchsia-400"
  },
  {
    name: "Shaheen Safi Blog",
    url: "https://shaheensafi.blog/",
    logo: "/company/shaheenblog.png",
    description: "Exclusive insights, articles, and architectural fintech strategies directly from the founder, Shaheen Safi.",
    color: "from-amber-500/20 to-transparent",
    borderHover: "group-hover:border-amber-500/50",
    textGlow: "group-hover:text-amber-400"
  }
];

export default function AboutPage() {
  const [teachers, setTeachers] = useState<TeacherInfo[]>([]);
  const [isLoadingTeachers, setIsLoadingTeachers] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      setIsLoadingTeachers(true);
      const supabase = createClient();
      try {
        // 🔥 کوئری حرفه‌ای با استفاده از جدول واسط
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

  return (
    <div className="min-h-screen bg-[#050508] text-white font-sans selection:bg-yellow-500/30 overflow-hidden" dir="ltr">
      
      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-yellow-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(234,179,8,0.03)_0%,transparent_70%)] rounded-full pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.apply/noise.svg')] opacity-20 pointer-events-none z-0 mix-blend-overlay"></div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-yellow-500 text-[10px] sm:text-xs font-black uppercase tracking-widest mb-8 animate-[fadeInDown_0.5s_ease-out]">
          <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
          Part of Safi International Capital LTD
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-tight mb-6 leading-tight animate-[fadeInUp_0.6s_ease-out]">
          The Future of <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 drop-shadow-lg">Global Education.</span>
        </h1>
        
        <p className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-12 animate-[fadeInUp_0.7s_ease-out]">
          Safi Academy is the premier digital institution within the Safi Ecosystem. We bridge the gap between traditional learning and modern technology, providing world-class education powered by artificial intelligence and seamless fintech integrations.
        </p>
      </section>

      {/* ================= LEADERSHIP / FOUNDERS SECTION ================= */}
      <section className="relative py-20 px-4 md:px-12 max-w-7xl mx-auto z-10">
        <div className="flex flex-col items-center mb-16 animate-[fadeIn_1s_ease-out]">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-wider uppercase mb-4 text-center">Executive Board</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full mb-6"></div>
          <p className="text-neutral-500 text-xs sm:text-sm font-bold tracking-widest uppercase text-center max-w-2xl">The Visionaries, Engineers, and Strategists Behind The Safi Ecosystem</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Link 
              key={member.slug}
              href={`/en/founder/${member.slug}`} 
              className={`group relative bg-[#0a0a0e] border border-white/5 rounded-[2rem] p-6 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 ${member.shadowClass} overflow-hidden`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 opacity-0 transition-opacity duration-700 pointer-events-none blur-3xl ${member.glowClass} group-hover:opacity-100`}></div>

              <div className="relative w-48 h-48 sm:w-64 sm:h-64 mb-6 z-10 shrink-0 mx-auto">
                <div className={`w-full h-full rounded-2xl p-1.5 border border-dashed ${member.borderClass} group-hover:border-solid transition-all duration-500 overflow-hidden bg-neutral-900`}>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full rounded-xl object-cover filter grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${member.name.replace(" ", "+")}&background=random&size=512`;
                    }}
                  />
                </div>
              </div>
              
              <div className="relative z-10 w-full flex flex-col items-center flex-1">
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-wide group-hover:scale-105 transition-transform duration-300">{member.name}</h3>
                <p className={`text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] mb-8 leading-relaxed w-full ${member.textClass}`}>
                  {member.role}
                </p>
                
                <div className="mt-auto flex items-center justify-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-widest group-hover:text-white transition-colors bg-white/5 w-full py-3 rounded-xl border border-white/5 group-hover:border-white/20">
                  Read Full Bio <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= DYNAMIC TEACHERS SECTION ================= */}
      <section className="relative py-24 px-4 md:px-12 max-w-7xl mx-auto z-10 bg-[#07070a]/50 border-y border-white/5 mt-10">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-wider uppercase mb-4 text-center">Academy Faculty</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-fuchsia-600 rounded-full mb-6"></div>
          <p className="text-neutral-500 text-xs sm:text-sm font-bold tracking-widest uppercase text-center max-w-2xl">Learn from industry leaders, elite traders, and expert engineers.</p>
        </div>

        {isLoadingTeachers ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : teachers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-neutral-500 font-bold">The faculty database is currently being updated.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="group bg-[#0a0a0e] border border-purple-500/10 hover:border-purple-500/30 rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-8 items-center md:items-start transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(168,85,247,0.1)] relative overflow-hidden h-full">
                
                {/* Glow Effect */}
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
                  
                  {/* Name and Bio */}
                  <h3 className="text-2xl font-black text-white mb-2">{teacher.first_name} {teacher.last_name}</h3>
                  <p className="text-xs text-neutral-400 font-medium leading-relaxed mb-4 line-clamp-3">
                    {teacher.bio}
                  </p>

                  {/* Achievements */}
                  {teacher.achievements && (
                    <div className="bg-black/40 border border-white/5 p-4 rounded-2xl mb-5">
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-fuchsia-400">
                        <Award size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Key Achievements</span>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed italic">
                        "{teacher.achievements}"
                      </p>
                    </div>
                  )}

                  {/* 🔥 رندر کردن داینامیک لیست کورس‌ها (به پایین منتقل شد) */}
                  <div className="mt-auto flex flex-wrap items-center justify-center md:justify-start gap-2 pt-4 border-t border-white/5">
                    {teacher.teacher_info_courses && teacher.teacher_info_courses.length > 0 ? (
                      teacher.teacher_info_courses.map((item, idx) => (
                        <span key={idx} className="inline-block px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md text-[9px] font-black uppercase tracking-widest">
                          {item.courses?.title || "Expert"}
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
      </section>

      {/* ================= THE SAFI ECOSYSTEM (COMPANIES GRID) ================= */}
      <section className="relative py-24 px-4 md:px-12 max-w-7xl mx-auto z-10 bg-[#050508]">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-wider uppercase mb-4 text-center">The Safi Ecosystem</h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full mb-6"></div>
          <p className="text-neutral-500 text-xs sm:text-sm font-bold tracking-widest uppercase text-center max-w-2xl">A Unified Network of Finance, Education, and Innovation</p>
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
              <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${company.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
              
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
                  <ExternalLink className="w-4 h-4" /> Visit Website
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ================= THE SAFI BOOK ================= */}
      <section className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-[#050508] via-[#08080a] to-[#020202] z-10 border-t border-white/5 mt-10">
        <div className="max-w-4xl mx-auto">
          
          <div className="flex justify-center mb-16 relative">
            <div className="absolute inset-0 bg-yellow-500/20 blur-[100px] rounded-full"></div>
            <img 
              src="/logo-without-b.png" 
              alt="Safi Ecosystem Logo" 
              className="w-56 h-56 sm:w-80 sm:h-80 object-contain relative z-10 drop-shadow-[0_0_40px_rgba(234,179,8,0.4)]"
            />
          </div>

          <div className="prose prose-invert prose-yellow max-w-none text-center sm:text-left">
            
            <h2 className="text-3xl sm:text-5xl font-black text-white text-center mb-12 tracking-tight">
              The Blueprint of an <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">Empire</span>
            </h2>

            <div className="space-y-12 text-neutral-400 text-sm sm:text-base leading-loose font-medium">
              
              <div className="bg-white/[0.02] p-8 sm:p-12 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-500/5 rounded-full blur-[80px]"></div>
                
                <div className="w-14 h-14 bg-yellow-500/10 text-yellow-500 rounded-2xl flex items-center justify-center mb-8 mx-auto sm:mx-0 shadow-inner">
                  <Building2 className="w-7 h-7" />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-6">A Legacy Built in London</h3>
                
                <p className="text-neutral-300">
                  Safi Academy is the educational cornerstone of <strong className="text-white text-lg">Safi International Capital LTD</strong>, a prestigious financial and corporate entity registered in the United Kingdom. Operating as a Private Limited by Shares company under the official registration number <span className="text-yellow-400 font-bold bg-yellow-500/10 px-2 py-0.5 rounded">17063286</span>, we maintain the highest standards of British corporate compliance. 
                </p>
                
                <p className="mt-6 text-neutral-300">
                  Our global headquarters is strategically positioned in the heart of the UK capital at <span className="text-white font-bold">71-75 Shelton Street, Covent Garden, London</span>. This centralized hub allows us to seamlessly bridge the gap between global financial markets and innovative educational technologies. The institution is fully integrated and registered within the UK Companies House system (Tracker ID: <span className="text-yellow-400 font-bold bg-yellow-500/10 px-2 py-0.5 rounded">114-030414</span>).
                </p>

                <div className="mt-12 pt-8 border-t border-white/10 text-center">
                  <p className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 italic">
                    "We do not just adapt to the future; we architect it."
                  </p>
                  <p className="text-xs text-neutral-500 mt-4 uppercase tracking-[0.3em] font-bold">
                    — The Safi Executive Board
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER CTA ================= */}
      <section className="relative py-24 px-6 md:px-12 max-w-4xl mx-auto z-10 text-center">
        <div className="bg-gradient-to-br from-yellow-500/20 to-amber-600/5 border border-yellow-500/20 rounded-[3rem] p-12 backdrop-blur-md shadow-[0_0_50px_rgba(234,179,8,0.1)]">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Ready to shape your future?</h2>
          <p className="text-neutral-300 text-sm md:text-base mb-10 max-w-xl mx-auto leading-relaxed">
            Join thousands of students across the globe who are upgrading their skills and connecting with the Safi Ecosystem.
          </p>
          <Link href="/en/register" className="inline-block px-10 py-5 bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(234,179,8,0.4)]">
            Become a Student
          </Link>
        </div>
      </section>

    </div>
  );
}