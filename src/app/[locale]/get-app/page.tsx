import fs from "fs";
import path from "path";
import GetAppClient from "./GetAppClient";

export default function GetAppPage() {
  // ۱. مسیر پوشه اپلیکیشن‌ها
  const appDir = path.join(process.cwd(), "public", "app");
  let apkFiles: string[] = [];

  try {
    // ۲. بررسی وجود پوشه و خواندن فایل‌ها
    if (fs.existsSync(appDir)) {
      const files = fs.readdirSync(appDir);
      // فیلتر کردن فقط فایل‌های با پسوند apk
      apkFiles = files.filter((f) => f.endsWith(".apk"));
      
      // ۳. مرتب‌سازی نزولی (نسخه‌های جدیدتر بالاتر قرار می‌گیرند)
      apkFiles.sort((a, b) => 
        b.localeCompare(a, undefined, { numeric: true, sensitivity: "base" })
      );
    }
  } catch (error) {
    console.error("Error reading apk directory:", error);
  }

  // جداسازی جدیدترین نسخه و نسخه‌های قدیمی‌تر
  const latestApk = apkFiles.length > 0 ? apkFiles[0] : null;
  const olderApks = apkFiles.length > 1 ? apkFiles.slice(1) : [];

  return <GetAppClient latestApk={latestApk} olderApks={olderApks} />;
}