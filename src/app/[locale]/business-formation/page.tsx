"use client";
import { getPortalTranslation } from "@/utils/portalTranslations";
import { getBusinessFormationTranslation } from "@/utils/businessFormationTranslations";
import { usePathname } from "next/navigation";

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
import AdsterraNativeBanner from "@/components/ads/AdsterraNativeBanner";

// ============================================================================
// AFFILIATE / REFERRAL CONFIGURATION
// ============================================================================
const AFFILIATE_URL = "https://www.registeredagentsinc.com/business-formation/";

const serviceIcons = [MapPin, FileText, ShieldCheck, Clock, Mail, Globe];
const whyIcons = [Building2, Lock, Clock, Award, Monitor, Users];

export default function BusinessFormationPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const bf = getBusinessFormationTranslation(currentLocale);
  const isRtl = bf.isRtl;

  const services = bf.services.map((item, idx) => ({
    ...item,
    icon: serviceIcons[idx] || MapPin
  }));

  const whyWeRecommend = bf.whyWeRecommend.map((item, idx) => ({
    ...item,
    icon: whyIcons[idx] || Building2
  }));

  const formationSteps = bf.formationSteps;
  const faqs = bf.faqs;

  return (
    <main dir={isRtl ? "rtl" : "ltr"} className="w-full relative bg-[#020202] text-white font-sans overflow-hidden min-h-screen pt-28 md:pt-36 pb-24">

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
            <span className="font-semibold text-amber-300 mr-1">{bf.partnerDisclosure}</span>
            {bf.disclosureText}
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-28">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Sparkles className="w-3.5 h-3.5" /> {bf.heroBadge}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              {bf.heroTitle1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600">
                {bf.heroTitle2}
              </span>
            </h1>

            <p className="text-base md:text-lg text-neutral-300 leading-relaxed font-normal">
              {bf.heroDesc}
            </p>

            {/* Quick Benefits Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-neutral-200">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{bf.services[0]?.title || "Registered Agent Services in 50 States"}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-200">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{bf.whyWeRecommend[1]?.title || "Total Founder Privacy"}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-200">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{bf.whyWeRecommend[2]?.title || "Same-Day Document Scans"}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-200">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{bf.services[2]?.title || "Federal BOI & Compliance Tracking"}</span>
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
                <span>{bf.ctaRegister}</span>
                <ExternalLink className="w-4 h-4 rtl:rotate-180" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-bold text-sm rounded-xl border border-white/10 transition-colors"
              >
                <span>{bf.servicesBadge}</span>
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
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
              {bf.servicesBadge}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {bf.servicesTitle}
            </h2>
            <p className="mt-4 text-neutral-400 text-sm md:text-base leading-relaxed">
              {bf.servicesSub}
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
              {bf.stepsBadge}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              {bf.stepsTitle}
            </h2>
            <p className="mt-3 text-neutral-400 text-sm md:text-base">
              {bf.stepsSub}
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
              {bf.whyBadge}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5 tracking-tight">
              {bf.whyTitle}
            </h2>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
              {bf.whySub}
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
              {bf.faqsBadge}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              {bf.faqsTitle}
            </h2>
            <p className="mt-3 text-neutral-400 text-sm md:text-base text-center">
              {bf.faqsSub}
            </p>
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
                <p className="text-xs md:text-sm text-neutral-400 leading-relaxed pl-7 rtl:pl-0 rtl:pr-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Native Ad Placement */}
        <AdsterraNativeBanner
          category="US LLC, UK LTD & International Business Formation"
          keywords="company registration, us llc, uk ltd, ein tax number, registered agent, corporate banking"
          badgeLabel="Corporate Sponsor"
        />

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
            {bf.ctaBottomTitle}
          </h2>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed mb-8 max-w-2xl">
            {bf.ctaBottomDesc}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href={AFFILIATE_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-9 py-4 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm uppercase tracking-wider rounded-xl transition-all shadow-[0_10px_30px_rgba(245,158,11,0.25)] hover:shadow-[0_15px_40px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 group"
            >
              <span>{bf.ctaBottomBtn}</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform rtl:rotate-180" />
            </a>

            <Link
              href={`/${currentLocale}/courses`}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-bold text-sm rounded-xl border border-white/10 transition-colors"
            >
              <span>{bf.ctaExploreCourses}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
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