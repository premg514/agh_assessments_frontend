import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import axiosInstance from "../../../services/apiconnector";
/* ------------------------------------------------------------------ */
/* Per-question status mapping                                        */
/* ------------------------------------------------------------------ */
const getQuestionStatus = (question) => {
  if (!question) return "none";

  if (question.type === "mcq") {
    const mcq = question.mcqProblem || {};
    const hasAnswer = !!(mcq.userAnswer && String(mcq.userAnswer).trim());
    if (hasAnswer && mcq.markedAsPreview) return "partial";
    if (hasAnswer) return "correct";
    if (mcq.markedAsPreview) return "skipped";
    return "none";
  }

  if (question.type === "coding") {
    const code = question.codingProblem || {};
    if (code.submitted) {
      const result = code.submissionResult || {};
      // Treat 100% / allPassed as correct
      if (result.scorePercent === 100 || result.allPassed === true) {
        return "correct";
      }
      if (
        typeof result.totalPassedTestCases === "number" &&
        result.totalPassedTestCases > 0
      ) {
        return "partial";
      }
      return "wrong";
    }
    if (code.markedAsPreview) return "skipped";
    return "none";
  }

  return "none";
};

/* ------------------------------------------------------------------ */
/* Transform a raw schema document into the dashboard display shape.  */
/* Idempotent — if it's already transformed, returns as-is.           */
/* ------------------------------------------------------------------ */
const transformStudent = (doc) => {
  if (!doc) return null;

  // Already transformed? bail out.
  if (
    Array.isArray(doc.cells) &&
    Array.isArray(doc.sections) &&
    doc.sections[0]?.state
  ) {
    return doc;
  }

  /* ---- user (populated or ObjectId) ---- */
  const user = doc.user || {};
  const isPopulated = typeof user === "object" && user !== null;

  if (isPopulated && process.env.NODE_ENV !== "production") {
    console.log("[transformStudent] populated user fields:", Object.keys(user));
  }

  // Try every common name field variant
  const composedName =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`.trim()
      : null;

  const userName = isPopulated
    ? user.name ||
      user.fullName ||
      user.full_name ||
      user.displayName ||
      user.display_name ||
      composedName ||
      user.firstName ||
      user.userName ||
      user.username ||
      user.studentName ||
      user.email ||
      "Unknown"
    : "Student";

  // Email — also covers a few field name variants
  const userEmail = isPopulated
    ? user.email || user.emailId || user.mail || user.emailAddress || null
    : null;

  const userId = isPopulated ? user._id : user;

  /* ---- elapsed time ---- */
  const startedAt = doc.testStartedAt
    ? new Date(doc.testStartedAt).getTime()
    : Date.now();
  const elapsedMin = Math.max(0, Math.floor((Date.now() - startedAt) / 60000));

  /* ---- total possible marks across the whole test ---- */
  const totalPossible = (doc.sections || []).reduce((total, section) => {
    return (
      total +
      (section.questions || []).reduce((sum, q) => {
        const mark =
          q.type === "mcq"
            ? q.mcqProblem?.containMark || 0
            : q.codingProblem?.containMark || 0;
        return sum + mark;
      }, 0)
    );
  }, 0);

  /* ---- obtained marks (from completed sections) ---- */
  const obtained = (doc.sectionMarks || []).reduce(
    (s, m) => s + (m.obtainedMarks || 0),
    0,
  );

  const percentage =
    totalPossible > 0 ? Math.round((obtained / totalPossible) * 100) : 0;

  /* ---- sections + question statuses ---- */
  const currentSectionIndex = doc.currentSectionIndex || 0;

  const sections = (doc.sections || []).map((section, idx) => {
    const questions = (section.questions || []).map((q) => ({
      type: q.type,
      status: getQuestionStatus(q),
    }));

    const attempted = questions.filter((q) => q.status !== "none").length;
    const isActive = !section.isCompleted && idx === currentSectionIndex;

    let state = "pending";
    if (section.isCompleted) state = "completed";
    else if (isActive) state = "active";

    return {
      index: idx,
      name: section.name,
      isCompleted: !!section.isCompleted,
      isActive,
      state,
      attempted,
      total: questions.length,
      questions,
    };
  });

  const cells = sections.flatMap((s) => s.questions.map((q) => q.status));
  const currentSection = sections[currentSectionIndex] || null;

  // Compute answered count if backend didn't include it
  const answeredCount =
    typeof doc.answeredCount === "number"
      ? doc.answeredCount
      : cells.filter((s) => s === "correct" || s === "partial").length;
  const totalQuestions =
    typeof doc.totalQuestions === "number" ? doc.totalQuestions : cells.length;

  return {
    // The AGHOnProgressAssessment doc's own _id — guaranteed unique per
    // student per assessment. Used as the React key for the card so that
    // each card's local UI state (expanded sections, etc.) stays isolated.
    _id: doc._id ? String(doc._id) : null,
    userId,
    name: userName,
    email: userEmail,
    percentage,
    obtainedMarks: obtained,
    totalMarks: totalPossible,
    time: `${elapsedMin} min`,
    elapsedMin,
    totalSections: sections.length,
    completedSections: doc.completedSections || 0,
    currentSectionIndex,
    currentSectionName: currentSection?.name || null,
    violationsDone: doc.violationsDone || 0,
    maxViolationsAllowed: doc.maxViolationsAllowed || 0,
    isAutoSubmitted: !!doc.isAutoSubmitted,
    answeredCount,
    totalQuestions,
    sections,
    cells,
  };
};

/* ------------------------------------------------------------------ */
/* Normalize whatever the API returns into an array of raw docs.      */
/* Handles every common Express response shape.                       */
/* ------------------------------------------------------------------ */
const normalizeResponse = (raw) => {
  if (!raw) return [];

  // Already an array
  if (Array.isArray(raw)) return raw;

  // { students: [...] }   ← my controller format
  if (Array.isArray(raw.students)) return raw.students;

  // { data: [...] }       ← common Express format
  if (Array.isArray(raw.data)) return raw.data;

  // { data: {...} }       ← single student object
  if (raw.data && typeof raw.data === "object" && raw.data._id) {
    return [raw.data];
  }

  // Raw single document at top level
  if (raw._id) return [raw];

  return [];
};

/* ------------------------------------------------------------------ */
/* THE HOOK                                                           */
/* ------------------------------------------------------------------ */
export default function useLiveTracking({
  assessmentId,
  baseUrl = `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/getLiveTracking`,
  intervalMs = 5 * 60 * 1000, // 5 minutes
  enabled = true,
  sortBy = "priority",
  limit = 50,
  page = 1,
  token,
}) {
  const [students, setStudents] = useState([]);
  const [meta, setMeta] = useState({
    totalStudents: 0,
    returnedCount: 0,
    hasMore: false,
    page: 1,
    lastUpdated: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cancelRef = useRef(null);

  const fetchData = useCallback(async () => {
    const params = new URLSearchParams({
      sortBy,
      limit: String(limit),
      page: String(page),
    });
    const url = `${baseUrl}/${assessmentId}?${params.toString()}`;
    console.log("[useLiveTracking] ▶ fetchData called", {
      assessmentId,
      url,
      sortBy,
      limit,
      page,
    });

    if (!assessmentId) {
      console.warn("[useLiveTracking] ⚠ no assessmentId — aborting");
      setLoading(false);
      return;
    }

    if (cancelRef.current) cancelRef.current.abort();
    const controller = new AbortController();
    cancelRef.current = controller;

    try {
      setError(null);
      console.log("[useLiveTracking] ▶ firing GET", url);

      const response = await axiosInstance.get(url, {
        withCredentials: true,
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("[useLiveTracking] ◀ response received", {
        status: response.status,
        url,
        data: response.data,
      });

      const data = response.data;
      const rawDocs = normalizeResponse(data);
      console.log("[useLiveTracking] ▶ normalized rawDocs", {
        count: rawDocs.length,
        sample: rawDocs[0],
      });

      const transformed = rawDocs
        .map((d, i) => {
          try {
            return transformStudent(d);
          } catch (e) {
            console.error(
              `[useLiveTracking] ✖ transformStudent failed for doc #${i}`,
              e,
              d,
            );
            return null;
          }
        })
        .filter(Boolean);

      console.log("[useLiveTracking] ✔ transformed students", {
        count: transformed.length,
        sample: transformed[0],
      });

      setStudents(transformed);
      setMeta({
        totalStudents: data?.totalStudents ?? transformed.length,
        scheduledForUsers: data?.scheduledForUsers,
        usersWhoCompleted: data?.usersWhoCompleted,
        returnedCount: data?.returnedCount ?? transformed.length,
        hasMore: Boolean(data?.hasMore),
        page: data?.page ?? page,
        lastUpdated: data?.lastUpdated || new Date().toISOString(),
      });
    } catch (err) {
      if (
        axios.isCancel?.(err) ||
        err.name === "CanceledError" ||
        err.name === "AbortError"
      ) {
        console.log("[useLiveTracking] ⏹ request cancelled");
        return;
      }
      const message =
        err.response?.data?.message || err.message || "Request failed";
      console.error("[useLiveTracking] ✖ request failed", {
        url,
        status: err.response?.status,
        message,
        error: err,
      });
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [assessmentId, baseUrl]);

  useEffect(() => {
    if (!enabled || !assessmentId) return;

    fetchData();
    const t = setInterval(fetchData, intervalMs);

    return () => {
      clearInterval(t);
      if (cancelRef.current) cancelRef.current.abort();
    };
  }, [enabled, assessmentId, intervalMs, fetchData, sortBy, limit, page]);

  return { students, meta, loading, error, refresh: fetchData };
}
