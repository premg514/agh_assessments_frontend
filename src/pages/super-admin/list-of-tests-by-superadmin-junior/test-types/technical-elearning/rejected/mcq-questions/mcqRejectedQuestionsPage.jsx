import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import QuestionPreview from "../../../../../../../component/questionPreview.jsx/QuestionPreview";
import axiosInstance from "../../../../../../../services/apiconnector";
import { useSelector } from "react-redux";
import { convertDataIntoQuestionPreviewFormat } from "../../../../../../super-admin/test-list-page/utils/functions";
import PaginationComponent from "../../../../../../../component/pagination/pagination-component";
import FlashoutPageComponent from "../../../../../../../component/flash-out-page/flash-out-page-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../../../../../../context/AppContext";
import { toast } from "react-hot-toast";
import Header from "../../../../../../../component/header/header";
import {
  Section,
  H1,
} from "../../../../../../super-admin-junior/test-type-pages/technical/questions/topicList/style";
import { FlexSpaceBetween } from "../../../../../../super-admin-junior/test-type-pages/technical/questions/topicList/topicList-style";
import RejectReason from "../../../../../../../component/reject-reason/reject-reason";
import { QuestionsContainer } from "../../../../../../super-admin-junior/test-type-pages/technical-elearning/questions/questions-style";
import { Button } from "../../../../../../user/login/user-login-style";
import BulbAnimation from "../../../../../../../component/BulbAnimation";

const TechnicalMCQPendingQuestionsPage = () => {
  const { testId, superAdminJuniorId } = useParams();
  const [testInfo, setTestInfo] = useState(null);
  const [reasonInfo, setReasonInfo] = useState(null);
  // below variable related to  TechnicalELearningQuestionMcqSuperadminJunior Schema
  const [technicalELearningMCQSchemaId, setTechnicalELearningMCQSchemaId] =
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
            `/v1/createTest/getcodingtestforeditingelearning`,
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
    const fetchTechnicalELearningMCQRejectedQuestionsSuperAdminJunior = async (
      testId
    ) => {
      try {
        const getData = await axiosInstance.get(
          import.meta.env.VITE_BASE_URL +
            `/v1/super-admin-junior/getTechnicalELearningMCQRejectedQuestions`,
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
        setTechnicalELearningMCQSchemaId(
          getData.data.technicalELearningMCQSchemaId
        );
        setQuestions(getData.data.questions);
        setTotalPages(getData?.data?.totalPages);
      } catch (err) {
        setError(err?.response?.data?.message);
      }
    };
    if (testId) {
      fetchTechnicalELearningMCQRejectedQuestionsSuperAdminJunior(testId);
    } else {
      setError("Test ID is required");
    }
  }, [testId, currentPage, token, superAdminJuniorId]);

  useEffect(() => {
    const fetchTechnicalELearningMCQRejectedQuestionsReasonSuperAdminJunior =
      async (testId) => {
        try {
          const res = await axiosInstance.get(
            import.meta.env.VITE_BASE_URL +
              `/v1/super-admin-junior/getTechnicalELearningMCQRejectedQuestionsReason`,
            {
              params: {
                testId,
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
    if (technicalELearningMCQSchemaId) {
      fetchTechnicalELearningMCQRejectedQuestionsReasonSuperAdminJunior(
        technicalELearningMCQSchemaId
      );
    }
  }, [technicalELearningMCQSchemaId, token]);

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
    <>
      <Header />
      <Section>
        <H1>Rejected Technical MCQ's</H1>
        <div>
          <span>{testInfo?.topic}</span>&nbsp;
          <FontAwesomeIcon icon={faAngleRight} />
          &nbsp;
          <span>{testInfo?.subTopic}</span>
        </div>
        <div>
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
            {structureQuestions.map((question, index) => (
              <div key={index} className="question_box box">
                <QuestionPreview question={question} index={index} />
              </div>
            ))}
          </QuestionsContainer>
        </div>
        {structureQuestions?.length > 0 ? (
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageClick={updatePageClick}
          />
        ) : null}
      </Section>
    </>
  );
};

export default TechnicalMCQPendingQuestionsPage;
