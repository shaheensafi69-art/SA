import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const videoUrl = searchParams.get("url");
        const customFilename = searchParams.get("filename") || "safi-academy-reel.mp4";

        if (!videoUrl) {
            return NextResponse.json({ error: "Missing video URL" }, { status: 400 });
        }

        // Fetch the video file from Cloudflare R2 or CDN
        const response = await fetch(videoUrl);

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to fetch video: ${response.statusText}` },
                { status: response.status }
            );
        }

        // Sanitize filename
        const safeFilename = customFilename.replace(/[^a-zA-Z0-9._-]/g, "_");
        const filenameWithExt = safeFilename.endsWith(".mp4") ? safeFilename : `${safeFilename}.mp4`;

        // Get content type
        const contentType = response.headers.get("content-type") || "video/mp4";

        // Create response with proper download headers
        const headers = new Headers();
        headers.set("Content-Type", contentType);
        headers.set("Content-Disposition", `attachment; filename="${filenameWithExt}"`);
        headers.set("Cache-Control", "public, max-age=3600");

        const contentLength = response.headers.get("content-length");
        if (contentLength) {
            headers.set("Content-Length", contentLength);
        }

        return new NextResponse(response.body, {
            status: 200,
            headers,
        });
    } catch (error: any) {
        console.error("Video download error:", error);
        return NextResponse.json({ error: error.message || "Failed to download video" }, { status: 500 });
    }
}
