"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Quiz = {
  id: string;
  title: string;
  total_questions: number;
  passing_score: number;
  created_at: string;
};

export default function TeacherQuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("quizzes").select("*").order("created_at", { ascending: false });
      if (data) setQuizzes(data as Quiz[]);
      setIsLoading(false);
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="p-6 md:p-10 min-h-screen bg-[#020202] text-white animate-[fadeIn_0.4s_ease-out]">
      <header className="mb-10 flex justify-between items-center bg-neutral-950/40 p-6 rounded-3xl border border-white/5 backdrop-blur-xl">
        <div>
          <h1 className="text-2xl font-black">Examination Center</h1>
          <p className="text-xs text-neutral-500 mt-1">Deploy automated testing, mock exams, and view criteria.</p>
        </div>
        <button className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-xl text-xs font-bold transition-all shadow-lg">
          + Create Quiz
        </button>
      </header>

      {isLoading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div></div>
      ) : (
        <div className="bg-neutral-950/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01] text-neutral-500 text-[10px] uppercase font-bold tracking-widest">
                <th className="p-5">Quiz Title</th>
                <th className="p-5">Questions</th>
                <th className="p-5">Passing Grade</th>
                <th className="p-5">Created Date</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {quizzes.map((quiz) => (
                <tr key={quiz.id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-5 font-bold text-white">{quiz.title}</td>
                  <td className="p-5 text-neutral-400">{quiz.total_questions || 10} Qs</td>
                  <td className="p-5 text-green-400 font-mono">{quiz.passing_score || 70}%</td>
                  <td className="p-5 text-neutral-500 font-mono">{new Date(quiz.created_at).toLocaleDateString()}</td>
                  <td className="p-5 text-right">
                    <button className="text-xs font-bold text-purple-400 hover:text-purple-300 bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/20">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}