import { createClient } from "@/utils/supabase/client";

export interface DeviceActivity {
  id: string;
  student_id: string;
  device_name: string;
  country: string;
  city: string;
  ip_address: string;
  logged_in_at: string;
}

export function getDeviceDetails(): { deviceName: string; browser: string; os: string; type: "desktop" | "mobile" | "tablet" } {
  if (typeof window === "undefined" || !navigator) {
    return { deviceName: "Web Client", browser: "Browser", os: "Unknown OS", type: "desktop" };
  }

  const ua = navigator.userAgent;

  let browser = "Browser";
  if (ua.includes("Firefox/")) browser = "Firefox";
  else if (ua.includes("Edg/")) browser = "Microsoft Edge";
  else if (ua.includes("Chrome/") && !ua.includes("Edg/")) browser = "Google Chrome";
  else if (ua.includes("Safari/") && !ua.includes("Chrome/")) browser = "Apple Safari";
  else if (ua.includes("OPR/") || ua.includes("Opera/")) browser = "Opera";

  let os = "Desktop";
  if (/iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) os = "iPadOS";
  else if (/iPhone/.test(ua)) os = "iOS";
  else if (/Android/.test(ua)) os = "Android";
  else if (/Macintosh|Mac OS X/.test(ua)) os = "macOS";
  else if (/Windows NT/.test(ua)) os = "Windows";
  else if (/Linux/.test(ua)) os = "Linux";

  let type: "desktop" | "mobile" | "tablet" = "desktop";
  if (/iPad|tablet/i.test(ua) || os === "iPadOS") {
    type = "tablet";
  } else if (/Mobi|iPhone|Android/i.test(ua)) {
    type = "mobile";
  }

  const deviceName = `${browser} on ${os}`;
  return { deviceName, browser, os, type };
}

export async function recordDeviceActivity(userId: string): Promise<void> {
  if (typeof window === "undefined" || !userId) return;

  const supabase = createClient();
  const { deviceName } = getDeviceDetails();

  let ip = "127.0.0.1";
  let country = "Unknown Country";
  let city = "Unknown City";

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data.ip) ip = data.ip;
      if (data.country_name) country = data.country_name;
      if (data.city) city = data.city;
    }
  } catch {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) {
        const parts = tz.split("/");
        if (parts[1]) city = parts[1].replace(/_/g, " ");
        if (parts[0]) country = parts[0];
      }
    } catch {}
  }

  try {
    // Check if this device is already recorded for this user
    const { data: existingDevice, error: selectErr } = await supabase
      .from("device_activities")
      .select("id")
      .eq("student_id", userId)
      .eq("device_name", deviceName)
      .maybeSingle();

    if (selectErr) {
      console.warn("device_activities select check:", selectErr.message);
    }

    if (existingDevice) {
      // Update the existing device timestamp and location without duplicating
      await supabase
        .from("device_activities")
        .update({
          logged_in_at: new Date().toISOString(),
          ip_address: ip,
          country: country,
          city: city,
        })
        .eq("id", existingDevice.id);
    } else {
      // Insert new device activity record
      await supabase
        .from("device_activities")
        .insert({
          student_id: userId,
          device_name: deviceName,
          country: country,
          city: city,
          ip_address: ip,
          logged_in_at: new Date().toISOString(),
        });
    }
  } catch (e) {
    console.error("Failed to record device activity:", e);
  }
}

export async function fetchDeviceActivities(userId: string): Promise<DeviceActivity[]> {
  if (!userId) return [];
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("device_activities")
      .select("*")
      .eq("student_id", userId)
      .order("logged_in_at", { ascending: false });

    if (error) {
      console.warn("Error fetching device activities:", error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error("fetchDeviceActivities exception:", err);
    return [];
  }
}

export async function removeDeviceActivity(id: string): Promise<boolean> {
  const supabase = createClient();
  try {
    const { error } = await supabase
      .from("device_activities")
      .delete()
      .eq("id", id);
    return !error;
  } catch {
    return false;
  }
}
