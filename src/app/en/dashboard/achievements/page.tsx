"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

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
  const [isLoading, setIsLoading] = useState(true);
  const [totalScore, setTotalScore] = useState(0);
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [awards, setAwards] = useState<AwardItem[]>([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) return;
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
              icon_url: awardDetails?.icon_url || "🏅",
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
  }, []);

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col bg-[#030305] font-sans overflow-y-auto custom-scrollbar select-none z-10 pb-24 lg:pb-8">
      
      {/* ================= افکت‌های نوری آرامش‌بخش (اقیانوسی/نیلی) ================= */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.02] grayscale scale-125 fixed">
         <img src="/logo-without-b.png" alt="watermark" className="w-full max-w-xl object-contain blur-[1px]" />
      </div>

      {/* ================= هدر مینیمال و قدرتمند ================= */}
      <header className="sticky top-0 h-24 px-6 sm:px-10 lg:px-12 flex justify-between items-center bg-[#050508]/80 backdrop-blur-2xl border-b border-white/5 z-40 shrink-0">
        <div>
          <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Achievements</span>
          </h1>
          <p className="text-xs text-neutral-500 hidden sm:block mt-1 font-medium">A structured record of your academic milestones.</p>
        </div>
        
        {/* امتیازات با دیزاین منظم و باوقار */}
        <div className="flex items-center gap-4 bg-[#0a0a0f] border border-blue-500/20 px-5 py-3 rounded-2xl shadow-sm">
          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div>
            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest leading-none mb-1">Total Points</p>
            <p className="text-base sm:text-xl font-black text-white leading-none tracking-tight">
              {isLoading ? "..." : totalScore.toLocaleString()}
            </p>
          </div>
        </div>
      </header>

      {/* ================= محتوای اصلی (ساختاریافته و منظم) ================= */}
      <div className="px-6 sm:px-10 lg:px-12 pt-10 pb-16 max-w-7xl mx-auto w-full space-y-16 relative z-10">

        {/* ================= بخش گواهینامه‌ها ================= */}
        <section className="animate-[fadeIn_0.5s_ease-out]">
          <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
            <h2 className="text-xl font-bold text-white tracking-wide">Official Certificates</h2>
            <span className="px-2.5 py-1 bg-white/5 rounded-md text-xs font-bold text-neutral-400">{certificates.length}</span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2].map(i => <div key={i} className="h-56 bg-white/[0.02] rounded-3xl border border-white/5 animate-pulse"></div>)}
            </div>
          ) : certificates.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <div key={cert.id} className="group relative bg-[#09090d] border border-white/5 hover:border-blue-500/30 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(59,130,246,0.1)] hover:-translate-y-1 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  
                  {/* آیکون مینیمال */}
                  <div className="w-16 h-16 shrink-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                  </div>

                  {/* اطلاعات محتوا */}
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1.5">Verified Credential</p>
                    <h3 className="text-lg font-bold text-white mb-4 leading-tight">{cert.course_name}</h3>
                    
                    <div className="flex flex-wrap gap-4 text-xs">
                      <div className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                        <span className="text-neutral-500 mr-2">Issued:</span>
                        <span className="text-neutral-200 font-medium">{new Date(cert.issue_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                        <span className="text-neutral-500 mr-2">ID:</span>
                        <span className="text-neutral-200 font-mono tracking-wider">{cert.certificate_code}</span>
                      </div>
                    </div>
                  </div>

                  {/* دکمه اکشن (آرام و کاربردی) */}
                  <a 
                    href={cert.certificate_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto mt-4 sm:mt-0 shrink-0 px-5 py-3 bg-white/5 hover:bg-blue-600 text-white border border-white/10 hover:border-blue-500 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    View PDF
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#09090d] p-12 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-2xl mb-4 border border-white/10 text-neutral-500">📜</div>
              <h3 className="text-lg font-bold text-white mb-2">No Certificates Yet</h3>
              <p className="text-neutral-500 text-sm max-w-sm">Your completed course certificates will securely appear here.</p>
            </div>
          )}
        </section>

        {/* ================= ویترین نشان‌ها (منظم و قدرتمند) ================= */}
        <section className="animate-[fadeIn_0.7s_ease-out]">
          <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
            <h2 className="text-xl font-bold text-white tracking-wide">Badges & Honors</h2>
            <span className="px-2.5 py-1 bg-white/5 rounded-md text-xs font-bold text-neutral-400">{awards.length}</span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-44 bg-white/[0.02] rounded-3xl border border-white/5 animate-pulse"></div>)}
            </div>
          ) : awards.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {awards.map((award) => (
                <div key={award.id} className="group flex flex-col items-center p-6 bg-[#09090d] border border-white/5 rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/20 hover:bg-[#0c0c11]">
                  
                  {/* باکس آیکون نشان */}
                  <div className="w-16 h-16 bg-gradient-to-b from-white/10 to-transparent rounded-2xl border border-white/5 flex items-center justify-center text-3xl mb-4 group-hover:scale-105 transition-transform duration-300">
                    {award.icon_url.includes("http") || award.icon_url.includes("/") ? (
                      <img src={award.icon_url} alt={award.title} className="w-10 h-10 object-contain drop-shadow-lg" />
                    ) : (
                      <span>{award.icon_url}</span>
                    )}
                  </div>
                  
                  <h4 className="text-neutral-200 font-bold text-sm mb-1.5 text-center leading-tight group-hover:text-white transition-colors">{award.title}</h4>
                  <p className="text-neutral-500 text-[10px] text-center leading-relaxed mb-4 font-medium">{award.description}</p>
                  
                  <div className="mt-auto px-3 py-1 bg-black/40 rounded-md text-[10px] text-neutral-500 font-medium">
                    {new Date(award.awarded_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#09090d] p-12 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-2xl mb-4 border border-white/10 text-neutral-500">🎖️</div>
              <h3 className="text-lg font-bold text-white mb-2">No Badges Yet</h3>
              <p className="text-neutral-500 text-sm max-w-sm">Complete assignments and participate in activities to unlock badges.</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}