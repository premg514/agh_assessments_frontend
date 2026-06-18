import React from "react";
import { useParams } from "react-router-dom";
import {
  Question,
  QuestionSummary,
  QuestionWrapper,
  Explain,
  OptionsContainer,
  Option,
} from "../../user/test-list-user/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faA, faB, faC, faD } from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from "react-textarea-autosize";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../services/apiconnector";
import BulbAnimation from "../../../component/BulbAnimation";
import { useSelector } from "react-redux";
import { ResultPageContainer } from "./styles";
import ErrorPage from "../../ErrorPages";

import { Wrapper, Card, Heading, Grid, Item, Score } from "./styles";
import CodingQuestionResultPreview from "./codingQuestionResultPreview";

const TestDetails = ({ testDetails, markScored }) => {
  if (!testDetails) return null;

  const {
    topic,
    subTopic,
    totalMark,
    startDate,
    endDate,
    startTime,
    endTime,
    totalQuestions,
    totalCodingQuestions,
    isResultPublished,
  } = testDetails;

  return (
    <Wrapper>
      <Card>
        <Heading>Test Result</Heading>

        <Grid>
          <Item>
            <span>Topic:</span> {topic}
          </Item>
          <Item>
            <span>Sub Topic:</span> {subTopic}
          </Item>
          <Item>
            <span>Start Date:</span> {startDate}
          </Item>
          <Item>
            <span>End Date:</span> {endDate}
          </Item>
          <Item>
            <span>Start Time:</span> {startTime}
          </Item>
          <Item>
            <span>End Time:</span> {endTime}
          </Item>
          <Item>
            <span>Total Marks:</span> {totalMark}
          </Item>
          <Item>
            <span>Result Published:</span> {isResultPublished ? "Yes" : "No"}
          </Item>

          <Item>
            <span>MCQ's:</span> {totalQuestions}
          </Item>
          {totalCodingQuestions !== undefined && (
            <Item>
              <span>Coding Questions:</span> {totalCodingQuestions}
            </Item>
          )}
        </Grid>

        <Score>
          Mark Scored: {markScored} / {totalMark}
        </Score>
      </Card>
    </Wrapper>
  );
};

export const MCQResultPreview = ({ isResult, mcq, idx, arrLength }) => {
  const getOptionClass = (option) => {
    if (mcq?.answerKey === option && mcq?.correctAnswer !== option)
      return "wrong";
    if (mcq?.correctAnswer === option) return "correct";
    return "";
  };

  return (
    <div className="section__three">
      <QuestionSummary className="padding-bottom-8">
        <p>
          <span className="highlighted" aria-label="current-question">
            {idx + 1}
          </span>{" "}
          of{" "}
          <span className="highlighted" aria-label="total-questions">
            {arrLength}
          </span>{" "}
          Questions
        </p>

        {isResult && <p>{mcq?.mark} Marks</p>}
      </QuestionSummary>

      <QuestionWrapper>
        <Question>
          <TextareaAutosize
            value={`Ques:- ${mcq?.question}`}
            readOnly
            className="textarea_input"
          />

          {mcq?.questionImage && mcq?.questionImage !== "null_url" && (
            <div className="image__container">
              <img
                src={mcq?.questionImage}
                alt="image"
                className="image__style"
              />
            </div>
          )}
        </Question>

        <OptionsContainer>
          <Option className={getOptionClass("a")}>
            <div className="option-char">
              <FontAwesomeIcon icon={faA} className="icon" />
            </div>
            <span>{mcq.optionA}</span>
            {mcq?.optionAImage && mcq?.optionAImage !== "null_url" && (
              <div className="image__container">
                <img src={mcq?.optionAImage} alt="" className="image__style" />
              </div>
            )}
          </Option>
          <Option className={getOptionClass("b")}>
            <div className="option-char">
              <FontAwesomeIcon icon={faB} className="icon" />
            </div>
            <span> {mcq?.optionB}</span>
            {mcq?.optionBImage && mcq?.optionBImage !== "null_url" && (
              <div className="image__container">
                <img src={mcq?.optionBImage} alt="" className="image__style" />
              </div>
            )}
          </Option>
          {mcq?.optionC !== "" && mcq?.optionC != "NULL" && (
            <Option className={getOptionClass("c")}>
              <div className="option-char">
                <FontAwesomeIcon icon={faC} className="icon" />
              </div>
              <span>{mcq.optionC}</span>
              {mcq?.optionCImage && mcq?.optionCImage !== "null_url" && (
                <div className="image__container">
                  <img
                    src={mcq?.optionCImage}
                    alt=""
                    className="image__style"
                  />
                </div>
              )}
            </Option>
          )}
          {mcq?.optionD !== "" && mcq?.optionD !== "NULL" && (
            <Option className={getOptionClass("d")}>
              <div className="option-char">
                <FontAwesomeIcon icon={faD} className="icon" />
              </div>
              <span>{mcq.optionD}</span>
              {mcq?.optionDImage && mcq?.optionDImage !== "null_url" && (
                <div className="image__container">
                  <img
                    src={mcq?.optionDImage}
                    alt=""
                    className="image__style"
                  />
                </div>
              )}
            </Option>
          )}
        </OptionsContainer>

        {mcq?.explanation && (
          <Explain>
            <div>Explanation</div>
            <p>{mcq?.explanation}</p>
          </Explain>
        )}
      </QuestionWrapper>
    </div>
  );
};

const fetchResult = async ({ queryKey }) => {
  const [_, testId, token] = queryKey;
  const res = await axiosInstance.get(
    import.meta.env.VITE_BASE_URL + "/v1/createTest/result",
    {
      params: {
        testId: testId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

const PublishedResultPage = () => {
  const { testId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const { data, error, isLoading } = useQuery({
    queryKey: ["result", testId, token],
    queryFn: fetchResult,
    enabled: !!testId,
  });

  if (isLoading) {
    return <BulbAnimation />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div>
      <ResultPageContainer>
        <TestDetails
          testDetails={
            data?.data?.adminTechnicalTestScheduledToStudentTest ||
            data?.data?.AptitudeTestsId
          }
          markScored={data?.data?.markScored}
        />
        {data?.data?.mcqs?.map((mcq, idx, arr) => {
          return (
            <MCQResultPreview
              isResult={data?.isResult}
              mcq={mcq}
              key={mcq?._id}
              idx={idx}
              arrLength={arr.length}
            />
          );
        })}
        <CodingQuestionResultPreview
          isResult={data?.isResult}
          codingQuestions={data?.data?.codingQuestions}
        />
      </ResultPageContainer>
    </div>
  );
};

export default PublishedResultPage;
