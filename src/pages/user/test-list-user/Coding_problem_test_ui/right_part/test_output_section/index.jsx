import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Wrapper,
  TabsContainer,
  TabDivider,
  TabButton,
  TestCaseContainer,
  EmptyState,
  ResultHeader,
  TestCaseBox,
  Label,
  OutputText,
  TextArea,
  ContantContainer,
} from "../../../../../Coding_problem_compiler/Output/styles";
import { useState } from "react";
import { OUTPUT_INITIAL_TABS } from "../..";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import CompilationOutput from "./compilation_output";

const TestCase = ({
  customInput,
  setCustomInput,
  handleStoreUserCustomInput,
}) => {
  const handleOnChange = (e) => {
    setCustomInput(e.target.value);
    handleStoreUserCustomInput(e.target.value);
  };

  return (
    <div>
      <TextArea value={customInput || ""} onChange={handleOnChange}></TextArea>
    </div>
  );
};

const TestOutput = ({
  customInput,
  setCustomInput,
  onClickResetTestCase,
  handleStoreUserCustomInput,
  codingProblem,
  outputActiveTab,
  setOutputActiveTab,
}) => {
  return (
    <Wrapper>
      <TabsContainer>
        <div>
          {OUTPUT_INITIAL_TABS.map((value, index) => {
            return (
              <span key={value}>
                <TabButton
                  active={value === outputActiveTab}
                  onClick={() => setOutputActiveTab(value)}
                >
                  {value}
                </TabButton>
                {index !== OUTPUT_INITIAL_TABS.length - 1 ? (
                  <TabDivider>|</TabDivider>
                ) : null}
              </span>
            );
          })}
        </div>

        {outputActiveTab === OUTPUT_INITIAL_TABS[0] ? (
          <button
            onClick={() => {
              onClickResetTestCase();
            }}
          >
            <FontAwesomeIcon icon={faRefresh} />
          </button>
        ) : null}
      </TabsContainer>

      <ContantContainer>
        {outputActiveTab === OUTPUT_INITIAL_TABS[0] ? (
          <TestCase
            customInput={customInput}
            setCustomInput={setCustomInput}
            handleStoreUserCustomInput={handleStoreUserCustomInput}
          />
        ) : null}
        {outputActiveTab === OUTPUT_INITIAL_TABS[1] ? (
          <CompilationOutput
            customInput={customInput}
            compilationResult={codingProblem?.compilationResult || ""}
          />
        ) : null}
      </ContantContainer>
    </Wrapper>
  );
};

export default TestOutput;
