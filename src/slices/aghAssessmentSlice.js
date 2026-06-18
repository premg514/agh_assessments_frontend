import { createSlice } from "@reduxjs/toolkit";

const updateNavState = (state) => {
  const { sectionIndex, questionIndex } = state.active;

  if (state.timerRunType === "Section") {
    // in section wise, navigation is only within the single section in state
    state.hasPrev = questionIndex > 0;
    const lastQuestionIndex = state.sections[0]?.questions?.length - 1 || 0;
    state.hasNext = questionIndex < lastQuestionIndex;
    return;
  }

  state.hasPrev = !(sectionIndex === 0 && questionIndex === 0);
  const lastSectionIndex = state.sections.length - 1;
  const lastQuestionIndex =
    state.sections[lastSectionIndex].questions.length - 1;
  state.hasNext = !(
    sectionIndex === lastSectionIndex && questionIndex === lastQuestionIndex
  );
};

const initialState = {
  assessmentId: null,
  scheduledTestId: null,
  sections: [],
  active: {
    sectionIndex: 0,
    questionIndex: 0,
  },
  maxViolationsAllowed: 50,
  violationsDone: 0,
  hasNext: false,
  hasPrev: false,
  palette: {}, // question status map
  timer: {
    duration: 0,
    startedAt: null,
    remaining: 0,
  },
  timerRunType: "",
  totalSections: 0,
  completedSections: 0,
  currentSectionIndex: 0,
  sectionStartedAt: null,
};

const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {
    initializeAssessment: (state, action) => {
      const data = action.payload;

      state.assessmentId = data._id;
      state.scheduledTestId = data.scheduledAghAssessment;

      // NEW — for section wise, only keep first incomplete section
      if (data.timerRunType === "Section") {
        const firstIncompleteSection = data.sections.find(
          (s) => !s.isCompleted,
        );
        state.sections = firstIncompleteSection ? [firstIncompleteSection] : [];
      } else {
        state.sections = data.sections; // normal assessment — all sections
      }

      state.timer.duration = data.duration;
      state.timer.startedAt = data.testStartedAt;
      state.timer.remaining = data.remainingTime;
      state.timerRunType = data.timerRunType;
      state.totalSections = data.totalSections;
      state.completedSections = data.completedSections;
      state.currentSectionIndex = data.currentSectionIndex ?? 0;
      state.sectionStartedAt = data.sectionStartedAt ?? null;

      state.maxViolationsAllowed = data.maxViolationsAllowed;
      state.violationsDone = data.violationsDone;

      const palette = {};
      // NEW — build palette only for the filtered sections
      state.sections.forEach((section, sIndex) => {
        section.questions.forEach((q, qIndex) => {
          let answered = false;
          let markedForReview = false;

          if (q.type === "mcq") {
            answered = !!q.mcqProblem?.userAnswer;
            markedForReview = !!q.mcqProblem?.markedAsPreview;
          }
          if (q.type === "coding") {
            answered = !!q.codingProblem?.submitted;
            markedForReview = !!q.codingProblem?.markedAsPreview;
          }

          palette[`${sIndex}-${qIndex}`] = {
            visited: answered || markedForReview,
            answered,
            markedForReview,
          };
        });
      });

      state.palette = palette;

      if (data.timerRunType === "Section") {
        state.active = {
          sectionIndex: 0,
          questionIndex: data?.currentlyActiveQuestion?.questionIndex ?? 0,
        };
      } else {
        state.active = {
          sectionIndex: data?.currentlyActiveQuestion?.sectionIndex ?? 0,
          questionIndex: data?.currentlyActiveQuestion?.questionIndex ?? 0,
        };
      }

      state.hasPrev =
        state.active.sectionIndex !== 0 || state.active.questionIndex !== 0;

      const lastSectionIndex = state.sections.length - 1;
      const lastQuestionIndex =
        state.sections[lastSectionIndex]?.questions?.length - 1 || 0;

      state.hasNext = !(
        state.active.sectionIndex === lastSectionIndex &&
        state.active.questionIndex === lastQuestionIndex
      );
    },
    loadNextSection: (state, action) => {
      const {
        nextSection,
        remainingTime,
        completedSections,
        currentSectionIndex,
        sectionStartedAt,
      } = action.payload;

      // replace sections with next incomplete section
      state.sections = [nextSection];

      // reset active to first question of new section
      state.active = {
        sectionIndex: 0,
        questionIndex: 0,
      };

      // update section tracking
      state.completedSections = completedSections;
      state.currentSectionIndex = currentSectionIndex;
      state.sectionStartedAt = sectionStartedAt;

      // reset timer for new section
      state.timer.remaining = remainingTime;

      // reset palette for new section
      const palette = {};
      nextSection.questions.forEach((q, qIndex) => {
        palette[`0-${qIndex}`] = {
          visited: false,
          answered: false,
          markedForReview: false,
        };
      });
      state.palette = palette;

      updateNavState(state);
    },
    changeQuestion: (state, action) => {
      const { sectionIndex, questionIndex } = action.payload;

      // in section wise mode, sectionIndex is always 0 in state
      // footer might pass original sectionIndex but we only have 1 section
      const resolvedSectionIndex =
        state.timerRunType === "Section" ? 0 : sectionIndex;

      state.active.sectionIndex = resolvedSectionIndex;
      state.active.questionIndex = questionIndex;

      const key = `${resolvedSectionIndex}-${questionIndex}`;
      if (state.palette[key]) {
        state.palette[key].visited = true;
      }

      updateNavState(state);
    },

    increaseViolationCount: (state, action) => {
      state.violationsDone += 1;
    },

    handleClickNext: (state) => {
      const { sectionIndex, questionIndex } = state.active;
      const currentSection = state.sections[sectionIndex];

      if (questionIndex < currentSection.questions.length - 1) {
        state.active.questionIndex += 1;
      } else if (
        state.timerRunType !== "Section" &&
        sectionIndex < state.sections.length - 1
      ) {
        state.active.sectionIndex += 1;
        state.active.questionIndex = 0;
      }

      const key = `${state.active.sectionIndex}-${state.active.questionIndex}`;
      if (state.palette[key]) {
        state.palette[key].visited = true;
      }
      updateNavState(state);
    },

    handleClickPrev: (state) => {
      const { sectionIndex, questionIndex } = state.active;

      if (state.timerRunType === "Section" && questionIndex === 0) return;

      if (questionIndex > 0) {
        state.active.questionIndex -= 1;
      } else if (sectionIndex > 0) {
        const prevSectionIndex = sectionIndex - 1;
        const prevSection = state.sections[prevSectionIndex];
        state.active.sectionIndex = prevSectionIndex;
        state.active.questionIndex = prevSection.questions.length - 1;
      }

      const key = `${state.active.sectionIndex}-${state.active.questionIndex}`;
      if (state.palette[key]) {
        state.palette[key].visited = true;
      }
      updateNavState(state);
    },

    updateCodingCode: (state, action) => {
      const { sectionIndex, questionIndex, code, language } = action.payload;

      const question = state.sections[sectionIndex].questions[questionIndex];

      question.codingProblem.userCode = code;
      question.codingProblem.selectedLanguage = language;

      const key = `${sectionIndex}-${questionIndex}`;
      state.palette[key].answered = true;
    },

    toggleReview: (state, action) => {
      const { sectionIndex, questionIndex } = action.payload;
      const key = `${sectionIndex}-${questionIndex}`;
      // get question and update inside of it

      let question = state.sections[sectionIndex].questions[questionIndex];

      if (question.type === "mcq") {
        state.sections[sectionIndex].questions[
          questionIndex
        ].mcqProblem.markedAsPreview = !state.palette[key].markedForReview;
      }

      if (question.type === "coding") {
        state.sections[sectionIndex].questions[
          questionIndex
        ].codingProblem.markedAsPreview = !state.palette[key].markedForReview;
      }

      state.palette[key].markedForReview = !state.palette[key].markedForReview;
    },

    handleClickOption: (state, action) => {
      const char = action.payload;
      const {
        active: { sectionIndex, questionIndex },
        sections,
      } = state;
      const key = `${sectionIndex}-${questionIndex}`;

      if (
        sections[sectionIndex].questions[questionIndex].mcqProblem
          ?.userAnswer === char
      ) {
        sections[sectionIndex].questions[questionIndex].mcqProblem.userAnswer =
          "";
        state.palette[key].answered = false;
      } else {
        sections[sectionIndex].questions[questionIndex].mcqProblem.userAnswer =
          char;
        state.palette[key].answered = true;
      }
    },

    decreaseTimer: (state) => {
      if (state.timer.remaining > 0) {
        state.timer.remaining -= 1;
      }
    },

    handleClickLanguageChangeCPAghAssessment: (state, action) => {
      const language = action.payload;
      const { sectionIndex, questionIndex } = state.active;

      state.sections[sectionIndex].questions[
        questionIndex
      ].codingProblem.selectedLanguage = language;
    },

    handleEditorCodeChangeCP: (state, action) => {
      const { lang, value } = action.payload;

      const { sectionIndex, questionIndex } = state.active;

      const keyMap = {
        "C++": "basicCodeCpp",
        Python: "basicCodePython",
        C: "basicCodeC",
        Java: "basicCodeJava",
      };

      const question = state.sections[sectionIndex].questions[questionIndex];

      if (question?.codingProblem) {
        question.codingProblem[keyMap[lang]] = value;
      }
    },

    resetBasicCodeByLanguageIdCP: (state, action) => {
      const { languageId, newCode } = action.payload;
      const { sectionIndex, questionIndex } = state.active;

      const question = state.sections[sectionIndex].questions[questionIndex];

      if (!question?.codingProblem) return;

      if (languageId === 54) {
        question.codingProblem.basicCodeCpp = newCode;
      } else if (languageId === 50) {
        question.codingProblem.basicCodeC = newCode;
      } else if (languageId === 71) {
        question.codingProblem.basicCodePython = newCode;
      } else {
        question.codingProblem.basicCodeJava = newCode;
      }
    },

    setCompilationResultCP: (state, action) => {
      const { result, userInput } = action.payload;

      const { sectionIndex, questionIndex } = state.active;

      const question = state.sections[sectionIndex].questions[questionIndex];

      if (!question?.codingProblem) return;

      question.codingProblem.compilationResult = {
        ...result,
        userInput,
      };
    },

    setSubmissionResultCP: (state, action) => {
      const { result } = action.payload;
      const { sectionIndex, questionIndex } = state.active;

      const key = `${sectionIndex}-${questionIndex}`;

      const question = state.sections[sectionIndex].questions[questionIndex];

      if (!question?.codingProblem) return;

      question.codingProblem.submissionResult = result;

      if (result?.status?.id === 3) {
        question.codingProblem.submitted = true;
        state.palette[key].answered = true;
      }
    },

    resetCustomInputCP: (state) => {
      const { sectionIndex, questionIndex } = state.active;

      const question = state.sections[sectionIndex].questions[questionIndex];

      if (!question?.codingProblem) return;

      delete question.codingProblem.customInput;
    },

    setCustomInputCP: (state, action) => {
      const { sectionIndex, questionIndex } = state.active;
      const { customInput } = action.payload;

      const question = state.sections[sectionIndex].questions[questionIndex];

      if (!question?.codingProblem) return;

      question.codingProblem.customInput = customInput;
    },

    resetAssessment: () => initialState,
  },
});

export const {
  initializeAssessment,
  changeQuestion,
  updateCodingCode,
  toggleReview,
  decreaseTimer,
  resetAssessment,
  handleClickOption,
  handleClickNext,
  handleClickPrev,
  handleClickLanguageChangeCPAghAssessment,
  handleEditorCodeChangeCP,
  resetBasicCodeByLanguageIdCP,
  setCompilationResultCP,
  setSubmissionResultCP,
  setCustomInputCP,
  resetCustomInputCP,
  loadNextSection,
  increaseViolationCount,
} = assessmentSlice.actions;

export default assessmentSlice.reducer;
