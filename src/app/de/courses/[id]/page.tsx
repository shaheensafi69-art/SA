import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import CourseInstructorSwitcher from "@/components/CourseInstructorSwitcher";

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !course) notFound();

  const primaryInstructor = {
    name: course.instructor_name || "Shaheen Safi",
    bio: course.instructor_bio || "Renowned Fintech Architect and expert educator within the Safi Ecosystem.",
    imageUrl: course.instructor_image_url,
  };

  const secondaryInstructor = course.instructor_2_name
    ? {
        name: course.instructor_2_name,
        bio: course.instructor_2_bio || "Experienced educator and specialist in modern digital instruction.",
        imageUrl: course.instructor_2_image_url,
      }
    : null;

  const highlights = [
    { label: "Duration", value: "12 Weeks" },
    { label: "Skill Level", value: "All Levels" },
    { label: "Language", value: course.language || "English" },
    { label: "AI Integration", value: "Included", accent: true },
  ];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(234,179,8,0.18),_transparent_35%),linear-gradient(135deg,_#060606_0%,_#0f0f10_100%)] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <Link
          href="/en/courses"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-neutral-200 transition-all duration-300 hover:border-yellow-500/40 hover:bg-yellow-500/10 hover:text-yellow-400"
        >
          <span className="text-base">←</span>
          <span>Back to Courses</span>
        </Link>

        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-neutral-900/95 via-neutral-950/95 to-black/95 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400">
                {course.category}
              </span>
              <h1 className="mt-5 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                {course.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-neutral-300">
                A premium learning experience designed to help you build real-world skills with clarity, confidence, and modern tools.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-right">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">Course Price</p>
              <p className="mt-2 text-4xl font-black text-yellow-400">${course.price}</p>
            </div>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
          <div className="space-y-8">
            <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-neutral-900/95 via-neutral-950/95 to-black/95 shadow-[0_30px_90px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
              <div className="mx-auto flex w-full max-w-[920px] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                {course.thumbnail_url ? (
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="block max-h-[760px] w-full rounded-[1.4rem] object-contain"
                  />
                ) : (
                  <div className="flex h-[320px] w-full items-center justify-center rounded-[1.4rem] text-2xl font-semibold text-neutral-500">
                    No thumbnail available
                  </div>
                )}
              </div>
              <div className="p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-white">About this course</h2>
                <p className="mt-4 whitespace-pre-line text-lg leading-8 text-neutral-300">
                  {course.description}
                </p>
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-neutral-900/95 via-neutral-950/95 to-black/95 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-10">
              <h2 className="text-2xl font-bold text-white">What you will get</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  "Structured curriculum",
                  "Hands-on practice",
                  "Lifetime access",
                  "AI-powered guidance",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-neutral-200">
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-neutral-900/95 via-neutral-950/95 to-black/95 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-8">
              <div className="space-y-4">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-4 ${
                      item.accent
                        ? 'border-yellow-500/30 bg-yellow-500/10'
                        : 'border-white/10 bg-white/5'
                    }`}
                  >
                    <span className="text-neutral-300">{item.label}</span>
                    <span className={`font-semibold ${item.accent ? 'text-yellow-400' : 'text-white'}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/en/contact"
                className="mt-7 flex w-full items-center justify-center rounded-2xl bg-yellow-500 px-6 py-4 text-lg font-black text-black transition-all duration-300 hover:bg-yellow-400 hover:shadow-[0_10px_30px_rgba(234,179,8,0.25)]"
              >
                Enroll Now
              </Link>
              <p className="mt-3 text-center text-sm text-neutral-500">Secure checkout via SafiPay</p>
            </section>

            <CourseInstructorSwitcher primary={primaryInstructor} secondary={secondaryInstructor} />
          </div>
        </div>
      </div>
    </main>
  );
}