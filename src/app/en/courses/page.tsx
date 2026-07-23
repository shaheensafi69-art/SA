import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Wallet, ArrowRight, Sparkles, BookOpen } from "lucide-react";

// Server Component (SSR)
export default async function CoursesPage() {
  const supabase = await createClient();

  // ۱. دریافت نشست کاربر
  const { data: { session } } = await supabase.auth.getSession();
  
  // ۲. دریافت کیف پول کاربر
  let userWalletBalance = 0;
  if (session?.user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("wallet_balance")
      .eq("id", session.user.id)
      .single();
      
    if (profile?.wallet_balance) {
      userWalletBalance = profile.wallet_balance;
    }
  }

  // ۳. دریافت لیست دوره‌ها
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  // ۴. استخراج دسته‌بندی‌های یکتا
  const categories = Array.from(new Set(courses?.map(course => course.category).filter(Boolean)));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020202] text-white font-sans selection:bg-emerald-500 selection:text-black pb-20">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute -top-[20%] -left-[10%] h-[50vw] w-[50vw] rounded-full bg-yellow-600/10 blur-[150px] animate-blob"></div>
        <div className="absolute top-[20%] -right-[10%] h-[40vw] w-[40vw] rounded-full bg-amber-800/10 blur-[150px] animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-[20%] left-[20%] h-[60vw] w-[60vw] rounded-full bg-emerald-900/10 blur-[150px] animate-blob" style={{ animationDelay: '4s' }}></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="relative z-10 px-4 py-20 sm:px-6 md:py-24 lg:px-12 xl:px-20 max-w-[1600px] mx-auto">
        
        {/* ================= HEADER SECTION ================= */}
        <section className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between animate-[fadeInDown_0.5s_ease-out]">
          <div className="max-w-3xl relative">
            
            {userWalletBalance > 0 && (
              <div className="absolute -top-12 left-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-md w-fit">
                <Wallet size={14} className="animate-pulse" />
                Wallet Bonus Available: ${userWalletBalance.toFixed(2)}
              </div>
            )}
            
            <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.35em] text-neutral-300 backdrop-blur-md shadow-inner">
              Premium Learning Experience
            </p>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl leading-[1.1]">
              Explore Our <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent">Curriculums</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-neutral-400 font-medium max-w-2xl">
              High-impact programs crafted for modern professionals who want results, clarity, and real-world execution. Select a category below to get started.
            </p>
          </div>

          <Link
            href="/en"
            className="inline-flex w-fit items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all duration-300 hover:border-yellow-500/40 hover:bg-yellow-500/10 hover:text-yellow-400 backdrop-blur-md group shadow-lg shrink-0"
          >
            Back to Hub <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </section>

        {error && (
          <div className="mb-10 rounded-2xl border border-red-800/50 bg-red-950/30 p-6 text-red-400 backdrop-blur-md text-sm font-bold text-center">
            Database Sync Error: {error.message}
          </div>
        )}

        {!courses || courses.length === 0 ? (
          <div className="py-32 text-center flex flex-col items-center justify-center bg-black/20 border border-white/5 rounded-[3rem] backdrop-blur-xl animate-[fadeIn_0.5s_ease-out]">
            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6">
               <span className="text-3xl opacity-50">📡</span>
            </div>
            <p className="text-2xl font-black text-white mb-2 tracking-tight">No Active Curriculums</p>
            <p className="text-neutral-500 text-sm max-w-sm">We are currently updating our systems. New premium courses will be deployed shortly.</p>
          </div>
        ) : (
          <div className="space-y-20 animate-[fadeInUp_0.5s_ease-out]">
            {/* ================= CATEGORY BASED LISTING ================= */}
            {categories.map((categoryName, index) => {
              // فیلتر کردن دوره‌های مربوط به این دسته
              const categoryCourses = courses.filter(c => c.category === categoryName);
              
              return (
                <section key={categoryName as string} className="relative">
                  
                  {/* Category Header */}
                  <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{categoryName}</h2>
                      <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mt-1">{categoryCourses.length} Programs Available</p>
                    </div>
                  </div>

                  {/* Category Courses Grid */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {categoryCourses.map((course) => {
                      const originalPrice = Number(course.price);
                      const hasDiscount = userWalletBalance > 0;
                      const applicableDiscount = Math.min(userWalletBalance, originalPrice);
                      const finalPrice = originalPrice - applicableDiscount;

                      return (
                        <article
                          key={course.id}
                          className="group flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-white/5 bg-neutral-900/40 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-2 hover:border-emerald-500/30 hover:shadow-[0_25px_80px_rgba(16,185,129,0.15)] relative"
                        >
                          {/* Discount Badge */}
                          {hasDiscount && (
                            <div className="absolute top-5 right-5 z-20 bg-emerald-500 text-black px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.5)] flex items-center gap-1.5">
                              <Sparkles size={12} /> -${applicableDiscount.toFixed(2)} APPLIED
                            </div>
                          )}

                          {/* Thumbnail Section */}
                          <div className="relative flex h-56 sm:h-64 items-center justify-center overflow-hidden bg-black border-b border-white/5">
                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                            
                            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 ${hasDiscount ? 'bg-emerald-500/10' : 'bg-yellow-500/10'}`}></div>
                            
                            {course.thumbnail_url ? (
                              <img
                                src={course.thumbnail_url}
                                alt={course.title}
                                className="max-h-full w-full object-contain transition-all duration-700 group-hover:scale-110 filter group-hover:brightness-110"
                              />
                            ) : (
                              <div className="flex h-full w-full flex-col items-center justify-center">
                                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-900 border border-white/10 shadow-inner">
                                  <span className="text-xl font-black text-yellow-500">S</span>
                                </div>
                                <span className="text-xs font-black tracking-[0.3em] text-neutral-600 uppercase">SAFI ACADEMY</span>
                              </div>
                            )}
                          </div>

                          {/* Content Section */}
                          <div className="flex flex-1 flex-col p-6 sm:p-8 relative z-20 bg-gradient-to-b from-transparent to-black">
                            <div className="mb-4 flex items-center justify-between gap-3">
                              <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">
                                {course.category}
                              </span>
                              
                              <div className="flex flex-col items-end">
                                {hasDiscount ? (
                                  <>
                                    <span className="text-[10px] font-bold text-neutral-500 line-through decoration-red-500/50 decoration-2">${originalPrice.toFixed(2)}</span>
                                    <span className="text-lg font-black text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">${finalPrice.toFixed(2)}</span>
                                  </>
                                ) : (
                                  <span className="text-lg font-black text-white">${originalPrice.toFixed(2)}</span>
                                )}
                              </div>
                            </div>

                            <h2 className="text-xl font-black text-white tracking-tight transition-colors duration-300 group-hover:text-yellow-400 line-clamp-2">
                              {course.title}
                            </h2>
                            <p className="mt-3 flex-1 text-xs sm:text-sm leading-relaxed text-neutral-400 line-clamp-3 font-medium">
                              {course.description || "A premium masterclass designed to help you grow with confidence, scale your skills, and achieve real-world execution."}
                            </p>

                            <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/10 pt-6">
                              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                                {course.language || "English"}
                              </span>
                              <Link
                                href={`/en/courses/${course.id}`}
                                className={`rounded-xl px-5 py-3 text-[10px] sm:text-xs font-black uppercase tracking-widest text-black transition-all duration-300 active:scale-95 ${
                                  hasDiscount 
                                    ? "bg-emerald-500 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]" 
                                    : "bg-white hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]"
                                }`}
                              >
                                Explore Module
                              </Link>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 15s infinite;
        }
      ` }} />
    </main>
  );
}