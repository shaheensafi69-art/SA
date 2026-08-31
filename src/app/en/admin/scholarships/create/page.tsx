"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    GraduationCap,
    MapPin,
    Calendar,
    Link as LinkIcon,
    Save,
    FileText,
    Image as ImageIcon,
    UploadCloud,
    Loader2,
    X,
    Globe,
    Award
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function CreateScholarshipPage() {
    const router = useRouter();
    const supabase = createClient();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        language: "en",
        continent: "",
        country: "",
        university: "",
        degree_level: "",
        deadline: "",
        description: "",
        eligibility_criteria: "",
        required_documents: "",
        apply_link: "",
        cover_image: "",
        is_active: true,
    });

    // هندلر آپلود مستقیم عکس در باکت scholarships
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `${fileName}`;

            // آپلود فایل به باکت scholarships
            const { error: uploadError } = await supabase.storage
                .from('scholarships')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // دریافت لینک عمومی عکس
            const { data: { publicUrl } } = supabase.storage
                .from('scholarships')
                .getPublicUrl(filePath);

            // قرار دادن لینک در استیت فرم
            setFormData(prev => ({ ...prev, cover_image: publicUrl }));
        } catch (error: any) {
            alert("Error uploading image: " + error.message);
        } finally {
            setUploadingImage(false);
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
            const { error } = await supabase.from("scholarships").insert([{
                ...formData,
                translation_group_id: crypto.randomUUID(),
            }]);

            if (error) throw error;

            alert("Scholarship added successfully!");
            router.push("/en/admin/scholarships");
        } catch (error: any) {
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen p-4 sm:p-8 lg:p-12 font-sans text-white bg-[#060608] relative overflow-hidden">
            {/* بک‌گراند نوری ملایم متناسب با تم ادمین (طیف آبی) */}
            <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>

            <div className="mx-auto max-w-6xl space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-white/5 pb-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-600/5 border border-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                        <GraduationCap size={28} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Add Scholarship</h1>
                        <p className="text-xs sm:text-sm text-neutral-400 mt-1">Create a new global educational opportunity.</p>
                    </div>
                </div>

                {/* Main Form */}
                <form onSubmit={handleSubmit} className="space-y-8">

                    <div className="grid gap-8 lg:grid-cols-[1fr_400px]">

                        {/* ستون چپ: اطلاعات اصلی و فرم‌ها */}
                        <div className="space-y-8">

                            <div className="rounded-[2rem] border border-white/5 bg-black/40 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl space-y-6">
                                <h2 className="text-sm font-black uppercase tracking-widest text-blue-400 border-b border-white/5 pb-4">General Info</h2>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                                            <FileText size={14} /> Title
                                        </label>
                                        <input required type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-blue-500/50 focus:bg-white/[0.05] focus:outline-none transition-all shadow-inner" placeholder="Fully Funded Oxford Scholarship" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                                            <Globe size={14} /> Slug (URL)
                                        </label>
                                        <input required type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-blue-500/50 focus:bg-white/[0.05] focus:outline-none transition-all shadow-inner" placeholder="oxford-scholarship-2027" />
                                    </div>
                                </div>

                                <div className="grid gap-6 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2"><MapPin size={14} /> Continent</label>
                                        <input required type="text" value={formData.continent} onChange={(e) => setFormData({ ...formData, continent: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-blue-500/50 focus:bg-white/[0.05] focus:outline-none transition-all shadow-inner" placeholder="Europe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400">Country</label>
                                        <input required type="text" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-blue-500/50 focus:bg-white/[0.05] focus:outline-none transition-all shadow-inner" placeholder="United Kingdom" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400">University</label>
                                        <input required type="text" value={formData.university} onChange={(e) => setFormData({ ...formData, university: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-blue-500/50 focus:bg-white/[0.05] focus:outline-none transition-all shadow-inner" placeholder="Oxford" />
                                    </div>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2"><Award size={14} /> Degree Level</label>
                                        <input required type="text" value={formData.degree_level} onChange={(e) => setFormData({ ...formData, degree_level: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-blue-500/50 focus:bg-white/[0.05] focus:outline-none transition-all shadow-inner" placeholder="Master, PhD" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2"><Calendar size={14} /> Deadline</label>
                                        <input required type="date" value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-blue-500/50 focus:bg-white/[0.05] focus:outline-none transition-all shadow-inner [color-scheme:dark]" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2"><LinkIcon size={14} /> Apply Link</label>
                                    <input required type="url" value={formData.apply_link} onChange={(e) => setFormData({ ...formData, apply_link: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-3.5 text-sm text-white placeholder-neutral-600 focus:border-blue-500/50 focus:bg-white/[0.05] focus:outline-none transition-all shadow-inner" placeholder="https://..." />
                                </div>
                            </div>

                            {/* Requirements & Description */}
                            <div className="rounded-[2rem] border border-white/5 bg-black/40 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl space-y-6">
                                <h2 className="text-sm font-black uppercase tracking-widest text-blue-400 border-b border-white/5 pb-4">Details & Requirements</h2>

                                <div className="space-y-2">
                                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400">Description</label>
                                    <textarea required rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-white placeholder-neutral-600 focus:border-blue-500/50 focus:bg-white/[0.05] focus:outline-none transition-all resize-y shadow-inner" placeholder="Brief overview of the scholarship..." />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400">Eligibility Criteria</label>
                                    <textarea required rows={3} value={formData.eligibility_criteria} onChange={(e) => setFormData({ ...formData, eligibility_criteria: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-white placeholder-neutral-600 focus:border-blue-500/50 focus:bg-white/[0.05] focus:outline-none transition-all resize-y shadow-inner" placeholder="Who can apply?" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400">Required Documents</label>
                                    <textarea required rows={3} value={formData.required_documents} onChange={(e) => setFormData({ ...formData, required_documents: e.target.value })} className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-white placeholder-neutral-600 focus:border-blue-500/50 focus:bg-white/[0.05] focus:outline-none transition-all resize-y shadow-inner" placeholder="Passport, Transcripts, CV..." />
                                </div>
                            </div>

                        </div>

                        {/* ستون راست: آپلود عکس و اکشن‌ها */}
                        <div className="space-y-8">

                            <div className="rounded-[2rem] border border-white/5 bg-black/40 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-4">
                                <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-neutral-400 flex items-center gap-2 mb-2">
                                    <ImageIcon size={14} /> Cover Image
                                </label>

                                <div className="relative w-full aspect-square md:aspect-auto md:h-[280px] rounded-[1.5rem] border-2 border-dashed border-white/10 bg-white/[0.01] hover:bg-white/[0.03] hover:border-blue-500/30 transition-all flex flex-col items-center justify-center overflow-hidden group">
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />

                                    {uploadingImage ? (
                                        <div className="flex flex-col items-center gap-3 text-blue-500">
                                            <Loader2 size={32} className="animate-spin" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Uploading to Bucket...</span>
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
                                            className="flex flex-col items-center gap-4 text-neutral-500 group-hover:text-blue-400 transition-colors cursor-pointer p-8 w-full h-full"
                                        >
                                            <div className="p-4 rounded-full bg-white/5 shadow-inner border border-white/5 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all">
                                                <UploadCloud size={32} />
                                            </div>
                                            <div className="text-center space-y-1">
                                                <p className="text-sm font-bold text-white">Click to upload cover</p>
                                                <p className="text-[9px] uppercase tracking-widest">SVG, PNG, JPG (MAX. 50MB)</p>
                                            </div>
                                        </button>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 pt-6 border-t border-white/5 cursor-pointer mt-4" onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}>
                                    <div className={`flex h-6 w-11 items-center rounded-full p-1 transition-colors duration-300 ${formData.is_active ? 'bg-blue-500' : 'bg-white/10 shadow-inner'}`}>
                                        <div className={`h-4 w-4 rounded-full bg-white transition-transform duration-300 shadow-sm ${formData.is_active ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-white">Set as Active</span>
                                        <span className="text-[10px] text-neutral-500 uppercase tracking-widest">Visible on website</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || uploadingImage}
                                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-all disabled:opacity-50 shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]"
                                >
                                    {loading ? "Saving..." : <><Save size={18} /> Add Scholarship</>}
                                </button>
                            </div>

                        </div>

                    </div>
                </form>
            </div>
        </main>
    );
}