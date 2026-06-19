import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Fragment,
} from "react";
import {
  Layout,
  HorizontalSlider,
  LeftPartContainer,
  RightPartContainer,
} from "../../Coding_problem_compiler/index.styles";
import {
  TabsContainer,
  TabButton,
  TabDivider,
} from "../../Coding_problem_compiler/Output/styles";
import axiosInstance from "../../../services/apiconnector";
import DescriptionUI from "../../user/test-list-user/Coding_problem_test_ui/left_part/description_ui";
import { CPSubmissionDetails } from "../../user/test-list-user/Coding_problem_test_ui/left_part/cp_submission_result";
import RightPartCodingProblemUi from "../../user/test-list-user/Coding_problem_test_ui/right_part";
import { useDispatch, useSelector } from "react-redux";
import {
  handleClickLanguageChangeCPAghAssessment,
  handleEditorCodeChangeCP,
  resetBasicCodeByLanguageIdCP,
  resetCustomInputCP,
  setCompilationResultCP,
  setCustomInputCP,
  setSubmissionResultCP,
} from "../../../slices/aghAssessmentSlice";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const INITIAL_TABS = ["Description", "Result"];
const OUTPUT_INITIAL_TABS = ["Testcase", "Compile Output"];

const CodingProblemAGHAssessment = ({
  codingProblem,
  setIsQuestionNavigationLocked,
}) => {
  const dispatch = useDispatch();
  const {
    assessmentId,
    timerRunType,
    currentSectionIndex,
    active: { sectionIndex, questionIndex },
  } = useSelector((state) => state.assessment);
  const { token } = useSelector((state) => state.auth);
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
  const runCodeMutation = useMutation({
    mutationFn: async ({ codingProblem }) => {
      const language = codingProblem.selectedLanguage;

      const languageMap = {
        cpp: { id: 54, field: "basicCodeCpp" },
        c: { id: 50, field: "basicCodeC" },
        python: { id: 71, field: "basicCodePython" },
        java: { id: 62, field: "basicCodeJava" },
      };

      const { id: languageId, field } = languageMap[language];

      const code = codingProblem[field];

      const customInput =
        codingProblem?.customInput || codingProblem?.testcase?.input;

      const codingProblemId = codingProblem._id;

      const res = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/v1/code/coding-problems-test-page/${codingProblemId}/code/run/submission`,
        {
          languageId,
          input: customInput,
          codingProblemId,
          code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return {
        result: res.data,
        userInput: customInput,
      };
    },
    retry: 1,
  });

  const saveCompilationMutation = useMutation({
    mutationFn: async ({ sectionIndex, questionIndex, compilationResult }) => {
      return axiosInstance.patch(
        `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/user/assessments/${assessmentId}/coding-compilation`,
        {
          sectionIndex,
          questionIndex,
          compilationResult,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
    retry: 2,
  });

  const saveSubmissionResultMutation = useMutation({
    mutationFn: async ({
      attemptId,
      sectionIndex,
      questionIndex,
      submissionResult,
    }) => {
      const res = await axiosInstance.patch(
        `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/user/assessments/${attemptId}/coding-submission`,
        {
          sectionIndex,
          questionIndex,
          submissionResult,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.data;
    },
    retry: 2,
  });

  const resetCodeMutation = useMutation({
    mutationFn: async ({ codingProblemId, languageId }) => {
      const res = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/v1/code/coding-problems/${codingProblemId}/partial-code`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            languageId,
            codingProblemId,
          },
        },
      );

      return res.data.data.code;
    },
    retry: 2,
  });

  const submitCodeMutation = useMutation({
    mutationFn: async ({ codingProblem }) => {
      const language = codingProblem.selectedLanguage;

      const languageMap = {
        cpp: { id: 54, field: "basicCodeCpp" },
        c: { id: 50, field: "basicCodeC" },
        python: { id: 71, field: "basicCodePython" },
        java: { id: 62, field: "basicCodeJava" },
      };

      const { id: languageId, field } = languageMap[language];

      const code = codingProblem[field];
      const codingProblemId = codingProblem._id;

      const res = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/v1/code/coding-problems-test-page/${codingProblemId}/code/submit/submission`,
        {
          languageId,
          codingProblemId,
          code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return res.data;
    },
  });

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

  const handleStoreSelectedLanguage = async (language) => {
    const serializeLang = language === "C++" ? "cpp" : language.toLowerCase();
    const resolvedSectionIndex =
      timerRunType === "Section" ? currentSectionIndex : sectionIndex;

    dispatch(handleClickLanguageChangeCPAghAssessment(serializeLang));

    try {
      await axiosInstance.patch(
        `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/user/assessments/${assessmentId}/coding-language`,
        { sectionIndex: resolvedSectionIndex, questionIndex, language: serializeLang },
        { headers: { Authorization: `Bearer ${token}` } },
      );
    } catch (err) {
      toast.error("Failed to save language selection");
    }
  };

  const handleClickResetCustomInput = () => {
    dispatch(resetCustomInputCP());
  };

  const handleStoreUserCustomInput = (value) => {
    dispatch(
      setCustomInputCP({
        customInput: value,
      }),
    );
  };

  const handleValueChangeOnEditor = (lang, value) => {
    const serializeLang = lang === "C++" ? "cpp" : lang.toLowerCase();
    const resolvedSectionIndex =
      timerRunType === "Section" ? currentSectionIndex : sectionIndex;

    dispatch(handleEditorCodeChangeCP({ lang, value }));

    const pendingKey = `coding_code_pending_${assessmentId}`;
    const pending = JSON.parse(localStorage.getItem(pendingKey) || "{}");
    pending[`${resolvedSectionIndex}-${questionIndex}-${serializeLang}`] = {
      sectionIndex: resolvedSectionIndex,
      questionIndex,
      language: serializeLang,
      code: value,
    };
    localStorage.setItem(pendingKey, JSON.stringify(pending));
  };

  const handleClickReset = async (codingProblem) => {
    try {
      const language = codingProblem.selectedLanguage;

      const languageMap = {
        cpp: 54,
        c: 50,
        python: 71,
        java: 62,
      };

      const languageId = languageMap[language];

      if (!languageId) {
        toast.error("Unsupported language selected");
        return;
      }

      const toastId = toast.loading("Resetting code...");

      const data = await resetCodeMutation.mutateAsync({
        codingProblemId: codingProblem._id,
        languageId,
      });

      let newCode = data;

      dispatch(
        resetBasicCodeByLanguageIdCP({
          languageId,
          newCode,
        }),
      );

      toast.success("Code reset successfully", { id: toastId });
    } catch (err) {
      console.log("Something went wrong on code reset", err);

      toast.error(
        err?.response?.data?.message ||
          "Failed to reset code. Please try again.",
      );
    }
  };

  const handleClickRunOnEditor = async (codingProblem) => {
    setIsQuestionNavigationLocked(true);
    try {
      const { result, userInput } = await runCodeMutation.mutateAsync({
        codingProblem,
      });
      try {
        await saveCompilationMutation.mutateAsync({
          sectionIndex:
            timerRunType === "Section" ? currentSectionIndex : sectionIndex,
          questionIndex,
          compilationResult: result,
        });

        dispatch(
          setCompilationResultCP({
            result,
            userInput,
          }),
        );
        setOutputActiveTab(OUTPUT_INITIAL_TABS[1]);
      } catch (err) {
        console.log("Something went wrong on compilation result save", err);

        toast.error("Failed to save compilation result. Please try again.");
      }
    } catch (err) {
      console.log("Something went wrong on compilation code run", err);

      toast.error("Code execution failed. Check your code or try again.");
    } finally {
      setIsQuestionNavigationLocked(false);
    }
  };

  const handleClickSubmitOnEditor = async (codingProblem) => {
    setIsQuestionNavigationLocked(true);
    try {
      const result = await submitCodeMutation.mutateAsync({
        codingProblem,
      });
      try {
        await saveSubmissionResultMutation.mutateAsync({
          attemptId: assessmentId,
          sectionIndex:
            timerRunType === "Section" ? currentSectionIndex : sectionIndex,
          questionIndex,
          submissionResult: result,
        });
        dispatch(setSubmissionResultCP({ result }));
        setLeftTabs((prev) =>
          prev.includes("Result") ? prev : [...prev, "Result"],
        );
        setActiveTab("Result");
      } catch (err) {
        console.log("Result submission failed", err);
        toast.error("Submission save failed. Please retry.");
      }
    } catch (err) {
      console.log("submission running error", err);
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsQuestionNavigationLocked(false);
    }
  };

  useEffect(() => {
    return () => {
      setIsQuestionNavigationLocked(false);
    };
  }, [setIsQuestionNavigationLocked]);

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
    <Layout $additionHeight={"120"} ref={containerRef}>
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

export default CodingProblemAGHAssessment;
