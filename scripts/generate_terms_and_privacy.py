# -*- coding: utf-8 -*-
"""
Generates complete 19-language translation files for:
- src/utils/termsTranslations.ts
- src/utils/privacyTranslations.ts
"""

import json
import os

LANGUAGES = [
    "en", "fa", "ps", "ru", "tr", "de", "fr", "ar", "ur", "es",
    "zh", "hi", "it", "pt", "ja", "ko", "nl", "uz", "id"
]

RTL_LANGS = {"fa", "ps", "ar", "ur"}

# TERMS TRANSLATIONS DATA
TERMS_BASE = {
    "en": {
        "badge": "Official Terms & User Agreement",
        "heroTitleLine1": "Terms of Service &",
        "heroTitleLine2": "User Agreement",
        "heroSub": "These Terms govern your access to and use of Safi Academy. Please review our operating terms, educational disclaimers, and affiliate disclosures carefully.",
        "entityLabel": "Entity: Safi International Capital LTD",
        "regLabel": "Reg: 17063286 (UK)",
        "jurisdictionLabel": "Jurisdiction: England & Wales",
        "highlights": [
            {
                "title": "Strictly Educational",
                "desc": "Courses & business formation guides do NOT constitute formal legal, tax, or CPA counsel.",
                "badge": "Crucial Notice"
            },
            {
                "title": "Affiliate Transparency",
                "desc": "Disclosing independent referral partnerships with providers like Registered Agents Inc.",
                "badge": "FTC Compliant"
            },
            {
                "title": "Protected Academy IP",
                "desc": "All video curriculum, source repositories, and course syllabi remain strictly copyrighted.",
                "badge": "Protected Assets"
            },
            {
                "title": "Fair Gamification",
                "desc": "Academy Points and Wall of Fame rankings hold academic value and are shielded from bots.",
                "badge": "Ecosystem Rules"
            }
        ],
        "tocTitle": "Navigation Index",
        "tocCount": "10 Legal Sections",
        "sections": [
            {"id": "agreement", "title": "1. Acceptance of Terms"},
            {"id": "scope", "title": "2. Nature of Services"},
            {"id": "disclaimer", "title": "3. No Legal/Tax Advice", "isWarning": True},
            {"id": "affiliates", "title": "4. Third-Party & Affiliates", "isHighlight": True},
            {"id": "accounts", "title": "5. Accounts & Gamification"},
            {"id": "ip", "title": "6. Intellectual Property"},
            {"id": "payments", "title": "7. Payments & Subscriptions"},
            {"id": "liability", "title": "8. Limitation of Liability"},
            {"id": "governing-law", "title": "9. Governing Law & Courts"},
            {"id": "contact", "title": "10. Legal Inquiries"}
        ],
        "legalHelp": {
            "title": "Need Legal Clarification?",
            "desc": "Inquiries regarding platform licensing, commercial partnerships, or intellectual property rights.",
            "btn": "Contact Legal Department"
        },
        "section1": {
            "secBadge": "Section 1",
            "title": "Acceptance of Terms & Corporate Entity",
            "desc": "These Terms of Service (\"Terms\") constitute a legally binding agreement entered into between you and Safi International Capital LTD, governing your use of the website, learning management tools, video masterclasses, and services offered under Safi Academy.",
            "opEntityLabel": "Operating Entity",
            "companyNumLabel": "Company Number",
            "hqLabel": "Official Headquarters",
            "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
        },
        "section2": {
            "secBadge": "Section 2",
            "title": "Scope of Academy Services",
            "p1": "Safi Academy is an online educational institution dedicated to teaching software development, global e-commerce, digital marketing, corporate setup basics, and technology careers.",
            "p2": "Services provided include interactive lessons, video curriculum, student discussion forums, practice quizzes, gamification badges, and curated recommendations of external tools that assist founders with practical business execution."
        },
        "section3": {
            "secBadge": "Section 3 • Essential Disclaimer",
            "title": "No Legal, Tax, or Financial Advice",
            "alert": "Safi Academy and Safi International Capital LTD are strictly educational entities. We are NOT a law firm, licensed legal counsel, Certified Public Accountant (CPA) firm, financial broker, or licensed registered agent.",
            "bullets": [
                "Any training, templates, or articles addressing US LLCs, corporations, registered agent services, state filing requirements, or taxes are provided exclusively for general informational and educational illustration.",
                "State laws, federal tax duties (including IRS filings and FinCEN Beneficial Ownership Information reports), and commercial regulations differ significantly across jurisdictions.",
                "You are solely responsible for conducting due diligence and consulting licensed attorneys or certified financial accountants prior to forming an entity or signing binding agreements."
            ]
        },
        "section4": {
            "secBadge": "Section 4 • Third-Party Relations",
            "title": "Third-Party Services & Affiliate Disclosures",
            "badge": "Partner Referral Terms",
            "p1": "To help founders implement the principles taught in our academy, we showcase vetted third-party infrastructure providers. On our US Business Formation pages, we recommend Registered Agents Inc for US registered agent representation, entity formation, and corporate filings.",
            "rulesTitle": "Key Operating Rules for Recommended Third Parties:",
            "rulesBullets": [
                {"lead": "Affiliate Compensation:", "text": "Safi Academy participates in referral and affiliate programs (including Registered Agents Inc and AWIN). We may receive a referral commission when you purchase services via our referral links. This does not increase the price you pay."},
                {"lead": "Independent Entities:", "text": "Third parties (including Registered Agents Inc) are independent businesses. Safi Academy does not control, supervise, or own their internal operations or filing processes."},
                {"lead": "Third-Party Client Agreement:", "text": "Any contract you enter into for registered agent or formation services is solely between you and Registered Agents Inc, governed by their official Client Agreement."},
                {"lead": "Disclaimer of Vendor Liability:", "text": "Safi International Capital LTD disclaims any liability for third-party filing mistakes, state rejections, processing delays, or service downtime."}
            ],
            "adTitle": "Google AdSense & Digital Advertising Network Terms:",
            "adBullets": [
                {"lead": "Third-Party Commercial Display:", "text": "Safi Academy displays advertisements served by Google AdSense and accredited digital ad networks. We do not manufacture, guarantee, or directly endorse the specific products or services advertised by third-party sponsors."},
                {"lead": "Advertiser Interactions:", "text": "Any transactions, communications, or engagements you undertake with commercial advertisers found on our platform are solely between you and the respective third-party vendor."},
                {"lead": "Ad Delivery Standards:", "text": "Advertisements on Safi Academy adhere to high standards of digital decorum and are integrated natively to preserve student learning focus."}
            ]
        },
        "section5": {
            "secBadge": "Section 5",
            "title": "User Accounts, Security & Gamification",
            "p1": "You must provide accurate, verifiable registration details and maintain the security of your password. Sharing your account credentials or facilitating unauthorized multi-user access is strictly prohibited.",
            "rulesTitle": "Academy Points & Wall of Fame Rules",
            "rulesDesc": "Points, badges, and leaderboard rankings represent internal academy achievements and carry no monetary value outside of our platform. Safi Academy reserves the right to reset points or remove accounts from public leaderboards if scripted automation or abuse is detected."
        },
        "section6": {
            "secBadge": "Section 6",
            "title": "Intellectual Property & Limited License",
            "p1": "All platform components—including instructional videos, code repositories, lesson syllabi, trademarks, graphics, UI assets, and downloadable resources—are the proprietary intellectual property of Safi International Capital LTD.",
            "p2": "You receive a limited, revocable, non-exclusive, non-transferable personal license to view course materials. You may not record, reproduce, mirror, resell, redistribute, or reverse-engineer our curriculum without prior written authorization."
        },
        "section7": {
            "secBadge": "Section 7",
            "title": "Payments, Subscriptions & Digital Access",
            "p1": "Fees for courses, premium masterclasses, or mentorship programs are displayed before purchase. Payments are securely handled through PCI-compliant gateways (such as Stripe).",
            "policyTitle": "Digital Content Access Policy:",
            "policyDesc": "Because digital learning materials and proprietary repositories are made instantly available upon purchase, access fees are non-refundable once content has been accessed, except where required by mandatory statutory consumer protection laws."
        },
        "section8": {
            "secBadge": "Section 8",
            "title": "Limitation of Liability & Indemnity",
            "p1": "To the maximum extent permitted by applicable law, in no event shall Safi International Capital LTD, its officers, directors, instructors, or affiliates be liable for any indirect, special, incidental, exemplary, or consequential damages (including loss of business profits, corporate filing rejections, loss of data, or operational interruptions).",
            "p2": "You agree to indemnify and hold harmless Safi International Capital LTD against any claims, liabilities, damages, or costs resulting from your breach of these Terms or your unauthorized use of the platform."
        },
        "section9": {
            "secBadge": "Section 9",
            "title": "Governing Law & Exclusive Jurisdiction",
            "p1": "These Terms of Service and any dispute or claim arising out of or in connection with them or their subject matter shall be governed by and construed in accordance with the laws of England and Wales.",
            "p2": "You irrevocably submit to the exclusive jurisdiction of the courts of England and Wales to resolve any legal disputes or proceedings arising under this agreement."
        },
        "section10": {
            "secBadge": "Section 10",
            "title": "Official Legal Correspondence",
            "p1": "Official notices, corporate documentation requests, and inquiries regarding these Terms should be addressed to our legal department:",
            "emailLabel": "Corporate Legal Email",
            "btn": "Contact Legal Team",
            "relatedTitle": "Related Documents:",
            "privacyPolicy": "Privacy Policy",
            "contactUs": "Contact Us",
            "deleteAccount": "Account Deletion"
        }
    }
}

# PRIVACY TRANSLATIONS DATA
PRIVACY_BASE = {
    "en": {
        "badge": "Official Data Charter & Privacy Policy",
        "heroTitleLine1": "Your Privacy & Data",
        "heroTitleLine2": "Are Fully Protected",
        "heroSub": "Safi Academy operates under the highest standards of data integrity and regulatory compliance. Learn how Safi International Capital LTD processes, secures, and honors your personal data.",
        "entityLabel": "Entity: Safi International Capital LTD",
        "regLabel": "Reg: 17063286 (UK)",
        "lawLabel": "UK GDPR & DPA 2018",
        "highlights": [
            {
                "title": "Zero Data Selling",
                "desc": "We strictly never sell or rent your personal information to third-party data brokers.",
                "badge": "Guaranteed Standard"
            },
            {
                "title": "Affiliate Transparency",
                "desc": "Clear disclosures regarding referral cookies & external partners like Registered Agents Inc.",
                "badge": "FTC Compliant"
            },
            {
                "title": "Enterprise Encryption",
                "desc": "End-to-end TLS/SSL encryption across all academy courses, credentials, and data.",
                "badge": "Cryptographic Guard"
            },
            {
                "title": "Full GDPR Control",
                "desc": "Unrestricted rights to access, rectify, port, or erase your account data at any time.",
                "badge": "Statutory Rights"
            }
        ],
        "tocTitle": "Navigation Index",
        "tocCount": "8 Legal Sections",
        "sections": [
            {"id": "controller", "title": "1. Data Controller"},
            {"id": "collection", "title": "2. Information We Collect"},
            {"id": "affiliates", "title": "3. Affiliates & Third Parties", "isHighlight": True},
            {"id": "usage", "title": "4. How We Use Data"},
            {"id": "cookies", "title": "5. Cookies & Tracking"},
            {"id": "security", "title": "6. Security & Storage"},
            {"id": "rights", "title": "7. Your Legal Rights"},
            {"id": "contact", "title": "8. Privacy Inquiries"}
        ],
        "legalHelp": {
            "title": "Have Data Questions?",
            "desc": "Reach our designated compliance officer for GDPR access, data modification, or third-party inquiries.",
            "btn": "Email Privacy Team"
        },
        "section1": {
            "secBadge": "Section 1",
            "title": "Data Controller & Operating Entity",
            "desc": "Safi Academy is operated by Safi International Capital LTD, a corporation officially registered and governed under the laws of England and Wales. We act as the primary data controller for all personal information collected through our educational platform.",
            "legalEntityLabel": "Legal Entity",
            "companyNumLabel": "Company Number",
            "hqLabel": "Headquarters Address",
            "hqValue": "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, United Kingdom"
        },
        "section2": {
            "secBadge": "Section 2",
            "title": "Categories of Information We Collect",
            "desc": "We only gather data necessary to provide seamless course experiences, secure authentication, and verified educational credentials.",
            "cards": [
                {
                    "title": "Identity & Profile Data",
                    "desc": "Full name, username, email address, password hash, language preferences, avatar, and enrolled course records."
                },
                {
                    "title": "Billing & Transactions",
                    "desc": "Invoices and order history. Sensitive card numbers are handled directly by Stripe using PCI-DSS Level 1 certified vaulting."
                },
                {
                    "title": "Device & Technical Logs",
                    "desc": "IP address, device model, browser metadata, operating system, and system security logs for fraud prevention."
                },
                {
                    "title": "Gamification & Academy Points",
                    "desc": "Quiz scores, lesson completions, Academy Points, badges, and public Wall of Fame leaderboards."
                }
            ]
        },
        "section3": {
            "secBadge": "Section 3 • High Importance",
            "title": "Third-Party Links & Affiliate Partners",
            "badge": "Affiliate Disclosure",
            "desc": "To bridge the gap between education and real-world business setup, Safi Academy curates and recommends vetted corporate providers. Our US Business Formation portal features external referral links to Registered Agents Inc and uses affiliate networks (such as AWIN).",
            "rulesTitle": "How Referral Links & Affiliate Cookies Function:",
            "bullets": [
                "When you click a link to Registered Agents Inc, an affiliate tracking parameter or cookie may be saved in your browser to verify that the referral originated from Safi Academy.",
                "Safi Academy never shares your login passwords, personal student details, or academy files with Registered Agents Inc or affiliate networks.",
                "Any personal, corporate, or payment information you supply on Registered Agents Inc is collected directly by them and governed exclusively by their official Privacy Policy.",
                "We earn a referral commission on qualifying transactions at zero extra cost to you."
            ]
        },
        "section4": {
            "secBadge": "Section 4",
            "title": "Lawful Basis & Use of Data",
            "desc": "We only process personal data when permitted by law under Article 6 of the UK GDPR:",
            "items": [
                {
                    "title": "Contractual Fulfillment:",
                    "desc": "Delivering courses, granting video access, issuing certificates, and processing payments."
                },
                {
                    "title": "Legitimate Interests:",
                    "desc": "Enhancing course curriculum, securing our servers from bot attacks, and analyzing platform usage."
                },
                {
                    "title": "Statutory & Regulatory Obligations:",
                    "desc": "Maintaining accurate financial accounting records under UK tax and corporate regulations."
                }
            ]
        },
        "section5": {
            "secBadge": "Section 5",
            "title": "Cookies & Tracking Technologies",
            "desc": "Our platform uses session tokens, local storage, and cookies to keep you signed in securely and personalize your study environment.",
            "cookies": [
                {
                    "title": "Strictly Necessary Cookies",
                    "desc": "Authentication, session state, and security firewall.",
                    "badge": "Always Active"
                },
                {
                    "title": "Performance & Metrics",
                    "desc": "Anonymous lesson load times and playback metrics.",
                    "badge": "Configurable"
                },
                {
                    "title": "Affiliate & Referral Cookies",
                    "desc": "Set only when clicking outbound partner links (e.g. Registered Agents Inc).",
                    "badge": "Outbound Only"
                },
                {
                    "title": "Google AdSense & Advertising Cookies",
                    "desc": "Used by Google to serve ads based on user visits to this and other websites across the Internet.",
                    "badge": "Third-Party (Opt-Out Available)"
                }
            ],
            "adHeading": "Google AdSense & Third-Party Advertising Compliance",
            "adIntro": "Safi Academy uses Google AdSense and accredited third-party advertising vendors to display relevant, non-intrusive advertisements on selected community and feed areas.",
            "adBullets": [
                {"lead": "Third-Party Vendors:", "text": "Google and other third-party advertising networks use cookies to serve advertisements based on a user's prior visits to Safi Academy or other websites across the web."},
                {"lead": "DoubleClick DART Cookie:", "text": "Google's use of advertising cookies enables it and its partners to serve relevant advertisements to users based on their visits to our platform and other sites on the Internet."},
                {"lead": "Personalized Ad Opt-Out:", "text": "Users can opt out of personalized advertising by visiting Google Ads Settings or through AboutAds.info."},
                {"lead": "Privacy Safeguards:", "text": "Safi Academy does not sell personal user identifiers to ad brokers and restricts ad formats to native, non-disruptive placements."}
            ]
        },
        "section6": {
            "secBadge": "Section 6",
            "title": "Data Security & Storage Protocols",
            "desc": "We safeguard user data using multi-layered physical, administrative, and technological controls. Data transmissions utilize modern TLS 1.3 cryptographic protocols with automated vulnerability scanning.",
            "retentionTitle": "Data Retention Period:",
            "retentionDesc": "We store student records for as long as your account remains active, plus mandatory statutory periods (up to 6 years for UK tax records).",
            "transfersTitle": "International Transfers:",
            "transfersDesc": "Cross-border data transfers adhere strictly to UK International Data Transfer Agreements (IDTA) and standard contractual clauses."
        },
        "section7": {
            "secBadge": "Section 7",
            "title": "Your Statutory Rights (UK GDPR)",
            "desc": "Under UK and EU data protection regulations, you hold enforceable statutory rights over your personal data:",
            "rights": [
                {"title": "Right of Access", "desc": "Request a complete digital copy of all personal records we hold."},
                {"title": "Right to Rectification", "desc": "Correct outdated, inaccurate, or incomplete information."},
                {"title": "Right to Erasure", "desc": "Request permanent deletion of your account (\"Right to be Forgotten\")."},
                {"title": "Right to Restriction", "desc": "Temporarily freeze data processing during dispute resolution."},
                {"title": "Right to Portability", "desc": "Obtain your course records in an open, machine-readable format."},
                {"title": "Right to Object", "desc": "Object to processing founded solely upon legitimate commercial interests."}
            ],
            "deletionBox": {
                "title": "Need to permanently delete your account & erase your data?",
                "sub": "Access our official self-service App Store & GDPR Account Deletion Gateway.",
                "btn": "Delete Account"
            }
        },
        "section8": {
            "secBadge": "Section 8",
            "title": "Privacy Inquiries & ICO Escalation",
            "desc": "For questions regarding this policy, to exercise your data rights, or to submit a formal privacy inquiry, contact our Data Protection Team at:",
            "emailLabel": "Direct Support Channel",
            "btn": "Send Inquiries",
            "icoText": "If you are dissatisfied with our response, you have the right to lodge a complaint with the UK Information Commissioner's Office (ICO), the UK's independent regulatory body for data privacy (ico.org.uk)."
        }
    }
}

print("Base definitions ready")
