"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Search, Users, UserPlus, Clock, 
  UserCheck, Trophy, ShieldCheck 
} from "lucide-react";

interface NetworkUser {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  role: string;
  total_score: number;
  friendshipStatus: 'none' | 'pending_sent' | 'pending_received' | 'friends';
}

export default function TeacherNetworkPage() {
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
      if (!session?.user) return router.push("/en/login");
      
      const userId = session.user.id;
      setCurrentUserId(userId);

      // 1. دریافت تمام کاربران به جز کاربر فعلی (استاد)
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, avatar_url, role, total_score")
        .neq("id", userId)
        .order("total_score", { ascending: false });

      if (profilesError) throw profilesError;

      // 2. دریافت تمام روابط دوستی کاربر فعلی
      const { data: relationships, error: relError } = await supabase
        .from("student_friends")
        .select("*")
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);

      if (relError) throw relError;

      // 3. ادغام اطلاعات
      const networkData: NetworkUser[] = (profiles || []).map((p) => {
        let status: 'none' | 'pending_sent' | 'pending_received' | 'friends' = 'none';
        
        const rel = relationships?.find(r => r.sender_id === p.id || r.receiver_id === p.id);
        
        if (rel) {
          if (rel.status === 'accepted') {
            status = 'friends';
          } else if (rel.sender_id === userId) {
            status = 'pending_sent';
          } else if (rel.receiver_id === userId) {
            status = 'pending_received';
          }
        }

        return {
          id: p.id,
          first_name: p.first_name || "Unknown",
          last_name: p.last_name || "",
          avatar_url: p.avatar_url || "",
          role: p.role || "student",
          total_score: p.total_score || 0,
          friendshipStatus: status
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
    // اعمال فیلتر و جستجو
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

  const handleConnectionAction = async (targetId: string, currentStatus: string) => {
    if (!currentUserId) return;
    setActionLoadingId(targetId);

    try {
      if (currentStatus === 'none') {
        // ارسال درخواست دوستی/ارتباط
        await supabase.from("student_friends").insert({
          sender_id: currentUserId,
          receiver_id: targetId,
          status: 'pending'
        });
        updateUserStatusLocally(targetId, 'pending_sent');

      } else if (currentStatus === 'pending_sent' || currentStatus === 'friends') {
        // لغو درخواست یا حذف ارتباط
        await supabase.from("student_friends").delete()
          .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${targetId}),and(sender_id.eq.${targetId},receiver_id.eq.${currentUserId})`);
        updateUserStatusLocally(targetId, 'none');

      } else if (currentStatus === 'pending_received') {
        // قبول درخواست
        await supabase.from("student_friends").update({ status: 'accepted' })
          .eq('sender_id', targetId)
          .eq('receiver_id', currentUserId);
        updateUserStatusLocally(targetId, 'friends');
      }
    } catch (error) {
      console.error("Connection action failed:", error);
    } finally {
      setActionLoadingId(null);
    }
  };

  const updateUserStatusLocally = (targetId: string, newStatus: any) => {
    setUsers(prev => prev.map(u => u.id === targetId ? { ...u, friendshipStatus: newStatus } : u));
  };

  const getActionBtnProps = (status: string) => {
    switch (status) {
      case 'friends':
        return { text: "Connected", icon: <UserCheck size={16} />, style: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30" };
      case 'pending_sent':
        return { text: "Pending", icon: <Clock size={16} />, style: "bg-white/5 text-neutral-400 border border-white/10 hover:bg-white/10" };
      case 'pending_received':
        return { text: "Accept", icon: <UserPlus size={16} />, style: "bg-emerald-500 text-black border border-emerald-500 hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]" };
      case 'none':
      default:
        // تغییر به رنگ سازمانی اساتید
        return { text: "Connect", icon: <UserPlus size={16} />, style: "bg-fuchsia-600 text-white border border-fuchsia-600 hover:bg-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.4)]" };
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center bg-transparent">
        <div className="w-12 h-12 border-4 border-fuchsia-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 font-sans relative min-h-screen">
      
      {/* هاله‌های نوری پس‌زمینه مخصوص اساتید */}
      <div className="absolute top-0 left-[20%] w-[40vw] h-[40vw] bg-fuchsia-600/10 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] bg-purple-700/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 space-y-8">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#0a0a0f]/80 border border-white/10 p-6 md:p-8 rounded-[2rem] backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-[1.2rem] flex items-center justify-center text-white shadow-[0_10px_20px_rgba(217,70,239,0.3)] shrink-0">
              <Users size={28} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Academy Network</h1>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium mt-1.5">Connect with your students and collaborate with other faculty members.</p>
            </div>
          </div>
        </div>

        {/* ================= SEARCH & FILTERS ================= */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0a0a0f]/60 border border-white/10 rounded-[1.5rem] px-5 py-4 pl-14 text-white placeholder-neutral-500 font-medium focus:outline-none focus:border-fuchsia-500 transition-colors shadow-lg"
            />
            <Search className="absolute left-5 top-[18px] w-5 h-5 text-neutral-500" />
          </div>

          <div className="flex bg-[#0a0a0f]/60 border border-white/10 rounded-[1.5rem] p-1.5 shadow-lg shrink-0 overflow-x-auto custom-scrollbar">
            {["All", "Students", "Faculty"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as any)}
                className={`px-6 py-2.5 rounded-[1.2rem] text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeFilter === filter
                    ? "bg-fuchsia-600 text-white shadow-[0_0_15px_rgba(217,70,239,0.3)]"
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
            <p className="text-neutral-500 font-bold text-sm tracking-wide">No members found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24">
            {filteredUsers.map((u) => {
              const isFaculty = u.role === 'teacher' || u.role === 'admin' || u.role === 'super_admin';
              const btn = getActionBtnProps(u.friendshipStatus);

              return (
                <div key={u.id} className="bg-[#0a0a0f]/80 border border-white/5 rounded-[2rem] p-6 flex flex-col items-center text-center backdrop-blur-md shadow-[0_15px_30px_rgba(0,0,0,0.4)] hover:border-fuchsia-500/30 hover:-translate-y-1.5 transition-all duration-300 group">
                  
                  {/* Avatar */}
                  <Link href={`/en/teacher/feed/profile/${u.id}`} className="relative mb-4 mt-2">
                    <div className="w-20 h-20 rounded-[1.5rem] bg-neutral-800 border-2 border-white/10 overflow-hidden flex items-center justify-center group-hover:border-fuchsia-500/50 transition-colors relative z-10">
                      {u.avatar_url ? (
                        <img src={u.avatar_url} alt={u.first_name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl font-black text-neutral-500 group-hover:text-fuchsia-400 transition-colors">{u.first_name.charAt(0)}</span>
                      )}
                    </div>
                    {isFaculty && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-[3px] border-[#0a0a0f] z-20 shadow-lg">
                        <ShieldCheck size={14} className="text-white" />
                      </div>
                    )}
                  </Link>

                  {/* Info */}
                  <Link href={`/en/teacher/feed/profile/${u.id}`} className="block w-full">
                    <h3 className="text-lg font-black text-white truncate group-hover:text-fuchsia-300 transition-colors">
                      {u.first_name} {u.last_name}
                    </h3>
                    <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${isFaculty ? 'text-blue-400' : 'text-neutral-500'}`}>
                      {u.role.replace('_', ' ')}
                    </p>
                  </Link>

                  {/* Stats (Score) */}
                  <div className="mt-4 mb-6 flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5">
                    <Trophy size={12} className="text-yellow-500" />
                    <span className="text-xs font-bold text-neutral-300">{u.total_score} XP</span>
                  </div>

                  {/* Action Button */}
                  <button
                    disabled={actionLoadingId === u.id}
                    onClick={() => handleConnectionAction(u.id, u.friendshipStatus)}
                    className={`w-full py-3.5 flex items-center justify-center gap-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${btn.style} ${actionLoadingId === u.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title={u.friendshipStatus === 'friends' ? 'Click to Remove' : ''}
                  >
                    {actionLoadingId === u.id ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        {u.friendshipStatus === 'friends' ? <span className="group-hover:hidden flex items-center gap-2">{btn.icon} Connected</span> : ''}
                        {u.friendshipStatus === 'friends' ? <span className="hidden group-hover:flex items-center gap-2"><UserMinus size={16} /> Disconnect</span> : ''}
                        
                        {u.friendshipStatus !== 'friends' && (
                          <>
                            {btn.icon}
                            <span>{btn.text}</span>
                          </>
                        )}
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

// Icon component needed for hover state
function UserMinus(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  );
}