import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import Select from "react-select";
import axiosInstance from "../../../services/apiconnector";
import { useSelector } from "react-redux";
import { reactSelectTheme } from "../../../theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faDownload,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import BulbAnimation from "../../../component/BulbAnimation";
import { BackButton } from "../../collection-info-user/styles";
import StudentResults from "./test-completed-by-students/Index";
import AGHAssessmentOverview from "./AGHAssessmentOverview";
import { Button } from "../../user/login/user-login-style";
import toast from "react-hot-toast";
import {
  Wrapper,
  TabsWrap,
  TabButton,
  TableWrap,
  TableScroll,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  NameCell,
  RollBadge,
  DeptText,
  YearBadge,
  EmptyState,
  SectionTableWrapper,
  SectionStyledTable,
  SectionHeader,
  SectionTh,
  SectionTd,
  SectionTr,
} from "./ViewAGHAssessment.styles";

const getSectionQuestionCount = (section = {}) =>
  (section.mcqProblems?.length || 0) +
  (section.codingProblems?.length || 0) +
  (section.sqlProblems?.length || 0);

const getSectionMarks = (section = {}) => {
  const mcqMarks =
    (section.mcqProblemsGetOnTest?.easy || 0) *
      (section.mcqProblemsMarkConfig?.easy || 0) +
    (section.mcqProblemsGetOnTest?.medium || 0) *
      (section.mcqProblemsMarkConfig?.medium || 0) +
    (section.mcqProblemsGetOnTest?.hard || 0) *
      (section.mcqProblemsMarkConfig?.hard || 0);

  const codingMarks =
    (section.codingProblemsGetOnTest?.easy || 0) *
      (section.codingProblemsMarkConfig?.easy || 0) +
    (section.codingProblemsGetOnTest?.medium || 0) *
      (section.codingProblemsMarkConfig?.medium || 0) +
    (section.codingProblemsGetOnTest?.hard || 0) *
      (section.codingProblemsMarkConfig?.hard || 0);

  const sqlMarks =
    (section.sqlProblemsGetOnTest?.easy || 0) *
      (section.sqlProblemsMarkConfig?.easy || 0) +
    (section.sqlProblemsGetOnTest?.medium || 0) *
      (section.sqlProblemsMarkConfig?.medium || 0) +
    (section.sqlProblemsGetOnTest?.hard || 0) *
      (section.sqlProblemsMarkConfig?.hard || 0);

  return mcqMarks + codingMarks + sqlMarks;
};

function SectionOverviewTable({ assessment }) {
  if (!assessment?.sections?.length) return null;

  return (
    <SectionTableWrapper>
      <SectionStyledTable>
        <thead>
          <SectionTr>
            <SectionHeader
              colSpan={assessment?.timerRunType !== "Assessment" ? 4 : 3}
            >
              Section Overview
            </SectionHeader>
          </SectionTr>
          <SectionTr>
            <SectionTh>Section Name</SectionTh>
            <SectionTh>No. of Questions</SectionTh>
            {assessment?.timerRunType !== "Assessment" && (
              <SectionTh>Duration</SectionTh>
            )}
            <SectionTh>Marks</SectionTh>
          </SectionTr>
        </thead>

        <tbody>
          {assessment.sections.map((section) => (
            <SectionTr key={section._id}>
              <SectionTd>{section.name}</SectionTd>
              <SectionTd>{getSectionQuestionCount(section)}</SectionTd>
              {assessment?.timerRunType !== "Assessment" && (
                <SectionTd>{section.sectionDuration} mins</SectionTd>
              )}
              <SectionTd>{getSectionMarks(section)}</SectionTd>
            </SectionTr>
          ))}
        </tbody>
      </SectionStyledTable>
    </SectionTableWrapper>
  );
}

export function UserTable({ users }) {
  if (!users || users.length === 0) {
    return (
      <TableWrap>
        <EmptyState>No users found.</EmptyState>
      </TableWrap>
    );
  }

  return (
    <TableWrap>
      <TableScroll>
        <Table>
          <Thead>
            <tr>
              <Th style={{ width: "30%" }}>Name</Th>
              <Th style={{ width: "15%" }}>Roll No.</Th>
              <Th style={{ width: "25%" }}>Department</Th>
              <Th style={{ width: "15%" }}>Year</Th>
              <Th style={{ width: "20%" }}>Email</Th>
            </tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                <Td>
                  <NameCell>
                    {user.firstName} {user.lastName}
                  </NameCell>
                </Td>
                <Td>
                  <RollBadge>{user.collegeRollNumber || "N/A"}</RollBadge>
                </Td>
                <Td>
                  <DeptText>{user.department}</DeptText>
                </Td>
                <Td>
                  <YearBadge>{user.year}</YearBadge>
                </Td>
                <Td style={{ color: "#5a7fa8", fontSize: "12px" }}>
                  {user.email}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableScroll>
    </TableWrap>
  );
}

const buildUserFilterParams = (filters = {}) => {
  const params = {};

  if (filters.department) {
    params.department = filters.department;
  }

  if (filters.year) {
    params.year = filters.year;
  }

  return params;
};

const buildSelectOptions = (values = []) =>
  values.map((value) => ({
    value,
    label: value,
  }));

const fetchAssessment = async (id, token, filters, adminId) => {
  const res = await axiosInstance.get(
    `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        ...buildUserFilterParams(filters),
        adminId: adminId || "",
      },
    },
  );

  return res.data.data;
};

const ViewAssessmentDetailsForAdmin = () => {
  const { assessmentId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const adminId = queryParams.get("adminId");

  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { name } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.profile);
  const [activeTab, setActiveTab] = useState("scheduled");
  const [filters, setFilters] = useState({
    department: "",
    year: "",
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "agh-assessment-details",
      assessmentId,
      filters.department,
      filters.year,
      adminId,
    ],
    queryFn: () => fetchAssessment(assessmentId, token, filters, adminId),
    enabled: !!assessmentId && !!token,
    placeholderData: (previousData) => previousData,
  });

  const downloadStudentsList = async (data) => {
    const res = await axiosInstance.get(
      `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/${assessmentId}/download-students-list`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
        params: {
          activeTab: data.activeTab,
          ...buildUserFilterParams(data),
          adminId: adminId || "",
        },
      },
    );
    return res.data;
  };

  const { mutate: downloadMutation, isPending } = useMutation({
    mutationFn: downloadStudentsList,

    onSuccess: (data, variables) => {
      // 🔥 Create file download
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", `${variables.activeTab}-students.xlsx`);

      document.body.appendChild(link);
      link.click();
      link.remove();
    },

    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
      console.error(error);
    },
  });

  if (isLoading && !data) return <BulbAnimation />;
  if (isError) return <div>Failed to load assessment</div>;

  const getUsers = () => {
    if (activeTab === "scheduled") return data.scheduledForUsers;
    if (activeTab === "completed") return data.usersWhoCompleted;
    if (activeTab === "attempting") return data.usersWhoAttempting;
    return data.usersWhoNotCompleted;
  };

  const tabConfig = [
    {
      key: "scheduled",
      label: "Scheduled",
      count: data.scheduledForUsers.length,
    },
    {
      key: "completed",
      label: "Completed",
      count: data.usersWhoCompleted.length,
    },
    {
      key: "notCompleted",
      label: "Not Completed",
      count: data.usersWhoNotCompleted.length,
    },
    {
      key: "attempting",
      label: "Attempting",
      count: data?.usersWhoAttempting?.length,
    },
  ];

  const users = getUsers();
  const departmentOptions = data?.filterOptions?.departments || [];
  const yearOptions = data?.filterOptions?.years || [];
  const hasActiveFilters = Boolean(filters.department || filters.year);
  const selectedDepartmentOption =
    buildSelectOptions(departmentOptions).find(
      (option) => option.value === filters.department,
    ) || null;
  const selectedYearOption =
    buildSelectOptions(yearOptions).find(
      (option) => option.value === filters.year,
    ) || null;

  return (
    <Wrapper>
      <BackButton
        className="w-fit"
        style={{ marginBottom: ".5rem" }}
        onClick={() => {
          navigate(-1);
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </BackButton>

      <AGHAssessmentOverview assessment={data} />

      {user?.accountType === "JuniorCollegeAdmin" && (
        <SectionOverviewTable assessment={data} />
      )}

      {/* Student Tabs */}

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: "1 1 720px", minWidth: 0 }}>
          <TabsWrap>
            {tabConfig.map((tab) => (
              <TabButton
                key={tab.key}
                active={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
                disabled={isPending}
              >
                {tab.label} ({tab.count})
              </TabButton>
            ))}
          </TabsWrap>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              alignItems: "center",
              marginBottom: "1.25rem",
            }}
          >
            <div style={{ minWidth: "220px", flex: "1 1 220px" }}>
              <Select
                options={buildSelectOptions(departmentOptions)}
                value={selectedDepartmentOption}
                theme={reactSelectTheme(name === "LIGHT" ? false : true)}
                onChange={(option) =>
                  setFilters((prev) => ({
                    ...prev,
                    department: option?.value || "",
                  }))
                }
                isClearable
                placeholder="All Departments"
              />
            </div>

            <div style={{ minWidth: "160px", flex: "1 1 160px" }}>
              <Select
                options={buildSelectOptions(yearOptions)}
                value={selectedYearOption}
                theme={reactSelectTheme(name === "LIGHT" ? false : true)}
                onChange={(option) =>
                  setFilters((prev) => ({
                    ...prev,
                    year: option?.value || "",
                  }))
                }
                isClearable
                placeholder="All Years"
              />
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={() =>
                  setFilters({
                    department: "",
                    year: "",
                  })
                }
                style={{
                  height: "40px",
                  padding: "0 14px",
                  borderRadius: "10px",
                  border: "1px solid #d6dbe3",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        <Button
          onClick={() => {
            downloadMutation({
              activeTab,
              ...filters,
            });
          }}
          className="w-fit"
          disabled={isPending}
        >
          <FontAwesomeIcon
            spin={isPending}
            icon={isPending ? faSpinner : faDownload}
          />
          Users
        </Button>
      </div>

      {activeTab === "completed" ? (
        <StudentResults
          assessmentId={assessmentId}
          maxViolationsAllowed={data?.maxViolationsAllowed}
          filters={filters}
          adminId={adminId}
        />
      ) : (
        <UserTable users={users} />
      )}
    </Wrapper>
  );
};

export default ViewAssessmentDetailsForAdmin;
