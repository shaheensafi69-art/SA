"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";
import {
  Bell,
  CheckCircle2,
  Clock,
  Video,
  FileText,
  Target,
  Wallet,
  Sparkles,
  ExternalLink,
  Trash2,
  Filter,
  Check,
  Megaphone,
  Heart,
  MessageSquare
} from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  notification_type: string | null;
  link_url: string | null;
  is_read: boolean;
  created_at: string;
}

export default function StudentNotificationsPage() {
  const router = useRouter();
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);

  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filterType, setFilterType] = useState<"all" | "unread" | "academic" | "social">("all");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadNotifications() {
      try {
        const supabase = createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          router.replace(`/${currentLocale}/login`);
          return;
        }

        const { data, error } = await supabase
          .from("user_notifications")
          .select("id, title, message, notification_type, link_url, is_read, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(50);

        if (!isMounted) return;

        if (data) {
          setNotifications(data);
        }
      } catch (err) {
        console.error("Error loading notifications:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadNotifications();

    return () => {
      isMounted = false;
    };
  }, [router, currentLocale]);

  // Mark all as read
  const handleMarkAllAsRead = async () => {
    try {
      setIsUpdating(true);
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from("user_notifications")
        .update({ is_read: true })
        .eq("user_id", user.id)
        .eq("is_read", false);

      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    } catch (err) {
      console.error("Error marking notifications as read:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Mark single as read
  const handleMarkAsRead = async (id: string) => {
    try {
      const supabase = createClient();
      await supabase
        .from("user_notifications")
        .update({ is_read: true })
        .eq("id", id);

      setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (err) {
      console.error("Error marking notification:", err);
    }
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter(item => {
      if (filterType === "unread") return !item.is_read;
      if (filterType === "academic") {
        return ["assignment", "quiz", "grade", "live_class", "course"].includes(item.notification_type || "");
      }
      if (filterType === "social") {
        return ["like", "comment", "like_comment", "follow"].includes(item.notification_type || "");
      }
      return true;
    });
  }, [notifications, filterType]);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const getNotificationIcon = (type: string | null) => {
    switch (type) {
      case "live_class": return <Video size={18} className="text-red-400" />;
      case "assignment": return <FileText size={18} className="text-blue-400" />;
      case "quiz": return <Target size={18} className="text-purple-400" />;
      case "wallet":
      case "payment": return <Wallet size={18} className="text-emerald-400" />;
      case "like":
      case "like_comment": return <Heart size={18} className="text-rose-400" />;
      case "comment": return <MessageSquare size={18} className="text-sky-400" />;
      default: return <Bell size={18} className="text-yellow-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#030305] text-white p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-pulse" dir={isRtl ? "rtl" : "ltr"}>
        <div className="h-44 bg-neutral-900/60 rounded-[2.5rem] border border-white/5"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-20 bg-neutral-900/50 rounded-2xl border border-white/5"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#030305] text-white font-sans selection:bg-[#C2185B] selection:text-white pb-32" dir={isRtl ? "rtl" : "ltr"}>

      {/* Background Ambience */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/10 via-[#C2185B]/10 to-transparent rounded-full blur-[160px] pointer-events-none -z-10"></div>

      <div className="px-4 sm:px-6 md:px-10 pt-6 md:pt-10 max-w-7xl mx-auto space-y-8 relative z-10">

        {/* 1. HERO BANNER */}
        <section className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-[#0c0d1c]/95 via-[#080812]/90 to-[#030306] border border-white/10 p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Bell size={12} className="text-indigo-400" />
                {isRtl ? "مرکز هوشمند اعلانات و پیام‌ها" : "Scholar Notification Hub"}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                {isRtl ? "اعلانات و رویدادهای زنده" : "Notifications & Live Activity"}
              </h1>

              <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
                {isRtl
                  ? "اطلاع لحظه‌ای از شروع جلسات زنده، انتشار تکالیف جدید، نتایج ارزیابی آزمون‌ها، پیام‌های گروهی و تراکنش‌های کیف پول."
                  : "Stay updated in real time with live campus classes, assignment evaluations, quiz results, community likes, and wallet alerts."
                }
              </p>
            </div>

            {/* Mark All As Read Button */}
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                disabled={isUpdating}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(79,70,229,0.3)] cursor-pointer"
              >
                <CheckCircle2 size={16} />
                {isRtl ? "خوانده‌شدن همه پیام‌ها" : "Mark All as Read"}
              </button>
            )}
          </div>

          {/* Filter Bar */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-white/[0.03] p-1 rounded-xl border border-white/5 text-xs">
              <button
                onClick={() => setFilterType("all")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${filterType === "all" ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"}`}
              >
                {isRtl ? "همه پیام‌ها" : "All"} ({notifications.length})
              </button>
              <button
                onClick={() => setFilterType("unread")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${filterType === "unread" ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" : "text-neutral-400 hover:text-white"}`}
              >
                {isRtl ? "خوانده نشده" : "Unread"} ({unreadCount})
              </button>
              <button
                onClick={() => setFilterType("academic")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${filterType === "academic" ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"}`}
              >
                {isRtl ? "آموزشی و درسی" : "Academic"}
              </button>
              <button
                onClick={() => setFilterType("social")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${filterType === "social" ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"}`}
              >
                {isRtl ? "شبکه و سوشیال" : "Social Feed"}
              </button>
            </div>
          </div>
        </section>

        {/* 2. NOTIFICATIONS STREAM */}
        {filteredNotifications.length > 0 ? (
          <section className="space-y-3">
            {filteredNotifications.map((item) => (
              <div
                key={item.id}
                onClick={() => !item.is_read && handleMarkAsRead(item.id)}
                className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 cursor-pointer ${
                  item.is_read
                    ? "bg-white/[0.02] border-white/5 hover:bg-white/[0.04]"
                    : "bg-indigo-950/20 border-indigo-500/30 shadow-[0_0_20px_rgba(79,70,229,0.15)]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                    item.is_read ? 'bg-white/5 border-white/10' : 'bg-indigo-500/20 border-indigo-500/30'
                  }`}>
                    {getNotificationIcon(item.notification_type)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-sm font-bold ${item.is_read ? 'text-neutral-300' : 'text-white'}`}>
                        {item.title}
                      </h4>
                      {!item.is_read && (
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                      )}
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {item.message}
                    </p>

                    <span className="text-[9px] text-neutral-500 font-mono block pt-1">
                      {new Date(item.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>

                {item.link_url && (
                  <Link
                    href={item.link_url}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5 shrink-0 transition-colors"
                  >
                    <ExternalLink size={16} />
                  </Link>
                )}
              </div>
            ))}
          </section>
        ) : (
          <section className="rounded-3xl bg-white/[0.02] border border-white/5 p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/20">
              <Bell size={32} />
            </div>
            <h3 className="text-lg font-black text-white">
              {isRtl ? "هیچ اعلانی در این دسته وجود ندارد" : "No Notifications in this Category"}
            </h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              {isRtl ? "کلیه پیام‌های جدید به محض وقوع در این بخش نمایش داده می‌شوند." : "All incoming notifications and alerts will appear here."}
            </p>
          </section>
        )}

      </div>
    </div>
  );
}
