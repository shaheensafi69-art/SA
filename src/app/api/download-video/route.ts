import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const videoUrl = searchParams.get("url");
    const filename = searchParams.get("filename") || "reel-video.mp4";

    if (!videoUrl) {
        return NextResponse.json({ error: "Missing video URL" }, { status: 400 });
    }

    try {
        const response = await fetch(videoUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            },
        });

        if (!response.ok) {
            return NextResponse.json({ error: `Failed to fetch video: ${response.statusText}` }, { status: response.status });
        }

        const contentType = response.headers.get("content-type") || "video/mp4";
        const arrayBuffer = await response.arrayBuffer();

        return new NextResponse(arrayBuffer, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                "Content-Disposition": `attachment; filename="${encodeURIComponent(filename)}"`,
                "Cache-Control": "public, max-age=3600",
            },
        });
    } catch (error: any) {
        console.error("Error downloading video stream:", error);
        return NextResponse.json({ error: "Failed to download video stream" }, { status: 500 });
    }
}
