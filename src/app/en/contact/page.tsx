"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, MessageCircle, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

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
        (e.target as HTMLFormElement).reset(); // پاک کردن فرم بعد از ارسال
        
        // برگشتن به حالت اولیه بعد از ۵ ثانیه
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 md:px-10 lg:px-20 max-w-[1600px] mx-auto text-white relative overflow-hidden font-sans">
      
      {/* ================= BACKGROUND AMBIENCE ================= */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-yellow-600/10 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-amber-800/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-0"></div>

      {/* ================= HEADER ================= */}
      <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-24 relative z-10 animate-[fadeInDown_0.5s_ease-out]">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl mb-8">
          <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_10px_#eab308] animate-pulse"></div>
          <span className="text-xs font-bold tracking-widest text-neutral-300 uppercase">24/7 Global Support</span>
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold mb-6 tracking-tight leading-tight">
          Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600">Touch</span>
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Whether you have a question about our courses, SafiPay integrations, or partnership opportunities, our headquarters team is ready to help you.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start relative z-10">
        
        {/* ================= LEFT COLUMN: CONTACT INFO ================= */}
        <div className="space-y-6 sm:space-y-8 animate-[fadeInLeft_0.5s_ease-out]">
          
          <h2 className="text-3xl font-black text-white mb-8 border-b border-white/5 pb-4">Corporate Directory</h2>
          
          {/* Headquarters */}
          <div className="group bg-neutral-900/40 p-6 sm:p-8 rounded-[2rem] border border-white/5 flex gap-6 hover:bg-neutral-900/80 hover:border-yellow-500/30 transition-all duration-300 shadow-xl backdrop-blur-xl">
            <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0 border border-yellow-500/20 group-hover:scale-110 transition-transform">
               <MapPin size={24} />
            </div>
            <div>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                Headquarters <span className="bg-white/10 px-2 py-0.5 rounded text-white">UK</span>
              </p>
              <h4 className="text-xl font-bold text-white mb-2">Safi International Capital LTD</h4>
              <p className="text-neutral-400 text-sm leading-relaxed">
                71-75 Shelton Street, Covent Garden<br/>
                London, United Kingdom<br/>
                <span className="text-xs font-mono mt-2 block text-neutral-500">Reg No: 17063286</span>
              </p>
            </div>
          </div>

          {/* Email Support */}
          <div className="group bg-neutral-900/40 p-6 sm:p-8 rounded-[2rem] border border-white/5 flex gap-6 hover:bg-neutral-900/80 hover:border-yellow-500/30 transition-all duration-300 shadow-xl backdrop-blur-xl">
            <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0 border border-yellow-500/20 group-hover:scale-110 transition-transform">
               <Mail size={24} />
            </div>
            <div>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-2">Digital Support</p>
              <a href="mailto:safiacademy@hotmail.com" className="text-lg sm:text-xl font-bold text-white hover:text-yellow-500 transition-colors break-all">
                safiacademy@hotmail.com
              </a>
              <p className="text-neutral-500 mt-2 text-xs font-medium">We aim to reply within 24 business hours.</p>
            </div>
          </div>

          {/* Direct Lines */}
          <div className="group bg-neutral-900/40 p-6 sm:p-8 rounded-[2rem] border border-white/5 flex gap-6 hover:bg-neutral-900/80 hover:border-yellow-500/30 transition-all duration-300 shadow-xl backdrop-blur-xl">
            <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0 border border-yellow-500/20 group-hover:scale-110 transition-transform">
               <Phone size={24} />
            </div>
            <div>
              <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-2">Direct Lines</p>
              <div className="space-y-3">
                 <p className="text-neutral-400 text-sm flex items-center gap-3">
                   <span className="text-white font-bold w-20">WhatsApp:</span> 
                   <a href="https://wa.me/447476620282" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 font-mono text-base transition-colors">+44 7476 620282</a>
                 </p>
              </div>
            </div>
          </div>

          {/* Social Media & WhatsApp Channel */}
          <div className="bg-neutral-900/40 p-6 sm:p-8 rounded-[2rem] border border-white/5 shadow-xl backdrop-blur-xl">
            <p className="text-[10px] text-neutral-500 font-black uppercase tracking-widest mb-6">Join The Community</p>
            <div className="flex flex-wrap gap-4">
              
              {/* WhatsApp Channel (Special UI) */}
              <a href="https://whatsapp.com/channel/0029Vb8WCN9FXUucJwrltI32" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-all group">
                <MessageCircle className="text-[#25D366] group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-xs font-black text-white">WhatsApp Channel</p>
                  <p className="text-[10px] text-[#25D366]">Official Announcements</p>
                </div>
              </a>

              {/* Facebook */}
              <a href="https://www.facebook.com/profile.php?id=61591973281742" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-transparent transition-all group shadow-sm">
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://www.instagram.com/safi_academy01?igsh=MXV1ZW44aXBwOHd3NQ==" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:border-transparent transition-all group shadow-sm">
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.20 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/safi-academy/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0A66C2] hover:border-transparent transition-all group shadow-sm">
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
            </div>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: TELEGRAM CONTACT FORM ================= */}
        <div className="bg-[#0a0a0f]/90 p-8 sm:p-12 rounded-[3rem] border border-white/10 backdrop-blur-3xl shadow-2xl relative animate-[fadeInRight_0.5s_ease-out]">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-[40px] pointer-events-none"></div>

          <h2 className="text-3xl font-black text-white mb-3">Send a Dispatch</h2>
          <p className="text-neutral-400 mb-10 text-sm">Fill out the form below. Your message will be instantly delivered to our central command via secure Telegram protocols.</p>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Full Name *</label>
                <input required type="text" name="name" placeholder="John Doe" className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm font-bold focus:outline-none focus:border-yellow-500/50 shadow-inner transition-colors"/>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Email Address *</label>
                <input required type="email" name="email" placeholder="john@example.com" className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm font-bold focus:outline-none focus:border-yellow-500/50 shadow-inner transition-colors"/>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Subject Matter *</label>
              <input required type="text" name="subject" placeholder="e.g. Enterprise Partnership, Course Inquiry..." className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm font-bold focus:outline-none focus:border-yellow-500/50 shadow-inner transition-colors"/>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1">Your Message *</label>
              <textarea required name="message" rows={5} placeholder="Write your message here..." className="w-full bg-black/60 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:border-yellow-500/50 shadow-inner transition-colors resize-y min-h-[120px] custom-scrollbar"></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === "loading" || status === "success"}
              className="w-full py-5 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-[0_10px_30px_rgba(234,179,8,0.3)] active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-3 mt-4"
            >
              {status === "idle" && <><Send size={16} /> Transmit Message</>}
              {status === "loading" && <><Loader2 size={16} className="animate-spin" /> Processing Transmission...</>}
              {status === "success" && <><CheckCircle2 size={16} /> Signal Received</>}
              {status === "error" && <><AlertCircle size={16} /> Transmission Failed</>}
            </button>
            
            {status === "success" && (
              <div className="p-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse">
                Your message has been securely delivered to headquarters.
              </div>
            )}
            {status === "error" && (
              <div className="p-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                Network error. Please verify your connection or use direct lines.
              </div>
            )}
          </form>
        </div>

      </div>
    </main>
  );
}