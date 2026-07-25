"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full relative bg-[#050505] text-white font-sans overflow-hidden min-h-screen pt-32 pb-20">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-emerald-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-16 animate-[fadeInDown_1s_ease-out]">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-emerald-400 mb-6">
            <Shield size={14} /> Legal Documentation
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Policy</span>
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
          className="bg-[#0a0a0f]/80 border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl backdrop-blur-xl prose prose-invert prose-emerald max-w-none"
        >
          <p className="text-neutral-300 leading-relaxed text-lg mb-8">
            Welcome to Safi Academy, operated by <strong>Safi International Capital LTD</strong> (UK Registration: 17063286). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>

          <div className="space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10"><Eye className="text-emerald-400 w-5 h-5"/></div>
                <h2 className="text-2xl font-bold text-white m-0">1. Information We Collect</h2>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc list-inside text-neutral-400 space-y-2 mt-4 ml-4 marker:text-emerald-500">
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> includes billing address, email address, and telephone numbers.</li>
                <li><strong>Financial Data:</strong> includes bank account and payment card details (processed securely via our payment partners).</li>
                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
                <li><strong>Profile Data:</strong> includes your username and password, purchases or orders made by you, your interests, preferences, feedback, and survey responses.</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10"><Server className="text-emerald-400 w-5 h-5"/></div>
                <h2 className="text-2xl font-bold text-white m-0">2. How We Use Your Data</h2>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-neutral-400 space-y-2 mt-4 ml-4 marker:text-emerald-500">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., providing academy courses).</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal or regulatory obligation.</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10"><Lock className="text-emerald-400 w-5 h-5"/></div>
                <h2 className="text-2xl font-bold text-white m-0">3. Data Security</h2>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Your Legal Rights</h2>
              <p className="text-neutral-400 leading-relaxed">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
              </p>
              <ul className="list-disc list-inside text-neutral-400 space-y-2 mt-4 ml-4 marker:text-emerald-500">
                <li>Request access to your personal data.</li>
                <li>Request correction of your personal data.</li>
                <li>Request erasure of your personal data.</li>
                <li>Object to processing of your personal data.</li>
                <li>Request restriction of processing your personal data.</li>
              </ul>
              <p className="text-neutral-400 leading-relaxed mt-4">
                If you wish to exercise any of the rights set out above, please contact us through our official support channels.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}