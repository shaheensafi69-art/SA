"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Send,
  Smartphone,
  Copy,
  Check,
  MessageCircle,
  Sparkles,
  ExternalLink,
  HelpCircle,
  QrCode,
  FileCheck,
  AlertCircle,
  Building2,
  Lock,
  ChevronDown,
  ShoppingBag,
  Maximize2
} from "lucide-react";
import { getPortalTranslation } from "@/utils/portalTranslations";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

interface ManualPaymentGatewayClientProps {
  gateway: "hesabpay" | "atomapay";
  currentLocale: string;
}

export default function ManualPaymentGatewayClient({
  gateway,
  currentLocale,
}: ManualPaymentGatewayClientProps) {
  const searchParams = useSearchParams();
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;

  // URL parameters from store/product page
  const productId = searchParams.get("id") || "";
  const productName = searchParams.get("name") || "";
  const initialAmountUSD = searchParams.get("amount") || "";
  const initialAmountAFN = searchParams.get("afn") || "";
  const quantity = searchParams.get("qty") || "1";
  const incomingOrderId = searchParams.get("orderId") || "";

  // Gateway config
  const isHesabPay = gateway === "hesabpay";

  const config = isHesabPay
    ? {
        name: "HesabPay",
        nameFa: "حساب‌پِی (HesabPay)",
        phone: "+93 796 040 415",
        phoneRaw: "+93796040415",
        qrImage: "/hesabpay.jpg",
        accentColor: "from-blue-600 via-cyan-500 to-sky-400",
        badgeBg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
        cardBorder: "border-cyan-500/30 hover:border-cyan-400/60",
        glowEffect: "shadow-[0_0_35px_rgba(6,182,212,0.18)]",
        title: isRtl
          ? "درگاه پرداخت رسمی حساب‌پی (HesabPay)"
          : "HesabPay Official Payment Gateway",
        subtitle: isRtl
          ? "انتقال وجه آنی و پرداخت دیجیتال امن در سراسر افغانستان بدون نیاز به کارت‌های بین‌المللی"
          : "Instant local transfer & secure digital wallet across Afghanistan with zero international banking fees",
        appHint: isRtl
          ? "قابل پرداخت از طریق تمامی حساب‌های بانکی متصل به شبکه حساب‌پی و اپلیکیشن موبایل"
          : "Payable via all Afghan bank accounts connected to HesabPay mobile app",
        steps: [
          {
            title: isRtl ? "۱. باز کردن اپلیکیشن حساب‌پی" : "1. Open HesabPay App",
            desc: isRtl
              ? "اپلیکیشن HesabPay را در گوشی خود باز کرده و وارد حساب کاربری خود شوید."
              : "Launch the official HesabPay app on your mobile device and log in."
          },
          {
            title: isRtl ? "۲. اسکن کیو آر کد یا ورود شماره" : "2. Scan QR or Enter Phone",
            desc: isRtl
              ? "گزینه «اسکن QR» را زده و کد زیر را اسکن کنید، یا شماره 0796040415 را در بخش انتقال وجه وارد نمایید."
              : "Select 'Scan QR' to scan the official code below, or manually enter phone +93796040415."
          },
          {
            title: isRtl ? "۳. وارد کردن مبلغ و شناسه" : "3. Enter Amount & Reference",
            desc: isRtl
              ? "مبلغ فاکتور را به افغانی یا دالر درج کرده و در توضیحات نام یا شماره سفارش خود را بنویسید."
              : "Input the payable amount in AFN or USD, and write your Name or Order Reference in the note."
          },
          {
            title: isRtl ? "۴. تکمیل و ثبت رسید پرداخت" : "4. Save Receipt & Confirm",
            desc: isRtl
              ? "پس از تکمیل تراکنش، شناسه پیگیری (TxID) را در فرم زیر وارد کرده یا رسید را در واتساپ بفرستید."
              : "Once completed, copy your Transaction ID into the verification form below or send to WhatsApp."
          }
        ]
      }
    : {
        name: "AtomaPay",
        nameFa: "اتوماپِی (AtomaPay)",
        phone: "+93 773 449 567",
        phoneRaw: "+93773449567",
        qrImage: "/atomapay.jpg",
        accentColor: "from-emerald-600 via-teal-500 to-emerald-400",
        badgeBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
        cardBorder: "border-emerald-500/30 hover:border-emerald-400/60",
        glowEffect: "shadow-[0_0_35px_rgba(16,185,129,0.18)]",
        title: isRtl
          ? "درگاه پرداخت رسمی اتوماپی (AtomaPay)"
          : "AtomaPay Official Payment Gateway",
        subtitle: isRtl
          ? "سامانه هوشمند و امن تبادلات مالی سریع و مستقیم در افغانستان با تایید آنی"
          : "Smart, secure, and instant Afghan payment network with direct merchant verification",
        appHint: isRtl
          ? "پشتیبانی از انتقال مستقیم، کیف‌پول اتوما و تسویه سریع در شبکه صرافی‌ها و بانک‌ها"
          : "Supports Atoma Wallet transfer, instant QR checkout, and fast merchant settlement",
        steps: [
          {
            title: isRtl ? "۱. باز کردن اپلیکیشن اتوماپی" : "1. Open AtomaPay App",
            desc: isRtl
              ? "وارد اپلیکیشن یا پورتال کاربری اتوماپی در گوشی هوشمند خود شوید."
              : "Log in to your AtomaPay mobile application or web portal."
          },
          {
            title: isRtl ? "۲. اسکن کیو آر کد یا شماره حساب" : "2. Scan QR or Enter Account",
            desc: isRtl
              ? "کیو آر کد روبرو را اسکن نموده یا شماره 0773449567 را جهت ارسال وجه انتخاب کنید."
              : "Scan the displayed Atoma QR code or choose send money to +93773449567."
          },
          {
            title: isRtl ? "۳. مشخص نمودن مبلغ قابل پرداخت" : "3. Specify Amount & Note",
            desc: isRtl
              ? "مبلغ مشخص‌شده سفارش را وارد نموده و در فیلد شرح تراکنش، نام خریدار را ذکر نمایید."
              : "Specify the exact order total in AFN or USD and add your order note."
          },
          {
            title: isRtl ? "۴. ارسال رسید و تایید فوری" : "4. Submit Proof & Verify",
            desc: isRtl
              ? "شناسه تراکنش (کد ارجاع) را در فرم زیر درج کنید تا تیم فنی سرویس شما را فعال نماید."
              : "Submit your reference code in the form below or chat directly on WhatsApp for 24h SLA delivery."
          }
        ]
      };

  // Form State
  const [payerName, setPayerName] = useState("");
  const [payerPhone, setPayerPhone] = useState("");
  const [txId, setTxId] = useState("");
  const [paidAmount, setPaidAmount] = useState(
    initialAmountAFN ? `${initialAmountAFN} AFN` : initialAmountUSD ? `$${initialAmountUSD}` : ""
  );
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [qrZoom, setQrZoom] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Copy phone helper
  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(config.phoneRaw);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    } catch {
      // Fallback
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  // Pre-filled WhatsApp message
  const generateWhatsAppUrl = () => {
    const greeting = isRtl ? "سلام وقت بخیر، رسید پرداخت من برای اکادمی صافی:" : "Hello Safi Academy, here is my payment confirmation:";
    const itemText = productName ? `\n📦 ${isRtl ? "محصول:" : "Product:"} ${productName}` : "";
    const orderText = incomingOrderId ? `\n🛒 ${isRtl ? "شناسه سفارش:" : "Order ID:"} ${incomingOrderId}` : "";
    const methodText = `\n💳 ${isRtl ? "روش پرداخت:" : "Payment Method:"} ${config.name}`;
    const amountText = paidAmount ? `\n💰 ${isRtl ? "مبلغ:" : "Amount:"} ${paidAmount}` : "";
    const txText = txId ? `\n🔢 ${isRtl ? "شناسه تراکنش (TxID):" : "Transaction ID:"} ${txId}` : "";
    const nameText = payerName ? `\n👤 ${isRtl ? "نام پرداخت‌کننده:" : "Payer Name:"} ${payerName}` : "";

    const message = `${greeting}${itemText}${orderText}${methodText}${amountText}${txText}${nameText}\n\n${isRtl ? "لطفاً تایید فرمایید." : "Please verify and dispatch credentials. Thank you."}`;

    return `https://wa.me/${config.phoneRaw.replace("+", "")}?text=${encodeURIComponent(message)}`;
  };

  // Handle Payment Verification Submission
  const handleSubmitProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payerName.trim() || !payerPhone.trim() || !txId.trim()) {
      alert(isRtl ? "لطفاً نام، شماره تماس و شناسه تراکنش را وارد کنید." : "Please fill in your name, contact phone and Transaction ID.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. If Supabase is available and we have an order ID, update or log payment proof
      if (supabase && incomingOrderId) {
        try {
          await supabase
            .from("reseller_orders")
            .update({
              status: "payment_submitted",
              order_payload: {
                payment_method: config.name,
                tx_id: txId,
                payer_name: payerName,
                payer_phone: payerPhone,
                paid_amount: paidAmount,
                notes: notes,
                submitted_at: new Date().toISOString()
              }
            })
            .eq("id", incomingOrderId);
        } catch (dbErr) {
          console.warn("Supabase update error:", dbErr);
        }
      }

      // 2. Dispatch Telegram Alert
      const telegramBotToken =
        process.env.TELEGRAM_BOT_TOKEN ||
        process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN ||
        "8668673040:AAEI6Q4r28KWiTAGwvQrT0Y9j6S92KhtwiI";
      const telegramChatId =
        process.env.TELEGRAM_CHAT_ID ||
        process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID ||
        "5195615040";

      const telegramMsg = `
💳 *MANUAL PAYMENT PROOF SUBMITTED*
---------------------------------------
🏦 *Gateway:* ${config.name} (${config.phone})
🔖 *Order ID:* \`${incomingOrderId || "Manual/Direct"}\`
📦 *Product:* ${productName || "Direct Transfer / Custom Payment"}
🔢 *Quantity:* ${quantity}

👤 *Payer Information:*
• Name: ${payerName}
• Phone / WhatsApp: ${payerPhone}

💰 *Payment Details:*
• Amount Reported: *${paidAmount || "Not specified"}*
• TxID / Reference: \`${txId}\`
• Notes: ${notes || "None"}
• Timestamp: ${new Date().toLocaleString()}

⚡ *Action Required:* Check ${config.name} merchant statement & verify incoming funds!
      `;

      try {
        await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: telegramMsg,
            parse_mode: "Markdown"
          })
        });
      } catch (tgErr) {
        console.warn("Telegram alert error:", tgErr);
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error("Submission failed:", err);
      alert(isRtl ? "خطا در ثبت اطلاعات. لطفاً رسید خود را مستقیماً در واتساپ ارسال نمایید." : "Error submitting proof. Please send your receipt directly via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: isRtl ? "مدت زمان تایید پرداخت چقدر است؟" : "How long does verification take?",
      a: isRtl
        ? "معمولاً بین ۱۵ الی ۳۰ دقیقه پس از ثبت شناسه تراکنش یا ارسال رسید در واتساپ، پرداخت شما تایید و اطلاعات فعال‌سازی خدمت ارسال می‌گردد."
        : "Payment verification typically takes between 15 to 30 minutes during business hours upon receipt of your TxID or WhatsApp screenshot."
    },
    {
      q: isRtl ? "آیا پرداخت از خارج از افغانستان ممکن است؟" : "Can I pay if I am outside Afghanistan?",
      a: isRtl
        ? "در صورتی که به حساب‌های HesabPay یا AtomaPay دسترسی دارید بله، در غیر این صورت برای پرداخت‌های ارزی بین‌المللی می‌توانید از خدمات بانکی بین‌المللی اکادمی صافی استفاده نمایید."
        : "Yes, if you have active access to HesabPay or AtomaPay wallets. Otherwise, you can use our international banking services."
    },
    {
      q: isRtl ? "ضمانت برگشت وجه در صورت بروز مشکل چگونه است؟" : "What is the refund guarantee policy?",
      a: isRtl
        ? "تمامی خدمات فروشگاه دیجیتال صافی دارای ۱۰۰٪ گارانتی اصالت و سلامت کارکرد بوده و در صورت هرگونه نقص، سفارش تعویض یا وجه مسترد می‌گردد."
        : "All purchases are 100% covered by Safi Academy's authenticity and replacement guarantee."
    }
  ];

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-[#03060c] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Link
            href={`/${currentLocale}/store`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 text-neutral-300 hover:text-white transition-all text-xs font-bold"
          >
            {isRtl ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
            <span>{t.store?.backToStore || "Back to Store"}</span>
          </Link>

          {productId && (
            <Link
              href={`/${currentLocale}/store/${productId}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 text-neutral-300 hover:text-white transition-all text-xs font-bold"
            >
              <ShoppingBag size={14} className="text-cyan-400" />
              <span>{isRtl ? "بازگشت به مشخصات محصول" : "Back to Product Details"}</span>
            </Link>
          )}
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-black uppercase tracking-widest">
            <Sparkles size={14} className="animate-pulse text-cyan-400" />
            <span>{isRtl ? "پرداخت امن محلی در افغانستان" : "Verified Afghan Payment Gateway"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            {config.title}
          </h1>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            {config.subtitle}
          </p>
        </div>

        {/* Main Grid: QR & Instructions on Left, Order Summary & Verification Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ======================================================== */}
          {/* LEFT: QR Code, Phone Details & Instructions */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 space-y-8">
            {/* Primary Payment Card */}
            <div className={`p-6 sm:p-8 rounded-3xl bg-[#080d1a]/85 border ${config.cardBorder} ${config.glowEffect} backdrop-blur-2xl relative overflow-hidden space-y-6 transition-all`}>
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/20 bg-white p-1 shadow-lg shrink-0">
                    <img
                      src={config.qrImage}
                      alt={config.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white">
                      {config.nameFa}
                    </h2>
                    <span className="text-xs text-neutral-400">
                      {config.appHint}
                    </span>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${config.badgeBg} border`}>
                  {isRtl ? "تایید شده رسمی" : "Verified Merchant"}
                </span>
              </div>

              {/* QR Code Container with Scanner Styling */}
              <div className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent border border-white/10 relative">
                <div className="relative group cursor-pointer" onClick={() => setQrZoom(true)}>
                  {/* Glowing corners */}
                  <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />

                  <div className="w-64 sm:w-72 h-64 sm:h-72 rounded-xl overflow-hidden bg-white p-2 shadow-2xl border border-white/30 transition-transform duration-300 group-hover:scale-[1.02]">
                    <img
                      src={config.qrImage}
                      alt={`${config.name} QR Code`}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center text-white text-xs font-bold gap-2">
                    <Maximize2 size={16} />
                    <span>{isRtl ? "کلیک جهت بزرگنمایی" : "Click to Enlarge"}</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 mt-4 text-center">
                  {isRtl
                    ? "جهت واریز سریع، کد فوق را مستقیماً در اپلیکیشن مربوطه اسکن نمایید."
                    : "Scan this official QR directly inside your mobile application."}
                </p>
              </div>

              {/* Phone Number Display with Instant Copy */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                    {isRtl ? "شماره حساب / شماره موبایل مقصد:" : "Direct Destination Account / Phone:"}
                  </span>
                  <div className="text-2xl font-mono font-black text-white tracking-wider dir-ltr text-left">
                    {config.phone}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all duration-200 ${
                    copiedPhone
                      ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                      : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  }`}
                >
                  {copiedPhone ? (
                    <>
                      <Check size={16} className="text-white" />
                      <span>{t.store?.copied || "Copied!"}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>{t.store?.copyNumber || "Copy Account Number"}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Verified Recipient Info */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15 text-xs text-neutral-300">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">
                    {isRtl ? "نام صاحب حساب:" : "Verified Account Holder:"}
                  </span>
                  <span>Safi International Academy / Shaheen Safi (اکادمی بین‌المللی صافی)</span>
                </div>
              </div>
            </div>

            {/* Step-by-Step Payment Process */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#080d1a]/60 border border-white/10 space-y-6">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span>{isRtl ? "مراحل انجام و واریز وجه" : "Payment Instructions"}</span>
              </h3>

              <div className="space-y-4">
                {config.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4 items-start hover:border-white/15 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 font-mono font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                      0{idx + 1}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-white font-bold text-sm">{step.title}</h4>
                      <p className="text-neutral-400 text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT: Order Summary & Verification Form */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 space-y-8">
            {/* Order Summary Card (If attached to product or incoming request) */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0e1626] to-[#080d18] border border-white/10 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-400">
                  <ShoppingBag size={15} className="text-amber-400" />
                  <span>{isRtl ? "مشخصات و مبلغ فاکتور" : "Invoice & Order Summary"}</span>
                </div>
                {incomingOrderId && (
                  <span className="font-mono text-[11px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-md">
                    REF: #{incomingOrderId.slice(0, 8)}
                  </span>
                )}
              </div>

              {productName ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      {productName}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-neutral-400 mt-1">
                      <span>{t.store?.quantity || "Quantity"}: {quantity}</span>
                      <span>•</span>
                      <span className="text-emerald-400">{t.store?.deliverySLA || "24h SLA"}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                        {isRtl ? "مبلغ به دالر (USD):" : "Total USD:"}
                      </span>
                      <div className="text-2xl font-mono font-black text-white">
                        ${initialAmountUSD || "0.00"}
                      </div>
                    </div>
                    <div className="text-right rtl:text-left">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                        {isRtl ? "معادل به افغانی (AFN):" : "Total AFN:"}
                      </span>
                      <div className="text-2xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                        {initialAmountAFN ? `${Number(initialAmountAFN).toLocaleString()} AFN` : "Calculated AFN"}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-neutral-300 text-xs leading-relaxed">
                  {isRtl
                    ? "در صورتی که برای سفارش اختصاصی، افزایش موجودی یا خدمات ویژه واریز می‌کنید، مبلغ مورد نظر خود را در فیلد فرم زیر وارد نمایید."
                    : "For custom orders, balance refills, or bespoke services, please specify your paid amount in the verification form below."}
                </div>
              )}

              {/* Direct WhatsApp Instant Action */}
              <div className="pt-2">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-4 rounded-2xl bg-gradient-to-r from-emerald-600/30 via-teal-600/20 to-emerald-600/30 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 hover:text-white flex items-center justify-between gap-4 transition-all shadow-[0_0_25px_rgba(16,185,129,0.15)] group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                      <MessageCircle size={22} />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">
                        {isRtl ? "ارسال مستقیم رسید در واتساپ" : "Verify Instantly on WhatsApp"}
                      </div>
                      <div className="text-[11px] text-emerald-300/80">
                        {isRtl ? "پشتیبانی ۲۴ ساعته و تایید سریع" : "24/7 dedicated finance desk"}
                      </div>
                    </div>
                  </div>

                  {isRtl ? <ArrowLeft size={18} className="text-emerald-400 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight size={18} className="text-emerald-400 group-hover:translate-x-1 transition-transform" />}
                </a>
              </div>
            </div>

            {/* Payment Verification Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#080d1a]/85 border border-white/10 relative shadow-2xl space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-400">
                  <FileCheck size={14} />
                  <span>{isRtl ? "تاییدیه و ثبت رسید" : "Payment Verification"}</span>
                </div>
                <h3 className="text-2xl font-black text-white">
                  {isRtl ? "ثبت اطلاعات و شناسه پرداخت" : "Submit Proof of Payment"}
                </h3>
                <p className="text-xs text-neutral-400">
                  {isRtl
                    ? "پس از واریز، فرم زیر را تکمیل نمایید تا سفارش شما در سامانه فعال گردد."
                    : "Fill this form after completing the transfer so our team can verify and dispatch."}
                </p>
              </div>

              {isSuccess ? (
                <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-950/50 via-[#061515] to-[#04090f] border border-emerald-500/40 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_#10b981]">
                    <CheckCircle2 size={36} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white">
                      {t.store?.paymentProofSuccess || "Payment Confirmation Received!"}
                    </h4>
                    <p className="text-xs text-neutral-300 mt-2 leading-relaxed max-w-md mx-auto">
                      {t.store?.paymentProofSuccessDesc ||
                        "Our accounting department is matching your Transaction ID with the network. You will receive your credentials shortly."}
                    </p>
                  </div>

                  <div className="pt-2">
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-neutral-950 font-black text-xs shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all"
                    >
                      <MessageCircle size={18} />
                      <span>{t.store?.whatsappSupport || "Confirm via WhatsApp Support"}</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitProof} className="space-y-4">
                  {/* Payer Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-300 flex items-center gap-1">
                      <span>{isRtl ? "نام و نام خانوادگی واریز کننده" : "Payer Full Name"}</span>
                      <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={payerName}
                      onChange={(e) => setPayerName(e.target.value)}
                      placeholder={isRtl ? "مثلاً: احمد رضایی" : "e.g. Ahmad Rezai"}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:bg-white/[0.07] outline-none text-white text-sm transition-all placeholder:text-neutral-500"
                    />
                  </div>

                  {/* Payer Phone / WhatsApp */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-300 flex items-center gap-1">
                      <span>{isRtl ? "شماره واتساپ یا تماس جهت دریافت اکانت" : "Contact Phone / WhatsApp"}</span>
                      <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={payerPhone}
                      onChange={(e) => setPayerPhone(e.target.value)}
                      placeholder="+93 7xx xxx xxx"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:bg-white/[0.07] outline-none text-white text-sm font-mono transition-all placeholder:text-neutral-500 dir-ltr text-left"
                    />
                  </div>

                  {/* Transaction ID */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-300 flex items-center gap-1">
                      <span>{isRtl ? "شناسه تراکنش / کد پیگیری (TxID)" : "Transaction ID / Reference (TxID)"}</span>
                      <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={txId}
                      onChange={(e) => setTxId(e.target.value)}
                      placeholder={isRtl ? "کد ۶ الی ۱۲ رقمی ثبت شده در رسید" : "Reference code from your receipt"}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:bg-white/[0.07] outline-none text-white text-sm font-mono transition-all placeholder:text-neutral-500 dir-ltr text-left"
                    />
                  </div>

                  {/* Paid Amount */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-300">
                      {isRtl ? "مبلغ واریز شده (افغانی یا دالر)" : "Paid Amount (AFN or USD)"}
                    </label>
                    <input
                      type="text"
                      value={paidAmount}
                      onChange={(e) => setPaidAmount(e.target.value)}
                      placeholder={isRtl ? "مثلاً: ۱۸۰۰ افغانی یا ۲۵ دالر" : "e.g. 1800 AFN or $25"}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:bg-white/[0.07] outline-none text-white text-sm transition-all placeholder:text-neutral-500"
                    />
                  </div>

                  {/* Notes */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-300">
                      {isRtl ? "ایمیل یا توضیحات اضافی (اختیاری)" : "Email or Additional Notes (Optional)"}
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={isRtl ? "ایمیلی که مایلید لایسنس به آن ارسال شود..." : "Delivery email or special instructions..."}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400 focus:bg-white/[0.07] outline-none text-white text-sm transition-all placeholder:text-neutral-500 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-neutral-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4"
                  >
                    {isSubmitting ? (
                      <span>{isRtl ? "در حال ثبت اطلاعات..." : "Verifying..."}</span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>{t.store?.submitProof || "Submit Payment Verification"}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Security & Warranty Notice */}
            <div className="p-5 rounded-2xl bg-[#080d1a]/50 border border-white/10 flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-white font-bold text-sm">
                  {t.store?.safiGuarantee || "Safi Authenticity Guarantee"}
                </h4>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  {t.store?.safiGuaranteeDesc ||
                    "100% authentic digital assets backed by Safi International Capital LTD with full warranty."}
                </p>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="p-6 rounded-3xl bg-[#080d1a]/50 border border-white/10 space-y-4">
              <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <HelpCircle size={16} className="text-cyan-400" />
                <span>{isRtl ? "پرسش‌های متداول پرداخت" : "Frequently Asked Questions"}</span>
              </h4>

              <div className="space-y-2">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full p-3.5 text-left rtl:text-right flex items-center justify-between text-xs font-bold text-neutral-200 hover:text-white"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={14}
                        className={`text-neutral-400 transition-transform ${
                          activeFaq === idx ? "rotate-180 text-cyan-400" : ""
                        }`}
                      />
                    </button>
                    {activeFaq === idx && (
                      <div className="p-3.5 pt-0 text-xs text-neutral-400 leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Zoom Modal */}
      {qrZoom && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setQrZoom(false)}
        >
          <div
            className="max-w-md w-full bg-[#0a0f1d] border border-cyan-500/40 p-6 rounded-3xl space-y-4 text-center shadow-[0_0_50px_rgba(6,182,212,0.3)] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-black text-white">{config.nameFa}</h3>
              <button
                type="button"
                onClick={() => setQrZoom(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="w-full max-h-[70vh] aspect-square rounded-2xl overflow-hidden bg-white p-3 shadow-inner">
              <img
                src={config.qrImage}
                alt={config.name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="font-mono text-lg font-black text-cyan-300 dir-ltr">
              {config.phone}
            </div>

            <button
              type="button"
              onClick={handleCopyPhone}
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs shadow-lg transition-all"
            >
              {copiedPhone ? (t.store?.copied || "Copied!") : (t.store?.copyNumber || "Copy Account Number")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
