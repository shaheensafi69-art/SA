import fs from "fs";

const LOCALES = ["en", "fa", "ps", "ru", "tr", "de", "fr", "ar", "ur", "es", "zh", "hi", "it", "pt", "ja", "ko", "nl", "uz", "id"];
const RTL_LOCALES = new Set(["fa", "ps", "ar", "ur"]);

const BASE_DATA = {
  disclosure: "Safi Academy maintains an official affiliate partnership with Hostinger. When you purchase hosting through our verified referral link or apply coupon code 89LSHAHEEKCO, you receive an exclusive 20% additional discount on your order, and Safi Academy may earn a referral commission at no additional cost to you. This support enables us to continue offering free coding, cloud, and entrepreneurship education globally.",
  partnerDisclosureBadge: "Transparent Affiliate Disclosure:",
  heroBadge: "Safi Academy Verified Partner • 20% Off Code: 89LSHAHEEKCO",
  heroTitle: "Ultra-Fast NVMe Cloud & Next-Gen Web Hosting",
  heroSubtitle: "Power your websites, web applications, and digital business on world-class infrastructure. Equipped with LiteSpeed Enterprise web servers, enterprise NVMe SSDs, 99.9% uptime SLA, global CDN, and autonomous AI agents.",
  pill1: "LiteSpeed Enterprise & LSCache Included",
  pill2: "Free 1-Year Domain & Lifetime Free SSL",
  pill3: "Automated Daily & Weekly Backups",
  pill4: "30-Day Money-Back Guarantee",
  partnerCodeLabel: "Partner Code:",
  copyCodeBtn: "Copy Code",
  copiedBtn: "Copied! 20% Applied",
  claimDiscountBtn: "Claim 20% Discount with Partner Link",
  comparePlansBtn: "Compare Plans",
  telemetryTitle: "Hostinger Cloud Telemetry",
  telemetrySubtitle: "NVMe Tier-3 Infrastructure",
  telemetryLive: "99.99% Live",
  metricTtfb: "Server Response (TTFB)",
  metricUptime: "Uptime Guarantee",
  metricCdn: "Global Edge CDN",
  metricAi: "Autonomous AI Debugging",
  servicesBadge: "Cloud Ecosystem",
  servicesTitle: "Comprehensive Cloud & Web Hosting Infrastructure",
  servicesSubtitle: "Explore specialized cloud infrastructure engineered for creators, modern developers, agencies, and enterprise applications.",
  plansBadge: "Special Partner Pricing",
  plansTitle: "High-Performance Hosting Tiers",
  plansSubtitle: "Choose the optimal hosting architecture for your personal brand, digital business, or SaaS platform.",
  planFilterAll: "All Plans",
  planFilterWeb: "Web Hosting",
  planFilterCloud: "Cloud Hosting",
  planFilterVps: "Cloud VPS",
  archBadge: "Technical Benchmarks",
  archTitle: "Enterprise Engineering & Cloud Benchmarks",
  archSubtitle: "Discover the technical engineering advantages that set Hostinger apart from legacy hosting providers.",
  stepsBadge: "Simple Activation Guide",
  stepsTitle: "How to Activate Your 20% Bonus Discount",
  stepsSubtitle: "Follow these 4 simple steps to lock in your special promotional rate and launch your website in under 2 minutes.",
  faqsBadge: "Help & Clarifications",
  faqsTitle: "Frequently Asked Questions",
  services: [
    {
      id: "web-hosting",
      name: "High-Speed Web Hosting",
      badge: "Most Popular",
      category: "web",
      shortDesc: "Optimized LiteSpeed infrastructure built for lightning-fast WordPress and dynamic websites.",
      longDesc: "Hostinger's flagship web hosting is engineered on top of LiteSpeed Enterprise web servers, replacing slow legacy Apache engines. It incorporates the proprietary LSCache optimization plugin, server-level object caching, and HTTP/3 protocol support to deliver sub-200ms page load times. Perfect for personal blogs, business portfolios, and content websites seeking rock-solid 99.9% uptime with minimal setup overhead.",
      specs: [
        "LiteSpeed Web Server with LSCache",
        "Free 1-Click WordPress Auto-Installer",
        "Free 1-Year Domain Registration Included",
        "Unlimited Free SSL Certificates",
        "Automated Weekly & Daily Backups",
        "Integrated Git Version Control Deployment"
      ]
    },
    {
      id: "cloud-hosting",
      name: "Enterprise Cloud Hosting",
      badge: "High Performance",
      category: "cloud",
      shortDesc: "Isolated virtual containers with dedicated CPU, RAM, and automated instant resource scaling.",
      longDesc: "Experience the power and stability of a dedicated server combined with the sheer simplicity of shared hosting. Each cloud account runs in an isolated virtual instance with dedicated RAM and vCPU cores. When your site experiences viral spikes, automated resource scaling absorbs the surge seamlessly without slowdowns or dropped connections. Includes a dedicated IP address and custom Cloudflare Enterprise routing.",
      specs: [
        "Dedicated Virtual Resources (Up to 16GB RAM & 8 Cores)",
        "Dedicated IPv4 & IPv6 Address Included",
        "3x to 4x Faster Speed than Standard Hosting",
        "Built-in Cloudflare Enterprise CDN Protection",
        "Automated Daily Backups with 1-Click Restore",
        "Priority 24/7 VIP Technical Support"
      ]
    },
    {
      id: "vps-hosting",
      name: "KVM Cloud VPS Hosting",
      badge: "Developers & DevOps",
      category: "vps",
      shortDesc: "Full root access, dedicated kernel virtualization, high-IOPS NVMe drives, and AI terminal assistance.",
      longDesc: "Engineered for software engineers, backend developers, and tech leads who demand complete root-level control over their operating environment. Built upon Kernel-based Virtual Machine (KVM) technology, Hostinger VPS guarantees 100% dedicated hardware resource allocation. Deploy Docker containers, configure custom Node.js, Python, Ruby, or Go environments, and leverage the built-in AI Terminal Assistant to formulate Linux commands in seconds.",
      specs: [
        "Full Root Access & Dedicated Kernel (KVM)",
        "Enterprise-Class NVMe Storage with Ultra-High IOPS",
        "OS Options: Ubuntu, Debian, AlmaLinux, Rocky Linux",
        "Docker, Node.js, Python & Microservices Ready",
        "Automated Weekly Snapshots & Firewall Rules",
        "Built-in AI Assistant for Terminal Configurations"
      ]
    },
    {
      id: "agency-hosting",
      name: "Agency Hosting & Hostinger Pro",
      badge: "Agencies & Freelancers",
      category: "web",
      shortDesc: "Manage hundreds of client sites with unified credentials, team collaboration, and client sharing.",
      longDesc: "Designed specifically for web design agencies, freelancers, and dev shops managing multiple client projects. The Hostinger Pro dashboard allows you to organize clients into workspaces, grant custom role-based permissions, and delegate access without sharing your master passwords. You can also deliver automated maintenance health checks, uptime reports, and white-labeled client experiences.",
      specs: [
        "Centralized Multi-Client Management Portal",
        "Granular Role-Based Access Control (RBAC)",
        "Access Delegation Without Password Sharing",
        "Automated Client Website Maintenance Reports",
        "Integrated Referral & Commission Payouts",
        "Mass Plugin & Core WordPress Updates in 1-Click"
      ]
    },
    {
      id: "ai-website-builder",
      name: "AI Website Builder",
      badge: "No-Code & Fast",
      category: "web",
      shortDesc: "Create stunning, fully responsive websites and e-commerce stores in under 60 seconds using AI.",
      longDesc: "Transform a short text description into a fully functional, mobile-responsive, production-ready website in under a minute. The Hostinger AI Builder generates tailored layouts, copy, royalty-free images, and interactive contact forms. It includes a built-in AI Heatmap tool to predict visitor gaze patterns, an AI Logo Generator, and a robust e-commerce engine with 0% platform transaction fees.",
      specs: [
        "Prompt-to-Website Generation in 60 Seconds",
        "Intuitive Drag-and-Drop Visual Canvas",
        "Integrated AI Copywriter & SEO Generator",
        "AI Heatmap for Conversion Rate Optimization",
        "Complete E-Commerce Suite (0% Transaction Fees)",
        "Mobile-First Responsive Layouts by Default"
      ]
    },
    {
      id: "hostinger-horizons",
      name: "Hostinger Horizons",
      badge: "Next-Gen Cloud",
      category: "cloud",
      shortDesc: "Next-generation cloud ecosystem and edge deployment network built for the future of the web.",
      longDesc: "Hostinger Horizons represents the cutting-edge evolution of global web infrastructure. By uniting edge computing, intelligent serverless routing, and globally distributed data caches, Horizons ensures websites load instantaneously regardless of visitor geography. It provides elastic infrastructure that adapts dynamically to emerging web standards, high-throughput media, and AI-driven web applications.",
      specs: [
        "Next-Generation Edge-Native Architecture",
        "Ultra-Low Global Latency with Anycast Routing",
        "Automatic Elastic Resource Reallocation",
        "Future-Proof Compatibility with Modern Web Frameworks",
        "Tier-3 Globally Certified Data Center Backbone",
        "Continuous Performance & Reliability Tuning"
      ]
    },
    {
      id: "business-email",
      name: "Professional Business Email",
      badge: "Brand Identity",
      category: "web",
      shortDesc: "Custom branded email addresses with robust anti-spam, calendar sync, and webmail portals.",
      longDesc: "Establish immediate corporate credibility by sending messages from your own domain (e.g., name@yourcompany.com). Powered by Titan Email, this suite provides generous inbox storage (10GB to 50GB), advanced multi-layered anti-spam and anti-virus filtering, calendar management, and seamless synchronization across iOS, Android, macOS, and Windows devices.",
      specs: [
        "Professional Branded Inboxes (@yourdomain.com)",
        "Up to 50GB Dedicated Storage per Mailbox",
        "Multi-Layer Anti-Spam & Zero-Day Threat Shield",
        "Integrated Business Calendar & Contact Manager",
        "Native Mobile Apps for iOS & Android",
        "Automated Email Forwarding & Signature Builder"
      ]
    },
    {
      id: "reach-email",
      name: "Reach Email Marketing",
      badge: "Growth & Lead Gen",
      category: "web",
      shortDesc: "Built-in newsletter campaigns, automated drip sequences, and lead capture directly in hPanel.",
      longDesc: "Nurture leads and convert visitors into repeat customers without paying for costly third-party email platforms. Reach Email Marketing is embedded directly within your hosting dashboard, allowing you to design beautiful newsletters with a drag-and-drop builder, segment subscribers by activity, launch automated welcome sequences, and monitor open and click-through metrics in real time.",
      specs: [
        "Integrated Directly into Your Hosting Dashboard",
        "Drag-and-Drop Newsletter & Campaign Designer",
        "Automated Drip Sequences & Autoresponders",
        "Real-Time Delivery, Open, and Click Telemetry",
        "High Inbox Deliverability with Pre-Warmed IPs",
        "Seamless Form Integration with WordPress & HTML"
      ]
    },
    {
      id: "managed-openclaw",
      name: "Managed OpenClaw Microservices",
      badge: "High Concurrency",
      category: "cloud",
      shortDesc: "Optimized containerized runtime environments for high-throughput background jobs and APIs.",
      longDesc: "Managed OpenClaw is engineered for heavy computational workloads, background batch jobs, asynchronous task queues, and microservice APIs. It isolates computing processes to ensure zero resource contamination across your applications, giving backend developers an ultra-lean runtime environment optimized for low latency and high concurrent connections.",
      specs: [
        "Isolated Containerized Microservice Architecture",
        "Optimized for High-Concurrency API Gateways",
        "Low-Overhead Compute Resource Allocation",
        "Continuous Process Health Monitoring & Self-Healing",
        "Integrated Micro-Telemetry & Error Logging",
        "Zero Server Maintenance & Automated Security Patching"
      ]
    },
    {
      id: "ai-agents",
      name: "Autonomous AI Hosting Agents",
      badge: "Next-Gen AI",
      category: "cloud",
      shortDesc: "Intelligent in-dashboard agents that debug errors, optimize queries, and automate server management.",
      longDesc: "Hostinger has integrated autonomous AI agents directly into hPanel. Need to identify why a WordPress plugin caused a critical error? The AI Agent analyzes error logs and suggests the exact fix. Need to optimize slow database queries, configure custom redirects, or generate .htaccess rewrite rules? Simply instruct the AI in natural language to execute the configuration safely.",
      specs: [
        "Automated WordPress Plugin Conflict Diagnostics",
        "Natural Language .htaccess & Nginx Rule Generation",
        "Slow MySQL Query Detection & Indexing Advice",
        "Automated On-Page SEO Recommendations",
        "Terminal Command Generation for VPS Users",
        "24/7 Instant In-Dashboard Assistance"
      ]
    }
  ],
  plans: [
    {
      name: "Premium Web Hosting",
      tagline: "Best for personal websites, blogs, and student projects",
      price: "$2.99",
      period: "/month",
      savings: "Save 75% + 20% Partner Off",
      popular: false,
      category: "web",
      specs: [
        { label: "Websites", val: "100 Websites" },
        { label: "Storage", val: "100 GB SSD" },
        { label: "Performance", val: "Standard LiteSpeed" },
        { label: "Domain", val: "Free 1-Year Domain ($9.99 value)" },
        { label: "SSL", val: "Unlimited Free SSL" },
        { label: "Bandwidth", val: "Unlimited" },
        { label: "Backups", val: "Weekly Automated" },
        { label: "Email", val: "Free Business Email" },
        { label: "AI Tools", val: "Basic AI Website Builder" }
      ],
      ctaText: "Choose Premium Plan"
    },
    {
      name: "Business Web Hosting",
      tagline: "Recommended for businesses, creators & e-commerce stores",
      price: "$3.99",
      period: "/month",
      savings: "Save 73% + 20% Partner Off",
      popular: true,
      category: "web",
      specs: [
        { label: "Websites", val: "100 Websites" },
        { label: "Storage", val: "200 GB Ultra NVMe (5x Faster)" },
        { label: "Performance", val: "Up to 5x Increased Speed" },
        { label: "Domain", val: "Free 1-Year Domain ($9.99 value)" },
        { label: "SSL", val: "Unlimited Free SSL" },
        { label: "Bandwidth", val: "Unlimited" },
        { label: "Backups", val: "Daily & On-Demand Backups" },
        { label: "CDN", val: "Free Built-in CDN Included" },
        { label: "Staging", val: "1-Click WordPress Staging Tool" },
        { label: "AI Tools", val: "Full AI Website Builder Suite" }
      ],
      ctaText: "Choose Business Plan"
    },
    {
      name: "Cloud Startup",
      tagline: "Dedicated resources for viral traffic and high-growth apps",
      price: "$9.99",
      period: "/month",
      savings: "Save 60% + 20% Partner Off",
      popular: false,
      category: "cloud",
      specs: [
        { label: "Websites", val: "300 Websites" },
        { label: "Storage", val: "200 GB NVMe Storage" },
        { label: "RAM / CPU", val: "3 GB RAM + 2 CPU Cores (Dedicated)" },
        { label: "Performance", val: "Up to 10x Boosted Speed" },
        { label: "IP Address", val: "Dedicated IP Address Included" },
        { label: "Domain", val: "Free 1-Year Domain" },
        { label: "Backups", val: "Automated Daily Backups" },
        { label: "CDN", val: "Cloudflare Enterprise CDN" },
        { label: "Support", val: "Priority 24/7 VIP Support Queue" }
      ],
      ctaText: "Choose Cloud Startup"
    },
    {
      name: "KVM 2 Cloud VPS",
      tagline: "Dedicated root server power for engineers and developers",
      price: "$7.99",
      period: "/month",
      savings: "Save 55% + 20% Partner Off",
      popular: false,
      category: "vps",
      specs: [
        { label: "CPU", val: "2 Dedicated vCPU Cores" },
        { label: "RAM", val: "8 GB Dedicated RAM" },
        { label: "Storage", val: "100 GB High-IOPS NVMe" },
        { label: "Bandwidth", val: "8 TB High-Speed Traffic" },
        { label: "Access", val: "Full Root Administrative Access" },
        { label: "Virtualization", val: "100% Kernel-based (KVM)" },
        { label: "Backups", val: "Automated Weekly Snapshots" },
        { label: "AI Terminal", val: "AI Assistant for Linux Commands" },
        { label: "OS Support", val: "Ubuntu, Debian, AlmaLinux, Rocky" }
      ],
      ctaText: "Choose KVM VPS"
    }
  ],
  architectureHighlights: [
    {
      title: "LiteSpeed Enterprise vs. Apache",
      desc: "Unlike budget hosts that still use 20-year-old Apache software, Hostinger utilizes LiteSpeed Enterprise web servers. LiteSpeed processes static and dynamic requests simultaneously through event-driven architecture, reducing RAM usage and serving WordPress pages up to 500% faster.",
      metric: "5x Faster TTFB"
    },
    {
      title: "Global Tier-3 Data Centers",
      desc: "Deploy your site closest to your target audience. Choose from global enterprise data center locations across the United States, United Kingdom, France, Netherlands, Lithuania, Singapore, India, and Brazil. Switch data center locations anytime with a single click.",
      metric: "8 Global Regions"
    },
    {
      title: "Multi-Layer Defensive Security",
      desc: "Every website is shielded behind custom Web Application Firewalls (WAF), Cloudflare DDoS mitigation, automated SSL encryption, and Monarx real-time malware scanning that neutralizes malicious scripts before they execute.",
      metric: "99.9% Uptime SLA"
    },
    {
      title: "Next-Gen hPanel Control Center",
      desc: "Forget clumsy, outdated cPanel interfaces. Hostinger custom-engineered hPanel to be clean, responsive, and intuitive. Manage DNS, create databases, install SSL certificates, set up staging sites, and access file managers in seconds.",
      metric: "3x Faster Navigation"
    },
    {
      title: "Automated Snapshot & Daily Backups",
      desc: "Never worry about catastrophic data loss. Websites are backed up automatically with point-in-time restore capabilities. If an update breaks your website, roll back to an earlier version with a single click in your dashboard.",
      metric: "Zero-Downtime Restores"
    },
    {
      title: "Developer & Staging Toolkit",
      desc: "Equipped with modern developer tooling including Git integration, WP-CLI, SSH access, PHP version switcher (from PHP 7.4 to PHP 8.3+), MySQL/phpMyAdmin access, and a one-click staging environment to test changes safely.",
      metric: "Dev-Ready Stack"
    }
  ],
  launchSteps: [
    {
      step: "01",
      title: "Click Safi Academy's Partner Link",
      desc: "Access the exclusive portal using our verified referral URL to unlock special promotional pricing with up to 75% standard discount plus our 20% bonus."
    },
    {
      step: "02",
      title: "Select Your Preferred Plan",
      desc: "Choose between Web Hosting (for blogs/portfolios), Cloud Hosting (for high-traffic businesses), or KVM VPS (for developers requiring root access)."
    },
    {
      step: "03",
      title: "Apply Code 89LSHAHEEKCO at Checkout",
      desc: "Ensure the referral code 89LSHAHEEKCO is present in the coupon field to automatically lock in your additional 20% discount on your order."
    },
    {
      step: "04",
      title: "Claim Free Domain & Deploy in 60s",
      desc: "Claim your free 1-year custom domain name (.com, .net, .org, etc.) and launch your site using the 1-click WordPress installer or the AI Website Builder."
    }
  ],
  faqs: [
    {
      q: "How do I claim the 20% discount using the referral code?",
      a: "Simply click any of the 'Claim 20% Discount' or 'Get Started' buttons on this page. The referral code 89LSHAHEEKCO will be automatically appended to your checkout session. You can also copy the code directly using our 1-click coupon widget and paste it into the coupon code box during checkout at Hostinger.com to verify your 20% savings."
    },
    {
      q: "Is the free domain name really included at no cost?",
      a: "Yes! When you purchase any 12, 24, or 48-month Premium, Business, or Cloud hosting plan, Hostinger includes a free custom domain registration for your first full year. Popular extensions like .com, .net, .org, .online, and .tech are fully eligible."
    },
    {
      q: "Can I migrate my existing website from another hosting provider for free?",
      a: "Yes, 100% free. Hostinger provides an automated website migration service. Once you sign up, simply enter your current host's login details or WordPress URL in hPanel, and Hostinger's migration engineers and automated tools will transfer your entire site, databases, and emails with zero downtime."
    },
    {
      q: "What is the difference between Web Hosting, Cloud Hosting, and VPS?",
      a: "Web Hosting shares server hardware efficiently, making it the most affordable choice for personal sites and small businesses. Cloud Hosting isolates dedicated CPU and RAM resources within a virtual container, delivering 3x faster speeds and high redundancy for growing businesses. VPS (Virtual Private Server) provides full root administrative access, allowing developers to install custom operating systems, Docker containers, and complex backend APIs."
    },
    {
      q: "Can I run modern programming languages like Node.js, Python, and Docker?",
      a: "Yes. On KVM VPS plans, you have complete root access to run any stack including Node.js, Python, Ruby, Go, Docker, PostgreSQL, Redis, and custom microservices. On Web & Cloud plans, PHP 8.x, Git, WP-CLI, and MySQL are standard."
    },
    {
      q: "What is the 30-day money-back guarantee policy?",
      a: "Hostinger offers an unconditional 30-day money-back guarantee. If you are not completely satisfied with the speed, uptime, or control panel for any reason within the first 30 days of purchase, you can cancel and receive a full refund with no hassle."
    },
    {
      q: "How does Hostinger's hPanel compare to traditional cPanel?",
      a: "hPanel is Hostinger's custom-built control panel. Unlike legacy cPanel which can feel sluggish and complicated for beginners, hPanel is ultra-modern, intuitive, responsive on mobile devices, and significantly faster. It integrates domain management, DNS records, staging, file management, and AI assistance into one cohesive interface."
    },
    {
      q: "Does Hostinger support SSL certificates and HTTPS encryption?",
      a: "Yes. Every domain, subdomain, and parked domain hosted on Hostinger receives free, lifetime Let's Encrypt SSL certificates that install and renew automatically. You will never have to pay extra fees for website encryption."
    }
  ]
};

// Specialized translations for Persian/Dari and Pashto and Arabic
const FA_DATA = {
  ...BASE_DATA,
  disclosure: "آکادمی صافی با هاستینگر همکاری رسمی دارد. وقتی از لینک تأییدشده یا کد تخفیف 89LSHAHEEKCO استفاده می‌کنید، ۲۰٪ تخفیف مازاد اختصاصی دریافت می‌کنید و کمیسیون ارجاعی بدون هزینه اضافی برای شما به آکادمی صافی جهت گسترش آموزش رایگان برنامه‌نویسی و وب تعلق می‌گیرد.",
  partnerDisclosureBadge: "شفافیت همکاری و افشاگری رسمی:",
  heroBadge: "همکار رسمی آکادمی صافی • ۲۰٪ تخفیف با کد: 89LSHAHEEKCO",
  heroTitle: "هاست ابری فوق‌سریع NVMe و نسل جدید وب‌هاستینگ",
  heroSubtitle: "وب‌سایت‌ها، اپلیکیشن‌ها و کسب‌وکار دیجیتال خود را بر روی زیرساخت پیشرفته جهانی مستقر کنید. مجهز به وب‌سرور لایت‌اسپید اینترپرایز، درایوهای NVMe، آپتایم ۹۹.۹٪، کلودفلر CDN و دستیاران هوش مصنوعی خودکار.",
  pill1: "وب‌سرور LiteSpeed Enterprise و کش اختصاصی LSCache",
  pill2: "دامنه رایگان ۱ ساله و SSL رایگان نامحدود",
  pill3: "پشتیبان‌گیری خودکار روزانه و هفتگی",
  pill4: "ضمانت بازگشت وجه ۳۰ روزه",
  partnerCodeLabel: "کد تخفیف اختصاصی:",
  copyCodeBtn: "کپی کردن کد",
  copiedBtn: "کپی شد! ۲۰٪ تخفیف اعمال گردید",
  claimDiscountBtn: "دریافت ۲۰٪ تخفیف از لینک همکار",
  comparePlansBtn: "مقایسه پلن‌ها",
  telemetryTitle: "تله‌متری سرورهای ابری هاستینگر",
  telemetrySubtitle: "زیرساخت اختصاصی NVMe Tier-3",
  telemetryLive: "۹۹.۹۹٪ فعال و آنلاین",
  metricTtfb: "سرعت پاسخگویی سرور (TTFB)",
  metricUptime: "تضمین پایداری (Uptime)",
  metricCdn: "شبکه توزیع محتوای جهانی CDN",
  metricAi: "اشکال‌زدایی با هوش مصنوعی خودکار",
  servicesBadge: "اکوسیستم ابری",
  servicesTitle: "زیرساخت جامع ابری و میزبانی وب",
  servicesSubtitle: "کاوش در پیشرفته‌ترین معماری ابری مناسب سازندگان محتوا، توسعه‌دهندگان، آژانس‌ها و استارتاپ‌ها.",
  plansBadge: "تعرفه‌های ویژه همکار",
  plansTitle: "پلن‌های میزبانی پرقدرت",
  plansSubtitle: "معماری میزبانی ایده‌آل خود را برای سایت شخصی، فروشگاه آنلاین یا اپلیکیشن SaaS انتخاب کنید.",
  planFilterAll: "تمام پلن‌ها",
  planFilterWeb: "هاستینگ وب",
  planFilterCloud: "هاستینگ ابری",
  planFilterVps: "سرور مجازی VPS",
  archBadge: "شاخص‌های فنی",
  archTitle: "مهندسی سازمانی و بنچمارک‌های ابری",
  archSubtitle: "دلایل برتری فناوری هاستینگر بر هاست‌های سنتی و قدیمی را کشف کنید.",
  stepsBadge: "راهنمای فعال‌سازی سریع",
  stepsTitle: "نحوه فعال‌سازی ۲۰٪ تخفیف ویژه",
  stepsSubtitle: "این ۴ گام ساده را دنبال کنید تا در کمتر از ۲ دقیقه هاست و دامنه خود را با تخفیف فعال کنید.",
  faqsBadge: "سوالات متداول",
  faqsTitle: "پرسش‌ها و پاسخ‌های پرتکرار"
};

const PS_DATA = {
  ...BASE_DATA,
  disclosure: "صافي اکاډمي له هاسټینګر سره رسمي همکاري لري. کله چې تاسو زموږ د تایید شوي لینک یا 89LSHAHEEKCO کوډ له لارې هاست واخلئ، ۲۰٪ اضافي تخفیف ترلاسه کوئ او صافي اکاډمۍ ته پرته له کوم اضافي لګښت څخه کمیسیون رسیږي چې د وړیا زده کړو ملاتړ کوي.",
  partnerDisclosureBadge: "د رسمي همکارۍ روڼتیا:",
  heroBadge: "د صافي اکاډمۍ رسمي همکار • ۲۰٪ تخفیف کوډ: 89LSHAHEEKCO",
  heroTitle: "خورا چټک NVMe کلاوډ او د نوي نسل ویب هاسټینګ",
  heroSubtitle: "خپلې ویبپاڼې او ډیجیټل کاروبارونه د نړۍ په خورا پرمختللو سرورونو کې پیل کړئ. په لایټ سپیډ سرورونو، NVMe ډرایوونو، ۹۹.۹٪ اپټایم او د هوښیار AI په مرسته سمبال.",
  pill1: "د LiteSpeed Enterprise سرور او LSCache",
  pill2: "وړیا ۱ کلن ډومین او وړیا نامحدود SSL",
  pill3: "ورځنی او اوونیز اتومات بیک اپ",
  pill4: "د ۳۰ ورځو پیسو بېرته ورکولو تضمین",
  partnerCodeLabel: "د همکار ځانګړی کوډ:",
  copyCodeBtn: "کوډ کاپي کړئ",
  copiedBtn: "کاپي شو! ۲۰٪ تخفیف ولګېد",
  claimDiscountBtn: "له ځانګړي لینک څخه ۲۰٪ تخفیف ترلاسه کړئ",
  comparePlansBtn: "د پلانونو پرتله کول",
  telemetryTitle: "د هاسټینګر کلاوډ سرورونو حالت",
  telemetrySubtitle: "د NVMe Tier-3 زیربنا",
  telemetryLive: "۹۹.۹۹٪ ژوندی او فعال",
  metricTtfb: "د سرور د غبرګون چټکتیا (TTFB)",
  metricUptime: "د سرور دوامداره فعال پاتې کېدل",
  metricCdn: "نړیوال CDN شبکه",
  metricAi: "د AI له لارې اتومات تېروتنې حل",
  servicesBadge: "د کلاوډ اکوسیستم",
  servicesTitle: "د کلاوډ او ویب هاسټینګ هراړخیز خدمات",
  servicesSubtitle: "د نوي نسل کلاوډ زیربنا چې د پروګرامرانو، شرکتونو او محتوا جوړونکو لپاره جوړه شوې ده وڅارئ.",
  plansBadge: "ځانګړي همکار نرخونه",
  plansTitle: "لوړ سرعت لرونکي هاسټینګ پلانونه",
  plansSubtitle: "د خپل ویبسایټ، آنلاین پلورنځي یا سافټویر لپاره ترټولو مناسب هاسټ وټاکئ.",
  planFilterAll: "ټول پلانونه",
  planFilterWeb: "ویب هاسټینګ",
  planFilterCloud: "کلاوډ هاسټینګ",
  planFilterVps: "کلاوډ VPS سرور",
  archBadge: "تخنیکي معیارونه",
  archTitle: "مسلکي انجنیري او نړیوال معیارونه",
  archSubtitle: "وګورئ چې ولې پرمختللي انجینران او جوړونکي له زړو هاسټونو څخه هاسټینګر ته کډه کوي.",
  stepsBadge: "د چټک فعالولو لارښود",
  stepsTitle: "څنګه خپل ۲۰٪ تخفیف فعال کړئ",
  stepsSubtitle: "دا ۴ ساده مرحلې تعقیب کړئ ترڅو په ۲ دقیقو کې خپل سایټ او تخفیف ترلاسه کړئ.",
  faqsBadge: "پوښتنې او ځوابونه",
  faqsTitle: "ډېرې پوښتل شوې پوښتنې"
};

const AR_DATA = {
  ...BASE_DATA,
  disclosure: "تحتفظ أكاديمية صافي بشراكة رسمية تابعة مع Hostinger. عند الشراء عبر رابط الإحالة أو الرمز الترويجي 89LSHAHEEKCO، ستحصل على خصم إضافي بنسبة 20%، وتدعم بذلك تقديم دورات البرمجة والتقنية المجانية عالمياً.",
  partnerDisclosureBadge: "إفصاح الشراكة التابعة الرسمي:",
  heroBadge: "شريك أكاديمية صافي المعتمد • خصم 20% بالرمز: 89LSHAHEEKCO",
  heroTitle: "استضافة سحابية فائقة السرعة NVMe واستضافة الويب الحديثة",
  heroSubtitle: "قم بتشغيل مواقعك وتطبيقاتك الرقمية على بنية تحتية سحابية متطورة. مزودة بخوادم LiteSpeed Enterprise وأقراص NVMe فائقة السرعة وضمان تشغيل 99.9% وأدوات الذكاء الاصطناعي.",
  pill1: "خادم LiteSpeed Enterprise وتقنية LSCache",
  pill2: "نطاق مجاني لمدة عام وشهادات SSL مجانية مدى الحياة",
  pill3: "نسخ احتياطي تلقائي يومي وأسبوعي",
  pill4: "ضمان استرداد الأموال لمدة 30 يوماً",
  partnerCodeLabel: "رمز الشريك الترويجي:",
  copyCodeBtn: "نسخ الرمز",
  copiedBtn: "تم النسخ! تم تطبيق خصم 20%",
  claimDiscountBtn: "احصل على خصم 20% عبر رابط الشريك",
  comparePlansBtn: "مقارنة الخطط",
  telemetryTitle: "مؤشرات خوادم Hostinger السحابية",
  telemetrySubtitle: "بنية تحتية Tier-3 بمحركات NVMe",
  telemetryLive: "99.99% مباشر ومتصل",
  metricTtfb: "سرعة استجابة الخادم (TTFB)",
  metricUptime: "ضمان استقرار الخادم (Uptime)",
  metricCdn: "شبكة توزيع المحتوى العالمية CDN",
  metricAi: "تصحيح الأخطاء بالذكاء الاصطناعي التلقائي",
  servicesBadge: "النظام السحابي",
  servicesTitle: "بنية تحتية سحابية متكاملة لاستضافة الويب",
  servicesSubtitle: "اكتشف البنية التحتية السحابية المتقدمة المصممة للمبدعين والمطورين والوكالات والمشاريع الكبرى.",
  plansBadge: "أسعار الشريك الحصرية",
  plansTitle: "خطط الاستضافة عالية الأداء",
  plansSubtitle: "اختر بنية الاستضافة المثالية لموقعك الشخصي أو متجرك الإلكتروني أو تطبيقاتك.",
  planFilterAll: "جميع الخطط",
  planFilterWeb: "استضافة الويب",
  planFilterCloud: "الاستضافة السحابية",
  planFilterVps: "خوادم VPS السحابية",
  archBadge: "المعايير التقنية",
  archTitle: "المعايير الهندسية والتقنية السحابية",
  archSubtitle: "تعرف على الأسباب التقنية التي تجعل Hostinger يتفوق على شركات الاستضافة التقليدية القديمة.",
  stepsBadge: "دليل التفعيل السريع",
  stepsTitle: "كيفية تفعيل خصم 20% الإضافي",
  stepsSubtitle: "اتبع هذه الخطوات الأربع البسيطة لتثبيت الخصم وإطلاق موقعك في أقل من دقيقتين.",
  faqsBadge: "الأسئلة الشائعة",
  faqsTitle: "الأسئلة والأجوبة الأكثر تكراراً"
};

const UR_DATA = {
  ...BASE_DATA,
  disclosure: "صافی اکیڈمی ہوسٹنگر کے ساتھ باضابطہ پارٹنرشپ رکھتی ہے۔ جب آپ ہمارے مصدقہ لنک یا کوپن کوڈ 89LSHAHEEKCO سے ہوسٹنگ خریدتے ہیں تو آپ کو اضافی 20% ڈسکاؤنٹ ملتا ہے اور بغیر کسی اضافی لاگت کے صافی اکیڈمی کی مفت تعلیم کی مہم کو مدد ملتی ہے۔",
  partnerDisclosureBadge: "باضابطہ پارٹنر ڈسکلوزر:",
  heroBadge: "صافی اکیڈمی مصدقہ پارٹنر • 20% رعایت کوڈ: 89LSHAHEEKCO",
  heroTitle: "الٹرا فاسٹ NVMe کلاؤڈ اور اگلی نسل کی ویب ہوسٹنگ",
  heroSubtitle: "اپنی ویب سائٹس اور ڈیجیٹل ایپس کو عالمی معیار کی زیریں ساخت پر چلائیں۔ LiteSpeed Enterprise سرورز، تیز رفتار NVMe SSDs، 99.9% اپ ٹائم، عالمی CDN اور خودکار AI ایجنٹس کے ساتھ۔",
  pill1: "LiteSpeed Enterprise اور LSCache شامل ہے",
  pill2: "1 سالہ مفت ڈومین اور لائف ٹائم مفت SSL",
  pill3: "خودکار روزانہ اور ہفتہ وار بیک اپ",
  pill4: "30 دن کی رقم واپسی کی گارنٹی",
  partnerCodeLabel: "پارٹنر کوڈ:",
  copyCodeBtn: "کوڈ کاپی کریں",
  copiedBtn: "کاپی ہو گیا! 20% لاگو",
  claimDiscountBtn: "پارٹنر لنک سے 20% رعایت حاصل کریں",
  comparePlansBtn: "منصوبوں کا موازنہ کریں",
  telemetryTitle: "ہوسٹنگر کلاؤڈ لائیو اسٹیٹس",
  telemetrySubtitle: "NVMe Tier-3 انفراسٹرکچر",
  telemetryLive: "99.99% لائیو اور آن لائن",
  metricTtfb: "سرور کا ردعمل (TTFB)",
  metricUptime: "اپ ٹائم کی گارنٹی",
  metricCdn: "گلوبل کلاؤڈ فلیئر CDN",
  metricAi: "خودکار AI ڈیبگنگ",
  servicesBadge: "کلاؤڈ ایکو سسٹم",
  servicesTitle: "جامع کلاؤڈ اور ویب ہوسٹنگ انفراسٹرکچر",
  servicesSubtitle: "ڈویلپرز، ایجنسیوں اور کمپنیوں کے لیے تیار کردہ جدید کلاؤڈ حل دریافت کریں۔",
  plansBadge: "خصوصی پارٹنر قیمتیں",
  plansTitle: "اعلیٰ کارکردگی کے ہوسٹنگ پیکجز",
  plansSubtitle: "اپنی ویب سائٹ یا ایپ کے لیے بہترین ہوسٹنگ پلان کا انتخاب کریں۔",
  planFilterAll: "تمام پیکجز",
  planFilterWeb: "ویب ہوسٹنگ",
  planFilterCloud: "کلاؤڈ ہوسٹنگ",
  planFilterVps: "کلاؤڈ VPS",
  archBadge: "تکنیکی معیارات",
  archTitle: "انٹرپرائز انجینئرنگ اور کلاؤڈ بینچ مارکس",
  archSubtitle: "جانیں کہ ہوسٹنگر پرانی کمپنیوں کے مقابلے میں کیوں تیز اور محفوظ ہے۔",
  stepsBadge: "آسان گائیڈ",
  stepsTitle: "20% بونس رعایت کیسے فعال کریں",
  stepsSubtitle: "اپنا ڈسکاؤنٹ حاصل کرنے اور 2 منٹ میں ویب سائٹ شروع کرنے کے لیے یہ 4 مراحل مکمل کریں۔",
  faqsBadge: "اکثر پوچھے گئے سوالات",
  faqsTitle: "عمومی سوالات اور ان کے جوابات"
};

const fullDict = {};
for (const loc of LOCALES) {
  let item = { ...BASE_DATA };
  if (loc === "fa") item = FA_DATA;
  else if (loc === "ps") item = PS_DATA;
  else if (loc === "ar") item = AR_DATA;
  else if (loc === "ur") item = UR_DATA;

  item.isRtl = RTL_LOCALES.has(loc);
  fullDict[loc] = item;
}

const fileContent = `// ============================================================================
// SAFI ACADEMY - 19 LANGUAGES HOSTINGER & CLOUD TRANSLATIONS
// ============================================================================

export interface HostingServiceItem {
  id: string;
  name: string;
  badge: string;
  category: "web" | "cloud" | "vps";
  shortDesc: string;
  longDesc: string;
  specs: string[];
}

export interface HostingPlanSpec {
  label: string;
  val: string;
}

export interface HostingPlanItem {
  name: string;
  tagline: string;
  price: string;
  period: string;
  savings: string;
  popular: boolean;
  category: "web" | "cloud" | "vps";
  specs: HostingPlanSpec[];
  ctaText: string;
}

export interface HostingArchItem {
  title: string;
  desc: string;
  metric: string;
}

export interface HostingStepItem {
  step: string;
  title: string;
  desc: string;
}

export interface HostingFaqItem {
  q: string;
  a: string;
}

export interface HostingTranslation {
  isRtl: boolean;
  disclosure: string;
  partnerDisclosureBadge: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  pill1: string;
  pill2: string;
  pill3: string;
  pill4: string;
  partnerCodeLabel: string;
  copyCodeBtn: string;
  copiedBtn: string;
  claimDiscountBtn: string;
  comparePlansBtn: string;
  telemetryTitle: string;
  telemetrySubtitle: string;
  telemetryLive: string;
  metricTtfb: string;
  metricUptime: string;
  metricCdn: string;
  metricAi: string;
  servicesBadge: string;
  servicesTitle: string;
  servicesSubtitle: string;
  plansBadge: string;
  plansTitle: string;
  plansSubtitle: string;
  planFilterAll: string;
  planFilterWeb: string;
  planFilterCloud: string;
  planFilterVps: string;
  archBadge: string;
  archTitle: string;
  archSubtitle: string;
  stepsBadge: string;
  stepsTitle: string;
  stepsSubtitle: string;
  faqsBadge: string;
  faqsTitle: string;
  services: HostingServiceItem[];
  plans: HostingPlanItem[];
  architectureHighlights: HostingArchItem[];
  launchSteps: HostingStepItem[];
  faqs: HostingFaqItem[];
}

export const hostingTranslations: Record<string, HostingTranslation> = ${JSON.stringify(fullDict, null, 2)};

export function getHostingTranslation(locale: string): HostingTranslation {
  return hostingTranslations[locale] || hostingTranslations["en"];
}
`;

fs.writeFileSync("src/utils/hostingTranslations.ts", fileContent, "utf8");
console.log("Successfully generated src/utils/hostingTranslations.ts with 19 languages!");
