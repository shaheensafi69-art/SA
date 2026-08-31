"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    PenTool,
    Image as ImageIcon,
    Globe,
    Tag,
    Save,
    User,
    FileText,
    UploadCloud,
    Loader2,
    X
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function CreateBlogPage() {
    const router = useRouter();
    const supabase = createClient();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        language: "en",
        category: "",
        author_name: "",
        cover_image: "",
        content: "",
        is_published: true,
    });

    // هندلر آپلود مستقیم عکس در باکت Blog
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `${fileName}`;

            // آپلود فایل به باکت Blog
            const { error: uploadError } = await supabase.storage
                .from('Blog')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // دریافت لینک عمومی عکس
            const { data: { publicUrl } } = supabase.storage
                .from('Blog')
                .getPublicUrl(filePath);

            // قرار دادن لینک در استیت فرم
            setFormData(prev => ({ ...prev, cover_image: publicUrl }));
        } catch (error: any) {
            alert("Error uploading image: " + error.message);
        } finally {
            setUploadingImage(false);
            // ریست کردن اینپوت فایل تا بتوان دوباره همان فایل را انتخاب کرد
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const removeImage = () => {
        setFormData(prev => ({ ...prev, cover_image: "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.cover_image) {
            alert("Please upload a cover image first.");
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.from("blogs").insert([{
                ...formData,
                translation_group_id: crypto.randomUUID(),
            }]);

            if (error) throw error;

            alert("Blog created successfully!");
            router.push("/en/admin/blogs");
        } catch (error: any) {
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen p-4 sm:p-8 lg:p-12 font-sans text-white bg-[#060608] relative overflow-hidden">
            {/* بک‌گراند نوری ملایم متناسب با تم ادمین */}
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-yellow-500/5 blur-[120px] pointer-events-none"></div>

            <div className="mx-auto max-w-5xl space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-white/5 pb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/5 border border-yellow-500/20 text-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
                        <PenTool size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Create New Blog</h1>
                        <p className="text-xs sm:text-sm text-neutral-400 mt-1">Draft and publish a new article to the academy.</p>
                    </div>
                </div>

                {/* Main Form */}
                <form onSubmit={handleSubmit} className="space-y-8 rounded-[2rem] border border-white/5 bg-black/40 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">

                    <div className="grid gap-8 lg:grid-cols-2">

                        {/* ستون چپ: اطلاعات متنی */}
                        <div className="space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                                    <FileText size={14} /> Blog Title
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-yellow-500/50 focus:bg-white/[0.05] focus:outline-none transition-all shadow-inner"
                                    placeholder="Enter a captivating title"
                                />
                            </div>

                            {/* Slug */}
                            <div className="space-y-2">
                                <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                                    <Globe size={14} /> URL Slug
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                    className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-yellow-500/50 focus:bg-white/[0.05] focus:outline-none transition-all shadow-inner"
                                    placeholder="e.g. trading-strategies-2027"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Author */}
                                <div className="space-y-2">
                                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                                        <User size={14} /> Author
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.author_name}
                                        onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                                        className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-yellow-500/50 focus:bg-white/[0.05] focus:outline-none transition-all shadow-inner"
                                        placeholder="Author name"
                                    />
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                                        <Tag size={14} /> Category
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-yellow-500/50 focus:bg-white/[0.05] focus:outline-none transition-all shadow-inner"
                                        placeholder="e.g. Finance"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ستون راست: آپلود عکس پریمیوم */}
                        <div className="space-y-2">
                            <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                                <ImageIcon size={14} /> Cover Image
                            </label>

                            <div className="relative w-full h-full min-h-[220px] rounded-[2rem] border-2 border-dashed border-white/10 bg-white/[0.01] hover:bg-white/[0.03] hover:border-yellow-500/30 transition-all flex flex-col items-center justify-center overflow-hidden group">

                                {/* اینپوت مخفی برای انتخاب فایل */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />

                                {uploadingImage ? (
                                    <div className="flex flex-col items-center gap-3 text-yellow-500">
                                        <Loader2 size={32} className="animate-spin" />
                                        <span className="text-xs font-bold uppercase tracking-widest">Uploading to Bucket...</span>
                                    </div>
                                ) : formData.cover_image ? (
                                    <>
                                        <img
                                            src={formData.cover_image}
                                            alt="Cover Preview"
                                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="rounded-full bg-white/20 backdrop-blur-md px-6 py-2 text-xs font-bold text-white hover:bg-white/30 transition-all border border-white/10"
                                            >
                                                Change Image
                                            </button>
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="rounded-full bg-red-500/20 backdrop-blur-md px-6 py-2 text-xs font-bold text-red-400 hover:bg-red-500/40 transition-all border border-red-500/20 flex items-center gap-1"
                                            >
                                                <X size={14} /> Remove
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex flex-col items-center gap-4 text-neutral-500 group-hover:text-yellow-400 transition-colors cursor-pointer p-8 w-full h-full"
                                    >
                                        <div className="p-4 rounded-full bg-white/5 shadow-inner border border-white/5 group-hover:bg-yellow-500/10 group-hover:border-yellow-500/20 transition-all">
                                            <UploadCloud size={32} />
                                        </div>
                                        <div className="text-center space-y-1">
                                            <p className="text-sm font-bold text-white">Click to upload cover</p>
                                            <p className="text-[10px] uppercase tracking-widest">SVG, PNG, JPG or GIF (MAX. 50MB)</p>
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Content */}
                    <div className="space-y-2 pt-4 border-t border-white/5">
                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                            <FileText size={14} /> Content (HTML/Markdown)
                        </label>
                        <textarea
                            required
                            rows={10}
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-white placeholder-neutral-600 focus:border-yellow-500/50 focus:bg-white/[0.05] focus:outline-none transition-all resize-y shadow-inner leading-relaxed"
                            placeholder="Write the full article content here..."
                        />
                    </div>

                    {/* Actions Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/5">

                        {/* Publish Toggle */}
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setFormData({ ...formData, is_published: !formData.is_published })}>
                            <div className={`flex h-6 w-11 items-center rounded-full p-1 transition-colors duration-300 ${formData.is_published ? 'bg-yellow-500' : 'bg-white/10 shadow-inner'}`}>
                                <div className={`h-4 w-4 rounded-full bg-white transition-transform duration-300 shadow-sm ${formData.is_published ? 'translate-x-5' : 'translate-x-0'}`} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white">Publish Immediately</span>
                                <span className="text-[10px] text-neutral-500 uppercase tracking-widest">Make visible to public</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || uploadingImage}
                            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-all disabled:opacity-50 shadow-[0_0_30px_rgba(234,179,8,0.2)] hover:shadow-[0_0_40px_rgba(234,179,8,0.4)] w-full sm:w-auto"
                        >
                            {loading ? "Publishing..." : <><Save size={18} /> Save & Publish</>}
                        </button>
                    </div>

                </form>
            </div>
        </main>
    );
}