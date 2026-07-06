import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function CoursesPage() {
  // اتصال به دیتابیس در سمت سرور
  const supabase = await createClient();
  
  // دریافت لیست دوره‌هایی که is_published آن‌ها برابر با true است
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  return (
    <main className="relative min-h-screen pb-20">
      
      {/* 1. پس‌زمینه حرفه‌ای و ۳ بعدی */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-neutral-950 overflow-hidden">
        {/* خطوط شبکه‌ای محو (Grid Pattern) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        {/* هاله‌های نوری (Glowing Orbs) */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-900/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 p-10 max-w-7xl mx-auto">
        <div className="mb-16 border-b border-neutral-800/50 pb-8 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 drop-shadow-lg">
            Premium Courses
          </h1>
          <p className="text-neutral-400 mt-4 text-lg">Master the skills that drive the modern digital economy.</p>
        </div>

        {/* نمایش خطا */}
        {error && (
          <div className="p-4 bg-red-950/50 border border-red-800 rounded-lg text-red-400 mb-8 backdrop-blur-md">
            Error fetching courses: {error.message}
          </div>
        )}

        {/* 2. گرید نمایش دوره‌ها (با خاصیت dense برای پر کردن فضاهای خالی) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 grid-flow-row-dense">
          {courses && courses.length > 0 ? (
            courses.map((course) => {
              
              // 3. تشخیص هوشمند دوره شاپیفای برای باکس پرتریت
              const isShopify = course.title.toLowerCase().includes("shopify");
              
              return (
                <div 
                  key={course.id} 
                  className={`
                    group relative flex flex-col justify-between 
                    bg-neutral-900/40 backdrop-blur-xl border border-white/5 
                    rounded-3xl overflow-hidden shadow-xl
                    transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02]
                    hover:border-yellow-500/40 hover:shadow-[0_20px_50px_-15px_rgba(234,179,8,0.3)]
                    ${isShopify ? 'md:row-span-2' : ''}
                  `}
                >
                  {/* افکت درخشش داخلی در زمان هاور */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"></div>

                  <div className="flex flex-col h-full z-10">
                    {/* بخش عکس دوره (قد بلند برای شاپیفای، استاندارد برای بقیه) */}
                    <div className={`relative w-full shrink-0 overflow-hidden bg-neutral-950 ${isShopify ? 'h-[20rem] md:h-[30rem]' : 'h-56'}`}>
                      {/* لایه تاریک‌کننده عکس که در هاور محو می‌شود */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-500 z-10"></div>
                      
                      {course.thumbnail_url ? (
                        <img 
                          src={course.thumbnail_url} 
                          alt={course.title} 
                          className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center border-b border-white/5">
                          <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center mb-2">
                             <span className="text-yellow-500 font-bold">S</span>
                          </div>
                          <span className="text-neutral-600 font-bold tracking-widest text-sm">SAFI ACADEMY</span>
                        </div>
                      )}
                    </div>

                    {/* محتوای متنی کارت */}
                    <div className="p-8 flex flex-col flex-grow">
                      <div>
                        <span className="text-xs font-bold bg-neutral-950 border border-neutral-800 text-neutral-300 px-3 py-1.5 rounded-full uppercase tracking-widest shadow-inner">
                          {course.category}
                        </span>
                        <h2 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors mt-5 drop-shadow-md">
                          {course.title}
                        </h2>
                        <p className={`text-neutral-400 mt-4 leading-relaxed ${isShopify ? 'line-clamp-6' : 'line-clamp-3'}`}>
                          {course.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5 relative z-20">
                        <span className="text-2xl font-extrabold text-white group-hover:text-yellow-500 transition-colors">
                          ${course.price}
                        </span>
                        <Link 
                          href={`/en/courses/${course.id}`} 
                          className="px-5 py-2.5 rounded-lg text-sm font-bold bg-neutral-800 hover:bg-yellow-500 hover:text-black text-yellow-500 uppercase tracking-wider transition-all duration-300 transform group-hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]"
                        >
                          View Class
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-xl text-neutral-500">No courses available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}