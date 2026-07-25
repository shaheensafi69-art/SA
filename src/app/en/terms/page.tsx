"use client";

import { motion } from "framer-motion";
import { Scale, CheckCircle, FileText, AlertCircle } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <main className="w-full relative bg-[#050505] text-white font-sans overflow-hidden min-h-screen pt-32 pb-20">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-amber-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-yellow-600/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-16 animate-[fadeInDown_1s_ease-out]">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-yellow-500 mb-6">
            <Scale size={14} /> Official Agreement
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">Service</span>
          </h1>
          <p className="text-neutral-400 text-lg">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Content Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#0a0a0f]/80 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl backdrop-blur-xl prose prose-invert prose-yellow max-w-none"
        >
          <p className="text-neutral-300 leading-relaxed text-lg mb-8">
            These Terms of Service ("Terms") govern your access to and use of Safi Academy, its website, products, and services. Safi Academy is a subsidiary of <strong>Safi International Capital LTD</strong>, registered in the United Kingdom under company number 17063286, headquartered at 71-75 Shelton Street, Covent Garden, London.
          </p>

          <div className="space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10"><CheckCircle className="text-yellow-500 w-5 h-5"/></div>
                <h2 className="text-2xl font-bold text-white m-0">1. Acceptance of Terms</h2>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                By accessing or using our platform, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10"><FileText className="text-yellow-500 w-5 h-5"/></div>
                <h2 className="text-2xl font-bold text-white m-0">2. User Accounts & Gamification</h2>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.
              </p>
              <p className="text-neutral-400 leading-relaxed mt-4">
                <strong>Academy Points & Wall of Fame:</strong> Points and gamification rewards earned on our platform hold no monetary value outside of the Safi Ecosystem. Safi Academy reserves the right to modify, suspend, or revoke access to the Wall of Fame or internal leaderboards if automated systems or abuse are detected.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10"><AlertCircle className="text-yellow-500 w-5 h-5"/></div>
                <h2 className="text-2xl font-bold text-white m-0">3. Educational Disclaimers</h2>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                The content provided by Safi Academy (including E-commerce, Tech, and Financial Markets training) is for educational purposes only. Safi International Capital LTD does not guarantee financial success, investment returns, or employment based solely on the completion of our courses. Trading in financial markets involves significant risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Payments and Subscriptions</h2>
              <p className="text-neutral-400 leading-relaxed">
                All payments for courses, mentorship, or premium tools are processed securely. We reserve the right to refuse or cancel your order at any time for certain reasons including but not limited to: product or service availability, errors in the description or price of the product or service, or error in your order.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Governing Law</h2>
              <p className="text-neutral-400 leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of the United Kingdom. You irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}