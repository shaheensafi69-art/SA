"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Video, Sparkles, Upload, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CreateReelPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Technology");
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) {
                router.push("/en/login");
            } else {
                setCurrentUserId(session.user.id);
            }
        };
        checkUser();
    }, [router]);

    const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 50 * 1024 * 1024) {
                alert("Video size must be less than 50MB");
                return;
            }
            setVideoFile(file);
            setVideoPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !videoFile || !currentUserId) {
            alert("Please provide a title and select a video file.");
            return;
        }

        setIsSubmitting(true);
        try {
            // ۱. آپلود ویدیو در باکت reels (مستقیماً در ریشه باکت)
            const fileExt = videoFile.name.split('.').pop();
            // نام فایل به صورت: userId_timestamp.ext
            const fileName = `${currentUserId}_${Date.now()}.${fileExt}`;

            // --- اصلاح شده: حذف پوشه 'uploads/' برای جلوگیری از ساخت پوشه ---
            const filePath = fileName;
            // -----------------------------------------------------------

            const { error: uploadError } = await supabase.storage
                .from("reels")
                .upload(filePath, videoFile);

            if (uploadError) throw uploadError;

            // ۲. دریافت Public URL ویدیو
            const { data: publicUrlData } = supabase.storage
                .from("reels")
                .getPublicUrl(filePath);

            const videoUrl = publicUrlData.publicUrl;

            // ۳. ثبت اطلاعات در جدول reels
            const { error: insertError } = await supabase.from("reels").insert({
                user_id: currentUserId,
                title: title.trim(),
                description: description.trim() || null,
                category,
                video_url: videoUrl,
                is_published: true,
            });

            if (insertError) throw insertError;

            router.push("/en/feed/reels");
        } catch (err: any) {
            console.error("Error creating reel:", err);
            alert(err.message || "Failed to publish reel.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 font-sans">

            {/* هیدر و دکمه بازگشت */}
            <div className="flex items-center justify-between mb-8 bg-[#0a0a0f]/80 border border-white/5 p-5 rounded-[2rem] backdrop-blur-xl shadow-2xl">
                <div className="flex items-center gap-3">
                    <Link href="/en/feed/reels" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                            <Video className="text-[#C2185B]" size={24} /> Create New Reel
                        </h1>
                        <p className="text-xs text-neutral-400 font-medium mt-0.5">Share short vertical videos with the academy</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* فرم اطلاعات */}
                <form onSubmit={handleSubmit} className="lg:col-span-7 bg-[#0a0a0f]/90 border border-white/5 p-6 sm:p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl space-y-6">

                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2">Reel Title *</label>
                        <input
                            type="text"
                            placeholder="What is this reel about?"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full bg-neutral-900 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#C2185B] transition-colors font-medium"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-neutral-900 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#C2185B] transition-colors font-medium"
                        >
                            <option value="Technology">Technology & Coding</option>
                            <option value="Trading">Financial Markets & Trading</option>
                            <option value="Campus">Live Campus & Study</option>
                            <option value="General">General & Lifestyle</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2">Description</label>
                        <textarea
                            placeholder="Add some details or hashtags..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            className="w-full bg-neutral-900 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#C2185B] transition-colors font-medium resize-none"
                        />
                    </div>

                    {/* دکمه انتشار */}
                    <button
                        type="submit"
                        disabled={isSubmitting || !videoFile || !title.trim()}
                        className="w-full py-4 bg-gradient-to-r from-[#C2185B] to-yellow-500 text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-[0_0_25px_rgba(194,24,91,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={18} className="animate-spin" /> Publishing Reel...
                            </>
                        ) : (
                            <>
                                <Sparkles size={18} /> Publish Reel Now
                            </>
                        )}
                    </button>

                </form>

                {/* بخش آپلود و پیش‌نمایش ویدیو */}
                <div className="lg:col-span-5 bg-[#0a0a0f]/90 border border-white/5 p-6 sm:p-8 rounded-[2.5rem] backdrop-blur-xl shadow-2xl flex flex-col items-center">

                    <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-4 w-full text-left">Video Preview</h3>

                    {videoPreviewUrl ? (
                        <div className="w-full max-w-[260px] h-[450px] bg-black rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl flex items-center justify-center">
                            <video
                                src={videoPreviewUrl}
                                controls
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => { setVideoFile(null); setVideoPreviewUrl(null); }}
                                className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white p-2 rounded-full border border-white/10 hover:bg-red-500 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                    ) : (
                        <label className="w-full max-w-[260px] h-[450px] bg-neutral-900/80 border-2 border-dashed border-white/15 rounded-3xl flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:border-[#C2185B] hover:bg-neutral-900 transition-all group">
                            <div className="w-16 h-16 rounded-2xl bg-[#C2185B]/10 border border-[#C2185B]/30 flex items-center justify-center text-[#C2185B] mb-4 group-hover:scale-110 transition-transform">
                                <Upload size={28} />
                            </div>
                            <span className="text-xs font-black text-white uppercase tracking-wider">Select Vertical Video</span>
                            <span className="text-[10px] text-neutral-500 font-bold mt-1">MP4, MOV (Max 50MB)</span>
                            <input
                                type="file"
                                accept="video/mp4,video/quicktime,video/webm"
                                onChange={handleVideoSelect}
                                className="hidden"
                            />
                        </label>
                    )}

                    <p className="text-[10px] text-neutral-500 font-bold text-center mt-6 leading-relaxed">
                        Ensure your video is in vertical format (9:16) for the best experience across all mobile devices.
                    </p>

                </div>

            </div>

        </div>
    );
}