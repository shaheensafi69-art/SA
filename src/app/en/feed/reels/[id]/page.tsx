import { redirect } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ReelDetailPage({ params }: PageProps) {
    const { id } = await params;
    redirect(`/en/feed/reels?id=${id}`);
}
