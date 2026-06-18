import {
  SubmissionContainerLayout,
  SubmissionsGridContainer,
  Container,
  Status,
  StatRow,
  StatItem,
  Label,
  Pre,
  Section,
  ErrorSection,
  SubmissonDetailsContainer,
} from "../../../../Coding_problem_compiler/submissions/CodingProblemSubmissions.styles";

import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BulbAnimation from "../../../../../component/BulbAnimation";
import {
  faArrowLeft,
  faCheckCircle,
  faTimesCircle,
  faClock,
  faMemory,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import {
  EmptyState,
  TestCaseContainer,
} from "../../../../question-page/OutputSection/outputSection.style";

export const CPSubmissionDetails = ({ submission }) => {
  return (
    <SubmissonDetailsContainer>
      <div className="top_part"></div>

      {submission?.status == undefined ? (
        <TestCaseContainer>
          <EmptyState>First you need to submit the solution</EmptyState>
        </TestCaseContainer>
      ) : null}

      {/* submission details */}
      {submission?.status?.id < 3 ? <BulbAnimation $height={"400px"} /> : null}
      {submission?.status?.id > 2 ? (
        <Container>
          <Status status={submission.status.description}>
            <FontAwesomeIcon
              icon={
                submission.status.description === "Accepted"
                  ? faCheckCircle
                  : faTimesCircle
              }
            />
            {submission.status.description}
          </Status>

          <StatRow>
            <StatItem>
              Test Cases: {submission.totalPassedTestCases}/
              {submission.totalTestCases}
            </StatItem>
          </StatRow>

          {submission.status.description !== "Accepted" && (
            <ErrorSection>
              {submission.errorDescription && (
                <Section>
                  <Label>Error Description</Label>
                  <Pre>{submission.errorDescription}</Pre>
                </Section>
              )}

              {submission.compile_output && (
                <Section>
                  <Label>Compilatin Error</Label>
                  <Pre>{submission.compile_output}</Pre>
                </Section>
              )}

              {submission.input && (
                <Section>
                  <Label>Last Executed Input</Label>
                  <Pre>{submission.input}</Pre>
                </Section>
              )}
              {submission.yourOutput && (
                <Section>
                  <Label>Your Output</Label>
                  <Pre>{submission.yourOutput}</Pre>
                </Section>
              )}
              {submission.expectedOutput && (
                <Section>
                  <Label>Expected Output</Label>
                  <Pre>{submission.expectedOutput}</Pre>
                </Section>
              )}
            </ErrorSection>
          )}
        </Container>
      ) : null}
    </SubmissonDetailsContainer>
  );
};
