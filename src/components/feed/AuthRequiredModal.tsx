"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, LogIn, UserPlus, X, Heart, MessageSquare, Share2, Shield } from "lucide-react";

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionText?: string;
}

export default function AuthRequiredModal({
  isOpen,
  onClose,
  actionText = "interact with posts and reels",
}: AuthRequiredModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      {/* Background overlay click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-[2.5rem] p-7 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden z-10 animate-scaleUp">

        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-[#C2185B]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-yellow-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Header Icon */}
        <div className="relative z-10 flex items-center gap-3.5 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C2185B] to-yellow-500 p-0.5 shadow-[0_0_25px_rgba(194,24,91,0.4)]">
            <div className="w-full h-full bg-[#0a0a0f] rounded-[14px] flex items-center justify-center text-pink-400">
              <Sparkles size={26} className="text-yellow-400 animate-pulse" />
            </div>
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C2185B] block">
              Member Access Required
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
              Join the Conversation
            </h3>
          </div>
        </div>

        {/* Explanation Message */}
        <div className="relative z-10 space-y-3 mb-6">
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
            Browsing the feed and watching reels is free for everyone! To <span className="text-pink-400 font-bold">{actionText}</span>, please log in to your Safi Academy account or register in seconds.
          </p>
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4 text-neutral-400 text-xs">
            <div className="flex items-center gap-1 text-[#C2185B]">
              <Heart size={14} fill="currentColor" />
              <span className="text-[11px] font-bold">Likes</span>
            </div>
            <div className="flex items-center gap-1 text-sky-400">
              <MessageSquare size={14} />
              <span className="text-[11px] font-bold">Comments</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-400">
              <Share2 size={14} />
              <span className="text-[11px] font-bold">Direct Sharing</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="relative z-10 space-y-3">
          <Link
            href="/en/login"
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(234,179,8,0.3)] transition-all"
          >
            <LogIn size={16} /> Sign In to Account
          </Link>

          <Link
            href="/en/register"
            className="w-full py-3.5 px-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
          >
            <UserPlus size={16} className="text-yellow-400" /> Create Free Account
          </Link>
        </div>

        {/* Footer Dismiss Link */}
        <div className="relative z-10 text-center mt-5 pt-4 border-t border-white/5">
          <button
            onClick={onClose}
            className="text-[11px] font-bold text-neutral-400 hover:text-white transition-colors"
          >
            Continue browsing as guest →
          </button>
        </div>

      </div>
    </div>
  );
}
