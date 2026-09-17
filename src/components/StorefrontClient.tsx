"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
    ShoppingCart,
    ArrowRight,
    Box,
    CheckCircle2,
    AlertCircle,
    Search,
    Filter,
    Clock,
    ShieldCheck
} from 'lucide-react';

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
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    // Automatically extract unique categories from the database products
    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
        return ["All", ...uniqueCategories];
    }, [products]);

    // Filter products based on search query and active category
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCategory = activeCategory === "All" || product.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, activeCategory]);

    return (
        <div className="w-full">
            {/* Search & Filter Bar */}
            <div className="bg-neutral-900/60 border border-white/10 rounded-3xl p-4 mb-10 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row gap-4 items-center justify-between">

                {/* Search Input */}
                <div className="relative w-full lg:w-1/3">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search digital assets & services..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                    />
                </div>

                {/* Category Tabs */}
                <div className="w-full lg:w-2/3 flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar mask-fade-edges">
                    <div className="flex items-center gap-2 min-w-max px-2">
                        <Filter className="text-neutral-500 w-4 h-4 mr-2" />
                        {categories.map((category, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveCategory(category)}
                                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeCategory === category
                                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                                    : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white border border-white/5'
                                    }`}
                            >
                                {category === "All" ? "All Categories" : category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product: Product) => (
                    <Link
                        href={`/${currentLocale}/store/${product.id}`}
                        key={product.id}
                        className="group relative bg-neutral-900/60 border border-white/5 hover:border-purple-500/30 rounded-3xl p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col justify-between overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                        <div>
                            {/* Header: Category & Stock */}
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-purple-400 group-hover:scale-110 transition-all duration-300">
                                    <Box size={20} />
                                </div>

                                {product.in_stock ? (
                                    <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                                        <span className="flex h-2 w-2 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">In Stock</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-md">
                                        <AlertCircle size={10} className="text-rose-400" />
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">Sold Out</span>
                                    </div>
                                )}
                            </div>

                            <div className="mb-2 inline-block px-2.5 py-1 rounded-md bg-white/5 text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                                {product.category || 'Digital Service'}
                            </div>

                            <h3 className="text-lg font-black text-white mb-3 line-clamp-2 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all">
                                {product.name}
                            </h3>

                            {product.description && (
                                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-5">
                                    {product.description}
                                </p>
                            )}
                        </div>

                        <div className="mt-auto">
                            {/* Metadata / Warranty & Time */}
                            <div className="flex items-center gap-4 py-3 mb-4 border-y border-white/5">
                                <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-medium whitespace-nowrap">
                                    <Clock className="w-3.5 h-3.5 text-blue-400" /> Instant Delivery
                                </div>
                                <div className="w-[1px] h-3 bg-white/10 shrink-0"></div>
                                <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-medium whitespace-nowrap">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Secure Guarantee
                                </div>
                            </div>

                            {/* Price & Action */}
                            <div className="flex items-end justify-between relative z-10">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">Final Price</span>
                                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                                        ${product.selling_price.toFixed(2)}
                                    </div>
                                </div>

                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${product.in_stock
                                    ? 'bg-purple-600 text-white group-hover:bg-purple-500 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]'
                                    : 'bg-neutral-800 text-neutral-600'
                                    }`}>
                                    <ArrowRight size={18} className={product.in_stock ? 'group-hover:translate-x-0.5 transition-transform' : ''} />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Empty State Fallback */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-20 bg-neutral-900/40 border border-white/5 rounded-3xl backdrop-blur-sm">
                    <ShoppingCart size={48} className="mx-auto text-neutral-600 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Results Found</h3>
                    <p className="text-neutral-400 text-sm">We couldn't find any products matching your search criteria or category filters.</p>
                </div>
            )}
        </div>
    );
}