"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, BotMessageSquare, Loader2, ShieldCheck, User as UserIcon, Sparkles, Paperclip, FileText, Download, X } from "lucide-react";

type SupportMessage = {
    id: string;
    sender_id: string | null;
    message_text: string;
    attachment_url: string | null;
    created_at: string;
};

type TicketInfo = {
    id: string;
    subject: string;
    status: "open" | "answered" | "closed" | "escalated";
};

export default function ChatScreen({ params }: { params: { id: string } }) {
    const router = useRouter();
    const supabase = createClient();
    const scrollRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [myUserId, setMyUserId] = useState<string | null>(null);
    const [myEmail, setMyEmail] = useState<string | null>(null);
    const [ticket, setTicket] = useState<TicketInfo | null>(null);
    const [messages, setMessages] = useState<SupportMessage[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        const initChat = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/en/login");
                return;
            }
            setMyUserId(user.id);
            setMyEmail(user.email || "Unknown");

            if (params.id && params.id !== "new") {
                await fetchTicketData(params.id);
            } else {
                router.push("/en/support");
            }
        };
        initChat();
    }, [params.id]);

    // سیستم Polling برای دریافت پیام‌های جدید از دیتابیس هر ۳ ثانیه
    useEffect(() => {
        if (!params.id || params.id === "new") return;

        const interval = setInterval(() => {
            fetchTicketData(params.id, true);
        }, 3000);

        return () => clearInterval(interval);
    }, [params.id]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const fetchTicketData = async (ticketId: string, isSilent = false) => {
        const { data: ticketData } = await supabase.from("tickets").select("*").eq("id", ticketId).single();
        if (ticketData) setTicket(ticketData as TicketInfo);

        const { data: msgsData } = await supabase.from("ticket_messages")
            .select("*")
            .eq("ticket_id", ticketId)
            .order("created_at", { ascending: true });

        if (msgsData) {
            setMessages(msgsData as SupportMessage[]);
        }

        if (!isSilent) setIsLoading(false);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const text = newMessage.trim();
        if ((!text && !selectedFile) || !ticket || !myUserId) return;

        setNewMessage("");
        setIsTyping(true);

        try {
            let attachmentUrl = null;

            if (selectedFile) {
                setIsUploading(true);
                const fileExt = selectedFile.name.split('.').pop();
                const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
                const filePath = `${ticket.id}/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('support')
                    .upload(filePath, selectedFile);

                if (!uploadError) {
                    const { data: publicUrlData } = supabase.storage
                        .from('support')
                        .getPublicUrl(filePath);
                    attachmentUrl = publicUrlData.publicUrl;
                }
                setSelectedFile(null);
                setIsUploading(false);
            }

            const history = messages.map(m => ({
                isUser: m.sender_id !== null,
                text: m.message_text
            }));

            // ارسال درخواست به API سرور (سرور پیام کاربر و پاسخ هوش مصنوعی را در دیتابیس ثبت می‌کند)
            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ticketId: ticket.id,
                    userId: myUserId,
                    userEmail: myEmail,
                    prompt: text || "File uploaded",
                    attachmentUrl: attachmentUrl,
                    history: history
                })
            });

            const data = await response.json();

            if (data.escalated) {
                setTicket(prev => prev ? { ...prev, status: "escalated" } : null);
            }

            // به‌روزرسانی فوری لیست پیام‌ها از دیتابیس
            await fetchTicketData(ticket.id, true);

        } catch (error) {
            console.error("Message send failed:", error);
        } finally {
            setIsTyping(false);
            setIsUploading(false);
        }
    };

    const formatTime = (dateStr: string) => {
        const d = new Date(dateStr);
        return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 z-[9999] bg-[#020202] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-white/50 animate-spin" />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[9999] bg-[#050505] text-white font-sans flex flex-col overflow-hidden">
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-pink-600/5 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/5 rounded-full blur-[150px]"></div>
            </div>

            <header className="h-[80px] shrink-0 bg-[#050505]/70 backdrop-blur-3xl border-b border-white/[0.03] flex items-center justify-between px-6 sm:px-10 z-20 relative shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-5">
                    <button
                        onClick={() => router.push("/en/support")}
                        className="w-10 h-10 rounded-full bg-white/[0.02] hover:bg-white/[0.06] flex items-center justify-center transition-all border border-white/[0.05]"
                    >
                        <ArrowLeft size={18} className="text-neutral-400 group-hover:text-white" />
                    </button>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2.5">
                            <h2 className="text-[14px] font-black tracking-widest uppercase text-white/90">Safi Support</h2>
                            {ticket?.status === "escalated" ? <ShieldCheck size={16} className="text-emerald-400" /> : <BotMessageSquare size={16} className="text-pink-400" />}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${ticket?.status === "escalated" ? "bg-amber-400 animate-pulse" : ticket?.status === "closed" ? "bg-red-500" : "bg-emerald-400"}`}></span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                                {ticket?.status === "escalated" ? "Human Agent Connected" : ticket?.status === "closed" ? "Session Closed" : "AI Intelligence Active"}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-8 pt-10 pb-36 space-y-8 custom-scrollbar scroll-smooth relative z-10">
                <div className="text-center pb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/[0.05] mb-3">
                        <Sparkles className="w-5 h-5 text-neutral-500" />
                    </div>
                    <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-[0.2em]">End-to-End Secure Session</p>
                </div>

                {messages.map((msg) => {
                    const isMe = msg.sender_id === myUserId;
                    const isSystemOrAdminMsg = ticket?.status === 'escalated' && msg.sender_id !== myUserId && msg.message_text.includes("درخواست شما");
                    const isRealAdmin = msg.sender_id !== myUserId && msg.sender_id !== null;
                    const isAdmin = isRealAdmin || isSystemOrAdminMsg;
                    const isAI = !isMe && !isAdmin;

                    let bubbleClass = "";
                    let icon = null;
                    let senderName = "";

                    if (isMe) {
                        bubbleClass = "bg-gradient-to-br from-blue-600/90 to-indigo-800/90 text-white rounded-[1.5rem] rounded-br-[4px] shadow-[0_10px_30px_rgba(79,70,229,0.15)]";
                        icon = <UserIcon size={12} className="text-indigo-200" />;
                        senderName = "You";
                    } else if (isAI) {
                        bubbleClass = "bg-white/[0.03] backdrop-blur-2xl border border-pink-500/20 text-neutral-200 rounded-[1.5rem] rounded-tl-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)]";
                        icon = <BotMessageSquare size={12} className="text-pink-400" />;
                        senderName = "Safi AI";
                    } else {
                        bubbleClass = "bg-white/[0.03] backdrop-blur-2xl border border-emerald-500/20 text-neutral-200 rounded-[1.5rem] rounded-tl-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)]";
                        icon = <ShieldCheck size={12} className="text-emerald-400" />;
                        senderName = "Safi Admin";
                    }

                    return (
                        <div key={msg.id} className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}>
                            <div className={`flex flex-col gap-2 max-w-[85%] sm:max-w-[65%] ${isMe ? "items-end" : "items-start"}`}>
                                <div className={`flex items-center gap-2 px-1 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-white/[0.05]">{icon}</div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">{senderName}</span>
                                </div>
                                <div className={`px-6 py-4 w-fit ${bubbleClass}`} style={{ direction: /[\u0600-\u06FF]/.test(msg.message_text) ? 'rtl' : 'ltr' }}>
                                    <p className="text-[14px] font-medium leading-[1.7] whitespace-pre-wrap tracking-wide">{msg.message_text}</p>

                                    {msg.attachment_url && (
                                        <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
                                            <a href={msg.attachment_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-pink-300 hover:underline">
                                                <FileText size={16} /> View Attachment <Download size={14} />
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <span className="text-[9px] text-neutral-600 font-bold px-2">{formatTime(msg.created_at)}</span>
                            </div>
                        </div>
                    );
                })}

                {isTyping && (
                    <div className="flex w-full justify-start">
                        <div className="bg-white/[0.03] backdrop-blur-2xl border border-pink-500/20 rounded-[1.5rem] rounded-tl-sm px-6 py-4 flex items-center gap-3 w-fit shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                            <div className="flex gap-1.5">
                                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                            </div>
                            <span className="text-[10px] text-neutral-400 font-bold tracking-widest uppercase ml-2">Processing</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 pb-safe bg-gradient-to-t from-[#020202] via-[#020202]/90 to-transparent z-30">
                {selectedFile && (
                    <div className="max-w-3xl mx-auto mb-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 flex items-center justify-between">
                        <span className="text-xs text-neutral-300 truncate">📎 {selectedFile.name}</span>
                        <button onClick={() => setSelectedFile(null)} className="text-neutral-400 hover:text-white"><X size={16} /></button>
                    </div>
                )}
                <form
                    onSubmit={handleSendMessage}
                    className="max-w-3xl mx-auto bg-[#101015]/80 backdrop-blur-3xl border border-white/[0.08] rounded-full p-2 flex items-center gap-2 shadow-[0_20px_60px_rgba(0,0,0,0.8)] transition-all focus-within:border-white/[0.2] focus-within:bg-[#15151c]/90"
                >
                    <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*,.pdf,.doc,.docx" />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-all ml-1"
                    >
                        <Paperclip size={18} />
                    </button>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        disabled={ticket?.status === "closed" || isTyping || isUploading}
                        placeholder={ticket?.status === "closed" ? "This session is closed." : ticket?.status === "escalated" ? "Message human admin..." : "Message Safi AI..."}
                        className="flex-1 bg-transparent border-none px-4 py-3.5 text-[14px] font-medium text-white placeholder-neutral-600 focus:outline-none focus:ring-0 disabled:opacity-50"
                        style={{ direction: /[\u0600-\u06FF]/.test(newMessage) ? 'rtl' : 'ltr' }}
                    />
                    <button
                        type="submit"
                        disabled={(!newMessage.trim() && !selectedFile) || ticket?.status === "closed" || isTyping || isUploading}
                        className="w-[46px] h-[46px] rounded-full bg-white text-black flex items-center justify-center shrink-0 disabled:opacity-30 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                        {isTyping || isUploading ? <Loader2 size={18} className="animate-spin" /> : <Send size={16} className="ml-0.5" />}
                    </button>
                </form>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
            `}</style>
        </div>
    );
}