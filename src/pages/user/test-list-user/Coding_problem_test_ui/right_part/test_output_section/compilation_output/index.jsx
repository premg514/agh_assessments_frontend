import React from "react";
import {
  Wrapper,
  TabsContainer,
  TabButton,
  TabDivider,
  TextArea,
  OutputContainer,
  CompileOutput,
  TestCasesContainer,
  TestCasesHeading,
  TestCasesResult,
  PassedCount,
  TotalCount,
  Separator,
  ProgressBar,
  ProgressFill,
  StatusBadge,
  TestCaseContainer,
  ResultHeader,
  TestCaseBox,
  Label,
  OutputText,
  EmptyState,
} from "../../../../../../question-page/OutputSection/outputSection.style";

const MAX_CHARS_TO_SHOW = 200;

const OutputDisplay = ({ output }) => {
  let actualTotalCount = output.totalTestCases;
  let actualPassedCount = output.totalPassedTestCases;

  const getStatusText = () => {
    // ✅ Use ACTUAL counts for status calculation
    if (actualPassedCount === actualTotalCount && actualTotalCount > 0)
      return "Passed";
    if (actualPassedCount > 0) return "Partial";
    return "Failed";
  };

  return (
    <OutputContainer>
      {output?.compile_output ? (
        <CompileOutput>{output.compile_output}</CompileOutput>
      ) : output?.stderr ? (
        <CompileOutput>{output.stderr}</CompileOutput>
      ) : (
        <div>
          {output?.stdout && (
            <>
              <Label>stdout</Label>
              <OutputText>
                {output?.stdout?.slice(0, MAX_CHARS_TO_SHOW)}{" "}
                {output?.stdout?.length > MAX_CHARS_TO_SHOW ? (
                  <span className="more_chars">more chars</span>
                ) : null}
              </OutputText>
            </>
          )}
          <TestCasesHeading>Test Cases</TestCasesHeading>
          <TestCasesResult>
            <PassedCount passed={actualPassedCount} total={actualTotalCount}>
              {actualPassedCount}
            </PassedCount>
            <Separator>/</Separator>
            <TotalCount>{actualTotalCount}</TotalCount>
            <StatusBadge passed={actualPassedCount} total={actualTotalCount}>
              {getStatusText()}
            </StatusBadge>
          </TestCasesResult>
          {/* Progress bar uses ACTUAL counts for correct percentage */}
          {actualTotalCount > 0 && (
            <ProgressBar>
              <ProgressFill
                passed={actualPassedCount}
                total={actualTotalCount}
              />
            </ProgressBar>
          )}
        </div>
      )}
    </OutputContainer>
  );
};

const CompilationOutput = ({ customInput, compilationResult: output }) => {
  if (!output) {
    return (
      <TestCaseContainer>
        <EmptyState>First you need to run the program</EmptyState>
      </TestCaseContainer>
    );
  }

  return (
    <TestCaseContainer>
      {/* Result Header */}
      <ResultHeader status={output?.status?.description}>
        Result: <span>{output?.status?.description || "Unknown"}</span>
      </ResultHeader>
      {output?.status?.id > 2 && <OutputDisplay output={output} />}
      {output?.status?.id > 2 && (
        <>
          {output?.stdout && (
            <>
              <Label>For Input:</Label>
              <OutputText>{output.userInput || "No input"}</OutputText>
            </>
          )}

          {output?.stdout && (
            <>
              <Label>Your Output:</Label>
              <OutputText>
                {output?.stdout?.slice(0, MAX_CHARS_TO_SHOW)}{" "}
                {output?.stdout?.length > MAX_CHARS_TO_SHOW ? (
                  <span className="more_chars">more chars</span>
                ) : null}
              </OutputText>
            </>
          )}

          {output?.expected_output && (
            <>
              <Label>Expected Output:</Label>
              <OutputText>
                {output?.expected_output || "No expected output"}
              </OutputText>
            </>
          )}
        </>
      )}
    </TestCaseContainer>
  );
};

export default CompilationOutput;
