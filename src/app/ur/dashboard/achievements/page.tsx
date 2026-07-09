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
        // 1. دریافت امتیاز کل از پروفایل
        const { data: profile } = await supabase
          .from("profiles")
          .select("total_score")
          .eq("id", userId)
          .single();
        
        if (profile) setTotalScore(profile.total_score || 0);

        // 2. دریافت گواهینامه‌ها + نام دوره‌ها
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

        // 3. دریافت نشان‌ها و جوایز (گیمیفیکیشن)
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
              icon_url: awardDetails?.icon_url || "🏆", // می‌تواند یک ایموجی یا آدرس عکس باشد
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
    <div className="w-full pb-12">
      
      {/* ================= Header (تراز با سایدبار) ================= */}
      <header className="h-24 px-8 md:px-12 flex justify-between items-center animate-[fadeIn_0.5s_ease-out] border-b border-white/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Achievements</span>
          </h1>
          <p className="text-neutral-500 mt-1 text-sm hidden md:block">Your hard work, beautifully rewarded.</p>
        </div>
        
        {/* نمایش امتیازات (Points) در هدر */}
        <div className="flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-xl backdrop-blur-md">
          <span className="text-xl">⚡</span>
          <div>
            <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest">Total Points</p>
            <p className="text-lg font-extrabold text-white leading-none">{isLoading ? "..." : totalScore}</p>
          </div>
        </div>
      </header>

      <div className="px-8 md:px-12 pt-8 max-w-7xl mx-auto space-y-16">

        {/* ================= Certificates Section ================= */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-xl">🎓</div>
            <h2 className="text-2xl font-bold text-white">Official Certificates</h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2].map(i => <div key={i} className="h-64 bg-neutral-900/40 rounded-[2rem] border border-white/5 animate-pulse"></div>)}
            </div>
          ) : certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {certificates.map((cert) => (
                <div key={cert.id} className="relative bg-gradient-to-br from-neutral-900/80 to-[#0a0a0a] rounded-[2rem] border border-white/10 p-1 overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(234,179,8,0.15)] transition-all duration-500">
                  {/* بک‌گراند نوری کارت */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-[50px] pointer-events-none"></div>
                  
                  <div className="bg-[#050505]/50 backdrop-blur-xl rounded-[1.8rem] h-full p-6 md:p-8 flex flex-col relative z-10 border border-white/5">
                    {/* آیکون گواهینامه */}
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.4)] mb-6 text-black">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                    </div>

                    <p className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-2">Certificate of Completion</p>
                    <h3 className="text-xl font-extrabold text-white mb-2 leading-tight">{cert.course_name}</h3>
                    
                    <div className="mt-auto pt-6 border-t border-white/10 space-y-2">
                      <div className="flex justify-between text-xs text-neutral-400">
                        <span>Issued On:</span>
                        <span className="font-bold text-white">{new Date(cert.issue_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex justify-between text-xs text-neutral-400">
                        <span>Credential ID:</span>
                        <span className="font-mono text-white">{cert.certificate_code}</span>
                      </div>
                    </div>

                    <a 
                      href={cert.certificate_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-6 w-full py-3 bg-white/5 hover:bg-yellow-500 text-white hover:text-black border border-white/10 hover:border-yellow-500 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      Download PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-neutral-900/40 p-8 md:p-12 rounded-[2rem] border border-white/5 flex flex-col items-center justify-center text-center shadow-lg">
              <div className="text-4xl mb-4 opacity-50">📜</div>
              <h3 className="text-xl font-bold text-white mb-2">No Certificates Yet</h3>
              <p className="text-neutral-400 text-sm max-w-sm">Complete a course to earn your first official Safi Academy certificate. Your hard work will be showcased here.</p>
            </div>
          )}
        </section>

        {/* ================= Badges & Awards Section ================= */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-xl">🏆</div>
            <h2 className="text-2xl font-bold text-white">Badges & Awards</h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-40 bg-neutral-900/40 rounded-3xl border border-white/5 animate-pulse"></div>)}
            </div>
          ) : awards.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {awards.map((award) => (
                <div key={award.id} className="bg-neutral-900/40 border border-white/5 rounded-3xl p-6 flex flex-col items-center text-center hover:bg-neutral-900/80 transition-all hover:scale-105 hover:border-yellow-500/30 group">
                  {/* آیکون یا تصویر نشان */}
                  <div className="w-20 h-20 bg-gradient-to-br from-neutral-800 to-black rounded-2xl rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-xl border border-white/10 flex items-center justify-center text-4xl mb-4">
                    {/* بررسی اینکه آیا آدرس تصویر است یا فقط یک ایموجی */}
                    {award.icon_url.includes("http") || award.icon_url.includes("/") ? (
                      <img src={award.icon_url} alt={award.title} className="w-12 h-12 object-contain drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
                    ) : (
                      <span className="drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">{award.icon_url}</span>
                    )}
                  </div>
                  <h4 className="text-white font-bold text-sm mb-1">{award.title}</h4>
                  <p className="text-neutral-500 text-[10px] leading-tight mb-3">{award.description}</p>
                  <div className="mt-auto px-2 py-1 bg-white/5 rounded text-[9px] text-neutral-400 font-mono">
                    {new Date(award.awarded_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-neutral-900/40 p-8 rounded-[2rem] border border-white/5 flex flex-col items-center justify-center text-center shadow-lg">
              <div className="text-4xl mb-4 opacity-50">🏅</div>
              <h3 className="text-xl font-bold text-white mb-2">No Badges Yet</h3>
              <p className="text-neutral-400 text-sm">Be active, submit assignments, and score points to unlock exclusive Academy badges.</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}