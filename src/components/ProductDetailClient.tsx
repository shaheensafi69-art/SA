"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Send,
  Box,
  CreditCard,
  Smartphone,
  Mail,
  User,
  MessageCircle,
  RefreshCw,
  Sparkles,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { getPortalTranslation } from '@/utils/portalTranslations';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  cost_price: number;
  selling_price: number;
  in_stock: boolean;
}

interface ProductDetailClientProps {
  product: Product;
  currentLocale: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ProductDetailClient({ product, currentLocale }: ProductDetailClientProps) {
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    telegram: '',
  });
  const [quantity, setQuantity] = useState(1);

  // System states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastOrderId, setLastOrderId] = useState<string>('');

  // Exchange rate states
  const [baseRate, setBaseRate] = useState<number>(70);
  const [isLoadingRate, setIsLoadingRate] = useState(true);
  const EXCHANGE_PROFIT_MARGIN = 20;

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await res.json();
        if (data && data.rates && data.rates.AFN) {
          setBaseRate(data.rates.AFN);
        }
      } catch (error) {
        console.warn("Failed to fetch exchange rate, using fallback.");
      } finally {
        setIsLoadingRate(false);
      }
    };
    fetchExchangeRate();
  }, []);

  const totalCostPrice = (product.cost_price || product.selling_price * 0.7) * quantity;
  const totalSalePrice = product.selling_price * quantity;
  const totalProfit = totalSalePrice - totalCostPrice;

  const totalUSD = totalSalePrice;
  const effectiveRate = baseRate + EXCHANGE_PROFIT_MARGIN;
  const totalAFN = Math.round(totalUSD * effectiveRate);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: orderData, error: orderError } = await supabase
        .from('reseller_orders')
        .insert({
          product_id: product.id,
          cost_price: totalCostPrice,
          sale_price: totalSalePrice,
          profit_amount: totalProfit,
          status: 'pending',
          order_payload: {
            customer_name: formData.fullName,
            email: formData.email,
            whatsapp: formData.whatsapp,
            telegram: formData.telegram,
            quantity: quantity,
            total_usd: totalUSD,
            total_afn: totalAFN,
            exchange_rate: effectiveRate
          }
        })
        .select()
        .single();

      if (orderError) {
        console.error("Database Error:", orderError);
        throw new Error("Failed to save order to database.");
      }

      const orderId = orderData.id;
      setLastOrderId(orderId);

      const telegramBotToken =
        process.env.TELEGRAM_BOT_TOKEN ||
        process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN ||
        "8668673040:AAEI6Q4r28KWiTAGwvQrT0Y9j6S92KhtwiI";
      const telegramChatId =
        process.env.TELEGRAM_CHAT_ID ||
        process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID ||
        "5195615040";

      const message = `
🆕 *New Order Submitted (Safi Academy Store)*
---------------------------------------------
🛒 *Order ID:* \`${orderId}\`

👤 *Customer Details:*
• Name: ${formData.fullName}
• Email: ${formData.email}
• WhatsApp: ${formData.whatsapp}
• Telegram: @${formData.telegram.replace('@', '')}

📦 *Product Details:*
• Name: ${product.name}
• Product ID: \`${product.id}\`
• Category: ${product.category}
• Quantity: ${quantity}

💰 *Financials:*
• Total Cost: $${totalCostPrice.toFixed(2)}
• Total Sale: $${totalSalePrice.toFixed(2)}
• Estimated Profit: $${totalProfit.toFixed(2)}

💳 *Customer Payable:*
• Total USD: *$${totalUSD.toFixed(2)}*
• Total AFN: *${totalAFN.toLocaleString()} AFN*
_(Rate: ${baseRate.toFixed(2)} + ${EXCHANGE_PROFIT_MARGIN} AFN = ${effectiveRate.toFixed(2)})_

⏳ *Status:* Pending (24h Delivery SLA)
      `;

      try {
        await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: message,
            parse_mode: 'Markdown'
          })
        });
      } catch (telegramErr) {
        console.warn("Telegram dispatch error:", telegramErr);
      }

      setIsSuccess(true);
    } catch (error: any) {
      console.error("Submission Error:", error);
      alert("Error processing your request. Please try again or contact support on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hesabPayUrl = `/${currentLocale}/store/payment/hesabpay?id=${product.id}&name=${encodeURIComponent(product.name)}&amount=${totalUSD.toFixed(2)}&afn=${totalAFN}&qty=${quantity}${lastOrderId ? `&orderId=${lastOrderId}` : ''}`;
  const atomaPayUrl = `/${currentLocale}/store/payment/atomapay?id=${product.id}&name=${encodeURIComponent(product.name)}&amount=${totalUSD.toFixed(2)}&afn=${totalAFN}&qty=${quantity}${lastOrderId ? `&orderId=${lastOrderId}` : ''}`;

  return (
    <div dir={isRtl ? "rtl" : "ltr"} className="w-full">
      {/* Top Back Nav */}
      <div className="mb-8">
        <Link
          href={`/${currentLocale}/store`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 text-neutral-300 hover:text-white transition-all text-xs font-bold"
        >
          {isRtl ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
          <span>{t.store?.backToStore || "Back to Store"}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* ======================================================== */}
        {/* LEFT COLUMN: Product Overview & Manual Payment Gateways */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 space-y-8">
          {/* Header Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 rounded-lg border border-amber-500/20">
                {product.category || 'Premium Digital Service'}
              </span>
              {product.in_stock ? (
                <span className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                  {t.store?.inStock || "Available Now"}
                </span>
              ) : (
                <span className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-lg">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  {t.store?.outOfStock || "Sold Out"}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              {product.name}
            </h1>

            {/* Price Badge */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent border border-amber-500/20 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                  Single Unit Price:
                </span>
                <div className="text-3xl font-black text-white font-mono">
                  ${product.selling_price.toFixed(2)}
                </div>
              </div>
              <div className="text-right rtl:text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                  AFN Equivalent:
                </span>
                <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 font-mono">
                  ≈ {Math.round(product.selling_price * effectiveRate).toLocaleString()} AFN
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400">
                Product Description & Specs:
              </h3>
              <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap text-sm sm:text-base font-normal">
                {product.description || 'Verified authentic digital service delivered with warranty.'}
              </p>
            </div>
          </div>

          {/* Guarantee Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#090d16]/70 border border-white/8 flex gap-4 items-start backdrop-blur-xl">
              <Clock className="text-cyan-400 w-6 h-6 shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-bold text-sm">
                  {t.store?.deliverySLA || "Fast 24-Hour Delivery"}
                </h4>
                <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
                  {t.store?.deliveryDesc ||
                    "Access credentials and setup guide will be dispatched to your registered email."}
                </p>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-[#090d16]/70 border border-white/8 flex gap-4 items-start backdrop-blur-xl">
              <ShieldCheck className="text-emerald-400 w-6 h-6 shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-bold text-sm">
                  {t.store?.safiGuarantee || "Safi Authenticity Guarantee"}
                </h4>
                <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
                  {t.store?.safiGuaranteeDesc ||
                    "100% authentic digital assets backed by Safi International Capital LTD."}
                </p>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* MANUAL PAYMENT SECTION (HESABPAY & ATOMAPAY BUTTONS) */}
          {/* ======================================================== */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0d121f] via-[#080c14] to-[#04060b] border border-cyan-500/30 shadow-[0_10px_40px_rgba(6,182,212,0.1)] space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-black uppercase tracking-widest mb-1.5">
                  <Sparkles size={12} /> Afghan Local Banking
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {t.store?.manualPaymentTitle || "Fast Local Payment in Afghanistan"}
                </h3>
              </div>
            </div>

            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-normal">
              {t.store?.manualPaymentSubtitle ||
                "Pay directly using verified Afghan payment networks without international banking hurdles. Click on your preferred provider below to view official QR code and payment instructions:"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Button 1: HesabPay */}
              <Link
                href={hesabPayUrl}
                className="group relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-blue-950/60 via-cyan-950/40 to-[#060b14] border border-cyan-500/40 hover:border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-cyan-400/40 bg-white p-0.5 shadow-md shrink-0 group-hover:scale-105 transition-transform">
                    <img src="/hesabpay.jpg" alt="HesabPay" className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-black tracking-wider">
                    QR & Transfer
                  </span>
                </div>

                <div>
                  <div className="font-black text-white text-lg group-hover:text-cyan-300 transition-colors">
                    HesabPay (حساب‌پِی)
                  </div>
                  <div className="text-xs text-cyan-200/80 font-mono mt-1 dir-ltr text-left">
                    +93 796 040 415
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-cyan-500/20 flex items-center justify-between text-xs font-bold text-cyan-400">
                  <span>View HesabPay QR Code</span>
                  {isRtl ? <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> : <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                </div>
              </Link>

              {/* Button 2: AtomaPay */}
              <Link
                href={atomaPayUrl}
                className="group relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-teal-950/40 to-[#060b14] border border-emerald-500/40 hover:border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-emerald-400/40 bg-white p-0.5 shadow-md shrink-0 group-hover:scale-105 transition-transform">
                    <img src="/atomapay.jpg" alt="AtomaPay" className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-black tracking-wider">
                    QR & Transfer
                  </span>
                </div>

                <div>
                  <div className="font-black text-white text-lg group-hover:text-emerald-300 transition-colors">
                    AtomaPay (اتوماپِی)
                  </div>
                  <div className="text-xs text-emerald-200/80 font-mono mt-1 dir-ltr text-left">
                    +93 773 449 567
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span>View AtomaPay QR Code</span>
                  {isRtl ? <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> : <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: Interactive Order Request Form */}
        {/* ======================================================== */}
        <div className="lg:col-span-5">
          <div className="bg-[#090d16]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
            {/* Ambient Internal Glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-[70px] pointer-events-none" />

            {isSuccess ? (
              <div className="text-center py-8 relative z-10 space-y-6">
                <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                  <CheckCircle2 size={42} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">
                    {t.store?.orderSuccessTitle || "Order Request Received!"}
                  </h3>
                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                    {t.store?.orderSuccessDesc ||
                      "Thank you! Your purchase request has been submitted. Please complete your payment using HesabPay or AtomaPay below."}
                  </p>
                </div>

                {/* Instant Actions for Manual Payment */}
                <div className="space-y-3 pt-2">
                  <Link
                    href={hesabPayUrl}
                    className="w-full py-3.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>Proceed to HesabPay QR Code</span>
                    <ExternalLink size={14} />
                  </Link>

                  <Link
                    href={atomaPayUrl}
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>Proceed to AtomaPay QR Code</span>
                    <ExternalLink size={14} />
                  </Link>

                  <a
                    href={`https://wa.me/93796040415?text=${encodeURIComponent(`Hello, I submitted order ${lastOrderId} for ${product.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle size={14} className="text-emerald-400" />
                    <span>Confirm Order with Support</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-amber-300 text-[10px] font-mono uppercase tracking-wider mb-2">
                    <CreditCard size={12} /> Instant Checkout Form
                  </div>
                  <h3 className="text-xl font-black text-white">
                    {t.store?.orderFormTitle || "Instant Online Order Request"}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    {t.store?.orderFormSubtitle ||
                      "Enter your delivery coordinates. Our automated pipeline processes orders around the clock."}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="bg-black/50 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                    {t.store?.quantity || "Quantity"}:
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition-all"
                    >
                      -
                    </button>
                    <span className="font-mono font-black text-base w-6 text-center text-white">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-3.5">
                  <div className="relative">
                    <User className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder={t.store?.fullName || "Full Legal Name"}
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 rtl:pl-4 rtl:pr-10 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400/60 transition-all font-medium"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email Address (For Product Delivery)"
                      className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 rtl:pl-4 rtl:pr-10 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400/60 transition-all font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <Smartphone className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                      <input
                        required
                        type="text"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        placeholder={t.store?.whatsapp || "WhatsApp No."}
                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-8 pr-3 rtl:pl-3 rtl:pr-8 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400/60 transition-all font-mono"
                      />
                    </div>
                    <div className="relative">
                      <MessageCircle className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                      <input
                        required
                        type="text"
                        name="telegram"
                        value={formData.telegram}
                        onChange={handleInputChange}
                        placeholder={t.store?.telegram || "@telegram"}
                        className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-8 pr-3 rtl:pl-3 rtl:pr-8 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-amber-400/60 transition-all font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Real-time Financial Breakdown */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/8 space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-400">Total Order (USD):</span>
                    <span className="font-mono font-black text-white text-sm">
                      ${totalUSD.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t border-white/10 pt-2 text-xs">
                    <span className="text-neutral-400 flex items-center gap-1">
                      {isLoadingRate ? <RefreshCw className="w-3 h-3 animate-spin" /> : "Local AFN Total:"}
                    </span>
                    <span className="font-mono font-black text-base text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                      {totalAFN.toLocaleString()} AFN
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  disabled={!product.in_stock || isSubmitting}
                  type="submit"
                  className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                    !product.in_stock
                      ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                      : isSubmitting
                      ? "bg-amber-500/50 text-black cursor-wait"
                      : "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-black shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:scale-[1.01] active:scale-[0.99]"
                  }`}
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>{t.store?.confirmOrder || "Confirm Purchase Request"}</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}