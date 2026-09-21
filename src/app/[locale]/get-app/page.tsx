import { getAppDownloadsFromR2 } from "@/lib/r2";
import GetAppClient from "./GetAppClient";

// Revalidate every 60s from Cloudflare R2 bucket so new uploads appear automatically
export const revalidate = 60;

export default async function GetAppPage() {
  const downloads = await getAppDownloadsFromR2();

  return <GetAppClient downloads={downloads} />;
}