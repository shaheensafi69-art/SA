"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Award, Trophy, ScrollText, Medal } from "lucide-react";

// ================= TYPES =================
type CertificateItem = {
  id: string;
  course_name: string;
  certificate_code: string;
  issue_date: string;
  certificate_url: string;
};

type AwardItem = {
  id: string;
  title: string;
  description: string;
  icon_url: string;
  awarded_at: string;
};

export default function AchievementsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [totalScore, setTotalScore] = useState(0);
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [awards, setAwards] = useState<AwardItem[]>([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        router.push("/en/login");
        return;
      }
      const userId = session.user.id;

      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("total_score")
          .eq("id", userId)
          .single();
        
        if (profile) setTotalScore(profile.total_score || 0);

        const { data: certData } = await supabase
          .from("certificates")
          .select(`
            id,
            certificate_code,
            issue_date,
            certificate_url,
            courses (title)
          `)
          .eq("student_id", userId)
          .order("issue_date", { ascending: false });

        if (certData) {
          const formattedCerts = certData.map((cert: any) => {
            const courseData = Array.isArray(cert.courses) ? cert.courses[0] : cert.courses;
            return {
              id: cert.id,
              course_name: courseData?.title || "Safi Academy Course",
              certificate_code: cert.certificate_code,
              issue_date: cert.issue_date,
              certificate_url: cert.certificate_url,
            };
          });
          setCertificates(formattedCerts);
        }

        const { data: awardData } = await supabase
          .from("student_awards")
          .select(`
            id,
            awarded_at,
            awards (
              title,
              description,
              icon_url
            )
          `)
          .eq("student_id", userId)
          .order("awarded_at", { ascending: false });

        if (awardData) {
          const formattedAwards = awardData.map((item: any) => {
            const awardDetails = Array.isArray(item.awards) ? item.awards[0] : item.awards;
            return {
              id: item.id,
              title: awardDetails?.title || "Special Award",
              description: awardDetails?.description || "Earned for outstanding performance.",
              icon_url: awardDetails?.icon_url || "",
              awarded_at: item.awarded_at,
            };
          });
          setAwards(formattedAwards);
        }

      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, [router]);

  return (
    <div className="relative w-full min-h-screen bg-[#030305] font-sans pb-24 lg:pb-8">
      
      {/* ================= BACKGROUND GLOW EFFECTS ================= */}
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      {/* ================= DESKTOP HEADER (HIDDEN ON MOBILE) ================= */}
      <header className="hidden sm:flex sticky top-0 h-24 px-8 lg:px-12 justify-between items-center bg-[#030305]/80 backdrop-blur-xl border-b border-white/5 z-40 shrink-0">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Trophy className="text-blue-500" size={28} />
            My Achievements
          </h1>
          <p className="text-xs text-neutral-500 mt-1.5 font-bold uppercase tracking-widest">A structured record of your academic milestones</p>
        </div>
        
        {/* TOTAL POINTS BADGE */}
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Medal size={20} />
          </div>
          <div>
            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest leading-none mb-1">Total Points</p>
            <p className="text-xl font-black text-white leading-none tracking-tight">
              {isLoading ? "..." : totalScore.toLocaleString()}
            </p>
          </div>
        </div>
      </header>

      {/* ================= MOBILE TOTAL POINTS HEADER ================= */}
      <div className="sm:hidden px-4 pt-6 pb-2 relative z-10">
        <h1 className="text-2xl font-black text-white tracking-tight mb-4 flex items-center gap-2">
          <Trophy className="text-blue-500" size={24} />
          Achievements
        </h1>
        <div className="flex items-center justify-between bg-gradient-to-r from-blue-900/40 to-indigo-900/20 border border-blue-500/20 p-4 rounded-[1.5rem] shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Medal size={20} />
            </div>
            <div>
              <p className="text-[10px] text-blue-300/70 font-bold uppercase tracking-widest mb-0.5">Total Score</p>
              <p className="text-xl font-black text-white leading-none tracking-tight">
                {isLoading ? "..." : totalScore.toLocaleString()} <span className="text-xs text-blue-400 font-bold">XP</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT SECTION ================= */}
      <div className="px-4 sm:px-8 lg:px-12 pt-6 sm:pt-10 max-w-[85rem] mx-auto w-full space-y-12 sm:space-y-16 relative z-10">

        {/* ================= CERTIFICATES SECTION ================= */}
        <section className="animate-[fadeIn_0.3s_ease-out]">
          <div className="flex items-center gap-3 mb-6 sm:mb-8 border-b border-white/5 pb-4">
            <ScrollText className="text-indigo-400" size={20} />
            <h2 className="text-lg sm:text-xl font-black text-white tracking-wide">Official Certificates</h2>
            <span className="px-2.5 py-1 bg-white/5 rounded-md text-[10px] sm:text-xs font-bold text-neutral-400">{certificates.length}</span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {[1, 2].map(i => <div key={i} className="h-40 sm:h-56 bg-white/[0.02] rounded-[1.5rem] sm:rounded-3xl border border-white/5 animate-pulse"></div>)}
            </div>
          ) : certificates.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {certificates.map((cert) => (
                <div key={cert.id} className="group bg-[#0a0a0f]/80 backdrop-blur-md border border-white/5 hover:border-indigo-500/30 rounded-[1.5rem] sm:rounded-3xl p-5 sm:p-8 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(79,70,229,0.1)] hover:-translate-y-1 flex flex-col sm:flex-row gap-5 sm:gap-6 items-start sm:items-center">
                  
                  <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 rounded-[1rem] sm:rounded-2xl flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform duration-300">
                    <ScrollText size={28} strokeWidth={1.5} />
                  </div>

                  <div className="flex-1 w-full">
                    <p className="text-[9px] sm:text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 sm:mb-1.5">Verified Credential</p>
                    <h3 className="text-base sm:text-lg font-black text-white mb-3 sm:mb-4 leading-tight line-clamp-2">{cert.course_name}</h3>
                    
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-[11px] sm:text-xs">
                      <div className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 flex justify-between sm:justify-start">
                        <span className="text-neutral-500 mr-2">Issued:</span>
                        <span className="text-neutral-200 font-bold">{new Date(cert.issue_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 flex justify-between sm:justify-start">
                        <span className="text-neutral-500 mr-2">ID:</span>
                        <span className="text-neutral-200 font-mono font-bold tracking-wider">{cert.certificate_code}</span>
                      </div>
                    </div>
                  </div>

                  {cert.certificate_url && (
                    <a 
                      href={cert.certificate_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto mt-2 sm:mt-0 shrink-0 px-5 py-3 sm:py-3.5 bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/20 rounded-xl text-xs font-black transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide"
                    >
                      <ScrollText size={16} />
                      View PDF
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#0a0a0f]/50 p-10 sm:p-12 rounded-[2rem] sm:rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/10 text-neutral-500">
                <ScrollText size={32} />
              </div>
              <h3 className="text-base sm:text-lg font-black text-white mb-2">No Certificates Yet</h3>
              <p className="text-neutral-500 text-xs sm:text-sm max-w-sm">Your completed course certificates will securely appear here.</p>
            </div>
          )}
        </section>

        {/* ================= AWARDS & BADGES SECTION ================= */}
        <section className="animate-[fadeIn_0.5s_ease-out]">
          <div className="flex items-center gap-3 mb-6 sm:mb-8 border-b border-white/5 pb-4">
            <Award className="text-yellow-500" size={20} />
            <h2 className="text-lg sm:text-xl font-black text-white tracking-wide">Badges & Honors</h2>
            <span className="px-2.5 py-1 bg-white/5 rounded-md text-[10px] sm:text-xs font-bold text-neutral-400">{awards.length}</span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-40 sm:h-44 bg-white/[0.02] rounded-[1.5rem] sm:rounded-3xl border border-white/5 animate-pulse"></div>)}
            </div>
          ) : awards.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
              {awards.map((award) => (
                <div key={award.id} className="group flex flex-col items-center p-5 sm:p-6 bg-[#0a0a0f]/80 backdrop-blur-sm border border-white/5 rounded-[1.5rem] sm:rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/30 hover:shadow-[0_10px_25px_rgba(234,179,8,0.1)]">
                  
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-b from-white/10 to-transparent rounded-2xl border border-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                    {award.icon_url && (award.icon_url.includes("http") || award.icon_url.includes("/")) ? (
                      <img src={award.icon_url} alt={award.title} className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-lg" />
                    ) : (
                      <Award size={28} className="text-yellow-500" />
                    )}
                  </div>
                  
                  <h4 className="text-white font-black text-xs sm:text-sm mb-1.5 text-center leading-tight group-hover:text-yellow-400 transition-colors line-clamp-2">{award.title}</h4>
                  <p className="text-neutral-500 text-[9px] sm:text-[10px] text-center leading-relaxed mb-4 font-bold line-clamp-2">{award.description}</p>
                  
                  <div className="mt-auto px-3 py-1 bg-white/5 rounded-lg text-[9px] sm:text-[10px] text-neutral-400 font-bold border border-white/5">
                    {new Date(award.awarded_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#0a0a0f]/50 p-10 sm:p-12 rounded-[2rem] sm:rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/10 text-neutral-500">
                <Award size={32} />
              </div>
              <h3 className="text-base sm:text-lg font-black text-white mb-2">No Badges Yet</h3>
              <p className="text-neutral-500 text-xs sm:text-sm max-w-sm">Complete assignments and participate in activities to unlock academy badges.</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}