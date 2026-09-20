"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Lock, KeyRound, Eye, EyeOff, CheckCircle2, AlertCircle, Shield } from "lucide-react";

interface PasswordSecurityTabProps {
  userEmail: string;
  t: any;
  isRtl: boolean;
}

export default function PasswordSecurityTab({ userEmail, t, isRtl }: PasswordSecurityTabProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!currentPassword) {
      setFeedback({ type: "error", message: t.settings?.enterCurrentPassword || "Please enter your current password." });
      return;
    }

    if (newPassword.length < 6) {
      setFeedback({ type: "error", message: "Password must be at least 6 characters long." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setFeedback({ type: "error", message: "New passwords do not match." });
      return;
    }

    setIsSaving(true);
    const supabase = createClient();

    try {
      // 1. Verify current password by signing in
      const { error: verifyErr } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: currentPassword,
      });

      if (verifyErr) {
        setFeedback({
          type: "error",
          message: t.settings?.incorrectCurrentPassword || "The current password you entered is incorrect.",
        });
        setIsSaving(false);
        return;
      }

      // 2. Update to new password
      const { error: updateErr } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateErr) throw updateErr;

      setFeedback({
        type: "success",
        message: t.settings?.passwordUpdatedSuccess || "Your password has been successfully updated!",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error("Password update error:", err);
      setFeedback({
        type: "error",
        message: err.message || "Failed to update password. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      {/* Header */}
      <div className="border-b border-white/5 pb-5">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
          <KeyRound className="w-6 h-6 text-amber-400" />
          {t.settings?.password || "Password & Security"}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-medium mt-1">
          {t.settings?.vaultSecurityDesc || "Update your password to keep your account safe and secure."}
        </p>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 border text-xs sm:text-sm font-bold ${
            feedback.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-rose-500/10 border-rose-500/30 text-rose-400"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      <form onSubmit={handleUpdatePassword} className="space-y-5 max-w-xl">
        {/* Field 1: Current Password */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            {t.settings?.currentPassword || "Current Password"}
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-black/40 border border-white/10 focus:border-amber-500 rounded-2xl px-4 py-3.5 pr-11 text-white text-sm placeholder-neutral-600 focus:outline-none transition-all shadow-inner font-mono"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors p-1"
            >
              {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="text-[11px] text-neutral-500">
            {t.settings?.enterCurrentPassword || "Verify your identity by typing your current password."}
          </p>
        </div>

        {/* Field 2: New Password */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            {t.settings?.newPassword || "New Password"}
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-black/40 border border-white/10 focus:border-amber-500 rounded-2xl px-4 py-3.5 pr-11 text-white text-sm placeholder-neutral-600 focus:outline-none transition-all shadow-inner font-mono"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors p-1"
            >
              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Field 3: Confirm New Password */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            {t.settings?.confirmPassword || "Confirm New Password"}
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-black/40 border border-white/10 focus:border-amber-500 rounded-2xl px-4 py-3.5 pr-11 text-white text-sm placeholder-neutral-600 focus:outline-none transition-all shadow-inner font-mono"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors p-1"
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isSaving || !currentPassword || !newPassword || !confirmPassword}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-black uppercase tracking-wider text-xs rounded-2xl hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            {isSaving ? (t.settings?.saving || "Updating...") : (t.settings?.changePassword || "Update Password")}
          </button>
        </div>
      </form>
    </div>
  );
}
