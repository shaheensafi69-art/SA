"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Loader2, ArrowLeft, Trophy, GraduationCap, Flame, MessageSquareQuote, CheckCircle2, Target, CalendarDays, Activity, BookOpen } from "lucide-react";

type StudentDetails = {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  bio: string | null;
  total_score: number;
  created_at: string;
};

type FeedbackItem = {
  id: string;
  type: "Journal" | "Assignment" | "Quiz";
  title: string;
  score: string | number;
  feedback: string;
  date: string;
};

export default function StudentHonorProfilePage() {
  const params = useParams();
  const studentId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<StudentDetails | null>(null);
  const [awards, setAwards] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);

  useEffect(() => {
    if (studentId) fetchStudentData();
  }, [studentId]);

  const fetchStudentData = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      // 1. Profile Data
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, avatar_url, bio, total_score, created_at")
        .eq("id", studentId)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // 2. Awards
      const { data: awardsData } = await supabase
        .from("student_awards")
        .select(`awards(title, icon_url, description)`)
        .eq("student_id", studentId);
      
      setAwards(awardsData?.map((a: any) => Array.isArray(a.awards) ? a.awards[0] : a.awards) || []);

      // 3. Certificates
      const { data: certsData } = await supabase
        .from("certificates")
        .select(`issue_date, courses(title)`)
        .eq("student_id", studentId);
      
      setCertificates(certsData?.map((c: any) => ({
        issue_date: c.issue_date,
        course_title: Array.isArray(c.courses) ? c.courses[0]?.title : c.courses?.title
      })) || []);

      // 4. Gather Feedbacks (Journals, Assignments, Quizzes)
      let allFeedbacks: FeedbackItem[] = [];

      // A) Trading Journals Feedback
      const { data: journals } = await supabase
        .from("trading_journals")
        .select("id, symbol, teacher_score, teacher_feedback, created_at")
        .eq("student_id", studentId)
        .not("teacher_feedback", "is", null);
      
      if (journals) {
        journals.forEach(j => {
          allFeedbacks.push({
            id: `j-${j.id}`, type: "Journal", title: `Trade: ${j.symbol}`,
            score: `${j.teacher_score}/10`, feedback: j.teacher_feedback, date: j.created_at
          });
        });
      }

      // B) Assignments Feedback
      const { data: assignments } = await supabase
        .from("assignment_submissions")
        .select(`id, grade, feedback, submitted_at, assignments(title)`)
        .eq("student_id", studentId)
        .not("feedback", "is", null);

      if (assignments) {
        assignments.forEach((a: any) => { // اضافه شدن : any برای رفع خطای تایپ‌اسکریپت
          const assignmentObj = Array.isArray(a.assignments) ? a.assignments[0] : a.assignments;
          const assignmentTitle = assignmentObj?.title || "Assignment";
          
          allFeedbacks.push({
            id: `a-${a.id}`, 
            type: "Assignment", 
            title: assignmentTitle,
            score: a.grade ? String(a.grade) : "Graded", 
            feedback: a.feedback, 
            date: a.submitted_at
          });
        });
      }

      // C) Quiz Feedback
      const { data: quizzes } = await supabase
        .from("quiz_attempts")
        .select(`id, score, letter_grade, teacher_general_feedback, attempted_at, quizzes(title)`)
        .eq("student_id", studentId)
        .not("teacher_general_feedback", "is", null);

      if (quizzes) {
        quizzes.forEach((q: any) => { // اضافه شدن : any برای رفع خطای تایپ‌اسکریپت
          const quizObj = Array.isArray(q.quizzes) ? q.quizzes[0] : q.quizzes;
          const quizTitle = quizObj?.title || "Quiz";
          
          allFeedbacks.push({
            id: `q-${q.id}`, 
            type: "Quiz", 
            title: quizTitle,
            score: `${q.score} (${q.letter_grade || '-'})`, 
            feedback: q.teacher_general_feedback, 
            date: q.attempted_at
          });
        });
      }

      // Sort feedbacks by date (newest first)
      allFeedbacks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setFeedbacks(allFeedbacks);

    } catch (error) {
      console.error("Error fetching student profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Scholar Profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">Profile Not Found</h2>
        <Link href="/en/honors" className="text-amber-500 hover:underline">Return to Wall of Fame</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-24 pb-32 relative overflow-hidden" dir="ltr">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 animate-[fadeIn_0.5s_ease-out]">
        
        <Link href="/en/honors" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-amber-400 transition-colors mb-8 bg-white/5 px-4 py-2 rounded-xl border border-white/5 w-fit">
          <ArrowLeft size={14} /> Back to Wall of Fame
        </Link>

        {/* ================= HEADER: STUDENT HERO ================= */}
        <section className="bg-[#0a0a0f]/80 p-8 sm:p-12 rounded-[3rem] border border-white/5 backdrop-blur-3xl shadow-2xl mb-8 flex flex-col md:flex-row gap-10 items-center md:items-start relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500"></div>
          
          <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-[2.5rem] overflow-hidden border-4 border-amber-500/20 p-2 bg-black shrink-0 shadow-[0_0_50px_rgba(245,158,11,0.15)] relative">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} className="w-full h-full object-cover rounded-[2rem]" />
            ) : (
              <div className="w-full h-full bg-neutral-900 rounded-[2rem] flex items-center justify-center text-7xl font-black text-white">
                {profile.first_name.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-amber-400 mb-4">
              <Trophy size={12} /> Verified Academy Scholar
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4">{profile.first_name} {profile.last_name}</h1>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl mb-8">
              {profile.bio || "This dedicated scholar is actively forging their path to mastery at Safi Academy."}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="bg-black/40 border border-white/5 px-6 py-4 rounded-2xl flex items-center gap-4">
                <Flame size={24} className="text-amber-500"/>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Academic Score</p>
                  <p className="text-2xl font-black text-white font-mono">{profile.total_score}</p>
                </div>
              </div>
              <div className="bg-black/40 border border-white/5 px-6 py-4 rounded-2xl flex items-center gap-4">
                <CalendarDays size={24} className="text-neutral-500"/>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Joined Academy</p>
                  <p className="text-lg font-bold text-white">{new Date(profile.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
          
          {/* ================= LEFT COL: AWARDS & CERTS ================= */}
          <div className="space-y-8">
            
            {/* Certificates */}
            <div className="bg-[#0a0a0f]/80 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-xl">
              <h3 className="text-lg font-black text-white flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
                <GraduationCap size={20} className="text-emerald-400"/> Official Certifications
              </h3>
              {certificates.length === 0 ? (
                <p className="text-sm text-neutral-500 italic">No certificates earned yet.</p>
              ) : (
                <div className="space-y-4">
                  {certificates.map((cert, i) => (
                    <div key={i} className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-2xl">
                      <p className="text-sm font-bold text-emerald-400 line-clamp-2 leading-snug">{cert.course_title}</p>
                      <p className="text-[10px] text-emerald-500/70 font-mono mt-2 uppercase tracking-widest">Issued: {new Date(cert.issue_date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Honors & Medals */}
            <div className="bg-[#0a0a0f]/80 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-xl">
              <h3 className="text-lg font-black text-white flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
                <Trophy size={20} className="text-amber-400"/> Honors & Medals
              </h3>
              {awards.length === 0 ? (
                <p className="text-sm text-neutral-500 italic">Exploring paths to earn the first medal.</p>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {awards.map((award, i) => (
                    <div key={i} className="bg-black/40 border border-white/5 p-4 rounded-2xl flex flex-col items-center text-center group hover:border-amber-500/30 transition-colors">
                      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                        {award.icon_url.includes("http") ? <img src={award.icon_url} className="w-8 h-8 mx-auto" /> : award.icon_url}
                      </div>
                      <p className="text-xs font-bold text-white mb-1">{award.title}</p>
                      <p className="text-[9px] text-neutral-500 leading-tight line-clamp-2">{award.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* ================= RIGHT COL: INSTRUCTOR REVIEWS & EFFORTS ================= */}
          <div className="bg-[#0a0a0f]/80 p-8 sm:p-12 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-xl flex flex-col h-full">
            <h3 className="text-2xl font-black text-white flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
              <MessageSquareQuote size={28} className="text-blue-400"/> Instructor Feedback & Efforts
            </h3>
            
            <div className="flex-1">
              {feedbacks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-neutral-500 py-12">
                  <BookOpen size={48} className="mb-4 opacity-30"/>
                  <p className="text-sm font-bold">This scholar's academic journey is just beginning.</p>
                  <p className="text-xs mt-2">Check back later for verified instructor reviews.</p>
                </div>
              ) : (
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                  {feedbacks.map((item, i) => {
                    const typeColor = item.type === "Journal" ? "text-blue-400 bg-blue-500/10 border-blue-500/20" :
                                      item.type === "Assignment" ? "text-purple-400 bg-purple-500/10 border-purple-500/20" :
                                      "text-orange-400 bg-orange-500/10 border-orange-500/20";
                    
                    const TypeIcon = item.type === "Journal" ? Activity : item.type === "Assignment" ? Target : CheckCircle2;

                    return (
                      <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        {/* Timeline Dot */}
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0a0a0f] bg-neutral-800 text-neutral-400 group-hover:text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg z-10 transition-colors">
                          <TypeIcon size={16} />
                        </div>
                        
                        {/* Feedback Card */}
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-black/40 border border-white/5 p-5 rounded-2xl hover:bg-white/[0.02] hover:border-white/10 transition-all">
                          <div className="flex justify-between items-start mb-3">
                            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${typeColor}`}>
                              {item.type}
                            </span>
                            <span className="text-[10px] text-neutral-500 font-mono">{new Date(item.date).toLocaleDateString()}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white mb-2 leading-snug">{item.title}</h4>
                          <p className="text-xs text-neutral-400 italic leading-relaxed pl-3 border-l-2 border-white/10 mb-3">
                            "{item.feedback}"
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Score / Grade:</span>
                            <span className="text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded">{item.score}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}