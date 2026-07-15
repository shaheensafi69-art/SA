"use client";

import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ClipboardCheck, PlusCircle, Calendar, Trash2, Eye, Loader2, Clock, FileText, BarChart3, Filter } from "lucide-react";

type Assignment = {
  id: string;
  class_group_id: string;
  class_name: string;
  title: string;
  description: string;
  deadline: string | null; // 🔥 اصلاح شد: هماهنگ با دیتابیس شما
  max_score: number;
  created_at: string;
  submission_count: number;
};

type ClassOption = {
  id: string;
  class_name: string;
};

export default function TeacherAssignmentsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>("all");

  useEffect(() => {
    fetchAssignmentsData();
  }, []);

  const fetchAssignmentsData = async () => {
    setIsLoading(true);
    const supabase = createClient();
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      router.push("/en/login");
      return;
    }

    try {
      const { data: classesData, error: classesError } = await supabase
        .from("class_groups")
        .select("id, class_name")
        .eq("teacher_id", session.user.id);

      if (classesError) throw classesError;

      if (classesData && classesData.length > 0) {
        setClasses(classesData);
        const classIds = classesData.map(c => c.id);

        // 🔥 اصلاح شد: خواندن فیلد deadline به جای due_date
        const { data: assignmentsData, error: assignError } = await supabase
          .from("assignments")
          .select("id, class_group_id, title, description, deadline, max_score, created_at")
          .in("class_group_id", classIds)
          .order("created_at", { ascending: false });

        if (assignError) throw assignError;

        if (assignmentsData) {
          const formatted = assignmentsData.map((item: any) => {
            const targetClass = classesData.find(c => c.id === item.class_group_id);
            return {
              id: item.id,
              class_group_id: item.class_group_id,
              class_name: targetClass ? targetClass.class_name : "Unknown Class",
              title: item.title,
              description: item.description || "No description provided.",
              deadline: item.deadline, // هماهنگ با دیتابیس
              max_score: item.max_score || 100,
              created_at: item.created_at,
              submission_count: 0 // در آینده از جدول Submissions خوانده می‌شود
            };
          });
          setAssignments(formatted);
        }
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAssignment = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete the assignment: "${title}"?`)) return;

    setIsDeletingId(id);
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from("assignments")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setAssignments(prev => prev.filter(item => item.id !== id));
      alert("Assignment deleted successfully.");
    } catch (error: any) {
      alert("Failed to delete assignment: " + error.message);
    } finally {
      setIsDeletingId(null);
    }
  };

  const filteredAssignments = useMemo(() => {
    if (selectedClassFilter === "all") return assignments;
    return assignments.filter(item => item.class_group_id === selectedClassFilter);
  }, [assignments, selectedClassFilter]);

  const stats = useMemo(() => {
    const total = assignments.length;
    const dueSoon = assignments.filter(item => item.deadline && new Date(item.deadline) > new Date()).length;
    return { total, dueSoon };
  }, [assignments]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
        <p className="text-neutral-500 text-xs font-black uppercase tracking-widest animate-pulse">Loading Terminal...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-4 sm:p-6 md:p-10 relative overflow-hidden pb-24" dir="ltr">
      
      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-fuchsia-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 sm:space-y-12 animate-[fadeIn_0.4s_ease-out]">
        
        {/* ================= PREMIUM HEADER ================= */}
        <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 bg-[#0a0a0f]/80 p-6 sm:p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500/20 to-purple-500/5 text-fuchsia-400 rounded-2xl flex items-center justify-center border border-fuchsia-500/20 shadow-inner shrink-0">
              <ClipboardCheck size={32} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-2">
                Assignments <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500">Terminal</span>
              </h1>
              <p className="text-xs sm:text-base text-neutral-400 font-medium max-w-md leading-relaxed tracking-wide">
                Issue academic operations, manage deadlines, and evaluate student submittals.
              </p>
            </div>
          </div>
          
          <Link 
            href="/en/teacher/assignments/create"
            className="w-full lg:w-auto px-8 py-4.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 rounded-2xl text-xs font-black text-white uppercase tracking-widest transition-all shadow-[0_15px_40px_rgba(217,70,239,0.3)] flex items-center justify-center gap-3 active:scale-95 shrink-0"
          >
            <PlusCircle size={18} /> Create Assignment
          </Link>
        </header>

        {/* ================= STATS BAR ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-[#0a0a0f]/60 border border-white/5 p-6 rounded-2xl flex items-center gap-5 backdrop-blur-xl shadow-lg">
            <div className="w-12 h-12 bg-fuchsia-500/10 text-fuchsia-400 rounded-xl flex items-center justify-center border border-fuchsia-500/10"><FileText size={20}/></div>
            <div>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Total Issued</p>
              <h3 className="text-2xl font-black text-white mt-0.5">{stats.total} Tasks</h3>
            </div>
          </div>
          <div className="bg-[#0a0a0f]/60 border border-white/5 p-6 rounded-2xl flex items-center gap-5 backdrop-blur-xl shadow-lg">
            <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center border border-purple-500/10"><Clock size={20}/></div>
            <div>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest">Active Deadlines</p>
              <h3 className="text-2xl font-black text-white mt-0.5">{stats.dueSoon} Pending</h3>
            </div>
          </div>
          <div className="bg-[#0a0a0f]/60 border border-white/5 p-5 rounded-2xl flex items-center gap-4 backdrop-blur-xl shadow-lg sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-white/5 text-neutral-400 rounded-xl flex items-center justify-center border border-white/5 shrink-0"><Filter size={18}/></div>
            <div className="flex-1">
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest ml-1 mb-1">Filter by Class</p>
              <select 
                value={selectedClassFilter}
                onChange={(e) => setSelectedClassFilter(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-neutral-300 focus:outline-none focus:border-fuchsia-500/50 appearance-none shadow-inner"
              >
                <option value="all">All Classroom Roster</option>
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.class_name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ================= ASSIGNMENTS HUB (GRID LIST) ================= */}
        {filteredAssignments.length === 0 ? (
          <div className="text-center py-24 bg-white/[0.01] border border-dashed border-white/10 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
            <BarChart3 size={56} className="text-neutral-700 mx-auto mb-4" />
            <h3 className="text-xl font-black text-white mb-2">No Assignments Found</h3>
            <p className="text-neutral-400 text-sm max-w-xs mx-auto">There are no operational tasks issued under this configuration filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAssignments.map((task) => {
              const isExpired = task.deadline ? new Date(task.deadline) < new Date() : false;
              
              return (
                <div key={task.id} className="bg-[#0a0a0f]/90 border border-white/5 rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between group hover:border-fuchsia-500/30 transition-all duration-300 shadow-2xl hover:shadow-[0_25px_50px_rgba(217,70,239,0.05)] relative overflow-hidden">
                  
                  <div className="absolute top-6 right-6 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg text-[10px] font-black tracking-wider uppercase">
                    Max: {task.max_score} Pts
                  </div>

                  <div className="space-y-4 flex-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/5 px-2.5 py-1 rounded-md border border-purple-500/10 inline-block">
                      {task.class_name}
                    </span>
                    <h3 className="text-xl font-black text-white group-hover:text-fuchsia-400 transition-colors line-clamp-1 pr-24">{task.title}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3 font-medium">{task.description}</p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    <div className="flex items-center gap-2 text-neutral-400 font-mono text-[11px]">
                      <Calendar size={14} className={isExpired ? "text-red-400" : "text-fuchsia-500"} />
                      <span className={isExpired ? "text-red-400/80 font-bold" : ""}>
                        Due: {task.deadline ? new Date(task.deadline).toLocaleDateString() : "No Deadline"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {/* 🔥 هدایت به صفحه بررسی پاسخ‌های شاگردان */}
                      <Link 
                        href={`/en/teacher/assignments/${task.id}/submissions`}
                        className="p-3 bg-white/5 hover:bg-fuchsia-500/10 text-neutral-400 hover:text-white border border-white/5 hover:border-fuchsia-500/30 rounded-xl transition-all active:scale-95 shadow-md"
                        title="Review Submissions"
                      >
                        <Eye size={15} />
                      </Link>

                      <button 
                        onClick={() => handleDeleteAssignment(task.id, task.title)}
                        disabled={isDeletingId === task.id}
                        className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/10 hover:border-red-500/30 rounded-xl transition-all active:scale-95 shadow-md disabled:opacity-40"
                        title="Delete Assignment"
                      >
                        {isDeletingId === task.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}