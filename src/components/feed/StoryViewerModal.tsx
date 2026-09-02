"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { createClient } from "@/utils/supabase/client";
import { X, Heart, ChevronLeft, ChevronRight, Eye } from "lucide-react";

export interface StoryRecord {
  id: string;
  user_id: string;
  media_url: string;
  media_type: "image" | "video";
  caption: string | null;
  duration_seconds: number;
  created_at: string;
  expires_at: string;
  user_profile?: {
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
}

interface StoryViewerModalProps {
  stories: StoryRecord[];
  initialIndex?: number;
  currentUserId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function StoryViewerModal({
  stories,
  initialIndex = 0,
  currentUserId,
  isOpen,
  onClose,
}: StoryViewerModalProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentStory = stories[currentIndex];
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  // Record view & load likes/views when story changes
  useEffect(() => {
    if (!currentStory || !isOpen) return;

    setProgress(0);

    const recordViewAndFetchStats = async () => {
      try {
        // Record view if not logged yet
        if (currentUserId) {
          const { data: existingView } = await supabase
            .from("story_views")
            .select("id")
            .eq("story_id", currentStory.id)
            .eq("viewer_id", currentUserId)
            .maybeSingle();

          if (!existingView) {
            await supabase.from("story_views").insert({
              story_id: currentStory.id,
              viewer_id: currentUserId,
            });
          }
        }

        // Fetch likes count
        const { count: likesC } = await supabase
          .from("story_likes")
          .select("*", { count: "exact", head: true })
          .eq("story_id", currentStory.id);
        
        setLikeCount(likesC || 0);

        // Fetch views count
        const { count: viewsC } = await supabase
          .from("story_views")
          .select("*", { count: "exact", head: true })
          .eq("story_id", currentStory.id);

        setViewCount(viewsC || 0);

        // Check if liked by me
        if (currentUserId) {
          const { data: myLike } = await supabase
            .from("story_likes")
            .select("id")
            .eq("story_id", currentStory.id)
            .eq("user_id", currentUserId)
            .single();

          setIsLiked(!!myLike);
        }
      } catch (err) {
        console.error("Error loading story stats:", err);
      }
    };

    recordViewAndFetchStats();
  }, [currentIndex, currentStory?.id, isOpen, currentUserId]);

  // Progress Bar timer
  useEffect(() => {
    if (!isOpen || isPaused || !currentStory) return;

    const durationMs = (currentStory.duration_seconds || 5) * 1000;
    const intervalMs = 50;
    const step = (intervalMs / durationMs) * 100;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPaused, currentIndex, stories.length]);

  if (!isOpen || !mounted || !currentStory) return null;

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
    }
  };

  const toggleLike = async () => {
    if (!currentUserId || !currentStory) return;

    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => Math.max(0, prev - 1));
      await supabase
        .from("story_likes")
        .delete()
        .eq("story_id", currentStory.id)
        .eq("user_id", currentUserId);
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      await supabase.from("story_likes").insert({
        story_id: currentStory.id,
        user_id: currentUserId,
      });
    }
  };

  const profile = currentStory.user_profile;
  const userName = profile
    ? `${profile.first_name || ""} ${profile.last_name || ""}`.trim()
    : "Safi Student";
  const avatarUrl = profile?.avatar_url || "/placeholder-avatar.png";

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-0 sm:p-4">
      {/* Main Container */}
      <div
        className="relative w-full max-w-md h-full sm:h-[90vh] sm:max-h-[850px] bg-neutral-900 sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Top Progress Bars */}
        <div className="absolute top-0 inset-x-0 z-30 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent space-y-3">
          <div className="flex gap-1.5 w-full">
            {stories.map((s, idx) => (
              <div
                key={s.id}
                className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-75 ease-linear"
                  style={{
                    width:
                      idx < currentIndex
                        ? "100%"
                        : idx === currentIndex
                        ? `${progress}%`
                        : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* User Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={avatarUrl}
                alt={userName}
                className="w-10 h-10 rounded-full object-cover border-2 border-yellow-500"
              />
              <div>
                <p className="font-bold text-white text-sm">{userName}</p>
                <p className="text-xs text-neutral-400">
                  {new Date(currentStory.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white rounded-full bg-black/40 hover:bg-black/70 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Media Container */}
        <div className="relative w-full h-full flex items-center justify-center bg-black">
          {currentStory.media_type === "video" ? (
            <video
              src={currentStory.media_url}
              autoPlay
              playsInline
              muted={false}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={currentStory.media_url}
              alt="Story"
              className="w-full h-full object-cover"
            />
          )}

          {/* Caption Overlay */}
          {currentStory.caption && (
            <div className="absolute bottom-20 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-center z-20">
              <p className="text-white font-medium text-base drop-shadow-md">
                {currentStory.caption}
              </p>
            </div>
          )}
        </div>

        {/* Navigation Touch Controls */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white/80 hover:text-white disabled:opacity-0 transition-opacity z-30"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white/80 hover:text-white transition-opacity z-30"
        >
          <ChevronRight size={28} />
        </button>

        {/* Bottom Actions Bar */}
        <div className="absolute bottom-0 inset-x-0 z-30 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
          <div className="flex items-center gap-2 text-neutral-300 text-xs font-semibold px-3 py-1.5 bg-black/50 rounded-full border border-neutral-700/50">
            <Eye size={14} className="text-yellow-400" />
            <span>{viewCount} views</span>
          </div>

          <button
            onClick={toggleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all ${
              isLiked
                ? "bg-red-500 text-white shadow-lg shadow-red-500/30 scale-105"
                : "bg-neutral-800/80 text-white hover:bg-neutral-700 border border-neutral-700"
            }`}
          >
            <Heart size={18} className={isLiked ? "fill-white" : ""} />
            <span>{likeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
