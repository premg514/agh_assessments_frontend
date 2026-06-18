import { useSelector, useDispatch } from "react-redux";
import {
  Header,
  SidebarContainer,
  Content,
} from "../../quizzes/TestPages/QuizTestSidebar/QuizTestSidebar.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Status from "../../quizzes/TestPages/Status/Status";
import { changeQuestion } from "../../../slices/aghAssessmentSlice";
import { useMemo } from "react";
import {
  Container,
  Title,
  QuestionList,
  QuestionItem,
  QuestionButton,
} from "../../quizzes/TestPages/Question-navigator/QuestionNavigator.styles";

// only for agh test attempt page

export const AssessmentQuestionsSideBar = ({
  showSidebar,
  closeSidebar,
  disableQuestionNavigation = false,
  onBlockedNavigation,
}) => {
  const {
    sections,
    active: { sectionIndex, questionIndex },
    palette,
    timerRunType, // NEW
  } = useSelector((state) => state.assessment);

  const dispatch = useDispatch();

  const handleQuestionChange = (idx, index) => {
    if (disableQuestionNavigation) {
      onBlockedNavigation?.();
      return;
    }

    // NEW — in section wise mode, sectionIndex is always 0 in state
    const resolvedSectionIndex = timerRunType === "Section" ? 0 : idx;
    dispatch(
      changeQuestion({
        sectionIndex: resolvedSectionIndex,
        questionIndex: index,
      }),
    );
  };

  const totalQuestions = useMemo(() => {
    return sections.reduce(
      (total, section) => total + (section.questions?.length || 0),
      0,
    );
  }, [sections]);

  const stats = useMemo(() => {
    const values = Object.values(palette);
    return {
      answered: values.filter((v) => v.answered).length,
      visited: values.filter((v) => v.visited).length,
      review: values.filter((v) => v.markedForReview).length,
    };
  }, [palette]);

  return (
    <SidebarContainer>
      <Header>
        {showSidebar && (
          <button className="cross_btn">
            <FontAwesomeIcon icon={faXmark} size="xl" onClick={closeSidebar} />
          </button>
        )}
      </Header>

      <Content>
        <Status
          questionsLength={totalQuestions}
          answers={stats.answered}
          markedQuestionsForReview={stats.review}
        />
        {sections?.map((section, idx) => (
          <div key={section._id}>
            <Container>
              <Title>{section.name}</Title>

              <QuestionList>
                {section.questions.map((eachQuestion, index) => {
                  // NEW — in section wise mode, palette key is always 0-index
                  const paletteKey =
                    timerRunType === "Section"
                      ? `0-${index}`
                      : `${idx}-${index}`;

                  const questionState = palette[paletteKey];

                  // NEW — active check also accounts for section wise mode
                  const isActive =
                    timerRunType === "Section"
                      ? questionIndex === index
                      : sectionIndex === idx && questionIndex === index;

                  return (
                    <QuestionItem key={eachQuestion._id || index}>
                      <QuestionButton
                        $active={isActive}
                        $answered={questionState?.answered}
                        $markedForReview={questionState?.markedForReview}
                        onClick={() => handleQuestionChange(idx, index)}
                      >
                        {index + 1}
                      </QuestionButton>
                    </QuestionItem>
                  );
                })}
              </QuestionList>
            </Container>
          </div>
        ))}
      </Content>
    </SidebarContainer>
  );
};
