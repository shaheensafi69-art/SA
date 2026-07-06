import Link from "next/link";

export default function EnglishHome() {
  return (
    <main className="w-full relative bg-[#050505] text-white selection:bg-yellow-500 selection:text-black font-sans">
      
      {/* ================= BACKGROUND: ALIVE & DYNAMIC ================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* افکت نویز ملایم برای پریمیوم شدن بک‌گراند */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        
        {/* هاله‌های نوری در حال حرکت (حس زنده بودن) */}
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-yellow-600/10 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] bg-amber-800/10 rounded-full blur-[150px] animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] bg-yellow-900/10 rounded-full blur-[150px] animate-blob animation-delay-4000"></div>
        
        {/* خطوط گرید فین‌تک */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* ================= 1. HERO SECTION (FinTech Vibe) ================= */}
      <section className="relative z-10 w-full min-h-[90vh] flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 pt-28 pb-10">
        
        {/* Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start space-y-8 z-20">
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
            <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_10px_#eab308] animate-pulse"></div>
            <span className="text-xs md:text-sm font-bold tracking-widest text-neutral-300 uppercase">
              Powered by Safi International Capital LTD
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold leading-[1.1] tracking-tight">
            Design Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600">
              Digital Empire
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 max-w-xl leading-relaxed font-medium">
            Step into a premium educational ecosystem. Master E-Commerce, AI Development, and Financial Markets with UK-certified standards.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-5 pt-4 w-full sm:w-auto">
            <Link href="/en/courses" className="w-full sm:w-auto px-10 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold text-lg rounded-2xl transition-all duration-300 shadow-[0_0_40px_rgba(234,179,8,0.3)] hover:shadow-[0_0_60px_rgba(234,179,8,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2">
              Start Learning <span className="text-xl">→</span>
            </Link>
            <Link href="/en/about" className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-lg rounded-2xl transition-all duration-300 backdrop-blur-md flex items-center justify-center">
              View Credentials
            </Link>
          </div>
        </div>

        {/* Hero Image (بنر کامل و بی‌نقص) */}
        <div className="w-full lg:w-1/2 mt-16 lg:mt-0 relative z-10 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-2xl">
             <div className="absolute inset-0 bg-yellow-500/20 blur-[100px] rounded-full animate-pulse"></div>
             <img 
               src="/hero.png" 
               alt="Safi Academy Premium Education" 
               className="relative z-10 w-full h-auto object-contain rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/5 transform hover:scale-[1.02] transition-transform duration-700 animate-float"
             />
          </div>
        </div>
      </section>

      {/* ================= 2. TRUST & AUTHORITY STRIP ================= */}
      <section className="relative z-20 w-full border-y border-white/10 bg-neutral-950/50 backdrop-blur-xl py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center lg:justify-between gap-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-3"><span className="text-2xl">🇬🇧</span> <span className="font-bold text-lg tracking-wide text-white">UK REG: 17063286</span></div>
          <div className="flex items-center gap-3"><span className="text-2xl">🛡️</span> <span className="font-bold text-lg tracking-wide text-white">Legally Secured</span></div>
          <div className="flex items-center gap-3"><span className="text-2xl">💳</span> <span className="font-bold text-lg tracking-wide text-white">SafiPay Integrated</span></div>
          <div className="flex items-center gap-3"><span className="text-2xl">🤖</span> <span className="font-bold text-lg tracking-wide text-white">Safi AI Powered</span></div>
        </div>
      </section>

      {/* ================= 3. BENTO GRID DEPARTMENTS ================= */}
      <section className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-32">
        <div className="mb-20">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            Elite <span className="text-yellow-500">Departments</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl">Engineered for real-world impact. Build your career with our specialized faculties.</p>
        </div>

        {/* Bento Grid Layout - طراحی بسیار مدرن و نامتقارن */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Box 1 (Large) */}
          <div className="md:col-span-2 group relative bg-neutral-900/40 border border-white/5 p-10 rounded-[2rem] overflow-hidden backdrop-blur-lg hover:border-yellow-500/30 transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] group-hover:bg-yellow-500/20 transition-all duration-500"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-4xl mb-8 group-hover:scale-110 transition-transform">🛒</div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">Global E-Commerce</h3>
                <p className="text-neutral-400 text-lg leading-relaxed max-w-md">Master Shopify dropshipping, Amazon FBA, TikTok Shop, and international brand building.</p>
              </div>
            </div>
          </div>

          {/* Box 2 (Tall) */}
          <div className="group relative bg-neutral-900/40 border border-white/5 p-10 rounded-[2rem] overflow-hidden backdrop-blur-lg hover:border-yellow-500/30 transition-all duration-500">
             <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-yellow-600/10 to-transparent"></div>
             <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-4xl mb-8 group-hover:scale-110 transition-transform">💻</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Tech & AI</h3>
                <p className="text-neutral-400 leading-relaxed">Full-Stack Development, Next.js, Flutter, and AI system integrations.</p>
              </div>
            </div>
          </div>

          {/* Box 3 */}
          <div className="group relative bg-neutral-900/40 border border-white/5 p-10 rounded-[2rem] overflow-hidden backdrop-blur-lg hover:border-yellow-500/30 transition-all duration-500">
             <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-4xl mb-8 group-hover:scale-110 transition-transform">📈</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Financial Markets</h3>
                <p className="text-neutral-400 leading-relaxed">Trade Forex, Crypto, and Futures with institutional risk management.</p>
              </div>
            </div>
          </div>

          {/* Box 4 (Wide) */}
          <div className="md:col-span-2 group relative bg-neutral-900/40 border border-white/5 p-10 rounded-[2rem] overflow-hidden backdrop-blur-lg hover:border-yellow-500/30 transition-all duration-500 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
             <div className="relative z-10 flex-1">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-4xl mb-8 group-hover:scale-110 transition-transform">🌍</div>
              <h3 className="text-3xl font-bold text-white mb-4">Languages & Certifications</h3>
              <p className="text-neutral-400 text-lg leading-relaxed">CEL & DEL English Programs, plus specialized German and French courses for global communication.</p>
            </div>
            <Link href="/en/courses" className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-yellow-500 transition-colors shrink-0">
              View All Courses
            </Link>
          </div>

        </div>
      </section>

      {/* ================= 4. SAFI AI & ECOSYSTEM ================= */}
      <section className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-32 bg-gradient-to-b from-[#050505] to-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          
          {/* Left: Safi AI Visual */}
          <div className="w-full lg:w-5/12 relative">
             <div className="relative w-full aspect-square rounded-[3rem] p-1 bg-gradient-to-b from-yellow-500/30 to-transparent shadow-[0_0_80px_rgba(234,179,8,0.15)] group">
                <div className="absolute inset-0 bg-neutral-950 rounded-[3rem] overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-bg-pan"></div>
                  
                  <div className="h-full w-full flex flex-col items-center justify-center p-10 text-center relative z-10">
                    
                    {/* قاب اختصاصی و درخشان لوگوی Safi AI */}
                    <div className="relative w-40 h-40 md:w-48 md:h-48 mb-8">
                      <div className="absolute inset-0 bg-yellow-500 rounded-full blur-[40px] opacity-50 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"></div>
                      <img 
                        src="/safi-ai.jpeg" 
                        alt="Safi AI Logo" 
                        className="relative z-10 w-full h-full object-cover rounded-3xl border border-white/20 shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    <h3 className="text-3xl font-extrabold text-white tracking-tight">Safi AI Assistant</h3>
                    <p className="text-neutral-400 mt-4 font-medium">Your 24/7 intelligent mentor. Analyzing progress and answering queries in real-time.</p>
                  </div>
                </div>
             </div>
          </div>

          {/* Right: Ecosystem Breakdown */}
          <div className="w-full lg:w-7/12 space-y-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                An Entire Ecosystem.<br />
                <span className="text-yellow-500">Built for Your Success.</span>
              </h2>
            </div>
            
            <div className="space-y-6">
              {[
                { title: "Safi International Capital", desc: "Our UK-registered financial backbone, securing your educational investments.", num: "01" },
                { title: "SafiPay Ecosystem", desc: "Seamlessly open multi-currency accounts to manage your e-commerce and trading profits globally.", num: "02" },
                { title: "SafiPro & Safi TopUp", desc: "Access our practical platforms to apply your skills directly into the real market.", num: "03" }
              ].map((item, idx) => (
                <div key={idx} className="group flex items-start gap-6 p-6 rounded-3xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300">
                  <div className="text-4xl font-extrabold text-white/10 group-hover:text-yellow-500/50 transition-colors">
                    {item.num}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-neutral-400 text-lg">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. MASSIVE CTA ================= */}
      <section className="relative z-10 w-full px-6 py-40 flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 via-amber-700 to-black opacity-90"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
         
         <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight drop-shadow-2xl">
              Ready to Change <br/> Your Reality?
            </h2>
            <p className="text-2xl text-white/80 mb-12 font-medium">Join thousands of global students shaping the future.</p>
            <Link href="/en/register" className="px-14 py-6 bg-white text-black font-extrabold text-2xl rounded-full transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-105 hover:bg-yellow-400">
              Create Free Account
            </Link>
         </div>
      </section>

      {/* ================= CUSTOM ANIMATIONS ================= */}
      <style dangerouslySetInnerHTML={{__html: `
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
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes bg-pan {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        .animate-bg-pan {
          animation: bg-pan 3s linear infinite;
        }
      `}} />
    </main>
  );
}