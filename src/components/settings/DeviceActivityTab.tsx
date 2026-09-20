"use client";

import { useEffect, useState } from "react";
import { 
  Laptop, Smartphone, Tablet, Globe, MapPin, 
  Clock, ShieldCheck, Trash2, RefreshCw, AlertCircle, CheckCircle2 
} from "lucide-react";
import { 
  fetchDeviceActivities, 
  removeDeviceActivity, 
  recordDeviceActivity, 
  getDeviceDetails, 
  DeviceActivity 
} from "@/utils/deviceActivity";

interface DeviceActivityTabProps {
  userId: string;
  locale: string;
  t: any;
  isRtl: boolean;
}

export default function DeviceActivityTab({ userId, locale, t, isRtl }: DeviceActivityTabProps) {
  const [devices, setDevices] = useState<DeviceActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const currentDetails = getDeviceDetails();

  useEffect(() => {
    loadActivities();
  }, [userId]);

  const loadActivities = async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      // Ensure current device is recorded/updated
      await recordDeviceActivity(userId);
      const data = await fetchDeviceActivities(userId);
      setDevices(data);
    } catch (e) {
      console.error("Error loading device activities:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveDevice = async (id: string) => {
    setActionId(id);
    try {
      const success = await removeDeviceActivity(id);
      if (success) {
        setDevices((prev) => prev.filter((d) => d.id !== id));
        setNotification(t.settings?.deviceRemoved || "Device session removed.");
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (e) {
      console.error("Failed to remove device:", e);
    } finally {
      setActionId(null);
    }
  };

  const getDeviceIcon = (deviceName: string) => {
    const lower = deviceName.toLowerCase();
    if (lower.includes("mobile") || lower.includes("ios") || lower.includes("android") || lower.includes("iphone")) {
      return <Smartphone className="w-5 h-5 text-pink-400" />;
    }
    if (lower.includes("tablet") || lower.includes("ipad")) {
      return <Tablet className="w-5 h-5 text-amber-400" />;
    }
    return <Laptop className="w-5 h-5 text-indigo-400" />;
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            {t.settings?.activityLog || "Device Activities"}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-medium mt-1">
            {t.settings?.activeDevices || "Active Devices & Sessions"}
          </p>
        </div>
        <button
          type="button"
          onClick={loadActivities}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-bold transition-all border border-white/10 shrink-0 self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-amber-400" : ""}`} />
          <span>{isLoading ? "Refreshing..." : "Refresh"}</span>
        </button>
      </div>

      {notification && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Current Device Highlight Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-neutral-900/80 to-black/60 border border-amber-500/30 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              {currentDetails.type === "mobile" ? (
                <Smartphone className="w-6 h-6 text-amber-400" />
              ) : currentDetails.type === "tablet" ? (
                <Tablet className="w-6 h-6 text-amber-400" />
              ) : (
                <Laptop className="w-6 h-6 text-amber-400" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-white font-black text-sm sm:text-base">
                  {currentDetails.deviceName}
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {t.settings?.thisDevice || "This Device (Active Now)"}
                </span>
              </div>
              <p className="text-neutral-400 text-xs mt-1 flex items-center gap-2">
                <span>{currentDetails.browser}</span>
                <span>•</span>
                <span>{currentDetails.os}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Devices List */}
      <div className="space-y-3">
        <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 px-1">
          {t.settings?.activeDevices || "Registered Devices"}
        </h3>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="h-20 rounded-2xl bg-white/5 animate-pulse border border-white/5"></div>
            ))}
          </div>
        ) : devices.length === 0 ? (
          <div className="text-center py-12 rounded-2xl bg-black/20 border border-white/5">
            <ShieldCheck className="w-10 h-10 text-neutral-600 mx-auto mb-2 opacity-50" />
            <p className="text-neutral-500 text-xs font-bold">
              {t.settings?.noDevicesFound || "No active devices recorded yet"}
            </p>
          </div>
        ) : (
          devices.map((device) => {
            const isThisDevice = device.device_name === currentDetails.deviceName;

            return (
              <div
                key={device.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isThisDevice
                    ? "bg-neutral-900/60 border-amber-500/30"
                    : "bg-black/30 border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    {getDeviceIcon(device.device_name)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-white font-black text-xs sm:text-sm">
                        {device.device_name}
                      </h4>
                      {isThisDevice && (
                        <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {t.settings?.thisDevice || "Current"}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-neutral-400">
                      {(device.city || device.country) && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-neutral-500" />
                          {[device.city, device.country].filter(Boolean).join(", ")}
                        </span>
                      )}
                      {device.ip_address && (
                        <span className="flex items-center gap-1 font-mono text-[10px] text-neutral-500">
                          <Globe className="w-3 h-3 text-neutral-500" />
                          {device.ip_address}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-neutral-500">
                        <Clock className="w-3 h-3 text-neutral-500" />
                        {device.logged_in_at
                          ? new Date(device.logged_in_at).toLocaleDateString(locale, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Recently"}
                      </span>
                    </div>
                  </div>
                </div>

                {!isThisDevice && (
                  <button
                    type="button"
                    disabled={actionId === device.id}
                    onClick={() => handleRemoveDevice(device.id)}
                    className="self-end sm:self-center px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-50 shrink-0"
                    title={t.settings?.revokeDevice || "Remove device"}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t.settings?.revokeDevice || "Remove"}</span>
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
