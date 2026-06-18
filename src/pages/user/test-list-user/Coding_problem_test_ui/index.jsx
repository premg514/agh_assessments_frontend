import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Fragment,
  useContext,
} from "react";
import {
  Layout,
  HorizontalSlider,
  LeftPartContainer,
  RightPartContainer,
} from "../../../Coding_problem_compiler/index.styles";
import {
  TabsContainer,
  TabButton,
  TabDivider,
} from "../../../Coding_problem_compiler/Output/styles";
import DescriptionUI from "./left_part/description_ui";
import RightPartCodingProblemUi from "./right_part";
import toast from "react-hot-toast";
import axiosInstance from "../../../../services/apiconnector";
import { CPSubmissionDetails } from "./left_part/cp_submission_result";
import { AppContext } from "../../../../context/AppContext";

const INITIAL_TABS = ["Description", "Result"];
export const OUTPUT_INITIAL_TABS = ["Testcase", "Compile Output"];

const CodingProblemTestUi = ({
  codingProblem,
  setCurrentlyActiveQuestion,
  token,
  testId,
}) => {
  const { finalCodingAnswers, setFinalCodingAnswers } = useContext(AppContext);

  const [leftTabs, setLeftTabs] = useState(INITIAL_TABS);

  const [leftWidth, setLeftWidth] = useState(30);
  const [activeTab, setActiveTab] = useState(INITIAL_TABS[0]);
  const [outputActiveTab, setOutputActiveTab] = useState(
    OUTPUT_INITIAL_TABS[0],
  );
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const [isMobileScreenSize, setIsMobileScreenSize] = useState(
    window.innerWidth < 920,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreenSize(window.innerWidth < 920);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || !containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const newLeftWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;

      // Constrain between 10% and 90%
      const constrainedWidth = Math.min(Math.max(newLeftWidth, 10), 90);
      setLeftWidth(constrainedWidth);
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleStoreSelectedLanguage = (language) => {
    let questionId = "";
    setCurrentlyActiveQuestion((prev) => {
      questionId = prev._id;
      return { ...prev, selectedLanguage: language };
    });
    setFinalCodingAnswers((arr) => {
      if (arr._id === questionId) {
        return { ...obj, selectedLanguage: language };
      } else {
        return arr;
      }
    });
  };

  const handleClickResetCustomInput = (customInput) => {
    setCurrentlyActiveQuestion((prev) => {
      delete prev.customInput;
      return { ...prev };
    });
  };

  const handleStoreUserCustomInput = (customInput) => {
    setCurrentlyActiveQuestion((prev) => {
      return { ...prev, customInput: customInput };
    });
  };

  const handleValueChangeOnEditor = (lang, value) => {
    setCurrentlyActiveQuestion((prev) => {
      if (!prev) return prev;

      const keyMap = {
        "C++": "basicCodeCpp",
        Python: "basicCodePython",
        C: "basicCodeC",
        Java: "basicCodeJava",
      };

      return {
        ...prev,
        [keyMap[lang]]: value,
      };
    });
  };

  const handleClickReset = async (codingProblem) => {
    const language = codingProblem.selectedLanguage;
    // choose code on basis of language
    let languageId;

    switch (language) {
      case "cpp": {
        languageId = 54;
        break;
      }
      case "c": {
        languageId = 50;
        break;
      }
      case "python": {
        languageId = 71;
        break;
      }
      case "java": {
        languageId = 62;
        break;
      }
    }
    const codingProblemId = codingProblem._id;
    try {
      const res = await axiosInstance.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/v1/code/coding-problems/${codingProblemId}/partial-code`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            languageId: languageId,
            codingProblemId: codingProblemId,
          },
        },
      );

      const newCode = res.data.data.code;

      setCurrentlyActiveQuestion((prev) => {
        if (languageId === 54) {
          return { ...prev, basicCodeCpp: newCode };
        } else if (languageId === 50) {
          return { ...prev, basicCodeC: newCode };
        } else if (languageId === 71) {
          return { ...prev, basicCodePython: newCode };
        } else {
          return { ...prev, basicCodeJava: newCode };
        }
      });
    } catch (err) {
      console.log(err);
      // toast.error(err?.response.data.message);
      throw err;
    }
  };

  const handleClickRunOnEditor = async (codingProblem) => {
    const language = codingProblem.selectedLanguage;

    // choose code on basis of language
    let code;
    let languageId;

    switch (language) {
      case "cpp": {
        languageId = 54;
        code = codingProblem.basicCodeCpp;
        break;
      }
      case "c": {
        languageId = 50;
        code = codingProblem.basicCodeC;
        break;
      }
      case "python": {
        languageId = 71;
        code = codingProblem.basicCodePython;
        break;
      }
      case "java": {
        languageId = 62;
        code = codingProblem.basicCodeJava;
        break;
      }
    }

    const customInput =
      codingProblem?.customInput || codingProblem?.testcase?.input;
    const codingProblemId = codingProblem._id;

    try {
      const res = await axiosInstance.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/v1/code/coding-problems-test-page/${codingProblemId}/code/run/submission`,
        {
          languageId,
          input: customInput,
          codingProblemId,
          code,
          testId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = res?.data;

      result.userInput = customInput;
      setOutputActiveTab(OUTPUT_INITIAL_TABS[1]);
      setCurrentlyActiveQuestion((prev) => {
        return { ...prev, compilationResult: result };
      });
    } catch (err) {
      console.log(err);
      // toast.error(err?.response.data.message);
      throw err;
    }
  };
  const handleClickSubmitOnEditor = async (codingProblem) => {
    const language = codingProblem.selectedLanguage;

    // choose code on basis of language
    let code;
    let languageId;

    switch (language) {
      case "cpp": {
        languageId = 54;
        code = codingProblem.basicCodeCpp;
        break;
      }
      case "c": {
        languageId = 50;
        code = codingProblem.basicCodeC;
        break;
      }
      case "python": {
        languageId = 71;
        code = codingProblem.basicCodePython;
        break;
      }
      case "java": {
        languageId = 62;
        code = codingProblem.basicCodeJava;
        break;
      }
    }
    const codingProblemId = codingProblem._id;
    try {
      const res = await axiosInstance.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/v1/code/coding-problems-test-page/${codingProblemId}/code/submit/submission`,
        {
          languageId: languageId,
          codingProblemId: codingProblemId,
          code,
          testId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = res?.data;
      setLeftTabs((prev) => {
        if (prev.includes("Result")) {
          return prev;
        } else {
          return [...prev, "Result"];
        }
      });
      setActiveTab("Result");
      setCurrentlyActiveQuestion((prev) => {
        if (result.status.id === 3) {
          return { ...prev, submissionResult: result, submitted: true };
        } else {
          return { ...prev, submissionResult: result };
        }
      });
    } catch (err) {
      console.log(err);
      // toast.error(err?.response.data.message);
      throw err;
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <Layout ref={containerRef}>
      <LeftPartContainer
        style={{
          width: `${isMobileScreenSize ? 100 : leftWidth}%`,
        }}
      >
        <TabsContainer>
          <div>
            {leftTabs.map((value, index) => (
              <Fragment key={value}>
                <TabButton
                  active={value === activeTab}
                  onClick={() => setActiveTab(value)}
                >
                  {value}
                </TabButton>
                {index !== leftTabs.length - 1 ? (
                  <TabDivider>|</TabDivider>
                ) : null}
              </Fragment>
            ))}
          </div>
        </TabsContainer>

        {activeTab === "Description" && (
          <DescriptionUI
            title={codingProblem.title}
            description={codingProblem.description}
          />
        )}
        {activeTab === "Result" && (
          <CPSubmissionDetails submission={codingProblem?.submissionResult} />
        )}
      </LeftPartContainer>
      {!isMobileScreenSize && (
        <HorizontalSlider onMouseDown={handleMouseDown}>
          <span></span>
        </HorizontalSlider>
      )}

      <RightPartContainer
        style={{
          width: `${isMobileScreenSize ? 100 : 100 - leftWidth}%`,
        }}
      >
        <RightPartCodingProblemUi
          handleStoreSelectedLanguage={handleStoreSelectedLanguage}
          codingProblem={codingProblem}
          isMobileScreenSize={isMobileScreenSize}
          handleValueChange={handleValueChangeOnEditor}
          handleClickRunOnEditor={handleClickRunOnEditor}
          handleClickSubmitOnEditor={handleClickSubmitOnEditor}
          handleStoreUserCustomInput={handleStoreUserCustomInput}
          handleClickResetCustomInput={handleClickResetCustomInput}
          handleClickReset={handleClickReset}
          outputActiveTab={outputActiveTab}
          setOutputActiveTab={setOutputActiveTab}
        />
      </RightPartContainer>
    </Layout>
  );
};

export default CodingProblemTestUi;
