// ============================================================================
// SAFI ACADEMY - 19 LANGUAGES DEVELOPMENT SERVICES TRANSLATIONS (100% NATIVE)
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
  optServiceWeb: string;
  optServiceMobile: string;
  optServiceAi: string;
  optServiceBackend: string;
  optServiceFintech: string;
  optServiceSecurity: string;
  optServiceOther: string;
  optBudgetDiscuss: string;
  optBudgetMvp: string;
  optBudgetProd: string;
  optBudgetEnterprise: string;
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
    "isRtl": false,
    "optServiceWeb": "Enterprise Full-Stack Web Application",
    "optServiceMobile": "Mobile App (iOS/Android Flutter)",
    "optServiceAi": "Custom AI Integration & Autonomous Agents",
    "optServiceBackend": "Backend & Cloud Microservices Architecture",
    "optServiceFintech": "FinTech & E-Commerce Payment Systems",
    "optServiceSecurity": "Cybersecurity Auditing & Code Hardening",
    "optServiceOther": "Other Custom Engineering",
    "optBudgetDiscuss": "To be discussed / Discovery phase",
    "optBudgetMvp": "$1,000 - $5,000 (MVP / Prototype)",
    "optBudgetProd": "$5,000 - $15,000 (Standard Production Platform)",
    "optBudgetEnterprise": "$15,000+ (Enterprise Multi-Platform & AI)"
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
        "title": "توسعه وب‌اپلیکیشن‌های پیشرفته سازمانی",
        "badge": "ترافیک و مقیاس بالا",
        "shortDesc": "سرعت لود زیر یک ثانیه، بهینه‌سازی کامل سئو، و معماری ماژولار مقیاس‌پذیر.",
        "longDesc": "طراحی و توسعه پلتفرم‌های مدرن وب با فریم‌ورک Next.js، React، TypeScript و فناوری‌های ابری اج (Edge). تضمین نمرات برتر در ارزیابی‌های سرعت Core Web Vitals و مقیاس‌پذیری نرم‌افزار برای پاسخگویی پایدار به میلیون‌ها کاربر همزمان.",
        "features": [
          "معماری مدرن Next.js App Router و تایپ‌اسکریپت پیشرفته",
          "لودینگ فوق‌العاده سریع با شبکه توزیع محتوای جهانی",
          "سیستم احراز هویت سازمانی و سطوح دسترسی (RBAC / SSO)",
          "مدیریت وضعیت بهینه با React Query و Zustand",
          "رابط کاربری مدرن، واکنش‌گرا و سازگار با انواع نمایشگرها",
          "تست‌های خودکار کارایی و تست یکپارچگی کد در CI/CD"
        ]
      },
      {
        "id": "mobile-app",
        "title": "اپلیکیشن‌های موبایل چندپلتفرمی و بومی",
        "badge": "اندروید و iOS",
        "shortDesc": "تجربه کاربری ۶۰ تا ۱۲۰ فریم بر ثانیه با معماری فلاتر و کدهای بومی پایدار.",
        "longDesc": "توسعه نرم‌افزارهای موبایل یکپارچه برای سیستم‌های iOS و اندروید با فریم‌ورک Flutter و زبان Dart. هماهنگی کامل با سنسورهای سخت‌افزاری، پردازش آفلاین، پوش نوتیفیکیشن اختصاصی و اتصال پایدار به وب‌سرویس‌های ابری.",
        "features": [
          "کدبیس واحد برای انتشار همزمان در App Store و Google Play",
          "انیمیشن‌های روان و فریم‌ریت پایدار بدون افت فریم",
          "قابلیت ذخیره‌سازی محلی و همگام‌سازی هوشمند آفلاین",
          "پشتیبانی از پرداخت درون‌برنامه‌ای بین‌المللی",
          "سیستم اعلان‌های زنده (Push Notification) با معماری پیام‌رسان",
          "طراحی هوشمندانه دارک‌مود و لایت‌مود استاندارد"
        ]
      },
      {
        "id": "cloud-backend",
        "title": "معماری بک‌اند و میکروسرویس‌های ابری",
        "badge": "توان عملیاتی بالا",
        "shortDesc": "معماری میکروسرویس‌های توزیع‌شده با Node.js، Go، داکر و پایگاه‌های داده مقیاس‌پذیر.",
        "longDesc": "طراحی هسته نرم‌افزاری پردازش با پایگاه‌های داده توزیع‌شده PostgreSQL، Redis و Kafka. تضمین پایداری ۹۹.۹۹٪ زیر بار محاسباتی سنگین، رمزنگاری سطح بالا در حالت انتقال و استراحت، و قابلیت خوشه‌بندی کانتینری در کلاود.",
        "features": [
          "طراحی میکروسرویس‌های توزیع‌شده بر بستر Docker و Kubernetes",
          "بهینه‌سازی پایگاه داده با سیستم کشینگ هوشمند Redis",
          "معماری مبتنی بر رویداد (Event-Driven) با صف‌های پیام",
          "احراز هویت بدون حالت (Stateless) با کلیدهای امن JWT / OAuth2",
          "مانیتورینگ ۲۴/۷ شاخص‌های سرور و لاگ‌گیری متمرکز",
          "تست استرس و شبیه‌سازی ترافیک برای کشف گلوگاه‌ها"
        ]
      },
      {
        "id": "ai-agents",
        "title": "زیرساخت هوش مصنوعی و ایجنت‌های خودمختار",
        "badge": "هوش مصنوعی نسل جدید",
        "shortDesc": "پیاده‌سازی مدل‌های زبانی بزرگ، پایگاه داده‌های برداری (RAG) و ایجنت‌های هوشمند خودکار.",
        "longDesc": "اتصال نرم‌افزارهای تجاری شما به جدیدترین مدل‌های هوش مصنوعی (مانند Gemini و Claude). توسعه خطوط پایپ‌لاین تولید پاسخ مبتنی بر دانش سازمانی (RAG)، ایجنت‌های چندگانه برای پردازش داده‌ها و ابزارهای تحلیلی بدون وقفه.",
        "features": [
          "معماری RAG متصل به پایگاه‌های داده برداری (Vector Databases)",
          "ایجنت‌های خودمختار برای پاسخگویی هوشمند به مشتریان",
          "فراخوانی توابع API و پایپ‌لاین‌های چندمرحله‌ای مدل‌های زبانی",
          "تنظیم دقیق (Fine-Tuning) و سیستم‌های محافظت از حریم خصوصی",
          "جریان‌دهی بلادرنگ داده‌ها (Real-Time Streaming)",
          "کاهش هزینه‌های توکن و بهینه‌سازی مصرف توکن‌ها"
        ]
      },
      {
        "id": "fintech-payments",
        "title": "سیستم‌های مالی، فین‌تک و درگاه‌های پرداخت",
        "badge": "امنیت و تراکنش",
        "shortDesc": "اتصال به شبکه بانکی بین‌المللی، کیف پول دیجیتال، و سیستم‌های صورت‌حساب خودکار.",
        "longDesc": "طراحی درگاه‌های پرداخت بین‌المللی چندارزی (مانند استرایپ، پی‌پال و شبکه‌های محلی)، سیستم‌های تسویه‌حساب خودکار، کیف پول‌های الکترونیکی و تولید فاکتورهای رسمی همگام با موازین ضدپولشویی (AML) و شناخت مشتری (KYC).",
        "features": [
          "یکپارچه‌سازی درگاه‌های پرداخت جهانی (Stripe / PayPal)",
          "کیف پول‌های چندارزی با رهگیری لحظه‌ای تراکنش‌ها",
          "سیستم‌های اشتراک و فاکتوردهی خودکار دوره‌ای",
          "تطابق با استانداردهای امنیتی داده‌های کارت پرداخت (PCI-DSS)",
          "مکانیسم‌های هوشمند تشخیص کلاهبرداری و برگشت پول",
          "صدور رسیدهای رسمی دیجیتال و گزارش‌گیری مالیاتی"
        ]
      },
      {
        "id": "security-audit",
        "title": "حسابرسی امنیت سایبری و مقاوم‌سازی کد",
        "badge": "حفاظت سازمانی",
        "shortDesc": "تست نفوذ، بازبینی کدهای سورس، برطرف‌سازی آسیب‌پذیری‌ها و ایمن‌سازی سرور.",
        "longDesc": "بررسی جامع کدهای نرم‌افزاری و زیرساخت ابری شما در برابر ۱۰ آسیب‌پذیری برتر OWASP. گزارش دقیق مخاطرات امنیتی، ارتقای معماری رمزنگاری و مقاوم‌سازی نرم‌افزار در برابر حملات سایبری و نشت اطلاعات.",
        "features": [
          "ارزیابی جامع در برابر آسیب‌پذیری‌های امنیتی OWASP Top 10",
          "تست نفوذپذیری دستی و اسکن‌های امنیتی خودکار زیرساخت",
          "بازبینی دقیق کدهای امنیتی و ممیزی مدیریت کلیدها",
          "مقاوم‌سازی کانتینرها و تنظیمات امنیتی فایروال سرور",
          "بررسی مجوزهای داده و پیشگیری از نشت داده‌های کاربران",
          "ارائه گزارش جامع حقوقی و فنی امنیتی همراه با راهکارهای اصلاحی"
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
    "isRtl": true,
    "optServiceWeb": "وب‌اپلیکیشن فول‌استک سازمانی",
    "optServiceMobile": "اپلیکیشن موبایل (اندروید و iOS با فلاتر)",
    "optServiceAi": "هوش مصنوعی اختصاصی و ایجنت‌های هوشمند",
    "optServiceBackend": "معماری بک‌اند و میکروسرویس‌های ابری",
    "optServiceFintech": "سیستم‌های پرداخت و فین‌تک",
    "optServiceSecurity": "حسابرسی امنیت سایبری و تست نفوذ",
    "optServiceOther": "سایر پروژه‌های نرم‌افزاری سفارشی",
    "optBudgetDiscuss": "نیاز به بررسی در جلسه مشاوره / مرحله تحلیل",
    "optBudgetMvp": "۱٬۰۰۰ تا ۵٬۰۰۰ دلار (نسخه اولیه / MVP)",
    "optBudgetProd": "۵٬۰۰۰ تا ۱۵٬۰۰۰ دلار (سامانه استاندارد کامل)",
    "optBudgetEnterprise": "بیش از ۱۵٬۰۰۰ دلار (سامانه یکپارچه سازمانی و AI)"
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
    "isRtl": true,
    "optServiceWeb": "پرمختللی شرکتي ویب اپلیکیشن",
    "optServiceMobile": "د موبایل اپلیکیشن (د فلاتر له لارې iOS او Android)",
    "optServiceAi": "ځانګړی مصنوعي هوښ (AI) او خپلواک ایجنټان",
    "optServiceBackend": "بیک اینډ او کلاوډ مایکروسرویسونه",
    "optServiceFintech": "د تادیاتو او فینټیک مالي سیستمونه",
    "optServiceSecurity": "د سایبري امنیت پلټنه او نفوذ ازموینه",
    "optServiceOther": "نور ځانګړي سافټویري پروژې",
    "optBudgetDiscuss": "د مشورې په ناسته کې بحث / د تحلیل پړاو",
    "optBudgetMvp": "۱،۰۰۰ تر ۵،۰۰۰ ډالره (لومړنۍ نمونه / MVP)",
    "optBudgetProd": "۵،۰۰۰ تر ۱۵،۰۰۰ ډالره (بشپړ مسلکي سیستم)",
    "optBudgetEnterprise": "له ۱۵،۰۰۰ ډالرو پورته (لوی کارپوریټ سیستم او AI)"
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
    "isRtl": false,
    "optServiceWeb": "Корпоративное веб-приложение Full-Stack",
    "optServiceMobile": "Мобильное приложение (iOS/Android на Flutter)",
    "optServiceAi": "Интеграция искусственного интеллекта и AI-агенты",
    "optServiceBackend": "Облачный бэкенд и микросервисная архитектура",
    "optServiceFintech": "Платежные шлюзы и финтех-решения",
    "optServiceSecurity": "Аудит кибербезопасности и пентестинг",
    "optServiceOther": "Другая заказная разработка ПО",
    "optBudgetDiscuss": "Обсудить на консультации / Этап предпроектного анализа",
    "optBudgetMvp": "$1,000 - $5,000 (MVP / Прототип)",
    "optBudgetProd": "$5,000 - $15,000 (Полноценный релиз продукта)",
    "optBudgetEnterprise": "$15,000+ (Крупный корпоративный проект с AI)"
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
    "isRtl": false,
    "optServiceWeb": "Kurumsal Full-Stack Web Uygulaması",
    "optServiceMobile": "Mobil Uygulama (Flutter ile iOS ve Android)",
    "optServiceAi": "Özel Yapay Zeka Entegrasyonu ve Otonom Ajanlar",
    "optServiceBackend": "Bulut Arka Plan ve Mikroservis Mimarisi",
    "optServiceFintech": "FinTek ve E-Ticaret Ödeme Altyapıları",
    "optServiceSecurity": "Siber Güvenlik Denetimi ve Sızma Testi",
    "optServiceOther": "Diğer Özel Yazılım Çözümleri",
    "optBudgetDiscuss": "Danışmanlıkta Belirlenecek / Keşif Aşaması",
    "optBudgetMvp": "$1.000 - $5.000 (MVP / Prototip)",
    "optBudgetProd": "$5.000 - $15.000 (Tam Kapsamlı Üretim Platformu)",
    "optBudgetEnterprise": "$15.000+ (Büyük Ölçekli Kurumsal Sistem ve AI)"
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
    "isRtl": false,
    "optServiceWeb": "Enterprise Full-Stack Webanwendung",
    "optServiceMobile": "Mobile App (iOS/Android mit Flutter)",
    "optServiceAi": "Maßgeschneiderte KI-Integration & Autonome Agenten",
    "optServiceBackend": "Backend- und Cloud-Mikroservice-Architektur",
    "optServiceFintech": "FinTech- und E-Commerce-Zahlungssysteme",
    "optServiceSecurity": "Cybersicherheitsaudit & Penetrationstests",
    "optServiceOther": "Individuelle Softwareentwicklung",
    "optBudgetDiscuss": "Wird im Beratungsgespräch festgelegt / Analysephase",
    "optBudgetMvp": "1.000 $ - 5.000 $ (MVP / Prototyp)",
    "optBudgetProd": "5.000 $ - 15.000 $ (Vollständige Produktionsplattform)",
    "optBudgetEnterprise": "15.000 $+ (Großes Unternehmenssystem & KI)"
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
    "isRtl": false,
    "optServiceWeb": "Application Web Full-Stack d'entreprise",
    "optServiceMobile": "Application mobile (iOS/Android sous Flutter)",
    "optServiceAi": "Intégration d'IA sur mesure & Agents autonomes",
    "optServiceBackend": "Architecture backend & Microservices cloud",
    "optServiceFintech": "Systèmes de paiement FinTech & E-commerce",
    "optServiceSecurity": "Audit de cybersécurité & Tests d'intrusion",
    "optServiceOther": "Autre développement logiciel sur mesure",
    "optBudgetDiscuss": "À définir en réunion de cadrage / Phase de découverte",
    "optBudgetMvp": "1 000 $ - 5 000 $ (MVP / Prototype)",
    "optBudgetProd": "5 000 $ - 15 000 $ (Plateforme de production complète)",
    "optBudgetEnterprise": "15 000 $ et plus (Système d'entreprise & IA)"
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
    "isRtl": true,
    "optServiceWeb": "تطبيق ويب متكامل للمؤسسات",
    "optServiceMobile": "تطبيق هاتف محمول (Flutter لأنظمة iOS و Android)",
    "optServiceAi": "حلول الذكاء الاصطناعي والوكلاء المستقلون",
    "optServiceBackend": "البنية التحتية الخلفية والخدمات السحابية المصغرة",
    "optServiceFintech": "أنظمة الدفع الإلكتروني والتكنولوجيا المالية (FinTech)",
    "optServiceSecurity": "التدقيق الأمني واختبارات الاختراق البرمجي",
    "optServiceOther": "تطوير برمجيات مخصصة أخرى",
    "optBudgetDiscuss": "تحديد الميزانية في الجلسة الاستشارية / مرحلة التحليل",
    "optBudgetMvp": "1,000$ إلى 5,000$ (نموذج أولي / MVP)",
    "optBudgetProd": "5,000$ إلى 15,000$ (منصة إنتاج متكاملة)",
    "optBudgetEnterprise": "+15,000$ (منصة مؤسسية شاملة مع AI)"
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
    "isRtl": true,
    "optServiceWeb": "انٹرپرائز فل اسٹیک ویب ایپلیکیشن",
    "optServiceMobile": "موبائل ایپ (فflutter کے ذریعے iOS اور Android)",
    "optServiceAi": "کسٹم مصنوعی ذہانت (AI) اور خود مختار ایجنٹس",
    "optServiceBackend": "بیک اینڈ اور کلاؤڈ مائیکرو سروسز آرکیٹیکچر",
    "optServiceFintech": "فنٹیک اور ای کامرس پیمنٹ سسٹمز",
    "optServiceSecurity": "سائبر سیکیورٹی آڈٹ اور پینٹسٹنگ",
    "optServiceOther": "دیگر کسٹم سافٹ ویئر پروجیکٹس",
    "optBudgetDiscuss": "مشاورتی سیشن میں بات چیت / تجزیاتی مرحلہ",
    "optBudgetMvp": "1,000$ سے 5,000$ (ابتدائی پروٹو ٹائپ / MVP)",
    "optBudgetProd": "5,000$ سے 15,000$ (معیاری مکمل پروڈکشن سسٹم)",
    "optBudgetEnterprise": "15,000$+ (بڑے پیمانے کا انٹرپرائز اور AI سسٹم)"
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
    "isRtl": false,
    "optServiceWeb": "Aplicación Web Full-Stack Empresarial",
    "optServiceMobile": "Aplicación Móvil (iOS/Android con Flutter)",
    "optServiceAi": "Integración de IA a medida y Agentes Autónomos",
    "optServiceBackend": "Arquitectura Backend y Microservicios en la Nube",
    "optServiceFintech": "Sistemas de Pago FinTech y Comercio Electrónico",
    "optServiceSecurity": "Auditoría de Ciberseguridad y Pentesting",
    "optServiceOther": "Otro Desarrollo de Software a Medida",
    "optBudgetDiscuss": "A definir en la sesión de consultoría / Fase de análisis",
    "optBudgetMvp": "$1,000 - $5,000 (MVP / Prototipo)",
    "optBudgetProd": "$5,000 - $15,000 (Plataforma de producción completa)",
    "optBudgetEnterprise": "$15,000+ (Sistema corporativo a gran escala con IA)"
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
    "isRtl": false,
    "optServiceWeb": "企业级全栈 Web 应用系统",
    "optServiceMobile": "跨平台移动原生 App (Flutter / iOS / Android)",
    "optServiceAi": "企业专属大模型及自主 AI 智能体集成",
    "optServiceBackend": "高并发云原生后端与微服务架构",
    "optServiceFintech": "跨境金融科技与多币种支付结算系统",
    "optServiceSecurity": "网络安全代码审计与全流程渗透测试",
    "optServiceOther": "其他定制化工业级软件工程",
    "optBudgetDiscuss": "预约顾问需求调研评估 / 探索分析阶段",
    "optBudgetMvp": "$1,000 - $5,000 (MVP 原型验证版本)",
    "optBudgetProd": "$5,000 - $15,000 (标准化正式商用生产系统)",
    "optBudgetEnterprise": "$15,000+ (大型跨平台企业级系统与 AI 深度融合)"
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
    "isRtl": false,
    "optServiceWeb": "एंटरप्राइज फुल-स्टैक वेब एप्लीकेशन",
    "optServiceMobile": "मोबाइल ऐप (Flutter द्वारा iOS और Android)",
    "optServiceAi": "कस्टम आर्टिफिशियल इंटेलिजेंस (AI) और ऑटोनॉमस एजेंट्स",
    "optServiceBackend": "क्लाउड बैकएंड और माइक्रोसर्विसेज आर्किटेक्चर",
    "optServiceFintech": "फिनटेक और ई-कॉमर्स पेमेंट सिस्टम",
    "optServiceSecurity": "साइबर सुरक्षा ऑडिट और पेन-टेस्टिंग",
    "optServiceOther": "अन्य कस्टम सॉफ्टवेयर डेवलपमेंट",
    "optBudgetDiscuss": "परामर्श सत्र में चर्चा / विश्लेषण चरण",
    "optBudgetMvp": "$1,000 - $5,000 (प्रोटोटाइप / MVP)",
    "optBudgetProd": "$5,000 - $15,000 (पूर्ण मानक प्रोडक्शन प्लेटफॉर्म)",
    "optBudgetEnterprise": "$15,000+ (बड़े पैमाने का एंटरप्राइज और AI सिस्टम)"
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
    "isRtl": false,
    "optServiceWeb": "Applicazione Web Full-Stack aziendale",
    "optServiceMobile": "App mobile (iOS/Android sviluppata in Flutter)",
    "optServiceAi": "Integrazione IA personalizzata e Agenti Autonomi",
    "optServiceBackend": "Architettura backend e microservizi cloud",
    "optServiceFintech": "Sistemi di pagamento FinTech ed E-commerce",
    "optServiceSecurity": "Audit di sicurezza informatica e test di penetrazione",
    "optServiceOther": "Altro sviluppo software personalizzato",
    "optBudgetDiscuss": "Da concordare in consulenza / Fase di analisi",
    "optBudgetMvp": "$1.000 - $5.000 (MVP / Prototipo)",
    "optBudgetProd": "$5.000 - $15.000 (Piattaforma di produzione completa)",
    "optBudgetEnterprise": "$15.000+ (Sistema aziendale su larga scala con IA)"
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
    "isRtl": false,
    "optServiceWeb": "Aplicação Web Full-Stack Empresarial",
    "optServiceMobile": "Aplicativo Mobile (iOS/Android com Flutter)",
    "optServiceAi": "Integração de IA sob medida e Agentes Autônomos",
    "optServiceBackend": "Arquitetura Backend e Microsserviços em Nuvem",
    "optServiceFintech": "Sistemas de Pagamento FinTech e E-commerce",
    "optServiceSecurity": "Auditoria de Segurança Cibernética e Pentest",
    "optServiceOther": "Outro Desenvolvimento de Software Sob Medida",
    "optBudgetDiscuss": "A definir em consultoria / Fase de descoberta",
    "optBudgetMvp": "$1.000 - $5.000 (MVP / Protótipo)",
    "optBudgetProd": "$5.000 - $15.000 (Plataforma completa em produção)",
    "optBudgetEnterprise": "$15.000+ (Sistema corporativo robusto com IA)"
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
    "isRtl": false,
    "optServiceWeb": "エンタープライズ向けフルスタックWebアプリケーション",
    "optServiceMobile": "クロスプラットフォームモバイルアプリ (Flutter / iOS / Android)",
    "optServiceAi": "カスタムAI統合および自律型AIエージェント構築",
    "optServiceBackend": "高並行クラウドバックエンド＆マイクロサービス構造",
    "optServiceFintech": "FinTechおよびEコマース決済基盤システム",
    "optServiceSecurity": "サイバーセキュリティ監査および脆弱性診断",
    "optServiceOther": "その他の特注ソフトウェア開発",
    "optBudgetDiscuss": "個別コンサルティングにて決定 / 要件定義フェーズ",
    "optBudgetMvp": "$1,000 - $5,000 (MVP / プロトタイプ検証)",
    "optBudgetProd": "$5,000 - $15,000 (本格運用向け本番システム)",
    "optBudgetEnterprise": "$15,000+ (大規模エンタープライズ＆AI連携基盤)"
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
    "isRtl": false,
    "optServiceWeb": "기업용 풀스택 웹 애플리케이션",
    "optServiceMobile": "크로스 플랫폼 모바일 앱 (Flutter / iOS / Android)",
    "optServiceAi": "맞춤형 AI 통합 및 자율형 AI 에이전트 구축",
    "optServiceBackend": "고성능 클라우드 백엔드 및 마이크로서비스 아키텍처",
    "optServiceFintech": "핀테크 및 이커머스 결제 시스템",
    "optServiceSecurity": "사이버 보안 감사 및 모의 침투 테스트",
    "optServiceOther": "기타 맞춤형 소프트웨어 엔지니어링",
    "optBudgetDiscuss": "상담 시 협의 / 요구사항 분석 단계",
    "optBudgetMvp": "$1,000 - $5,000 (MVP / 프로토타입)",
    "optBudgetProd": "$5,000 - $15,000 (표준 상용화 플랫폼)",
    "optBudgetEnterprise": "$15,000+ (대규모 엔터프라이즈 및 AI 통합 시스템)"
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
    "isRtl": false,
    "optServiceWeb": "Enterprise Full-Stack Webapplicatie",
    "optServiceMobile": "Mobiele app (iOS/Android met Flutter)",
    "optServiceAi": "Op maat gemaakte AI-integratie & Autonome Agenten",
    "optServiceBackend": "Backend- en cloud-microservices architectuur",
    "optServiceFintech": "FinTech- en e-commerce betaalsystemen",
    "optServiceSecurity": "Cybersecurity audit & penetratietesten",
    "optServiceOther": "Overige maatwerk softwareontwikkeling",
    "optBudgetDiscuss": "Te bepalen tijdens adviesgesprek / Analysefase",
    "optBudgetMvp": "$1.000 - $5.000 (MVP / Prototype)",
    "optBudgetProd": "$5.000 - $15.000 (Volledig productieplatform)",
    "optBudgetEnterprise": "$15.000+ (Grootschalig bedrijfssysteem met AI)"
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
    "isRtl": false,
    "optServiceWeb": "Korporativ Full-Stack veb-ilova",
    "optServiceMobile": "Mobil ilova (Flutter orqali iOS va Android)",
    "optServiceAi": "Maxsus sun'iy intellekt (AI) va avtonom agentlar",
    "optServiceBackend": "Bulutli bekand va mikroservislar arxitekturasi",
    "optServiceFintech": "FinTex va elektron tijorat to'lov tizimlari",
    "optServiceSecurity": "Kiberxavfsizlik auditi va zaifliklarni tekshirish",
    "optServiceOther": "Boshqa maxsus dasturiy ta'minot ishlab chiqish",
    "optBudgetDiscuss": "Maslahatlashuvda kelishiladi / Tahlil bosqichi",
    "optBudgetMvp": "$1,000 - $5,000 (MVP / Dastlabki namuna)",
    "optBudgetProd": "$5,000 - $15,000 (To'liq standart ishchi tizim)",
    "optBudgetEnterprise": "$15,000+ (Yirik korporativ tizim va AI)"
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
    "isRtl": false,
    "optServiceWeb": "Aplikasi Web Full-Stack Kelas Perusahaan",
    "optServiceMobile": "Aplikasi Mobile (iOS/Android dengan Flutter)",
    "optServiceAi": "Integrasi AI Khusus & Agen Cerdas Otonom",
    "optServiceBackend": "Arsitektur Backend & Microservices Cloud",
    "optServiceFintech": "Sistem Pembayaran FinTech & E-Commerce",
    "optServiceSecurity": "Audit Keamanan Siber & Uji Penetrasi",
    "optServiceOther": "Pengembangan Perangkat Lunak Kustom Lainnya",
    "optBudgetDiscuss": "Didiskusikan dalam sesi konsultasi / Tahap analisis",
    "optBudgetMvp": "$1.000 - $5.000 (MVP / Prototipe)",
    "optBudgetProd": "$5.000 - $15.000 (Platform Produksi Standar Penuh)",
    "optBudgetEnterprise": "$15.000+ (Sistem Perusahaan Skala Besar & AI)"
  }
};

export function getDevelopmentServicesTranslation(locale: string): DevelopmentServicesTranslation {
  const normalized = (locale || "en").toLowerCase();
  return developmentServicesTranslations[normalized] || developmentServicesTranslations.en;
}
