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
  const [className, setClassName] = useState("Loading...");
  
  // استیت‌های کنترل سخت‌افزار
  const [micOn, setMicOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);

  // استیت‌های کاربران ریموت
  const [remoteUsers, setRemoteUsers] = useState<any[]>([]);
  const [activeSpeakerId, setActiveSpeakerId] = useState<string | null>(null);

  // رفرنس‌ها
  const agoraEngineRef = useRef<any>(null);
  const localVideoTrackRef = useRef<any>(null);
  const localAudioTrackRef = useRef<any>(null);
  const localScreenTrackRef = useRef<any>(null);
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

          // مدیریت کاربران ورودی
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

          // تشخیص اسپیکر فعال (برای هایلایت کردن)
          client.enableAudioVolumeIndicator();
          client.on("volume-indicator", (volumes) => {
            if (volumes.length > 0) {
              // کاربری که بلندترین صدا را دارد
              const loudest = volumes.reduce((prev, current) => (prev.level > current.level) ? prev : current);
              if (loudest.level > 5) {
                setActiveSpeakerId(String(loudest.uid));
              }
            } else {
              setActiveSpeakerId(null);
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
      if (localVideoTrackRef.current) localVideoTrackRef.current.close();
      if (localAudioTrackRef.current) localAudioTrackRef.current.close();
      if (localScreenTrackRef.current) localScreenTrackRef.current.close();
      if (agoraEngineRef.current) agoraEngineRef.current.leave();
    };
  }, [classId, router]);

  // 🔥 هندلر کمره (حل مشکل نشان ندادن تصویر) 🔥
  const toggleCamera = async () => {
    if (!agoraEngineRef.current || !isJoined) {
      alert("Still connecting to the server. Please wait...");
      return;
    }

    try {
      const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;
      
      if (cameraOn) {
        // خاموش کردن
        localVideoTrackRef.current?.stop();
        localVideoTrackRef.current?.close();
        await agoraEngineRef.current.unpublish(localVideoTrackRef.current);
        localVideoTrackRef.current = null;
        setCameraOn(false);
      } else {
        if (screenSharing) {
          alert("Please stop screen sharing before turning on the camera.");
          return;
        }

        // روشن کردن (تضمین پخش در کانتینر)
        const videoTrack = await AgoraRTC.createCameraVideoTrack();
        localVideoTrackRef.current = videoTrack;
        
        await agoraEngineRef.current.publish(videoTrack);
        setCameraOn(true);

        // استفاده از setTimeout برای اطمینان از رندر شدن DOM
        setTimeout(() => {
          if (localVideoContainerRef.current && localVideoTrackRef.current) {
            localVideoTrackRef.current.play(localVideoContainerRef.current);
          }
        }, 100);
      }
    } catch (err) {
      console.error("Camera Error:", err);
      alert("Could not access camera. Check your browser permissions.");
      setCameraOn(false);
    }
  };

  const toggleMic = async () => {
    if (!agoraEngineRef.current || !isJoined) return;
    try {
      const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;
      
      if (micOn) {
        localAudioTrackRef.current?.stop();
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
      alert("Could not access microphone.");
      setMicOn(false);
    }
  };

  const toggleScreenShare = async () => {
    if (!agoraEngineRef.current || !isJoined) return;
    try {
      const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;

      if (screenSharing) {
        if (localScreenTrackRef.current) {
          localScreenTrackRef.current.stop();
          localScreenTrackRef.current.close();
          await agoraEngineRef.current.unpublish(localScreenTrackRef.current);
          localScreenTrackRef.current = null;
        }
        setScreenSharing(false);
      } else {
        if (cameraOn) {
          localVideoTrackRef.current?.stop();
          localVideoTrackRef.current?.close();
          await agoraEngineRef.current.unpublish(localVideoTrackRef.current);
          localVideoTrackRef.current = null;
          setCameraOn(false);
        }

        const screenTrack = await AgoraRTC.createScreenVideoTrack({
          encoderConfig: "1080p_1",
          optimizationMode: "detail"
        }, "disable");

        localScreenTrackRef.current = screenTrack;

        screenTrack.on("track-ended", async () => {
          await agoraEngineRef.current.unpublish(screenTrack);
          screenTrack.close();
          localScreenTrackRef.current = null;
          setScreenSharing(false);
        });

        await agoraEngineRef.current.publish(screenTrack);
        setScreenSharing(true);

        setTimeout(() => {
          if (localVideoContainerRef.current && localScreenTrackRef.current) {
            localScreenTrackRef.current.play(localVideoContainerRef.current);
          }
        }, 100);
      }
    } catch (err) {
      console.error("Screen Share Error:", err);
      setScreenSharing(false);
    }
  };

  const handleLeave = () => {
    router.push(`/en/dashboard/groups/${classId}`);
  };

  // 🔥 محاسبه هوشمند Layout (اگر اسکرین‌شیر فعال باشد، گرید تغییر می‌کند) 🔥
  const isPresentationMode = screenSharing || remoteUsers.some(u => u._videoTrack?._trackMediaType === "screen");

  return (
    <div className="fixed inset-0 z-[100] lg:relative lg:inset-auto lg:z-10 lg:w-full lg:h-full bg-[#050508] font-sans flex flex-col overflow-hidden select-none">
      
      {/* ================= هدر ================= */}
      <header className="h-16 sm:h-20 px-4 sm:px-6 flex justify-between items-center bg-black/40 backdrop-blur-2xl border-b border-white/5 z-20 shrink-0 shadow-lg">
        <div className="flex items-center gap-4">
          <button onClick={handleLeave} className="lg:hidden w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-red-500/10 text-red-500 border border-red-500/20">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6"></circle></svg>
            </div>
            <div>
              <h1 className="text-white font-black text-sm sm:text-base tracking-wide line-clamp-1">{className}</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                <p className="text-green-400 text-[9px] sm:text-[10px] uppercase tracking-widest font-bold">End-to-End Encrypted</p>
              </div>
            </div>
          </div>
        </div>

        <Link href={`/en/dashboard/groups/${classId}`} className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 font-bold rounded-lg transition-colors border border-indigo-500/20 text-[10px] sm:text-xs uppercase tracking-widest">
          <svg className="w-4 h-4 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
          Open Chat
        </Link>
      </header>

      {/* ================= فضای رندر ویدیو ================= */}
      <main className="flex-1 relative p-2 sm:p-4 overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-indigo-400 text-xs font-black tracking-widest uppercase animate-pulse">Initializing Stream...</p>
          </div>
        ) : (
          <div className={`w-full h-full flex gap-3 sm:gap-4 transition-all duration-500 ${isPresentationMode ? "flex-col lg:flex-row" : ""}`}>
            
            {/* 🔥 کانتینر اصلی (مخصوص حالت گرید یا پرزنتیشن) 🔥 */}
            <div className={`flex-1 transition-all duration-500 ${isPresentationMode ? "lg:w-3/4" : "w-full"}`}>
              <div className={`w-full h-full grid gap-3 sm:gap-4 ${isPresentationMode ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr"}`}>
                
                {/* ویدیوی/صفحه شما (Local User) */}
                <div className={`relative bg-[#0d0d12] border overflow-hidden flex items-center justify-center transition-all duration-300 shadow-xl
                  ${isPresentationMode && screenSharing ? "rounded-xl border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.2)]" : "rounded-2xl sm:rounded-3xl border-white/5"}
                  ${!isPresentationMode && !cameraOn && !screenSharing ? "group hover:border-white/10" : ""}
                `}>
                  {!(cameraOn || screenSharing) && (
                    <div className="flex flex-col items-center animate-[fadeIn_0.3s_ease-out]">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-full flex items-center justify-center text-white/20 mb-3 border border-white/5 group-hover:bg-white/10 transition-colors">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                      </div>
                      <p className="text-neutral-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Camera Off</p>
                    </div>
                  )}
                  
                  {/* Div واقعی که آگورا تصویر را در آن می‌سازد */}
                  <div 
                    ref={localVideoContainerRef} 
                    className="absolute inset-0 w-full h-full [&>div]:w-full [&>div]:h-full [&>div>video]:object-cover"
                  ></div>
                  
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 z-10">
                    <span className="text-[10px] sm:text-xs text-white font-bold tracking-wide">
                      {screenSharing ? "You (Presenting)" : "You"}
                    </span>
                    {!micOn && <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4l16 16"></path></svg>}
                  </div>
                </div>

                {/* رندر کاربران ریموت اگر در حالت پرزنتیشن نباشیم */}
                {!isPresentationMode && remoteUsers.map((user) => (
                  <div key={user.uid} className={`relative bg-[#0d0d12] rounded-2xl sm:rounded-3xl border overflow-hidden flex items-center justify-center shadow-lg transition-all duration-300
                    ${activeSpeakerId === String(user.uid) ? "border-green-500/50 shadow-[0_0_20px_rgba(74,222,128,0.2)] scale-[1.02]" : "border-white/5"}
                  `}>
                    <div 
                      className="absolute inset-0 w-full h-full [&>div]:w-full [&>div]:h-full [&>div>video]:object-cover"
                      ref={(el) => {
                        if (el && user.videoTrack && !el.hasChildNodes()) {
                          user.videoTrack.play(el);
                        }
                      }}
                    ></div>
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 z-10">
                      <span className="text-[10px] sm:text-xs text-white font-bold tracking-wide">Participant {user.uid.toString().substring(0,4)}</span>
                      {activeSpeakerId === String(user.uid) && <span className="flex gap-0.5 items-end h-3"><span className="w-0.5 h-1.5 bg-green-500 animate-[bounce_1s_infinite]"></span><span className="w-0.5 h-3 bg-green-500 animate-[bounce_1s_infinite_0.2s]"></span><span className="w-0.5 h-2 bg-green-500 animate-[bounce_1s_infinite_0.4s]"></span></span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 🔥 سایدبار کشویی برای کاربران ریموت (فقط در حالت پرزنتیشن ظاهر می‌شود) 🔥 */}
            {isPresentationMode && (
              <div className="w-full lg:w-1/4 h-32 lg:h-full overflow-x-auto lg:overflow-y-auto flex lg:flex-col gap-3 sm:gap-4 custom-scrollbar pr-2">
                {remoteUsers.map((user) => (
                  <div key={user.uid} className="relative bg-[#0d0d12] shrink-0 w-40 lg:w-full h-full lg:h-48 rounded-xl border border-white/5 overflow-hidden shadow-lg">
                    <div 
                      className="absolute inset-0 w-full h-full [&>div]:w-full [&>div]:h-full [&>div>video]:object-cover"
                      ref={(el) => {
                        if (el && user.videoTrack && !el.hasChildNodes()) {
                          user.videoTrack.play(el);
                        }
                      }}
                    ></div>
                    <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 z-10">
                      <span className="text-[9px] text-white font-bold">User {user.uid.toString().substring(0,4)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}
      </main>

      {/* ================= کنترل پنل (Floating Controls) ================= */}
      <footer className="h-24 pb-4 flex justify-center items-center shrink-0 z-20 pointer-events-none relative">
        <div className="bg-[#111116]/90 backdrop-blur-2xl border border-white/10 px-4 sm:px-6 py-2.5 sm:py-3 rounded-[2rem] flex items-center gap-2 sm:gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto transition-transform hover:scale-105">
          
          <button onClick={toggleMic} className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all ${micOn ? "bg-white/10 hover:bg-white/20 text-white" : "bg-red-500/20 hover:bg-red-500/30 text-red-500"}`}>
            {micOn ? (
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
            ) : (
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4l16 16"></path></svg>
            )}
          </button>

          <button onClick={toggleCamera} className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all ${cameraOn ? "bg-white/10 hover:bg-white/20 text-white" : "bg-red-500/20 hover:bg-red-500/30 text-red-500"}`}>
            {cameraOn ? (
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            ) : (
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4l16 16"></path></svg>
            )}
          </button>

          <button onClick={toggleScreenShare} className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all ${screenSharing ? "bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.6)] scale-110" : "bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"}`}>
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </button>

          <div className="w-px h-6 sm:h-8 bg-white/10 mx-1 sm:mx-2"></div>

          <button onClick={handleLeave} className="w-16 h-12 sm:w-24 sm:h-14 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center font-bold text-[10px] sm:text-xs tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.8)]">
            Leave
          </button>

        </div>
      </footer>
    </div>
  );
}