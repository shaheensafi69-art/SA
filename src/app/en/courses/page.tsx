import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Wallet, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import BackgroundWaves from "@/components/ui/background-waves"; // اضافه شدن ایمپورت

export default async function CoursesPage() {
  const supabase = await createClient();

  const { data: { session } } = await supabase.auth.getSession();
  
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

  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  const categories = Array.from(new Set(courses?.map(course => course.category).filter(Boolean)));

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020202] text-white font-sans selection:bg-emerald-500 selection:text-black pb-20">
      
      {/* استفاده از بک‌گراند متحرک جدید */}
      <BackgroundWaves />

      <div className="relative z-10 px-4 py-20 sm:px-6 md:py-24 lg:px-12 xl:px-20 max-w-[1600px] mx-auto">
        
        {/* ================= HEADER SECTION ================= */}
        <section className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between animate-[fadeInDown_0.5s_ease-out]">
          <div className="max-w-3xl relative">
            {userWalletBalance > 0 && (
              <div className="absolute -top-12 left-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-md w-fit glass">
                <Wallet size={14} className="animate-pulse" />
                Wallet Bonus Available: ${userWalletBalance.toFixed(2)}
              </div>
            )}
            
            <p className="inline-flex items-center rounded-full card-border glass px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.35em] text-neutral-300">
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
            className="inline-flex w-fit items-center justify-center rounded-2xl card-border glass px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all duration-300 hover:border-yellow-500/40 hover:bg-yellow-500/10 hover:text-yellow-400 group shadow-lg shrink-0"
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
          <div className="py-32 text-center flex flex-col items-center justify-center bg-black/20 card-border rounded-[3rem] backdrop-blur-xl animate-[fadeIn_0.5s_ease-out] glass">
            <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6">
               <span className="text-3xl opacity-50">📡</span>
            </div>
            <p className="text-2xl font-black text-white mb-2 tracking-tight">No Active Curriculums</p>
            <p className="text-neutral-500 text-sm max-w-sm">We are currently updating our systems. New premium courses will be deployed shortly.</p>
          </div>
        ) : (
          <div className="space-y-20 animate-[fadeInUp_0.5s_ease-out]">
            {categories.map((categoryName) => {
              const categoryCourses = courses.filter(c => c.category === categoryName);
              
              return (
                <section key={categoryName as string} className="relative">
                  <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 glass">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{categoryName}</h2>
                      <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mt-1">{categoryCourses.length} Programs Available</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {categoryCourses.map((course, index) => {
                      const originalPrice = Number(course.price);
                      const hasDiscount = userWalletBalance > 0;
                      const applicableDiscount = Math.min(userWalletBalance, originalPrice);
                      const finalPrice = originalPrice - applicableDiscount;
                      
                      // ایجاد تاخیر متغیر برای انیمیشن شناور شدن هر کارت
                      const delayClass = `delay-${(index % 3 + 1) * 100}`;

                      return (
                        <article
                          key={course.id}
                          className={`group flex h-full flex-col overflow-hidden rounded-[2.5rem] card-border glass inner-glow shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-emerald-500/30 hover:shadow-[0_25px_80px_rgba(16,185,129,0.15)] relative animate-float ${delayClass}`}
                        >
                          {hasDiscount && (
                            <div className="absolute top-5 right-5 z-20 bg-emerald-500 text-black px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.5)] flex items-center gap-1.5">
                              <Sparkles size={12} /> -${applicableDiscount.toFixed(2)} APPLIED
                            </div>
                          )}

                          <div className="relative flex h-56 sm:h-64 items-center justify-center overflow-hidden bg-black border-b border-white/5 p-4">
                            
                            {/* پس‌زمینه Grid انیمیشن‌دار (مشابه SchemaCard) */}
                            <div className="absolute inset-0 opacity-20">
                              <div className="w-full h-full animate-pulse" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                            </div>

                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                            
                            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] pointer-events-none transition-opacity opacity-0 group-hover:opacity-100 ${hasDiscount ? 'bg-emerald-500/10' : 'bg-yellow-500/10'}`}></div>
                            
                            {course.thumbnail_url ? (
                              <img
                                src={course.thumbnail_url}
                                alt={course.title}
                                className="relative z-20 max-h-full w-full object-contain transition-all duration-700 group-hover:scale-110 filter group-hover:brightness-110 drop-shadow-2xl rounded-xl"
                              />
                            ) : (
                              <div className="relative z-20 flex h-full w-full flex-col items-center justify-center">
                                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl glass card-border shadow-inner">
                                  <span className="text-xl font-black text-yellow-500">S</span>
                                </div>
                                <span className="text-xs font-black tracking-[0.3em] text-neutral-600 uppercase">SAFI ACADEMY</span>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-1 flex-col p-6 sm:p-8 relative z-20 bg-gradient-to-b from-transparent to-black/50">
                            <div className="mb-4 flex items-center justify-between gap-3">
                              <span className="rounded-md card-border glass px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">
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
                              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 glass px-2 py-1 rounded-md">
                                {course.language || "English"}
                              </span>
                              <Link
                                href={`/en/courses/${course.id}`}
                                className={`rounded-xl px-5 py-3 text-[10px] sm:text-xs font-black uppercase tracking-widest text-black transition-all duration-300 active:scale-95 flex items-center ${
                                  hasDiscount 
                                    ? "bg-emerald-500 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]" 
                                    : "bg-white hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]"
                                }`}
                              >
                                Explore <ArrowRight size={14} className="ml-1" />
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
    </main>
  );
}