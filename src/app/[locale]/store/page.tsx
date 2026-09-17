import { createClient } from '@supabase/supabase-js';
import { Zap, ShieldCheck, Sparkles } from 'lucide-react';
import StorefrontClient from '@/components/StorefrontClient';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const revalidate = 60;

export default async function PremiumStorePage({
    params,
}: {
    params: { locale: string };
}) {
    const currentLocale = params.locale || 'en';

    // Fetch active products from the database on the server side
    const { data: products, error } = await supabase
        .from('reseller_products')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true });

    if (error) {
        console.error("Error fetching products:", error);
    }

    return (
        <main className="w-full relative bg-[#020202] text-white font-sans overflow-hidden min-h-screen pt-28 md:pt-36 pb-32">

            {/* Dynamic Background Mesh & Ambient Glow */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[180px]"></div>
                <div className="absolute bottom-[10%] right-[-10%] w-[45vw] h-[45vw] bg-blue-600/10 rounded-full blur-[180px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">

                {/* Top Hero Banner */}
                <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-purple-400 mb-6">
                        <Sparkles size={14} className="animate-pulse" /> Premium Digital Assets
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                        Access Exclusive <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500">
                            World-Class Services
                        </span>
                    </h1>

                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
                        Experience top-tier software and digital solutions powered by the Safi International Capital LTD ecosystem. Enjoy secure, encrypted payments and instant automated delivery.
                    </p>

                    {/* Metadata Pill Bar */}
                    <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 p-2 bg-neutral-900/80 border border-white/10 rounded-2xl text-xs text-neutral-300 backdrop-blur-md">
                        <span className="px-3 py-1 rounded-lg bg-white/5 font-semibold text-white flex items-center gap-1.5">
                            <ShieldCheck size={14} className="text-emerald-400" /> Secure & Encrypted
                        </span>
                        <span className="hidden sm:inline text-neutral-600">•</span>
                        <span className="px-3 py-1 rounded-lg bg-white/5 text-neutral-400 font-mono">No Hidden Fees</span>
                        <span className="hidden sm:inline text-neutral-600">•</span>
                        <span className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 font-medium flex items-center gap-1.5">
                            <Zap size={14} /> 24/7 Support
                        </span>
                    </div>
                </div>

                {/* Interactive Search and Product Grid Component */}
                <StorefrontClient products={products || []} currentLocale={currentLocale} />

            </div>
        </main>
    );
}