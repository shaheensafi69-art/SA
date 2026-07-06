"use client";

import Link from "next/link";

export default function TeacherClassesPage() {
  return (
    <div className="min-h-screen bg-[#020202] text-white px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="rounded-[2rem] border border-white/10 bg-neutral-950/70 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-3xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-neutral-500">Instructor Panel</p>
              <h1 className="text-4xl font-extrabold text-white">My Classes</h1>
              <p className="mt-3 max-w-2xl text-neutral-400">Quickly access your live sessions, classroom details, and scheduled lessons.</p>
            </div>
            <Link href="/en/teacher" className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:border-blue-400/30 hover:bg-blue-500/10 transition-colors">
              Back to teacher dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {[
            { title: "Live Session A", status: "Live", students: 28, time: "10:00 AM" },
            { title: "Product Strategy", status: "Scheduled", students: 34, time: "12:30 PM" },
            { title: "Innovation Lab", status: "Paused", students: 18, time: "03:00 PM" },
            { title: "Fintech Workshop", status: "Live", students: 42, time: "04:45 PM" },
          ].map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">{item.title}</h2>
                  <p className="mt-2 text-sm text-neutral-400">{item.students} students • {item.time}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${item.status === "Live" ? "bg-emerald-500/15 text-emerald-300" : item.status === "Paused" ? "bg-yellow-500/15 text-yellow-300" : "bg-sky-500/15 text-sky-300"}`}>
                  {item.status}
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-2xl bg-blue-500/15 px-4 py-3 text-sm font-semibold text-blue-200 hover:bg-blue-500/25 transition-colors">Open Classroom</button>
                <button className="rounded-2xl bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">Attendance</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
