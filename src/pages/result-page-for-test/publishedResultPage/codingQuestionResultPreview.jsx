import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 40px;
`;

const Heading = styled.h2`
  margin-bottom: 25px;
  color: ${({ theme }) => theme.text.secondary};
`;

const Card = styled.div`
  border-radius: 14px;
  margin-bottom: 25px;
`;

const Title = styled.h3`
  margin-bottom: 15px;
  color: ${({ theme }) => theme.text.secondary};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Badge = styled.div`
  background: ${({ theme }) => theme.body.secondary.base};
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;

  span {
    font-weight: 600;
  }
`;

const Status = styled(Badge)`
  background: ${({ success }) => (success ? "#dcfce7" : "#fee2e2")};
  color: ${({ success }) => (success ? "#166534" : "#991b1b")};
`;

const CodeSection = styled.div`
  margin-top: 20px;
`;

const CodeTitle = styled.h4`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text.primary};
`;

const CodeBlock = styled.pre`
  background: #0f172a;
  color: #e2e8f0;
  padding: 15px;
  border-radius: 10px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.5;
`;

export const CodingQuestionResultItem = ({ q, index, isResult }) => {
  return (
    <Card>
      <Title>
        {index + 1}. {q.title}
      </Title>

      {isResult && (
        <>
          <InfoGrid>
            <Status success={q.submitted}>
              <span>Status:</span> {q.submitted ? "Submitted" : "Not Submitted"}
            </Status>

            <Badge>
              <span>Language:</span> {q.selectedLanguage}
            </Badge>

            <Badge>
              <span>Test Cases Passed:</span> {q.totalTestCaseSatisfied}
            </Badge>

            <Badge>
              <span>Marks:</span> {q.mark}
            </Badge>

            <Badge>
              <span>Scored Marks:</span> {q.earnedMarks}
            </Badge>
          </InfoGrid>

          <CodeSection>
            <CodeTitle>Your Code</CodeTitle>
            <CodeBlock>{q.userCode || "No code written"}</CodeBlock>
          </CodeSection>
        </>
      )}
    </Card>
  );
};

const CodingQuestionResultPreview = ({ isResult, codingQuestions }) => {
  if (!codingQuestions || codingQuestions.length === 0) return null;

  return (
    <Wrapper>
      <Heading>Coding Questions</Heading>

      {codingQuestions.map((q, index) => (
        <CodingQuestionResultItem
          key={q._id}
          q={q}
          index={index}
          isResult={isResult}
        />
      ))}
    </Wrapper>
  );
};

export default CodingQuestionResultPreview;
