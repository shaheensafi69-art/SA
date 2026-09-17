import { Suspense } from "react";
import ManualPaymentGatewayClient from "@/components/ManualPaymentGatewayClient";

export const metadata = {
  title: "AtomaPay Payment Gateway | Safi Digital Store",
  description: "Official payment gateway for AtomaPay transactions at Safi Digital Store and International Services."
};

interface PageProps {
  params: Promise<{ locale: string }> | { locale: string };
}

export default async function AtomaPayPaymentPage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const currentLocale = resolvedParams?.locale || "en";

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#03060c] text-white flex items-center justify-center p-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono text-emerald-300">Loading AtomaPay Gateway...</span>
          </div>
        </div>
      }
    >
      <ManualPaymentGatewayClient
        gateway="atomapay"
        currentLocale={currentLocale}
      />
    </Suspense>
  );
}
