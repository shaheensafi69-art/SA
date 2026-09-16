"use client";

import React, { useState } from "react";
import Link from "next/link";

type AccountType = "Personal" | "Business";

const partners = [
    {
        name: "Wise",
        domain: "wise.com",
        accent: "International money movement",
        description:
            "Wise is a global financial technology platform focused on international money movement and multi-currency account functionality. Its core proposition is to make cross-border transfers and currency management more transparent and efficient. For international users, the platform is commonly associated with holding multiple currencies, receiving money through supported account details, and converting funds between currencies. Availability of individual features depends on the customer’s country, verification status, product configuration, and local regulatory requirements.",
        details: [
            "Multi-currency money management",
            "International transfers and currency conversion",
            "Local receiving details in supported markets",
            "Transparent fee presentation",
            "Digital-first account experience",
        ],
    },
    {
        name: "Payoneer",
        domain: "payoneer.com",
        accent: "Global business payments",
        description:
            "Payoneer is a financial technology company serving freelancers, marketplaces, agencies, and businesses that receive or send cross-border commercial payments. Its services are particularly relevant to international commerce because businesses can use supported receiving accounts and payment tools to interact with global clients and marketplaces. Exact receiving currencies, account details, fees, limits, and eligibility vary by jurisdiction and customer profile, so users should verify the current terms directly with Payoneer before relying on a particular feature.",
        details: [
            "Cross-border business payment infrastructure",
            "Marketplace and commercial payment workflows",
            "Supported receiving accounts in selected regions",
            "Business-oriented payment tools",
            "Compliance and verification workflows",
        ],
    },
    {
        name: "Wirex",
        domain: "wirexapp.com",
        accent: "Digital money & card ecosystem",
        description:
            "Wirex is a digital money platform that combines account, payment-card, and digital-asset functionality in supported markets. The platform is designed around a mobile-first experience and gives eligible customers tools for spending, transferring, and managing supported currencies and assets. Product availability is market-specific and can change as regulation and product coverage evolve. Users should always confirm current card, account, currency, and asset availability in their own jurisdiction.",
        details: [
            "Mobile-first digital money management",
            "Payment-card products in supported markets",
            "Multi-currency functionality",
            "Digital-asset functionality where available",
            "Identity verification and compliance controls",
        ],
    },
    {
        name: "WorldFirst",
        domain: "worldfirst.com",
        accent: "International business payments",
        description:
            "WorldFirst focuses on international payment and foreign-exchange infrastructure for businesses engaged in global trade. Its services are designed around receiving and paying money across borders, managing foreign currencies, and reducing operational friction for international commerce. Business eligibility, available currencies, account details, fees, limits, and supported corridors depend on jurisdiction and onboarding checks. The platform is therefore best understood as business payment infrastructure rather than a conventional high-street bank.",
        details: [
            "International business payments",
            "Foreign-exchange and currency management",
            "Global marketplace payment workflows",
            "Business receiving and settlement tools",
            "Jurisdiction-specific onboarding and compliance",
        ],
    },
];

const featureCards = [
    {
        number: "01",
        title: "Multi-Currency Architecture",
        text: "A structured environment for international users who need to think beyond a single domestic currency. Present supported currencies, balances, transfers and settlement workflows through one coherent experience.",
        icon: "◎",
    },
    {
        number: "02",
        title: "International Account Rails",
        text: "Understand the difference between a payment account, local receiving details, an IBAN, a wallet and a traditional bank account. The interface explains the infrastructure without hiding important limitations.",
        icon: "⌘",
    },
    {
        number: "03",
        title: "Virtual & Physical Cards",
        text: "A premium card-oriented experience for users who need a clear route from onboarding to everyday spending, online payments and supported international transactions.",
        icon: "▣",
    },
    {
        number: "04",
        title: "Compliance First",
        text: "Verification, eligibility, source-of-funds information and jurisdictional restrictions are presented as part of the process rather than treated as fine print.",
        icon: "◇",
    },
];

const currencies = ["EUR", "USD", "GBP", "PLN", "SEK", "NOK", "RON", "HUF", "CZK", "DKK"];

const faqs = [
    ["Is this a traditional bank account?", "The service should not be presented as a traditional high-street bank unless the specific provider actually operates as a bank in the relevant jurisdiction. Depending on the selected provider, the underlying product may be an electronic-money account, payment account, wallet, receiving account or card programme."],
    ["Why are several providers shown?", "International finance is not one single rail. Different providers specialize in different use cases, currencies, markets and customer profiles. The page therefore explains several recognizable international payment platforms instead of suggesting that every provider offers identical products."],
    ["Will every currency be available to every applicant?", "No. Currency availability, receiving details, card availability, limits and other services can depend on residence, nationality, verification, product type and the provider’s current rules."],
    ["Can an applicant be asked for additional documents?", "Yes. Financial service providers commonly use identity, address, business, tax, source-of-funds and other compliance checks where applicable. Additional documentation can be requested during onboarding or later reviews."],
    ["Are the logos proof that every provider is a direct banking partner?", "No. Logos on this page are informational and should not be interpreted as a statement that every provider is a direct partner, sponsor, correspondent bank or guaranteed service provider unless a separate written agreement says so."],
];

export default function BankAccountServicePage() {
    const [accountType, setAccountType] = useState<AccountType>("Personal");
    const [activePartner, setActivePartner] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        companyName: "",
        companyRegNumber: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((current) => ({ ...current, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            /*
             * SECURITY NOTE:
             * Do not put a Telegram bot token in a NEXT_PUBLIC_* variable or hard-code it
             * in client-side JavaScript. The browser can expose both. This form expects a
             * server-side endpoint at /api/bank-account-request that owns the Telegram
             * credentials and performs the dispatch.
             */
            const response = await fetch("/api/bank-account-request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ accountType, ...formData }),
            });

            if (!response.ok) throw new Error("Request failed");

            setSubmitStatus("success");
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                country: "",
                companyName: "",
                companyRegNumber: "",
            });
        } catch {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
            window.setTimeout(() => setSubmitStatus("idle"), 6000);
        }
    };

    return (
        <main className="min-h-screen overflow-hidden bg-[#030508] text-white selection:bg-cyan-400/20 selection:text-cyan-100">
            <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { background: #030508; }
        .bank-grid {
          background-image:
            linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: linear-gradient(to bottom, black 0%, transparent 85%);
        }
        .aurora { animation: aurora 12s ease-in-out infinite alternate; }
        .float-card { animation: floatCard 7s ease-in-out infinite; }
        .float-card-delay { animation: floatCard 8s ease-in-out 1s infinite; }
        .scanline { animation: scan 6s linear infinite; }
        @keyframes aurora {
          from { transform: translate3d(-3%, -2%, 0) scale(1); }
          to { transform: translate3d(3%, 2%, 0) scale(1.08); }
        }
        @keyframes floatCard {
          0%,100% { transform: translateY(0) rotateX(3deg) rotateY(-4deg); }
          50% { transform: translateY(-14px) rotateX(-1deg) rotateY(4deg); }
        }
        @keyframes scan {
          0% { transform: translateY(-120%); }
          100% { transform: translateY(120%); }
        }
        .perspective { perspective: 1400px; }
      `}</style>

            {/* Ambient 3D stage */}
            <div className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute inset-0 bank-grid opacity-70" />
                <div className="aurora absolute left-1/2 top-[-18rem] h-[48rem] w-[48rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
                <div className="absolute right-[-15rem] top-[25rem] h-[34rem] w-[34rem] rounded-full bg-blue-600/10 blur-[120px]" />
                <div className="absolute left-[-12rem] top-[60rem] h-[30rem] w-[30rem] rounded-full bg-violet-600/10 blur-[120px]" />
            </div>

            {/* Hero */}
            <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8 lg:px-12 lg:pt-36">
                <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
                    <div>
                        <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-300/15 bg-white/[.035] px-4 py-2 text-[10px] font-bold uppercase tracking-[.28em] text-cyan-300 backdrop-blur-xl">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_18px_#67e8f9]" />
                            Global Banking Infrastructure
                        </div>

                        <h1 className="max-w-4xl text-5xl font-black leading-[.95] tracking-[-.055em] sm:text-7xl lg:text-[6.7rem]">
                            Banking without
                            <span className="block bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                                borders.
                            </span>
                        </h1>

                        <p className="mt-8 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                            A premium international-account experience designed for people and businesses operating across currencies,
                            countries and digital markets. Explore the architecture, understand the providers, then submit an application
                            for the route that matches your profile.
                        </p>

                        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                            <a href="#application" className="rounded-2xl bg-white px-7 py-4 text-center text-sm font-extrabold text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-100">
                                Start application
                            </a>
                            <a href="#providers" className="rounded-2xl border border-white/10 bg-white/[.035] px-7 py-4 text-center text-sm font-bold text-white backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/30">
                                Explore providers
                            </a>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-2">
                            {currencies.map((currency) => (
                                <span key={currency} className="rounded-full border border-white/8 bg-white/[.025] px-3 py-1.5 text-[10px] font-bold tracking-[.16em] text-slate-500">
                                    {currency}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="perspective relative min-h-[430px]">
                        {/* 3D card */}
                        <div className="float-card absolute right-0 top-3 w-[min(100%,430px)] rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/[.16] via-white/[.06] to-cyan-400/[.04] p-7 shadow-[0_50px_120px_-35px_rgba(0,0,0,.95)] backdrop-blur-2xl">
                            <div className="mb-16 flex items-center justify-between">
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-[.3em] text-cyan-200">Safi Global</div>
                                    <div className="mt-2 text-sm font-semibold text-white/70">International account</div>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs font-black">VISA</div>
                            </div>
                            <div className="mb-8 h-11 w-14 rounded-xl border border-white/20 bg-gradient-to-br from-amber-100/70 to-amber-400/30 shadow-inner" />
                            <div className="text-2xl font-bold tracking-[.18em] text-white">•••• 4821</div>
                            <div className="mt-7 flex justify-between text-[9px] uppercase tracking-[.22em] text-slate-400">
                                <span>Global access</span><span>Premium digital rail</span>
                            </div>
                        </div>

                        <div className="float-card-delay absolute bottom-0 left-0 w-64 rounded-[1.5rem] border border-cyan-300/15 bg-[#071018]/85 p-5 shadow-[0_35px_80px_-25px_rgba(34,211,238,.28)] backdrop-blur-2xl">
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-bold uppercase tracking-[.22em] text-slate-500">Live settlement</span>
                                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_#34d399]" />
                            </div>
                            <div className="mt-4 text-3xl font-black">10+</div>
                            <div className="mt-1 text-xs text-slate-500">supported currencies shown in the ecosystem</div>
                        </div>

                        <div className="absolute -right-4 top-1/2 h-28 w-28 rounded-full border border-cyan-300/20 bg-cyan-300/5 blur-[1px] shadow-[0_0_70px_rgba(34,211,238,.2)]" />
                    </div>
                </div>

                <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-4">
                    {[
                        ["10+", "Currencies referenced"],
                        ["4", "Major platforms"],
                        ["24/7", "Digital access model"],
                        ["UK", "Corporate ecosystem"],
                    ].map(([value, label]) => (
                        <div key={label} className="bg-[#05080c]/90 p-7 backdrop-blur-xl">
                            <div className="text-3xl font-black tracking-tight text-white">{value}</div>
                            <div className="mt-2 text-xs uppercase tracking-[.16em] text-slate-500">{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Architecture */}
            <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-12">
                <div className="max-w-3xl">
                    <div className="text-xs font-bold uppercase tracking-[.3em] text-cyan-400">01 / Architecture</div>
                    <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">A financial interface built like a product, not a form.</h2>
                    <p className="mt-6 leading-8 text-slate-400">
                        The service page is intentionally structured around education, transparency and conversion. Instead of placing
                        an application form at the top, it first explains what the infrastructure means, where provider capabilities
                        differ, and what a user should prepare before onboarding.
                    </p>
                </div>

                <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {featureCards.map((item) => (
                        <article key={item.number} className="group relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[.025] p-7 transition duration-500 hover:-translate-y-2 hover:border-cyan-300/25 hover:bg-white/[.05]">
                            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/5 blur-3xl transition group-hover:bg-cyan-400/15" />
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold tracking-[.2em] text-slate-600">{item.number}</span>
                                <span className="text-2xl text-cyan-300">{item.icon}</span>
                            </div>
                            <h3 className="mt-12 text-xl font-bold">{item.title}</h3>
                            <p className="mt-4 text-sm leading-7 text-slate-500">{item.text}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* Providers */}
            <section id="providers" className="relative border-y border-white/5 bg-white/[.018] py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
                    <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
                        <div>
                            <div className="text-xs font-bold uppercase tracking-[.3em] text-cyan-400">02 / Global providers</div>
                            <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Know the rails behind the logo.</h2>
                            <p className="mt-6 leading-8 text-slate-400">
                                A professional financial page should distinguish a bank from a fintech platform, a payment account from a
                                traditional deposit account, and a receiving detail from a universal bank account. The four platforms below
                                are presented as distinct ecosystems with different purposes.
                            </p>

                            <div className="mt-9 space-y-2">
                                {partners.map((partner, index) => (
                                    <button
                                        key={partner.name}
                                        onClick={() => setActivePartner(index)}
                                        className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${activePartner === index
                                                ? "border-cyan-300/25 bg-cyan-300/[.06]"
                                                : "border-white/7 bg-white/[.02] hover:border-white/15"
                                            }`}
                                    >
                                        <span>
                                            <span className="block text-sm font-bold text-white">{partner.name}</span>
                                            <span className="mt-1 block text-[10px] uppercase tracking-[.18em] text-slate-600">{partner.accent}</span>
                                        </span>
                                        <span className="text-slate-600">↗</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-5 rounded-[2.5rem] bg-cyan-400/[.04] blur-3xl" />
                            <article className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#060b10]/95 p-8 shadow-[0_40px_100px_-40px_rgba(0,0,0,.95)] sm:p-12">
                                <div className="scanline pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent via-cyan-300/[.035] to-transparent" />
                                <div className="flex flex-wrap items-start justify-between gap-5">
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-[.3em] text-cyan-400">Provider profile</div>
                                        <h3 className="mt-3 text-4xl font-black">{partners[activePartner].name}</h3>
                                        <p className="mt-2 text-xs uppercase tracking-[.2em] text-slate-600">{partners[activePartner].accent}</p>
                                    </div>
                                    <div className="rounded-2xl border border-white/10 bg-white/[.035] px-4 py-3 text-xs font-bold text-slate-400">
                                        {partners[activePartner].domain}
                                    </div>
                                </div>

                                <p className="mt-9 text-base leading-8 text-slate-400">{partners[activePartner].description}</p>

                                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                                    {partners[activePartner].details.map((detail) => (
                                        <div key={detail} className="rounded-2xl border border-white/7 bg-white/[.025] p-4">
                                            <div className="mb-3 h-1 w-8 rounded-full bg-cyan-300/50" />
                                            <div className="text-sm font-semibold text-slate-200">{detail}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-10 border-t border-white/7 pt-6 text-xs leading-6 text-slate-600">
                                    Provider information is presented for orientation. Product availability, eligibility, pricing, limits,
                                    currencies and regulatory status are determined by the provider and the customer’s jurisdiction.
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </section>

            {/* Deep-dive content */}
            <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8 lg:px-12">
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[.05] to-white/[.015] p-8 lg:col-span-2">
                        <div className="text-xs font-bold uppercase tracking-[.3em] text-cyan-400">03 / International banking explained</div>
                        <h2 className="mt-5 text-3xl font-black sm:text-5xl">From domestic banking to a multi-rail financial life.</h2>

                        <div className="mt-8 space-y-7 text-sm leading-8 text-slate-400">
                            <p>
                                International banking is not a single product. A person who works with overseas clients may need receiving
                                details in one currency, a card for day-to-day spending, a transfer route for another currency, and a separate
                                business payment account for invoices. A global entrepreneur may additionally need marketplace settlement,
                                foreign-exchange management and documentation for compliance reviews. Treating all of these needs as if they
                                were one conventional bank account creates confusion. This page is designed to make the layers visible.
                            </p>
                            <p>
                                A multi-currency account can provide a central place to view supported balances, but the existence of a balance
                                does not automatically mean that every currency is a local bank account. Some currencies may be represented
                                through a wallet balance, while other currencies can have local receiving details or dedicated account
                                identifiers. The exact legal and operational structure depends on the provider, the country of residence and
                                the product being offered.
                            </p>
                            <p>
                                An IBAN is also not synonymous with a complete banking relationship. An IBAN is an account identifier used
                                in the international banking system, particularly across Europe and other participating regions. Users should
                                always confirm who legally provides the account, what entity safeguards funds, what payment rails are supported,
                                and whether the account is intended for personal or commercial use.
                            </p>
                            <p>
                                Cards are another layer. A virtual card can be useful for online transactions while a physical card can serve
                                in-store or ATM use where supported. Card issuance, merchant acceptance, cash withdrawal, spending limits,
                                verification requirements and regional availability are provider-specific. A premium visual interface should
                                therefore avoid promising universal acceptance and instead explain what the customer can verify before using
                                the card.
                            </p>
                            <p>
                                Compliance is part of the architecture. International financial services operate with identity verification,
                                sanctions screening, transaction monitoring, customer-risk controls and other regulatory obligations. Business
                                applicants can also be asked for incorporation documents, ownership information, tax information, business
                                activity details and source-of-funds evidence. These checks are not an optional decoration around the service;
                                they are part of how regulated financial infrastructure operates.
                            </p>
                        </div>
                    </div>

                    <aside className="rounded-[2rem] border border-cyan-300/10 bg-cyan-300/[.025] p-8">
                        <div className="text-xs font-bold uppercase tracking-[.3em] text-cyan-400">Onboarding intelligence</div>
                        <h3 className="mt-5 text-2xl font-black">Prepare before you apply.</h3>
                        <div className="mt-7 space-y-3">
                            {[
                                "Valid identity document",
                                "Current residential address",
                                "Working email and phone",
                                "Country of residence",
                                "Business registration where applicable",
                                "Expected account activity",
                                "Source-of-funds information if requested",
                                "Tax or business information where required",
                            ].map((item, i) => (
                                <div key={item} className="flex gap-3 rounded-xl border border-white/7 bg-black/20 p-3 text-xs text-slate-400">
                                    <span className="font-black text-cyan-400">{String(i + 1).padStart(2, "0")}</span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>
            </section>

            {/* Comparison matrix */}
            <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8 lg:px-12">
                <div className="mb-10">
                    <div className="text-xs font-bold uppercase tracking-[.3em] text-cyan-400">04 / Capability map</div>
                    <h2 className="mt-4 text-3xl font-black sm:text-5xl">Different platforms. Different jobs.</h2>
                </div>

                <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.02]">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[780px] border-collapse text-left">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/[.03]">
                                    <th className="p-5 text-xs uppercase tracking-[.18em] text-slate-600">Capability</th>
                                    {partners.map((p) => <th key={p.name} className="p-5 text-sm font-bold text-white">{p.name}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["International transfers", "Strong focus", "Supported", "Supported", "Strong focus"],
                                    ["Business payments", "Supported", "Core use case", "Supported", "Core use case"],
                                    ["Card ecosystem", "Available in markets", "Available in markets", "Core feature", "Market dependent"],
                                    ["Multi-currency", "Core feature", "Supported", "Supported", "Core feature"],
                                    ["Marketplace workflows", "Supported", "Strong focus", "Selected use cases", "Strong focus"],
                                    ["FX / conversion", "Core feature", "Supported", "Supported", "Core feature"],
                                ].map(([cap, ...values]) => (
                                    <tr key={cap} className="border-b border-white/6 last:border-0">
                                        <td className="p-5 text-sm font-semibold text-slate-300">{cap}</td>
                                        {values.map((value, i) => <td key={i} className="p-5 text-sm text-slate-500">{value}</td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <p className="mt-4 text-xs leading-6 text-slate-600">
                    This matrix is a high-level orientation, not a product guarantee. Current availability and terms must be confirmed
                    with the relevant provider for the applicant’s jurisdiction and account type.
                </p>
            </section>

            {/* 3D workflow */}
            <section className="border-y border-white/5 bg-[#05080d] py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
                    <div className="text-center">
                        <div className="text-xs font-bold uppercase tracking-[.3em] text-cyan-400">05 / The journey</div>
                        <h2 className="mt-4 text-4xl font-black sm:text-6xl">A cleaner route from interest to onboarding.</h2>
                    </div>

                    <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            ["01", "Choose", "Select Personal or Business and tell us your country of residence or registration."],
                            ["02", "Review", "Your application profile is reviewed against the relevant onboarding requirements."],
                            ["03", "Verify", "Complete the identity and compliance checks requested for your route."],
                            ["04", "Activate", "Once approved by the applicable provider, use the supported account and card functionality."],
                        ].map(([num, title, text]) => (
                            <div key={num} className="perspective">
                                <div className="group h-full rounded-[1.8rem] border border-white/10 bg-gradient-to-br from-white/[.07] to-transparent p-7 shadow-2xl transition duration-500 hover:-translate-y-3 hover:rotate-[.4deg] hover:border-cyan-300/20">
                                    <div className="text-5xl font-black text-white/10">{num}</div>
                                    <h3 className="mt-10 text-xl font-bold">{title}</h3>
                                    <p className="mt-4 text-sm leading-7 text-slate-500">{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application */}
            <section id="application" className="relative mx-auto max-w-5xl px-5 py-28 sm:px-8">
                <div className="absolute left-1/2 top-20 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-cyan-400/5 blur-[110px]" />
                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[.035] p-6 shadow-[0_50px_130px_-50px_rgba(0,0,0,.95)] backdrop-blur-2xl sm:p-12">
                    <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
                    <div className="relative">
                        <div className="text-xs font-bold uppercase tracking-[.3em] text-cyan-400">06 / Application portal</div>
                        <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Initialize your account.</h2>
                        <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500">
                            Submit your basic information. Final eligibility, provider selection and product availability are subject to
                            jurisdiction, verification and the applicable provider’s terms.
                        </p>

                        <div className="mt-10 grid grid-cols-2 rounded-2xl border border-white/10 bg-black/20 p-1">
                            {(["Personal", "Business"] as AccountType[]).map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setAccountType(type)}
                                    className={`rounded-xl py-4 text-xs font-black uppercase tracking-[.2em] transition ${accountType === type ? "bg-white text-black shadow-xl" : "text-slate-600 hover:text-white"
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        {submitStatus === "success" && (
                            <div className="mt-7 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5 text-sm text-emerald-300">
                                Your application was submitted successfully. Our team can now review the information you provided.
                            </div>
                        )}

                        {submitStatus === "error" && (
                            <div className="mt-7 rounded-2xl border border-red-400/20 bg-red-400/5 p-5 text-sm text-red-300">
                                The request could not be submitted. Please check the server endpoint and try again.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="relative mt-10 space-y-7">
                            <div className="grid gap-7 md:grid-cols-2">
                                {[
                                    ["firstName", "First name", "John"],
                                    ["lastName", "Last name", "Doe"],
                                    ["email", "Email address", "name@example.com"],
                                    ["phone", "Phone number", "+44 20 0000 0000"],
                                ].map(([name, label, placeholder]) => (
                                    <label key={name} className="block">
                                        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.22em] text-slate-600">{label}</span>
                                        <input
                                            required
                                            name={name}
                                            value={formData[name as keyof typeof formData]}
                                            onChange={handleInputChange}
                                            placeholder={placeholder}
                                            type={name === "email" ? "email" : name === "phone" ? "tel" : "text"}
                                            className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-300/40 focus:bg-cyan-300/[.025]"
                                        />
                                    </label>
                                ))}
                            </div>

                            <label className="block">
                                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.22em] text-slate-600">Country of residence / registration</span>
                                <input required name="country" value={formData.country} onChange={handleInputChange} placeholder="United Kingdom, Germany, Afghanistan..." className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-300/40" />
                            </label>

                            {accountType === "Business" && (
                                <div className="grid gap-7 border-t border-white/7 pt-7 md:grid-cols-2">
                                    <label className="block">
                                        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.22em] text-cyan-400">Company name</span>
                                        <input required name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Company Ltd." className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-white outline-none focus:border-cyan-300/40" />
                                    </label>
                                    <label className="block">
                                        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[.22em] text-cyan-400">Registration number</span>
                                        <input required name="companyRegNumber" value={formData.companyRegNumber} onChange={handleInputChange} placeholder="Registration number" className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-white outline-none focus:border-cyan-300/40" />
                                    </label>
                                </div>
                            )}

                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="group relative w-full overflow-hidden rounded-2xl bg-white px-7 py-5 text-sm font-black uppercase tracking-[.18em] text-black transition hover:-translate-y-1 hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span className="relative z-10">{isSubmitting ? "Processing..." : "Submit secure application"}</span>
                                <span className="absolute inset-y-0 left-[-30%] w-1/3 skew-x-[-20deg] bg-cyan-200/60 transition group-hover:left-[110%]" />
                            </button>

                            <p className="text-center text-[10px] leading-6 text-slate-700">
                                Submission does not itself create an account or guarantee approval. Eligibility and product availability are
                                determined by the applicable provider and jurisdiction.
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="mx-auto max-w-5xl px-5 pb-28 sm:px-8">
                <div className="mb-10">
                    <div className="text-xs font-bold uppercase tracking-[.3em] text-cyan-400">07 / FAQ</div>
                    <h2 className="mt-4 text-4xl font-black sm:text-5xl">Questions worth answering before onboarding.</h2>
                </div>

                <div className="space-y-3">
                    {faqs.map(([question, answer], index) => (
                        <div key={question} className="overflow-hidden rounded-2xl border border-white/8 bg-white/[.025]">
                            <button
                                type="button"
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                            >
                                <span className="text-sm font-bold text-white">{question}</span>
                                <span className="text-xl text-cyan-400">{openFaq === index ? "−" : "+"}</span>
                            </button>
                            {openFaq === index && <div className="border-t border-white/7 px-6 py-5 text-sm leading-7 text-slate-500">{answer}</div>}
                        </div>
                    ))}
                </div>
            </section>

            {/* Disclaimer / CTA */}
            <section className="border-t border-white/5 bg-gradient-to-b from-cyan-400/[.035] to-transparent">
                <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
                    <div className="flex flex-col justify-between gap-8 rounded-[2rem] border border-white/10 bg-black/25 p-8 md:flex-row md:items-center md:p-10">
                        <div>
                            <div className="text-xs font-bold uppercase tracking-[.3em] text-cyan-400">Safi International Ecosystem</div>
                            <h2 className="mt-3 text-3xl font-black">Build your international financial workflow.</h2>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                                Explore the broader Safi Academy ecosystem, then return here when you are ready to submit an account request.
                            </p>
                        </div>
                        <div className="flex shrink-0 gap-3">
                            <Link href="/" className="rounded-xl border border-white/10 px-5 py-3 text-xs font-bold text-white transition hover:bg-white/5">Safi Academy</Link>
                            <a href="#application" className="rounded-xl bg-white px-5 py-3 text-xs font-black text-black transition hover:bg-cyan-100">Apply now</a>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-[10px] leading-6 text-slate-700">
                        Provider names and trademarks belong to their respective owners. References on this page are informational and do
                        not by themselves establish a direct partnership, endorsement, sponsorship, banking relationship, or guarantee of
                        account approval. Financial products and services are subject to jurisdiction, eligibility, provider terms and
                        applicable law.
                    </p>
                </div>
            </section>
        </main>
    );
}
