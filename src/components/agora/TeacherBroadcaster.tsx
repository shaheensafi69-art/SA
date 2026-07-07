"use client";

import { useEffect, useState } from "react";
import AgoraRTC, { 
  AgoraRTCProvider, 
  useRTCClient, 
  useJoin, 
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  LocalVideoTrack,
} from "agora-rtc-react";

// ⚠️ دقیقاً همان App ID که در فایل شاگرد گذاشتید را اینجا هم قرار دهید
const appId = "YOUR_AGORA_APP_ID"; 

export default function TeacherBroadcaster({ channelName, onEndClass }: { channelName: string, onEndClass: () => void }) {
  // تفاوت مهم: اینجا نقش (role) استاد روی "host" تنظیم شده است تا بتواند ویدیو بفرستد
  const agoraClient = useRTCClient(AgoraRTC.createClient({ codec: "vp8", mode: "live", role: "host" }));

  return (
    <AgoraRTCProvider client={agoraClient}>
      <BroadcastControls channelName={channelName} onEndClass={onEndClass} />
    </AgoraRTCProvider>
  );
}

function BroadcastControls({ channelName, onEndClass }: { channelName: string, onEndClass: () => void }) {
  const [isJoined, setIsJoined] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  // اتصال به کانال آگورا
  useJoin({ appid: appId, channel: channelName, token: null }, isJoined);

  // گرفتن اجازه دوربین و میکروفون از مرورگر استاد
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(camOn);

  // ارسال تصویر و صدا به سرور آگورا
  usePublish([localMicrophoneTrack, localCameraTrack]);

  useEffect(() => {
    setIsJoined(true);
    return () => setIsJoined(false);
  }, []);

  if (!isJoined) {
    return <div className="text-white animate-pulse">Initializing Camera & Microphone...</div>;
  }

  return (
    <div className="relative w-full h-full bg-black rounded-3xl overflow-hidden group">
      
      {/* نمایش ویدیوی خود استاد */}
      {localCameraTrack ? (
        <LocalVideoTrack track={localCameraTrack} play={true} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-neutral-900">
           <span className="text-neutral-500">Camera is off</span>
        </div>
      )}

      {/* نشانگر لایو */}
      <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg">
         <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
         <span className="text-white text-xs font-bold tracking-widest uppercase">Live Broadcasting</span>
      </div>

      {/* پنل کنترل پایین تصویر (مخفی شونده) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-xl border border-white/10 p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        
        {/* دکمه میکروفون */}
        <button 
          onClick={() => setMicOn(!micOn)} 
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${micOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-500/20 text-red-500 border border-red-500/30'}`}
        >
          {micOn ? '🎤' : '🔇'}
        </button>

        {/* دکمه دوربین */}
        <button 
          onClick={() => setCamOn(!camOn)} 
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${camOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-500/20 text-red-500 border border-red-500/30'}`}
        >
          {camOn ? '📸' : '🚫'}
        </button>

        {/* دکمه پایان کلاس */}
        <button 
          onClick={onEndClass}
          className="w-12 h-12 rounded-xl bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)]"
          title="End Broadcast"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

      </div>
    </div>
  );
}