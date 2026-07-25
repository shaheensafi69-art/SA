"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, ShieldCheck } from "lucide-react";

export default function BusinessFormationPage() {
  const services = [
    {
      title: "Professional Email",
      desc: "Being in business means meeting new people (and hopefully making a good first impression). The best way to do that is with a professional email address that ends in your business name.",
      iconUrl: "https://www.registeredagentsinc.com/wp-content/uploads/2026/04/Mail-Icon-1.webp"
    },
    {
      title: "Domain",
      desc: "Before you can have a business website, you need a domain name. Choose a .com, .net, or .org and pay just $4.95 your first year. Domains renew at market price.",
      iconUrl: "https://www.registeredagentsinc.com/wp-content/uploads/2026/04/Domain-Name-Icon.webp"
    },
    {
      title: "Website",
      desc: "Creating an online business presence might feel daunting, but it doesn’t have to. You’ll get a pre-built business website (hosting & SSL included) that you can customize to suit your business.",
      iconUrl: "https://www.registeredagentsinc.com/wp-content/uploads/2026/04/Secure-Computer-Icon.webp"
    },
    {
      title: "Business Phone",
      desc: "Giving out your personal phone number to strangers is no fun. We can set you up with a business line with a local area code that will forward calls to your existing device. You can even text and set up a professional voicemail greeting.",
      iconUrl: "https://www.registeredagentsinc.com/wp-content/uploads/2026/04/Phone-Icon-1.webp"
    },
    {
      title: "Registered Agent",
      desc: "A registered agent serves as the legal point of contact for your business. When you hire us, we’ll both forward your legal mail and keep your personal address private.",
      iconUrl: "https://www.registeredagentsinc.com/wp-content/uploads/2026/04/Location-Icon.webp"
    },
    {
      title: "Business Formation",
      desc: "We’ll form your LLC or corporation, and we’ll also take care of your state and federal filing requirements—like your annual report or Beneficial Ownership Information Reporting.",
      iconUrl: "https://www.registeredagentsinc.com/wp-content/uploads/2026/04/State-Law-Icon.webp"
    }
  ];

  const benefits = [
    {
      title: "Secure Online Account",
      desc: "Organize your business all in one secure online account. Get help with state documents, monitor upcoming filing due dates, and access to every form you’ll ever need for your business.",
      iconUrl: "https://www.registeredagentsinc.com/wp-content/uploads/2025/01/Shield-250x250.png"
    },
    {
      title: "State-Specific Resources",
      desc: "Starting a business is different in every state. We have local staff who understand the ins and outs of business regulations in every state. You’ll get access to state-specific forms and tips on keeping your business compliant, wherever you do business.",
      iconUrl: "https://www.registeredagentsinc.com/wp-content/uploads/2025/01/Map-250x250.png"
    },
    {
      title: "Renewal Service",
      desc: "Most states have an annual report requirement that can be easy to overlook. As part of our registered agent service, we’ll take care of your annual report for you at no extra cost. That way, you won’t lose your good standing with your state.",
      iconUrl: "https://www.registeredagentsinc.com/wp-content/uploads/2025/01/Clock-250x250.png"
    },
    {
      title: "Offices Nationwide",
      desc: "Expand when you’re ready. We’ve got locally staffed offices in every state. This not only means we provide registered agent services wherever you need them, but we also scan and upload your documents moments after we receive them.",
      iconUrl: "https://www.registeredagentsinc.com/wp-content/uploads/2025/01/Location-250x250.png"
    },
    {
      title: "Expert Support",
      desc: "Our customer service representatives are go-to resources for business filings in every state. Whenever you decide to file paperwork on your own, they’re available to help answer your questions and streamline the process.",
      iconUrl: "https://www.registeredagentsinc.com/wp-content/uploads/2025/01/Star-250x250.png"
    },
    {
      title: "Data Privacy",
      desc: "Privacy protection is a core value of our business. We believe that business owners have a right to privacy, too. That’s why, unlike our competitors, we never sell your information to third parties.",
      iconUrl: "https://www.registeredagentsinc.com/wp-content/uploads/2025/01/Lock-250x250.png"
    }
  ];

  return (
    <main className="w-full relative bg-[#050505] text-white font-sans overflow-hidden min-h-screen pt-32 pb-20">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay"></div>
        <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] bg-yellow-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24 animate-[fadeInDown_1s_ease-out]">
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-yellow-500">
              <ShieldCheck size={14} /> Official Partner Integration
            </div>
            <img 
              src="https://www.registeredagentsinc.com/wp-content/themes/registered-agents-inc-2024/dist/img/rainc-logo-light.webp" 
              alt="Registered Agents Inc Logo" 
              className="h-10 w-auto object-contain mb-4"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Launch Your Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">Company</span>
            </h1>
            <p className="text-lg text-neutral-300 leading-relaxed font-medium">
              Starting a business isn’t something you need to do alone. We’ll set up your business infrastructure, customer communication channels, and online presence. We’ll also help your business stay in good standing by completing state and federal filings. All in a few clicks.
            </p>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
              <div className="absolute inset-0 bg-yellow-500/5 rounded-3xl blur-2xl"></div>
              <img 
                src="https://www.registeredagentsinc.com/wp-content/uploads/2026/04/Business-Formation-1.webp" 
                alt="Business Formation" 
                className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Comprehensive Business Setup</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0a0a0f] border border-white/5 p-8 rounded-[2rem] hover:border-white/20 transition-all duration-300 shadow-xl flex flex-col group"
              >
                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <img src={service.iconUrl} alt={service.title} className="w-12 h-12 object-contain" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4">{service.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed flex-1">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gradient-to-br from-[#0a0a0f] to-[#111118] border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden mb-24">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Why Choose Registered Agents Inc</h2>
            <p className="text-lg text-neutral-300 leading-relaxed">
              Starting a business should give you the freedom to define how you work. Don’t let logistics and bureaucracy get in the way. At Registered Agents Inc, we’ve built tools specifically designed to save you time so that you can focus on what you set out to do in the first place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {benefits.map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 mb-6 relative">
                  <div className="absolute inset-0 bg-white/5 rounded-full blur-xl group-hover:bg-blue-500/20 transition-colors duration-500"></div>
                  <img src={benefit.iconUrl} alt={benefit.title} className="relative z-10 w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA / Conclusion Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto flex flex-col items-center"
        >
          <img 
            src="https://www.registeredagentsinc.com/wp-content/uploads/2025/01/Lock-250x250.png" 
            alt="Secure Services" 
            className="w-20 h-20 object-contain mb-8 opacity-80"
          />
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            Registered Agents Inc Provides Comprehensive Business Solutions For Customers in Every State
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed mb-10 max-w-3xl">
            As the standard in registered agent services, we’ve set the industry pace for years. But as we’ve expanded, our small business roots are always in sight. We know what it takes to go from a local operation to a national enterprise. When you’re ready, we’ll help you do the same.
          </p>
          
          <a 
            href="https://www.registeredagentsinc.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-yellow-500 text-black font-black text-sm uppercase tracking-widest rounded-full transition-all shadow-[0_10px_30px_rgba(234,179,8,0.3)] hover:shadow-[0_15px_40px_rgba(234,179,8,0.5)] hover:scale-105 active:scale-95 group"
          >
            More About Us
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

      </div>
    </main>
  );
}