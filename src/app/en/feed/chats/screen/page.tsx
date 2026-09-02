"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";
import { uploadFileToR2 } from "@/utils/upload";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Image as ImageIcon, Check, CheckCheck, Sparkles, X, Search, CornerUpLeft, MessageSquare, Paperclip } from "lucide-react";

interface MessageItem {
    id: string;
    sender_id: string;
    receiver_id: string;
    message_text: string;
    attachment_url: string | null;
    attachment_type: string | null;
    is_read: boolean;
    reply_to_text?: string | null;
    created_at: string;
}

interface PartnerProfile {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url: string;
    role: string;
}

interface ChatSidebarItem {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url: string;
    lastMessage?: string;
    lastMessageTime?: string;
}

function ChatScreenContent() {
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState<MessageItem[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [partner, setPartner] = useState<PartnerProfile | null>(null);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const [sidebarChats, setSidebarChats] = useState<ChatSidebarItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [replyingTo, setReplyingTo] = useState<MessageItem | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const partnerId = searchParams.get("userId");
    const supabase = createClient();

    useEffect(() => {
        if (!partnerId) {
            router.push("/en/feed/chats/list");
            return;
        }
        initChatAndSidebar();
    }, [partnerId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const initChatAndSidebar = async () => {
        setIsLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) return router.push("/en/login");
            const userId = session.user.id;
            setCurrentUserId(userId);

            const { data: partnerRes } = await supabase
                .from("profiles")
                .select("id, first_name, last_name, avatar_url, role")
                .eq("id", partnerId)
                .single();

            if (partnerRes) setPartner(partnerRes);

            const { data: msgRes } = await supabase
                .from("direct_messages")
                .select("*")
                .or(`and(sender_id.eq.${userId},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${userId})`)
                .order("created_at", { ascending: true });

            if (msgRes) setMessages(msgRes);

            await supabase
                .from("direct_messages")
                .update({ is_read: true, read_at: new Date().toISOString() })
                .eq("sender_id", partnerId)
                .eq("receiver_id", userId)
                .eq("is_read", false);

            const { data: allMsgs } = await supabase
                .from("direct_messages")
                .select("*")
                .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
                .order("created_at", { ascending: false });

            const partnerMap = new Set<string>();
            const lastMsgDict: any = {};
            allMsgs?.forEach((m) => {
                const pId = m.sender_id === userId ? m.receiver_id : m.sender_id;
                partnerMap.add(pId);
                if (!lastMsgDict[pId]) lastMsgDict[pId] = { text: m.message_text, time: m.created_at };
            });

            const pIds = Array.from(partnerMap);
            if (pIds.length > 0) {
                const { data: pProfiles } = await supabase
                    .from("profiles")
                    .select("id, first_name, last_name, avatar_url")
                    .in("id", pIds);

                const formattedSidebar: ChatSidebarItem[] = (pProfiles || []).map(p => ({
                    id: p.id,
                    first_name: p.first_name || "User",
                    last_name: p.last_name || "",
                    avatar_url: p.avatar_url || "",
                    lastMessage: lastMsgDict[p.id]?.text || "",
                    lastMessageTime: lastMsgDict[p.id]?.time || ""
                }));
                setSidebarChats(formattedSidebar);
            }

            const channel = supabase
                .channel(`chat_room_${userId}_${partnerId}`)
                .on(
                    'postgres_changes',
                    {
                        event: 'INSERT',
                        schema: 'public',
                        table: 'direct_messages',
                        filter: `or(and(sender_id.eq.${userId},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${userId}))`
                    },
                    (payload) => {
                        const newMsg = payload.new as MessageItem;
                        setMessages((prev) => {
                            if (prev.some(m => m.id === newMsg.id)) return prev;
                            return [...prev, newMsg];
                        });
                        if (newMsg.receiver_id === userId) {
                            supabase.from("direct_messages").update({ is_read: true }).eq("id", newMsg.id);
                        }
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };

        } catch (e) {
            console.error("Error initializing chat:", e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!newMessage.trim() || !currentUserId || !partnerId) return;

        const text = newMessage.trim();
        const replyText = replyingTo ? replyingTo.message_text : null;
        setNewMessage("");
        setReplyingTo(null);

        const tempMsg: MessageItem = {
            id: `temp_${Date.now()}`,
            sender_id: currentUserId,
            receiver_id: partnerId,
            message_text: text,
            attachment_url: null,
            attachment_type: null,
            is_read: false,
            reply_to_text: replyText,
            created_at: new Date().toISOString()
        };
        setMessages(prev => [...prev, tempMsg]);

        try {
            const { data, error } = await supabase.from("direct_messages").insert({
                sender_id: currentUserId,
                receiver_id: partnerId,
                message_text: text,
                reply_to_text: replyText,
                is_delivered: true,
                is_read: false,
            }).select().single();

            if (error) throw error;
            if (data) {
                setMessages(prev => prev.map(m => m.id === tempMsg.id ? data : m));
            }
        } catch (e) {
            console.error("Error sending message:", e);
            alert("Failed to send message.");
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !currentUserId || !partnerId) return;

        setIsUploading(true);
        try {
            const fileUrl = await uploadFileToR2(file, 'feed');
            const isImage = file.type.startsWith('image/');

            const { data, error } = await supabase.from("direct_messages").insert({
                sender_id: currentUserId,
                receiver_id: partnerId,
                message_text: isImage ? "📷 Photo" : "📎 Attachment",
                attachment_url: fileUrl,
                attachment_type: isImage ? "image" : "file",
                is_delivered: true,
                is_read: false,
            }).select().single();

            if (error) throw error;
            if (data) {
                setMessages(prev => [...prev, data]);
            }

        } catch (e) {
            console.error("Upload error:", e);
            alert("Failed to upload attachment.");
        } finally {
            setIsUploading(false);
        }
    };

    const filteredSidebar = sidebarChats.filter(c =>
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
        <div className="w-full h-full flex bg-[#030305] overflow-hidden font-sans relative">

            {/* پس‌زمینه گرادیانتی بسیار نرم و لوکس */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(194,24,91,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,_rgba(234,179,8,0.05),transparent_50%)] pointer-events-none z-0"></div>

            {/* ================= سایدبار مخاطبان (مثل واتساپ دسکتاپ) ================= */}
            <div className={`w-full lg:w-[360px] bg-[#07070c]/95 backdrop-blur-3xl border-r border-white/[0.06] flex flex-col shrink-0 relative z-20 h-full ${partnerId ? 'hidden lg:flex' : 'flex'}`}>

                <div className="p-4 border-b border-white/[0.06] flex items-center justify-between shrink-0 bg-black/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#C2185B] to-pink-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(194,24,91,0.4)]">
                            <MessageSquare size={20} />
                        </div>
                        <h2 className="text-white font-black text-sm tracking-wide">Messages</h2>
                    </div>
                    <Link href="/en/feed/network" className="text-xs font-black uppercase tracking-wider text-[#C2185B] hover:text-pink-400 transition-colors bg-pink-500/10 px-3 py-1.5 rounded-xl border border-pink-500/20">
                        + New Chat
                    </Link>
                </div>

                <div className="p-3 shrink-0">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-neutral-900/90 border border-white/5 rounded-2xl px-4 py-3 pl-11 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#C2185B] shadow-inner"
                        />
                        <Search className="absolute left-4 top-[12px] w-4 h-4 text-neutral-500" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5 custom-scrollbar">
                    {filteredSidebar.map((chat) => {
                        const isActive = chat.id === partnerId;
                        return (
                            <Link
                                key={chat.id}
                                href={`/en/feed/chats/screen?userId=${chat.id}`}
                                className={`flex items-center gap-3.5 p-3.5 rounded-2xl transition-all ${isActive ? "bg-gradient-to-r from-[#C2185B]/25 to-[#0a0a0f] border border-[#C2185B]/40 shadow-lg" : "hover:bg-white/[0.03]"
                                    }`}
                            >
                                <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-white/10 overflow-hidden flex items-center justify-center shrink-0 shadow-md">
                                    {chat.avatar_url ? (
                                        <img src={chat.avatar_url} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-[#C2185B] font-black text-base">{chat.first_name.charAt(0)}</span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-white font-black text-xs tracking-wide truncate">{chat.first_name} {chat.last_name}</h4>
                                    <p className="text-neutral-400 text-[11px] truncate mt-1 font-medium">{chat.lastMessage || "No messages yet"}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* ================= صفحه اصلی چت (تمام‌صفحه با چسبندگی کامل پایین) ================= */}
            <div className={`flex-1 flex flex-col h-full bg-[#050509]/80 backdrop-blur-md relative z-10 overflow-hidden ${!partnerId ? 'hidden lg:flex' : 'flex'}`}>

                {/* هیدر چت مخاطب */}
                <div className="flex items-center justify-between bg-[#07070c]/90 border-b border-white/[0.06] px-6 py-4 backdrop-blur-2xl shrink-0 z-10 shadow-sm">
                    <div className="flex items-center gap-4">
                        <Link href="/en/feed/chats/list" className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white">
                            <ArrowLeft size={18} />
                        </Link>
                        <div className="w-11 h-11 rounded-2xl bg-neutral-800 border border-white/10 overflow-hidden flex items-center justify-center shrink-0 shadow-inner">
                            {partner?.avatar_url ? (
                                <img src={partner.avatar_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-[#C2185B] font-black text-base">{partner?.first_name?.charAt(0) || "U"}</span>
                            )}
                        </div>
                        <div>
                            <h3 className="text-white font-black text-sm tracking-wide">
                                {partner?.first_name} {partner?.last_name}
                            </h3>
                            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></span> Active Now
                            </p>
                        </div>
                    </div>
                </div>

                {/* لیست پیام‌ها (اسکرول‌پذیر مستقل) */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-5 custom-scrollbar bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/30 via-[#030305] to-[#030305]">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 text-[#C2185B] shadow-lg">
                                <Sparkles size={28} />
                            </div>
                            <p className="text-white font-black text-sm tracking-wide">No messages yet</p>
                            <p className="text-neutral-500 text-xs font-bold mt-1">Send a message to start the conversation!</p>
                        </div>
                    ) : (
                        messages.map((msg) => {
                            const isMe = msg.sender_id === currentUserId;
                            return (
                                <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"} group/msg`}>
                                    <div className={`max-w-[85%] sm:max-w-[65%] rounded-2xl p-4 shadow-xl relative transition-all ${isMe
                                        ? "bg-gradient-to-br from-[#C2185B] to-pink-700 text-white rounded-tr-none shadow-[0_8px_25px_rgba(194,24,91,0.3)]"
                                        : "bg-[#11111a] border border-white/10 text-neutral-100 rounded-tl-none shadow-lg"
                                        }`}>

                                        {/* نمایش پیام ریپلای شده */}
                                        {msg.reply_to_text && (
                                            <div className={`mb-2.5 p-2.5 rounded-xl border-l-2 text-xs font-medium opacity-90 ${isMe ? "bg-black/20 border-white" : "bg-white/5 border-[#C2185B]"}`}>
                                                <p className="truncate">{msg.reply_to_text}</p>
                                            </div>
                                        )}

                                        {msg.attachment_url && (
                                            <div className="mb-3 rounded-xl overflow-hidden border border-white/10 bg-black">
                                                {msg.attachment_type === 'image' ? (
                                                    <img src={msg.attachment_url} alt="" className="max-h-72 w-full object-cover" />
                                                ) : (
                                                    <a href={msg.attachment_url} target="_blank" rel="noreferrer" className="p-3.5 block text-xs font-bold text-pink-300 underline">
                                                        Download Attachment
                                                    </a>
                                                )}
                                            </div>
                                        )}

                                        <p className="text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.message_text}</p>

                                        <div className={`flex items-center justify-end gap-1.5 mt-2 text-[10px] font-bold ${isMe ? "text-pink-200" : "text-neutral-400"}`}>
                                            <span>{msg.created_at ? msg.created_at.split('T')[1]?.substring(0, 5) : ""}</span>
                                            {isMe && (
                                                <span>{msg.is_read ? <CheckCheck size={13} className="text-white" /> : <Check size={13} />}</span>
                                            )}
                                        </div>

                                        {/* دکمه ریپلای شناور روی پیام */}
                                        <button
                                            onClick={() => setReplyingTo(msg)}
                                            className={`absolute top-2 ${isMe ? "-left-9" : "-right-9"} opacity-0 group-hover/msg:opacity-100 transition-opacity p-2 bg-neutral-800 text-neutral-200 hover:text-white rounded-full shadow-lg border border-white/10`}
                                            title="Reply"
                                        >
                                            <CornerUpLeft size={14} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* پنل ریپلای فعال */}
                {replyingTo && (
                    <div className="px-6 py-3 bg-[#0a0a0f] border-t border-white/10 flex items-center justify-between shrink-0 shadow-inner">
                        <div className="flex items-center gap-3.5 min-w-0">
                            <div className="w-1.5 h-9 bg-[#C2185B] rounded-full shrink-0 shadow-[0_0_10px_#C2185B]"></div>
                            <div className="min-w-0">
                                <p className="text-[10px] font-black uppercase tracking-wider text-[#C2185B]">Replying to message</p>
                                <p className="text-xs text-neutral-200 truncate mt-0.5">{replyingTo.message_text}</p>
                            </div>
                        </div>
                        <button onClick={() => setReplyingTo(null)} className="text-neutral-400 hover:text-white p-1.5 rounded-full bg-white/5">
                            <X size={16} />
                        </button>
                    </div>
                )}

                {/* باکس ارسال پیام فیکس‌شده در پایین‌ترین نقطه */}
                <form onSubmit={handleSendMessage} className="bg-[#07070c]/95 border-t border-white/[0.06] p-4 sm:p-5 backdrop-blur-2xl flex items-center gap-3.5 shrink-0 shadow-2xl">

                    <label className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#C2185B] transition-all cursor-pointer shrink-0 shadow-sm">
                        <Paperclip size={20} />
                        <input type="file" accept="image/*,application/*" onChange={handleFileUpload} className="hidden" />
                    </label>

                    <input
                        type="text"
                        placeholder={isUploading ? "Uploading file..." : "Type a message..."}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        disabled={isUploading}
                        className="flex-1 bg-neutral-900/90 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-xs sm:text-sm placeholder-neutral-500 focus:outline-none focus:border-[#C2185B] shadow-inner transition-colors"
                    />

                    <button
                        type="submit"
                        disabled={isUploading || !newMessage.trim()}
                        className="w-12 h-12 bg-gradient-to-br from-[#C2185B] to-yellow-500 text-black rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(194,24,91,0.4)] shrink-0 cursor-pointer"
                    >
                        <Send size={18} className="text-black ml-0.5 font-bold" />
                    </button>

                </form>

            </div>

        </div>
    );
}

export default function ChatScreenPage() {
    return (
        <Suspense fallback={
            <div className="w-full h-screen flex items-center justify-center bg-[#030305]">
                <div className="w-12 h-12 border-4 border-[#C2185B] border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <ChatScreenContent />
        </Suspense>
    );
}