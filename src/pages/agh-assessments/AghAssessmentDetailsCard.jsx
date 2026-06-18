import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../user/login/user-login-style";
import { format } from "date-fns";
import FlashoutPageComponent from "../../component/flash-out-page/flash-out-page-component";
import ConfirmationComponent from "../../component/confirmation/confirmation-component";
import { AppContext } from "../../context/AppContext";
import axiosInstance from "../../services/apiconnector";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPenToSquare,
  faPlus,
  faArrowRotateRight,
} from "@fortawesome/free-solid-svg-icons";

import {
  Card,
  Header,
  Title,
  StatusBadge,
  DetailsGrid,
  DetailItem,
  Actions,
  SectionsContainer,
  SectionCard,
  SectionTitle,
  SectionGrid,
} from "./AghAssessmentDetailsCard.styles";
import toast from "react-hot-toast";
import { ChevronRight, Download } from "lucide-react";
import { downloadAghGroupCombinedResult } from "../../utils/download/downloadAghGroupCombinedResult";

const formatDate = (date) => {
  return format(new Date(date), "dd MMM yyyy, hh:mm a");
};

const UndoDeleteToast = ({ onUndo }) => {
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        gap: "12px",
      }}
    >
      <span>Assessment deleted</span>
      <span
        style={{
          color: "#64748b",
          fontSize: "14px",
          whiteSpace: "nowrap",
        }}
      >
        {secondsLeft}s
      </span>
      <button
        type="button"
        onClick={onUndo}
        style={{
          background: "transparent",
          border: 0,
          color: "#2563eb",
          cursor: "pointer",
          fontWeight: 700,
          padding: 0,
        }}
      >
        Undo
      </button>
    </div>
  );
};

const DeleteConfirmationInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  color: #0f172a;
  font-size: 14px;
  margin-bottom: 16px;
  padding: 10px 12px;

  &:focus {
    border-color: #2563eb;
    outline: none;
  }
`;

const DeleteConfirmationHint = styled.p`
  color: #64748b;
  font-size: 13px;
  margin: 0 0 8px;
`;

const AGHAssessmentDetails = ({
  assessment,
  onEdit,
  handleClickView,
  handleViewLiveStatus,
  handleClickCreateCopy,
  handleClickAddAssessmentToGroup,
}) => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const queryClient = useQueryClient();
  const { componentName, setComponentName, setPopupbox, setLoading } =
    useContext(AppContext);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [groupNameInput, setGroupNameInput] = useState(assessment?.name || "");
  const [selectedGroupTest, setSelectedGroupTest] = useState(null);
  const [isDownloadingCombinedResult, setIsDownloadingCombinedResult] =
    useState(false);

  const handleDeleteAssessment = async (payload) => {
    return axiosInstance.delete(
      `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/${payload._id}`,
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      },
    );
  };

  const handleDeleteAssessmentFromGroup = async (payload) => {
    return axiosInstance.delete(
      `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/group/${payload.groupId}/assessments/${payload.assessmentId}`,
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      },
    );
  };

  const handleUndoDeleteAssessment = async (payload) => {
    return axiosInstance.post(
      `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/${payload._id}/undo-delete`,
      {},
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      },
    );
  };

  const handleUpdateGroupAssessment = async (payload) => {
    return axiosInstance.patch(
      `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/group/${payload.groupId}`,
      { name: payload.name },
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      },
    );
  };

  const showUndoDeleteToast = (_id) => {
    toast(
      (t) => (
        <UndoDeleteToast
          onUndo={() => {
            toast.dismiss(t.id);
            undoDeleteMutation.mutate({ token, _id });
          }}
        />
      ),
      { duration: 5000 },
    );
  };

  const undoDeleteMutation = useMutation({
    mutationFn: handleUndoDeleteAssessment,
    mutationKey: ["undo-delete-agh-assessment", assessment._id],
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["agh-assessment-by-admin"] });
      toast.success(data?.data?.message || "Assessment restored");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Unable to undo deletion");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: handleDeleteAssessment,
    mutationKey: ["agh-assessment-by-admin", assessment._id],
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["agh-assessment-by-admin"] });
      showUndoDeleteToast(variables._id);
      handleClickCancel();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Error on deletion");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const deleteGroupAssessmentMutation = useMutation({
    mutationFn: handleDeleteAssessmentFromGroup,
    mutationKey: ["delete-agh-assessment-from-group", assessment._id],
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["agh-assessment-by-admin"] });
      showUndoDeleteToast(variables.assessmentId);
      handleClickCancel();
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ||
          "Unable to delete assessment from group",
      );
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const updateGroupMutation = useMutation({
    mutationFn: handleUpdateGroupAssessment,
    mutationKey: ["update-agh-assessment-group", assessment._id],
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["agh-assessment-by-admin"] });
      toast.success(data?.data?.message || "Group updated successfully");
      handleClickCancel();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Unable to update group");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const getTotalQuestions = (config) => {
    if (!config) return 0;
    return (config.easy || 0) + (config.medium || 0) + (config.hard || 0);
  };

  const now = new Date();
  const start = new Date(assessment.startDateTime);
  const end = new Date(assessment.endDateTime);

  let status = "Upcoming";

  if (now >= start && now < end) status = "Running";
  if (now >= end) status = "Completed";

  const handleClickDelete = () => {
    setDeleteConfirmText("");
    setComponentName(`DELETE_AGH_ASSESSMENT_${assessment?._id}`);
    setPopupbox(true);
  };

  const handleClickEditGroup = () => {
    setGroupNameInput(assessment?.name || "");
    setComponentName(`EDIT_AGH_ASSESSMENT_GROUP_${assessment?._id}`);
    setPopupbox(true);
  };

  const handleClickCancel = () => {
    setDeleteConfirmText("");
    setSelectedGroupTest(null);
    setComponentName(null);
    setPopupbox(false);
  };

  const handleClickDeleteGroupTest = (test) => {
    setSelectedGroupTest(test);
    setDeleteConfirmText("");
    setComponentName(`DELETE_AGH_GROUP_TEST_${assessment?._id}_${test?._id}`);
    setPopupbox(true);
  };

  const handleDownloadCombinedResult = async () => {
    try {
      setIsDownloadingCombinedResult(true);

      await downloadAghGroupCombinedResult({
        groupId: assessment.groupId || assessment._id,
        groupName: assessment.name,
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

  const isGroup = assessment?.type === "group";

  if (isGroup) {
    const tests = assessment?.tests || [];

    return (
      <>
        {selectedGroupTest &&
          componentName ===
            `DELETE_AGH_GROUP_TEST_${assessment?._id}_${selectedGroupTest?._id}` && (
            <FlashoutPageComponent
              component={
                <ConfirmationComponent
                  title={"Delete Confirmation"}
                  detail={
                    "Do you want to delete this assessment from the group? Note: Results regarding this test will also be deleted."
                  }
                  confirmDisabled={deleteConfirmText !== "Delete"}
                  confirmLabel={
                    deleteGroupAssessmentMutation.isPending
                      ? "Deleting..."
                      : "Delete"
                  }
                  onClick={() => {
                    deleteGroupAssessmentMutation.mutate({
                      token,
                      groupId: assessment.groupId || assessment._id,
                      assessmentId: selectedGroupTest._id,
                    });
                  }}
                  handleClickCancel={handleClickCancel}
                >
                  <DeleteConfirmationHint>
                    Type Delete to enable the delete button.
                  </DeleteConfirmationHint>
                  <DeleteConfirmationInput
                    autoFocus
                    placeholder="Delete"
                    value={deleteConfirmText}
                    onChange={(event) =>
                      setDeleteConfirmText(event.target.value)
                    }
                  />
                </ConfirmationComponent>
              }
            />
          )}

        {componentName === `EDIT_AGH_ASSESSMENT_GROUP_${assessment?._id}` && (
          <FlashoutPageComponent
            component={
              <ConfirmationComponent
                title={"Edit Group"}
                detail={"Update the group name."}
                confirmDisabled={!groupNameInput.trim()}
                confirmLabel={
                  updateGroupMutation.isPending ? "Submitting..." : "Submit"
                }
                onClick={() => {
                  updateGroupMutation.mutate({
                    token,
                    groupId: assessment._id,
                    name: groupNameInput,
                  });
                }}
                handleClickCancel={handleClickCancel}
              >
                <DeleteConfirmationHint>Group Name</DeleteConfirmationHint>
                <DeleteConfirmationInput
                  autoFocus
                  placeholder="Enter group name"
                  value={groupNameInput}
                  onChange={(event) => setGroupNameInput(event.target.value)}
                />
              </ConfirmationComponent>
            }
          />
        )}

        <Card>
          <Header>
            <Title>{assessment.name}</Title>

            <Actions>
              <div className="buttons_container group_header_actions">
                {user?.accountType === "Admin" && (
                  <Button
                    className="w-fit group_action_button group_edit_button"
                    onClick={handleClickEditGroup}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    Edit
                  </Button>
                )}

                {user?.accountType === "Admin" && (
                  <Button
                    className="w-fit group_action_button group_add_button"
                    onClick={() => handleClickAddAssessmentToGroup(assessment)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    Add
                  </Button>
                )}
              </div>
            </Actions>
          </Header>

          <SectionsContainer>
            <h3>Assessments ({tests.length})</h3>

            {tests.map((test) => {
              const now = new Date();
              const start = new Date(test.startDateTime);
              const end = new Date(test.endDateTime);
              let status = "Upcoming";

              if (now >= start && now < end) status = "Running";
              if (now >= end) status = "Completed";
              return (
                <SectionCard key={test._id}>
                  <Header>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <SectionTitle>{test.name}</SectionTitle>
                      <StatusBadge status={status}>{status}</StatusBadge>
                    </div>

                    <div className="buttons_container">
                      {status === "Upcoming" && (
                        <>
                          {user?.accountType === "Admin" && (
                            <FontAwesomeIcon
                              onClick={handleClickEditGroup}
                              icon={faPenToSquare}
                            />
                          )}
                        </>
                      )}

                      <ChevronRight onClick={() => handleClickView(test)} />
                    </div>
                  </Header>

                  <DetailsGrid>
                    <DetailItem>
                      <span>Start Date & Time</span>
                      <span>{formatDate(test.startDateTime)}</span>
                    </DetailItem>

                    <DetailItem>
                      <span>End Date & Time</span>
                      <span>{formatDate(test.endDateTime)}</span>
                    </DetailItem>

                    <DetailItem>
                      <span>Duration</span>
                      <span>{test.duration} minutes</span>
                    </DetailItem>

                    <DetailItem>
                      <span>Timer Run Type</span>
                      <span>{test.timerRunType}</span>
                    </DetailItem>
                  </DetailsGrid>
                </SectionCard>
              );
            })}
          </SectionsContainer>

          <Actions>
            <div className="buttons_container">
              {user?.accountType === "Admin" && (
                <>
                  <Button
                    className="w-fit"
                    onClick={() => handleClickView(assessment)}
                  >
                    View
                  </Button>
                </>
              )}
              {user?.accountType === "Admin" && (
                <>
                  <Button
                    className="w-fit group_download_button"
                    $primary
                    disabled={isDownloadingCombinedResult}
                    onClick={handleDownloadCombinedResult}
                  >
                    {isDownloadingCombinedResult
                      ? "Downloading..."
                      : "Download Combine Result"}
                    <Download size={20} />
                  </Button>
                </>
              )}
            </div>
          </Actions>
        </Card>
      </>
    );
  }

  return (
    <>
      {componentName === `DELETE_AGH_ASSESSMENT_${assessment?._id}` && (
        <FlashoutPageComponent
          component={
            <ConfirmationComponent
              title={"Delete Confirmation"}
              detail={
                "Do you want to delete this assessment ? Note: Results regarding this test will also be deleted."
              }
              confirmDisabled={deleteConfirmText !== "Delete"}
              confirmLabel="Delete"
              onClick={() => {
                let _id = assessment._id;
                deleteMutation.mutate({ token, _id });
              }}
              handleClickCancel={handleClickCancel}
            >
              <DeleteConfirmationHint>
                Type Delete to enable the delete button.
              </DeleteConfirmationHint>
              <DeleteConfirmationInput
                autoFocus
                placeholder="Delete"
                value={deleteConfirmText}
                onChange={(event) => setDeleteConfirmText(event.target.value)}
              />
            </ConfirmationComponent>
          }
        />
      )}
      <Card>
        <Header>
          <Title>{assessment.name}</Title>
          <StatusBadge status={status}>{status}</StatusBadge>
        </Header>

        <DetailsGrid>
          <DetailItem>
            <span>Start Date & Time</span>
            <span>{formatDate(assessment.startDateTime)}</span>
          </DetailItem>

          <DetailItem>
            <span>End Date & Time</span>
            <span>{formatDate(assessment.endDateTime)}</span>
          </DetailItem>

          <DetailItem>
            <span>Duration</span>
            <span>{assessment.duration} minutes</span>
          </DetailItem>

          <DetailItem>
            <span>Timer Run Type</span>
            <span>{assessment.timerRunType}</span>
          </DetailItem>
        </DetailsGrid>

        <SectionsContainer>
          <h3>Sections</h3>

          {assessment.sections?.map((section) => {
            const codingTotal = getTotalQuestions(
              section.codingProblemsGetOnTest,
            );
            const mcqTotal = getTotalQuestions(section.mcqProblemsGetOnTest);
            const sqlTotal = getTotalQuestions(section.sqlProblemsGetOnTest);

            return (
              <SectionCard key={section._id}>
                <SectionTitle>{section.name}</SectionTitle>

                <SectionGrid>
                  <div>
                    <strong>Coding Questions</strong>
                    <div>{codingTotal}</div>
                  </div>

                  <div>
                    <strong>MCQ Questions</strong>
                    <div>{mcqTotal}</div>
                  </div>

                  <div>
                    <strong>SQL Questions</strong>
                    <div>{sqlTotal}</div>
                  </div>

                  <div>
                    <strong>Total Questions</strong>
                    <div>{codingTotal + mcqTotal + sqlTotal}</div>
                  </div>
                </SectionGrid>
              </SectionCard>
            );
          })}
        </SectionsContainer>

        <Actions>
          <div className="buttons_container">
            {user?.accountType === "Admin" && (
              <>
                <Button
                  className="w-fit"
                  onClick={() => handleClickCreateCopy(assessment)}
                >
                  Create Copy
                </Button>

                <Button className="w-fit" $primary onClick={handleClickDelete}>
                  {componentName === `DELETE_AGH_ASSESSMENT_${assessment?._id}`
                    ? "Clicked"
                    : "Delete"}
                </Button>

                {status === "Upcoming" && (
                  <>
                    <Button
                      className="w-fit"
                      onClick={() => onEdit(assessment)}
                    >
                      Edit
                    </Button>
                  </>
                )}
              </>
            )}

            <Button
              className="w-fit"
              onClick={() => {
                handleClickView(assessment);
              }}
            >
              View
            </Button>
            <Button
              className="w-fit"
              onClick={() => {
                handleViewLiveStatus(assessment);
              }}
            >
              Live tracking
            </Button>
          </div>
        </Actions>
      </Card>
    </>
  );
};

export default AGHAssessmentDetails;
