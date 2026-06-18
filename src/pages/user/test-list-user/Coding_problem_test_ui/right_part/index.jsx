import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  RightPartLayout,
  VerticalSlider,
} from "../../../../Coding_problem_compiler/RightPart.styles";
import CompilerTestUI from "./test_compiler";
import TestOutput from "./test_output_section";

const RightPartCodingProblemUi = ({
  codingProblem,
  isMobileScreenSize,
  handleValueChange,
  handleClickRunOnEditor,
  handleClickSubmitOnEditor,
  handleStoreSelectedLanguage,
  handleStoreUserCustomInput,
  handleClickResetCustomInput,
  handleClickReset,
  outputActiveTab,
  setOutputActiveTab,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [topHeight, setTopHeight] = useState(75);
  const containerRef = useRef(null);
  const [customInput, setCustomInput] = useState(null);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || !containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();

      const newTopHeight =
        ((e.clientY - containerRect.top) / containerRect.height) * 100;

      const constrainedHeight = Math.min(Math.max(newTopHeight, 20), 80);
      setTopHeight(constrainedHeight);
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "row-resize"; // Correct cursor for vertical resize
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    setCustomInput(codingProblem?.testcase.input);
  }, [codingProblem._id]);

  return (
    <RightPartLayout ref={containerRef}>
      <div
        className="top__section"
        style={{
          height: `${isMobileScreenSize ? 50 : topHeight}vh`,
          overflow: "hidden",
        }}
      >
        <CompilerTestUI
          handleStoreSelectedLanguage={handleStoreSelectedLanguage}
          codingProblem={codingProblem}
          isMobileScreenSize={isMobileScreenSize}
          topHeight={topHeight}
          handleValueChange={handleValueChange}
          handleClickSubmitOnEditor={handleClickSubmitOnEditor}
          handleClickRunOnEditor={handleClickRunOnEditor}
          handleClickReset={handleClickReset}
        />
      </div>

      {!isMobileScreenSize && (
        <VerticalSlider
          onMouseDown={handleMouseDown}
          className="vertical_slider"
        >
          <span></span>
        </VerticalSlider>
      )}

      <div
        className="bottom__section"
        style={{
          height: `${isMobileScreenSize ? 50 : 100 - topHeight}vh`,
          overflow: "auto",
        }}
      >
        <TestOutput
          codingProblem={codingProblem}
          setCustomInput={setCustomInput}
          customInput={customInput}
          outputActiveTab={outputActiveTab}
          setOutputActiveTab={setOutputActiveTab}
          onClickResetTestCase={() => {
            handleClickResetCustomInput();
            setCustomInput(codingProblem?.testcase.input);
          }}
          handleStoreUserCustomInput={handleStoreUserCustomInput}
        />
      </div>
    </RightPartLayout>
  );
};

export default RightPartCodingProblemUi;
