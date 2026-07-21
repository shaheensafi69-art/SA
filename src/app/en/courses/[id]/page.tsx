import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import CourseInstructorSwitcher from "@/components/CourseInstructorSwitcher";
import CourseRegistrationForm from "@/components/CourseRegistrationForm";
import { Sparkles, Wallet } from "lucide-react";

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = await params;

  const { data: { session } } = await supabase.auth.getSession();
  
  let userWalletBalance = 0;
  let userDiscountRate = 0;
  let isUserLoggedIn = false;

  if (session?.user) {
    isUserLoggedIn = true;
    const { data: profile } = await supabase
      .from("profiles")
      .select("wallet_balance, referral_discount_rate")
      .eq("id", session.user.id)
      .single();
      
    if (profile) {
      userWalletBalance = profile.wallet_balance || 0;
      userDiscountRate = profile.referral_discount_rate || 0;
    }
  }

  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !course) notFound();

  // محاسبات مالی
  const originalPrice = Number(course.price);
  const hasDiscount = userDiscountRate > 0;
  
  const discountedPrice = hasDiscount 
    ? originalPrice - (originalPrice * (userDiscountRate / 100))
    : originalPrice;

  // مبلغی که قرار است از ولت کسر شود (نمی‌تواند بیشتر از قیمت کورس باشد)
  const walletDeduction = Math.min(userWalletBalance, discountedPrice);
  
  // مبلغ نهایی قابل پرداخت
  const finalPayableAmount = Math.max(0, discountedPrice - userWalletBalance);

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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(234,179,8,0.18),_transparent_35%),linear-gradient(135deg,_#060606_0%,_#0f0f10_100%)] px-4 py-24 text-white sm:px-6 lg:px-8 selection:bg-yellow-500 selection:text-black font-sans relative overflow-hidden">
      
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute top-[20%] -right-[10%] h-[40vw] w-[40vw] rounded-full bg-amber-800/10 blur-[150px] animate-blob"></div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-10 relative z-10 animate-[fadeIn_0.5s_ease-out]">
        
        <Link
          href="/en/courses"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs tracking-widest font-black uppercase text-neutral-300 transition-all duration-300 hover:border-yellow-500/40 hover:bg-yellow-500/10 hover:text-yellow-400 backdrop-blur-md"
        >
          <span className="text-base leading-none">←</span>
          <span>Back to Hub</span>
        </Link>

        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-neutral-900/95 via-neutral-950/95 to-black/95 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-10 lg:p-12">
          
          {hasDiscount && (
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          )}

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between relative z-10">
            <div className="max-w-3xl">
              
              {hasDiscount && (
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-yellow-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                  <Sparkles size={14} className="animate-pulse" />
                  Network Bonus Applied: {userDiscountRate}% OFF
                </div>
              )}

              <span className="block w-fit rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-neutral-400 shadow-inner">
                {course.category}
              </span>
              
              <h1 className="mt-5 text-4xl font-black leading-[1.1] text-white sm:text-5xl lg:text-6xl tracking-tight">
                {course.title}
              </h1>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-neutral-400 font-medium">
                A premium learning experience designed to help you build real-world skills with clarity, confidence, and modern tools.
              </p>
            </div>
            
            <div className="rounded-3xl border border-white/10 bg-black/60 px-6 py-5 text-right shadow-inner flex flex-col justify-center min-w-[200px] backdrop-blur-md">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1">Tuition Fee</p>
              
              {hasDiscount ? (
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-neutral-600 line-through decoration-red-500/50 decoration-2">${originalPrice.toFixed(2)}</span>
                  <p className="text-4xl font-black text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">${discountedPrice.toFixed(2)}</p>
                </div>
              ) : (
                <p className="text-4xl font-black text-white">${originalPrice.toFixed(2)}</p>
              )}
            </div>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-start">
          
          <div className="space-y-8">
            <section className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-neutral-900/95 via-neutral-950/95 to-black/95 shadow-2xl backdrop-blur-2xl">
              <div className="mx-auto flex w-full items-center justify-center overflow-hidden bg-black p-3 relative">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                {course.thumbnail_url ? (
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="block max-h-[500px] w-full rounded-[2rem] object-contain relative z-0"
                  />
                ) : (
                  <div className="flex h-[320px] w-full flex-col items-center justify-center rounded-[2rem] border border-white/5 bg-neutral-950">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-900 shadow-inner">
                      <span className="text-3xl font-black text-yellow-500">S</span>
                    </div>
                    <span className="text-sm font-black tracking-[0.3em] text-neutral-600 uppercase">SAFI ACADEMY</span>
                  </div>
                )}
              </div>
              <div className="p-8 sm:p-12 relative z-20">
                <h2 className="text-2xl font-black text-white tracking-tight">Curriculum Overview</h2>
                <p className="mt-5 whitespace-pre-line text-sm sm:text-base leading-relaxed text-neutral-400 font-medium">
                  {course.description}
                </p>
              </div>
            </section>

            <section className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-neutral-900/95 via-neutral-950/95 to-black/95 p-8 shadow-2xl backdrop-blur-2xl sm:p-12">
              <h2 className="text-2xl font-black text-white tracking-tight">What You Will Master</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Structured Frameworks",
                  "Live Market Analysis",
                  "Lifetime Access & Updates",
                  "AI-Powered Risk Management",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/5 bg-black/40 px-5 py-4 text-sm font-bold text-neutral-300 shadow-inner flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> {item}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-neutral-900/95 via-neutral-950/95 to-black/95 p-8 shadow-2xl backdrop-blur-2xl sm:p-10 relative overflow-hidden">
              
              <div className="space-y-3 relative z-10">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between rounded-2xl border px-5 py-4 shadow-inner ${
                      item.accent
                        ? 'border-yellow-500/20 bg-yellow-500/5'
                        : 'border-white/5 bg-black/40'
                    }`}
                  >
                    <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-neutral-500">{item.label}</span>
                    <span className={`text-sm font-black ${item.accent ? 'text-yellow-400' : 'text-white'}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-white/10 pt-8 relative z-10">
                {isUserLoggedIn ? (
                  <div className="space-y-6">
                    <div className="bg-emerald-900/10 border border-emerald-500/20 p-5 rounded-2xl flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/70 flex items-center gap-1.5">
                          <Wallet size={12} /> Wallet Bonus Used
                        </span>
                        <span className="font-mono font-bold text-emerald-400">${walletDeduction.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex items-center justify-between border-t border-emerald-500/10 pt-2 mt-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Final Amount Due</span>
                        <span className="font-mono font-black text-white text-lg">
                          ${finalPayableAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    // ارسال اطلاعات مالی به فرم
<CourseRegistrationForm 
  courses={[course]} 
  finalPayableAmount={finalPayableAmount}
  walletDeduction={walletDeduction}
  studentId={session.user.id} // 👈 این خط اضافه شود
/>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-center">
                      <p className="text-xs font-bold text-amber-500">Sign in to apply network discounts and use wallet balance.</p>
                    </div>
                    <Link
                      href="/en/login"
                      className="flex w-full items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-black uppercase tracking-widest text-black transition-all duration-300 hover:bg-neutral-200"
                    >
                      Sign In to Enroll
                    </Link>
                  </div>
                )}
                
                <div className="mt-5 flex items-center justify-center gap-2 opacity-60">
                  <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Secured via SafiPay</span>
                </div>
              </div>
            </section>

            <CourseInstructorSwitcher primary={primaryInstructor} secondary={secondaryInstructor} />
          </div>
        </div>
      </div>
    </main>
  );
}