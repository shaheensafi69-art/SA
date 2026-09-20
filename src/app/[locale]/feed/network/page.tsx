"use client";
import { getPortalTranslation, isRtlPortal } from "@/utils/portalTranslations";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {  useRouter , usePathname } from "next/navigation";
import Link from "next/link";
import {
  Search, Users, UserPlus, Clock,
  UserCheck, Trophy, ChevronRight, ShieldCheck, UserMinus
} from "lucide-react";

interface NetworkUser {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  role: string;
  total_score: number;
  isFollowing: boolean;
  isFollowedBy: boolean;
}

export default function NetworkPage() {
  const pathname = usePathname() || "/en";
  const currentLocale = pathname.split("/")[1] || "en";
  const t = getPortalTranslation(currentLocale);
  const isRtl = isRtlPortal(currentLocale);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<NetworkUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<NetworkUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"All" | "Students" | "Faculty">("All");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    fetchNetworkData();
  }, []);

  const fetchNetworkData = async () => {
    setIsLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return router.push(`/${currentLocale}/login`);

      const userId = session.user.id;
      setCurrentUserId(userId);

      // 1. Fetch all users except current user
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, avatar_url, role, total_score")
        .neq("id", userId)
        .order("total_score", { ascending: false });

      if (profilesError) throw profilesError;

      // 2. Fetch all follow relationships involving the current user
      const { data: follows, error: followError } = await supabase
        .from("user_follows")
        .select("follower_id, following_id")
        .or(`follower_id.eq.${userId},following_id.eq.${userId}`);

      if (followError) throw followError;

      // 3. Merge follow status
      const networkData: NetworkUser[] = (profiles || []).map((p) => {
        const isFollowing = follows?.some(f => f.follower_id === userId && f.following_id === p.id) || false;
        const isFollowedBy = follows?.some(f => f.follower_id === p.id && f.following_id === userId) || false;

        return {
          id: p.id,
          first_name: p.first_name || "Unknown",
          last_name: p.last_name || "",
          avatar_url: p.avatar_url || "",
          role: p.role || "student",
          total_score: p.total_score || 0,
          isFollowing,
          isFollowedBy
        };
      });

      setUsers(networkData);
      setFilteredUsers(networkData);

    } catch (e) {
      console.error("Error fetching network:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let result = users;

    if (activeFilter === "Students") {
      result = result.filter(u => u.role === "student");
    } else if (activeFilter === "Faculty") {
      result = result.filter(u => u.role === "teacher" || u.role === "admin" || u.role === "super_admin");
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(u =>
        u.first_name.toLowerCase().includes(q) ||
        u.last_name.toLowerCase().includes(q)
      );
    }

    setFilteredUsers(result);
  }, [searchQuery, activeFilter, users]);

  const handleFollowAction = async (targetId: string, currentlyFollowing: boolean) => {
    if (!currentUserId) return;
    setActionLoadingId(targetId);

    try {
      if (currentlyFollowing) {
        // Unfollow
        await supabase
          .from("user_follows")
          .delete()
          .eq("follower_id", currentUserId)
          .eq("following_id", targetId);

        setUsers(prev => prev.map(u => u.id === targetId ? { ...u, isFollowing: false } : u));
      } else {
        // Follow
        await supabase
          .from("user_follows")
          .insert({
            follower_id: currentUserId,
            following_id: targetId
          });

        setUsers(prev => prev.map(u => u.id === targetId ? { ...u, isFollowing: true } : u));
      }
    } catch (error) {
      console.error("Follow action failed:", error);
    } finally {
      setActionLoadingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center bg-transparent">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 font-sans relative min-h-screen">

      {/* هاله‌های نوری پس‌زمینه مخصوص شبکه */}
      <div className="absolute top-0 left-[20%] w-[40vw] h-[40vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '7s' }}></div>

      <div className="relative z-10 space-y-8">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#0a0a0f]/80 border border-white/10 p-6 md:p-8 rounded-[2rem] backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-[1.2rem] flex items-center justify-center text-white shadow-[0_10px_20px_rgba(79,70,229,0.3)] shrink-0">
              <Users size={28} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{t.feed.academyNetwork}</h1>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium mt-1.5">{t.feed.academyNetworkDesc}</p>
            </div>
          </div>
        </div>

        {/* ================= SEARCH & FILTERS ================= */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={t.feed.searchByName}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0a0f]/60 border border-white/10 rounded-[1.5rem] px-5 py-4 pl-14 text-white placeholder-neutral-500 font-medium focus:outline-none focus:border-indigo-500 transition-colors shadow-lg"
            />
            <Search className="absolute left-5 top-[18px] w-5 h-5 text-neutral-500" />
          </div>

          <div className="flex bg-[#0a0a0f]/60 border border-white/10 rounded-[1.5rem] p-1.5 shadow-lg shrink-0 overflow-x-auto custom-scrollbar">
            {["All", "Students", "Faculty"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as any)}
                className={`px-6 py-2.5 rounded-[1.2rem] text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeFilter === filter
                  ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* ================= NETWORK GRID ================= */}
        {filteredUsers.length === 0 ? (
          <div className="text-center py-24 bg-[#0a0a0f]/40 rounded-[2.5rem] border border-white/5 shadow-inner">
            <Users className="w-14 h-14 text-neutral-600 mx-auto mb-4 opacity-50" />
            <p className="text-neutral-500 font-bold text-sm tracking-wide">{t.feed.noMembersFound}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24">
            {filteredUsers.map((u) => {
              const isFaculty = u.role === 'teacher' || u.role === 'admin' || u.role === 'super_admin';

              return (
                <div key={u.id} className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2rem] p-6 flex flex-col items-center text-center backdrop-blur-md shadow-[0_15px_30px_rgba(0,0,0,0.4)] hover:border-indigo-500/30 hover:-translate-y-1.5 transition-all duration-300 group">

                  {/* Avatar */}
                  <Link href={`/${currentLocale}/feed/profile/${u.id}`} className="relative mb-4 mt-2">
                    <div className="w-20 h-20 rounded-[1.5rem] bg-neutral-800 border-2 border-white/10 overflow-hidden flex items-center justify-center group-hover:border-indigo-500/50 transition-colors relative z-10">
                      {u.avatar_url ? (
                        <img src={u.avatar_url} alt={u.first_name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl font-black text-neutral-500 group-hover:text-indigo-400 transition-colors">{u.first_name.charAt(0)}</span>
                      )}
                    </div>
                    {isFaculty && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-[3px] border-[#0a0a0f] z-20 shadow-lg">
                        <ShieldCheck size={14} className="text-white" />
                      </div>
                    )}
                  </Link>

                  {/* Info */}
                  <Link href={`/${currentLocale}/feed/profile/${u.id}`} className="block w-full">
                    <h3 className="text-lg font-black text-white truncate group-hover:text-indigo-300 transition-colors">
                      {u.first_name} {u.last_name}
                    </h3>
                    <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${isFaculty ? 'text-blue-400' : 'text-neutral-500'}`}>
                      {u.role}
                    </p>
                  </Link>

                  {/* Stats (Score & Follows-you badge) */}
                  <div className="mt-4 mb-6 flex flex-wrap items-center justify-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5">
                      <Trophy size={12} className="text-yellow-500" />
                      <span className="text-xs font-bold text-neutral-300">{u.total_score} XP</span>
                    </div>
                    {u.isFollowedBy && (
                      <span className="text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-xl bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                        {t.feed?.followers || "Follows You"}
                      </span>
                    )}
                  </div>

                  {/* Action Button: Follow / Following / Follow Back */}
                  <button
                    disabled={actionLoadingId === u.id}
                    onClick={() => handleFollowAction(u.id, u.isFollowing)}
                    className={`w-full py-3.5 flex items-center justify-center gap-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                      u.isFollowing
                        ? "bg-white/10 text-white border border-white/20 hover:bg-rose-600/20 hover:text-rose-400 hover:border-rose-500/40"
                        : u.isFollowedBy
                          ? "bg-gradient-to-r from-indigo-600 to-[#C2185B] text-white shadow-[0_0_20px_rgba(194,24,91,0.4)] hover:brightness-110"
                          : "bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:bg-indigo-500"
                    } ${actionLoadingId === u.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {actionLoadingId === u.id ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    ) : u.isFollowing ? (
                      <>
                        <span className="group-hover:hidden flex items-center gap-2">
                          <UserCheck size={16} />
                          {t.feed?.following || "Following"}
                        </span>
                        <span className="hidden group-hover:flex items-center gap-2 text-rose-400">
                          <UserMinus size={16} />
                          {t.feed?.unfollow || "Unfollow"}
                        </span>
                      </>
                    ) : u.isFollowedBy ? (
                      <>
                        <UserPlus size={16} />
                        <span>{t.feed?.followBack || "Follow Back"}</span>
                      </>
                    ) : (
                      <>
                        <UserPlus size={16} />
                        <span>{t.feed?.follow || "Follow"}</span>
                      </>
                    )}
                  </button>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}