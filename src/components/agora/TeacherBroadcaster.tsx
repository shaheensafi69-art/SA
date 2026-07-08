"use client";

import { useEffect, useState, useRef } from "react";
import AgoraRTC, { 
  AgoraRTCProvider, 
  useRTCClient, 
  useJoin, 
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish
} from "agora-rtc-react";

// خواندن اتوماتیک App ID از فایل env
const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID!; 

export default function TeacherBroadcaster({ channelName, onEndClass }: { channelName: string, onEndClass: () => void }) {
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
  
  const [token, setToken] = useState<string | null>(null);
  const [uid] = useState(() => Math.floor(Math.random() * 1000000));

  // درخواست توکن از بک‌اند قبل از ورود
  useEffect(() => {
    const fetchSecureToken = async () => {
      try {
        const response = await fetch("/api/agora/video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ channelName, uid, role: "teacher" }),
        });
        const data = await response.json();
        
        if (data.token) {
          setToken(data.token);
          setIsJoined(true);
        }
      } catch (error) {
        console.error("Failed to fetch Agora token:", error);
      }
    };

    fetchSecureToken();
    return () => setIsJoined(false);
  }, [channelName, uid]);

  // اتصال به کانال آگورا با توکن امنیتی
  useJoin({ appid: appId, channel: channelName, token: token, uid: uid }, isJoined && !!token);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(true);
  const { localCameraTrack } = useLocalCameraTrack(true);
  usePublish([localMicrophoneTrack, localCameraTrack]);

  const toggleMicrophone = async () => {
    if (localMicrophoneTrack) {
      const nextState = !micOn;
      await localMicrophoneTrack.setEnabled(nextState);
      setMicOn(nextState);
    }
  };

  const toggleCamera = async () => {
    if (localCameraTrack) {
      const nextState = !camOn;
      await localCameraTrack.setEnabled(nextState);
      setCamOn(nextState);
    }
  };

  if (!isJoined || !token) {
    return <div className="text-white animate-pulse text-sm font-bold tracking-widest flex items-center justify-center h-full">Generating Secure Broadcast Key...</div>;
  }

  return (
    <div className="relative w-full h-full bg-black rounded-3xl overflow-hidden group">
      
      {/* استفاده از پلیر بومی که در پایین فایل ساختیم */}
      {localCameraTrack && camOn ? (
        <AgoraLocalPlayer track={localCameraTrack} />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-neutral-900">
           <span className="text-neutral-500 text-sm">Your Camera is completely turned off</span>
        </div>
      )}

      <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg z-20">
         <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
         <span className="text-white text-xs font-black tracking-widest uppercase">Live Broadcasting</span>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/70 backdrop-blur-xl border border-white/10 p-3 rounded-2xl z-50">
        <button onClick={toggleMicrophone} type="button" className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all text-lg ${micOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-500/20 text-red-500 border border-red-500/40'}`}>
          {micOn ? '🎤' : '🔇'}
        </button>
        <button onClick={toggleCamera} type="button" className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all text-lg ${camOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-500/20 text-red-500 border border-red-500/40'}`}>
          {camOn ? '📸' : '🚫'}
        </button>
        <button onClick={onEndClass} type="button" className="w-12 h-12 rounded-xl bg-red-600 hover:bg-red-500 flex items-center justify-center text-white font-bold">
          ✕
        </button>
      </div>
    </div>
  );
}

// =====================================================================
// کامپوننت بومی و امن برای پخش ویدیوی خود استاد (بدون وابستگی به پکیج‌های منسوخ شده)
// =====================================================================
function AgoraLocalPlayer({ track }: { track: any }) {
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (track && videoRef.current) {
      track.play(videoRef.current);
    }
    return () => {
      track?.stop();
    };
  }, [track]);

  return <div ref={videoRef} className="w-full h-full [&>div>video]:object-cover" />;
}