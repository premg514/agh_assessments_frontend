import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import QuestionPreview from "../../../../../../component/questionPreview.jsx/QuestionPreview";
import axiosInstance from "../../../../../../services/apiconnector";
import { useSelector } from "react-redux";
import { convertDataIntoQuestionPreviewFormat } from "../../../../../super-admin/test-list-page/utils/functions";
import PaginationComponent from "../../../../../../component/pagination/pagination-component";
import FlashoutPageComponent from "../../../../../../component/flash-out-page/flash-out-page-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../../../../../context/AppContext";
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
  // below variable related to  AptitudeELearningQuestionMcqSuperadminJunior similiar Schema
  const [aptitudeELearningMCQSchemaId, setaptitudeELearningMCQSchemaId] =
    useState(null);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [questions, setQuestions] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { setPopupbox, componentName, setComponentName } =
    useContext(AppContext);

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
  }, [testId, currentPage, token, superAdminJuniorId]);

  useEffect(() => {
    const fetchAptitudeELearningMCQRejectedQuestionsReasonSuperAdminJunior =
      async (testId) => {
        try {
          const res = await axiosInstance.get(
            import.meta.env.VITE_BASE_URL +
              `/v1/super-admin-junior/getAptitudeELearningMCQRejectedQuestionsReason`,
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

    if (aptitudeELearningMCQSchemaId) {
      fetchAptitudeELearningMCQRejectedQuestionsReasonSuperAdminJunior(
        aptitudeELearningMCQSchemaId
      );
    }
  }, [aptitudeELearningMCQSchemaId, token, superAdminJuniorId]);

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
            componentName === "ViewReason" ? (
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
