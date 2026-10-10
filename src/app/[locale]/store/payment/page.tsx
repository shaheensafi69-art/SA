import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, CreditCard, Smartphone, CheckCircle2, Lock } from "lucide-react";
import AdsterraNativeBanner from "@/components/ads/AdsterraNativeBanner";

interface PageProps {
  params: Promise<{ locale: string }> | { locale: string };
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
}

export const metadata = {
  title: "Payment Methods | Safi Store Gateways",
  description: "Secure payment gateways for Safi Digital Store: AtomaPay, HesabPay, and global digital processing.",
};

export default async function StorePaymentGatewayPage({ params, searchParams }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const resolvedQuery = await Promise.resolve(searchParams || {});
  const locale = resolvedParams?.locale || "en";
  const isRtl = locale === "fa" || locale === "ps";

  const queryString = new URLSearchParams(
    Object.entries(resolvedQuery).reduce((acc, [k, v]) => {
      if (typeof v === "string") acc[k] = v;
      return acc;
    }, {} as Record<string, string>)
  ).toString();

  const querySuffix = queryString ? `?${queryString}` : "";

  return (
    <div className="min-h-screen bg-[#03060c] text-white pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
            <Lock size={13} />
            <span>{isRtl ? "درگاه پرداخت امن و تایید شده" : "End-to-End Encrypted Checkout"}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400">
            {isRtl ? "انتخاب روش پرداخت" : "Choose Your Payment Method"}
          </h1>
          <p className="text-neutral-400 text-sm max-w-xl mx-auto">
            {isRtl
              ? "برای تکمیل سفارش دیجیتال خود، یکی از روش‌های پرداخت زیر را انتخاب نمایید. کلیه پرداخت‌ها بلافاصله تایید می‌شوند."
              : "Select your preferred payment gateway to securely complete your digital order with instant verification."}
          </p>
        </div>

        {/* Gateways Grid */}
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          {/* AtomaPay */}
          <Link
            href={`/${locale}/store/payment/atomapay${querySuffix}`}
            className="group relative p-6 rounded-3xl bg-[#090d19]/90 border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <CreditCard size={24} />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
                  {isRtl ? "فعال و آنی" : "Active & Instant"}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {isRtl ? "درگاه آتوماپی (AtomaPay)" : "AtomaPay Gateway"}
                </h3>
                <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
                  {isRtl
                    ? "پرداخت مستقیم و آنی کارت به کارت، کیف پول و ارزهای بین‌المللی با تایید خودکار رسید"
                    : "Instant wallet transfer, card processing, and rapid QR barcode confirmation."}
                </p>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
              <span>{isRtl ? "ورود به درگاه آتوماپی" : "Continue with AtomaPay"}</span>
              {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </div>
          </Link>

          {/* HesabPay */}
          <Link
            href={`/${locale}/store/payment/hesabpay${querySuffix}`}
            className="group relative p-6 rounded-3xl bg-[#090d19]/90 border border-emerald-500/20 hover:border-emerald-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Smartphone size={24} />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
                  {isRtl ? "توصیه شده در افغانستان" : "Recommended for Afghanistan"}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {isRtl ? "درگاه حساب‌پی (HesabPay)" : "HesabPay Gateway"}
                </h3>
                <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
                  {isRtl
                    ? "پرداخت آسان با حساب‌پی به افغانی (AFN) یا دالر همراه با اسکن بارکد QR و تایید فوری"
                    : "Easy payment via mobile HesabPay in AFN or USD with direct QR scan and instant invoice."}
                </p>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
              <span>{isRtl ? "ورود به درگاه حساب‌پی" : "Continue with HesabPay"}</span>
              {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
            </div>
          </Link>
        </div>

        {/* Security Notice */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3 text-xs text-neutral-400">
          <ShieldCheck size={18} className="text-cyan-400 shrink-0" />
          <span>
            {isRtl
              ? "کلیه تراکنش‌های آکادمی صافی با استاندارد رمزنگاری امن SSL 256-bit محافظت می‌گردد و رسید رسمی به صورت خودکار صادر خواهد شد."
              : "All Safi Digital transactions are protected with 256-bit SSL encryption. Official invoice receipts are provided upon submission."}
          </span>
        </div>

        {/* Contextual Adsterra Native Ad - Non-intrusive Sponsor */}
        <div className="pt-4">
          <AdsterraNativeBanner
            title={isRtl ? "پیشنهادهای ویژه پرداخت و خدمات مالی" : "Featured Payment & Financial Solutions"}
            niche="Fintech, Global Banking, Online Payment Gateways & Secure Transactions"
            keywords="hesabpay, atomapay, international payment, mastercard, visa, crypto gateway, merchant accounts"
            className="border-neutral-800/80 bg-neutral-900/40"
          />
        </div>
      </div>
    </div>
  );
}
