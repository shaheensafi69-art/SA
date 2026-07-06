"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function AddCoursePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [courseData, setCourseData] = useState({
    title: "", description: "", category: "", price: "", language: "English",
    instructor_name: "", instructor_bio: "", instructor_image_url: "",
    instructor_2_name: "", instructor_2_bio: "", instructor_2_image_url: ""
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const supabase = createClient();

    try {
      let thumbnailUrl = "";
      if (thumbnail) {
        const fileExt = thumbnail.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from("course-thumbnails").upload(fileName, thumbnail);
        if (uploadError) throw uploadError;
        thumbnailUrl = supabase.storage.from("course-thumbnails").getPublicUrl(fileName).data.publicUrl;
      }

      const { error } = await supabase.from("courses").insert({
        ...courseData,
        price: parseFloat(courseData.price),
        thumbnail_url: thumbnailUrl,
        is_published: false
      });

      if (error) throw error;
      alert("Course created successfully!");
      router.push("/en/admin");
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white font-sans">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay"></div>
        <div className="absolute -left-20 top-10 h-[36rem] w-[36rem] rounded-full bg-yellow-500/10 blur-[160px] animate-blob"></div>
        <div className="absolute right-0 top-1/4 h-[28rem] w-[28rem] rounded-full bg-sky-500/10 blur-[180px] animate-blob animation-delay-3000"></div>
        <div className="absolute -bottom-24 left-1/3 h-[30rem] w-[30rem] rounded-full bg-violet-500/10 blur-[170px] animate-blob animation-delay-5000"></div>
      </div>

      <div className="relative z-10 px-6 py-12 md:px-12 lg:px-20">
        <section className="mx-auto max-w-7xl space-y-10">
          <div className="grid gap-8 lg:grid-cols-[1.35fr_0.85fr] items-start">
            <div className="space-y-6">
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-neutral-300 backdrop-blur-md">
                Admin Studio
              </span>
              <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
                Design a premium course page with a polished admin experience.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-neutral-400">
                Every field is styled for clarity and impact. Upload assets, add instructors, and publish your course from a luxury admin panel that matches the rest of the academy site.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                  <p className="text-sm uppercase tracking-[0.35em] text-yellow-300">Fast content flow</p>
                  <p className="mt-3 text-sm leading-7 text-neutral-300">Everything is grouped logically so you can move from title to launch in seconds.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                  <p className="text-sm uppercase tracking-[0.35em] text-yellow-300">Premium visual polish</p>
                  <p className="mt-3 text-sm leading-7 text-neutral-300">Soft glows, rounded cards, and gradient accents create a luxury admin aesthetic.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-3xl">
              <div className="rounded-3xl bg-gradient-to-br from-yellow-500/10 to-white/5 p-6 shadow-inner shadow-yellow-500/5">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-300">Quick Setup Guide</p>
                <div className="mt-6 space-y-4 text-sm text-neutral-300">
                  <p>Use the left side for course details and instructor setup.</p>
                  <p>Upload a striking thumbnail that looks great in course listings.</p>
                  <p>Keep descriptions benefit-led and outcomes-focused.</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
            <div className="space-y-8 rounded-[2rem] border border-white/10 bg-neutral-950/70 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-3xl">
              <div className="space-y-4">
                <div>
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <label className="text-sm font-semibold text-white">Course Title</label>
                    <span className="text-xs uppercase tracking-[0.35em] text-neutral-500">Required</span>
                  </div>
                  <input
                    required
                    className="w-full rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    placeholder="Fintech Mastery for Entrepreneurs"
                    onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                  />
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-sm font-semibold text-white">Category</label>
                    <input
                      required
                      className="w-full rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      placeholder="Finance, Trading, Tech..."
                      onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-semibold text-white">Language</label>
                    <select
                      className="w-full rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      onChange={(e) => setCourseData({ ...courseData, language: e.target.value })}
                    >
                      <option>English</option>
                      <option>Persian</option>
                      <option>Pashto</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-white">Description</label>
                  <textarea
                    required
                    className="min-h-[180px] w-full rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    placeholder="Write a compelling summary that highlights outcomes, benefits and what learners will gain."
                    onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-white">Instructor 1</p>
                    <p className="text-sm text-neutral-400">Primary course instructor</p>
                  </div>
                  <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-yellow-300">Required</span>
                </div>

                <div className="space-y-4">
                  <input
                    placeholder="Name"
                    className="w-full rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    onChange={(e) => setCourseData({ ...courseData, instructor_name: e.target.value })}
                  />
                  <textarea
                    placeholder="Bio"
                    className="min-h-[140px] w-full rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    onChange={(e) => setCourseData({ ...courseData, instructor_bio: e.target.value })}
                  />
                  <input
                    placeholder="Instructor image URL"
                    className="w-full rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    onChange={(e) => setCourseData({ ...courseData, instructor_image_url: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold text-white">Instructor 2</p>
                    <p className="text-sm text-neutral-400">Optional co-instructor</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.35em] text-neutral-500">Optional</span>
                </div>

                <div className="space-y-4">
                  <input
                    placeholder="Name"
                    className="w-full rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    onChange={(e) => setCourseData({ ...courseData, instructor_2_name: e.target.value })}
                  />
                  <textarea
                    placeholder="Bio"
                    className="min-h-[140px] w-full rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    onChange={(e) => setCourseData({ ...courseData, instructor_2_bio: e.target.value })}
                  />
                  <input
                    placeholder="Instructor image URL"
                    className="w-full rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                    onChange={(e) => setCourseData({ ...courseData, instructor_2_image_url: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-neutral-950/70 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-3xl">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-yellow-400 to-orange-500 text-black shadow-[0_20px_40px_rgba(234,179,8,0.25)]">
                    <span className="font-black text-2xl">+</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-300">Asset Upload</p>
                    <p className="text-sm text-neutral-400">Add the hero image that will make the course pop.</p>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-dashed border-white/10 bg-white/5 p-5 text-center transition hover:border-yellow-400/40">
                  <div className="mb-4 h-48 overflow-hidden rounded-3xl bg-black/30 border border-white/5">
                    {preview ? (
                      <img src={preview} alt="Thumbnail preview" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-3 text-neutral-400">
                        <div className="text-4xl">🖼️</div>
                        <p className="text-sm">Upload a 16:9 thumbnail for the course card.</p>
                      </div>
                    )}
                  </div>
                  <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-300">
                    Choose file
                    <input type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
                  </label>
                </div>

                <div className="mt-6 grid gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-white">Price</label>
                    <input
                      required
                      type="number"
                      placeholder="USD"
                      className="w-full rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                      onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-white">Preview</label>
                    <div className="rounded-[1.5rem] bg-black/40 px-5 py-4 text-sm text-neutral-300 border border-white/10">
                      The course is saved as a draft and will be published after you submit. You can edit it later from the admin panel.
                    </div>
                  </div>
                </div>
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-[1.75rem] bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-500 px-8 py-4 text-base font-bold text-black shadow-[0_20px_40px_rgba(234,179,8,0.25)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Publishing course..." : "Publish course now"}
              </button>

              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-sm text-neutral-400">
                <p className="font-semibold text-white">Pro tip</p>
                <p className="mt-2 leading-7">
                  Use a strong title and a short description that emphasizes transformation, not only features. Add a polished thumbnail and instructor image URLs to increase trust.
                </p>
              </div>
            </aside>
          </form>
        </section>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -40px) scale(1.06); }
          66% { transform: translate(-20px, 20px) scale(0.98); }
        }
        .animate-blob {
          animation: blob 12s infinite ease-in-out;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-5000 {
          animation-delay: 5s;
        }
      ` }} />
    </main>
  );
}