import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import CourseRegistrationForm from "@/components/CourseRegistrationForm";

export default async function CoursesPage() {
  const supabase = await createClient();

  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white selection:bg-yellow-500 selection:text-black font-sans">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute -top-[20%] -left-[10%] h-[50vw] w-[50vw] rounded-full bg-yellow-600/10 blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] -right-[10%] h-[40vw] w-[40vw] rounded-full bg-amber-800/10 blur-[150px] animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-[20%] left-[20%] h-[60vw] w-[60vw] rounded-full bg-yellow-900/10 blur-[150px] animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="relative z-10 px-6 py-24 md:px-12 lg:px-20">
        <section className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-300 backdrop-blur-md">
                Premium Learning
              </p>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Choose Your Next <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent">Masterclass</span>
              </h1>
              <p className="mt-5 text-lg leading-8 text-neutral-400">
                Explore high-impact programs crafted for modern professionals who want results, clarity, and real-world growth.
              </p>
            </div>

            <Link
              href="/en"
              className="inline-flex w-fit items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-yellow-500/40 hover:bg-yellow-500/10 hover:text-yellow-400"
            >
              Back Home
            </Link>
          </div>

          {error && (
            <div className="mb-8 rounded-2xl border border-red-800/50 bg-red-950/50 p-4 text-red-400 backdrop-blur-md">
              Error fetching courses: {error.message}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {courses && courses.length > 0 ? (
              courses.map((course) => (
                <article
                  key={course.id}
                  className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/5 bg-neutral-900/40 backdrop-blur-lg shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500/30 hover:shadow-[0_25px_80px_rgba(234,179,8,0.18)]"
                >
                  <div className="relative flex h-64 items-center justify-center overflow-hidden bg-neutral-950">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    {course.thumbnail_url ? (
                      <img
                        src={course.thumbnail_url}
                        alt={course.title}
                        className="max-h-full w-full object-contain transition-all duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center border-b border-white/5">
                        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800">
                          <span className="font-bold text-yellow-500">S</span>
                        </div>
                        <span className="text-sm font-bold tracking-[0.3em] text-neutral-600">SAFI ACADEMY</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-300">
                        {course.category}
                      </span>
                      <span className="text-sm font-bold text-yellow-400">${course.price}</span>
                    </div>

                    <h2 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-yellow-400">
                      {course.title}
                    </h2>
                    <p className="mt-3 flex-1 min-h-[5.25rem] text-sm leading-7 text-neutral-400 line-clamp-3">
                      {course.description || "A premium course designed to help you grow with confidence and clarity."}
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/5 pt-5">
                      <span className="text-sm font-medium text-neutral-500">
                        {course.language || "English"}
                      </span>
                      <Link
                        href={`/en/courses/${course.id}`}
                        className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-black transition-all duration-300 hover:bg-yellow-500"
                      >
                        View Class
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-xl text-neutral-500">No courses available at the moment.</p>
              </div>
            )}
          </div>

          <CourseRegistrationForm courses={courses || []} />
        </section>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      ` }} />
    </main>
  );
}