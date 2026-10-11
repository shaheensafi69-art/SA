// ============================================================================
// SAFI ACADEMY - 19 LANGUAGES DEVELOPMENT SERVICES TRANSLATIONS
// ============================================================================

export interface DevServiceItem {
  id: string;
  title: string;
  badge: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
}

export interface DevStageItem {
  stage: string;
  title: string;
  desc: string;
}

export interface DevGuaranteeItem {
  title: string;
  desc: string;
}

export interface DevFaqItem {
  q: string;
  a: string;
}

export interface DevelopmentServicesTranslation {
  isRtl: boolean;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaConsultation: string;
  ctaExplore: string;
  stat1Val: string;
  stat1Label: string;
  stat2Val: string;
  stat2Label: string;
  stat3Val: string;
  stat3Label: string;
  stat4Val: string;
  stat4Label: string;
  servicesBadge: string;
  servicesTitle: string;
  servicesSubtitle: string;
  stackBadge: string;
  stackTitle: string;
  stackSubtitle: string;
  stackTabFrontend: string;
  stackTabBackend: string;
  stackTabMobile: string;
  stackTabDatabase: string;
  stackTabCloud: string;
  stackTabAi: string;
  deliveryBadge: string;
  deliveryTitle: string;
  deliverySubtitle: string;
  guaranteesBadge: string;
  guaranteesTitle: string;
  guaranteesSubtitle: string;
  formBadge: string;
  formTitle: string;
  formSubtitle: string;
  formNameLabel: string;
  formNamePlaceholder: string;
  formEmailLabel: string;
  formEmailPlaceholder: string;
  formPhoneLabel: string;
  formPhonePlaceholder: string;
  formServiceLabel: string;
  formBudgetLabel: string;
  formDetailsLabel: string;
  formDetailsPlaceholder: string;
  formSubmittingBtn: string;
  formSubmitBtn: string;
  formSuccessTitle: string;
  formSuccessDesc: string;
  formErrorDesc: string;
  faqsBadge: string;
  faqsTitle: string;
  services: DevServiceItem[];
  deliveryStages: DevStageItem[];
  clientGuarantees: DevGuaranteeItem[];
  faqs: DevFaqItem[];
}

export const developmentServicesTranslations: Record<string, DevelopmentServicesTranslation> = {
  "en": {
    "heroBadge": "Safi Academy Engineering Division",
    "heroTitle": "Bespoke Enterprise Software & AI Architecture",
    "heroSubtitle": "We architect mission-critical web platforms, fluid mobile apps, high-throughput cloud infrastructure, and autonomous AI agent pipelines built to scale to millions of users.",
    "ctaConsultation": "Schedule Technical Consultation",
    "ctaExplore": "Explore Engineering Services",
    "stat1Val": "99.99%",
    "stat1Label": "Target Uptime SLA",
    "stat2Val": "< 1.2s",
    "stat2Label": "Largest Contentful Paint",
    "stat3Val": "100%",
    "stat3Label": "IP & Code Ownership",
    "stat4Val": "24/7",
    "stat4Label": "Dedicated Technical Support",
    "servicesBadge": "Engineering Capabilities",
    "servicesTitle": "Specialized Software Solutions Built for Uncompromising Scale",
    "servicesSubtitle": "From high-performance frontend interfaces to distributed databases and autonomous agentic AI, our solutions are engineered with strict zero-trust quality.",
    "stackBadge": "Modern Tech Arsenal",
    "stackTitle": "Battle-Tested Technology Stack",
    "stackSubtitle": "We engineer systems with modern, enterprise-proven frameworks and runtimes to guarantee developer velocity, reliability, and security.",
    "stackTabFrontend": "Frontend & UI",
    "stackTabBackend": "Backend & APIs",
    "stackTabMobile": "Mobile Architecture",
    "stackTabDatabase": "Database & Caching",
    "stackTabCloud": "Cloud & DevOps",
    "stackTabAi": "AI & LLM Infra",
    "deliveryBadge": "Agile Blueprint",
    "deliveryTitle": "6-Stage Engineering Delivery Roadmap",
    "deliverySubtitle": "Transparent, milestone-based execution ensuring zero ambiguity, rapid iterations, and predictable delivery dates.",
    "guaranteesBadge": "Client Trust Standards",
    "guaranteesTitle": "Enterprise Client Guarantees",
    "guaranteesSubtitle": "How we protect your intellectual property, data security, and long-term project success.",
    "formBadge": "Technical Inquiry",
    "formTitle": "Request a Proposal or Consultation",
    "formSubtitle": "Tell us about your project requirements. A senior software architect will review your file and respond within 24 hours.",
    "formNameLabel": "Full Name",
    "formNamePlaceholder": "e.g. Ahmad Rahimi",
    "formEmailLabel": "Work Email",
    "formEmailPlaceholder": "name@company.com",
    "formPhoneLabel": "Phone / WhatsApp",
    "formPhonePlaceholder": "+93 799 000 000",
    "formServiceLabel": "Requested Engineering Service",
    "formBudgetLabel": "Estimated Budget Tier",
    "formDetailsLabel": "Project Scope & Technical Requirements",
    "formDetailsPlaceholder": "Describe your project vision, target timeline, technical requirements, and target user base...",
    "formSubmittingBtn": "Transmitting Request...",
    "formSubmitBtn": "Submit Technical Consultation Request",
    "formSuccessTitle": "Consultation Request Received!",
    "formSuccessDesc": "Our senior software engineering team has received your project brief. A technical lead will contact you via WhatsApp or Email within 24 hours.",
    "formErrorDesc": "An error occurred while submitting your inquiry. Please try again or reach out to us directly on WhatsApp or Telegram.",
    "faqsBadge": "FAQ & Inquiries",
    "faqsTitle": "Frequently Answered Questions",
    "services": [
      {
        "id": "web-app",
        "title": "Enterprise Full-Stack Web Applications",
        "badge": "High Concurrency",
        "shortDesc": "Sub-second load times, SEO-optimized server rendering, and scalable component architecture.",
        "longDesc": "We engineer high-performance web platforms using Next.js 14/15, React, TypeScript, and modern edge runtimes. By implementing Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and intelligent edge caching, we guarantee Core Web Vitals with Largest Contentful Paint (LCP) under 1.2 seconds. From multi-tenant SaaS dashboards to complex corporate portals, our web applications scale smoothly to millions of active users.",
        "features": [
          "Next.js App Router & TypeScript Strict Mode",
          "Sub-second TTFB with Global Edge Caching",
          "Enterprise RBAC & SSO (OAuth2 / SAML)",
          "State Management via Zustand & React Query",
          "Responsive Glassmorphic UI with Tailwind CSS",
          "Automated Lighthouse & Performance CI Audits"
        ]
      },
      {
        "id": "mobile-apps",
        "title": "Cross-Platform & Native Mobile Apps",
        "badge": "iOS & Android",
        "shortDesc": "Fluid 60 FPS mobile applications engineered with Flutter and native device integrations.",
        "longDesc": "Deliver a single, pixel-perfect codebase across iOS and Android without sacrificing native performance. Utilizing Flutter, Dart, and native Swift/Kotlin bridging, our mobile applications feature buttery-smooth 60/120 FPS animations, offline-first SQLite/Hive synchronization, biometrics (FaceID/Fingerprint), in-app purchases, and automated deployment pipelines to Apple App Store and Google Play Console.",
        "features": [
          "Flutter & Dart Cross-Platform Architecture",
          "Offline-First SQLite Data Synchronization",
          "Biometric Authentication & Secure Keychain",
          "Low-Latency Push Notifications & Deep Linking",
          "Background Geolocation & Background Tasks",
          "Automated CI/CD App Store Deployment"
        ]
      },
      {
        "id": "backend-cloud",
        "title": "High-Throughput Cloud & Backend Architecture",
        "badge": "Distributed Scale",
        "shortDesc": "Resilient microservices, real-time relational databases, and fault-tolerant cloud APIs.",
        "longDesc": "We build distributed backend systems capable of processing millions of concurrent requests. Built upon Node.js, Go, Python FastAPI, PostgreSQL, Supabase, and Redis caching layers, our systems incorporate strict database connection pooling, asynchronous task queues, and zero-downtime database migrations. Fully containerized with Docker and orchestrated on AWS or GCP for automatic horizontal scaling.",
        "features": [
          "PostgreSQL & Supabase Real-Time Engine",
          "Redis In-Memory Distributed Caching",
          "Go & Node.js Asynchronous Microservices",
          "Docker Containerization & Kubernetes Ready",
          "Strict Schema Validation via Zod & Prisma",
          "Rate Limiting, Anti-DDoS & WAF Protection"
        ]
      },
      {
        "id": "ai-integration",
        "title": "Autonomous AI Agents & LLM Infrastructure",
        "badge": "Next-Gen AI",
        "shortDesc": "Enterprise Retrieval-Augmented Generation (RAG), custom fine-tuning, and automated workflows.",
        "longDesc": "Supercharge your operational efficiency by embedding autonomous AI agents directly into your software workflow. We construct enterprise RAG (Retrieval-Augmented Generation) pipelines, connect proprietary vector databases (pgvector, Pinecone), and integrate state-of-the-art models from OpenAI, Anthropic Claude, and open-source Llama 3. Automate document ingestion, customer support triage, complex data analysis, and code generation.",
        "features": [
          "Enterprise RAG Pipelines with Hybrid Search",
          "Custom Vector Embeddings (pgvector / Pinecone)",
          "Autonomous Task Orchestration & Tool Calling",
          "Multi-Modal Vision, Speech & OCR Pipelines",
          "Hallucination Guardrails & Token Optimization",
          "Private On-Premise LLM Deployments (Ollama)"
        ]
      },
      {
        "id": "fintech-ecommerce",
        "title": "FinTech & E-Commerce Payment Systems",
        "badge": "PCI-DSS Level 1",
        "shortDesc": "High-security payment gateways, ledger accounting, recurring billing, and multi-currency checkout.",
        "longDesc": "FinTech software requires zero room for error. We engineer mission-critical billing engines and transactional ledgers supporting Stripe, PayPal, Apple Pay, and cryptocurrency gateways. Our payment implementations adhere to PCI-DSS Level 1 compliance standards, implement double-entry bookkeeping ledgers to prevent race conditions, and automate recurring subscriptions, usage-based invoicing, and tax calculations.",
        "features": [
          "Stripe Embedded & Custom Checkout Gateways",
          "Double-Entry Accounting Transaction Ledgers",
          "Webhook Event Queue Idempotency & Retries",
          "Multi-Currency Dynamic Conversion & FX Handling",
          "Automated Subscription Lifecycle & Churn Prevention",
          "Real-Time Anti-Fraud & Chargeback Detection"
        ]
      },
      {
        "id": "cybersecurity-audit",
        "title": "Cybersecurity Auditing & Code Hardening",
        "badge": "Zero-Trust",
        "shortDesc": "Vulnerability assessments, penetration testing, source code review, and compliance readiness.",
        "longDesc": "Protect your enterprise from data breaches, intellectual property theft, and zero-day vulnerabilities. Our security engineers perform comprehensive static and dynamic code analysis, automated dependency audits, OWASP Top 10 penetration testing, and IAM role segregation. We architect your infrastructure with zero-trust networking, end-to-end encryption at rest and in transit, and prepare your startup for SOC-2, GDPR, and HIPAA compliance.",
        "features": [
          "OWASP Top 10 Web & API Penetration Testing",
          "Automated Static Analysis (SAST) in CI/CD",
          "End-to-End AES-256 Data Encryption",
          "Zero-Trust Network Access & Strict IAM Roles",
          "Comprehensive Vulnerability Remediation Reports",
          "GDPR, HIPAA & SOC-2 Architecture Alignment"
        ]
      }
    ],
    "deliveryStages": [
      {
        "stage": "01",
        "title": "Technical Discovery & Blueprinting",
        "desc": "We analyze your business model, define user personas, design system entity-relationship diagrams (ERD), map API endpoints, and establish architectural milestones to eliminate ambiguity."
      },
      {
        "stage": "02",
        "title": "Interactive UI/UX & Design Systems",
        "desc": "Our design team creates sleek, high-fidelity clickable Figma prototypes with dark modes, glassmorphism, responsive breakpoints, and micro-interactions before writing a single line of code."
      },
      {
        "stage": "03",
        "title": "Agile Sprints & Bi-Weekly Demos",
        "desc": "Development proceeds in 2-week focused sprints. You receive staging access, automated test reports, and live video demonstrations at every milestone so you maintain total project visibility."
      },
      {
        "stage": "04",
        "title": "Rigorous QA, Security & Load Testing",
        "desc": "Every build undergoes static analysis, cross-browser compatibility checks, OWASP security audits, and simulated stress testing (10,000+ concurrent users) to guarantee fault tolerance."
      },
      {
        "stage": "05",
        "title": "Zero-Downtime Cloud Deployment",
        "desc": "We provision your production cloud infrastructure on AWS, GCP, or Hostinger, configure global CDNs, configure SSL certificates, and execute zero-downtime continuous deployment."
      },
      {
        "stage": "06",
        "title": "24/7 SLA, Monitoring & Code Handoff",
        "desc": "Upon launch, we transfer 100% intellectual property and repositories to you, provide comprehensive documentation, and offer dedicated 24/7 SLA monitoring to support your growth."
      }
    ],
    "clientGuarantees": [
      {
        "title": "100% Full IP & Code Ownership",
        "desc": "You retain full ownership of all source code, design assets, database schemas, and intellectual property. No vendor lock-in; everything is cleanly documented."
      },
      {
        "title": "Strict Non-Disclosure Agreements (NDA)",
        "desc": "We treat your business ideas and proprietary datasets with complete confidentiality. Comprehensive NDAs are signed before discovery discussions."
      },
      {
        "title": "Direct Senior Engineer Communication",
        "desc": "No non-technical account managers or communication bottlenecks. You collaborate directly with lead software engineers via private Slack, WhatsApp, or Teams channels."
      },
      {
        "title": "UK-Registered Enterprise Standards",
        "desc": "Operated with strict international corporate compliance, milestone-based transparent invoicing, and clear legal protections for global founders."
      }
    ],
    "faqs": [
      {
        "q": "How quickly can your engineering team start on my project?",
        "a": "Depending on current sprint allocations, we typically initiate technical discovery and architectural blueprinting within 3 to 5 business days following project agreement and NDA execution."
      },
      {
        "q": "Who owns the code and intellectual property once built?",
        "a": "You do. 100%. Upon completion of project milestones and final sign-off, full copyright, proprietary source code, Git repositories, deployment credentials, and documentation are transferred unconditionally to your company."
      },
      {
        "q": "How are project payments structured?",
        "a": "We operate on transparent, milestone-based payments. Projects are divided into clear deliverables (e.g., Discovery & Architecture, MVP Prototype, Core Backend & APIs, Final Production QA). You only approve payments when working deliverables are reviewed and verified on staging."
      },
      {
        "q": "Can you take over and refactor an existing software codebase?",
        "a": "Yes. Our team frequently conducts comprehensive code audits for startups and legacy systems. We identify technical debt, refactor bottlenecks, upgrade outdated dependencies, patch security vulnerabilities, and migrate to modern Next.js/Go architectures."
      },
      {
        "q": "What happens after our application goes live?",
        "a": "We don't abandon you after launch. Every project includes a post-launch warranty period for bug fixes and stability monitoring. We also provide ongoing monthly Maintenance SLAs covering security patches, feature expansions, and 24/7 cloud uptime monitoring."
      },
      {
        "q": "Do you build custom AI models or just integrate third-party APIs?",
        "a": "We do both. We build advanced RAG (Retrieval-Augmented Generation) pipelines connecting proprietary company data to top LLMs, fine-tune custom open-source models (like Llama 3 or Mistral) on private GPU clusters, and deploy autonomous agents tailored to your business logic."
      }
    ],
    "isRtl": false
  },
  "fa": {
    "heroBadge": "بخش مهندسی و توسعه نرم‌افزار آکادمی صافی",
    "heroTitle": "طراحی و توسعه نرم‌افزارهای سازمانی و معماری هوش مصنوعی",
    "heroSubtitle": "ما پلتفرم‌های وب با سرعت ثانیه‌ای، اپلیکیشن‌های موبایل نیتیو، زیرساخت‌های ابری مقیاس‌پذیر و سیستم‌های هوش مصنوعی خودکار برای سازمان‌ها و استارتاپ‌ها طراحی و پیاده‌سازی می‌کنیم.",
    "ctaConsultation": "درخواست مشاوره فنی و تخمین پروژه",
    "ctaExplore": "مشاهده خدمات مهندسی",
    "stat1Val": "99.99%",
    "stat1Label": "تضمین پایداری سیستم (SLA)",
    "stat2Val": "< 1.2s",
    "stat2Label": "سرعت لود صفحه (LCP)",
    "stat3Val": "100%",
    "stat3Label": "مالکیت ۱۰۰٪ کد و سورس",
    "stat4Val": "24/7",
    "stat4Label": "پشتیبانی فنی و مانیتورینگ",
    "servicesBadge": "توانمندی‌های مهندسی",
    "servicesTitle": "خدمات نرم‌افزاری تخصصی برای کسب‌وکارهای در حال رشد",
    "servicesSubtitle": "از فرانت‌اند‌های مدرن گرفته تا سیستم‌های توزیع‌شده ابری و هوش مصنوعی مستقل با بالاترین استانداردهای امنیتی.",
    "stackBadge": "تکنولوژی‌های روز دنیا",
    "stackTitle": "استک فناوری مهندسی و مدرن",
    "stackSubtitle": "ما از فریم‌ورک‌ها و فناوری‌های اثبات‌شده سازمانی برای تضمین سرعت، امنیت و مقیاس‌پذیری استفاده می‌کنیم.",
    "stackTabFrontend": "فرانت‌اند و کاربری",
    "stackTabBackend": "بک‌اند و API",
    "stackTabMobile": "اپلیکیشن موبایل",
    "stackTabDatabase": "دیتابیس و کش",
    "stackTabCloud": "زیرساخت ابری و دواپس",
    "stackTabAi": "هوش مصنوعی و LLM",
    "deliveryBadge": "نقشه راه توسعه چابک",
    "deliveryTitle": "مراحل شش‌گانه تحویل و توسعه پروژه",
    "deliverySubtitle": "فرآیند شفاف و مبتنی بر مایل‌استون‌های منظم برای تضمین کیفیت و تحویل به‌موقع.",
    "guaranteesBadge": "تعهدات ما به مشتریان",
    "guaranteesTitle": "تضمین‌های سازمانی آکادمی صافی",
    "guaranteesSubtitle": "چگونه از مالکیت معنوی، امنیت داده‌ها و موفقیت پروژه شما محافظت می‌کنیم.",
    "formBadge": "استعلام پروژه و مشاوره",
    "formTitle": "فرم درخواست مشاوره فنی و برآورد هزینه",
    "formSubtitle": "مشخصات پروژه خود را ارسال کنید تا معماران نرم‌افزار ما ظرف ۲۴ ساعت بررسی و با شما تماس بگیرند.",
    "formNameLabel": "نام و نام خانوادگی",
    "formNamePlaceholder": "e.g. Ahmad Rahimi",
    "formEmailLabel": "ایمیل کاری",
    "formEmailPlaceholder": "name@company.com",
    "formPhoneLabel": "شماره تماس / واتساپ",
    "formPhonePlaceholder": "+93 799 000 000",
    "formServiceLabel": "نوع خدمت مورد نیاز",
    "formBudgetLabel": "بودجه تقریبی در نظر گرفته شده",
    "formDetailsLabel": "توضیحات و نیازمندی‌های فنی پروژه",
    "formDetailsPlaceholder": "درباره ویژگی‌های پروژه، زمان‌بندی مد نظر و کاربران هدف بنویسید...",
    "formSubmittingBtn": "در حال ارسال اطلاعات...",
    "formSubmitBtn": "ثبت درخواست مشاوره فنی",
    "formSuccessTitle": "درخواست با موفقیت ثبت شد!",
    "formSuccessDesc": "تیم مهندسی آکادمی صافی پرونده شما را دریافت کرد. کارشناس فنی ظرف ۲۴ ساعت از طریق واتساپ یا ایمیل با شما تماس خواهد گرفت.",
    "formErrorDesc": "خطا در برقراری ارتباط. لطفاً دوباره تلاش کنید یا در واتساپ یا تلگرام مستقیماً با ما ارتباط بگیرید.",
    "faqsBadge": "پرسش و پاسخ",
    "faqsTitle": "سوالات متداول درباره خدمات توسعه",
    "services": [
      {
        "id": "web-app",
        "title": "Enterprise Full-Stack Web Applications",
        "badge": "High Concurrency",
        "shortDesc": "Sub-second load times, SEO-optimized server rendering, and scalable component architecture.",
        "longDesc": "We engineer high-performance web platforms using Next.js 14/15, React, TypeScript, and modern edge runtimes. By implementing Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and intelligent edge caching, we guarantee Core Web Vitals with Largest Contentful Paint (LCP) under 1.2 seconds. From multi-tenant SaaS dashboards to complex corporate portals, our web applications scale smoothly to millions of active users.",
        "features": [
          "Next.js App Router & TypeScript Strict Mode",
          "Sub-second TTFB with Global Edge Caching",
          "Enterprise RBAC & SSO (OAuth2 / SAML)",
          "State Management via Zustand & React Query",
          "Responsive Glassmorphic UI with Tailwind CSS",
          "Automated Lighthouse & Performance CI Audits"
        ]
      },
      {
        "id": "mobile-apps",
        "title": "Cross-Platform & Native Mobile Apps",
        "badge": "iOS & Android",
        "shortDesc": "Fluid 60 FPS mobile applications engineered with Flutter and native device integrations.",
        "longDesc": "Deliver a single, pixel-perfect codebase across iOS and Android without sacrificing native performance. Utilizing Flutter, Dart, and native Swift/Kotlin bridging, our mobile applications feature buttery-smooth 60/120 FPS animations, offline-first SQLite/Hive synchronization, biometrics (FaceID/Fingerprint), in-app purchases, and automated deployment pipelines to Apple App Store and Google Play Console.",
        "features": [
          "Flutter & Dart Cross-Platform Architecture",
          "Offline-First SQLite Data Synchronization",
          "Biometric Authentication & Secure Keychain",
          "Low-Latency Push Notifications & Deep Linking",
          "Background Geolocation & Background Tasks",
          "Automated CI/CD App Store Deployment"
        ]
      },
      {
        "id": "backend-cloud",
        "title": "High-Throughput Cloud & Backend Architecture",
        "badge": "Distributed Scale",
        "shortDesc": "Resilient microservices, real-time relational databases, and fault-tolerant cloud APIs.",
        "longDesc": "We build distributed backend systems capable of processing millions of concurrent requests. Built upon Node.js, Go, Python FastAPI, PostgreSQL, Supabase, and Redis caching layers, our systems incorporate strict database connection pooling, asynchronous task queues, and zero-downtime database migrations. Fully containerized with Docker and orchestrated on AWS or GCP for automatic horizontal scaling.",
        "features": [
          "PostgreSQL & Supabase Real-Time Engine",
          "Redis In-Memory Distributed Caching",
          "Go & Node.js Asynchronous Microservices",
          "Docker Containerization & Kubernetes Ready",
          "Strict Schema Validation via Zod & Prisma",
          "Rate Limiting, Anti-DDoS & WAF Protection"
        ]
      },
      {
        "id": "ai-integration",
        "title": "Autonomous AI Agents & LLM Infrastructure",
        "badge": "Next-Gen AI",
        "shortDesc": "Enterprise Retrieval-Augmented Generation (RAG), custom fine-tuning, and automated workflows.",
        "longDesc": "Supercharge your operational efficiency by embedding autonomous AI agents directly into your software workflow. We construct enterprise RAG (Retrieval-Augmented Generation) pipelines, connect proprietary vector databases (pgvector, Pinecone), and integrate state-of-the-art models from OpenAI, Anthropic Claude, and open-source Llama 3. Automate document ingestion, customer support triage, complex data analysis, and code generation.",
        "features": [
          "Enterprise RAG Pipelines with Hybrid Search",
          "Custom Vector Embeddings (pgvector / Pinecone)",
          "Autonomous Task Orchestration & Tool Calling",
          "Multi-Modal Vision, Speech & OCR Pipelines",
          "Hallucination Guardrails & Token Optimization",
          "Private On-Premise LLM Deployments (Ollama)"
        ]
      },
      {
        "id": "fintech-ecommerce",
        "title": "FinTech & E-Commerce Payment Systems",
        "badge": "PCI-DSS Level 1",
        "shortDesc": "High-security payment gateways, ledger accounting, recurring billing, and multi-currency checkout.",
        "longDesc": "FinTech software requires zero room for error. We engineer mission-critical billing engines and transactional ledgers supporting Stripe, PayPal, Apple Pay, and cryptocurrency gateways. Our payment implementations adhere to PCI-DSS Level 1 compliance standards, implement double-entry bookkeeping ledgers to prevent race conditions, and automate recurring subscriptions, usage-based invoicing, and tax calculations.",
        "features": [
          "Stripe Embedded & Custom Checkout Gateways",
          "Double-Entry Accounting Transaction Ledgers",
          "Webhook Event Queue Idempotency & Retries",
          "Multi-Currency Dynamic Conversion & FX Handling",
          "Automated Subscription Lifecycle & Churn Prevention",
          "Real-Time Anti-Fraud & Chargeback Detection"
        ]
      },
      {
        "id": "cybersecurity-audit",
        "title": "Cybersecurity Auditing & Code Hardening",
        "badge": "Zero-Trust",
        "shortDesc": "Vulnerability assessments, penetration testing, source code review, and compliance readiness.",
        "longDesc": "Protect your enterprise from data breaches, intellectual property theft, and zero-day vulnerabilities. Our security engineers perform comprehensive static and dynamic code analysis, automated dependency audits, OWASP Top 10 penetration testing, and IAM role segregation. We architect your infrastructure with zero-trust networking, end-to-end encryption at rest and in transit, and prepare your startup for SOC-2, GDPR, and HIPAA compliance.",
        "features": [
          "OWASP Top 10 Web & API Penetration Testing",
          "Automated Static Analysis (SAST) in CI/CD",
          "End-to-End AES-256 Data Encryption",
          "Zero-Trust Network Access & Strict IAM Roles",
          "Comprehensive Vulnerability Remediation Reports",
          "GDPR, HIPAA & SOC-2 Architecture Alignment"
        ]
      }
    ],
    "deliveryStages": [
      {
        "stage": "01",
        "title": "Technical Discovery & Blueprinting",
        "desc": "We analyze your business model, define user personas, design system entity-relationship diagrams (ERD), map API endpoints, and establish architectural milestones to eliminate ambiguity."
      },
      {
        "stage": "02",
        "title": "Interactive UI/UX & Design Systems",
        "desc": "Our design team creates sleek, high-fidelity clickable Figma prototypes with dark modes, glassmorphism, responsive breakpoints, and micro-interactions before writing a single line of code."
      },
      {
        "stage": "03",
        "title": "Agile Sprints & Bi-Weekly Demos",
        "desc": "Development proceeds in 2-week focused sprints. You receive staging access, automated test reports, and live video demonstrations at every milestone so you maintain total project visibility."
      },
      {
        "stage": "04",
        "title": "Rigorous QA, Security & Load Testing",
        "desc": "Every build undergoes static analysis, cross-browser compatibility checks, OWASP security audits, and simulated stress testing (10,000+ concurrent users) to guarantee fault tolerance."
      },
      {
        "stage": "05",
        "title": "Zero-Downtime Cloud Deployment",
        "desc": "We provision your production cloud infrastructure on AWS, GCP, or Hostinger, configure global CDNs, configure SSL certificates, and execute zero-downtime continuous deployment."
      },
      {
        "stage": "06",
        "title": "24/7 SLA, Monitoring & Code Handoff",
        "desc": "Upon launch, we transfer 100% intellectual property and repositories to you, provide comprehensive documentation, and offer dedicated 24/7 SLA monitoring to support your growth."
      }
    ],
    "clientGuarantees": [
      {
        "title": "100% Full IP & Code Ownership",
        "desc": "You retain full ownership of all source code, design assets, database schemas, and intellectual property. No vendor lock-in; everything is cleanly documented."
      },
      {
        "title": "Strict Non-Disclosure Agreements (NDA)",
        "desc": "We treat your business ideas and proprietary datasets with complete confidentiality. Comprehensive NDAs are signed before discovery discussions."
      },
      {
        "title": "Direct Senior Engineer Communication",
        "desc": "No non-technical account managers or communication bottlenecks. You collaborate directly with lead software engineers via private Slack, WhatsApp, or Teams channels."
      },
      {
        "title": "UK-Registered Enterprise Standards",
        "desc": "Operated with strict international corporate compliance, milestone-based transparent invoicing, and clear legal protections for global founders."
      }
    ],
    "faqs": [
      {
        "q": "How quickly can your engineering team start on my project?",
        "a": "Depending on current sprint allocations, we typically initiate technical discovery and architectural blueprinting within 3 to 5 business days following project agreement and NDA execution."
      },
      {
        "q": "Who owns the code and intellectual property once built?",
        "a": "You do. 100%. Upon completion of project milestones and final sign-off, full copyright, proprietary source code, Git repositories, deployment credentials, and documentation are transferred unconditionally to your company."
      },
      {
        "q": "How are project payments structured?",
        "a": "We operate on transparent, milestone-based payments. Projects are divided into clear deliverables (e.g., Discovery & Architecture, MVP Prototype, Core Backend & APIs, Final Production QA). You only approve payments when working deliverables are reviewed and verified on staging."
      },
      {
        "q": "Can you take over and refactor an existing software codebase?",
        "a": "Yes. Our team frequently conducts comprehensive code audits for startups and legacy systems. We identify technical debt, refactor bottlenecks, upgrade outdated dependencies, patch security vulnerabilities, and migrate to modern Next.js/Go architectures."
      },
      {
        "q": "What happens after our application goes live?",
        "a": "We don't abandon you after launch. Every project includes a post-launch warranty period for bug fixes and stability monitoring. We also provide ongoing monthly Maintenance SLAs covering security patches, feature expansions, and 24/7 cloud uptime monitoring."
      },
      {
        "q": "Do you build custom AI models or just integrate third-party APIs?",
        "a": "We do both. We build advanced RAG (Retrieval-Augmented Generation) pipelines connecting proprietary company data to top LLMs, fine-tune custom open-source models (like Llama 3 or Mistral) on private GPU clusters, and deploy autonomous agents tailored to your business logic."
      }
    ],
    "isRtl": true
  },
  "ps": {
    "heroBadge": "د صافي اکاډمۍ د سافټویر او انجنیرۍ څانګه",
    "heroTitle": "د لوړ کیفیت سافټویر او هوښیار AI سیسټمونو جوړول",
    "heroSubtitle": "موږ د لوړ سرعت ویب پلیټفارمونه، د موبایل ایپسونه، کلاوډ سرورونه او پرمختللي AI سیسټمونه د نړیوالو معیارونو سره سم ډیزاین او پلي کوو.",
    "ctaConsultation": "د وړیا تخنیکي مشورې غوښتنه",
    "ctaExplore": "د انجنیرۍ خدمات وګورئ",
    "stat1Val": "99.99%",
    "stat1Label": "د سرور دوامداره پایښت (SLA)",
    "stat2Val": "< 1.2s",
    "stat2Label": "د پاڼې خلاصولو سرعت",
    "stat3Val": "100%",
    "stat3Label": "د کوډ ۱۰۰٪ بشپړ مالکیت",
    "stat4Val": "24/7",
    "stat4Label": "۲۴ ساعته تخنیکي ملاتړ",
    "servicesBadge": "د انجنیرۍ وړتیاوې",
    "servicesTitle": "د لوړې کچې سافټویر خدمات د راتلونکي نسل لپاره",
    "servicesSubtitle": "له ښکلي او چټک فرانت اینډ څخه تر کلاوډ ډیټابیسونو او خپلواکه مصنوعي هوښ پورې.",
    "stackBadge": "نړیوال ټیکنالوژيکي اوزار",
    "stackTitle": "هغه ټیکنالوژۍ چې موږ پرې کار کوو",
    "stackSubtitle": "موږ یوازې له هغو پرمختللو او باوري چوکاټونو ګټه اخلو چې سرعت او امنیت یې تضمین وي.",
    "stackTabFrontend": "فرانت اینډ او ډیزاین",
    "stackTabBackend": "بیک اینډ او API",
    "stackTabMobile": "موبایل ایپسونه",
    "stackTabDatabase": "ډیټابیس او چټکتیا",
    "stackTabCloud": "کلاوډ او سرورونه",
    "stackTabAi": "مصنوعي هوښ او ماډلونه",
    "deliveryBadge": "د کار پلان او نقشه",
    "deliveryTitle": "د پروژې سپارلو ۶ مهم پړاوونه",
    "deliverySubtitle": "یو شفاف او پړاو په پړاو پروسه چې د پروژې بریا او پر وخت پای ته رسېدل تضمینوي.",
    "guaranteesBadge": "پیرودونکو ته زموږ ډاډ",
    "guaranteesTitle": "د صافي اکاډمۍ رسمي تضمینونه",
    "guaranteesSubtitle": "موږ څنګه ستاسو د پروژې د حقونو، محرمیت او کیفیت ساتنه کوو.",
    "formBadge": "د پروژې غوښتنه",
    "formTitle": "د پروژې ارزونې او مشورې فورمه",
    "formSubtitle": "خپله غوښتنه واستوئ ترڅو زموږ لوړپوړي انجنیران په ۲۴ ساعتونو کې له تاسو سره اړیکه ونیسي.",
    "formNameLabel": "پوره نوم",
    "formNamePlaceholder": "e.g. Ahmad Rahimi",
    "formEmailLabel": "کاري بریښنالیک",
    "formEmailPlaceholder": "name@company.com",
    "formPhoneLabel": "ټیلیفون / واټساپ",
    "formPhonePlaceholder": "+93 799 000 000",
    "formServiceLabel": "د خدمت ډول",
    "formBudgetLabel": "ټاکل شوې بودیجه",
    "formDetailsLabel": "د پروژې تفصیلي معلومات",
    "formDetailsPlaceholder": "د خپلې پروژې په اړه معلومات، هدفونه او د اړتیا وړ نېټه ولیکئ...",
    "formSubmittingBtn": "معلومات لیږل کیږي...",
    "formSubmitBtn": "د مشورې غوښتنه واستوئ",
    "formSuccessTitle": "ستاسو غوښتنه په بریالیتوب سره ترلاسه شوه!",
    "formSuccessDesc": "زموږ تخنیکي ډله به ستاسو فایل وڅیړي او په ۲۴ ساعتونو کې به له تاسو سره اړیکه ونیسي.",
    "formErrorDesc": "د شبکې ستونزه رامنځته شوه. مهرباني وکړئ بیا هڅه وکړئ یا په واټساپ یا تلګرام اړیکه ونیسئ.",
    "faqsBadge": "پوښتنې او ځوابونه",
    "faqsTitle": "عامې پوښتنې او زموږ ځوابونه",
    "services": [
      {
        "id": "web-app",
        "title": "Enterprise Full-Stack Web Applications",
        "badge": "High Concurrency",
        "shortDesc": "Sub-second load times, SEO-optimized server rendering, and scalable component architecture.",
        "longDesc": "We engineer high-performance web platforms using Next.js 14/15, React, TypeScript, and modern edge runtimes. By implementing Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and intelligent edge caching, we guarantee Core Web Vitals with Largest Contentful Paint (LCP) under 1.2 seconds. From multi-tenant SaaS dashboards to complex corporate portals, our web applications scale smoothly to millions of active users.",
        "features": [
          "Next.js App Router & TypeScript Strict Mode",
          "Sub-second TTFB with Global Edge Caching",
          "Enterprise RBAC & SSO (OAuth2 / SAML)",
          "State Management via Zustand & React Query",
          "Responsive Glassmorphic UI with Tailwind CSS",
          "Automated Lighthouse & Performance CI Audits"
        ]
      },
      {
        "id": "mobile-apps",
        "title": "Cross-Platform & Native Mobile Apps",
        "badge": "iOS & Android",
        "shortDesc": "Fluid 60 FPS mobile applications engineered with Flutter and native device integrations.",
        "longDesc": "Deliver a single, pixel-perfect codebase across iOS and Android without sacrificing native performance. Utilizing Flutter, Dart, and native Swift/Kotlin bridging, our mobile applications feature buttery-smooth 60/120 FPS animations, offline-first SQLite/Hive synchronization, biometrics (FaceID/Fingerprint), in-app purchases, and automated deployment pipelines to Apple App Store and Google Play Console.",
        "features": [
          "Flutter & Dart Cross-Platform Architecture",
          "Offline-First SQLite Data Synchronization",
          "Biometric Authentication & Secure Keychain",
          "Low-Latency Push Notifications & Deep Linking",
          "Background Geolocation & Background Tasks",
          "Automated CI/CD App Store Deployment"
        ]
      },
      {
        "id": "backend-cloud",
        "title": "High-Throughput Cloud & Backend Architecture",
        "badge": "Distributed Scale",
        "shortDesc": "Resilient microservices, real-time relational databases, and fault-tolerant cloud APIs.",
        "longDesc": "We build distributed backend systems capable of processing millions of concurrent requests. Built upon Node.js, Go, Python FastAPI, PostgreSQL, Supabase, and Redis caching layers, our systems incorporate strict database connection pooling, asynchronous task queues, and zero-downtime database migrations. Fully containerized with Docker and orchestrated on AWS or GCP for automatic horizontal scaling.",
        "features": [
          "PostgreSQL & Supabase Real-Time Engine",
          "Redis In-Memory Distributed Caching",
          "Go & Node.js Asynchronous Microservices",
          "Docker Containerization & Kubernetes Ready",
          "Strict Schema Validation via Zod & Prisma",
          "Rate Limiting, Anti-DDoS & WAF Protection"
        ]
      },
      {
        "id": "ai-integration",
        "title": "Autonomous AI Agents & LLM Infrastructure",
        "badge": "Next-Gen AI",
        "shortDesc": "Enterprise Retrieval-Augmented Generation (RAG), custom fine-tuning, and automated workflows.",
        "longDesc": "Supercharge your operational efficiency by embedding autonomous AI agents directly into your software workflow. We construct enterprise RAG (Retrieval-Augmented Generation) pipelines, connect proprietary vector databases (pgvector, Pinecone), and integrate state-of-the-art models from OpenAI, Anthropic Claude, and open-source Llama 3. Automate document ingestion, customer support triage, complex data analysis, and code generation.",
        "features": [
          "Enterprise RAG Pipelines with Hybrid Search",
          "Custom Vector Embeddings (pgvector / Pinecone)",
          "Autonomous Task Orchestration & Tool Calling",
          "Multi-Modal Vision, Speech & OCR Pipelines",
          "Hallucination Guardrails & Token Optimization",
          "Private On-Premise LLM Deployments (Ollama)"
        ]
      },
      {
        "id": "fintech-ecommerce",
        "title": "FinTech & E-Commerce Payment Systems",
        "badge": "PCI-DSS Level 1",
        "shortDesc": "High-security payment gateways, ledger accounting, recurring billing, and multi-currency checkout.",
        "longDesc": "FinTech software requires zero room for error. We engineer mission-critical billing engines and transactional ledgers supporting Stripe, PayPal, Apple Pay, and cryptocurrency gateways. Our payment implementations adhere to PCI-DSS Level 1 compliance standards, implement double-entry bookkeeping ledgers to prevent race conditions, and automate recurring subscriptions, usage-based invoicing, and tax calculations.",
        "features": [
          "Stripe Embedded & Custom Checkout Gateways",
          "Double-Entry Accounting Transaction Ledgers",
          "Webhook Event Queue Idempotency & Retries",
          "Multi-Currency Dynamic Conversion & FX Handling",
          "Automated Subscription Lifecycle & Churn Prevention",
          "Real-Time Anti-Fraud & Chargeback Detection"
        ]
      },
      {
        "id": "cybersecurity-audit",
        "title": "Cybersecurity Auditing & Code Hardening",
        "badge": "Zero-Trust",
        "shortDesc": "Vulnerability assessments, penetration testing, source code review, and compliance readiness.",
        "longDesc": "Protect your enterprise from data breaches, intellectual property theft, and zero-day vulnerabilities. Our security engineers perform comprehensive static and dynamic code analysis, automated dependency audits, OWASP Top 10 penetration testing, and IAM role segregation. We architect your infrastructure with zero-trust networking, end-to-end encryption at rest and in transit, and prepare your startup for SOC-2, GDPR, and HIPAA compliance.",
        "features": [
          "OWASP Top 10 Web & API Penetration Testing",
          "Automated Static Analysis (SAST) in CI/CD",
          "End-to-End AES-256 Data Encryption",
          "Zero-Trust Network Access & Strict IAM Roles",
          "Comprehensive Vulnerability Remediation Reports",
          "GDPR, HIPAA & SOC-2 Architecture Alignment"
        ]
      }
    ],
    "deliveryStages": [
      {
        "stage": "01",
        "title": "Technical Discovery & Blueprinting",
        "desc": "We analyze your business model, define user personas, design system entity-relationship diagrams (ERD), map API endpoints, and establish architectural milestones to eliminate ambiguity."
      },
      {
        "stage": "02",
        "title": "Interactive UI/UX & Design Systems",
        "desc": "Our design team creates sleek, high-fidelity clickable Figma prototypes with dark modes, glassmorphism, responsive breakpoints, and micro-interactions before writing a single line of code."
      },
      {
        "stage": "03",
        "title": "Agile Sprints & Bi-Weekly Demos",
        "desc": "Development proceeds in 2-week focused sprints. You receive staging access, automated test reports, and live video demonstrations at every milestone so you maintain total project visibility."
      },
      {
        "stage": "04",
        "title": "Rigorous QA, Security & Load Testing",
        "desc": "Every build undergoes static analysis, cross-browser compatibility checks, OWASP security audits, and simulated stress testing (10,000+ concurrent users) to guarantee fault tolerance."
      },
      {
        "stage": "05",
        "title": "Zero-Downtime Cloud Deployment",
        "desc": "We provision your production cloud infrastructure on AWS, GCP, or Hostinger, configure global CDNs, configure SSL certificates, and execute zero-downtime continuous deployment."
      },
      {
        "stage": "06",
        "title": "24/7 SLA, Monitoring & Code Handoff",
        "desc": "Upon launch, we transfer 100% intellectual property and repositories to you, provide comprehensive documentation, and offer dedicated 24/7 SLA monitoring to support your growth."
      }
    ],
    "clientGuarantees": [
      {
        "title": "100% Full IP & Code Ownership",
        "desc": "You retain full ownership of all source code, design assets, database schemas, and intellectual property. No vendor lock-in; everything is cleanly documented."
      },
      {
        "title": "Strict Non-Disclosure Agreements (NDA)",
        "desc": "We treat your business ideas and proprietary datasets with complete confidentiality. Comprehensive NDAs are signed before discovery discussions."
      },
      {
        "title": "Direct Senior Engineer Communication",
        "desc": "No non-technical account managers or communication bottlenecks. You collaborate directly with lead software engineers via private Slack, WhatsApp, or Teams channels."
      },
      {
        "title": "UK-Registered Enterprise Standards",
        "desc": "Operated with strict international corporate compliance, milestone-based transparent invoicing, and clear legal protections for global founders."
      }
    ],
    "faqs": [
      {
        "q": "How quickly can your engineering team start on my project?",
        "a": "Depending on current sprint allocations, we typically initiate technical discovery and architectural blueprinting within 3 to 5 business days following project agreement and NDA execution."
      },
      {
        "q": "Who owns the code and intellectual property once built?",
        "a": "You do. 100%. Upon completion of project milestones and final sign-off, full copyright, proprietary source code, Git repositories, deployment credentials, and documentation are transferred unconditionally to your company."
      },
      {
        "q": "How are project payments structured?",
        "a": "We operate on transparent, milestone-based payments. Projects are divided into clear deliverables (e.g., Discovery & Architecture, MVP Prototype, Core Backend & APIs, Final Production QA). You only approve payments when working deliverables are reviewed and verified on staging."
      },
      {
        "q": "Can you take over and refactor an existing software codebase?",
        "a": "Yes. Our team frequently conducts comprehensive code audits for startups and legacy systems. We identify technical debt, refactor bottlenecks, upgrade outdated dependencies, patch security vulnerabilities, and migrate to modern Next.js/Go architectures."
      },
      {
        "q": "What happens after our application goes live?",
        "a": "We don't abandon you after launch. Every project includes a post-launch warranty period for bug fixes and stability monitoring. We also provide ongoing monthly Maintenance SLAs covering security patches, feature expansions, and 24/7 cloud uptime monitoring."
      },
      {
        "q": "Do you build custom AI models or just integrate third-party APIs?",
        "a": "We do both. We build advanced RAG (Retrieval-Augmented Generation) pipelines connecting proprietary company data to top LLMs, fine-tune custom open-source models (like Llama 3 or Mistral) on private GPU clusters, and deploy autonomous agents tailored to your business logic."
      }
    ],
    "isRtl": true
  },
  "ru": {
    "heroBadge": "Safi Academy Engineering Division",
    "heroTitle": "Bespoke Enterprise Software & AI Architecture",
    "heroSubtitle": "We architect mission-critical web platforms, fluid mobile apps, high-throughput cloud infrastructure, and autonomous AI agent pipelines built to scale to millions of users.",
    "ctaConsultation": "Schedule Technical Consultation",
    "ctaExplore": "Explore Engineering Services",
    "stat1Val": "99.99%",
    "stat1Label": "Target Uptime SLA",
    "stat2Val": "< 1.2s",
    "stat2Label": "Largest Contentful Paint",
    "stat3Val": "100%",
    "stat3Label": "IP & Code Ownership",
    "stat4Val": "24/7",
    "stat4Label": "Dedicated Technical Support",
    "servicesBadge": "Engineering Capabilities",
    "servicesTitle": "Specialized Software Solutions Built for Uncompromising Scale",
    "servicesSubtitle": "From high-performance frontend interfaces to distributed databases and autonomous agentic AI, our solutions are engineered with strict zero-trust quality.",
    "stackBadge": "Modern Tech Arsenal",
    "stackTitle": "Battle-Tested Technology Stack",
    "stackSubtitle": "We engineer systems with modern, enterprise-proven frameworks and runtimes to guarantee developer velocity, reliability, and security.",
    "stackTabFrontend": "Frontend & UI",
    "stackTabBackend": "Backend & APIs",
    "stackTabMobile": "Mobile Architecture",
    "stackTabDatabase": "Database & Caching",
    "stackTabCloud": "Cloud & DevOps",
    "stackTabAi": "AI & LLM Infra",
    "deliveryBadge": "Agile Blueprint",
    "deliveryTitle": "6-Stage Engineering Delivery Roadmap",
    "deliverySubtitle": "Transparent, milestone-based execution ensuring zero ambiguity, rapid iterations, and predictable delivery dates.",
    "guaranteesBadge": "Client Trust Standards",
    "guaranteesTitle": "Enterprise Client Guarantees",
    "guaranteesSubtitle": "How we protect your intellectual property, data security, and long-term project success.",
    "formBadge": "Technical Inquiry",
    "formTitle": "Request a Proposal or Consultation",
    "formSubtitle": "Tell us about your project requirements. A senior software architect will review your file and respond within 24 hours.",
    "formNameLabel": "Full Name",
    "formNamePlaceholder": "e.g. Ahmad Rahimi",
    "formEmailLabel": "Work Email",
    "formEmailPlaceholder": "name@company.com",
    "formPhoneLabel": "Phone / WhatsApp",
    "formPhonePlaceholder": "+93 799 000 000",
    "formServiceLabel": "Requested Engineering Service",
    "formBudgetLabel": "Estimated Budget Tier",
    "formDetailsLabel": "Project Scope & Technical Requirements",
    "formDetailsPlaceholder": "Describe your project vision, target timeline, technical requirements, and target user base...",
    "formSubmittingBtn": "Transmitting Request...",
    "formSubmitBtn": "Submit Technical Consultation Request",
    "formSuccessTitle": "Consultation Request Received!",
    "formSuccessDesc": "Our senior software engineering team has received your project brief. A technical lead will contact you via WhatsApp or Email within 24 hours.",
    "formErrorDesc": "An error occurred while submitting your inquiry. Please try again or reach out to us directly on WhatsApp or Telegram.",
    "faqsBadge": "FAQ & Inquiries",
    "faqsTitle": "Frequently Answered Questions",
    "services": [
      {
        "id": "web-app",
        "title": "Enterprise Full-Stack Web Applications",
        "badge": "High Concurrency",
        "shortDesc": "Sub-second load times, SEO-optimized server rendering, and scalable component architecture.",
        "longDesc": "We engineer high-performance web platforms using Next.js 14/15, React, TypeScript, and modern edge runtimes. By implementing Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and intelligent edge caching, we guarantee Core Web Vitals with Largest Contentful Paint (LCP) under 1.2 seconds. From multi-tenant SaaS dashboards to complex corporate portals, our web applications scale smoothly to millions of active users.",
        "features": [
          "Next.js App Router & TypeScript Strict Mode",
          "Sub-second TTFB with Global Edge Caching",
          "Enterprise RBAC & SSO (OAuth2 / SAML)",
          "State Management via Zustand & React Query",
          "Responsive Glassmorphic UI with Tailwind CSS",
          "Automated Lighthouse & Performance CI Audits"
        ]
      },
      {
        "id": "mobile-apps",
        "title": "Cross-Platform & Native Mobile Apps",
        "badge": "iOS & Android",
        "shortDesc": "Fluid 60 FPS mobile applications engineered with Flutter and native device integrations.",
        "longDesc": "Deliver a single, pixel-perfect codebase across iOS and Android without sacrificing native performance. Utilizing Flutter, Dart, and native Swift/Kotlin bridging, our mobile applications feature buttery-smooth 60/120 FPS animations, offline-first SQLite/Hive synchronization, biometrics (FaceID/Fingerprint), in-app purchases, and automated deployment pipelines to Apple App Store and Google Play Console.",
        "features": [
          "Flutter & Dart Cross-Platform Architecture",
          "Offline-First SQLite Data Synchronization",
          "Biometric Authentication & Secure Keychain",
          "Low-Latency Push Notifications & Deep Linking",
          "Background Geolocation & Background Tasks",
          "Automated CI/CD App Store Deployment"
        ]
      },
      {
        "id": "backend-cloud",
        "title": "High-Throughput Cloud & Backend Architecture",
        "badge": "Distributed Scale",
        "shortDesc": "Resilient microservices, real-time relational databases, and fault-tolerant cloud APIs.",
        "longDesc": "We build distributed backend systems capable of processing millions of concurrent requests. Built upon Node.js, Go, Python FastAPI, PostgreSQL, Supabase, and Redis caching layers, our systems incorporate strict database connection pooling, asynchronous task queues, and zero-downtime database migrations. Fully containerized with Docker and orchestrated on AWS or GCP for automatic horizontal scaling.",
        "features": [
          "PostgreSQL & Supabase Real-Time Engine",
          "Redis In-Memory Distributed Caching",
          "Go & Node.js Asynchronous Microservices",
          "Docker Containerization & Kubernetes Ready",
          "Strict Schema Validation via Zod & Prisma",
          "Rate Limiting, Anti-DDoS & WAF Protection"
        ]
      },
      {
        "id": "ai-integration",
        "title": "Autonomous AI Agents & LLM Infrastructure",
        "badge": "Next-Gen AI",
        "shortDesc": "Enterprise Retrieval-Augmented Generation (RAG), custom fine-tuning, and automated workflows.",
        "longDesc": "Supercharge your operational efficiency by embedding autonomous AI agents directly into your software workflow. We construct enterprise RAG (Retrieval-Augmented Generation) pipelines, connect proprietary vector databases (pgvector, Pinecone), and integrate state-of-the-art models from OpenAI, Anthropic Claude, and open-source Llama 3. Automate document ingestion, customer support triage, complex data analysis, and code generation.",
        "features": [
          "Enterprise RAG Pipelines with Hybrid Search",
          "Custom Vector Embeddings (pgvector / Pinecone)",
          "Autonomous Task Orchestration & Tool Calling",
          "Multi-Modal Vision, Speech & OCR Pipelines",
          "Hallucination Guardrails & Token Optimization",
          "Private On-Premise LLM Deployments (Ollama)"
        ]
      },
      {
        "id": "fintech-ecommerce",
        "title": "FinTech & E-Commerce Payment Systems",
        "badge": "PCI-DSS Level 1",
        "shortDesc": "High-security payment gateways, ledger accounting, recurring billing, and multi-currency checkout.",
        "longDesc": "FinTech software requires zero room for error. We engineer mission-critical billing engines and transactional ledgers supporting Stripe, PayPal, Apple Pay, and cryptocurrency gateways. Our payment implementations adhere to PCI-DSS Level 1 compliance standards, implement double-entry bookkeeping ledgers to prevent race conditions, and automate recurring subscriptions, usage-based invoicing, and tax calculations.",
        "features": [
          "Stripe Embedded & Custom Checkout Gateways",
          "Double-Entry Accounting Transaction Ledgers",
          "Webhook Event Queue Idempotency & Retries",
          "Multi-Currency Dynamic Conversion & FX Handling",
          "Automated Subscription Lifecycle & Churn Prevention",
          "Real-Time Anti-Fraud & Chargeback Detection"
        ]
      },
      {
        "id": "cybersecurity-audit",
        "title": "Cybersecurity Auditing & Code Hardening",
        "badge": "Zero-Trust",
        "shortDesc": "Vulnerability assessments, penetration testing, source code review, and compliance readiness.",
        "longDesc": "Protect your enterprise from data breaches, intellectual property theft, and zero-day vulnerabilities. Our security engineers perform comprehensive static and dynamic code analysis, automated dependency audits, OWASP Top 10 penetration testing, and IAM role segregation. We architect your infrastructure with zero-trust networking, end-to-end encryption at rest and in transit, and prepare your startup for SOC-2, GDPR, and HIPAA compliance.",
        "features": [
          "OWASP Top 10 Web & API Penetration Testing",
          "Automated Static Analysis (SAST) in CI/CD",
          "End-to-End AES-256 Data Encryption",
          "Zero-Trust Network Access & Strict IAM Roles",
          "Comprehensive Vulnerability Remediation Reports",
          "GDPR, HIPAA & SOC-2 Architecture Alignment"
        ]
      }
    ],
    "deliveryStages": [
      {
        "stage": "01",
        "title": "Technical Discovery & Blueprinting",
        "desc": "We analyze your business model, define user personas, design system entity-relationship diagrams (ERD), map API endpoints, and establish architectural milestones to eliminate ambiguity."
      },
      {
        "stage": "02",
        "title": "Interactive UI/UX & Design Systems",
        "desc": "Our design team creates sleek, high-fidelity clickable Figma prototypes with dark modes, glassmorphism, responsive breakpoints, and micro-interactions before writing a single line of code."
      },
      {
        "stage": "03",
        "title": "Agile Sprints & Bi-Weekly Demos",
        "desc": "Development proceeds in 2-week focused sprints. You receive staging access, automated test reports, and live video demonstrations at every milestone so you maintain total project visibility."
      },
      {
        "stage": "04",
        "title": "Rigorous QA, Security & Load Testing",
        "desc": "Every build undergoes static analysis, cross-browser compatibility checks, OWASP security audits, and simulated stress testing (10,000+ concurrent users) to guarantee fault tolerance."
      },
      {
        "stage": "05",
        "title": "Zero-Downtime Cloud Deployment",
        "desc": "We provision your production cloud infrastructure on AWS, GCP, or Hostinger, configure global CDNs, configure SSL certificates, and execute zero-downtime continuous deployment."
      },
      {
        "stage": "06",
        "title": "24/7 SLA, Monitoring & Code Handoff",
        "desc": "Upon launch, we transfer 100% intellectual property and repositories to you, provide comprehensive documentation, and offer dedicated 24/7 SLA monitoring to support your growth."
      }
    ],
    "clientGuarantees": [
      {
        "title": "100% Full IP & Code Ownership",
        "desc": "You retain full ownership of all source code, design assets, database schemas, and intellectual property. No vendor lock-in; everything is cleanly documented."
      },
      {
        "title": "Strict Non-Disclosure Agreements (NDA)",
        "desc": "We treat your business ideas and proprietary datasets with complete confidentiality. Comprehensive NDAs are signed before discovery discussions."
      },
      {
        "title": "Direct Senior Engineer Communication",
        "desc": "No non-technical account managers or communication bottlenecks. You collaborate directly with lead software engineers via private Slack, WhatsApp, or Teams channels."
      },
      {
        "title": "UK-Registered Enterprise Standards",
        "desc": "Operated with strict international corporate compliance, milestone-based transparent invoicing, and clear legal protections for global founders."
      }
    ],
    "faqs": [
      {
        "q": "How quickly can your engineering team start on my project?",
        "a": "Depending on current sprint allocations, we typically initiate technical discovery and architectural blueprinting within 3 to 5 business days following project agreement and NDA execution."
      },
      {
        "q": "Who owns the code and intellectual property once built?",
        "a": "You do. 100%. Upon completion of project milestones and final sign-off, full copyright, proprietary source code, Git repositories, deployment credentials, and documentation are transferred unconditionally to your company."
      },
      {
        "q": "How are project payments structured?",
        "a": "We operate on transparent, milestone-based payments. Projects are divided into clear deliverables (e.g., Discovery & Architecture, MVP Prototype, Core Backend & APIs, Final Production QA). You only approve payments when working deliverables are reviewed and verified on staging."
      },
      {
        "q": "Can you take over and refactor an existing software codebase?",
        "a": "Yes. Our team frequently conducts comprehensive code audits for startups and legacy systems. We identify technical debt, refactor bottlenecks, upgrade outdated dependencies, patch security vulnerabilities, and migrate to modern Next.js/Go architectures."
      },
      {
        "q": "What happens after our application goes live?",
        "a": "We don't abandon you after launch. Every project includes a post-launch warranty period for bug fixes and stability monitoring. We also provide ongoing monthly Maintenance SLAs covering security patches, feature expansions, and 24/7 cloud uptime monitoring."
      },
      {
        "q": "Do you build custom AI models or just integrate third-party APIs?",
        "a": "We do both. We build advanced RAG (Retrieval-Augmented Generation) pipelines connecting proprietary company data to top LLMs, fine-tune custom open-source models (like Llama 3 or Mistral) on private GPU clusters, and deploy autonomous agents tailored to your business logic."
      }
    ],
    "isRtl": false
  },
  "tr": {
    "heroBadge": "Safi Academy Engineering Division",
    "heroTitle": "Bespoke Enterprise Software & AI Architecture",
    "heroSubtitle": "We architect mission-critical web platforms, fluid mobile apps, high-throughput cloud infrastructure, and autonomous AI agent pipelines built to scale to millions of users.",
    "ctaConsultation": "Schedule Technical Consultation",
    "ctaExplore": "Explore Engineering Services",
    "stat1Val": "99.99%",
    "stat1Label": "Target Uptime SLA",
    "stat2Val": "< 1.2s",
    "stat2Label": "Largest Contentful Paint",
    "stat3Val": "100%",
    "stat3Label": "IP & Code Ownership",
    "stat4Val": "24/7",
    "stat4Label": "Dedicated Technical Support",
    "servicesBadge": "Engineering Capabilities",
    "servicesTitle": "Specialized Software Solutions Built for Uncompromising Scale",
    "servicesSubtitle": "From high-performance frontend interfaces to distributed databases and autonomous agentic AI, our solutions are engineered with strict zero-trust quality.",
    "stackBadge": "Modern Tech Arsenal",
    "stackTitle": "Battle-Tested Technology Stack",
    "stackSubtitle": "We engineer systems with modern, enterprise-proven frameworks and runtimes to guarantee developer velocity, reliability, and security.",
    "stackTabFrontend": "Frontend & UI",
    "stackTabBackend": "Backend & APIs",
    "stackTabMobile": "Mobile Architecture",
    "stackTabDatabase": "Database & Caching",
    "stackTabCloud": "Cloud & DevOps",
    "stackTabAi": "AI & LLM Infra",
    "deliveryBadge": "Agile Blueprint",
    "deliveryTitle": "6-Stage Engineering Delivery Roadmap",
    "deliverySubtitle": "Transparent, milestone-based execution ensuring zero ambiguity, rapid iterations, and predictable delivery dates.",
    "guaranteesBadge": "Client Trust Standards",
    "guaranteesTitle": "Enterprise Client Guarantees",
    "guaranteesSubtitle": "How we protect your intellectual property, data security, and long-term project success.",
    "formBadge": "Technical Inquiry",
    "formTitle": "Request a Proposal or Consultation",
    "formSubtitle": "Tell us about your project requirements. A senior software architect will review your file and respond within 24 hours.",
    "formNameLabel": "Full Name",
    "formNamePlaceholder": "e.g. Ahmad Rahimi",
    "formEmailLabel": "Work Email",
    "formEmailPlaceholder": "name@company.com",
    "formPhoneLabel": "Phone / WhatsApp",
    "formPhonePlaceholder": "+93 799 000 000",
    "formServiceLabel": "Requested Engineering Service",
    "formBudgetLabel": "Estimated Budget Tier",
    "formDetailsLabel": "Project Scope & Technical Requirements",
    "formDetailsPlaceholder": "Describe your project vision, target timeline, technical requirements, and target user base...",
    "formSubmittingBtn": "Transmitting Request...",
    "formSubmitBtn": "Submit Technical Consultation Request",
    "formSuccessTitle": "Consultation Request Received!",
    "formSuccessDesc": "Our senior software engineering team has received your project brief. A technical lead will contact you via WhatsApp or Email within 24 hours.",
    "formErrorDesc": "An error occurred while submitting your inquiry. Please try again or reach out to us directly on WhatsApp or Telegram.",
    "faqsBadge": "FAQ & Inquiries",
    "faqsTitle": "Frequently Answered Questions",
    "services": [
      {
        "id": "web-app",
        "title": "Enterprise Full-Stack Web Applications",
        "badge": "High Concurrency",
        "shortDesc": "Sub-second load times, SEO-optimized server rendering, and scalable component architecture.",
        "longDesc": "We engineer high-performance web platforms using Next.js 14/15, React, TypeScript, and modern edge runtimes. By implementing Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and intelligent edge caching, we guarantee Core Web Vitals with Largest Contentful Paint (LCP) under 1.2 seconds. From multi-tenant SaaS dashboards to complex corporate portals, our web applications scale smoothly to millions of active users.",
        "features": [
          "Next.js App Router & TypeScript Strict Mode",
          "Sub-second TTFB with Global Edge Caching",
          "Enterprise RBAC & SSO (OAuth2 / SAML)",
          "State Management via Zustand & React Query",
          "Responsive Glassmorphic UI with Tailwind CSS",
          "Automated Lighthouse & Performance CI Audits"
        ]
      },
      {
        "id": "mobile-apps",
        "title": "Cross-Platform & Native Mobile Apps",
        "badge": "iOS & Android",
        "shortDesc": "Fluid 60 FPS mobile applications engineered with Flutter and native device integrations.",
        "longDesc": "Deliver a single, pixel-perfect codebase across iOS and Android without sacrificing native performance. Utilizing Flutter, Dart, and native Swift/Kotlin bridging, our mobile applications feature buttery-smooth 60/120 FPS animations, offline-first SQLite/Hive synchronization, biometrics (FaceID/Fingerprint), in-app purchases, and automated deployment pipelines to Apple App Store and Google Play Console.",
        "features": [
          "Flutter & Dart Cross-Platform Architecture",
          "Offline-First SQLite Data Synchronization",
          "Biometric Authentication & Secure Keychain",
          "Low-Latency Push Notifications & Deep Linking",
          "Background Geolocation & Background Tasks",
          "Automated CI/CD App Store Deployment"
        ]
      },
      {
        "id": "backend-cloud",
        "title": "High-Throughput Cloud & Backend Architecture",
        "badge": "Distributed Scale",
        "shortDesc": "Resilient microservices, real-time relational databases, and fault-tolerant cloud APIs.",
        "longDesc": "We build distributed backend systems capable of processing millions of concurrent requests. Built upon Node.js, Go, Python FastAPI, PostgreSQL, Supabase, and Redis caching layers, our systems incorporate strict database connection pooling, asynchronous task queues, and zero-downtime database migrations. Fully containerized with Docker and orchestrated on AWS or GCP for automatic horizontal scaling.",
        "features": [
          "PostgreSQL & Supabase Real-Time Engine",
          "Redis In-Memory Distributed Caching",
          "Go & Node.js Asynchronous Microservices",
          "Docker Containerization & Kubernetes Ready",
          "Strict Schema Validation via Zod & Prisma",
          "Rate Limiting, Anti-DDoS & WAF Protection"
        ]
      },
      {
        "id": "ai-integration",
        "title": "Autonomous AI Agents & LLM Infrastructure",
        "badge": "Next-Gen AI",
        "shortDesc": "Enterprise Retrieval-Augmented Generation (RAG), custom fine-tuning, and automated workflows.",
        "longDesc": "Supercharge your operational efficiency by embedding autonomous AI agents directly into your software workflow. We construct enterprise RAG (Retrieval-Augmented Generation) pipelines, connect proprietary vector databases (pgvector, Pinecone), and integrate state-of-the-art models from OpenAI, Anthropic Claude, and open-source Llama 3. Automate document ingestion, customer support triage, complex data analysis, and code generation.",
        "features": [
          "Enterprise RAG Pipelines with Hybrid Search",
          "Custom Vector Embeddings (pgvector / Pinecone)",
          "Autonomous Task Orchestration & Tool Calling",
          "Multi-Modal Vision, Speech & OCR Pipelines",
          "Hallucination Guardrails & Token Optimization",
          "Private On-Premise LLM Deployments (Ollama)"
        ]
      },
      {
        "id": "fintech-ecommerce",
        "title": "FinTech & E-Commerce Payment Systems",
        "badge": "PCI-DSS Level 1",
        "shortDesc": "High-security payment gateways, ledger accounting, recurring billing, and multi-currency checkout.",
        "longDesc": "FinTech software requires zero room for error. We engineer mission-critical billing engines and transactional ledgers supporting Stripe, PayPal, Apple Pay, and cryptocurrency gateways. Our payment implementations adhere to PCI-DSS Level 1 compliance standards, implement double-entry bookkeeping ledgers to prevent race conditions, and automate recurring subscriptions, usage-based invoicing, and tax calculations.",
        "features": [
          "Stripe Embedded & Custom Checkout Gateways",
          "Double-Entry Accounting Transaction Ledgers",
          "Webhook Event Queue Idempotency & Retries",
          "Multi-Currency Dynamic Conversion & FX Handling",
          "Automated Subscription Lifecycle & Churn Prevention",
          "Real-Time Anti-Fraud & Chargeback Detection"
        ]
      },
      {
        "id": "cybersecurity-audit",
        "title": "Cybersecurity Auditing & Code Hardening",
        "badge": "Zero-Trust",
        "shortDesc": "Vulnerability assessments, penetration testing, source code review, and compliance readiness.",
        "longDesc": "Protect your enterprise from data breaches, intellectual property theft, and zero-day vulnerabilities. Our security engineers perform comprehensive static and dynamic code analysis, automated dependency audits, OWASP Top 10 penetration testing, and IAM role segregation. We architect your infrastructure with zero-trust networking, end-to-end encryption at rest and in transit, and prepare your startup for SOC-2, GDPR, and HIPAA compliance.",
        "features": [
          "OWASP Top 10 Web & API Penetration Testing",
          "Automated Static Analysis (SAST) in CI/CD",
          "End-to-End AES-256 Data Encryption",
          "Zero-Trust Network Access & Strict IAM Roles",
          "Comprehensive Vulnerability Remediation Reports",
          "GDPR, HIPAA & SOC-2 Architecture Alignment"
        ]
      }
    ],
    "deliveryStages": [
      {
        "stage": "01",
        "title": "Technical Discovery & Blueprinting",
        "desc": "We analyze your business model, define user personas, design system entity-relationship diagrams (ERD), map API endpoints, and establish architectural milestones to eliminate ambiguity."
      },
      {
        "stage": "02",
        "title": "Interactive UI/UX & Design Systems",
        "desc": "Our design team creates sleek, high-fidelity clickable Figma prototypes with dark modes, glassmorphism, responsive breakpoints, and micro-interactions before writing a single line of code."
      },
      {
        "stage": "03",
        "title": "Agile Sprints & Bi-Weekly Demos",
        "desc": "Development proceeds in 2-week focused sprints. You receive staging access, automated test reports, and live video demonstrations at every milestone so you maintain total project visibility."
      },
      {
        "stage": "04",
        "title": "Rigorous QA, Security & Load Testing",
        "desc": "Every build undergoes static analysis, cross-browser compatibility checks, OWASP security audits, and simulated stress testing (10,000+ concurrent users) to guarantee fault tolerance."
      },
      {
        "stage": "05",
        "title": "Zero-Downtime Cloud Deployment",
        "desc": "We provision your production cloud infrastructure on AWS, GCP, or Hostinger, configure global CDNs, configure SSL certificates, and execute zero-downtime continuous deployment."
      },
      {
        "stage": "06",
        "title": "24/7 SLA, Monitoring & Code Handoff",
        "desc": "Upon launch, we transfer 100% intellectual property and repositories to you, provide comprehensive documentation, and offer dedicated 24/7 SLA monitoring to support your growth."
      }
    ],
    "clientGuarantees": [
      {
        "title": "100% Full IP & Code Ownership",
        "desc": "You retain full ownership of all source code, design assets, database schemas, and intellectual property. No vendor lock-in; everything is cleanly documented."
      },
      {
        "title": "Strict Non-Disclosure Agreements (NDA)",
        "desc": "We treat your business ideas and proprietary datasets with complete confidentiality. Comprehensive NDAs are signed before discovery discussions."
      },
      {
        "title": "Direct Senior Engineer Communication",
        "desc": "No non-technical account managers or communication bottlenecks. You collaborate directly with lead software engineers via private Slack, WhatsApp, or Teams channels."
      },
      {
        "title": "UK-Registered Enterprise Standards",
        "desc": "Operated with strict international corporate compliance, milestone-based transparent invoicing, and clear legal protections for global founders."
      }
    ],
    "faqs": [
      {
        "q": "How quickly can your engineering team start on my project?",
        "a": "Depending on current sprint allocations, we typically initiate technical discovery and architectural blueprinting within 3 to 5 business days following project agreement and NDA execution."
      },
      {
        "q": "Who owns the code and intellectual property once built?",
        "a": "You do. 100%. Upon completion of project milestones and final sign-off, full copyright, proprietary source code, Git repositories, deployment credentials, and documentation are transferred unconditionally to your company."
      },
      {
        "q": "How are project payments structured?",
        "a": "We operate on transparent, milestone-based payments. Projects are divided into clear deliverables (e.g., Discovery & Architecture, MVP Prototype, Core Backend & APIs, Final Production QA). You only approve payments when working deliverables are reviewed and verified on staging."
      },
      {
        "q": "Can you take over and refactor an existing software codebase?",
        "a": "Yes. Our team frequently conducts comprehensive code audits for startups and legacy systems. We identify technical debt, refactor bottlenecks, upgrade outdated dependencies, patch security vulnerabilities, and migrate to modern Next.js/Go architectures."
      },
      {
        "q": "What happens after our application goes live?",
        "a": "We don't abandon you after launch. Every project includes a post-launch warranty period for bug fixes and stability monitoring. We also provide ongoing monthly Maintenance SLAs covering security patches, feature expansions, and 24/7 cloud uptime monitoring."
      },
      {
        "q": "Do you build custom AI models or just integrate third-party APIs?",
        "a": "We do both. We build advanced RAG (Retrieval-Augmented Generation) pipelines connecting proprietary company data to top LLMs, fine-tune custom open-source models (like Llama 3 or Mistral) on private GPU clusters, and deploy autonomous agents tailored to your business logic."
      }
    ],
    "isRtl": false
  },
  "de": {
    "heroBadge": "Safi Academy Engineering Division",
    "heroTitle": "Bespoke Enterprise Software & AI Architecture",
    "heroSubtitle": "We architect mission-critical web platforms, fluid mobile apps, high-throughput cloud infrastructure, and autonomous AI agent pipelines built to scale to millions of users.",
    "ctaConsultation": "Schedule Technical Consultation",
    "ctaExplore": "Explore Engineering Services",
    "stat1Val": "99.99%",
    "stat1Label": "Target Uptime SLA",
    "stat2Val": "< 1.2s",
    "stat2Label": "Largest Contentful Paint",
    "stat3Val": "100%",
    "stat3Label": "IP & Code Ownership",
    "stat4Val": "24/7",
    "stat4Label": "Dedicated Technical Support",
    "servicesBadge": "Engineering Capabilities",
    "servicesTitle": "Specialized Software Solutions Built for Uncompromising Scale",
    "servicesSubtitle": "From high-performance frontend interfaces to distributed databases and autonomous agentic AI, our solutions are engineered with strict zero-trust quality.",
    "stackBadge": "Modern Tech Arsenal",
    "stackTitle": "Battle-Tested Technology Stack",
    "stackSubtitle": "We engineer systems with modern, enterprise-proven frameworks and runtimes to guarantee developer velocity, reliability, and security.",
    "stackTabFrontend": "Frontend & UI",
    "stackTabBackend": "Backend & APIs",
    "stackTabMobile": "Mobile Architecture",
    "stackTabDatabase": "Database & Caching",
    "stackTabCloud": "Cloud & DevOps",
    "stackTabAi": "AI & LLM Infra",
    "deliveryBadge": "Agile Blueprint",
    "deliveryTitle": "6-Stage Engineering Delivery Roadmap",
    "deliverySubtitle": "Transparent, milestone-based execution ensuring zero ambiguity, rapid iterations, and predictable delivery dates.",
    "guaranteesBadge": "Client Trust Standards",
    "guaranteesTitle": "Enterprise Client Guarantees",
    "guaranteesSubtitle": "How we protect your intellectual property, data security, and long-term project success.",
    "formBadge": "Technical Inquiry",
    "formTitle": "Request a Proposal or Consultation",
    "formSubtitle": "Tell us about your project requirements. A senior software architect will review your file and respond within 24 hours.",
    "formNameLabel": "Full Name",
    "formNamePlaceholder": "e.g. Ahmad Rahimi",
    "formEmailLabel": "Work Email",
    "formEmailPlaceholder": "name@company.com",
    "formPhoneLabel": "Phone / WhatsApp",
    "formPhonePlaceholder": "+93 799 000 000",
    "formServiceLabel": "Requested Engineering Service",
    "formBudgetLabel": "Estimated Budget Tier",
    "formDetailsLabel": "Project Scope & Technical Requirements",
    "formDetailsPlaceholder": "Describe your project vision, target timeline, technical requirements, and target user base...",
    "formSubmittingBtn": "Transmitting Request...",
    "formSubmitBtn": "Submit Technical Consultation Request",
    "formSuccessTitle": "Consultation Request Received!",
    "formSuccessDesc": "Our senior software engineering team has received your project brief. A technical lead will contact you via WhatsApp or Email within 24 hours.",
    "formErrorDesc": "An error occurred while submitting your inquiry. Please try again or reach out to us directly on WhatsApp or Telegram.",
    "faqsBadge": "FAQ & Inquiries",
    "faqsTitle": "Frequently Answered Questions",
    "services": [
      {
        "id": "web-app",
        "title": "Enterprise Full-Stack Web Applications",
        "badge": "High Concurrency",
        "shortDesc": "Sub-second load times, SEO-optimized server rendering, and scalable component architecture.",
        "longDesc": "We engineer high-performance web platforms using Next.js 14/15, React, TypeScript, and modern edge runtimes. By implementing Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and intelligent edge caching, we guarantee Core Web Vitals with Largest Contentful Paint (LCP) under 1.2 seconds. From multi-tenant SaaS dashboards to complex corporate portals, our web applications scale smoothly to millions of active users.",
        "features": [
          "Next.js App Router & TypeScript Strict Mode",
          "Sub-second TTFB with Global Edge Caching",
          "Enterprise RBAC & SSO (OAuth2 / SAML)",
          "State Management via Zustand & React Query",
          "Responsive Glassmorphic UI with Tailwind CSS",
          "Automated Lighthouse & Performance CI Audits"
        ]
      },
      {
        "id": "mobile-apps",
        "title": "Cross-Platform & Native Mobile Apps",
        "badge": "iOS & Android",
        "shortDesc": "Fluid 60 FPS mobile applications engineered with Flutter and native device integrations.",
        "longDesc": "Deliver a single, pixel-perfect codebase across iOS and Android without sacrificing native performance. Utilizing Flutter, Dart, and native Swift/Kotlin bridging, our mobile applications feature buttery-smooth 60/120 FPS animations, offline-first SQLite/Hive synchronization, biometrics (FaceID/Fingerprint), in-app purchases, and automated deployment pipelines to Apple App Store and Google Play Console.",
        "features": [
          "Flutter & Dart Cross-Platform Architecture",
          "Offline-First SQLite Data Synchronization",
          "Biometric Authentication & Secure Keychain",
          "Low-Latency Push Notifications & Deep Linking",
          "Background Geolocation & Background Tasks",
          "Automated CI/CD App Store Deployment"
        ]
      },
      {
        "id": "backend-cloud",
        "title": "High-Throughput Cloud & Backend Architecture",
        "badge": "Distributed Scale",
        "shortDesc": "Resilient microservices, real-time relational databases, and fault-tolerant cloud APIs.",
        "longDesc": "We build distributed backend systems capable of processing millions of concurrent requests. Built upon Node.js, Go, Python FastAPI, PostgreSQL, Supabase, and Redis caching layers, our systems incorporate strict database connection pooling, asynchronous task queues, and zero-downtime database migrations. Fully containerized with Docker and orchestrated on AWS or GCP for automatic horizontal scaling.",
        "features": [
          "PostgreSQL & Supabase Real-Time Engine",
          "Redis In-Memory Distributed Caching",
          "Go & Node.js Asynchronous Microservices",
          "Docker Containerization & Kubernetes Ready",
          "Strict Schema Validation via Zod & Prisma",
          "Rate Limiting, Anti-DDoS & WAF Protection"
        ]
      },
      {
        "id": "ai-integration",
        "title": "Autonomous AI Agents & LLM Infrastructure",
        "badge": "Next-Gen AI",
        "shortDesc": "Enterprise Retrieval-Augmented Generation (RAG), custom fine-tuning, and automated workflows.",
        "longDesc": "Supercharge your operational efficiency by embedding autonomous AI agents directly into your software workflow. We construct enterprise RAG (Retrieval-Augmented Generation) pipelines, connect proprietary vector databases (pgvector, Pinecone), and integrate state-of-the-art models from OpenAI, Anthropic Claude, and open-source Llama 3. Automate document ingestion, customer support triage, complex data analysis, and code generation.",
        "features": [
          "Enterprise RAG Pipelines with Hybrid Search",
          "Custom Vector Embeddings (pgvector / Pinecone)",
          "Autonomous Task Orchestration & Tool Calling",
          "Multi-Modal Vision, Speech & OCR Pipelines",
          "Hallucination Guardrails & Token Optimization",
          "Private On-Premise LLM Deployments (Ollama)"
        ]
      },
      {
        "id": "fintech-ecommerce",
        "title": "FinTech & E-Commerce Payment Systems",
        "badge": "PCI-DSS Level 1",
        "shortDesc": "High-security payment gateways, ledger accounting, recurring billing, and multi-currency checkout.",
        "longDesc": "FinTech software requires zero room for error. We engineer mission-critical billing engines and transactional ledgers supporting Stripe, PayPal, Apple Pay, and cryptocurrency gateways. Our payment implementations adhere to PCI-DSS Level 1 compliance standards, implement double-entry bookkeeping ledgers to prevent race conditions, and automate recurring subscriptions, usage-based invoicing, and tax calculations.",
        "features": [
          "Stripe Embedded & Custom Checkout Gateways",
          "Double-Entry Accounting Transaction Ledgers",
          "Webhook Event Queue Idempotency & Retries",
          "Multi-Currency Dynamic Conversion & FX Handling",
          "Automated Subscription Lifecycle & Churn Prevention",
          "Real-Time Anti-Fraud & Chargeback Detection"
        ]
      },
      {
        "id": "cybersecurity-audit",
        "title": "Cybersecurity Auditing & Code Hardening",
        "badge": "Zero-Trust",
        "shortDesc": "Vulnerability assessments, penetration testing, source code review, and compliance readiness.",
        "longDesc": "Protect your enterprise from data breaches, intellectual property theft, and zero-day vulnerabilities. Our security engineers perform comprehensive static and dynamic code analysis, automated dependency audits, OWASP Top 10 penetration testing, and IAM role segregation. We architect your infrastructure with zero-trust networking, end-to-end encryption at rest and in transit, and prepare your startup for SOC-2, GDPR, and HIPAA compliance.",
        "features": [
          "OWASP Top 10 Web & API Penetration Testing",
          "Automated Static Analysis (SAST) in CI/CD",
          "End-to-End AES-256 Data Encryption",
          "Zero-Trust Network Access & Strict IAM Roles",
          "Comprehensive Vulnerability Remediation Reports",
          "GDPR, HIPAA & SOC-2 Architecture Alignment"
        ]
      }
    ],
    "deliveryStages": [
      {
        "stage": "01",
        "title": "Technical Discovery & Blueprinting",
        "desc": "We analyze your business model, define user personas, design system entity-relationship diagrams (ERD), map API endpoints, and establish architectural milestones to eliminate ambiguity."
      },
      {
        "stage": "02",
        "title": "Interactive UI/UX & Design Systems",
        "desc": "Our design team creates sleek, high-fidelity clickable Figma prototypes with dark modes, glassmorphism, responsive breakpoints, and micro-interactions before writing a single line of code."
      },
      {
        "stage": "03",
        "title": "Agile Sprints & Bi-Weekly Demos",
        "desc": "Development proceeds in 2-week focused sprints. You receive staging access, automated test reports, and live video demonstrations at every milestone so you maintain total project visibility."
      },
      {
        "stage": "04",
        "title": "Rigorous QA, Security & Load Testing",
        "desc": "Every build undergoes static analysis, cross-browser compatibility checks, OWASP security audits, and simulated stress testing (10,000+ concurrent users) to guarantee fault tolerance."
      },
      {
        "stage": "05",
        "title": "Zero-Downtime Cloud Deployment",
        "desc": "We provision your production cloud infrastructure on AWS, GCP, or Hostinger, configure global CDNs, configure SSL certificates, and execute zero-downtime continuous deployment."
      },
      {
        "stage": "06",
        "title": "24/7 SLA, Monitoring & Code Handoff",
        "desc": "Upon launch, we transfer 100% intellectual property and repositories to you, provide comprehensive documentation, and offer dedicated 24/7 SLA monitoring to support your growth."
      }
    ],
    "clientGuarantees": [
      {
        "title": "100% Full IP & Code Ownership",
        "desc": "You retain full ownership of all source code, design assets, database schemas, and intellectual property. No vendor lock-in; everything is cleanly documented."
      },
      {
        "title": "Strict Non-Disclosure Agreements (NDA)",
        "desc": "We treat your business ideas and proprietary datasets with complete confidentiality. Comprehensive NDAs are signed before discovery discussions."
      },
      {
        "title": "Direct Senior Engineer Communication",
        "desc": "No non-technical account managers or communication bottlenecks. You collaborate directly with lead software engineers via private Slack, WhatsApp, or Teams channels."
      },
      {
        "title": "UK-Registered Enterprise Standards",
        "desc": "Operated with strict international corporate compliance, milestone-based transparent invoicing, and clear legal protections for global founders."
      }
    ],
    "faqs": [
      {
        "q": "How quickly can your engineering team start on my project?",
        "a": "Depending on current sprint allocations, we typically initiate technical discovery and architectural blueprinting within 3 to 5 business days following project agreement and NDA execution."
      },
      {
        "q": "Who owns the code and intellectual property once built?",
        "a": "You do. 100%. Upon completion of project milestones and final sign-off, full copyright, proprietary source code, Git repositories, deployment credentials, and documentation are transferred unconditionally to your company."
      },
      {
        "q": "How are project payments structured?",
        "a": "We operate on transparent, milestone-based payments. Projects are divided into clear deliverables (e.g., Discovery & Architecture, MVP Prototype, Core Backend & APIs, Final Production QA). You only approve payments when working deliverables are reviewed and verified on staging."
      },
      {
        "q": "Can you take over and refactor an existing software codebase?",
        "a": "Yes. Our team frequently conducts comprehensive code audits for startups and legacy systems. We identify technical debt, refactor bottlenecks, upgrade outdated dependencies, patch security vulnerabilities, and migrate to modern Next.js/Go architectures."
      },
      {
        "q": "What happens after our application goes live?",
        "a": "We don't abandon you after launch. Every project includes a post-launch warranty period for bug fixes and stability monitoring. We also provide ongoing monthly Maintenance SLAs covering security patches, feature expansions, and 24/7 cloud uptime monitoring."
      },
      {
        "q": "Do you build custom AI models or just integrate third-party APIs?",
        "a": "We do both. We build advanced RAG (Retrieval-Augmented Generation) pipelines connecting proprietary company data to top LLMs, fine-tune custom open-source models (like Llama 3 or Mistral) on private GPU clusters, and deploy autonomous agents tailored to your business logic."
      }
    ],
    "isRtl": false
  },
  "fr": {
    "heroBadge": "Safi Academy Engineering Division",
    "heroTitle": "Bespoke Enterprise Software & AI Architecture",
    "heroSubtitle": "We architect mission-critical web platforms, fluid mobile apps, high-throughput cloud infrastructure, and autonomous AI agent pipelines built to scale to millions of users.",
    "ctaConsultation": "Schedule Technical Consultation",
    "ctaExplore": "Explore Engineering Services",
    "stat1Val": "99.99%",
    "stat1Label": "Target Uptime SLA",
    "stat2Val": "< 1.2s",
    "stat2Label": "Largest Contentful Paint",
    "stat3Val": "100%",
    "stat3Label": "IP & Code Ownership",
    "stat4Val": "24/7",
    "stat4Label": "Dedicated Technical Support",
    "servicesBadge": "Engineering Capabilities",
    "servicesTitle": "Specialized Software Solutions Built for Uncompromising Scale",
    "servicesSubtitle": "From high-performance frontend interfaces to distributed databases and autonomous agentic AI, our solutions are engineered with strict zero-trust quality.",
    "stackBadge": "Modern Tech Arsenal",
    "stackTitle": "Battle-Tested Technology Stack",
    "stackSubtitle": "We engineer systems with modern, enterprise-proven frameworks and runtimes to guarantee developer velocity, reliability, and security.",
    "stackTabFrontend": "Frontend & UI",
    "stackTabBackend": "Backend & APIs",
    "stackTabMobile": "Mobile Architecture",
    "stackTabDatabase": "Database & Caching",
    "stackTabCloud": "Cloud & DevOps",
    "stackTabAi": "AI & LLM Infra",
    "deliveryBadge": "Agile Blueprint",
    "deliveryTitle": "6-Stage Engineering Delivery Roadmap",
    "deliverySubtitle": "Transparent, milestone-based execution ensuring zero ambiguity, rapid iterations, and predictable delivery dates.",
    "guaranteesBadge": "Client Trust Standards",
    "guaranteesTitle": "Enterprise Client Guarantees",
    "guaranteesSubtitle": "How we protect your intellectual property, data security, and long-term project success.",
    "formBadge": "Technical Inquiry",
    "formTitle": "Request a Proposal or Consultation",
    "formSubtitle": "Tell us about your project requirements. A senior software architect will review your file and respond within 24 hours.",
    "formNameLabel": "Full Name",
    "formNamePlaceholder": "e.g. Ahmad Rahimi",
    "formEmailLabel": "Work Email",
    "formEmailPlaceholder": "name@company.com",
    "formPhoneLabel": "Phone / WhatsApp",
    "formPhonePlaceholder": "+93 799 000 000",
    "formServiceLabel": "Requested Engineering Service",
    "formBudgetLabel": "Estimated Budget Tier",
    "formDetailsLabel": "Project Scope & Technical Requirements",
    "formDetailsPlaceholder": "Describe your project vision, target timeline, technical requirements, and target user base...",
    "formSubmittingBtn": "Transmitting Request...",
    "formSubmitBtn": "Submit Technical Consultation Request",
    "formSuccessTitle": "Consultation Request Received!",
    "formSuccessDesc": "Our senior software engineering team has received your project brief. A technical lead will contact you via WhatsApp or Email within 24 hours.",
    "formErrorDesc": "An error occurred while submitting your inquiry. Please try again or reach out to us directly on WhatsApp or Telegram.",
    "faqsBadge": "FAQ & Inquiries",
    "faqsTitle": "Frequently Answered Questions",
    "services": [
      {
        "id": "web-app",
        "title": "Enterprise Full-Stack Web Applications",
        "badge": "High Concurrency",
        "shortDesc": "Sub-second load times, SEO-optimized server rendering, and scalable component architecture.",
        "longDesc": "We engineer high-performance web platforms using Next.js 14/15, React, TypeScript, and modern edge runtimes. By implementing Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and intelligent edge caching, we guarantee Core Web Vitals with Largest Contentful Paint (LCP) under 1.2 seconds. From multi-tenant SaaS dashboards to complex corporate portals, our web applications scale smoothly to millions of active users.",
        "features": [
          "Next.js App Router & TypeScript Strict Mode",
          "Sub-second TTFB with Global Edge Caching",
          "Enterprise RBAC & SSO (OAuth2 / SAML)",
          "State Management via Zustand & React Query",
          "Responsive Glassmorphic UI with Tailwind CSS",
          "Automated Lighthouse & Performance CI Audits"
        ]
      },
      {
        "id": "mobile-apps",
        "title": "Cross-Platform & Native Mobile Apps",
        "badge": "iOS & Android",
        "shortDesc": "Fluid 60 FPS mobile applications engineered with Flutter and native device integrations.",
        "longDesc": "Deliver a single, pixel-perfect codebase across iOS and Android without sacrificing native performance. Utilizing Flutter, Dart, and native Swift/Kotlin bridging, our mobile applications feature buttery-smooth 60/120 FPS animations, offline-first SQLite/Hive synchronization, biometrics (FaceID/Fingerprint), in-app purchases, and automated deployment pipelines to Apple App Store and Google Play Console.",
        "features": [
          "Flutter & Dart Cross-Platform Architecture",
          "Offline-First SQLite Data Synchronization",
          "Biometric Authentication & Secure Keychain",
          "Low-Latency Push Notifications & Deep Linking",
          "Background Geolocation & Background Tasks",
          "Automated CI/CD App Store Deployment"
        ]
      },
      {
        "id": "backend-cloud",
        "title": "High-Throughput Cloud & Backend Architecture",
        "badge": "Distributed Scale",
        "shortDesc": "Resilient microservices, real-time relational databases, and fault-tolerant cloud APIs.",
        "longDesc": "We build distributed backend systems capable of processing millions of concurrent requests. Built upon Node.js, Go, Python FastAPI, PostgreSQL, Supabase, and Redis caching layers, our systems incorporate strict database connection pooling, asynchronous task queues, and zero-downtime database migrations. Fully containerized with Docker and orchestrated on AWS or GCP for automatic horizontal scaling.",
        "features": [
          "PostgreSQL & Supabase Real-Time Engine",
          "Redis In-Memory Distributed Caching",
          "Go & Node.js Asynchronous Microservices",
          "Docker Containerization & Kubernetes Ready",
          "Strict Schema Validation via Zod & Prisma",
          "Rate Limiting, Anti-DDoS & WAF Protection"
        ]
      },
      {
        "id": "ai-integration",
        "title": "Autonomous AI Agents & LLM Infrastructure",
        "badge": "Next-Gen AI",
        "shortDesc": "Enterprise Retrieval-Augmented Generation (RAG), custom fine-tuning, and automated workflows.",
        "longDesc": "Supercharge your operational efficiency by embedding autonomous AI agents directly into your software workflow. We construct enterprise RAG (Retrieval-Augmented Generation) pipelines, connect proprietary vector databases (pgvector, Pinecone), and integrate state-of-the-art models from OpenAI, Anthropic Claude, and open-source Llama 3. Automate document ingestion, customer support triage, complex data analysis, and code generation.",
        "features": [
          "Enterprise RAG Pipelines with Hybrid Search",
          "Custom Vector Embeddings (pgvector / Pinecone)",
          "Autonomous Task Orchestration & Tool Calling",
          "Multi-Modal Vision, Speech & OCR Pipelines",
          "Hallucination Guardrails & Token Optimization",
          "Private On-Premise LLM Deployments (Ollama)"
        ]
      },
      {
        "id": "fintech-ecommerce",
        "title": "FinTech & E-Commerce Payment Systems",
        "badge": "PCI-DSS Level 1",
        "shortDesc": "High-security payment gateways, ledger accounting, recurring billing, and multi-currency checkout.",
        "longDesc": "FinTech software requires zero room for error. We engineer mission-critical billing engines and transactional ledgers supporting Stripe, PayPal, Apple Pay, and cryptocurrency gateways. Our payment implementations adhere to PCI-DSS Level 1 compliance standards, implement double-entry bookkeeping ledgers to prevent race conditions, and automate recurring subscriptions, usage-based invoicing, and tax calculations.",
        "features": [
          "Stripe Embedded & Custom Checkout Gateways",
          "Double-Entry Accounting Transaction Ledgers",
          "Webhook Event Queue Idempotency & Retries",
          "Multi-Currency Dynamic Conversion & FX Handling",
          "Automated Subscription Lifecycle & Churn Prevention",
          "Real-Time Anti-Fraud & Chargeback Detection"
        ]
      },
      {
        "id": "cybersecurity-audit",
        "title": "Cybersecurity Auditing & Code Hardening",
        "badge": "Zero-Trust",
        "shortDesc": "Vulnerability assessments, penetration testing, source code review, and compliance readiness.",
        "longDesc": "Protect your enterprise from data breaches, intellectual property theft, and zero-day vulnerabilities. Our security engineers perform comprehensive static and dynamic code analysis, automated dependency audits, OWASP Top 10 penetration testing, and IAM role segregation. We architect your infrastructure with zero-trust networking, end-to-end encryption at rest and in transit, and prepare your startup for SOC-2, GDPR, and HIPAA compliance.",
        "features": [
          "OWASP Top 10 Web & API Penetration Testing",
          "Automated Static Analysis (SAST) in CI/CD",
          "End-to-End AES-256 Data Encryption",
          "Zero-Trust Network Access & Strict IAM Roles",
          "Comprehensive Vulnerability Remediation Reports",
          "GDPR, HIPAA & SOC-2 Architecture Alignment"
        ]
      }
    ],
    "deliveryStages": [
      {
        "stage": "01",
        "title": "Technical Discovery & Blueprinting",
        "desc": "We analyze your business model, define user personas, design system entity-relationship diagrams (ERD), map API endpoints, and establish architectural milestones to eliminate ambiguity."
      },
      {
        "stage": "02",
        "title": "Interactive UI/UX & Design Systems",
        "desc": "Our design team creates sleek, high-fidelity clickable Figma prototypes with dark modes, glassmorphism, responsive breakpoints, and micro-interactions before writing a single line of code."
      },
      {
        "stage": "03",
        "title": "Agile Sprints & Bi-Weekly Demos",
        "desc": "Development proceeds in 2-week focused sprints. You receive staging access, automated test reports, and live video demonstrations at every milestone so you maintain total project visibility."
      },
      {
        "stage": "04",
        "title": "Rigorous QA, Security & Load Testing",
        "desc": "Every build undergoes static analysis, cross-browser compatibility checks, OWASP security audits, and simulated stress testing (10,000+ concurrent users) to guarantee fault tolerance."
      },
      {
        "stage": "05",
        "title": "Zero-Downtime Cloud Deployment",
        "desc": "We provision your production cloud infrastructure on AWS, GCP, or Hostinger, configure global CDNs, configure SSL certificates, and execute zero-downtime continuous deployment."
      },
      {
        "stage": "06",
        "title": "24/7 SLA, Monitoring & Code Handoff",
        "desc": "Upon launch, we transfer 100% intellectual property and repositories to you, provide comprehensive documentation, and offer dedicated 24/7 SLA monitoring to support your growth."
      }
    ],
    "clientGuarantees": [
      {
        "title": "100% Full IP & Code Ownership",
        "desc": "You retain full ownership of all source code, design assets, database schemas, and intellectual property. No vendor lock-in; everything is cleanly documented."
      },
      {
        "title": "Strict Non-Disclosure Agreements (NDA)",
        "desc": "We treat your business ideas and proprietary datasets with complete confidentiality. Comprehensive NDAs are signed before discovery discussions."
      },
      {
        "title": "Direct Senior Engineer Communication",
        "desc": "No non-technical account managers or communication bottlenecks. You collaborate directly with lead software engineers via private Slack, WhatsApp, or Teams channels."
      },
      {
        "title": "UK-Registered Enterprise Standards",
        "desc": "Operated with strict international corporate compliance, milestone-based transparent invoicing, and clear legal protections for global founders."
      }
    ],
    "faqs": [
      {
        "q": "How quickly can your engineering team start on my project?",
        "a": "Depending on current sprint allocations, we typically initiate technical discovery and architectural blueprinting within 3 to 5 business days following project agreement and NDA execution."
      },
      {
        "q": "Who owns the code and intellectual property once built?",
        "a": "You do. 100%. Upon completion of project milestones and final sign-off, full copyright, proprietary source code, Git repositories, deployment credentials, and documentation are transferred unconditionally to your company."
      },
      {
        "q": "How are project payments structured?",
        "a": "We operate on transparent, milestone-based payments. Projects are divided into clear deliverables (e.g., Discovery & Architecture, MVP Prototype, Core Backend & APIs, Final Production QA). You only approve payments when working deliverables are reviewed and verified on staging."
      },
      {
        "q": "Can you take over and refactor an existing software codebase?",
        "a": "Yes. Our team frequently conducts comprehensive code audits for startups and legacy systems. We identify technical debt, refactor bottlenecks, upgrade outdated dependencies, patch security vulnerabilities, and migrate to modern Next.js/Go architectures."
      },
      {
        "q": "What happens after our application goes live?",
        "a": "We don't abandon you after launch. Every project includes a post-launch warranty period for bug fixes and stability monitoring. We also provide ongoing monthly Maintenance SLAs covering security patches, feature expansions, and 24/7 cloud uptime monitoring."
      },
      {
        "q": "Do you build custom AI models or just integrate third-party APIs?",
        "a": "We do both. We build advanced RAG (Retrieval-Augmented Generation) pipelines connecting proprietary company data to top LLMs, fine-tune custom open-source models (like Llama 3 or Mistral) on private GPU clusters, and deploy autonomous agents tailored to your business logic."
      }
    ],
    "isRtl": false
  },
  "ar": {
    "heroBadge": "قسم الهندسة البرمجية في أكاديمية صافي",
    "heroTitle": "هندسة برمجيات المؤسسات وحلول الذكاء الاصطناعي المخصصة",
    "heroSubtitle": "نقوم بهندسة منصات الويب الفائقة السرعة وتطبيقات الهاتف المحمول الأصلية والبنى التحتية السحابية القابلة للتوسع إلى ملايين المستخدمين.",
    "ctaConsultation": "طلب استشارة تقنية وتقدير التكلفة",
    "ctaExplore": "استكشاف الخدمات الهندسية",
    "stat1Val": "99.99%",
    "stat1Label": "ضمان استقرار الخوادم (SLA)",
    "stat2Val": "< 1.2s",
    "stat2Label": "سرعة تحميل الصفحة (LCP)",
    "stat3Val": "100%",
    "stat3Label": "ملكية الكود والمشروع 100%",
    "stat4Val": "24/7",
    "stat4Label": "دعم فني ومراقبة متواصلة",
    "servicesBadge": "القدرات الهندسية",
    "servicesTitle": "حلول برمجية متقدمة مصممة لأعلى مستويات الأداء",
    "servicesSubtitle": "من واجهات المستخدم فائقة الأداء إلى قواعد البيانات الموزعة وحلول الذكاء الاصطناعي المستقلة.",
    "stackBadge": "أحدث التقنيات العالمية",
    "stackTitle": "الترسانة التقنية المعتمدة لدينا",
    "stackSubtitle": "نستخدم أحدث أطر العمل لتوفير السرعة والمرونة والأمان العالي لتطبيقاتك.",
    "stackTabFrontend": "الواجهات الأمامية",
    "stackTabBackend": "الأنظمة الخلفية وAPIs",
    "stackTabMobile": "تطبيقات الهاتف",
    "stackTabDatabase": "قواعد البيانات والتخزين المؤقت",
    "stackTabCloud": "السحابة وهندسة DevOps",
    "stackTabAi": "الذكاء الاصطناعي ونماذج LLM",
    "deliveryBadge": "خارطة طريق التسليم",
    "deliveryTitle": "مراحل التسليم الرشيق الست",
    "deliverySubtitle": "خارطة طريق واضحة ومبنية على مراحل محددة لضمان الشفافية والالتزام بالمواعيد.",
    "guaranteesBadge": "ضمانات العملاء",
    "guaranteesTitle": "ضماناتنا المؤسسية لعملائنا",
    "guaranteesSubtitle": "كيف نحمي الملكية الفكرية وسرية البيانات ونجاح مشروعك التقني على المدى الطويل.",
    "formBadge": "استفسار تقني",
    "formTitle": "طلب استشارة هندسية وعرض سعر",
    "formSubtitle": "أخبرنا عن تفاصيل مشروعك وسيقوم كبير المهندسين بمراجعة طلبك والتواصل معك خلال 24 ساعة.",
    "formNameLabel": "الاسم الكامل",
    "formNamePlaceholder": "e.g. Ahmad Rahimi",
    "formEmailLabel": "البريد الإلكتروني للعمل",
    "formEmailPlaceholder": "name@company.com",
    "formPhoneLabel": "رقم الهاتف / واتساب",
    "formPhonePlaceholder": "+93 799 000 000",
    "formServiceLabel": "الخدمة الهندسية المطلوبة",
    "formBudgetLabel": "الميزانية التقديرية",
    "formDetailsLabel": "متطلبات ونطاق المشروع التقني",
    "formDetailsPlaceholder": "اشرح رؤية مشروعك، الجدول الزمني المطلوب، وقاعدة المستخدمين المستهدفة...",
    "formSubmittingBtn": "جارٍ إرسال البيانات...",
    "formSubmitBtn": "إرسال طلب الاستشارة التقنية",
    "formSuccessTitle": "تم استلام طلبك بنجاح!",
    "formSuccessDesc": "تلقى فريقنا الهندسي ملخص مشروعك وسيتواصل معك مهندس رئيسي عبر واتساب أو البريد الإلكتروني خلال 24 ساعة.",
    "formErrorDesc": "حدث خطأ أثناء الإرسال. يُرجى المحاولة مرة أخرى أو التواصل معنا مباشرة عبر واتساب أو تيليجرام.",
    "faqsBadge": "الأسئلة الشائعة",
    "faqsTitle": "الأسئلة والإجابات الهندسية الشائعة",
    "services": [
      {
        "id": "web-app",
        "title": "Enterprise Full-Stack Web Applications",
        "badge": "High Concurrency",
        "shortDesc": "Sub-second load times, SEO-optimized server rendering, and scalable component architecture.",
        "longDesc": "We engineer high-performance web platforms using Next.js 14/15, React, TypeScript, and modern edge runtimes. By implementing Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and intelligent edge caching, we guarantee Core Web Vitals with Largest Contentful Paint (LCP) under 1.2 seconds. From multi-tenant SaaS dashboards to complex corporate portals, our web applications scale smoothly to millions of active users.",
        "features": [
          "Next.js App Router & TypeScript Strict Mode",
          "Sub-second TTFB with Global Edge Caching",
          "Enterprise RBAC & SSO (OAuth2 / SAML)",
          "State Management via Zustand & React Query",
          "Responsive Glassmorphic UI with Tailwind CSS",
          "Automated Lighthouse & Performance CI Audits"
        ]
      },
      {
        "id": "mobile-apps",
        "title": "Cross-Platform & Native Mobile Apps",
        "badge": "iOS & Android",
        "shortDesc": "Fluid 60 FPS mobile applications engineered with Flutter and native device integrations.",
        "longDesc": "Deliver a single, pixel-perfect codebase across iOS and Android without sacrificing native performance. Utilizing Flutter, Dart, and native Swift/Kotlin bridging, our mobile applications feature buttery-smooth 60/120 FPS animations, offline-first SQLite/Hive synchronization, biometrics (FaceID/Fingerprint), in-app purchases, and automated deployment pipelines to Apple App Store and Google Play Console.",
        "features": [
          "Flutter & Dart Cross-Platform Architecture",
          "Offline-First SQLite Data Synchronization",
          "Biometric Authentication & Secure Keychain",
          "Low-Latency Push Notifications & Deep Linking",
          "Background Geolocation & Background Tasks",
          "Automated CI/CD App Store Deployment"
        ]
      },
      {
        "id": "backend-cloud",
        "title": "High-Throughput Cloud & Backend Architecture",
        "badge": "Distributed Scale",
        "shortDesc": "Resilient microservices, real-time relational databases, and fault-tolerant cloud APIs.",
        "longDesc": "We build distributed backend systems capable of processing millions of concurrent requests. Built upon Node.js, Go, Python FastAPI, PostgreSQL, Supabase, and Redis caching layers, our systems incorporate strict database connection pooling, asynchronous task queues, and zero-downtime database migrations. Fully containerized with Docker and orchestrated on AWS or GCP for automatic horizontal scaling.",
        "features": [
          "PostgreSQL & Supabase Real-Time Engine",
          "Redis In-Memory Distributed Caching",
          "Go & Node.js Asynchronous Microservices",
          "Docker Containerization & Kubernetes Ready",
          "Strict Schema Validation via Zod & Prisma",
          "Rate Limiting, Anti-DDoS & WAF Protection"
        ]
      },
      {
        "id": "ai-integration",
        "title": "Autonomous AI Agents & LLM Infrastructure",
        "badge": "Next-Gen AI",
        "shortDesc": "Enterprise Retrieval-Augmented Generation (RAG), custom fine-tuning, and automated workflows.",
        "longDesc": "Supercharge your operational efficiency by embedding autonomous AI agents directly into your software workflow. We construct enterprise RAG (Retrieval-Augmented Generation) pipelines, connect proprietary vector databases (pgvector, Pinecone), and integrate state-of-the-art models from OpenAI, Anthropic Claude, and open-source Llama 3. Automate document ingestion, customer support triage, complex data analysis, and code generation.",
        "features": [
          "Enterprise RAG Pipelines with Hybrid Search",
          "Custom Vector Embeddings (pgvector / Pinecone)",
          "Autonomous Task Orchestration & Tool Calling",
          "Multi-Modal Vision, Speech & OCR Pipelines",
          "Hallucination Guardrails & Token Optimization",
          "Private On-Premise LLM Deployments (Ollama)"
        ]
      },
      {
        "id": "fintech-ecommerce",
        "title": "FinTech & E-Commerce Payment Systems",
        "badge": "PCI-DSS Level 1",
        "shortDesc": "High-security payment gateways, ledger accounting, recurring billing, and multi-currency checkout.",
        "longDesc": "FinTech software requires zero room for error. We engineer mission-critical billing engines and transactional ledgers supporting Stripe, PayPal, Apple Pay, and cryptocurrency gateways. Our payment implementations adhere to PCI-DSS Level 1 compliance standards, implement double-entry bookkeeping ledgers to prevent race conditions, and automate recurring subscriptions, usage-based invoicing, and tax calculations.",
        "features": [
          "Stripe Embedded & Custom Checkout Gateways",
          "Double-Entry Accounting Transaction Ledgers",
          "Webhook Event Queue Idempotency & Retries",
          "Multi-Currency Dynamic Conversion & FX Handling",
          "Automated Subscription Lifecycle & Churn Prevention",
          "Real-Time Anti-Fraud & Chargeback Detection"
        ]
      },
      {
        "id": "cybersecurity-audit",
        "title": "Cybersecurity Auditing & Code Hardening",
        "badge": "Zero-Trust",
        "shortDesc": "Vulnerability assessments, penetration testing, source code review, and compliance readiness.",
        "longDesc": "Protect your enterprise from data breaches, intellectual property theft, and zero-day vulnerabilities. Our security engineers perform comprehensive static and dynamic code analysis, automated dependency audits, OWASP Top 10 penetration testing, and IAM role segregation. We architect your infrastructure with zero-trust networking, end-to-end encryption at rest and in transit, and prepare your startup for SOC-2, GDPR, and HIPAA compliance.",
        "features": [
          "OWASP Top 10 Web & API Penetration Testing",
          "Automated Static Analysis (SAST) in CI/CD",
          "End-to-End AES-256 Data Encryption",
          "Zero-Trust Network Access & Strict IAM Roles",
          "Comprehensive Vulnerability Remediation Reports",
          "GDPR, HIPAA & SOC-2 Architecture Alignment"
        ]
      }
    ],
    "deliveryStages": [
      {
        "stage": "01",
        "title": "Technical Discovery & Blueprinting",
        "desc": "We analyze your business model, define user personas, design system entity-relationship diagrams (ERD), map API endpoints, and establish architectural milestones to eliminate ambiguity."
      },
      {
        "stage": "02",
        "title": "Interactive UI/UX & Design Systems",
        "desc": "Our design team creates sleek, high-fidelity clickable Figma prototypes with dark modes, glassmorphism, responsive breakpoints, and micro-interactions before writing a single line of code."
      },
      {
        "stage": "03",
        "title": "Agile Sprints & Bi-Weekly Demos",
        "desc": "Development proceeds in 2-week focused sprints. You receive staging access, automated test reports, and live video demonstrations at every milestone so you maintain total project visibility."
      },
      {
        "stage": "04",
        "title": "Rigorous QA, Security & Load Testing",
        "desc": "Every build undergoes static analysis, cross-browser compatibility checks, OWASP security audits, and simulated stress testing (10,000+ concurrent users) to guarantee fault tolerance."
      },
      {
        "stage": "05",
        "title": "Zero-Downtime Cloud Deployment",
        "desc": "We provision your production cloud infrastructure on AWS, GCP, or Hostinger, configure global CDNs, configure SSL certificates, and execute zero-downtime continuous deployment."
      },
      {
        "stage": "06",
        "title": "24/7 SLA, Monitoring & Code Handoff",
        "desc": "Upon launch, we transfer 100% intellectual property and repositories to you, provide comprehensive documentation, and offer dedicated 24/7 SLA monitoring to support your growth."
      }
    ],
    "clientGuarantees": [
      {
        "title": "100% Full IP & Code Ownership",
        "desc": "You retain full ownership of all source code, design assets, database schemas, and intellectual property. No vendor lock-in; everything is cleanly documented."
      },
      {
        "title": "Strict Non-Disclosure Agreements (NDA)",
        "desc": "We treat your business ideas and proprietary datasets with complete confidentiality. Comprehensive NDAs are signed before discovery discussions."
      },
      {
        "title": "Direct Senior Engineer Communication",
        "desc": "No non-technical account managers or communication bottlenecks. You collaborate directly with lead software engineers via private Slack, WhatsApp, or Teams channels."
      },
      {
        "title": "UK-Registered Enterprise Standards",
        "desc": "Operated with strict international corporate compliance, milestone-based transparent invoicing, and clear legal protections for global founders."
      }
    ],
    "faqs": [
      {
        "q": "How quickly can your engineering team start on my project?",
        "a": "Depending on current sprint allocations, we typically initiate technical discovery and architectural blueprinting within 3 to 5 business days following project agreement and NDA execution."
      },
      {
        "q": "Who owns the code and intellectual property once built?",
        "a": "You do. 100%. Upon completion of project milestones and final sign-off, full copyright, proprietary source code, Git repositories, deployment credentials, and documentation are transferred unconditionally to your company."
      },
      {
        "q": "How are project payments structured?",
        "a": "We operate on transparent, milestone-based payments. Projects are divided into clear deliverables (e.g., Discovery & Architecture, MVP Prototype, Core Backend & APIs, Final Production QA). You only approve payments when working deliverables are reviewed and verified on staging."
      },
      {
        "q": "Can you take over and refactor an existing software codebase?",
        "a": "Yes. Our team frequently conducts comprehensive code audits for startups and legacy systems. We identify technical debt, refactor bottlenecks, upgrade outdated dependencies, patch security vulnerabilities, and migrate to modern Next.js/Go architectures."
      },
      {
        "q": "What happens after our application goes live?",
        "a": "We don't abandon you after launch. Every project includes a post-launch warranty period for bug fixes and stability monitoring. We also provide ongoing monthly Maintenance SLAs covering security patches, feature expansions, and 24/7 cloud uptime monitoring."
      },
      {
        "q": "Do you build custom AI models or just integrate third-party APIs?",
        "a": "We do both. We build advanced RAG (Retrieval-Augmented Generation) pipelines connecting proprietary company data to top LLMs, fine-tune custom open-source models (like Llama 3 or Mistral) on private GPU clusters, and deploy autonomous agents tailored to your business logic."
      }
    ],
    "isRtl": true
  },
  "ur": {
    "heroBadge": "صافی اکیڈمی سافٹ ویئر انجینئرنگ ڈویژن",
    "heroTitle": "انٹرپرائز سافٹ ویئر اور کسٹم AI آرکیٹیکچر",
    "heroSubtitle": "ہم تیز رفتار ویب پلیٹ فارمز، جدید موبائل ایپس، اسکیل ایبل کلاؤڈ سسٹمز اور خودکار AI ایجنٹس ڈیزائن اور ڈویلپ کرتے ہیں۔",
    "ctaConsultation": "تکنیکی مشاورت اور تخمینہ حاصل کریں",
    "ctaExplore": "انجینئرنگ خدمات دیکھیں",
    "stat1Val": "99.99%",
    "stat1Label": "سسٹم اپ ٹائم گارنٹی (SLA)",
    "stat2Val": "< 1.2s",
    "stat2Label": "صفحہ کھلنے کی رفتار",
    "stat3Val": "100%",
    "stat3Label": "کوڈ اور سورس کی 100% ملکیت",
    "stat4Val": "24/7",
    "stat4Label": "24/7 تکنیکی معاونت",
    "servicesBadge": "انجینئرنگ کی صلاحیتیں",
    "servicesTitle": "اعلیٰ کارکردگی والے سافٹ ویئر حل",
    "servicesSubtitle": "جدید فرنٹ اینڈ سے لے کر کلاؤڈ سسٹمز اور AI تک، ہم محفوظ اور مستحکم حل فراہم کرتے ہیں۔",
    "stackBadge": "جدید ترین ٹیکنالوجی اسٹیک",
    "stackTitle": "ہمارا تصدیق شدہ ٹیکنالوجی ہتھیار",
    "stackSubtitle": "ہم بہترین فریم ورکس کا استعمال کرتے ہیں تاکہ تیز رفتاری، تحفظ اور اسکیل ایبلٹی کو یقینی بنایا جا سکے۔",
    "stackTabFrontend": "فرنٹ اینڈ اور UI",
    "stackTabBackend": "بیک اینڈ اور APIs",
    "stackTabMobile": "موبائل ایپس",
    "stackTabDatabase": "ڈیٹا بیس اور کیشنگ",
    "stackTabCloud": "کلاؤڈ اور ڈیواپس",
    "stackTabAi": "مصنوعی ذہانت اور LLM",
    "deliveryBadge": "ترقیاتی روڈ میپ",
    "deliveryTitle": "منصوبے کی فراہمی کے 6 مراحل",
    "deliverySubtitle": "ایک شفاف طریقہ کار جو منصوبے کی بروقت تکمیل اور بہترین معیار کو یقینی بناتا ہے۔",
    "guaranteesBadge": "گاہکوں کے لیے اعتماد کی ضمانتیں",
    "guaranteesTitle": "صافی اکیڈمی کی کارپوریٹ ضمانتیں",
    "guaranteesSubtitle": "ہم آپ کی دانشورانہ ملکیت اور ڈیٹا کے تحفظ کو مکمل طور پر یقینی بناتے ہیں۔",
    "formBadge": "پروجیکٹ انکوائری",
    "formTitle": "تکنیکی مشاورت اور کوٹیشن فارم",
    "formSubtitle": "اپنے پروجیکٹ کی تفصیلات بتائیں، ہمارا سینیئر آرکیٹیکٹ 24 گھنٹے میں آپ سے رابطہ کرے گا۔",
    "formNameLabel": "مکمل نام",
    "formNamePlaceholder": "e.g. Ahmad Rahimi",
    "formEmailLabel": "کاروباری ای میل",
    "formEmailPlaceholder": "name@company.com",
    "formPhoneLabel": "فون / واٹس ایپ",
    "formPhonePlaceholder": "+93 799 000 000",
    "formServiceLabel": "مطلوبہ سروس",
    "formBudgetLabel": "تخمینی بجٹ",
    "formDetailsLabel": "پروجیکٹ کی تفصیلات اور تکنیکی ضروریات",
    "formDetailsPlaceholder": "اپنے پروجیکٹ کے مقاصد، ٹائم لائن اور دیگر ضروریات کے بارے میں بتائیں...",
    "formSubmittingBtn": "ڈیٹا بھیجا جا رہا ہے...",
    "formSubmitBtn": "مشاورت کی درخواست جمع کروائیں",
    "formSuccessTitle": "درخواست کامیابی سے موصول ہو گئی!",
    "formSuccessDesc": "ہماری انجینئرنگ ٹیم کو آپ کی درخواست مل گئی ہے۔ ہمارا لیڈ انجینئر 24 گھنٹے میں واٹس ایپ یا ای میل پر رابطہ کرے گا۔",
    "formErrorDesc": "نیٹ ورک میں خرابی پیش آگئی ہے۔ براہ کرم دوبارہ کوشش کریں یا براہ راست واٹس ایپ پر رابطہ کریں۔",
    "faqsBadge": "عام سوالات",
    "faqsTitle": "اکثر پوچھے گئے سوالات اور ان کے جوابات",
    "services": [
      {
        "id": "web-app",
        "title": "Enterprise Full-Stack Web Applications",
        "badge": "High Concurrency",
        "shortDesc": "Sub-second load times, SEO-optimized server rendering, and scalable component architecture.",
        "longDesc": "We engineer high-performance web platforms using Next.js 14/15, React, TypeScript, and modern edge runtimes. By implementing Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and intelligent edge caching, we guarantee Core Web Vitals with Largest Contentful Paint (LCP) under 1.2 seconds. From multi-tenant SaaS dashboards to complex corporate portals, our web applications scale smoothly to millions of active users.",
        "features": [
          "Next.js App Router & TypeScript Strict Mode",
          "Sub-second TTFB with Global Edge Caching",
          "Enterprise RBAC & SSO (OAuth2 / SAML)",
          "State Management via Zustand & React Query",
          "Responsive Glassmorphic UI with Tailwind CSS",
          "Automated Lighthouse & Performance CI Audits"
        ]
      },
      {
        "id": "mobile-apps",
        "title": "Cross-Platform & Native Mobile Apps",
        "badge": "iOS & Android",
        "shortDesc": "Fluid 60 FPS mobile applications engineered with Flutter and native device integrations.",
        "longDesc": "Deliver a single, pixel-perfect codebase across iOS and Android without sacrificing native performance. Utilizing Flutter, Dart, and native Swift/Kotlin bridging, our mobile applications feature buttery-smooth 60/120 FPS animations, offline-first SQLite/Hive synchronization, biometrics (FaceID/Fingerprint), in-app purchases, and automated deployment pipelines to Apple App Store and Google Play Console.",
        "features": [
          "Flutter & Dart Cross-Platform Architecture",
          "Offline-First SQLite Data Synchronization",
          "Biometric Authentication & Secure Keychain",
          "Low-Latency Push Notifications & Deep Linking",
          "Background Geolocation & Background Tasks",
          "Automated CI/CD App Store Deployment"
        ]
      },
      {
        "id": "backend-cloud",
        "title": "High-Throughput Cloud & Backend Architecture",
        "badge": "Distributed Scale",
        "shortDesc": "Resilient microservices, real-time relational databases, and fault-tolerant cloud APIs.",
        "longDesc": "We build distributed backend systems capable of processing millions of concurrent requests. Built upon Node.js, Go, Python FastAPI, PostgreSQL, Supabase, and Redis caching layers, our systems incorporate strict database connection pooling, asynchronous task queues, and zero-downtime database migrations. Fully containerized with Docker and orchestrated on AWS or GCP for automatic horizontal scaling.",
        "features": [
          "PostgreSQL & Supabase Real-Time Engine",
          "Redis In-Memory Distributed Caching",
          "Go & Node.js Asynchronous Microservices",
          "Docker Containerization & Kubernetes Ready",
          "Strict Schema Validation via Zod & Prisma",
          "Rate Limiting, Anti-DDoS & WAF Protection"
        ]
      },
      {
        "id": "ai-integration",
        "title": "Autonomous AI Agents & LLM Infrastructure",
        "badge": "Next-Gen AI",
        "shortDesc": "Enterprise Retrieval-Augmented Generation (RAG), custom fine-tuning, and automated workflows.",
        "longDesc": "Supercharge your operational efficiency by embedding autonomous AI agents directly into your software workflow. We construct enterprise RAG (Retrieval-Augmented Generation) pipelines, connect proprietary vector databases (pgvector, Pinecone), and integrate state-of-the-art models from OpenAI, Anthropic Claude, and open-source Llama 3. Automate document ingestion, customer support triage, complex data analysis, and code generation.",
        "features": [
          "Enterprise RAG Pipelines with Hybrid Search",
          "Custom Vector Embeddings (pgvector / Pinecone)",
          "Autonomous Task Orchestration & Tool Calling",
          "Multi-Modal Vision, Speech & OCR Pipelines",
          "Hallucination Guardrails & Token Optimization",
          "Private On-Premise LLM Deployments (Ollama)"
        ]
      },
      {
        "id": "fintech-ecommerce",
        "title": "FinTech & E-Commerce Payment Systems",
        "badge": "PCI-DSS Level 1",
        "shortDesc": "High-security payment gateways, ledger accounting, recurring billing, and multi-currency checkout.",
        "longDesc": "FinTech software requires zero room for error. We engineer mission-critical billing engines and transactional ledgers supporting Stripe, PayPal, Apple Pay, and cryptocurrency gateways. Our payment implementations adhere to PCI-DSS Level 1 compliance standards, implement double-entry bookkeeping ledgers to prevent race conditions, and automate recurring subscriptions, usage-based invoicing, and tax calculations.",
        "features": [
          "Stripe Embedded & Custom Checkout Gateways",
          "Double-Entry Accounting Transaction Ledgers",
          "Webhook Event Queue Idempotency & Retries",
          "Multi-Currency Dynamic Conversion & FX Handling",
          "Automated Subscription Lifecycle & Churn Prevention",
          "Real-Time Anti-Fraud & Chargeback Detection"
        ]
      },
      {
        "id": "cybersecurity-audit",
        "title": "Cybersecurity Auditing & Code Hardening",
        "badge": "Zero-Trust",
        "shortDesc": "Vulnerability assessments, penetration testing, source code review, and compliance readiness.",
        "longDesc": "Protect your enterprise from data breaches, intellectual property theft, and zero-day vulnerabilities. Our security engineers perform comprehensive static and dynamic code analysis, automated dependency audits, OWASP Top 10 penetration testing, and IAM role segregation. We architect your infrastructure with zero-trust networking, end-to-end encryption at rest and in transit, and prepare your startup for SOC-2, GDPR, and HIPAA compliance.",
        "features": [
          "OWASP Top 10 Web & API Penetration Testing",
          "Automated Static Analysis (SAST) in CI/CD",
          "End-to-End AES-256 Data Encryption",
          "Zero-Trust Network Access & Strict IAM Roles",
          "Comprehensive Vulnerability Remediation Reports",
          "GDPR, HIPAA & SOC-2 Architecture Alignment"
        ]
      }
    ],
    "deliveryStages": [
      {
        "stage": "01",
        "title": "Technical Discovery & Blueprinting",
        "desc": "We analyze your business model, define user personas, design system entity-relationship diagrams (ERD), map API endpoints, and establish architectural milestones to eliminate ambiguity."
      },
      {
        "stage": "02",
        "title": "Interactive UI/UX & Design Systems",
        "desc": "Our design team creates sleek, high-fidelity clickable Figma prototypes with dark modes, glassmorphism, responsive breakpoints, and micro-interactions before writing a single line of code."
      },
      {
        "stage": "03",
        "title": "Agile Sprints & Bi-Weekly Demos",
        "desc": "Development proceeds in 2-week focused sprints. You receive staging access, automated test reports, and live video demonstrations at every milestone so you maintain total project visibility."
      },
      {
        "stage": "04",
        "title": "Rigorous QA, Security & Load Testing",
        "desc": "Every build undergoes static analysis, cross-browser compatibility checks, OWASP security audits, and simulated stress testing (10,000+ concurrent users) to guarantee fault tolerance."
      },
      {
        "stage": "05",
        "title": "Zero-Downtime Cloud Deployment",
        "desc": "We provision your production cloud infrastructure on AWS, GCP, or Hostinger, configure global CDNs, configure SSL certificates, and execute zero-downtime continuous deployment."
      },
      {
        "stage": "06",
        "title": "24/7 SLA, Monitoring & Code Handoff",
        "desc": "Upon launch, we transfer 100% intellectual property and repositories to you, provide comprehensive documentation, and offer dedicated 24/7 SLA monitoring to support your growth."
      }
    ],
    "clientGuarantees": [
      {
        "title": "100% Full IP & Code Ownership",
        "desc": "You retain full ownership of all source code, design assets, database schemas, and intellectual property. No vendor lock-in; everything is cleanly documented."
      },
      {
        "title": "Strict Non-Disclosure Agreements (NDA)",
        "desc": "We treat your business ideas and proprietary datasets with complete confidentiality. Comprehensive NDAs are signed before discovery discussions."
      },
      {
        "title": "Direct Senior Engineer Communication",
        "desc": "No non-technical account managers or communication bottlenecks. You collaborate directly with lead software engineers via private Slack, WhatsApp, or Teams channels."
      },
      {
        "title": "UK-Registered Enterprise Standards",
        "desc": "Operated with strict international corporate compliance, milestone-based transparent invoicing, and clear legal protections for global founders."
      }
    ],
    "faqs": [
      {
        "q": "How quickly can your engineering team start on my project?",
        "a": "Depending on current sprint allocations, we typically initiate technical discovery and architectural blueprinting within 3 to 5 business days following project agreement and NDA execution."
      },
      {
        "q": "Who owns the code and intellectual property once built?",
        "a": "You do. 100%. Upon completion of project milestones and final sign-off, full copyright, proprietary source code, Git repositories, deployment credentials, and documentation are transferred unconditionally to your company."
      },
      {
        "q": "How are project payments structured?",
        "a": "We operate on transparent, milestone-based payments. Projects are divided into clear deliverables (e.g., Discovery & Architecture, MVP Prototype, Core Backend & APIs, Final Production QA). You only approve payments when working deliverables are reviewed and verified on staging."
      },
      {
        "q": "Can you take over and refactor an existing software codebase?",
        "a": "Yes. Our team frequently conducts comprehensive code audits for startups and legacy systems. We identify technical debt, refactor bottlenecks, upgrade outdated dependencies, patch security vulnerabilities, and migrate to modern Next.js/Go architectures."
      },
      {
        "q": "What happens after our application goes live?",
        "a": "We don't abandon you after launch. Every project includes a post-launch warranty period for bug fixes and stability monitoring. We also provide ongoing monthly Maintenance SLAs covering security patches, feature expansions, and 24/7 cloud uptime monitoring."
      },
      {
        "q": "Do you build custom AI models or just integrate third-party APIs?",
        "a": "We do both. We build advanced RAG (Retrieval-Augmented Generation) pipelines connecting proprietary company data to top LLMs, fine-tune custom open-source models (like Llama 3 or Mistral) on private GPU clusters, and deploy autonomous agents tailored to your business logic."
      }
    ],
    "isRtl": true
  },
  "es": {
    "heroBadge": "Safi Academy Engineering Division",
    "heroTitle": "Bespoke Enterprise Software & AI Architecture",
    "heroSubtitle": "We architect mission-critical web platforms, fluid mobile apps, high-throughput cloud infrastructure, and autonomous AI agent pipelines built to scale to millions of users.",
    "ctaConsultation": "Schedule Technical Consultation",
    "ctaExplore": "Explore Engineering Services",
    "stat1Val": "99.99%",
    "stat1Label": "Target Uptime SLA",
    "stat2Val": "< 1.2s",
    "stat2Label": "Largest Contentful Paint",
    "stat3Val": "100%",
    "stat3Label": "IP & Code Ownership",
    "stat4Val": "24/7",
    "stat4Label": "Dedicated Technical Support",
    "servicesBadge": "Engineering Capabilities",
    "servicesTitle": "Specialized Software Solutions Built for Uncompromising Scale",
    "servicesSubtitle": "From high-performance frontend interfaces to distributed databases and autonomous agentic AI, our solutions are engineered with strict zero-trust quality.",
    "stackBadge": "Modern Tech Arsenal",
    "stackTitle": "Battle-Tested Technology Stack",
    "stackSubtitle": "We engineer systems with modern, enterprise-proven frameworks and runtimes to guarantee developer velocity, reliability, and security.",
    "stackTabFrontend": "Frontend & UI",
    "stackTabBackend": "Backend & APIs",
    "stackTabMobile": "Mobile Architecture",
    "stackTabDatabase": "Database & Caching",
    "stackTabCloud": "Cloud & DevOps",
    "stackTabAi": "AI & LLM Infra",
    "deliveryBadge": "Agile Blueprint",
    "deliveryTitle": "6-Stage Engineering Delivery Roadmap",
    "deliverySubtitle": "Transparent, milestone-based execution ensuring zero ambiguity, rapid iterations, and predictable delivery dates.",
    "guaranteesBadge": "Client Trust Standards",
    "guaranteesTitle": "Enterprise Client Guarantees",
    "guaranteesSubtitle": "How we protect your intellectual property, data security, and long-term project success.",
    "formBadge": "Technical Inquiry",
    "formTitle": "Request a Proposal or Consultation",
    "formSubtitle": "Tell us about your project requirements. A senior software architect will review your file and respond within 24 hours.",
    "formNameLabel": "Full Name",
    "formNamePlaceholder": "e.g. Ahmad Rahimi",
    "formEmailLabel": "Work Email",
    "formEmailPlaceholder": "name@company.com",
    "formPhoneLabel": "Phone / WhatsApp",
    "formPhonePlaceholder": "+93 799 000 000",
    "formServiceLabel": "Requested Engineering Service",
    "formBudgetLabel": "Estimated Budget Tier",
    "formDetailsLabel": "Project Scope & Technical Requirements",
    "formDetailsPlaceholder": "Describe your project vision, target timeline, technical requirements, and target user base...",
    "formSubmittingBtn": "Transmitting Request...",
    "formSubmitBtn": "Submit Technical Consultation Request",
    "formSuccessTitle": "Consultation Request Received!",
    "formSuccessDesc": "Our senior software engineering team has received your project brief. A technical lead will contact you via WhatsApp or Email within 24 hours.",
    "formErrorDesc": "An error occurred while submitting your inquiry. Please try again or reach out to us directly on WhatsApp or Telegram.",
    "faqsBadge": "FAQ & Inquiries",
    "faqsTitle": "Frequently Answered Questions",
    "services": [
      {
        "id": "web-app",
        "title": "Enterprise Full-Stack Web Applications",
        "badge": "High Concurrency",
        "shortDesc": "Sub-second load times, SEO-optimized server rendering, and scalable component architecture.",
        "longDesc": "We engineer high-performance web platforms using Next.js 14/15, React, TypeScript, and modern edge runtimes. By implementing Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and intelligent edge caching, we guarantee Core Web Vitals with Largest Contentful Paint (LCP) under 1.2 seconds. From multi-tenant SaaS dashboards to complex corporate portals, our web applications scale smoothly to millions of active users.",
        "features": [
          "Next.js App Router & TypeScript Strict Mode",
          "Sub-second TTFB with Global Edge Caching",
          "Enterprise RBAC & SSO (OAuth2 / SAML)",
          "State Management via Zustand & React Query",
          "Responsive Glassmorphic UI with Tailwind CSS",
          "Automated Lighthouse & Performance CI Audits"
        ]
      },
      {
        "id": "mobile-apps",
        "title": "Cross-Platform & Native Mobile Apps",
        "badge": "iOS & Android",
        "shortDesc": "Fluid 60 FPS mobile applications engineered with Flutter and native device integrations.",
        "longDesc": "Deliver a single, pixel-perfect codebase across iOS and Android without sacrificing native performance. Utilizing Flutter, Dart, and native Swift/Kotlin bridging, our mobile applications feature buttery-smooth 60/120 FPS animations, offline-first SQLite/Hive synchronization, biometrics (FaceID/Fingerprint), in-app purchases, and automated deployment pipelines to Apple App Store and Google Play Console.",
        "features": [
          "Flutter & Dart Cross-Platform Architecture",
          "Offline-First SQLite Data Synchronization",
          "Biometric Authentication & Secure Keychain",
          "Low-Latency Push Notifications & Deep Linking",
          "Background Geolocation & Background Tasks",
          "Automated CI/CD App Store Deployment"
        ]
      },
      {
        "id": "backend-cloud",
        "title": "High-Throughput Cloud & Backend Architecture",
        "badge": "Distributed Scale",
        "shortDesc": "Resilient microservices, real-time relational databases, and fault-tolerant cloud APIs.",
        "longDesc": "We build distributed backend systems capable of processing millions of concurrent requests. Built upon Node.js, Go, Python FastAPI, PostgreSQL, Supabase, and Redis caching layers, our systems incorporate strict database connection pooling, asynchronous task queues, and zero-downtime database migrations. Fully containerized with Docker and orchestrated on AWS or GCP for automatic horizontal scaling.",
        "features": [
          "PostgreSQL & Supabase Real-Time Engine",
          "Redis In-Memory Distributed Caching",
          "Go & Node.js Asynchronous Microservices",
          "Docker Containerization & Kubernetes Ready",
          "Strict Schema Validation via Zod & Prisma",
          "Rate Limiting, Anti-DDoS & WAF Protection"
        ]
      },
      {
        "id": "ai-integration",
        "title": "Autonomous AI Agents & LLM Infrastructure",
        "badge": "Next-Gen AI",
        "shortDesc": "Enterprise Retrieval-Augmented Generation (RAG), custom fine-tuning, and automated workflows.",
        "longDesc": "Supercharge your operational efficiency by embedding autonomous AI agents directly into your software workflow. We construct enterprise RAG (Retrieval-Augmented Generation) pipelines, connect proprietary vector databases (pgvector, Pinecone), and integrate state-of-the-art models from OpenAI, Anthropic Claude, and open-source Llama 3. Automate document ingestion, customer support triage, complex data analysis, and code generation.",
        "features": [
          "Enterprise RAG Pipelines with Hybrid Search",
          "Custom Vector Embeddings (pgvector / Pinecone)",
          "Autonomous Task Orchestration & Tool Calling",
          "Multi-Modal Vision, Speech & OCR Pipelines",
          "Hallucination Guardrails & Token Optimization",
          "Private On-Premise LLM Deployments (Ollama)"
        ]
      },
      {
        "id": "fintech-ecommerce",
        "title": "FinTech & E-Commerce Payment Systems",
        "badge": "PCI-DSS Level 1",
        "shortDesc": "High-security payment gateways, ledger accounting, recurring billing, and multi-currency checkout.",
        "longDesc": "FinTech software requires zero room for error. We engineer mission-critical billing engines and transactional ledgers supporting Stripe, PayPal, Apple Pay, and cryptocurrency gateways. Our payment implementations adhere to PCI-DSS Level 1 compliance standards, implement double-entry bookkeeping ledgers to prevent race conditions, and automate recurring subscriptions, usage-based invoicing, and tax calculations.",
        "features": [
          "Stripe Embedded & Custom Checkout Gateways",
          "Double-Entry Accounting Transaction Ledgers",
          "Webhook Event Queue Idempotency & Retries",
          "Multi-Currency Dynamic Conversion & FX Handling",
          "Automated Subscription Lifecycle & Churn Prevention",
          "Real-Time Anti-Fraud & Chargeback Detection"
        ]
      },
      {
        "id": "cybersecurity-audit",
        "title": "Cybersecurity Auditing & Code Hardening",
        "badge": "Zero-Trust",
        "shortDesc": "Vulnerability assessments, penetration testing, source code review, and compliance readiness.",
        "longDesc": "Protect your enterprise from data breaches, intellectual property theft, and zero-day vulnerabilities. Our security engineers perform comprehensive static and dynamic code analysis, automated dependency audits, OWASP Top 10 penetration testing, and IAM role segregation. We architect your infrastructure with zero-trust networking, end-to-end encryption at rest and in transit, and prepare your startup for SOC-2, GDPR, and HIPAA compliance.",
        "features": [
          "OWASP Top 10 Web & API Penetration Testing",
          "Automated Static Analysis (SAST) in CI/CD",
          "End-to-End AES-256 Data Encryption",
          "Zero-Trust Network Access & Strict IAM Roles",
          "Comprehensive Vulnerability Remediation Reports",
          "GDPR, HIPAA & SOC-2 Architecture Alignment"
        ]
      }
    ],
    "deliveryStages": [
      {
        "stage": "01",
        "title": "Technical Discovery & Blueprinting",
        "desc": "We analyze your business model, define user personas, design system entity-relationship diagrams (ERD), map API endpoints, and establish architectural milestones to eliminate ambiguity."
      },
      {
        "stage": "02",
        "title": "Interactive UI/UX & Design Systems",
        "desc": "Our design team creates sleek, high-fidelity clickable Figma prototypes with dark modes, glassmorphism, responsive breakpoints, and micro-interactions before writing a single line of code."
      },
      {
        "stage": "03",
        "title": "Agile Sprints & Bi-Weekly Demos",
        "desc": "Development proceeds in 2-week focused sprints. You receive staging access, automated test reports, and live video demonstrations at every milestone so you maintain total project visibility."
      },
      {
        "stage": "04",
        "title": "Rigorous QA, Security & Load Testing",
        "desc": "Every build undergoes static analysis, cross-browser compatibility checks, OWASP security audits, and simulated stress testing (10,000+ concurrent users) to guarantee fault tolerance."
      },
      {
        "stage": "05",
        "title": "Zero-Downtime Cloud Deployment",
        "desc": "We provision your production cloud infrastructure on AWS, GCP, or Hostinger, configure global CDNs, configure SSL certificates, and execute zero-downtime continuous deployment."
      },
      {
        "stage": "06",
        "title": "24/7 SLA, Monitoring & Code Handoff",
        "desc": "Upon launch, we transfer 100% intellectual property and repositories to you, provide comprehensive documentation, and offer dedicated 24/7 SLA monitoring to support your growth."
      }
    ],
    "clientGuarantees": [
      {
        "title": "100% Full IP & Code Ownership",
        "desc": "You retain full ownership of all source code, design assets, database schemas, and intellectual property. No vendor lock-in; everything is cleanly documented."
      },
      {
        "title": "Strict Non-Disclosure Agreements (NDA)",
        "desc": "We treat your business ideas and proprietary datasets with complete confidentiality. Comprehensive NDAs are signed before discovery discussions."
      },
      {
        "title": "Direct Senior Engineer Communication",
        "desc": "No non-technical account managers or communication bottlenecks. You collaborate directly with lead software engineers via private Slack, WhatsApp, or Teams channels."
      },
      {
        "title": "UK-Registered Enterprise Standards",
        "desc": "Operated with strict international corporate compliance, milestone-based transparent invoicing, and clear legal protections for global founders."
      }
    ],
    "faqs": [
      {
        "q": "How quickly can your engineering team start on my project?",
        "a": "Depending on current sprint allocations, we typically initiate technical discovery and architectural blueprinting within 3 to 5 business days following project agreement and NDA execution."
      },
      {
        "q": "Who owns the code and intellectual property once built?",
        "a": "You do. 100%. Upon completion of project milestones and final sign-off, full copyright, proprietary source code, Git repositories, deployment credentials, and documentation are transferred unconditionally to your company."
      },
      {
        "q": "How are project payments structured?",
        "a": "We operate on transparent, milestone-based payments. Projects are divided into clear deliverables (e.g., Discovery & Architecture, MVP Prototype, Core Backend & APIs, Final Production QA). You only approve payments when working deliverables are reviewed and verified on staging."
      },
      {
        "q": "Can you take over and refactor an existing software codebase?",
        "a": "Yes. Our team frequently conducts comprehensive code audits for startups and legacy systems. We identify technical debt, refactor bottlenecks, upgrade outdated dependencies, patch security vulnerabilities, and migrate to modern Next.js/Go architectures."
      },
      {
        "q": "What happens after our application goes live?",
        "a": "We don't abandon you after launch. Every project includes a post-launch warranty period for bug fixes and stability monitoring. We also provide ongoing monthly Maintenance SLAs covering security patches, feature expansions, and 24/7 cloud uptime monitoring."
      },
      {
        "q": "Do you build custom AI models or just integrate third-party APIs?",
        "a": "We do both. We build advanced RAG (Retrieval-Augmented Generation) pipelines connecting proprietary company data to top LLMs, fine-tune custom open-source models (like Llama 3 or Mistral) on private GPU clusters, and deploy autonomous agents tailored to your business logic."
      }
    ],
    "isRtl": false
  },
  "zh": {
    "heroBadge": "Safi Academy Engineering Division",
    "heroTitle": "Bespoke Enterprise Software & AI Architecture",
    "heroSubtitle": "We architect mission-critical web platforms, fluid mobile apps, high-throughput cloud infrastructure, and autonomous AI agent pipelines built to scale to millions of users.",
    "ctaConsultation": "Schedule Technical Consultation",
    "ctaExplore": "Explore Engineering Services",
    "stat1Val": "99.99%",
    "stat1Label": "Target Uptime SLA",
    "stat2Val": "< 1.2s",
    "stat2Label": "Largest Contentful Paint",
    "stat3Val": "100%",
    "stat3Label": "IP & Code Ownership",
    "stat4Val": "24/7",
    "stat4Label": "Dedicated Technical Support",
    "servicesBadge": "Engineering Capabilities",
    "servicesTitle": "Specialized Software Solutions Built for Uncompromising Scale",
    "servicesSubtitle": "From high-performance frontend interfaces to distributed databases and autonomous agentic AI, our solutions are engineered with strict zero-trust quality.",
    "stackBadge": "Modern Tech Arsenal",
    "stackTitle": "Battle-Tested Technology Stack",
    "stackSubtitle": "We engineer systems with modern, enterprise-proven frameworks and runtimes to guarantee developer velocity, reliability, and security.",
    "stackTabFrontend": "Frontend & UI",
    "stackTabBackend": "Backend & APIs",
    "stackTabMobile": "Mobile Architecture",
    "stackTabDatabase": "Database & Caching",
    "stackTabCloud": "Cloud & DevOps",
    "stackTabAi": "AI & LLM Infra",
    "deliveryBadge": "Agile Blueprint",
    "deliveryTitle": "6-Stage Engineering Delivery Roadmap",
    "deliverySubtitle": "Transparent, milestone-based execution ensuring zero ambiguity, rapid iterations, and predictable delivery dates.",
    "guaranteesBadge": "Client Trust Standards",
    "guaranteesTitle": "Enterprise Client Guarantees",
    "guaranteesSubtitle": "How we protect your intellectual property, data security, and long-term project success.",
    "formBadge": "Technical Inquiry",
    "formTitle": "Request a Proposal or Consultation",
    "formSubtitle": "Tell us about your project requirements. A senior software architect will review your file and respond within 24 hours.",
    "formNameLabel": "Full Name",
    "formNamePlaceholder": "e.g. Ahmad Rahimi",
    "formEmailLabel": "Work Email",
    "formEmailPlaceholder": "name@company.com",
    "formPhoneLabel": "Phone / WhatsApp",
    "formPhonePlaceholder": "+93 799 000 000",
    "formServiceLabel": "Requested Engineering Service",
    "formBudgetLabel": "Estimated Budget Tier",
    "formDetailsLabel": "Project Scope & Technical Requirements",
    "formDetailsPlaceholder": "Describe your project vision, target timeline, technical requirements, and target user base...",
    "formSubmittingBtn": "Transmitting Request...",
    "formSubmitBtn": "Submit Technical Consultation Request",
    "formSuccessTitle": "Consultation Request Received!",
    "formSuccessDesc": "Our senior software engineering team has received your project brief. A technical lead will contact you via WhatsApp or Email within 24 hours.",
    "formErrorDesc": "An error occurred while submitting your inquiry. Please try again or reach out to us directly on WhatsApp or Telegram.",
    "faqsBadge": "FAQ & Inquiries",
    "faqsTitle": "Frequently Answered Questions",
    "services": [
      {
        "id": "web-app",
        "title": "Enterprise Full-Stack Web Applications",
        "badge": "High Concurrency",
        "shortDesc": "Sub-second load times, SEO-optimized server rendering, and scalable component architecture.",
        "longDesc": "We engineer high-performance web platforms using Next.js 14/15, React, TypeScript, and modern edge runtimes. By implementing Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and intelligent edge caching, we guarantee Core Web Vitals with Largest Contentful Paint (LCP) under 1.2 seconds. From multi-tenant SaaS dashboards to complex corporate portals, our web applications scale smoothly to millions of active users.",
        "features": [
          "Next.js App Router & TypeScript Strict Mode",
          "Sub-second TTFB with Global Edge Caching",
          "Enterprise RBAC & SSO (OAuth2 / SAML)",
          "State Management via Zustand & React Query",
          "Responsive Glassmorphic UI with Tailwind CSS",
          "Automated Lighthouse & Performance CI Audits"
        ]
      },
      {
        "id": "mobile-apps",
        "title": "Cross-Platform & Native Mobile Apps",
        "badge": "iOS & Android",
        "shortDesc": "Fluid 60 FPS mobile applications engineered with Flutter and native device integrations.",
        "longDesc": "Deliver a single, pixel-perfect codebase across iOS and Android without sacrificing native performance. Utilizing Flutter, Dart, and native Swift/Kotlin bridging, our mobile applications feature buttery-smooth 60/120 FPS animations, offline-first SQLite/Hive synchronization, biometrics (FaceID/Fingerprint), in-app purchases, and automated deployment pipelines to Apple App Store and Google Play Console.",
        "features": [
          "Flutter & Dart Cross-Platform Architecture",
          "Offline-First SQLite Data Synchronization",
          "Biometric Authentication & Secure Keychain",
          "Low-Latency Push Notifications & Deep Linking",
          "Background Geolocation & Background Tasks",
          "Automated CI/CD App Store Deployment"
        ]
      },
      {
        "id": "backend-cloud",
        "title": "High-Throughput Cloud & Backend Architecture",
        "badge": "Distributed Scale",
        "shortDesc": "Resilient microservices, real-time relational databases, and fault-tolerant cloud APIs.",
        "longDesc": "We build distributed backend systems capable of processing millions of concurrent requests. Built upon Node.js, Go, Python FastAPI, PostgreSQL, Supabase, and Redis caching layers, our systems incorporate strict database connection pooling, asynchronous task queues, and zero-downtime database migrations. Fully containerized with Docker and orchestrated on AWS or GCP for automatic horizontal scaling.",
        "features": [
          "PostgreSQL & Supabase Real-Time Engine",
          "Redis In-Memory Distributed Caching",
          "Go & Node.js Asynchronous Microservices",
          "Docker Containerization & Kubernetes Ready",
          "Strict Schema Validation via Zod & Prisma",
          "Rate Limiting, Anti-DDoS & WAF Protection"
        ]
      },
      {
        "id": "ai-integration",
        "title": "Autonomous AI Agents & LLM Infrastructure",
        "badge": "Next-Gen AI",
        "shortDesc": "Enterprise Retrieval-Augmented Generation (RAG), custom fine-tuning, and automated workflows.",
        "longDesc": "Supercharge your operational efficiency by embedding autonomous AI agents directly into your software workflow. We construct enterprise RAG (Retrieval-Augmented Generation) pipelines, connect proprietary vector databases (pgvector, Pinecone), and integrate state-of-the-art models from OpenAI, Anthropic Claude, and open-source Llama 3. Automate document ingestion, customer support triage, complex data analysis, and code generation.",
        "features": [
          "Enterprise RAG Pipelines with Hybrid Search",
          "Custom Vector Embeddings (pgvector / Pinecone)",
          "Autonomous Task Orchestration & Tool Calling",
          "Multi-Modal Vision, Speech & OCR Pipelines",
          "Hallucination Guardrails & Token Optimization",
          "Private On-Premise LLM Deployments (Ollama)"
        ]
      },
      {
        "id": "fintech-ecommerce",
        "title": "FinTech & E-Commerce Payment Systems",
        "badge": "PCI-DSS Level 1",
        "shortDesc": "High-security payment gateways, ledger accounting, recurring billing, and multi-currency checkout.",
        "longDesc": "FinTech software requires zero room for error. We engineer mission-critical billing engines and transactional ledgers supporting Stripe, PayPal, Apple Pay, and cryptocurrency gateways. Our payment implementations adhere to PCI-DSS Level 1 compliance standards, implement double-entry bookkeeping ledgers to prevent race conditions, and automate recurring subscriptions, usage-based invoicing, and tax calculations.",
        "features": [
          "Stripe Embedded & Custom Checkout Gateways",
          "Double-Entry Accounting Transaction Ledgers",
          "Webhook Event Queue Idempotency & Retries",
          "Multi-Currency Dynamic Conversion & FX Handling",
          "Automated Subscription Lifecycle & Churn Prevention",
          "Real-Time Anti-Fraud & Chargeback Detection"
        ]
      },
      {
        "id": "cybersecurity-audit",
        "title": "Cybersecurity Auditing & Code Hardening",
        "badge": "Zero-Trust",
        "shortDesc": "Vulnerability assessments, penetration testing, source code review, and compliance readiness.",
        "longDesc": "Protect your enterprise from data breaches, intellectual property theft, and zero-day vulnerabilities. Our security engineers perform comprehensive static and dynamic code analysis, automated dependency audits, OWASP Top 10 penetration testing, and IAM role segregation. We architect your infrastructure with zero-trust networking, end-to-end encryption at rest and in transit, and prepare your startup for SOC-2, GDPR, and HIPAA compliance.",
        "features": [
          "OWASP Top 10 Web & API Penetration Testing",
          "Automated Static Analysis (SAST) in CI/CD",
          "End-to-End AES-256 Data Encryption",
          "Zero-Trust Network Access & Strict IAM Roles",
          "Comprehensive Vulnerability Remediation Reports",
          "GDPR, HIPAA & SOC-2 Architecture Alignment"
        ]
      }
    ],
    "deliveryStages": [
      {
        "stage": "01",
        "title": "Technical Discovery & Blueprinting",
        "desc": "We analyze your business model, define user personas, design system entity-relationship diagrams (ERD), map API endpoints, and establish architectural milestones to eliminate ambiguity."
      },
      {
        "stage": "02",
        "title": "Interactive UI/UX & Design Systems",
        "desc": "Our design team creates sleek, high-fidelity clickable Figma prototypes with dark modes, glassmorphism, responsive breakpoints, and micro-interactions before writing a single line of code."
      },
      {
        "stage": "03",
        "title": "Agile Sprints & Bi-Weekly Demos",
        "desc": "Development proceeds in 2-week focused sprints. You receive staging access, automated test reports, and live video demonstrations at every milestone so you maintain total project visibility."
      },
      {
        "stage": "04",
        "title": "Rigorous QA, Security & Load Testing",
        "desc": "Every build undergoes static analysis, cross-browser compatibility checks, OWASP security audits, and simulated stress testing (10,000+ concurrent users) to guarantee fault tolerance."
      },
      {
        "stage": "05",
        "title": "Zero-Downtime Cloud Deployment",
        "desc": "We provision your production cloud infrastructure on AWS, GCP, or Hostinger, configure global CDNs, configure SSL certificates, and execute zero-downtime continuous deployment."
      },
      {
        "stage": "06",
        "title": "24/7 SLA, Monitoring & Code Handoff",
        "desc": "Upon launch, we transfer 100% intellectual property and repositories to you, provide comprehensive documentation, and offer dedicated 24/7 SLA monitoring to support your growth."
      }
    ],
    "clientGuarantees": [
      {
        "title": "100% Full IP & Code Ownership",
        "desc": "You retain full ownership of all source code, design assets, database schemas, and intellectual property. No vendor lock-in; everything is cleanly documented."
      },
      {
        "title": "Strict Non-Disclosure Agreements (NDA)",
        "desc": "We treat your business ideas and proprietary datasets with complete confidentiality. Comprehensive NDAs are signed before discovery discussions."
      },
      {
        "title": "Direct Senior Engineer Communication",
        "desc": "No non-technical account managers or communication bottlenecks. You collaborate directly with lead software engineers via private Slack, WhatsApp, or Teams channels."
      },
      {
        "title": "UK-Registered Enterprise Standards",
        "desc": "Operated with strict international corporate compliance, milestone-based transparent invoicing, and clear legal protections for global founders."
      }
    ],
    "faqs": [
      {
        "q": "How quickly can your engineering team start on my project?",
        "a": "Depending on current sprint allocations, we typically initiate technical discovery and architectural blueprinting within 3 to 5 business days following project agreement and NDA execution."
      },
      {
        "q": "Who owns the code and intellectual property once built?",
        "a": "You do. 100%. Upon completion of project milestones and final sign-off, full copyright, proprietary source code, Git repositories, deployment credentials, and documentation are transferred unconditionally to your company."
      },
      {
        "q": "How are project payments structured?",
        "a": "We operate on transparent, milestone-based payments. Projects are divided into clear deliverables (e.g., Discovery & Architecture, MVP Prototype, Core Backend & APIs, Final Production QA). You only approve payments when working deliverables are reviewed and verified on staging."
      },
      {
        "q": "Can you take over and refactor an existing software codebase?",
        "a": "Yes. Our team frequently conducts comprehensive code audits for startups and legacy systems. We identify technical debt, refactor bottlenecks, upgrade outdated dependencies, patch security vulnerabilities, and migrate to modern Next.js/Go architectures."
      },
      {
        "q": "What happens after our application goes live?",
        "a": "We don't abandon you after launch. Every project includes a post-launch warranty period for bug fixes and stability monitoring. We also provide ongoing monthly Maintenance SLAs covering security patches, feature expansions, and 24/7 cloud uptime monitoring."
      },
      {
        "q": "Do you build custom AI models or just integrate third-party APIs?",
        "a": "We do both. We build advanced RAG (Retrieval-Augmented Generation) pipelines connecting proprietary company data to top LLMs, fine-tune custom open-source models (like Llama 3 or Mistral) on private GPU clusters, and deploy autonomous agents tailored to your business logic."
      }
    ],
    "isRtl": false
  },
  "hi": {
    "heroBadge": "Safi Academy Engineering Division",
    "heroTitle": "Bespoke Enterprise Software & AI Architecture",
    "heroSubtitle": "We architect mission-critical web platforms, fluid mobile apps, high-throughput cloud infrastructure, and autonomous AI agent pipelines built to scale to millions of users.",
    "ctaConsultation": "Schedule Technical Consultation",
    "ctaExplore": "Explore Engineering Services",
    "stat1Val": "99.99%",
    "stat1Label": "Target Uptime SLA",
    "stat2Val": "< 1.2s",
    "stat2Label": "Largest Contentful Paint",
    "stat3Val": "100%",
    "stat3Label": "IP & Code Ownership",
    "stat4Val": "24/7",
    "stat4Label": "Dedicated Technical Support",
    "servicesBadge": "Engineering Capabilities",
    "servicesTitle": "Specialized Software Solutions Built for Uncompromising Scale",
    "servicesSubtitle": "From high-performance frontend interfaces to distributed databases and autonomous agentic AI, our solutions are engineered with strict zero-trust quality.",
    "stackBadge": "Modern Tech Arsenal",
    "stackTitle": "Battle-Tested Technology Stack",
    "stackSubtitle": "We engineer systems with modern, enterprise-proven frameworks and runtimes to guarantee developer velocity, reliability, and security.",
    "stackTabFrontend": "Frontend & UI",
    "stackTabBackend": "Backend & APIs",
    "stackTabMobile": "Mobile Architecture",
    "stackTabDatabase": "Database & Caching",
    "stackTabCloud": "Cloud & DevOps",
    "stackTabAi": "AI & LLM Infra",
    "deliveryBadge": "Agile Blueprint",
    "deliveryTitle": "6-Stage Engineering Delivery Roadmap",
    "deliverySubtitle": "Transparent, milestone-based execution ensuring zero ambiguity, rapid iterations, and predictable delivery dates.",
    "guaranteesBadge": "Client Trust Standards",
    "guaranteesTitle": "Enterprise Client Guarantees",
    "guaranteesSubtitle": "How we protect your intellectual property, data security, and long-term project success.",
    "formBadge": "Technical Inquiry",
    "formTitle": "Request a Proposal or Consultation",
    "formSubtitle": "Tell us about your project requirements. A senior software architect will review your file and respond within 24 hours.",
    "formNameLabel": "Full Name",
    "formNamePlaceholder": "e.g. Ahmad Rahimi",
    "formEmailLabel": "Work Email",
    "formEmailPlaceholder": "name@company.com",
    "formPhoneLabel": "Phone / WhatsApp",
    "formPhonePlaceholder": "+93 799 000 000",
    "formServiceLabel": "Requested Engineering Service",
    "formBudgetLabel": "Estimated Budget Tier",
    "formDetailsLabel": "Project Scope & Technical Requirements",
    "formDetailsPlaceholder": "Describe your project vision, target timeline, technical requirements, and target user base...",
    "formSubmittingBtn": "Transmitting Request...",
    "formSubmitBtn": "Submit Technical Consultation Request",
    "formSuccessTitle": "Consultation Request Received!",
    "formSuccessDesc": "Our senior software engineering team has received your project brief. A technical lead will contact you via WhatsApp or Email within 24 hours.",
    "formErrorDesc": "An error occurred while submitting your inquiry. Please try again or reach out to us directly on WhatsApp or Telegram.",
    "faqsBadge": "FAQ & Inquiries",
    "faqsTitle": "Frequently Answered Questions",
    "services": [
      {
        "id": "web-app",
        "title": "Enterprise Full-Stack Web Applications",
        "badge": "High Concurrency",
        "shortDesc": "Sub-second load times, SEO-optimized server rendering, and scalable component architecture.",
        "longDesc": "We engineer high-performance web platforms using Next.js 14/15, React, TypeScript, and modern edge runtimes. By implementing Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and intelligent edge caching, we guarantee Core Web Vitals with Largest Contentful Paint (LCP) under 1.2 seconds. From multi-tenant SaaS dashboards to complex corporate portals, our web applications scale smoothly to millions of active users.",
        "features": [
          "Next.js App Router & TypeScript Strict Mode",
          "Sub-second TTFB with Global Edge Caching",
          "Enterprise RBAC & SSO (OAuth2 / SAML)",
          "State Management via Zustand & React Query",
          "Responsive Glassmorphic UI with Tailwind CSS",
          "Automated Lighthouse & Performance CI Audits"
        ]
      },
      {
        "id": "mobile-apps",
        "title": "Cross-Platform & Native Mobile Apps",
        "badge": "iOS & Android",
        "shortDesc": "Fluid 60 FPS mobile applications engineered with Flutter and native device integrations.",
        "longDesc": "Deliver a single, pixel-perfect codebase across iOS and Android without sacrificing native performance. Utilizing Flutter, Dart, and native Swift/Kotlin bridging, our mobile applications feature buttery-smooth 60/120 FPS animations, offline-first SQLite/Hive synchronization, biometrics (FaceID/Fingerprint), in-app purchases, and automated deployment pipelines to Apple App Store and Google Play Console.",
        "features": [
          "Flutter & Dart Cross-Platform Architecture",
          "Offline-First SQLite Data Synchronization",
          "Biometric Authentication & Secure Keychain",
          "Low-Latency Push Notifications & Deep Linking",
          "Background Geolocation & Background Tasks",
          "Automated CI/CD App Store Deployment"
        ]
      },
      {
        "id": "backend-cloud",
        "title": "High-Throughput Cloud & Backend Architecture",
        "badge": "Distributed Scale",
        "shortDesc": "Resilient microservices, real-time relational databases, and fault-tolerant cloud APIs.",
        "longDesc": "We build distributed backend systems capable of processing millions of concurrent requests. Built upon Node.js, Go, Python FastAPI, PostgreSQL, Supabase, and Redis caching layers, our systems incorporate strict database connection pooling, asynchronous task queues, and zero-downtime database migrations. Fully containerized with Docker and orchestrated on AWS or GCP for automatic horizontal scaling.",
        "features": [
          "PostgreSQL & Supabase Real-Time Engine",
          "Redis In-Memory Distributed Caching",
          "Go & Node.js Asynchronous Microservices",
          "Docker Containerization & Kubernetes Ready",
          "Strict Schema Validation via Zod & Prisma",
          "Rate Limiting, Anti-DDoS & WAF Protection"
        ]
      },
      {
        "id": "ai-integration",
        "title": "Autonomous AI Agents & LLM Infrastructure",
        "badge": "Next-Gen AI",
        "shortDesc": "Enterprise Retrieval-Augmented Generation (RAG), custom fine-tuning, and automated workflows.",
        "longDesc": "Supercharge your operational efficiency by embedding autonomous AI agents directly into your software workflow. We construct enterprise RAG (Retrieval-Augmented Generation) pipelines, connect proprietary vector databases (pgvector, Pinecone), and integrate state-of-the-art models from OpenAI, Anthropic Claude, and open-source Llama 3. Automate document ingestion, customer support triage, complex data analysis, and code generation.",
        "features": [
          "Enterprise RAG Pipelines with Hybrid Search",
          "Custom Vector Embeddings (pgvector / Pinecone)",
          "Autonomous Task Orchestration & Tool Calling",
          "Multi-Modal Vision, Speech & OCR Pipelines",
          "Hallucination Guardrails & Token Optimization",
          "Private On-Premise LLM Deployments (Ollama)"
        ]
      },
      {
        "id": "fintech-ecommerce",
        "title": "FinTech & E-Commerce Payment Systems",
        "badge": "PCI-DSS Level 1",
        "shortDesc": "High-security payment gateways, ledger accounting, recurring billing, and multi-currency checkout.",
        "longDesc": "FinTech software requires zero room for error. We engineer mission-critical billing engines and transactional ledgers supporting Stripe, PayPal, Apple Pay, and cryptocurrency gateways. Our payment implementations adhere to PCI-DSS Level 1 compliance standards, implement double-entry bookkeeping ledgers to prevent race conditions, and automate recurring subscriptions, usage-based invoicing, and tax calculations.",
        "features": [
          "Stripe Embedded & Custom Checkout Gateways",
          "Double-Entry Accounting Transaction Ledgers",
          "Webhook Event Queue Idempotency & Retries",
          "Multi-Currency Dynamic Conversion & FX Handling",
          "Automated Subscription Lifecycle & Churn Prevention",
          "Real-Time Anti-Fraud & Chargeback Detection"
        ]
      },
      {
        "id": "cybersecurity-audit",
        "title": "Cybersecurity Auditing & Code Hardening",
        "badge": "Zero-Trust",
        "shortDesc": "Vulnerability assessments, penetration testing, source code review, and compliance readiness.",
        "longDesc": "Protect your enterprise from data breaches, intellectual property theft, and zero-day vulnerabilities. Our security engineers perform comprehensive static and dynamic code analysis, automated dependency audits, OWASP Top 10 penetration testing, and IAM role segregation. We architect your infrastructure with zero-trust networking, end-to-end encryption at rest and in transit, and prepare your startup for SOC-2, GDPR, and HIPAA compliance.",
        "features": [
          "OWASP Top 10 Web & API Penetration Testing",
          "Automated Static Analysis (SAST) in CI/CD",
          "End-to-End AES-256 Data Encryption",
          "Zero-Trust Network Access & Strict IAM Roles",
          "Comprehensive Vulnerability Remediation Reports",
          "GDPR, HIPAA & SOC-2 Architecture Alignment"
        ]
      }
    ],
    "deliveryStages": [
      {
        "stage": "01",
        "title": "Technical Discovery & Blueprinting",
        "desc": "We analyze your business model, define user personas, design system entity-relationship diagrams (ERD), map API endpoints, and establish architectural milestones to eliminate ambiguity."
      },
      {
        "stage": "02",
        "title": "Interactive UI/UX & Design Systems",
        "desc": "Our design team creates sleek, high-fidelity clickable Figma prototypes with dark modes, glassmorphism, responsive breakpoints, and micro-interactions before writing a single line of code."
      },
      {
        "stage": "03",
        "title": "Agile Sprints & Bi-Weekly Demos",
        "desc": "Development proceeds in 2-week focused sprints. You receive staging access, automated test reports, and live video demonstrations at every milestone so you maintain total project visibility."
      },
      {
        "stage": "04",
        "title": "Rigorous QA, Security & Load Testing",
        "desc": "Every build undergoes static analysis, cross-browser compatibility checks, OWASP security audits, and simulated stress testing (10,000+ concurrent users) to guarantee fault tolerance."
      },
      {
        "stage": "05",
        "title": "Zero-Downtime Cloud Deployment",
        "desc": "We provision your production cloud infrastructure on AWS, GCP, or Hostinger, configure global CDNs, configure SSL certificates, and execute zero-downtime continuous deployment."
      },
      {
        "stage": "06",
        "title": "24/7 SLA, Monitoring & Code Handoff",
        "desc": "Upon launch, we transfer 100% intellectual property and repositories to you, provide comprehensive documentation, and offer dedicated 24/7 SLA monitoring to support your growth."
      }
    ],
    "clientGuarantees": [
      {
        "title": "100% Full IP & Code Ownership",
        "desc": "You retain full ownership of all source code, design assets, database schemas, and intellectual property. No vendor lock-in; everything is cleanly documented."
      },
      {
        "title": "Strict Non-Disclosure Agreements (NDA)",
        "desc": "We treat your business ideas and proprietary datasets with complete confidentiality. Comprehensive NDAs are signed before discovery discussions."
      },
      {
        "title": "Direct Senior Engineer Communication",
        "desc": "No non-technical account managers or communication bottlenecks. You collaborate directly with lead software engineers via private Slack, WhatsApp, or Teams channels."
      },
      {
        "title": "UK-Registered Enterprise Standards",
        "desc": "Operated with strict international corporate compliance, milestone-based transparent invoicing, and clear legal protections for global founders."
      }
    ],
    "faqs": [
      {
        "q": "How quickly can your engineering team start on my project?",
        "a": "Depending on current sprint allocations, we typically initiate technical discovery and architectural blueprinting within 3 to 5 business days following project agreement and NDA execution."
      },
      {
        "q": "Who owns the code and intellectual property once built?",
        "a": "You do. 100%. Upon completion of project milestones and final sign-off, full copyright, proprietary source code, Git repositories, deployment credentials, and documentation are transferred unconditionally to your company."
      },
      {
        "q": "How are project payments structured?",
        "a": "We operate on transparent, milestone-based payments. Projects are divided into clear deliverables (e.g., Discovery & Architecture, MVP Prototype, Core Backend & APIs, Final Production QA). You only approve payments when working deliverables are reviewed and verified on staging."
      },
      {
        "q": "Can you take over and refactor an existing software codebase?",
        "a": "Yes. Our team frequently conducts comprehensive code audits for startups and legacy systems. We identify technical debt, refactor bottlenecks, upgrade outdated dependencies, patch security vulnerabilities, and migrate to modern Next.js/Go architectures."
      },
      {
        "q": "What happens after our application goes live?",
        "a": "We don't abandon you after launch. Every project includes a post-launch warranty period for bug fixes and stability monitoring. We also provide ongoing monthly Maintenance SLAs covering security patches, feature expansions, and 24/7 cloud uptime monitoring."
      },
      {
        "q": "Do you build custom AI models or just integrate third-party APIs?",
        "a": "We do both. We build advanced RAG (Retrieval-Augmented Generation) pipelines connecting proprietary company data to top LLMs, fine-tune custom open-source models (like Llama 3 or Mistral) on private GPU clusters, and deploy autonomous agents tailored to your business logic."
      }
    ],
    "isRtl": false
  },
  "it": {
    "heroBadge": "Safi Academy Engineering Division",
    "heroTitle": "Bespoke Enterprise Software & AI Architecture",
    "heroSubtitle": "We architect mission-critical web platforms, fluid mobile apps, high-throughput cloud infrastructure, and autonomous AI agent pipelines built to scale to millions of users.",
    "ctaConsultation": "Schedule Technical Consultation",
    "ctaExplore": "Explore Engineering Services",
    "stat1Val": "99.99%",
    "stat1Label": "Target Uptime SLA",
    "stat2Val": "< 1.2s",
    "stat2Label": "Largest Contentful Paint",
    "stat3Val": "100%",
    "stat3Label": "IP & Code Ownership",
    "stat4Val": "24/7",
    "stat4Label": "Dedicated Technical Support",
    "servicesBadge": "Engineering Capabilities",
    "servicesTitle": "Specialized Software Solutions Built for Uncompromising Scale",
    "servicesSubtitle": "From high-performance frontend interfaces to distributed databases and autonomous agentic AI, our solutions are engineered with strict zero-trust quality.",
    "stackBadge": "Modern Tech Arsenal",
    "stackTitle": "Battle-Tested Technology Stack",
    "stackSubtitle": "We engineer systems with modern, enterprise-proven frameworks and runtimes to guarantee developer velocity, reliability, and security.",
    "stackTabFrontend": "Frontend & UI",
    "stackTabBackend": "Backend & APIs",
    "stackTabMobile": "Mobile Architecture",
    "stackTabDatabase": "Database & Caching",
    "stackTabCloud": "Cloud & DevOps",
    "stackTabAi": "AI & LLM Infra",
    "deliveryBadge": "Agile Blueprint",
    "deliveryTitle": "6-Stage Engineering Delivery Roadmap",
    "deliverySubtitle": "Transparent, milestone-based execution ensuring zero ambiguity, rapid iterations, and predictable delivery dates.",
    "guaranteesBadge": "Client Trust Standards",
    "guaranteesTitle": "Enterprise Client Guarantees",
    "guaranteesSubtitle": "How we protect your intellectual property, data security, and long-term project success.",
    "formBadge": "Technical Inquiry",
    "formTitle": "Request a Proposal or Consultation",
    "formSubtitle": "Tell us about your project requirements. A senior software architect will review your file and respond within 24 hours.",
    "formNameLabel": "Full Name",
    "formNamePlaceholder": "e.g. Ahmad Rahimi",
    "formEmailLabel": "Work Email",
    "formEmailPlaceholder": "name@company.com",
    "formPhoneLabel": "Phone / WhatsApp",
    "formPhonePlaceholder": "+93 799 000 000",
    "formServiceLabel": "Requested Engineering Service",
    "formBudgetLabel": "Estimated Budget Tier",
    "formDetailsLabel": "Project Scope & Technical Requirements",
    "formDetailsPlaceholder": "Describe your project vision, target timeline, technical requirements, and target user base...",
    "formSubmittingBtn": "Transmitting Request...",
    "formSubmitBtn": "Submit Technical Consultation Request",
    "formSuccessTitle": "Consultation Request Received!",
    "formSuccessDesc": "Our senior software engineering team has received your project brief. A technical lead will contact you via WhatsApp or Email within 24 hours.",
    "formErrorDesc": "An error occurred while submitting your inquiry. Please try again or reach out to us directly on WhatsApp or Telegram.",
    "faqsBadge": "FAQ & Inquiries",
    "faqsTitle": "Frequently Answered Questions",
    "services": [
      {
        "id": "web-app",
        "title": "Enterprise Full-Stack Web Applications",
        "badge": "High Concurrency",
        "shortDesc": "Sub-second load times, SEO-optimized server rendering, and scalable component architecture.",
        "longDesc": "We engineer high-performance web platforms using Next.js 14/15, React, TypeScript, and modern edge runtimes. By implementing Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and intelligent edge caching, we guarantee Core Web Vitals with Largest Contentful Paint (LCP) under 1.2 seconds. From multi-tenant SaaS dashboards to complex corporate portals, our web applications scale smoothly to millions of active users.",
        "features": [
          "Next.js App Router & TypeScript Strict Mode",
          "Sub-second TTFB with Global Edge Caching",
          "Enterprise RBAC & SSO (OAuth2 / SAML)",
          "State Management via Zustand & React Query",
          "Responsive Glassmorphic UI with Tailwind CSS",
          "Automated Lighthouse & Performance CI Audits"
        ]
      },
      {
        "id": "mobile-apps",
        "title": "Cross-Platform & Native Mobile Apps",
        "badge": "iOS & Android",
        "shortDesc": "Fluid 60 FPS mobile applications engineered with Flutter and native device integrations.",
        "longDesc": "Deliver a single, pixel-perfect codebase across iOS and Android without sacrificing native performance. Utilizing Flutter, Dart, and native Swift/Kotlin bridging, our mobile applications feature buttery-smooth 60/120 FPS animations, offline-first SQLite/Hive synchronization, biometrics (FaceID/Fingerprint), in-app purchases, and automated deployment pipelines to Apple App Store and Google Play Console.",
        "features": [
          "Flutter & Dart Cross-Platform Architecture",
          "Offline-First SQLite Data Synchronization",
          "Biometric Authentication & Secure Keychain",
          "Low-Latency Push Notifications & Deep Linking",
          "Background Geolocation & Background Tasks",
          "Automated CI/CD App Store Deployment"
        ]
      },
      {
        "id": "backend-cloud",
        "title": "High-Throughput Cloud & Backend Architecture",
        "badge": "Distributed Scale",
        "shortDesc": "Resilient microservices, real-time relational databases, and fault-tolerant cloud APIs.",
        "longDesc": "We build distributed backend systems capable of processing millions of concurrent requests. Built upon Node.js, Go, Python FastAPI, PostgreSQL, Supabase, and Redis caching layers, our systems incorporate strict database connection pooling, asynchronous task queues, and zero-downtime database migrations. Fully containerized with Docker and orchestrated on AWS or GCP for automatic horizontal scaling.",
        "features": [
          "PostgreSQL & Supabase Real-Time Engine",
          "Redis In-Memory Distributed Caching",
          "Go & Node.js Asynchronous Microservices",
          "Docker Containerization & Kubernetes Ready",
          "Strict Schema Validation via Zod & Prisma",
          "Rate Limiting, Anti-DDoS & WAF Protection"
        ]
      },
      {
        "id": "ai-integration",
        "title": "Autonomous AI Agents & LLM Infrastructure",
        "badge": "Next-Gen AI",
        "shortDesc": "Enterprise Retrieval-Augmented Generation (RAG), custom fine-tuning, and automated workflows.",
        "longDesc": "Supercharge your operational efficiency by embedding autonomous AI agents directly into your software workflow. We construct enterprise RAG (Retrieval-Augmented Generation) pipelines, connect proprietary vector databases (pgvector, Pinecone), and integrate state-of-the-art models from OpenAI, Anthropic Claude, and open-source Llama 3. Automate document ingestion, customer support triage, complex data analysis, and code generation.",
        "features": [
          "Enterprise RAG Pipelines with Hybrid Search",
          "Custom Vector Embeddings (pgvector / Pinecone)",
          "Autonomous Task Orchestration & Tool Calling",
          "Multi-Modal Vision, Speech & OCR Pipelines",
          "Hallucination Guardrails & Token Optimization",
          "Private On-Premise LLM Deployments (Ollama)"
        ]
      },
      {
        "id": "fintech-ecommerce",
        "title": "FinTech & E-Commerce Payment Systems",
        "badge": "PCI-DSS Level 1",
        "shortDesc": "High-security payment gateways, ledger accounting, recurring billing, and multi-currency checkout.",
        "longDesc": "FinTech software requires zero room for error. We engineer mission-critical billing engines and transactional ledgers supporting Stripe, PayPal, Apple Pay, and cryptocurrency gateways. Our payment implementations adhere to PCI-DSS Level 1 compliance standards, implement double-entry bookkeeping ledgers to prevent race conditions, and automate recurring subscriptions, usage-based invoicing, and tax calculations.",
        "features": [
          "Stripe Embedded & Custom Checkout Gateways",
          "Double-Entry Accounting Transaction Ledgers",
          "Webhook Event Queue Idempotency & Retries",
          "Multi-Currency Dynamic Conversion & FX Handling",
          "Automated Subscription Lifecycle & Churn Prevention",
          "Real-Time Anti-Fraud & Chargeback Detection"
        ]
      },
      {
        "id": "cybersecurity-audit",
        "title": "Cybersecurity Auditing & Code Hardening",
        "badge": "Zero-Trust",
        "shortDesc": "Vulnerability assessments, penetration testing, source code review, and compliance readiness.",
        "longDesc": "Protect your enterprise from data breaches, intellectual property theft, and zero-day vulnerabilities. Our security engineers perform comprehensive static and dynamic code analysis, automated dependency audits, OWASP Top 10 penetration testing, and IAM role segregation. We architect your infrastructure with zero-trust networking, end-to-end encryption at rest and in transit, and prepare your startup for SOC-2, GDPR, and HIPAA compliance.",
        "features": [
          "OWASP Top 10 Web & API Penetration Testing",
          "Automated Static Analysis (SAST) in CI/CD",
          "End-to-End AES-256 Data Encryption",
          "Zero-Trust Network Access & Strict IAM Roles",
          "Comprehensive Vulnerability Remediation Reports",
          "GDPR, HIPAA & SOC-2 Architecture Alignment"
        ]
      }
    ],
    "deliveryStages": [
      {
        "stage": "01",
        "title": "Technical Discovery & Blueprinting",
        "desc": "We analyze your business model, define user personas, design system entity-relationship diagrams (ERD), map API endpoints, and establish architectural milestones to eliminate ambiguity."
      },
      {
        "stage": "02",
        "title": "Interactive UI/UX & Design Systems",
        "desc": "Our design team creates sleek, high-fidelity clickable Figma prototypes with dark modes, glassmorphism, responsive breakpoints, and micro-interactions before writing a single line of code."
      },
      {
        "stage": "03",
        "title": "Agile Sprints & Bi-Weekly Demos",
        "desc": "Development proceeds in 2-week focused sprints. You receive staging access, automated test reports, and live video demonstrations at every milestone so you maintain total project visibility."
      },
      {
        "stage": "04",
        "title": "Rigorous QA, Security & Load Testing",
        "desc": "Every build undergoes static analysis, cross-browser compatibility checks, OWASP security audits, and simulated stress testing (10,000+ concurrent users) to guarantee fault tolerance."
      },
      {
        "stage": "05",
        "title": "Zero-Downtime Cloud Deployment",
        "desc": "We provision your production cloud infrastructure on AWS, GCP, or Hostinger, configure global CDNs, configure SSL certificates, and execute zero-downtime continuous deployment."
      },
      {
        "stage": "06",
        "title": "24/7 SLA, Monitoring & Code Handoff",
        "desc": "Upon launch, we transfer 100% intellectual property and repositories to you, provide comprehensive documentation, and offer dedicated 24/7 SLA monitoring to support your growth."
      }
    ],
    "clientGuarantees": [
      {
        "title": "100% Full IP & Code Ownership",
        "desc": "You retain full ownership of all source code, design assets, database schemas, and intellectual property. No vendor lock-in; everything is cleanly documented."
      },
      {
        "title": "Strict Non-Disclosure Agreements (NDA)",
        "desc": "We treat your business ideas and proprietary datasets with complete confidentiality. Comprehensive NDAs are signed before discovery discussions."
      },
      {
        "title": "Direct Senior Engineer Communication",
        "desc": "No non-technical account managers or communication bottlenecks. You collaborate directly with lead software engineers via private Slack, WhatsApp, or Teams channels."
      },
      {
        "title": "UK-Registered Enterprise Standards",
        "desc": "Operated with strict international corporate compliance, milestone-based transparent invoicing, and clear legal protections for global founders."
      }
    ],
    "faqs": [
      {
        "q": "How quickly can your engineering team start on my project?",
        "a": "Depending on current sprint allocations, we typically initiate technical discovery and architectural blueprinting within 3 to 5 business days following project agreement and NDA execution."
      },
      {
        "q": "Who owns the code and intellectual property once built?",
        "a": "You do. 100%. Upon completion of project milestones and final sign-off, full copyright, proprietary source code, Git repositories, deployment credentials, and documentation are transferred unconditionally to your company."
      },
      {
        "q": "How are project payments structured?",
        "a": "We operate on transparent, milestone-based payments. Projects are divided into clear deliverables (e.g., Discovery & Architecture, MVP Prototype, Core Backend & APIs, Final Production QA). You only approve payments when working deliverables are reviewed and verified on staging."
      },
      {
        "q": "Can you take over and refactor an existing software codebase?",
        "a": "Yes. Our team frequently conducts comprehensive code audits for startups and legacy systems. We identify technical debt, refactor bottlenecks, upgrade outdated dependencies, patch security vulnerabilities, and migrate to modern Next.js/Go architectures."
      },
      {
        "q": "What happens after our application goes live?",
        "a": "We don't abandon you after launch. Every project includes a post-launch warranty period for bug fixes and stability monitoring. We also provide ongoing monthly Maintenance SLAs covering security patches, feature expansions, and 24/7 cloud uptime monitoring."
      },
      {
        "q": "Do you build custom AI models or just integrate third-party APIs?",
        "a": "We do both. We build advanced RAG (Retrieval-Augmented Generation) pipelines connecting proprietary company data to top LLMs, fine-tune custom open-source models (like Llama 3 or Mistral) on private GPU clusters, and deploy autonomous agents tailored to your business logic."
      }
    ],
    "isRtl": false
  },
  "pt": {
    "heroBadge": "Safi Academy Engineering Division",
    "heroTitle": "Bespoke Enterprise Software & AI Architecture",
    "heroSubtitle": "We architect mission-critical web platforms, fluid mobile apps, high-throughput cloud infrastructure, and autonomous AI agent pipelines built to scale to millions of users.",
    "ctaConsultation": "Schedule Technical Consultation",
    "ctaExplore": "Explore Engineering Services",
    "stat1Val": "99.99%",
    "stat1Label": "Target Uptime SLA",
    "stat2Val": "< 1.2s",
    "stat2Label": "Largest Contentful Paint",
    "stat3Val": "100%",
    "stat3Label": "IP & Code Ownership",
    "stat4Val": "24/7",
    "stat4Label": "Dedicated Technical Support",
    "servicesBadge": "Engineering Capabilities",
    "servicesTitle": "Specialized Software Solutions Built for Uncompromising Scale",
    "servicesSubtitle": "From high-performance frontend interfaces to distributed databases and autonomous agentic AI, our solutions are engineered with strict zero-trust quality.",
    "stackBadge": "Modern Tech Arsenal",
    "stackTitle": "Battle-Tested Technology Stack",
    "stackSubtitle": "We engineer systems with modern, enterprise-proven frameworks and runtimes to guarantee developer velocity, reliability, and security.",
    "stackTabFrontend": "Frontend & UI",
    "stackTabBackend": "Backend & APIs",
    "stackTabMobile": "Mobile Architecture",
    "stackTabDatabase": "Database & Caching",
    "stackTabCloud": "Cloud & DevOps",
    "stackTabAi": "AI & LLM Infra",
    "deliveryBadge": "Agile Blueprint",
    "deliveryTitle": "6-Stage Engineering Delivery Roadmap",
    "deliverySubtitle": "Transparent, milestone-based execution ensuring zero ambiguity, rapid iterations, and predictable delivery dates.",
    "guaranteesBadge": "Client Trust Standards",
    "guaranteesTitle": "Enterprise Client Guarantees",
    "guaranteesSubtitle": "How we protect your intellectual property, data security, and long-term project success.",
    "formBadge": "Technical Inquiry",
    "formTitle": "Request a Proposal or Consultation",
    "formSubtitle": "Tell us about your project requirements. A senior software architect will review your file and respond within 24 hours.",
    "formNameLabel": "Full Name",
    "formNamePlaceholder": "e.g. Ahmad Rahimi",
    "formEmailLabel": "Work Email",
    "formEmailPlaceholder": "name@company.com",
    "formPhoneLabel": "Phone / WhatsApp",
    "formPhonePlaceholder": "+93 799 000 000",
    "formServiceLabel": "Requested Engineering Service",
    "formBudgetLabel": "Estimated Budget Tier",
    "formDetailsLabel": "Project Scope & Technical Requirements",
    "formDetailsPlaceholder": "Describe your project vision, target timeline, technical requirements, and target user base...",
    "formSubmittingBtn": "Transmitting Request...",
    "formSubmitBtn": "Submit Technical Consultation Request",
    "formSuccessTitle": "Consultation Request Received!",
    "formSuccessDesc": "Our senior software engineering team has received your project brief. A technical lead will contact you via WhatsApp or Email within 24 hours.",
    "formErrorDesc": "An error occurred while submitting your inquiry. Please try again or reach out to us directly on WhatsApp or Telegram.",
    "faqsBadge": "FAQ & Inquiries",
    "faqsTitle": "Frequently Answered Questions",
    "services": [
      {
        "id": "web-app",
        "title": "Enterprise Full-Stack Web Applications",
        "badge": "High Concurrency",
        "shortDesc": "Sub-second load times, SEO-optimized server rendering, and scalable component architecture.",
        "longDesc": "We engineer high-performance web platforms using Next.js 14/15, React, TypeScript, and modern edge runtimes. By implementing Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and intelligent edge caching, we guarantee Core Web Vitals with Largest Contentful Paint (LCP) under 1.2 seconds. From multi-tenant SaaS dashboards to complex corporate portals, our web applications scale smoothly to millions of active users.",
        "features": [
          "Next.js App Router & TypeScript Strict Mode",
          "Sub-second TTFB with Global Edge Caching",
          "Enterprise RBAC & SSO (OAuth2 / SAML)",
          "State Management via Zustand & React Query",
          "Responsive Glassmorphic UI with Tailwind CSS",
          "Automated Lighthouse & Performance CI Audits"
        ]
      },
      {
        "id": "mobile-apps",
        "title": "Cross-Platform & Native Mobile Apps",
        "badge": "iOS & Android",
        "shortDesc": "Fluid 60 FPS mobile applications engineered with Flutter and native device integrations.",
        "longDesc": "Deliver a single, pixel-perfect codebase across iOS and Android without sacrificing native performance. Utilizing Flutter, Dart, and native Swift/Kotlin bridging, our mobile applications feature buttery-smooth 60/120 FPS animations, offline-first SQLite/Hive synchronization, biometrics (FaceID/Fingerprint), in-app purchases, and automated deployment pipelines to Apple App Store and Google Play Console.",
        "features": [
          "Flutter & Dart Cross-Platform Architecture",
          "Offline-First SQLite Data Synchronization",
          "Biometric Authentication & Secure Keychain",
          "Low-Latency Push Notifications & Deep Linking",
          "Background Geolocation & Background Tasks",
          "Automated CI/CD App Store Deployment"
        ]
      },
      {
        "id": "backend-cloud",
        "title": "High-Throughput Cloud & Backend Architecture",
        "badge": "Distributed Scale",
        "shortDesc": "Resilient microservices, real-time relational databases, and fault-tolerant cloud APIs.",
        "longDesc": "We build distributed backend systems capable of processing millions of concurrent requests. Built upon Node.js, Go, Python FastAPI, PostgreSQL, Supabase, and Redis caching layers, our systems incorporate strict database connection pooling, asynchronous task queues, and zero-downtime database migrations. Fully containerized with Docker and orchestrated on AWS or GCP for automatic horizontal scaling.",
        "features": [
          "PostgreSQL & Supabase Real-Time Engine",
          "Redis In-Memory Distributed Caching",
          "Go & Node.js Asynchronous Microservices",
          "Docker Containerization & Kubernetes Ready",
          "Strict Schema Validation via Zod & Prisma",
          "Rate Limiting, Anti-DDoS & WAF Protection"
        ]
      },
      {
        "id": "ai-integration",
        "title": "Autonomous AI Agents & LLM Infrastructure",
        "badge": "Next-Gen AI",
        "shortDesc": "Enterprise Retrieval-Augmented Generation (RAG), custom fine-tuning, and automated workflows.",
        "longDesc": "Supercharge your operational efficiency by embedding autonomous AI agents directly into your software workflow. We construct enterprise RAG (Retrieval-Augmented Generation) pipelines, connect proprietary vector databases (pgvector, Pinecone), and integrate state-of-the-art models from OpenAI, Anthropic Claude, and open-source Llama 3. Automate document ingestion, customer support triage, complex data analysis, and code generation.",
        "features": [
          "Enterprise RAG Pipelines with Hybrid Search",
          "Custom Vector Embeddings (pgvector / Pinecone)",
          "Autonomous Task Orchestration & Tool Calling",
          "Multi-Modal Vision, Speech & OCR Pipelines",
          "Hallucination Guardrails & Token Optimization",
          "Private On-Premise LLM Deployments (Ollama)"
        ]
      },
      {
        "id": "fintech-ecommerce",
        "title": "FinTech & E-Commerce Payment Systems",
        "badge": "PCI-DSS Level 1",
        "shortDesc": "High-security payment gateways, ledger accounting, recurring billing, and multi-currency checkout.",
        "longDesc": "FinTech software requires zero room for error. We engineer mission-critical billing engines and transactional ledgers supporting Stripe, PayPal, Apple Pay, and cryptocurrency gateways. Our payment implementations adhere to PCI-DSS Level 1 compliance standards, implement double-entry bookkeeping ledgers to prevent race conditions, and automate recurring subscriptions, usage-based invoicing, and tax calculations.",
        "features": [
          "Stripe Embedded & Custom Checkout Gateways",
          "Double-Entry Accounting Transaction Ledgers",
          "Webhook Event Queue Idempotency & Retries",
          "Multi-Currency Dynamic Conversion & FX Handling",
          "Automated Subscription Lifecycle & Churn Prevention",
          "Real-Time Anti-Fraud & Chargeback Detection"
        ]
      },
      {
        "id": "cybersecurity-audit",
        "title": "Cybersecurity Auditing & Code Hardening",
        "badge": "Zero-Trust",
        "shortDesc": "Vulnerability assessments, penetration testing, source code review, and compliance readiness.",
        "longDesc": "Protect your enterprise from data breaches, intellectual property theft, and zero-day vulnerabilities. Our security engineers perform comprehensive static and dynamic code analysis, automated dependency audits, OWASP Top 10 penetration testing, and IAM role segregation. We architect your infrastructure with zero-trust networking, end-to-end encryption at rest and in transit, and prepare your startup for SOC-2, GDPR, and HIPAA compliance.",
        "features": [
          "OWASP Top 10 Web & API Penetration Testing",
          "Automated Static Analysis (SAST) in CI/CD",
          "End-to-End AES-256 Data Encryption",
          "Zero-Trust Network Access & Strict IAM Roles",
          "Comprehensive Vulnerability Remediation Reports",
          "GDPR, HIPAA & SOC-2 Architecture Alignment"
        ]
      }
    ],
    "deliveryStages": [
      {
        "stage": "01",
        "title": "Technical Discovery & Blueprinting",
        "desc": "We analyze your business model, define user personas, design system entity-relationship diagrams (ERD), map API endpoints, and establish architectural milestones to eliminate ambiguity."
      },
      {
        "stage": "02",
        "title": "Interactive UI/UX & Design Systems",
        "desc": "Our design team creates sleek, high-fidelity clickable Figma prototypes with dark modes, glassmorphism, responsive breakpoints, and micro-interactions before writing a single line of code."
      },
      {
        "stage": "03",
        "title": "Agile Sprints & Bi-Weekly Demos",
        "desc": "Development proceeds in 2-week focused sprints. You receive staging access, automated test reports, and live video demonstrations at every milestone so you maintain total project visibility."
      },
      {
        "stage": "04",
        "title": "Rigorous QA, Security & Load Testing",
        "desc": "Every build undergoes static analysis, cross-browser compatibility checks, OWASP security audits, and simulated stress testing (10,000+ concurrent users) to guarantee fault tolerance."
      },
      {
        "stage": "05",
        "title": "Zero-Downtime Cloud Deployment",
        "desc": "We provision your production cloud infrastructure on AWS, GCP, or Hostinger, configure global CDNs, configure SSL certificates, and execute zero-downtime continuous deployment."
      },
      {
        "stage": "06",
        "title": "24/7 SLA, Monitoring & Code Handoff",
        "desc": "Upon launch, we transfer 100% intellectual property and repositories to you, provide comprehensive documentation, and offer dedicated 24/7 SLA monitoring to support your growth."
      }
    ],
    "clientGuarantees": [
      {
        "title": "100% Full IP & Code Ownership",
        "desc": "You retain full ownership of all source code, design assets, database schemas, and intellectual property. No vendor lock-in; everything is cleanly documented."
      },
      {
        "title": "Strict Non-Disclosure Agreements (NDA)",
        "desc": "We treat your business ideas and proprietary datasets with complete confidentiality. Comprehensive NDAs are signed before discovery discussions."
      },
      {
        "title": "Direct Senior Engineer Communication",
        "desc": "No non-technical account managers or communication bottlenecks. You collaborate directly with lead software engineers via private Slack, WhatsApp, or Teams channels."
      },
      {
        "title": "UK-Registered Enterprise Standards",
        "desc": "Operated with strict international corporate compliance, milestone-based transparent invoicing, and clear legal protections for global founders."
      }
    ],
    "faqs": [
      {
        "q": "How quickly can your engineering team start on my project?",
        "a": "Depending on current sprint allocations, we typically initiate technical discovery and architectural blueprinting within 3 to 5 business days following project agreement and NDA execution."
      },
      {
        "q": "Who owns the code and intellectual property once built?",
        "a": "You do. 100%. Upon completion of project milestones and final sign-off, full copyright, proprietary source code, Git repositories, deployment credentials, and documentation are transferred unconditionally to your company."
      },
      {
        "q": "How are project payments structured?",
        "a": "We operate on transparent, milestone-based payments. Projects are divided into clear deliverables (e.g., Discovery & Architecture, MVP Prototype, Core Backend & APIs, Final Production QA). You only approve payments when working deliverables are reviewed and verified on staging."
      },
      {
        "q": "Can you take over and refactor an existing software codebase?",
        "a": "Yes. Our team frequently conducts comprehensive code audits for startups and legacy systems. We identify technical debt, refactor bottlenecks, upgrade outdated dependencies, patch security vulnerabilities, and migrate to modern Next.js/Go architectures."
      },
      {
        "q": "What happens after our application goes live?",
        "a": "We don't abandon you after launch. Every project includes a post-launch warranty period for bug fixes and stability monitoring. We also provide ongoing monthly Maintenance SLAs covering security patches, feature expansions, and 24/7 cloud uptime monitoring."
      },
      {
        "q": "Do you build custom AI models or just integrate third-party APIs?",
        "a": "We do both. We build advanced RAG (Retrieval-Augmented Generation) pipelines connecting proprietary company data to top LLMs, fine-tune custom open-source models (like Llama 3 or Mistral) on private GPU clusters, and deploy autonomous agents tailored to your business logic."
      }
    ],
    "isRtl": false
  },
  "ja": {
    "heroBadge": "Safi Academy Engineering Division",
    "heroTitle": "Bespoke Enterprise Software & AI Architecture",
    "heroSubtitle": "We architect mission-critical web platforms, fluid mobile apps, high-throughput cloud infrastructure, and autonomous AI agent pipelines built to scale to millions of users.",
    "ctaConsultation": "Schedule Technical Consultation",
    "ctaExplore": "Explore Engineering Services",
    "stat1Val": "99.99%",
    "stat1Label": "Target Uptime SLA",
    "stat2Val": "< 1.2s",
    "stat2Label": "Largest Contentful Paint",
    "stat3Val": "100%",
    "stat3Label": "IP & Code Ownership",
    "stat4Val": "24/7",
    "stat4Label": "Dedicated Technical Support",
    "servicesBadge": "Engineering Capabilities",
    "servicesTitle": "Specialized Software Solutions Built for Uncompromising Scale",
    "servicesSubtitle": "From high-performance frontend interfaces to distributed databases and autonomous agentic AI, our solutions are engineered with strict zero-trust quality.",
    "stackBadge": "Modern Tech Arsenal",
    "stackTitle": "Battle-Tested Technology Stack",
    "stackSubtitle": "We engineer systems with modern, enterprise-proven frameworks and runtimes to guarantee developer velocity, reliability, and security.",
    "stackTabFrontend": "Frontend & UI",
    "stackTabBackend": "Backend & APIs",
    "stackTabMobile": "Mobile Architecture",
    "stackTabDatabase": "Database & Caching",
    "stackTabCloud": "Cloud & DevOps",
    "stackTabAi": "AI & LLM Infra",
    "deliveryBadge": "Agile Blueprint",
    "deliveryTitle": "6-Stage Engineering Delivery Roadmap",
    "deliverySubtitle": "Transparent, milestone-based execution ensuring zero ambiguity, rapid iterations, and predictable delivery dates.",
    "guaranteesBadge": "Client Trust Standards",
    "guaranteesTitle": "Enterprise Client Guarantees",
    "guaranteesSubtitle": "How we protect your intellectual property, data security, and long-term project success.",
    "formBadge": "Technical Inquiry",
    "formTitle": "Request a Proposal or Consultation",
    "formSubtitle": "Tell us about your project requirements. A senior software architect will review your file and respond within 24 hours.",
    "formNameLabel": "Full Name",
    "formNamePlaceholder": "e.g. Ahmad Rahimi",
    "formEmailLabel": "Work Email",
    "formEmailPlaceholder": "name@company.com",
    "formPhoneLabel": "Phone / WhatsApp",
    "formPhonePlaceholder": "+93 799 000 000",
    "formServiceLabel": "Requested Engineering Service",
    "formBudgetLabel": "Estimated Budget Tier",
    "formDetailsLabel": "Project Scope & Technical Requirements",
    "formDetailsPlaceholder": "Describe your project vision, target timeline, technical requirements, and target user base...",
    "formSubmittingBtn": "Transmitting Request...",
    "formSubmitBtn": "Submit Technical Consultation Request",
    "formSuccessTitle": "Consultation Request Received!",
    "formSuccessDesc": "Our senior software engineering team has received your project brief. A technical lead will contact you via WhatsApp or Email within 24 hours.",
    "formErrorDesc": "An error occurred while submitting your inquiry. Please try again or reach out to us directly on WhatsApp or Telegram.",
    "faqsBadge": "FAQ & Inquiries",
    "faqsTitle": "Frequently Answered Questions",
    "services": [
      {
        "id": "web-app",
        "title": "Enterprise Full-Stack Web Applications",
        "badge": "High Concurrency",
        "shortDesc": "Sub-second load times, SEO-optimized server rendering, and scalable component architecture.",
        "longDesc": "We engineer high-performance web platforms using Next.js 14/15, React, TypeScript, and modern edge runtimes. By implementing Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and intelligent edge caching, we guarantee Core Web Vitals with Largest Contentful Paint (LCP) under 1.2 seconds. From multi-tenant SaaS dashboards to complex corporate portals, our web applications scale smoothly to millions of active users.",
        "features": [
          "Next.js App Router & TypeScript Strict Mode",
          "Sub-second TTFB with Global Edge Caching",
          "Enterprise RBAC & SSO (OAuth2 / SAML)",
          "State Management via Zustand & React Query",
          "Responsive Glassmorphic UI with Tailwind CSS",
          "Automated Lighthouse & Performance CI Audits"
        ]
      },
      {
        "id": "mobile-apps",
        "title": "Cross-Platform & Native Mobile Apps",
        "badge": "iOS & Android",
        "shortDesc": "Fluid 60 FPS mobile applications engineered with Flutter and native device integrations.",
        "longDesc": "Deliver a single, pixel-perfect codebase across iOS and Android without sacrificing native performance. Utilizing Flutter, Dart, and native Swift/Kotlin bridging, our mobile applications feature buttery-smooth 60/120 FPS animations, offline-first SQLite/Hive synchronization, biometrics (FaceID/Fingerprint), in-app purchases, and automated deployment pipelines to Apple App Store and Google Play Console.",
        "features": [
          "Flutter & Dart Cross-Platform Architecture",
          "Offline-First SQLite Data Synchronization",
          "Biometric Authentication & Secure Keychain",
          "Low-Latency Push Notifications & Deep Linking",
          "Background Geolocation & Background Tasks",
          "Automated CI/CD App Store Deployment"
        ]
      },
      {
        "id": "backend-cloud",
        "title": "High-Throughput Cloud & Backend Architecture",
        "badge": "Distributed Scale",
        "shortDesc": "Resilient microservices, real-time relational databases, and fault-tolerant cloud APIs.",
        "longDesc": "We build distributed backend systems capable of processing millions of concurrent requests. Built upon Node.js, Go, Python FastAPI, PostgreSQL, Supabase, and Redis caching layers, our systems incorporate strict database connection pooling, asynchronous task queues, and zero-downtime database migrations. Fully containerized with Docker and orchestrated on AWS or GCP for automatic horizontal scaling.",
        "features": [
          "PostgreSQL & Supabase Real-Time Engine",
          "Redis In-Memory Distributed Caching",
          "Go & Node.js Asynchronous Microservices",
          "Docker Containerization & Kubernetes Ready",
          "Strict Schema Validation via Zod & Prisma",
          "Rate Limiting, Anti-DDoS & WAF Protection"
        ]
      },
      {
        "id": "ai-integration",
        "title": "Autonomous AI Agents & LLM Infrastructure",
        "badge": "Next-Gen AI",
        "shortDesc": "Enterprise Retrieval-Augmented Generation (RAG), custom fine-tuning, and automated workflows.",
        "longDesc": "Supercharge your operational efficiency by embedding autonomous AI agents directly into your software workflow. We construct enterprise RAG (Retrieval-Augmented Generation) pipelines, connect proprietary vector databases (pgvector, Pinecone), and integrate state-of-the-art models from OpenAI, Anthropic Claude, and open-source Llama 3. Automate document ingestion, customer support triage, complex data analysis, and code generation.",
        "features": [
          "Enterprise RAG Pipelines with Hybrid Search",
          "Custom Vector Embeddings (pgvector / Pinecone)",
          "Autonomous Task Orchestration & Tool Calling",
          "Multi-Modal Vision, Speech & OCR Pipelines",
          "Hallucination Guardrails & Token Optimization",
          "Private On-Premise LLM Deployments (Ollama)"
        ]
      },
      {
        "id": "fintech-ecommerce",
        "title": "FinTech & E-Commerce Payment Systems",
        "badge": "PCI-DSS Level 1",
        "shortDesc": "High-security payment gateways, ledger accounting, recurring billing, and multi-currency checkout.",
        "longDesc": "FinTech software requires zero room for error. We engineer mission-critical billing engines and transactional ledgers supporting Stripe, PayPal, Apple Pay, and cryptocurrency gateways. Our payment implementations adhere to PCI-DSS Level 1 compliance standards, implement double-entry bookkeeping ledgers to prevent race conditions, and automate recurring subscriptions, usage-based invoicing, and tax calculations.",
        "features": [
          "Stripe Embedded & Custom Checkout Gateways",
          "Double-Entry Accounting Transaction Ledgers",
          "Webhook Event Queue Idempotency & Retries",
          "Multi-Currency Dynamic Conversion & FX Handling",
          "Automated Subscription Lifecycle & Churn Prevention",
          "Real-Time Anti-Fraud & Chargeback Detection"
        ]
      },
      {
        "id": "cybersecurity-audit",
        "title": "Cybersecurity Auditing & Code Hardening",
        "badge": "Zero-Trust",
        "shortDesc": "Vulnerability assessments, penetration testing, source code review, and compliance readiness.",
        "longDesc": "Protect your enterprise from data breaches, intellectual property theft, and zero-day vulnerabilities. Our security engineers perform comprehensive static and dynamic code analysis, automated dependency audits, OWASP Top 10 penetration testing, and IAM role segregation. We architect your infrastructure with zero-trust networking, end-to-end encryption at rest and in transit, and prepare your startup for SOC-2, GDPR, and HIPAA compliance.",
        "features": [
          "OWASP Top 10 Web & API Penetration Testing",
          "Automated Static Analysis (SAST) in CI/CD",
          "End-to-End AES-256 Data Encryption",
          "Zero-Trust Network Access & Strict IAM Roles",
          "Comprehensive Vulnerability Remediation Reports",
          "GDPR, HIPAA & SOC-2 Architecture Alignment"
        ]
      }
    ],
    "deliveryStages": [
      {
        "stage": "01",
        "title": "Technical Discovery & Blueprinting",
        "desc": "We analyze your business model, define user personas, design system entity-relationship diagrams (ERD), map API endpoints, and establish architectural milestones to eliminate ambiguity."
      },
      {
        "stage": "02",
        "title": "Interactive UI/UX & Design Systems",
        "desc": "Our design team creates sleek, high-fidelity clickable Figma prototypes with dark modes, glassmorphism, responsive breakpoints, and micro-interactions before writing a single line of code."
      },
      {
        "stage": "03",
        "title": "Agile Sprints & Bi-Weekly Demos",
        "desc": "Development proceeds in 2-week focused sprints. You receive staging access, automated test reports, and live video demonstrations at every milestone so you maintain total project visibility."
      },
      {
        "stage": "04",
        "title": "Rigorous QA, Security & Load Testing",
        "desc": "Every build undergoes static analysis, cross-browser compatibility checks, OWASP security audits, and simulated stress testing (10,000+ concurrent users) to guarantee fault tolerance."
      },
      {
        "stage": "05",
        "title": "Zero-Downtime Cloud Deployment",
        "desc": "We provision your production cloud infrastructure on AWS, GCP, or Hostinger, configure global CDNs, configure SSL certificates, and execute zero-downtime continuous deployment."
      },
      {
        "stage": "06",
        "title": "24/7 SLA, Monitoring & Code Handoff",
        "desc": "Upon launch, we transfer 100% intellectual property and repositories to you, provide comprehensive documentation, and offer dedicated 24/7 SLA monitoring to support your growth."
      }
    ],
    "clientGuarantees": [
      {
        "title": "100% Full IP & Code Ownership",
        "desc": "You retain full ownership of all source code, design assets, database schemas, and intellectual property. No vendor lock-in; everything is cleanly documented."
      },
      {
        "title": "Strict Non-Disclosure Agreements (NDA)",
        "desc": "We treat your business ideas and proprietary datasets with complete confidentiality. Comprehensive NDAs are signed before discovery discussions."
      },
      {
        "title": "Direct Senior Engineer Communication",
        "desc": "No non-technical account managers or communication bottlenecks. You collaborate directly with lead software engineers via private Slack, WhatsApp, or Teams channels."
      },
      {
        "title": "UK-Registered Enterprise Standards",
        "desc": "Operated with strict international corporate compliance, milestone-based transparent invoicing, and clear legal protections for global founders."
      }
    ],
    "faqs": [
      {
        "q": "How quickly can your engineering team start on my project?",
        "a": "Depending on current sprint allocations, we typically initiate technical discovery and architectural blueprinting within 3 to 5 business days following project agreement and NDA execution."
      },
      {
        "q": "Who owns the code and intellectual property once built?",
        "a": "You do. 100%. Upon completion of project milestones and final sign-off, full copyright, proprietary source code, Git repositories, deployment credentials, and documentation are transferred unconditionally to your company."
      },
      {
        "q": "How are project payments structured?",
        "a": "We operate on transparent, milestone-based payments. Projects are divided into clear deliverables (e.g., Discovery & Architecture, MVP Prototype, Core Backend & APIs, Final Production QA). You only approve payments when working deliverables are reviewed and verified on staging."
      },
      {
        "q": "Can you take over and refactor an existing software codebase?",
        "a": "Yes. Our team frequently conducts comprehensive code audits for startups and legacy systems. We identify technical debt, refactor bottlenecks, upgrade outdated dependencies, patch security vulnerabilities, and migrate to modern Next.js/Go architectures."
      },
      {
        "q": "What happens after our application goes live?",
        "a": "We don't abandon you after launch. Every project includes a post-launch warranty period for bug fixes and stability monitoring. We also provide ongoing monthly Maintenance SLAs covering security patches, feature expansions, and 24/7 cloud uptime monitoring."
      },
      {
        "q": "Do you build custom AI models or just integrate third-party APIs?",
        "a": "We do both. We build advanced RAG (Retrieval-Augmented Generation) pipelines connecting proprietary company data to top LLMs, fine-tune custom open-source models (like Llama 3 or Mistral) on private GPU clusters, and deploy autonomous agents tailored to your business logic."
      }
    ],
    "isRtl": false
  },
  "ko": {
    "heroBadge": "Safi Academy Engineering Division",
    "heroTitle": "Bespoke Enterprise Software & AI Architecture",
    "heroSubtitle": "We architect mission-critical web platforms, fluid mobile apps, high-throughput cloud infrastructure, and autonomous AI agent pipelines built to scale to millions of users.",
    "ctaConsultation": "Schedule Technical Consultation",
    "ctaExplore": "Explore Engineering Services",
    "stat1Val": "99.99%",
    "stat1Label": "Target Uptime SLA",
    "stat2Val": "< 1.2s",
    "stat2Label": "Largest Contentful Paint",
    "stat3Val": "100%",
    "stat3Label": "IP & Code Ownership",
    "stat4Val": "24/7",
    "stat4Label": "Dedicated Technical Support",
    "servicesBadge": "Engineering Capabilities",
    "servicesTitle": "Specialized Software Solutions Built for Uncompromising Scale",
    "servicesSubtitle": "From high-performance frontend interfaces to distributed databases and autonomous agentic AI, our solutions are engineered with strict zero-trust quality.",
    "stackBadge": "Modern Tech Arsenal",
    "stackTitle": "Battle-Tested Technology Stack",
    "stackSubtitle": "We engineer systems with modern, enterprise-proven frameworks and runtimes to guarantee developer velocity, reliability, and security.",
    "stackTabFrontend": "Frontend & UI",
    "stackTabBackend": "Backend & APIs",
    "stackTabMobile": "Mobile Architecture",
    "stackTabDatabase": "Database & Caching",
    "stackTabCloud": "Cloud & DevOps",
    "stackTabAi": "AI & LLM Infra",
    "deliveryBadge": "Agile Blueprint",
    "deliveryTitle": "6-Stage Engineering Delivery Roadmap",
    "deliverySubtitle": "Transparent, milestone-based execution ensuring zero ambiguity, rapid iterations, and predictable delivery dates.",
    "guaranteesBadge": "Client Trust Standards",
    "guaranteesTitle": "Enterprise Client Guarantees",
    "guaranteesSubtitle": "How we protect your intellectual property, data security, and long-term project success.",
    "formBadge": "Technical Inquiry",
    "formTitle": "Request a Proposal or Consultation",
    "formSubtitle": "Tell us about your project requirements. A senior software architect will review your file and respond within 24 hours.",
    "formNameLabel": "Full Name",
    "formNamePlaceholder": "e.g. Ahmad Rahimi",
    "formEmailLabel": "Work Email",
    "formEmailPlaceholder": "name@company.com",
    "formPhoneLabel": "Phone / WhatsApp",
    "formPhonePlaceholder": "+93 799 000 000",
    "formServiceLabel": "Requested Engineering Service",
    "formBudgetLabel": "Estimated Budget Tier",
    "formDetailsLabel": "Project Scope & Technical Requirements",
    "formDetailsPlaceholder": "Describe your project vision, target timeline, technical requirements, and target user base...",
    "formSubmittingBtn": "Transmitting Request...",
    "formSubmitBtn": "Submit Technical Consultation Request",
    "formSuccessTitle": "Consultation Request Received!",
    "formSuccessDesc": "Our senior software engineering team has received your project brief. A technical lead will contact you via WhatsApp or Email within 24 hours.",
    "formErrorDesc": "An error occurred while submitting your inquiry. Please try again or reach out to us directly on WhatsApp or Telegram.",
    "faqsBadge": "FAQ & Inquiries",
    "faqsTitle": "Frequently Answered Questions",
    "services": [
      {
        "id": "web-app",
        "title": "Enterprise Full-Stack Web Applications",
        "badge": "High Concurrency",
        "shortDesc": "Sub-second load times, SEO-optimized server rendering, and scalable component architecture.",
        "longDesc": "We engineer high-performance web platforms using Next.js 14/15, React, TypeScript, and modern edge runtimes. By implementing Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and intelligent edge caching, we guarantee Core Web Vitals with Largest Contentful Paint (LCP) under 1.2 seconds. From multi-tenant SaaS dashboards to complex corporate portals, our web applications scale smoothly to millions of active users.",
        "features": [
          "Next.js App Router & TypeScript Strict Mode",
          "Sub-second TTFB with Global Edge Caching",
          "Enterprise RBAC & SSO (OAuth2 / SAML)",
          "State Management via Zustand & React Query",
          "Responsive Glassmorphic UI with Tailwind CSS",
          "Automated Lighthouse & Performance CI Audits"
        ]
      },
      {
        "id": "mobile-apps",
        "title": "Cross-Platform & Native Mobile Apps",
        "badge": "iOS & Android",
        "shortDesc": "Fluid 60 FPS mobile applications engineered with Flutter and native device integrations.",
        "longDesc": "Deliver a single, pixel-perfect codebase across iOS and Android without sacrificing native performance. Utilizing Flutter, Dart, and native Swift/Kotlin bridging, our mobile applications feature buttery-smooth 60/120 FPS animations, offline-first SQLite/Hive synchronization, biometrics (FaceID/Fingerprint), in-app purchases, and automated deployment pipelines to Apple App Store and Google Play Console.",
        "features": [
          "Flutter & Dart Cross-Platform Architecture",
          "Offline-First SQLite Data Synchronization",
          "Biometric Authentication & Secure Keychain",
          "Low-Latency Push Notifications & Deep Linking",
          "Background Geolocation & Background Tasks",
          "Automated CI/CD App Store Deployment"
        ]
      },
      {
        "id": "backend-cloud",
        "title": "High-Throughput Cloud & Backend Architecture",
        "badge": "Distributed Scale",
        "shortDesc": "Resilient microservices, real-time relational databases, and fault-tolerant cloud APIs.",
        "longDesc": "We build distributed backend systems capable of processing millions of concurrent requests. Built upon Node.js, Go, Python FastAPI, PostgreSQL, Supabase, and Redis caching layers, our systems incorporate strict database connection pooling, asynchronous task queues, and zero-downtime database migrations. Fully containerized with Docker and orchestrated on AWS or GCP for automatic horizontal scaling.",
        "features": [
          "PostgreSQL & Supabase Real-Time Engine",
          "Redis In-Memory Distributed Caching",
          "Go & Node.js Asynchronous Microservices",
          "Docker Containerization & Kubernetes Ready",
          "Strict Schema Validation via Zod & Prisma",
          "Rate Limiting, Anti-DDoS & WAF Protection"
        ]
      },
      {
        "id": "ai-integration",
        "title": "Autonomous AI Agents & LLM Infrastructure",
        "badge": "Next-Gen AI",
        "shortDesc": "Enterprise Retrieval-Augmented Generation (RAG), custom fine-tuning, and automated workflows.",
        "longDesc": "Supercharge your operational efficiency by embedding autonomous AI agents directly into your software workflow. We construct enterprise RAG (Retrieval-Augmented Generation) pipelines, connect proprietary vector databases (pgvector, Pinecone), and integrate state-of-the-art models from OpenAI, Anthropic Claude, and open-source Llama 3. Automate document ingestion, customer support triage, complex data analysis, and code generation.",
        "features": [
          "Enterprise RAG Pipelines with Hybrid Search",
          "Custom Vector Embeddings (pgvector / Pinecone)",
          "Autonomous Task Orchestration & Tool Calling",
          "Multi-Modal Vision, Speech & OCR Pipelines",
          "Hallucination Guardrails & Token Optimization",
          "Private On-Premise LLM Deployments (Ollama)"
        ]
      },
      {
        "id": "fintech-ecommerce",
        "title": "FinTech & E-Commerce Payment Systems",
        "badge": "PCI-DSS Level 1",
        "shortDesc": "High-security payment gateways, ledger accounting, recurring billing, and multi-currency checkout.",
        "longDesc": "FinTech software requires zero room for error. We engineer mission-critical billing engines and transactional ledgers supporting Stripe, PayPal, Apple Pay, and cryptocurrency gateways. Our payment implementations adhere to PCI-DSS Level 1 compliance standards, implement double-entry bookkeeping ledgers to prevent race conditions, and automate recurring subscriptions, usage-based invoicing, and tax calculations.",
        "features": [
          "Stripe Embedded & Custom Checkout Gateways",
          "Double-Entry Accounting Transaction Ledgers",
          "Webhook Event Queue Idempotency & Retries",
          "Multi-Currency Dynamic Conversion & FX Handling",
          "Automated Subscription Lifecycle & Churn Prevention",
          "Real-Time Anti-Fraud & Chargeback Detection"
        ]
      },
      {
        "id": "cybersecurity-audit",
        "title": "Cybersecurity Auditing & Code Hardening",
        "badge": "Zero-Trust",
        "shortDesc": "Vulnerability assessments, penetration testing, source code review, and compliance readiness.",
        "longDesc": "Protect your enterprise from data breaches, intellectual property theft, and zero-day vulnerabilities. Our security engineers perform comprehensive static and dynamic code analysis, automated dependency audits, OWASP Top 10 penetration testing, and IAM role segregation. We architect your infrastructure with zero-trust networking, end-to-end encryption at rest and in transit, and prepare your startup for SOC-2, GDPR, and HIPAA compliance.",
        "features": [
          "OWASP Top 10 Web & API Penetration Testing",
          "Automated Static Analysis (SAST) in CI/CD",
          "End-to-End AES-256 Data Encryption",
          "Zero-Trust Network Access & Strict IAM Roles",
          "Comprehensive Vulnerability Remediation Reports",
          "GDPR, HIPAA & SOC-2 Architecture Alignment"
        ]
      }
    ],
    "deliveryStages": [
      {
        "stage": "01",
        "title": "Technical Discovery & Blueprinting",
        "desc": "We analyze your business model, define user personas, design system entity-relationship diagrams (ERD), map API endpoints, and establish architectural milestones to eliminate ambiguity."
      },
      {
        "stage": "02",
        "title": "Interactive UI/UX & Design Systems",
        "desc": "Our design team creates sleek, high-fidelity clickable Figma prototypes with dark modes, glassmorphism, responsive breakpoints, and micro-interactions before writing a single line of code."
      },
      {
        "stage": "03",
        "title": "Agile Sprints & Bi-Weekly Demos",
        "desc": "Development proceeds in 2-week focused sprints. You receive staging access, automated test reports, and live video demonstrations at every milestone so you maintain total project visibility."
      },
      {
        "stage": "04",
        "title": "Rigorous QA, Security & Load Testing",
        "desc": "Every build undergoes static analysis, cross-browser compatibility checks, OWASP security audits, and simulated stress testing (10,000+ concurrent users) to guarantee fault tolerance."
      },
      {
        "stage": "05",
        "title": "Zero-Downtime Cloud Deployment",
        "desc": "We provision your production cloud infrastructure on AWS, GCP, or Hostinger, configure global CDNs, configure SSL certificates, and execute zero-downtime continuous deployment."
      },
      {
        "stage": "06",
        "title": "24/7 SLA, Monitoring & Code Handoff",
        "desc": "Upon launch, we transfer 100% intellectual property and repositories to you, provide comprehensive documentation, and offer dedicated 24/7 SLA monitoring to support your growth."
      }
    ],
    "clientGuarantees": [
      {
        "title": "100% Full IP & Code Ownership",
        "desc": "You retain full ownership of all source code, design assets, database schemas, and intellectual property. No vendor lock-in; everything is cleanly documented."
      },
      {
        "title": "Strict Non-Disclosure Agreements (NDA)",
        "desc": "We treat your business ideas and proprietary datasets with complete confidentiality. Comprehensive NDAs are signed before discovery discussions."
      },
      {
        "title": "Direct Senior Engineer Communication",
        "desc": "No non-technical account managers or communication bottlenecks. You collaborate directly with lead software engineers via private Slack, WhatsApp, or Teams channels."
      },
      {
        "title": "UK-Registered Enterprise Standards",
        "desc": "Operated with strict international corporate compliance, milestone-based transparent invoicing, and clear legal protections for global founders."
      }
    ],
    "faqs": [
      {
        "q": "How quickly can your engineering team start on my project?",
        "a": "Depending on current sprint allocations, we typically initiate technical discovery and architectural blueprinting within 3 to 5 business days following project agreement and NDA execution."
      },
      {
        "q": "Who owns the code and intellectual property once built?",
        "a": "You do. 100%. Upon completion of project milestones and final sign-off, full copyright, proprietary source code, Git repositories, deployment credentials, and documentation are transferred unconditionally to your company."
      },
      {
        "q": "How are project payments structured?",
        "a": "We operate on transparent, milestone-based payments. Projects are divided into clear deliverables (e.g., Discovery & Architecture, MVP Prototype, Core Backend & APIs, Final Production QA). You only approve payments when working deliverables are reviewed and verified on staging."
      },
      {
        "q": "Can you take over and refactor an existing software codebase?",
        "a": "Yes. Our team frequently conducts comprehensive code audits for startups and legacy systems. We identify technical debt, refactor bottlenecks, upgrade outdated dependencies, patch security vulnerabilities, and migrate to modern Next.js/Go architectures."
      },
      {
        "q": "What happens after our application goes live?",
        "a": "We don't abandon you after launch. Every project includes a post-launch warranty period for bug fixes and stability monitoring. We also provide ongoing monthly Maintenance SLAs covering security patches, feature expansions, and 24/7 cloud uptime monitoring."
      },
      {
        "q": "Do you build custom AI models or just integrate third-party APIs?",
        "a": "We do both. We build advanced RAG (Retrieval-Augmented Generation) pipelines connecting proprietary company data to top LLMs, fine-tune custom open-source models (like Llama 3 or Mistral) on private GPU clusters, and deploy autonomous agents tailored to your business logic."
      }
    ],
    "isRtl": false
  },
  "nl": {
    "heroBadge": "Safi Academy Engineering Division",
    "heroTitle": "Bespoke Enterprise Software & AI Architecture",
    "heroSubtitle": "We architect mission-critical web platforms, fluid mobile apps, high-throughput cloud infrastructure, and autonomous AI agent pipelines built to scale to millions of users.",
    "ctaConsultation": "Schedule Technical Consultation",
    "ctaExplore": "Explore Engineering Services",
    "stat1Val": "99.99%",
    "stat1Label": "Target Uptime SLA",
    "stat2Val": "< 1.2s",
    "stat2Label": "Largest Contentful Paint",
    "stat3Val": "100%",
    "stat3Label": "IP & Code Ownership",
    "stat4Val": "24/7",
    "stat4Label": "Dedicated Technical Support",
    "servicesBadge": "Engineering Capabilities",
    "servicesTitle": "Specialized Software Solutions Built for Uncompromising Scale",
    "servicesSubtitle": "From high-performance frontend interfaces to distributed databases and autonomous agentic AI, our solutions are engineered with strict zero-trust quality.",
    "stackBadge": "Modern Tech Arsenal",
    "stackTitle": "Battle-Tested Technology Stack",
    "stackSubtitle": "We engineer systems with modern, enterprise-proven frameworks and runtimes to guarantee developer velocity, reliability, and security.",
    "stackTabFrontend": "Frontend & UI",
    "stackTabBackend": "Backend & APIs",
    "stackTabMobile": "Mobile Architecture",
    "stackTabDatabase": "Database & Caching",
    "stackTabCloud": "Cloud & DevOps",
    "stackTabAi": "AI & LLM Infra",
    "deliveryBadge": "Agile Blueprint",
    "deliveryTitle": "6-Stage Engineering Delivery Roadmap",
    "deliverySubtitle": "Transparent, milestone-based execution ensuring zero ambiguity, rapid iterations, and predictable delivery dates.",
    "guaranteesBadge": "Client Trust Standards",
    "guaranteesTitle": "Enterprise Client Guarantees",
    "guaranteesSubtitle": "How we protect your intellectual property, data security, and long-term project success.",
    "formBadge": "Technical Inquiry",
    "formTitle": "Request a Proposal or Consultation",
    "formSubtitle": "Tell us about your project requirements. A senior software architect will review your file and respond within 24 hours.",
    "formNameLabel": "Full Name",
    "formNamePlaceholder": "e.g. Ahmad Rahimi",
    "formEmailLabel": "Work Email",
    "formEmailPlaceholder": "name@company.com",
    "formPhoneLabel": "Phone / WhatsApp",
    "formPhonePlaceholder": "+93 799 000 000",
    "formServiceLabel": "Requested Engineering Service",
    "formBudgetLabel": "Estimated Budget Tier",
    "formDetailsLabel": "Project Scope & Technical Requirements",
    "formDetailsPlaceholder": "Describe your project vision, target timeline, technical requirements, and target user base...",
    "formSubmittingBtn": "Transmitting Request...",
    "formSubmitBtn": "Submit Technical Consultation Request",
    "formSuccessTitle": "Consultation Request Received!",
    "formSuccessDesc": "Our senior software engineering team has received your project brief. A technical lead will contact you via WhatsApp or Email within 24 hours.",
    "formErrorDesc": "An error occurred while submitting your inquiry. Please try again or reach out to us directly on WhatsApp or Telegram.",
    "faqsBadge": "FAQ & Inquiries",
    "faqsTitle": "Frequently Answered Questions",
    "services": [
      {
        "id": "web-app",
        "title": "Enterprise Full-Stack Web Applications",
        "badge": "High Concurrency",
        "shortDesc": "Sub-second load times, SEO-optimized server rendering, and scalable component architecture.",
        "longDesc": "We engineer high-performance web platforms using Next.js 14/15, React, TypeScript, and modern edge runtimes. By implementing Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and intelligent edge caching, we guarantee Core Web Vitals with Largest Contentful Paint (LCP) under 1.2 seconds. From multi-tenant SaaS dashboards to complex corporate portals, our web applications scale smoothly to millions of active users.",
        "features": [
          "Next.js App Router & TypeScript Strict Mode",
          "Sub-second TTFB with Global Edge Caching",
          "Enterprise RBAC & SSO (OAuth2 / SAML)",
          "State Management via Zustand & React Query",
          "Responsive Glassmorphic UI with Tailwind CSS",
          "Automated Lighthouse & Performance CI Audits"
        ]
      },
      {
        "id": "mobile-apps",
        "title": "Cross-Platform & Native Mobile Apps",
        "badge": "iOS & Android",
        "shortDesc": "Fluid 60 FPS mobile applications engineered with Flutter and native device integrations.",
        "longDesc": "Deliver a single, pixel-perfect codebase across iOS and Android without sacrificing native performance. Utilizing Flutter, Dart, and native Swift/Kotlin bridging, our mobile applications feature buttery-smooth 60/120 FPS animations, offline-first SQLite/Hive synchronization, biometrics (FaceID/Fingerprint), in-app purchases, and automated deployment pipelines to Apple App Store and Google Play Console.",
        "features": [
          "Flutter & Dart Cross-Platform Architecture",
          "Offline-First SQLite Data Synchronization",
          "Biometric Authentication & Secure Keychain",
          "Low-Latency Push Notifications & Deep Linking",
          "Background Geolocation & Background Tasks",
          "Automated CI/CD App Store Deployment"
        ]
      },
      {
        "id": "backend-cloud",
        "title": "High-Throughput Cloud & Backend Architecture",
        "badge": "Distributed Scale",
        "shortDesc": "Resilient microservices, real-time relational databases, and fault-tolerant cloud APIs.",
        "longDesc": "We build distributed backend systems capable of processing millions of concurrent requests. Built upon Node.js, Go, Python FastAPI, PostgreSQL, Supabase, and Redis caching layers, our systems incorporate strict database connection pooling, asynchronous task queues, and zero-downtime database migrations. Fully containerized with Docker and orchestrated on AWS or GCP for automatic horizontal scaling.",
        "features": [
          "PostgreSQL & Supabase Real-Time Engine",
          "Redis In-Memory Distributed Caching",
          "Go & Node.js Asynchronous Microservices",
          "Docker Containerization & Kubernetes Ready",
          "Strict Schema Validation via Zod & Prisma",
          "Rate Limiting, Anti-DDoS & WAF Protection"
        ]
      },
      {
        "id": "ai-integration",
        "title": "Autonomous AI Agents & LLM Infrastructure",
        "badge": "Next-Gen AI",
        "shortDesc": "Enterprise Retrieval-Augmented Generation (RAG), custom fine-tuning, and automated workflows.",
        "longDesc": "Supercharge your operational efficiency by embedding autonomous AI agents directly into your software workflow. We construct enterprise RAG (Retrieval-Augmented Generation) pipelines, connect proprietary vector databases (pgvector, Pinecone), and integrate state-of-the-art models from OpenAI, Anthropic Claude, and open-source Llama 3. Automate document ingestion, customer support triage, complex data analysis, and code generation.",
        "features": [
          "Enterprise RAG Pipelines with Hybrid Search",
          "Custom Vector Embeddings (pgvector / Pinecone)",
          "Autonomous Task Orchestration & Tool Calling",
          "Multi-Modal Vision, Speech & OCR Pipelines",
          "Hallucination Guardrails & Token Optimization",
          "Private On-Premise LLM Deployments (Ollama)"
        ]
      },
      {
        "id": "fintech-ecommerce",
        "title": "FinTech & E-Commerce Payment Systems",
        "badge": "PCI-DSS Level 1",
        "shortDesc": "High-security payment gateways, ledger accounting, recurring billing, and multi-currency checkout.",
        "longDesc": "FinTech software requires zero room for error. We engineer mission-critical billing engines and transactional ledgers supporting Stripe, PayPal, Apple Pay, and cryptocurrency gateways. Our payment implementations adhere to PCI-DSS Level 1 compliance standards, implement double-entry bookkeeping ledgers to prevent race conditions, and automate recurring subscriptions, usage-based invoicing, and tax calculations.",
        "features": [
          "Stripe Embedded & Custom Checkout Gateways",
          "Double-Entry Accounting Transaction Ledgers",
          "Webhook Event Queue Idempotency & Retries",
          "Multi-Currency Dynamic Conversion & FX Handling",
          "Automated Subscription Lifecycle & Churn Prevention",
          "Real-Time Anti-Fraud & Chargeback Detection"
        ]
      },
      {
        "id": "cybersecurity-audit",
        "title": "Cybersecurity Auditing & Code Hardening",
        "badge": "Zero-Trust",
        "shortDesc": "Vulnerability assessments, penetration testing, source code review, and compliance readiness.",
        "longDesc": "Protect your enterprise from data breaches, intellectual property theft, and zero-day vulnerabilities. Our security engineers perform comprehensive static and dynamic code analysis, automated dependency audits, OWASP Top 10 penetration testing, and IAM role segregation. We architect your infrastructure with zero-trust networking, end-to-end encryption at rest and in transit, and prepare your startup for SOC-2, GDPR, and HIPAA compliance.",
        "features": [
          "OWASP Top 10 Web & API Penetration Testing",
          "Automated Static Analysis (SAST) in CI/CD",
          "End-to-End AES-256 Data Encryption",
          "Zero-Trust Network Access & Strict IAM Roles",
          "Comprehensive Vulnerability Remediation Reports",
          "GDPR, HIPAA & SOC-2 Architecture Alignment"
        ]
      }
    ],
    "deliveryStages": [
      {
        "stage": "01",
        "title": "Technical Discovery & Blueprinting",
        "desc": "We analyze your business model, define user personas, design system entity-relationship diagrams (ERD), map API endpoints, and establish architectural milestones to eliminate ambiguity."
      },
      {
        "stage": "02",
        "title": "Interactive UI/UX & Design Systems",
        "desc": "Our design team creates sleek, high-fidelity clickable Figma prototypes with dark modes, glassmorphism, responsive breakpoints, and micro-interactions before writing a single line of code."
      },
      {
        "stage": "03",
        "title": "Agile Sprints & Bi-Weekly Demos",
        "desc": "Development proceeds in 2-week focused sprints. You receive staging access, automated test reports, and live video demonstrations at every milestone so you maintain total project visibility."
      },
      {
        "stage": "04",
        "title": "Rigorous QA, Security & Load Testing",
        "desc": "Every build undergoes static analysis, cross-browser compatibility checks, OWASP security audits, and simulated stress testing (10,000+ concurrent users) to guarantee fault tolerance."
      },
      {
        "stage": "05",
        "title": "Zero-Downtime Cloud Deployment",
        "desc": "We provision your production cloud infrastructure on AWS, GCP, or Hostinger, configure global CDNs, configure SSL certificates, and execute zero-downtime continuous deployment."
      },
      {
        "stage": "06",
        "title": "24/7 SLA, Monitoring & Code Handoff",
        "desc": "Upon launch, we transfer 100% intellectual property and repositories to you, provide comprehensive documentation, and offer dedicated 24/7 SLA monitoring to support your growth."
      }
    ],
    "clientGuarantees": [
      {
        "title": "100% Full IP & Code Ownership",
        "desc": "You retain full ownership of all source code, design assets, database schemas, and intellectual property. No vendor lock-in; everything is cleanly documented."
      },
      {
        "title": "Strict Non-Disclosure Agreements (NDA)",
        "desc": "We treat your business ideas and proprietary datasets with complete confidentiality. Comprehensive NDAs are signed before discovery discussions."
      },
      {
        "title": "Direct Senior Engineer Communication",
        "desc": "No non-technical account managers or communication bottlenecks. You collaborate directly with lead software engineers via private Slack, WhatsApp, or Teams channels."
      },
      {
        "title": "UK-Registered Enterprise Standards",
        "desc": "Operated with strict international corporate compliance, milestone-based transparent invoicing, and clear legal protections for global founders."
      }
    ],
    "faqs": [
      {
        "q": "How quickly can your engineering team start on my project?",
        "a": "Depending on current sprint allocations, we typically initiate technical discovery and architectural blueprinting within 3 to 5 business days following project agreement and NDA execution."
      },
      {
        "q": "Who owns the code and intellectual property once built?",
        "a": "You do. 100%. Upon completion of project milestones and final sign-off, full copyright, proprietary source code, Git repositories, deployment credentials, and documentation are transferred unconditionally to your company."
      },
      {
        "q": "How are project payments structured?",
        "a": "We operate on transparent, milestone-based payments. Projects are divided into clear deliverables (e.g., Discovery & Architecture, MVP Prototype, Core Backend & APIs, Final Production QA). You only approve payments when working deliverables are reviewed and verified on staging."
      },
      {
        "q": "Can you take over and refactor an existing software codebase?",
        "a": "Yes. Our team frequently conducts comprehensive code audits for startups and legacy systems. We identify technical debt, refactor bottlenecks, upgrade outdated dependencies, patch security vulnerabilities, and migrate to modern Next.js/Go architectures."
      },
      {
        "q": "What happens after our application goes live?",
        "a": "We don't abandon you after launch. Every project includes a post-launch warranty period for bug fixes and stability monitoring. We also provide ongoing monthly Maintenance SLAs covering security patches, feature expansions, and 24/7 cloud uptime monitoring."
      },
      {
        "q": "Do you build custom AI models or just integrate third-party APIs?",
        "a": "We do both. We build advanced RAG (Retrieval-Augmented Generation) pipelines connecting proprietary company data to top LLMs, fine-tune custom open-source models (like Llama 3 or Mistral) on private GPU clusters, and deploy autonomous agents tailored to your business logic."
      }
    ],
    "isRtl": false
  },
  "uz": {
    "heroBadge": "Safi Academy Engineering Division",
    "heroTitle": "Bespoke Enterprise Software & AI Architecture",
    "heroSubtitle": "We architect mission-critical web platforms, fluid mobile apps, high-throughput cloud infrastructure, and autonomous AI agent pipelines built to scale to millions of users.",
    "ctaConsultation": "Schedule Technical Consultation",
    "ctaExplore": "Explore Engineering Services",
    "stat1Val": "99.99%",
    "stat1Label": "Target Uptime SLA",
    "stat2Val": "< 1.2s",
    "stat2Label": "Largest Contentful Paint",
    "stat3Val": "100%",
    "stat3Label": "IP & Code Ownership",
    "stat4Val": "24/7",
    "stat4Label": "Dedicated Technical Support",
    "servicesBadge": "Engineering Capabilities",
    "servicesTitle": "Specialized Software Solutions Built for Uncompromising Scale",
    "servicesSubtitle": "From high-performance frontend interfaces to distributed databases and autonomous agentic AI, our solutions are engineered with strict zero-trust quality.",
    "stackBadge": "Modern Tech Arsenal",
    "stackTitle": "Battle-Tested Technology Stack",
    "stackSubtitle": "We engineer systems with modern, enterprise-proven frameworks and runtimes to guarantee developer velocity, reliability, and security.",
    "stackTabFrontend": "Frontend & UI",
    "stackTabBackend": "Backend & APIs",
    "stackTabMobile": "Mobile Architecture",
    "stackTabDatabase": "Database & Caching",
    "stackTabCloud": "Cloud & DevOps",
    "stackTabAi": "AI & LLM Infra",
    "deliveryBadge": "Agile Blueprint",
    "deliveryTitle": "6-Stage Engineering Delivery Roadmap",
    "deliverySubtitle": "Transparent, milestone-based execution ensuring zero ambiguity, rapid iterations, and predictable delivery dates.",
    "guaranteesBadge": "Client Trust Standards",
    "guaranteesTitle": "Enterprise Client Guarantees",
    "guaranteesSubtitle": "How we protect your intellectual property, data security, and long-term project success.",
    "formBadge": "Technical Inquiry",
    "formTitle": "Request a Proposal or Consultation",
    "formSubtitle": "Tell us about your project requirements. A senior software architect will review your file and respond within 24 hours.",
    "formNameLabel": "Full Name",
    "formNamePlaceholder": "e.g. Ahmad Rahimi",
    "formEmailLabel": "Work Email",
    "formEmailPlaceholder": "name@company.com",
    "formPhoneLabel": "Phone / WhatsApp",
    "formPhonePlaceholder": "+93 799 000 000",
    "formServiceLabel": "Requested Engineering Service",
    "formBudgetLabel": "Estimated Budget Tier",
    "formDetailsLabel": "Project Scope & Technical Requirements",
    "formDetailsPlaceholder": "Describe your project vision, target timeline, technical requirements, and target user base...",
    "formSubmittingBtn": "Transmitting Request...",
    "formSubmitBtn": "Submit Technical Consultation Request",
    "formSuccessTitle": "Consultation Request Received!",
    "formSuccessDesc": "Our senior software engineering team has received your project brief. A technical lead will contact you via WhatsApp or Email within 24 hours.",
    "formErrorDesc": "An error occurred while submitting your inquiry. Please try again or reach out to us directly on WhatsApp or Telegram.",
    "faqsBadge": "FAQ & Inquiries",
    "faqsTitle": "Frequently Answered Questions",
    "services": [
      {
        "id": "web-app",
        "title": "Enterprise Full-Stack Web Applications",
        "badge": "High Concurrency",
        "shortDesc": "Sub-second load times, SEO-optimized server rendering, and scalable component architecture.",
        "longDesc": "We engineer high-performance web platforms using Next.js 14/15, React, TypeScript, and modern edge runtimes. By implementing Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and intelligent edge caching, we guarantee Core Web Vitals with Largest Contentful Paint (LCP) under 1.2 seconds. From multi-tenant SaaS dashboards to complex corporate portals, our web applications scale smoothly to millions of active users.",
        "features": [
          "Next.js App Router & TypeScript Strict Mode",
          "Sub-second TTFB with Global Edge Caching",
          "Enterprise RBAC & SSO (OAuth2 / SAML)",
          "State Management via Zustand & React Query",
          "Responsive Glassmorphic UI with Tailwind CSS",
          "Automated Lighthouse & Performance CI Audits"
        ]
      },
      {
        "id": "mobile-apps",
        "title": "Cross-Platform & Native Mobile Apps",
        "badge": "iOS & Android",
        "shortDesc": "Fluid 60 FPS mobile applications engineered with Flutter and native device integrations.",
        "longDesc": "Deliver a single, pixel-perfect codebase across iOS and Android without sacrificing native performance. Utilizing Flutter, Dart, and native Swift/Kotlin bridging, our mobile applications feature buttery-smooth 60/120 FPS animations, offline-first SQLite/Hive synchronization, biometrics (FaceID/Fingerprint), in-app purchases, and automated deployment pipelines to Apple App Store and Google Play Console.",
        "features": [
          "Flutter & Dart Cross-Platform Architecture",
          "Offline-First SQLite Data Synchronization",
          "Biometric Authentication & Secure Keychain",
          "Low-Latency Push Notifications & Deep Linking",
          "Background Geolocation & Background Tasks",
          "Automated CI/CD App Store Deployment"
        ]
      },
      {
        "id": "backend-cloud",
        "title": "High-Throughput Cloud & Backend Architecture",
        "badge": "Distributed Scale",
        "shortDesc": "Resilient microservices, real-time relational databases, and fault-tolerant cloud APIs.",
        "longDesc": "We build distributed backend systems capable of processing millions of concurrent requests. Built upon Node.js, Go, Python FastAPI, PostgreSQL, Supabase, and Redis caching layers, our systems incorporate strict database connection pooling, asynchronous task queues, and zero-downtime database migrations. Fully containerized with Docker and orchestrated on AWS or GCP for automatic horizontal scaling.",
        "features": [
          "PostgreSQL & Supabase Real-Time Engine",
          "Redis In-Memory Distributed Caching",
          "Go & Node.js Asynchronous Microservices",
          "Docker Containerization & Kubernetes Ready",
          "Strict Schema Validation via Zod & Prisma",
          "Rate Limiting, Anti-DDoS & WAF Protection"
        ]
      },
      {
        "id": "ai-integration",
        "title": "Autonomous AI Agents & LLM Infrastructure",
        "badge": "Next-Gen AI",
        "shortDesc": "Enterprise Retrieval-Augmented Generation (RAG), custom fine-tuning, and automated workflows.",
        "longDesc": "Supercharge your operational efficiency by embedding autonomous AI agents directly into your software workflow. We construct enterprise RAG (Retrieval-Augmented Generation) pipelines, connect proprietary vector databases (pgvector, Pinecone), and integrate state-of-the-art models from OpenAI, Anthropic Claude, and open-source Llama 3. Automate document ingestion, customer support triage, complex data analysis, and code generation.",
        "features": [
          "Enterprise RAG Pipelines with Hybrid Search",
          "Custom Vector Embeddings (pgvector / Pinecone)",
          "Autonomous Task Orchestration & Tool Calling",
          "Multi-Modal Vision, Speech & OCR Pipelines",
          "Hallucination Guardrails & Token Optimization",
          "Private On-Premise LLM Deployments (Ollama)"
        ]
      },
      {
        "id": "fintech-ecommerce",
        "title": "FinTech & E-Commerce Payment Systems",
        "badge": "PCI-DSS Level 1",
        "shortDesc": "High-security payment gateways, ledger accounting, recurring billing, and multi-currency checkout.",
        "longDesc": "FinTech software requires zero room for error. We engineer mission-critical billing engines and transactional ledgers supporting Stripe, PayPal, Apple Pay, and cryptocurrency gateways. Our payment implementations adhere to PCI-DSS Level 1 compliance standards, implement double-entry bookkeeping ledgers to prevent race conditions, and automate recurring subscriptions, usage-based invoicing, and tax calculations.",
        "features": [
          "Stripe Embedded & Custom Checkout Gateways",
          "Double-Entry Accounting Transaction Ledgers",
          "Webhook Event Queue Idempotency & Retries",
          "Multi-Currency Dynamic Conversion & FX Handling",
          "Automated Subscription Lifecycle & Churn Prevention",
          "Real-Time Anti-Fraud & Chargeback Detection"
        ]
      },
      {
        "id": "cybersecurity-audit",
        "title": "Cybersecurity Auditing & Code Hardening",
        "badge": "Zero-Trust",
        "shortDesc": "Vulnerability assessments, penetration testing, source code review, and compliance readiness.",
        "longDesc": "Protect your enterprise from data breaches, intellectual property theft, and zero-day vulnerabilities. Our security engineers perform comprehensive static and dynamic code analysis, automated dependency audits, OWASP Top 10 penetration testing, and IAM role segregation. We architect your infrastructure with zero-trust networking, end-to-end encryption at rest and in transit, and prepare your startup for SOC-2, GDPR, and HIPAA compliance.",
        "features": [
          "OWASP Top 10 Web & API Penetration Testing",
          "Automated Static Analysis (SAST) in CI/CD",
          "End-to-End AES-256 Data Encryption",
          "Zero-Trust Network Access & Strict IAM Roles",
          "Comprehensive Vulnerability Remediation Reports",
          "GDPR, HIPAA & SOC-2 Architecture Alignment"
        ]
      }
    ],
    "deliveryStages": [
      {
        "stage": "01",
        "title": "Technical Discovery & Blueprinting",
        "desc": "We analyze your business model, define user personas, design system entity-relationship diagrams (ERD), map API endpoints, and establish architectural milestones to eliminate ambiguity."
      },
      {
        "stage": "02",
        "title": "Interactive UI/UX & Design Systems",
        "desc": "Our design team creates sleek, high-fidelity clickable Figma prototypes with dark modes, glassmorphism, responsive breakpoints, and micro-interactions before writing a single line of code."
      },
      {
        "stage": "03",
        "title": "Agile Sprints & Bi-Weekly Demos",
        "desc": "Development proceeds in 2-week focused sprints. You receive staging access, automated test reports, and live video demonstrations at every milestone so you maintain total project visibility."
      },
      {
        "stage": "04",
        "title": "Rigorous QA, Security & Load Testing",
        "desc": "Every build undergoes static analysis, cross-browser compatibility checks, OWASP security audits, and simulated stress testing (10,000+ concurrent users) to guarantee fault tolerance."
      },
      {
        "stage": "05",
        "title": "Zero-Downtime Cloud Deployment",
        "desc": "We provision your production cloud infrastructure on AWS, GCP, or Hostinger, configure global CDNs, configure SSL certificates, and execute zero-downtime continuous deployment."
      },
      {
        "stage": "06",
        "title": "24/7 SLA, Monitoring & Code Handoff",
        "desc": "Upon launch, we transfer 100% intellectual property and repositories to you, provide comprehensive documentation, and offer dedicated 24/7 SLA monitoring to support your growth."
      }
    ],
    "clientGuarantees": [
      {
        "title": "100% Full IP & Code Ownership",
        "desc": "You retain full ownership of all source code, design assets, database schemas, and intellectual property. No vendor lock-in; everything is cleanly documented."
      },
      {
        "title": "Strict Non-Disclosure Agreements (NDA)",
        "desc": "We treat your business ideas and proprietary datasets with complete confidentiality. Comprehensive NDAs are signed before discovery discussions."
      },
      {
        "title": "Direct Senior Engineer Communication",
        "desc": "No non-technical account managers or communication bottlenecks. You collaborate directly with lead software engineers via private Slack, WhatsApp, or Teams channels."
      },
      {
        "title": "UK-Registered Enterprise Standards",
        "desc": "Operated with strict international corporate compliance, milestone-based transparent invoicing, and clear legal protections for global founders."
      }
    ],
    "faqs": [
      {
        "q": "How quickly can your engineering team start on my project?",
        "a": "Depending on current sprint allocations, we typically initiate technical discovery and architectural blueprinting within 3 to 5 business days following project agreement and NDA execution."
      },
      {
        "q": "Who owns the code and intellectual property once built?",
        "a": "You do. 100%. Upon completion of project milestones and final sign-off, full copyright, proprietary source code, Git repositories, deployment credentials, and documentation are transferred unconditionally to your company."
      },
      {
        "q": "How are project payments structured?",
        "a": "We operate on transparent, milestone-based payments. Projects are divided into clear deliverables (e.g., Discovery & Architecture, MVP Prototype, Core Backend & APIs, Final Production QA). You only approve payments when working deliverables are reviewed and verified on staging."
      },
      {
        "q": "Can you take over and refactor an existing software codebase?",
        "a": "Yes. Our team frequently conducts comprehensive code audits for startups and legacy systems. We identify technical debt, refactor bottlenecks, upgrade outdated dependencies, patch security vulnerabilities, and migrate to modern Next.js/Go architectures."
      },
      {
        "q": "What happens after our application goes live?",
        "a": "We don't abandon you after launch. Every project includes a post-launch warranty period for bug fixes and stability monitoring. We also provide ongoing monthly Maintenance SLAs covering security patches, feature expansions, and 24/7 cloud uptime monitoring."
      },
      {
        "q": "Do you build custom AI models or just integrate third-party APIs?",
        "a": "We do both. We build advanced RAG (Retrieval-Augmented Generation) pipelines connecting proprietary company data to top LLMs, fine-tune custom open-source models (like Llama 3 or Mistral) on private GPU clusters, and deploy autonomous agents tailored to your business logic."
      }
    ],
    "isRtl": false
  },
  "id": {
    "heroBadge": "Safi Academy Engineering Division",
    "heroTitle": "Bespoke Enterprise Software & AI Architecture",
    "heroSubtitle": "We architect mission-critical web platforms, fluid mobile apps, high-throughput cloud infrastructure, and autonomous AI agent pipelines built to scale to millions of users.",
    "ctaConsultation": "Schedule Technical Consultation",
    "ctaExplore": "Explore Engineering Services",
    "stat1Val": "99.99%",
    "stat1Label": "Target Uptime SLA",
    "stat2Val": "< 1.2s",
    "stat2Label": "Largest Contentful Paint",
    "stat3Val": "100%",
    "stat3Label": "IP & Code Ownership",
    "stat4Val": "24/7",
    "stat4Label": "Dedicated Technical Support",
    "servicesBadge": "Engineering Capabilities",
    "servicesTitle": "Specialized Software Solutions Built for Uncompromising Scale",
    "servicesSubtitle": "From high-performance frontend interfaces to distributed databases and autonomous agentic AI, our solutions are engineered with strict zero-trust quality.",
    "stackBadge": "Modern Tech Arsenal",
    "stackTitle": "Battle-Tested Technology Stack",
    "stackSubtitle": "We engineer systems with modern, enterprise-proven frameworks and runtimes to guarantee developer velocity, reliability, and security.",
    "stackTabFrontend": "Frontend & UI",
    "stackTabBackend": "Backend & APIs",
    "stackTabMobile": "Mobile Architecture",
    "stackTabDatabase": "Database & Caching",
    "stackTabCloud": "Cloud & DevOps",
    "stackTabAi": "AI & LLM Infra",
    "deliveryBadge": "Agile Blueprint",
    "deliveryTitle": "6-Stage Engineering Delivery Roadmap",
    "deliverySubtitle": "Transparent, milestone-based execution ensuring zero ambiguity, rapid iterations, and predictable delivery dates.",
    "guaranteesBadge": "Client Trust Standards",
    "guaranteesTitle": "Enterprise Client Guarantees",
    "guaranteesSubtitle": "How we protect your intellectual property, data security, and long-term project success.",
    "formBadge": "Technical Inquiry",
    "formTitle": "Request a Proposal or Consultation",
    "formSubtitle": "Tell us about your project requirements. A senior software architect will review your file and respond within 24 hours.",
    "formNameLabel": "Full Name",
    "formNamePlaceholder": "e.g. Ahmad Rahimi",
    "formEmailLabel": "Work Email",
    "formEmailPlaceholder": "name@company.com",
    "formPhoneLabel": "Phone / WhatsApp",
    "formPhonePlaceholder": "+93 799 000 000",
    "formServiceLabel": "Requested Engineering Service",
    "formBudgetLabel": "Estimated Budget Tier",
    "formDetailsLabel": "Project Scope & Technical Requirements",
    "formDetailsPlaceholder": "Describe your project vision, target timeline, technical requirements, and target user base...",
    "formSubmittingBtn": "Transmitting Request...",
    "formSubmitBtn": "Submit Technical Consultation Request",
    "formSuccessTitle": "Consultation Request Received!",
    "formSuccessDesc": "Our senior software engineering team has received your project brief. A technical lead will contact you via WhatsApp or Email within 24 hours.",
    "formErrorDesc": "An error occurred while submitting your inquiry. Please try again or reach out to us directly on WhatsApp or Telegram.",
    "faqsBadge": "FAQ & Inquiries",
    "faqsTitle": "Frequently Answered Questions",
    "services": [
      {
        "id": "web-app",
        "title": "Enterprise Full-Stack Web Applications",
        "badge": "High Concurrency",
        "shortDesc": "Sub-second load times, SEO-optimized server rendering, and scalable component architecture.",
        "longDesc": "We engineer high-performance web platforms using Next.js 14/15, React, TypeScript, and modern edge runtimes. By implementing Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), and intelligent edge caching, we guarantee Core Web Vitals with Largest Contentful Paint (LCP) under 1.2 seconds. From multi-tenant SaaS dashboards to complex corporate portals, our web applications scale smoothly to millions of active users.",
        "features": [
          "Next.js App Router & TypeScript Strict Mode",
          "Sub-second TTFB with Global Edge Caching",
          "Enterprise RBAC & SSO (OAuth2 / SAML)",
          "State Management via Zustand & React Query",
          "Responsive Glassmorphic UI with Tailwind CSS",
          "Automated Lighthouse & Performance CI Audits"
        ]
      },
      {
        "id": "mobile-apps",
        "title": "Cross-Platform & Native Mobile Apps",
        "badge": "iOS & Android",
        "shortDesc": "Fluid 60 FPS mobile applications engineered with Flutter and native device integrations.",
        "longDesc": "Deliver a single, pixel-perfect codebase across iOS and Android without sacrificing native performance. Utilizing Flutter, Dart, and native Swift/Kotlin bridging, our mobile applications feature buttery-smooth 60/120 FPS animations, offline-first SQLite/Hive synchronization, biometrics (FaceID/Fingerprint), in-app purchases, and automated deployment pipelines to Apple App Store and Google Play Console.",
        "features": [
          "Flutter & Dart Cross-Platform Architecture",
          "Offline-First SQLite Data Synchronization",
          "Biometric Authentication & Secure Keychain",
          "Low-Latency Push Notifications & Deep Linking",
          "Background Geolocation & Background Tasks",
          "Automated CI/CD App Store Deployment"
        ]
      },
      {
        "id": "backend-cloud",
        "title": "High-Throughput Cloud & Backend Architecture",
        "badge": "Distributed Scale",
        "shortDesc": "Resilient microservices, real-time relational databases, and fault-tolerant cloud APIs.",
        "longDesc": "We build distributed backend systems capable of processing millions of concurrent requests. Built upon Node.js, Go, Python FastAPI, PostgreSQL, Supabase, and Redis caching layers, our systems incorporate strict database connection pooling, asynchronous task queues, and zero-downtime database migrations. Fully containerized with Docker and orchestrated on AWS or GCP for automatic horizontal scaling.",
        "features": [
          "PostgreSQL & Supabase Real-Time Engine",
          "Redis In-Memory Distributed Caching",
          "Go & Node.js Asynchronous Microservices",
          "Docker Containerization & Kubernetes Ready",
          "Strict Schema Validation via Zod & Prisma",
          "Rate Limiting, Anti-DDoS & WAF Protection"
        ]
      },
      {
        "id": "ai-integration",
        "title": "Autonomous AI Agents & LLM Infrastructure",
        "badge": "Next-Gen AI",
        "shortDesc": "Enterprise Retrieval-Augmented Generation (RAG), custom fine-tuning, and automated workflows.",
        "longDesc": "Supercharge your operational efficiency by embedding autonomous AI agents directly into your software workflow. We construct enterprise RAG (Retrieval-Augmented Generation) pipelines, connect proprietary vector databases (pgvector, Pinecone), and integrate state-of-the-art models from OpenAI, Anthropic Claude, and open-source Llama 3. Automate document ingestion, customer support triage, complex data analysis, and code generation.",
        "features": [
          "Enterprise RAG Pipelines with Hybrid Search",
          "Custom Vector Embeddings (pgvector / Pinecone)",
          "Autonomous Task Orchestration & Tool Calling",
          "Multi-Modal Vision, Speech & OCR Pipelines",
          "Hallucination Guardrails & Token Optimization",
          "Private On-Premise LLM Deployments (Ollama)"
        ]
      },
      {
        "id": "fintech-ecommerce",
        "title": "FinTech & E-Commerce Payment Systems",
        "badge": "PCI-DSS Level 1",
        "shortDesc": "High-security payment gateways, ledger accounting, recurring billing, and multi-currency checkout.",
        "longDesc": "FinTech software requires zero room for error. We engineer mission-critical billing engines and transactional ledgers supporting Stripe, PayPal, Apple Pay, and cryptocurrency gateways. Our payment implementations adhere to PCI-DSS Level 1 compliance standards, implement double-entry bookkeeping ledgers to prevent race conditions, and automate recurring subscriptions, usage-based invoicing, and tax calculations.",
        "features": [
          "Stripe Embedded & Custom Checkout Gateways",
          "Double-Entry Accounting Transaction Ledgers",
          "Webhook Event Queue Idempotency & Retries",
          "Multi-Currency Dynamic Conversion & FX Handling",
          "Automated Subscription Lifecycle & Churn Prevention",
          "Real-Time Anti-Fraud & Chargeback Detection"
        ]
      },
      {
        "id": "cybersecurity-audit",
        "title": "Cybersecurity Auditing & Code Hardening",
        "badge": "Zero-Trust",
        "shortDesc": "Vulnerability assessments, penetration testing, source code review, and compliance readiness.",
        "longDesc": "Protect your enterprise from data breaches, intellectual property theft, and zero-day vulnerabilities. Our security engineers perform comprehensive static and dynamic code analysis, automated dependency audits, OWASP Top 10 penetration testing, and IAM role segregation. We architect your infrastructure with zero-trust networking, end-to-end encryption at rest and in transit, and prepare your startup for SOC-2, GDPR, and HIPAA compliance.",
        "features": [
          "OWASP Top 10 Web & API Penetration Testing",
          "Automated Static Analysis (SAST) in CI/CD",
          "End-to-End AES-256 Data Encryption",
          "Zero-Trust Network Access & Strict IAM Roles",
          "Comprehensive Vulnerability Remediation Reports",
          "GDPR, HIPAA & SOC-2 Architecture Alignment"
        ]
      }
    ],
    "deliveryStages": [
      {
        "stage": "01",
        "title": "Technical Discovery & Blueprinting",
        "desc": "We analyze your business model, define user personas, design system entity-relationship diagrams (ERD), map API endpoints, and establish architectural milestones to eliminate ambiguity."
      },
      {
        "stage": "02",
        "title": "Interactive UI/UX & Design Systems",
        "desc": "Our design team creates sleek, high-fidelity clickable Figma prototypes with dark modes, glassmorphism, responsive breakpoints, and micro-interactions before writing a single line of code."
      },
      {
        "stage": "03",
        "title": "Agile Sprints & Bi-Weekly Demos",
        "desc": "Development proceeds in 2-week focused sprints. You receive staging access, automated test reports, and live video demonstrations at every milestone so you maintain total project visibility."
      },
      {
        "stage": "04",
        "title": "Rigorous QA, Security & Load Testing",
        "desc": "Every build undergoes static analysis, cross-browser compatibility checks, OWASP security audits, and simulated stress testing (10,000+ concurrent users) to guarantee fault tolerance."
      },
      {
        "stage": "05",
        "title": "Zero-Downtime Cloud Deployment",
        "desc": "We provision your production cloud infrastructure on AWS, GCP, or Hostinger, configure global CDNs, configure SSL certificates, and execute zero-downtime continuous deployment."
      },
      {
        "stage": "06",
        "title": "24/7 SLA, Monitoring & Code Handoff",
        "desc": "Upon launch, we transfer 100% intellectual property and repositories to you, provide comprehensive documentation, and offer dedicated 24/7 SLA monitoring to support your growth."
      }
    ],
    "clientGuarantees": [
      {
        "title": "100% Full IP & Code Ownership",
        "desc": "You retain full ownership of all source code, design assets, database schemas, and intellectual property. No vendor lock-in; everything is cleanly documented."
      },
      {
        "title": "Strict Non-Disclosure Agreements (NDA)",
        "desc": "We treat your business ideas and proprietary datasets with complete confidentiality. Comprehensive NDAs are signed before discovery discussions."
      },
      {
        "title": "Direct Senior Engineer Communication",
        "desc": "No non-technical account managers or communication bottlenecks. You collaborate directly with lead software engineers via private Slack, WhatsApp, or Teams channels."
      },
      {
        "title": "UK-Registered Enterprise Standards",
        "desc": "Operated with strict international corporate compliance, milestone-based transparent invoicing, and clear legal protections for global founders."
      }
    ],
    "faqs": [
      {
        "q": "How quickly can your engineering team start on my project?",
        "a": "Depending on current sprint allocations, we typically initiate technical discovery and architectural blueprinting within 3 to 5 business days following project agreement and NDA execution."
      },
      {
        "q": "Who owns the code and intellectual property once built?",
        "a": "You do. 100%. Upon completion of project milestones and final sign-off, full copyright, proprietary source code, Git repositories, deployment credentials, and documentation are transferred unconditionally to your company."
      },
      {
        "q": "How are project payments structured?",
        "a": "We operate on transparent, milestone-based payments. Projects are divided into clear deliverables (e.g., Discovery & Architecture, MVP Prototype, Core Backend & APIs, Final Production QA). You only approve payments when working deliverables are reviewed and verified on staging."
      },
      {
        "q": "Can you take over and refactor an existing software codebase?",
        "a": "Yes. Our team frequently conducts comprehensive code audits for startups and legacy systems. We identify technical debt, refactor bottlenecks, upgrade outdated dependencies, patch security vulnerabilities, and migrate to modern Next.js/Go architectures."
      },
      {
        "q": "What happens after our application goes live?",
        "a": "We don't abandon you after launch. Every project includes a post-launch warranty period for bug fixes and stability monitoring. We also provide ongoing monthly Maintenance SLAs covering security patches, feature expansions, and 24/7 cloud uptime monitoring."
      },
      {
        "q": "Do you build custom AI models or just integrate third-party APIs?",
        "a": "We do both. We build advanced RAG (Retrieval-Augmented Generation) pipelines connecting proprietary company data to top LLMs, fine-tune custom open-source models (like Llama 3 or Mistral) on private GPU clusters, and deploy autonomous agents tailored to your business logic."
      }
    ],
    "isRtl": false
  }
};

export function getDevelopmentServicesTranslation(locale: string): DevelopmentServicesTranslation {
  return developmentServicesTranslations[locale] || developmentServicesTranslations["en"];
}
