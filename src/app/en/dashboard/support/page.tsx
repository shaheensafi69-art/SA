"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

// ========================================================
// ⚠️ Your Telegram Keys (Token 2 & Chat ID 2)
// ========================================================
const TELEGRAM_BOT_TOKEN = "8994358206:AAHUpoHpMpqdnTxA_J30-xMipDg4l0vhBV8";
const TELEGRAM_CHAT_ID = "5195615040";

type Ticket = {
  id: string;
  subject: string;
  status: "open" | "answered" | "closed";
  created_at: string;
};

type UserInfo = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export default function SupportPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({ id: "", firstName: "", lastName: "", email: "" });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Ticket form updated with requested fields sequence
  const [ticketForm, setTicketForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

  // Stats for the dashboard
  const [stats, setStats] = useState({ open: 0, answered: 0, total: 0 });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    const supabase = createClient();
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      setIsLoading(false);
      return;
    }

    const userId = session.user.id;
    const userEmail = session.user.email || "";

    const { data: profile } = await supabase
      .from("profiles")
      .select("first_name, last_name")
      .eq("id", userId)
      .single();

    const fName = profile?.first_name || "";
    const lName = profile?.last_name || "";

    setUserInfo({ id: userId, firstName: fName, lastName: lName, email: userEmail });
    
    // Pre-populate ticket form fields from database account info
    setTicketForm(prev => ({
      ...prev,
      firstName: fName,
      lastName: lName,
      email: userEmail
    }));

    const { data: ticketsData } = await supabase
      .from("tickets")
      .select("*")
      .eq("student_id", userId)
      .order("created_at", { ascending: false });

    if (ticketsData) {
      const allTickets = ticketsData as Ticket[];
      setTickets(allTickets);
      
      // Calculate Stats
      const openCount = allTickets.filter(t => t.status === "open").length;
      const answeredCount = allTickets.filter(t => t.status === "answered").length;
      setStats({ open: openCount, answered: answeredCount, total: allTickets.length });
    }
    
    setIsLoading(false);
  };

  // ========================================================
  // Telegram Sender with Extended User Information fields
  // ========================================================
  const sendTicketAlertToTelegram = async (form: typeof ticketForm, userId: string) => {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

    const telegramText = 
`🛑 *New Support Ticket*

👤 *User Information:*
👉 *First Name:* ${form.firstName}
👉 *Last Name:* ${form.lastName}
👉 *Account Email:* ${form.email}
👉 *Database ID:* \`${userId}\`

📌 *Subject:* ${form.subject}

💬 *Message Details:*
${form.message}`;

    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramText,
          parse_mode: "Markdown",
        }),
      });
    } catch (err) {
      console.error("Telegram alert delivery failed:", err);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketForm.subject.trim() || !ticketForm.message.trim()) return;
    
    setIsSubmitting(true);
    const supabase = createClient();
    
    try {
      const { data: newTicket, error: ticketError } = await supabase
        .from("tickets")
        .insert({
          student_id: userInfo.id,
          subject: ticketForm.subject,
          department: "Technical",
          status: "open",
        })
        .select()
        .single();
      
      if (ticketError) throw ticketError;

      await supabase.from("ticket_messages").insert({
        ticket_id: newTicket.id,
        sender_id: userInfo.id,
        message_text: ticketForm.message,
      });

      // Submit all inputs to your Telegram bot channel
      await sendTicketAlertToTelegram(ticketForm, userInfo.id);

      setIsModalOpen(false);
      setTicketForm(prev => ({
        ...prev,
        subject: "",
        message: ""
      }));
      setTickets(prev => [newTicket, ...prev]);
      setStats(prev => ({ ...prev, open: prev.open + 1, total: prev.total + 1 }));
      
      alert("Your support request has been logged and forwarded successfully.");
    } catch (error) {
      console.error("Error creating ticket:", error);
      alert("An error occurred while creating the ticket.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full relative overflow-hidden bg-[#020202] font-sans min-h-screen pb-12">
      
      {/* ================= Ambient Glow Effects ================= */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* ================= Header ================= */}
      <header className="px-6 md:px-12 pt-8 md:pt-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10 mb-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Support <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Desk</span>
          </h1>
          <p className="text-neutral-500 text-sm md:text-base font-medium max-w-xl mt-2">Submit your queries directly to our elite assistance unit.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="flex px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-[0_10px_30px_rgba(245,158,11,0.2)] hover:shadow-[0_10px_40px_rgba(245,158,11,0.4)] items-center justify-center gap-3 hover:scale-105 shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
          Create Ticket
        </button>
      </header>

      {/* ================= Main Content ================= */}
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto relative z-10 flex flex-col gap-8">

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
          <div className="bg-gradient-to-br from-neutral-900/50 to-black p-6 rounded-[2rem] border border-white/5 backdrop-blur-xl flex items-center gap-5 shadow-lg">
            <div className="w-14 h-14 bg-amber-500/10 rounded-[1.5rem] flex items-center justify-center text-2xl text-amber-500 border border-amber-500/20">⏳</div>
            <div>
              <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest mb-0.5">Open Tickets</p>
              <h3 className="text-3xl font-black text-white leading-none">{isLoading ? "-" : stats.open}</h3>
            </div>
          </div>
          <div className="bg-gradient-to-br from-neutral-900/50 to-black p-6 rounded-[2rem] border border-white/5 backdrop-blur-xl flex items-center gap-5 shadow-lg">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-[1.5rem] flex items-center justify-center text-2xl text-emerald-400 border border-emerald-500/20">✅</div>
            <div>
              <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest mb-0.5">Answered</p>
              <h3 className="text-3xl font-black text-white leading-none">{isLoading ? "-" : stats.answered}</h3>
            </div>
          </div>
          <div className="bg-gradient-to-br from-neutral-900/50 to-black p-6 rounded-[2rem] border border-white/5 backdrop-blur-xl flex items-center gap-5 shadow-lg">
            <div className="w-14 h-14 bg-white/5 rounded-[1.5rem] flex items-center justify-center text-2xl text-white border border-white/10">📋</div>
            <div>
              <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest mb-0.5">Total Submitted</p>
              <h3 className="text-3xl font-black text-white leading-none">{isLoading ? "-" : stats.total}</h3>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="w-full mt-4">
          <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
              <h2 className="text-xl font-black text-white tracking-tight">My Support Logs</h2>
              <div className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Welcome, {userInfo.firstName || "Student"}</div>
          </div>

          <div className="space-y-4">
            {isLoading ? (
              [1, 2, 3].map(i => <div key={i} className="h-24 bg-neutral-900/40 rounded-[2rem] border border-white/5 animate-pulse"></div>)
            ) : tickets.length > 0 ? (
              tickets.map(t => (
                <div key={t.id} className="relative overflow-hidden bg-gradient-to-br from-neutral-900/40 to-black rounded-[2rem] border border-white/5 backdrop-blur-2xl p-6 transition-all duration-500 hover:-translate-y-1 group flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg hover:shadow-2xl hover:border-amber-500/20">
                  
                  {/* Hover Glow */}
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100 ${
                    t.status === 'open' ? 'bg-amber-500/20' : t.status === 'answered' ? 'bg-emerald-500/20' : 'bg-white/10'
                  }`}></div>

                  <div className="flex items-center gap-5 relative z-10">
                    <div className="w-14 h-14 bg-white/5 rounded-[1.2rem] border border-white/10 flex items-center justify-center text-xl shadow-inner shrink-0 text-neutral-500">
                      🎫
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white tracking-tight group-hover:text-amber-400 transition-colors">{t.subject}</h4>
                      <p className="text-[10px] text-neutral-500 font-mono mt-1.5 uppercase tracking-wider">
                        Submitted: {new Date(t.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center relative z-10">
                    <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border shadow-inner ${
                        t.status === 'open' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                        t.status === 'answered' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        'bg-neutral-800 text-neutral-400 border-white/10'
                    }`}>
                      {t.status === 'open' && <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>}
                      {t.status === 'open' ? 'Pending Review' : t.status === 'answered' ? 'Answered' : 'Closed'}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gradient-to-br from-neutral-900/40 to-black p-16 rounded-[3rem] border border-white/5 text-center flex flex-col items-center gap-4 shadow-2xl">
                <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-5xl mb-2 shadow-inner">📩</div>
                <h3 className="text-2xl font-black text-white">No Support Logs Active</h3>
                <p className="text-neutral-400 text-sm max-w-sm font-medium">Need help with something? Click the creation terminal below to forward an alert straight to management.</p>
                <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-2xl mt-4 hover:bg-white/10 text-xs uppercase tracking-widest transition-all hover:scale-105">Open First Ticket</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ================= MODAL: ADD NEW TICKET (Glassmorphism) ================= */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="absolute inset-0 bg-[#020202]/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative w-full max-w-2xl bg-gradient-to-b from-neutral-900/95 to-black border border-white/10 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header Modal */}
            <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02] shrink-0 relative z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/10 blur-[50px] pointer-events-none"></div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Open Support Request</h2>
                <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest mt-1">Submit your ticket to our telegram terminal</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 rounded-full flex items-center justify-center transition-all border border-white/5 hover:border-red-500/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            {/* Scrollable Form Body */}
            <div className="p-8 overflow-y-auto custom-scrollbar flex-1 relative z-10">
              <form id="ticketForm" onSubmit={handleCreateTicket} className="space-y-6">
                
                {/* Section 1: User Details */}
                <div>
                  <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest border-l-2 border-amber-500 pl-3 mb-4">Your Identity</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">First Name *</label>
                      <input 
                        required type="text"
                        value={ticketForm.firstName} 
                        onChange={e => setTicketForm({...ticketForm, firstName: e.target.value})} 
                        className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors shadow-inner" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Last Name *</label>
                      <input 
                        required type="text"
                        value={ticketForm.lastName} 
                        onChange={e => setTicketForm({...ticketForm, lastName: e.target.value})} 
                        className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors shadow-inner" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 mt-4">
                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Account Email *</label>
                    <input 
                      required type="email"
                      value={ticketForm.email} 
                      onChange={e => setTicketForm({...ticketForm, email: e.target.value})} 
                      className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors font-mono shadow-inner" 
                    />
                  </div>
                </div>

                {/* Section 2: Ticket Details */}
                <div>
                  <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest border-l-2 border-amber-500 pl-3 mb-4">Ticket Details</h4>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Subject *</label>
                      <input 
                        required type="text"
                        placeholder="e.g., Database Sync Error" 
                        value={ticketForm.subject} 
                        onChange={e => setTicketForm({...ticketForm, subject: e.target.value})} 
                        className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors shadow-inner" 
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Message Details *</label>
                      <textarea 
                        required 
                        placeholder="Describe your technical difficulty or issue..." 
                        value={ticketForm.message} 
                        onChange={e => setTicketForm({...ticketForm, message: e.target.value})} 
                        className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm min-h-[140px] focus:outline-none focus:border-amber-500/50 transition-colors resize-none custom-scrollbar shadow-inner" 
                      />
                    </div>
                  </div>
                </div>

              </form>
            </div>

            {/* Footer Modal (Submit Button) */}
            <div className="p-6 border-t border-white/5 bg-black/80 shrink-0 flex flex-col gap-3">
               <button 
                type="submit" 
                form="ticketForm"
                disabled={isSubmitting} 
                className="w-full py-4 bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-[0_10px_30px_rgba(245,158,11,0.3)] flex items-center justify-center"
              >
                {isSubmitting ? "Dispatching Route..." : "Submit Ticket Terminal 🚀"}
              </button>
              <p className="text-center text-neutral-500 text-[9px] font-bold uppercase tracking-widest">Your inputs route directly to our core telegram transmission architecture.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}