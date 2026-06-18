import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  Container,
  ButtonGroup,
  MainSectionforAssessments,
  QuestionContent,
  PaginationWrapper,
  SidebarWrapper,
  FooterWrapper,
  ToggleSidebar,
} from "../quizzes/TestPages/index.styles";
import TestSubmitConfirmationComponent from "../../component/test-submit-confirmation/test-submit-confirmation-component";
import { useDispatch, useSelector } from "react-redux";
import FlashoutPageComponent from "../../component/flash-out-page/flash-out-page-component";
import { AppContext } from "../../context/AppContext";
import Navbar from "../quizzes/TestPages/top-section/TopSection";
import McqAttempt from "./Mcq/McqAttempt";
import {
  PreviewButtonStyle,
  QuestionWrapper,
  Button,
} from "../user/test-list-user/style";
import { AssessmentQuestionsSideBar } from "./Sidebar/Sidebar";
import {
  changeQuestion,
  handleClickNext,
  handleClickPrev,
  increaseViolationCount,
  resetAssessment,
  toggleReview,
  loadNextSection,
} from "../../slices/aghAssessmentSlice";
import CodingProblemAGHAssessment from "./Coding/Index";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../services/apiconnector";
import AGHAssessmentFooter from "./assessment-footer/Index";
import { useNavigate } from "react-router-dom";
import TestAutoSubmitModal from "../../component/auto_sumbit_test_modal/Index";
import { useProctoring } from "../../hooks/useProctoring";
import BulbAnimation from "../../component/BulbAnimation";
import toast from "react-hot-toast";
import ConnectionAlert from "../../component/connection-alert/connection-alert";
import {
  submitSectionAPI,
  submitAssessment,
} from "../../services/operations/agh-assessment-user";

const SectionProgressIndicator = ({
  totalSections,
  completedSections,
  currentSectionIndex,
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.75rem",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.75rem 1rem",
        background: "#f5f5f5",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <span style={{ fontWeight: "bold", marginRight: "0.5rem" }}>
        Sections:
      </span>
      {Array.from({ length: totalSections }, (_, i) => {
        const isCompleted = i < completedSections;
        const isCurrent = i === currentSectionIndex;

        return (
          <div
            key={i}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "0.85rem",
              background: isCompleted
                ? "#4CAF50"
                : isCurrent
                  ? "#2196F3"
                  : "#e0e0e0",
              color: isCompleted || isCurrent ? "#fff" : "#666",
              border: isCurrent ? "3px solid #1565C0" : "2px solid transparent",
              position: "relative",
              transition: "all 0.3s ease",
            }}
            title={
              isCompleted
                ? `Section ${i + 1} - Completed`
                : isCurrent
                  ? `Section ${i + 1} - Current`
                  : `Section ${i + 1} - Upcoming`
            }
          >
            {isCompleted ? "✓" : i + 1}
          </div>
        );
      })}

      <span
        style={{ marginLeft: "0.5rem", color: "#666", fontSize: "0.85rem" }}
      >
        {completedSections}/{totalSections} completed
      </span>
    </div>
  );
};

const sectionAnimationStyles = `
  @keyframes slideInFromRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes modalPop {
    0% { transform: scale(0.8); opacity: 0; }
    70% { transform: scale(1.05); }
    100% { transform: scale(1); opacity: 1; }
  }
  .section-transition-modal {
    animation: modalPop 0.4s ease forwards;
  }
  .question-fade-in {
    animation: fadeIn 0.4s ease forwards;
  }
`;
const SectionTransitionModal = ({ sectionName, remainingTime, onContinue }) => {
  const [countdown, setCountdown] = useState(10); // 10 seconds to auto-start
  const [starting, setStarting] = useState(false);
  const handleContinue = useCallback(() => {
    if (starting) return;

    setStarting(true);
    onContinue();
  }, [starting, onContinue]);
  useEffect(() => {
    if (countdown <= 0) {
      // onContinue(); // ← auto-move when countdown hits 0
      handleContinue();
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, handleContinue]);

  const progressPercent = (countdown / 10) * 100;

  return (
    <>
      <style>{sectionAnimationStyles}</style>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.75)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          backdropFilter: "blur(4px)",
        }}
      >
        <div
          className="section-transition-modal"
          style={{
            background: "#fff",
            padding: "2.5rem",
            borderRadius: "16px",
            textAlign: "center",
            minWidth: "380px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>✅</div>
          <h2 style={{ color: "#4CAF50", marginBottom: "0.5rem" }}>
            Section Submitted!
          </h2>

          <div
            style={{
              background: "#f0f7ff",
              borderRadius: "8px",
              padding: "1rem",
              margin: "1rem 0",
              borderLeft: "4px solid #2196F3",
            }}
          >
            <h3 style={{ margin: 0, color: "#1565C0" }}>Next: {sectionName}</h3>
            <p style={{ margin: "0.5rem 0 0", color: "#555" }}>
              ⏱ You have{" "}
              <strong>{Math.floor(remainingTime / 60)} minutes</strong> for this
              section
            </p>
          </div>

          <p
            style={{
              color: "#e53935",
              fontWeight: "bold",
              fontSize: "0.85rem",
              background: "#fff3f3",
              padding: "0.5rem",
              borderRadius: "6px",
            }}
          >
            ⚠️ You cannot go back to the previous section!
          </p>

          {/* ── Countdown bar ── */}
          <div style={{ margin: "1.25rem 0 0.5rem" }}>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#555",
                marginBottom: "0.4rem",
              }}
            >
              Auto-starting in{" "}
              <strong style={{ color: countdown <= 3 ? "#e53935" : "#1565C0" }}>
                {countdown}s
              </strong>
            </p>
            <div
              style={{
                width: "100%",
                height: "6px",
                background: "#e0e0e0",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progressPercent}%`,
                  background:
                    countdown <= 3
                      ? "linear-gradient(90deg, #e53935, #ff7043)"
                      : "linear-gradient(90deg, #4CAF50, #2196F3)",
                  borderRadius: "999px",
                  transition: "width 1s linear, background 0.3s ease",
                }}
              />
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={starting}
            style={{
              marginTop: "1rem",
              padding: "0.85rem 2.5rem",
              background: "linear-gradient(135deg, #4CAF50, #2e7d32)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "bold",
              boxShadow: "0 4px 12px rgba(76,175,80,0.4)",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.target.style.transform = "translateY(-2px)")
            }
            onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
          >
            Start Section →
          </button>
        </div>
      </div>
    </>
  );
};

const AGHAssessmentTestAttemptPage = ({ enableProctoring }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const isStartingNextSectionRef = useRef(false);
  const {
    timer: { remaining },
    assessmentId,
    sections,
    active: { sectionIndex, questionIndex },
    palette,
    hasNext,
    hasPrev,
    timerRunType,
    totalSections,
    completedSections,
    currentSectionIndex,
    maxViolationsAllowed,
    violationsDone,
  } = useSelector((state) => state.assessment);
  const restoredTransitionRef = useRef(false);
  const isLastSection =
    timerRunType === "Section" ? completedSections === totalSections - 1 : true;
  const [loadingStage, setLoadingStage] = useState("idle");
  const [submissionFailed, setSubmissionFailed] = useState(false);
  const isSubmittingRef = useRef(false);
  const hasAutoSubmittedRef = useRef(false);
  // NEW — store next section data locally until user clicks "Start Section"
  const [pendingNextSection, setPendingNextSection] = useState(null);
  const [showTransitionModal, setShowTransitionModal] = useState(false);
  const [questionKey, setQuestionKey] = useState(0);
  const [isQuestionNavigationLocked, setIsQuestionNavigationLocked] =
    useState(false);
  const [autoSubmitReason, setAutoSubmitReason] = useState("");

  const { mutateAsync: submitAsync, isPending } = useMutation({
    mutationFn: ({ reason }) => submitAssessment(token, assessmentId, reason),
    retry: (failureCount, error) => {
      // Don't retry auth/validation errors
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false;
      }
      return failureCount < 2; // total 3 attempts max
    },
    retryDelay: (attemptIndex) => Math.min(1500 * 2 ** attemptIndex, 5000),
    onError: (error) => console.error("Submission failed", error),
  });

  const { mutateAsync: submitSectionAsync, isPending: isSectionPending } =
    useMutation({
      mutationFn: () => submitSectionAPI(token, assessmentId),
      retry: (failureCount, error) => {
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1500 * 2 ** attemptIndex, 5000),
      onError: (error) => console.error("Section submission failed", error),
    });

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleReviewMutation = useMutation({
    mutationFn: async ({
      sectionIndex,
      questionIndex,
      type,
      markedAsPreview,
    }) => {
      return axiosInstance.patch(
        `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/user/assessments/${assessmentId}/toggle-review`,
        { sectionIndex, questionIndex, type, markedAsPreview },
        { headers: { Authorization: `Bearer ${token}` } },
      );
    },
    retry: 3,
  });

  const { componentName, setComponentName, setPopupbox } =
    useContext(AppContext);

  // NEW — clean flow: store data, close popup, show transition modal
  const handleSectionSubmitSuccess = useCallback(
    (responseData) => {
      localStorage.setItem(`awaitingTransition_${assessmentId}`, "true");
      localStorage.setItem(
        `pendingNextSection_${assessmentId}`,
        JSON.stringify(responseData),
      ); // ← add this
      setPendingNextSection(responseData);
      setPopupbox(false);
      setComponentName(null);
      setShowTransitionModal(true);
    },
    [setPopupbox, setComponentName, assessmentId],
  );

  const handleStartNextSection = useCallback(() => {
    if (isStartingNextSectionRef.current) return;
    isStartingNextSectionRef.current = true;

    if (pendingNextSection) {
      localStorage.removeItem(`awaitingTransition_${assessmentId}`);
      localStorage.removeItem(`pendingNextSection_${assessmentId}`);

      const pendingIndex = pendingNextSection?.currentSectionIndex;
      const hasValidIndex = typeof pendingIndex === "number";

      // Guard 1: transition already applied (pending index <= current).
      const alreadyApplied =
        hasValidIndex && currentSectionIndex >= pendingIndex;

      // Guard 2: transition would jump more than one section ahead —
      // this indicates stale/corrupted pending data (e.g. from an old
      // localStorage entry or a duplicate-submit response that's now
      // out of sync). Dispatching this would skip a section.
      const wouldSkipAhead =
        hasValidIndex && pendingIndex > currentSectionIndex + 1;

      if (!hasValidIndex || alreadyApplied || wouldSkipAhead) {
        if (wouldSkipAhead) {
          console.error(
            "handleStartNextSection: pending section index would skip ahead — discarding",
            { currentSectionIndex, pendingIndex },
          );
          toast.error(
            "Something went wrong loading the next section. Please refresh the page.",
          );
        } else if (alreadyApplied) {
          console.warn(
            "Skipping loadNextSection — transition already applied",
            { currentSectionIndex, pendingIndex },
          );
        } else {
          console.error(
            "handleStartNextSection: pendingNextSection missing currentSectionIndex",
            pendingNextSection,
          );
        }
        // Either way, release the submission lock so the user isn't stuck.
        hasAutoSubmittedRef.current = false;
        isSubmittingRef.current = false;
      } else {
        hasAutoSubmittedRef.current = false;
        isSubmittingRef.current = false;

        dispatch(
          loadNextSection({
            nextSection: pendingNextSection.nextSection,
            remainingTime: pendingNextSection.remainingTime,
            completedSections: pendingNextSection.completedSections,
            currentSectionIndex: pendingNextSection.currentSectionIndex,
            sectionStartedAt: pendingNextSection.sectionStartedAt,
          }),
        );
      }
    }

    setShowTransitionModal(false);
    setPendingNextSection(null);
    setQuestionKey((prev) => prev + 1); // trigger fade-in animation
    setTimeout(() => {
      isStartingNextSectionRef.current = false;
    }, 1000);
  }, [pendingNextSection, dispatch, assessmentId, currentSectionIndex]);

  const syncAllPendingProgress = useCallback(async () => {
    const mcqPendingKey = `mcq_pending_${assessmentId}`;
    const codePendingKey = `coding_code_pending_${assessmentId}`;

    const mcqAnswers = Object.values(
      JSON.parse(localStorage.getItem(mcqPendingKey) || "{}"),
    );
    const codingCode = Object.values(
      JSON.parse(localStorage.getItem(codePendingKey) || "{}"),
    );

    if (!mcqAnswers.length && !codingCode.length) return;

    await axiosInstance.patch(
      `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/user/assessments/${assessmentId}/autosave-progress`,
      { mcqAnswers, codingCode },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    // Clear only after a confirmed successful save
    if (mcqAnswers.length) localStorage.removeItem(mcqPendingKey);
    if (codingCode.length) localStorage.removeItem(codePendingKey);
  }, [assessmentId, token]);

  const autoSubmit = useCallback(
    async (reason = "unknown") => {
      if (isSubmittingRef.current) return;
      isSubmittingRef.current = true;
      setLoading(true);
      try {
        await syncAllPendingProgress();
        setAutoSubmitReason(reason);
        setPopupbox(true);
        setComponentName("AUTO_SUBMIT_AGH_ASSESSMENT");
        await submitAsync({ reason });
        localStorage.removeItem(`mcq_pending_${assessmentId}`);
        localStorage.removeItem(`coding_code_pending_${assessmentId}`);
        navigate("/test-submitted", { replace: true });
        dispatch(resetAssessment());
        setComponentName(null);
        setPopupbox(false);
      } catch (error) {
        console.error("Auto submission failed", error);
        isSubmittingRef.current = false;
        hasAutoSubmittedRef.current = false;
        setSubmissionFailed(true);
        // Switch to manual submit popup so user can retry
        setComponentName("SUBMIT_AGH_ASSESSMENT");
        toast.error(
          "Auto-submission failed. Please click Confirm to retry submission.",
        );
      }
      setLoading(false);
    },
    [
      submitAsync,
      navigate,
      dispatch,
      setPopupbox,
      setComponentName,
      syncAllPendingProgress,
    ],
  );

  const autoSubmitSection = useCallback(async () => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setSubmissionFailed(false);
    try {
      await syncAllPendingProgress();
      const response = await submitSectionAsync();

      if (response?.data?.isLastSection || !response?.data?.nextSection) {
        await submitAsync({ reason: "Time expired" });
        localStorage.removeItem(`mcq_pending_${assessmentId}`);
        localStorage.removeItem(`coding_code_pending_${assessmentId}`);
        navigate("/test-submitted", { replace: true });
        dispatch(resetAssessment());
        isSubmittingRef.current = false;
      } else {
        handleSectionSubmitSuccess(response.data);
      }
    } catch (error) {
      console.error("Auto section submission failed", error);
      isSubmittingRef.current = false;
      hasAutoSubmittedRef.current = false;
      setSubmissionFailed(true);
      setPopupbox(true);
      setComponentName(
        isLastSection
          ? "SUBMIT_AGH_ASSESSMENT"
          : "SUBMIT_SECTION_AGH_ASSESSMENT",
      );
      toast.error("Auto-submission failed. Please click Confirm to retry.");
    }
  }, [
    submitSectionAsync,
    submitAsync,
    navigate,
    dispatch,
    handleSectionSubmitSuccess,
    isLastSection,
    setPopupbox,
    setComponentName,
    syncAllPendingProgress,
  ]);

  const updateActiveQuestionMutation = useMutation({
    mutationFn: async ({ sectionIndex, questionIndex }) => {
      return axiosInstance.patch(
        `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/user/assessments/${assessmentId}/active-question`,
        { sectionIndex, questionIndex },
        { headers: { Authorization: `Bearer ${token}` } },
      );
    },
    retry: 3,
  });

  useEffect(() => {
    if (!assessmentId) return;
    const interval = setInterval(syncAllPendingProgress, 20000);
    return () => clearInterval(interval);
  }, [syncAllPendingProgress, assessmentId]);

  // Sync leftover localStorage data on mount (handles page refresh scenario)
  useEffect(() => {
    syncAllPendingProgress();
  }, [syncAllPendingProgress]);

  // Sync when tab becomes hidden (tab switch, minimize, mobile background)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        syncAllPendingProgress();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [syncAllPendingProgress]);

  // Sync on page unload using keepalive fetch (axios is not guaranteed to fire during unload)
  useEffect(() => {
    if (!assessmentId) return;
    const handleBeforeUnload = () => {
      const mcqAnswers = Object.values(
        JSON.parse(localStorage.getItem(`mcq_pending_${assessmentId}`) || "{}"),
      );
      const codingCode = Object.values(
        JSON.parse(
          localStorage.getItem(`coding_code_pending_${assessmentId}`) || "{}",
        ),
      );
      if (!mcqAnswers.length && !codingCode.length) return;
      // keepalive ensures the request is sent even after the page is gone.
      // localStorage is intentionally NOT cleared here — the on-mount sync
      // acts as a fallback if this request fails.
      fetch(
        `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/user/assessments/${assessmentId}/autosave-progress`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ mcqAnswers, codingCode }),
          keepalive: true,
        },
      );
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [assessmentId, token]);

  const questionObj = sections[sectionIndex]?.questions[questionIndex];
  useEffect(() => {
    const isSubmitting = isPending || isSectionPending;
    if (!isSubmitting) {
      setLoadingStage("idle");
      return;
    }
    setLoadingStage("submitting");
    const slowTimer = setTimeout(() => setLoadingStage("slow"), 5000);
    const verySlowTimer = setTimeout(() => setLoadingStage("very_slow"), 20000);
    return () => {
      clearTimeout(slowTimer);
      clearTimeout(verySlowTimer);
    };
  }, [isPending, isSectionPending]);
  useEffect(() => {
    if (!assessmentId) return;
    const timer = setTimeout(() => {
      if (updateActiveQuestionMutation.isPending) return;
      //  updateActiveQuestionMutation.mutate({ sectionIndex, questionIndex });
      updateActiveQuestionMutation.mutate({
        sectionIndex:
          timerRunType === "Section" ? currentSectionIndex : sectionIndex,
        questionIndex,
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [sectionIndex, questionIndex, assessmentId]);

  const handleQuestionChange = (si, qi) => {
    if (isQuestionNavigationLocked) {
      toast.error(
        "Please wait for compilation or submission to finish before changing questions.",
      );
      return;
    }

    dispatch(changeQuestion({ sectionIndex: si, questionIndex: qi }));
  };

  const handleLockedNavigation = useCallback(
    (navigationAction) => {
      if (isQuestionNavigationLocked) {
        toast.error(
          "Please wait for compilation or submission to finish before changing questions.",
        );
        return;
      }

      dispatch(navigationAction());
    },
    [dispatch, isQuestionNavigationLocked],
  );

  const handleBlockedNavigation = useCallback(() => {
    toast.error(
      "Please wait for compilation or submission to finish before changing questions.",
    );
  }, []);

  const { mutate: violationMutation } = useMutation({
    mutationFn: async ({ reason }) => {
      return axiosInstance.patch(
        `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/user/assessments/${assessmentId}/track-violation`,
        {
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
    onSuccess: (response, variables) => {
      dispatch(increaseViolationCount());

      const { violationsDone, maxViolationsAllowed } = response.data;

      toast.error(
        `${variables?.reason || ""} violation detected (${violationsDone}/${maxViolationsAllowed})`,
      );
    },
    onError: () => {
      console.log("Violation tracking failed");
    },
    retry: 3,
  });

  const { showFullscreenModal, enterFullscreen } = useProctoring({
    enableProctoring,
    onViolation: violationMutation,
  });

  useEffect(() => {
    if (violationsDone >= maxViolationsAllowed && !loading) {
      autoSubmit("Max violations reached");
    }
  }, [violationsDone, maxViolationsAllowed, loading]);

  useEffect(() => {
    if (restoredTransitionRef.current) return;
    if (!assessmentId) return;

    const isAwaiting = localStorage.getItem(
      `awaitingTransition_${assessmentId}`,
    );
    const savedPendingSection = localStorage.getItem(
      `pendingNextSection_${assessmentId}`,
    );

    if (isAwaiting === "true" && savedPendingSection) {
      restoredTransitionRef.current = true;

      let parsed;
      try {
        parsed = JSON.parse(savedPendingSection);
      } catch (e) {
        console.error("Failed to parse pendingNextSection", e);
        localStorage.removeItem(`awaitingTransition_${assessmentId}`);
        localStorage.removeItem(`pendingNextSection_${assessmentId}`);
        return;
      }

      // If the server-side state (currentSectionIndex from Redux) is already
      // at or beyond what this pending transition would move us to,
      // the transition was already applied — discard the stale flag.
      const alreadyApplied =
        typeof parsed?.currentSectionIndex === "number" &&
        currentSectionIndex >= parsed.currentSectionIndex;

      if (alreadyApplied) {
        localStorage.removeItem(`awaitingTransition_${assessmentId}`);
        localStorage.removeItem(`pendingNextSection_${assessmentId}`);
        return;
      }

      setPendingNextSection(parsed);
      setShowTransitionModal(true);
    }
  }, [assessmentId, currentSectionIndex]);

  useEffect(() => {
    // hasAutoSubmittedRef.current = false;
    if (!isStartingNextSectionRef.current) {
      hasAutoSubmittedRef.current = false;
    }
  }, [currentSectionIndex]);

  useEffect(() => {
    if (
      remaining <= 0 &&
      !hasAutoSubmittedRef.current &&
      !isSubmittingRef.current
    ) {
      hasAutoSubmittedRef.current = true;
      if (timerRunType === "Section") {
        autoSubmitSection();
      } else {
        autoSubmit("Time expired");
      }
    }
  }, [remaining, timerRunType, autoSubmit, autoSubmitSection]);
  if (!assessmentId || !sections.length) {
    return <BulbAnimation />; // ← same loader you use in App.js
  }

  return (
    <Container>
      <ConnectionAlert
        minSpeedMbps={5}
        pingInterval={10000}
        speedTestUrl="./mock.bin"
      />
      {/* FIXED — Transition modal shows AFTER popup closes, dispatches only on user click */}
      {showTransitionModal && pendingNextSection && (
        <SectionTransitionModal
          sectionName={pendingNextSection.nextSection?.name}
          remainingTime={pendingNextSection.remainingTime}
          onContinue={handleStartNextSection}
        />
      )}

      {componentName === "AUTO_SUBMIT_AGH_ASSESSMENT" && (
        <FlashoutPageComponent
          component={<TestAutoSubmitModal reason={autoSubmitReason} />}
        />
      )}

      {componentName === "SUBMIT_AGH_ASSESSMENT" && (
        <FlashoutPageComponent
          component={
            <TestSubmitConfirmationComponent
              loading={isPending || isSectionPending}
              loadingStage={loadingStage}
              submissionFailed={submissionFailed}
              functionCall={async () => {
                if (isSubmittingRef.current) {
                  toast.error("Submission already in progress, please wait...");
                  return;
                }
                isSubmittingRef.current = true;

                setSubmissionFailed(false);
                try {
                  await syncAllPendingProgress();
                  if (timerRunType === "Section") {
                    const resp = await submitSectionAsync();
                    if (!resp?.data?.isLastSection) {
                      handleSectionSubmitSuccess(resp.data);
                      return; // keep isSubmittingRef true until handleStartNextSection
                    }
                  }
                  await submitAsync({ reason: "submit_by_user" });
                  navigate("/test-submitted", { replace: true });
                  dispatch(resetAssessment());
                  isSubmittingRef.current = false;
                } catch (err) {
                  console.error("Manual submission failed", err);
                  isSubmittingRef.current = false;
                  setSubmissionFailed(true);
                  throw err;
                }
              }}
            />
          }
        />
      )}

      {componentName === "SUBMIT_SECTION_AGH_ASSESSMENT" && (
        <FlashoutPageComponent
          component={
            <TestSubmitConfirmationComponent
              loading={isSectionPending}
              loadingStage={loadingStage}
              submissionFailed={submissionFailed}
              functionCall={async () => {
                // Guard against a concurrent autoSubmitSection (timer expiry)
                // firing at the same time as this manual submit.
                if (isSubmittingRef.current) {
                  toast.error("Submission already in progress, please wait...");
                  return;
                }
                isSubmittingRef.current = true;

                setSubmissionFailed(false);
                try {
                  await syncAllPendingProgress();
                  const response = await submitSectionAsync();
                  if (
                    response?.data?.isLastSection ||
                    !response?.data?.nextSection
                  ) {
                    await submitAsync({ reason: "submit_by_user" });
                    localStorage.removeItem(`mcq_pending_${assessmentId}`);
                    localStorage.removeItem(
                      `coding_code_pending_${assessmentId}`,
                    );
                    navigate("/test-submitted", { replace: true });
                    dispatch(resetAssessment());
                    isSubmittingRef.current = false;
                  } else {
                    handleSectionSubmitSuccess(response.data);
                    // Do NOT reset isSubmittingRef.current here —
                    // it stays true until handleStartNextSection runs,
                    // preventing autoSubmitSection from firing in the
                    // same window.
                  }
                } catch (err) {
                  console.error("Section submission failed", err);
                  isSubmittingRef.current = false;
                  setSubmissionFailed(true);
                  throw err;
                }
              }}
            />
          }
        />
      )}

      <Navbar
        category={"AGH Assessment"}
        timeRemaining={remaining}
        submitLabel={
          timerRunType === "Section"
            ? isLastSection
              ? "Submit Test"
              : "Submit Section"
            : "Submit Test"
        }
        handleSubmitClick={() => {
          setPopupbox(true);
          setComponentName(
            timerRunType === "Section" && !isLastSection
              ? "SUBMIT_SECTION_AGH_ASSESSMENT"
              : "SUBMIT_AGH_ASSESSMENT",
          );
        }}
      />

      {timerRunType === "Section" && (
        <SectionProgressIndicator
          totalSections={totalSections}
          completedSections={completedSections}
          currentSectionIndex={currentSectionIndex}
        />
      )}

      {showFullscreenModal && (
        <div className="fullscreen-blocker">
          <div className="blocker-content">
            <h2>🔒 Fullscreen Required</h2>
            <p>
              You have exited fullscreen mode. Please return to fullscreen to
              continue the test.
            </p>
            <button onClick={enterFullscreen}>🔁 Return to Fullscreen</button>
          </div>
        </div>
      )}

      <MainSectionforAssessments>
        <QuestionWrapper>
          {/* FIXED — key prop forces re-render with fade-in animation on new section */}
          <QuestionContent
            key={questionKey}
            style={{ animation: "fadeIn 0.4s ease forwards" }}
          >
            {questionObj?.type === "mcq" && (
              <McqAttempt currentlyActiveQuestion={questionObj.mcqProblem} />
            )}
            {questionObj?.type === "coding" && (
              <CodingProblemAGHAssessment
                codingProblem={questionObj.codingProblem}
                setIsQuestionNavigationLocked={setIsQuestionNavigationLocked}
              />
            )}
          </QuestionContent>

          <PaginationWrapper>
            <ButtonGroup>
              <Button
                disabled={!hasPrev}
                onClick={() => handleLockedNavigation(handleClickPrev)}
              >
                Prev
              </Button>
              <PreviewButtonStyle>
                <input
                  type={"checkbox"}
                  checked={
                    palette[`${sectionIndex}-${questionIndex}`]
                      ?.markedForReview || false
                  }
                  id={`${sectionIndex}-${questionIndex}`}
                  onChange={() => {
                    dispatch(toggleReview({ sectionIndex, questionIndex }));
                    const markedAsPreview =
                      questionObj.type === "mcq"
                        ? !questionObj.mcqProblem.markedAsPreview
                        : !questionObj.codingProblem.markedAsPreview;
                    toggleReviewMutation.mutate({
                      // sectionIndex,
                      sectionIndex:
                        timerRunType === "Section"
                          ? currentSectionIndex
                          : sectionIndex,
                      questionIndex,
                      type: questionObj.type,
                      markedAsPreview,
                    });
                  }}
                />
                <label htmlFor={`${sectionIndex}-${questionIndex}`}>
                  {palette[`${sectionIndex}-${questionIndex}`]?.markedForReview
                    ? "Marked for review"
                    : "Mark for review"}
                </label>
              </PreviewButtonStyle>
            </ButtonGroup>
            <Button
              disabled={!hasNext}
              onClick={() => handleLockedNavigation(handleClickNext)}
            >
              Next
            </Button>
          </PaginationWrapper>
        </QuestionWrapper>

        <FooterWrapper>
          <AGHAssessmentFooter
            sections={sections}
            activeSectionIndex={sectionIndex}
            activeQuestionIndex={questionIndex}
            onSelectQuestion={handleQuestionChange}
            onToggleNavigator={() => setShowSidebar(!showSidebar)}
            disableQuestionNavigation={isQuestionNavigationLocked}
            onBlockedNavigation={handleBlockedNavigation}
          />
        </FooterWrapper>

        <SidebarWrapper>
          <AssessmentQuestionsSideBar
            disableQuestionNavigation={isQuestionNavigationLocked}
            onBlockedNavigation={handleBlockedNavigation}
          />
        </SidebarWrapper>

        {showSidebar && (
          <ToggleSidebar>
            <AssessmentQuestionsSideBar
              disableQuestionNavigation={isQuestionNavigationLocked}
              onBlockedNavigation={handleBlockedNavigation}
              showSidebar={showSidebar}
              closeSidebar={() => setShowSidebar(false)}
            />
          </ToggleSidebar>
        )}
      </MainSectionforAssessments>
    </Container>
  );
};
export default AGHAssessmentTestAttemptPage;
