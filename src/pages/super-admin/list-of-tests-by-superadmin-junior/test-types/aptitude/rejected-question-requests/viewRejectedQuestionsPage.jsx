import React, { useRef, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
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
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../../../../../context/AppContext";
import ConfirmationComponent from "../../../../../../component/confirmation/confirmation-component";
import { toast } from "react-hot-toast";
import Header from "../../../../../../component/header/header";
import {
  Section,
  H1,
} from "../../../../../super-admin-junior/test-type-pages/technical/questions/topicList/style";
import { Button } from "../../../../../user/login/user-login-style";
import { FlexSpaceBetween } from "../../../../../super-admin-junior/test-type-pages/technical/questions/topicList/topicList-style";
import { QuestionsContainer } from "../../../../../super-admin-junior/test-type-pages/technical/questions/questions-style";
import RejectReason from "../../../../../../component/reject-reason/reject-reason";
import BulbAnimation from "../../../../../../component/BulbAnimation";

const ViewRejectedQuestionsPage = () => {
  const { testId, superAdminJuniorId } = useParams();
  const [testInfo, setTestInfo] = useState(null);
  const [reasonInfo, setReasonInfo] = useState(null);
  // below variable related to  AptitudeQuestionMcqSuperadminJunior similiar Schema
  const [aptitudeMCQSchemaId, setAptitudeMCQSchemaId] = useState(null);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [questions, setQuestions] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const questionIdRef = useRef(null);
  const { setPopupbox, componentName, setComponentName } =
    useContext(AppContext);

  const handleDeleteQuestionSuperAdminJunior = async (
    testId,
    questionId,
    endPoint
  ) => {
    const taostId = toast.loading("Please wait...");
    try {
      const res = await axiosInstance.delete(
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
      toast.success(res.data.message);
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
      toast.error(err?.response?.data?.message);
    }
  };

  const updatePageClick = (index) => {
    setCurrentPage(index);
  };
  useEffect(() => {
    const fetchTestQuestionDetails = async (testId) => {
      try {
        const res = await axiosInstance.get(
          import.meta.env.VITE_BASE_URL +
            `/v1/createTest/getaptitudetestforediting`,
          {
            params: { testId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTestInfo(res.data.getAptitudeTest);
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
    const fetchAptitudeRejectedQuestionsSuperAdminJunior = async (testId) => {
      try {
        const res = await axiosInstance.get(
          import.meta.env.VITE_BASE_URL +
            `/v1/super-admin-junior/getAllAptitudeRejectedQuestions`,
          {
            params: {
              testId,
              page: currentPage,
              superAdminJuniorId: superAdminJuniorId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAptitudeMCQSchemaId(res.data.aptitudeMCQSchemaId);
        setQuestions(res.data.questions);
        setTotalPages(res?.data?.totalPages);
      } catch (err) {
        setError(err?.response?.data?.message);
      }
    };
    if (testId) {
      fetchAptitudeRejectedQuestionsSuperAdminJunior(testId);
    } else {
      setError("Test ID is required");
    }
  }, [testId, currentPage, token, superAdminJuniorId]);

  useEffect(() => {
    const fetchAptitudeMCQRejectedQuestionsReasonSuperAdminJunior = async (
      testId
    ) => {
      try {
        const res = await axiosInstance.get(
          import.meta.env.VITE_BASE_URL +
            `/v1/super-admin-junior/getAptitudeMCQRejectedQuestionsReason`,
          {
            params: {
              testId,
              superAdminJuniorId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReasonInfo(res?.data.data);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
    };

    if (aptitudeMCQSchemaId) {
      fetchAptitudeMCQRejectedQuestionsReasonSuperAdminJunior(
        aptitudeMCQSchemaId
      );
    }
  }, [aptitudeMCQSchemaId, token, superAdminJuniorId]);

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

  const handleShowReasonModal = () => {
    setComponentName("ViewReason");
    setPopupbox(true);
  };

  const structureQuestions =
    questions && questions?.map(convertDataIntoQuestionPreviewFormat);

  return (
    <div>
      <Header />
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
                    "nonELearning",
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
                  subType={"nonELearning"}
                  setQuestions={setQuestions}
                />
              </div>
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
        </FlexSpaceBetween>

        <QuestionsContainer>
          {structureQuestions?.map((question, index) => (
            <div key={index} className="question_box box">
              <QuestionPreview question={question} index={index} />
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
