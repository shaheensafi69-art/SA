"use client";

import Link from "next/link";

export default function TeacherStudentsPage() {
  return (
    <div className="min-h-screen bg-[#020202] text-white px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="rounded-[2rem] border border-white/10 bg-neutral-950/70 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-3xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">Instructor Panel</p>
              <h1 className="text-4xl font-extrabold text-white">My Students</h1>
              <p className="mt-3 max-w-2xl text-neutral-400">View enrolled students, performance summaries, and contact details from one place.</p>
            </div>
            <Link href="/en/teacher" className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:border-blue-400/30 hover:bg-blue-500/10 transition-colors">
              Back to teacher dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            { name: "Sara Jafari", className: "Growth Leadership", progress: "82%" },
            { name: "Ali Rezaei", className: "Trading Room A", progress: "91%" },
            { name: "Mina Azari", className: "Fintech Payments Lab", progress: "75%" },
            { name: "Samira Ahmadi", className: "Product Strategy", progress: "88%" },
          ].map((student) => (
            <div key={student.name} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">{student.name}</h2>
                  <p className="mt-2 text-sm text-neutral-400">{student.className}</p>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300">{student.progress}</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-2xl bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">View profile</button>
                <button className="rounded-2xl bg-blue-500/15 px-4 py-3 text-sm font-semibold text-blue-200 hover:bg-blue-500/25 transition-colors">Message student</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
