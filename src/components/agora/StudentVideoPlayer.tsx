"use client";

import { useEffect, useState, useRef } from "react";
import AgoraRTC, {
  AgoraRTCProvider,
  useRTCClient,
  useJoin,
  useRemoteUsers,
} from "agora-rtc-react";

// ⚠️ دقیقاً همان App ID که در فایل استاد گذاشتید را اینجا قرار دهید
const appId = "YOUR_AGORA_APP_ID"; 

export default function StudentVideoPlayer({ channelName }: { channelName: string }) {
  // تنظیم کلاینت آگورا در حالت لایو (live) و نقش تماشاچی (audience)
  const agoraClient = useRTCClient(AgoraRTC.createClient({ codec: "vp8", mode: "live", role: "audience" }));

  return (
    <AgoraRTCProvider client={agoraClient}>
      <LiveStreamContent channelName={channelName} />
    </AgoraRTCProvider>
  );
}

function LiveStreamContent({ channelName }: { channelName: string }) {
  const [isJoined, setIsJoined] = useState(false);

  // اتصال خودکار به کانال کلاس
  useJoin({
    appid: appId,
    channel: channelName,
    token: null, // در حالت تولید باید توکن امنیتی ست شود
  }, isJoined);

  useEffect(() => {
    setIsJoined(true);
    return () => setIsJoined(false);
  }, []);

  // دریافت لیست تمام افرادی که در حال پخش ویدیو/صدا هستند
  const remoteUsers = useRemoteUsers();
  
  // پیدا کردن استاد (اولین نفری که دیتا می‌فرستد)
  const teacher = remoteUsers.find(user => user.hasVideo || user.hasAudio);

  if (!isJoined) {
    return (
      <div className="flex flex-col items-center justify-center text-center w-full h-full bg-black">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
        <p className="text-white font-bold tracking-widest uppercase text-sm">Connecting to secure server...</p>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="flex flex-col items-center justify-center text-center w-full h-full bg-gradient-to-br from-neutral-900 to-black relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
         <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-6 text-3xl shadow-inner relative z-10 animate-pulse">📡</div>
         <h3 className="text-xl font-bold text-white mb-2 relative z-10">Waiting for Instructor</h3>
         <p className="text-neutral-500 text-sm max-w-xs relative z-10">The live broadcast will appear here automatically once the instructor starts the stream.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black rounded-[inherit] overflow-hidden group">
      
      {/* کامپوننت هوشمند برای پخش همزمان صدا و تصویر */}
      <AgoraRemotePlayer user={teacher} />

      {/* ================= Overlays (اطلاعات روی ویدیو) ================= */}
      
      {/* 1. نشانگر زنده بودن */}
      <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg z-20">
         <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
         <span className="text-white text-xs font-black tracking-widest uppercase">Live</span>
      </div>

      {/* 2. وضعیت میکروفون استاد */}
      {!teacher.hasAudio && (
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg z-20 animate-[fadeIn_0.3s_ease-out]">
           <span className="text-red-400 text-xs">🔇</span>
           <span className="text-neutral-300 text-[10px] font-bold uppercase tracking-widest">Instructor Muted</span>
        </div>
      )}

      {/* 3. واترمارک امنیتی آکادمی */}
      <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md border border-white/5 px-3 py-1.5 rounded-lg flex items-center gap-2 z-20 opacity-50 group-hover:opacity-100 transition-opacity">
        <img src="/logo-without-b.png" alt="Safi Academy" className="w-4 h-4 object-contain opacity-70" />
        <span className="text-white/70 text-[9px] font-bold uppercase tracking-[0.2em]">Safi Academy Secure Stream</span>
      </div>

    </div>
  );
}

// =====================================================================
// کامپوننت اختصاصی و امن برای اتصال ترک‌های صدا و تصویر آگورا به DOM
// =====================================================================
function AgoraRemotePlayer({ user }: { user: any }) {
  const videoRef = useRef<HTMLDivElement>(null);

  // مدیریت تصویر
  useEffect(() => {
    if (user.videoTrack && videoRef.current) {
      user.videoTrack.play(videoRef.current);
    }
    return () => {
      user.videoTrack?.stop();
    };
  }, [user.videoTrack]);

  // مدیریت صدا
  useEffect(() => {
    if (user.audioTrack) {
      user.audioTrack.play();
    }
    return () => {
      user.audioTrack?.stop();
    };
  }, [user.audioTrack]);

  return (
    <div className="w-full h-full relative">
      {/* فریم رندر ویدیو */}
      <div ref={videoRef} className={`w-full h-full ${user.hasVideo ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} />
      
      {/* حالت "فقط صدا" (وقتی استاد دوربین را می‌بندد اما میکروفون باز است) */}
      {!user.hasVideo && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-neutral-900 to-black z-10">
          <div className="w-24 h-24 bg-indigo-500/10 border border-indigo-500/30 rounded-full flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(99,102,241,0.2)] mb-6">
            🎙️
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Voice Only Mode</h3>
          <p className="text-neutral-500 text-sm">Instructor's camera is turned off.</p>
          
          {/* انیمیشن اکولایزر صدا */}
          {user.hasAudio && (
            <div className="flex items-end gap-1.5 h-6 mt-6">
              <div className="w-1.5 bg-indigo-500 rounded-t-full animate-[equalizer_1s_ease-in-out_infinite]"></div>
              <div className="w-1.5 bg-indigo-500 rounded-t-full animate-[equalizer_1.2s_ease-in-out_infinite_0.2s]"></div>
              <div className="w-1.5 bg-indigo-500 rounded-t-full animate-[equalizer_0.8s_ease-in-out_infinite_0.4s]"></div>
              <div className="w-1.5 bg-indigo-500 rounded-t-full animate-[equalizer_1.1s_ease-in-out_infinite_0.1s]"></div>
            </div>
          )}
        </div>
      )}

      {/* استایل‌های انیمیشن اکولایزر */}
      <style jsx>{`
        @keyframes equalizer {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
      `}</style>
    </div>
  );
}