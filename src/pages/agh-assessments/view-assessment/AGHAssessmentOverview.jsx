import { useContext, useState } from "react";
import styled from "styled-components";
import { format, isBefore } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import FlashoutPageComponent from "../../../component/flash-out-page/flash-out-page-component";
import { AppContext } from "../../../context/AppContext";
import UsersSelection from "../../../component/users-selection-component/Index";
import { Button } from "../../user/login/user-login-style";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../services/apiconnector";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  PageWrap,
  Header,
  TitleGroup,
  AssessmentTitle,
  AssessmentMeta,
  Badge,
  StatsGrid,
  StatCard,
  StatLabel,
  StatValue,
  InfoGrid,
  InfoCard,
  InfoCardTitle,
  InfoRow,
  InfoKey,
  InfoVal,
  SectionLabel,
  SectionCard,
  SectionHeader,
  SectionName,
  SectionHeaderRight,
  Chevron,
  SectionBody,
  ProbGrid,
  ProbBlock,
  ProbTypeLabel,
  DiffGroup,
  DiffRow,
  DiffVal,
  TotalRow,
  TotalVal,
  UserSelectionEditStyle,
} from "./AGHAssessmentOverview.styles";
import ConfirmationComponent from "../../../component/confirmation/confirmation-component";
import { useNavigate, useSearchParams } from "react-router-dom";

function ProblemConfig({ label, data, badgeVariant }) {
  return (
    <ProbBlock>
      <ProbTypeLabel>
        {label} &nbsp;
        <Badge variant={badgeVariant}>{data.total}</Badge>
      </ProbTypeLabel>
      <TotalRow>
        <span>Total problems</span>
        <TotalVal>{data.total}</TotalVal>
      </TotalRow>
      <DiffGroup>Get on test</DiffGroup>
      {["easy", "medium", "hard"].map((d) => (
        <DiffRow key={d}>
          <span style={{ textTransform: "capitalize" }}>{d}</span>
          <DiffVal>{data.getOnTest[d]}</DiffVal>
        </DiffRow>
      ))}
      <DiffGroup>Marks config</DiffGroup>
      {["easy", "medium", "hard"].map((d) => (
        <DiffRow key={d}>
          <span style={{ textTransform: "capitalize" }}>{d}</span>
          <DiffVal>
            {data.marksConfig[d]} pt{data.marksConfig[d] !== 1 ? "s" : ""}
          </DiffVal>
        </DiffRow>
      ))}
    </ProbBlock>
  );
}

function Section({ section }) {
  const [open, setOpen] = useState(false);
  let formattedData = {
    _id: section._id,
    name: section.name,
    mcq: {
      total: section.mcqProblems.length,
      marksConfig: section.mcqProblemsMarkConfig,
      getOnTest: section.mcqProblemsGetOnTest,
    },
    coding: {
      total: section.codingProblems.length,
      marksConfig: section.codingProblemsMarkConfig,
      getOnTest: section.codingProblemsGetOnTest,
    },
    sql: {
      total: section.sqlProblems.length,
      marksConfig: section.sqlProblemsMarkConfig,
      getOnTest: section.sqlProblemsGetOnTest,
    },
  };
  const totalBadges = [
    { label: `${formattedData.mcq.total} MCQ`, variant: "blue" },
    { label: `${formattedData.coding.total} Coding`, variant: "purple" },
    { label: `${formattedData.sql.total} SQL`, variant: "gray" },
  ];

  return (
    <SectionCard>
      <SectionHeader $open={open} onClick={() => setOpen((o) => !o)}>
        <SectionName>{formattedData.name}</SectionName>
        <SectionHeaderRight>
          {totalBadges.map((b) => (
            <Badge key={b.label} variant={b.variant}>
              {b.label}
            </Badge>
          ))}
          <Chevron $open={open}>▼</Chevron>
        </SectionHeaderRight>
      </SectionHeader>
      <SectionBody $open={open}>
        <ProbGrid>
          <ProblemConfig
            label="MCQ"
            data={formattedData.mcq}
            badgeVariant="blue"
          />
          <ProblemConfig
            label="Coding"
            data={formattedData.coding}
            badgeVariant="purple"
          />
          <ProblemConfig
            label="SQL"
            data={formattedData.sql}
            badgeVariant="gray"
          />
        </ProbGrid>
      </SectionBody>
    </SectionCard>
  );
}

export default function AGHAssessmentOverview({ assessment }) {
  const { componentName, setComponentName, setPopupbox, setLoading } =
    useContext(AppContext);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const queryClient = useQueryClient();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [endDateTimeInput, setEndDateTimeInput] = useState("");

  const toDateTimeLocalValue = (dateValue) => {
    if (!dateValue) return "";

    const date = new Date(dateValue);
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - timezoneOffset);

    return localDate.toISOString().slice(0, 16);
  };

  const updateEndDateTime = async (data) => {
    const res = await axiosInstance.patch(
      `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/${assessment._id}/end-date-time`,
      {
        endDateTime: data.endDateTime,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  };

  const addExtraStudents = async (data) => {
    const res = await axiosInstance.patch(
      `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/${assessment._id}/add-extra-students`,
      { extraScheduledForUsers: data.extraScheduledForUsersIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  };

  const changeResultStatus = async (data) => {
    const res = await axiosInstance.patch(
      `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/${assessment._id}/change-result-status`,
      { status: data.status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: addExtraStudents,

    onSuccess: () => {
      queryClient.invalidateQueries(["agh-assessment-details", assessment._id]);
      setSelectedStudents([]);
    },

    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
      console.error(error);
    },
    onSettled: () => {
      setComponentName(null);
      setPopupbox(false);
    },
  });

  const { mutate: resultStatusChangeMutation } = useMutation({
    mutationFn: changeResultStatus,

    onMutate: () => {
      setLoading(true);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["agh-assessment-details", assessment._id]);
    },

    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
      console.error(error);
    },
    onSettled: () => {
      setLoading(false);
      setPopupbox(false);
      setComponentName(null);
    },
  });

  const { mutate: updateEndDateTimeMutation, isPending: isUpdatingEndTime } =
    useMutation({
      mutationFn: updateEndDateTime,

      onMutate: () => {
        setLoading(true);
      },

      onSuccess: () => {
        toast.success("End date/time updated successfully");
        queryClient.invalidateQueries([
          "agh-assessment-details",
          assessment._id,
        ]);
      },

      onError: (error) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
        console.error(error);
      },

      onSettled: () => {
        setLoading(false);
        setPopupbox(false);
        setComponentName(null);
      },
    });

  const handleClickCancel = () => {
    setPopupbox(false);
    setComponentName(null);
  };
  const navigate = useNavigate();
  const collegeName = searchParams.get("collegeName") || user?.collegeName;

  return (
    <PageWrap>
      {/* Header */}

      {componentName === "PUBLISH_RESULT" && (
        <FlashoutPageComponent
          component={
            <ConfirmationComponent
              onClick={() => {
                resultStatusChangeMutation({ status: true });
              }}
              handleClickCancel={handleClickCancel}
              title={"Publish Result"}
              detail={"Are you sure to publish this test Result?"}
            />
          }
        />
      )}

      {componentName === "DRAFT_RESULT" && (
        <FlashoutPageComponent
          component={
            <ConfirmationComponent
              onClick={() => {
                resultStatusChangeMutation({ status: false });
              }}
              handleClickCancel={handleClickCancel}
              title={"Draft Result"}
              detail={"Are you sure to draft this test Result?"}
            />
          }
        />
      )}

      {componentName === "EDIT_STUDENTS" && (
        <FlashoutPageComponent
          component={
            <UserSelectionEditStyle>
              <UsersSelection
                apiUrl={`/v1/agh-assessments/admin/assessments/${assessment._id}/not-selected-students`}
                selectedUsers={selectedStudents}
                setSelectedUsers={setSelectedStudents}
                collegeName={collegeName}
              />
              <div className="footer_user_selection">
                <Button
                  disabled={isPending}
                  $primary
                  className="w-fit"
                  onClick={handleClickCancel}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isPending}
                  className="w-fit"
                  onClick={() => {
                    let extraScheduledForUsersIds = selectedStudents.map(
                      (s) => s._id,
                    );
                    mutate({
                      extraScheduledForUsersIds,
                    });
                  }}
                >
                  {isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            </UserSelectionEditStyle>
          }
        />
      )}

      {componentName === "EDIT_END_DATE_TIME" && (
        <FlashoutPageComponent
          component={
            <div
              style={{
                width: "420px",
                maxWidth: "90vw",
                background: "#fff",
                padding: "1.25rem",
                borderRadius: "10px",
              }}
            >
              <h3 style={{ marginBottom: "1rem" }}>Edit End Date / Time</h3>

              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "0.4rem",
                }}
              >
                End date / time
              </label>

              <input
                type="datetime-local"
                value={endDateTimeInput}
                onChange={(event) => setEndDateTimeInput(event.target.value)}
                style={{
                  width: "100%",
                  height: "42px",
                  padding: "0 12px",
                  border: "1px solid #d6dbe3",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                }}
              />

              <div style={{ display: "flex", gap: "8px" }}>
                <Button
                  disabled={isUpdatingEndTime}
                  $primary
                  className="w-fit"
                  onClick={handleClickCancel}
                >
                  Cancel
                </Button>

                <Button
                  disabled={isUpdatingEndTime || !endDateTimeInput}
                  className="w-fit"
                  onClick={() => {
                    updateEndDateTimeMutation({
                      endDateTime: new Date(endDateTimeInput).toISOString(),
                    });
                  }}
                >
                  {isUpdatingEndTime ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          }
        />
      )}

      <Header>
        <TitleGroup>
          <AssessmentTitle>{assessment.name}</AssessmentTitle>
          <AssessmentMeta>AGH Assessment · ID: {assessment._id}</AssessmentMeta>
        </TitleGroup>

        <div>
          {(user?.accountType === "Admin" ||
            user?.accountType === "SuperAdmin") && (
            <Button
              onClick={() => {
                let text = assessment?.isResultPublished
                  ? "DRAFT_RESULT"
                  : "PUBLISH_RESULT";
                setComponentName(text);
                setPopupbox(true);
              }}
              className="w-fit"
            >
              {assessment?.isResultPublished
                ? "Draft Result"
                : "Publish Result"}
            </Button>
          )}
          <Button
            onClick={() => {
              window.open(
                `/agh-assessments/live-tracking/${assessment._id}`,
                "_blank",
                "noopener,noreferrer",
              );
            }}
            className="w-fit"
          >
            Live tracking
          </Button>
        </div>
      </Header>

      {/* Stats */}
      <StatsGrid>
        <StatCard>
          <StatLabel>Duration</StatLabel>
          <StatValue>{assessment.duration} min</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Scheduled for</StatLabel>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <StatValue>
              {assessment.scheduledForUsers?.length} user
              {assessment.scheduledForUsers?.length !== 1 ? "s" : ""}
            </StatValue>

            {(user?.accountType === "Admin" ||
              user?.accountType === "SuperAdmin") && (
              <button
                onClick={() => {
                  setComponentName("EDIT_STUDENTS");
                  setPopupbox(true);
                }}
                style={{
                  borderRadius: "50px",
                  padding: "0.5rem",
                  backgroundColor: "#fafafa",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            )}
          </div>
        </StatCard>
        <StatCard>
          <StatLabel>Completed</StatLabel>
          <StatValue $color="#1a5c34">
            {assessment.usersWhoCompleted?.length}
          </StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Max Allowed violations</StatLabel>
          <StatValue>{assessment.maxViolationsAllowed}</StatValue>
        </StatCard>
      </StatsGrid>

      {/* Info cards */}
      <InfoGrid>
        <InfoCard>
          <InfoCardTitle>Schedule</InfoCardTitle>
          <InfoRow>
            <InfoKey>Start date / time</InfoKey>
            <InfoVal>
              {format(assessment.startDateTime, "dd-MMM-yy hh:mm a")}
            </InfoVal>
          </InfoRow>
          <InfoRow>
            <InfoKey>End date / time</InfoKey>
            <InfoVal
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {format(assessment.endDateTime, "dd-MMM-yy hh:mm a")}

              {(user?.accountType === "Admin" ||
                user?.accountType === "SuperAdmin") && (
                <button
                  type="button"
                  onClick={() => {
                    setEndDateTimeInput(
                      toDateTimeLocalValue(assessment.endDateTime),
                    );
                    setComponentName("EDIT_END_DATE_TIME");
                    setPopupbox(true);
                  }}
                  style={{
                    border: "none",
                    background: "#f5f6f8",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  title="Edit end date/time"
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              )}
            </InfoVal>
          </InfoRow>

          <InfoRow>
            <InfoKey>Timer type</InfoKey>
            <InfoVal>{assessment.timerRunType}</InfoVal>
          </InfoRow>
        </InfoCard>
      </InfoGrid>

      {/* Sections */}
      {user?.accountType !== "JuniorCollegeAdmin" && (
        <div>
          <SectionLabel>Sections ({assessment.sections.length})</SectionLabel>
          {assessment.sections.map((sec) => (
            <Section key={sec._id} section={sec} />
          ))}
        </div>
      )}
    </PageWrap>
  );
}
