// ============================================================================
// SAFI ACADEMY - 19 LANGUAGES HOSTINGER TRANSLATIONS (100% NATIVE)
// ============================================================================

export interface HostingServiceItem {
  id: string;
  name: string;
  badge: string;
  category: "web" | "cloud" | "vps" | "email" | "ai" | "agency";
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
  metric?: string;
  tag?: string;
  techSpecs?: string[];
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
  ctaGetStarted: string;
  ctaExploreCourses: string;
  bottomGuarantee: string;
  bottomInstant: string;
  bottomChat: string;
  bottomDisclaimer: string;
  metricSubTtfb: string;
  metricSubCdn: string;
  metricSubNvme: string;
  metricSubSec: string;
  services: HostingServiceItem[];
  plans: HostingPlanItem[];
  architectureHighlights: HostingArchItem[];
  launchSteps: HostingStepItem[];
  faqs: HostingFaqItem[];
}

export const hostingTranslations: Record<string, HostingTranslation> = {
  "en": {
    "disclosure": "Safi Academy maintains an official affiliate partnership with Hostinger. When you purchase hosting through our verified referral link or apply coupon code 89LSHAHEEKCO, you receive an exclusive 20% additional discount on your order, and Safi Academy may earn a referral commission at no additional cost to you. This support enables us to continue offering free coding, cloud, and entrepreneurship education globally.",
    "partnerDisclosureBadge": "Transparent Affiliate Disclosure:",
    "heroBadge": "Safi Academy Verified Partner • 20% Off Code: 89LSHAHEEKCO",
    "heroTitle": "Ultra-Fast NVMe Cloud & Next-Gen Web Hosting",
    "heroSubtitle": "Power your websites, web applications, and digital business on world-class infrastructure. Equipped with LiteSpeed Enterprise web servers, enterprise NVMe SSDs, 99.9% uptime SLA, global CDN, and autonomous AI agents.",
    "pill1": "LiteSpeed Enterprise & LSCache Included",
    "pill2": "Free 1-Year Domain & Lifetime Free SSL",
    "pill3": "Automated Daily & Weekly Backups",
    "pill4": "30-Day Money-Back Guarantee",
    "partnerCodeLabel": "Partner Code:",
    "copyCodeBtn": "Copy Code",
    "copiedBtn": "Copied! 20% Applied",
    "claimDiscountBtn": "Claim 20% Discount with Partner Link",
    "comparePlansBtn": "Compare Plans",
    "telemetryTitle": "Hostinger Cloud Telemetry",
    "telemetrySubtitle": "NVMe Tier-3 Infrastructure",
    "telemetryLive": "99.99% Live",
    "metricTtfb": "Server Response (TTFB)",
    "metricUptime": "Uptime Guarantee",
    "metricCdn": "Global Edge CDN",
    "metricAi": "Autonomous AI Debugging",
    "servicesBadge": "Cloud Ecosystem",
    "servicesTitle": "Comprehensive Cloud & Web Hosting Infrastructure",
    "servicesSubtitle": "Explore specialized cloud infrastructure engineered for creators, modern developers, agencies, and enterprise applications.",
    "plansBadge": "Special Partner Pricing",
    "plansTitle": "High-Performance Hosting Tiers",
    "plansSubtitle": "Choose the optimal hosting architecture for your personal brand, digital business, or SaaS platform.",
    "planFilterAll": "All Plans",
    "planFilterWeb": "Web Hosting",
    "planFilterCloud": "Cloud Hosting",
    "planFilterVps": "Cloud VPS",
    "archBadge": "Technical Benchmarks",
    "archTitle": "Enterprise Engineering & Cloud Benchmarks",
    "archSubtitle": "Discover the technical engineering advantages that set Hostinger apart from legacy hosting providers.",
    "stepsBadge": "Simple Activation Guide",
    "stepsTitle": "How to Activate Your 20% Bonus Discount",
    "stepsSubtitle": "Follow these 4 simple steps to lock in your special promotional rate and launch your website in under 2 minutes.",
    "faqsBadge": "Help & Clarifications",
    "faqsTitle": "Frequently Asked Questions",
    "services": [
      {
        "id": "web-hosting",
        "name": "High-Speed Web Hosting",
        "badge": "Most Popular",
        "category": "web",
        "shortDesc": "Optimized LiteSpeed infrastructure built for lightning-fast WordPress and dynamic websites.",
        "longDesc": "Hostinger's flagship web hosting is engineered on top of LiteSpeed Enterprise web servers, replacing slow legacy Apache engines. It incorporates the proprietary LSCache optimization plugin, server-level object caching, and HTTP/3 protocol support to deliver sub-200ms page load times. Perfect for personal blogs, business portfolios, and content websites seeking rock-solid 99.9% uptime with minimal setup overhead.",
        "specs": [
          "LiteSpeed Web Server with LSCache",
          "Free 1-Click WordPress Auto-Installer",
          "Free 1-Year Domain Registration Included",
          "Unlimited Free SSL Certificates",
          "Automated Weekly & Daily Backups",
          "Integrated Git Version Control Deployment"
        ]
      },
      {
        "id": "cloud-hosting",
        "name": "Enterprise Cloud Hosting",
        "badge": "High Performance",
        "category": "cloud",
        "shortDesc": "Isolated virtual containers with dedicated CPU, RAM, and automated instant resource scaling.",
        "longDesc": "Experience the power and stability of a dedicated server combined with the sheer simplicity of shared hosting. Each cloud account runs in an isolated virtual instance with dedicated RAM and vCPU cores. When your site experiences viral spikes, automated resource scaling absorbs the surge seamlessly without slowdowns or dropped connections. Includes a dedicated IP address and custom Cloudflare Enterprise routing.",
        "specs": [
          "Dedicated Virtual Resources (Up to 16GB RAM & 8 Cores)",
          "Dedicated IPv4 & IPv6 Address Included",
          "3x to 4x Faster Speed than Standard Hosting",
          "Built-in Cloudflare Enterprise CDN Protection",
          "Automated Daily Backups with 1-Click Restore",
          "Priority 24/7 VIP Technical Support"
        ]
      },
      {
        "id": "vps-hosting",
        "name": "KVM Cloud VPS Hosting",
        "badge": "Developers & DevOps",
        "category": "vps",
        "shortDesc": "Full root access, dedicated kernel virtualization, high-IOPS NVMe drives, and AI terminal assistance.",
        "longDesc": "Engineered for software engineers, backend developers, and tech leads who demand complete root-level control over their operating environment. Built upon Kernel-based Virtual Machine (KVM) technology, Hostinger VPS guarantees 100% dedicated hardware resource allocation. Deploy Docker containers, configure custom Node.js, Python, Ruby, or Go environments, and leverage the built-in AI Terminal Assistant to formulate Linux commands in seconds.",
        "specs": [
          "Full Root Access & Dedicated Kernel (KVM)",
          "Enterprise-Class NVMe Storage with Ultra-High IOPS",
          "OS Options: Ubuntu, Debian, AlmaLinux, Rocky Linux",
          "Docker, Node.js, Python & Microservices Ready",
          "Automated Weekly Snapshots & Firewall Rules",
          "Built-in AI Assistant for Terminal Configurations"
        ]
      },
      {
        "id": "agency-hosting",
        "name": "Agency Hosting & Hostinger Pro",
        "badge": "Agencies & Freelancers",
        "category": "web",
        "shortDesc": "Manage hundreds of client sites with unified credentials, team collaboration, and client sharing.",
        "longDesc": "Designed specifically for web design agencies, freelancers, and dev shops managing multiple client projects. The Hostinger Pro dashboard allows you to organize clients into workspaces, grant custom role-based permissions, and delegate access without sharing your master passwords. You can also deliver automated maintenance health checks, uptime reports, and white-labeled client experiences.",
        "specs": [
          "Centralized Multi-Client Management Portal",
          "Granular Role-Based Access Control (RBAC)",
          "Access Delegation Without Password Sharing",
          "Automated Client Website Maintenance Reports",
          "Integrated Referral & Commission Payouts",
          "Mass Plugin & Core WordPress Updates in 1-Click"
        ]
      },
      {
        "id": "ai-website-builder",
        "name": "AI Website Builder",
        "badge": "No-Code & Fast",
        "category": "web",
        "shortDesc": "Create stunning, fully responsive websites and e-commerce stores in under 60 seconds using AI.",
        "longDesc": "Transform a short text description into a fully functional, mobile-responsive, production-ready website in under a minute. The Hostinger AI Builder generates tailored layouts, copy, royalty-free images, and interactive contact forms. It includes a built-in AI Heatmap tool to predict visitor gaze patterns, an AI Logo Generator, and a robust e-commerce engine with 0% platform transaction fees.",
        "specs": [
          "Prompt-to-Website Generation in 60 Seconds",
          "Intuitive Drag-and-Drop Visual Canvas",
          "Integrated AI Copywriter & SEO Generator",
          "AI Heatmap for Conversion Rate Optimization",
          "Complete E-Commerce Suite (0% Transaction Fees)",
          "Mobile-First Responsive Layouts by Default"
        ]
      },
      {
        "id": "hostinger-horizons",
        "name": "Hostinger Horizons",
        "badge": "Next-Gen Cloud",
        "category": "cloud",
        "shortDesc": "Next-generation cloud ecosystem and edge deployment network built for the future of the web.",
        "longDesc": "Hostinger Horizons represents the cutting-edge evolution of global web infrastructure. By uniting edge computing, intelligent serverless routing, and globally distributed data caches, Horizons ensures websites load instantaneously regardless of visitor geography. It provides elastic infrastructure that adapts dynamically to emerging web standards, high-throughput media, and AI-driven web applications.",
        "specs": [
          "Next-Generation Edge-Native Architecture",
          "Ultra-Low Global Latency with Anycast Routing",
          "Automatic Elastic Resource Reallocation",
          "Future-Proof Compatibility with Modern Web Frameworks",
          "Tier-3 Globally Certified Data Center Backbone",
          "Continuous Performance & Reliability Tuning"
        ]
      },
      {
        "id": "business-email",
        "name": "Professional Business Email",
        "badge": "Brand Identity",
        "category": "web",
        "shortDesc": "Custom branded email addresses with robust anti-spam, calendar sync, and webmail portals.",
        "longDesc": "Establish immediate corporate credibility by sending messages from your own domain (e.g., name@yourcompany.com). Powered by Titan Email, this suite provides generous inbox storage (10GB to 50GB), advanced multi-layered anti-spam and anti-virus filtering, calendar management, and seamless synchronization across iOS, Android, macOS, and Windows devices.",
        "specs": [
          "Professional Branded Inboxes (@yourdomain.com)",
          "Up to 50GB Dedicated Storage per Mailbox",
          "Multi-Layer Anti-Spam & Zero-Day Threat Shield",
          "Integrated Business Calendar & Contact Manager",
          "Native Mobile Apps for iOS & Android",
          "Automated Email Forwarding & Signature Builder"
        ]
      },
      {
        "id": "reach-email",
        "name": "Reach Email Marketing",
        "badge": "Growth & Lead Gen",
        "category": "web",
        "shortDesc": "Built-in newsletter campaigns, automated drip sequences, and lead capture directly in hPanel.",
        "longDesc": "Nurture leads and convert visitors into repeat customers without paying for costly third-party email platforms. Reach Email Marketing is embedded directly within your hosting dashboard, allowing you to design beautiful newsletters with a drag-and-drop builder, segment subscribers by activity, launch automated welcome sequences, and monitor open and click-through metrics in real time.",
        "specs": [
          "Integrated Directly into Your Hosting Dashboard",
          "Drag-and-Drop Newsletter & Campaign Designer",
          "Automated Drip Sequences & Autoresponders",
          "Real-Time Delivery, Open, and Click Telemetry",
          "High Inbox Deliverability with Pre-Warmed IPs",
          "Seamless Form Integration with WordPress & HTML"
        ]
      },
      {
        "id": "managed-openclaw",
        "name": "Managed OpenClaw Microservices",
        "badge": "High Concurrency",
        "category": "cloud",
        "shortDesc": "Optimized containerized runtime environments for high-throughput background jobs and APIs.",
        "longDesc": "Managed OpenClaw is engineered for heavy computational workloads, background batch jobs, asynchronous task queues, and microservice APIs. It isolates computing processes to ensure zero resource contamination across your applications, giving backend developers an ultra-lean runtime environment optimized for low latency and high concurrent connections.",
        "specs": [
          "Isolated Containerized Microservice Architecture",
          "Optimized for High-Concurrency API Gateways",
          "Low-Overhead Compute Resource Allocation",
          "Continuous Process Health Monitoring & Self-Healing",
          "Integrated Micro-Telemetry & Error Logging",
          "Zero Server Maintenance & Automated Security Patching"
        ]
      },
      {
        "id": "ai-agents",
        "name": "Autonomous AI Hosting Agents",
        "badge": "Next-Gen AI",
        "category": "cloud",
        "shortDesc": "Intelligent in-dashboard agents that debug errors, optimize queries, and automate server management.",
        "longDesc": "Hostinger has integrated autonomous AI agents directly into hPanel. Need to identify why a WordPress plugin caused a critical error? The AI Agent analyzes error logs and suggests the exact fix. Need to optimize slow database queries, configure custom redirects, or generate .htaccess rewrite rules? Simply instruct the AI in natural language to execute the configuration safely.",
        "specs": [
          "Automated WordPress Plugin Conflict Diagnostics",
          "Natural Language .htaccess & Nginx Rule Generation",
          "Slow MySQL Query Detection & Indexing Advice",
          "Automated On-Page SEO Recommendations",
          "Terminal Command Generation for VPS Users",
          "24/7 Instant In-Dashboard Assistance"
        ]
      }
    ],
    "plans": [
      {
        "name": "Premium Web Hosting",
        "tagline": "Best for personal websites, blogs, and student projects",
        "price": "$2.99",
        "period": "/month",
        "savings": "Save 75% + 20% Partner Off",
        "popular": false,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "100 GB SSD"
          },
          {
            "label": "Performance",
            "val": "Standard LiteSpeed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Weekly Automated"
          },
          {
            "label": "Email",
            "val": "Free Business Email"
          },
          {
            "label": "AI Tools",
            "val": "Basic AI Website Builder"
          }
        ],
        "ctaText": "Choose Premium Plan"
      },
      {
        "name": "Business Web Hosting",
        "tagline": "Recommended for businesses, creators & e-commerce stores",
        "price": "$3.99",
        "period": "/month",
        "savings": "Save 73% + 20% Partner Off",
        "popular": true,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB Ultra NVMe (5x Faster)"
          },
          {
            "label": "Performance",
            "val": "Up to 5x Increased Speed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Daily & On-Demand Backups"
          },
          {
            "label": "CDN",
            "val": "Free Built-in CDN Included"
          },
          {
            "label": "Staging",
            "val": "1-Click WordPress Staging Tool"
          },
          {
            "label": "AI Tools",
            "val": "Full AI Website Builder Suite"
          }
        ],
        "ctaText": "Choose Business Plan"
      },
      {
        "name": "Cloud Startup",
        "tagline": "Dedicated resources for viral traffic and high-growth apps",
        "price": "$9.99",
        "period": "/month",
        "savings": "Save 60% + 20% Partner Off",
        "popular": false,
        "category": "cloud",
        "specs": [
          {
            "label": "Websites",
            "val": "300 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB NVMe Storage"
          },
          {
            "label": "RAM / CPU",
            "val": "3 GB RAM + 2 CPU Cores (Dedicated)"
          },
          {
            "label": "Performance",
            "val": "Up to 10x Boosted Speed"
          },
          {
            "label": "IP Address",
            "val": "Dedicated IP Address Included"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain"
          },
          {
            "label": "Backups",
            "val": "Automated Daily Backups"
          },
          {
            "label": "CDN",
            "val": "Cloudflare Enterprise CDN"
          },
          {
            "label": "Support",
            "val": "Priority 24/7 VIP Support Queue"
          }
        ],
        "ctaText": "Choose Cloud Startup"
      },
      {
        "name": "KVM 2 Cloud VPS",
        "tagline": "Dedicated root server power for engineers and developers",
        "price": "$7.99",
        "period": "/month",
        "savings": "Save 55% + 20% Partner Off",
        "popular": false,
        "category": "vps",
        "specs": [
          {
            "label": "CPU",
            "val": "2 Dedicated vCPU Cores"
          },
          {
            "label": "RAM",
            "val": "8 GB Dedicated RAM"
          },
          {
            "label": "Storage",
            "val": "100 GB High-IOPS NVMe"
          },
          {
            "label": "Bandwidth",
            "val": "8 TB High-Speed Traffic"
          },
          {
            "label": "Access",
            "val": "Full Root Administrative Access"
          },
          {
            "label": "Virtualization",
            "val": "100% Kernel-based (KVM)"
          },
          {
            "label": "Backups",
            "val": "Automated Weekly Snapshots"
          },
          {
            "label": "AI Terminal",
            "val": "AI Assistant for Linux Commands"
          },
          {
            "label": "OS Support",
            "val": "Ubuntu, Debian, AlmaLinux, Rocky"
          }
        ],
        "ctaText": "Choose KVM VPS"
      }
    ],
    "architectureHighlights": [
      {
        "title": "LiteSpeed Enterprise vs. Apache",
        "desc": "Unlike budget hosts that still use 20-year-old Apache software, Hostinger utilizes LiteSpeed Enterprise web servers. LiteSpeed processes static and dynamic requests simultaneously through event-driven architecture, reducing RAM usage and serving WordPress pages up to 500% faster.",
        "metric": "5x Faster TTFB"
      },
      {
        "title": "Global Tier-3 Data Centers",
        "desc": "Deploy your site closest to your target audience. Choose from global enterprise data center locations across the United States, United Kingdom, France, Netherlands, Lithuania, Singapore, India, and Brazil. Switch data center locations anytime with a single click.",
        "metric": "8 Global Regions"
      },
      {
        "title": "Multi-Layer Defensive Security",
        "desc": "Every website is shielded behind custom Web Application Firewalls (WAF), Cloudflare DDoS mitigation, automated SSL encryption, and Monarx real-time malware scanning that neutralizes malicious scripts before they execute.",
        "metric": "99.9% Uptime SLA"
      },
      {
        "title": "Next-Gen hPanel Control Center",
        "desc": "Forget clumsy, outdated cPanel interfaces. Hostinger custom-engineered hPanel to be clean, responsive, and intuitive. Manage DNS, create databases, install SSL certificates, set up staging sites, and access file managers in seconds.",
        "metric": "3x Faster Navigation"
      },
      {
        "title": "Automated Snapshot & Daily Backups",
        "desc": "Never worry about catastrophic data loss. Websites are backed up automatically with point-in-time restore capabilities. If an update breaks your website, roll back to an earlier version with a single click in your dashboard.",
        "metric": "Zero-Downtime Restores"
      },
      {
        "title": "Developer & Staging Toolkit",
        "desc": "Equipped with modern developer tooling including Git integration, WP-CLI, SSH access, PHP version switcher (from PHP 7.4 to PHP 8.3+), MySQL/phpMyAdmin access, and a one-click staging environment to test changes safely.",
        "metric": "Dev-Ready Stack"
      }
    ],
    "launchSteps": [
      {
        "step": "01",
        "title": "Click Safi Academy's Partner Link",
        "desc": "Access the exclusive portal using our verified referral URL to unlock special promotional pricing with up to 75% standard discount plus our 20% bonus."
      },
      {
        "step": "02",
        "title": "Select Your Preferred Plan",
        "desc": "Choose between Web Hosting (for blogs/portfolios), Cloud Hosting (for high-traffic businesses), or KVM VPS (for developers requiring root access)."
      },
      {
        "step": "03",
        "title": "Apply Code 89LSHAHEEKCO at Checkout",
        "desc": "Ensure the referral code 89LSHAHEEKCO is present in the coupon field to automatically lock in your additional 20% discount on your order."
      },
      {
        "step": "04",
        "title": "Claim Free Domain & Deploy in 60s",
        "desc": "Claim your free 1-year custom domain name (.com, .net, .org, etc.) and launch your site using the 1-click WordPress installer or the AI Website Builder."
      }
    ],
    "faqs": [
      {
        "q": "How do I claim the 20% discount using the referral code?",
        "a": "Simply click any of the 'Claim 20% Discount' or 'Get Started' buttons on this page. The referral code 89LSHAHEEKCO will be automatically appended to your checkout session. You can also copy the code directly using our 1-click coupon widget and paste it into the coupon code box during checkout at Hostinger.com to verify your 20% savings."
      },
      {
        "q": "Is the free domain name really included at no cost?",
        "a": "Yes! When you purchase any 12, 24, or 48-month Premium, Business, or Cloud hosting plan, Hostinger includes a free custom domain registration for your first full year. Popular extensions like .com, .net, .org, .online, and .tech are fully eligible."
      },
      {
        "q": "Can I migrate my existing website from another hosting provider for free?",
        "a": "Yes, 100% free. Hostinger provides an automated website migration service. Once you sign up, simply enter your current host's login details or WordPress URL in hPanel, and Hostinger's migration engineers and automated tools will transfer your entire site, databases, and emails with zero downtime."
      },
      {
        "q": "What is the difference between Web Hosting, Cloud Hosting, and VPS?",
        "a": "Web Hosting shares server hardware efficiently, making it the most affordable choice for personal sites and small businesses. Cloud Hosting isolates dedicated CPU and RAM resources within a virtual container, delivering 3x faster speeds and high redundancy for growing businesses. VPS (Virtual Private Server) provides full root administrative access, allowing developers to install custom operating systems, Docker containers, and complex backend APIs."
      },
      {
        "q": "Can I run modern programming languages like Node.js, Python, and Docker?",
        "a": "Yes. On KVM VPS plans, you have complete root access to run any stack including Node.js, Python, Ruby, Go, Docker, PostgreSQL, Redis, and custom microservices. On Web & Cloud plans, PHP 8.x, Git, WP-CLI, and MySQL are standard."
      },
      {
        "q": "What is the 30-day money-back guarantee policy?",
        "a": "Hostinger offers an unconditional 30-day money-back guarantee. If you are not completely satisfied with the speed, uptime, or control panel for any reason within the first 30 days of purchase, you can cancel and receive a full refund with no hassle."
      },
      {
        "q": "How does Hostinger's hPanel compare to traditional cPanel?",
        "a": "hPanel is Hostinger's custom-built control panel. Unlike legacy cPanel which can feel sluggish and complicated for beginners, hPanel is ultra-modern, intuitive, responsive on mobile devices, and significantly faster. It integrates domain management, DNS records, staging, file management, and AI assistance into one cohesive interface."
      },
      {
        "q": "Does Hostinger support SSL certificates and HTTPS encryption?",
        "a": "Yes. Every domain, subdomain, and parked domain hosted on Hostinger receives free, lifetime Let's Encrypt SSL certificates that install and renew automatically. You will never have to pay extra fees for website encryption."
      }
    ],
    "isRtl": false,
    "ctaGetStarted": "Get Started with 20% Off",
    "ctaExploreCourses": "Explore Coding Courses",
    "bottomGuarantee": "30-Day Unconditional Money-Back Guarantee",
    "bottomInstant": "Instant Cloud Account Activation",
    "bottomChat": "24/7 Priority Chat Assistance",
    "bottomDisclaimer": "* Hostinger is an independent cloud hosting provider. Promotional discounts, domain availability, and renewal terms are managed directly by Hostinger.",
    "metricSubTtfb": "LiteSpeed Optimized",
    "metricSubCdn": "Cloudflare Enterprise CDN",
    "metricSubNvme": "Enterprise NVMe (RAID-10)",
    "metricSubSec": "Monarx & WAF Real-Time"
  },
  "fa": {
    "disclosure": "آکادمی صافی با هاستینگر همکاری رسمی دارد. وقتی از لینک تأییدشده یا کد تخفیف 89LSHAHEEKCO استفاده می‌کنید، ۲۰٪ تخفیف مازاد اختصاصی دریافت می‌کنید و کمیسیون ارجاعی بدون هزینه اضافی برای شما به آکادمی صافی جهت گسترش آموزش رایگان برنامه‌نویسی و وب تعلق می‌گیرد.",
    "partnerDisclosureBadge": "شفافیت همکاری و افشاگری رسمی:",
    "heroBadge": "همکار رسمی آکادمی صافی • ۲۰٪ تخفیف با کد: 89LSHAHEEKCO",
    "heroTitle": "هاست ابری فوق‌سریع NVMe و نسل جدید وب‌هاستینگ",
    "heroSubtitle": "وب‌سایت‌ها، اپلیکیشن‌ها و کسب‌وکار دیجیتال خود را بر روی زیرساخت پیشرفته جهانی مستقر کنید. مجهز به وب‌سرور لایت‌اسپید اینترپرایز، درایوهای NVMe، آپتایم ۹۹.۹٪، کلودفلر CDN و دستیاران هوش مصنوعی خودکار.",
    "pill1": "وب‌سرور LiteSpeed Enterprise و کش اختصاصی LSCache",
    "pill2": "دامنه رایگان ۱ ساله و SSL رایگان نامحدود",
    "pill3": "پشتیبان‌گیری خودکار روزانه و هفتگی",
    "pill4": "ضمانت بازگشت وجه ۳۰ روزه",
    "partnerCodeLabel": "کد تخفیف اختصاصی:",
    "copyCodeBtn": "کپی کردن کد",
    "copiedBtn": "کپی شد! ۲۰٪ تخفیف اعمال گردید",
    "claimDiscountBtn": "دریافت ۲۰٪ تخفیف از لینک همکار",
    "comparePlansBtn": "مقایسه پلن‌ها",
    "telemetryTitle": "تله‌متری سرورهای ابری هاستینگر",
    "telemetrySubtitle": "زیرساخت اختصاصی NVMe Tier-3",
    "telemetryLive": "۹۹.۹۹٪ فعال و آنلاین",
    "metricTtfb": "سرعت پاسخگویی سرور (TTFB)",
    "metricUptime": "تضمین پایداری (Uptime)",
    "metricCdn": "شبکه توزیع محتوای جهانی CDN",
    "metricAi": "اشکال‌زدایی با هوش مصنوعی خودکار",
    "servicesBadge": "اکوسیستم ابری",
    "servicesTitle": "زیرساخت جامع ابری و میزبانی وب",
    "servicesSubtitle": "کاوش در پیشرفته‌ترین معماری ابری مناسب سازندگان محتوا، توسعه‌دهندگان، آژانس‌ها و استارتاپ‌ها.",
    "plansBadge": "تعرفه‌های ویژه همکار",
    "plansTitle": "پلن‌های میزبانی پرقدرت",
    "plansSubtitle": "معماری میزبانی ایده‌آل خود را برای سایت شخصی، فروشگاه آنلاین یا اپلیکیشن SaaS انتخاب کنید.",
    "planFilterAll": "تمام پلن‌ها",
    "planFilterWeb": "هاستینگ وب",
    "planFilterCloud": "هاستینگ ابری",
    "planFilterVps": "سرور مجازی VPS",
    "archBadge": "شاخص‌های فنی",
    "archTitle": "مهندسی سازمانی و بنچمارک‌های ابری",
    "archSubtitle": "دلایل برتری فناوری هاستینگر بر هاست‌های سنتی و قدیمی را کشف کنید.",
    "stepsBadge": "راهنمای فعال‌سازی سریع",
    "stepsTitle": "نحوه فعال‌سازی ۲۰٪ تخفیف ویژه",
    "stepsSubtitle": "این ۴ گام ساده را دنبال کنید تا در کمتر از ۲ دقیقه هاست و دامنه خود را با تخفیف فعال کنید.",
    "faqsBadge": "سوالات متداول",
    "faqsTitle": "پرسش‌ها و پاسخ‌های پرتکرار",
    "services": [
      {
        "id": "web-hosting",
        "name": "High-Speed Web Hosting",
        "badge": "Most Popular",
        "category": "web",
        "shortDesc": "Optimized LiteSpeed infrastructure built for lightning-fast WordPress and dynamic websites.",
        "longDesc": "Hostinger's flagship web hosting is engineered on top of LiteSpeed Enterprise web servers, replacing slow legacy Apache engines. It incorporates the proprietary LSCache optimization plugin, server-level object caching, and HTTP/3 protocol support to deliver sub-200ms page load times. Perfect for personal blogs, business portfolios, and content websites seeking rock-solid 99.9% uptime with minimal setup overhead.",
        "specs": [
          "LiteSpeed Web Server with LSCache",
          "Free 1-Click WordPress Auto-Installer",
          "Free 1-Year Domain Registration Included",
          "Unlimited Free SSL Certificates",
          "Automated Weekly & Daily Backups",
          "Integrated Git Version Control Deployment"
        ]
      },
      {
        "id": "cloud-hosting",
        "name": "Enterprise Cloud Hosting",
        "badge": "High Performance",
        "category": "cloud",
        "shortDesc": "Isolated virtual containers with dedicated CPU, RAM, and automated instant resource scaling.",
        "longDesc": "Experience the power and stability of a dedicated server combined with the sheer simplicity of shared hosting. Each cloud account runs in an isolated virtual instance with dedicated RAM and vCPU cores. When your site experiences viral spikes, automated resource scaling absorbs the surge seamlessly without slowdowns or dropped connections. Includes a dedicated IP address and custom Cloudflare Enterprise routing.",
        "specs": [
          "Dedicated Virtual Resources (Up to 16GB RAM & 8 Cores)",
          "Dedicated IPv4 & IPv6 Address Included",
          "3x to 4x Faster Speed than Standard Hosting",
          "Built-in Cloudflare Enterprise CDN Protection",
          "Automated Daily Backups with 1-Click Restore",
          "Priority 24/7 VIP Technical Support"
        ]
      },
      {
        "id": "vps-hosting",
        "name": "KVM Cloud VPS Hosting",
        "badge": "Developers & DevOps",
        "category": "vps",
        "shortDesc": "Full root access, dedicated kernel virtualization, high-IOPS NVMe drives, and AI terminal assistance.",
        "longDesc": "Engineered for software engineers, backend developers, and tech leads who demand complete root-level control over their operating environment. Built upon Kernel-based Virtual Machine (KVM) technology, Hostinger VPS guarantees 100% dedicated hardware resource allocation. Deploy Docker containers, configure custom Node.js, Python, Ruby, or Go environments, and leverage the built-in AI Terminal Assistant to formulate Linux commands in seconds.",
        "specs": [
          "Full Root Access & Dedicated Kernel (KVM)",
          "Enterprise-Class NVMe Storage with Ultra-High IOPS",
          "OS Options: Ubuntu, Debian, AlmaLinux, Rocky Linux",
          "Docker, Node.js, Python & Microservices Ready",
          "Automated Weekly Snapshots & Firewall Rules",
          "Built-in AI Assistant for Terminal Configurations"
        ]
      },
      {
        "id": "agency-hosting",
        "name": "Agency Hosting & Hostinger Pro",
        "badge": "Agencies & Freelancers",
        "category": "web",
        "shortDesc": "Manage hundreds of client sites with unified credentials, team collaboration, and client sharing.",
        "longDesc": "Designed specifically for web design agencies, freelancers, and dev shops managing multiple client projects. The Hostinger Pro dashboard allows you to organize clients into workspaces, grant custom role-based permissions, and delegate access without sharing your master passwords. You can also deliver automated maintenance health checks, uptime reports, and white-labeled client experiences.",
        "specs": [
          "Centralized Multi-Client Management Portal",
          "Granular Role-Based Access Control (RBAC)",
          "Access Delegation Without Password Sharing",
          "Automated Client Website Maintenance Reports",
          "Integrated Referral & Commission Payouts",
          "Mass Plugin & Core WordPress Updates in 1-Click"
        ]
      },
      {
        "id": "ai-website-builder",
        "name": "AI Website Builder",
        "badge": "No-Code & Fast",
        "category": "web",
        "shortDesc": "Create stunning, fully responsive websites and e-commerce stores in under 60 seconds using AI.",
        "longDesc": "Transform a short text description into a fully functional, mobile-responsive, production-ready website in under a minute. The Hostinger AI Builder generates tailored layouts, copy, royalty-free images, and interactive contact forms. It includes a built-in AI Heatmap tool to predict visitor gaze patterns, an AI Logo Generator, and a robust e-commerce engine with 0% platform transaction fees.",
        "specs": [
          "Prompt-to-Website Generation in 60 Seconds",
          "Intuitive Drag-and-Drop Visual Canvas",
          "Integrated AI Copywriter & SEO Generator",
          "AI Heatmap for Conversion Rate Optimization",
          "Complete E-Commerce Suite (0% Transaction Fees)",
          "Mobile-First Responsive Layouts by Default"
        ]
      },
      {
        "id": "hostinger-horizons",
        "name": "Hostinger Horizons",
        "badge": "Next-Gen Cloud",
        "category": "cloud",
        "shortDesc": "Next-generation cloud ecosystem and edge deployment network built for the future of the web.",
        "longDesc": "Hostinger Horizons represents the cutting-edge evolution of global web infrastructure. By uniting edge computing, intelligent serverless routing, and globally distributed data caches, Horizons ensures websites load instantaneously regardless of visitor geography. It provides elastic infrastructure that adapts dynamically to emerging web standards, high-throughput media, and AI-driven web applications.",
        "specs": [
          "Next-Generation Edge-Native Architecture",
          "Ultra-Low Global Latency with Anycast Routing",
          "Automatic Elastic Resource Reallocation",
          "Future-Proof Compatibility with Modern Web Frameworks",
          "Tier-3 Globally Certified Data Center Backbone",
          "Continuous Performance & Reliability Tuning"
        ]
      },
      {
        "id": "business-email",
        "name": "Professional Business Email",
        "badge": "Brand Identity",
        "category": "web",
        "shortDesc": "Custom branded email addresses with robust anti-spam, calendar sync, and webmail portals.",
        "longDesc": "Establish immediate corporate credibility by sending messages from your own domain (e.g., name@yourcompany.com). Powered by Titan Email, this suite provides generous inbox storage (10GB to 50GB), advanced multi-layered anti-spam and anti-virus filtering, calendar management, and seamless synchronization across iOS, Android, macOS, and Windows devices.",
        "specs": [
          "Professional Branded Inboxes (@yourdomain.com)",
          "Up to 50GB Dedicated Storage per Mailbox",
          "Multi-Layer Anti-Spam & Zero-Day Threat Shield",
          "Integrated Business Calendar & Contact Manager",
          "Native Mobile Apps for iOS & Android",
          "Automated Email Forwarding & Signature Builder"
        ]
      },
      {
        "id": "reach-email",
        "name": "Reach Email Marketing",
        "badge": "Growth & Lead Gen",
        "category": "web",
        "shortDesc": "Built-in newsletter campaigns, automated drip sequences, and lead capture directly in hPanel.",
        "longDesc": "Nurture leads and convert visitors into repeat customers without paying for costly third-party email platforms. Reach Email Marketing is embedded directly within your hosting dashboard, allowing you to design beautiful newsletters with a drag-and-drop builder, segment subscribers by activity, launch automated welcome sequences, and monitor open and click-through metrics in real time.",
        "specs": [
          "Integrated Directly into Your Hosting Dashboard",
          "Drag-and-Drop Newsletter & Campaign Designer",
          "Automated Drip Sequences & Autoresponders",
          "Real-Time Delivery, Open, and Click Telemetry",
          "High Inbox Deliverability with Pre-Warmed IPs",
          "Seamless Form Integration with WordPress & HTML"
        ]
      },
      {
        "id": "managed-openclaw",
        "name": "Managed OpenClaw Microservices",
        "badge": "High Concurrency",
        "category": "cloud",
        "shortDesc": "Optimized containerized runtime environments for high-throughput background jobs and APIs.",
        "longDesc": "Managed OpenClaw is engineered for heavy computational workloads, background batch jobs, asynchronous task queues, and microservice APIs. It isolates computing processes to ensure zero resource contamination across your applications, giving backend developers an ultra-lean runtime environment optimized for low latency and high concurrent connections.",
        "specs": [
          "Isolated Containerized Microservice Architecture",
          "Optimized for High-Concurrency API Gateways",
          "Low-Overhead Compute Resource Allocation",
          "Continuous Process Health Monitoring & Self-Healing",
          "Integrated Micro-Telemetry & Error Logging",
          "Zero Server Maintenance & Automated Security Patching"
        ]
      },
      {
        "id": "ai-agents",
        "name": "Autonomous AI Hosting Agents",
        "badge": "Next-Gen AI",
        "category": "cloud",
        "shortDesc": "Intelligent in-dashboard agents that debug errors, optimize queries, and automate server management.",
        "longDesc": "Hostinger has integrated autonomous AI agents directly into hPanel. Need to identify why a WordPress plugin caused a critical error? The AI Agent analyzes error logs and suggests the exact fix. Need to optimize slow database queries, configure custom redirects, or generate .htaccess rewrite rules? Simply instruct the AI in natural language to execute the configuration safely.",
        "specs": [
          "Automated WordPress Plugin Conflict Diagnostics",
          "Natural Language .htaccess & Nginx Rule Generation",
          "Slow MySQL Query Detection & Indexing Advice",
          "Automated On-Page SEO Recommendations",
          "Terminal Command Generation for VPS Users",
          "24/7 Instant In-Dashboard Assistance"
        ]
      }
    ],
    "plans": [
      {
        "name": "هاست وب پریمیوم",
        "tagline": "بهترین گزینه برای وب‌سایت‌های شخصی، وبلاگ‌ها و پروژه‌های دانشجویی",
        "price": "$2.99",
        "period": "/month",
        "savings": "۷۵٪ تخفیف + ۲۰٪ کد تخفیف همکار",
        "popular": false,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "100 GB SSD"
          },
          {
            "label": "Performance",
            "val": "Standard LiteSpeed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Weekly Automated"
          },
          {
            "label": "Email",
            "val": "Free Business Email"
          },
          {
            "label": "AI Tools",
            "val": "Basic AI Website Builder"
          }
        ],
        "ctaText": "انتخاب پلن پریمیوم"
      },
      {
        "name": "هاست وب تجاری (بیزینس)",
        "tagline": "پیشنهاد اصلی برای کسب‌وکارها، استارتاپ‌ها و فروشگاه‌های آنلاین",
        "price": "$3.99",
        "period": "/month",
        "savings": "۷۳٪ تخفیف + ۲۰٪ کد تخفیف همکار",
        "popular": true,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB Ultra NVMe (5x Faster)"
          },
          {
            "label": "Performance",
            "val": "Up to 5x Increased Speed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Daily & On-Demand Backups"
          },
          {
            "label": "CDN",
            "val": "Free Built-in CDN Included"
          },
          {
            "label": "Staging",
            "val": "1-Click WordPress Staging Tool"
          },
          {
            "label": "AI Tools",
            "val": "Full AI Website Builder Suite"
          }
        ],
        "ctaText": "انتخاب پلن بیزینس"
      },
      {
        "name": "هاست ابری کلود استارتاپ",
        "tagline": "منابع اختصاصی سخت‌افزاری برای پروژه‌های پرترافیک و مقیاس‌پذیر",
        "price": "$9.99",
        "period": "/month",
        "savings": "۶۰٪ تخفیف + ۲۰٪ کد تخفیف همکار",
        "popular": false,
        "category": "cloud",
        "specs": [
          {
            "label": "Websites",
            "val": "300 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB NVMe Storage"
          },
          {
            "label": "RAM / CPU",
            "val": "3 GB RAM + 2 CPU Cores (Dedicated)"
          },
          {
            "label": "Performance",
            "val": "Up to 10x Boosted Speed"
          },
          {
            "label": "IP Address",
            "val": "Dedicated IP Address Included"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain"
          },
          {
            "label": "Backups",
            "val": "Automated Daily Backups"
          },
          {
            "label": "CDN",
            "val": "Cloudflare Enterprise CDN"
          },
          {
            "label": "Support",
            "val": "Priority 24/7 VIP Support Queue"
          }
        ],
        "ctaText": "انتخاب کلود استارتاپ"
      },
      {
        "name": "سرور مجازی KVM 2 ابری",
        "tagline": "دسترسی کامل روت سرور برای مهندسین نرم‌افزار و دواپس",
        "price": "$7.99",
        "period": "/month",
        "savings": "۵۵٪ تخفیف + ۲۰٪ کد تخفیف همکار",
        "popular": false,
        "category": "vps",
        "specs": [
          {
            "label": "CPU",
            "val": "2 Dedicated vCPU Cores"
          },
          {
            "label": "RAM",
            "val": "8 GB Dedicated RAM"
          },
          {
            "label": "Storage",
            "val": "100 GB High-IOPS NVMe"
          },
          {
            "label": "Bandwidth",
            "val": "8 TB High-Speed Traffic"
          },
          {
            "label": "Access",
            "val": "Full Root Administrative Access"
          },
          {
            "label": "Virtualization",
            "val": "100% Kernel-based (KVM)"
          },
          {
            "label": "Backups",
            "val": "Automated Weekly Snapshots"
          },
          {
            "label": "AI Terminal",
            "val": "AI Assistant for Linux Commands"
          },
          {
            "label": "OS Support",
            "val": "Ubuntu, Debian, AlmaLinux, Rocky"
          }
        ],
        "ctaText": "انتخاب سرور مجازی KVM"
      }
    ],
    "architectureHighlights": [
      {
        "title": "LiteSpeed Enterprise vs. Apache",
        "desc": "Unlike budget hosts that still use 20-year-old Apache software, Hostinger utilizes LiteSpeed Enterprise web servers. LiteSpeed processes static and dynamic requests simultaneously through event-driven architecture, reducing RAM usage and serving WordPress pages up to 500% faster.",
        "metric": "5x Faster TTFB"
      },
      {
        "title": "Global Tier-3 Data Centers",
        "desc": "Deploy your site closest to your target audience. Choose from global enterprise data center locations across the United States, United Kingdom, France, Netherlands, Lithuania, Singapore, India, and Brazil. Switch data center locations anytime with a single click.",
        "metric": "8 Global Regions"
      },
      {
        "title": "Multi-Layer Defensive Security",
        "desc": "Every website is shielded behind custom Web Application Firewalls (WAF), Cloudflare DDoS mitigation, automated SSL encryption, and Monarx real-time malware scanning that neutralizes malicious scripts before they execute.",
        "metric": "99.9% Uptime SLA"
      },
      {
        "title": "Next-Gen hPanel Control Center",
        "desc": "Forget clumsy, outdated cPanel interfaces. Hostinger custom-engineered hPanel to be clean, responsive, and intuitive. Manage DNS, create databases, install SSL certificates, set up staging sites, and access file managers in seconds.",
        "metric": "3x Faster Navigation"
      },
      {
        "title": "Automated Snapshot & Daily Backups",
        "desc": "Never worry about catastrophic data loss. Websites are backed up automatically with point-in-time restore capabilities. If an update breaks your website, roll back to an earlier version with a single click in your dashboard.",
        "metric": "Zero-Downtime Restores"
      },
      {
        "title": "Developer & Staging Toolkit",
        "desc": "Equipped with modern developer tooling including Git integration, WP-CLI, SSH access, PHP version switcher (from PHP 7.4 to PHP 8.3+), MySQL/phpMyAdmin access, and a one-click staging environment to test changes safely.",
        "metric": "Dev-Ready Stack"
      }
    ],
    "launchSteps": [
      {
        "step": "01",
        "title": "Click Safi Academy's Partner Link",
        "desc": "Access the exclusive portal using our verified referral URL to unlock special promotional pricing with up to 75% standard discount plus our 20% bonus."
      },
      {
        "step": "02",
        "title": "Select Your Preferred Plan",
        "desc": "Choose between Web Hosting (for blogs/portfolios), Cloud Hosting (for high-traffic businesses), or KVM VPS (for developers requiring root access)."
      },
      {
        "step": "03",
        "title": "Apply Code 89LSHAHEEKCO at Checkout",
        "desc": "Ensure the referral code 89LSHAHEEKCO is present in the coupon field to automatically lock in your additional 20% discount on your order."
      },
      {
        "step": "04",
        "title": "Claim Free Domain & Deploy in 60s",
        "desc": "Claim your free 1-year custom domain name (.com, .net, .org, etc.) and launch your site using the 1-click WordPress installer or the AI Website Builder."
      }
    ],
    "faqs": [
      {
        "q": "How do I claim the 20% discount using the referral code?",
        "a": "Simply click any of the 'Claim 20% Discount' or 'Get Started' buttons on this page. The referral code 89LSHAHEEKCO will be automatically appended to your checkout session. You can also copy the code directly using our 1-click coupon widget and paste it into the coupon code box during checkout at Hostinger.com to verify your 20% savings."
      },
      {
        "q": "Is the free domain name really included at no cost?",
        "a": "Yes! When you purchase any 12, 24, or 48-month Premium, Business, or Cloud hosting plan, Hostinger includes a free custom domain registration for your first full year. Popular extensions like .com, .net, .org, .online, and .tech are fully eligible."
      },
      {
        "q": "Can I migrate my existing website from another hosting provider for free?",
        "a": "Yes, 100% free. Hostinger provides an automated website migration service. Once you sign up, simply enter your current host's login details or WordPress URL in hPanel, and Hostinger's migration engineers and automated tools will transfer your entire site, databases, and emails with zero downtime."
      },
      {
        "q": "What is the difference between Web Hosting, Cloud Hosting, and VPS?",
        "a": "Web Hosting shares server hardware efficiently, making it the most affordable choice for personal sites and small businesses. Cloud Hosting isolates dedicated CPU and RAM resources within a virtual container, delivering 3x faster speeds and high redundancy for growing businesses. VPS (Virtual Private Server) provides full root administrative access, allowing developers to install custom operating systems, Docker containers, and complex backend APIs."
      },
      {
        "q": "Can I run modern programming languages like Node.js, Python, and Docker?",
        "a": "Yes. On KVM VPS plans, you have complete root access to run any stack including Node.js, Python, Ruby, Go, Docker, PostgreSQL, Redis, and custom microservices. On Web & Cloud plans, PHP 8.x, Git, WP-CLI, and MySQL are standard."
      },
      {
        "q": "What is the 30-day money-back guarantee policy?",
        "a": "Hostinger offers an unconditional 30-day money-back guarantee. If you are not completely satisfied with the speed, uptime, or control panel for any reason within the first 30 days of purchase, you can cancel and receive a full refund with no hassle."
      },
      {
        "q": "How does Hostinger's hPanel compare to traditional cPanel?",
        "a": "hPanel is Hostinger's custom-built control panel. Unlike legacy cPanel which can feel sluggish and complicated for beginners, hPanel is ultra-modern, intuitive, responsive on mobile devices, and significantly faster. It integrates domain management, DNS records, staging, file management, and AI assistance into one cohesive interface."
      },
      {
        "q": "Does Hostinger support SSL certificates and HTTPS encryption?",
        "a": "Yes. Every domain, subdomain, and parked domain hosted on Hostinger receives free, lifetime Let's Encrypt SSL certificates that install and renew automatically. You will never have to pay extra fees for website encryption."
      }
    ],
    "isRtl": true,
    "ctaGetStarted": "شروع با ۲۰٪ تخفیف اختصاصی",
    "ctaExploreCourses": "مشاهده دوره‌های برنامه‌نویسی",
    "bottomGuarantee": "۳۰ روز ضمانت بازگشت کامل وجه بدون قید و شرط",
    "bottomInstant": "فعال‌سازی آنی حساب ابری در چند ثانیه",
    "bottomChat": "پشتیبانی چت زنده ۲۴/۷ با اولویت ویژه",
    "bottomDisclaimer": "* هاستینگر یک ارائه‌دهنده هاست ابری مستقل است. تخفیف‌های ویژه، ثبت دامنه و شرایط تمدید مستقیماً توسط هاستینگر مدیریت می‌شوند.",
    "metricSubTtfb": "بهینه‌شده با وب‌سرور لایت‌اسپید",
    "metricSubCdn": "شبکه ابری پیشرفته کلودفلر انترپرایز",
    "metricSubNvme": "حافظه سازمانی NVMe (RAID-10)",
    "metricSubSec": "حفاظت آنی با فایروال Monarx"
  },
  "ps": {
    "disclosure": "صافي اکاډمي له هاسټینګر سره رسمي همکاري لري. کله چې تاسو زموږ د تایید شوي لینک یا 89LSHAHEEKCO کوډ له لارې هاست واخلئ، ۲۰٪ اضافي تخفیف ترلاسه کوئ او صافي اکاډمۍ ته پرته له کوم اضافي لګښت څخه کمیسیون رسیږي چې د وړیا زده کړو ملاتړ کوي.",
    "partnerDisclosureBadge": "د رسمي همکارۍ روڼتیا:",
    "heroBadge": "د صافي اکاډمۍ رسمي همکار • ۲۰٪ تخفیف کوډ: 89LSHAHEEKCO",
    "heroTitle": "خورا چټک NVMe کلاوډ او د نوي نسل ویب هاسټینګ",
    "heroSubtitle": "خپلې ویبپاڼې او ډیجیټل کاروبارونه د نړۍ په خورا پرمختللو سرورونو کې پیل کړئ. په لایټ سپیډ سرورونو، NVMe ډرایوونو، ۹۹.۹٪ اپټایم او د هوښیار AI په مرسته سمبال.",
    "pill1": "د LiteSpeed Enterprise سرور او LSCache",
    "pill2": "وړیا ۱ کلن ډومین او وړیا نامحدود SSL",
    "pill3": "ورځنی او اوونیز اتومات بیک اپ",
    "pill4": "د ۳۰ ورځو پیسو بېرته ورکولو تضمین",
    "partnerCodeLabel": "د همکار ځانګړی کوډ:",
    "copyCodeBtn": "کوډ کاپي کړئ",
    "copiedBtn": "کاپي شو! ۲۰٪ تخفیف ولګېد",
    "claimDiscountBtn": "له ځانګړي لینک څخه ۲۰٪ تخفیف ترلاسه کړئ",
    "comparePlansBtn": "د پلانونو پرتله کول",
    "telemetryTitle": "د هاسټینګر کلاوډ سرورونو حالت",
    "telemetrySubtitle": "د NVMe Tier-3 زیربنا",
    "telemetryLive": "۹۹.۹۹٪ ژوندی او فعال",
    "metricTtfb": "د سرور د غبرګون چټکتیا (TTFB)",
    "metricUptime": "د سرور دوامداره فعال پاتې کېدل",
    "metricCdn": "نړیوال CDN شبکه",
    "metricAi": "د AI له لارې اتومات تېروتنې حل",
    "servicesBadge": "د کلاوډ اکوسیستم",
    "servicesTitle": "د کلاوډ او ویب هاسټینګ هراړخیز خدمات",
    "servicesSubtitle": "د نوي نسل کلاوډ زیربنا چې د پروګرامرانو، شرکتونو او محتوا جوړونکو لپاره جوړه شوې ده وڅارئ.",
    "plansBadge": "ځانګړي همکار نرخونه",
    "plansTitle": "لوړ سرعت لرونکي هاسټینګ پلانونه",
    "plansSubtitle": "د خپل ویبسایټ، آنلاین پلورنځي یا سافټویر لپاره ترټولو مناسب هاسټ وټاکئ.",
    "planFilterAll": "ټول پلانونه",
    "planFilterWeb": "ویب هاسټینګ",
    "planFilterCloud": "کلاوډ هاسټینګ",
    "planFilterVps": "کلاوډ VPS سرور",
    "archBadge": "تخنیکي معیارونه",
    "archTitle": "مسلکي انجنیري او نړیوال معیارونه",
    "archSubtitle": "وګورئ چې ولې پرمختللي انجینران او جوړونکي له زړو هاسټونو څخه هاسټینګر ته کډه کوي.",
    "stepsBadge": "د چټک فعالولو لارښود",
    "stepsTitle": "څنګه خپل ۲۰٪ تخفیف فعال کړئ",
    "stepsSubtitle": "دا ۴ ساده مرحلې تعقیب کړئ ترڅو په ۲ دقیقو کې خپل سایټ او تخفیف ترلاسه کړئ.",
    "faqsBadge": "پوښتنې او ځوابونه",
    "faqsTitle": "ډېرې پوښتل شوې پوښتنې",
    "services": [
      {
        "id": "web-hosting",
        "name": "High-Speed Web Hosting",
        "badge": "Most Popular",
        "category": "web",
        "shortDesc": "Optimized LiteSpeed infrastructure built for lightning-fast WordPress and dynamic websites.",
        "longDesc": "Hostinger's flagship web hosting is engineered on top of LiteSpeed Enterprise web servers, replacing slow legacy Apache engines. It incorporates the proprietary LSCache optimization plugin, server-level object caching, and HTTP/3 protocol support to deliver sub-200ms page load times. Perfect for personal blogs, business portfolios, and content websites seeking rock-solid 99.9% uptime with minimal setup overhead.",
        "specs": [
          "LiteSpeed Web Server with LSCache",
          "Free 1-Click WordPress Auto-Installer",
          "Free 1-Year Domain Registration Included",
          "Unlimited Free SSL Certificates",
          "Automated Weekly & Daily Backups",
          "Integrated Git Version Control Deployment"
        ]
      },
      {
        "id": "cloud-hosting",
        "name": "Enterprise Cloud Hosting",
        "badge": "High Performance",
        "category": "cloud",
        "shortDesc": "Isolated virtual containers with dedicated CPU, RAM, and automated instant resource scaling.",
        "longDesc": "Experience the power and stability of a dedicated server combined with the sheer simplicity of shared hosting. Each cloud account runs in an isolated virtual instance with dedicated RAM and vCPU cores. When your site experiences viral spikes, automated resource scaling absorbs the surge seamlessly without slowdowns or dropped connections. Includes a dedicated IP address and custom Cloudflare Enterprise routing.",
        "specs": [
          "Dedicated Virtual Resources (Up to 16GB RAM & 8 Cores)",
          "Dedicated IPv4 & IPv6 Address Included",
          "3x to 4x Faster Speed than Standard Hosting",
          "Built-in Cloudflare Enterprise CDN Protection",
          "Automated Daily Backups with 1-Click Restore",
          "Priority 24/7 VIP Technical Support"
        ]
      },
      {
        "id": "vps-hosting",
        "name": "KVM Cloud VPS Hosting",
        "badge": "Developers & DevOps",
        "category": "vps",
        "shortDesc": "Full root access, dedicated kernel virtualization, high-IOPS NVMe drives, and AI terminal assistance.",
        "longDesc": "Engineered for software engineers, backend developers, and tech leads who demand complete root-level control over their operating environment. Built upon Kernel-based Virtual Machine (KVM) technology, Hostinger VPS guarantees 100% dedicated hardware resource allocation. Deploy Docker containers, configure custom Node.js, Python, Ruby, or Go environments, and leverage the built-in AI Terminal Assistant to formulate Linux commands in seconds.",
        "specs": [
          "Full Root Access & Dedicated Kernel (KVM)",
          "Enterprise-Class NVMe Storage with Ultra-High IOPS",
          "OS Options: Ubuntu, Debian, AlmaLinux, Rocky Linux",
          "Docker, Node.js, Python & Microservices Ready",
          "Automated Weekly Snapshots & Firewall Rules",
          "Built-in AI Assistant for Terminal Configurations"
        ]
      },
      {
        "id": "agency-hosting",
        "name": "Agency Hosting & Hostinger Pro",
        "badge": "Agencies & Freelancers",
        "category": "web",
        "shortDesc": "Manage hundreds of client sites with unified credentials, team collaboration, and client sharing.",
        "longDesc": "Designed specifically for web design agencies, freelancers, and dev shops managing multiple client projects. The Hostinger Pro dashboard allows you to organize clients into workspaces, grant custom role-based permissions, and delegate access without sharing your master passwords. You can also deliver automated maintenance health checks, uptime reports, and white-labeled client experiences.",
        "specs": [
          "Centralized Multi-Client Management Portal",
          "Granular Role-Based Access Control (RBAC)",
          "Access Delegation Without Password Sharing",
          "Automated Client Website Maintenance Reports",
          "Integrated Referral & Commission Payouts",
          "Mass Plugin & Core WordPress Updates in 1-Click"
        ]
      },
      {
        "id": "ai-website-builder",
        "name": "AI Website Builder",
        "badge": "No-Code & Fast",
        "category": "web",
        "shortDesc": "Create stunning, fully responsive websites and e-commerce stores in under 60 seconds using AI.",
        "longDesc": "Transform a short text description into a fully functional, mobile-responsive, production-ready website in under a minute. The Hostinger AI Builder generates tailored layouts, copy, royalty-free images, and interactive contact forms. It includes a built-in AI Heatmap tool to predict visitor gaze patterns, an AI Logo Generator, and a robust e-commerce engine with 0% platform transaction fees.",
        "specs": [
          "Prompt-to-Website Generation in 60 Seconds",
          "Intuitive Drag-and-Drop Visual Canvas",
          "Integrated AI Copywriter & SEO Generator",
          "AI Heatmap for Conversion Rate Optimization",
          "Complete E-Commerce Suite (0% Transaction Fees)",
          "Mobile-First Responsive Layouts by Default"
        ]
      },
      {
        "id": "hostinger-horizons",
        "name": "Hostinger Horizons",
        "badge": "Next-Gen Cloud",
        "category": "cloud",
        "shortDesc": "Next-generation cloud ecosystem and edge deployment network built for the future of the web.",
        "longDesc": "Hostinger Horizons represents the cutting-edge evolution of global web infrastructure. By uniting edge computing, intelligent serverless routing, and globally distributed data caches, Horizons ensures websites load instantaneously regardless of visitor geography. It provides elastic infrastructure that adapts dynamically to emerging web standards, high-throughput media, and AI-driven web applications.",
        "specs": [
          "Next-Generation Edge-Native Architecture",
          "Ultra-Low Global Latency with Anycast Routing",
          "Automatic Elastic Resource Reallocation",
          "Future-Proof Compatibility with Modern Web Frameworks",
          "Tier-3 Globally Certified Data Center Backbone",
          "Continuous Performance & Reliability Tuning"
        ]
      },
      {
        "id": "business-email",
        "name": "Professional Business Email",
        "badge": "Brand Identity",
        "category": "web",
        "shortDesc": "Custom branded email addresses with robust anti-spam, calendar sync, and webmail portals.",
        "longDesc": "Establish immediate corporate credibility by sending messages from your own domain (e.g., name@yourcompany.com). Powered by Titan Email, this suite provides generous inbox storage (10GB to 50GB), advanced multi-layered anti-spam and anti-virus filtering, calendar management, and seamless synchronization across iOS, Android, macOS, and Windows devices.",
        "specs": [
          "Professional Branded Inboxes (@yourdomain.com)",
          "Up to 50GB Dedicated Storage per Mailbox",
          "Multi-Layer Anti-Spam & Zero-Day Threat Shield",
          "Integrated Business Calendar & Contact Manager",
          "Native Mobile Apps for iOS & Android",
          "Automated Email Forwarding & Signature Builder"
        ]
      },
      {
        "id": "reach-email",
        "name": "Reach Email Marketing",
        "badge": "Growth & Lead Gen",
        "category": "web",
        "shortDesc": "Built-in newsletter campaigns, automated drip sequences, and lead capture directly in hPanel.",
        "longDesc": "Nurture leads and convert visitors into repeat customers without paying for costly third-party email platforms. Reach Email Marketing is embedded directly within your hosting dashboard, allowing you to design beautiful newsletters with a drag-and-drop builder, segment subscribers by activity, launch automated welcome sequences, and monitor open and click-through metrics in real time.",
        "specs": [
          "Integrated Directly into Your Hosting Dashboard",
          "Drag-and-Drop Newsletter & Campaign Designer",
          "Automated Drip Sequences & Autoresponders",
          "Real-Time Delivery, Open, and Click Telemetry",
          "High Inbox Deliverability with Pre-Warmed IPs",
          "Seamless Form Integration with WordPress & HTML"
        ]
      },
      {
        "id": "managed-openclaw",
        "name": "Managed OpenClaw Microservices",
        "badge": "High Concurrency",
        "category": "cloud",
        "shortDesc": "Optimized containerized runtime environments for high-throughput background jobs and APIs.",
        "longDesc": "Managed OpenClaw is engineered for heavy computational workloads, background batch jobs, asynchronous task queues, and microservice APIs. It isolates computing processes to ensure zero resource contamination across your applications, giving backend developers an ultra-lean runtime environment optimized for low latency and high concurrent connections.",
        "specs": [
          "Isolated Containerized Microservice Architecture",
          "Optimized for High-Concurrency API Gateways",
          "Low-Overhead Compute Resource Allocation",
          "Continuous Process Health Monitoring & Self-Healing",
          "Integrated Micro-Telemetry & Error Logging",
          "Zero Server Maintenance & Automated Security Patching"
        ]
      },
      {
        "id": "ai-agents",
        "name": "Autonomous AI Hosting Agents",
        "badge": "Next-Gen AI",
        "category": "cloud",
        "shortDesc": "Intelligent in-dashboard agents that debug errors, optimize queries, and automate server management.",
        "longDesc": "Hostinger has integrated autonomous AI agents directly into hPanel. Need to identify why a WordPress plugin caused a critical error? The AI Agent analyzes error logs and suggests the exact fix. Need to optimize slow database queries, configure custom redirects, or generate .htaccess rewrite rules? Simply instruct the AI in natural language to execute the configuration safely.",
        "specs": [
          "Automated WordPress Plugin Conflict Diagnostics",
          "Natural Language .htaccess & Nginx Rule Generation",
          "Slow MySQL Query Detection & Indexing Advice",
          "Automated On-Page SEO Recommendations",
          "Terminal Command Generation for VPS Users",
          "24/7 Instant In-Dashboard Assistance"
        ]
      }
    ],
    "plans": [
      {
        "name": "پریمیوم ویب هاسټینګ",
        "tagline": "د شخصي وېبپاڼو، بلاګونو او محصلینو پروژو لپاره غوره انتخاب",
        "price": "$2.99",
        "period": "/month",
        "savings": "۷۵٪ تخفیف + ۲۰٪ د ملګري ځانګړی کوډ",
        "popular": false,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "100 GB SSD"
          },
          {
            "label": "Performance",
            "val": "Standard LiteSpeed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Weekly Automated"
          },
          {
            "label": "Email",
            "val": "Free Business Email"
          },
          {
            "label": "AI Tools",
            "val": "Basic AI Website Builder"
          }
        ],
        "ctaText": "پریمیوم پلن غوره کړئ"
      },
      {
        "name": "سوداګریز (بزنس) ویب هاسټینګ",
        "tagline": "د سوداګریزو شرکتونو، سټارټ اپونو او آنلاین پلورنځیو لپاره",
        "price": "$3.99",
        "period": "/month",
        "savings": "۷۳٪ تخفیف + ۲۰٪ د ملګري ځانګړی کوډ",
        "popular": true,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB Ultra NVMe (5x Faster)"
          },
          {
            "label": "Performance",
            "val": "Up to 5x Increased Speed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Daily & On-Demand Backups"
          },
          {
            "label": "CDN",
            "val": "Free Built-in CDN Included"
          },
          {
            "label": "Staging",
            "val": "1-Click WordPress Staging Tool"
          },
          {
            "label": "AI Tools",
            "val": "Full AI Website Builder Suite"
          }
        ],
        "ctaText": "بزنس پلن غوره کړئ"
      },
      {
        "name": "کلاوډ سټارټ اپ هاسټینګ",
        "tagline": "د ډیرو لیدونکو او پراخو پروژو لپاره ځانګړي سرور سرچینې",
        "price": "$9.99",
        "period": "/month",
        "savings": "۶۰٪ تخفیف + ۲۰٪ د ملګري ځانګړی کوډ",
        "popular": false,
        "category": "cloud",
        "specs": [
          {
            "label": "Websites",
            "val": "300 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB NVMe Storage"
          },
          {
            "label": "RAM / CPU",
            "val": "3 GB RAM + 2 CPU Cores (Dedicated)"
          },
          {
            "label": "Performance",
            "val": "Up to 10x Boosted Speed"
          },
          {
            "label": "IP Address",
            "val": "Dedicated IP Address Included"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain"
          },
          {
            "label": "Backups",
            "val": "Automated Daily Backups"
          },
          {
            "label": "CDN",
            "val": "Cloudflare Enterprise CDN"
          },
          {
            "label": "Support",
            "val": "Priority 24/7 VIP Support Queue"
          }
        ],
        "ctaText": "کلاوډ سټارټ اپ غوره کړئ"
      },
      {
        "name": "KVM 2 کلاوډ مجازی سرور (VPS)",
        "tagline": "د پروګرامرانو او انجینرانو لپاره د بشپړ روټ کنټرول سرور",
        "price": "$7.99",
        "period": "/month",
        "savings": "۵۵٪ تخفیف + ۲۰٪ د ملګري ځانګړی کوډ",
        "popular": false,
        "category": "vps",
        "specs": [
          {
            "label": "CPU",
            "val": "2 Dedicated vCPU Cores"
          },
          {
            "label": "RAM",
            "val": "8 GB Dedicated RAM"
          },
          {
            "label": "Storage",
            "val": "100 GB High-IOPS NVMe"
          },
          {
            "label": "Bandwidth",
            "val": "8 TB High-Speed Traffic"
          },
          {
            "label": "Access",
            "val": "Full Root Administrative Access"
          },
          {
            "label": "Virtualization",
            "val": "100% Kernel-based (KVM)"
          },
          {
            "label": "Backups",
            "val": "Automated Weekly Snapshots"
          },
          {
            "label": "AI Terminal",
            "val": "AI Assistant for Linux Commands"
          },
          {
            "label": "OS Support",
            "val": "Ubuntu, Debian, AlmaLinux, Rocky"
          }
        ],
        "ctaText": "KVM سرور غوره کړئ"
      }
    ],
    "architectureHighlights": [
      {
        "title": "LiteSpeed Enterprise vs. Apache",
        "desc": "Unlike budget hosts that still use 20-year-old Apache software, Hostinger utilizes LiteSpeed Enterprise web servers. LiteSpeed processes static and dynamic requests simultaneously through event-driven architecture, reducing RAM usage and serving WordPress pages up to 500% faster.",
        "metric": "5x Faster TTFB"
      },
      {
        "title": "Global Tier-3 Data Centers",
        "desc": "Deploy your site closest to your target audience. Choose from global enterprise data center locations across the United States, United Kingdom, France, Netherlands, Lithuania, Singapore, India, and Brazil. Switch data center locations anytime with a single click.",
        "metric": "8 Global Regions"
      },
      {
        "title": "Multi-Layer Defensive Security",
        "desc": "Every website is shielded behind custom Web Application Firewalls (WAF), Cloudflare DDoS mitigation, automated SSL encryption, and Monarx real-time malware scanning that neutralizes malicious scripts before they execute.",
        "metric": "99.9% Uptime SLA"
      },
      {
        "title": "Next-Gen hPanel Control Center",
        "desc": "Forget clumsy, outdated cPanel interfaces. Hostinger custom-engineered hPanel to be clean, responsive, and intuitive. Manage DNS, create databases, install SSL certificates, set up staging sites, and access file managers in seconds.",
        "metric": "3x Faster Navigation"
      },
      {
        "title": "Automated Snapshot & Daily Backups",
        "desc": "Never worry about catastrophic data loss. Websites are backed up automatically with point-in-time restore capabilities. If an update breaks your website, roll back to an earlier version with a single click in your dashboard.",
        "metric": "Zero-Downtime Restores"
      },
      {
        "title": "Developer & Staging Toolkit",
        "desc": "Equipped with modern developer tooling including Git integration, WP-CLI, SSH access, PHP version switcher (from PHP 7.4 to PHP 8.3+), MySQL/phpMyAdmin access, and a one-click staging environment to test changes safely.",
        "metric": "Dev-Ready Stack"
      }
    ],
    "launchSteps": [
      {
        "step": "01",
        "title": "Click Safi Academy's Partner Link",
        "desc": "Access the exclusive portal using our verified referral URL to unlock special promotional pricing with up to 75% standard discount plus our 20% bonus."
      },
      {
        "step": "02",
        "title": "Select Your Preferred Plan",
        "desc": "Choose between Web Hosting (for blogs/portfolios), Cloud Hosting (for high-traffic businesses), or KVM VPS (for developers requiring root access)."
      },
      {
        "step": "03",
        "title": "Apply Code 89LSHAHEEKCO at Checkout",
        "desc": "Ensure the referral code 89LSHAHEEKCO is present in the coupon field to automatically lock in your additional 20% discount on your order."
      },
      {
        "step": "04",
        "title": "Claim Free Domain & Deploy in 60s",
        "desc": "Claim your free 1-year custom domain name (.com, .net, .org, etc.) and launch your site using the 1-click WordPress installer or the AI Website Builder."
      }
    ],
    "faqs": [
      {
        "q": "How do I claim the 20% discount using the referral code?",
        "a": "Simply click any of the 'Claim 20% Discount' or 'Get Started' buttons on this page. The referral code 89LSHAHEEKCO will be automatically appended to your checkout session. You can also copy the code directly using our 1-click coupon widget and paste it into the coupon code box during checkout at Hostinger.com to verify your 20% savings."
      },
      {
        "q": "Is the free domain name really included at no cost?",
        "a": "Yes! When you purchase any 12, 24, or 48-month Premium, Business, or Cloud hosting plan, Hostinger includes a free custom domain registration for your first full year. Popular extensions like .com, .net, .org, .online, and .tech are fully eligible."
      },
      {
        "q": "Can I migrate my existing website from another hosting provider for free?",
        "a": "Yes, 100% free. Hostinger provides an automated website migration service. Once you sign up, simply enter your current host's login details or WordPress URL in hPanel, and Hostinger's migration engineers and automated tools will transfer your entire site, databases, and emails with zero downtime."
      },
      {
        "q": "What is the difference between Web Hosting, Cloud Hosting, and VPS?",
        "a": "Web Hosting shares server hardware efficiently, making it the most affordable choice for personal sites and small businesses. Cloud Hosting isolates dedicated CPU and RAM resources within a virtual container, delivering 3x faster speeds and high redundancy for growing businesses. VPS (Virtual Private Server) provides full root administrative access, allowing developers to install custom operating systems, Docker containers, and complex backend APIs."
      },
      {
        "q": "Can I run modern programming languages like Node.js, Python, and Docker?",
        "a": "Yes. On KVM VPS plans, you have complete root access to run any stack including Node.js, Python, Ruby, Go, Docker, PostgreSQL, Redis, and custom microservices. On Web & Cloud plans, PHP 8.x, Git, WP-CLI, and MySQL are standard."
      },
      {
        "q": "What is the 30-day money-back guarantee policy?",
        "a": "Hostinger offers an unconditional 30-day money-back guarantee. If you are not completely satisfied with the speed, uptime, or control panel for any reason within the first 30 days of purchase, you can cancel and receive a full refund with no hassle."
      },
      {
        "q": "How does Hostinger's hPanel compare to traditional cPanel?",
        "a": "hPanel is Hostinger's custom-built control panel. Unlike legacy cPanel which can feel sluggish and complicated for beginners, hPanel is ultra-modern, intuitive, responsive on mobile devices, and significantly faster. It integrates domain management, DNS records, staging, file management, and AI assistance into one cohesive interface."
      },
      {
        "q": "Does Hostinger support SSL certificates and HTTPS encryption?",
        "a": "Yes. Every domain, subdomain, and parked domain hosted on Hostinger receives free, lifetime Let's Encrypt SSL certificates that install and renew automatically. You will never have to pay extra fees for website encryption."
      }
    ],
    "isRtl": true,
    "ctaGetStarted": "د ۲۰٪ ځانګړي تخفیف سره پیل کړئ",
    "ctaExploreCourses": "د کوډنګ او پروګرامینګ کورسونه",
    "bottomGuarantee": "د ۳۰ ورځو بې قید او شرطه د پیسو بیرته ورکول",
    "bottomInstant": "په څو ثانیو کې د کلاوډ حساب فوري فعالیدل",
    "bottomChat": "۲۴/۷ ځانګړی چټ او آنلاین ملاتړ",
    "bottomDisclaimer": "* هاستینګر یو خپلواک کلاوډ چمتو کونکی دی. ځانګړي تخفیفونه او د ډومین نومونه مستقیماً د هاستینګر لخوا اداره کیږي.",
    "metricSubTtfb": "د لایټ سپیډ له لارې چټک شوی",
    "metricSubCdn": "د کلودفلیر انټرپرایز نړیواله شبکه",
    "metricSubNvme": "خورا چټک سازمانی NVMe",
    "metricSubSec": "د Monarx او کلاوډ دیوال امنیت"
  },
  "ru": {
    "disclosure": "Safi Academy maintains an official affiliate partnership with Hostinger. When you purchase hosting through our verified referral link or apply coupon code 89LSHAHEEKCO, you receive an exclusive 20% additional discount on your order, and Safi Academy may earn a referral commission at no additional cost to you. This support enables us to continue offering free coding, cloud, and entrepreneurship education globally.",
    "partnerDisclosureBadge": "Transparent Affiliate Disclosure:",
    "heroBadge": "Safi Academy Verified Partner • 20% Off Code: 89LSHAHEEKCO",
    "heroTitle": "Ultra-Fast NVMe Cloud & Next-Gen Web Hosting",
    "heroSubtitle": "Power your websites, web applications, and digital business on world-class infrastructure. Equipped with LiteSpeed Enterprise web servers, enterprise NVMe SSDs, 99.9% uptime SLA, global CDN, and autonomous AI agents.",
    "pill1": "LiteSpeed Enterprise & LSCache Included",
    "pill2": "Free 1-Year Domain & Lifetime Free SSL",
    "pill3": "Automated Daily & Weekly Backups",
    "pill4": "30-Day Money-Back Guarantee",
    "partnerCodeLabel": "Partner Code:",
    "copyCodeBtn": "Copy Code",
    "copiedBtn": "Copied! 20% Applied",
    "claimDiscountBtn": "Claim 20% Discount with Partner Link",
    "comparePlansBtn": "Compare Plans",
    "telemetryTitle": "Hostinger Cloud Telemetry",
    "telemetrySubtitle": "NVMe Tier-3 Infrastructure",
    "telemetryLive": "99.99% Live",
    "metricTtfb": "Server Response (TTFB)",
    "metricUptime": "Uptime Guarantee",
    "metricCdn": "Global Edge CDN",
    "metricAi": "Autonomous AI Debugging",
    "servicesBadge": "Cloud Ecosystem",
    "servicesTitle": "Comprehensive Cloud & Web Hosting Infrastructure",
    "servicesSubtitle": "Explore specialized cloud infrastructure engineered for creators, modern developers, agencies, and enterprise applications.",
    "plansBadge": "Special Partner Pricing",
    "plansTitle": "High-Performance Hosting Tiers",
    "plansSubtitle": "Choose the optimal hosting architecture for your personal brand, digital business, or SaaS platform.",
    "planFilterAll": "All Plans",
    "planFilterWeb": "Web Hosting",
    "planFilterCloud": "Cloud Hosting",
    "planFilterVps": "Cloud VPS",
    "archBadge": "Technical Benchmarks",
    "archTitle": "Enterprise Engineering & Cloud Benchmarks",
    "archSubtitle": "Discover the technical engineering advantages that set Hostinger apart from legacy hosting providers.",
    "stepsBadge": "Simple Activation Guide",
    "stepsTitle": "How to Activate Your 20% Bonus Discount",
    "stepsSubtitle": "Follow these 4 simple steps to lock in your special promotional rate and launch your website in under 2 minutes.",
    "faqsBadge": "Help & Clarifications",
    "faqsTitle": "Frequently Asked Questions",
    "services": [
      {
        "id": "web-hosting",
        "name": "High-Speed Web Hosting",
        "badge": "Most Popular",
        "category": "web",
        "shortDesc": "Optimized LiteSpeed infrastructure built for lightning-fast WordPress and dynamic websites.",
        "longDesc": "Hostinger's flagship web hosting is engineered on top of LiteSpeed Enterprise web servers, replacing slow legacy Apache engines. It incorporates the proprietary LSCache optimization plugin, server-level object caching, and HTTP/3 protocol support to deliver sub-200ms page load times. Perfect for personal blogs, business portfolios, and content websites seeking rock-solid 99.9% uptime with minimal setup overhead.",
        "specs": [
          "LiteSpeed Web Server with LSCache",
          "Free 1-Click WordPress Auto-Installer",
          "Free 1-Year Domain Registration Included",
          "Unlimited Free SSL Certificates",
          "Automated Weekly & Daily Backups",
          "Integrated Git Version Control Deployment"
        ]
      },
      {
        "id": "cloud-hosting",
        "name": "Enterprise Cloud Hosting",
        "badge": "High Performance",
        "category": "cloud",
        "shortDesc": "Isolated virtual containers with dedicated CPU, RAM, and automated instant resource scaling.",
        "longDesc": "Experience the power and stability of a dedicated server combined with the sheer simplicity of shared hosting. Each cloud account runs in an isolated virtual instance with dedicated RAM and vCPU cores. When your site experiences viral spikes, automated resource scaling absorbs the surge seamlessly without slowdowns or dropped connections. Includes a dedicated IP address and custom Cloudflare Enterprise routing.",
        "specs": [
          "Dedicated Virtual Resources (Up to 16GB RAM & 8 Cores)",
          "Dedicated IPv4 & IPv6 Address Included",
          "3x to 4x Faster Speed than Standard Hosting",
          "Built-in Cloudflare Enterprise CDN Protection",
          "Automated Daily Backups with 1-Click Restore",
          "Priority 24/7 VIP Technical Support"
        ]
      },
      {
        "id": "vps-hosting",
        "name": "KVM Cloud VPS Hosting",
        "badge": "Developers & DevOps",
        "category": "vps",
        "shortDesc": "Full root access, dedicated kernel virtualization, high-IOPS NVMe drives, and AI terminal assistance.",
        "longDesc": "Engineered for software engineers, backend developers, and tech leads who demand complete root-level control over their operating environment. Built upon Kernel-based Virtual Machine (KVM) technology, Hostinger VPS guarantees 100% dedicated hardware resource allocation. Deploy Docker containers, configure custom Node.js, Python, Ruby, or Go environments, and leverage the built-in AI Terminal Assistant to formulate Linux commands in seconds.",
        "specs": [
          "Full Root Access & Dedicated Kernel (KVM)",
          "Enterprise-Class NVMe Storage with Ultra-High IOPS",
          "OS Options: Ubuntu, Debian, AlmaLinux, Rocky Linux",
          "Docker, Node.js, Python & Microservices Ready",
          "Automated Weekly Snapshots & Firewall Rules",
          "Built-in AI Assistant for Terminal Configurations"
        ]
      },
      {
        "id": "agency-hosting",
        "name": "Agency Hosting & Hostinger Pro",
        "badge": "Agencies & Freelancers",
        "category": "web",
        "shortDesc": "Manage hundreds of client sites with unified credentials, team collaboration, and client sharing.",
        "longDesc": "Designed specifically for web design agencies, freelancers, and dev shops managing multiple client projects. The Hostinger Pro dashboard allows you to organize clients into workspaces, grant custom role-based permissions, and delegate access without sharing your master passwords. You can also deliver automated maintenance health checks, uptime reports, and white-labeled client experiences.",
        "specs": [
          "Centralized Multi-Client Management Portal",
          "Granular Role-Based Access Control (RBAC)",
          "Access Delegation Without Password Sharing",
          "Automated Client Website Maintenance Reports",
          "Integrated Referral & Commission Payouts",
          "Mass Plugin & Core WordPress Updates in 1-Click"
        ]
      },
      {
        "id": "ai-website-builder",
        "name": "AI Website Builder",
        "badge": "No-Code & Fast",
        "category": "web",
        "shortDesc": "Create stunning, fully responsive websites and e-commerce stores in under 60 seconds using AI.",
        "longDesc": "Transform a short text description into a fully functional, mobile-responsive, production-ready website in under a minute. The Hostinger AI Builder generates tailored layouts, copy, royalty-free images, and interactive contact forms. It includes a built-in AI Heatmap tool to predict visitor gaze patterns, an AI Logo Generator, and a robust e-commerce engine with 0% platform transaction fees.",
        "specs": [
          "Prompt-to-Website Generation in 60 Seconds",
          "Intuitive Drag-and-Drop Visual Canvas",
          "Integrated AI Copywriter & SEO Generator",
          "AI Heatmap for Conversion Rate Optimization",
          "Complete E-Commerce Suite (0% Transaction Fees)",
          "Mobile-First Responsive Layouts by Default"
        ]
      },
      {
        "id": "hostinger-horizons",
        "name": "Hostinger Horizons",
        "badge": "Next-Gen Cloud",
        "category": "cloud",
        "shortDesc": "Next-generation cloud ecosystem and edge deployment network built for the future of the web.",
        "longDesc": "Hostinger Horizons represents the cutting-edge evolution of global web infrastructure. By uniting edge computing, intelligent serverless routing, and globally distributed data caches, Horizons ensures websites load instantaneously regardless of visitor geography. It provides elastic infrastructure that adapts dynamically to emerging web standards, high-throughput media, and AI-driven web applications.",
        "specs": [
          "Next-Generation Edge-Native Architecture",
          "Ultra-Low Global Latency with Anycast Routing",
          "Automatic Elastic Resource Reallocation",
          "Future-Proof Compatibility with Modern Web Frameworks",
          "Tier-3 Globally Certified Data Center Backbone",
          "Continuous Performance & Reliability Tuning"
        ]
      },
      {
        "id": "business-email",
        "name": "Professional Business Email",
        "badge": "Brand Identity",
        "category": "web",
        "shortDesc": "Custom branded email addresses with robust anti-spam, calendar sync, and webmail portals.",
        "longDesc": "Establish immediate corporate credibility by sending messages from your own domain (e.g., name@yourcompany.com). Powered by Titan Email, this suite provides generous inbox storage (10GB to 50GB), advanced multi-layered anti-spam and anti-virus filtering, calendar management, and seamless synchronization across iOS, Android, macOS, and Windows devices.",
        "specs": [
          "Professional Branded Inboxes (@yourdomain.com)",
          "Up to 50GB Dedicated Storage per Mailbox",
          "Multi-Layer Anti-Spam & Zero-Day Threat Shield",
          "Integrated Business Calendar & Contact Manager",
          "Native Mobile Apps for iOS & Android",
          "Automated Email Forwarding & Signature Builder"
        ]
      },
      {
        "id": "reach-email",
        "name": "Reach Email Marketing",
        "badge": "Growth & Lead Gen",
        "category": "web",
        "shortDesc": "Built-in newsletter campaigns, automated drip sequences, and lead capture directly in hPanel.",
        "longDesc": "Nurture leads and convert visitors into repeat customers without paying for costly third-party email platforms. Reach Email Marketing is embedded directly within your hosting dashboard, allowing you to design beautiful newsletters with a drag-and-drop builder, segment subscribers by activity, launch automated welcome sequences, and monitor open and click-through metrics in real time.",
        "specs": [
          "Integrated Directly into Your Hosting Dashboard",
          "Drag-and-Drop Newsletter & Campaign Designer",
          "Automated Drip Sequences & Autoresponders",
          "Real-Time Delivery, Open, and Click Telemetry",
          "High Inbox Deliverability with Pre-Warmed IPs",
          "Seamless Form Integration with WordPress & HTML"
        ]
      },
      {
        "id": "managed-openclaw",
        "name": "Managed OpenClaw Microservices",
        "badge": "High Concurrency",
        "category": "cloud",
        "shortDesc": "Optimized containerized runtime environments for high-throughput background jobs and APIs.",
        "longDesc": "Managed OpenClaw is engineered for heavy computational workloads, background batch jobs, asynchronous task queues, and microservice APIs. It isolates computing processes to ensure zero resource contamination across your applications, giving backend developers an ultra-lean runtime environment optimized for low latency and high concurrent connections.",
        "specs": [
          "Isolated Containerized Microservice Architecture",
          "Optimized for High-Concurrency API Gateways",
          "Low-Overhead Compute Resource Allocation",
          "Continuous Process Health Monitoring & Self-Healing",
          "Integrated Micro-Telemetry & Error Logging",
          "Zero Server Maintenance & Automated Security Patching"
        ]
      },
      {
        "id": "ai-agents",
        "name": "Autonomous AI Hosting Agents",
        "badge": "Next-Gen AI",
        "category": "cloud",
        "shortDesc": "Intelligent in-dashboard agents that debug errors, optimize queries, and automate server management.",
        "longDesc": "Hostinger has integrated autonomous AI agents directly into hPanel. Need to identify why a WordPress plugin caused a critical error? The AI Agent analyzes error logs and suggests the exact fix. Need to optimize slow database queries, configure custom redirects, or generate .htaccess rewrite rules? Simply instruct the AI in natural language to execute the configuration safely.",
        "specs": [
          "Automated WordPress Plugin Conflict Diagnostics",
          "Natural Language .htaccess & Nginx Rule Generation",
          "Slow MySQL Query Detection & Indexing Advice",
          "Automated On-Page SEO Recommendations",
          "Terminal Command Generation for VPS Users",
          "24/7 Instant In-Dashboard Assistance"
        ]
      }
    ],
    "plans": [
      {
        "name": "Премиум веб-хостинг",
        "tagline": "Лучший выбор для персональных сайтов, блогов и студенческих проектов",
        "price": "$2.99",
        "period": "/month",
        "savings": "Скидка 75% + 20% по промокоду",
        "popular": false,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "100 GB SSD"
          },
          {
            "label": "Performance",
            "val": "Standard LiteSpeed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Weekly Automated"
          },
          {
            "label": "Email",
            "val": "Free Business Email"
          },
          {
            "label": "AI Tools",
            "val": "Basic AI Website Builder"
          }
        ],
        "ctaText": "Выбрать тариф Премиум"
      },
      {
        "name": "Бизнес веб-хостинг",
        "tagline": "Рекомендуется для коммерческих сайтов, стартапов и интернет-магазинов",
        "price": "$3.99",
        "period": "/month",
        "savings": "Скидка 73% + 20% по промокоду",
        "popular": true,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB Ultra NVMe (5x Faster)"
          },
          {
            "label": "Performance",
            "val": "Up to 5x Increased Speed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Daily & On-Demand Backups"
          },
          {
            "label": "CDN",
            "val": "Free Built-in CDN Included"
          },
          {
            "label": "Staging",
            "val": "1-Click WordPress Staging Tool"
          },
          {
            "label": "AI Tools",
            "val": "Full AI Website Builder Suite"
          }
        ],
        "ctaText": "Выбрать тариф Бизнес"
      },
      {
        "name": "Облачный Cloud Startup",
        "tagline": "Выделенные серверные ресурсы для масштабируемых веб-приложений",
        "price": "$9.99",
        "period": "/month",
        "savings": "Скидка 60% + 20% по промокоду",
        "popular": false,
        "category": "cloud",
        "specs": [
          {
            "label": "Websites",
            "val": "300 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB NVMe Storage"
          },
          {
            "label": "RAM / CPU",
            "val": "3 GB RAM + 2 CPU Cores (Dedicated)"
          },
          {
            "label": "Performance",
            "val": "Up to 10x Boosted Speed"
          },
          {
            "label": "IP Address",
            "val": "Dedicated IP Address Included"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain"
          },
          {
            "label": "Backups",
            "val": "Automated Daily Backups"
          },
          {
            "label": "CDN",
            "val": "Cloudflare Enterprise CDN"
          },
          {
            "label": "Support",
            "val": "Priority 24/7 VIP Support Queue"
          }
        ],
        "ctaText": "Выбрать Cloud Startup"
      },
      {
        "name": "Облачный VPS KVM 2",
        "tagline": "Полный root-доступ к виртуальному серверу для разработчиков и инженеров",
        "price": "$7.99",
        "period": "/month",
        "savings": "Скидка 55% + 20% по промокоду",
        "popular": false,
        "category": "vps",
        "specs": [
          {
            "label": "CPU",
            "val": "2 Dedicated vCPU Cores"
          },
          {
            "label": "RAM",
            "val": "8 GB Dedicated RAM"
          },
          {
            "label": "Storage",
            "val": "100 GB High-IOPS NVMe"
          },
          {
            "label": "Bandwidth",
            "val": "8 TB High-Speed Traffic"
          },
          {
            "label": "Access",
            "val": "Full Root Administrative Access"
          },
          {
            "label": "Virtualization",
            "val": "100% Kernel-based (KVM)"
          },
          {
            "label": "Backups",
            "val": "Automated Weekly Snapshots"
          },
          {
            "label": "AI Terminal",
            "val": "AI Assistant for Linux Commands"
          },
          {
            "label": "OS Support",
            "val": "Ubuntu, Debian, AlmaLinux, Rocky"
          }
        ],
        "ctaText": "Выбрать KVM VPS"
      }
    ],
    "architectureHighlights": [
      {
        "title": "LiteSpeed Enterprise vs. Apache",
        "desc": "Unlike budget hosts that still use 20-year-old Apache software, Hostinger utilizes LiteSpeed Enterprise web servers. LiteSpeed processes static and dynamic requests simultaneously through event-driven architecture, reducing RAM usage and serving WordPress pages up to 500% faster.",
        "metric": "5x Faster TTFB"
      },
      {
        "title": "Global Tier-3 Data Centers",
        "desc": "Deploy your site closest to your target audience. Choose from global enterprise data center locations across the United States, United Kingdom, France, Netherlands, Lithuania, Singapore, India, and Brazil. Switch data center locations anytime with a single click.",
        "metric": "8 Global Regions"
      },
      {
        "title": "Multi-Layer Defensive Security",
        "desc": "Every website is shielded behind custom Web Application Firewalls (WAF), Cloudflare DDoS mitigation, automated SSL encryption, and Monarx real-time malware scanning that neutralizes malicious scripts before they execute.",
        "metric": "99.9% Uptime SLA"
      },
      {
        "title": "Next-Gen hPanel Control Center",
        "desc": "Forget clumsy, outdated cPanel interfaces. Hostinger custom-engineered hPanel to be clean, responsive, and intuitive. Manage DNS, create databases, install SSL certificates, set up staging sites, and access file managers in seconds.",
        "metric": "3x Faster Navigation"
      },
      {
        "title": "Automated Snapshot & Daily Backups",
        "desc": "Never worry about catastrophic data loss. Websites are backed up automatically with point-in-time restore capabilities. If an update breaks your website, roll back to an earlier version with a single click in your dashboard.",
        "metric": "Zero-Downtime Restores"
      },
      {
        "title": "Developer & Staging Toolkit",
        "desc": "Equipped with modern developer tooling including Git integration, WP-CLI, SSH access, PHP version switcher (from PHP 7.4 to PHP 8.3+), MySQL/phpMyAdmin access, and a one-click staging environment to test changes safely.",
        "metric": "Dev-Ready Stack"
      }
    ],
    "launchSteps": [
      {
        "step": "01",
        "title": "Click Safi Academy's Partner Link",
        "desc": "Access the exclusive portal using our verified referral URL to unlock special promotional pricing with up to 75% standard discount plus our 20% bonus."
      },
      {
        "step": "02",
        "title": "Select Your Preferred Plan",
        "desc": "Choose between Web Hosting (for blogs/portfolios), Cloud Hosting (for high-traffic businesses), or KVM VPS (for developers requiring root access)."
      },
      {
        "step": "03",
        "title": "Apply Code 89LSHAHEEKCO at Checkout",
        "desc": "Ensure the referral code 89LSHAHEEKCO is present in the coupon field to automatically lock in your additional 20% discount on your order."
      },
      {
        "step": "04",
        "title": "Claim Free Domain & Deploy in 60s",
        "desc": "Claim your free 1-year custom domain name (.com, .net, .org, etc.) and launch your site using the 1-click WordPress installer or the AI Website Builder."
      }
    ],
    "faqs": [
      {
        "q": "How do I claim the 20% discount using the referral code?",
        "a": "Simply click any of the 'Claim 20% Discount' or 'Get Started' buttons on this page. The referral code 89LSHAHEEKCO will be automatically appended to your checkout session. You can also copy the code directly using our 1-click coupon widget and paste it into the coupon code box during checkout at Hostinger.com to verify your 20% savings."
      },
      {
        "q": "Is the free domain name really included at no cost?",
        "a": "Yes! When you purchase any 12, 24, or 48-month Premium, Business, or Cloud hosting plan, Hostinger includes a free custom domain registration for your first full year. Popular extensions like .com, .net, .org, .online, and .tech are fully eligible."
      },
      {
        "q": "Can I migrate my existing website from another hosting provider for free?",
        "a": "Yes, 100% free. Hostinger provides an automated website migration service. Once you sign up, simply enter your current host's login details or WordPress URL in hPanel, and Hostinger's migration engineers and automated tools will transfer your entire site, databases, and emails with zero downtime."
      },
      {
        "q": "What is the difference between Web Hosting, Cloud Hosting, and VPS?",
        "a": "Web Hosting shares server hardware efficiently, making it the most affordable choice for personal sites and small businesses. Cloud Hosting isolates dedicated CPU and RAM resources within a virtual container, delivering 3x faster speeds and high redundancy for growing businesses. VPS (Virtual Private Server) provides full root administrative access, allowing developers to install custom operating systems, Docker containers, and complex backend APIs."
      },
      {
        "q": "Can I run modern programming languages like Node.js, Python, and Docker?",
        "a": "Yes. On KVM VPS plans, you have complete root access to run any stack including Node.js, Python, Ruby, Go, Docker, PostgreSQL, Redis, and custom microservices. On Web & Cloud plans, PHP 8.x, Git, WP-CLI, and MySQL are standard."
      },
      {
        "q": "What is the 30-day money-back guarantee policy?",
        "a": "Hostinger offers an unconditional 30-day money-back guarantee. If you are not completely satisfied with the speed, uptime, or control panel for any reason within the first 30 days of purchase, you can cancel and receive a full refund with no hassle."
      },
      {
        "q": "How does Hostinger's hPanel compare to traditional cPanel?",
        "a": "hPanel is Hostinger's custom-built control panel. Unlike legacy cPanel which can feel sluggish and complicated for beginners, hPanel is ultra-modern, intuitive, responsive on mobile devices, and significantly faster. It integrates domain management, DNS records, staging, file management, and AI assistance into one cohesive interface."
      },
      {
        "q": "Does Hostinger support SSL certificates and HTTPS encryption?",
        "a": "Yes. Every domain, subdomain, and parked domain hosted on Hostinger receives free, lifetime Let's Encrypt SSL certificates that install and renew automatically. You will never have to pay extra fees for website encryption."
      }
    ],
    "isRtl": false,
    "ctaGetStarted": "Начать со скидкой 20%",
    "ctaExploreCourses": "Смотреть курсы по веб-разработке",
    "bottomGuarantee": "30 дней безусловной гарантии возврата средств",
    "bottomInstant": "Мгновенная активация облачного аккаунта",
    "bottomChat": "Круглосуточная VIP-поддержка 24/7 в чате",
    "bottomDisclaimer": "* Hostinger является независимым провайдером облачного хостинга. Промо-скидки, регистрация доменов и продление регулируются непосредственно Hostinger.",
    "metricSubTtfb": "Оптимизация серверами LiteSpeed",
    "metricSubCdn": "Глобальная сеть Cloudflare Enterprise CDN",
    "metricSubNvme": "Сверхбыстрые накопители NVMe (RAID-10)",
    "metricSubSec": "Мониторинг угроз в реальном времени Monarx & WAF"
  },
  "tr": {
    "disclosure": "Safi Academy maintains an official affiliate partnership with Hostinger. When you purchase hosting through our verified referral link or apply coupon code 89LSHAHEEKCO, you receive an exclusive 20% additional discount on your order, and Safi Academy may earn a referral commission at no additional cost to you. This support enables us to continue offering free coding, cloud, and entrepreneurship education globally.",
    "partnerDisclosureBadge": "Transparent Affiliate Disclosure:",
    "heroBadge": "Safi Academy Verified Partner • 20% Off Code: 89LSHAHEEKCO",
    "heroTitle": "Ultra-Fast NVMe Cloud & Next-Gen Web Hosting",
    "heroSubtitle": "Power your websites, web applications, and digital business on world-class infrastructure. Equipped with LiteSpeed Enterprise web servers, enterprise NVMe SSDs, 99.9% uptime SLA, global CDN, and autonomous AI agents.",
    "pill1": "LiteSpeed Enterprise & LSCache Included",
    "pill2": "Free 1-Year Domain & Lifetime Free SSL",
    "pill3": "Automated Daily & Weekly Backups",
    "pill4": "30-Day Money-Back Guarantee",
    "partnerCodeLabel": "Partner Code:",
    "copyCodeBtn": "Copy Code",
    "copiedBtn": "Copied! 20% Applied",
    "claimDiscountBtn": "Claim 20% Discount with Partner Link",
    "comparePlansBtn": "Compare Plans",
    "telemetryTitle": "Hostinger Cloud Telemetry",
    "telemetrySubtitle": "NVMe Tier-3 Infrastructure",
    "telemetryLive": "99.99% Live",
    "metricTtfb": "Server Response (TTFB)",
    "metricUptime": "Uptime Guarantee",
    "metricCdn": "Global Edge CDN",
    "metricAi": "Autonomous AI Debugging",
    "servicesBadge": "Cloud Ecosystem",
    "servicesTitle": "Comprehensive Cloud & Web Hosting Infrastructure",
    "servicesSubtitle": "Explore specialized cloud infrastructure engineered for creators, modern developers, agencies, and enterprise applications.",
    "plansBadge": "Special Partner Pricing",
    "plansTitle": "High-Performance Hosting Tiers",
    "plansSubtitle": "Choose the optimal hosting architecture for your personal brand, digital business, or SaaS platform.",
    "planFilterAll": "All Plans",
    "planFilterWeb": "Web Hosting",
    "planFilterCloud": "Cloud Hosting",
    "planFilterVps": "Cloud VPS",
    "archBadge": "Technical Benchmarks",
    "archTitle": "Enterprise Engineering & Cloud Benchmarks",
    "archSubtitle": "Discover the technical engineering advantages that set Hostinger apart from legacy hosting providers.",
    "stepsBadge": "Simple Activation Guide",
    "stepsTitle": "How to Activate Your 20% Bonus Discount",
    "stepsSubtitle": "Follow these 4 simple steps to lock in your special promotional rate and launch your website in under 2 minutes.",
    "faqsBadge": "Help & Clarifications",
    "faqsTitle": "Frequently Asked Questions",
    "services": [
      {
        "id": "web-hosting",
        "name": "High-Speed Web Hosting",
        "badge": "Most Popular",
        "category": "web",
        "shortDesc": "Optimized LiteSpeed infrastructure built for lightning-fast WordPress and dynamic websites.",
        "longDesc": "Hostinger's flagship web hosting is engineered on top of LiteSpeed Enterprise web servers, replacing slow legacy Apache engines. It incorporates the proprietary LSCache optimization plugin, server-level object caching, and HTTP/3 protocol support to deliver sub-200ms page load times. Perfect for personal blogs, business portfolios, and content websites seeking rock-solid 99.9% uptime with minimal setup overhead.",
        "specs": [
          "LiteSpeed Web Server with LSCache",
          "Free 1-Click WordPress Auto-Installer",
          "Free 1-Year Domain Registration Included",
          "Unlimited Free SSL Certificates",
          "Automated Weekly & Daily Backups",
          "Integrated Git Version Control Deployment"
        ]
      },
      {
        "id": "cloud-hosting",
        "name": "Enterprise Cloud Hosting",
        "badge": "High Performance",
        "category": "cloud",
        "shortDesc": "Isolated virtual containers with dedicated CPU, RAM, and automated instant resource scaling.",
        "longDesc": "Experience the power and stability of a dedicated server combined with the sheer simplicity of shared hosting. Each cloud account runs in an isolated virtual instance with dedicated RAM and vCPU cores. When your site experiences viral spikes, automated resource scaling absorbs the surge seamlessly without slowdowns or dropped connections. Includes a dedicated IP address and custom Cloudflare Enterprise routing.",
        "specs": [
          "Dedicated Virtual Resources (Up to 16GB RAM & 8 Cores)",
          "Dedicated IPv4 & IPv6 Address Included",
          "3x to 4x Faster Speed than Standard Hosting",
          "Built-in Cloudflare Enterprise CDN Protection",
          "Automated Daily Backups with 1-Click Restore",
          "Priority 24/7 VIP Technical Support"
        ]
      },
      {
        "id": "vps-hosting",
        "name": "KVM Cloud VPS Hosting",
        "badge": "Developers & DevOps",
        "category": "vps",
        "shortDesc": "Full root access, dedicated kernel virtualization, high-IOPS NVMe drives, and AI terminal assistance.",
        "longDesc": "Engineered for software engineers, backend developers, and tech leads who demand complete root-level control over their operating environment. Built upon Kernel-based Virtual Machine (KVM) technology, Hostinger VPS guarantees 100% dedicated hardware resource allocation. Deploy Docker containers, configure custom Node.js, Python, Ruby, or Go environments, and leverage the built-in AI Terminal Assistant to formulate Linux commands in seconds.",
        "specs": [
          "Full Root Access & Dedicated Kernel (KVM)",
          "Enterprise-Class NVMe Storage with Ultra-High IOPS",
          "OS Options: Ubuntu, Debian, AlmaLinux, Rocky Linux",
          "Docker, Node.js, Python & Microservices Ready",
          "Automated Weekly Snapshots & Firewall Rules",
          "Built-in AI Assistant for Terminal Configurations"
        ]
      },
      {
        "id": "agency-hosting",
        "name": "Agency Hosting & Hostinger Pro",
        "badge": "Agencies & Freelancers",
        "category": "web",
        "shortDesc": "Manage hundreds of client sites with unified credentials, team collaboration, and client sharing.",
        "longDesc": "Designed specifically for web design agencies, freelancers, and dev shops managing multiple client projects. The Hostinger Pro dashboard allows you to organize clients into workspaces, grant custom role-based permissions, and delegate access without sharing your master passwords. You can also deliver automated maintenance health checks, uptime reports, and white-labeled client experiences.",
        "specs": [
          "Centralized Multi-Client Management Portal",
          "Granular Role-Based Access Control (RBAC)",
          "Access Delegation Without Password Sharing",
          "Automated Client Website Maintenance Reports",
          "Integrated Referral & Commission Payouts",
          "Mass Plugin & Core WordPress Updates in 1-Click"
        ]
      },
      {
        "id": "ai-website-builder",
        "name": "AI Website Builder",
        "badge": "No-Code & Fast",
        "category": "web",
        "shortDesc": "Create stunning, fully responsive websites and e-commerce stores in under 60 seconds using AI.",
        "longDesc": "Transform a short text description into a fully functional, mobile-responsive, production-ready website in under a minute. The Hostinger AI Builder generates tailored layouts, copy, royalty-free images, and interactive contact forms. It includes a built-in AI Heatmap tool to predict visitor gaze patterns, an AI Logo Generator, and a robust e-commerce engine with 0% platform transaction fees.",
        "specs": [
          "Prompt-to-Website Generation in 60 Seconds",
          "Intuitive Drag-and-Drop Visual Canvas",
          "Integrated AI Copywriter & SEO Generator",
          "AI Heatmap for Conversion Rate Optimization",
          "Complete E-Commerce Suite (0% Transaction Fees)",
          "Mobile-First Responsive Layouts by Default"
        ]
      },
      {
        "id": "hostinger-horizons",
        "name": "Hostinger Horizons",
        "badge": "Next-Gen Cloud",
        "category": "cloud",
        "shortDesc": "Next-generation cloud ecosystem and edge deployment network built for the future of the web.",
        "longDesc": "Hostinger Horizons represents the cutting-edge evolution of global web infrastructure. By uniting edge computing, intelligent serverless routing, and globally distributed data caches, Horizons ensures websites load instantaneously regardless of visitor geography. It provides elastic infrastructure that adapts dynamically to emerging web standards, high-throughput media, and AI-driven web applications.",
        "specs": [
          "Next-Generation Edge-Native Architecture",
          "Ultra-Low Global Latency with Anycast Routing",
          "Automatic Elastic Resource Reallocation",
          "Future-Proof Compatibility with Modern Web Frameworks",
          "Tier-3 Globally Certified Data Center Backbone",
          "Continuous Performance & Reliability Tuning"
        ]
      },
      {
        "id": "business-email",
        "name": "Professional Business Email",
        "badge": "Brand Identity",
        "category": "web",
        "shortDesc": "Custom branded email addresses with robust anti-spam, calendar sync, and webmail portals.",
        "longDesc": "Establish immediate corporate credibility by sending messages from your own domain (e.g., name@yourcompany.com). Powered by Titan Email, this suite provides generous inbox storage (10GB to 50GB), advanced multi-layered anti-spam and anti-virus filtering, calendar management, and seamless synchronization across iOS, Android, macOS, and Windows devices.",
        "specs": [
          "Professional Branded Inboxes (@yourdomain.com)",
          "Up to 50GB Dedicated Storage per Mailbox",
          "Multi-Layer Anti-Spam & Zero-Day Threat Shield",
          "Integrated Business Calendar & Contact Manager",
          "Native Mobile Apps for iOS & Android",
          "Automated Email Forwarding & Signature Builder"
        ]
      },
      {
        "id": "reach-email",
        "name": "Reach Email Marketing",
        "badge": "Growth & Lead Gen",
        "category": "web",
        "shortDesc": "Built-in newsletter campaigns, automated drip sequences, and lead capture directly in hPanel.",
        "longDesc": "Nurture leads and convert visitors into repeat customers without paying for costly third-party email platforms. Reach Email Marketing is embedded directly within your hosting dashboard, allowing you to design beautiful newsletters with a drag-and-drop builder, segment subscribers by activity, launch automated welcome sequences, and monitor open and click-through metrics in real time.",
        "specs": [
          "Integrated Directly into Your Hosting Dashboard",
          "Drag-and-Drop Newsletter & Campaign Designer",
          "Automated Drip Sequences & Autoresponders",
          "Real-Time Delivery, Open, and Click Telemetry",
          "High Inbox Deliverability with Pre-Warmed IPs",
          "Seamless Form Integration with WordPress & HTML"
        ]
      },
      {
        "id": "managed-openclaw",
        "name": "Managed OpenClaw Microservices",
        "badge": "High Concurrency",
        "category": "cloud",
        "shortDesc": "Optimized containerized runtime environments for high-throughput background jobs and APIs.",
        "longDesc": "Managed OpenClaw is engineered for heavy computational workloads, background batch jobs, asynchronous task queues, and microservice APIs. It isolates computing processes to ensure zero resource contamination across your applications, giving backend developers an ultra-lean runtime environment optimized for low latency and high concurrent connections.",
        "specs": [
          "Isolated Containerized Microservice Architecture",
          "Optimized for High-Concurrency API Gateways",
          "Low-Overhead Compute Resource Allocation",
          "Continuous Process Health Monitoring & Self-Healing",
          "Integrated Micro-Telemetry & Error Logging",
          "Zero Server Maintenance & Automated Security Patching"
        ]
      },
      {
        "id": "ai-agents",
        "name": "Autonomous AI Hosting Agents",
        "badge": "Next-Gen AI",
        "category": "cloud",
        "shortDesc": "Intelligent in-dashboard agents that debug errors, optimize queries, and automate server management.",
        "longDesc": "Hostinger has integrated autonomous AI agents directly into hPanel. Need to identify why a WordPress plugin caused a critical error? The AI Agent analyzes error logs and suggests the exact fix. Need to optimize slow database queries, configure custom redirects, or generate .htaccess rewrite rules? Simply instruct the AI in natural language to execute the configuration safely.",
        "specs": [
          "Automated WordPress Plugin Conflict Diagnostics",
          "Natural Language .htaccess & Nginx Rule Generation",
          "Slow MySQL Query Detection & Indexing Advice",
          "Automated On-Page SEO Recommendations",
          "Terminal Command Generation for VPS Users",
          "24/7 Instant In-Dashboard Assistance"
        ]
      }
    ],
    "plans": [
      {
        "name": "Premium Web Hosting",
        "tagline": "Kişisel web siteleri, bloglar ve öğrenci projeleri için en ideal çözüm",
        "price": "$2.99",
        "period": "/month",
        "savings": "%75 İndirim + %20 Ortaklık Kodu",
        "popular": false,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "100 GB SSD"
          },
          {
            "label": "Performance",
            "val": "Standard LiteSpeed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Weekly Automated"
          },
          {
            "label": "Email",
            "val": "Free Business Email"
          },
          {
            "label": "AI Tools",
            "val": "Basic AI Website Builder"
          }
        ],
        "ctaText": "Premium Planı Seç"
      },
      {
        "name": "Business Web Hosting",
        "tagline": "Şirketler, e-ticaret mağazaları ve büyüyen işletmeler için önerilir",
        "price": "$3.99",
        "period": "/month",
        "savings": "%73 İndirim + %20 Ortaklık Kodu",
        "popular": true,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB Ultra NVMe (5x Faster)"
          },
          {
            "label": "Performance",
            "val": "Up to 5x Increased Speed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Daily & On-Demand Backups"
          },
          {
            "label": "CDN",
            "val": "Free Built-in CDN Included"
          },
          {
            "label": "Staging",
            "val": "1-Click WordPress Staging Tool"
          },
          {
            "label": "AI Tools",
            "val": "Full AI Website Builder Suite"
          }
        ],
        "ctaText": "Business Planı Seç"
      },
      {
        "name": "Cloud Startup Hosting",
        "tagline": "Yüksek trafikli uygulamalar ve büyük siteler için ayrılmış kaynaklar",
        "price": "$9.99",
        "period": "/month",
        "savings": "%60 İndirim + %20 Ortaklık Kodu",
        "popular": false,
        "category": "cloud",
        "specs": [
          {
            "label": "Websites",
            "val": "300 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB NVMe Storage"
          },
          {
            "label": "RAM / CPU",
            "val": "3 GB RAM + 2 CPU Cores (Dedicated)"
          },
          {
            "label": "Performance",
            "val": "Up to 10x Boosted Speed"
          },
          {
            "label": "IP Address",
            "val": "Dedicated IP Address Included"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain"
          },
          {
            "label": "Backups",
            "val": "Automated Daily Backups"
          },
          {
            "label": "CDN",
            "val": "Cloudflare Enterprise CDN"
          },
          {
            "label": "Support",
            "val": "Priority 24/7 VIP Support Queue"
          }
        ],
        "ctaText": "Cloud Startup Seç"
      },
      {
        "name": "KVM 2 Bulut VPS",
        "tagline": "Yazılımcılar ve sistem yöneticileri için tam root yetkili sunucu",
        "price": "$7.99",
        "period": "/month",
        "savings": "%55 İndirim + %20 Ortaklık Kodu",
        "popular": false,
        "category": "vps",
        "specs": [
          {
            "label": "CPU",
            "val": "2 Dedicated vCPU Cores"
          },
          {
            "label": "RAM",
            "val": "8 GB Dedicated RAM"
          },
          {
            "label": "Storage",
            "val": "100 GB High-IOPS NVMe"
          },
          {
            "label": "Bandwidth",
            "val": "8 TB High-Speed Traffic"
          },
          {
            "label": "Access",
            "val": "Full Root Administrative Access"
          },
          {
            "label": "Virtualization",
            "val": "100% Kernel-based (KVM)"
          },
          {
            "label": "Backups",
            "val": "Automated Weekly Snapshots"
          },
          {
            "label": "AI Terminal",
            "val": "AI Assistant for Linux Commands"
          },
          {
            "label": "OS Support",
            "val": "Ubuntu, Debian, AlmaLinux, Rocky"
          }
        ],
        "ctaText": "KVM VPS Seç"
      }
    ],
    "architectureHighlights": [
      {
        "title": "LiteSpeed Enterprise vs. Apache",
        "desc": "Unlike budget hosts that still use 20-year-old Apache software, Hostinger utilizes LiteSpeed Enterprise web servers. LiteSpeed processes static and dynamic requests simultaneously through event-driven architecture, reducing RAM usage and serving WordPress pages up to 500% faster.",
        "metric": "5x Faster TTFB"
      },
      {
        "title": "Global Tier-3 Data Centers",
        "desc": "Deploy your site closest to your target audience. Choose from global enterprise data center locations across the United States, United Kingdom, France, Netherlands, Lithuania, Singapore, India, and Brazil. Switch data center locations anytime with a single click.",
        "metric": "8 Global Regions"
      },
      {
        "title": "Multi-Layer Defensive Security",
        "desc": "Every website is shielded behind custom Web Application Firewalls (WAF), Cloudflare DDoS mitigation, automated SSL encryption, and Monarx real-time malware scanning that neutralizes malicious scripts before they execute.",
        "metric": "99.9% Uptime SLA"
      },
      {
        "title": "Next-Gen hPanel Control Center",
        "desc": "Forget clumsy, outdated cPanel interfaces. Hostinger custom-engineered hPanel to be clean, responsive, and intuitive. Manage DNS, create databases, install SSL certificates, set up staging sites, and access file managers in seconds.",
        "metric": "3x Faster Navigation"
      },
      {
        "title": "Automated Snapshot & Daily Backups",
        "desc": "Never worry about catastrophic data loss. Websites are backed up automatically with point-in-time restore capabilities. If an update breaks your website, roll back to an earlier version with a single click in your dashboard.",
        "metric": "Zero-Downtime Restores"
      },
      {
        "title": "Developer & Staging Toolkit",
        "desc": "Equipped with modern developer tooling including Git integration, WP-CLI, SSH access, PHP version switcher (from PHP 7.4 to PHP 8.3+), MySQL/phpMyAdmin access, and a one-click staging environment to test changes safely.",
        "metric": "Dev-Ready Stack"
      }
    ],
    "launchSteps": [
      {
        "step": "01",
        "title": "Click Safi Academy's Partner Link",
        "desc": "Access the exclusive portal using our verified referral URL to unlock special promotional pricing with up to 75% standard discount plus our 20% bonus."
      },
      {
        "step": "02",
        "title": "Select Your Preferred Plan",
        "desc": "Choose between Web Hosting (for blogs/portfolios), Cloud Hosting (for high-traffic businesses), or KVM VPS (for developers requiring root access)."
      },
      {
        "step": "03",
        "title": "Apply Code 89LSHAHEEKCO at Checkout",
        "desc": "Ensure the referral code 89LSHAHEEKCO is present in the coupon field to automatically lock in your additional 20% discount on your order."
      },
      {
        "step": "04",
        "title": "Claim Free Domain & Deploy in 60s",
        "desc": "Claim your free 1-year custom domain name (.com, .net, .org, etc.) and launch your site using the 1-click WordPress installer or the AI Website Builder."
      }
    ],
    "faqs": [
      {
        "q": "How do I claim the 20% discount using the referral code?",
        "a": "Simply click any of the 'Claim 20% Discount' or 'Get Started' buttons on this page. The referral code 89LSHAHEEKCO will be automatically appended to your checkout session. You can also copy the code directly using our 1-click coupon widget and paste it into the coupon code box during checkout at Hostinger.com to verify your 20% savings."
      },
      {
        "q": "Is the free domain name really included at no cost?",
        "a": "Yes! When you purchase any 12, 24, or 48-month Premium, Business, or Cloud hosting plan, Hostinger includes a free custom domain registration for your first full year. Popular extensions like .com, .net, .org, .online, and .tech are fully eligible."
      },
      {
        "q": "Can I migrate my existing website from another hosting provider for free?",
        "a": "Yes, 100% free. Hostinger provides an automated website migration service. Once you sign up, simply enter your current host's login details or WordPress URL in hPanel, and Hostinger's migration engineers and automated tools will transfer your entire site, databases, and emails with zero downtime."
      },
      {
        "q": "What is the difference between Web Hosting, Cloud Hosting, and VPS?",
        "a": "Web Hosting shares server hardware efficiently, making it the most affordable choice for personal sites and small businesses. Cloud Hosting isolates dedicated CPU and RAM resources within a virtual container, delivering 3x faster speeds and high redundancy for growing businesses. VPS (Virtual Private Server) provides full root administrative access, allowing developers to install custom operating systems, Docker containers, and complex backend APIs."
      },
      {
        "q": "Can I run modern programming languages like Node.js, Python, and Docker?",
        "a": "Yes. On KVM VPS plans, you have complete root access to run any stack including Node.js, Python, Ruby, Go, Docker, PostgreSQL, Redis, and custom microservices. On Web & Cloud plans, PHP 8.x, Git, WP-CLI, and MySQL are standard."
      },
      {
        "q": "What is the 30-day money-back guarantee policy?",
        "a": "Hostinger offers an unconditional 30-day money-back guarantee. If you are not completely satisfied with the speed, uptime, or control panel for any reason within the first 30 days of purchase, you can cancel and receive a full refund with no hassle."
      },
      {
        "q": "How does Hostinger's hPanel compare to traditional cPanel?",
        "a": "hPanel is Hostinger's custom-built control panel. Unlike legacy cPanel which can feel sluggish and complicated for beginners, hPanel is ultra-modern, intuitive, responsive on mobile devices, and significantly faster. It integrates domain management, DNS records, staging, file management, and AI assistance into one cohesive interface."
      },
      {
        "q": "Does Hostinger support SSL certificates and HTTPS encryption?",
        "a": "Yes. Every domain, subdomain, and parked domain hosted on Hostinger receives free, lifetime Let's Encrypt SSL certificates that install and renew automatically. You will never have to pay extra fees for website encryption."
      }
    ],
    "isRtl": false,
    "ctaGetStarted": "%20 Ekstra İndirimle Başla",
    "ctaExploreCourses": "Yazılım Kurslarını İncele",
    "bottomGuarantee": "30 Gün Koşulsuz Para İade Garantisi",
    "bottomInstant": "Saniyeler İçinde Anında Hesap Aktivasyonu",
    "bottomChat": "7/24 Öncelikli Canlı Destek",
    "bottomDisclaimer": "* Hostinger bağımsız bir bulut barındırma sağlayıcısıdır. Promosyon indirimleri, alan adı tahsisleri ve yenileme koşulları doğrudan Hostinger tarafından yönetilir.",
    "metricSubTtfb": "LiteSpeed Enterprise ile Optimize",
    "metricSubCdn": "Cloudflare Enterprise Global CDN",
    "metricSubNvme": "Kurumsal NVMe SSD (RAID-10)",
    "metricSubSec": "Monarx & WAF ile Anlık Güvenlik"
  },
  "de": {
    "disclosure": "Safi Academy maintains an official affiliate partnership with Hostinger. When you purchase hosting through our verified referral link or apply coupon code 89LSHAHEEKCO, you receive an exclusive 20% additional discount on your order, and Safi Academy may earn a referral commission at no additional cost to you. This support enables us to continue offering free coding, cloud, and entrepreneurship education globally.",
    "partnerDisclosureBadge": "Transparent Affiliate Disclosure:",
    "heroBadge": "Safi Academy Verified Partner • 20% Off Code: 89LSHAHEEKCO",
    "heroTitle": "Ultra-Fast NVMe Cloud & Next-Gen Web Hosting",
    "heroSubtitle": "Power your websites, web applications, and digital business on world-class infrastructure. Equipped with LiteSpeed Enterprise web servers, enterprise NVMe SSDs, 99.9% uptime SLA, global CDN, and autonomous AI agents.",
    "pill1": "LiteSpeed Enterprise & LSCache Included",
    "pill2": "Free 1-Year Domain & Lifetime Free SSL",
    "pill3": "Automated Daily & Weekly Backups",
    "pill4": "30-Day Money-Back Guarantee",
    "partnerCodeLabel": "Partner Code:",
    "copyCodeBtn": "Copy Code",
    "copiedBtn": "Copied! 20% Applied",
    "claimDiscountBtn": "Claim 20% Discount with Partner Link",
    "comparePlansBtn": "Compare Plans",
    "telemetryTitle": "Hostinger Cloud Telemetry",
    "telemetrySubtitle": "NVMe Tier-3 Infrastructure",
    "telemetryLive": "99.99% Live",
    "metricTtfb": "Server Response (TTFB)",
    "metricUptime": "Uptime Guarantee",
    "metricCdn": "Global Edge CDN",
    "metricAi": "Autonomous AI Debugging",
    "servicesBadge": "Cloud Ecosystem",
    "servicesTitle": "Comprehensive Cloud & Web Hosting Infrastructure",
    "servicesSubtitle": "Explore specialized cloud infrastructure engineered for creators, modern developers, agencies, and enterprise applications.",
    "plansBadge": "Special Partner Pricing",
    "plansTitle": "High-Performance Hosting Tiers",
    "plansSubtitle": "Choose the optimal hosting architecture for your personal brand, digital business, or SaaS platform.",
    "planFilterAll": "All Plans",
    "planFilterWeb": "Web Hosting",
    "planFilterCloud": "Cloud Hosting",
    "planFilterVps": "Cloud VPS",
    "archBadge": "Technical Benchmarks",
    "archTitle": "Enterprise Engineering & Cloud Benchmarks",
    "archSubtitle": "Discover the technical engineering advantages that set Hostinger apart from legacy hosting providers.",
    "stepsBadge": "Simple Activation Guide",
    "stepsTitle": "How to Activate Your 20% Bonus Discount",
    "stepsSubtitle": "Follow these 4 simple steps to lock in your special promotional rate and launch your website in under 2 minutes.",
    "faqsBadge": "Help & Clarifications",
    "faqsTitle": "Frequently Asked Questions",
    "services": [
      {
        "id": "web-hosting",
        "name": "High-Speed Web Hosting",
        "badge": "Most Popular",
        "category": "web",
        "shortDesc": "Optimized LiteSpeed infrastructure built for lightning-fast WordPress and dynamic websites.",
        "longDesc": "Hostinger's flagship web hosting is engineered on top of LiteSpeed Enterprise web servers, replacing slow legacy Apache engines. It incorporates the proprietary LSCache optimization plugin, server-level object caching, and HTTP/3 protocol support to deliver sub-200ms page load times. Perfect for personal blogs, business portfolios, and content websites seeking rock-solid 99.9% uptime with minimal setup overhead.",
        "specs": [
          "LiteSpeed Web Server with LSCache",
          "Free 1-Click WordPress Auto-Installer",
          "Free 1-Year Domain Registration Included",
          "Unlimited Free SSL Certificates",
          "Automated Weekly & Daily Backups",
          "Integrated Git Version Control Deployment"
        ]
      },
      {
        "id": "cloud-hosting",
        "name": "Enterprise Cloud Hosting",
        "badge": "High Performance",
        "category": "cloud",
        "shortDesc": "Isolated virtual containers with dedicated CPU, RAM, and automated instant resource scaling.",
        "longDesc": "Experience the power and stability of a dedicated server combined with the sheer simplicity of shared hosting. Each cloud account runs in an isolated virtual instance with dedicated RAM and vCPU cores. When your site experiences viral spikes, automated resource scaling absorbs the surge seamlessly without slowdowns or dropped connections. Includes a dedicated IP address and custom Cloudflare Enterprise routing.",
        "specs": [
          "Dedicated Virtual Resources (Up to 16GB RAM & 8 Cores)",
          "Dedicated IPv4 & IPv6 Address Included",
          "3x to 4x Faster Speed than Standard Hosting",
          "Built-in Cloudflare Enterprise CDN Protection",
          "Automated Daily Backups with 1-Click Restore",
          "Priority 24/7 VIP Technical Support"
        ]
      },
      {
        "id": "vps-hosting",
        "name": "KVM Cloud VPS Hosting",
        "badge": "Developers & DevOps",
        "category": "vps",
        "shortDesc": "Full root access, dedicated kernel virtualization, high-IOPS NVMe drives, and AI terminal assistance.",
        "longDesc": "Engineered for software engineers, backend developers, and tech leads who demand complete root-level control over their operating environment. Built upon Kernel-based Virtual Machine (KVM) technology, Hostinger VPS guarantees 100% dedicated hardware resource allocation. Deploy Docker containers, configure custom Node.js, Python, Ruby, or Go environments, and leverage the built-in AI Terminal Assistant to formulate Linux commands in seconds.",
        "specs": [
          "Full Root Access & Dedicated Kernel (KVM)",
          "Enterprise-Class NVMe Storage with Ultra-High IOPS",
          "OS Options: Ubuntu, Debian, AlmaLinux, Rocky Linux",
          "Docker, Node.js, Python & Microservices Ready",
          "Automated Weekly Snapshots & Firewall Rules",
          "Built-in AI Assistant for Terminal Configurations"
        ]
      },
      {
        "id": "agency-hosting",
        "name": "Agency Hosting & Hostinger Pro",
        "badge": "Agencies & Freelancers",
        "category": "web",
        "shortDesc": "Manage hundreds of client sites with unified credentials, team collaboration, and client sharing.",
        "longDesc": "Designed specifically for web design agencies, freelancers, and dev shops managing multiple client projects. The Hostinger Pro dashboard allows you to organize clients into workspaces, grant custom role-based permissions, and delegate access without sharing your master passwords. You can also deliver automated maintenance health checks, uptime reports, and white-labeled client experiences.",
        "specs": [
          "Centralized Multi-Client Management Portal",
          "Granular Role-Based Access Control (RBAC)",
          "Access Delegation Without Password Sharing",
          "Automated Client Website Maintenance Reports",
          "Integrated Referral & Commission Payouts",
          "Mass Plugin & Core WordPress Updates in 1-Click"
        ]
      },
      {
        "id": "ai-website-builder",
        "name": "AI Website Builder",
        "badge": "No-Code & Fast",
        "category": "web",
        "shortDesc": "Create stunning, fully responsive websites and e-commerce stores in under 60 seconds using AI.",
        "longDesc": "Transform a short text description into a fully functional, mobile-responsive, production-ready website in under a minute. The Hostinger AI Builder generates tailored layouts, copy, royalty-free images, and interactive contact forms. It includes a built-in AI Heatmap tool to predict visitor gaze patterns, an AI Logo Generator, and a robust e-commerce engine with 0% platform transaction fees.",
        "specs": [
          "Prompt-to-Website Generation in 60 Seconds",
          "Intuitive Drag-and-Drop Visual Canvas",
          "Integrated AI Copywriter & SEO Generator",
          "AI Heatmap for Conversion Rate Optimization",
          "Complete E-Commerce Suite (0% Transaction Fees)",
          "Mobile-First Responsive Layouts by Default"
        ]
      },
      {
        "id": "hostinger-horizons",
        "name": "Hostinger Horizons",
        "badge": "Next-Gen Cloud",
        "category": "cloud",
        "shortDesc": "Next-generation cloud ecosystem and edge deployment network built for the future of the web.",
        "longDesc": "Hostinger Horizons represents the cutting-edge evolution of global web infrastructure. By uniting edge computing, intelligent serverless routing, and globally distributed data caches, Horizons ensures websites load instantaneously regardless of visitor geography. It provides elastic infrastructure that adapts dynamically to emerging web standards, high-throughput media, and AI-driven web applications.",
        "specs": [
          "Next-Generation Edge-Native Architecture",
          "Ultra-Low Global Latency with Anycast Routing",
          "Automatic Elastic Resource Reallocation",
          "Future-Proof Compatibility with Modern Web Frameworks",
          "Tier-3 Globally Certified Data Center Backbone",
          "Continuous Performance & Reliability Tuning"
        ]
      },
      {
        "id": "business-email",
        "name": "Professional Business Email",
        "badge": "Brand Identity",
        "category": "web",
        "shortDesc": "Custom branded email addresses with robust anti-spam, calendar sync, and webmail portals.",
        "longDesc": "Establish immediate corporate credibility by sending messages from your own domain (e.g., name@yourcompany.com). Powered by Titan Email, this suite provides generous inbox storage (10GB to 50GB), advanced multi-layered anti-spam and anti-virus filtering, calendar management, and seamless synchronization across iOS, Android, macOS, and Windows devices.",
        "specs": [
          "Professional Branded Inboxes (@yourdomain.com)",
          "Up to 50GB Dedicated Storage per Mailbox",
          "Multi-Layer Anti-Spam & Zero-Day Threat Shield",
          "Integrated Business Calendar & Contact Manager",
          "Native Mobile Apps for iOS & Android",
          "Automated Email Forwarding & Signature Builder"
        ]
      },
      {
        "id": "reach-email",
        "name": "Reach Email Marketing",
        "badge": "Growth & Lead Gen",
        "category": "web",
        "shortDesc": "Built-in newsletter campaigns, automated drip sequences, and lead capture directly in hPanel.",
        "longDesc": "Nurture leads and convert visitors into repeat customers without paying for costly third-party email platforms. Reach Email Marketing is embedded directly within your hosting dashboard, allowing you to design beautiful newsletters with a drag-and-drop builder, segment subscribers by activity, launch automated welcome sequences, and monitor open and click-through metrics in real time.",
        "specs": [
          "Integrated Directly into Your Hosting Dashboard",
          "Drag-and-Drop Newsletter & Campaign Designer",
          "Automated Drip Sequences & Autoresponders",
          "Real-Time Delivery, Open, and Click Telemetry",
          "High Inbox Deliverability with Pre-Warmed IPs",
          "Seamless Form Integration with WordPress & HTML"
        ]
      },
      {
        "id": "managed-openclaw",
        "name": "Managed OpenClaw Microservices",
        "badge": "High Concurrency",
        "category": "cloud",
        "shortDesc": "Optimized containerized runtime environments for high-throughput background jobs and APIs.",
        "longDesc": "Managed OpenClaw is engineered for heavy computational workloads, background batch jobs, asynchronous task queues, and microservice APIs. It isolates computing processes to ensure zero resource contamination across your applications, giving backend developers an ultra-lean runtime environment optimized for low latency and high concurrent connections.",
        "specs": [
          "Isolated Containerized Microservice Architecture",
          "Optimized for High-Concurrency API Gateways",
          "Low-Overhead Compute Resource Allocation",
          "Continuous Process Health Monitoring & Self-Healing",
          "Integrated Micro-Telemetry & Error Logging",
          "Zero Server Maintenance & Automated Security Patching"
        ]
      },
      {
        "id": "ai-agents",
        "name": "Autonomous AI Hosting Agents",
        "badge": "Next-Gen AI",
        "category": "cloud",
        "shortDesc": "Intelligent in-dashboard agents that debug errors, optimize queries, and automate server management.",
        "longDesc": "Hostinger has integrated autonomous AI agents directly into hPanel. Need to identify why a WordPress plugin caused a critical error? The AI Agent analyzes error logs and suggests the exact fix. Need to optimize slow database queries, configure custom redirects, or generate .htaccess rewrite rules? Simply instruct the AI in natural language to execute the configuration safely.",
        "specs": [
          "Automated WordPress Plugin Conflict Diagnostics",
          "Natural Language .htaccess & Nginx Rule Generation",
          "Slow MySQL Query Detection & Indexing Advice",
          "Automated On-Page SEO Recommendations",
          "Terminal Command Generation for VPS Users",
          "24/7 Instant In-Dashboard Assistance"
        ]
      }
    ],
    "plans": [
      {
        "name": "Premium Webhosting",
        "tagline": "Ideal für persönliche Websites, Blogs und Studentenprojekte",
        "price": "$2.99",
        "period": "/month",
        "savings": "75% Rabatt + 20% Partner-Rabatt",
        "popular": false,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "100 GB SSD"
          },
          {
            "label": "Performance",
            "val": "Standard LiteSpeed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Weekly Automated"
          },
          {
            "label": "Email",
            "val": "Free Business Email"
          },
          {
            "label": "AI Tools",
            "val": "Basic AI Website Builder"
          }
        ],
        "ctaText": "Premium-Tarif wählen"
      },
      {
        "name": "Business Webhosting",
        "tagline": "Empfohlen für Unternehmen, Startups und moderne Online-Shops",
        "price": "$3.99",
        "period": "/month",
        "savings": "73% Rabatt + 20% Partner-Rabatt",
        "popular": true,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB Ultra NVMe (5x Faster)"
          },
          {
            "label": "Performance",
            "val": "Up to 5x Increased Speed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Daily & On-Demand Backups"
          },
          {
            "label": "CDN",
            "val": "Free Built-in CDN Included"
          },
          {
            "label": "Staging",
            "val": "1-Click WordPress Staging Tool"
          },
          {
            "label": "AI Tools",
            "val": "Full AI Website Builder Suite"
          }
        ],
        "ctaText": "Business-Tarif wählen"
      },
      {
        "name": "Cloud Startup",
        "tagline": "Dedizierte Ressourcen für stark frequentierte Webanwendungen",
        "price": "$9.99",
        "period": "/month",
        "savings": "60% Rabatt + 20% Partner-Rabatt",
        "popular": false,
        "category": "cloud",
        "specs": [
          {
            "label": "Websites",
            "val": "300 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB NVMe Storage"
          },
          {
            "label": "RAM / CPU",
            "val": "3 GB RAM + 2 CPU Cores (Dedicated)"
          },
          {
            "label": "Performance",
            "val": "Up to 10x Boosted Speed"
          },
          {
            "label": "IP Address",
            "val": "Dedicated IP Address Included"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain"
          },
          {
            "label": "Backups",
            "val": "Automated Daily Backups"
          },
          {
            "label": "CDN",
            "val": "Cloudflare Enterprise CDN"
          },
          {
            "label": "Support",
            "val": "Priority 24/7 VIP Support Queue"
          }
        ],
        "ctaText": "Cloud Startup wählen"
      },
      {
        "name": "KVM 2 Cloud VPS",
        "tagline": "Dedizierte Serverleistung mit vollem Root-Zugriff für Entwickler",
        "price": "$7.99",
        "period": "/month",
        "savings": "55% Rabatt + 20% Partner-Rabatt",
        "popular": false,
        "category": "vps",
        "specs": [
          {
            "label": "CPU",
            "val": "2 Dedicated vCPU Cores"
          },
          {
            "label": "RAM",
            "val": "8 GB Dedicated RAM"
          },
          {
            "label": "Storage",
            "val": "100 GB High-IOPS NVMe"
          },
          {
            "label": "Bandwidth",
            "val": "8 TB High-Speed Traffic"
          },
          {
            "label": "Access",
            "val": "Full Root Administrative Access"
          },
          {
            "label": "Virtualization",
            "val": "100% Kernel-based (KVM)"
          },
          {
            "label": "Backups",
            "val": "Automated Weekly Snapshots"
          },
          {
            "label": "AI Terminal",
            "val": "AI Assistant for Linux Commands"
          },
          {
            "label": "OS Support",
            "val": "Ubuntu, Debian, AlmaLinux, Rocky"
          }
        ],
        "ctaText": "KVM VPS wählen"
      }
    ],
    "architectureHighlights": [
      {
        "title": "LiteSpeed Enterprise vs. Apache",
        "desc": "Unlike budget hosts that still use 20-year-old Apache software, Hostinger utilizes LiteSpeed Enterprise web servers. LiteSpeed processes static and dynamic requests simultaneously through event-driven architecture, reducing RAM usage and serving WordPress pages up to 500% faster.",
        "metric": "5x Faster TTFB"
      },
      {
        "title": "Global Tier-3 Data Centers",
        "desc": "Deploy your site closest to your target audience. Choose from global enterprise data center locations across the United States, United Kingdom, France, Netherlands, Lithuania, Singapore, India, and Brazil. Switch data center locations anytime with a single click.",
        "metric": "8 Global Regions"
      },
      {
        "title": "Multi-Layer Defensive Security",
        "desc": "Every website is shielded behind custom Web Application Firewalls (WAF), Cloudflare DDoS mitigation, automated SSL encryption, and Monarx real-time malware scanning that neutralizes malicious scripts before they execute.",
        "metric": "99.9% Uptime SLA"
      },
      {
        "title": "Next-Gen hPanel Control Center",
        "desc": "Forget clumsy, outdated cPanel interfaces. Hostinger custom-engineered hPanel to be clean, responsive, and intuitive. Manage DNS, create databases, install SSL certificates, set up staging sites, and access file managers in seconds.",
        "metric": "3x Faster Navigation"
      },
      {
        "title": "Automated Snapshot & Daily Backups",
        "desc": "Never worry about catastrophic data loss. Websites are backed up automatically with point-in-time restore capabilities. If an update breaks your website, roll back to an earlier version with a single click in your dashboard.",
        "metric": "Zero-Downtime Restores"
      },
      {
        "title": "Developer & Staging Toolkit",
        "desc": "Equipped with modern developer tooling including Git integration, WP-CLI, SSH access, PHP version switcher (from PHP 7.4 to PHP 8.3+), MySQL/phpMyAdmin access, and a one-click staging environment to test changes safely.",
        "metric": "Dev-Ready Stack"
      }
    ],
    "launchSteps": [
      {
        "step": "01",
        "title": "Click Safi Academy's Partner Link",
        "desc": "Access the exclusive portal using our verified referral URL to unlock special promotional pricing with up to 75% standard discount plus our 20% bonus."
      },
      {
        "step": "02",
        "title": "Select Your Preferred Plan",
        "desc": "Choose between Web Hosting (for blogs/portfolios), Cloud Hosting (for high-traffic businesses), or KVM VPS (for developers requiring root access)."
      },
      {
        "step": "03",
        "title": "Apply Code 89LSHAHEEKCO at Checkout",
        "desc": "Ensure the referral code 89LSHAHEEKCO is present in the coupon field to automatically lock in your additional 20% discount on your order."
      },
      {
        "step": "04",
        "title": "Claim Free Domain & Deploy in 60s",
        "desc": "Claim your free 1-year custom domain name (.com, .net, .org, etc.) and launch your site using the 1-click WordPress installer or the AI Website Builder."
      }
    ],
    "faqs": [
      {
        "q": "How do I claim the 20% discount using the referral code?",
        "a": "Simply click any of the 'Claim 20% Discount' or 'Get Started' buttons on this page. The referral code 89LSHAHEEKCO will be automatically appended to your checkout session. You can also copy the code directly using our 1-click coupon widget and paste it into the coupon code box during checkout at Hostinger.com to verify your 20% savings."
      },
      {
        "q": "Is the free domain name really included at no cost?",
        "a": "Yes! When you purchase any 12, 24, or 48-month Premium, Business, or Cloud hosting plan, Hostinger includes a free custom domain registration for your first full year. Popular extensions like .com, .net, .org, .online, and .tech are fully eligible."
      },
      {
        "q": "Can I migrate my existing website from another hosting provider for free?",
        "a": "Yes, 100% free. Hostinger provides an automated website migration service. Once you sign up, simply enter your current host's login details or WordPress URL in hPanel, and Hostinger's migration engineers and automated tools will transfer your entire site, databases, and emails with zero downtime."
      },
      {
        "q": "What is the difference between Web Hosting, Cloud Hosting, and VPS?",
        "a": "Web Hosting shares server hardware efficiently, making it the most affordable choice for personal sites and small businesses. Cloud Hosting isolates dedicated CPU and RAM resources within a virtual container, delivering 3x faster speeds and high redundancy for growing businesses. VPS (Virtual Private Server) provides full root administrative access, allowing developers to install custom operating systems, Docker containers, and complex backend APIs."
      },
      {
        "q": "Can I run modern programming languages like Node.js, Python, and Docker?",
        "a": "Yes. On KVM VPS plans, you have complete root access to run any stack including Node.js, Python, Ruby, Go, Docker, PostgreSQL, Redis, and custom microservices. On Web & Cloud plans, PHP 8.x, Git, WP-CLI, and MySQL are standard."
      },
      {
        "q": "What is the 30-day money-back guarantee policy?",
        "a": "Hostinger offers an unconditional 30-day money-back guarantee. If you are not completely satisfied with the speed, uptime, or control panel for any reason within the first 30 days of purchase, you can cancel and receive a full refund with no hassle."
      },
      {
        "q": "How does Hostinger's hPanel compare to traditional cPanel?",
        "a": "hPanel is Hostinger's custom-built control panel. Unlike legacy cPanel which can feel sluggish and complicated for beginners, hPanel is ultra-modern, intuitive, responsive on mobile devices, and significantly faster. It integrates domain management, DNS records, staging, file management, and AI assistance into one cohesive interface."
      },
      {
        "q": "Does Hostinger support SSL certificates and HTTPS encryption?",
        "a": "Yes. Every domain, subdomain, and parked domain hosted on Hostinger receives free, lifetime Let's Encrypt SSL certificates that install and renew automatically. You will never have to pay extra fees for website encryption."
      }
    ],
    "isRtl": false,
    "ctaGetStarted": "Jetzt mit 20% Rabatt starten",
    "ctaExploreCourses": "Coding-Kurse entdecken",
    "bottomGuarantee": "30 Tage bedingungslose Geld-zurück-Garantie",
    "bottomInstant": "Sofortige Aktivierung des Cloud-Kontos",
    "bottomChat": "Prioritärer 24/7-Live-Chat-Support",
    "bottomDisclaimer": "* Hostinger ist ein unabhängiger Cloud-Hosting-Anbieter. Rabattaktionen, Domainverfügbarkeit und Verlängerungsbedingungen werden direkt von Hostinger verwaltet.",
    "metricSubTtfb": "LiteSpeed Enterprise optimiert",
    "metricSubCdn": "Cloudflare Enterprise globales CDN",
    "metricSubNvme": "Enterprise NVMe (RAID-10)",
    "metricSubSec": "Echtzeit-Sicherheit mit Monarx & WAF"
  },
  "fr": {
    "disclosure": "Safi Academy maintains an official affiliate partnership with Hostinger. When you purchase hosting through our verified referral link or apply coupon code 89LSHAHEEKCO, you receive an exclusive 20% additional discount on your order, and Safi Academy may earn a referral commission at no additional cost to you. This support enables us to continue offering free coding, cloud, and entrepreneurship education globally.",
    "partnerDisclosureBadge": "Transparent Affiliate Disclosure:",
    "heroBadge": "Safi Academy Verified Partner • 20% Off Code: 89LSHAHEEKCO",
    "heroTitle": "Ultra-Fast NVMe Cloud & Next-Gen Web Hosting",
    "heroSubtitle": "Power your websites, web applications, and digital business on world-class infrastructure. Equipped with LiteSpeed Enterprise web servers, enterprise NVMe SSDs, 99.9% uptime SLA, global CDN, and autonomous AI agents.",
    "pill1": "LiteSpeed Enterprise & LSCache Included",
    "pill2": "Free 1-Year Domain & Lifetime Free SSL",
    "pill3": "Automated Daily & Weekly Backups",
    "pill4": "30-Day Money-Back Guarantee",
    "partnerCodeLabel": "Partner Code:",
    "copyCodeBtn": "Copy Code",
    "copiedBtn": "Copied! 20% Applied",
    "claimDiscountBtn": "Claim 20% Discount with Partner Link",
    "comparePlansBtn": "Compare Plans",
    "telemetryTitle": "Hostinger Cloud Telemetry",
    "telemetrySubtitle": "NVMe Tier-3 Infrastructure",
    "telemetryLive": "99.99% Live",
    "metricTtfb": "Server Response (TTFB)",
    "metricUptime": "Uptime Guarantee",
    "metricCdn": "Global Edge CDN",
    "metricAi": "Autonomous AI Debugging",
    "servicesBadge": "Cloud Ecosystem",
    "servicesTitle": "Comprehensive Cloud & Web Hosting Infrastructure",
    "servicesSubtitle": "Explore specialized cloud infrastructure engineered for creators, modern developers, agencies, and enterprise applications.",
    "plansBadge": "Special Partner Pricing",
    "plansTitle": "High-Performance Hosting Tiers",
    "plansSubtitle": "Choose the optimal hosting architecture for your personal brand, digital business, or SaaS platform.",
    "planFilterAll": "All Plans",
    "planFilterWeb": "Web Hosting",
    "planFilterCloud": "Cloud Hosting",
    "planFilterVps": "Cloud VPS",
    "archBadge": "Technical Benchmarks",
    "archTitle": "Enterprise Engineering & Cloud Benchmarks",
    "archSubtitle": "Discover the technical engineering advantages that set Hostinger apart from legacy hosting providers.",
    "stepsBadge": "Simple Activation Guide",
    "stepsTitle": "How to Activate Your 20% Bonus Discount",
    "stepsSubtitle": "Follow these 4 simple steps to lock in your special promotional rate and launch your website in under 2 minutes.",
    "faqsBadge": "Help & Clarifications",
    "faqsTitle": "Frequently Asked Questions",
    "services": [
      {
        "id": "web-hosting",
        "name": "High-Speed Web Hosting",
        "badge": "Most Popular",
        "category": "web",
        "shortDesc": "Optimized LiteSpeed infrastructure built for lightning-fast WordPress and dynamic websites.",
        "longDesc": "Hostinger's flagship web hosting is engineered on top of LiteSpeed Enterprise web servers, replacing slow legacy Apache engines. It incorporates the proprietary LSCache optimization plugin, server-level object caching, and HTTP/3 protocol support to deliver sub-200ms page load times. Perfect for personal blogs, business portfolios, and content websites seeking rock-solid 99.9% uptime with minimal setup overhead.",
        "specs": [
          "LiteSpeed Web Server with LSCache",
          "Free 1-Click WordPress Auto-Installer",
          "Free 1-Year Domain Registration Included",
          "Unlimited Free SSL Certificates",
          "Automated Weekly & Daily Backups",
          "Integrated Git Version Control Deployment"
        ]
      },
      {
        "id": "cloud-hosting",
        "name": "Enterprise Cloud Hosting",
        "badge": "High Performance",
        "category": "cloud",
        "shortDesc": "Isolated virtual containers with dedicated CPU, RAM, and automated instant resource scaling.",
        "longDesc": "Experience the power and stability of a dedicated server combined with the sheer simplicity of shared hosting. Each cloud account runs in an isolated virtual instance with dedicated RAM and vCPU cores. When your site experiences viral spikes, automated resource scaling absorbs the surge seamlessly without slowdowns or dropped connections. Includes a dedicated IP address and custom Cloudflare Enterprise routing.",
        "specs": [
          "Dedicated Virtual Resources (Up to 16GB RAM & 8 Cores)",
          "Dedicated IPv4 & IPv6 Address Included",
          "3x to 4x Faster Speed than Standard Hosting",
          "Built-in Cloudflare Enterprise CDN Protection",
          "Automated Daily Backups with 1-Click Restore",
          "Priority 24/7 VIP Technical Support"
        ]
      },
      {
        "id": "vps-hosting",
        "name": "KVM Cloud VPS Hosting",
        "badge": "Developers & DevOps",
        "category": "vps",
        "shortDesc": "Full root access, dedicated kernel virtualization, high-IOPS NVMe drives, and AI terminal assistance.",
        "longDesc": "Engineered for software engineers, backend developers, and tech leads who demand complete root-level control over their operating environment. Built upon Kernel-based Virtual Machine (KVM) technology, Hostinger VPS guarantees 100% dedicated hardware resource allocation. Deploy Docker containers, configure custom Node.js, Python, Ruby, or Go environments, and leverage the built-in AI Terminal Assistant to formulate Linux commands in seconds.",
        "specs": [
          "Full Root Access & Dedicated Kernel (KVM)",
          "Enterprise-Class NVMe Storage with Ultra-High IOPS",
          "OS Options: Ubuntu, Debian, AlmaLinux, Rocky Linux",
          "Docker, Node.js, Python & Microservices Ready",
          "Automated Weekly Snapshots & Firewall Rules",
          "Built-in AI Assistant for Terminal Configurations"
        ]
      },
      {
        "id": "agency-hosting",
        "name": "Agency Hosting & Hostinger Pro",
        "badge": "Agencies & Freelancers",
        "category": "web",
        "shortDesc": "Manage hundreds of client sites with unified credentials, team collaboration, and client sharing.",
        "longDesc": "Designed specifically for web design agencies, freelancers, and dev shops managing multiple client projects. The Hostinger Pro dashboard allows you to organize clients into workspaces, grant custom role-based permissions, and delegate access without sharing your master passwords. You can also deliver automated maintenance health checks, uptime reports, and white-labeled client experiences.",
        "specs": [
          "Centralized Multi-Client Management Portal",
          "Granular Role-Based Access Control (RBAC)",
          "Access Delegation Without Password Sharing",
          "Automated Client Website Maintenance Reports",
          "Integrated Referral & Commission Payouts",
          "Mass Plugin & Core WordPress Updates in 1-Click"
        ]
      },
      {
        "id": "ai-website-builder",
        "name": "AI Website Builder",
        "badge": "No-Code & Fast",
        "category": "web",
        "shortDesc": "Create stunning, fully responsive websites and e-commerce stores in under 60 seconds using AI.",
        "longDesc": "Transform a short text description into a fully functional, mobile-responsive, production-ready website in under a minute. The Hostinger AI Builder generates tailored layouts, copy, royalty-free images, and interactive contact forms. It includes a built-in AI Heatmap tool to predict visitor gaze patterns, an AI Logo Generator, and a robust e-commerce engine with 0% platform transaction fees.",
        "specs": [
          "Prompt-to-Website Generation in 60 Seconds",
          "Intuitive Drag-and-Drop Visual Canvas",
          "Integrated AI Copywriter & SEO Generator",
          "AI Heatmap for Conversion Rate Optimization",
          "Complete E-Commerce Suite (0% Transaction Fees)",
          "Mobile-First Responsive Layouts by Default"
        ]
      },
      {
        "id": "hostinger-horizons",
        "name": "Hostinger Horizons",
        "badge": "Next-Gen Cloud",
        "category": "cloud",
        "shortDesc": "Next-generation cloud ecosystem and edge deployment network built for the future of the web.",
        "longDesc": "Hostinger Horizons represents the cutting-edge evolution of global web infrastructure. By uniting edge computing, intelligent serverless routing, and globally distributed data caches, Horizons ensures websites load instantaneously regardless of visitor geography. It provides elastic infrastructure that adapts dynamically to emerging web standards, high-throughput media, and AI-driven web applications.",
        "specs": [
          "Next-Generation Edge-Native Architecture",
          "Ultra-Low Global Latency with Anycast Routing",
          "Automatic Elastic Resource Reallocation",
          "Future-Proof Compatibility with Modern Web Frameworks",
          "Tier-3 Globally Certified Data Center Backbone",
          "Continuous Performance & Reliability Tuning"
        ]
      },
      {
        "id": "business-email",
        "name": "Professional Business Email",
        "badge": "Brand Identity",
        "category": "web",
        "shortDesc": "Custom branded email addresses with robust anti-spam, calendar sync, and webmail portals.",
        "longDesc": "Establish immediate corporate credibility by sending messages from your own domain (e.g., name@yourcompany.com). Powered by Titan Email, this suite provides generous inbox storage (10GB to 50GB), advanced multi-layered anti-spam and anti-virus filtering, calendar management, and seamless synchronization across iOS, Android, macOS, and Windows devices.",
        "specs": [
          "Professional Branded Inboxes (@yourdomain.com)",
          "Up to 50GB Dedicated Storage per Mailbox",
          "Multi-Layer Anti-Spam & Zero-Day Threat Shield",
          "Integrated Business Calendar & Contact Manager",
          "Native Mobile Apps for iOS & Android",
          "Automated Email Forwarding & Signature Builder"
        ]
      },
      {
        "id": "reach-email",
        "name": "Reach Email Marketing",
        "badge": "Growth & Lead Gen",
        "category": "web",
        "shortDesc": "Built-in newsletter campaigns, automated drip sequences, and lead capture directly in hPanel.",
        "longDesc": "Nurture leads and convert visitors into repeat customers without paying for costly third-party email platforms. Reach Email Marketing is embedded directly within your hosting dashboard, allowing you to design beautiful newsletters with a drag-and-drop builder, segment subscribers by activity, launch automated welcome sequences, and monitor open and click-through metrics in real time.",
        "specs": [
          "Integrated Directly into Your Hosting Dashboard",
          "Drag-and-Drop Newsletter & Campaign Designer",
          "Automated Drip Sequences & Autoresponders",
          "Real-Time Delivery, Open, and Click Telemetry",
          "High Inbox Deliverability with Pre-Warmed IPs",
          "Seamless Form Integration with WordPress & HTML"
        ]
      },
      {
        "id": "managed-openclaw",
        "name": "Managed OpenClaw Microservices",
        "badge": "High Concurrency",
        "category": "cloud",
        "shortDesc": "Optimized containerized runtime environments for high-throughput background jobs and APIs.",
        "longDesc": "Managed OpenClaw is engineered for heavy computational workloads, background batch jobs, asynchronous task queues, and microservice APIs. It isolates computing processes to ensure zero resource contamination across your applications, giving backend developers an ultra-lean runtime environment optimized for low latency and high concurrent connections.",
        "specs": [
          "Isolated Containerized Microservice Architecture",
          "Optimized for High-Concurrency API Gateways",
          "Low-Overhead Compute Resource Allocation",
          "Continuous Process Health Monitoring & Self-Healing",
          "Integrated Micro-Telemetry & Error Logging",
          "Zero Server Maintenance & Automated Security Patching"
        ]
      },
      {
        "id": "ai-agents",
        "name": "Autonomous AI Hosting Agents",
        "badge": "Next-Gen AI",
        "category": "cloud",
        "shortDesc": "Intelligent in-dashboard agents that debug errors, optimize queries, and automate server management.",
        "longDesc": "Hostinger has integrated autonomous AI agents directly into hPanel. Need to identify why a WordPress plugin caused a critical error? The AI Agent analyzes error logs and suggests the exact fix. Need to optimize slow database queries, configure custom redirects, or generate .htaccess rewrite rules? Simply instruct the AI in natural language to execute the configuration safely.",
        "specs": [
          "Automated WordPress Plugin Conflict Diagnostics",
          "Natural Language .htaccess & Nginx Rule Generation",
          "Slow MySQL Query Detection & Indexing Advice",
          "Automated On-Page SEO Recommendations",
          "Terminal Command Generation for VPS Users",
          "24/7 Instant In-Dashboard Assistance"
        ]
      }
    ],
    "plans": [
      {
        "name": "Hébergement Web Premium",
        "tagline": "Idéal pour les sites personnels, les blogs et les projets étudiants",
        "price": "$2.99",
        "period": "/month",
        "savings": "75% d'économie + 20% code partenaire",
        "popular": false,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "100 GB SSD"
          },
          {
            "label": "Performance",
            "val": "Standard LiteSpeed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Weekly Automated"
          },
          {
            "label": "Email",
            "val": "Free Business Email"
          },
          {
            "label": "AI Tools",
            "val": "Basic AI Website Builder"
          }
        ],
        "ctaText": "Choisir le plan Premium"
      },
      {
        "name": "Hébergement Web Business",
        "tagline": "Recommandé pour les entreprises, créateurs et boutiques en ligne",
        "price": "$3.99",
        "period": "/month",
        "savings": "73% d'économie + 20% code partenaire",
        "popular": true,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB Ultra NVMe (5x Faster)"
          },
          {
            "label": "Performance",
            "val": "Up to 5x Increased Speed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Daily & On-Demand Backups"
          },
          {
            "label": "CDN",
            "val": "Free Built-in CDN Included"
          },
          {
            "label": "Staging",
            "val": "1-Click WordPress Staging Tool"
          },
          {
            "label": "AI Tools",
            "val": "Full AI Website Builder Suite"
          }
        ],
        "ctaText": "Choisir le plan Business"
      },
      {
        "name": "Cloud Startup",
        "tagline": "Ressources dédiées pour le trafic massif et les applications Web",
        "price": "$9.99",
        "period": "/month",
        "savings": "60% d'économie + 20% code partenaire",
        "popular": false,
        "category": "cloud",
        "specs": [
          {
            "label": "Websites",
            "val": "300 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB NVMe Storage"
          },
          {
            "label": "RAM / CPU",
            "val": "3 GB RAM + 2 CPU Cores (Dedicated)"
          },
          {
            "label": "Performance",
            "val": "Up to 10x Boosted Speed"
          },
          {
            "label": "IP Address",
            "val": "Dedicated IP Address Included"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain"
          },
          {
            "label": "Backups",
            "val": "Automated Daily Backups"
          },
          {
            "label": "CDN",
            "val": "Cloudflare Enterprise CDN"
          },
          {
            "label": "Support",
            "val": "Priority 24/7 VIP Support Queue"
          }
        ],
        "ctaText": "Choisir Cloud Startup"
      },
      {
        "name": "Serveur VPS Cloud KVM 2",
        "tagline": "Accès root complet et puissance dédiée pour développeurs et DevOps",
        "price": "$7.99",
        "period": "/month",
        "savings": "55% d'économie + 20% code partenaire",
        "popular": false,
        "category": "vps",
        "specs": [
          {
            "label": "CPU",
            "val": "2 Dedicated vCPU Cores"
          },
          {
            "label": "RAM",
            "val": "8 GB Dedicated RAM"
          },
          {
            "label": "Storage",
            "val": "100 GB High-IOPS NVMe"
          },
          {
            "label": "Bandwidth",
            "val": "8 TB High-Speed Traffic"
          },
          {
            "label": "Access",
            "val": "Full Root Administrative Access"
          },
          {
            "label": "Virtualization",
            "val": "100% Kernel-based (KVM)"
          },
          {
            "label": "Backups",
            "val": "Automated Weekly Snapshots"
          },
          {
            "label": "AI Terminal",
            "val": "AI Assistant for Linux Commands"
          },
          {
            "label": "OS Support",
            "val": "Ubuntu, Debian, AlmaLinux, Rocky"
          }
        ],
        "ctaText": "Choisir le VPS KVM"
      }
    ],
    "architectureHighlights": [
      {
        "title": "LiteSpeed Enterprise vs. Apache",
        "desc": "Unlike budget hosts that still use 20-year-old Apache software, Hostinger utilizes LiteSpeed Enterprise web servers. LiteSpeed processes static and dynamic requests simultaneously through event-driven architecture, reducing RAM usage and serving WordPress pages up to 500% faster.",
        "metric": "5x Faster TTFB"
      },
      {
        "title": "Global Tier-3 Data Centers",
        "desc": "Deploy your site closest to your target audience. Choose from global enterprise data center locations across the United States, United Kingdom, France, Netherlands, Lithuania, Singapore, India, and Brazil. Switch data center locations anytime with a single click.",
        "metric": "8 Global Regions"
      },
      {
        "title": "Multi-Layer Defensive Security",
        "desc": "Every website is shielded behind custom Web Application Firewalls (WAF), Cloudflare DDoS mitigation, automated SSL encryption, and Monarx real-time malware scanning that neutralizes malicious scripts before they execute.",
        "metric": "99.9% Uptime SLA"
      },
      {
        "title": "Next-Gen hPanel Control Center",
        "desc": "Forget clumsy, outdated cPanel interfaces. Hostinger custom-engineered hPanel to be clean, responsive, and intuitive. Manage DNS, create databases, install SSL certificates, set up staging sites, and access file managers in seconds.",
        "metric": "3x Faster Navigation"
      },
      {
        "title": "Automated Snapshot & Daily Backups",
        "desc": "Never worry about catastrophic data loss. Websites are backed up automatically with point-in-time restore capabilities. If an update breaks your website, roll back to an earlier version with a single click in your dashboard.",
        "metric": "Zero-Downtime Restores"
      },
      {
        "title": "Developer & Staging Toolkit",
        "desc": "Equipped with modern developer tooling including Git integration, WP-CLI, SSH access, PHP version switcher (from PHP 7.4 to PHP 8.3+), MySQL/phpMyAdmin access, and a one-click staging environment to test changes safely.",
        "metric": "Dev-Ready Stack"
      }
    ],
    "launchSteps": [
      {
        "step": "01",
        "title": "Click Safi Academy's Partner Link",
        "desc": "Access the exclusive portal using our verified referral URL to unlock special promotional pricing with up to 75% standard discount plus our 20% bonus."
      },
      {
        "step": "02",
        "title": "Select Your Preferred Plan",
        "desc": "Choose between Web Hosting (for blogs/portfolios), Cloud Hosting (for high-traffic businesses), or KVM VPS (for developers requiring root access)."
      },
      {
        "step": "03",
        "title": "Apply Code 89LSHAHEEKCO at Checkout",
        "desc": "Ensure the referral code 89LSHAHEEKCO is present in the coupon field to automatically lock in your additional 20% discount on your order."
      },
      {
        "step": "04",
        "title": "Claim Free Domain & Deploy in 60s",
        "desc": "Claim your free 1-year custom domain name (.com, .net, .org, etc.) and launch your site using the 1-click WordPress installer or the AI Website Builder."
      }
    ],
    "faqs": [
      {
        "q": "How do I claim the 20% discount using the referral code?",
        "a": "Simply click any of the 'Claim 20% Discount' or 'Get Started' buttons on this page. The referral code 89LSHAHEEKCO will be automatically appended to your checkout session. You can also copy the code directly using our 1-click coupon widget and paste it into the coupon code box during checkout at Hostinger.com to verify your 20% savings."
      },
      {
        "q": "Is the free domain name really included at no cost?",
        "a": "Yes! When you purchase any 12, 24, or 48-month Premium, Business, or Cloud hosting plan, Hostinger includes a free custom domain registration for your first full year. Popular extensions like .com, .net, .org, .online, and .tech are fully eligible."
      },
      {
        "q": "Can I migrate my existing website from another hosting provider for free?",
        "a": "Yes, 100% free. Hostinger provides an automated website migration service. Once you sign up, simply enter your current host's login details or WordPress URL in hPanel, and Hostinger's migration engineers and automated tools will transfer your entire site, databases, and emails with zero downtime."
      },
      {
        "q": "What is the difference between Web Hosting, Cloud Hosting, and VPS?",
        "a": "Web Hosting shares server hardware efficiently, making it the most affordable choice for personal sites and small businesses. Cloud Hosting isolates dedicated CPU and RAM resources within a virtual container, delivering 3x faster speeds and high redundancy for growing businesses. VPS (Virtual Private Server) provides full root administrative access, allowing developers to install custom operating systems, Docker containers, and complex backend APIs."
      },
      {
        "q": "Can I run modern programming languages like Node.js, Python, and Docker?",
        "a": "Yes. On KVM VPS plans, you have complete root access to run any stack including Node.js, Python, Ruby, Go, Docker, PostgreSQL, Redis, and custom microservices. On Web & Cloud plans, PHP 8.x, Git, WP-CLI, and MySQL are standard."
      },
      {
        "q": "What is the 30-day money-back guarantee policy?",
        "a": "Hostinger offers an unconditional 30-day money-back guarantee. If you are not completely satisfied with the speed, uptime, or control panel for any reason within the first 30 days of purchase, you can cancel and receive a full refund with no hassle."
      },
      {
        "q": "How does Hostinger's hPanel compare to traditional cPanel?",
        "a": "hPanel is Hostinger's custom-built control panel. Unlike legacy cPanel which can feel sluggish and complicated for beginners, hPanel is ultra-modern, intuitive, responsive on mobile devices, and significantly faster. It integrates domain management, DNS records, staging, file management, and AI assistance into one cohesive interface."
      },
      {
        "q": "Does Hostinger support SSL certificates and HTTPS encryption?",
        "a": "Yes. Every domain, subdomain, and parked domain hosted on Hostinger receives free, lifetime Let's Encrypt SSL certificates that install and renew automatically. You will never have to pay extra fees for website encryption."
      }
    ],
    "isRtl": false,
    "ctaGetStarted": "Commencer avec 20% de réduction",
    "ctaExploreCourses": "Explorer les cours de programmation",
    "bottomGuarantee": "Garantie de remboursement inconditionnelle de 30 jours",
    "bottomInstant": "Activation instantanée du compte cloud",
    "bottomChat": "Assistance par chat prioritaire 24h/24 et 7j/7",
    "bottomDisclaimer": "* Hostinger est un fournisseur d'hébergement cloud indépendant. Les remises promotionnelles, la disponibilité des domaines et les renouvellements sont gérés directement par Hostinger.",
    "metricSubTtfb": "Optimisé avec LiteSpeed Enterprise",
    "metricSubCdn": "Réseau mondial Cloudflare Enterprise CDN",
    "metricSubNvme": "Stockage NVMe d'entreprise (RAID-10)",
    "metricSubSec": "Sécurité temps réel Monarx & WAF"
  },
  "ar": {
    "disclosure": "تحتفظ أكاديمية صافي بشراكة رسمية تابعة مع Hostinger. عند الشراء عبر رابط الإحالة أو الرمز الترويجي 89LSHAHEEKCO، ستحصل على خصم إضافي بنسبة 20%، وتدعم بذلك تقديم دورات البرمجة والتقنية المجانية عالمياً.",
    "partnerDisclosureBadge": "إفصاح الشراكة التابعة الرسمي:",
    "heroBadge": "شريك أكاديمية صافي المعتمد • خصم 20% بالرمز: 89LSHAHEEKCO",
    "heroTitle": "استضافة سحابية فائقة السرعة NVMe واستضافة الويب الحديثة",
    "heroSubtitle": "قم بتشغيل مواقعك وتطبيقاتك الرقمية على بنية تحتية سحابية متطورة. مزودة بخوادم LiteSpeed Enterprise وأقراص NVMe فائقة السرعة وضمان تشغيل 99.9% وأدوات الذكاء الاصطناعي.",
    "pill1": "خادم LiteSpeed Enterprise وتقنية LSCache",
    "pill2": "نطاق مجاني لمدة عام وشهادات SSL مجانية مدى الحياة",
    "pill3": "نسخ احتياطي تلقائي يومي وأسبوعي",
    "pill4": "ضمان استرداد الأموال لمدة 30 يوماً",
    "partnerCodeLabel": "رمز الشريك الترويجي:",
    "copyCodeBtn": "نسخ الرمز",
    "copiedBtn": "تم النسخ! تم تطبيق خصم 20%",
    "claimDiscountBtn": "احصل على خصم 20% عبر رابط الشريك",
    "comparePlansBtn": "مقارنة الخطط",
    "telemetryTitle": "مؤشرات خوادم Hostinger السحابية",
    "telemetrySubtitle": "بنية تحتية Tier-3 بمحركات NVMe",
    "telemetryLive": "99.99% مباشر ومتصل",
    "metricTtfb": "سرعة استجابة الخادم (TTFB)",
    "metricUptime": "ضمان استقرار الخادم (Uptime)",
    "metricCdn": "شبكة توزيع المحتوى العالمية CDN",
    "metricAi": "تصحيح الأخطاء بالذكاء الاصطناعي التلقائي",
    "servicesBadge": "النظام السحابي",
    "servicesTitle": "بنية تحتية سحابية متكاملة لاستضافة الويب",
    "servicesSubtitle": "اكتشف البنية التحتية السحابية المتقدمة المصممة للمبدعين والمطورين والوكالات والمشاريع الكبرى.",
    "plansBadge": "أسعار الشريك الحصرية",
    "plansTitle": "خطط الاستضافة عالية الأداء",
    "plansSubtitle": "اختر بنية الاستضافة المثالية لموقعك الشخصي أو متجرك الإلكتروني أو تطبيقاتك.",
    "planFilterAll": "جميع الخطط",
    "planFilterWeb": "استضافة الويب",
    "planFilterCloud": "الاستضافة السحابية",
    "planFilterVps": "خوادم VPS السحابية",
    "archBadge": "المعايير التقنية",
    "archTitle": "المعايير الهندسية والتقنية السحابية",
    "archSubtitle": "تعرف على الأسباب التقنية التي تجعل Hostinger يتفوق على شركات الاستضافة التقليدية القديمة.",
    "stepsBadge": "دليل التفعيل السريع",
    "stepsTitle": "كيفية تفعيل خصم 20% الإضافي",
    "stepsSubtitle": "اتبع هذه الخطوات الأربع البسيطة لتثبيت الخصم وإطلاق موقعك في أقل من دقيقتين.",
    "faqsBadge": "الأسئلة الشائعة",
    "faqsTitle": "الأسئلة والأجوبة الأكثر تكراراً",
    "services": [
      {
        "id": "web-hosting",
        "name": "High-Speed Web Hosting",
        "badge": "Most Popular",
        "category": "web",
        "shortDesc": "Optimized LiteSpeed infrastructure built for lightning-fast WordPress and dynamic websites.",
        "longDesc": "Hostinger's flagship web hosting is engineered on top of LiteSpeed Enterprise web servers, replacing slow legacy Apache engines. It incorporates the proprietary LSCache optimization plugin, server-level object caching, and HTTP/3 protocol support to deliver sub-200ms page load times. Perfect for personal blogs, business portfolios, and content websites seeking rock-solid 99.9% uptime with minimal setup overhead.",
        "specs": [
          "LiteSpeed Web Server with LSCache",
          "Free 1-Click WordPress Auto-Installer",
          "Free 1-Year Domain Registration Included",
          "Unlimited Free SSL Certificates",
          "Automated Weekly & Daily Backups",
          "Integrated Git Version Control Deployment"
        ]
      },
      {
        "id": "cloud-hosting",
        "name": "Enterprise Cloud Hosting",
        "badge": "High Performance",
        "category": "cloud",
        "shortDesc": "Isolated virtual containers with dedicated CPU, RAM, and automated instant resource scaling.",
        "longDesc": "Experience the power and stability of a dedicated server combined with the sheer simplicity of shared hosting. Each cloud account runs in an isolated virtual instance with dedicated RAM and vCPU cores. When your site experiences viral spikes, automated resource scaling absorbs the surge seamlessly without slowdowns or dropped connections. Includes a dedicated IP address and custom Cloudflare Enterprise routing.",
        "specs": [
          "Dedicated Virtual Resources (Up to 16GB RAM & 8 Cores)",
          "Dedicated IPv4 & IPv6 Address Included",
          "3x to 4x Faster Speed than Standard Hosting",
          "Built-in Cloudflare Enterprise CDN Protection",
          "Automated Daily Backups with 1-Click Restore",
          "Priority 24/7 VIP Technical Support"
        ]
      },
      {
        "id": "vps-hosting",
        "name": "KVM Cloud VPS Hosting",
        "badge": "Developers & DevOps",
        "category": "vps",
        "shortDesc": "Full root access, dedicated kernel virtualization, high-IOPS NVMe drives, and AI terminal assistance.",
        "longDesc": "Engineered for software engineers, backend developers, and tech leads who demand complete root-level control over their operating environment. Built upon Kernel-based Virtual Machine (KVM) technology, Hostinger VPS guarantees 100% dedicated hardware resource allocation. Deploy Docker containers, configure custom Node.js, Python, Ruby, or Go environments, and leverage the built-in AI Terminal Assistant to formulate Linux commands in seconds.",
        "specs": [
          "Full Root Access & Dedicated Kernel (KVM)",
          "Enterprise-Class NVMe Storage with Ultra-High IOPS",
          "OS Options: Ubuntu, Debian, AlmaLinux, Rocky Linux",
          "Docker, Node.js, Python & Microservices Ready",
          "Automated Weekly Snapshots & Firewall Rules",
          "Built-in AI Assistant for Terminal Configurations"
        ]
      },
      {
        "id": "agency-hosting",
        "name": "Agency Hosting & Hostinger Pro",
        "badge": "Agencies & Freelancers",
        "category": "web",
        "shortDesc": "Manage hundreds of client sites with unified credentials, team collaboration, and client sharing.",
        "longDesc": "Designed specifically for web design agencies, freelancers, and dev shops managing multiple client projects. The Hostinger Pro dashboard allows you to organize clients into workspaces, grant custom role-based permissions, and delegate access without sharing your master passwords. You can also deliver automated maintenance health checks, uptime reports, and white-labeled client experiences.",
        "specs": [
          "Centralized Multi-Client Management Portal",
          "Granular Role-Based Access Control (RBAC)",
          "Access Delegation Without Password Sharing",
          "Automated Client Website Maintenance Reports",
          "Integrated Referral & Commission Payouts",
          "Mass Plugin & Core WordPress Updates in 1-Click"
        ]
      },
      {
        "id": "ai-website-builder",
        "name": "AI Website Builder",
        "badge": "No-Code & Fast",
        "category": "web",
        "shortDesc": "Create stunning, fully responsive websites and e-commerce stores in under 60 seconds using AI.",
        "longDesc": "Transform a short text description into a fully functional, mobile-responsive, production-ready website in under a minute. The Hostinger AI Builder generates tailored layouts, copy, royalty-free images, and interactive contact forms. It includes a built-in AI Heatmap tool to predict visitor gaze patterns, an AI Logo Generator, and a robust e-commerce engine with 0% platform transaction fees.",
        "specs": [
          "Prompt-to-Website Generation in 60 Seconds",
          "Intuitive Drag-and-Drop Visual Canvas",
          "Integrated AI Copywriter & SEO Generator",
          "AI Heatmap for Conversion Rate Optimization",
          "Complete E-Commerce Suite (0% Transaction Fees)",
          "Mobile-First Responsive Layouts by Default"
        ]
      },
      {
        "id": "hostinger-horizons",
        "name": "Hostinger Horizons",
        "badge": "Next-Gen Cloud",
        "category": "cloud",
        "shortDesc": "Next-generation cloud ecosystem and edge deployment network built for the future of the web.",
        "longDesc": "Hostinger Horizons represents the cutting-edge evolution of global web infrastructure. By uniting edge computing, intelligent serverless routing, and globally distributed data caches, Horizons ensures websites load instantaneously regardless of visitor geography. It provides elastic infrastructure that adapts dynamically to emerging web standards, high-throughput media, and AI-driven web applications.",
        "specs": [
          "Next-Generation Edge-Native Architecture",
          "Ultra-Low Global Latency with Anycast Routing",
          "Automatic Elastic Resource Reallocation",
          "Future-Proof Compatibility with Modern Web Frameworks",
          "Tier-3 Globally Certified Data Center Backbone",
          "Continuous Performance & Reliability Tuning"
        ]
      },
      {
        "id": "business-email",
        "name": "Professional Business Email",
        "badge": "Brand Identity",
        "category": "web",
        "shortDesc": "Custom branded email addresses with robust anti-spam, calendar sync, and webmail portals.",
        "longDesc": "Establish immediate corporate credibility by sending messages from your own domain (e.g., name@yourcompany.com). Powered by Titan Email, this suite provides generous inbox storage (10GB to 50GB), advanced multi-layered anti-spam and anti-virus filtering, calendar management, and seamless synchronization across iOS, Android, macOS, and Windows devices.",
        "specs": [
          "Professional Branded Inboxes (@yourdomain.com)",
          "Up to 50GB Dedicated Storage per Mailbox",
          "Multi-Layer Anti-Spam & Zero-Day Threat Shield",
          "Integrated Business Calendar & Contact Manager",
          "Native Mobile Apps for iOS & Android",
          "Automated Email Forwarding & Signature Builder"
        ]
      },
      {
        "id": "reach-email",
        "name": "Reach Email Marketing",
        "badge": "Growth & Lead Gen",
        "category": "web",
        "shortDesc": "Built-in newsletter campaigns, automated drip sequences, and lead capture directly in hPanel.",
        "longDesc": "Nurture leads and convert visitors into repeat customers without paying for costly third-party email platforms. Reach Email Marketing is embedded directly within your hosting dashboard, allowing you to design beautiful newsletters with a drag-and-drop builder, segment subscribers by activity, launch automated welcome sequences, and monitor open and click-through metrics in real time.",
        "specs": [
          "Integrated Directly into Your Hosting Dashboard",
          "Drag-and-Drop Newsletter & Campaign Designer",
          "Automated Drip Sequences & Autoresponders",
          "Real-Time Delivery, Open, and Click Telemetry",
          "High Inbox Deliverability with Pre-Warmed IPs",
          "Seamless Form Integration with WordPress & HTML"
        ]
      },
      {
        "id": "managed-openclaw",
        "name": "Managed OpenClaw Microservices",
        "badge": "High Concurrency",
        "category": "cloud",
        "shortDesc": "Optimized containerized runtime environments for high-throughput background jobs and APIs.",
        "longDesc": "Managed OpenClaw is engineered for heavy computational workloads, background batch jobs, asynchronous task queues, and microservice APIs. It isolates computing processes to ensure zero resource contamination across your applications, giving backend developers an ultra-lean runtime environment optimized for low latency and high concurrent connections.",
        "specs": [
          "Isolated Containerized Microservice Architecture",
          "Optimized for High-Concurrency API Gateways",
          "Low-Overhead Compute Resource Allocation",
          "Continuous Process Health Monitoring & Self-Healing",
          "Integrated Micro-Telemetry & Error Logging",
          "Zero Server Maintenance & Automated Security Patching"
        ]
      },
      {
        "id": "ai-agents",
        "name": "Autonomous AI Hosting Agents",
        "badge": "Next-Gen AI",
        "category": "cloud",
        "shortDesc": "Intelligent in-dashboard agents that debug errors, optimize queries, and automate server management.",
        "longDesc": "Hostinger has integrated autonomous AI agents directly into hPanel. Need to identify why a WordPress plugin caused a critical error? The AI Agent analyzes error logs and suggests the exact fix. Need to optimize slow database queries, configure custom redirects, or generate .htaccess rewrite rules? Simply instruct the AI in natural language to execute the configuration safely.",
        "specs": [
          "Automated WordPress Plugin Conflict Diagnostics",
          "Natural Language .htaccess & Nginx Rule Generation",
          "Slow MySQL Query Detection & Indexing Advice",
          "Automated On-Page SEO Recommendations",
          "Terminal Command Generation for VPS Users",
          "24/7 Instant In-Dashboard Assistance"
        ]
      }
    ],
    "plans": [
      {
        "name": "استضافة الويب بريميوم",
        "tagline": "الخيار الأمثل للمواقع الشخصية والمدونات ومشاريع الطلاب",
        "price": "$2.99",
        "period": "/month",
        "savings": "خصم 75% + 20% كود الشريك",
        "popular": false,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "100 GB SSD"
          },
          {
            "label": "Performance",
            "val": "Standard LiteSpeed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Weekly Automated"
          },
          {
            "label": "Email",
            "val": "Free Business Email"
          },
          {
            "label": "AI Tools",
            "val": "Basic AI Website Builder"
          }
        ],
        "ctaText": "اختر خطة بريميوم"
      },
      {
        "name": "استضافة الويب للأعمال",
        "tagline": "الخيار الموصى به للشركات والمتاجر الإلكترونية المتنامية",
        "price": "$3.99",
        "period": "/month",
        "savings": "خصم 73% + 20% كود الشريك",
        "popular": true,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB Ultra NVMe (5x Faster)"
          },
          {
            "label": "Performance",
            "val": "Up to 5x Increased Speed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Daily & On-Demand Backups"
          },
          {
            "label": "CDN",
            "val": "Free Built-in CDN Included"
          },
          {
            "label": "Staging",
            "val": "1-Click WordPress Staging Tool"
          },
          {
            "label": "AI Tools",
            "val": "Full AI Website Builder Suite"
          }
        ],
        "ctaText": "اختر خطة الأعمال"
      },
      {
        "name": "الاستضافة السحابية للمشاريع",
        "tagline": "موارد مخصصة للمواقع ذات الزيارات العالية والتطبيقات المتقدمة",
        "price": "$9.99",
        "period": "/month",
        "savings": "خصم 60% + 20% كود الشريك",
        "popular": false,
        "category": "cloud",
        "specs": [
          {
            "label": "Websites",
            "val": "300 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB NVMe Storage"
          },
          {
            "label": "RAM / CPU",
            "val": "3 GB RAM + 2 CPU Cores (Dedicated)"
          },
          {
            "label": "Performance",
            "val": "Up to 10x Boosted Speed"
          },
          {
            "label": "IP Address",
            "val": "Dedicated IP Address Included"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain"
          },
          {
            "label": "Backups",
            "val": "Automated Daily Backups"
          },
          {
            "label": "CDN",
            "val": "Cloudflare Enterprise CDN"
          },
          {
            "label": "Support",
            "val": "Priority 24/7 VIP Support Queue"
          }
        ],
        "ctaText": "اختر الخطة السحابية"
      },
      {
        "name": "خادم سحابي افتراضي KVM 2",
        "tagline": "صلاحيات رووت كاملة مخصصة للمطورين ومهندسي البرمجيات",
        "price": "$7.99",
        "period": "/month",
        "savings": "خصم 55% + 20% كود الشريك",
        "popular": false,
        "category": "vps",
        "specs": [
          {
            "label": "CPU",
            "val": "2 Dedicated vCPU Cores"
          },
          {
            "label": "RAM",
            "val": "8 GB Dedicated RAM"
          },
          {
            "label": "Storage",
            "val": "100 GB High-IOPS NVMe"
          },
          {
            "label": "Bandwidth",
            "val": "8 TB High-Speed Traffic"
          },
          {
            "label": "Access",
            "val": "Full Root Administrative Access"
          },
          {
            "label": "Virtualization",
            "val": "100% Kernel-based (KVM)"
          },
          {
            "label": "Backups",
            "val": "Automated Weekly Snapshots"
          },
          {
            "label": "AI Terminal",
            "val": "AI Assistant for Linux Commands"
          },
          {
            "label": "OS Support",
            "val": "Ubuntu, Debian, AlmaLinux, Rocky"
          }
        ],
        "ctaText": "اختر خادم KVM"
      }
    ],
    "architectureHighlights": [
      {
        "title": "LiteSpeed Enterprise vs. Apache",
        "desc": "Unlike budget hosts that still use 20-year-old Apache software, Hostinger utilizes LiteSpeed Enterprise web servers. LiteSpeed processes static and dynamic requests simultaneously through event-driven architecture, reducing RAM usage and serving WordPress pages up to 500% faster.",
        "metric": "5x Faster TTFB"
      },
      {
        "title": "Global Tier-3 Data Centers",
        "desc": "Deploy your site closest to your target audience. Choose from global enterprise data center locations across the United States, United Kingdom, France, Netherlands, Lithuania, Singapore, India, and Brazil. Switch data center locations anytime with a single click.",
        "metric": "8 Global Regions"
      },
      {
        "title": "Multi-Layer Defensive Security",
        "desc": "Every website is shielded behind custom Web Application Firewalls (WAF), Cloudflare DDoS mitigation, automated SSL encryption, and Monarx real-time malware scanning that neutralizes malicious scripts before they execute.",
        "metric": "99.9% Uptime SLA"
      },
      {
        "title": "Next-Gen hPanel Control Center",
        "desc": "Forget clumsy, outdated cPanel interfaces. Hostinger custom-engineered hPanel to be clean, responsive, and intuitive. Manage DNS, create databases, install SSL certificates, set up staging sites, and access file managers in seconds.",
        "metric": "3x Faster Navigation"
      },
      {
        "title": "Automated Snapshot & Daily Backups",
        "desc": "Never worry about catastrophic data loss. Websites are backed up automatically with point-in-time restore capabilities. If an update breaks your website, roll back to an earlier version with a single click in your dashboard.",
        "metric": "Zero-Downtime Restores"
      },
      {
        "title": "Developer & Staging Toolkit",
        "desc": "Equipped with modern developer tooling including Git integration, WP-CLI, SSH access, PHP version switcher (from PHP 7.4 to PHP 8.3+), MySQL/phpMyAdmin access, and a one-click staging environment to test changes safely.",
        "metric": "Dev-Ready Stack"
      }
    ],
    "launchSteps": [
      {
        "step": "01",
        "title": "Click Safi Academy's Partner Link",
        "desc": "Access the exclusive portal using our verified referral URL to unlock special promotional pricing with up to 75% standard discount plus our 20% bonus."
      },
      {
        "step": "02",
        "title": "Select Your Preferred Plan",
        "desc": "Choose between Web Hosting (for blogs/portfolios), Cloud Hosting (for high-traffic businesses), or KVM VPS (for developers requiring root access)."
      },
      {
        "step": "03",
        "title": "Apply Code 89LSHAHEEKCO at Checkout",
        "desc": "Ensure the referral code 89LSHAHEEKCO is present in the coupon field to automatically lock in your additional 20% discount on your order."
      },
      {
        "step": "04",
        "title": "Claim Free Domain & Deploy in 60s",
        "desc": "Claim your free 1-year custom domain name (.com, .net, .org, etc.) and launch your site using the 1-click WordPress installer or the AI Website Builder."
      }
    ],
    "faqs": [
      {
        "q": "How do I claim the 20% discount using the referral code?",
        "a": "Simply click any of the 'Claim 20% Discount' or 'Get Started' buttons on this page. The referral code 89LSHAHEEKCO will be automatically appended to your checkout session. You can also copy the code directly using our 1-click coupon widget and paste it into the coupon code box during checkout at Hostinger.com to verify your 20% savings."
      },
      {
        "q": "Is the free domain name really included at no cost?",
        "a": "Yes! When you purchase any 12, 24, or 48-month Premium, Business, or Cloud hosting plan, Hostinger includes a free custom domain registration for your first full year. Popular extensions like .com, .net, .org, .online, and .tech are fully eligible."
      },
      {
        "q": "Can I migrate my existing website from another hosting provider for free?",
        "a": "Yes, 100% free. Hostinger provides an automated website migration service. Once you sign up, simply enter your current host's login details or WordPress URL in hPanel, and Hostinger's migration engineers and automated tools will transfer your entire site, databases, and emails with zero downtime."
      },
      {
        "q": "What is the difference between Web Hosting, Cloud Hosting, and VPS?",
        "a": "Web Hosting shares server hardware efficiently, making it the most affordable choice for personal sites and small businesses. Cloud Hosting isolates dedicated CPU and RAM resources within a virtual container, delivering 3x faster speeds and high redundancy for growing businesses. VPS (Virtual Private Server) provides full root administrative access, allowing developers to install custom operating systems, Docker containers, and complex backend APIs."
      },
      {
        "q": "Can I run modern programming languages like Node.js, Python, and Docker?",
        "a": "Yes. On KVM VPS plans, you have complete root access to run any stack including Node.js, Python, Ruby, Go, Docker, PostgreSQL, Redis, and custom microservices. On Web & Cloud plans, PHP 8.x, Git, WP-CLI, and MySQL are standard."
      },
      {
        "q": "What is the 30-day money-back guarantee policy?",
        "a": "Hostinger offers an unconditional 30-day money-back guarantee. If you are not completely satisfied with the speed, uptime, or control panel for any reason within the first 30 days of purchase, you can cancel and receive a full refund with no hassle."
      },
      {
        "q": "How does Hostinger's hPanel compare to traditional cPanel?",
        "a": "hPanel is Hostinger's custom-built control panel. Unlike legacy cPanel which can feel sluggish and complicated for beginners, hPanel is ultra-modern, intuitive, responsive on mobile devices, and significantly faster. It integrates domain management, DNS records, staging, file management, and AI assistance into one cohesive interface."
      },
      {
        "q": "Does Hostinger support SSL certificates and HTTPS encryption?",
        "a": "Yes. Every domain, subdomain, and parked domain hosted on Hostinger receives free, lifetime Let's Encrypt SSL certificates that install and renew automatically. You will never have to pay extra fees for website encryption."
      }
    ],
    "isRtl": true,
    "ctaGetStarted": "ابدأ الآن مع خصم 20% إضافي",
    "ctaExploreCourses": "استكشف دورات البرمجة والتقنية",
    "bottomGuarantee": "ضمان استرداد الأموال غير المشروط لمدة 30 يومًا",
    "bottomInstant": "تفعيل فوري للحساب السحابي خلال ثوانٍ",
    "bottomChat": "دعم فني مباشر على مدار الساعة بأولوية VIP",
    "bottomDisclaimer": "* تعد Hostinger مزود استضافة سحابية مستقل. العروض الترويجية وتوافر النطاقات وشروط التجديد تُدار مباشرة بواسطة Hostinger.",
    "metricSubTtfb": "محسّن بمحرك LiteSpeed Enterprise",
    "metricSubCdn": "شبكة تسليم المحتوى Cloudflare Enterprise",
    "metricSubNvme": "تخزين فائق السرعة Enterprise NVMe",
    "metricSubSec": "حماية أمنية مباشرة عبر Monarx و WAF"
  },
  "ur": {
    "disclosure": "صافی اکیڈمی ہوسٹنگر کے ساتھ باضابطہ پارٹنرشپ رکھتی ہے۔ جب آپ ہمارے مصدقہ لنک یا کوپن کوڈ 89LSHAHEEKCO سے ہوسٹنگ خریدتے ہیں تو آپ کو اضافی 20% ڈسکاؤنٹ ملتا ہے اور بغیر کسی اضافی لاگت کے صافی اکیڈمی کی مفت تعلیم کی مہم کو مدد ملتی ہے۔",
    "partnerDisclosureBadge": "باضابطہ پارٹنر ڈسکلوزر:",
    "heroBadge": "صافی اکیڈمی مصدقہ پارٹنر • 20% رعایت کوڈ: 89LSHAHEEKCO",
    "heroTitle": "الٹرا فاسٹ NVMe کلاؤڈ اور اگلی نسل کی ویب ہوسٹنگ",
    "heroSubtitle": "اپنی ویب سائٹس اور ڈیجیٹل ایپس کو عالمی معیار کی زیریں ساخت پر چلائیں۔ LiteSpeed Enterprise سرورز، تیز رفتار NVMe SSDs، 99.9% اپ ٹائم، عالمی CDN اور خودکار AI ایجنٹس کے ساتھ۔",
    "pill1": "LiteSpeed Enterprise اور LSCache شامل ہے",
    "pill2": "1 سالہ مفت ڈومین اور لائف ٹائم مفت SSL",
    "pill3": "خودکار روزانہ اور ہفتہ وار بیک اپ",
    "pill4": "30 دن کی رقم واپسی کی گارنٹی",
    "partnerCodeLabel": "پارٹنر کوڈ:",
    "copyCodeBtn": "کوڈ کاپی کریں",
    "copiedBtn": "کاپی ہو گیا! 20% لاگو",
    "claimDiscountBtn": "پارٹنر لنک سے 20% رعایت حاصل کریں",
    "comparePlansBtn": "منصوبوں کا موازنہ کریں",
    "telemetryTitle": "ہوسٹنگر کلاؤڈ لائیو اسٹیٹس",
    "telemetrySubtitle": "NVMe Tier-3 انفراسٹرکچر",
    "telemetryLive": "99.99% لائیو اور آن لائن",
    "metricTtfb": "سرور کا ردعمل (TTFB)",
    "metricUptime": "اپ ٹائم کی گارنٹی",
    "metricCdn": "گلوبل کلاؤڈ فلیئر CDN",
    "metricAi": "خودکار AI ڈیبگنگ",
    "servicesBadge": "کلاؤڈ ایکو سسٹم",
    "servicesTitle": "جامع کلاؤڈ اور ویب ہوسٹنگ انفراسٹرکچر",
    "servicesSubtitle": "ڈویلپرز، ایجنسیوں اور کمپنیوں کے لیے تیار کردہ جدید کلاؤڈ حل دریافت کریں۔",
    "plansBadge": "خصوصی پارٹنر قیمتیں",
    "plansTitle": "اعلیٰ کارکردگی کے ہوسٹنگ پیکجز",
    "plansSubtitle": "اپنی ویب سائٹ یا ایپ کے لیے بہترین ہوسٹنگ پلان کا انتخاب کریں۔",
    "planFilterAll": "تمام پیکجز",
    "planFilterWeb": "ویب ہوسٹنگ",
    "planFilterCloud": "کلاؤڈ ہوسٹنگ",
    "planFilterVps": "کلاؤڈ VPS",
    "archBadge": "تکنیکی معیارات",
    "archTitle": "انٹرپرائز انجینئرنگ اور کلاؤڈ بینچ مارکس",
    "archSubtitle": "جانیں کہ ہوسٹنگر پرانی کمپنیوں کے مقابلے میں کیوں تیز اور محفوظ ہے۔",
    "stepsBadge": "آسان گائیڈ",
    "stepsTitle": "20% بونس رعایت کیسے فعال کریں",
    "stepsSubtitle": "اپنا ڈسکاؤنٹ حاصل کرنے اور 2 منٹ میں ویب سائٹ شروع کرنے کے لیے یہ 4 مراحل مکمل کریں۔",
    "faqsBadge": "اکثر پوچھے گئے سوالات",
    "faqsTitle": "عمومی سوالات اور ان کے جوابات",
    "services": [
      {
        "id": "web-hosting",
        "name": "High-Speed Web Hosting",
        "badge": "Most Popular",
        "category": "web",
        "shortDesc": "Optimized LiteSpeed infrastructure built for lightning-fast WordPress and dynamic websites.",
        "longDesc": "Hostinger's flagship web hosting is engineered on top of LiteSpeed Enterprise web servers, replacing slow legacy Apache engines. It incorporates the proprietary LSCache optimization plugin, server-level object caching, and HTTP/3 protocol support to deliver sub-200ms page load times. Perfect for personal blogs, business portfolios, and content websites seeking rock-solid 99.9% uptime with minimal setup overhead.",
        "specs": [
          "LiteSpeed Web Server with LSCache",
          "Free 1-Click WordPress Auto-Installer",
          "Free 1-Year Domain Registration Included",
          "Unlimited Free SSL Certificates",
          "Automated Weekly & Daily Backups",
          "Integrated Git Version Control Deployment"
        ]
      },
      {
        "id": "cloud-hosting",
        "name": "Enterprise Cloud Hosting",
        "badge": "High Performance",
        "category": "cloud",
        "shortDesc": "Isolated virtual containers with dedicated CPU, RAM, and automated instant resource scaling.",
        "longDesc": "Experience the power and stability of a dedicated server combined with the sheer simplicity of shared hosting. Each cloud account runs in an isolated virtual instance with dedicated RAM and vCPU cores. When your site experiences viral spikes, automated resource scaling absorbs the surge seamlessly without slowdowns or dropped connections. Includes a dedicated IP address and custom Cloudflare Enterprise routing.",
        "specs": [
          "Dedicated Virtual Resources (Up to 16GB RAM & 8 Cores)",
          "Dedicated IPv4 & IPv6 Address Included",
          "3x to 4x Faster Speed than Standard Hosting",
          "Built-in Cloudflare Enterprise CDN Protection",
          "Automated Daily Backups with 1-Click Restore",
          "Priority 24/7 VIP Technical Support"
        ]
      },
      {
        "id": "vps-hosting",
        "name": "KVM Cloud VPS Hosting",
        "badge": "Developers & DevOps",
        "category": "vps",
        "shortDesc": "Full root access, dedicated kernel virtualization, high-IOPS NVMe drives, and AI terminal assistance.",
        "longDesc": "Engineered for software engineers, backend developers, and tech leads who demand complete root-level control over their operating environment. Built upon Kernel-based Virtual Machine (KVM) technology, Hostinger VPS guarantees 100% dedicated hardware resource allocation. Deploy Docker containers, configure custom Node.js, Python, Ruby, or Go environments, and leverage the built-in AI Terminal Assistant to formulate Linux commands in seconds.",
        "specs": [
          "Full Root Access & Dedicated Kernel (KVM)",
          "Enterprise-Class NVMe Storage with Ultra-High IOPS",
          "OS Options: Ubuntu, Debian, AlmaLinux, Rocky Linux",
          "Docker, Node.js, Python & Microservices Ready",
          "Automated Weekly Snapshots & Firewall Rules",
          "Built-in AI Assistant for Terminal Configurations"
        ]
      },
      {
        "id": "agency-hosting",
        "name": "Agency Hosting & Hostinger Pro",
        "badge": "Agencies & Freelancers",
        "category": "web",
        "shortDesc": "Manage hundreds of client sites with unified credentials, team collaboration, and client sharing.",
        "longDesc": "Designed specifically for web design agencies, freelancers, and dev shops managing multiple client projects. The Hostinger Pro dashboard allows you to organize clients into workspaces, grant custom role-based permissions, and delegate access without sharing your master passwords. You can also deliver automated maintenance health checks, uptime reports, and white-labeled client experiences.",
        "specs": [
          "Centralized Multi-Client Management Portal",
          "Granular Role-Based Access Control (RBAC)",
          "Access Delegation Without Password Sharing",
          "Automated Client Website Maintenance Reports",
          "Integrated Referral & Commission Payouts",
          "Mass Plugin & Core WordPress Updates in 1-Click"
        ]
      },
      {
        "id": "ai-website-builder",
        "name": "AI Website Builder",
        "badge": "No-Code & Fast",
        "category": "web",
        "shortDesc": "Create stunning, fully responsive websites and e-commerce stores in under 60 seconds using AI.",
        "longDesc": "Transform a short text description into a fully functional, mobile-responsive, production-ready website in under a minute. The Hostinger AI Builder generates tailored layouts, copy, royalty-free images, and interactive contact forms. It includes a built-in AI Heatmap tool to predict visitor gaze patterns, an AI Logo Generator, and a robust e-commerce engine with 0% platform transaction fees.",
        "specs": [
          "Prompt-to-Website Generation in 60 Seconds",
          "Intuitive Drag-and-Drop Visual Canvas",
          "Integrated AI Copywriter & SEO Generator",
          "AI Heatmap for Conversion Rate Optimization",
          "Complete E-Commerce Suite (0% Transaction Fees)",
          "Mobile-First Responsive Layouts by Default"
        ]
      },
      {
        "id": "hostinger-horizons",
        "name": "Hostinger Horizons",
        "badge": "Next-Gen Cloud",
        "category": "cloud",
        "shortDesc": "Next-generation cloud ecosystem and edge deployment network built for the future of the web.",
        "longDesc": "Hostinger Horizons represents the cutting-edge evolution of global web infrastructure. By uniting edge computing, intelligent serverless routing, and globally distributed data caches, Horizons ensures websites load instantaneously regardless of visitor geography. It provides elastic infrastructure that adapts dynamically to emerging web standards, high-throughput media, and AI-driven web applications.",
        "specs": [
          "Next-Generation Edge-Native Architecture",
          "Ultra-Low Global Latency with Anycast Routing",
          "Automatic Elastic Resource Reallocation",
          "Future-Proof Compatibility with Modern Web Frameworks",
          "Tier-3 Globally Certified Data Center Backbone",
          "Continuous Performance & Reliability Tuning"
        ]
      },
      {
        "id": "business-email",
        "name": "Professional Business Email",
        "badge": "Brand Identity",
        "category": "web",
        "shortDesc": "Custom branded email addresses with robust anti-spam, calendar sync, and webmail portals.",
        "longDesc": "Establish immediate corporate credibility by sending messages from your own domain (e.g., name@yourcompany.com). Powered by Titan Email, this suite provides generous inbox storage (10GB to 50GB), advanced multi-layered anti-spam and anti-virus filtering, calendar management, and seamless synchronization across iOS, Android, macOS, and Windows devices.",
        "specs": [
          "Professional Branded Inboxes (@yourdomain.com)",
          "Up to 50GB Dedicated Storage per Mailbox",
          "Multi-Layer Anti-Spam & Zero-Day Threat Shield",
          "Integrated Business Calendar & Contact Manager",
          "Native Mobile Apps for iOS & Android",
          "Automated Email Forwarding & Signature Builder"
        ]
      },
      {
        "id": "reach-email",
        "name": "Reach Email Marketing",
        "badge": "Growth & Lead Gen",
        "category": "web",
        "shortDesc": "Built-in newsletter campaigns, automated drip sequences, and lead capture directly in hPanel.",
        "longDesc": "Nurture leads and convert visitors into repeat customers without paying for costly third-party email platforms. Reach Email Marketing is embedded directly within your hosting dashboard, allowing you to design beautiful newsletters with a drag-and-drop builder, segment subscribers by activity, launch automated welcome sequences, and monitor open and click-through metrics in real time.",
        "specs": [
          "Integrated Directly into Your Hosting Dashboard",
          "Drag-and-Drop Newsletter & Campaign Designer",
          "Automated Drip Sequences & Autoresponders",
          "Real-Time Delivery, Open, and Click Telemetry",
          "High Inbox Deliverability with Pre-Warmed IPs",
          "Seamless Form Integration with WordPress & HTML"
        ]
      },
      {
        "id": "managed-openclaw",
        "name": "Managed OpenClaw Microservices",
        "badge": "High Concurrency",
        "category": "cloud",
        "shortDesc": "Optimized containerized runtime environments for high-throughput background jobs and APIs.",
        "longDesc": "Managed OpenClaw is engineered for heavy computational workloads, background batch jobs, asynchronous task queues, and microservice APIs. It isolates computing processes to ensure zero resource contamination across your applications, giving backend developers an ultra-lean runtime environment optimized for low latency and high concurrent connections.",
        "specs": [
          "Isolated Containerized Microservice Architecture",
          "Optimized for High-Concurrency API Gateways",
          "Low-Overhead Compute Resource Allocation",
          "Continuous Process Health Monitoring & Self-Healing",
          "Integrated Micro-Telemetry & Error Logging",
          "Zero Server Maintenance & Automated Security Patching"
        ]
      },
      {
        "id": "ai-agents",
        "name": "Autonomous AI Hosting Agents",
        "badge": "Next-Gen AI",
        "category": "cloud",
        "shortDesc": "Intelligent in-dashboard agents that debug errors, optimize queries, and automate server management.",
        "longDesc": "Hostinger has integrated autonomous AI agents directly into hPanel. Need to identify why a WordPress plugin caused a critical error? The AI Agent analyzes error logs and suggests the exact fix. Need to optimize slow database queries, configure custom redirects, or generate .htaccess rewrite rules? Simply instruct the AI in natural language to execute the configuration safely.",
        "specs": [
          "Automated WordPress Plugin Conflict Diagnostics",
          "Natural Language .htaccess & Nginx Rule Generation",
          "Slow MySQL Query Detection & Indexing Advice",
          "Automated On-Page SEO Recommendations",
          "Terminal Command Generation for VPS Users",
          "24/7 Instant In-Dashboard Assistance"
        ]
      }
    ],
    "plans": [
      {
        "name": "پریمیم ویب ہوسٹنگ",
        "tagline": "ذاتی ویب سائٹس، بلاگز اور طلباء کے پروجیکٹس کے لیے بہترین",
        "price": "$2.99",
        "period": "/month",
        "savings": "75٪ چھوٹ + 20٪ پارٹنر رعایت",
        "popular": false,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "100 GB SSD"
          },
          {
            "label": "Performance",
            "val": "Standard LiteSpeed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Weekly Automated"
          },
          {
            "label": "Email",
            "val": "Free Business Email"
          },
          {
            "label": "AI Tools",
            "val": "Basic AI Website Builder"
          }
        ],
        "ctaText": "پریمیم پلان منتخب کریں"
      },
      {
        "name": "بزنس ویب ہوسٹنگ",
        "tagline": "کاروبار، اسٹارٹ اپس اور ای کامرس اسٹورز کے لیے تجویز کردہ",
        "price": "$3.99",
        "period": "/month",
        "savings": "73٪ چھوٹ + 20٪ پارٹنر رعایت",
        "popular": true,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB Ultra NVMe (5x Faster)"
          },
          {
            "label": "Performance",
            "val": "Up to 5x Increased Speed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Daily & On-Demand Backups"
          },
          {
            "label": "CDN",
            "val": "Free Built-in CDN Included"
          },
          {
            "label": "Staging",
            "val": "1-Click WordPress Staging Tool"
          },
          {
            "label": "AI Tools",
            "val": "Full AI Website Builder Suite"
          }
        ],
        "ctaText": "بزنس پلان منتخب کریں"
      },
      {
        "name": "کلاؤڈ اسٹارٹ اپ",
        "tagline": "زیادہ ٹریفک اور جدید ایپس کے لیے مختص سرور وسائل",
        "price": "$9.99",
        "period": "/month",
        "savings": "60٪ چھوٹ + 20٪ پارٹنر رعایت",
        "popular": false,
        "category": "cloud",
        "specs": [
          {
            "label": "Websites",
            "val": "300 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB NVMe Storage"
          },
          {
            "label": "RAM / CPU",
            "val": "3 GB RAM + 2 CPU Cores (Dedicated)"
          },
          {
            "label": "Performance",
            "val": "Up to 10x Boosted Speed"
          },
          {
            "label": "IP Address",
            "val": "Dedicated IP Address Included"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain"
          },
          {
            "label": "Backups",
            "val": "Automated Daily Backups"
          },
          {
            "label": "CDN",
            "val": "Cloudflare Enterprise CDN"
          },
          {
            "label": "Support",
            "val": "Priority 24/7 VIP Support Queue"
          }
        ],
        "ctaText": "کلاؤڈ اسٹارٹ اپ منتخب کریں"
      },
      {
        "name": "KVM 2 کلاؤڈ وی پی ایس",
        "tagline": "سافٹ ویئر انجینئرز اور ڈویلپرز کے لیے مکمل روٹ پاور",
        "price": "$7.99",
        "period": "/month",
        "savings": "55٪ چھوٹ + 20٪ پارٹنر رعایت",
        "popular": false,
        "category": "vps",
        "specs": [
          {
            "label": "CPU",
            "val": "2 Dedicated vCPU Cores"
          },
          {
            "label": "RAM",
            "val": "8 GB Dedicated RAM"
          },
          {
            "label": "Storage",
            "val": "100 GB High-IOPS NVMe"
          },
          {
            "label": "Bandwidth",
            "val": "8 TB High-Speed Traffic"
          },
          {
            "label": "Access",
            "val": "Full Root Administrative Access"
          },
          {
            "label": "Virtualization",
            "val": "100% Kernel-based (KVM)"
          },
          {
            "label": "Backups",
            "val": "Automated Weekly Snapshots"
          },
          {
            "label": "AI Terminal",
            "val": "AI Assistant for Linux Commands"
          },
          {
            "label": "OS Support",
            "val": "Ubuntu, Debian, AlmaLinux, Rocky"
          }
        ],
        "ctaText": "KVM وی پی ایس منتخب کریں"
      }
    ],
    "architectureHighlights": [
      {
        "title": "LiteSpeed Enterprise vs. Apache",
        "desc": "Unlike budget hosts that still use 20-year-old Apache software, Hostinger utilizes LiteSpeed Enterprise web servers. LiteSpeed processes static and dynamic requests simultaneously through event-driven architecture, reducing RAM usage and serving WordPress pages up to 500% faster.",
        "metric": "5x Faster TTFB"
      },
      {
        "title": "Global Tier-3 Data Centers",
        "desc": "Deploy your site closest to your target audience. Choose from global enterprise data center locations across the United States, United Kingdom, France, Netherlands, Lithuania, Singapore, India, and Brazil. Switch data center locations anytime with a single click.",
        "metric": "8 Global Regions"
      },
      {
        "title": "Multi-Layer Defensive Security",
        "desc": "Every website is shielded behind custom Web Application Firewalls (WAF), Cloudflare DDoS mitigation, automated SSL encryption, and Monarx real-time malware scanning that neutralizes malicious scripts before they execute.",
        "metric": "99.9% Uptime SLA"
      },
      {
        "title": "Next-Gen hPanel Control Center",
        "desc": "Forget clumsy, outdated cPanel interfaces. Hostinger custom-engineered hPanel to be clean, responsive, and intuitive. Manage DNS, create databases, install SSL certificates, set up staging sites, and access file managers in seconds.",
        "metric": "3x Faster Navigation"
      },
      {
        "title": "Automated Snapshot & Daily Backups",
        "desc": "Never worry about catastrophic data loss. Websites are backed up automatically with point-in-time restore capabilities. If an update breaks your website, roll back to an earlier version with a single click in your dashboard.",
        "metric": "Zero-Downtime Restores"
      },
      {
        "title": "Developer & Staging Toolkit",
        "desc": "Equipped with modern developer tooling including Git integration, WP-CLI, SSH access, PHP version switcher (from PHP 7.4 to PHP 8.3+), MySQL/phpMyAdmin access, and a one-click staging environment to test changes safely.",
        "metric": "Dev-Ready Stack"
      }
    ],
    "launchSteps": [
      {
        "step": "01",
        "title": "Click Safi Academy's Partner Link",
        "desc": "Access the exclusive portal using our verified referral URL to unlock special promotional pricing with up to 75% standard discount plus our 20% bonus."
      },
      {
        "step": "02",
        "title": "Select Your Preferred Plan",
        "desc": "Choose between Web Hosting (for blogs/portfolios), Cloud Hosting (for high-traffic businesses), or KVM VPS (for developers requiring root access)."
      },
      {
        "step": "03",
        "title": "Apply Code 89LSHAHEEKCO at Checkout",
        "desc": "Ensure the referral code 89LSHAHEEKCO is present in the coupon field to automatically lock in your additional 20% discount on your order."
      },
      {
        "step": "04",
        "title": "Claim Free Domain & Deploy in 60s",
        "desc": "Claim your free 1-year custom domain name (.com, .net, .org, etc.) and launch your site using the 1-click WordPress installer or the AI Website Builder."
      }
    ],
    "faqs": [
      {
        "q": "How do I claim the 20% discount using the referral code?",
        "a": "Simply click any of the 'Claim 20% Discount' or 'Get Started' buttons on this page. The referral code 89LSHAHEEKCO will be automatically appended to your checkout session. You can also copy the code directly using our 1-click coupon widget and paste it into the coupon code box during checkout at Hostinger.com to verify your 20% savings."
      },
      {
        "q": "Is the free domain name really included at no cost?",
        "a": "Yes! When you purchase any 12, 24, or 48-month Premium, Business, or Cloud hosting plan, Hostinger includes a free custom domain registration for your first full year. Popular extensions like .com, .net, .org, .online, and .tech are fully eligible."
      },
      {
        "q": "Can I migrate my existing website from another hosting provider for free?",
        "a": "Yes, 100% free. Hostinger provides an automated website migration service. Once you sign up, simply enter your current host's login details or WordPress URL in hPanel, and Hostinger's migration engineers and automated tools will transfer your entire site, databases, and emails with zero downtime."
      },
      {
        "q": "What is the difference between Web Hosting, Cloud Hosting, and VPS?",
        "a": "Web Hosting shares server hardware efficiently, making it the most affordable choice for personal sites and small businesses. Cloud Hosting isolates dedicated CPU and RAM resources within a virtual container, delivering 3x faster speeds and high redundancy for growing businesses. VPS (Virtual Private Server) provides full root administrative access, allowing developers to install custom operating systems, Docker containers, and complex backend APIs."
      },
      {
        "q": "Can I run modern programming languages like Node.js, Python, and Docker?",
        "a": "Yes. On KVM VPS plans, you have complete root access to run any stack including Node.js, Python, Ruby, Go, Docker, PostgreSQL, Redis, and custom microservices. On Web & Cloud plans, PHP 8.x, Git, WP-CLI, and MySQL are standard."
      },
      {
        "q": "What is the 30-day money-back guarantee policy?",
        "a": "Hostinger offers an unconditional 30-day money-back guarantee. If you are not completely satisfied with the speed, uptime, or control panel for any reason within the first 30 days of purchase, you can cancel and receive a full refund with no hassle."
      },
      {
        "q": "How does Hostinger's hPanel compare to traditional cPanel?",
        "a": "hPanel is Hostinger's custom-built control panel. Unlike legacy cPanel which can feel sluggish and complicated for beginners, hPanel is ultra-modern, intuitive, responsive on mobile devices, and significantly faster. It integrates domain management, DNS records, staging, file management, and AI assistance into one cohesive interface."
      },
      {
        "q": "Does Hostinger support SSL certificates and HTTPS encryption?",
        "a": "Yes. Every domain, subdomain, and parked domain hosted on Hostinger receives free, lifetime Let's Encrypt SSL certificates that install and renew automatically. You will never have to pay extra fees for website encryption."
      }
    ],
    "isRtl": true,
    "ctaGetStarted": "اضافی 20٪ رعایت کے ساتھ آغاز کریں",
    "ctaExploreCourses": "کوڈنگ اور کلاؤڈ کورسز دیکھیں",
    "bottomGuarantee": "30 دن کی غیر مشروط رقم واپسی کی ضمانت",
    "bottomInstant": "چند سیکنڈز میں کلاؤڈ اکاؤنٹ کی فوری فعالیت",
    "bottomChat": "24/7 ترجیحی لائیو چیٹ سپورٹ",
    "bottomDisclaimer": "* ہوسٹنگر ایک خود مختار کلاؤڈ ہوسٹنگ ادارہ ہے۔ پروموشنل رعایتیں، ڈومین رجسٹریشن اور تجدید کے معاملات براہ راست ہوسٹنگر کے زیر انتظام ہیں۔",
    "metricSubTtfb": "لائٹ اسپیڈ کے ساتھ جدید رفتار",
    "metricSubCdn": "کلاؤڈ فلیئر انٹرپرائز گلوبل CDN",
    "metricSubNvme": "انٹرپرائز گریڈ NVMe اسٹوریج",
    "metricSubSec": "Monarx اور کلاؤڈ WAF سے لائیو سیکیورٹی"
  },
  "es": {
    "disclosure": "Safi Academy maintains an official affiliate partnership with Hostinger. When you purchase hosting through our verified referral link or apply coupon code 89LSHAHEEKCO, you receive an exclusive 20% additional discount on your order, and Safi Academy may earn a referral commission at no additional cost to you. This support enables us to continue offering free coding, cloud, and entrepreneurship education globally.",
    "partnerDisclosureBadge": "Transparent Affiliate Disclosure:",
    "heroBadge": "Safi Academy Verified Partner • 20% Off Code: 89LSHAHEEKCO",
    "heroTitle": "Ultra-Fast NVMe Cloud & Next-Gen Web Hosting",
    "heroSubtitle": "Power your websites, web applications, and digital business on world-class infrastructure. Equipped with LiteSpeed Enterprise web servers, enterprise NVMe SSDs, 99.9% uptime SLA, global CDN, and autonomous AI agents.",
    "pill1": "LiteSpeed Enterprise & LSCache Included",
    "pill2": "Free 1-Year Domain & Lifetime Free SSL",
    "pill3": "Automated Daily & Weekly Backups",
    "pill4": "30-Day Money-Back Guarantee",
    "partnerCodeLabel": "Partner Code:",
    "copyCodeBtn": "Copy Code",
    "copiedBtn": "Copied! 20% Applied",
    "claimDiscountBtn": "Claim 20% Discount with Partner Link",
    "comparePlansBtn": "Compare Plans",
    "telemetryTitle": "Hostinger Cloud Telemetry",
    "telemetrySubtitle": "NVMe Tier-3 Infrastructure",
    "telemetryLive": "99.99% Live",
    "metricTtfb": "Server Response (TTFB)",
    "metricUptime": "Uptime Guarantee",
    "metricCdn": "Global Edge CDN",
    "metricAi": "Autonomous AI Debugging",
    "servicesBadge": "Cloud Ecosystem",
    "servicesTitle": "Comprehensive Cloud & Web Hosting Infrastructure",
    "servicesSubtitle": "Explore specialized cloud infrastructure engineered for creators, modern developers, agencies, and enterprise applications.",
    "plansBadge": "Special Partner Pricing",
    "plansTitle": "High-Performance Hosting Tiers",
    "plansSubtitle": "Choose the optimal hosting architecture for your personal brand, digital business, or SaaS platform.",
    "planFilterAll": "All Plans",
    "planFilterWeb": "Web Hosting",
    "planFilterCloud": "Cloud Hosting",
    "planFilterVps": "Cloud VPS",
    "archBadge": "Technical Benchmarks",
    "archTitle": "Enterprise Engineering & Cloud Benchmarks",
    "archSubtitle": "Discover the technical engineering advantages that set Hostinger apart from legacy hosting providers.",
    "stepsBadge": "Simple Activation Guide",
    "stepsTitle": "How to Activate Your 20% Bonus Discount",
    "stepsSubtitle": "Follow these 4 simple steps to lock in your special promotional rate and launch your website in under 2 minutes.",
    "faqsBadge": "Help & Clarifications",
    "faqsTitle": "Frequently Asked Questions",
    "services": [
      {
        "id": "web-hosting",
        "name": "High-Speed Web Hosting",
        "badge": "Most Popular",
        "category": "web",
        "shortDesc": "Optimized LiteSpeed infrastructure built for lightning-fast WordPress and dynamic websites.",
        "longDesc": "Hostinger's flagship web hosting is engineered on top of LiteSpeed Enterprise web servers, replacing slow legacy Apache engines. It incorporates the proprietary LSCache optimization plugin, server-level object caching, and HTTP/3 protocol support to deliver sub-200ms page load times. Perfect for personal blogs, business portfolios, and content websites seeking rock-solid 99.9% uptime with minimal setup overhead.",
        "specs": [
          "LiteSpeed Web Server with LSCache",
          "Free 1-Click WordPress Auto-Installer",
          "Free 1-Year Domain Registration Included",
          "Unlimited Free SSL Certificates",
          "Automated Weekly & Daily Backups",
          "Integrated Git Version Control Deployment"
        ]
      },
      {
        "id": "cloud-hosting",
        "name": "Enterprise Cloud Hosting",
        "badge": "High Performance",
        "category": "cloud",
        "shortDesc": "Isolated virtual containers with dedicated CPU, RAM, and automated instant resource scaling.",
        "longDesc": "Experience the power and stability of a dedicated server combined with the sheer simplicity of shared hosting. Each cloud account runs in an isolated virtual instance with dedicated RAM and vCPU cores. When your site experiences viral spikes, automated resource scaling absorbs the surge seamlessly without slowdowns or dropped connections. Includes a dedicated IP address and custom Cloudflare Enterprise routing.",
        "specs": [
          "Dedicated Virtual Resources (Up to 16GB RAM & 8 Cores)",
          "Dedicated IPv4 & IPv6 Address Included",
          "3x to 4x Faster Speed than Standard Hosting",
          "Built-in Cloudflare Enterprise CDN Protection",
          "Automated Daily Backups with 1-Click Restore",
          "Priority 24/7 VIP Technical Support"
        ]
      },
      {
        "id": "vps-hosting",
        "name": "KVM Cloud VPS Hosting",
        "badge": "Developers & DevOps",
        "category": "vps",
        "shortDesc": "Full root access, dedicated kernel virtualization, high-IOPS NVMe drives, and AI terminal assistance.",
        "longDesc": "Engineered for software engineers, backend developers, and tech leads who demand complete root-level control over their operating environment. Built upon Kernel-based Virtual Machine (KVM) technology, Hostinger VPS guarantees 100% dedicated hardware resource allocation. Deploy Docker containers, configure custom Node.js, Python, Ruby, or Go environments, and leverage the built-in AI Terminal Assistant to formulate Linux commands in seconds.",
        "specs": [
          "Full Root Access & Dedicated Kernel (KVM)",
          "Enterprise-Class NVMe Storage with Ultra-High IOPS",
          "OS Options: Ubuntu, Debian, AlmaLinux, Rocky Linux",
          "Docker, Node.js, Python & Microservices Ready",
          "Automated Weekly Snapshots & Firewall Rules",
          "Built-in AI Assistant for Terminal Configurations"
        ]
      },
      {
        "id": "agency-hosting",
        "name": "Agency Hosting & Hostinger Pro",
        "badge": "Agencies & Freelancers",
        "category": "web",
        "shortDesc": "Manage hundreds of client sites with unified credentials, team collaboration, and client sharing.",
        "longDesc": "Designed specifically for web design agencies, freelancers, and dev shops managing multiple client projects. The Hostinger Pro dashboard allows you to organize clients into workspaces, grant custom role-based permissions, and delegate access without sharing your master passwords. You can also deliver automated maintenance health checks, uptime reports, and white-labeled client experiences.",
        "specs": [
          "Centralized Multi-Client Management Portal",
          "Granular Role-Based Access Control (RBAC)",
          "Access Delegation Without Password Sharing",
          "Automated Client Website Maintenance Reports",
          "Integrated Referral & Commission Payouts",
          "Mass Plugin & Core WordPress Updates in 1-Click"
        ]
      },
      {
        "id": "ai-website-builder",
        "name": "AI Website Builder",
        "badge": "No-Code & Fast",
        "category": "web",
        "shortDesc": "Create stunning, fully responsive websites and e-commerce stores in under 60 seconds using AI.",
        "longDesc": "Transform a short text description into a fully functional, mobile-responsive, production-ready website in under a minute. The Hostinger AI Builder generates tailored layouts, copy, royalty-free images, and interactive contact forms. It includes a built-in AI Heatmap tool to predict visitor gaze patterns, an AI Logo Generator, and a robust e-commerce engine with 0% platform transaction fees.",
        "specs": [
          "Prompt-to-Website Generation in 60 Seconds",
          "Intuitive Drag-and-Drop Visual Canvas",
          "Integrated AI Copywriter & SEO Generator",
          "AI Heatmap for Conversion Rate Optimization",
          "Complete E-Commerce Suite (0% Transaction Fees)",
          "Mobile-First Responsive Layouts by Default"
        ]
      },
      {
        "id": "hostinger-horizons",
        "name": "Hostinger Horizons",
        "badge": "Next-Gen Cloud",
        "category": "cloud",
        "shortDesc": "Next-generation cloud ecosystem and edge deployment network built for the future of the web.",
        "longDesc": "Hostinger Horizons represents the cutting-edge evolution of global web infrastructure. By uniting edge computing, intelligent serverless routing, and globally distributed data caches, Horizons ensures websites load instantaneously regardless of visitor geography. It provides elastic infrastructure that adapts dynamically to emerging web standards, high-throughput media, and AI-driven web applications.",
        "specs": [
          "Next-Generation Edge-Native Architecture",
          "Ultra-Low Global Latency with Anycast Routing",
          "Automatic Elastic Resource Reallocation",
          "Future-Proof Compatibility with Modern Web Frameworks",
          "Tier-3 Globally Certified Data Center Backbone",
          "Continuous Performance & Reliability Tuning"
        ]
      },
      {
        "id": "business-email",
        "name": "Professional Business Email",
        "badge": "Brand Identity",
        "category": "web",
        "shortDesc": "Custom branded email addresses with robust anti-spam, calendar sync, and webmail portals.",
        "longDesc": "Establish immediate corporate credibility by sending messages from your own domain (e.g., name@yourcompany.com). Powered by Titan Email, this suite provides generous inbox storage (10GB to 50GB), advanced multi-layered anti-spam and anti-virus filtering, calendar management, and seamless synchronization across iOS, Android, macOS, and Windows devices.",
        "specs": [
          "Professional Branded Inboxes (@yourdomain.com)",
          "Up to 50GB Dedicated Storage per Mailbox",
          "Multi-Layer Anti-Spam & Zero-Day Threat Shield",
          "Integrated Business Calendar & Contact Manager",
          "Native Mobile Apps for iOS & Android",
          "Automated Email Forwarding & Signature Builder"
        ]
      },
      {
        "id": "reach-email",
        "name": "Reach Email Marketing",
        "badge": "Growth & Lead Gen",
        "category": "web",
        "shortDesc": "Built-in newsletter campaigns, automated drip sequences, and lead capture directly in hPanel.",
        "longDesc": "Nurture leads and convert visitors into repeat customers without paying for costly third-party email platforms. Reach Email Marketing is embedded directly within your hosting dashboard, allowing you to design beautiful newsletters with a drag-and-drop builder, segment subscribers by activity, launch automated welcome sequences, and monitor open and click-through metrics in real time.",
        "specs": [
          "Integrated Directly into Your Hosting Dashboard",
          "Drag-and-Drop Newsletter & Campaign Designer",
          "Automated Drip Sequences & Autoresponders",
          "Real-Time Delivery, Open, and Click Telemetry",
          "High Inbox Deliverability with Pre-Warmed IPs",
          "Seamless Form Integration with WordPress & HTML"
        ]
      },
      {
        "id": "managed-openclaw",
        "name": "Managed OpenClaw Microservices",
        "badge": "High Concurrency",
        "category": "cloud",
        "shortDesc": "Optimized containerized runtime environments for high-throughput background jobs and APIs.",
        "longDesc": "Managed OpenClaw is engineered for heavy computational workloads, background batch jobs, asynchronous task queues, and microservice APIs. It isolates computing processes to ensure zero resource contamination across your applications, giving backend developers an ultra-lean runtime environment optimized for low latency and high concurrent connections.",
        "specs": [
          "Isolated Containerized Microservice Architecture",
          "Optimized for High-Concurrency API Gateways",
          "Low-Overhead Compute Resource Allocation",
          "Continuous Process Health Monitoring & Self-Healing",
          "Integrated Micro-Telemetry & Error Logging",
          "Zero Server Maintenance & Automated Security Patching"
        ]
      },
      {
        "id": "ai-agents",
        "name": "Autonomous AI Hosting Agents",
        "badge": "Next-Gen AI",
        "category": "cloud",
        "shortDesc": "Intelligent in-dashboard agents that debug errors, optimize queries, and automate server management.",
        "longDesc": "Hostinger has integrated autonomous AI agents directly into hPanel. Need to identify why a WordPress plugin caused a critical error? The AI Agent analyzes error logs and suggests the exact fix. Need to optimize slow database queries, configure custom redirects, or generate .htaccess rewrite rules? Simply instruct the AI in natural language to execute the configuration safely.",
        "specs": [
          "Automated WordPress Plugin Conflict Diagnostics",
          "Natural Language .htaccess & Nginx Rule Generation",
          "Slow MySQL Query Detection & Indexing Advice",
          "Automated On-Page SEO Recommendations",
          "Terminal Command Generation for VPS Users",
          "24/7 Instant In-Dashboard Assistance"
        ]
      }
    ],
    "plans": [
      {
        "name": "Hosting Web Premium",
        "tagline": "Ideal para sitios web personales, blogs y proyectos académicos",
        "price": "$2.99",
        "period": "/month",
        "savings": "Ahorra 75% + 20% descuento socio",
        "popular": false,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "100 GB SSD"
          },
          {
            "label": "Performance",
            "val": "Standard LiteSpeed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Weekly Automated"
          },
          {
            "label": "Email",
            "val": "Free Business Email"
          },
          {
            "label": "AI Tools",
            "val": "Basic AI Website Builder"
          }
        ],
        "ctaText": "Elegir plan Premium"
      },
      {
        "name": "Hosting Web Business",
        "tagline": "Recomendado para empresas, emprendedores y tiendas en línea",
        "price": "$3.99",
        "period": "/month",
        "savings": "Ahorra 73% + 20% descuento socio",
        "popular": true,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB Ultra NVMe (5x Faster)"
          },
          {
            "label": "Performance",
            "val": "Up to 5x Increased Speed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Daily & On-Demand Backups"
          },
          {
            "label": "CDN",
            "val": "Free Built-in CDN Included"
          },
          {
            "label": "Staging",
            "val": "1-Click WordPress Staging Tool"
          },
          {
            "label": "AI Tools",
            "val": "Full AI Website Builder Suite"
          }
        ],
        "ctaText": "Elegir plan Business"
      },
      {
        "name": "Cloud Startup",
        "tagline": "Recursos dedicados para proyectos de alto tráfico y rápido crecimiento",
        "price": "$9.99",
        "period": "/month",
        "savings": "Ahorra 60% + 20% descuento socio",
        "popular": false,
        "category": "cloud",
        "specs": [
          {
            "label": "Websites",
            "val": "300 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB NVMe Storage"
          },
          {
            "label": "RAM / CPU",
            "val": "3 GB RAM + 2 CPU Cores (Dedicated)"
          },
          {
            "label": "Performance",
            "val": "Up to 10x Boosted Speed"
          },
          {
            "label": "IP Address",
            "val": "Dedicated IP Address Included"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain"
          },
          {
            "label": "Backups",
            "val": "Automated Daily Backups"
          },
          {
            "label": "CDN",
            "val": "Cloudflare Enterprise CDN"
          },
          {
            "label": "Support",
            "val": "Priority 24/7 VIP Support Queue"
          }
        ],
        "ctaText": "Elegir Cloud Startup"
      },
      {
        "name": "VPS Cloud KVM 2",
        "tagline": "Control total con acceso root dedicado para desarrolladores e ingenieros",
        "price": "$7.99",
        "period": "/month",
        "savings": "Ahorra 55% + 20% descuento socio",
        "popular": false,
        "category": "vps",
        "specs": [
          {
            "label": "CPU",
            "val": "2 Dedicated vCPU Cores"
          },
          {
            "label": "RAM",
            "val": "8 GB Dedicated RAM"
          },
          {
            "label": "Storage",
            "val": "100 GB High-IOPS NVMe"
          },
          {
            "label": "Bandwidth",
            "val": "8 TB High-Speed Traffic"
          },
          {
            "label": "Access",
            "val": "Full Root Administrative Access"
          },
          {
            "label": "Virtualization",
            "val": "100% Kernel-based (KVM)"
          },
          {
            "label": "Backups",
            "val": "Automated Weekly Snapshots"
          },
          {
            "label": "AI Terminal",
            "val": "AI Assistant for Linux Commands"
          },
          {
            "label": "OS Support",
            "val": "Ubuntu, Debian, AlmaLinux, Rocky"
          }
        ],
        "ctaText": "Elegir VPS KVM"
      }
    ],
    "architectureHighlights": [
      {
        "title": "LiteSpeed Enterprise vs. Apache",
        "desc": "Unlike budget hosts that still use 20-year-old Apache software, Hostinger utilizes LiteSpeed Enterprise web servers. LiteSpeed processes static and dynamic requests simultaneously through event-driven architecture, reducing RAM usage and serving WordPress pages up to 500% faster.",
        "metric": "5x Faster TTFB"
      },
      {
        "title": "Global Tier-3 Data Centers",
        "desc": "Deploy your site closest to your target audience. Choose from global enterprise data center locations across the United States, United Kingdom, France, Netherlands, Lithuania, Singapore, India, and Brazil. Switch data center locations anytime with a single click.",
        "metric": "8 Global Regions"
      },
      {
        "title": "Multi-Layer Defensive Security",
        "desc": "Every website is shielded behind custom Web Application Firewalls (WAF), Cloudflare DDoS mitigation, automated SSL encryption, and Monarx real-time malware scanning that neutralizes malicious scripts before they execute.",
        "metric": "99.9% Uptime SLA"
      },
      {
        "title": "Next-Gen hPanel Control Center",
        "desc": "Forget clumsy, outdated cPanel interfaces. Hostinger custom-engineered hPanel to be clean, responsive, and intuitive. Manage DNS, create databases, install SSL certificates, set up staging sites, and access file managers in seconds.",
        "metric": "3x Faster Navigation"
      },
      {
        "title": "Automated Snapshot & Daily Backups",
        "desc": "Never worry about catastrophic data loss. Websites are backed up automatically with point-in-time restore capabilities. If an update breaks your website, roll back to an earlier version with a single click in your dashboard.",
        "metric": "Zero-Downtime Restores"
      },
      {
        "title": "Developer & Staging Toolkit",
        "desc": "Equipped with modern developer tooling including Git integration, WP-CLI, SSH access, PHP version switcher (from PHP 7.4 to PHP 8.3+), MySQL/phpMyAdmin access, and a one-click staging environment to test changes safely.",
        "metric": "Dev-Ready Stack"
      }
    ],
    "launchSteps": [
      {
        "step": "01",
        "title": "Click Safi Academy's Partner Link",
        "desc": "Access the exclusive portal using our verified referral URL to unlock special promotional pricing with up to 75% standard discount plus our 20% bonus."
      },
      {
        "step": "02",
        "title": "Select Your Preferred Plan",
        "desc": "Choose between Web Hosting (for blogs/portfolios), Cloud Hosting (for high-traffic businesses), or KVM VPS (for developers requiring root access)."
      },
      {
        "step": "03",
        "title": "Apply Code 89LSHAHEEKCO at Checkout",
        "desc": "Ensure the referral code 89LSHAHEEKCO is present in the coupon field to automatically lock in your additional 20% discount on your order."
      },
      {
        "step": "04",
        "title": "Claim Free Domain & Deploy in 60s",
        "desc": "Claim your free 1-year custom domain name (.com, .net, .org, etc.) and launch your site using the 1-click WordPress installer or the AI Website Builder."
      }
    ],
    "faqs": [
      {
        "q": "How do I claim the 20% discount using the referral code?",
        "a": "Simply click any of the 'Claim 20% Discount' or 'Get Started' buttons on this page. The referral code 89LSHAHEEKCO will be automatically appended to your checkout session. You can also copy the code directly using our 1-click coupon widget and paste it into the coupon code box during checkout at Hostinger.com to verify your 20% savings."
      },
      {
        "q": "Is the free domain name really included at no cost?",
        "a": "Yes! When you purchase any 12, 24, or 48-month Premium, Business, or Cloud hosting plan, Hostinger includes a free custom domain registration for your first full year. Popular extensions like .com, .net, .org, .online, and .tech are fully eligible."
      },
      {
        "q": "Can I migrate my existing website from another hosting provider for free?",
        "a": "Yes, 100% free. Hostinger provides an automated website migration service. Once you sign up, simply enter your current host's login details or WordPress URL in hPanel, and Hostinger's migration engineers and automated tools will transfer your entire site, databases, and emails with zero downtime."
      },
      {
        "q": "What is the difference between Web Hosting, Cloud Hosting, and VPS?",
        "a": "Web Hosting shares server hardware efficiently, making it the most affordable choice for personal sites and small businesses. Cloud Hosting isolates dedicated CPU and RAM resources within a virtual container, delivering 3x faster speeds and high redundancy for growing businesses. VPS (Virtual Private Server) provides full root administrative access, allowing developers to install custom operating systems, Docker containers, and complex backend APIs."
      },
      {
        "q": "Can I run modern programming languages like Node.js, Python, and Docker?",
        "a": "Yes. On KVM VPS plans, you have complete root access to run any stack including Node.js, Python, Ruby, Go, Docker, PostgreSQL, Redis, and custom microservices. On Web & Cloud plans, PHP 8.x, Git, WP-CLI, and MySQL are standard."
      },
      {
        "q": "What is the 30-day money-back guarantee policy?",
        "a": "Hostinger offers an unconditional 30-day money-back guarantee. If you are not completely satisfied with the speed, uptime, or control panel for any reason within the first 30 days of purchase, you can cancel and receive a full refund with no hassle."
      },
      {
        "q": "How does Hostinger's hPanel compare to traditional cPanel?",
        "a": "hPanel is Hostinger's custom-built control panel. Unlike legacy cPanel which can feel sluggish and complicated for beginners, hPanel is ultra-modern, intuitive, responsive on mobile devices, and significantly faster. It integrates domain management, DNS records, staging, file management, and AI assistance into one cohesive interface."
      },
      {
        "q": "Does Hostinger support SSL certificates and HTTPS encryption?",
        "a": "Yes. Every domain, subdomain, and parked domain hosted on Hostinger receives free, lifetime Let's Encrypt SSL certificates that install and renew automatically. You will never have to pay extra fees for website encryption."
      }
    ],
    "isRtl": false,
    "ctaGetStarted": "Comenzar con 20% de descuento",
    "ctaExploreCourses": "Explorar cursos de programación",
    "bottomGuarantee": "Garantía de reembolso incondicional de 30 días",
    "bottomInstant": "Activación inmediata de la cuenta cloud",
    "bottomChat": "Soporte prioritario por chat 24/7",
    "bottomDisclaimer": "* Hostinger es un proveedor independiente de hosting cloud. Los descuentos promocionales, la disponibilidad de dominios y las renovaciones son gestionados directamente por Hostinger.",
    "metricSubTtfb": "Optimizado con LiteSpeed Enterprise",
    "metricSubCdn": "Red de distribución Cloudflare Enterprise CDN",
    "metricSubNvme": "Almacenamiento NVMe empresarial (RAID-10)",
    "metricSubSec": "Seguridad en tiempo real con Monarx y WAF"
  },
  "zh": {
    "disclosure": "Safi Academy maintains an official affiliate partnership with Hostinger. When you purchase hosting through our verified referral link or apply coupon code 89LSHAHEEKCO, you receive an exclusive 20% additional discount on your order, and Safi Academy may earn a referral commission at no additional cost to you. This support enables us to continue offering free coding, cloud, and entrepreneurship education globally.",
    "partnerDisclosureBadge": "Transparent Affiliate Disclosure:",
    "heroBadge": "Safi Academy Verified Partner • 20% Off Code: 89LSHAHEEKCO",
    "heroTitle": "Ultra-Fast NVMe Cloud & Next-Gen Web Hosting",
    "heroSubtitle": "Power your websites, web applications, and digital business on world-class infrastructure. Equipped with LiteSpeed Enterprise web servers, enterprise NVMe SSDs, 99.9% uptime SLA, global CDN, and autonomous AI agents.",
    "pill1": "LiteSpeed Enterprise & LSCache Included",
    "pill2": "Free 1-Year Domain & Lifetime Free SSL",
    "pill3": "Automated Daily & Weekly Backups",
    "pill4": "30-Day Money-Back Guarantee",
    "partnerCodeLabel": "Partner Code:",
    "copyCodeBtn": "Copy Code",
    "copiedBtn": "Copied! 20% Applied",
    "claimDiscountBtn": "Claim 20% Discount with Partner Link",
    "comparePlansBtn": "Compare Plans",
    "telemetryTitle": "Hostinger Cloud Telemetry",
    "telemetrySubtitle": "NVMe Tier-3 Infrastructure",
    "telemetryLive": "99.99% Live",
    "metricTtfb": "Server Response (TTFB)",
    "metricUptime": "Uptime Guarantee",
    "metricCdn": "Global Edge CDN",
    "metricAi": "Autonomous AI Debugging",
    "servicesBadge": "Cloud Ecosystem",
    "servicesTitle": "Comprehensive Cloud & Web Hosting Infrastructure",
    "servicesSubtitle": "Explore specialized cloud infrastructure engineered for creators, modern developers, agencies, and enterprise applications.",
    "plansBadge": "Special Partner Pricing",
    "plansTitle": "High-Performance Hosting Tiers",
    "plansSubtitle": "Choose the optimal hosting architecture for your personal brand, digital business, or SaaS platform.",
    "planFilterAll": "All Plans",
    "planFilterWeb": "Web Hosting",
    "planFilterCloud": "Cloud Hosting",
    "planFilterVps": "Cloud VPS",
    "archBadge": "Technical Benchmarks",
    "archTitle": "Enterprise Engineering & Cloud Benchmarks",
    "archSubtitle": "Discover the technical engineering advantages that set Hostinger apart from legacy hosting providers.",
    "stepsBadge": "Simple Activation Guide",
    "stepsTitle": "How to Activate Your 20% Bonus Discount",
    "stepsSubtitle": "Follow these 4 simple steps to lock in your special promotional rate and launch your website in under 2 minutes.",
    "faqsBadge": "Help & Clarifications",
    "faqsTitle": "Frequently Asked Questions",
    "services": [
      {
        "id": "web-hosting",
        "name": "High-Speed Web Hosting",
        "badge": "Most Popular",
        "category": "web",
        "shortDesc": "Optimized LiteSpeed infrastructure built for lightning-fast WordPress and dynamic websites.",
        "longDesc": "Hostinger's flagship web hosting is engineered on top of LiteSpeed Enterprise web servers, replacing slow legacy Apache engines. It incorporates the proprietary LSCache optimization plugin, server-level object caching, and HTTP/3 protocol support to deliver sub-200ms page load times. Perfect for personal blogs, business portfolios, and content websites seeking rock-solid 99.9% uptime with minimal setup overhead.",
        "specs": [
          "LiteSpeed Web Server with LSCache",
          "Free 1-Click WordPress Auto-Installer",
          "Free 1-Year Domain Registration Included",
          "Unlimited Free SSL Certificates",
          "Automated Weekly & Daily Backups",
          "Integrated Git Version Control Deployment"
        ]
      },
      {
        "id": "cloud-hosting",
        "name": "Enterprise Cloud Hosting",
        "badge": "High Performance",
        "category": "cloud",
        "shortDesc": "Isolated virtual containers with dedicated CPU, RAM, and automated instant resource scaling.",
        "longDesc": "Experience the power and stability of a dedicated server combined with the sheer simplicity of shared hosting. Each cloud account runs in an isolated virtual instance with dedicated RAM and vCPU cores. When your site experiences viral spikes, automated resource scaling absorbs the surge seamlessly without slowdowns or dropped connections. Includes a dedicated IP address and custom Cloudflare Enterprise routing.",
        "specs": [
          "Dedicated Virtual Resources (Up to 16GB RAM & 8 Cores)",
          "Dedicated IPv4 & IPv6 Address Included",
          "3x to 4x Faster Speed than Standard Hosting",
          "Built-in Cloudflare Enterprise CDN Protection",
          "Automated Daily Backups with 1-Click Restore",
          "Priority 24/7 VIP Technical Support"
        ]
      },
      {
        "id": "vps-hosting",
        "name": "KVM Cloud VPS Hosting",
        "badge": "Developers & DevOps",
        "category": "vps",
        "shortDesc": "Full root access, dedicated kernel virtualization, high-IOPS NVMe drives, and AI terminal assistance.",
        "longDesc": "Engineered for software engineers, backend developers, and tech leads who demand complete root-level control over their operating environment. Built upon Kernel-based Virtual Machine (KVM) technology, Hostinger VPS guarantees 100% dedicated hardware resource allocation. Deploy Docker containers, configure custom Node.js, Python, Ruby, or Go environments, and leverage the built-in AI Terminal Assistant to formulate Linux commands in seconds.",
        "specs": [
          "Full Root Access & Dedicated Kernel (KVM)",
          "Enterprise-Class NVMe Storage with Ultra-High IOPS",
          "OS Options: Ubuntu, Debian, AlmaLinux, Rocky Linux",
          "Docker, Node.js, Python & Microservices Ready",
          "Automated Weekly Snapshots & Firewall Rules",
          "Built-in AI Assistant for Terminal Configurations"
        ]
      },
      {
        "id": "agency-hosting",
        "name": "Agency Hosting & Hostinger Pro",
        "badge": "Agencies & Freelancers",
        "category": "web",
        "shortDesc": "Manage hundreds of client sites with unified credentials, team collaboration, and client sharing.",
        "longDesc": "Designed specifically for web design agencies, freelancers, and dev shops managing multiple client projects. The Hostinger Pro dashboard allows you to organize clients into workspaces, grant custom role-based permissions, and delegate access without sharing your master passwords. You can also deliver automated maintenance health checks, uptime reports, and white-labeled client experiences.",
        "specs": [
          "Centralized Multi-Client Management Portal",
          "Granular Role-Based Access Control (RBAC)",
          "Access Delegation Without Password Sharing",
          "Automated Client Website Maintenance Reports",
          "Integrated Referral & Commission Payouts",
          "Mass Plugin & Core WordPress Updates in 1-Click"
        ]
      },
      {
        "id": "ai-website-builder",
        "name": "AI Website Builder",
        "badge": "No-Code & Fast",
        "category": "web",
        "shortDesc": "Create stunning, fully responsive websites and e-commerce stores in under 60 seconds using AI.",
        "longDesc": "Transform a short text description into a fully functional, mobile-responsive, production-ready website in under a minute. The Hostinger AI Builder generates tailored layouts, copy, royalty-free images, and interactive contact forms. It includes a built-in AI Heatmap tool to predict visitor gaze patterns, an AI Logo Generator, and a robust e-commerce engine with 0% platform transaction fees.",
        "specs": [
          "Prompt-to-Website Generation in 60 Seconds",
          "Intuitive Drag-and-Drop Visual Canvas",
          "Integrated AI Copywriter & SEO Generator",
          "AI Heatmap for Conversion Rate Optimization",
          "Complete E-Commerce Suite (0% Transaction Fees)",
          "Mobile-First Responsive Layouts by Default"
        ]
      },
      {
        "id": "hostinger-horizons",
        "name": "Hostinger Horizons",
        "badge": "Next-Gen Cloud",
        "category": "cloud",
        "shortDesc": "Next-generation cloud ecosystem and edge deployment network built for the future of the web.",
        "longDesc": "Hostinger Horizons represents the cutting-edge evolution of global web infrastructure. By uniting edge computing, intelligent serverless routing, and globally distributed data caches, Horizons ensures websites load instantaneously regardless of visitor geography. It provides elastic infrastructure that adapts dynamically to emerging web standards, high-throughput media, and AI-driven web applications.",
        "specs": [
          "Next-Generation Edge-Native Architecture",
          "Ultra-Low Global Latency with Anycast Routing",
          "Automatic Elastic Resource Reallocation",
          "Future-Proof Compatibility with Modern Web Frameworks",
          "Tier-3 Globally Certified Data Center Backbone",
          "Continuous Performance & Reliability Tuning"
        ]
      },
      {
        "id": "business-email",
        "name": "Professional Business Email",
        "badge": "Brand Identity",
        "category": "web",
        "shortDesc": "Custom branded email addresses with robust anti-spam, calendar sync, and webmail portals.",
        "longDesc": "Establish immediate corporate credibility by sending messages from your own domain (e.g., name@yourcompany.com). Powered by Titan Email, this suite provides generous inbox storage (10GB to 50GB), advanced multi-layered anti-spam and anti-virus filtering, calendar management, and seamless synchronization across iOS, Android, macOS, and Windows devices.",
        "specs": [
          "Professional Branded Inboxes (@yourdomain.com)",
          "Up to 50GB Dedicated Storage per Mailbox",
          "Multi-Layer Anti-Spam & Zero-Day Threat Shield",
          "Integrated Business Calendar & Contact Manager",
          "Native Mobile Apps for iOS & Android",
          "Automated Email Forwarding & Signature Builder"
        ]
      },
      {
        "id": "reach-email",
        "name": "Reach Email Marketing",
        "badge": "Growth & Lead Gen",
        "category": "web",
        "shortDesc": "Built-in newsletter campaigns, automated drip sequences, and lead capture directly in hPanel.",
        "longDesc": "Nurture leads and convert visitors into repeat customers without paying for costly third-party email platforms. Reach Email Marketing is embedded directly within your hosting dashboard, allowing you to design beautiful newsletters with a drag-and-drop builder, segment subscribers by activity, launch automated welcome sequences, and monitor open and click-through metrics in real time.",
        "specs": [
          "Integrated Directly into Your Hosting Dashboard",
          "Drag-and-Drop Newsletter & Campaign Designer",
          "Automated Drip Sequences & Autoresponders",
          "Real-Time Delivery, Open, and Click Telemetry",
          "High Inbox Deliverability with Pre-Warmed IPs",
          "Seamless Form Integration with WordPress & HTML"
        ]
      },
      {
        "id": "managed-openclaw",
        "name": "Managed OpenClaw Microservices",
        "badge": "High Concurrency",
        "category": "cloud",
        "shortDesc": "Optimized containerized runtime environments for high-throughput background jobs and APIs.",
        "longDesc": "Managed OpenClaw is engineered for heavy computational workloads, background batch jobs, asynchronous task queues, and microservice APIs. It isolates computing processes to ensure zero resource contamination across your applications, giving backend developers an ultra-lean runtime environment optimized for low latency and high concurrent connections.",
        "specs": [
          "Isolated Containerized Microservice Architecture",
          "Optimized for High-Concurrency API Gateways",
          "Low-Overhead Compute Resource Allocation",
          "Continuous Process Health Monitoring & Self-Healing",
          "Integrated Micro-Telemetry & Error Logging",
          "Zero Server Maintenance & Automated Security Patching"
        ]
      },
      {
        "id": "ai-agents",
        "name": "Autonomous AI Hosting Agents",
        "badge": "Next-Gen AI",
        "category": "cloud",
        "shortDesc": "Intelligent in-dashboard agents that debug errors, optimize queries, and automate server management.",
        "longDesc": "Hostinger has integrated autonomous AI agents directly into hPanel. Need to identify why a WordPress plugin caused a critical error? The AI Agent analyzes error logs and suggests the exact fix. Need to optimize slow database queries, configure custom redirects, or generate .htaccess rewrite rules? Simply instruct the AI in natural language to execute the configuration safely.",
        "specs": [
          "Automated WordPress Plugin Conflict Diagnostics",
          "Natural Language .htaccess & Nginx Rule Generation",
          "Slow MySQL Query Detection & Indexing Advice",
          "Automated On-Page SEO Recommendations",
          "Terminal Command Generation for VPS Users",
          "24/7 Instant In-Dashboard Assistance"
        ]
      }
    ],
    "plans": [
      {
        "name": "高级虚拟主机 (Premium)",
        "tagline": "个人博客、作品集及学生建站入门的最佳之选",
        "price": "$2.99",
        "period": "/month",
        "savings": "立省 75% + 专属额外 20% 优惠",
        "popular": false,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "100 GB SSD"
          },
          {
            "label": "Performance",
            "val": "Standard LiteSpeed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Weekly Automated"
          },
          {
            "label": "Email",
            "val": "Free Business Email"
          },
          {
            "label": "AI Tools",
            "val": "Basic AI Website Builder"
          }
        ],
        "ctaText": "选择高级主机方案"
      },
      {
        "name": "企业商务主机 (Business)",
        "tagline": "出海企业、电商品牌及高要求商业网站官方推荐",
        "price": "$3.99",
        "period": "/month",
        "savings": "立省 73% + 专属额外 20% 优惠",
        "popular": true,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB Ultra NVMe (5x Faster)"
          },
          {
            "label": "Performance",
            "val": "Up to 5x Increased Speed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Daily & On-Demand Backups"
          },
          {
            "label": "CDN",
            "val": "Free Built-in CDN Included"
          },
          {
            "label": "Staging",
            "val": "1-Click WordPress Staging Tool"
          },
          {
            "label": "AI Tools",
            "val": "Full AI Website Builder Suite"
          }
        ],
        "ctaText": "选择企业商务方案"
      },
      {
        "name": "云启动方案 (Cloud Startup)",
        "tagline": "独立云端算力资源，轻松承载海量高并发访问",
        "price": "$9.99",
        "period": "/month",
        "savings": "立省 60% + 专属额外 20% 优惠",
        "popular": false,
        "category": "cloud",
        "specs": [
          {
            "label": "Websites",
            "val": "300 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB NVMe Storage"
          },
          {
            "label": "RAM / CPU",
            "val": "3 GB RAM + 2 CPU Cores (Dedicated)"
          },
          {
            "label": "Performance",
            "val": "Up to 10x Boosted Speed"
          },
          {
            "label": "IP Address",
            "val": "Dedicated IP Address Included"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain"
          },
          {
            "label": "Backups",
            "val": "Automated Daily Backups"
          },
          {
            "label": "CDN",
            "val": "Cloudflare Enterprise CDN"
          },
          {
            "label": "Support",
            "val": "Priority 24/7 VIP Support Queue"
          }
        ],
        "ctaText": "选择云启动方案"
      },
      {
        "name": "KVM 2 极速云服务器 (VPS)",
        "tagline": "工程师与软件开发人员专属，享完整 Root 管理员权限",
        "price": "$7.99",
        "period": "/month",
        "savings": "立省 55% + 专属额外 20% 优惠",
        "popular": false,
        "category": "vps",
        "specs": [
          {
            "label": "CPU",
            "val": "2 Dedicated vCPU Cores"
          },
          {
            "label": "RAM",
            "val": "8 GB Dedicated RAM"
          },
          {
            "label": "Storage",
            "val": "100 GB High-IOPS NVMe"
          },
          {
            "label": "Bandwidth",
            "val": "8 TB High-Speed Traffic"
          },
          {
            "label": "Access",
            "val": "Full Root Administrative Access"
          },
          {
            "label": "Virtualization",
            "val": "100% Kernel-based (KVM)"
          },
          {
            "label": "Backups",
            "val": "Automated Weekly Snapshots"
          },
          {
            "label": "AI Terminal",
            "val": "AI Assistant for Linux Commands"
          },
          {
            "label": "OS Support",
            "val": "Ubuntu, Debian, AlmaLinux, Rocky"
          }
        ],
        "ctaText": "选择 KVM 云服务器"
      }
    ],
    "architectureHighlights": [
      {
        "title": "LiteSpeed Enterprise vs. Apache",
        "desc": "Unlike budget hosts that still use 20-year-old Apache software, Hostinger utilizes LiteSpeed Enterprise web servers. LiteSpeed processes static and dynamic requests simultaneously through event-driven architecture, reducing RAM usage and serving WordPress pages up to 500% faster.",
        "metric": "5x Faster TTFB"
      },
      {
        "title": "Global Tier-3 Data Centers",
        "desc": "Deploy your site closest to your target audience. Choose from global enterprise data center locations across the United States, United Kingdom, France, Netherlands, Lithuania, Singapore, India, and Brazil. Switch data center locations anytime with a single click.",
        "metric": "8 Global Regions"
      },
      {
        "title": "Multi-Layer Defensive Security",
        "desc": "Every website is shielded behind custom Web Application Firewalls (WAF), Cloudflare DDoS mitigation, automated SSL encryption, and Monarx real-time malware scanning that neutralizes malicious scripts before they execute.",
        "metric": "99.9% Uptime SLA"
      },
      {
        "title": "Next-Gen hPanel Control Center",
        "desc": "Forget clumsy, outdated cPanel interfaces. Hostinger custom-engineered hPanel to be clean, responsive, and intuitive. Manage DNS, create databases, install SSL certificates, set up staging sites, and access file managers in seconds.",
        "metric": "3x Faster Navigation"
      },
      {
        "title": "Automated Snapshot & Daily Backups",
        "desc": "Never worry about catastrophic data loss. Websites are backed up automatically with point-in-time restore capabilities. If an update breaks your website, roll back to an earlier version with a single click in your dashboard.",
        "metric": "Zero-Downtime Restores"
      },
      {
        "title": "Developer & Staging Toolkit",
        "desc": "Equipped with modern developer tooling including Git integration, WP-CLI, SSH access, PHP version switcher (from PHP 7.4 to PHP 8.3+), MySQL/phpMyAdmin access, and a one-click staging environment to test changes safely.",
        "metric": "Dev-Ready Stack"
      }
    ],
    "launchSteps": [
      {
        "step": "01",
        "title": "Click Safi Academy's Partner Link",
        "desc": "Access the exclusive portal using our verified referral URL to unlock special promotional pricing with up to 75% standard discount plus our 20% bonus."
      },
      {
        "step": "02",
        "title": "Select Your Preferred Plan",
        "desc": "Choose between Web Hosting (for blogs/portfolios), Cloud Hosting (for high-traffic businesses), or KVM VPS (for developers requiring root access)."
      },
      {
        "step": "03",
        "title": "Apply Code 89LSHAHEEKCO at Checkout",
        "desc": "Ensure the referral code 89LSHAHEEKCO is present in the coupon field to automatically lock in your additional 20% discount on your order."
      },
      {
        "step": "04",
        "title": "Claim Free Domain & Deploy in 60s",
        "desc": "Claim your free 1-year custom domain name (.com, .net, .org, etc.) and launch your site using the 1-click WordPress installer or the AI Website Builder."
      }
    ],
    "faqs": [
      {
        "q": "How do I claim the 20% discount using the referral code?",
        "a": "Simply click any of the 'Claim 20% Discount' or 'Get Started' buttons on this page. The referral code 89LSHAHEEKCO will be automatically appended to your checkout session. You can also copy the code directly using our 1-click coupon widget and paste it into the coupon code box during checkout at Hostinger.com to verify your 20% savings."
      },
      {
        "q": "Is the free domain name really included at no cost?",
        "a": "Yes! When you purchase any 12, 24, or 48-month Premium, Business, or Cloud hosting plan, Hostinger includes a free custom domain registration for your first full year. Popular extensions like .com, .net, .org, .online, and .tech are fully eligible."
      },
      {
        "q": "Can I migrate my existing website from another hosting provider for free?",
        "a": "Yes, 100% free. Hostinger provides an automated website migration service. Once you sign up, simply enter your current host's login details or WordPress URL in hPanel, and Hostinger's migration engineers and automated tools will transfer your entire site, databases, and emails with zero downtime."
      },
      {
        "q": "What is the difference between Web Hosting, Cloud Hosting, and VPS?",
        "a": "Web Hosting shares server hardware efficiently, making it the most affordable choice for personal sites and small businesses. Cloud Hosting isolates dedicated CPU and RAM resources within a virtual container, delivering 3x faster speeds and high redundancy for growing businesses. VPS (Virtual Private Server) provides full root administrative access, allowing developers to install custom operating systems, Docker containers, and complex backend APIs."
      },
      {
        "q": "Can I run modern programming languages like Node.js, Python, and Docker?",
        "a": "Yes. On KVM VPS plans, you have complete root access to run any stack including Node.js, Python, Ruby, Go, Docker, PostgreSQL, Redis, and custom microservices. On Web & Cloud plans, PHP 8.x, Git, WP-CLI, and MySQL are standard."
      },
      {
        "q": "What is the 30-day money-back guarantee policy?",
        "a": "Hostinger offers an unconditional 30-day money-back guarantee. If you are not completely satisfied with the speed, uptime, or control panel for any reason within the first 30 days of purchase, you can cancel and receive a full refund with no hassle."
      },
      {
        "q": "How does Hostinger's hPanel compare to traditional cPanel?",
        "a": "hPanel is Hostinger's custom-built control panel. Unlike legacy cPanel which can feel sluggish and complicated for beginners, hPanel is ultra-modern, intuitive, responsive on mobile devices, and significantly faster. It integrates domain management, DNS records, staging, file management, and AI assistance into one cohesive interface."
      },
      {
        "q": "Does Hostinger support SSL certificates and HTTPS encryption?",
        "a": "Yes. Every domain, subdomain, and parked domain hosted on Hostinger receives free, lifetime Let's Encrypt SSL certificates that install and renew automatically. You will never have to pay extra fees for website encryption."
      }
    ],
    "isRtl": false,
    "ctaGetStarted": "立即尊享额外 20% 优惠开启建站",
    "ctaExploreCourses": "探索全栈编程与云开发实操课程",
    "bottomGuarantee": "30 天无条件全额退款保障承诺",
    "bottomInstant": "云端账户秒级自动开通与环境就绪",
    "bottomChat": "7x24 小时全天候 VIP 专属即时客服通道",
    "bottomDisclaimer": "* Hostinger 为独立的高性能云主机提供商。相关推广特惠、域名免费配额及续费规则由 Hostinger 官方直接执行与最终解释。",
    "metricSubTtfb": "LiteSpeed Enterprise 底层极速调优",
    "metricSubCdn": "Cloudflare Enterprise 全球企业级加速节点",
    "metricSubNvme": "企业级纯 NVMe 存储阵列 (RAID-10)",
    "metricSubSec": "Monarx 恶意代码拦截与实时云防火墙"
  },
  "hi": {
    "disclosure": "Safi Academy maintains an official affiliate partnership with Hostinger. When you purchase hosting through our verified referral link or apply coupon code 89LSHAHEEKCO, you receive an exclusive 20% additional discount on your order, and Safi Academy may earn a referral commission at no additional cost to you. This support enables us to continue offering free coding, cloud, and entrepreneurship education globally.",
    "partnerDisclosureBadge": "Transparent Affiliate Disclosure:",
    "heroBadge": "Safi Academy Verified Partner • 20% Off Code: 89LSHAHEEKCO",
    "heroTitle": "Ultra-Fast NVMe Cloud & Next-Gen Web Hosting",
    "heroSubtitle": "Power your websites, web applications, and digital business on world-class infrastructure. Equipped with LiteSpeed Enterprise web servers, enterprise NVMe SSDs, 99.9% uptime SLA, global CDN, and autonomous AI agents.",
    "pill1": "LiteSpeed Enterprise & LSCache Included",
    "pill2": "Free 1-Year Domain & Lifetime Free SSL",
    "pill3": "Automated Daily & Weekly Backups",
    "pill4": "30-Day Money-Back Guarantee",
    "partnerCodeLabel": "Partner Code:",
    "copyCodeBtn": "Copy Code",
    "copiedBtn": "Copied! 20% Applied",
    "claimDiscountBtn": "Claim 20% Discount with Partner Link",
    "comparePlansBtn": "Compare Plans",
    "telemetryTitle": "Hostinger Cloud Telemetry",
    "telemetrySubtitle": "NVMe Tier-3 Infrastructure",
    "telemetryLive": "99.99% Live",
    "metricTtfb": "Server Response (TTFB)",
    "metricUptime": "Uptime Guarantee",
    "metricCdn": "Global Edge CDN",
    "metricAi": "Autonomous AI Debugging",
    "servicesBadge": "Cloud Ecosystem",
    "servicesTitle": "Comprehensive Cloud & Web Hosting Infrastructure",
    "servicesSubtitle": "Explore specialized cloud infrastructure engineered for creators, modern developers, agencies, and enterprise applications.",
    "plansBadge": "Special Partner Pricing",
    "plansTitle": "High-Performance Hosting Tiers",
    "plansSubtitle": "Choose the optimal hosting architecture for your personal brand, digital business, or SaaS platform.",
    "planFilterAll": "All Plans",
    "planFilterWeb": "Web Hosting",
    "planFilterCloud": "Cloud Hosting",
    "planFilterVps": "Cloud VPS",
    "archBadge": "Technical Benchmarks",
    "archTitle": "Enterprise Engineering & Cloud Benchmarks",
    "archSubtitle": "Discover the technical engineering advantages that set Hostinger apart from legacy hosting providers.",
    "stepsBadge": "Simple Activation Guide",
    "stepsTitle": "How to Activate Your 20% Bonus Discount",
    "stepsSubtitle": "Follow these 4 simple steps to lock in your special promotional rate and launch your website in under 2 minutes.",
    "faqsBadge": "Help & Clarifications",
    "faqsTitle": "Frequently Asked Questions",
    "services": [
      {
        "id": "web-hosting",
        "name": "High-Speed Web Hosting",
        "badge": "Most Popular",
        "category": "web",
        "shortDesc": "Optimized LiteSpeed infrastructure built for lightning-fast WordPress and dynamic websites.",
        "longDesc": "Hostinger's flagship web hosting is engineered on top of LiteSpeed Enterprise web servers, replacing slow legacy Apache engines. It incorporates the proprietary LSCache optimization plugin, server-level object caching, and HTTP/3 protocol support to deliver sub-200ms page load times. Perfect for personal blogs, business portfolios, and content websites seeking rock-solid 99.9% uptime with minimal setup overhead.",
        "specs": [
          "LiteSpeed Web Server with LSCache",
          "Free 1-Click WordPress Auto-Installer",
          "Free 1-Year Domain Registration Included",
          "Unlimited Free SSL Certificates",
          "Automated Weekly & Daily Backups",
          "Integrated Git Version Control Deployment"
        ]
      },
      {
        "id": "cloud-hosting",
        "name": "Enterprise Cloud Hosting",
        "badge": "High Performance",
        "category": "cloud",
        "shortDesc": "Isolated virtual containers with dedicated CPU, RAM, and automated instant resource scaling.",
        "longDesc": "Experience the power and stability of a dedicated server combined with the sheer simplicity of shared hosting. Each cloud account runs in an isolated virtual instance with dedicated RAM and vCPU cores. When your site experiences viral spikes, automated resource scaling absorbs the surge seamlessly without slowdowns or dropped connections. Includes a dedicated IP address and custom Cloudflare Enterprise routing.",
        "specs": [
          "Dedicated Virtual Resources (Up to 16GB RAM & 8 Cores)",
          "Dedicated IPv4 & IPv6 Address Included",
          "3x to 4x Faster Speed than Standard Hosting",
          "Built-in Cloudflare Enterprise CDN Protection",
          "Automated Daily Backups with 1-Click Restore",
          "Priority 24/7 VIP Technical Support"
        ]
      },
      {
        "id": "vps-hosting",
        "name": "KVM Cloud VPS Hosting",
        "badge": "Developers & DevOps",
        "category": "vps",
        "shortDesc": "Full root access, dedicated kernel virtualization, high-IOPS NVMe drives, and AI terminal assistance.",
        "longDesc": "Engineered for software engineers, backend developers, and tech leads who demand complete root-level control over their operating environment. Built upon Kernel-based Virtual Machine (KVM) technology, Hostinger VPS guarantees 100% dedicated hardware resource allocation. Deploy Docker containers, configure custom Node.js, Python, Ruby, or Go environments, and leverage the built-in AI Terminal Assistant to formulate Linux commands in seconds.",
        "specs": [
          "Full Root Access & Dedicated Kernel (KVM)",
          "Enterprise-Class NVMe Storage with Ultra-High IOPS",
          "OS Options: Ubuntu, Debian, AlmaLinux, Rocky Linux",
          "Docker, Node.js, Python & Microservices Ready",
          "Automated Weekly Snapshots & Firewall Rules",
          "Built-in AI Assistant for Terminal Configurations"
        ]
      },
      {
        "id": "agency-hosting",
        "name": "Agency Hosting & Hostinger Pro",
        "badge": "Agencies & Freelancers",
        "category": "web",
        "shortDesc": "Manage hundreds of client sites with unified credentials, team collaboration, and client sharing.",
        "longDesc": "Designed specifically for web design agencies, freelancers, and dev shops managing multiple client projects. The Hostinger Pro dashboard allows you to organize clients into workspaces, grant custom role-based permissions, and delegate access without sharing your master passwords. You can also deliver automated maintenance health checks, uptime reports, and white-labeled client experiences.",
        "specs": [
          "Centralized Multi-Client Management Portal",
          "Granular Role-Based Access Control (RBAC)",
          "Access Delegation Without Password Sharing",
          "Automated Client Website Maintenance Reports",
          "Integrated Referral & Commission Payouts",
          "Mass Plugin & Core WordPress Updates in 1-Click"
        ]
      },
      {
        "id": "ai-website-builder",
        "name": "AI Website Builder",
        "badge": "No-Code & Fast",
        "category": "web",
        "shortDesc": "Create stunning, fully responsive websites and e-commerce stores in under 60 seconds using AI.",
        "longDesc": "Transform a short text description into a fully functional, mobile-responsive, production-ready website in under a minute. The Hostinger AI Builder generates tailored layouts, copy, royalty-free images, and interactive contact forms. It includes a built-in AI Heatmap tool to predict visitor gaze patterns, an AI Logo Generator, and a robust e-commerce engine with 0% platform transaction fees.",
        "specs": [
          "Prompt-to-Website Generation in 60 Seconds",
          "Intuitive Drag-and-Drop Visual Canvas",
          "Integrated AI Copywriter & SEO Generator",
          "AI Heatmap for Conversion Rate Optimization",
          "Complete E-Commerce Suite (0% Transaction Fees)",
          "Mobile-First Responsive Layouts by Default"
        ]
      },
      {
        "id": "hostinger-horizons",
        "name": "Hostinger Horizons",
        "badge": "Next-Gen Cloud",
        "category": "cloud",
        "shortDesc": "Next-generation cloud ecosystem and edge deployment network built for the future of the web.",
        "longDesc": "Hostinger Horizons represents the cutting-edge evolution of global web infrastructure. By uniting edge computing, intelligent serverless routing, and globally distributed data caches, Horizons ensures websites load instantaneously regardless of visitor geography. It provides elastic infrastructure that adapts dynamically to emerging web standards, high-throughput media, and AI-driven web applications.",
        "specs": [
          "Next-Generation Edge-Native Architecture",
          "Ultra-Low Global Latency with Anycast Routing",
          "Automatic Elastic Resource Reallocation",
          "Future-Proof Compatibility with Modern Web Frameworks",
          "Tier-3 Globally Certified Data Center Backbone",
          "Continuous Performance & Reliability Tuning"
        ]
      },
      {
        "id": "business-email",
        "name": "Professional Business Email",
        "badge": "Brand Identity",
        "category": "web",
        "shortDesc": "Custom branded email addresses with robust anti-spam, calendar sync, and webmail portals.",
        "longDesc": "Establish immediate corporate credibility by sending messages from your own domain (e.g., name@yourcompany.com). Powered by Titan Email, this suite provides generous inbox storage (10GB to 50GB), advanced multi-layered anti-spam and anti-virus filtering, calendar management, and seamless synchronization across iOS, Android, macOS, and Windows devices.",
        "specs": [
          "Professional Branded Inboxes (@yourdomain.com)",
          "Up to 50GB Dedicated Storage per Mailbox",
          "Multi-Layer Anti-Spam & Zero-Day Threat Shield",
          "Integrated Business Calendar & Contact Manager",
          "Native Mobile Apps for iOS & Android",
          "Automated Email Forwarding & Signature Builder"
        ]
      },
      {
        "id": "reach-email",
        "name": "Reach Email Marketing",
        "badge": "Growth & Lead Gen",
        "category": "web",
        "shortDesc": "Built-in newsletter campaigns, automated drip sequences, and lead capture directly in hPanel.",
        "longDesc": "Nurture leads and convert visitors into repeat customers without paying for costly third-party email platforms. Reach Email Marketing is embedded directly within your hosting dashboard, allowing you to design beautiful newsletters with a drag-and-drop builder, segment subscribers by activity, launch automated welcome sequences, and monitor open and click-through metrics in real time.",
        "specs": [
          "Integrated Directly into Your Hosting Dashboard",
          "Drag-and-Drop Newsletter & Campaign Designer",
          "Automated Drip Sequences & Autoresponders",
          "Real-Time Delivery, Open, and Click Telemetry",
          "High Inbox Deliverability with Pre-Warmed IPs",
          "Seamless Form Integration with WordPress & HTML"
        ]
      },
      {
        "id": "managed-openclaw",
        "name": "Managed OpenClaw Microservices",
        "badge": "High Concurrency",
        "category": "cloud",
        "shortDesc": "Optimized containerized runtime environments for high-throughput background jobs and APIs.",
        "longDesc": "Managed OpenClaw is engineered for heavy computational workloads, background batch jobs, asynchronous task queues, and microservice APIs. It isolates computing processes to ensure zero resource contamination across your applications, giving backend developers an ultra-lean runtime environment optimized for low latency and high concurrent connections.",
        "specs": [
          "Isolated Containerized Microservice Architecture",
          "Optimized for High-Concurrency API Gateways",
          "Low-Overhead Compute Resource Allocation",
          "Continuous Process Health Monitoring & Self-Healing",
          "Integrated Micro-Telemetry & Error Logging",
          "Zero Server Maintenance & Automated Security Patching"
        ]
      },
      {
        "id": "ai-agents",
        "name": "Autonomous AI Hosting Agents",
        "badge": "Next-Gen AI",
        "category": "cloud",
        "shortDesc": "Intelligent in-dashboard agents that debug errors, optimize queries, and automate server management.",
        "longDesc": "Hostinger has integrated autonomous AI agents directly into hPanel. Need to identify why a WordPress plugin caused a critical error? The AI Agent analyzes error logs and suggests the exact fix. Need to optimize slow database queries, configure custom redirects, or generate .htaccess rewrite rules? Simply instruct the AI in natural language to execute the configuration safely.",
        "specs": [
          "Automated WordPress Plugin Conflict Diagnostics",
          "Natural Language .htaccess & Nginx Rule Generation",
          "Slow MySQL Query Detection & Indexing Advice",
          "Automated On-Page SEO Recommendations",
          "Terminal Command Generation for VPS Users",
          "24/7 Instant In-Dashboard Assistance"
        ]
      }
    ],
    "plans": [
      {
        "name": "प्रीमियम वेब होस्टिंग",
        "tagline": "व्यक्तिगत वेबसाइटों, ब्लॉग्स और छात्र प्रोजेक्ट्स के लिए सर्वोत्तम",
        "price": "$2.99",
        "period": "/month",
        "savings": "75% छूट + 20% पार्टनर अतिरिक्त छूट",
        "popular": false,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "100 GB SSD"
          },
          {
            "label": "Performance",
            "val": "Standard LiteSpeed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Weekly Automated"
          },
          {
            "label": "Email",
            "val": "Free Business Email"
          },
          {
            "label": "AI Tools",
            "val": "Basic AI Website Builder"
          }
        ],
        "ctaText": "प्रीमियम प्लान चुनें"
      },
      {
        "name": "बिजनेस वेब होस्टिंग",
        "tagline": "व्यवसायों, स्टार्टअप्स और ऑनलाइन स्टोर के लिए अनुशंसित",
        "price": "$3.99",
        "period": "/month",
        "savings": "73% छूट + 20% पार्टनर अतिरिक्त छूट",
        "popular": true,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB Ultra NVMe (5x Faster)"
          },
          {
            "label": "Performance",
            "val": "Up to 5x Increased Speed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Daily & On-Demand Backups"
          },
          {
            "label": "CDN",
            "val": "Free Built-in CDN Included"
          },
          {
            "label": "Staging",
            "val": "1-Click WordPress Staging Tool"
          },
          {
            "label": "AI Tools",
            "val": "Full AI Website Builder Suite"
          }
        ],
        "ctaText": "बिजनेस प्लान चुनें"
      },
      {
        "name": "क्लाउड स्टार्टअप",
        "tagline": "उच्च ट्रैफ़िक और स्केलेबल अनुप्रयोगों के लिए समर्पित संसाधन",
        "price": "$9.99",
        "period": "/month",
        "savings": "60% छूट + 20% पार्टनर अतिरिक्त छूट",
        "popular": false,
        "category": "cloud",
        "specs": [
          {
            "label": "Websites",
            "val": "300 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB NVMe Storage"
          },
          {
            "label": "RAM / CPU",
            "val": "3 GB RAM + 2 CPU Cores (Dedicated)"
          },
          {
            "label": "Performance",
            "val": "Up to 10x Boosted Speed"
          },
          {
            "label": "IP Address",
            "val": "Dedicated IP Address Included"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain"
          },
          {
            "label": "Backups",
            "val": "Automated Daily Backups"
          },
          {
            "label": "CDN",
            "val": "Cloudflare Enterprise CDN"
          },
          {
            "label": "Support",
            "val": "Priority 24/7 VIP Support Queue"
          }
        ],
        "ctaText": "क्लाउड स्टार्टअप चुनें"
      },
      {
        "name": "KVM 2 क्लाउड VPS",
        "tagline": "डेवलपर्स और इंजीनियरों के लिए पूर्ण रूट एक्सेस सर्वर",
        "price": "$7.99",
        "period": "/month",
        "savings": "55% छूट + 20% पार्टनर अतिरिक्त छूट",
        "popular": false,
        "category": "vps",
        "specs": [
          {
            "label": "CPU",
            "val": "2 Dedicated vCPU Cores"
          },
          {
            "label": "RAM",
            "val": "8 GB Dedicated RAM"
          },
          {
            "label": "Storage",
            "val": "100 GB High-IOPS NVMe"
          },
          {
            "label": "Bandwidth",
            "val": "8 TB High-Speed Traffic"
          },
          {
            "label": "Access",
            "val": "Full Root Administrative Access"
          },
          {
            "label": "Virtualization",
            "val": "100% Kernel-based (KVM)"
          },
          {
            "label": "Backups",
            "val": "Automated Weekly Snapshots"
          },
          {
            "label": "AI Terminal",
            "val": "AI Assistant for Linux Commands"
          },
          {
            "label": "OS Support",
            "val": "Ubuntu, Debian, AlmaLinux, Rocky"
          }
        ],
        "ctaText": "KVM VPS चुनें"
      }
    ],
    "architectureHighlights": [
      {
        "title": "LiteSpeed Enterprise vs. Apache",
        "desc": "Unlike budget hosts that still use 20-year-old Apache software, Hostinger utilizes LiteSpeed Enterprise web servers. LiteSpeed processes static and dynamic requests simultaneously through event-driven architecture, reducing RAM usage and serving WordPress pages up to 500% faster.",
        "metric": "5x Faster TTFB"
      },
      {
        "title": "Global Tier-3 Data Centers",
        "desc": "Deploy your site closest to your target audience. Choose from global enterprise data center locations across the United States, United Kingdom, France, Netherlands, Lithuania, Singapore, India, and Brazil. Switch data center locations anytime with a single click.",
        "metric": "8 Global Regions"
      },
      {
        "title": "Multi-Layer Defensive Security",
        "desc": "Every website is shielded behind custom Web Application Firewalls (WAF), Cloudflare DDoS mitigation, automated SSL encryption, and Monarx real-time malware scanning that neutralizes malicious scripts before they execute.",
        "metric": "99.9% Uptime SLA"
      },
      {
        "title": "Next-Gen hPanel Control Center",
        "desc": "Forget clumsy, outdated cPanel interfaces. Hostinger custom-engineered hPanel to be clean, responsive, and intuitive. Manage DNS, create databases, install SSL certificates, set up staging sites, and access file managers in seconds.",
        "metric": "3x Faster Navigation"
      },
      {
        "title": "Automated Snapshot & Daily Backups",
        "desc": "Never worry about catastrophic data loss. Websites are backed up automatically with point-in-time restore capabilities. If an update breaks your website, roll back to an earlier version with a single click in your dashboard.",
        "metric": "Zero-Downtime Restores"
      },
      {
        "title": "Developer & Staging Toolkit",
        "desc": "Equipped with modern developer tooling including Git integration, WP-CLI, SSH access, PHP version switcher (from PHP 7.4 to PHP 8.3+), MySQL/phpMyAdmin access, and a one-click staging environment to test changes safely.",
        "metric": "Dev-Ready Stack"
      }
    ],
    "launchSteps": [
      {
        "step": "01",
        "title": "Click Safi Academy's Partner Link",
        "desc": "Access the exclusive portal using our verified referral URL to unlock special promotional pricing with up to 75% standard discount plus our 20% bonus."
      },
      {
        "step": "02",
        "title": "Select Your Preferred Plan",
        "desc": "Choose between Web Hosting (for blogs/portfolios), Cloud Hosting (for high-traffic businesses), or KVM VPS (for developers requiring root access)."
      },
      {
        "step": "03",
        "title": "Apply Code 89LSHAHEEKCO at Checkout",
        "desc": "Ensure the referral code 89LSHAHEEKCO is present in the coupon field to automatically lock in your additional 20% discount on your order."
      },
      {
        "step": "04",
        "title": "Claim Free Domain & Deploy in 60s",
        "desc": "Claim your free 1-year custom domain name (.com, .net, .org, etc.) and launch your site using the 1-click WordPress installer or the AI Website Builder."
      }
    ],
    "faqs": [
      {
        "q": "How do I claim the 20% discount using the referral code?",
        "a": "Simply click any of the 'Claim 20% Discount' or 'Get Started' buttons on this page. The referral code 89LSHAHEEKCO will be automatically appended to your checkout session. You can also copy the code directly using our 1-click coupon widget and paste it into the coupon code box during checkout at Hostinger.com to verify your 20% savings."
      },
      {
        "q": "Is the free domain name really included at no cost?",
        "a": "Yes! When you purchase any 12, 24, or 48-month Premium, Business, or Cloud hosting plan, Hostinger includes a free custom domain registration for your first full year. Popular extensions like .com, .net, .org, .online, and .tech are fully eligible."
      },
      {
        "q": "Can I migrate my existing website from another hosting provider for free?",
        "a": "Yes, 100% free. Hostinger provides an automated website migration service. Once you sign up, simply enter your current host's login details or WordPress URL in hPanel, and Hostinger's migration engineers and automated tools will transfer your entire site, databases, and emails with zero downtime."
      },
      {
        "q": "What is the difference between Web Hosting, Cloud Hosting, and VPS?",
        "a": "Web Hosting shares server hardware efficiently, making it the most affordable choice for personal sites and small businesses. Cloud Hosting isolates dedicated CPU and RAM resources within a virtual container, delivering 3x faster speeds and high redundancy for growing businesses. VPS (Virtual Private Server) provides full root administrative access, allowing developers to install custom operating systems, Docker containers, and complex backend APIs."
      },
      {
        "q": "Can I run modern programming languages like Node.js, Python, and Docker?",
        "a": "Yes. On KVM VPS plans, you have complete root access to run any stack including Node.js, Python, Ruby, Go, Docker, PostgreSQL, Redis, and custom microservices. On Web & Cloud plans, PHP 8.x, Git, WP-CLI, and MySQL are standard."
      },
      {
        "q": "What is the 30-day money-back guarantee policy?",
        "a": "Hostinger offers an unconditional 30-day money-back guarantee. If you are not completely satisfied with the speed, uptime, or control panel for any reason within the first 30 days of purchase, you can cancel and receive a full refund with no hassle."
      },
      {
        "q": "How does Hostinger's hPanel compare to traditional cPanel?",
        "a": "hPanel is Hostinger's custom-built control panel. Unlike legacy cPanel which can feel sluggish and complicated for beginners, hPanel is ultra-modern, intuitive, responsive on mobile devices, and significantly faster. It integrates domain management, DNS records, staging, file management, and AI assistance into one cohesive interface."
      },
      {
        "q": "Does Hostinger support SSL certificates and HTTPS encryption?",
        "a": "Yes. Every domain, subdomain, and parked domain hosted on Hostinger receives free, lifetime Let's Encrypt SSL certificates that install and renew automatically. You will never have to pay extra fees for website encryption."
      }
    ],
    "isRtl": false,
    "ctaGetStarted": "अतिरिक्त 20% छूट के साथ शुरुआत करें",
    "ctaExploreCourses": "कोडिंग और वेब डेवलपमेंट कोर्स देखें",
    "bottomGuarantee": "30 दिनों की बिना शर्त पैसे वापसी की गारंटी",
    "bottomInstant": "कुछ ही सेकंड में क्लाउड अकाउंट सक्रियण",
    "bottomChat": "24/7 प्राथमिकता लाइव चैट सहायता",
    "bottomDisclaimer": "* Hostinger एक स्वतंत्र क्लाउड होस्टिंग प्रदाता है। प्रचार छूट, डोमेन उपलब्धता और नवीनीकरण की शर्तें सीधे Hostinger द्वारा प्रबंधित की जाती हैं।",
    "metricSubTtfb": "LiteSpeed Enterprise द्वारा अनुकूलित",
    "metricSubCdn": "Cloudflare Enterprise वैश्विक CDN",
    "metricSubNvme": "एंटरप्राइज NVMe स्टोरेज (RAID-10)",
    "metricSubSec": "Monarx और WAF द्वारा लाइव सुरक्षा"
  },
  "it": {
    "disclosure": "Safi Academy maintains an official affiliate partnership with Hostinger. When you purchase hosting through our verified referral link or apply coupon code 89LSHAHEEKCO, you receive an exclusive 20% additional discount on your order, and Safi Academy may earn a referral commission at no additional cost to you. This support enables us to continue offering free coding, cloud, and entrepreneurship education globally.",
    "partnerDisclosureBadge": "Transparent Affiliate Disclosure:",
    "heroBadge": "Safi Academy Verified Partner • 20% Off Code: 89LSHAHEEKCO",
    "heroTitle": "Ultra-Fast NVMe Cloud & Next-Gen Web Hosting",
    "heroSubtitle": "Power your websites, web applications, and digital business on world-class infrastructure. Equipped with LiteSpeed Enterprise web servers, enterprise NVMe SSDs, 99.9% uptime SLA, global CDN, and autonomous AI agents.",
    "pill1": "LiteSpeed Enterprise & LSCache Included",
    "pill2": "Free 1-Year Domain & Lifetime Free SSL",
    "pill3": "Automated Daily & Weekly Backups",
    "pill4": "30-Day Money-Back Guarantee",
    "partnerCodeLabel": "Partner Code:",
    "copyCodeBtn": "Copy Code",
    "copiedBtn": "Copied! 20% Applied",
    "claimDiscountBtn": "Claim 20% Discount with Partner Link",
    "comparePlansBtn": "Compare Plans",
    "telemetryTitle": "Hostinger Cloud Telemetry",
    "telemetrySubtitle": "NVMe Tier-3 Infrastructure",
    "telemetryLive": "99.99% Live",
    "metricTtfb": "Server Response (TTFB)",
    "metricUptime": "Uptime Guarantee",
    "metricCdn": "Global Edge CDN",
    "metricAi": "Autonomous AI Debugging",
    "servicesBadge": "Cloud Ecosystem",
    "servicesTitle": "Comprehensive Cloud & Web Hosting Infrastructure",
    "servicesSubtitle": "Explore specialized cloud infrastructure engineered for creators, modern developers, agencies, and enterprise applications.",
    "plansBadge": "Special Partner Pricing",
    "plansTitle": "High-Performance Hosting Tiers",
    "plansSubtitle": "Choose the optimal hosting architecture for your personal brand, digital business, or SaaS platform.",
    "planFilterAll": "All Plans",
    "planFilterWeb": "Web Hosting",
    "planFilterCloud": "Cloud Hosting",
    "planFilterVps": "Cloud VPS",
    "archBadge": "Technical Benchmarks",
    "archTitle": "Enterprise Engineering & Cloud Benchmarks",
    "archSubtitle": "Discover the technical engineering advantages that set Hostinger apart from legacy hosting providers.",
    "stepsBadge": "Simple Activation Guide",
    "stepsTitle": "How to Activate Your 20% Bonus Discount",
    "stepsSubtitle": "Follow these 4 simple steps to lock in your special promotional rate and launch your website in under 2 minutes.",
    "faqsBadge": "Help & Clarifications",
    "faqsTitle": "Frequently Asked Questions",
    "services": [
      {
        "id": "web-hosting",
        "name": "High-Speed Web Hosting",
        "badge": "Most Popular",
        "category": "web",
        "shortDesc": "Optimized LiteSpeed infrastructure built for lightning-fast WordPress and dynamic websites.",
        "longDesc": "Hostinger's flagship web hosting is engineered on top of LiteSpeed Enterprise web servers, replacing slow legacy Apache engines. It incorporates the proprietary LSCache optimization plugin, server-level object caching, and HTTP/3 protocol support to deliver sub-200ms page load times. Perfect for personal blogs, business portfolios, and content websites seeking rock-solid 99.9% uptime with minimal setup overhead.",
        "specs": [
          "LiteSpeed Web Server with LSCache",
          "Free 1-Click WordPress Auto-Installer",
          "Free 1-Year Domain Registration Included",
          "Unlimited Free SSL Certificates",
          "Automated Weekly & Daily Backups",
          "Integrated Git Version Control Deployment"
        ]
      },
      {
        "id": "cloud-hosting",
        "name": "Enterprise Cloud Hosting",
        "badge": "High Performance",
        "category": "cloud",
        "shortDesc": "Isolated virtual containers with dedicated CPU, RAM, and automated instant resource scaling.",
        "longDesc": "Experience the power and stability of a dedicated server combined with the sheer simplicity of shared hosting. Each cloud account runs in an isolated virtual instance with dedicated RAM and vCPU cores. When your site experiences viral spikes, automated resource scaling absorbs the surge seamlessly without slowdowns or dropped connections. Includes a dedicated IP address and custom Cloudflare Enterprise routing.",
        "specs": [
          "Dedicated Virtual Resources (Up to 16GB RAM & 8 Cores)",
          "Dedicated IPv4 & IPv6 Address Included",
          "3x to 4x Faster Speed than Standard Hosting",
          "Built-in Cloudflare Enterprise CDN Protection",
          "Automated Daily Backups with 1-Click Restore",
          "Priority 24/7 VIP Technical Support"
        ]
      },
      {
        "id": "vps-hosting",
        "name": "KVM Cloud VPS Hosting",
        "badge": "Developers & DevOps",
        "category": "vps",
        "shortDesc": "Full root access, dedicated kernel virtualization, high-IOPS NVMe drives, and AI terminal assistance.",
        "longDesc": "Engineered for software engineers, backend developers, and tech leads who demand complete root-level control over their operating environment. Built upon Kernel-based Virtual Machine (KVM) technology, Hostinger VPS guarantees 100% dedicated hardware resource allocation. Deploy Docker containers, configure custom Node.js, Python, Ruby, or Go environments, and leverage the built-in AI Terminal Assistant to formulate Linux commands in seconds.",
        "specs": [
          "Full Root Access & Dedicated Kernel (KVM)",
          "Enterprise-Class NVMe Storage with Ultra-High IOPS",
          "OS Options: Ubuntu, Debian, AlmaLinux, Rocky Linux",
          "Docker, Node.js, Python & Microservices Ready",
          "Automated Weekly Snapshots & Firewall Rules",
          "Built-in AI Assistant for Terminal Configurations"
        ]
      },
      {
        "id": "agency-hosting",
        "name": "Agency Hosting & Hostinger Pro",
        "badge": "Agencies & Freelancers",
        "category": "web",
        "shortDesc": "Manage hundreds of client sites with unified credentials, team collaboration, and client sharing.",
        "longDesc": "Designed specifically for web design agencies, freelancers, and dev shops managing multiple client projects. The Hostinger Pro dashboard allows you to organize clients into workspaces, grant custom role-based permissions, and delegate access without sharing your master passwords. You can also deliver automated maintenance health checks, uptime reports, and white-labeled client experiences.",
        "specs": [
          "Centralized Multi-Client Management Portal",
          "Granular Role-Based Access Control (RBAC)",
          "Access Delegation Without Password Sharing",
          "Automated Client Website Maintenance Reports",
          "Integrated Referral & Commission Payouts",
          "Mass Plugin & Core WordPress Updates in 1-Click"
        ]
      },
      {
        "id": "ai-website-builder",
        "name": "AI Website Builder",
        "badge": "No-Code & Fast",
        "category": "web",
        "shortDesc": "Create stunning, fully responsive websites and e-commerce stores in under 60 seconds using AI.",
        "longDesc": "Transform a short text description into a fully functional, mobile-responsive, production-ready website in under a minute. The Hostinger AI Builder generates tailored layouts, copy, royalty-free images, and interactive contact forms. It includes a built-in AI Heatmap tool to predict visitor gaze patterns, an AI Logo Generator, and a robust e-commerce engine with 0% platform transaction fees.",
        "specs": [
          "Prompt-to-Website Generation in 60 Seconds",
          "Intuitive Drag-and-Drop Visual Canvas",
          "Integrated AI Copywriter & SEO Generator",
          "AI Heatmap for Conversion Rate Optimization",
          "Complete E-Commerce Suite (0% Transaction Fees)",
          "Mobile-First Responsive Layouts by Default"
        ]
      },
      {
        "id": "hostinger-horizons",
        "name": "Hostinger Horizons",
        "badge": "Next-Gen Cloud",
        "category": "cloud",
        "shortDesc": "Next-generation cloud ecosystem and edge deployment network built for the future of the web.",
        "longDesc": "Hostinger Horizons represents the cutting-edge evolution of global web infrastructure. By uniting edge computing, intelligent serverless routing, and globally distributed data caches, Horizons ensures websites load instantaneously regardless of visitor geography. It provides elastic infrastructure that adapts dynamically to emerging web standards, high-throughput media, and AI-driven web applications.",
        "specs": [
          "Next-Generation Edge-Native Architecture",
          "Ultra-Low Global Latency with Anycast Routing",
          "Automatic Elastic Resource Reallocation",
          "Future-Proof Compatibility with Modern Web Frameworks",
          "Tier-3 Globally Certified Data Center Backbone",
          "Continuous Performance & Reliability Tuning"
        ]
      },
      {
        "id": "business-email",
        "name": "Professional Business Email",
        "badge": "Brand Identity",
        "category": "web",
        "shortDesc": "Custom branded email addresses with robust anti-spam, calendar sync, and webmail portals.",
        "longDesc": "Establish immediate corporate credibility by sending messages from your own domain (e.g., name@yourcompany.com). Powered by Titan Email, this suite provides generous inbox storage (10GB to 50GB), advanced multi-layered anti-spam and anti-virus filtering, calendar management, and seamless synchronization across iOS, Android, macOS, and Windows devices.",
        "specs": [
          "Professional Branded Inboxes (@yourdomain.com)",
          "Up to 50GB Dedicated Storage per Mailbox",
          "Multi-Layer Anti-Spam & Zero-Day Threat Shield",
          "Integrated Business Calendar & Contact Manager",
          "Native Mobile Apps for iOS & Android",
          "Automated Email Forwarding & Signature Builder"
        ]
      },
      {
        "id": "reach-email",
        "name": "Reach Email Marketing",
        "badge": "Growth & Lead Gen",
        "category": "web",
        "shortDesc": "Built-in newsletter campaigns, automated drip sequences, and lead capture directly in hPanel.",
        "longDesc": "Nurture leads and convert visitors into repeat customers without paying for costly third-party email platforms. Reach Email Marketing is embedded directly within your hosting dashboard, allowing you to design beautiful newsletters with a drag-and-drop builder, segment subscribers by activity, launch automated welcome sequences, and monitor open and click-through metrics in real time.",
        "specs": [
          "Integrated Directly into Your Hosting Dashboard",
          "Drag-and-Drop Newsletter & Campaign Designer",
          "Automated Drip Sequences & Autoresponders",
          "Real-Time Delivery, Open, and Click Telemetry",
          "High Inbox Deliverability with Pre-Warmed IPs",
          "Seamless Form Integration with WordPress & HTML"
        ]
      },
      {
        "id": "managed-openclaw",
        "name": "Managed OpenClaw Microservices",
        "badge": "High Concurrency",
        "category": "cloud",
        "shortDesc": "Optimized containerized runtime environments for high-throughput background jobs and APIs.",
        "longDesc": "Managed OpenClaw is engineered for heavy computational workloads, background batch jobs, asynchronous task queues, and microservice APIs. It isolates computing processes to ensure zero resource contamination across your applications, giving backend developers an ultra-lean runtime environment optimized for low latency and high concurrent connections.",
        "specs": [
          "Isolated Containerized Microservice Architecture",
          "Optimized for High-Concurrency API Gateways",
          "Low-Overhead Compute Resource Allocation",
          "Continuous Process Health Monitoring & Self-Healing",
          "Integrated Micro-Telemetry & Error Logging",
          "Zero Server Maintenance & Automated Security Patching"
        ]
      },
      {
        "id": "ai-agents",
        "name": "Autonomous AI Hosting Agents",
        "badge": "Next-Gen AI",
        "category": "cloud",
        "shortDesc": "Intelligent in-dashboard agents that debug errors, optimize queries, and automate server management.",
        "longDesc": "Hostinger has integrated autonomous AI agents directly into hPanel. Need to identify why a WordPress plugin caused a critical error? The AI Agent analyzes error logs and suggests the exact fix. Need to optimize slow database queries, configure custom redirects, or generate .htaccess rewrite rules? Simply instruct the AI in natural language to execute the configuration safely.",
        "specs": [
          "Automated WordPress Plugin Conflict Diagnostics",
          "Natural Language .htaccess & Nginx Rule Generation",
          "Slow MySQL Query Detection & Indexing Advice",
          "Automated On-Page SEO Recommendations",
          "Terminal Command Generation for VPS Users",
          "24/7 Instant In-Dashboard Assistance"
        ]
      }
    ],
    "plans": [
      {
        "name": "Hosting Web Premium",
        "tagline": "Ideale per siti web personali, blog e progetti universitari",
        "price": "$2.99",
        "period": "/month",
        "savings": "Risparmia il 75% + 20% sconto partner",
        "popular": false,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "100 GB SSD"
          },
          {
            "label": "Performance",
            "val": "Standard LiteSpeed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Weekly Automated"
          },
          {
            "label": "Email",
            "val": "Free Business Email"
          },
          {
            "label": "AI Tools",
            "val": "Basic AI Website Builder"
          }
        ],
        "ctaText": "Scegli il piano Premium"
      },
      {
        "name": "Hosting Web Business",
        "tagline": "Consigliato per aziende, professionisti e negozi e-commerce",
        "price": "$3.99",
        "period": "/month",
        "savings": "Risparmia il 73% + 20% sconto partner",
        "popular": true,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB Ultra NVMe (5x Faster)"
          },
          {
            "label": "Performance",
            "val": "Up to 5x Increased Speed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Daily & On-Demand Backups"
          },
          {
            "label": "CDN",
            "val": "Free Built-in CDN Included"
          },
          {
            "label": "Staging",
            "val": "1-Click WordPress Staging Tool"
          },
          {
            "label": "AI Tools",
            "val": "Full AI Website Builder Suite"
          }
        ],
        "ctaText": "Scegli il piano Business"
      },
      {
        "name": "Cloud Startup",
        "tagline": "Risorse dedicate per applicazioni scalabili ad alto traffico",
        "price": "$9.99",
        "period": "/month",
        "savings": "Risparmia il 60% + 20% sconto partner",
        "popular": false,
        "category": "cloud",
        "specs": [
          {
            "label": "Websites",
            "val": "300 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB NVMe Storage"
          },
          {
            "label": "RAM / CPU",
            "val": "3 GB RAM + 2 CPU Cores (Dedicated)"
          },
          {
            "label": "Performance",
            "val": "Up to 10x Boosted Speed"
          },
          {
            "label": "IP Address",
            "val": "Dedicated IP Address Included"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain"
          },
          {
            "label": "Backups",
            "val": "Automated Daily Backups"
          },
          {
            "label": "CDN",
            "val": "Cloudflare Enterprise CDN"
          },
          {
            "label": "Support",
            "val": "Priority 24/7 VIP Support Queue"
          }
        ],
        "ctaText": "Scegli Cloud Startup"
      },
      {
        "name": "VPS Cloud KVM 2",
        "tagline": "Potenza con accesso root completo per sviluppatori e ingegneri",
        "price": "$7.99",
        "period": "/month",
        "savings": "Risparmia il 55% + 20% sconto partner",
        "popular": false,
        "category": "vps",
        "specs": [
          {
            "label": "CPU",
            "val": "2 Dedicated vCPU Cores"
          },
          {
            "label": "RAM",
            "val": "8 GB Dedicated RAM"
          },
          {
            "label": "Storage",
            "val": "100 GB High-IOPS NVMe"
          },
          {
            "label": "Bandwidth",
            "val": "8 TB High-Speed Traffic"
          },
          {
            "label": "Access",
            "val": "Full Root Administrative Access"
          },
          {
            "label": "Virtualization",
            "val": "100% Kernel-based (KVM)"
          },
          {
            "label": "Backups",
            "val": "Automated Weekly Snapshots"
          },
          {
            "label": "AI Terminal",
            "val": "AI Assistant for Linux Commands"
          },
          {
            "label": "OS Support",
            "val": "Ubuntu, Debian, AlmaLinux, Rocky"
          }
        ],
        "ctaText": "Scegli VPS KVM"
      }
    ],
    "architectureHighlights": [
      {
        "title": "LiteSpeed Enterprise vs. Apache",
        "desc": "Unlike budget hosts that still use 20-year-old Apache software, Hostinger utilizes LiteSpeed Enterprise web servers. LiteSpeed processes static and dynamic requests simultaneously through event-driven architecture, reducing RAM usage and serving WordPress pages up to 500% faster.",
        "metric": "5x Faster TTFB"
      },
      {
        "title": "Global Tier-3 Data Centers",
        "desc": "Deploy your site closest to your target audience. Choose from global enterprise data center locations across the United States, United Kingdom, France, Netherlands, Lithuania, Singapore, India, and Brazil. Switch data center locations anytime with a single click.",
        "metric": "8 Global Regions"
      },
      {
        "title": "Multi-Layer Defensive Security",
        "desc": "Every website is shielded behind custom Web Application Firewalls (WAF), Cloudflare DDoS mitigation, automated SSL encryption, and Monarx real-time malware scanning that neutralizes malicious scripts before they execute.",
        "metric": "99.9% Uptime SLA"
      },
      {
        "title": "Next-Gen hPanel Control Center",
        "desc": "Forget clumsy, outdated cPanel interfaces. Hostinger custom-engineered hPanel to be clean, responsive, and intuitive. Manage DNS, create databases, install SSL certificates, set up staging sites, and access file managers in seconds.",
        "metric": "3x Faster Navigation"
      },
      {
        "title": "Automated Snapshot & Daily Backups",
        "desc": "Never worry about catastrophic data loss. Websites are backed up automatically with point-in-time restore capabilities. If an update breaks your website, roll back to an earlier version with a single click in your dashboard.",
        "metric": "Zero-Downtime Restores"
      },
      {
        "title": "Developer & Staging Toolkit",
        "desc": "Equipped with modern developer tooling including Git integration, WP-CLI, SSH access, PHP version switcher (from PHP 7.4 to PHP 8.3+), MySQL/phpMyAdmin access, and a one-click staging environment to test changes safely.",
        "metric": "Dev-Ready Stack"
      }
    ],
    "launchSteps": [
      {
        "step": "01",
        "title": "Click Safi Academy's Partner Link",
        "desc": "Access the exclusive portal using our verified referral URL to unlock special promotional pricing with up to 75% standard discount plus our 20% bonus."
      },
      {
        "step": "02",
        "title": "Select Your Preferred Plan",
        "desc": "Choose between Web Hosting (for blogs/portfolios), Cloud Hosting (for high-traffic businesses), or KVM VPS (for developers requiring root access)."
      },
      {
        "step": "03",
        "title": "Apply Code 89LSHAHEEKCO at Checkout",
        "desc": "Ensure the referral code 89LSHAHEEKCO is present in the coupon field to automatically lock in your additional 20% discount on your order."
      },
      {
        "step": "04",
        "title": "Claim Free Domain & Deploy in 60s",
        "desc": "Claim your free 1-year custom domain name (.com, .net, .org, etc.) and launch your site using the 1-click WordPress installer or the AI Website Builder."
      }
    ],
    "faqs": [
      {
        "q": "How do I claim the 20% discount using the referral code?",
        "a": "Simply click any of the 'Claim 20% Discount' or 'Get Started' buttons on this page. The referral code 89LSHAHEEKCO will be automatically appended to your checkout session. You can also copy the code directly using our 1-click coupon widget and paste it into the coupon code box during checkout at Hostinger.com to verify your 20% savings."
      },
      {
        "q": "Is the free domain name really included at no cost?",
        "a": "Yes! When you purchase any 12, 24, or 48-month Premium, Business, or Cloud hosting plan, Hostinger includes a free custom domain registration for your first full year. Popular extensions like .com, .net, .org, .online, and .tech are fully eligible."
      },
      {
        "q": "Can I migrate my existing website from another hosting provider for free?",
        "a": "Yes, 100% free. Hostinger provides an automated website migration service. Once you sign up, simply enter your current host's login details or WordPress URL in hPanel, and Hostinger's migration engineers and automated tools will transfer your entire site, databases, and emails with zero downtime."
      },
      {
        "q": "What is the difference between Web Hosting, Cloud Hosting, and VPS?",
        "a": "Web Hosting shares server hardware efficiently, making it the most affordable choice for personal sites and small businesses. Cloud Hosting isolates dedicated CPU and RAM resources within a virtual container, delivering 3x faster speeds and high redundancy for growing businesses. VPS (Virtual Private Server) provides full root administrative access, allowing developers to install custom operating systems, Docker containers, and complex backend APIs."
      },
      {
        "q": "Can I run modern programming languages like Node.js, Python, and Docker?",
        "a": "Yes. On KVM VPS plans, you have complete root access to run any stack including Node.js, Python, Ruby, Go, Docker, PostgreSQL, Redis, and custom microservices. On Web & Cloud plans, PHP 8.x, Git, WP-CLI, and MySQL are standard."
      },
      {
        "q": "What is the 30-day money-back guarantee policy?",
        "a": "Hostinger offers an unconditional 30-day money-back guarantee. If you are not completely satisfied with the speed, uptime, or control panel for any reason within the first 30 days of purchase, you can cancel and receive a full refund with no hassle."
      },
      {
        "q": "How does Hostinger's hPanel compare to traditional cPanel?",
        "a": "hPanel is Hostinger's custom-built control panel. Unlike legacy cPanel which can feel sluggish and complicated for beginners, hPanel is ultra-modern, intuitive, responsive on mobile devices, and significantly faster. It integrates domain management, DNS records, staging, file management, and AI assistance into one cohesive interface."
      },
      {
        "q": "Does Hostinger support SSL certificates and HTTPS encryption?",
        "a": "Yes. Every domain, subdomain, and parked domain hosted on Hostinger receives free, lifetime Let's Encrypt SSL certificates that install and renew automatically. You will never have to pay extra fees for website encryption."
      }
    ],
    "isRtl": false,
    "ctaGetStarted": "Inizia con il 20% di sconto",
    "ctaExploreCourses": "Scopri i corsi di programmazione",
    "bottomGuarantee": "Garanzia di rimborso incondizionata di 30 giorni",
    "bottomInstant": "Attivazione immediata dell'account cloud",
    "bottomChat": "Assistenza prioritaria in chat 24/7",
    "bottomDisclaimer": "* Hostinger è un provider di hosting cloud indipendente. Gli sconti promozionali, la disponibilità dei domini e i rinnovi sono gestiti direttamente da Hostinger.",
    "metricSubTtfb": "Ottimizzato con LiteSpeed Enterprise",
    "metricSubCdn": "Cloudflare Enterprise Global CDN",
    "metricSubNvme": "Archiviazione Enterprise NVMe (RAID-10)",
    "metricSubSec": "Sicurezza in tempo reale con Monarx e WAF"
  },
  "pt": {
    "disclosure": "Safi Academy maintains an official affiliate partnership with Hostinger. When you purchase hosting through our verified referral link or apply coupon code 89LSHAHEEKCO, you receive an exclusive 20% additional discount on your order, and Safi Academy may earn a referral commission at no additional cost to you. This support enables us to continue offering free coding, cloud, and entrepreneurship education globally.",
    "partnerDisclosureBadge": "Transparent Affiliate Disclosure:",
    "heroBadge": "Safi Academy Verified Partner • 20% Off Code: 89LSHAHEEKCO",
    "heroTitle": "Ultra-Fast NVMe Cloud & Next-Gen Web Hosting",
    "heroSubtitle": "Power your websites, web applications, and digital business on world-class infrastructure. Equipped with LiteSpeed Enterprise web servers, enterprise NVMe SSDs, 99.9% uptime SLA, global CDN, and autonomous AI agents.",
    "pill1": "LiteSpeed Enterprise & LSCache Included",
    "pill2": "Free 1-Year Domain & Lifetime Free SSL",
    "pill3": "Automated Daily & Weekly Backups",
    "pill4": "30-Day Money-Back Guarantee",
    "partnerCodeLabel": "Partner Code:",
    "copyCodeBtn": "Copy Code",
    "copiedBtn": "Copied! 20% Applied",
    "claimDiscountBtn": "Claim 20% Discount with Partner Link",
    "comparePlansBtn": "Compare Plans",
    "telemetryTitle": "Hostinger Cloud Telemetry",
    "telemetrySubtitle": "NVMe Tier-3 Infrastructure",
    "telemetryLive": "99.99% Live",
    "metricTtfb": "Server Response (TTFB)",
    "metricUptime": "Uptime Guarantee",
    "metricCdn": "Global Edge CDN",
    "metricAi": "Autonomous AI Debugging",
    "servicesBadge": "Cloud Ecosystem",
    "servicesTitle": "Comprehensive Cloud & Web Hosting Infrastructure",
    "servicesSubtitle": "Explore specialized cloud infrastructure engineered for creators, modern developers, agencies, and enterprise applications.",
    "plansBadge": "Special Partner Pricing",
    "plansTitle": "High-Performance Hosting Tiers",
    "plansSubtitle": "Choose the optimal hosting architecture for your personal brand, digital business, or SaaS platform.",
    "planFilterAll": "All Plans",
    "planFilterWeb": "Web Hosting",
    "planFilterCloud": "Cloud Hosting",
    "planFilterVps": "Cloud VPS",
    "archBadge": "Technical Benchmarks",
    "archTitle": "Enterprise Engineering & Cloud Benchmarks",
    "archSubtitle": "Discover the technical engineering advantages that set Hostinger apart from legacy hosting providers.",
    "stepsBadge": "Simple Activation Guide",
    "stepsTitle": "How to Activate Your 20% Bonus Discount",
    "stepsSubtitle": "Follow these 4 simple steps to lock in your special promotional rate and launch your website in under 2 minutes.",
    "faqsBadge": "Help & Clarifications",
    "faqsTitle": "Frequently Asked Questions",
    "services": [
      {
        "id": "web-hosting",
        "name": "High-Speed Web Hosting",
        "badge": "Most Popular",
        "category": "web",
        "shortDesc": "Optimized LiteSpeed infrastructure built for lightning-fast WordPress and dynamic websites.",
        "longDesc": "Hostinger's flagship web hosting is engineered on top of LiteSpeed Enterprise web servers, replacing slow legacy Apache engines. It incorporates the proprietary LSCache optimization plugin, server-level object caching, and HTTP/3 protocol support to deliver sub-200ms page load times. Perfect for personal blogs, business portfolios, and content websites seeking rock-solid 99.9% uptime with minimal setup overhead.",
        "specs": [
          "LiteSpeed Web Server with LSCache",
          "Free 1-Click WordPress Auto-Installer",
          "Free 1-Year Domain Registration Included",
          "Unlimited Free SSL Certificates",
          "Automated Weekly & Daily Backups",
          "Integrated Git Version Control Deployment"
        ]
      },
      {
        "id": "cloud-hosting",
        "name": "Enterprise Cloud Hosting",
        "badge": "High Performance",
        "category": "cloud",
        "shortDesc": "Isolated virtual containers with dedicated CPU, RAM, and automated instant resource scaling.",
        "longDesc": "Experience the power and stability of a dedicated server combined with the sheer simplicity of shared hosting. Each cloud account runs in an isolated virtual instance with dedicated RAM and vCPU cores. When your site experiences viral spikes, automated resource scaling absorbs the surge seamlessly without slowdowns or dropped connections. Includes a dedicated IP address and custom Cloudflare Enterprise routing.",
        "specs": [
          "Dedicated Virtual Resources (Up to 16GB RAM & 8 Cores)",
          "Dedicated IPv4 & IPv6 Address Included",
          "3x to 4x Faster Speed than Standard Hosting",
          "Built-in Cloudflare Enterprise CDN Protection",
          "Automated Daily Backups with 1-Click Restore",
          "Priority 24/7 VIP Technical Support"
        ]
      },
      {
        "id": "vps-hosting",
        "name": "KVM Cloud VPS Hosting",
        "badge": "Developers & DevOps",
        "category": "vps",
        "shortDesc": "Full root access, dedicated kernel virtualization, high-IOPS NVMe drives, and AI terminal assistance.",
        "longDesc": "Engineered for software engineers, backend developers, and tech leads who demand complete root-level control over their operating environment. Built upon Kernel-based Virtual Machine (KVM) technology, Hostinger VPS guarantees 100% dedicated hardware resource allocation. Deploy Docker containers, configure custom Node.js, Python, Ruby, or Go environments, and leverage the built-in AI Terminal Assistant to formulate Linux commands in seconds.",
        "specs": [
          "Full Root Access & Dedicated Kernel (KVM)",
          "Enterprise-Class NVMe Storage with Ultra-High IOPS",
          "OS Options: Ubuntu, Debian, AlmaLinux, Rocky Linux",
          "Docker, Node.js, Python & Microservices Ready",
          "Automated Weekly Snapshots & Firewall Rules",
          "Built-in AI Assistant for Terminal Configurations"
        ]
      },
      {
        "id": "agency-hosting",
        "name": "Agency Hosting & Hostinger Pro",
        "badge": "Agencies & Freelancers",
        "category": "web",
        "shortDesc": "Manage hundreds of client sites with unified credentials, team collaboration, and client sharing.",
        "longDesc": "Designed specifically for web design agencies, freelancers, and dev shops managing multiple client projects. The Hostinger Pro dashboard allows you to organize clients into workspaces, grant custom role-based permissions, and delegate access without sharing your master passwords. You can also deliver automated maintenance health checks, uptime reports, and white-labeled client experiences.",
        "specs": [
          "Centralized Multi-Client Management Portal",
          "Granular Role-Based Access Control (RBAC)",
          "Access Delegation Without Password Sharing",
          "Automated Client Website Maintenance Reports",
          "Integrated Referral & Commission Payouts",
          "Mass Plugin & Core WordPress Updates in 1-Click"
        ]
      },
      {
        "id": "ai-website-builder",
        "name": "AI Website Builder",
        "badge": "No-Code & Fast",
        "category": "web",
        "shortDesc": "Create stunning, fully responsive websites and e-commerce stores in under 60 seconds using AI.",
        "longDesc": "Transform a short text description into a fully functional, mobile-responsive, production-ready website in under a minute. The Hostinger AI Builder generates tailored layouts, copy, royalty-free images, and interactive contact forms. It includes a built-in AI Heatmap tool to predict visitor gaze patterns, an AI Logo Generator, and a robust e-commerce engine with 0% platform transaction fees.",
        "specs": [
          "Prompt-to-Website Generation in 60 Seconds",
          "Intuitive Drag-and-Drop Visual Canvas",
          "Integrated AI Copywriter & SEO Generator",
          "AI Heatmap for Conversion Rate Optimization",
          "Complete E-Commerce Suite (0% Transaction Fees)",
          "Mobile-First Responsive Layouts by Default"
        ]
      },
      {
        "id": "hostinger-horizons",
        "name": "Hostinger Horizons",
        "badge": "Next-Gen Cloud",
        "category": "cloud",
        "shortDesc": "Next-generation cloud ecosystem and edge deployment network built for the future of the web.",
        "longDesc": "Hostinger Horizons represents the cutting-edge evolution of global web infrastructure. By uniting edge computing, intelligent serverless routing, and globally distributed data caches, Horizons ensures websites load instantaneously regardless of visitor geography. It provides elastic infrastructure that adapts dynamically to emerging web standards, high-throughput media, and AI-driven web applications.",
        "specs": [
          "Next-Generation Edge-Native Architecture",
          "Ultra-Low Global Latency with Anycast Routing",
          "Automatic Elastic Resource Reallocation",
          "Future-Proof Compatibility with Modern Web Frameworks",
          "Tier-3 Globally Certified Data Center Backbone",
          "Continuous Performance & Reliability Tuning"
        ]
      },
      {
        "id": "business-email",
        "name": "Professional Business Email",
        "badge": "Brand Identity",
        "category": "web",
        "shortDesc": "Custom branded email addresses with robust anti-spam, calendar sync, and webmail portals.",
        "longDesc": "Establish immediate corporate credibility by sending messages from your own domain (e.g., name@yourcompany.com). Powered by Titan Email, this suite provides generous inbox storage (10GB to 50GB), advanced multi-layered anti-spam and anti-virus filtering, calendar management, and seamless synchronization across iOS, Android, macOS, and Windows devices.",
        "specs": [
          "Professional Branded Inboxes (@yourdomain.com)",
          "Up to 50GB Dedicated Storage per Mailbox",
          "Multi-Layer Anti-Spam & Zero-Day Threat Shield",
          "Integrated Business Calendar & Contact Manager",
          "Native Mobile Apps for iOS & Android",
          "Automated Email Forwarding & Signature Builder"
        ]
      },
      {
        "id": "reach-email",
        "name": "Reach Email Marketing",
        "badge": "Growth & Lead Gen",
        "category": "web",
        "shortDesc": "Built-in newsletter campaigns, automated drip sequences, and lead capture directly in hPanel.",
        "longDesc": "Nurture leads and convert visitors into repeat customers without paying for costly third-party email platforms. Reach Email Marketing is embedded directly within your hosting dashboard, allowing you to design beautiful newsletters with a drag-and-drop builder, segment subscribers by activity, launch automated welcome sequences, and monitor open and click-through metrics in real time.",
        "specs": [
          "Integrated Directly into Your Hosting Dashboard",
          "Drag-and-Drop Newsletter & Campaign Designer",
          "Automated Drip Sequences & Autoresponders",
          "Real-Time Delivery, Open, and Click Telemetry",
          "High Inbox Deliverability with Pre-Warmed IPs",
          "Seamless Form Integration with WordPress & HTML"
        ]
      },
      {
        "id": "managed-openclaw",
        "name": "Managed OpenClaw Microservices",
        "badge": "High Concurrency",
        "category": "cloud",
        "shortDesc": "Optimized containerized runtime environments for high-throughput background jobs and APIs.",
        "longDesc": "Managed OpenClaw is engineered for heavy computational workloads, background batch jobs, asynchronous task queues, and microservice APIs. It isolates computing processes to ensure zero resource contamination across your applications, giving backend developers an ultra-lean runtime environment optimized for low latency and high concurrent connections.",
        "specs": [
          "Isolated Containerized Microservice Architecture",
          "Optimized for High-Concurrency API Gateways",
          "Low-Overhead Compute Resource Allocation",
          "Continuous Process Health Monitoring & Self-Healing",
          "Integrated Micro-Telemetry & Error Logging",
          "Zero Server Maintenance & Automated Security Patching"
        ]
      },
      {
        "id": "ai-agents",
        "name": "Autonomous AI Hosting Agents",
        "badge": "Next-Gen AI",
        "category": "cloud",
        "shortDesc": "Intelligent in-dashboard agents that debug errors, optimize queries, and automate server management.",
        "longDesc": "Hostinger has integrated autonomous AI agents directly into hPanel. Need to identify why a WordPress plugin caused a critical error? The AI Agent analyzes error logs and suggests the exact fix. Need to optimize slow database queries, configure custom redirects, or generate .htaccess rewrite rules? Simply instruct the AI in natural language to execute the configuration safely.",
        "specs": [
          "Automated WordPress Plugin Conflict Diagnostics",
          "Natural Language .htaccess & Nginx Rule Generation",
          "Slow MySQL Query Detection & Indexing Advice",
          "Automated On-Page SEO Recommendations",
          "Terminal Command Generation for VPS Users",
          "24/7 Instant In-Dashboard Assistance"
        ]
      }
    ],
    "plans": [
      {
        "name": "Hospedagem Web Premium",
        "tagline": "Ideal para sites pessoais, blogs e projetos acadêmicos",
        "price": "$2.99",
        "period": "/month",
        "savings": "Economize 75% + 20% desconto parceiro",
        "popular": false,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "100 GB SSD"
          },
          {
            "label": "Performance",
            "val": "Standard LiteSpeed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Weekly Automated"
          },
          {
            "label": "Email",
            "val": "Free Business Email"
          },
          {
            "label": "AI Tools",
            "val": "Basic AI Website Builder"
          }
        ],
        "ctaText": "Escolher plano Premium"
      },
      {
        "name": "Hospedagem Web Business",
        "tagline": "Recomendado para empresas, criadores e lojas virtuais",
        "price": "$3.99",
        "period": "/month",
        "savings": "Economize 73% + 20% desconto parceiro",
        "popular": true,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB Ultra NVMe (5x Faster)"
          },
          {
            "label": "Performance",
            "val": "Up to 5x Increased Speed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Daily & On-Demand Backups"
          },
          {
            "label": "CDN",
            "val": "Free Built-in CDN Included"
          },
          {
            "label": "Staging",
            "val": "1-Click WordPress Staging Tool"
          },
          {
            "label": "AI Tools",
            "val": "Full AI Website Builder Suite"
          }
        ],
        "ctaText": "Escolher plano Business"
      },
      {
        "name": "Cloud Startup",
        "tagline": "Recursos dedicados para alto tráfego e aplicativos de rápido crescimento",
        "price": "$9.99",
        "period": "/month",
        "savings": "Economize 60% + 20% desconto parceiro",
        "popular": false,
        "category": "cloud",
        "specs": [
          {
            "label": "Websites",
            "val": "300 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB NVMe Storage"
          },
          {
            "label": "RAM / CPU",
            "val": "3 GB RAM + 2 CPU Cores (Dedicated)"
          },
          {
            "label": "Performance",
            "val": "Up to 10x Boosted Speed"
          },
          {
            "label": "IP Address",
            "val": "Dedicated IP Address Included"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain"
          },
          {
            "label": "Backups",
            "val": "Automated Daily Backups"
          },
          {
            "label": "CDN",
            "val": "Cloudflare Enterprise CDN"
          },
          {
            "label": "Support",
            "val": "Priority 24/7 VIP Support Queue"
          }
        ],
        "ctaText": "Escolher Cloud Startup"
      },
      {
        "name": "VPS Cloud KVM 2",
        "tagline": "Servidor com acesso root dedicado para desenvolvedores e DevOps",
        "price": "$7.99",
        "period": "/month",
        "savings": "Economize 55% + 20% desconto parceiro",
        "popular": false,
        "category": "vps",
        "specs": [
          {
            "label": "CPU",
            "val": "2 Dedicated vCPU Cores"
          },
          {
            "label": "RAM",
            "val": "8 GB Dedicated RAM"
          },
          {
            "label": "Storage",
            "val": "100 GB High-IOPS NVMe"
          },
          {
            "label": "Bandwidth",
            "val": "8 TB High-Speed Traffic"
          },
          {
            "label": "Access",
            "val": "Full Root Administrative Access"
          },
          {
            "label": "Virtualization",
            "val": "100% Kernel-based (KVM)"
          },
          {
            "label": "Backups",
            "val": "Automated Weekly Snapshots"
          },
          {
            "label": "AI Terminal",
            "val": "AI Assistant for Linux Commands"
          },
          {
            "label": "OS Support",
            "val": "Ubuntu, Debian, AlmaLinux, Rocky"
          }
        ],
        "ctaText": "Escolher VPS KVM"
      }
    ],
    "architectureHighlights": [
      {
        "title": "LiteSpeed Enterprise vs. Apache",
        "desc": "Unlike budget hosts that still use 20-year-old Apache software, Hostinger utilizes LiteSpeed Enterprise web servers. LiteSpeed processes static and dynamic requests simultaneously through event-driven architecture, reducing RAM usage and serving WordPress pages up to 500% faster.",
        "metric": "5x Faster TTFB"
      },
      {
        "title": "Global Tier-3 Data Centers",
        "desc": "Deploy your site closest to your target audience. Choose from global enterprise data center locations across the United States, United Kingdom, France, Netherlands, Lithuania, Singapore, India, and Brazil. Switch data center locations anytime with a single click.",
        "metric": "8 Global Regions"
      },
      {
        "title": "Multi-Layer Defensive Security",
        "desc": "Every website is shielded behind custom Web Application Firewalls (WAF), Cloudflare DDoS mitigation, automated SSL encryption, and Monarx real-time malware scanning that neutralizes malicious scripts before they execute.",
        "metric": "99.9% Uptime SLA"
      },
      {
        "title": "Next-Gen hPanel Control Center",
        "desc": "Forget clumsy, outdated cPanel interfaces. Hostinger custom-engineered hPanel to be clean, responsive, and intuitive. Manage DNS, create databases, install SSL certificates, set up staging sites, and access file managers in seconds.",
        "metric": "3x Faster Navigation"
      },
      {
        "title": "Automated Snapshot & Daily Backups",
        "desc": "Never worry about catastrophic data loss. Websites are backed up automatically with point-in-time restore capabilities. If an update breaks your website, roll back to an earlier version with a single click in your dashboard.",
        "metric": "Zero-Downtime Restores"
      },
      {
        "title": "Developer & Staging Toolkit",
        "desc": "Equipped with modern developer tooling including Git integration, WP-CLI, SSH access, PHP version switcher (from PHP 7.4 to PHP 8.3+), MySQL/phpMyAdmin access, and a one-click staging environment to test changes safely.",
        "metric": "Dev-Ready Stack"
      }
    ],
    "launchSteps": [
      {
        "step": "01",
        "title": "Click Safi Academy's Partner Link",
        "desc": "Access the exclusive portal using our verified referral URL to unlock special promotional pricing with up to 75% standard discount plus our 20% bonus."
      },
      {
        "step": "02",
        "title": "Select Your Preferred Plan",
        "desc": "Choose between Web Hosting (for blogs/portfolios), Cloud Hosting (for high-traffic businesses), or KVM VPS (for developers requiring root access)."
      },
      {
        "step": "03",
        "title": "Apply Code 89LSHAHEEKCO at Checkout",
        "desc": "Ensure the referral code 89LSHAHEEKCO is present in the coupon field to automatically lock in your additional 20% discount on your order."
      },
      {
        "step": "04",
        "title": "Claim Free Domain & Deploy in 60s",
        "desc": "Claim your free 1-year custom domain name (.com, .net, .org, etc.) and launch your site using the 1-click WordPress installer or the AI Website Builder."
      }
    ],
    "faqs": [
      {
        "q": "How do I claim the 20% discount using the referral code?",
        "a": "Simply click any of the 'Claim 20% Discount' or 'Get Started' buttons on this page. The referral code 89LSHAHEEKCO will be automatically appended to your checkout session. You can also copy the code directly using our 1-click coupon widget and paste it into the coupon code box during checkout at Hostinger.com to verify your 20% savings."
      },
      {
        "q": "Is the free domain name really included at no cost?",
        "a": "Yes! When you purchase any 12, 24, or 48-month Premium, Business, or Cloud hosting plan, Hostinger includes a free custom domain registration for your first full year. Popular extensions like .com, .net, .org, .online, and .tech are fully eligible."
      },
      {
        "q": "Can I migrate my existing website from another hosting provider for free?",
        "a": "Yes, 100% free. Hostinger provides an automated website migration service. Once you sign up, simply enter your current host's login details or WordPress URL in hPanel, and Hostinger's migration engineers and automated tools will transfer your entire site, databases, and emails with zero downtime."
      },
      {
        "q": "What is the difference between Web Hosting, Cloud Hosting, and VPS?",
        "a": "Web Hosting shares server hardware efficiently, making it the most affordable choice for personal sites and small businesses. Cloud Hosting isolates dedicated CPU and RAM resources within a virtual container, delivering 3x faster speeds and high redundancy for growing businesses. VPS (Virtual Private Server) provides full root administrative access, allowing developers to install custom operating systems, Docker containers, and complex backend APIs."
      },
      {
        "q": "Can I run modern programming languages like Node.js, Python, and Docker?",
        "a": "Yes. On KVM VPS plans, you have complete root access to run any stack including Node.js, Python, Ruby, Go, Docker, PostgreSQL, Redis, and custom microservices. On Web & Cloud plans, PHP 8.x, Git, WP-CLI, and MySQL are standard."
      },
      {
        "q": "What is the 30-day money-back guarantee policy?",
        "a": "Hostinger offers an unconditional 30-day money-back guarantee. If you are not completely satisfied with the speed, uptime, or control panel for any reason within the first 30 days of purchase, you can cancel and receive a full refund with no hassle."
      },
      {
        "q": "How does Hostinger's hPanel compare to traditional cPanel?",
        "a": "hPanel is Hostinger's custom-built control panel. Unlike legacy cPanel which can feel sluggish and complicated for beginners, hPanel is ultra-modern, intuitive, responsive on mobile devices, and significantly faster. It integrates domain management, DNS records, staging, file management, and AI assistance into one cohesive interface."
      },
      {
        "q": "Does Hostinger support SSL certificates and HTTPS encryption?",
        "a": "Yes. Every domain, subdomain, and parked domain hosted on Hostinger receives free, lifetime Let's Encrypt SSL certificates that install and renew automatically. You will never have to pay extra fees for website encryption."
      }
    ],
    "isRtl": false,
    "ctaGetStarted": "Começar com 20% de desconto extra",
    "ctaExploreCourses": "Conhecer cursos de programação",
    "bottomGuarantee": "Garantia incondicional de reembolso de 30 dias",
    "bottomInstant": "Ativação instantânea da conta na nuvem",
    "bottomChat": "Suporte prioritário via chat 24 horas por dia",
    "bottomDisclaimer": "* A Hostinger é uma provedora independente de hospedagem em nuvem. Descontos promocionais, disponibilidade de domínios e termos de renovação são gerenciados diretamente pela Hostinger.",
    "metricSubTtfb": "Otimizado com LiteSpeed Enterprise",
    "metricSubCdn": "Rede global Cloudflare Enterprise CDN",
    "metricSubNvme": "Armazenamento NVMe corporativo (RAID-10)",
    "metricSubSec": "Segurança em tempo real Monarx e WAF"
  },
  "ja": {
    "disclosure": "Safi Academy maintains an official affiliate partnership with Hostinger. When you purchase hosting through our verified referral link or apply coupon code 89LSHAHEEKCO, you receive an exclusive 20% additional discount on your order, and Safi Academy may earn a referral commission at no additional cost to you. This support enables us to continue offering free coding, cloud, and entrepreneurship education globally.",
    "partnerDisclosureBadge": "Transparent Affiliate Disclosure:",
    "heroBadge": "Safi Academy Verified Partner • 20% Off Code: 89LSHAHEEKCO",
    "heroTitle": "Ultra-Fast NVMe Cloud & Next-Gen Web Hosting",
    "heroSubtitle": "Power your websites, web applications, and digital business on world-class infrastructure. Equipped with LiteSpeed Enterprise web servers, enterprise NVMe SSDs, 99.9% uptime SLA, global CDN, and autonomous AI agents.",
    "pill1": "LiteSpeed Enterprise & LSCache Included",
    "pill2": "Free 1-Year Domain & Lifetime Free SSL",
    "pill3": "Automated Daily & Weekly Backups",
    "pill4": "30-Day Money-Back Guarantee",
    "partnerCodeLabel": "Partner Code:",
    "copyCodeBtn": "Copy Code",
    "copiedBtn": "Copied! 20% Applied",
    "claimDiscountBtn": "Claim 20% Discount with Partner Link",
    "comparePlansBtn": "Compare Plans",
    "telemetryTitle": "Hostinger Cloud Telemetry",
    "telemetrySubtitle": "NVMe Tier-3 Infrastructure",
    "telemetryLive": "99.99% Live",
    "metricTtfb": "Server Response (TTFB)",
    "metricUptime": "Uptime Guarantee",
    "metricCdn": "Global Edge CDN",
    "metricAi": "Autonomous AI Debugging",
    "servicesBadge": "Cloud Ecosystem",
    "servicesTitle": "Comprehensive Cloud & Web Hosting Infrastructure",
    "servicesSubtitle": "Explore specialized cloud infrastructure engineered for creators, modern developers, agencies, and enterprise applications.",
    "plansBadge": "Special Partner Pricing",
    "plansTitle": "High-Performance Hosting Tiers",
    "plansSubtitle": "Choose the optimal hosting architecture for your personal brand, digital business, or SaaS platform.",
    "planFilterAll": "All Plans",
    "planFilterWeb": "Web Hosting",
    "planFilterCloud": "Cloud Hosting",
    "planFilterVps": "Cloud VPS",
    "archBadge": "Technical Benchmarks",
    "archTitle": "Enterprise Engineering & Cloud Benchmarks",
    "archSubtitle": "Discover the technical engineering advantages that set Hostinger apart from legacy hosting providers.",
    "stepsBadge": "Simple Activation Guide",
    "stepsTitle": "How to Activate Your 20% Bonus Discount",
    "stepsSubtitle": "Follow these 4 simple steps to lock in your special promotional rate and launch your website in under 2 minutes.",
    "faqsBadge": "Help & Clarifications",
    "faqsTitle": "Frequently Asked Questions",
    "services": [
      {
        "id": "web-hosting",
        "name": "High-Speed Web Hosting",
        "badge": "Most Popular",
        "category": "web",
        "shortDesc": "Optimized LiteSpeed infrastructure built for lightning-fast WordPress and dynamic websites.",
        "longDesc": "Hostinger's flagship web hosting is engineered on top of LiteSpeed Enterprise web servers, replacing slow legacy Apache engines. It incorporates the proprietary LSCache optimization plugin, server-level object caching, and HTTP/3 protocol support to deliver sub-200ms page load times. Perfect for personal blogs, business portfolios, and content websites seeking rock-solid 99.9% uptime with minimal setup overhead.",
        "specs": [
          "LiteSpeed Web Server with LSCache",
          "Free 1-Click WordPress Auto-Installer",
          "Free 1-Year Domain Registration Included",
          "Unlimited Free SSL Certificates",
          "Automated Weekly & Daily Backups",
          "Integrated Git Version Control Deployment"
        ]
      },
      {
        "id": "cloud-hosting",
        "name": "Enterprise Cloud Hosting",
        "badge": "High Performance",
        "category": "cloud",
        "shortDesc": "Isolated virtual containers with dedicated CPU, RAM, and automated instant resource scaling.",
        "longDesc": "Experience the power and stability of a dedicated server combined with the sheer simplicity of shared hosting. Each cloud account runs in an isolated virtual instance with dedicated RAM and vCPU cores. When your site experiences viral spikes, automated resource scaling absorbs the surge seamlessly without slowdowns or dropped connections. Includes a dedicated IP address and custom Cloudflare Enterprise routing.",
        "specs": [
          "Dedicated Virtual Resources (Up to 16GB RAM & 8 Cores)",
          "Dedicated IPv4 & IPv6 Address Included",
          "3x to 4x Faster Speed than Standard Hosting",
          "Built-in Cloudflare Enterprise CDN Protection",
          "Automated Daily Backups with 1-Click Restore",
          "Priority 24/7 VIP Technical Support"
        ]
      },
      {
        "id": "vps-hosting",
        "name": "KVM Cloud VPS Hosting",
        "badge": "Developers & DevOps",
        "category": "vps",
        "shortDesc": "Full root access, dedicated kernel virtualization, high-IOPS NVMe drives, and AI terminal assistance.",
        "longDesc": "Engineered for software engineers, backend developers, and tech leads who demand complete root-level control over their operating environment. Built upon Kernel-based Virtual Machine (KVM) technology, Hostinger VPS guarantees 100% dedicated hardware resource allocation. Deploy Docker containers, configure custom Node.js, Python, Ruby, or Go environments, and leverage the built-in AI Terminal Assistant to formulate Linux commands in seconds.",
        "specs": [
          "Full Root Access & Dedicated Kernel (KVM)",
          "Enterprise-Class NVMe Storage with Ultra-High IOPS",
          "OS Options: Ubuntu, Debian, AlmaLinux, Rocky Linux",
          "Docker, Node.js, Python & Microservices Ready",
          "Automated Weekly Snapshots & Firewall Rules",
          "Built-in AI Assistant for Terminal Configurations"
        ]
      },
      {
        "id": "agency-hosting",
        "name": "Agency Hosting & Hostinger Pro",
        "badge": "Agencies & Freelancers",
        "category": "web",
        "shortDesc": "Manage hundreds of client sites with unified credentials, team collaboration, and client sharing.",
        "longDesc": "Designed specifically for web design agencies, freelancers, and dev shops managing multiple client projects. The Hostinger Pro dashboard allows you to organize clients into workspaces, grant custom role-based permissions, and delegate access without sharing your master passwords. You can also deliver automated maintenance health checks, uptime reports, and white-labeled client experiences.",
        "specs": [
          "Centralized Multi-Client Management Portal",
          "Granular Role-Based Access Control (RBAC)",
          "Access Delegation Without Password Sharing",
          "Automated Client Website Maintenance Reports",
          "Integrated Referral & Commission Payouts",
          "Mass Plugin & Core WordPress Updates in 1-Click"
        ]
      },
      {
        "id": "ai-website-builder",
        "name": "AI Website Builder",
        "badge": "No-Code & Fast",
        "category": "web",
        "shortDesc": "Create stunning, fully responsive websites and e-commerce stores in under 60 seconds using AI.",
        "longDesc": "Transform a short text description into a fully functional, mobile-responsive, production-ready website in under a minute. The Hostinger AI Builder generates tailored layouts, copy, royalty-free images, and interactive contact forms. It includes a built-in AI Heatmap tool to predict visitor gaze patterns, an AI Logo Generator, and a robust e-commerce engine with 0% platform transaction fees.",
        "specs": [
          "Prompt-to-Website Generation in 60 Seconds",
          "Intuitive Drag-and-Drop Visual Canvas",
          "Integrated AI Copywriter & SEO Generator",
          "AI Heatmap for Conversion Rate Optimization",
          "Complete E-Commerce Suite (0% Transaction Fees)",
          "Mobile-First Responsive Layouts by Default"
        ]
      },
      {
        "id": "hostinger-horizons",
        "name": "Hostinger Horizons",
        "badge": "Next-Gen Cloud",
        "category": "cloud",
        "shortDesc": "Next-generation cloud ecosystem and edge deployment network built for the future of the web.",
        "longDesc": "Hostinger Horizons represents the cutting-edge evolution of global web infrastructure. By uniting edge computing, intelligent serverless routing, and globally distributed data caches, Horizons ensures websites load instantaneously regardless of visitor geography. It provides elastic infrastructure that adapts dynamically to emerging web standards, high-throughput media, and AI-driven web applications.",
        "specs": [
          "Next-Generation Edge-Native Architecture",
          "Ultra-Low Global Latency with Anycast Routing",
          "Automatic Elastic Resource Reallocation",
          "Future-Proof Compatibility with Modern Web Frameworks",
          "Tier-3 Globally Certified Data Center Backbone",
          "Continuous Performance & Reliability Tuning"
        ]
      },
      {
        "id": "business-email",
        "name": "Professional Business Email",
        "badge": "Brand Identity",
        "category": "web",
        "shortDesc": "Custom branded email addresses with robust anti-spam, calendar sync, and webmail portals.",
        "longDesc": "Establish immediate corporate credibility by sending messages from your own domain (e.g., name@yourcompany.com). Powered by Titan Email, this suite provides generous inbox storage (10GB to 50GB), advanced multi-layered anti-spam and anti-virus filtering, calendar management, and seamless synchronization across iOS, Android, macOS, and Windows devices.",
        "specs": [
          "Professional Branded Inboxes (@yourdomain.com)",
          "Up to 50GB Dedicated Storage per Mailbox",
          "Multi-Layer Anti-Spam & Zero-Day Threat Shield",
          "Integrated Business Calendar & Contact Manager",
          "Native Mobile Apps for iOS & Android",
          "Automated Email Forwarding & Signature Builder"
        ]
      },
      {
        "id": "reach-email",
        "name": "Reach Email Marketing",
        "badge": "Growth & Lead Gen",
        "category": "web",
        "shortDesc": "Built-in newsletter campaigns, automated drip sequences, and lead capture directly in hPanel.",
        "longDesc": "Nurture leads and convert visitors into repeat customers without paying for costly third-party email platforms. Reach Email Marketing is embedded directly within your hosting dashboard, allowing you to design beautiful newsletters with a drag-and-drop builder, segment subscribers by activity, launch automated welcome sequences, and monitor open and click-through metrics in real time.",
        "specs": [
          "Integrated Directly into Your Hosting Dashboard",
          "Drag-and-Drop Newsletter & Campaign Designer",
          "Automated Drip Sequences & Autoresponders",
          "Real-Time Delivery, Open, and Click Telemetry",
          "High Inbox Deliverability with Pre-Warmed IPs",
          "Seamless Form Integration with WordPress & HTML"
        ]
      },
      {
        "id": "managed-openclaw",
        "name": "Managed OpenClaw Microservices",
        "badge": "High Concurrency",
        "category": "cloud",
        "shortDesc": "Optimized containerized runtime environments for high-throughput background jobs and APIs.",
        "longDesc": "Managed OpenClaw is engineered for heavy computational workloads, background batch jobs, asynchronous task queues, and microservice APIs. It isolates computing processes to ensure zero resource contamination across your applications, giving backend developers an ultra-lean runtime environment optimized for low latency and high concurrent connections.",
        "specs": [
          "Isolated Containerized Microservice Architecture",
          "Optimized for High-Concurrency API Gateways",
          "Low-Overhead Compute Resource Allocation",
          "Continuous Process Health Monitoring & Self-Healing",
          "Integrated Micro-Telemetry & Error Logging",
          "Zero Server Maintenance & Automated Security Patching"
        ]
      },
      {
        "id": "ai-agents",
        "name": "Autonomous AI Hosting Agents",
        "badge": "Next-Gen AI",
        "category": "cloud",
        "shortDesc": "Intelligent in-dashboard agents that debug errors, optimize queries, and automate server management.",
        "longDesc": "Hostinger has integrated autonomous AI agents directly into hPanel. Need to identify why a WordPress plugin caused a critical error? The AI Agent analyzes error logs and suggests the exact fix. Need to optimize slow database queries, configure custom redirects, or generate .htaccess rewrite rules? Simply instruct the AI in natural language to execute the configuration safely.",
        "specs": [
          "Automated WordPress Plugin Conflict Diagnostics",
          "Natural Language .htaccess & Nginx Rule Generation",
          "Slow MySQL Query Detection & Indexing Advice",
          "Automated On-Page SEO Recommendations",
          "Terminal Command Generation for VPS Users",
          "24/7 Instant In-Dashboard Assistance"
        ]
      }
    ],
    "plans": [
      {
        "name": "プレミアムWebホスティング",
        "tagline": "個人サイト、ブログ、学生プロジェクトの入門に最適",
        "price": "$2.99",
        "period": "/month",
        "savings": "75%割引 + 提携20%追加割引",
        "popular": false,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "100 GB SSD"
          },
          {
            "label": "Performance",
            "val": "Standard LiteSpeed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Weekly Automated"
          },
          {
            "label": "Email",
            "val": "Free Business Email"
          },
          {
            "label": "AI Tools",
            "val": "Basic AI Website Builder"
          }
        ],
        "ctaText": "プレミアムプランを選択"
      },
      {
        "name": "ビジネスWebホスティング",
        "tagline": "企業サイト、クリエイター、ECストアにおすすめの標準構成",
        "price": "$3.99",
        "period": "/month",
        "savings": "73%割引 + 提携20%追加割引",
        "popular": true,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB Ultra NVMe (5x Faster)"
          },
          {
            "label": "Performance",
            "val": "Up to 5x Increased Speed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Daily & On-Demand Backups"
          },
          {
            "label": "CDN",
            "val": "Free Built-in CDN Included"
          },
          {
            "label": "Staging",
            "val": "1-Click WordPress Staging Tool"
          },
          {
            "label": "AI Tools",
            "val": "Full AI Website Builder Suite"
          }
        ],
        "ctaText": "ビジネスプランを選択"
      },
      {
        "name": "クラウドスタートアップ",
        "tagline": "高トラフィックや成長期アプリに対応する専用リソース構成",
        "price": "$9.99",
        "period": "/month",
        "savings": "60%割引 + 提携20%追加割引",
        "popular": false,
        "category": "cloud",
        "specs": [
          {
            "label": "Websites",
            "val": "300 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB NVMe Storage"
          },
          {
            "label": "RAM / CPU",
            "val": "3 GB RAM + 2 CPU Cores (Dedicated)"
          },
          {
            "label": "Performance",
            "val": "Up to 10x Boosted Speed"
          },
          {
            "label": "IP Address",
            "val": "Dedicated IP Address Included"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain"
          },
          {
            "label": "Backups",
            "val": "Automated Daily Backups"
          },
          {
            "label": "CDN",
            "val": "Cloudflare Enterprise CDN"
          },
          {
            "label": "Support",
            "val": "Priority 24/7 VIP Support Queue"
          }
        ],
        "ctaText": "クラウドプランを選択"
      },
      {
        "name": "KVM 2 クラウドVPS",
        "tagline": "開発者やエンジニア向けの完全Root権限付き仮想専用サーバー",
        "price": "$7.99",
        "period": "/month",
        "savings": "55%割引 + 提携20%追加割引",
        "popular": false,
        "category": "vps",
        "specs": [
          {
            "label": "CPU",
            "val": "2 Dedicated vCPU Cores"
          },
          {
            "label": "RAM",
            "val": "8 GB Dedicated RAM"
          },
          {
            "label": "Storage",
            "val": "100 GB High-IOPS NVMe"
          },
          {
            "label": "Bandwidth",
            "val": "8 TB High-Speed Traffic"
          },
          {
            "label": "Access",
            "val": "Full Root Administrative Access"
          },
          {
            "label": "Virtualization",
            "val": "100% Kernel-based (KVM)"
          },
          {
            "label": "Backups",
            "val": "Automated Weekly Snapshots"
          },
          {
            "label": "AI Terminal",
            "val": "AI Assistant for Linux Commands"
          },
          {
            "label": "OS Support",
            "val": "Ubuntu, Debian, AlmaLinux, Rocky"
          }
        ],
        "ctaText": "KVM VPSを選択"
      }
    ],
    "architectureHighlights": [
      {
        "title": "LiteSpeed Enterprise vs. Apache",
        "desc": "Unlike budget hosts that still use 20-year-old Apache software, Hostinger utilizes LiteSpeed Enterprise web servers. LiteSpeed processes static and dynamic requests simultaneously through event-driven architecture, reducing RAM usage and serving WordPress pages up to 500% faster.",
        "metric": "5x Faster TTFB"
      },
      {
        "title": "Global Tier-3 Data Centers",
        "desc": "Deploy your site closest to your target audience. Choose from global enterprise data center locations across the United States, United Kingdom, France, Netherlands, Lithuania, Singapore, India, and Brazil. Switch data center locations anytime with a single click.",
        "metric": "8 Global Regions"
      },
      {
        "title": "Multi-Layer Defensive Security",
        "desc": "Every website is shielded behind custom Web Application Firewalls (WAF), Cloudflare DDoS mitigation, automated SSL encryption, and Monarx real-time malware scanning that neutralizes malicious scripts before they execute.",
        "metric": "99.9% Uptime SLA"
      },
      {
        "title": "Next-Gen hPanel Control Center",
        "desc": "Forget clumsy, outdated cPanel interfaces. Hostinger custom-engineered hPanel to be clean, responsive, and intuitive. Manage DNS, create databases, install SSL certificates, set up staging sites, and access file managers in seconds.",
        "metric": "3x Faster Navigation"
      },
      {
        "title": "Automated Snapshot & Daily Backups",
        "desc": "Never worry about catastrophic data loss. Websites are backed up automatically with point-in-time restore capabilities. If an update breaks your website, roll back to an earlier version with a single click in your dashboard.",
        "metric": "Zero-Downtime Restores"
      },
      {
        "title": "Developer & Staging Toolkit",
        "desc": "Equipped with modern developer tooling including Git integration, WP-CLI, SSH access, PHP version switcher (from PHP 7.4 to PHP 8.3+), MySQL/phpMyAdmin access, and a one-click staging environment to test changes safely.",
        "metric": "Dev-Ready Stack"
      }
    ],
    "launchSteps": [
      {
        "step": "01",
        "title": "Click Safi Academy's Partner Link",
        "desc": "Access the exclusive portal using our verified referral URL to unlock special promotional pricing with up to 75% standard discount plus our 20% bonus."
      },
      {
        "step": "02",
        "title": "Select Your Preferred Plan",
        "desc": "Choose between Web Hosting (for blogs/portfolios), Cloud Hosting (for high-traffic businesses), or KVM VPS (for developers requiring root access)."
      },
      {
        "step": "03",
        "title": "Apply Code 89LSHAHEEKCO at Checkout",
        "desc": "Ensure the referral code 89LSHAHEEKCO is present in the coupon field to automatically lock in your additional 20% discount on your order."
      },
      {
        "step": "04",
        "title": "Claim Free Domain & Deploy in 60s",
        "desc": "Claim your free 1-year custom domain name (.com, .net, .org, etc.) and launch your site using the 1-click WordPress installer or the AI Website Builder."
      }
    ],
    "faqs": [
      {
        "q": "How do I claim the 20% discount using the referral code?",
        "a": "Simply click any of the 'Claim 20% Discount' or 'Get Started' buttons on this page. The referral code 89LSHAHEEKCO will be automatically appended to your checkout session. You can also copy the code directly using our 1-click coupon widget and paste it into the coupon code box during checkout at Hostinger.com to verify your 20% savings."
      },
      {
        "q": "Is the free domain name really included at no cost?",
        "a": "Yes! When you purchase any 12, 24, or 48-month Premium, Business, or Cloud hosting plan, Hostinger includes a free custom domain registration for your first full year. Popular extensions like .com, .net, .org, .online, and .tech are fully eligible."
      },
      {
        "q": "Can I migrate my existing website from another hosting provider for free?",
        "a": "Yes, 100% free. Hostinger provides an automated website migration service. Once you sign up, simply enter your current host's login details or WordPress URL in hPanel, and Hostinger's migration engineers and automated tools will transfer your entire site, databases, and emails with zero downtime."
      },
      {
        "q": "What is the difference between Web Hosting, Cloud Hosting, and VPS?",
        "a": "Web Hosting shares server hardware efficiently, making it the most affordable choice for personal sites and small businesses. Cloud Hosting isolates dedicated CPU and RAM resources within a virtual container, delivering 3x faster speeds and high redundancy for growing businesses. VPS (Virtual Private Server) provides full root administrative access, allowing developers to install custom operating systems, Docker containers, and complex backend APIs."
      },
      {
        "q": "Can I run modern programming languages like Node.js, Python, and Docker?",
        "a": "Yes. On KVM VPS plans, you have complete root access to run any stack including Node.js, Python, Ruby, Go, Docker, PostgreSQL, Redis, and custom microservices. On Web & Cloud plans, PHP 8.x, Git, WP-CLI, and MySQL are standard."
      },
      {
        "q": "What is the 30-day money-back guarantee policy?",
        "a": "Hostinger offers an unconditional 30-day money-back guarantee. If you are not completely satisfied with the speed, uptime, or control panel for any reason within the first 30 days of purchase, you can cancel and receive a full refund with no hassle."
      },
      {
        "q": "How does Hostinger's hPanel compare to traditional cPanel?",
        "a": "hPanel is Hostinger's custom-built control panel. Unlike legacy cPanel which can feel sluggish and complicated for beginners, hPanel is ultra-modern, intuitive, responsive on mobile devices, and significantly faster. It integrates domain management, DNS records, staging, file management, and AI assistance into one cohesive interface."
      },
      {
        "q": "Does Hostinger support SSL certificates and HTTPS encryption?",
        "a": "Yes. Every domain, subdomain, and parked domain hosted on Hostinger receives free, lifetime Let's Encrypt SSL certificates that install and renew automatically. You will never have to pay extra fees for website encryption."
      }
    ],
    "isRtl": false,
    "ctaGetStarted": "20%特別割引で今すぐ始める",
    "ctaExploreCourses": "プログラミング講座一覧を見る",
    "bottomGuarantee": "安心の30日間無条件全額返金保証",
    "bottomInstant": "数秒でのクラウド環境即時アクティベーション",
    "bottomChat": "24時間365日対応の優先ライブチャットサポート",
    "bottomDisclaimer": "* Hostingerは独立したクラウドホスティング事業者です。特別割引、独自ドメインの付与、更新条件はHostingerにより直接管理されます。",
    "metricSubTtfb": "LiteSpeed Enterpriseによる高速最適化",
    "metricSubCdn": "Cloudflare Enterprise グローバルCDN網",
    "metricSubNvme": "エンタープライズNVMeストレージ (RAID-10)",
    "metricSubSec": "MonarxとWAFによるリアルタイム脅威検知"
  },
  "ko": {
    "disclosure": "Safi Academy maintains an official affiliate partnership with Hostinger. When you purchase hosting through our verified referral link or apply coupon code 89LSHAHEEKCO, you receive an exclusive 20% additional discount on your order, and Safi Academy may earn a referral commission at no additional cost to you. This support enables us to continue offering free coding, cloud, and entrepreneurship education globally.",
    "partnerDisclosureBadge": "Transparent Affiliate Disclosure:",
    "heroBadge": "Safi Academy Verified Partner • 20% Off Code: 89LSHAHEEKCO",
    "heroTitle": "Ultra-Fast NVMe Cloud & Next-Gen Web Hosting",
    "heroSubtitle": "Power your websites, web applications, and digital business on world-class infrastructure. Equipped with LiteSpeed Enterprise web servers, enterprise NVMe SSDs, 99.9% uptime SLA, global CDN, and autonomous AI agents.",
    "pill1": "LiteSpeed Enterprise & LSCache Included",
    "pill2": "Free 1-Year Domain & Lifetime Free SSL",
    "pill3": "Automated Daily & Weekly Backups",
    "pill4": "30-Day Money-Back Guarantee",
    "partnerCodeLabel": "Partner Code:",
    "copyCodeBtn": "Copy Code",
    "copiedBtn": "Copied! 20% Applied",
    "claimDiscountBtn": "Claim 20% Discount with Partner Link",
    "comparePlansBtn": "Compare Plans",
    "telemetryTitle": "Hostinger Cloud Telemetry",
    "telemetrySubtitle": "NVMe Tier-3 Infrastructure",
    "telemetryLive": "99.99% Live",
    "metricTtfb": "Server Response (TTFB)",
    "metricUptime": "Uptime Guarantee",
    "metricCdn": "Global Edge CDN",
    "metricAi": "Autonomous AI Debugging",
    "servicesBadge": "Cloud Ecosystem",
    "servicesTitle": "Comprehensive Cloud & Web Hosting Infrastructure",
    "servicesSubtitle": "Explore specialized cloud infrastructure engineered for creators, modern developers, agencies, and enterprise applications.",
    "plansBadge": "Special Partner Pricing",
    "plansTitle": "High-Performance Hosting Tiers",
    "plansSubtitle": "Choose the optimal hosting architecture for your personal brand, digital business, or SaaS platform.",
    "planFilterAll": "All Plans",
    "planFilterWeb": "Web Hosting",
    "planFilterCloud": "Cloud Hosting",
    "planFilterVps": "Cloud VPS",
    "archBadge": "Technical Benchmarks",
    "archTitle": "Enterprise Engineering & Cloud Benchmarks",
    "archSubtitle": "Discover the technical engineering advantages that set Hostinger apart from legacy hosting providers.",
    "stepsBadge": "Simple Activation Guide",
    "stepsTitle": "How to Activate Your 20% Bonus Discount",
    "stepsSubtitle": "Follow these 4 simple steps to lock in your special promotional rate and launch your website in under 2 minutes.",
    "faqsBadge": "Help & Clarifications",
    "faqsTitle": "Frequently Asked Questions",
    "services": [
      {
        "id": "web-hosting",
        "name": "High-Speed Web Hosting",
        "badge": "Most Popular",
        "category": "web",
        "shortDesc": "Optimized LiteSpeed infrastructure built for lightning-fast WordPress and dynamic websites.",
        "longDesc": "Hostinger's flagship web hosting is engineered on top of LiteSpeed Enterprise web servers, replacing slow legacy Apache engines. It incorporates the proprietary LSCache optimization plugin, server-level object caching, and HTTP/3 protocol support to deliver sub-200ms page load times. Perfect for personal blogs, business portfolios, and content websites seeking rock-solid 99.9% uptime with minimal setup overhead.",
        "specs": [
          "LiteSpeed Web Server with LSCache",
          "Free 1-Click WordPress Auto-Installer",
          "Free 1-Year Domain Registration Included",
          "Unlimited Free SSL Certificates",
          "Automated Weekly & Daily Backups",
          "Integrated Git Version Control Deployment"
        ]
      },
      {
        "id": "cloud-hosting",
        "name": "Enterprise Cloud Hosting",
        "badge": "High Performance",
        "category": "cloud",
        "shortDesc": "Isolated virtual containers with dedicated CPU, RAM, and automated instant resource scaling.",
        "longDesc": "Experience the power and stability of a dedicated server combined with the sheer simplicity of shared hosting. Each cloud account runs in an isolated virtual instance with dedicated RAM and vCPU cores. When your site experiences viral spikes, automated resource scaling absorbs the surge seamlessly without slowdowns or dropped connections. Includes a dedicated IP address and custom Cloudflare Enterprise routing.",
        "specs": [
          "Dedicated Virtual Resources (Up to 16GB RAM & 8 Cores)",
          "Dedicated IPv4 & IPv6 Address Included",
          "3x to 4x Faster Speed than Standard Hosting",
          "Built-in Cloudflare Enterprise CDN Protection",
          "Automated Daily Backups with 1-Click Restore",
          "Priority 24/7 VIP Technical Support"
        ]
      },
      {
        "id": "vps-hosting",
        "name": "KVM Cloud VPS Hosting",
        "badge": "Developers & DevOps",
        "category": "vps",
        "shortDesc": "Full root access, dedicated kernel virtualization, high-IOPS NVMe drives, and AI terminal assistance.",
        "longDesc": "Engineered for software engineers, backend developers, and tech leads who demand complete root-level control over their operating environment. Built upon Kernel-based Virtual Machine (KVM) technology, Hostinger VPS guarantees 100% dedicated hardware resource allocation. Deploy Docker containers, configure custom Node.js, Python, Ruby, or Go environments, and leverage the built-in AI Terminal Assistant to formulate Linux commands in seconds.",
        "specs": [
          "Full Root Access & Dedicated Kernel (KVM)",
          "Enterprise-Class NVMe Storage with Ultra-High IOPS",
          "OS Options: Ubuntu, Debian, AlmaLinux, Rocky Linux",
          "Docker, Node.js, Python & Microservices Ready",
          "Automated Weekly Snapshots & Firewall Rules",
          "Built-in AI Assistant for Terminal Configurations"
        ]
      },
      {
        "id": "agency-hosting",
        "name": "Agency Hosting & Hostinger Pro",
        "badge": "Agencies & Freelancers",
        "category": "web",
        "shortDesc": "Manage hundreds of client sites with unified credentials, team collaboration, and client sharing.",
        "longDesc": "Designed specifically for web design agencies, freelancers, and dev shops managing multiple client projects. The Hostinger Pro dashboard allows you to organize clients into workspaces, grant custom role-based permissions, and delegate access without sharing your master passwords. You can also deliver automated maintenance health checks, uptime reports, and white-labeled client experiences.",
        "specs": [
          "Centralized Multi-Client Management Portal",
          "Granular Role-Based Access Control (RBAC)",
          "Access Delegation Without Password Sharing",
          "Automated Client Website Maintenance Reports",
          "Integrated Referral & Commission Payouts",
          "Mass Plugin & Core WordPress Updates in 1-Click"
        ]
      },
      {
        "id": "ai-website-builder",
        "name": "AI Website Builder",
        "badge": "No-Code & Fast",
        "category": "web",
        "shortDesc": "Create stunning, fully responsive websites and e-commerce stores in under 60 seconds using AI.",
        "longDesc": "Transform a short text description into a fully functional, mobile-responsive, production-ready website in under a minute. The Hostinger AI Builder generates tailored layouts, copy, royalty-free images, and interactive contact forms. It includes a built-in AI Heatmap tool to predict visitor gaze patterns, an AI Logo Generator, and a robust e-commerce engine with 0% platform transaction fees.",
        "specs": [
          "Prompt-to-Website Generation in 60 Seconds",
          "Intuitive Drag-and-Drop Visual Canvas",
          "Integrated AI Copywriter & SEO Generator",
          "AI Heatmap for Conversion Rate Optimization",
          "Complete E-Commerce Suite (0% Transaction Fees)",
          "Mobile-First Responsive Layouts by Default"
        ]
      },
      {
        "id": "hostinger-horizons",
        "name": "Hostinger Horizons",
        "badge": "Next-Gen Cloud",
        "category": "cloud",
        "shortDesc": "Next-generation cloud ecosystem and edge deployment network built for the future of the web.",
        "longDesc": "Hostinger Horizons represents the cutting-edge evolution of global web infrastructure. By uniting edge computing, intelligent serverless routing, and globally distributed data caches, Horizons ensures websites load instantaneously regardless of visitor geography. It provides elastic infrastructure that adapts dynamically to emerging web standards, high-throughput media, and AI-driven web applications.",
        "specs": [
          "Next-Generation Edge-Native Architecture",
          "Ultra-Low Global Latency with Anycast Routing",
          "Automatic Elastic Resource Reallocation",
          "Future-Proof Compatibility with Modern Web Frameworks",
          "Tier-3 Globally Certified Data Center Backbone",
          "Continuous Performance & Reliability Tuning"
        ]
      },
      {
        "id": "business-email",
        "name": "Professional Business Email",
        "badge": "Brand Identity",
        "category": "web",
        "shortDesc": "Custom branded email addresses with robust anti-spam, calendar sync, and webmail portals.",
        "longDesc": "Establish immediate corporate credibility by sending messages from your own domain (e.g., name@yourcompany.com). Powered by Titan Email, this suite provides generous inbox storage (10GB to 50GB), advanced multi-layered anti-spam and anti-virus filtering, calendar management, and seamless synchronization across iOS, Android, macOS, and Windows devices.",
        "specs": [
          "Professional Branded Inboxes (@yourdomain.com)",
          "Up to 50GB Dedicated Storage per Mailbox",
          "Multi-Layer Anti-Spam & Zero-Day Threat Shield",
          "Integrated Business Calendar & Contact Manager",
          "Native Mobile Apps for iOS & Android",
          "Automated Email Forwarding & Signature Builder"
        ]
      },
      {
        "id": "reach-email",
        "name": "Reach Email Marketing",
        "badge": "Growth & Lead Gen",
        "category": "web",
        "shortDesc": "Built-in newsletter campaigns, automated drip sequences, and lead capture directly in hPanel.",
        "longDesc": "Nurture leads and convert visitors into repeat customers without paying for costly third-party email platforms. Reach Email Marketing is embedded directly within your hosting dashboard, allowing you to design beautiful newsletters with a drag-and-drop builder, segment subscribers by activity, launch automated welcome sequences, and monitor open and click-through metrics in real time.",
        "specs": [
          "Integrated Directly into Your Hosting Dashboard",
          "Drag-and-Drop Newsletter & Campaign Designer",
          "Automated Drip Sequences & Autoresponders",
          "Real-Time Delivery, Open, and Click Telemetry",
          "High Inbox Deliverability with Pre-Warmed IPs",
          "Seamless Form Integration with WordPress & HTML"
        ]
      },
      {
        "id": "managed-openclaw",
        "name": "Managed OpenClaw Microservices",
        "badge": "High Concurrency",
        "category": "cloud",
        "shortDesc": "Optimized containerized runtime environments for high-throughput background jobs and APIs.",
        "longDesc": "Managed OpenClaw is engineered for heavy computational workloads, background batch jobs, asynchronous task queues, and microservice APIs. It isolates computing processes to ensure zero resource contamination across your applications, giving backend developers an ultra-lean runtime environment optimized for low latency and high concurrent connections.",
        "specs": [
          "Isolated Containerized Microservice Architecture",
          "Optimized for High-Concurrency API Gateways",
          "Low-Overhead Compute Resource Allocation",
          "Continuous Process Health Monitoring & Self-Healing",
          "Integrated Micro-Telemetry & Error Logging",
          "Zero Server Maintenance & Automated Security Patching"
        ]
      },
      {
        "id": "ai-agents",
        "name": "Autonomous AI Hosting Agents",
        "badge": "Next-Gen AI",
        "category": "cloud",
        "shortDesc": "Intelligent in-dashboard agents that debug errors, optimize queries, and automate server management.",
        "longDesc": "Hostinger has integrated autonomous AI agents directly into hPanel. Need to identify why a WordPress plugin caused a critical error? The AI Agent analyzes error logs and suggests the exact fix. Need to optimize slow database queries, configure custom redirects, or generate .htaccess rewrite rules? Simply instruct the AI in natural language to execute the configuration safely.",
        "specs": [
          "Automated WordPress Plugin Conflict Diagnostics",
          "Natural Language .htaccess & Nginx Rule Generation",
          "Slow MySQL Query Detection & Indexing Advice",
          "Automated On-Page SEO Recommendations",
          "Terminal Command Generation for VPS Users",
          "24/7 Instant In-Dashboard Assistance"
        ]
      }
    ],
    "plans": [
      {
        "name": "프리미엄 웹 호스팅",
        "tagline": "개인 웹사이트, 블로그 및 학생 프로젝트를 위한 완벽한 솔루션",
        "price": "$2.99",
        "period": "/month",
        "savings": "75% 할인 + 제휴 20% 추가 할인",
        "popular": false,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "100 GB SSD"
          },
          {
            "label": "Performance",
            "val": "Standard LiteSpeed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Weekly Automated"
          },
          {
            "label": "Email",
            "val": "Free Business Email"
          },
          {
            "label": "AI Tools",
            "val": "Basic AI Website Builder"
          }
        ],
        "ctaText": "프리미엄 플랜 선택"
      },
      {
        "name": "비즈니스 웹 호스팅",
        "tagline": "기업, 스타트업 및 온라인 쇼핑몰을 위한 공식 추천 플랜",
        "price": "$3.99",
        "period": "/month",
        "savings": "73% 할인 + 제휴 20% 추가 할인",
        "popular": true,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB Ultra NVMe (5x Faster)"
          },
          {
            "label": "Performance",
            "val": "Up to 5x Increased Speed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Daily & On-Demand Backups"
          },
          {
            "label": "CDN",
            "val": "Free Built-in CDN Included"
          },
          {
            "label": "Staging",
            "val": "1-Click WordPress Staging Tool"
          },
          {
            "label": "AI Tools",
            "val": "Full AI Website Builder Suite"
          }
        ],
        "ctaText": "비즈니스 플랜 선택"
      },
      {
        "name": "클라우드 스타트업",
        "tagline": "대규모 트래픽과 확장형 앱을 위한 전용 클라우드 리소스",
        "price": "$9.99",
        "period": "/month",
        "savings": "60% 할인 + 제휴 20% 추가 할인",
        "popular": false,
        "category": "cloud",
        "specs": [
          {
            "label": "Websites",
            "val": "300 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB NVMe Storage"
          },
          {
            "label": "RAM / CPU",
            "val": "3 GB RAM + 2 CPU Cores (Dedicated)"
          },
          {
            "label": "Performance",
            "val": "Up to 10x Boosted Speed"
          },
          {
            "label": "IP Address",
            "val": "Dedicated IP Address Included"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain"
          },
          {
            "label": "Backups",
            "val": "Automated Daily Backups"
          },
          {
            "label": "CDN",
            "val": "Cloudflare Enterprise CDN"
          },
          {
            "label": "Support",
            "val": "Priority 24/7 VIP Support Queue"
          }
        ],
        "ctaText": "클라우드 스타트업 선택"
      },
      {
        "name": "KVM 2 클라우드 VPS",
        "tagline": "개발자와 엔지니어를 위한 루트 관리자 권한 전용 서버",
        "price": "$7.99",
        "period": "/month",
        "savings": "55% 할인 + 제휴 20% 추가 할인",
        "popular": false,
        "category": "vps",
        "specs": [
          {
            "label": "CPU",
            "val": "2 Dedicated vCPU Cores"
          },
          {
            "label": "RAM",
            "val": "8 GB Dedicated RAM"
          },
          {
            "label": "Storage",
            "val": "100 GB High-IOPS NVMe"
          },
          {
            "label": "Bandwidth",
            "val": "8 TB High-Speed Traffic"
          },
          {
            "label": "Access",
            "val": "Full Root Administrative Access"
          },
          {
            "label": "Virtualization",
            "val": "100% Kernel-based (KVM)"
          },
          {
            "label": "Backups",
            "val": "Automated Weekly Snapshots"
          },
          {
            "label": "AI Terminal",
            "val": "AI Assistant for Linux Commands"
          },
          {
            "label": "OS Support",
            "val": "Ubuntu, Debian, AlmaLinux, Rocky"
          }
        ],
        "ctaText": "KVM VPS 선택"
      }
    ],
    "architectureHighlights": [
      {
        "title": "LiteSpeed Enterprise vs. Apache",
        "desc": "Unlike budget hosts that still use 20-year-old Apache software, Hostinger utilizes LiteSpeed Enterprise web servers. LiteSpeed processes static and dynamic requests simultaneously through event-driven architecture, reducing RAM usage and serving WordPress pages up to 500% faster.",
        "metric": "5x Faster TTFB"
      },
      {
        "title": "Global Tier-3 Data Centers",
        "desc": "Deploy your site closest to your target audience. Choose from global enterprise data center locations across the United States, United Kingdom, France, Netherlands, Lithuania, Singapore, India, and Brazil. Switch data center locations anytime with a single click.",
        "metric": "8 Global Regions"
      },
      {
        "title": "Multi-Layer Defensive Security",
        "desc": "Every website is shielded behind custom Web Application Firewalls (WAF), Cloudflare DDoS mitigation, automated SSL encryption, and Monarx real-time malware scanning that neutralizes malicious scripts before they execute.",
        "metric": "99.9% Uptime SLA"
      },
      {
        "title": "Next-Gen hPanel Control Center",
        "desc": "Forget clumsy, outdated cPanel interfaces. Hostinger custom-engineered hPanel to be clean, responsive, and intuitive. Manage DNS, create databases, install SSL certificates, set up staging sites, and access file managers in seconds.",
        "metric": "3x Faster Navigation"
      },
      {
        "title": "Automated Snapshot & Daily Backups",
        "desc": "Never worry about catastrophic data loss. Websites are backed up automatically with point-in-time restore capabilities. If an update breaks your website, roll back to an earlier version with a single click in your dashboard.",
        "metric": "Zero-Downtime Restores"
      },
      {
        "title": "Developer & Staging Toolkit",
        "desc": "Equipped with modern developer tooling including Git integration, WP-CLI, SSH access, PHP version switcher (from PHP 7.4 to PHP 8.3+), MySQL/phpMyAdmin access, and a one-click staging environment to test changes safely.",
        "metric": "Dev-Ready Stack"
      }
    ],
    "launchSteps": [
      {
        "step": "01",
        "title": "Click Safi Academy's Partner Link",
        "desc": "Access the exclusive portal using our verified referral URL to unlock special promotional pricing with up to 75% standard discount plus our 20% bonus."
      },
      {
        "step": "02",
        "title": "Select Your Preferred Plan",
        "desc": "Choose between Web Hosting (for blogs/portfolios), Cloud Hosting (for high-traffic businesses), or KVM VPS (for developers requiring root access)."
      },
      {
        "step": "03",
        "title": "Apply Code 89LSHAHEEKCO at Checkout",
        "desc": "Ensure the referral code 89LSHAHEEKCO is present in the coupon field to automatically lock in your additional 20% discount on your order."
      },
      {
        "step": "04",
        "title": "Claim Free Domain & Deploy in 60s",
        "desc": "Claim your free 1-year custom domain name (.com, .net, .org, etc.) and launch your site using the 1-click WordPress installer or the AI Website Builder."
      }
    ],
    "faqs": [
      {
        "q": "How do I claim the 20% discount using the referral code?",
        "a": "Simply click any of the 'Claim 20% Discount' or 'Get Started' buttons on this page. The referral code 89LSHAHEEKCO will be automatically appended to your checkout session. You can also copy the code directly using our 1-click coupon widget and paste it into the coupon code box during checkout at Hostinger.com to verify your 20% savings."
      },
      {
        "q": "Is the free domain name really included at no cost?",
        "a": "Yes! When you purchase any 12, 24, or 48-month Premium, Business, or Cloud hosting plan, Hostinger includes a free custom domain registration for your first full year. Popular extensions like .com, .net, .org, .online, and .tech are fully eligible."
      },
      {
        "q": "Can I migrate my existing website from another hosting provider for free?",
        "a": "Yes, 100% free. Hostinger provides an automated website migration service. Once you sign up, simply enter your current host's login details or WordPress URL in hPanel, and Hostinger's migration engineers and automated tools will transfer your entire site, databases, and emails with zero downtime."
      },
      {
        "q": "What is the difference between Web Hosting, Cloud Hosting, and VPS?",
        "a": "Web Hosting shares server hardware efficiently, making it the most affordable choice for personal sites and small businesses. Cloud Hosting isolates dedicated CPU and RAM resources within a virtual container, delivering 3x faster speeds and high redundancy for growing businesses. VPS (Virtual Private Server) provides full root administrative access, allowing developers to install custom operating systems, Docker containers, and complex backend APIs."
      },
      {
        "q": "Can I run modern programming languages like Node.js, Python, and Docker?",
        "a": "Yes. On KVM VPS plans, you have complete root access to run any stack including Node.js, Python, Ruby, Go, Docker, PostgreSQL, Redis, and custom microservices. On Web & Cloud plans, PHP 8.x, Git, WP-CLI, and MySQL are standard."
      },
      {
        "q": "What is the 30-day money-back guarantee policy?",
        "a": "Hostinger offers an unconditional 30-day money-back guarantee. If you are not completely satisfied with the speed, uptime, or control panel for any reason within the first 30 days of purchase, you can cancel and receive a full refund with no hassle."
      },
      {
        "q": "How does Hostinger's hPanel compare to traditional cPanel?",
        "a": "hPanel is Hostinger's custom-built control panel. Unlike legacy cPanel which can feel sluggish and complicated for beginners, hPanel is ultra-modern, intuitive, responsive on mobile devices, and significantly faster. It integrates domain management, DNS records, staging, file management, and AI assistance into one cohesive interface."
      },
      {
        "q": "Does Hostinger support SSL certificates and HTTPS encryption?",
        "a": "Yes. Every domain, subdomain, and parked domain hosted on Hostinger receives free, lifetime Let's Encrypt SSL certificates that install and renew automatically. You will never have to pay extra fees for website encryption."
      }
    ],
    "isRtl": false,
    "ctaGetStarted": "추가 20% 할인받고 시작하기",
    "ctaExploreCourses": "프로그래밍 및 클라우드 코스 보기",
    "bottomGuarantee": "30일 무조건 전액 환불 보장",
    "bottomInstant": "몇 초 만에 완료되는 클라우드 계정 즉시 활성화",
    "bottomChat": "연중무휴 24/7 우선 라이브 채팅 지원",
    "bottomDisclaimer": "* Hostinger는 독립된 클라우드 호스팅 제공업체입니다. 프로모션 할인, 도메인 제공 및 갱신 조건은 Hostinger에서 직접 관리합니다.",
    "metricSubTtfb": "LiteSpeed Enterprise 기반 초고속 최적화",
    "metricSubCdn": "Cloudflare Enterprise 글로벌 CDN 네트워크",
    "metricSubNvme": "엔터프라이즈급 NVMe 스토리지 (RAID-10)",
    "metricSubSec": "Monarx 및 WAF 실시간 웹 보안 방화벽"
  },
  "nl": {
    "disclosure": "Safi Academy maintains an official affiliate partnership with Hostinger. When you purchase hosting through our verified referral link or apply coupon code 89LSHAHEEKCO, you receive an exclusive 20% additional discount on your order, and Safi Academy may earn a referral commission at no additional cost to you. This support enables us to continue offering free coding, cloud, and entrepreneurship education globally.",
    "partnerDisclosureBadge": "Transparent Affiliate Disclosure:",
    "heroBadge": "Safi Academy Verified Partner • 20% Off Code: 89LSHAHEEKCO",
    "heroTitle": "Ultra-Fast NVMe Cloud & Next-Gen Web Hosting",
    "heroSubtitle": "Power your websites, web applications, and digital business on world-class infrastructure. Equipped with LiteSpeed Enterprise web servers, enterprise NVMe SSDs, 99.9% uptime SLA, global CDN, and autonomous AI agents.",
    "pill1": "LiteSpeed Enterprise & LSCache Included",
    "pill2": "Free 1-Year Domain & Lifetime Free SSL",
    "pill3": "Automated Daily & Weekly Backups",
    "pill4": "30-Day Money-Back Guarantee",
    "partnerCodeLabel": "Partner Code:",
    "copyCodeBtn": "Copy Code",
    "copiedBtn": "Copied! 20% Applied",
    "claimDiscountBtn": "Claim 20% Discount with Partner Link",
    "comparePlansBtn": "Compare Plans",
    "telemetryTitle": "Hostinger Cloud Telemetry",
    "telemetrySubtitle": "NVMe Tier-3 Infrastructure",
    "telemetryLive": "99.99% Live",
    "metricTtfb": "Server Response (TTFB)",
    "metricUptime": "Uptime Guarantee",
    "metricCdn": "Global Edge CDN",
    "metricAi": "Autonomous AI Debugging",
    "servicesBadge": "Cloud Ecosystem",
    "servicesTitle": "Comprehensive Cloud & Web Hosting Infrastructure",
    "servicesSubtitle": "Explore specialized cloud infrastructure engineered for creators, modern developers, agencies, and enterprise applications.",
    "plansBadge": "Special Partner Pricing",
    "plansTitle": "High-Performance Hosting Tiers",
    "plansSubtitle": "Choose the optimal hosting architecture for your personal brand, digital business, or SaaS platform.",
    "planFilterAll": "All Plans",
    "planFilterWeb": "Web Hosting",
    "planFilterCloud": "Cloud Hosting",
    "planFilterVps": "Cloud VPS",
    "archBadge": "Technical Benchmarks",
    "archTitle": "Enterprise Engineering & Cloud Benchmarks",
    "archSubtitle": "Discover the technical engineering advantages that set Hostinger apart from legacy hosting providers.",
    "stepsBadge": "Simple Activation Guide",
    "stepsTitle": "How to Activate Your 20% Bonus Discount",
    "stepsSubtitle": "Follow these 4 simple steps to lock in your special promotional rate and launch your website in under 2 minutes.",
    "faqsBadge": "Help & Clarifications",
    "faqsTitle": "Frequently Asked Questions",
    "services": [
      {
        "id": "web-hosting",
        "name": "High-Speed Web Hosting",
        "badge": "Most Popular",
        "category": "web",
        "shortDesc": "Optimized LiteSpeed infrastructure built for lightning-fast WordPress and dynamic websites.",
        "longDesc": "Hostinger's flagship web hosting is engineered on top of LiteSpeed Enterprise web servers, replacing slow legacy Apache engines. It incorporates the proprietary LSCache optimization plugin, server-level object caching, and HTTP/3 protocol support to deliver sub-200ms page load times. Perfect for personal blogs, business portfolios, and content websites seeking rock-solid 99.9% uptime with minimal setup overhead.",
        "specs": [
          "LiteSpeed Web Server with LSCache",
          "Free 1-Click WordPress Auto-Installer",
          "Free 1-Year Domain Registration Included",
          "Unlimited Free SSL Certificates",
          "Automated Weekly & Daily Backups",
          "Integrated Git Version Control Deployment"
        ]
      },
      {
        "id": "cloud-hosting",
        "name": "Enterprise Cloud Hosting",
        "badge": "High Performance",
        "category": "cloud",
        "shortDesc": "Isolated virtual containers with dedicated CPU, RAM, and automated instant resource scaling.",
        "longDesc": "Experience the power and stability of a dedicated server combined with the sheer simplicity of shared hosting. Each cloud account runs in an isolated virtual instance with dedicated RAM and vCPU cores. When your site experiences viral spikes, automated resource scaling absorbs the surge seamlessly without slowdowns or dropped connections. Includes a dedicated IP address and custom Cloudflare Enterprise routing.",
        "specs": [
          "Dedicated Virtual Resources (Up to 16GB RAM & 8 Cores)",
          "Dedicated IPv4 & IPv6 Address Included",
          "3x to 4x Faster Speed than Standard Hosting",
          "Built-in Cloudflare Enterprise CDN Protection",
          "Automated Daily Backups with 1-Click Restore",
          "Priority 24/7 VIP Technical Support"
        ]
      },
      {
        "id": "vps-hosting",
        "name": "KVM Cloud VPS Hosting",
        "badge": "Developers & DevOps",
        "category": "vps",
        "shortDesc": "Full root access, dedicated kernel virtualization, high-IOPS NVMe drives, and AI terminal assistance.",
        "longDesc": "Engineered for software engineers, backend developers, and tech leads who demand complete root-level control over their operating environment. Built upon Kernel-based Virtual Machine (KVM) technology, Hostinger VPS guarantees 100% dedicated hardware resource allocation. Deploy Docker containers, configure custom Node.js, Python, Ruby, or Go environments, and leverage the built-in AI Terminal Assistant to formulate Linux commands in seconds.",
        "specs": [
          "Full Root Access & Dedicated Kernel (KVM)",
          "Enterprise-Class NVMe Storage with Ultra-High IOPS",
          "OS Options: Ubuntu, Debian, AlmaLinux, Rocky Linux",
          "Docker, Node.js, Python & Microservices Ready",
          "Automated Weekly Snapshots & Firewall Rules",
          "Built-in AI Assistant for Terminal Configurations"
        ]
      },
      {
        "id": "agency-hosting",
        "name": "Agency Hosting & Hostinger Pro",
        "badge": "Agencies & Freelancers",
        "category": "web",
        "shortDesc": "Manage hundreds of client sites with unified credentials, team collaboration, and client sharing.",
        "longDesc": "Designed specifically for web design agencies, freelancers, and dev shops managing multiple client projects. The Hostinger Pro dashboard allows you to organize clients into workspaces, grant custom role-based permissions, and delegate access without sharing your master passwords. You can also deliver automated maintenance health checks, uptime reports, and white-labeled client experiences.",
        "specs": [
          "Centralized Multi-Client Management Portal",
          "Granular Role-Based Access Control (RBAC)",
          "Access Delegation Without Password Sharing",
          "Automated Client Website Maintenance Reports",
          "Integrated Referral & Commission Payouts",
          "Mass Plugin & Core WordPress Updates in 1-Click"
        ]
      },
      {
        "id": "ai-website-builder",
        "name": "AI Website Builder",
        "badge": "No-Code & Fast",
        "category": "web",
        "shortDesc": "Create stunning, fully responsive websites and e-commerce stores in under 60 seconds using AI.",
        "longDesc": "Transform a short text description into a fully functional, mobile-responsive, production-ready website in under a minute. The Hostinger AI Builder generates tailored layouts, copy, royalty-free images, and interactive contact forms. It includes a built-in AI Heatmap tool to predict visitor gaze patterns, an AI Logo Generator, and a robust e-commerce engine with 0% platform transaction fees.",
        "specs": [
          "Prompt-to-Website Generation in 60 Seconds",
          "Intuitive Drag-and-Drop Visual Canvas",
          "Integrated AI Copywriter & SEO Generator",
          "AI Heatmap for Conversion Rate Optimization",
          "Complete E-Commerce Suite (0% Transaction Fees)",
          "Mobile-First Responsive Layouts by Default"
        ]
      },
      {
        "id": "hostinger-horizons",
        "name": "Hostinger Horizons",
        "badge": "Next-Gen Cloud",
        "category": "cloud",
        "shortDesc": "Next-generation cloud ecosystem and edge deployment network built for the future of the web.",
        "longDesc": "Hostinger Horizons represents the cutting-edge evolution of global web infrastructure. By uniting edge computing, intelligent serverless routing, and globally distributed data caches, Horizons ensures websites load instantaneously regardless of visitor geography. It provides elastic infrastructure that adapts dynamically to emerging web standards, high-throughput media, and AI-driven web applications.",
        "specs": [
          "Next-Generation Edge-Native Architecture",
          "Ultra-Low Global Latency with Anycast Routing",
          "Automatic Elastic Resource Reallocation",
          "Future-Proof Compatibility with Modern Web Frameworks",
          "Tier-3 Globally Certified Data Center Backbone",
          "Continuous Performance & Reliability Tuning"
        ]
      },
      {
        "id": "business-email",
        "name": "Professional Business Email",
        "badge": "Brand Identity",
        "category": "web",
        "shortDesc": "Custom branded email addresses with robust anti-spam, calendar sync, and webmail portals.",
        "longDesc": "Establish immediate corporate credibility by sending messages from your own domain (e.g., name@yourcompany.com). Powered by Titan Email, this suite provides generous inbox storage (10GB to 50GB), advanced multi-layered anti-spam and anti-virus filtering, calendar management, and seamless synchronization across iOS, Android, macOS, and Windows devices.",
        "specs": [
          "Professional Branded Inboxes (@yourdomain.com)",
          "Up to 50GB Dedicated Storage per Mailbox",
          "Multi-Layer Anti-Spam & Zero-Day Threat Shield",
          "Integrated Business Calendar & Contact Manager",
          "Native Mobile Apps for iOS & Android",
          "Automated Email Forwarding & Signature Builder"
        ]
      },
      {
        "id": "reach-email",
        "name": "Reach Email Marketing",
        "badge": "Growth & Lead Gen",
        "category": "web",
        "shortDesc": "Built-in newsletter campaigns, automated drip sequences, and lead capture directly in hPanel.",
        "longDesc": "Nurture leads and convert visitors into repeat customers without paying for costly third-party email platforms. Reach Email Marketing is embedded directly within your hosting dashboard, allowing you to design beautiful newsletters with a drag-and-drop builder, segment subscribers by activity, launch automated welcome sequences, and monitor open and click-through metrics in real time.",
        "specs": [
          "Integrated Directly into Your Hosting Dashboard",
          "Drag-and-Drop Newsletter & Campaign Designer",
          "Automated Drip Sequences & Autoresponders",
          "Real-Time Delivery, Open, and Click Telemetry",
          "High Inbox Deliverability with Pre-Warmed IPs",
          "Seamless Form Integration with WordPress & HTML"
        ]
      },
      {
        "id": "managed-openclaw",
        "name": "Managed OpenClaw Microservices",
        "badge": "High Concurrency",
        "category": "cloud",
        "shortDesc": "Optimized containerized runtime environments for high-throughput background jobs and APIs.",
        "longDesc": "Managed OpenClaw is engineered for heavy computational workloads, background batch jobs, asynchronous task queues, and microservice APIs. It isolates computing processes to ensure zero resource contamination across your applications, giving backend developers an ultra-lean runtime environment optimized for low latency and high concurrent connections.",
        "specs": [
          "Isolated Containerized Microservice Architecture",
          "Optimized for High-Concurrency API Gateways",
          "Low-Overhead Compute Resource Allocation",
          "Continuous Process Health Monitoring & Self-Healing",
          "Integrated Micro-Telemetry & Error Logging",
          "Zero Server Maintenance & Automated Security Patching"
        ]
      },
      {
        "id": "ai-agents",
        "name": "Autonomous AI Hosting Agents",
        "badge": "Next-Gen AI",
        "category": "cloud",
        "shortDesc": "Intelligent in-dashboard agents that debug errors, optimize queries, and automate server management.",
        "longDesc": "Hostinger has integrated autonomous AI agents directly into hPanel. Need to identify why a WordPress plugin caused a critical error? The AI Agent analyzes error logs and suggests the exact fix. Need to optimize slow database queries, configure custom redirects, or generate .htaccess rewrite rules? Simply instruct the AI in natural language to execute the configuration safely.",
        "specs": [
          "Automated WordPress Plugin Conflict Diagnostics",
          "Natural Language .htaccess & Nginx Rule Generation",
          "Slow MySQL Query Detection & Indexing Advice",
          "Automated On-Page SEO Recommendations",
          "Terminal Command Generation for VPS Users",
          "24/7 Instant In-Dashboard Assistance"
        ]
      }
    ],
    "plans": [
      {
        "name": "Premium Webhosting",
        "tagline": "Ideaal voor persoonlijke websites, blogs en studentenprojecten",
        "price": "$2.99",
        "period": "/month",
        "savings": "Bespaar 75% + 20% extra partnerkorting",
        "popular": false,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "100 GB SSD"
          },
          {
            "label": "Performance",
            "val": "Standard LiteSpeed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Weekly Automated"
          },
          {
            "label": "Email",
            "val": "Free Business Email"
          },
          {
            "label": "AI Tools",
            "val": "Basic AI Website Builder"
          }
        ],
        "ctaText": "Kies Premium Plan"
      },
      {
        "name": "Business Webhosting",
        "tagline": "Aanbevolen voor bedrijven, startups en e-commerce winkels",
        "price": "$3.99",
        "period": "/month",
        "savings": "Bespaar 73% + 20% extra partnerkorting",
        "popular": true,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB Ultra NVMe (5x Faster)"
          },
          {
            "label": "Performance",
            "val": "Up to 5x Increased Speed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Daily & On-Demand Backups"
          },
          {
            "label": "CDN",
            "val": "Free Built-in CDN Included"
          },
          {
            "label": "Staging",
            "val": "1-Click WordPress Staging Tool"
          },
          {
            "label": "AI Tools",
            "val": "Full AI Website Builder Suite"
          }
        ],
        "ctaText": "Kies Business Plan"
      },
      {
        "name": "Cloud Startup",
        "tagline": "Toegewezen serverbronnen voor drukbezochte webtoepassingen",
        "price": "$9.99",
        "period": "/month",
        "savings": "Bespaar 60% + 20% extra partnerkorting",
        "popular": false,
        "category": "cloud",
        "specs": [
          {
            "label": "Websites",
            "val": "300 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB NVMe Storage"
          },
          {
            "label": "RAM / CPU",
            "val": "3 GB RAM + 2 CPU Cores (Dedicated)"
          },
          {
            "label": "Performance",
            "val": "Up to 10x Boosted Speed"
          },
          {
            "label": "IP Address",
            "val": "Dedicated IP Address Included"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain"
          },
          {
            "label": "Backups",
            "val": "Automated Daily Backups"
          },
          {
            "label": "CDN",
            "val": "Cloudflare Enterprise CDN"
          },
          {
            "label": "Support",
            "val": "Priority 24/7 VIP Support Queue"
          }
        ],
        "ctaText": "Kies Cloud Startup"
      },
      {
        "name": "KVM 2 Cloud VPS",
        "tagline": "Toegewezen serverkracht met volledige root-toegang voor ontwikkelaars",
        "price": "$7.99",
        "period": "/month",
        "savings": "Bespaar 55% + 20% extra partnerkorting",
        "popular": false,
        "category": "vps",
        "specs": [
          {
            "label": "CPU",
            "val": "2 Dedicated vCPU Cores"
          },
          {
            "label": "RAM",
            "val": "8 GB Dedicated RAM"
          },
          {
            "label": "Storage",
            "val": "100 GB High-IOPS NVMe"
          },
          {
            "label": "Bandwidth",
            "val": "8 TB High-Speed Traffic"
          },
          {
            "label": "Access",
            "val": "Full Root Administrative Access"
          },
          {
            "label": "Virtualization",
            "val": "100% Kernel-based (KVM)"
          },
          {
            "label": "Backups",
            "val": "Automated Weekly Snapshots"
          },
          {
            "label": "AI Terminal",
            "val": "AI Assistant for Linux Commands"
          },
          {
            "label": "OS Support",
            "val": "Ubuntu, Debian, AlmaLinux, Rocky"
          }
        ],
        "ctaText": "Kies KVM VPS"
      }
    ],
    "architectureHighlights": [
      {
        "title": "LiteSpeed Enterprise vs. Apache",
        "desc": "Unlike budget hosts that still use 20-year-old Apache software, Hostinger utilizes LiteSpeed Enterprise web servers. LiteSpeed processes static and dynamic requests simultaneously through event-driven architecture, reducing RAM usage and serving WordPress pages up to 500% faster.",
        "metric": "5x Faster TTFB"
      },
      {
        "title": "Global Tier-3 Data Centers",
        "desc": "Deploy your site closest to your target audience. Choose from global enterprise data center locations across the United States, United Kingdom, France, Netherlands, Lithuania, Singapore, India, and Brazil. Switch data center locations anytime with a single click.",
        "metric": "8 Global Regions"
      },
      {
        "title": "Multi-Layer Defensive Security",
        "desc": "Every website is shielded behind custom Web Application Firewalls (WAF), Cloudflare DDoS mitigation, automated SSL encryption, and Monarx real-time malware scanning that neutralizes malicious scripts before they execute.",
        "metric": "99.9% Uptime SLA"
      },
      {
        "title": "Next-Gen hPanel Control Center",
        "desc": "Forget clumsy, outdated cPanel interfaces. Hostinger custom-engineered hPanel to be clean, responsive, and intuitive. Manage DNS, create databases, install SSL certificates, set up staging sites, and access file managers in seconds.",
        "metric": "3x Faster Navigation"
      },
      {
        "title": "Automated Snapshot & Daily Backups",
        "desc": "Never worry about catastrophic data loss. Websites are backed up automatically with point-in-time restore capabilities. If an update breaks your website, roll back to an earlier version with a single click in your dashboard.",
        "metric": "Zero-Downtime Restores"
      },
      {
        "title": "Developer & Staging Toolkit",
        "desc": "Equipped with modern developer tooling including Git integration, WP-CLI, SSH access, PHP version switcher (from PHP 7.4 to PHP 8.3+), MySQL/phpMyAdmin access, and a one-click staging environment to test changes safely.",
        "metric": "Dev-Ready Stack"
      }
    ],
    "launchSteps": [
      {
        "step": "01",
        "title": "Click Safi Academy's Partner Link",
        "desc": "Access the exclusive portal using our verified referral URL to unlock special promotional pricing with up to 75% standard discount plus our 20% bonus."
      },
      {
        "step": "02",
        "title": "Select Your Preferred Plan",
        "desc": "Choose between Web Hosting (for blogs/portfolios), Cloud Hosting (for high-traffic businesses), or KVM VPS (for developers requiring root access)."
      },
      {
        "step": "03",
        "title": "Apply Code 89LSHAHEEKCO at Checkout",
        "desc": "Ensure the referral code 89LSHAHEEKCO is present in the coupon field to automatically lock in your additional 20% discount on your order."
      },
      {
        "step": "04",
        "title": "Claim Free Domain & Deploy in 60s",
        "desc": "Claim your free 1-year custom domain name (.com, .net, .org, etc.) and launch your site using the 1-click WordPress installer or the AI Website Builder."
      }
    ],
    "faqs": [
      {
        "q": "How do I claim the 20% discount using the referral code?",
        "a": "Simply click any of the 'Claim 20% Discount' or 'Get Started' buttons on this page. The referral code 89LSHAHEEKCO will be automatically appended to your checkout session. You can also copy the code directly using our 1-click coupon widget and paste it into the coupon code box during checkout at Hostinger.com to verify your 20% savings."
      },
      {
        "q": "Is the free domain name really included at no cost?",
        "a": "Yes! When you purchase any 12, 24, or 48-month Premium, Business, or Cloud hosting plan, Hostinger includes a free custom domain registration for your first full year. Popular extensions like .com, .net, .org, .online, and .tech are fully eligible."
      },
      {
        "q": "Can I migrate my existing website from another hosting provider for free?",
        "a": "Yes, 100% free. Hostinger provides an automated website migration service. Once you sign up, simply enter your current host's login details or WordPress URL in hPanel, and Hostinger's migration engineers and automated tools will transfer your entire site, databases, and emails with zero downtime."
      },
      {
        "q": "What is the difference between Web Hosting, Cloud Hosting, and VPS?",
        "a": "Web Hosting shares server hardware efficiently, making it the most affordable choice for personal sites and small businesses. Cloud Hosting isolates dedicated CPU and RAM resources within a virtual container, delivering 3x faster speeds and high redundancy for growing businesses. VPS (Virtual Private Server) provides full root administrative access, allowing developers to install custom operating systems, Docker containers, and complex backend APIs."
      },
      {
        "q": "Can I run modern programming languages like Node.js, Python, and Docker?",
        "a": "Yes. On KVM VPS plans, you have complete root access to run any stack including Node.js, Python, Ruby, Go, Docker, PostgreSQL, Redis, and custom microservices. On Web & Cloud plans, PHP 8.x, Git, WP-CLI, and MySQL are standard."
      },
      {
        "q": "What is the 30-day money-back guarantee policy?",
        "a": "Hostinger offers an unconditional 30-day money-back guarantee. If you are not completely satisfied with the speed, uptime, or control panel for any reason within the first 30 days of purchase, you can cancel and receive a full refund with no hassle."
      },
      {
        "q": "How does Hostinger's hPanel compare to traditional cPanel?",
        "a": "hPanel is Hostinger's custom-built control panel. Unlike legacy cPanel which can feel sluggish and complicated for beginners, hPanel is ultra-modern, intuitive, responsive on mobile devices, and significantly faster. It integrates domain management, DNS records, staging, file management, and AI assistance into one cohesive interface."
      },
      {
        "q": "Does Hostinger support SSL certificates and HTTPS encryption?",
        "a": "Yes. Every domain, subdomain, and parked domain hosted on Hostinger receives free, lifetime Let's Encrypt SSL certificates that install and renew automatically. You will never have to pay extra fees for website encryption."
      }
    ],
    "isRtl": false,
    "ctaGetStarted": "Start met 20% extra korting",
    "ctaExploreCourses": "Ontdek programmeercursussen",
    "bottomGuarantee": "30 dagen niet-goed-geld-terug-garantie zonder voorwaarden",
    "bottomInstant": "Directe activatie van uw cloud-account",
    "bottomChat": "24/7 prioritaire live chat-ondersteuning",
    "bottomDisclaimer": "* Hostinger is een onafhankelijke cloud hosting provider. Actiekortingen, domeinbeschikbaarheid en verlengingsvoorwaarden worden rechtstreeks door Hostinger beheerd.",
    "metricSubTtfb": "LiteSpeed Enterprise geoptimaliseerd",
    "metricSubCdn": "Cloudflare Enterprise Global CDN",
    "metricSubNvme": "Enterprise NVMe-opslag (RAID-10)",
    "metricSubSec": "Real-time beveiliging met Monarx & WAF"
  },
  "uz": {
    "disclosure": "Safi Academy maintains an official affiliate partnership with Hostinger. When you purchase hosting through our verified referral link or apply coupon code 89LSHAHEEKCO, you receive an exclusive 20% additional discount on your order, and Safi Academy may earn a referral commission at no additional cost to you. This support enables us to continue offering free coding, cloud, and entrepreneurship education globally.",
    "partnerDisclosureBadge": "Transparent Affiliate Disclosure:",
    "heroBadge": "Safi Academy Verified Partner • 20% Off Code: 89LSHAHEEKCO",
    "heroTitle": "Ultra-Fast NVMe Cloud & Next-Gen Web Hosting",
    "heroSubtitle": "Power your websites, web applications, and digital business on world-class infrastructure. Equipped with LiteSpeed Enterprise web servers, enterprise NVMe SSDs, 99.9% uptime SLA, global CDN, and autonomous AI agents.",
    "pill1": "LiteSpeed Enterprise & LSCache Included",
    "pill2": "Free 1-Year Domain & Lifetime Free SSL",
    "pill3": "Automated Daily & Weekly Backups",
    "pill4": "30-Day Money-Back Guarantee",
    "partnerCodeLabel": "Partner Code:",
    "copyCodeBtn": "Copy Code",
    "copiedBtn": "Copied! 20% Applied",
    "claimDiscountBtn": "Claim 20% Discount with Partner Link",
    "comparePlansBtn": "Compare Plans",
    "telemetryTitle": "Hostinger Cloud Telemetry",
    "telemetrySubtitle": "NVMe Tier-3 Infrastructure",
    "telemetryLive": "99.99% Live",
    "metricTtfb": "Server Response (TTFB)",
    "metricUptime": "Uptime Guarantee",
    "metricCdn": "Global Edge CDN",
    "metricAi": "Autonomous AI Debugging",
    "servicesBadge": "Cloud Ecosystem",
    "servicesTitle": "Comprehensive Cloud & Web Hosting Infrastructure",
    "servicesSubtitle": "Explore specialized cloud infrastructure engineered for creators, modern developers, agencies, and enterprise applications.",
    "plansBadge": "Special Partner Pricing",
    "plansTitle": "High-Performance Hosting Tiers",
    "plansSubtitle": "Choose the optimal hosting architecture for your personal brand, digital business, or SaaS platform.",
    "planFilterAll": "All Plans",
    "planFilterWeb": "Web Hosting",
    "planFilterCloud": "Cloud Hosting",
    "planFilterVps": "Cloud VPS",
    "archBadge": "Technical Benchmarks",
    "archTitle": "Enterprise Engineering & Cloud Benchmarks",
    "archSubtitle": "Discover the technical engineering advantages that set Hostinger apart from legacy hosting providers.",
    "stepsBadge": "Simple Activation Guide",
    "stepsTitle": "How to Activate Your 20% Bonus Discount",
    "stepsSubtitle": "Follow these 4 simple steps to lock in your special promotional rate and launch your website in under 2 minutes.",
    "faqsBadge": "Help & Clarifications",
    "faqsTitle": "Frequently Asked Questions",
    "services": [
      {
        "id": "web-hosting",
        "name": "High-Speed Web Hosting",
        "badge": "Most Popular",
        "category": "web",
        "shortDesc": "Optimized LiteSpeed infrastructure built for lightning-fast WordPress and dynamic websites.",
        "longDesc": "Hostinger's flagship web hosting is engineered on top of LiteSpeed Enterprise web servers, replacing slow legacy Apache engines. It incorporates the proprietary LSCache optimization plugin, server-level object caching, and HTTP/3 protocol support to deliver sub-200ms page load times. Perfect for personal blogs, business portfolios, and content websites seeking rock-solid 99.9% uptime with minimal setup overhead.",
        "specs": [
          "LiteSpeed Web Server with LSCache",
          "Free 1-Click WordPress Auto-Installer",
          "Free 1-Year Domain Registration Included",
          "Unlimited Free SSL Certificates",
          "Automated Weekly & Daily Backups",
          "Integrated Git Version Control Deployment"
        ]
      },
      {
        "id": "cloud-hosting",
        "name": "Enterprise Cloud Hosting",
        "badge": "High Performance",
        "category": "cloud",
        "shortDesc": "Isolated virtual containers with dedicated CPU, RAM, and automated instant resource scaling.",
        "longDesc": "Experience the power and stability of a dedicated server combined with the sheer simplicity of shared hosting. Each cloud account runs in an isolated virtual instance with dedicated RAM and vCPU cores. When your site experiences viral spikes, automated resource scaling absorbs the surge seamlessly without slowdowns or dropped connections. Includes a dedicated IP address and custom Cloudflare Enterprise routing.",
        "specs": [
          "Dedicated Virtual Resources (Up to 16GB RAM & 8 Cores)",
          "Dedicated IPv4 & IPv6 Address Included",
          "3x to 4x Faster Speed than Standard Hosting",
          "Built-in Cloudflare Enterprise CDN Protection",
          "Automated Daily Backups with 1-Click Restore",
          "Priority 24/7 VIP Technical Support"
        ]
      },
      {
        "id": "vps-hosting",
        "name": "KVM Cloud VPS Hosting",
        "badge": "Developers & DevOps",
        "category": "vps",
        "shortDesc": "Full root access, dedicated kernel virtualization, high-IOPS NVMe drives, and AI terminal assistance.",
        "longDesc": "Engineered for software engineers, backend developers, and tech leads who demand complete root-level control over their operating environment. Built upon Kernel-based Virtual Machine (KVM) technology, Hostinger VPS guarantees 100% dedicated hardware resource allocation. Deploy Docker containers, configure custom Node.js, Python, Ruby, or Go environments, and leverage the built-in AI Terminal Assistant to formulate Linux commands in seconds.",
        "specs": [
          "Full Root Access & Dedicated Kernel (KVM)",
          "Enterprise-Class NVMe Storage with Ultra-High IOPS",
          "OS Options: Ubuntu, Debian, AlmaLinux, Rocky Linux",
          "Docker, Node.js, Python & Microservices Ready",
          "Automated Weekly Snapshots & Firewall Rules",
          "Built-in AI Assistant for Terminal Configurations"
        ]
      },
      {
        "id": "agency-hosting",
        "name": "Agency Hosting & Hostinger Pro",
        "badge": "Agencies & Freelancers",
        "category": "web",
        "shortDesc": "Manage hundreds of client sites with unified credentials, team collaboration, and client sharing.",
        "longDesc": "Designed specifically for web design agencies, freelancers, and dev shops managing multiple client projects. The Hostinger Pro dashboard allows you to organize clients into workspaces, grant custom role-based permissions, and delegate access without sharing your master passwords. You can also deliver automated maintenance health checks, uptime reports, and white-labeled client experiences.",
        "specs": [
          "Centralized Multi-Client Management Portal",
          "Granular Role-Based Access Control (RBAC)",
          "Access Delegation Without Password Sharing",
          "Automated Client Website Maintenance Reports",
          "Integrated Referral & Commission Payouts",
          "Mass Plugin & Core WordPress Updates in 1-Click"
        ]
      },
      {
        "id": "ai-website-builder",
        "name": "AI Website Builder",
        "badge": "No-Code & Fast",
        "category": "web",
        "shortDesc": "Create stunning, fully responsive websites and e-commerce stores in under 60 seconds using AI.",
        "longDesc": "Transform a short text description into a fully functional, mobile-responsive, production-ready website in under a minute. The Hostinger AI Builder generates tailored layouts, copy, royalty-free images, and interactive contact forms. It includes a built-in AI Heatmap tool to predict visitor gaze patterns, an AI Logo Generator, and a robust e-commerce engine with 0% platform transaction fees.",
        "specs": [
          "Prompt-to-Website Generation in 60 Seconds",
          "Intuitive Drag-and-Drop Visual Canvas",
          "Integrated AI Copywriter & SEO Generator",
          "AI Heatmap for Conversion Rate Optimization",
          "Complete E-Commerce Suite (0% Transaction Fees)",
          "Mobile-First Responsive Layouts by Default"
        ]
      },
      {
        "id": "hostinger-horizons",
        "name": "Hostinger Horizons",
        "badge": "Next-Gen Cloud",
        "category": "cloud",
        "shortDesc": "Next-generation cloud ecosystem and edge deployment network built for the future of the web.",
        "longDesc": "Hostinger Horizons represents the cutting-edge evolution of global web infrastructure. By uniting edge computing, intelligent serverless routing, and globally distributed data caches, Horizons ensures websites load instantaneously regardless of visitor geography. It provides elastic infrastructure that adapts dynamically to emerging web standards, high-throughput media, and AI-driven web applications.",
        "specs": [
          "Next-Generation Edge-Native Architecture",
          "Ultra-Low Global Latency with Anycast Routing",
          "Automatic Elastic Resource Reallocation",
          "Future-Proof Compatibility with Modern Web Frameworks",
          "Tier-3 Globally Certified Data Center Backbone",
          "Continuous Performance & Reliability Tuning"
        ]
      },
      {
        "id": "business-email",
        "name": "Professional Business Email",
        "badge": "Brand Identity",
        "category": "web",
        "shortDesc": "Custom branded email addresses with robust anti-spam, calendar sync, and webmail portals.",
        "longDesc": "Establish immediate corporate credibility by sending messages from your own domain (e.g., name@yourcompany.com). Powered by Titan Email, this suite provides generous inbox storage (10GB to 50GB), advanced multi-layered anti-spam and anti-virus filtering, calendar management, and seamless synchronization across iOS, Android, macOS, and Windows devices.",
        "specs": [
          "Professional Branded Inboxes (@yourdomain.com)",
          "Up to 50GB Dedicated Storage per Mailbox",
          "Multi-Layer Anti-Spam & Zero-Day Threat Shield",
          "Integrated Business Calendar & Contact Manager",
          "Native Mobile Apps for iOS & Android",
          "Automated Email Forwarding & Signature Builder"
        ]
      },
      {
        "id": "reach-email",
        "name": "Reach Email Marketing",
        "badge": "Growth & Lead Gen",
        "category": "web",
        "shortDesc": "Built-in newsletter campaigns, automated drip sequences, and lead capture directly in hPanel.",
        "longDesc": "Nurture leads and convert visitors into repeat customers without paying for costly third-party email platforms. Reach Email Marketing is embedded directly within your hosting dashboard, allowing you to design beautiful newsletters with a drag-and-drop builder, segment subscribers by activity, launch automated welcome sequences, and monitor open and click-through metrics in real time.",
        "specs": [
          "Integrated Directly into Your Hosting Dashboard",
          "Drag-and-Drop Newsletter & Campaign Designer",
          "Automated Drip Sequences & Autoresponders",
          "Real-Time Delivery, Open, and Click Telemetry",
          "High Inbox Deliverability with Pre-Warmed IPs",
          "Seamless Form Integration with WordPress & HTML"
        ]
      },
      {
        "id": "managed-openclaw",
        "name": "Managed OpenClaw Microservices",
        "badge": "High Concurrency",
        "category": "cloud",
        "shortDesc": "Optimized containerized runtime environments for high-throughput background jobs and APIs.",
        "longDesc": "Managed OpenClaw is engineered for heavy computational workloads, background batch jobs, asynchronous task queues, and microservice APIs. It isolates computing processes to ensure zero resource contamination across your applications, giving backend developers an ultra-lean runtime environment optimized for low latency and high concurrent connections.",
        "specs": [
          "Isolated Containerized Microservice Architecture",
          "Optimized for High-Concurrency API Gateways",
          "Low-Overhead Compute Resource Allocation",
          "Continuous Process Health Monitoring & Self-Healing",
          "Integrated Micro-Telemetry & Error Logging",
          "Zero Server Maintenance & Automated Security Patching"
        ]
      },
      {
        "id": "ai-agents",
        "name": "Autonomous AI Hosting Agents",
        "badge": "Next-Gen AI",
        "category": "cloud",
        "shortDesc": "Intelligent in-dashboard agents that debug errors, optimize queries, and automate server management.",
        "longDesc": "Hostinger has integrated autonomous AI agents directly into hPanel. Need to identify why a WordPress plugin caused a critical error? The AI Agent analyzes error logs and suggests the exact fix. Need to optimize slow database queries, configure custom redirects, or generate .htaccess rewrite rules? Simply instruct the AI in natural language to execute the configuration safely.",
        "specs": [
          "Automated WordPress Plugin Conflict Diagnostics",
          "Natural Language .htaccess & Nginx Rule Generation",
          "Slow MySQL Query Detection & Indexing Advice",
          "Automated On-Page SEO Recommendations",
          "Terminal Command Generation for VPS Users",
          "24/7 Instant In-Dashboard Assistance"
        ]
      }
    ],
    "plans": [
      {
        "name": "Premium veb-xosting",
        "tagline": "Shaxsiy veb-saytlar, bloglar va talabalar loyihalari uchun ideal",
        "price": "$2.99",
        "period": "/month",
        "savings": "75% tejash + 20% hamkorlik chegirmasi",
        "popular": false,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "100 GB SSD"
          },
          {
            "label": "Performance",
            "val": "Standard LiteSpeed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Weekly Automated"
          },
          {
            "label": "Email",
            "val": "Free Business Email"
          },
          {
            "label": "AI Tools",
            "val": "Basic AI Website Builder"
          }
        ],
        "ctaText": "Premium tarifni tanlash"
      },
      {
        "name": "Biznes veb-xosting",
        "tagline": "Kompaniyalar, startaplar va internet-do'konlar uchun tavsiya etiladi",
        "price": "$3.99",
        "period": "/month",
        "savings": "73% tejash + 20% hamkorlik chegirmasi",
        "popular": true,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB Ultra NVMe (5x Faster)"
          },
          {
            "label": "Performance",
            "val": "Up to 5x Increased Speed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Daily & On-Demand Backups"
          },
          {
            "label": "CDN",
            "val": "Free Built-in CDN Included"
          },
          {
            "label": "Staging",
            "val": "1-Click WordPress Staging Tool"
          },
          {
            "label": "AI Tools",
            "val": "Full AI Website Builder Suite"
          }
        ],
        "ctaText": "Biznes tarifni tanlash"
      },
      {
        "name": "Cloud Startup xosting",
        "tagline": "Yuqori trafikli ilovalar va yirik loyihalar uchun ajratilgan quvvat",
        "price": "$9.99",
        "period": "/month",
        "savings": "60% tejash + 20% hamkorlik chegirmasi",
        "popular": false,
        "category": "cloud",
        "specs": [
          {
            "label": "Websites",
            "val": "300 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB NVMe Storage"
          },
          {
            "label": "RAM / CPU",
            "val": "3 GB RAM + 2 CPU Cores (Dedicated)"
          },
          {
            "label": "Performance",
            "val": "Up to 10x Boosted Speed"
          },
          {
            "label": "IP Address",
            "val": "Dedicated IP Address Included"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain"
          },
          {
            "label": "Backups",
            "val": "Automated Daily Backups"
          },
          {
            "label": "CDN",
            "val": "Cloudflare Enterprise CDN"
          },
          {
            "label": "Support",
            "val": "Priority 24/7 VIP Support Queue"
          }
        ],
        "ctaText": "Cloud Startup tanlash"
      },
      {
        "name": "KVM 2 Cloud VPS",
        "tagline": "Dasturchilar va muhandislar uchun to'liq root ruxsatli virtual server",
        "price": "$7.99",
        "period": "/month",
        "savings": "55% tejash + 20% hamkorlik chegirmasi",
        "popular": false,
        "category": "vps",
        "specs": [
          {
            "label": "CPU",
            "val": "2 Dedicated vCPU Cores"
          },
          {
            "label": "RAM",
            "val": "8 GB Dedicated RAM"
          },
          {
            "label": "Storage",
            "val": "100 GB High-IOPS NVMe"
          },
          {
            "label": "Bandwidth",
            "val": "8 TB High-Speed Traffic"
          },
          {
            "label": "Access",
            "val": "Full Root Administrative Access"
          },
          {
            "label": "Virtualization",
            "val": "100% Kernel-based (KVM)"
          },
          {
            "label": "Backups",
            "val": "Automated Weekly Snapshots"
          },
          {
            "label": "AI Terminal",
            "val": "AI Assistant for Linux Commands"
          },
          {
            "label": "OS Support",
            "val": "Ubuntu, Debian, AlmaLinux, Rocky"
          }
        ],
        "ctaText": "KVM VPS tanlash"
      }
    ],
    "architectureHighlights": [
      {
        "title": "LiteSpeed Enterprise vs. Apache",
        "desc": "Unlike budget hosts that still use 20-year-old Apache software, Hostinger utilizes LiteSpeed Enterprise web servers. LiteSpeed processes static and dynamic requests simultaneously through event-driven architecture, reducing RAM usage and serving WordPress pages up to 500% faster.",
        "metric": "5x Faster TTFB"
      },
      {
        "title": "Global Tier-3 Data Centers",
        "desc": "Deploy your site closest to your target audience. Choose from global enterprise data center locations across the United States, United Kingdom, France, Netherlands, Lithuania, Singapore, India, and Brazil. Switch data center locations anytime with a single click.",
        "metric": "8 Global Regions"
      },
      {
        "title": "Multi-Layer Defensive Security",
        "desc": "Every website is shielded behind custom Web Application Firewalls (WAF), Cloudflare DDoS mitigation, automated SSL encryption, and Monarx real-time malware scanning that neutralizes malicious scripts before they execute.",
        "metric": "99.9% Uptime SLA"
      },
      {
        "title": "Next-Gen hPanel Control Center",
        "desc": "Forget clumsy, outdated cPanel interfaces. Hostinger custom-engineered hPanel to be clean, responsive, and intuitive. Manage DNS, create databases, install SSL certificates, set up staging sites, and access file managers in seconds.",
        "metric": "3x Faster Navigation"
      },
      {
        "title": "Automated Snapshot & Daily Backups",
        "desc": "Never worry about catastrophic data loss. Websites are backed up automatically with point-in-time restore capabilities. If an update breaks your website, roll back to an earlier version with a single click in your dashboard.",
        "metric": "Zero-Downtime Restores"
      },
      {
        "title": "Developer & Staging Toolkit",
        "desc": "Equipped with modern developer tooling including Git integration, WP-CLI, SSH access, PHP version switcher (from PHP 7.4 to PHP 8.3+), MySQL/phpMyAdmin access, and a one-click staging environment to test changes safely.",
        "metric": "Dev-Ready Stack"
      }
    ],
    "launchSteps": [
      {
        "step": "01",
        "title": "Click Safi Academy's Partner Link",
        "desc": "Access the exclusive portal using our verified referral URL to unlock special promotional pricing with up to 75% standard discount plus our 20% bonus."
      },
      {
        "step": "02",
        "title": "Select Your Preferred Plan",
        "desc": "Choose between Web Hosting (for blogs/portfolios), Cloud Hosting (for high-traffic businesses), or KVM VPS (for developers requiring root access)."
      },
      {
        "step": "03",
        "title": "Apply Code 89LSHAHEEKCO at Checkout",
        "desc": "Ensure the referral code 89LSHAHEEKCO is present in the coupon field to automatically lock in your additional 20% discount on your order."
      },
      {
        "step": "04",
        "title": "Claim Free Domain & Deploy in 60s",
        "desc": "Claim your free 1-year custom domain name (.com, .net, .org, etc.) and launch your site using the 1-click WordPress installer or the AI Website Builder."
      }
    ],
    "faqs": [
      {
        "q": "How do I claim the 20% discount using the referral code?",
        "a": "Simply click any of the 'Claim 20% Discount' or 'Get Started' buttons on this page. The referral code 89LSHAHEEKCO will be automatically appended to your checkout session. You can also copy the code directly using our 1-click coupon widget and paste it into the coupon code box during checkout at Hostinger.com to verify your 20% savings."
      },
      {
        "q": "Is the free domain name really included at no cost?",
        "a": "Yes! When you purchase any 12, 24, or 48-month Premium, Business, or Cloud hosting plan, Hostinger includes a free custom domain registration for your first full year. Popular extensions like .com, .net, .org, .online, and .tech are fully eligible."
      },
      {
        "q": "Can I migrate my existing website from another hosting provider for free?",
        "a": "Yes, 100% free. Hostinger provides an automated website migration service. Once you sign up, simply enter your current host's login details or WordPress URL in hPanel, and Hostinger's migration engineers and automated tools will transfer your entire site, databases, and emails with zero downtime."
      },
      {
        "q": "What is the difference between Web Hosting, Cloud Hosting, and VPS?",
        "a": "Web Hosting shares server hardware efficiently, making it the most affordable choice for personal sites and small businesses. Cloud Hosting isolates dedicated CPU and RAM resources within a virtual container, delivering 3x faster speeds and high redundancy for growing businesses. VPS (Virtual Private Server) provides full root administrative access, allowing developers to install custom operating systems, Docker containers, and complex backend APIs."
      },
      {
        "q": "Can I run modern programming languages like Node.js, Python, and Docker?",
        "a": "Yes. On KVM VPS plans, you have complete root access to run any stack including Node.js, Python, Ruby, Go, Docker, PostgreSQL, Redis, and custom microservices. On Web & Cloud plans, PHP 8.x, Git, WP-CLI, and MySQL are standard."
      },
      {
        "q": "What is the 30-day money-back guarantee policy?",
        "a": "Hostinger offers an unconditional 30-day money-back guarantee. If you are not completely satisfied with the speed, uptime, or control panel for any reason within the first 30 days of purchase, you can cancel and receive a full refund with no hassle."
      },
      {
        "q": "How does Hostinger's hPanel compare to traditional cPanel?",
        "a": "hPanel is Hostinger's custom-built control panel. Unlike legacy cPanel which can feel sluggish and complicated for beginners, hPanel is ultra-modern, intuitive, responsive on mobile devices, and significantly faster. It integrates domain management, DNS records, staging, file management, and AI assistance into one cohesive interface."
      },
      {
        "q": "Does Hostinger support SSL certificates and HTTPS encryption?",
        "a": "Yes. Every domain, subdomain, and parked domain hosted on Hostinger receives free, lifetime Let's Encrypt SSL certificates that install and renew automatically. You will never have to pay extra fees for website encryption."
      }
    ],
    "isRtl": false,
    "ctaGetStarted": "20% maxsus chegirma bilan boshlash",
    "ctaExploreCourses": "Dasturlash kurslarini ko'rish",
    "bottomGuarantee": "30 kunlik so'zsiz pulni qaytarish kafolati",
    "bottomInstant": "Bulutli hisob bir necha soniyada darhol faollashadi",
    "bottomChat": "24/7 ustuvor onlayn chat yordami",
    "bottomDisclaimer": "* Hostinger mustaqil bulutli xosting provayderi hisoblanadi. Maxsus chegirmalar, domen nomlari va yangilash shartlari bevosita Hostinger tomonidan boshqariladi.",
    "metricSubTtfb": "LiteSpeed Enterprise orqali tezlashtirilgan",
    "metricSubCdn": "Cloudflare Enterprise global tarmog'i",
    "metricSubNvme": "Yuqori tezlikdagi korporativ NVMe (RAID-10)",
    "metricSubSec": "Monarx va WAF bilan real vaqtda himoya"
  },
  "id": {
    "disclosure": "Safi Academy maintains an official affiliate partnership with Hostinger. When you purchase hosting through our verified referral link or apply coupon code 89LSHAHEEKCO, you receive an exclusive 20% additional discount on your order, and Safi Academy may earn a referral commission at no additional cost to you. This support enables us to continue offering free coding, cloud, and entrepreneurship education globally.",
    "partnerDisclosureBadge": "Transparent Affiliate Disclosure:",
    "heroBadge": "Safi Academy Verified Partner • 20% Off Code: 89LSHAHEEKCO",
    "heroTitle": "Ultra-Fast NVMe Cloud & Next-Gen Web Hosting",
    "heroSubtitle": "Power your websites, web applications, and digital business on world-class infrastructure. Equipped with LiteSpeed Enterprise web servers, enterprise NVMe SSDs, 99.9% uptime SLA, global CDN, and autonomous AI agents.",
    "pill1": "LiteSpeed Enterprise & LSCache Included",
    "pill2": "Free 1-Year Domain & Lifetime Free SSL",
    "pill3": "Automated Daily & Weekly Backups",
    "pill4": "30-Day Money-Back Guarantee",
    "partnerCodeLabel": "Partner Code:",
    "copyCodeBtn": "Copy Code",
    "copiedBtn": "Copied! 20% Applied",
    "claimDiscountBtn": "Claim 20% Discount with Partner Link",
    "comparePlansBtn": "Compare Plans",
    "telemetryTitle": "Hostinger Cloud Telemetry",
    "telemetrySubtitle": "NVMe Tier-3 Infrastructure",
    "telemetryLive": "99.99% Live",
    "metricTtfb": "Server Response (TTFB)",
    "metricUptime": "Uptime Guarantee",
    "metricCdn": "Global Edge CDN",
    "metricAi": "Autonomous AI Debugging",
    "servicesBadge": "Cloud Ecosystem",
    "servicesTitle": "Comprehensive Cloud & Web Hosting Infrastructure",
    "servicesSubtitle": "Explore specialized cloud infrastructure engineered for creators, modern developers, agencies, and enterprise applications.",
    "plansBadge": "Special Partner Pricing",
    "plansTitle": "High-Performance Hosting Tiers",
    "plansSubtitle": "Choose the optimal hosting architecture for your personal brand, digital business, or SaaS platform.",
    "planFilterAll": "All Plans",
    "planFilterWeb": "Web Hosting",
    "planFilterCloud": "Cloud Hosting",
    "planFilterVps": "Cloud VPS",
    "archBadge": "Technical Benchmarks",
    "archTitle": "Enterprise Engineering & Cloud Benchmarks",
    "archSubtitle": "Discover the technical engineering advantages that set Hostinger apart from legacy hosting providers.",
    "stepsBadge": "Simple Activation Guide",
    "stepsTitle": "How to Activate Your 20% Bonus Discount",
    "stepsSubtitle": "Follow these 4 simple steps to lock in your special promotional rate and launch your website in under 2 minutes.",
    "faqsBadge": "Help & Clarifications",
    "faqsTitle": "Frequently Asked Questions",
    "services": [
      {
        "id": "web-hosting",
        "name": "High-Speed Web Hosting",
        "badge": "Most Popular",
        "category": "web",
        "shortDesc": "Optimized LiteSpeed infrastructure built for lightning-fast WordPress and dynamic websites.",
        "longDesc": "Hostinger's flagship web hosting is engineered on top of LiteSpeed Enterprise web servers, replacing slow legacy Apache engines. It incorporates the proprietary LSCache optimization plugin, server-level object caching, and HTTP/3 protocol support to deliver sub-200ms page load times. Perfect for personal blogs, business portfolios, and content websites seeking rock-solid 99.9% uptime with minimal setup overhead.",
        "specs": [
          "LiteSpeed Web Server with LSCache",
          "Free 1-Click WordPress Auto-Installer",
          "Free 1-Year Domain Registration Included",
          "Unlimited Free SSL Certificates",
          "Automated Weekly & Daily Backups",
          "Integrated Git Version Control Deployment"
        ]
      },
      {
        "id": "cloud-hosting",
        "name": "Enterprise Cloud Hosting",
        "badge": "High Performance",
        "category": "cloud",
        "shortDesc": "Isolated virtual containers with dedicated CPU, RAM, and automated instant resource scaling.",
        "longDesc": "Experience the power and stability of a dedicated server combined with the sheer simplicity of shared hosting. Each cloud account runs in an isolated virtual instance with dedicated RAM and vCPU cores. When your site experiences viral spikes, automated resource scaling absorbs the surge seamlessly without slowdowns or dropped connections. Includes a dedicated IP address and custom Cloudflare Enterprise routing.",
        "specs": [
          "Dedicated Virtual Resources (Up to 16GB RAM & 8 Cores)",
          "Dedicated IPv4 & IPv6 Address Included",
          "3x to 4x Faster Speed than Standard Hosting",
          "Built-in Cloudflare Enterprise CDN Protection",
          "Automated Daily Backups with 1-Click Restore",
          "Priority 24/7 VIP Technical Support"
        ]
      },
      {
        "id": "vps-hosting",
        "name": "KVM Cloud VPS Hosting",
        "badge": "Developers & DevOps",
        "category": "vps",
        "shortDesc": "Full root access, dedicated kernel virtualization, high-IOPS NVMe drives, and AI terminal assistance.",
        "longDesc": "Engineered for software engineers, backend developers, and tech leads who demand complete root-level control over their operating environment. Built upon Kernel-based Virtual Machine (KVM) technology, Hostinger VPS guarantees 100% dedicated hardware resource allocation. Deploy Docker containers, configure custom Node.js, Python, Ruby, or Go environments, and leverage the built-in AI Terminal Assistant to formulate Linux commands in seconds.",
        "specs": [
          "Full Root Access & Dedicated Kernel (KVM)",
          "Enterprise-Class NVMe Storage with Ultra-High IOPS",
          "OS Options: Ubuntu, Debian, AlmaLinux, Rocky Linux",
          "Docker, Node.js, Python & Microservices Ready",
          "Automated Weekly Snapshots & Firewall Rules",
          "Built-in AI Assistant for Terminal Configurations"
        ]
      },
      {
        "id": "agency-hosting",
        "name": "Agency Hosting & Hostinger Pro",
        "badge": "Agencies & Freelancers",
        "category": "web",
        "shortDesc": "Manage hundreds of client sites with unified credentials, team collaboration, and client sharing.",
        "longDesc": "Designed specifically for web design agencies, freelancers, and dev shops managing multiple client projects. The Hostinger Pro dashboard allows you to organize clients into workspaces, grant custom role-based permissions, and delegate access without sharing your master passwords. You can also deliver automated maintenance health checks, uptime reports, and white-labeled client experiences.",
        "specs": [
          "Centralized Multi-Client Management Portal",
          "Granular Role-Based Access Control (RBAC)",
          "Access Delegation Without Password Sharing",
          "Automated Client Website Maintenance Reports",
          "Integrated Referral & Commission Payouts",
          "Mass Plugin & Core WordPress Updates in 1-Click"
        ]
      },
      {
        "id": "ai-website-builder",
        "name": "AI Website Builder",
        "badge": "No-Code & Fast",
        "category": "web",
        "shortDesc": "Create stunning, fully responsive websites and e-commerce stores in under 60 seconds using AI.",
        "longDesc": "Transform a short text description into a fully functional, mobile-responsive, production-ready website in under a minute. The Hostinger AI Builder generates tailored layouts, copy, royalty-free images, and interactive contact forms. It includes a built-in AI Heatmap tool to predict visitor gaze patterns, an AI Logo Generator, and a robust e-commerce engine with 0% platform transaction fees.",
        "specs": [
          "Prompt-to-Website Generation in 60 Seconds",
          "Intuitive Drag-and-Drop Visual Canvas",
          "Integrated AI Copywriter & SEO Generator",
          "AI Heatmap for Conversion Rate Optimization",
          "Complete E-Commerce Suite (0% Transaction Fees)",
          "Mobile-First Responsive Layouts by Default"
        ]
      },
      {
        "id": "hostinger-horizons",
        "name": "Hostinger Horizons",
        "badge": "Next-Gen Cloud",
        "category": "cloud",
        "shortDesc": "Next-generation cloud ecosystem and edge deployment network built for the future of the web.",
        "longDesc": "Hostinger Horizons represents the cutting-edge evolution of global web infrastructure. By uniting edge computing, intelligent serverless routing, and globally distributed data caches, Horizons ensures websites load instantaneously regardless of visitor geography. It provides elastic infrastructure that adapts dynamically to emerging web standards, high-throughput media, and AI-driven web applications.",
        "specs": [
          "Next-Generation Edge-Native Architecture",
          "Ultra-Low Global Latency with Anycast Routing",
          "Automatic Elastic Resource Reallocation",
          "Future-Proof Compatibility with Modern Web Frameworks",
          "Tier-3 Globally Certified Data Center Backbone",
          "Continuous Performance & Reliability Tuning"
        ]
      },
      {
        "id": "business-email",
        "name": "Professional Business Email",
        "badge": "Brand Identity",
        "category": "web",
        "shortDesc": "Custom branded email addresses with robust anti-spam, calendar sync, and webmail portals.",
        "longDesc": "Establish immediate corporate credibility by sending messages from your own domain (e.g., name@yourcompany.com). Powered by Titan Email, this suite provides generous inbox storage (10GB to 50GB), advanced multi-layered anti-spam and anti-virus filtering, calendar management, and seamless synchronization across iOS, Android, macOS, and Windows devices.",
        "specs": [
          "Professional Branded Inboxes (@yourdomain.com)",
          "Up to 50GB Dedicated Storage per Mailbox",
          "Multi-Layer Anti-Spam & Zero-Day Threat Shield",
          "Integrated Business Calendar & Contact Manager",
          "Native Mobile Apps for iOS & Android",
          "Automated Email Forwarding & Signature Builder"
        ]
      },
      {
        "id": "reach-email",
        "name": "Reach Email Marketing",
        "badge": "Growth & Lead Gen",
        "category": "web",
        "shortDesc": "Built-in newsletter campaigns, automated drip sequences, and lead capture directly in hPanel.",
        "longDesc": "Nurture leads and convert visitors into repeat customers without paying for costly third-party email platforms. Reach Email Marketing is embedded directly within your hosting dashboard, allowing you to design beautiful newsletters with a drag-and-drop builder, segment subscribers by activity, launch automated welcome sequences, and monitor open and click-through metrics in real time.",
        "specs": [
          "Integrated Directly into Your Hosting Dashboard",
          "Drag-and-Drop Newsletter & Campaign Designer",
          "Automated Drip Sequences & Autoresponders",
          "Real-Time Delivery, Open, and Click Telemetry",
          "High Inbox Deliverability with Pre-Warmed IPs",
          "Seamless Form Integration with WordPress & HTML"
        ]
      },
      {
        "id": "managed-openclaw",
        "name": "Managed OpenClaw Microservices",
        "badge": "High Concurrency",
        "category": "cloud",
        "shortDesc": "Optimized containerized runtime environments for high-throughput background jobs and APIs.",
        "longDesc": "Managed OpenClaw is engineered for heavy computational workloads, background batch jobs, asynchronous task queues, and microservice APIs. It isolates computing processes to ensure zero resource contamination across your applications, giving backend developers an ultra-lean runtime environment optimized for low latency and high concurrent connections.",
        "specs": [
          "Isolated Containerized Microservice Architecture",
          "Optimized for High-Concurrency API Gateways",
          "Low-Overhead Compute Resource Allocation",
          "Continuous Process Health Monitoring & Self-Healing",
          "Integrated Micro-Telemetry & Error Logging",
          "Zero Server Maintenance & Automated Security Patching"
        ]
      },
      {
        "id": "ai-agents",
        "name": "Autonomous AI Hosting Agents",
        "badge": "Next-Gen AI",
        "category": "cloud",
        "shortDesc": "Intelligent in-dashboard agents that debug errors, optimize queries, and automate server management.",
        "longDesc": "Hostinger has integrated autonomous AI agents directly into hPanel. Need to identify why a WordPress plugin caused a critical error? The AI Agent analyzes error logs and suggests the exact fix. Need to optimize slow database queries, configure custom redirects, or generate .htaccess rewrite rules? Simply instruct the AI in natural language to execute the configuration safely.",
        "specs": [
          "Automated WordPress Plugin Conflict Diagnostics",
          "Natural Language .htaccess & Nginx Rule Generation",
          "Slow MySQL Query Detection & Indexing Advice",
          "Automated On-Page SEO Recommendations",
          "Terminal Command Generation for VPS Users",
          "24/7 Instant In-Dashboard Assistance"
        ]
      }
    ],
    "plans": [
      {
        "name": "Web Hosting Premium",
        "tagline": "Pilihan tepat untuk website pribadi, blog, dan proyek portofolio",
        "price": "$2.99",
        "period": "/month",
        "savings": "Hemat 75% + 20% Diskon Mitra",
        "popular": false,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "100 GB SSD"
          },
          {
            "label": "Performance",
            "val": "Standard LiteSpeed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Weekly Automated"
          },
          {
            "label": "Email",
            "val": "Free Business Email"
          },
          {
            "label": "AI Tools",
            "val": "Basic AI Website Builder"
          }
        ],
        "ctaText": "Pilih Paket Premium"
      },
      {
        "name": "Web Hosting Bisnis",
        "tagline": "Direkomendasikan untuk bisnis, kreator, dan toko online",
        "price": "$3.99",
        "period": "/month",
        "savings": "Hemat 73% + 20% Diskon Mitra",
        "popular": true,
        "category": "web",
        "specs": [
          {
            "label": "Websites",
            "val": "100 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB Ultra NVMe (5x Faster)"
          },
          {
            "label": "Performance",
            "val": "Up to 5x Increased Speed"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain ($9.99 value)"
          },
          {
            "label": "SSL",
            "val": "Unlimited Free SSL"
          },
          {
            "label": "Bandwidth",
            "val": "Unlimited"
          },
          {
            "label": "Backups",
            "val": "Daily & On-Demand Backups"
          },
          {
            "label": "CDN",
            "val": "Free Built-in CDN Included"
          },
          {
            "label": "Staging",
            "val": "1-Click WordPress Staging Tool"
          },
          {
            "label": "AI Tools",
            "val": "Full AI Website Builder Suite"
          }
        ],
        "ctaText": "Pilih Paket Bisnis"
      },
      {
        "name": "Cloud Startup",
        "tagline": "Sumber daya server khusus untuk aplikasi dengan trafik tinggi",
        "price": "$9.99",
        "period": "/month",
        "savings": "Hemat 60% + 20% Diskon Mitra",
        "popular": false,
        "category": "cloud",
        "specs": [
          {
            "label": "Websites",
            "val": "300 Websites"
          },
          {
            "label": "Storage",
            "val": "200 GB NVMe Storage"
          },
          {
            "label": "RAM / CPU",
            "val": "3 GB RAM + 2 CPU Cores (Dedicated)"
          },
          {
            "label": "Performance",
            "val": "Up to 10x Boosted Speed"
          },
          {
            "label": "IP Address",
            "val": "Dedicated IP Address Included"
          },
          {
            "label": "Domain",
            "val": "Free 1-Year Domain"
          },
          {
            "label": "Backups",
            "val": "Automated Daily Backups"
          },
          {
            "label": "CDN",
            "val": "Cloudflare Enterprise CDN"
          },
          {
            "label": "Support",
            "val": "Priority 24/7 VIP Support Queue"
          }
        ],
        "ctaText": "Pilih Cloud Startup"
      },
      {
        "name": "VPS Cloud KVM 2",
        "tagline": "Akses root penuh dan performa tinggi untuk pengembang & DevOps",
        "price": "$7.99",
        "period": "/month",
        "savings": "Hemat 55% + 20% Diskon Mitra",
        "popular": false,
        "category": "vps",
        "specs": [
          {
            "label": "CPU",
            "val": "2 Dedicated vCPU Cores"
          },
          {
            "label": "RAM",
            "val": "8 GB Dedicated RAM"
          },
          {
            "label": "Storage",
            "val": "100 GB High-IOPS NVMe"
          },
          {
            "label": "Bandwidth",
            "val": "8 TB High-Speed Traffic"
          },
          {
            "label": "Access",
            "val": "Full Root Administrative Access"
          },
          {
            "label": "Virtualization",
            "val": "100% Kernel-based (KVM)"
          },
          {
            "label": "Backups",
            "val": "Automated Weekly Snapshots"
          },
          {
            "label": "AI Terminal",
            "val": "AI Assistant for Linux Commands"
          },
          {
            "label": "OS Support",
            "val": "Ubuntu, Debian, AlmaLinux, Rocky"
          }
        ],
        "ctaText": "Pilih VPS KVM"
      }
    ],
    "architectureHighlights": [
      {
        "title": "LiteSpeed Enterprise vs. Apache",
        "desc": "Unlike budget hosts that still use 20-year-old Apache software, Hostinger utilizes LiteSpeed Enterprise web servers. LiteSpeed processes static and dynamic requests simultaneously through event-driven architecture, reducing RAM usage and serving WordPress pages up to 500% faster.",
        "metric": "5x Faster TTFB"
      },
      {
        "title": "Global Tier-3 Data Centers",
        "desc": "Deploy your site closest to your target audience. Choose from global enterprise data center locations across the United States, United Kingdom, France, Netherlands, Lithuania, Singapore, India, and Brazil. Switch data center locations anytime with a single click.",
        "metric": "8 Global Regions"
      },
      {
        "title": "Multi-Layer Defensive Security",
        "desc": "Every website is shielded behind custom Web Application Firewalls (WAF), Cloudflare DDoS mitigation, automated SSL encryption, and Monarx real-time malware scanning that neutralizes malicious scripts before they execute.",
        "metric": "99.9% Uptime SLA"
      },
      {
        "title": "Next-Gen hPanel Control Center",
        "desc": "Forget clumsy, outdated cPanel interfaces. Hostinger custom-engineered hPanel to be clean, responsive, and intuitive. Manage DNS, create databases, install SSL certificates, set up staging sites, and access file managers in seconds.",
        "metric": "3x Faster Navigation"
      },
      {
        "title": "Automated Snapshot & Daily Backups",
        "desc": "Never worry about catastrophic data loss. Websites are backed up automatically with point-in-time restore capabilities. If an update breaks your website, roll back to an earlier version with a single click in your dashboard.",
        "metric": "Zero-Downtime Restores"
      },
      {
        "title": "Developer & Staging Toolkit",
        "desc": "Equipped with modern developer tooling including Git integration, WP-CLI, SSH access, PHP version switcher (from PHP 7.4 to PHP 8.3+), MySQL/phpMyAdmin access, and a one-click staging environment to test changes safely.",
        "metric": "Dev-Ready Stack"
      }
    ],
    "launchSteps": [
      {
        "step": "01",
        "title": "Click Safi Academy's Partner Link",
        "desc": "Access the exclusive portal using our verified referral URL to unlock special promotional pricing with up to 75% standard discount plus our 20% bonus."
      },
      {
        "step": "02",
        "title": "Select Your Preferred Plan",
        "desc": "Choose between Web Hosting (for blogs/portfolios), Cloud Hosting (for high-traffic businesses), or KVM VPS (for developers requiring root access)."
      },
      {
        "step": "03",
        "title": "Apply Code 89LSHAHEEKCO at Checkout",
        "desc": "Ensure the referral code 89LSHAHEEKCO is present in the coupon field to automatically lock in your additional 20% discount on your order."
      },
      {
        "step": "04",
        "title": "Claim Free Domain & Deploy in 60s",
        "desc": "Claim your free 1-year custom domain name (.com, .net, .org, etc.) and launch your site using the 1-click WordPress installer or the AI Website Builder."
      }
    ],
    "faqs": [
      {
        "q": "How do I claim the 20% discount using the referral code?",
        "a": "Simply click any of the 'Claim 20% Discount' or 'Get Started' buttons on this page. The referral code 89LSHAHEEKCO will be automatically appended to your checkout session. You can also copy the code directly using our 1-click coupon widget and paste it into the coupon code box during checkout at Hostinger.com to verify your 20% savings."
      },
      {
        "q": "Is the free domain name really included at no cost?",
        "a": "Yes! When you purchase any 12, 24, or 48-month Premium, Business, or Cloud hosting plan, Hostinger includes a free custom domain registration for your first full year. Popular extensions like .com, .net, .org, .online, and .tech are fully eligible."
      },
      {
        "q": "Can I migrate my existing website from another hosting provider for free?",
        "a": "Yes, 100% free. Hostinger provides an automated website migration service. Once you sign up, simply enter your current host's login details or WordPress URL in hPanel, and Hostinger's migration engineers and automated tools will transfer your entire site, databases, and emails with zero downtime."
      },
      {
        "q": "What is the difference between Web Hosting, Cloud Hosting, and VPS?",
        "a": "Web Hosting shares server hardware efficiently, making it the most affordable choice for personal sites and small businesses. Cloud Hosting isolates dedicated CPU and RAM resources within a virtual container, delivering 3x faster speeds and high redundancy for growing businesses. VPS (Virtual Private Server) provides full root administrative access, allowing developers to install custom operating systems, Docker containers, and complex backend APIs."
      },
      {
        "q": "Can I run modern programming languages like Node.js, Python, and Docker?",
        "a": "Yes. On KVM VPS plans, you have complete root access to run any stack including Node.js, Python, Ruby, Go, Docker, PostgreSQL, Redis, and custom microservices. On Web & Cloud plans, PHP 8.x, Git, WP-CLI, and MySQL are standard."
      },
      {
        "q": "What is the 30-day money-back guarantee policy?",
        "a": "Hostinger offers an unconditional 30-day money-back guarantee. If you are not completely satisfied with the speed, uptime, or control panel for any reason within the first 30 days of purchase, you can cancel and receive a full refund with no hassle."
      },
      {
        "q": "How does Hostinger's hPanel compare to traditional cPanel?",
        "a": "hPanel is Hostinger's custom-built control panel. Unlike legacy cPanel which can feel sluggish and complicated for beginners, hPanel is ultra-modern, intuitive, responsive on mobile devices, and significantly faster. It integrates domain management, DNS records, staging, file management, and AI assistance into one cohesive interface."
      },
      {
        "q": "Does Hostinger support SSL certificates and HTTPS encryption?",
        "a": "Yes. Every domain, subdomain, and parked domain hosted on Hostinger receives free, lifetime Let's Encrypt SSL certificates that install and renew automatically. You will never have to pay extra fees for website encryption."
      }
    ],
    "isRtl": false,
    "ctaGetStarted": "Mulai dengan Diskon Tambahan 20%",
    "ctaExploreCourses": "Lihat Kursus Coding & Web Development",
    "bottomGuarantee": "Jaminan 30 Hari Uang Kembali Tanpa Syarat",
    "bottomInstant": "Aktivasi Akun Cloud Instan dalam Hitungan Detik",
    "bottomChat": "Bantuan Prioritas Live Chat 24/7",
    "bottomDisclaimer": "* Hostinger adalah penyedia cloud hosting independen. Diskon promosi, ketersediaan domain, dan ketentuan perpanjangan dikelola langsung oleh Hostinger.",
    "metricSubTtfb": "Dioptimalkan dengan LiteSpeed Enterprise",
    "metricSubCdn": "Jaringan Global Cloudflare Enterprise CDN",
    "metricSubNvme": "Penyimpanan Kelas Enterprise NVMe (RAID-10)",
    "metricSubSec": "Keamanan Real-Time Monarx & WAF"
  }
};

export function getHostingTranslation(locale: string): HostingTranslation {
  const normalized = (locale || "en").toLowerCase();
  return hostingTranslations[normalized] || hostingTranslations.en;
}
