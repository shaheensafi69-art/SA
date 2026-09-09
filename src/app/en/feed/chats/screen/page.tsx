"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";
import { uploadFileToR2 } from "@/utils/upload";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Send, Image as ImageIcon, Check, CheckCheck,
  Sparkles, X, CornerUpLeft, Paperclip, Video, ExternalLink,
  User, ShieldCheck, Loader2
} from "lucide-react";

interface MessageItem {
  id: string;
  sender_id: string;
  receiver_id: string;
  message_text: string;
  attachment_url: string | null;
  attachment_type: string | null;
  is_delivered: boolean;
  is_read: boolean;
  delivered_at?: string | null;
  read_at?: string | null;
  created_at: string;
}

interface PartnerProfile {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  role: string;
}

function ChatScreenContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const partnerId = searchParams.get("userId");
  const supabase = createClient();

  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [partner, setPartner] = useState<PartnerProfile | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [replyingTo, setReplyingTo] = useState<MessageItem | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Prevent and reset any window-level scroll displacement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!partnerId) {
      router.push("/en/feed/chats/list");
      return;
    }
    initChat();
  }, [partnerId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    // Only scroll the internal message container, NEVER scrollIntoView to prevent shifting parent window
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const initChat = async () => {
    setIsLoading(true);
    setSendError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.push("/en/login");
        return;
      }
      const userId = session.user.id;
      setCurrentUserId(userId);

      // 1. Fetch partner profile
      const { data: partnerRes, error: partnerErr } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, avatar_url, role")
        .eq("id", partnerId)
        .maybeSingle();

      if (partnerErr || !partnerRes) {
        console.error("Partner profile fetch error:", partnerErr);
      } else {
        setPartner(partnerRes);
      }

      // 2. Fetch existing direct messages between user and partner
      const { data: msgRes, error: msgErr } = await supabase
        .from("direct_messages")
        .select("*")
        .or(`and(sender_id.eq.${userId},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${userId})`)
        .order("created_at", { ascending: true });

      if (msgErr) {
        console.error("Error fetching messages:", msgErr);
      } else if (msgRes) {
        setMessages(msgRes);
      }

      // 3. Mark received unread messages as read
      await supabase
        .from("direct_messages")
        .update({ is_read: true, read_at: new Date().toISOString() })
        .eq("sender_id", partnerId)
        .eq("receiver_id", userId)
        .eq("is_read", false);

      // 4. Setup Realtime subscription for incoming messages
      const channel = supabase
        .channel(`chat_room_${userId}_${partnerId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'direct_messages',
          },
          (payload) => {
            const incoming = payload.new as MessageItem;
            if (
              (incoming.sender_id === userId && incoming.receiver_id === partnerId) ||
              (incoming.sender_id === partnerId && incoming.receiver_id === userId)
            ) {
              setMessages((prev) => {
                if (prev.some((m) => m.id === incoming.id)) return prev;
                return [...prev, incoming];
              });
              if (incoming.receiver_id === userId) {
                supabase
                  .from("direct_messages")
                  .update({ is_read: true, read_at: new Date().toISOString() })
                  .eq("id", incoming.id);
              }
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

    const rawText = newMessage.trim();
    const formattedText = replyingTo
      ? `💬 Replying to "${replyingTo.message_text.slice(0, 60)}${replyingTo.message_text.length > 60 ? '...' : ''}":\n${rawText}`
      : rawText;

    setNewMessage("");
    setReplyingTo(null);
    setSendError(null);

    // Optimistic UI update
    const tempId = `temp_${Date.now()}`;
    const tempMsg: MessageItem = {
      id: tempId,
      sender_id: currentUserId,
      receiver_id: partnerId,
      message_text: formattedText,
      attachment_url: null,
      attachment_type: null,
      is_delivered: true,
      is_read: false,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempMsg]);

    try {
      const { data, error } = await supabase
        .from("direct_messages")
        .insert({
          sender_id: currentUserId,
          receiver_id: partnerId,
          message_text: formattedText,
          is_delivered: true,
          is_read: false,
        })
        .select()
        .single();

      if (error) {
        console.error("Failed to insert message:", error);
        throw error;
      }

      if (data) {
        setMessages((prev) => prev.map((m) => (m.id === tempId ? data : m)));
      }
    } catch (err: any) {
      console.error("Send error:", err);
      setSendError("Failed to deliver message. Please try again.");
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUserId || !partnerId) return;

    setIsUploading(true);
    setSendError(null);
    try {
      const fileUrl = await uploadFileToR2(file, 'feed');
      const isImage = file.type.startsWith('image/');
      const defaultText = isImage ? "📷 Photo" : `📎 Attachment: ${file.name}`;

      const { data, error } = await supabase
        .from("direct_messages")
        .insert({
          sender_id: currentUserId,
          receiver_id: partnerId,
          message_text: defaultText,
          attachment_url: fileUrl,
          attachment_type: isImage ? "image" : "file",
          is_delivered: true,
          is_read: false,
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setMessages((prev) => [...prev, data]);
      }
    } catch (err) {
      console.error("Attachment upload error:", err);
      setSendError("Failed to upload attachment.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#030305]">
        <div className="w-12 h-12 border-4 border-[#C2185B] border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(194,24,91,0.5)]"></div>
        <p className="text-neutral-500 font-bold text-xs uppercase tracking-widest mt-4">Connecting to conversation...</p>
      </div>
    );
  }

  const partnerName = partner
    ? `${partner.first_name || 'User'} ${partner.last_name || ''}`.trim()
    : "Direct Chat";

  return (
    <div className="w-full h-full flex flex-col bg-[#030305] overflow-hidden font-sans relative">

      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C2185B]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* ================= HEADER ================= */}
      <header className="shrink-0 w-full px-4 sm:px-6 py-3 bg-[#07070c]/95 backdrop-blur-2xl border-b border-white/[0.08] z-20 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between w-full">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            
            {/* Back button */}
            <Link
              href="/en/feed/chats/list"
              className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-all shadow-sm shrink-0"
              title="Back to Conversations"
            >
              <ArrowLeft size={18} />
            </Link>

            {/* Partner Info */}
            <Link
              href={`/en/feed/profile/${partnerId}`}
              className="flex items-center gap-3 min-w-0 group cursor-pointer"
            >
              <div className="relative shrink-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-neutral-800 border-2 border-white/10 group-hover:border-[#C2185B] overflow-hidden flex items-center justify-center transition-colors shadow-inner">
                  {partner?.avatar_url ? (
                    <img src={partner.avatar_url} alt={partnerName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[#C2185B] font-black text-sm sm:text-base">{partner?.first_name?.charAt(0) || "U"}</span>
                  )}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#07070c] shadow-[0_0_8px_#10b981]"></div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-white font-black text-sm sm:text-base tracking-tight truncate group-hover:text-pink-300 transition-colors">
                    {partnerName}
                  </h2>
                  {partner?.role && partner.role !== 'student' && (
                    <span className="px-2 py-0.5 rounded-md bg-[#C2185B]/20 border border-[#C2185B]/40 text-[#C2185B] text-[9px] font-black uppercase tracking-wider hidden sm:inline-block">
                      {partner.role}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
                </p>
              </div>
            </Link>
          </div>

          {/* View Profile Link */}
          <Link
            href={`/en/feed/profile/${partnerId}`}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
          >
            <User size={14} className="text-[#C2185B]" />
            <span className="hidden sm:inline">Profile</span>
          </Link>
        </div>
      </header>

      {/* Error alert toast */}
      {sendError && (
        <div className="px-4 py-2 bg-red-500/20 border-b border-red-500/30 text-red-400 text-xs font-bold text-center flex items-center justify-center gap-2 shrink-0">
          <span>⚠️ {sendError}</span>
          <button onClick={() => setSendError(null)} className="underline hover:text-white">Dismiss</button>
        </div>
      )}

      {/* ================= MESSAGES CONTAINER ================= */}
      <div
        ref={messagesContainerRef}
        className="flex-1 min-h-0 w-full overflow-y-auto px-4 sm:px-6 py-5 custom-scrollbar bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-950/40 via-[#030305] to-[#030305] z-10"
      >
        <div className="max-w-4xl mx-auto w-full space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[250px] text-center p-6">
              <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-[#C2185B] shadow-xl">
                <Sparkles size={28} />
              </div>
              <h3 className="text-white font-black text-base tracking-wide">Start the conversation</h3>
              <p className="text-neutral-400 text-xs font-medium mt-1.5 max-w-xs">
                Send a direct message to {partnerName}. Messages are private and securely delivered.
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.sender_id === currentUserId;

              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"} group/msg`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[70%] rounded-[1.6rem] p-3.5 sm:p-4 shadow-xl relative transition-all ${
                      isMe
                        ? "bg-gradient-to-br from-[#C2185B] to-pink-700 text-white rounded-tr-none shadow-[0_8px_25px_rgba(194,24,91,0.3)]"
                        : "bg-[#0f0f18] border border-white/10 text-neutral-100 rounded-tl-none shadow-lg"
                    }`}
                  >
                    {/* Attachment Rendering */}
                    {msg.attachment_url && (
                      <div className="mb-3 rounded-2xl overflow-hidden border border-white/10 bg-black/80 shadow-md">
                        {msg.attachment_type === 'image' || msg.attachment_url.match(/\.(jpeg|jpg|gif|png|webp)/i) ? (
                          <a href={msg.attachment_url} target="_blank" rel="noreferrer" className="block cursor-pointer">
                            <img
                              src={msg.attachment_url}
                              alt="Attachment"
                              className="max-h-72 w-full object-cover hover:opacity-95 transition-opacity"
                            />
                          </a>
                        ) : msg.attachment_type === 'reel' || msg.attachment_type === 'video' || msg.attachment_url.match(/\.(mp4|mov|webm)/i) ? (
                          <div className="flex flex-col">
                            <video
                              src={msg.attachment_url}
                              controls
                              playsInline
                              className="max-h-72 w-full object-contain rounded-t-xl bg-black"
                            />
                            <div className="p-2.5 bg-black/40 flex items-center justify-between border-t border-white/5">
                              <span className="text-[10px] font-black uppercase tracking-widest text-[#C2185B] flex items-center gap-1">
                                <Video size={12} /> Video Media
                              </span>
                              <a
                                href={msg.attachment_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] font-bold text-neutral-300 hover:text-white px-2 py-0.5 bg-white/10 hover:bg-white/20 rounded-md transition-colors"
                              >
                                Open Full
                              </a>
                            </div>
                          </div>
                        ) : (
                          <a
                            href={msg.attachment_url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-3.5 flex items-center gap-2 text-xs font-bold text-pink-300 hover:underline"
                          >
                            <Paperclip size={16} /> Download File
                          </a>
                        )}
                      </div>
                    )}

                    {/* Message Text */}
                    <p className="text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-wrap break-words">
                      {msg.message_text}
                    </p>

                    {/* Footer: Time & Status */}
                    <div
                      className={`flex items-center justify-end gap-1.5 mt-1.5 text-[10px] font-bold ${
                        isMe ? "text-pink-200" : "text-neutral-500"
                      }`}
                    >
                      <span>
                        {msg.created_at
                          ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          : ""}
                      </span>
                      {isMe && (
                        <span>
                          {msg.is_read ? (
                            <CheckCheck size={14} className="text-white inline" />
                          ) : (
                            <Check size={14} className="text-pink-200 inline" />
                          )}
                        </span>
                      )}
                    </div>

                    {/* Reply Button on Hover */}
                    <button
                      onClick={() => setReplyingTo(msg)}
                      className={`absolute top-2 ${isMe ? "-left-9" : "-right-9"} opacity-0 group-hover/msg:opacity-100 transition-opacity p-2 bg-neutral-900 text-neutral-300 hover:text-white rounded-full shadow-lg border border-white/10 cursor-pointer`}
                      title="Reply to message"
                    >
                      <CornerUpLeft size={13} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ================= REPLY BANNER ================= */}
      {replyingTo && (
        <div className="shrink-0 w-full px-4 sm:px-6 py-2 bg-[#0a0a0f] border-t border-white/10 z-20 shadow-inner">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-1.5 h-8 bg-[#C2185B] rounded-full shrink-0 shadow-[0_0_10px_#C2185B]"></div>
              <div className="min-w-0">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#C2185B]">Replying to message</p>
                <p className="text-xs text-neutral-300 truncate mt-0.5">{replyingTo.message_text}</p>
              </div>
            </div>
            <button
              onClick={() => setReplyingTo(null)}
              className="text-neutral-400 hover:text-white p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      )}

      {/* ================= BOTTOM INPUT BAR ================= */}
      <form
        onSubmit={handleSendMessage}
        className="shrink-0 w-full bg-[#07070c]/95 border-t border-white/[0.08] px-4 sm:px-6 py-3 sm:py-3.5 backdrop-blur-2xl z-20 shadow-2xl"
      >
        <div className="max-w-4xl mx-auto flex items-center gap-2.5 sm:gap-3.5 w-full">
          {/* Attachment Upload Button */}
          <label
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-[#C2185B] transition-all cursor-pointer shrink-0 shadow-sm ${
              isUploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title="Send file or photo"
          >
            {isUploading ? (
              <Loader2 size={20} className="text-[#C2185B] animate-spin" />
            ) : (
              <Paperclip size={20} />
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*,application/pdf"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
            />
          </label>

          {/* Text Input */}
          <input
            type="text"
            placeholder={isUploading ? "Uploading attachment..." : "Type a message..."}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={isUploading}
            className="flex-1 bg-neutral-900/90 border border-white/10 rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 text-white text-xs sm:text-sm placeholder-neutral-500 focus:outline-none focus:border-[#C2185B] shadow-inner transition-colors"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={isUploading || !newMessage.trim()}
            className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-[#C2185B] to-yellow-500 text-black font-bold rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all shadow-[0_0_20px_rgba(194,24,91,0.4)] shrink-0 cursor-pointer"
            title="Send message"
          >
            <Send size={18} className="text-black font-black" />
          </button>
        </div>
      </form>

    </div>
  );
}

export default function ChatScreenPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-[#030305]">
          <div className="w-12 h-12 border-4 border-[#C2185B] border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(194,24,91,0.5)]"></div>
        </div>
      }
    >
      <ChatScreenContent />
    </Suspense>
  );
}