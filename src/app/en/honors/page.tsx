"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Loader2, Trophy, Star, GraduationCap, Activity, Flame, ChevronRight } from "lucide-react";

type HonorStudent = {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  total_score: number;
  awards: { icon_url: string; title: string }[];
  certificates: number;
};

export default function WallOfFamePage() {
  const [students, setStudents] = useState<HonorStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTopStudents();
  }, []);

  const fetchTopStudents = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data: topProfiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, avatar_url, total_score")
        .eq("role", "student")
        .gt("total_score", 0)
        .order("total_score", { ascending: false })
        .limit(20);

      if (profilesError) throw profilesError;

      if (topProfiles && topProfiles.length > 0) {
        const studentIds = topProfiles.map(p => p.id);

        const { data: studentAwards } = await supabase
          .from("student_awards")
          .select(`student_id, awards(title, icon_url)`)
          .in("student_id", studentIds);

        const { data: certificates } = await supabase
          .from("certificates")
          .select("student_id")
          .in("student_id", studentIds);

        const formattedData: HonorStudent[] = topProfiles.map(profile => {
          const myAwards = studentAwards
            ?.filter(sa => sa.student_id === profile.id)
            .map(sa => {
              const aw = Array.isArray(sa.awards) ? sa.awards[0] : sa.awards;
              return { title: aw?.title || "", icon_url: aw?.icon_url || "🏅" };
            }) || [];

          const myCertificatesCount = certificates?.filter(c => c.student_id === profile.id).length || 0;

          return { ...profile, awards: myAwards, certificates: myCertificatesCount };
        });

        setStudents(formattedData);
      }
    } catch (error) {
      console.error("Error fetching honors data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Academy Legends...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-24 pb-32 relative overflow-hidden" dir="ltr">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[10%] w-[50vw] h-[50vw] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none z-0"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 space-y-16 animate-[fadeIn_0.5s_ease-out]">
        
        {/* HERO SECTION */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Trophy size={14} /> Safi Academy Wall of Fame
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
            Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">Excellence</span>
          </h1>
          <p className="text-neutral-400 text-sm md:text-base font-medium leading-relaxed">
            Click on any scholar's card to explore their dedicated profile, awards, and exclusive feedback from our expert instructors.
          </p>
        </div>

        {students.length === 0 ? (
          <div className="text-center py-20 border border-white/5 rounded-3xl bg-black/40 backdrop-blur-md">
            <Star size={48} className="mx-auto mb-4 text-neutral-600" />
            <h3 className="text-xl font-bold text-white">The Leaderboard is Waiting</h3>
            <p className="text-neutral-500 text-sm mt-2">Start earning points to be the first legend here!</p>
          </div>
        ) : (
          <div className="space-y-16">
            
            {/* ================= TOP 3 PODIUM ================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-end max-w-6xl mx-auto">
              {[1, 0, 2].map((podiumIndex) => {
                const student = students[podiumIndex];
                if (!student) return null;

                const isFirst = podiumIndex === 0;
                const isSecond = podiumIndex === 1;
                const borderColors = isFirst ? "border-yellow-400/50 shadow-[0_0_40px_rgba(250,204,21,0.25)]" : 
                                     isSecond ? "border-slate-300/50 shadow-[0_0_30px_rgba(203,213,225,0.15)]" : 
                                                "border-amber-700/50 shadow-[0_0_30px_rgba(180,83,9,0.15)]";
                const crownColor = isFirst ? "text-yellow-400" : isSecond ? "text-slate-300" : "text-amber-700";

                return (
                  <Link 
                    href={`/en/honors/${student.id}`}
                    key={student.id} 
                    className={`flex flex-col items-center bg-[#0a0a0f]/90 p-6 sm:p-8 rounded-[2.5rem] backdrop-blur-3xl border ${borderColors} relative transform transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02] group ${isFirst ? 'md:-translate-y-8 z-10' : 'opacity-90 hover:opacity-100'}`}
                  >
                    <div className={`absolute -top-6 w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl bg-[#020202] border-2 ${borderColors} ${crownColor} shadow-lg z-20`}>
                      #{podiumIndex + 1}
                    </div>

                    {/* Square Avatar for Top 3 */}
                    <div className={`w-36 h-36 sm:w-48 sm:h-48 rounded-[2rem] overflow-hidden border-4 mb-6 ${borderColors} p-1 bg-black shrink-0 relative group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-shadow`}>
                      {student.avatar_url ? (
                        <img src={student.avatar_url} className="w-full h-full object-cover rounded-[1.5rem]" />
                      ) : (
                        <div className="w-full h-full bg-neutral-900 rounded-[1.5rem] flex items-center justify-center text-5xl font-black text-white">
                          {student.first_name.charAt(0)}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-1">View Profile <ChevronRight size={12}/></span>
                      </div>
                    </div>

                    <h3 className={`text-2xl sm:text-3xl font-black text-center truncate w-full mb-2 ${isFirst ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500' : 'text-white'}`}>
                      {student.first_name} {student.last_name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-6 bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                      <Flame size={16} className={crownColor} />
                      <span className={`text-sm font-black font-mono ${crownColor}`}>{student.total_score} Pts</span>
                    </div>

                    {/* Medals & Certs */}
                    <div className="w-full pt-6 border-t border-white/10 flex flex-col gap-3">
                      {student.certificates > 0 && (
                        <div className="flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-xl text-emerald-400">
                          <GraduationCap size={16}/>
                          <span className="text-[10px] font-black uppercase tracking-widest">{student.certificates} Official Certificates</span>
                        </div>
                      )}
                      <div className="flex flex-wrap justify-center gap-2">
                        {student.awards.slice(0, 5).map((award, i) => (
                          <div key={i} title={award.title} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg shadow-inner">
                            {award.icon_url.includes("http") ? <img src={award.icon_url} className="w-6 h-6 object-contain" /> : award.icon_url}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* ================= RANKS 4-20 (Square Cards) ================= */}
            {students.length > 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-16 pt-16 border-t border-white/5">
                {students.slice(3).map((student, index) => (
                  <Link 
                    href={`/en/honors/${student.id}`}
                    key={student.id} 
                    className="bg-[#0a0a0f]/60 hover:bg-[#0a0a0f]/90 border border-white/5 hover:border-amber-500/30 p-5 rounded-[2rem] flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(245,158,11,0.1)] group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px] pointer-events-none"></div>
                    
                    <div className="flex justify-between items-center mb-4 relative z-10">
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 bg-white/5 px-3 py-1 rounded-lg">
                        Rank #{index + 4}
                      </span>
                      <ChevronRight size={16} className="text-neutral-600 group-hover:text-amber-400 transition-colors"/>
                    </div>
                    
                    {/* Square Avatar for Grid */}
                    <div className="w-full aspect-square rounded-[1.5rem] overflow-hidden border border-white/10 mb-5 bg-neutral-900 relative">
                      {student.avatar_url ? (
                        <img src={student.avatar_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl font-black text-neutral-700">
                          {student.first_name.charAt(0)}
                        </div>
                      )}
                      {/* Gradient Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-xs font-bold text-amber-400">View Full Profile</span>
                      </div>
                    </div>
                    
                    <h4 className="text-lg font-black text-white truncate w-full text-center group-hover:text-amber-400 transition-colors">{student.first_name} {student.last_name}</h4>
                    <p className="text-sm text-amber-500 font-black font-mono mt-1 mb-5 flex items-center justify-center gap-1.5 bg-amber-500/10 w-fit mx-auto px-3 py-1 rounded-lg">
                      <Activity size={14}/> {student.total_score} Pts
                    </p>

                    <div className="flex items-center gap-2 mt-auto w-full pt-4 border-t border-white/5 justify-center">
                      {student.certificates > 0 && (
                        <span className="text-emerald-400 bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20" title={`${student.certificates} Certificates`}><GraduationCap size={16}/></span>
                      )}
                      {student.awards.slice(0, 4).map((award, i) => (
                        <span key={i} className="text-base bg-white/5 p-1.5 rounded-lg border border-white/10" title={award.title}>
                          {award.icon_url.includes("http") ? <img src={award.icon_url} className="w-4 h-4 inline object-contain" /> : award.icon_url}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}