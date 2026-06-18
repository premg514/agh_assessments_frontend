import { useState, useEffect, useRef } from "react";
import { useConnectionStatus } from "../../hooks/useConnectionAlert";

/**
 * ConnectionAlert
 *
 * Drop this anywhere near the root of your app (e.g. in App.jsx).
 *
 * Props:
 *   serverPingUrl  {string}  URL to HEAD-ping for server health (default: "/favicon.ico")
 *   speedTestUrl   {string}  URL to fetch for speed measurement (default: "/favicon.ico")
 *   pingInterval   {number}  Polling interval in ms (default: 10000)
 *   autoDismiss    {number}  Ms before "restored" banner auto-hides (default: 3000)
 *   minSpeedMbps   {number}  Show slow-connection alert below this speed; 0 = disabled (default: 1)
 *
 * Usage examples:
 *   <ConnectionAlert />                         // basic online/offline + server
 *   <ConnectionAlert minSpeedMbps={2} />        // also warn if speed < 2 Mbps
 *   <ConnectionAlert minSpeedMbps={5} pingInterval={5000} />
 */
export default function ConnectionAlert({
  //serverPingUrl = "/favicon.ico",
  serverPingUrl = `${import.meta.env.VITE_BASE_URL}/health`,
  speedTestUrl = "/favicon.ico",
  pingInterval = 10000,
  autoDismiss = 3000,
  minSpeedMbps = 10,
}) {
  // status is all we need — no speedMbps required in this component
  const { status } = useConnectionStatus(
    serverPingUrl,
    pingInterval,
    minSpeedMbps,
    speedTestUrl,
  );

  const prevStatusRef = useRef(status);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const prev = prevStatusRef.current;
    prevStatusRef.current = status;

    if (prev === status) return;

    if (status === "offline") {
      setAlert({
        type: "error",
        message: "⚠️  Internet connection lost. Please check your network.",
      });
    } else if (status === "server_down") {
      setAlert({
        type: "error",
        message: "⚠️  Make sure you are having stable internet",
      });
    } else if (status === "slow") {
      setAlert({
        type: "warning",
        message:
          "🐢  Slow internet connection detected. Please check your network.",
      });
      const timer = setTimeout(() => setAlert(null), autoDismiss);
      return () => clearTimeout(timer);
    } else if (status === "online") {
      if (prev === "offline" || prev === "server_down" || prev === "slow") {
        setAlert({
          type: "success",
          message: "✅  Connection restored. You're back online.",
        });
        const timer = setTimeout(() => setAlert(null), autoDismiss);
        return () => clearTimeout(timer);
      }
    }
  }, [status, autoDismiss]);

  if (!alert) return null;

  return (
    <>
      <style>{styles}</style>
      <div
        className={`connection-alert connection-alert--${alert.type}`}
        role="alert"
        aria-live="assertive"
      >
        <span className="connection-alert__message">{alert.message}</span>
        <button
          className="connection-alert__close"
          onClick={() => setAlert(null)}
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </>
  );
}

const styles = `
  .connection-alert {
    position: fixed;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.18);
    font-size: 0.95rem;
    font-weight: 500;
    min-width: 320px;
    max-width: 90vw;
    animation: ca-slide-in 0.3s ease;
  }

  /* 🔴 Offline / server down */
  .connection-alert--error {
    background: #fff3cd;
    border: 1px solid #ffc107;
    color: #856404;
  }

  /* 🟠 Slow connection */
  .connection-alert--warning {
    background: #fff0e0;
    border: 1px solid #fd7e14;
    color: #7d3c00;
  }

  /* 🟢 Restored */
  .connection-alert--success {
    background: #d1e7dd;
    border: 1px solid #198754;
    color: #0f5132;
  }

  .connection-alert__message {
    flex: 1;
  }

  .connection-alert__close {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: inherit;
    padding: 0 0.25rem;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .connection-alert__close:hover {
    opacity: 1;
  }

  @keyframes ca-slide-in {
    from { opacity: 0; top: 0; }
    to   { opacity: 1; top: 1rem; }
  }
`;
