import React, { useRef, useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuestionPreview from "../../../../../../component/questionPreview.jsx/QuestionPreview";
import axiosInstance from "../../../../../../services/apiconnector";
import { useSelector } from "react-redux";
import {
  convertDataIntoQuestionPreviewFormat,
  getCorrectUrlForDeleteQuestion,
} from "../../../../../super-admin/test-list-page/utils/functions";
import PaginationComponent from "../../../../../../component/pagination/pagination-component";
import FlashoutPageComponent from "../../../../../../component/flash-out-page/flash-out-page-component";
import TestEditComponent from "../../../../../test-edit-page/test-edit-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faTrashAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../../../../../context/AppContext";
import ConfirmationComponent from "../../../../../../component/confirmation/confirmation-component";
import { toast } from "react-hot-toast";
import { Section, H1 } from "../../../technical/questions/topicList/style";
import { BoxButton } from "../../../../../companies/company-tests/companyTests";
import { Button } from "../../../../../user/login/user-login-style";
import {
  BoxButtonsContainer,
  FlexSpaceBetween,
} from "../../../technical/questions/topicList/topicList-style";
import { QuestionsContainer } from "../../../technical/questions/questions-style";
import RejectReason from "../../../../../../component/reject-reason/reject-reason";
import BulbAnimation from "../../../../../../component/BulbAnimation";

const ViewRejectedQuestionsPage = () => {
  const { testId } = useParams();
  const [testInfo, setTestInfo] = useState(null);
  const [reasonInfo, setReasonInfo] = useState(null);
  // below variable related to  AptitudeELearningQuestionMcqSuperadminJunior similiar Schema
  const [aptitudeELearningMCQSchemaId, setaptitudeELearningMCQSchemaId] =
    useState(null);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [questions, setQuestions] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const questionIdRef = useRef(null);
  const navigate = useNavigate();
  const { setPopupbox, componentName, setComponentName } =
    useContext(AppContext);

  const handleDeleteQuestionSuperAdminJunior = async (
    testId,
    questionId,
    endPoint
  ) => {
    const taostId = toast.loading("Please wait...");
    try {
      const getQuestion = await axiosInstance.delete(
        import.meta.env.VITE_BASE_URL + `/v1/${endPoint}`,
        {
          params: {
            testId,
            questionId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.dismiss(taostId);
      toast.success(getQuestion.data.message);
      questionIdRef.current = null;
      if (currentPage > 1 && questions.length === 1) {
        // If the user is on a page with only one question and deletes it, go back to the first page
        setCurrentPage(1);
      } else {
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question._id !== questionId)
        );
      }

      setPopupbox(false);
    } catch (err) {
      toast.dismiss(taostId);
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong while delete the Question"
      );
    }
  };

  const updatePageClick = (index) => {
    setCurrentPage(index);
  };
  useEffect(() => {
    const fetchTestQuestionDetails = async (testId) => {
      try {
        const getData = await axiosInstance.get(
          import.meta.env.VITE_BASE_URL +
            `/v1/createTest/getelearningtestforediting`,
          {
            params: { testId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTestInfo(getData.data.getAptitudeTest);
      } catch (err) {
        setError(err?.response?.data?.message);
      }
    };
    if (testId) {
      fetchTestQuestionDetails(testId);
    } else {
      setError("Test ID is required");
    }
  }, [testId, token]);

  useEffect(() => {
    const fetchAptitudeELearningRejectedQuestionsSuperAdminJunior = async (
      testId
    ) => {
      try {
        const getData = await axiosInstance.get(
          import.meta.env.VITE_BASE_URL +
            `/v1/super-admin-junior/getAllAptitudeELearningRejectedQuestions`,
          {
            params: { testId, page: currentPage, superAdminJuniorId: user._id },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setaptitudeELearningMCQSchemaId(
          getData.data.aptitudeELearningMCQSchemaId
        );
        setQuestions(getData.data.questions);
        setTotalPages(getData?.data?.totalPages);
      } catch (err) {
        setError(err?.response?.data?.message);
      }
    };
    if (testId) {
      fetchAptitudeELearningRejectedQuestionsSuperAdminJunior(testId);
    } else {
      setError("Test ID is required");
    }
  }, [testId, currentPage, token]);

  const fetchAptitudeELearningMCQRejectedQuestionsReasonSuperAdminJunior =
    async (testId) => {
      try {
        const res = await axiosInstance.get(
          import.meta.env.VITE_BASE_URL +
            `/v1/super-admin-junior/getAptitudeELearningMCQRejectedQuestionsReason`,
          {
            params: {
              testId,
              superAdminJuniorId: user._id,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReasonInfo(res?.data.data);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };

  useEffect(() => {
    if (aptitudeELearningMCQSchemaId) {
      fetchAptitudeELearningMCQRejectedQuestionsReasonSuperAdminJunior(
        aptitudeELearningMCQSchemaId
      );
    }
  }, [aptitudeELearningMCQSchemaId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!testInfo) {
    return <BulbAnimation $height={"70vh"} />;
  }

  const handleClickCancelOnModal = () => {
    setComponentName(null);
    setPopupbox(false);
  };
  const handleShowReRequestModal = () => {
    setComponentName("Submit");
    setPopupbox(true);
  };
  const handleShowReasonModal = () => {
    setComponentName("ViewReason");
    setPopupbox(true);
  };
  const handleClickYesOnReRequestModal = async () => {
    const taostId = toast.loading("Please wait...");
    try {
      const res = await axiosInstance.post(
        import.meta.env.VITE_BASE_URL +
          `/v1/super-admin-junior/reRaiseAptitudeELearningMCQsMergeRequest`,
        {
          aptitudeELearningMCQSchemaId: aptitudeELearningMCQSchemaId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.dismiss(taostId);
      toast.success(res.data.message);
      navigate(-1, { replace: true });
    } catch (err) {
      toast.dismiss(taostId);
      toast.error(err.response.data.message);
    } finally {
      handleClickCancelOnModal();
    }
  };

  const structureQuestions =
    questions && questions?.map(convertDataIntoQuestionPreviewFormat);

  return (
    <div>
      <Section>
        <H1>
          Rejected <span>{testInfo?.type}</span> MCQ's
        </H1>

        <div>
          <span>{testInfo?.topic}</span>&nbsp;
          <FontAwesomeIcon icon={faAngleRight} />
          &nbsp;
          <span>{testInfo?.subTopic}</span>
        </div>

        <FlashoutPageComponent
          component={
            componentName === "Trash" ? (
              <ConfirmationComponent
                detail={"Do you Really Want to Delete this question?"}
                onClick={() => {
                  let endPoint = getCorrectUrlForDeleteQuestion(
                    "Aptitude",
                    "eLearning",
                    user?.accountType
                  );
                  if (endPoint === -1) {
                    toast.error("Failed to determine the correct endpoint.");
                    return;
                  }
                  handleDeleteQuestionSuperAdminJunior(
                    testId,
                    questionIdRef.current,
                    endPoint
                  );
                }}
              />
            ) : componentName === "EditQuestion" ? (
              <div>
                <TestEditComponent
                  data={questions?.find(
                    (question) => question._id === questionIdRef.current
                  )}
                  questionId={questionIdRef.current}
                  type={"Aptitude"}
                  subType={"eLearning"}
                  setQuestions={setQuestions}
                />
              </div>
            ) : componentName === "Submit" ? (
              <ConfirmationComponent
                detail={
                  "Before re-raise the request make sure you have fixed issue due to which previous request is declined"
                }
                onClick={handleClickYesOnReRequestModal}
                handleClickCancel={handleClickCancelOnModal}
              />
            ) : componentName === "ViewReason" ? (
              <RejectReason
                reasonInfo={reasonInfo}
                handleClickCancelOnModal={handleClickCancelOnModal}
              />
            ) : null
          }
        />

        <FlexSpaceBetween>
          <Button
            className="w-fit"
            type={"button"}
            onClick={handleShowReasonModal}
          >
            View Reason
          </Button>
          <Button
            $primary
            className="w-fit"
            type={"button"}
            onClick={handleShowReRequestModal}
          >
            Submit
          </Button>
        </FlexSpaceBetween>

        <QuestionsContainer>
          {structureQuestions?.map((question, index) => (
            <div key={index} className="question_box box">
              <QuestionPreview question={question} index={index} />

              <BoxButtonsContainer className="width-fit">
                <BoxButton
                  handleClick={(e) => {
                    e.stopPropagation();
                    questionIdRef.current = question._id;
                    setComponentName("EditQuestion");
                    setPopupbox(true);
                  }}
                  color={"#09AFBB"}
                  bgColor={"#D1F1FE"}
                  fontAwesomeIcon={<FontAwesomeIcon icon={faEdit} />}
                />
                <BoxButton
                  handleClick={(e) => {
                    e.stopPropagation();
                    questionIdRef.current = question._id;
                    setComponentName("Trash");
                    setPopupbox(true);
                  }}
                  color={"#FC2947"}
                  bgColor={"#FED1D7"}
                  fontAwesomeIcon={<FontAwesomeIcon icon={faTrashAlt} />}
                />
              </BoxButtonsContainer>
            </div>
          ))}
        </QuestionsContainer>
        {structureQuestions?.length > 0 ? (
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageClick={updatePageClick}
          />
        ) : null}
      </Section>
    </div>
  );
};

export default ViewRejectedQuestionsPage;
