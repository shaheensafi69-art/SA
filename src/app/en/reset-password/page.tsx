"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { 
  KeyRound, CheckCircle2, AlertCircle, Loader2, Lock, Eye, EyeOff, ArrowRight
} from "lucide-react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);
    const supabase = createClient();

    try {
      // آپدیت کردن رمز عبور جدید کاربر
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      setIsSuccess(true);
    } catch (err: any) {
      console.error("Update password error:", err);
      setError(err.message || "Failed to update password. Your link might be expired.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030305] text-white font-sans relative flex items-center justify-center p-6 selection:bg-fuchsia-500 selection:text-white overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] bg-fuchsia-600/15 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '6s' }}></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0"></div>

      <div className="w-full max-w-md relative z-10 animate-[fadeInUp_0.5s_ease-out]">
        
        {/* Main Card */}
        <div className="bg-[#0a0a0f]/85 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 sm:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
          
          <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center border border-white/10 mb-8 shadow-inner">
            <KeyRound size={32} className="text-fuchsia-400" />
          </div>

          <h1 className="text-3xl font-black text-white mb-3 tracking-tight">
            Set New Password
          </h1>
          <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
            Please enter your new password below. Make sure it's at least 6 characters long.
          </p>

          {isSuccess ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center animate-[fadeIn_0.3s_ease-out]">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
                <CheckCircle2 size={32} className="text-emerald-400" />
              </div>
              <h3 className="text-white font-black text-xl mb-3">Password Updated!</h3>
              <p className="text-emerald-400/80 text-sm mb-8">
                Your password has been successfully changed. You can now securely log in to your account.
              </p>
              <Link 
                href="/en/login"
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:scale-[1.02] rounded-xl text-sm font-black text-black transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                Go to Login <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleUpdatePassword} className="space-y-5">
              
              {/* New Password Input */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">
                  New Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-neutral-500 group-focus-within:text-fuchsia-400 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#050508] border border-white/10 focus:border-fuchsia-500/50 rounded-2xl py-4 pl-12 pr-12 text-white placeholder-neutral-600 focus:outline-none focus:ring-4 focus:ring-fuchsia-500/10 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-neutral-500 group-focus-within:text-blue-400 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#050508] border border-white/10 focus:border-blue-500/50 rounded-2xl py-4 pl-12 pr-12 text-white placeholder-neutral-600 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-[fadeIn_0.2s_ease-out]">
                  <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-400 font-medium leading-relaxed">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !password || !confirmPassword}
                className="w-full relative group overflow-hidden rounded-2xl mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-blue-600 group-hover:scale-105 transition-transform duration-500"></div>
                <div className="relative px-6 py-4 flex items-center justify-center gap-2 text-white font-black text-sm uppercase tracking-widest">
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </div>
              </button>

            </form>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />
    </div>
  );
}