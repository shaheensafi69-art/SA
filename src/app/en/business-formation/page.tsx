"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Mail, 
  Globe, 
  Monitor, 
  Phone, 
  MapPin, 
  FileText, 
  Shield, 
  Clock, 
  Building2, 
  CheckCircle2, 
  Info, 
  Sparkles, 
  Lock, 
  Check, 
  ChevronRight,
  Award,
  Users
} from "lucide-react";

// ============================================================================
// AFFILIATE / REFERRAL CONFIGURATION
// Replace this URL with your unique AWIN / Registered Agents Inc affiliate link
// once your application is approved.
// ============================================================================
const AFFILIATE_URL = "https://www.registeredagentsinc.com/business-formation/";

export default function BusinessFormationPage() {
  const services = [
    {
      title: "Registered Agent in All 50 States",
      desc: "Every US entity legally requires a registered agent with a physical street address in the state of formation. Registered Agents Inc acts as your legal point of contact, helping keep your personal home address off public state records where permitted by law.",
      icon: MapPin,
      badge: "Core Requirement"
    },
    {
      title: "LLC & Corporation Formation",
      desc: "Full-service entity incorporation in any US state (including Wyoming, Delaware, and Florida). They handle your Articles of Organization, state documentation, and ensure initial filings comply with state laws.",
      icon: FileText,
      badge: "Entity Setup"
    },
    {
      title: "FinCEN BOI Guidance & Updates",
      desc: "Guidance on federal Beneficial Ownership Information (BOI) reporting regulations. Under current federal court rulings and regulatory stays, many domestic US entities are currently exempt or enjoy paused reporting requirements, while certain foreign reporting companies remain subject to mandatory disclosure. Registered Agents Inc monitors official FinCEN rules and offers compliant reporting assistance where applicable by law.",
      icon: ShieldCheck,
      badge: "Federal Compliance"
    },
    {
      title: "Annual Report & Good Standing",
      desc: "States require annual filings to keep businesses active. Registered Agents Inc tracks renewal deadlines and can automatically prepare and file reports to ensure your entity remains in good standing.",
      icon: Clock,
      badge: "State Filings"
    },
    {
      title: "Digital Mail Scanning & Portal",
      desc: "Legal notices, official state documents, and government mail are promptly scanned and uploaded to your secure online dashboard the day they arrive, allowing you to access them from anywhere worldwide.",
      icon: Mail,
      badge: "Instant Access"
    },
    {
      title: "Business Identity & Privacy Suite",
      desc: "Complete business infrastructure including a professional business phone line with a local area code, domain name, email forwarding, and commercial business address usage.",
      icon: Globe,
      badge: "Infrastructure"
    }
  ];

  const whyWeRecommend = [
    {
      title: "Locally Staffed in All 50 States",
      desc: "Unlike services that outsource to third parties, Registered Agents Inc maintains physical offices and staffed teams across every US state for direct, reliable legal mail processing.",
      icon: Building2
    },
    {
      title: "Total Founder Privacy",
      desc: "They strictly do not sell customer data or marketing lists. Your personal residential address can be kept off public records where permitted by law, protecting founder privacy and reducing unsolicited junk mail.",
      icon: Lock
    },
    {
      title: "Same-Day Document Uploads",
      desc: "Time-sensitive state correspondence and court notifications are scanned and uploaded to your account on the same day they are received, accessible globally 24/7.",
      icon: Clock
    },
    {
      title: "Over Two Decades of Authority",
      desc: "Decades of proven industry leadership in corporate filings and registered agent representation, trusted by thousands of local and international entrepreneurs.",
      icon: Award
    },
    {
      title: "Centralized Compliance Dashboard",
      desc: "Monitor upcoming state deadlines, download certified entity documents, manage annual reports, and organize business filings all within one unified portal.",
      icon: Monitor
    },
    {
      title: "Dedicated Specialist Support",
      desc: "Experienced corporate service agents knowledgeable in state-by-state statutory requirements available via phone and direct messaging to help guide your filings.",
      icon: Users
    }
  ];

  const formationSteps = [
    {
      step: "01",
      title: "Learn & Select State",
      desc: "Determine whether Wyoming, Delaware, or another state fits your business model. Safi Academy's business courses cover state selection, taxes, and founder strategy."
    },
    {
      step: "02",
      title: "Register via Registered Agents Inc",
      desc: "Use our referral link to choose your LLC or Corporation package and designate Registered Agents Inc as your registered agent."
    },
    {
      step: "03",
      title: "Obtain Documents & EIN",
      desc: "Receive filed Articles of Organization, obtain your federal Employer Identification Number (EIN), and establish your corporate records."
    },
    {
      step: "04",
      title: "Stay 100% Compliant",
      desc: "Receive digital mail scans, monitor annual reporting deadlines, and stay updated on FinCEN BOI reporting rules applicable to your specific entity."
    }
  ];

  const faqs = [
    {
      q: "What is a Registered Agent and why is it legally required?",
      a: "A Registered Agent is an individual or business entity authorized to accept legal service of process and state correspondence on behalf of your company. US state law mandates that every LLC or Corporation must maintain a registered agent with a physical street address located in the state of formation."
    },
    {
      q: "Can international founders (non-US residents) use this service?",
      a: "Yes. Non-US residents can legally form and own a US business (such as an LLC). Registered Agents Inc provides the physical US registered address and scans all state correspondence into your digital portal, making it accessible from anywhere in the world."
    },
    {
      q: "Are all US companies currently required to submit FinCEN BOI reports?",
      a: "No. Following ongoing federal court rulings and regulatory updates from FinCEN, many domestic entities formed in the United States currently qualify for exemptions or paused reporting timelines, while certain foreign-registered reporting companies remain subject to mandatory disclosure. Registered Agents Inc tracks official FinCEN rules and facilitates compliant filings where legally required."
    },
    {
      q: "Does using the Safi Academy referral link cost extra?",
      a: "No. Pricing remains identical (and often includes promotional pricing or bundled savings). Safi Academy may receive a referral commission from Registered Agents Inc if you choose to sign up through our link, which helps us continue providing free educational resources."
    },
    {
      q: "How does Registered Agents Inc protect founder privacy?",
      a: "When forming a company or acting as your registered agent, Registered Agents Inc allows you to list their commercial registered office on public state documents where permitted by law rather than your personal home address. Furthermore, they maintain a strict policy of never selling customer data to third parties."
    }
  ];

  return (
    <main className="w-full relative bg-[#020202] text-white font-sans overflow-hidden min-h-screen pt-28 md:pt-36 pb-24">
      
      {/* Ambient Lighting & Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute top-[8%] left-[-10%] w-[45vw] h-[45vw] bg-amber-500/10 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] bg-blue-600/10 rounded-full blur-[170px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Affiliate & FTC Compliance Disclosure Banner */}
        <div className="mb-12 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 md:p-5 flex items-start gap-4 backdrop-blur-md">
          <Info className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
          <div className="text-xs md:text-sm text-neutral-300 leading-relaxed">
            <span className="font-semibold text-amber-300 mr-1">Affiliate & Editorial Disclosure:</span>
            Safi Academy provides independent educational courses and resources for entrepreneurs. When you register or purchase services through our referral links to Registered Agents Inc, we may receive an affiliate commission at no additional cost to you. We only recommend established providers that meet our criteria for data privacy, nationwide reliability, and professional compliance.
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-28">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Sparkles className="w-3.5 h-3.5" /> Recommended US Corporate Service Provider
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Form & Protect Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600">
                US Company
              </span>
            </h1>

            <p className="text-base md:text-lg text-neutral-300 leading-relaxed font-normal">
              Whether you are an international founder launching a global startup or an entrepreneur expanding into the US market, proper corporate foundation is paramount. Safi Academy recommends <strong className="text-white font-semibold">Registered Agents Inc</strong> for 50-state registered agent representation, LLC/Corporation formation, and ongoing state compliance.
            </p>

            {/* Quick Benefits Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-neutral-200">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Registered Agent Services Available in All 50 States</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-200">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Personal Address Privacy (Where Permitted by Law)</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-200">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Same-Day Digital Document Scanning</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-200">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>FinCEN BOI Updates & Annual Report Support</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a 
                href={AFFILIATE_URL}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all shadow-[0_10px_25px_rgba(245,158,11,0.25)] hover:shadow-[0_15px_35px_rgba(245,158,11,0.4)] hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Visit Registered Agents Inc</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a 
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-bold text-sm rounded-xl border border-white/10 transition-colors"
              >
                <span>Explore Services</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Hero Visual: Glassmorphism Compliance & Formation Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-neutral-900/80 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest block">Entity Status</span>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    US Corporate Shield
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Active
                </span>
              </div>

              {/* Status Items */}
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between hover:bg-white/[0.07] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Registered Agent</div>
                      <div className="text-xs text-neutral-400">All 50 US States Covered</div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-amber-400" />
                </div>

                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between hover:bg-white/[0.07] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Address Privacy</div>
                      <div className="text-xs text-neutral-400">Owner Data Shielded (Where Permitted by Law)</div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>

                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between hover:bg-white/[0.07] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">FinCEN BOI Guidance</div>
                      <div className="text-xs text-neutral-400">Federal Exemption & Rules Tracking</div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-purple-400" />
                </div>

                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between hover:bg-white/[0.07] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Digital Mailroom</div>
                      <div className="text-xs text-neutral-400">Same-Day Online Scans</div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 text-center">
                <p className="text-xs text-neutral-400">
                  Recommended by Safi Academy for international & domestic founders.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div id="services" className="mb-32 scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400 mb-3">
              Corporate Infrastructure
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Services Offered by Registered Agents Inc
            </h2>
            <p className="mt-4 text-neutral-400 text-sm md:text-base leading-relaxed">
              Explore the core corporate filing, registered representation, and compliance solutions available through Registered Agents Inc for your US enterprise.
            </p>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-neutral-900/60 border border-white/5 hover:border-amber-500/30 p-8 rounded-3xl transition-all duration-300 flex flex-col group hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 text-neutral-400 border border-white/5">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed flex-1">
                    {service.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Step-by-Step Educational Formation Process */}
        <div className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400 mb-3">
              Process Blueprint
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              How the Formation Process Works
            </h2>
            <p className="mt-3 text-neutral-400 text-sm md:text-base">
              A straightforward roadmap from learning the basics to operating legally in the United States.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {formationSteps.map((step, idx) => (
              <div 
                key={idx}
                className="bg-neutral-900/40 border border-white/5 rounded-2xl p-6 relative flex flex-col justify-between"
              >
                <div className="text-3xl font-black text-amber-500/30 mb-4 font-mono">
                  {step.step}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">{step.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs text-amber-400 font-semibold">
                  <span>Phase {step.step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Safi Academy Recommends Section */}
        <div className="bg-gradient-to-br from-neutral-900/90 via-neutral-950 to-[#0c0c12] border border-white/10 rounded-[2.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden mb-32">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400 mb-3">
              Independent Editorial Assessment
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5 tracking-tight">
              Why We Recommend Registered Agents Inc
            </h2>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
              When recommending external corporate service providers to our community and students, we look for data protection, physical infrastructure, transparent pricing, and regulatory expertise. Here is why Registered Agents Inc stands out:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {whyWeRecommend.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="flex flex-col items-start p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-32">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400 mb-3">
              Common Questions
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors"
              >
                <h3 className="text-base md:text-lg font-bold text-white mb-2 flex items-start gap-3">
                  <span className="text-amber-400 font-mono">Q.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs md:text-sm text-neutral-400 leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Compliant CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto flex flex-col items-center bg-gradient-to-b from-neutral-900/80 to-black border border-white/10 rounded-3xl p-8 md:p-14 shadow-2xl"
        >
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
            <Building2 className="w-8 h-8" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-5 tracking-tight">
            Ready to Form Your Company or Secure a Registered Agent?
          </h2>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed mb-8 max-w-2xl">
            Get started directly through Registered Agents Inc to initiate your state entity formation, secure your registered address, and establish your US business presence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a 
              href={AFFILIATE_URL} 
              target="_blank" 
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-9 py-4 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all shadow-[0_10px_30px_rgba(245,158,11,0.25)] hover:shadow-[0_15px_40px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 group"
            >
              <span>Get Started on Registered Agents Inc</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <Link
              href="/en/courses"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-bold text-sm rounded-xl border border-white/10 transition-colors"
            >
              <span>View Academy Courses</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-[11px] text-neutral-500 mt-8 max-w-lg">
            * Registered Agents Inc is an independent service provider. Safi Academy is not a law firm and does not provide legal, tax, or official financial advice. For state filing options, please visit their official website.
          </p>
        </motion.div>

      </div>
    </main>
  );
}