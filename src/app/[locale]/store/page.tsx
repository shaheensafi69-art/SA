import { createClient } from '@supabase/supabase-js';
import { Zap, ShieldCheck, Sparkles } from 'lucide-react';
import StorefrontClient from '@/components/StorefrontClient';
import { getPortalTranslation } from '@/utils/portalTranslations';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const revalidate = 60;

export default async function PremiumStorePage({
  params
}: {
  params: { locale: string };
}) {
  const currentLocale = params.locale || 'en';
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;

  // Fetch active products from the database on the server side
  const { data: products, error } = await supabase
    .from('reseller_products')
    .select('*')
    .eq('is_active', true)
    .order('category', { ascending: true });

  if (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <main
      dir={isRtl ? 'rtl' : 'ltr'}
      className="w-full relative bg-[#020306] text-white font-sans overflow-hidden min-h-screen pt-28 md:pt-36 pb-32"
    >
      {/* Dynamic Background Mesh & Ambient Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] bg-amber-500/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-600/10 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-400 mb-6 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Sparkles size={14} className="animate-pulse" />
            <span>{t.store?.storeBadge || 'Safi Digital Store & Services'}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            {t.store?.heroTitle || 'Access Exclusive World-Class Services'}
          </h1>

          <p className="text-neutral-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            {t.store?.heroSubtitle ||
              'Curated software licenses, developer tools, AI credits, and specialized business solutions with instant delivery and secure payment.'}
          </p>

          {/* Metadata Pill Bar */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 p-2 bg-neutral-900/80 border border-white/10 rounded-2xl text-xs text-neutral-300 backdrop-blur-md shadow-xl">
            <span className="px-3 py-1 rounded-lg bg-white/5 font-semibold text-white flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" /> Secure & Encrypted
            </span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-white/5 text-amber-300 font-mono font-bold">
              Afghan Local Payments
            </span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 font-medium flex items-center gap-1.5">
              <Zap size={14} /> 24/7 Verified SLA
            </span>
          </div>
        </div>

        {/* Interactive Search and Product Grid Component */}
        <StorefrontClient products={products || []} currentLocale={currentLocale} />
      </div>
    </main>
  );
}