import React from "react";
import { CiGrid41 } from "react-icons/ci";
import {
  FooterWrapper,
  QuestionItem,
} from "../../quizzes/TestPages/QuizFooter/QuizFooter.styles";
import {
  QuestionButton,
  QuestionList,
} from "../../quizzes/TestPages/Question-navigator/QuestionNavigator.styles";

const AGHAssessmentFooter = ({
  sections,
  activeSectionIndex,
  activeQuestionIndex,
  onSelectQuestion,
  onToggleNavigator,
  disableQuestionNavigation = false,
  onBlockedNavigation,
}) => {
  const questions = sections[activeSectionIndex]?.questions || [];

  const totalQuestions = questions.length;

  let start = activeQuestionIndex - 2;
  let end = activeQuestionIndex + 2;

  if (start < 0) {
    end += -start;
    start = 0;
  }

  if (end > totalQuestions - 1) {
    start -= end - (totalQuestions - 1);
    end = totalQuestions - 1;
    if (start < 0) start = 0;
  }

  const visibleQuestions = questions.slice(start, end + 1);

  return (
    <FooterWrapper>
      <QuestionList>
        {visibleQuestions.map((q, index) => {
          const realIndex = start + index;

          const isAnswered =
            q.type === "mcq"
              ? q.mcqProblem.userAnswer
              : q.codingProblem.submitted;

          const isMarked =
            q.type === "mcq"
              ? q.mcqProblem.markedAsPreview
              : q.codingProblem.markedAsPreview;

          return (
            <QuestionItem key={realIndex}>
              <QuestionButton
                $active={activeQuestionIndex === realIndex}
                $answered={!!isAnswered}
                $markedForReview={isMarked}
                onClick={() => {
                  if (disableQuestionNavigation) {
                    onBlockedNavigation?.();
                    return;
                  }

                  onSelectQuestion(activeSectionIndex, realIndex);
                }}
              >
                {realIndex + 1}
              </QuestionButton>
            </QuestionItem>
          );
        })}
      </QuestionList>

      <div>
        <CiGrid41 size={22} onClick={onToggleNavigator} />
      </div>
    </FooterWrapper>
  );
};

export default AGHAssessmentFooter;
