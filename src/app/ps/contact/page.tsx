"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    // فرمت پیامی که در تلگرام دریافت می‌کنید
    const text = `📬 پیام جدید از وب‌سایت Safi Academy\n\n👤 نام: ${name}\n📧 ایمیل: ${email}\n📌 موضوع: ${subject}\n\n📝 پیام:\n${message}`;

    // توکن و آیدی ربات تلگرام
    const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN2 || "8994358206:AAHUpoHpMpqdnTxA_J30-xMipDg4l0vhBV8";
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID2 || "5195615040";

    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset(); // فرم بعد از ارسال پاک می‌شود
        
        // بعد از 5 ثانیه وضعیت فرم به حالت اولیه برمی‌گردد
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto text-white relative overflow-hidden">
      
      {/* هاله‌های نوری پس‌زمینه */}
      <div className="absolute top-20 left-[-10%] w-[40vw] h-[40vw] bg-yellow-600/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-neutral-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* هدر صفحه */}
      <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Touch</span>
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl leading-relaxed">
          Whether you have a question about our courses, payment integrations, or partnership opportunities, our team is ready to help you.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start relative z-10">
        
        {/* ================= ستون سمت چپ: اطلاعات تماس ================= */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-white mb-8">Contact Information</h2>
          
          {/* کارت آدرس دفتر مرکزی */}
          <div className="bg-neutral-900/40 p-8 rounded-3xl border border-white/10 flex gap-6 hover:bg-neutral-900/60 transition-all">
            <div className="w-14 h-14 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
            <div>
              <p className="text-sm text-neutral-400 font-bold uppercase tracking-widest mb-1">Headquarters</p>
              <h4 className="text-xl font-bold text-white mb-2">Safi International Capital LTD</h4>
              <p className="text-neutral-300 leading-relaxed">71-75 Shelton Street, Covent Garden<br/>London, United Kingdom</p>
            </div>
          </div>

          {/* کارت ایمیل */}
          <div className="bg-neutral-900/40 p-8 rounded-3xl border border-white/10 flex gap-6 hover:bg-neutral-900/60 transition-all">
            <div className="w-14 h-14 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <div>
              <p className="text-sm text-neutral-400 font-bold uppercase tracking-widest mb-1">Email Support</p>
              <a href="mailto:support@safipro.site" className="text-xl font-bold text-white hover:text-yellow-500 transition-colors">support@safipro.site</a>
              <p className="text-neutral-400 mt-2 text-sm">We aim to reply within 24 hours.</p>
            </div>
          </div>

          {/* کارت تلفن و واتساپ */}
          <div className="bg-neutral-900/40 p-8 rounded-3xl border border-white/10 flex gap-6 hover:bg-neutral-900/60 transition-all">
            <div className="w-14 h-14 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            </div>
            <div>
              <p className="text-sm text-neutral-400 font-bold uppercase tracking-widest mb-1">Direct Lines</p>
              <div className="space-y-2">
                 <p className="text-neutral-300"><span className="text-white font-bold mr-2">Office:</span> +44 20 1234 5678</p>
                 <p className="text-neutral-300"><span className="text-white font-bold mr-2">WhatsApp:</span> +44 7123 456789</p>
              </div>
            </div>
          </div>

          {/* کارت شبکه‌های اجتماعی */}
          <div className="bg-neutral-900/40 p-8 rounded-3xl border border-white/10 flex gap-6 hover:bg-neutral-900/60 transition-all">
            <div className="w-14 h-14 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
            </div>
            <div>
              <p className="text-sm text-neutral-400 font-bold uppercase tracking-widest mb-2">Connect With Us</p>
              <div className="flex gap-4">
                {/* فیسبوک */}
                <a href="https://facebook.com/safiacademy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-transparent transition-all group">
                  <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* اینستاگرام */}
                <a href="https://instagram.com/safiacademy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#E4405F] hover:border-transparent transition-all group">
                  <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.20 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                {/* لینکدین */}
                <a href="https://linkedin.com/company/safiacademy" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0A66C2] hover:border-transparent transition-all group">
                  <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ================= ستون سمت راست: فرم تماس متصل به تلگرام ================= */}
        <div className="bg-neutral-900/50 p-10 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl relative">
          
          <h2 className="text-3xl font-bold text-white mb-2">Send us a message</h2>
          <p className="text-neutral-400 mb-8">Fill out the form below and we will get back to you shortly.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-300 ml-1">Full Name</label>
                <input required type="text" name="name" placeholder="John Doe" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-neutral-300 ml-1">Email Address</label>
                <input required type="email" name="email" placeholder="john@example.com" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"/>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-300 ml-1">Subject</label>
              <input required type="text" name="subject" placeholder="How can we help you?" className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"/>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-300 ml-1">Message</label>
              <textarea required name="message" rows={5} placeholder="Write your message here..." className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all resize-none"></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === "loading" || status === "success"}
              className="w-full py-5 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-extrabold text-lg rounded-xl transition-all shadow-[0_10px_30px_rgba(234,179,8,0.3)] hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-3"
            >
              {status === "idle" && "Send Message"}
              {status === "loading" && "Sending..."}
              {status === "success" && "Message Sent! ✅"}
              {status === "error" && "Error Sending ❌"}
            </button>
            
            {status === "success" && (
              <p className="text-green-400 text-center text-sm font-bold mt-4 animate-pulse">
                Your message has been delivered directly to our team!
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-center text-sm font-bold mt-4">
                Oops! Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>

      </div>
    </main>
  );
}