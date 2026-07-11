"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function LiveMeetRoom() {
  const params = useParams();
  const router = useRouter();
  const classId = params.classId as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const [className, setClassName] = useState("Loading Class...");
  
  // استیت‌های کنترل سخت‌افزار
  const [micOn, setMicOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);

  const [remoteUsers, setRemoteUsers] = useState<any[]>([]);

  // رفرنس‌ها برای اتصال ویدیو، صدا و صفحه نمایش
  const agoraEngineRef = useRef<any>(null);
  const localVideoTrackRef = useRef<any>(null);
  const localAudioTrackRef = useRef<any>(null);
  const localScreenTrackRef = useRef<any>(null); // رفرنس اختصاصی برای Screen Share
  const localVideoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    const initMeeting = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        router.push("/en/login");
        return;
      }
      
      const userId = session.user.id;

      const { data: classData } = await supabase
        .from("class_groups")
        .select("class_name")
        .eq("id", classId)
        .single();
        
      if (classData && isMounted) {
        setClassName(classData.class_name);
      }

      try {
        if (typeof window !== "undefined") {
          const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;
          
          const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
          agoraEngineRef.current = client;

          client.on("user-published", async (user: any, mediaType: "audio" | "video") => {
            await client.subscribe(user, mediaType);
            
            if (mediaType === "video") {
              setRemoteUsers((prev) => {
                if (prev.some(u => u.uid === user.uid)) return prev;
                return [...prev, user];
              });
            }
            if (mediaType === "audio") {
              user.audioTrack?.play();
            }
          });

          client.on("user-unpublished", (user: any, mediaType: "audio" | "video") => {
            if (mediaType === "video") {
              setRemoteUsers((prev) => prev.filter((u) => u.uid !== user.uid));
            }
          });

          const tokenRes = await fetch('/api/agora/rtc-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ channelName: classId, account: userId })
          });
          const tokenData = await tokenRes.json();

          if (tokenRes.ok) {
            const appId = process.env.NEXT_PUBLIC_AGORA_APP_KEY?.split("#")[0] || "YOUR_APP_ID";
            await client.join(appId, classId, tokenData.token, userId);
            setIsJoined(true);
          }
        }
      } catch (err) {
        console.error("Agora Video Initialization Failed:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    if (classId) initMeeting();

    return () => {
      isMounted = false;
      // خروج امن و بستن تمام سخت‌افزارها
      if (localVideoTrackRef.current) localVideoTrackRef.current.close();
      if (localAudioTrackRef.current) localAudioTrackRef.current.close();
      if (localScreenTrackRef.current) localScreenTrackRef.current.close();
      if (agoraEngineRef.current) agoraEngineRef.current.leave();
    };
  }, [classId, router]);

  // هندلر کمره
  const toggleCamera = async () => {
    if (!agoraEngineRef.current) return;
    try {
      const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;
      
      if (cameraOn) {
        localVideoTrackRef.current?.close();
        await agoraEngineRef.current.unpublish(localVideoTrackRef.current);
        localVideoTrackRef.current = null;
        setCameraOn(false);
      } else {
        // اگر اسکرین‌شیر روشن است، کمره را روشن نکنیم تا تداخل ایجاد نشود
        if (screenSharing) {
          alert("Please stop screen sharing before turning on the camera.");
          return;
        }

        const videoTrack = await AgoraRTC.createCameraVideoTrack();
        localVideoTrackRef.current = videoTrack;
        
        if (localVideoContainerRef.current) {
          videoTrack.play(localVideoContainerRef.current);
        }
        await agoraEngineRef.current.publish(videoTrack);
        setCameraOn(true);
      }
    } catch (err) {
      console.error("Camera Error:", err);
      alert("Could not access camera. Please check permissions.");
    }
  };

  // هندلر مایک
  const toggleMic = async () => {
    if (!agoraEngineRef.current) return;
    try {
      const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;
      
      if (micOn) {
        localAudioTrackRef.current?.close();
        await agoraEngineRef.current.unpublish(localAudioTrackRef.current);
        localAudioTrackRef.current = null;
        setMicOn(false);
      } else {
        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        localAudioTrackRef.current = audioTrack;
        await agoraEngineRef.current.publish(audioTrack);
        setMicOn(true);
      }
    } catch (err) {
      console.error("Mic Error:", err);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  // 🔥 هندلر پیشرفته Share Screen 🔥
  const toggleScreenShare = async () => {
    if (!agoraEngineRef.current) return;
    try {
      const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;

      if (screenSharing) {
        // خاموش کردن اسکرین‌شیر
        if (localScreenTrackRef.current) {
          localScreenTrackRef.current.close();
          await agoraEngineRef.current.unpublish(localScreenTrackRef.current);
          localScreenTrackRef.current = null;
        }
        setScreenSharing(false);
      } else {
        // اگر کمره روشن است، ابتدا کمره را ببندیم
        if (cameraOn) {
          localVideoTrackRef.current?.close();
          await agoraEngineRef.current.unpublish(localVideoTrackRef.current);
          localVideoTrackRef.current = null;
          setCameraOn(false);
        }

        // ایجاد ترک اسکرین‌شیر
        const screenTrack = await AgoraRTC.createScreenVideoTrack({
          encoderConfig: "1080p_1",
          optimizationMode: "detail"
        }, "disable"); // "disable" برای اینکه فقط تصویر شیر شود (صدا از مایک می‌رود)

        localScreenTrackRef.current = screenTrack;

        // هندل کردن زمانی که کاربر از طریق نوار مرورگر اشتراک را متوقف می‌کند
        screenTrack.on("track-ended", async () => {
          await agoraEngineRef.current.unpublish(screenTrack);
          screenTrack.close();
          localScreenTrackRef.current = null;
          setScreenSharing(false);
        });

        if (localVideoContainerRef.current) {
          screenTrack.play(localVideoContainerRef.current);
        }
        
        await agoraEngineRef.current.publish(screenTrack);
        setScreenSharing(true);
      }
    } catch (err) {
      console.error("Screen Share Error:", err);
    }
  };

  const handleLeave = () => {
    router.push(`/en/dashboard/groups/${classId}`);
  };

  return (
    // 🔥 کلاس‌های واکنش‌گرا: در موبایل فول اسکرین (fixed) و در دسکتاپ فیت شده در سایدبار (relative h-full) 🔥
    <div className="fixed inset-0 z-[100] lg:relative lg:inset-auto lg:z-10 lg:w-full lg:h-full bg-[#050508] font-sans flex flex-col overflow-hidden select-none">
      
      {/* ================= هدر کلاس زنده ================= */}
      <header className="h-16 px-4 sm:px-6 flex justify-between items-center bg-black/50 backdrop-blur-xl border-b border-white/5 z-20 shrink-0">
        <div className="flex items-center gap-3">
          {/* دکمه بازگشت مخصوص موبایل */}
          <button onClick={handleLeave} className="lg:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white active:scale-95 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
          </button>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 text-red-500 animate-pulse">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6"></circle></svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-sm sm:text-base tracking-wide line-clamp-1">{className}</h1>
              <p className="text-neutral-500 text-[9px] sm:text-[10px] uppercase tracking-widest font-bold">End-to-End Encrypted</p>
            </div>
          </div>
        </div>

        <Link href={`/en/dashboard/groups/${classId}`} className="text-[10px] sm:text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors px-3 sm:px-4 py-2 bg-indigo-500/10 rounded-lg whitespace-nowrap">
          Open Chat
        </Link>
      </header>

      {/* ================= بخش نمایش ویدیوها (Fluid Grid) ================= */}
      <main className="flex-1 relative p-2 sm:p-4 flex flex-col overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-neutral-400 text-xs font-bold tracking-widest uppercase">Connecting to Satellite...</p>
          </div>
        ) : (
          <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 auto-rows-fr">
            
            {/* ویدیوی/صفحه شما (Local User) */}
            <div className="relative bg-[#0d0d12] rounded-2xl sm:rounded-3xl border border-white/5 overflow-hidden flex items-center justify-center shadow-lg group">
              {!(cameraOn || screenSharing) && (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-400 mb-3">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </div>
                  <p className="text-neutral-500 text-[10px] sm:text-xs font-medium">Camera is Off</p>
                </div>
              )}
              
              {/* کانتینر برای رندر ویدیوی محلی (کمره یا اسکرین شیر) */}
              <div ref={localVideoContainerRef} className="absolute inset-0 w-full h-full object-cover"></div>
              
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-black/60 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-white/10 flex items-center gap-2 z-10">
                <span className="text-[10px] sm:text-xs text-white font-medium tracking-wide">
                  {screenSharing ? "You (Presenting)" : "You"}
                </span>
                {!micOn && <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4l16 16"></path></svg>}
              </div>
            </div>

            {/* ویدیوهای سایر کاربران (Remote Users) */}
            {remoteUsers.map((user) => (
              <div key={user.uid} className="relative bg-[#0d0d12] rounded-2xl sm:rounded-3xl border border-white/5 overflow-hidden flex items-center justify-center shadow-lg">
                <div 
                  className="absolute inset-0 w-full h-full object-cover"
                  ref={(element) => {
                    // اتصال خودکار ویدیوی دریافت شده به عنصر Div
                    if (element && user.videoTrack) {
                      user.videoTrack.play(element);
                    }
                  }}
                ></div>
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-black/60 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-white/10 flex items-center gap-2 z-10">
                  <span className="text-[10px] sm:text-xs text-white font-medium tracking-wide">Participant</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ================= کنترل پنل (Floating Controls) ================= */}
      <footer className="h-24 pb-4 flex justify-center items-center shrink-0 z-20 pointer-events-none">
        <div className="bg-[#111116]/90 backdrop-blur-2xl border border-white/10 px-4 sm:px-6 py-3 rounded-[2rem] flex items-center gap-2 sm:gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto transition-transform hover:scale-105">
          
          {/* دکمه میکروفون */}
          <button onClick={toggleMic} className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${micOn ? "bg-white/10 hover:bg-white/20 text-white" : "bg-red-500/20 hover:bg-red-500/30 text-red-500"}`}>
            {micOn ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4l16 16"></path></svg>
            )}
          </button>

          {/* دکمه دوربین */}
          <button onClick={toggleCamera} className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${cameraOn ? "bg-white/10 hover:bg-white/20 text-white" : "bg-red-500/20 hover:bg-red-500/30 text-red-500"}`}>
            {cameraOn ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4l16 16"></path></svg>
            )}
          </button>

          {/* دکمه اشتراک صفحه (Screen Share) */}
          <button onClick={toggleScreenShare} className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${screenSharing ? "bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]" : "bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"}`}>
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </button>

          <div className="w-px h-6 sm:h-8 bg-white/10 mx-1 sm:mx-2"></div>

          {/* دکمه خروج (Leave) */}
          <button onClick={handleLeave} className="w-14 h-10 sm:w-24 sm:h-12 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center font-bold text-[10px] sm:text-xs tracking-wider transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)]">
            Leave
          </button>

        </div>
      </footer>
    </div>
  );
}