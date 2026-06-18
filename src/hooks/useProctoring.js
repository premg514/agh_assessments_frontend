import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useProctoring = ({ enableProctoring = false, onViolation }) => {
  const [showFullscreenModal, setShowFullscreenModal] = useState(false);

  const addViolation = (reason) => {
    onViolation?.({ reason });
  };

  // ENTER FULLSCREEN
  const enterFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
      setShowFullscreenModal(false);
    } catch (err) {
      toast.error("Fullscreen permission required to continue the test.");
    }
  };

  // FULLSCREEN EXIT
  useEffect(() => {
    if (!enableProctoring) return;

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setShowFullscreenModal(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [enableProctoring]);

  // TAB SWITCH
  useEffect(() => {
    if (!enableProctoring) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        addViolation("Tab switch");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [enableProctoring]);

  // WINDOW FOCUS OUT
  useEffect(() => {
    if (!enableProctoring) return;

    const handleBlur = () => {
      addViolation("Window focus lost");
    };

    window.addEventListener("blur", handleBlur);

    return () => window.removeEventListener("blur", handleBlur);
  }, [enableProctoring]);

  useEffect(() => {
    if (!enableProctoring) return;

    if (!document.fullscreenElement) {
      setShowFullscreenModal(true);
    }
  }, [enableProctoring]);

  // DISABLE INSPECT
  useEffect(() => {
    if (!enableProctoring) return;

    const handleKeyDown = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
        toast.error("Inspect tools are not allowed during the test.");
      }
    };

    const disableRightClick = (e) => {
      e.preventDefault();
      toast.error("Right click is disabled during the test.");
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, [enableProctoring]);

  return {
    showFullscreenModal,
    enterFullscreen,
  };
};
