import { useState, useEffect, useRef, useCallback } from "react";

export function useConnectionStatus(
  serverPingUrl = `${import.meta.env.VITE_BASE_URL}/health`,
  pingInterval = 10000,
  minSpeedMbps = 0,
  speedTestUrl = "/favicon.ico",
) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isServerReachable, setIsServerReachable] = useState(true);
  const [speedMbps, setSpeedMbps] = useState(null);

  const pingIntervalRef = useRef(null);
  const speedIntervalRef = useRef(null);

  // ── 1. Browser online / offline events ──────────────────────────────────
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // ── 2. Server reachability ping ──────────────────────────────────────────
  const pingServer = useCallback(async () => {
    try {
      const res = await fetch(`${serverPingUrl}?_=${Date.now()}`, {
        method: "HEAD",
        cache: "no-store",
      });
      setIsServerReachable(res.ok);
    } catch {
      setIsServerReachable(false);
    }
  }, [serverPingUrl]);

  useEffect(() => {
    pingServer();
    pingIntervalRef.current = setInterval(pingServer, pingInterval);
    return () => clearInterval(pingIntervalRef.current);
  }, [pingServer, pingInterval]);

  // ── 3. Speed measurement ─────────────────────────────────────────────────
  const measureSpeed = useCallback(async () => {
    // 3a. Network Information API (Chrome / Android, not available in Firefox/Safari)
    if (navigator.connection && navigator.connection.downlink) {
      setSpeedMbps(navigator.connection.downlink);
      return;
    }

    // 3b. Fallback: timed fetch to estimate throughput
    try {
      const url = `${speedTestUrl}?speed_test=1&_=${Date.now()}`;
      const startTime = performance.now();
      const response = await fetch(url, { cache: "no-store" });
      const blob = await response.blob();
      const endTime = performance.now();

      const fileSizeBits = blob.size * 8;
      const durationSeconds = (endTime - startTime) / 1000;
      const mbps = fileSizeBits / durationSeconds / 1_000_000;

      setSpeedMbps(parseFloat(mbps.toFixed(2)));
    } catch {
      // If fetch fails the offline/server_down state will handle it
    }
  }, [speedTestUrl]);

  // Also listen to the Network Information API's change event
  useEffect(() => {
    if (navigator.connection) {
      const handleChange = () => {
        if (navigator.connection.downlink) {
          setSpeedMbps(navigator.connection.downlink);
        }
      };
      navigator.connection.addEventListener("change", handleChange);
      return () =>
        navigator.connection.removeEventListener("change", handleChange);
    }
  }, []);

  useEffect(() => {
    if (minSpeedMbps > 0) {
      measureSpeed();
      speedIntervalRef.current = setInterval(measureSpeed, pingInterval);
      return () => clearInterval(speedIntervalRef.current);
    }
  }, [measureSpeed, minSpeedMbps, pingInterval]);

  // ── 4. Derived state ─────────────────────────────────────────────────────
  const isSlowConnection =
    minSpeedMbps > 0 && speedMbps !== null && speedMbps < minSpeedMbps;

  const status = !isOnline
    ? "offline"
    : !isServerReachable
      ? "server_down"
      : isSlowConnection
        ? "slow"
        : "online";

  return { isOnline, isServerReachable, speedMbps, isSlowConnection, status };
}
