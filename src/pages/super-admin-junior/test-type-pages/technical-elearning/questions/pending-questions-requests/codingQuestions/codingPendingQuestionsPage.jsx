import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CodingQuestionPreview from "../../../../../../super-admin/test-list-page/Components/ViewCodingQuestions/CodingQuestionPreview";
import axiosInstance from "../../../../../../../services/apiconnector";
import { useSelector } from "react-redux";
import PaginationComponent from "../../../../../../../component/pagination/pagination-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Section, H1 } from "../../topicList/style";
import { QuestionsContainer } from "../../questions-style";
import BulbAnimation from "../../../../../../../component/BulbAnimation";

const TechnicalCodingPendingQuestionsPage = () => {
  const { testId } = useParams();
  const [testInfo, setTestInfo] = useState(null);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [questions, setQuestions] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

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
    const fetchTechnicalELearningPendingCodingQuestionsSuperAdminJunior =
      async (testId) => {
        try {
          const getData = await axiosInstance.get(
            import.meta.env.VITE_BASE_URL +
              `/v1/super-admin-junior/getTechnicalELearningPendingCodingQuestions`,
            {
              params: {
                testId,
                page: currentPage,
                superAdminJuniorId: user?._id,
              },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setQuestions(getData.data.codingQuestions);
          setTotalPages(getData?.data?.totalPages);
        } catch (err) {
          setError(err?.response?.data?.message);
        }
      };
    if (testId) {
      fetchTechnicalELearningPendingCodingQuestionsSuperAdminJunior(testId);
    } else {
      setError("Test ID is required");
    }
  }, [testId, currentPage, token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!testInfo) {
    return <BulbAnimation $height={"70vh"} />;
  }

  return (
    <div>
      <Section>
        <H1>Pending Technical Coding Questions</H1>
        <div>
          <span>{testInfo?.topic}</span>&nbsp;
          <FontAwesomeIcon icon={faAngleRight} />
          &nbsp;
          <span>{testInfo?.subTopic}</span>
        </div>

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
    </div>
  );
};

export default TechnicalCodingPendingQuestionsPage;
