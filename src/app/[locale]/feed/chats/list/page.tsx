"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MessageSquare, Search, Users, ChevronRight, Sparkles, CheckCheck } from "lucide-react";

interface ChatPartner {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url: string;
    role: string;
    lastMessage?: string;
    lastMessageTime?: string;
    unreadCount?: number;
}

export default function ChatsListPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [chats, setChats] = useState<ChatPartner[]>([]);
    const [friends, setFriends] = useState<ChatPartner[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        fetchChatsAndFriends();
    }, []);

    const fetchChatsAndFriends = async () => {
        setIsLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) return router.push("/en/login");
            const userId = session.user.id;
            setCurrentUserId(userId);

            // ۱. دریافت تمام پیام‌های دایرکت مربوط به کاربر
            const { data: messages, error: msgError } = await supabase
                .from("direct_messages")
                .select("*")
                .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
                .order("created_at", { ascending: false });

            if (msgError) throw msgError;

            const partnerIdsSet = new Set<string>();
            const latestMsgMap: { [key: string]: { text: string; time: string; unread: number } } = {};

            messages?.forEach((msg) => {
                const partnerId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
                partnerIdsSet.add(partnerId);

                if (!latestMsgMap[partnerId]) {
                    latestMsgMap[partnerId] = {
                        text: msg.message_text,
                        time: msg.created_at,
                        unread: (!msg.is_read && msg.receiver_id === userId) ? 1 : 0
                    };
                } else if (!msg.is_read && msg.receiver_id === userId) {
                    latestMsgMap[partnerId].unread += 1;
                }
            });

            const partnerIds = Array.from(partnerIdsSet);

            // ۲. دریافت پروفایل هم‌صحبت‌های اخیر
            let activeChats: ChatPartner[] = [];
            if (partnerIds.length > 0) {
                const { data: partnerProfiles } = await supabase
                    .from("profiles")
                    .select("id, first_name, last_name, avatar_url, role")
                    .in("id", partnerIds);

                activeChats = (partnerProfiles || []).map((p) => ({
                    id: p.id,
                    first_name: p.first_name || "User",
                    last_name: p.last_name || "",
                    avatar_url: p.avatar_url || "",
                    role: p.role || "student",
                    lastMessage: latestMsgMap[p.id]?.text || "",
                    lastMessageTime: latestMsgMap[p.id]?.time || "",
                    unreadCount: latestMsgMap[p.id]?.unread || 0,
                })).sort((a, b) => new Date(b.lastMessageTime || "").getTime() - new Date(a.lastMessageTime || "").getTime());
            }

            setChats(activeChats);

            // ۳. دریافت دوستان برای شروع چت جدید
            const { data: friendships } = await supabase
                .from("student_friends")
                .select("*")
                .eq("status", "accepted")
                .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);

            const friendIds = (friendships || []).map(f => f.sender_id === userId ? f.receiver_id : f.sender_id);

            if (friendIds.length > 0) {
                const { data: friendProfiles } = await supabase
                    .from("profiles")
                    .select("id, first_name, last_name, avatar_url, role")
                    .in("id", friendIds);

                const formattedFriends: ChatPartner[] = (friendProfiles || []).map(p => ({
                    id: p.id,
                    first_name: p.first_name || "User",
                    last_name: p.last_name || "",
                    avatar_url: p.avatar_url || "",
                    role: p.role || "student"
                }));
                setFriends(formattedFriends);
            }

        } catch (e) {
            console.error("Error fetching chats:", e);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredChats = chats.filter(c =>
        `${c.first_name} ${c.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="w-full h-[80vh] flex items-center justify-center bg-transparent">
                <div className="w-12 h-12 border-4 border-[#C2185B] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 font-sans relative pb-28">

            {/* هاله‌های نوری پس‌زمینه */}
            <div className="absolute top-0 left-[20%] w-[40vw] h-[40vw] bg-[#C2185B]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

            {/* هیدر صفحه */}
            <div className="flex items-center justify-between mb-8 bg-[#0a0a0f]/80 border border-white/10 p-6 rounded-[2.2rem] backdrop-blur-xl shadow-2xl relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C2185B] to-pink-600 flex items-center justify-center text-white shadow-lg shadow-[#C2185B]/30">
                        <MessageSquare size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight">Messages</h1>
                        <p className="text-xs text-neutral-400 font-medium mt-0.5">Direct conversations with academy peers and mentors.</p>
                    </div>
                </div>
            </div>

            {/* نوار جستجو */}
            <div className="relative mb-8 z-10">
                <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0a0a0f]/80 border border-white/10 rounded-2xl px-5 py-4 pl-14 text-white placeholder-neutral-500 font-medium focus:outline-none focus:border-[#C2185B] transition-colors shadow-lg"
                />
                <Search className="absolute left-5 top-[18px] w-5 h-5 text-neutral-500" />
            </div>

            {/* بخش شروع چت سریع با دوستان */}
            {friends.length > 0 && (
                <div className="mb-8 relative z-10">
                    <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-4 px-2">Connected Friends</h3>
                    <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                        {friends.map((friend) => (
                            <Link
                                key={friend.id}
                                href={`/en/feed/chats/screen?userId=${friend.id}`}
                                className="flex flex-col items-center gap-2 shrink-0 group"
                            >
                                <div className="w-16 h-16 rounded-[1.5rem] bg-neutral-800 border-2 border-white/10 overflow-hidden flex items-center justify-center group-hover:border-[#C2185B] transition-colors relative shadow-md">
                                    {friend.avatar_url ? (
                                        <img src={friend.avatar_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <span className="text-[#C2185B] font-black text-lg">{friend.first_name.charAt(0)}</span>
                                    )}
                                    <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0a0a0f] shadow-sm"></div>
                                </div>
                                <span className="text-[11px] font-bold text-neutral-300 group-hover:text-white truncate max-w-[70px]">{friend.first_name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* لیست چت‌ها */}
            <div className="space-y-4 relative z-10">
                <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 px-2">Recent Chats</h3>

                {filteredChats.length === 0 ? (
                    <div className="text-center py-20 bg-[#0a0a0f]/40 rounded-[2.5rem] border border-white/5 shadow-inner">
                        <MessageSquare className="w-12 h-12 text-neutral-700 mx-auto mb-3 opacity-50" />
                        <p className="text-neutral-500 font-bold text-sm tracking-wide">No active conversations found.</p>
                        <p className="text-neutral-600 text-xs mt-1">Select a friend above to start messaging!</p>
                    </div>
                ) : (
                    filteredChats.map((chat) => (
                        <Link
                            key={chat.id}
                            href={`/en/feed/chats/screen?userId=${chat.id}`}
                            className="flex items-center gap-4 bg-[#0a0a0f]/80 border border-white/5 hover:border-[#C2185B]/30 p-4 sm:p-5 rounded-[2.2rem] backdrop-blur-xl shadow-lg hover:bg-white/[0.03] transition-all group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-neutral-800 border border-white/10 overflow-hidden flex items-center justify-center shrink-0 group-hover:border-[#C2185B] transition-colors shadow-inner">
                                {chat.avatar_url ? (
                                    <img src={chat.avatar_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                ) : (
                                    <span className="text-[#C2185B] font-black text-lg">{chat.first_name.charAt(0)}</span>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="text-white font-black text-sm tracking-wide truncate group-hover:text-pink-300 transition-colors">
                                        {chat.first_name} {chat.last_name}
                                    </h4>
                                    <span className="text-[10px] text-neutral-500 font-bold">
                                        {chat.lastMessageTime ? chat.lastMessageTime.split('T')[0] : ""}
                                    </span>
                                </div>
                                <p className="text-neutral-400 text-xs truncate font-medium">
                                    {chat.lastMessage || "No messages yet"}
                                </p>
                            </div>

                            {chat.unreadCount && chat.unreadCount > 0 ? (
                                <div className="w-6 h-6 rounded-full bg-[#C2185B] text-white text-[10px] font-black flex items-center justify-center shadow-[0_0_10px_rgba(194,24,91,0.5)] shrink-0">
                                    {chat.unreadCount}
                                </div>
                            ) : (
                                <ChevronRight size={18} className="text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                            )}
                        </Link>
                    ))
                )}
            </div>

        </div>
    );
}