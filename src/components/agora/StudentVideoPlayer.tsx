"use client";

import { useEffect, useState } from "react";
import AgoraRTC, {
  AgoraRTCProvider,
  useRTCClient,
  useJoin,
  useRemoteUsers,
} from "agora-rtc-react";

// اطلاعات اپلیکیشن آگورای شما
// در حالت واقعی، App ID باید در فایل env. ذخیره شود
const appId = "YOUR_AGORA_APP_ID"; // <--- اپلیکیشن آیدی آگورای خود را اینجا بگذارید

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
    token: null, // اگر پروژه در حالت تست است، null بگذارید. در تولید باید توکن بدهید.
  }, isJoined);

  useEffect(() => {
    // به محض لود شدن کامپوننت، دانشجو به کانال وصل می‌شود
    setIsJoined(true);
    return () => setIsJoined(false);
  }, []);

  // دریافت لیست تمام افرادی که در حال پخش ویدیو هستند (استاد)
  const remoteUsers = useRemoteUsers();
  
  // چون معمولاً فقط یک استاد داریم، اولین نفر را به عنوان استاد در نظر می‌گیریم
  const teacher = remoteUsers.find(user => user.hasVideo || user.hasAudio);

  if (!isJoined) {
    return <div className="text-neutral-500 animate-pulse">Connecting to secure stream...</div>;
  }

  if (!teacher) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
         <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-2xl">📡</div>
         <p className="text-white font-bold">Waiting for instructor...</p>
         <p className="text-neutral-500 text-xs mt-2">The video will appear here automatically.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black rounded-3xl overflow-hidden">
      {/* رندر کردن ویدیوی استاد */}
      {teacher.hasVideo ? (
        <VideoPlayer track={teacher.videoTrack} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-neutral-900">
           <span className="text-neutral-500">Instructor's camera is off</span>
        </div>
      )}

      {/* افکت‌های ظاهری و اطلاعات روی ویدیو */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
         <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
         <span className="text-white text-xs font-bold">LIVE</span>
      </div>
    </div>
  );
}

// Simple video player that attaches an Agora video track to a DOM element
function VideoPlayer({ track, className }: { track: any; className?: string }) {
  const ref = (node: HTMLDivElement | null) => {
    // store ref on the element itself for Agora's play
    if (node && track) {
      // play will attach a video element inside the node
      try {
        track.play(node);
      } catch (e) {
        // ignore
      }
    }
  };

  // cleanup when track changes/unmounts
  useEffect(() => {
    return () => {
      try {
        track && track.stop && track.stop();
      } catch (e) {
        // ignore
      }
    };
  }, [track]);

  return <div ref={ref} className={className} />;
}