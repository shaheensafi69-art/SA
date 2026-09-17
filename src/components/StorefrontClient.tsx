"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  ShoppingCart,
  ArrowRight,
  ArrowLeft,
  Box,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Clock,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';
import { getPortalTranslation } from '@/utils/portalTranslations';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  selling_price: number;
  in_stock: boolean;
}

interface StorefrontClientProps {
  products: Product[];
  currentLocale: string;
}

export default function StorefrontClient({ products, currentLocale }: StorefrontClientProps) {
  const t = getPortalTranslation(currentLocale);
  const isRtl = t.isRtl;

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Live Exchange Rate for USD to AFN
  const [baseRate, setBaseRate] = useState<number>(70);
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
      }
    };
    fetchExchangeRate();
  }, []);

  const effectiveRate = baseRate + EXCHANGE_PROFIT_MARGIN;

  // Extract unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
    return ["All", ...uniqueCategories];
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  return (
    <div className="w-full" dir={isRtl ? "rtl" : "ltr"}>
      {/* Search & Filter Bar */}
      <div className="bg-[#090d16]/80 border border-white/10 rounded-3xl p-4 sm:p-5 mb-10 backdrop-blur-2xl shadow-2xl flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full lg:w-1/3">
          <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 text-amber-400 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            placeholder={t.store?.searchPlaceholder || "Search products, AI tools, licenses..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 rtl:pl-4 rtl:pr-12 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/50 transition-all text-sm font-medium"
          />
        </div>

        {/* Category Tabs */}
        <div className="w-full lg:w-2/3 flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max px-1">
            <Filter className="text-neutral-500 w-4 h-4 mr-2 rtl:mr-0 rtl:ml-2 shrink-0" />
            {categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.35)]"
                    : "bg-white/[0.03] text-neutral-400 hover:bg-white/[0.08] hover:text-white border border-white/5"
                }`}
              >
                {category === "All" ? t.store?.allCategories || "All Categories" : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Manual Payment Badges Callout */}
      <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-emerald-950/30 to-amber-950/20 border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Sparkles className="text-amber-400 shrink-0" size={18} />
          <span className="text-xs sm:text-sm font-bold text-neutral-200">
            {t.store?.manualPaymentSubtitle ||
              "Pay directly using verified Afghan payment networks without international banking hurdles."}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
            <img src="/hesabpay.jpg" alt="HesabPay" className="w-5 h-5 rounded-md object-cover" />
            <span>HesabPay (+93 796 040 415)</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
            <img src="/atomapay.jpg" alt="AtomaPay" className="w-5 h-5 rounded-md object-cover" />
            <span>AtomaPay (+93 773 449 567)</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product: Product) => {
          const afnPrice = Math.round(product.selling_price * effectiveRate);

          return (
            <Link
              href={`/${currentLocale}/store/${product.id}`}
              key={product.id}
              className="group relative bg-[#090d16]/70 border border-white/8 hover:border-amber-500/40 rounded-3xl p-6 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                {/* Header: Category & Stock */}
                <div className="flex justify-between items-start mb-5 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform duration-300">
                    <Box size={18} />
                  </div>

                  {product.in_stock ? (
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        {t.store?.inStock || "In Stock"}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-full">
                      <AlertCircle size={10} className="text-rose-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                        {t.store?.outOfStock || "Sold Out"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mb-2 inline-block px-2.5 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                  {product.category || "Digital Service"}
                </div>

                <h3 className="text-base sm:text-lg font-black text-white mb-2 line-clamp-2 leading-snug group-hover:text-amber-300 transition-colors">
                  {product.name}
                </h3>

                {product.description && (
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
                    {product.description}
                  </p>
                )}
              </div>

              <div className="mt-auto pt-4 border-t border-white/5">
                {/* Meta Perks */}
                <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-cyan-400" />
                    <span>24h Delivery</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShieldCheck size={12} className="text-emerald-400" />
                    <span>Safi Guarantee</span>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex items-end justify-between relative z-10 pt-2 border-t border-white/5">
                  <div>
                    <div className="text-xl font-black text-white font-mono">
                      ${product.selling_price.toFixed(2)}
                    </div>
                    <div className="text-[11px] font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                      ≈ {afnPrice.toLocaleString()} AFN
                    </div>
                  </div>

                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      product.in_stock
                        ? "bg-gradient-to-r from-amber-400 to-yellow-400 text-black group-hover:scale-105 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                        : "bg-neutral-800 text-neutral-600"
                    }`}
                  >
                    {isRtl ? (
                      <ArrowLeft size={16} className={product.in_stock ? "group-hover:-translate-x-0.5 transition-transform" : ""} />
                    ) : (
                      <ArrowRight size={16} className={product.in_stock ? "group-hover:translate-x-0.5 transition-transform" : ""} />
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-neutral-900/40 border border-white/5 rounded-3xl backdrop-blur-sm">
          <ShoppingCart size={48} className="mx-auto text-neutral-600 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Products Found</h3>
          <p className="text-neutral-400 text-sm">
            We couldn't find any products matching your search criteria.
          </p>
        </div>
      )}
    </div>
  );
}