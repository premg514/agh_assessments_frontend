import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import axiosInstance from "../../../services/apiconnector";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BulbAnimation from "../../../component/BulbAnimation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faListCheck,
  faQuestionCircle,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import testIllustration from "../../../assets/onlinetest.png";
import { initializeAssessment } from "../../../slices/aghAssessmentSlice";
import {
  ChecklistItem,
  CustomCheckbox,
  TestInstructionsStyle,
  Label,
  WarningBox,
  WarningText,
  ProgressBar,
  ProgressFill,
  ProgressText,
  ChecklistWrapper,
} from "../../../component/test-instructions/test-instructions-style";
import { Button } from "../../user/login/user-login-style";
import toast from "react-hot-toast";
import styled from "styled-components";

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  min-width: 500px;
  border-collapse: collapse;

  background: ${({ theme }) => theme.body.primary.base};
  color: ${({ theme }) => theme.text.primary};

  border-radius: 10px;
  overflow: hidden;
`;

const Th = styled.th`
  padding: 12px 14px;
  text-align: left;

  background: ${({ theme }) => theme.body.secondary.base};
  color: ${({ theme }) => theme.text.primary};

  font-weight: 600;
  font-size: 14px;

  border-bottom: 1px solid ${({ theme }) => theme.border.primary};
`;

const Td = styled.td`
  padding: 12px 14px;
  font-size: 14px;

  color: ${({ theme }) => theme.text.secondary};

  border-bottom: 1px solid ${({ theme }) => theme.border.primary};
`;

const SectionHeader = styled.th`
  padding: 14px;
  text-align: center;

  background: ${({ theme }) => theme.body.secondary.base};
  border-bottom: 1px solid ${({ theme }) => theme.border.primary};
  color: ${({ theme }) => theme.text.primary};

  font-size: 15px;
  font-weight: 600;
`;

const Tr = styled.tr``;

const fetchAssessment = async (id, token) => {
  const res = await axiosInstance.get(
    `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/user/assessments/${id}/instructions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data.data;
};

const AssessmentRules = [
  `You cannot move to the next section before the current one ends.`,
  `<strong>Plagiarism</strong> of any kind will not be tolerated. If a student is found guilty, their score will be reduced to <strong>0</strong>, and the matter will be reported to the <strong>Admin</strong>.`,
  `Switching tabs, minimizing the window, exiting full screen, or interacting with external applications <strong>(including pop-ups/notifications) will result in immediate auto-submission of the test.</strong>`,

  `The test will be <strong>automatically submitted</strong> after the final section.`,
  `Each question carries <strong>marks</strong> as specified.`,
];

const AssessmentRulesForTestWiseTime = [
  `<strong>Plagiarism</strong> of any kind will not be tolerated. If a student is found guilty, their score will be reduced to <strong>0</strong>, and the matter will be reported to the <strong>Admin</strong>.`,
  `Switching tabs, minimizing the window, exiting full screen, or interacting with external applications <strong>(including pop-ups/notifications) will result in immediate auto-submission of the test.</strong>`,

  `The test will be <strong>automatically submitted</strong> on time finish.`,
  `Each question carries <strong>marks</strong> as specified.`,
];

const GeneralRules = [
  `The test is divided into multiple sections, each with a fixed time limit.`,
  `Sections are unlocked sequentially and cannot be revisited once completed.`,
  `Each section will be automatically submitted once the time ends.`,
  `Do not refresh or exit the test during the assessment.`,
];

const GeneralRulesForTestWiseTime = [
  `The test is divided into multiple sections, `,
  `Do not refresh or exit the test during the assessment.`,
];

const AGHAssessmentInstructionsPage = ({ isProctoredTest = true }) => {
  const [checks, setChecks] = useState({
    closedOtherTabs: false,
    disabledNotifications: false,
    closedGoogleMeet: false,
    noPiP: false,
  });
  const { assessmentId } = useParams();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { scheduledTestId } = useSelector((state) => state.assessment);

  const checkedCount = Object.values(checks).filter(Boolean).length;
  const totalCount = Object.keys(checks).length;
  const progress = (checkedCount / totalCount) * 100;
  const allChecked = checkedCount === totalCount;

  const startAssessmentApi = async ({ assessmentId, token }) => {
    const res = await axiosInstance.post(
      `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/user/assessments/start`,
      { assessmentId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: startAssessmentApi,
    retry: (failureCount, error) => {
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
  });

  const handleStartTest = async (assessmentId, token) => {
    try {
      if (isProctoredTest && !allChecked) {
        toast.error("Please complete all checklist items!");
        return;
      }
      queryClient.removeQueries({ queryKey: ["onProgressAssessment"] });
      const data = await mutateAsync({ assessmentId, token });
      dispatch(initializeAssessment(data?.data));
      await document.documentElement.requestFullscreen();
      navigate(`/agh-tests/attempt`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to start test");
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["agh-assessment-instructions", assessmentId],
    queryFn: () => fetchAssessment(assessmentId, token),
    enabled: !!assessmentId && !!token,
  });

  if (isLoading) {
    return <BulbAnimation />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <TestInstructionsStyle>
      <div className="test-container">
        <div className="top-bar">
          <button className="back" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faAngleLeft} /> Back
          </button>
        </div>
        <div className="main-content">
          <div className="image-section">
            <img src={testIllustration} alt="Online Test" />
          </div>
          <div className="info-section">
            <div className="section">
              <h2 className="test-title">{data?.name}</h2>
              <div className="test-meta">
                <span className="span__box">
                  <FontAwesomeIcon icon={faQuestionCircle} />
                  <div>{data.totalQuestions} Questions</div>
                </span>
                <span className="span__box">
                  <FontAwesomeIcon icon={faListCheck} />
                  <div>{data?.totalMarks} Marks</div>
                </span>

                <span className="span__box">
                  <FontAwesomeIcon icon={faStopwatch} />
                  <div>{data?.duration} Minutes</div>
                </span>
              </div>
            </div>

            <div className="section">
              <h4>Genenral Instructions</h4>
              <ul className="quiz_instructions_container">
                {data?.timerRunType !== "Assessment"
                  ? GeneralRules?.map((detail, index) => (
                      <li
                        key={index}
                        className="instruction"
                        dangerouslySetInnerHTML={{ __html: detail }}
                      />
                    ))
                  : GeneralRulesForTestWiseTime?.map((detail, index) => (
                      <li
                        key={index}
                        className="instruction"
                        dangerouslySetInnerHTML={{ __html: detail }}
                      />
                    ))}
              </ul>
            </div>

            <TableWrapper>
              <StyledTable>
                <thead>
                  <tr>
                    <SectionHeader
                      colSpan={data?.timerRunType !== "Assessment" ? 4 : 3}
                    >
                      Section Overview
                    </SectionHeader>
                  </tr>
                  <tr>
                    <Th>Section Name</Th>
                    <Th>No. of Questions</Th>
                    {data?.timerRunType !== "Assessment" && <Th>Duration</Th>}
                    <Th>Marks</Th>
                  </tr>
                </thead>

                <tbody>
                  {data?.sections?.map((section, index) => {
                    const { totalQuestions, totalMarks } = section;

                    return (
                      <Tr
                        key={
                          section._id ||
                          section.id ||
                          `${section.name || "section"}-${index}`
                        }
                      >
                        <Td>{section.name}</Td>
                        <Td>{totalQuestions}</Td>
                        {data?.timerRunType !== "Assessment" && (
                          <Td>{section.sectionDuration} mins</Td>
                        )}
                        <Td>{totalMarks}</Td>
                      </Tr>
                    );
                  })}
                </tbody>
              </StyledTable>
            </TableWrapper>

            <div className="section">
              <h4>Assessment Rules</h4>
              <ul className="quiz_instructions_container">
                {data?.timerRunType !== "Assessment"
                  ? AssessmentRules?.map((detail, index) => (
                      <li
                        key={index}
                        className="instruction"
                        dangerouslySetInnerHTML={{ __html: detail }}
                      />
                    ))
                  : AssessmentRulesForTestWiseTime?.map((detail, index) => (
                      <li
                        key={index}
                        className="instruction"
                        dangerouslySetInnerHTML={{ __html: detail }}
                      />
                    ))}
              </ul>
            </div>

            {isProctoredTest && (
              <div className="section">
                <h2>Test Environment Setup</h2>

                <WarningBox>
                  <WarningText>
                    <strong>Important:</strong> Complete all checks to ensure no
                    popups interrupt your test!
                  </WarningText>
                </WarningBox>

                <ProgressText>
                  Progress:{" "}
                  <span>
                    {checkedCount} of {totalCount} completed
                  </span>
                </ProgressText>

                <ProgressBar>
                  <ProgressFill $progress={progress} />
                </ProgressBar>

                <ChecklistWrapper>
                  <ChecklistItem
                    $checked={checks.closedGoogleMeet}
                    onClick={() =>
                      setChecks({
                        ...checks,
                        closedGoogleMeet: !checks.closedGoogleMeet,
                      })
                    }
                  >
                    <CustomCheckbox $checked={checks.closedGoogleMeet}>
                      <input
                        type="checkbox"
                        checked={checks.closedGoogleMeet}
                        onChange={(e) =>
                          setChecks({
                            ...checks,
                            closedGoogleMeet: e.target.checked,
                          })
                        }
                      />
                    </CustomCheckbox>
                    <Label $checked={checks.closedGoogleMeet}>
                      I have closed all Google Meet tabs
                    </Label>
                  </ChecklistItem>

                  <ChecklistItem
                    $checked={checks.closedOtherTabs}
                    onClick={() =>
                      setChecks({
                        ...checks,
                        closedOtherTabs: !checks.closedOtherTabs,
                      })
                    }
                  >
                    <CustomCheckbox $checked={checks.closedOtherTabs}>
                      <input
                        type="checkbox"
                        checked={checks.closedOtherTabs}
                        onChange={(e) =>
                          setChecks({
                            ...checks,
                            closedOtherTabs: e.target.checked,
                          })
                        }
                      />
                    </CustomCheckbox>
                    <Label $checked={checks.closedOtherTabs}>
                      I have closed all other browser tabs
                    </Label>
                  </ChecklistItem>

                  <ChecklistItem
                    $checked={checks.disabledNotifications}
                    onClick={() =>
                      setChecks({
                        ...checks,
                        disabledNotifications: !checks.disabledNotifications,
                      })
                    }
                  >
                    <CustomCheckbox $checked={checks.disabledNotifications}>
                      <input
                        type="checkbox"
                        checked={checks.disabledNotifications}
                        onChange={(e) =>
                          setChecks({
                            ...checks,
                            disabledNotifications: e.target.checked,
                          })
                        }
                      />
                    </CustomCheckbox>
                    <Label $checked={checks.disabledNotifications}>
                      I have turned off browser notifications
                    </Label>
                  </ChecklistItem>

                  <ChecklistItem
                    $checked={checks.noPiP}
                    onClick={() =>
                      setChecks({
                        ...checks,
                        noPiP: !checks.noPiP,
                      })
                    }
                  >
                    <CustomCheckbox $checked={checks.noPiP}>
                      <input
                        type="checkbox"
                        checked={checks.noPiP}
                        onChange={(e) =>
                          setChecks({
                            ...checks,
                            noPiP: e.target.checked,
                          })
                        }
                      />
                    </CustomCheckbox>
                    <Label $checked={checks.noPiP}>
                      I have disabled Picture-in-Picture mode
                    </Label>
                  </ChecklistItem>
                </ChecklistWrapper>
              </div>
            )}

            <div className="start_quiz_box">
              {data?._id === scheduledTestId ? (
                <Button
                  $primary
                  disabled={!allChecked && isProctoredTest}
                  className="w-fit"
                  onClick={async () => {
                    try {
                      navigate(`/agh-tests/attempt`);
                      await document.documentElement.requestFullscreen();
                    } catch (error) {
                      console.error("Something went wrong", error);
                    }
                  }}
                >
                  Resume Quiz
                </Button>
              ) : (
                <Button
                  $primary
                  className="w-fit"
                  disabled={isPending || (!allChecked && isProctoredTest)}
                  onClick={async () => {
                    await handleStartTest(assessmentId, token);
                  }}
                >
                  {isPending ? "Starting Quiz..." : "Start Quiz"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </TestInstructionsStyle>
  );
};

export default AGHAssessmentInstructionsPage;
