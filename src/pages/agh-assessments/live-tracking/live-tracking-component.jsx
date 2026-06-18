import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLiveTracking from "./use-live-tracking";
import {
  PageWrapper,
  TopBar,
  Title,
  HeaderActions,
  LiveBadge,
  RefreshInfo,
  RefreshBtn,
  StatsRow,
  StatCard,
  FilterBar,
  FilterChip,
  SortSelect,
  CountIndicator,
  SearchInput,
  CardGrid,
  Card,
  CardHeader,
  UserInfo,
  Avatar,
  NameBlock,
  ProgressRing,
  SectionBar,
  SectionLabel,
  SectionPills,
  SectionPill,
  SectionGroup,
  SectionGridLabel,
  PreviewDot,
  CollapsibleArea,
  ExpandAllBtn,
  CellGrid,
  Cell,
  CardFooter,
  StatItem,
  ViolationBadge,
  Legend,
  LegendItem,
  EmptyState,
  ErrorBanner,
  PaginationBar,
  PageBtn,
  PageInfo,
  PageNumberInput,
  COLORS,
  getTier,
  getAvatarColor,
  getInitials,
} from "./live-tracking-style";
import { useSelector } from "react-redux";

/* ------------------------------------------------------------------ */
/* CIRCULAR PROGRESS                                                  */
/* ------------------------------------------------------------------ */
const CircularProgress = ({ value, color }) => {
  const size = 52;
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <ProgressRing color={color}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div className="pct">{value}%</div>
    </ProgressRing>
  );
};

/* ------------------------------------------------------------------ */
/* HELPERS                                                            */
/* ------------------------------------------------------------------ */
const formatLastUpdated = (iso) => {
  if (!iso) return "—";
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
};

/* ------------------------------------------------------------------ */
/* STUDENT CARD                                                       */
/* ------------------------------------------------------------------ */
/**
 * Default expansion state for a student card.
 *
 * IMPORTANT: We return an EMPTY set here so that every student card
 * starts FULLY COLLAPSED. The admin must explicitly click on a card's
 * expand button to see that student's sections — which makes per-card
 * isolation visually obvious (only the clicked card opens, nothing else).
 */
const computeDefaultExpanded = () => new Set();

/**
 * StudentCard is now a CONTROLLED component — it doesn't own
 * expansion state. Parent passes `expandedSections` and a
 * `onToggleSection(sectionIdx)` callback. This eliminates any
 * chance of state sharing across cards.
 */
const StudentCard = React.memo(function StudentCard({
  student,
  expandedSections,
  onToggleSection,
  onToggleAll,
}) {
  const tier = getTier(student.percentage);
  const accent = COLORS[tier].accent;

  const counts = (student.cells || []).reduce((acc, s) => {
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  const sections = student.sections || [];
  const allExpanded =
    sections.length > 0 && sections.every((s) => expandedSections.has(s.index));

  const toggleSection = (idx) => onToggleSection(idx);
  const toggleAll = () => onToggleAll(allExpanded);
  const currentSectionName =
    student.currentSectionName || sections[student.currentSectionIndex]?.name;
  const severeViolation =
    student.violationsDone >= (student.maxViolationsAllowed * 0.7 || 35);

  return (
    <Card tier={tier}>
      {student.violationsDone > 0 && (
        <ViolationBadge severe={severeViolation}>
          ⚠ {student.violationsDone}
        </ViolationBadge>
      )}

      <CardHeader>
        <UserInfo>
          <Avatar color={getAvatarColor(student.name)}>
            {getInitials(student.name)}
          </Avatar>
          <NameBlock>
            <div className="name" title={student.name}>
              {student.name}
            </div>
            {student.email && (
              <div className="email" title={student.email}>
                {student.email}
              </div>
            )}
            <div className="time">⏱ {student.time}</div>
          </NameBlock>
        </UserInfo>
        <CircularProgress value={student.percentage} color={accent} />
      </CardHeader>

      {sections.length > 0 && (
        <SectionBar>
          <SectionLabel>
            <span>
              Section{" "}
              {Math.min(student.currentSectionIndex + 1, sections.length)} of{" "}
              {sections.length}
            </span>
            <span className="current">
              {student.isAutoSubmitted
                ? "Auto-submitted"
                : currentSectionName || "—"}
            </span>
          </SectionLabel>
          <SectionPills>
            {sections.map((s) => (
              <SectionPill
                key={s.index}
                state={s.state}
                title={`${s.name} · ${s.attempted}/${s.total} attempted`}
              >
                <span className="icon">
                  {s.state === "completed"
                    ? "✓"
                    : s.state === "active"
                      ? "●"
                      : "○"}
                </span>
                {s.name}
              </SectionPill>
            ))}
          </SectionPills>
        </SectionBar>
      )}

      {sections.length > 0 ? (
        <>
          {sections.length > 0 && (
            <ExpandAllBtn
              expanded={expandedSections.size > 0}
              onClick={toggleAll}
              title={
                allExpanded
                  ? "Hide this student's test details"
                  : "Show this student's test details"
              }
            >
              {expandedSections.size > 0
                ? "▼ Hide Test Details"
                : `▶ View Test Details (${sections.length} section${sections.length > 1 ? "s" : ""})`}
            </ExpandAllBtn>
          )}

          {sections.map((section) => {
            const isExpanded = expandedSections.has(section.index);
            return (
              <SectionGroup key={section.index}>
                <SectionGridLabel
                  state={section.state}
                  expanded={isExpanded}
                  onClick={() => toggleSection(section.index)}
                  aria-expanded={isExpanded}
                  title={isExpanded ? "Click to collapse" : "Click to expand"}
                >
                  <span className="name-part">
                    <span className="chevron">▶</span>
                    <span className="indicator" />
                    {section.name}
                  </span>

                  {/* tiny preview of question statuses when collapsed */}
                  {!isExpanded && section.questions?.length > 0 && (
                    <span className="preview">
                      {section.questions.slice(0, 8).map((q, i) => (
                        <PreviewDot key={i} status={q.status} />
                      ))}
                      {section.questions.length > 8 && (
                        <span style={{ fontSize: 9, marginLeft: 2 }}>
                          +{section.questions.length - 8}
                        </span>
                      )}
                    </span>
                  )}

                  <span className="count">
                    {section.attempted}/{section.total}
                  </span>
                </SectionGridLabel>

                <CollapsibleArea expanded={isExpanded}>
                  <CellGrid>
                    {(section.questions || []).map((q, qIdx) => (
                      <Cell
                        key={qIdx}
                        status={q.status}
                        title={`Q${qIdx + 1} (${q.type}) — ${
                          q.status === "none" ? "not attempted" : q.status
                        }`}
                      >
                        {qIdx + 1}
                      </Cell>
                    ))}
                  </CellGrid>
                </CollapsibleArea>
              </SectionGroup>
            );
          })}
        </>
      ) : (
        <CellGrid style={{ padding: "4px 16px 0" }}>
          {(student.cells || []).map((status, i) => (
            <Cell key={i} status={status}>
              {i + 1}
            </Cell>
          ))}
        </CellGrid>
      )}

      <CardFooter>
        <StatItem color={COLORS.correct}>
          <div className="dot" /> {student.answeredCount ?? counts.correct ?? 0}
          /{student.totalQuestions ?? (student.cells || []).length} answered
        </StatItem>
        <StatItem color={COLORS.partial}>
          <div className="dot" /> {counts.partial || 0} partial
        </StatItem>
        <StatItem color={COLORS.skipped}>
          <div className="dot" /> {counts.skipped || 0} marked
        </StatItem>
      </CardFooter>
    </Card>
  );
});

/* ------------------------------------------------------------------ */
/* DASHBOARD                                                          */
/* ------------------------------------------------------------------ */
const StudentProgressDashboard = ({
  assessmentId: assessmentIdProp,
  baseUrl = `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/getLiveTracking`,
  intervalMs = 5 * 60 * 1000,
}) => {
  // Read from the URL param when used as a routed page,
  // fall back to prop when rendered directly.
  const params = useParams();
  const assessmentId = assessmentIdProp || params.assessmentId;

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("priority");
  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const topRef = useRef(null);
  const { token } = useSelector((state) => state.auth);
  /* ============================================================== */
  /* PARENT-OWNED EXPANSION STATE (per student, isolated by ID)     */
  /* This is the single source of truth so cards CANNOT accidentally*/
  /* share expansion state — every key has its own Set.             */
  /* ============================================================== */
  const [expansionMap, setExpansionMap] = useState({});

  // const getStudentKey = (s, idx) =>
  //   s?._id || s?.userId || s?.email || `pos-${idx}`;
  const getStudentKey = (s) => s?._id || s?.userId || s?.email;
  // const getExpandedFor = (studentKey) => {
  //   return expansionMap[studentKey] || computeDefaultExpanded();
  // };
  const getExpandedFor = (studentKey) => {
    return new Set(expansionMap[studentKey] || []);
  };

  // const toggleSectionFor = (studentKey, sectionIdx) => {
  //   console.log("[toggleSectionFor]", { studentKey, sectionIdx });
  //   setExpansionMap((prev) => {
  //     const current = prev[studentKey] || new Set();
  //     const next = new Set(current);
  //     if (next.has(sectionIdx)) next.delete(sectionIdx);
  //     else next.add(sectionIdx);
  //     return { ...prev, [studentKey]: next };
  //   });
  // };
  const toggleSectionFor = (studentKey, sectionIdx) => {
    setExpansionMap((prev) => {
      const current = new Set(prev[studentKey] || []);

      if (current.has(sectionIdx)) {
        current.delete(sectionIdx);
      } else {
        current.add(sectionIdx);
      }

      return {
        ...prev,
        [studentKey]: [...current],
      };
    });
  };

  // const toggleAllFor = (studentKey, student, currentlyAll) => {
  //   console.log("[toggleAllFor] FOR STUDENT:", studentKey, {
  //     currentlyAll,
  //     willBe: currentlyAll ? "all collapsed" : "all expanded",
  //   });
  //   setExpansionMap((prev) => {
  //     const sections = student.sections || [];
  //     const next = currentlyAll
  //       ? new Set()
  //       : new Set(sections.map((s) => s.index));
  //     return { ...prev, [studentKey]: next };
  //   });
  // };
  const toggleAllFor = (studentKey, student, currentlyAll) => {
    setExpansionMap((prev) => {
      const sections = student.sections || [];

      return {
        ...prev,
        [studentKey]: currentlyAll ? [] : sections.map((s) => s.index),
      };
    });
  };

  const { students, meta, loading, error, refresh } = useLiveTracking({
    assessmentId,
    baseUrl,
    intervalMs,
    sortBy,
    limit,
    page,
    token,
  });

  // When sort or limit changes, jump back to page 1
  useEffect(() => {
    setPage(1);
    setPageInput("1");
  }, [sortBy, limit]);

  // Keep the input box in sync with the actual page
  useEffect(() => {
    setPageInput(String(page));
  }, [page]);

  // Verify student keys are unique — warn if duplicates detected
  useEffect(() => {
    if (!students || students.length === 0) return;
    const keys = students.map((s, i) => getStudentKey(s, i));
    const dupes = keys.filter((k, i) => keys.indexOf(k) !== i);
    if (dupes.length > 0) {
      console.warn(
        "[StudentProgressDashboard] ⚠ Duplicate student keys detected:",
        dupes,
        "Check that each student doc has a unique _id from MongoDB.",
        students,
      );
    }
  }, [students]);

  // Pagination math
  const numericLimit = limit === "all" ? meta.totalStudents || 1 : limit;
  const totalPages =
    limit === "all"
      ? 1
      : Math.max(1, Math.ceil((meta.totalStudents || 0) / numericLimit));
  const firstOnPage =
    meta.totalStudents === 0 ? 0 : (page - 1) * numericLimit + 1;
  const lastOnPage = Math.min(page * numericLimit, meta.totalStudents || 0);

  const goToPage = (newPage) => {
    const clamped = Math.max(1, Math.min(totalPages, newPage));
    setPage(clamped);
    setPageInput(String(clamped));
    // scroll to top of card grid
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* summary stats */
  const stats = useMemo(() => {
    const total = students.length;
    if (total === 0)
      return { total: 0, avg: 0, top: 0, attempted: 0, inProgress: 0 };
    const avg = Math.round(
      students.reduce((sum, s) => sum + (s.percentage || 0), 0) / total,
    );
    const top = Math.max(...students.map((s) => s.percentage || 0));
    const attempted = students.filter((s) => (s.percentage || 0) > 0).length;
    const inProgress = students.filter(
      (s) => !s.isAutoSubmitted && s.completedSections < s.totalSections,
    ).length;
    return { total, avg, top, attempted, inProgress };
  }, [students]);

  const visibleStudents = useMemo(() => {
    return students.filter((s) => {
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (filter === "high" && s.percentage < 70) return false;
      if (filter === "medium" && (s.percentage < 30 || s.percentage >= 70))
        return false;
      if (filter === "low" && s.percentage >= 30) return false;
      if (filter === "violations" && (s.violationsDone || 0) === 0)
        return false;
      return true;
    });
  }, [students, filter, search]);
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <TopBar>
        <Title>
          <button className="back-btn" onClick={() => navigate(-1)}>
            Back
          </button>
          <h1>Live Assessment Tracking</h1>
          <p>
            Auto-refreshes every {Math.round(intervalMs / 60000)} minutes ·{" "}
            {meta.totalStudents} students in progress
          </p>
        </Title>
        <HeaderActions>
          <LiveBadge>
            <div className="dot" /> LIVE
          </LiveBadge>
          <RefreshInfo>
            Last updated: {formatLastUpdated(meta.lastUpdated)}
          </RefreshInfo>
          <RefreshBtn onClick={refresh} disabled={loading}>
            {loading ? <div className="spinner" /> : "↻"} Refresh
          </RefreshBtn>
        </HeaderActions>
      </TopBar>

      {error && <ErrorBanner>Failed to load: {error}</ErrorBanner>}

      <StatsRow>
        <StatCard accent="#0f172a">
          <div className="label">Total Students</div>
          <div className="value">{meta.scheduledForUsers}</div>
          <div className="hint">in this assessment</div>
        </StatCard>
         <StatCard accent={COLORS.average.accent}>
          <div className="label">Completed</div>
          <div className="value">{meta.usersWhoCompleted}</div>
          <div className="hint">Users completed test</div>
        </StatCard>
        <StatCard accent={COLORS.good.accent}>
          <div className="label">Class Average</div>
          <div className="value">{stats.avg}%</div>
          <div className="hint">across all attempts</div>
        </StatCard>
        <StatCard accent={COLORS.excellent.accent}>
          <div className="label">Top Score</div>
          <div className="value">{stats.top}%</div>
          <div className="hint">highest performer</div>
        </StatCard>
       
      </StatsRow>

      <FilterBar>
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </FilterChip>
        <FilterChip
          active={filter === "high"}
          onClick={() => setFilter("high")}
        >
          High (≥70%)
        </FilterChip>
        <FilterChip
          active={filter === "medium"}
          onClick={() => setFilter("medium")}
        >
          Medium (30–69%)
        </FilterChip>
        <FilterChip active={filter === "low"} onClick={() => setFilter("low")}>
          Low (&lt;30%)
        </FilterChip>
        <FilterChip
          active={filter === "violations"}
          onClick={() => setFilter("violations")}
        >
          ⚠ With Violations
        </FilterChip>

        <SortSelect
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          title="Sort students by"
        >
          <option value="priority">🏁 Most Progressed (default)</option>
          <option value="violations">⚠ Most Violations</option>
          <option value="recent">⏱ Most Recent Activity</option>
        </SortSelect>

        <SearchInput
          placeholder="🔍 Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </FilterBar>

      {meta.totalStudents > 0 && (
        <CountIndicator>
          <span>
            Showing <span className="count">{students.length}</span> of{" "}
            <span className="count">{meta.totalStudents}</span> students
            {sortBy === "priority" && students.length < meta.totalStudents && (
              <> · sorted by sections completed, then questions answered</>
            )}
          </span>
          {meta.hasMore && limit !== "all" && (
            <button
              className="show-all-btn"
              onClick={() => setLimit("all")}
              disabled={loading}
            >
              Show All ({meta.totalStudents})
            </button>
          )}
          {limit === "all" && meta.totalStudents > 50 && (
            <button
              className="show-all-btn"
              onClick={() => setLimit(50)}
              disabled={loading}
            >
              Show Top 50
            </button>
          )}
        </CountIndicator>
      )}

      <div ref={topRef} />
      <CardGrid>
        {visibleStudents.length === 0 ? (
          <EmptyState>
            {loading ? "Loading students..." : "No students match your filter."}
          </EmptyState>
        ) : (
          // visibleStudents.map((s, idx) => {
          visibleStudents

            .filter((s) => getStudentKey(s))

            .map((s) => {
              const studentKey = getStudentKey(s);
              return (
                <StudentCard
                  key={studentKey}
                  student={s}
                  expandedSections={getExpandedFor(studentKey)}
                  onToggleSection={(sectionIdx) =>
                    toggleSectionFor(studentKey, sectionIdx)
                  }
                  onToggleAll={(currentlyAll) =>
                    toggleAllFor(studentKey, s, currentlyAll)
                  }
                />
              );
            })
        )}
      </CardGrid>

      {limit !== "all" && totalPages > 1 && (
        <PaginationBar>
          <PageBtn
            onClick={() => goToPage(page - 1)}
            disabled={page === 1 || loading}
          >
            ← Previous
          </PageBtn>

          <PageInfo>
            <span>
              Page <span className="current">{page}</span> of {totalPages}
            </span>
            <span className="range">
              ({firstOnPage}–{lastOnPage} of {meta.totalStudents})
            </span>
          </PageInfo>

          <PageBtn
            primary
            onClick={() => goToPage(page + 1)}
            disabled={!meta.hasMore || page >= totalPages || loading}
          >
            Next →
          </PageBtn>

          {totalPages > 3 && (
            <PageInfo style={{ marginLeft: 12 }}>
              <span>Jump to</span>
              <PageNumberInput
                type="number"
                min="1"
                max={totalPages}
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const n = parseInt(pageInput, 10);
                    if (!isNaN(n)) goToPage(n);
                  }
                }}
                onBlur={() => {
                  const n = parseInt(pageInput, 10);
                  if (!isNaN(n) && n !== page) goToPage(n);
                  else setPageInput(String(page));
                }}
              />
            </PageInfo>
          )}
        </PaginationBar>
      )}

      <Legend>
        <div className="legend-title">Legend</div>
        <LegendItem color={COLORS.correct}>
          <div className="swatch" /> Answered
        </LegendItem>
        <LegendItem color={COLORS.partial}>
          <div className="swatch" /> Partial
        </LegendItem>
        <LegendItem color={COLORS.skipped}>
          <div className="swatch" /> Marked for Review
        </LegendItem>
        <LegendItem color={COLORS.none} border>
          <div className="swatch" /> Not Attempted
        </LegendItem>
      </Legend>
    </PageWrapper>
  );
};

export default StudentProgressDashboard;
