import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import ProductDetailClient from '../../../../components/ProductDetailClient'; // مطمئن شوید مسیر درست است

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const revalidate = 60;

export default async function ProductDetailPage({
    params
}: {
    params: { id: string, locale: string }
}) {
    // گرفتن دیتای محصول شامل قیمت اصلی (cost_price) برای محاسبات و تلگرام
    const { data: product, error } = await supabase
        .from('reseller_products')
        .select('*')
        .eq('id', params.id)
        .single();

    if (error || !product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#020202] text-white py-28 md:py-36 px-4 sm:px-6 relative overflow-hidden flex justify-center">

            {/* Dynamic Background Mesh & Ambient Glow */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
                <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>
            </div>

            <div className="w-full max-w-6xl relative z-10">
                {/* پاس دادن اطلاعات به کلاینت کامپوننت */}
                <ProductDetailClient product={product} currentLocale={params.locale || 'en'} />
            </div>

        </main>
    );
}