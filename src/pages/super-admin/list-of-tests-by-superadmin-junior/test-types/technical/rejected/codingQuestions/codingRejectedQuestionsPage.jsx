import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import CodingQuestionPreview from "../../../../../../super-admin/test-list-page/Components/ViewCodingQuestions/CodingQuestionPreview";
import axiosInstance from "../../../../../../../services/apiconnector";
import { useSelector } from "react-redux";
import PaginationComponent from "../../../../../../../component/pagination/pagination-component";
import { AppContext } from "../../../../../../../context/AppContext";
import FlashoutPageComponent from "../../../../../../../component/flash-out-page/flash-out-page-component";
import toast from "react-hot-toast";
import RejectReason from "../../../../../../../component/reject-reason/reject-reason";
import { FlexSpaceBetween } from "../../../../../../super-admin-junior/test-type-pages/technical/questions/topicList/topicList-style";
import { Button } from "../../../../../../user/login/user-login-style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { QuestionsContainer } from "../../../../../../super-admin-junior/test-type-pages/technical/questions/questions-style";
import {
  Section,
  H1,
} from "../../../../../../super-admin-junior/test-type-pages/technical/questions/topicList/style";
import Header from "../../../../../../../component/header/header";
import BulbAnimation from "../../../../../../../component/BulbAnimation";

const TechnicalCodingRejectedQuestionsPage = () => {
  const { testId, superAdminJuniorId } = useParams();
  const [testInfo, setTestInfo] = useState(null);
  const [reasonInfo, setReasonInfo] = useState(null);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [questions, setQuestions] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  // below variable related to  TechnicalQuestionsSuperadminjunior Schema
  const [technicalCodingQuestionSchemaId, setTechnicalCodingQuestionSchemaId] =
    useState(null);
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
            `/v1/createTest/getcodingtestforediting`,
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
    const fetchTechnicalRejectedCodingQuestionsSuperAdminJunior = async (
      testId
    ) => {
      try {
        const res = await axiosInstance.get(
          import.meta.env.VITE_BASE_URL +
            `/v1/super-admin-junior/getTechnicalCodingRejectedQuestions`,
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
        setTechnicalCodingQuestionSchemaId(
          res.data.technicalCodingQuestionSchemaId
        );
        setQuestions(res.data.codingQuestions);
        setTotalPages(res?.data?.totalPages);
      } catch (err) {
        setError(err?.response?.data?.message);
      }
    };
    if (testId) {
      fetchTechnicalRejectedCodingQuestionsSuperAdminJunior(testId);
    } else {
      setError("Test ID is required");
    }
  }, [testId, currentPage, token, superAdminJuniorId]);

  const handleClickCancelOnModal = () => {
    setComponentName(null);
    setPopupbox(false);
  };

  const handleShowReasonModal = () => {
    setComponentName("ViewReason");
    setPopupbox(true);
  };

  const fetchTechnicalCodingRejectedQuestionsReasonSuperAdminJunior = async (
    testId
  ) => {
    try {
      const res = await axiosInstance.get(
        import.meta.env.VITE_BASE_URL +
          `/v1/super-admin-junior/getTechnicalCodingRejectedQuestionsReason`,
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
      console.log("Something went wrong while get declined reason info");
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    if (technicalCodingQuestionSchemaId) {
      fetchTechnicalCodingRejectedQuestionsReasonSuperAdminJunior(
        technicalCodingQuestionSchemaId
      );
    }
  }, [technicalCodingQuestionSchemaId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!testInfo) {
    return <BulbAnimation $height={"70vh"} />;
  }

  return (
    <>
      <Header />
      <Section>
        <H1>Rejected Technical Coding Questions</H1>
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
          {questions.map((question, index) => (
            <div key={index} className="question_box box">
              <CodingQuestionPreview
                question={question}
                questionIndex={index}
              />
            </div>
          ))}
        </QuestionsContainer>
        {questions?.length > 0 ? (
          <div className="page__component">
            <PaginationComponent
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageClick={updatePageClick}
            />
          </div>
        ) : null}
      </Section>
    </>
  );
};

export default TechnicalCodingRejectedQuestionsPage;
