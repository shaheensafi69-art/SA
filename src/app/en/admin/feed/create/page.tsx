"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { 
  ArrowLeft, 
  ImagePlus, 
  X, 
  Send, 
  Tag, 
  Type, 
  AlignLeft,
  Loader2,
  CheckCircle2
} from "lucide-react";

export default function AdminCreatePostPage() {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState("Announcement");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // دسته‌بندی‌های مناسب برای ادمین
  const moods = [
    "Announcement", 
    "News", 
    "Update", 
    "Education", 
    "Alert", 
    "Event"
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.push("/en/login");
        return;
      }

      let uploadedImageUrl = null;

      // 1. آپلود تصویر در Supabase Storage (در صورت انتخاب فایل)
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${session.user.id}_${Date.now()}.${fileExt}`;
        const filePath = `post_images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('discussion_media') 
          .upload(filePath, imageFile);

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from('discussion_media')
            .getPublicUrl(filePath);
          uploadedImageUrl = publicUrlData.publicUrl;
        } else {
          console.error("Image upload failed:", uploadError);
        }
      }

      // 2. ساخت عنوان نهایی به همراه تگ
      const formattedTitle = `[${selectedMood}] ${title.trim()}`;

      // 3. ذخیره در دیتابیس
      const { error } = await supabase.from("discussion_posts").insert({
        student_id: session.user.id,
        title: formattedTitle,
        content: content.trim(),
        image_url: uploadedImageUrl,
      });

      if (error) throw error;

      // 4. بازگشت به فید ادمین
      router.push("/en/admin/feed");
      router.refresh();
      
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12 font-sans relative min-h-screen">
      
      {/* هدر صفحه و دکمه بازگشت */}
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/en/admin/feed"
          className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-white transition-all shadow-lg"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Create Publication</h1>
          <p className="text-xs text-neutral-400 font-medium mt-1">Broadcast professional insights to the academy network.</p>
        </div>
      </div>

      {/* فرم اصلی */}
      <form onSubmit={handleSubmit} className="bg-[#0a0a0f]/80 border border-white/10 rounded-[2.5rem] p-6 sm:p-10 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
        
        {/* افکت نوری پس‌زمینه فرم (مخصوص ادمین) */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="space-y-8 relative z-10">
          
          {/* بخش انتخاب دسته بندی (Tag) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-neutral-400">
              <Tag size={16} />
              <label className="text-xs font-bold uppercase tracking-widest">Category Tag</label>
            </div>
            <div className="flex flex-wrap gap-3">
              {moods.map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setSelectedMood(m)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 border ${
                    selectedMood === m
                      ? "bg-rose-500/10 text-rose-500 border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                      : "bg-[#030305]/50 text-neutral-500 border-white/5 hover:border-white/20 hover:text-neutral-300"
                  }`}
                >
                  {selectedMood === m && <CheckCircle2 size={14} className="text-rose-500" />}
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* بخش عنوان پست */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-neutral-400">
              <Type size={16} />
              <label className="text-xs font-bold uppercase tracking-widest">Publication Title</label>
            </div>
            <input
              type="text"
              placeholder="Enter a descriptive title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#030305]/60 border border-white/10 rounded-[1.5rem] px-6 py-5 text-white placeholder-neutral-600 font-bold focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-inner text-lg"
              required
            />
          </div>

          {/* بخش محتوا */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-neutral-400">
              <AlignLeft size={16} />
              <label className="text-xs font-bold uppercase tracking-widest">Content Body</label>
            </div>
            <textarea
              placeholder="Elaborate your announcement, news, or update here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full bg-[#030305]/60 border border-white/10 rounded-[1.5rem] px-6 py-5 text-white placeholder-neutral-600 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-inner resize-none text-sm leading-relaxed"
              required
            />
          </div>

          {/* بخش آپلود تصویر */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-neutral-400">
              <ImagePlus size={16} />
              <label className="text-xs font-bold uppercase tracking-widest">Media Attachment (Optional)</label>
            </div>
            
            {!imagePreview ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-white/10 hover:border-rose-500/50 rounded-[1.5rem] p-10 flex flex-col items-center justify-center gap-4 bg-[#030305]/40 hover:bg-rose-500/5 transition-all cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-rose-500/10 flex items-center justify-center transition-colors">
                  <ImagePlus size={28} className="text-neutral-500 group-hover:text-rose-500 transition-colors" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-white mb-1">Click to upload an image</p>
                  <p className="text-xs text-neutral-500">Supports JPG, PNG, WEBP (Max 5MB)</p>
                </div>
              </div>
            ) : (
              <div className="relative w-full rounded-[1.5rem] overflow-hidden border border-white/10 bg-[#030305]">
                <img src={imagePreview} alt="Preview" className="w-full max-h-[400px] object-contain" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/60 hover:bg-red-500/80 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors border border-white/10"
                >
                  <X size={18} />
                </button>
              </div>
            )}
            
            {/* اینپوت مخفی برای دریافت فایل */}
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>

          <hr className="border-white/5" />

          {/* دکمه ارسال */}
          <div className="flex items-center justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-[0_10px_25px_rgba(244,63,94,0.4)]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Publish Post
                </>
              )}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}