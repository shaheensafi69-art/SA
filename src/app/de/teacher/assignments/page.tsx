"use client";

import Link from "next/link";

export default function TeacherAssignmentsPage() {
  return (
    <div className="min-h-screen bg-[#020202] text-white px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="rounded-[2rem] border border-white/10 bg-neutral-950/70 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-3xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">Instructor Panel</p>
              <h1 className="text-4xl font-extrabold text-white">Assignments</h1>
              <p className="mt-3 max-w-2xl text-neutral-400">Create, review, and manage student assignments from the teacher dashboard.</p>
            </div>
            <Link href="/en/teacher" className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:border-blue-400/30 hover:bg-blue-500/10 transition-colors">
              Back to teacher dashboard
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-neutral-950/70 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-3xl">
          <p className="text-neutral-400 mb-6">This is a placeholder page for teacher assignments. Add assignment management tools, upload options, and grading workflow here.</p>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { title: "New Assignment", description: "Create a new homework or project task for your students.", action: "Create" },
              { title: "Review Submissions", description: "See student uploads, grades, and feedback in one place.", action: "Review" },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-bold text-white">{item.title}</h2>
                <p className="mt-3 text-neutral-400">{item.description}</p>
                <button className="mt-6 inline-flex items-center justify-center rounded-2xl bg-blue-500/15 px-5 py-3 text-sm font-semibold text-blue-200 hover:bg-blue-500/25 transition-colors">
                  {item.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
