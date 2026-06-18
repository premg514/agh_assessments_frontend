import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Select from "react-select";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../../services/apiconnector";
import BulbAnimation from "../../../component/BulbAnimation";
import { BackButton } from "../../collection-info-user/styles";
import { Button } from "../../user/login/user-login-style";
import { reactSelectTheme } from "../../../theme";
import {
  Wrapper,
  HeroCard,
  HeroTop,
  HeroTitleWrap,
  HeroEyebrow,
  HeroTitle,
  HeroMeta,
  HeroBadge,
  StatsGrid,
  StatCard,
  StatLabel,
  StatValue,
  FiltersCard,
  FiltersTitle,
  FiltersRow,
  FilterField,
  ClearButton,
  PanelGrid,
  Panel,
  PanelHeader,
  PanelTitle,
  TestList,
  TestItem,
  TestTop,
  TestName,
  TestMeta,
  TestMetrics,
  TestMetric,
  TabsWrap,
  TabButton,
  TableWrap,
  TableScroll,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  StudentName,
  StudentSub,
  Pill,
  AssessmentChips,
  AssessmentChip,
  EmptyState,
  StatIconWrap,
  TableCard,
  IndexText,
  StudentCell,
  ScoreText,
  MutedText,
  PercentageWrap,
  PercentageBar,
  PercentageText,
  GoodText,
  BadText,
  WarningText,
  InfoText,
  StatusPill,
  ActionButton,
  TabsHeaderRow,
  DownloadButtonWrap,
  SearchField,
  ChartsGrid,
  ChartCard,
  ChartTitle,
  ProgressChartContent,
  DoughnutWrap,
  ChartLegend,
  LegendRow,
  LegendLeft,
  LegendColor,
  LegendLabel,
  LegendValue,
  SectionChartWrap,
  SectionChartScroll,
  SectionEmptyState,
  HeroFilters,
} from "./GroupAssessmentView.styles";
import {
  ChartColumnIncreasing,
  Check,
  Clock3,
  Plus,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Trash2,
  UsersRound,
  Info,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Label,
} from "recharts";
import toast from "react-hot-toast";
import { downloadAghGroupCombinedResult } from "../../../utils/download/downloadAghGroupCombinedResult";
import { useInView } from "react-intersection-observer";
import { UserTable } from "../view-assessment/ViewAGHAssessment";
import { ResultsTable } from "../view-assessment/test-completed-by-students/Index";

const buildOptions = (values = [], allLabel) => [
  { value: "", label: allLabel },
  ...values.map((value) => ({
    value,
    label: value,
  })),
];

const formatDateTime = (value) =>
  value ? format(new Date(value), "dd MMM yyyy, hh:mm a") : "N/A";

const getStatus = (startDateTime, endDateTime) => {
  const now = new Date();
  const start = new Date(startDateTime);
  const end = new Date(endDateTime);

  if (now < start) return "Upcoming";
  if (now >= start && now < end) return "Running";
  return "Completed";
};

const fetchGroupAssessmentStats = async (groupId, token, filters) => {
  const res = await axiosInstance.get(
    `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/group/${groupId}/stats`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        department: filters.department,
        year: filters.year,
        assessmentType: filters.assessmentType,
      },
    },
  );

  return res.data.data;
};

const PROGRESS_BUCKETS = [
  { key: "excellent", label: "75-100%", color: "#18B7A4" },
  { key: "good", label: "50-74%", color: "#8D8AF7" },
  { key: "average", label: "25-49%", color: "#FF4F6D" },
  { key: "low", label: "0-24%", color: "#FFB347" },
];

const getUserId = (rowOrUser = {}) =>
  rowOrUser.user?._id || rowOrUser._id || rowOrUser.user;

const buildProgressDistribution = (completedRows = []) => {
  const counts = {
    excellent: 0,
    good: 0,
    average: 0,
    low: 0,
  };

  (Array.isArray(completedRows) ? completedRows : []).forEach((row) => {
    const percentage = Number(row.percentage) || 0;

    if (percentage >= 75) counts.excellent += 1;
    else if (percentage >= 50) counts.good += 1;
    else if (percentage >= 25) counts.average += 1;
    else counts.low += 1;
  });

  return PROGRESS_BUCKETS.map((bucket) => ({
    ...bucket,
    value: counts[bucket.key],
  }));
};

const renderDoughnutCenter =
  (completedCount, textColor) =>
  ({ viewBox }) => {
    const { cx, cy } = viewBox;
    return (
      <>
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={26}
          fontWeight={700}
          fill={textColor}
        >
          {completedCount}
        </text>
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={12}
          fill={textColor}
        >
          Completed
        </text>
      </>
    );
  };

const ProgressDistributionChart = ({
  distribution = {},
  totalCompleted = 0,
}) => {
  const { name: themeName } = useSelector((state) => state.theme);
  const textColor = themeName === "DARK" ? "#e5e7eb" : "#111827";

  const chartData = useMemo(
    () => [
      {
        key: "excellent",
        label: "75-100%",
        color: "#18B7A4",
        value: distribution.range_75_100 ?? 0,
      },
      {
        key: "good",
        label: "50-74%",
        color: "#8D8AF7",
        value: distribution.range_50_74 ?? 0,
      },
      {
        key: "average",
        label: "25-49%",
        color: "#FF4F6D",
        value: distribution.range_25_49 ?? 0,
      },
      {
        key: "low",
        label: "0-24%",
        color: "#FFB347",
        value: distribution.range_0_24 ?? 0,
      },
    ],
    [distribution],
  );

  const completedCount = totalCompleted;
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  const pieData =
    total > 0
      ? chartData
      : [{ key: "empty", label: "None", color: "#E5E7EB", value: 1 }];

  return (
    <ChartCard>
      <ChartTitle>Progress Distribution</ChartTitle>

      <ProgressChartContent>
        <DoughnutWrap>
          <PieChart width={190} height={190}>
            <Pie
              data={pieData}
              cx={90}
              cy={90}
              innerRadius={58}
              outerRadius={88}
              dataKey="value"
              strokeWidth={0}
              isAnimationActive={true}
            >
              {pieData.map((item, index) => (
                <Cell key={item.key || index} fill={item.color} />
              ))}
              <Label
                content={renderDoughnutCenter(completedCount, textColor)}
                position="center"
              />
            </Pie>
          </PieChart>
        </DoughnutWrap>

        <ChartLegend>
          {chartData.map((item) => (
            <LegendRow key={item.key}>
              <LegendLeft>
                <LegendColor style={{ backgroundColor: item.color }} />
                <LegendLabel>{item.label}</LegendLabel>
              </LegendLeft>

              <LegendValue>{item.value}</LegendValue>
            </LegendRow>
          ))}
        </ChartLegend>
      </ProgressChartContent>
    </ChartCard>
  );
};

const SECTION_GRADIENTS = [
  ["#9EA5FF", "#6D72F4"],
  ["#E9A3A5", "#8B6868"],
  ["#FFD082", "#FF9D13"],
  ["#FF5A78", "#F6224D"],
  ["#E982F6", "#B84AD8"],
  ["#A7E8D0", "#4EBB97"],
  ["#7CC7FF", "#2B8FF0"],
  ["#FDBA74", "#F97316"],
];

const toTitleCase = (str = "") => str.replace(/\b\w/g, (c) => c.toUpperCase());

const truncateSectionLabel = (label = "", maxLength = 10) => {
  if (!label) return "Untitled";
  const titled = toTitleCase(label);
  return titled.length > maxLength
    ? `${titled.slice(0, maxLength)}...`
    : titled;
};

const SectionTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const { sectionName, avgSectionPercentage } = payload[0].payload;
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 6,
        padding: "8px 12px",
        fontSize: 14,
        boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
        pointerEvents: "none",
      }}
    >
      <strong style={{ color: "#111827", display: "block", marginBottom: 2 }}>
        {toTitleCase(sectionName)}
      </strong>
      <span style={{ color: "#6b7280" }}>{avgSectionPercentage}%</span>
    </div>
  );
};

const SectionWisePerformanceChart = ({ sectionRows = [] }) => {
  const [pageIndex, setPageIndex] = useState(0);

  const sectionsPerPage = 7;
  const totalPages = Math.max(
    1,
    Math.ceil(sectionRows.length / sectionsPerPage),
  );

  useEffect(() => {
    setPageIndex((prev) => Math.min(prev, totalPages - 1));
  }, [totalPages]);

  const visibleSectionData = useMemo(() => {
    const start = pageIndex * sectionsPerPage;
    return sectionRows.slice(start, start + sectionsPerPage);
  }, [sectionRows, pageIndex]);

  const canGoPrev = pageIndex > 0;
  const canGoNext = pageIndex < totalPages - 1;

  return (
    <ChartCard>
      <ChartTitle>Section Wise Performance Graph</ChartTitle>

      {sectionRows.length ? (
        <SectionChartWrap>
          {sectionRows.length > sectionsPerPage && (
            <button
              type="button"
              className="chart-nav chart-prev"
              onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
              disabled={!canGoPrev}
              aria-label="Previous sections"
            >
              <ChevronLeft size={38} strokeWidth={2.2} />
            </button>
          )}

          <SectionChartScroll>
            <div style={{ width: "100%", minWidth: "640px", height: "340px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={visibleSectionData}
                  margin={{ top: 8, right: 16, bottom: 0, left: 0 }}
                >
                  <defs>
                    {SECTION_GRADIENTS.map(([from, to], i) => (
                      <linearGradient
                        key={i}
                        id={`sectionGrad-${i}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor={from} />
                        <stop offset="100%" stopColor={to} />
                      </linearGradient>
                    ))}
                  </defs>

                  <CartesianGrid
                    strokeDasharray="0 0"
                    stroke="#e0e0e0"
                    horizontal={true}
                    vertical={false}
                  />

                  <XAxis
                    dataKey="sectionName"
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(label) => truncateSectionLabel(label, 10)}
                    tick={{ fill: "#4B5563", fontSize: 13, fontWeight: 500 }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    domain={[0, 100]}
                    tickCount={5}
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                  />

                  <Tooltip
                    content={<SectionTooltip />}
                    cursor={{ fill: "rgba(0,0,0,0.06)" }}
                  />

                  <Bar maxBarSize={40} dataKey="avgSectionPercentage">
                    {visibleSectionData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#sectionGrad-${
                          (pageIndex * sectionsPerPage + index) %
                          SECTION_GRADIENTS.length
                        })`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionChartScroll>

          {sectionRows.length > sectionsPerPage && (
            <button
              type="button"
              className="chart-nav chart-next"
              onClick={() =>
                setPageIndex((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={!canGoNext}
              aria-label="Next sections"
            >
              <ChevronRight size={38} strokeWidth={2.2} />
            </button>
          )}
        </SectionChartWrap>
      ) : (
        <SectionEmptyState>No section results found.</SectionEmptyState>
      )}
    </ChartCard>
  );
};
const StudentTable = ({
  rows = [],
  activeTab,
  loaderRef,
  isFetchingNextPage = false,
  hasNextPage = false,
}) => {
  if (!rows.length) {
    return <EmptyState>No students found for selected filters.</EmptyState>;
  }

  return (
    <>
      <TableCard>
        <TableScroll>
          <Table>
            <Thead>
              <tr>
                <Th>#</Th>
                <Th>Student</Th>
                <Th>Score</Th>
                <Th>Time Taken</Th>
                <Th>Percentage</Th>
                <Th>Correct</Th>
                <Th>Wrong</Th>
                <Th>Skipped</Th>
                <Th>Violations</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </Thead>

            <Tbody>
              {rows.map((row, index) => {
                const user = row.user || {};
                const isCompletedTab = activeTab === "completed";

                const { hours, minutes, seconds, milliseconds } =
                  intervalToDuration({
                    start: 0,
                    end: row.timeTakenInMs || 0,
                  });

                return (
                  <Tr key={row._id || user._id || index}>
                    <Td>
                      <IndexText>{index + 1}</IndexText>
                    </Td>

                    <Td>
                      <StudentCell>
                        <StudentName>
                          {user.firstName} {user.lastName}
                        </StudentName>
                        <StudentSub>
                          {user.collegeRollNumber || user._id || "N/A"}
                        </StudentSub>
                      </StudentCell>
                    </Td>

                    <Td>
                      <ScoreText>
                        {isCompletedTab ? row.obtainedMarks || 0 : "--"}
                        <span>
                          / {isCompletedTab ? row.totalMarks || 0 : "--"}
                        </span>
                      </ScoreText>
                    </Td>

                    <Td>
                      <MutedText>
                        {isCompletedTab
                          ? `${hours || 0}h ${minutes || 0}m ${seconds || 0}s ${milliseconds || 0}ms`
                          : "--"}
                      </MutedText>
                    </Td>

                    <Td>
                      <PercentageWrap>
                        <PercentageBar
                          value={isCompletedTab ? row.percentage || 0 : 0}
                        >
                          <div />
                        </PercentageBar>
                        <PercentageText>
                          {isCompletedTab ? `${row.percentage || 0}%` : "--"}
                        </PercentageText>
                      </PercentageWrap>
                    </Td>

                    <Td>
                      <GoodText>
                        {isCompletedTab ? row.correct || 0 : "--"}
                      </GoodText>
                    </Td>

                    <Td>
                      <BadText>
                        {isCompletedTab ? row.wrong || 0 : "--"}
                      </BadText>
                    </Td>

                    <Td>
                      <WarningText>
                        {isCompletedTab ? row.unattempted || 0 : "--"}
                      </WarningText>
                    </Td>

                    <Td>
                      <InfoText>
                        {isCompletedTab
                          ? `${row.violationsDone || 0}/${row.maxViolationsAllowed || 0}`
                          : "--"}
                      </InfoText>
                    </Td>

                    <Td>
                      <StatusPill
                        style={{
                          background:
                            row.statusLabel === "Fail" ? "#FEECEC" : "#E7FAF0",
                          color:
                            row.statusLabel === "Fail" ? "#DC2626" : "#10B981",
                        }}
                      >
                        {row.statusLabel || "Scheduled"}
                      </StatusPill>
                    </Td>

                    <Td>
                      <ActionButton type="button">
                        <Trash2 size={16} />
                      </ActionButton>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableScroll>
      </TableCard>

      <div ref={loaderRef} style={{ minHeight: "1px" }} />

      {isFetchingNextPage && <BulbAnimation $height="120px" />}

      {!isFetchingNextPage && hasNextPage && <div style={{ height: "1px" }} />}
    </>
  );
};

const fetchGroupAssessmentCompletedResults = async ({
  groupId,
  token,
  filters,
  pageParam = 1,
  limit = 20,
}) => {
  const isUnlimited = String(limit).toLowerCase() === "all";
  const res = await axiosInstance.get(
    `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/group/${groupId}/results/completed`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        ...(isUnlimited ? {} : { page: pageParam }),
        limit,
        search: filters.search,
        department: filters.department,
        year: filters.year,
        assessmentType: filters.assessmentType,
      },
    },
  );

  return res.data;
};

const fetchGroupAssessmentSectionPerformance = async ({
  groupId,
  token,
  filters,
}) => {
  const res = await axiosInstance.get(
    `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/group/${groupId}/results/sections`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        department: filters.department,
        year: filters.year,
        assessmentType: filters.assessmentType,
      },
    },
  );
  return res.data.data;
};

const fetchGroupAssessmentProgressDistribution = async ({
  groupId,
  token,
  filters,
}) => {
  const res = await axiosInstance.get(
    `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/group/${groupId}/results/distribution`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        department: filters.department,
        year: filters.year,
        assessmentType: filters.assessmentType,
      },
    },
  );
  return res.data.data;
};

const fetchGroupAssessmentUserBucketResults = async ({
  groupId,
  token,
  activeTab,
  filters,
  pageParam = 1,
  limit = 20,
}) => {
  const isUnlimited = String(limit).toLowerCase() === "all";
  const res = await axiosInstance.get(
    `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/group/${groupId}/results/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        ...(isUnlimited ? {} : { page: pageParam }),
        limit,
        tab: activeTab,
        search: filters.search,
        department: filters.department,
        year: filters.year,
        assessmentType: filters.assessmentType,
      },
    },
  );

  return res.data;
};

const GroupAssessmentView = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { name } = useSelector((state) => state.theme);

  const [filters, setFilters] = useState({
    department: "",
    year: "",
    assessmentType: "",
  });

  const [studentSearch, setStudentSearch] = useState("");

  const [activeTab, setActiveTab] = useState("scheduled");
  const [isDownloadingCombinedResult, setIsDownloadingCombinedResult] =
    useState(false);
  const { ref: tableLoaderRef, inView: isTableLoaderInView } = useInView({
    threshold: 0,
  });

  const {
    data: statsData,
    isLoading: isStatsLoading,
    isError: isStatsError,
  } = useQuery({
    queryKey: [
      "agh-group-assessment-stats",
      groupId,
      filters.department,
      filters.year,
      filters.assessmentType,
    ],
    queryFn: () => fetchGroupAssessmentStats(groupId, token, filters),
    enabled: !!groupId && !!token,
    placeholderData: (previousData) => previousData,
  });

  const {
    data: tablePages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isTableLoading,
  } = useInfiniteQuery({
    queryKey: [
      "agh-group-assessment-table",
      groupId,
      activeTab,
      studentSearch,
      filters.department,
      filters.year,
      filters.assessmentType,
    ],
    queryFn: ({ pageParam = 1 }) => {
      const tableFilters = {
        ...filters,
        search: studentSearch,
      };
      if (activeTab === "completed") {
        return fetchGroupAssessmentCompletedResults({
          groupId,
          token,
          filters: tableFilters,
          pageParam,
          limit: 20,
        });
      }

      return fetchGroupAssessmentUserBucketResults({
        groupId,
        token,
        activeTab,
        filters: tableFilters,
        pageParam,
        limit: 20,
      });
    },
    enabled: !!groupId && !!token,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.pagination?.hasNextPage) {
        return lastPage.pagination.page + 1;
      }

      return undefined;
    },
  });

  const tableRows = tablePages?.pages?.flatMap((page) => page.data) || [];

  useEffect(() => {
    if (isTableLoaderInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isTableLoaderInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { data: distributionData, isLoading: isChartLoading } = useQuery({
    queryKey: [
      "agh-group-assessment-progress-distribution",
      groupId,
      filters.department,
      filters.year,
      filters.assessmentType,
    ],
    queryFn: () =>
      fetchGroupAssessmentProgressDistribution({ groupId, token, filters }),
    enabled: !!groupId && !!token,
  });

  const {
    data: sectionPerformanceData = [],
    isLoading: isSectionChartLoading,
  } = useQuery({
    queryKey: [
      "agh-group-assessment-section-performance",
      groupId,
      filters.department,
      filters.year,
      filters.assessmentType,
    ],
    queryFn: () =>
      fetchGroupAssessmentSectionPerformance({ groupId, token, filters }),
    enabled: !!groupId && !!token,
  });

  const handleDownloadCombinedResult = async () => {
    try {
      setIsDownloadingCombinedResult(true);

      await downloadAghGroupCombinedResult({
        groupId,
        groupName: statsData?.name,
        token,
      });

      toast.success("Combined result downloaded");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to download combined result",
      );
      console.error(error);
    } finally {
      setIsDownloadingCombinedResult(false);
    }
  };

  const [isDownloadingUserList, setIsDownloadingUserList] = useState(false);

  const handleDownloadUserList = async () => {
    try {
      setIsDownloadingUserList(true);

      const params = new URLSearchParams({ tab: activeTab });
      if (filters.department) params.set("department", filters.department);
      if (filters.year) params.set("year", filters.year);
      if (filters.assessmentType)
        params.set("assessmentType", filters.assessmentType);

      const res = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/group/${groupId}/users/export?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        },
      );

      const contentDisposition = res.headers["content-disposition"] || "";
      const match = contentDisposition.match(/filename="([^"]+)"/);
      const fileName = match?.[1] || `${statsData?.name || "group"}_${activeTab}_Users.xlsx`;

      const url = URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);

      toast.success("User list downloaded");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to download user list",
      );
      console.error(error);
    } finally {
      setIsDownloadingUserList(false);
    }
  };

  if (isStatsLoading && !statsData) return <BulbAnimation />;
  if (isStatsError || !statsData) return <div>Failed to load group assessment</div>;

  const departmentOptions = buildOptions(
    statsData?.filterOptions?.departments || [],
    "All Departments",
  );
  const yearOptions = buildOptions(
    statsData?.filterOptions?.years || [],
    "All Years",
  );

  const tabConfig = [
    {
      key: "scheduled",
      label: "Scheduled",
      count: statsData?.scheduledCount || 0,
    },
    {
      key: "completed",
      label: "Completed",
      count: statsData?.completedCount || 0,
    },
    {
      key: "notCompleted",
      label: "Not Completed",
      count: statsData?.notCompletedCount || 0,
    },
    {
      key: "attempting",
      label: "Attempting",
      count: statsData?.attemptingCount || 0,
    },
  ];

  const suspiciousPercentage = statsData?.suspiciousPercentage ?? 0;

  return (
    <Wrapper>
      <BackButton className="w-fit" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </BackButton>

      <HeroTop>
        <HeroTitleWrap>
          <HeroTitle>{statsData?.name}</HeroTitle>
          <HeroMeta>Consolidated Result</HeroMeta>
        </HeroTitleWrap>

        <HeroFilters>
          <Select
            options={departmentOptions}
            value={
              departmentOptions.find(
                (option) => option.value === filters.department,
              ) || departmentOptions[0]
            }
            onChange={(option) =>
              setFilters((prev) => ({
                ...prev,
                department: option?.value || "",
              }))
            }
            theme={reactSelectTheme(name === "LIGHT" ? false : true)}
            isSearchable={false}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            components={{
              IndicatorSeparator: () => null,
            }}
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "46px",
                borderRadius: "6px",
                borderColor: "#d9d9d9",
                boxShadow: "none",
                background: name === "LIGHT" ? "#f5f5f5" : "#333333",
              }),
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
            placeholder="Select Department"
          />

          <Select
            options={yearOptions}
            value={
              yearOptions.find((option) => option.value === filters.year) ||
              yearOptions[0]
            }
            onChange={(option) =>
              setFilters((prev) => ({
                ...prev,
                year: option?.value || "",
              }))
            }
            theme={reactSelectTheme(name === "LIGHT" ? false : true)}
            isSearchable={false}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            components={{
              IndicatorSeparator: () => null,
            }}
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "46px",
                borderRadius: "6px",
                borderColor: "#d9d9d9",
                boxShadow: "none",
                background: name === "LIGHT" ? "#f5f5f5" : "#333333",
              }),
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
            placeholder="Select Year"
          />
        </HeroFilters>
      </HeroTop>
      <StatsGrid>
        <StatCard $variant="scheduled">
          <div>
            <StatLabel>Scheduled For</StatLabel>
            <StatValue>{statsData?.scheduledCount || 0} users</StatValue>
          </div>

          <StatIconWrap $variant="scheduled">
            <UsersRound size={20} strokeWidth={2.5} />
          </StatIconWrap>
        </StatCard>

        <StatCard $variant="completed">
          <div>
            <StatLabel>Completed</StatLabel>
            <StatValue>{statsData?.completedCount || 0}</StatValue>
          </div>

          <StatIconWrap $variant="completed">
            <Check size={20} strokeWidth={2.5} />
          </StatIconWrap>
        </StatCard>

        <StatCard $variant="notStarted">
          <div>
            <StatLabel>Not Started</StatLabel>
            <StatValue>{statsData?.notCompletedCount || 0}</StatValue>
          </div>

          <StatIconWrap $variant="notStarted">
            <Clock3 size={20} strokeWidth={2.5} />
          </StatIconWrap>
        </StatCard>

        <StatCard $variant="attending">
          <div>
            <StatLabel>Attending</StatLabel>
            <StatValue>{statsData?.attemptingCount || 0}</StatValue>
          </div>

          <StatIconWrap $variant="attending">
            <ChartColumnIncreasing size={20} strokeWidth={2.5} />
          </StatIconWrap>
        </StatCard>
        <StatCard $variant="suspecious">
          <div>
            <StatLabel>Suspecious Activity</StatLabel>
            <StatValue>{suspiciousPercentage}%</StatValue>
          </div>

          <StatIconWrap $variant="suspecious">
            <Info size={20} strokeWidth={2.5} />
          </StatIconWrap>
        </StatCard>
      </StatsGrid>

      <ChartsGrid>
        {isChartLoading ? (
          <ChartCard>
            <ChartTitle>Progress Distribution</ChartTitle>
            <BulbAnimation $height="220px" />
          </ChartCard>
        ) : (
          <ProgressDistributionChart
            distribution={distributionData || {}}
            totalCompleted={statsData?.completedCount || 0}
          />
        )}

        {isSectionChartLoading ? (
          <ChartCard>
            <ChartTitle>Section Wise Performance Graph</ChartTitle>
            <BulbAnimation $height="220px" />
          </ChartCard>
        ) : (
          <SectionWisePerformanceChart sectionRows={sectionPerformanceData} />
        )}
      </ChartsGrid>

      <Panel>
        <div>
          <TabsHeaderRow>
            <TabsWrap>
              {tabConfig.map((tab) => (
                <TabButton
                  key={tab.key}
                  active={activeTab === tab.key}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label} ({tab.count})
                </TabButton>
              ))}
            </TabsWrap>

            <DownloadButtonWrap>
              <Button
                className="w-fit"
                disabled={
                  activeTab === "completed"
                    ? isDownloadingCombinedResult
                    : isDownloadingUserList
                }
                onClick={
                  activeTab === "completed"
                    ? handleDownloadCombinedResult
                    : handleDownloadUserList
                }
                style={{
                  backgroundColor: "#10b981",
                  color: "#fff",
                  borderRadius: "6px",
                  minHeight: "46px",
                  padding: "0.8rem 1.2rem",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                {activeTab === "completed"
                  ? isDownloadingCombinedResult
                    ? "Downloading..."
                    : "Download Combined Result"
                  : isDownloadingUserList
                    ? "Downloading..."
                    : "Download User List"}
                <Download size={18} />
              </Button>
            </DownloadButtonWrap>
          </TabsHeaderRow>

          <div style={{ height: "1.25rem" }} />
          <SearchField>
            <Search size={18} />
            <input
              type="search"
              placeholder="Search..."
              value={studentSearch}
              onChange={(event) => setStudentSearch(event.target.value)}
            />
          </SearchField>

          <div style={{ height: "1.25rem" }} />

          {isTableLoading ? (
            <BulbAnimation $height="220px" />
          ) : activeTab === "completed" ? (
            <ResultsTable
              results={tableRows.map((row) => ({
                _id: row._id,
                username:
                  [row.user?.firstName, row.user?.lastName]
                    .filter(Boolean)
                    .join(" ") || "N/A",
                collegeRollNumber: row.user?.collegeRollNumber,
                obtainedMarks: row.obtainedMarks || 0,
                totalMarks: row.totalMarks || 0,
                percentage: row.percentage || 0,
                correct: row.correct || 0,
                wrong: row.wrong || 0,
                unattempted: row.unattempted || 0,
                violationsDone: row.violationsDone || 0,
                timeTakenInMs: row.timeTakenInMs || 0,
              }))}
              maxViolationsAllowed={tableRows[0]?.maxViolationsAllowed || 50}
              loaderRef={tableLoaderRef}
              isFetchingNextPage={isFetchingNextPage}
            />
          ) : (
            <>
              <UserTable
                users={tableRows.map((row) => row.user).filter(Boolean)}
              />
              <div ref={tableLoaderRef} style={{ minHeight: "1px" }} />
              {isFetchingNextPage && <BulbAnimation $height="220px" />}
            </>
          )}
        </div>
      </Panel>
    </Wrapper>
  );
};

export default GroupAssessmentView;
