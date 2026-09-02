"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { createClient } from "@/utils/supabase/client";
import { uploadFileToR2 } from "@/utils/upload";
import { X, Image, Video, Sparkles, Loader2, Send } from "lucide-react";

interface CreateStoryModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  onStoryCreated: () => void;
}

export default function CreateStoryModal({
  userId,
  isOpen,
  onClose,
  onStoryCreated,
}: CreateStoryModalProps) {
  const [mounted, setMounted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [caption, setCaption] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const isVideo = selectedFile.type.startsWith("video/");
    setMediaType(isVideo ? "video" : "image");
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !userId) return;

    setIsUploading(true);
    setError(null);

    try {
      // 1. Upload to Cloudflare R2 bucket (story/ folder)
      const mediaUrl = await uploadFileToR2(file, "story");

      // 2. Insert record into Supabase user_stories table
      const supabase = createClient();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours

      const { error: dbError } = await supabase.from("user_stories").insert({
        user_id: userId,
        media_url: mediaUrl,
        media_type: mediaType,
        caption: caption.trim() || null,
        duration_seconds: mediaType === "video" ? 15 : 5,
        expires_at: expiresAt,
      });

      if (dbError) throw dbError;

      onStoryCreated();
      onClose();
      setFile(null);
      setPreviewUrl(null);
      setCaption("");
    } catch (err: any) {
      console.error("Failed to create story:", err);
      setError(err?.message || "Failed to create story. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 sticky top-0 bg-neutral-900/90 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-yellow-400" />
            <h3 className="font-bold text-white text-lg">Add to Your Story</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-400 bg-red-950/50 border border-red-800 rounded-xl">
              {error}
            </div>
          )}

          {/* Media Preview or Dropzone */}
          <div
            onClick={() => {
              if (!previewUrl) fileInputRef.current?.click();
            }}
            className="relative aspect-[9/16] max-h-[340px] w-full rounded-2xl overflow-hidden bg-neutral-950 border-2 border-dashed border-neutral-800 flex flex-col items-center justify-center group cursor-pointer hover:border-yellow-500/50 transition-colors"
          >
            {previewUrl ? (
              <>
                {mediaType === "video" ? (
                  <video
                    src={previewUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={previewUrl}
                    alt="Story preview"
                    className="w-full h-full object-cover"
                  />
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setPreviewUrl(null);
                  }}
                  className="absolute top-3 right-3 p-2 bg-black/70 hover:bg-black text-white rounded-full transition-colors z-20"
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 text-center p-6">
                <div className="w-16 h-16 rounded-full bg-yellow-500/10 text-yellow-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Image size={28} />
                </div>
                <div>
                  <p className="font-semibold text-white">Select Photo or Video</p>
                  <p className="text-xs text-neutral-400 mt-1">
                    Upload image or short video (Max 24h visibility)
                  </p>
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Caption Input */}
          <div>
            <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Caption (Optional)
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-500/50 transition-colors text-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-semibold text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!file || isUploading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-black transition-colors shadow-lg shadow-yellow-500/20 text-sm"
            >
              {isUploading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Uploading to R2...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Share Story
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
