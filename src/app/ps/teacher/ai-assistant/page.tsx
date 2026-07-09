"use client";

import { useState, useRef, useEffect } from "react";

export default function TeacherAIAssistant() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const text = input.trim();
    setInputValue("");
    setMessages(p => [...p, { role: "user", content: text }]);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `As an educational supervisor: ${text}` })
      });
      const data = await res.json();
      setMessages(p => [...p, { role: "ai", content: data.message }]);
    } catch {
      setMessages(p => [...p, { role: "ai", content: "Error communicating with AI engine." }]);
    } finally { setIsTyping(false); }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10px)] bg-[#020202] text-white">
      <header className="h-24 px-8 flex items-center border-b border-white/5 bg-neutral-950/20 backdrop-blur-md shrink-0">
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500">Safi AI Engine <span className="text-xs text-neutral-500 font-bold px-2 py-0.5 bg-white/5 rounded border border-white/5 ml-2">INSTRUCTOR EDITION</span></h1>
      </header>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-4 rounded-2xl max-w-[75%] text-sm leading-relaxed ${m.role === 'user' ? 'bg-fuchsia-600 text-white rounded-tr-none' : 'bg-neutral-900 border border-white/5 text-neutral-200 rounded-tl-none'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {isTyping && <div className="text-xs text-neutral-500 animate-pulse">Safi AI is heavy calculating curriculum structures...</div>}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleSend} className="p-6 bg-gradient-to-t from-black to-transparent shrink-0">
        <div className="max-w-4xl mx-auto flex gap-3 bg-neutral-900 border border-white/10 rounded-xl p-2 focus-within:border-fuchsia-500 transition-colors">
          <input value={input} onChange={e => setInputValue(e.target.value)} type="text" placeholder="Generate quiz questions, structure lectures, or ask tech concepts..." className="flex-1 bg-transparent px-4 py-3 text-sm text-white focus:outline-none" />
          <button type="submit" disabled={!input.trim()} className="px-5 bg-fuchsia-600 text-black font-black text-xs rounded-lg hover:bg-fuchsia-500 transition-colors">PROMPT</button>
        </div>
      </form>
    </div>
  );
}