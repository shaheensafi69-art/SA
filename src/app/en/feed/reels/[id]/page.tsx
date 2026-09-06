"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function SingleReelRedirect() {
    const params = useParams();
    const router = useRouter();
    const reelId = params?.id as string;

    useEffect(() => {
        if (reelId) {
            router.replace(`/en/feed/reels?id=${encodeURIComponent(reelId)}`);
        } else {
            router.replace("/en/feed/reels");
        }
    }, [reelId, router]);

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-[#030305] text-white">
            <div className="w-12 h-12 border-4 border-[#C2185B] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">Loading Reel...</p>
        </div>
    );
}
