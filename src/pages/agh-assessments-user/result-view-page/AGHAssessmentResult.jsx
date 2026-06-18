import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import axiosInstance from "../../../services/apiconnector";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import CodingQuestionResultPreview, {
  CodingQuestionResultItem,
} from "../../result-page-for-test/publishedResultPage/codingQuestionResultPreview";
import { MCQResultPreview } from "../../result-page-for-test/publishedResultPage";
import BulbAnimation from "../../../component/BulbAnimation";
import { BackButton } from "../../collection-info-user/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  padding: 24px;
  background: ${({ theme }) => theme.body.primary.base};
`;

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.border_new};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.card_white};
`;

const Title = styled.h2`
  margin-bottom: 12px;
  color: ${({ theme }) => theme.text.primary};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const SectionCard = styled.div`
  border: 1px solid ${({ theme }) => theme.card_border_new};
  border-radius: 8px;
  padding: 14px;
  margin-bottom: 12px;
  background: ${({ theme }) => theme.background_new};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  row-gap: 10px;
  column-gap: 12px;
`;

const Label = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.card_label_text_2};
`;

const Value = styled.div`
  color: ${({ theme }) => theme.primary_text};
`;

const fetchResult = async (resultId, token) => {
  const res = await axiosInstance.get(
    `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/user/assessments/results/${resultId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data.data;
};

const AGHAssessmentResultPage = () => {
  const { resultId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["assessment-result", resultId],
    queryFn: () => fetchResult(resultId, token),
    enabled: !!resultId && !!token,
  });

  if (isLoading) return <BulbAnimation />;
  if (isError) return <div>Failed to load result</div>;

  return (
    <Wrapper>
      <BackButton onClick={() => navigate(-1, { replace: true })}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </BackButton>

      <Card>
        <Title>{data.scheduledAghAssessment?.name}</Title>

        <Grid>
          <Label>Start Time</Label>
          <Value>
            {format(
              new Date(data.scheduledAghAssessment.startDateTime),
              "dd MMM yyyy, hh:mm a",
            )}
          </Value>

          <Label>End Time</Label>
          <Value>
            {format(
              new Date(data.scheduledAghAssessment.endDateTime),
              "dd MMM yyyy, hh:mm a",
            )}
          </Value>

          <Label>Total Marks</Label>
          <Value>{data.totalMarks}</Value>

          <Label>Obtained Marks</Label>
          <Value>{data.obtainedMarks}</Value>

          <Label>Percentage</Label>
          <Value>{data.percentage}%</Value>

          <Label>Correct</Label>
          <Value>{data.correct}</Value>

          <Label>Wrong</Label>
          <Value>{data.wrong}</Value>

          <Label>Unattempted</Label>
          <Value>{data.unattempted}</Value>

          <Label>Started At</Label>
          <Value>
            {format(new Date(data.startedAt), "dd MMM yyyy, hh:mm a")}
          </Value>

          <Label>Submitted At</Label>
          <Value>
            {format(new Date(data.completedAt), "dd MMM yyyy, hh:mm a")}
          </Value>
        </Grid>
      </Card>

      {/* Section Results */}
      {data.sections?.length > 0 && (
        <Card>
          <Title>Section Results</Title>

          {data.sections.map((section) => (
            <SectionCard key={section._id}>
              <div>
                <Row>
                  <Label>Section</Label>
                  <Value>{section.sectionName}</Value>
                </Row>

                <Row>
                  <Label>Total Marks</Label>
                  <Value>{section.totalMarks}</Value>
                </Row>

                <Row>
                  <Label>Obtained Marks</Label>
                  <Value>{section.obtainedMarks}</Value>
                </Row>
              </div>

              <div>
                {section.questions.map((q, idx) => {
                  if (q.questionType === "coding") {
                    let userCode = "";

                    switch (q.codingProblem.selectedLanguage) {
                      case "cpp": {
                        userCode = q.codingProblem.basicCodeCpp;
                        break;
                      }
                      case "java": {
                        userCode = q.codingProblem.basicCodeJava;
                        break;
                      }
                      case "c": {
                        userCode = q.codingProblem.basicCodeC;
                        break;
                      }
                      case "python": {
                        userCode = q.codingProblem.basicCodePython;
                        break;
                      }
                    }

                    return (
                      <CodingQuestionResultItem
                        key={q._id}
                        q={{
                          ...q.codingProblem,
                          totalTestCaseSatisfied: q.codingProblem.submitted
                            ? q.codingProblem?.submissionResult
                                ?.totalPassedTestCases
                            : 0,
                          mark: q.codingProblem.containMark,
                          earnedMarks: q.codingProblem.obtainedMark,
                          userCode: userCode,
                        }}
                        index={idx}
                        isResult={true}
                      />
                    );
                  }

                  return (
                    <MCQResultPreview
                      key={q._id}
                      isResult={true}
                      mcq={{
                        ...q.mcqProblem,
                        answerKey: q.mcqProblem.userAnswer,
                        mark: q.mcqProblem.containMark,
                      }}
                      idx={idx}
                      arrLength={section.questions.length}
                    />
                  );
                })}
              </div>
            </SectionCard>
          ))}
        </Card>
      )}
    </Wrapper>
  );
};

export default AGHAssessmentResultPage;
