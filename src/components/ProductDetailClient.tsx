"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import {
    ArrowLeft,
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
    RefreshCw
} from 'lucide-react';

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

// اتصال به دیتابیس سوپابیس برای ثبت سفارش
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ProductDetailClient({ product, currentLocale }: ProductDetailClientProps) {
    // فرم استیت‌ها
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        whatsapp: '',
        telegram: '',
    });
    const [quantity, setQuantity] = useState(1);

    // وضعیت‌های سیستم
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // استیت‌های ارز (Exchange Rate)
    const [baseRate, setBaseRate] = useState<number>(70); // ریت پیش‌فرض
    const [isLoadingRate, setIsLoadingRate] = useState(true);

    // سود ثابت شما در هر دلار (به افغانی)
    const EXCHANGE_PROFIT_MARGIN = 20;

    // دریافت نرخ زنده دلار به افغانی
    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const res = await fetch("https://open.er-api.com/v6/latest/USD");
                const data = await res.json();
                if (data && data.rates && data.rates.AFN) {
                    setBaseRate(data.rates.AFN);
                }
            } catch (error) {
                console.error("Failed to fetch exchange rate, using fallback.");
            } finally {
                setIsLoadingRate(false);
            }
        };
        fetchExchangeRate();
    }, []);

    // محاسبات مالی (قیمت خرید کل، قیمت فروش کل و سود کل)
    const totalCostPrice = product.cost_price * quantity;
    const totalSalePrice = product.selling_price * quantity;
    const totalProfit = totalSalePrice - totalCostPrice;

    const totalUSD = totalSalePrice;
    const effectiveRate = baseRate + EXCHANGE_PROFIT_MARGIN; // نرخ گوگل + 20 افغانی
    const totalAFN = totalUSD * effectiveRate;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // ۱. ثبت سفارش در دیتابیس سوپابیس (جدول reseller_orders)
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
            const telegramBotToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || "8668673040:AAEI6Q4r28KWiTAGwvQrT0Y9j6S92KhtwiI";
            const telegramChatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || "5195615040";

            // ۲. ساخت پیام حرفه‌ای برای بات تلگرام (شامل شماره سفارش دیتابیس)
            const message = `
🆕 *New Order Submitted (Safi Academy)*
-----------------------------------
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

💰 *Financials (Total Order):*
• Total Cost: $${totalCostPrice.toFixed(2)}
• Total Sale: $${totalSalePrice.toFixed(2)}
• System Profit: *$${totalProfit.toFixed(2)}*

💳 *Customer Pays:*
• Total USD: *$${totalUSD.toFixed(2)}*
• Total AFN: *${totalAFN.toLocaleString('en-US', { maximumFractionDigits: 0 })} ؋* 
_(Exchange Rate: ${baseRate.toFixed(2)} + ${EXCHANGE_PROFIT_MARGIN} ؋ Margin = ${effectiveRate.toFixed(2)})_

⏳ *Status:* Pending (24h SLA)
            `;

            // ۳. ارسال پیام به تلگرام
            const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: telegramChatId,
                    text: message,
                    parse_mode: 'Markdown'
                })
            });

            if (response.ok) {
                setIsSuccess(true);
            } else {
                throw new Error("Failed to send Telegram notification.");
            }

        } catch (error: any) {
            console.error("Submission Error:", error);
            alert("Error processing your request. Please try again or contact support.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">

            {/* Left Column: Product Information */}
            <div className="lg:col-span-7 space-y-8">
                <Link
                    href={`/${currentLocale}/store`}
                    className="inline-flex items-center space-x-2 text-neutral-400 hover:text-white mb-4 transition-colors"
                >
                    <ArrowLeft size={16} />
                    <span className="font-medium text-sm tracking-wide">Back to Store</span>
                </Link>

                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-purple-500/10 text-purple-400 rounded-full border border-purple-500/20">
                            {product.category || 'Premium Service'}
                        </span>
                        {product.in_stock ? (
                            <span className="flex items-center text-emerald-400 text-xs font-bold uppercase tracking-wider">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                                Available Now
                            </span>
                        ) : (
                            <span className="flex items-center text-rose-400 text-xs font-bold uppercase tracking-wider">
                                <span className="h-2 w-2 rounded-full bg-rose-500 mr-2"></span>
                                Out of Stock
                            </span>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        {product.name}
                    </h1>

                    <div className="prose prose-invert max-w-none">
                        <p className="text-neutral-400 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                            {product.description || 'No additional description provided for this service.'}
                        </p>
                    </div>

                    {/* Feature Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10 mt-8">
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4 items-start">
                            <Clock className="text-blue-400 w-6 h-6 shrink-0" />
                            <div>
                                <h4 className="text-white font-bold text-sm">24-Hour Delivery</h4>
                                <p className="text-neutral-500 text-xs mt-1">Details will be securely sent directly to your registered email address.</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4 items-start">
                            <ShieldCheck className="text-emerald-400 w-6 h-6 shrink-0" />
                            <div>
                                <h4 className="text-white font-bold text-sm">Safi Guarantee</h4>
                                <p className="text-neutral-500 text-xs mt-1">100% authentic services backed by Safi International Capital LTD.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Checkout Form (Glassmorphism) */}
            <div className="lg:col-span-5">
                <div className="bg-neutral-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(168,85,247,0.1)] relative overflow-hidden">

                    {/* Ambient Internal Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-[60px] pointer-events-none"></div>

                    {isSuccess ? (
                        <div className="text-center py-10 relative z-10">
                            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-3">Request Received!</h3>
                            <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                                Thank you! Your purchase request has been securely submitted. Our team will process it and send the product to your email within 24 hours.
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold transition-all"
                            >
                                Submit Another Request
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                                    <CreditCard className="text-purple-400 w-5 h-5" /> Secure Checkout
                                </h3>
                                <p className="text-xs text-neutral-500">Please fill out your correct details for delivery.</p>
                            </div>

                            {/* Quantity Selector */}
                            <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                                <span className="text-sm font-medium text-neutral-400">Quantity Needed:</span>
                                <div className="flex items-center gap-4">
                                    <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">-</button>
                                    <span className="font-bold text-lg w-4 text-center">{quantity}</span>
                                    <button type="button" onClick={() => setQuantity(q => q + 1)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">+</button>
                                </div>
                            </div>

                            {/* Input Fields */}
                            <div className="space-y-4">
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                    <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="First & Last Name" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-600 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all" />
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email Address (For Delivery)" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-600 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                        <input required type="text" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder="WhatsApp No." className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-600 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all" />
                                    </div>
                                    <div className="relative">
                                        <MessageCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                                        <input required type="text" name="telegram" value={formData.telegram} onChange={handleInputChange} placeholder="Telegram ID" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-600 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all" />
                                    </div>
                                </div>
                            </div>

                            {/* Live Conversion Display */}
                            <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5 space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-neutral-400">Total (USD):</span>
                                    <span className="font-black text-white">${totalUSD.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center border-t border-white/10 pt-3">
                                    <span className="text-neutral-400 text-xs flex items-center gap-1">
                                        {isLoadingRate ? <RefreshCw className="w-3 h-3 animate-spin" /> : "Live Local Rate:"}
                                    </span>
                                    <div className="text-right">
                                        <div className="font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                                            {isLoadingRate ? "Calculating..." : `${totalAFN.toLocaleString('en-US', { maximumFractionDigits: 0 })} AFN`}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                disabled={!product.in_stock || isSubmitting}
                                className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${!product.in_stock
                                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                                    : isSubmitting
                                        ? 'bg-purple-600/50 text-white cursor-wait'
                                        : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.7)]'
                                    }`}
                            >
                                {isSubmitting ? 'Processing...' : (
                                    <>
                                        <span>Confirm Purchase Request</span>
                                        <Send size={16} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}