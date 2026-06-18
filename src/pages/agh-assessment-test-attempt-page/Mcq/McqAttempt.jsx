import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextareaAutosize from "react-textarea-autosize";
import {
  faA,
  faB,
  faC,
  faCircleQuestion,
  faCode,
  faD,
  faE,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  OptionsContainer,
  Question,
  Option,
  QuestionWrapper,
} from "../../user/test-list-user/style";
import { handleClickOption } from "../../../slices/aghAssessmentSlice";
import { useDispatch, useSelector } from "react-redux";

const McqAttempt = ({ currentlyActiveQuestion }) => {
  const dispatch = useDispatch();
  const {
    assessmentId,
    sections,
    timerRunType,
    currentSectionIndex,
    active: { sectionIndex, questionIndex },
  } = useSelector((state) => state.assessment);

  const handleOptionClick = (char) => {
    const currentAnswer =
      sections[sectionIndex].questions[questionIndex].mcqProblem?.userAnswer;
    const answer = currentAnswer === char ? "" : char;

    dispatch(handleClickOption(answer));

    const resolvedSectionIndex =
      timerRunType === "Section" ? currentSectionIndex : sectionIndex;
    const pendingKey = `mcq_pending_${assessmentId}`;
    const pending = JSON.parse(localStorage.getItem(pendingKey) || "{}");
    pending[`${resolvedSectionIndex}-${questionIndex}`] = {
      sectionIndex: resolvedSectionIndex,
      questionIndex,
      answer,
    };
    localStorage.setItem(pendingKey, JSON.stringify(pending));
  };

  return (
    <div>
      <QuestionWrapper>
        <Question>
          <TextareaAutosize
            value={currentlyActiveQuestion?.question}
            readOnly
            className="textarea_input"
          />

          {currentlyActiveQuestion?.questionImage &&
            currentlyActiveQuestion?.questionImage !== "null_url" && (
              <div className="image__container">
                <img
                  src={currentlyActiveQuestion?.questionImage}
                  alt="question_image"
                  className="image__style"
                />
              </div>
            )}
        </Question>

        <OptionsContainer>
          <Option
            onClick={() => handleOptionClick("a")}
            className={` ${
              currentlyActiveQuestion?.userAnswer === "a" && "selected"
            } `}
          >
            <div className="option-char">
              <FontAwesomeIcon icon={faA} className="icon" />
            </div>
            <span>{currentlyActiveQuestion?.optionA}</span>
            {currentlyActiveQuestion?.optionAImage &&
              currentlyActiveQuestion?.optionAImage !== "null_url" && (
                <div className="image__container">
                  <img
                    src={currentlyActiveQuestion?.optionAImage}
                    alt="option_A_image"
                    className="image__style"
                  />
                </div>
              )}
          </Option>
          <Option
            onClick={() => handleOptionClick("b")}
            className={` ${
              currentlyActiveQuestion?.userAnswer === "b" && "selected"
            } `}
          >
            <div className="option-char">
              <FontAwesomeIcon icon={faB} className="icon" />
            </div>
            <span>{currentlyActiveQuestion?.optionB}</span>
            {currentlyActiveQuestion?.optionBImage &&
              currentlyActiveQuestion?.optionBImage !== "null_url" && (
                <div className="image__container">
                  <img
                    src={currentlyActiveQuestion?.optionBImage}
                    alt="option_B_image"
                    className="image__style"
                  />
                </div>
              )}
          </Option>
          {currentlyActiveQuestion?.optionC &&
            currentlyActiveQuestion?.optionC != "NULL" &&
            currentlyActiveQuestion?.optionC.trim() !== "" && (
              <Option
                onClick={() => handleOptionClick("c")}
                className={` ${
                  currentlyActiveQuestion?.userAnswer === "c" && "selected"
                } `}
              >
                <div className="option-char">
                  <FontAwesomeIcon icon={faC} className="icon" />
                </div>
                <span>{currentlyActiveQuestion?.optionC}</span>
                {currentlyActiveQuestion?.optionCImage &&
                  currentlyActiveQuestion?.optionCImage !== "null_url" && (
                    <div className="image__container">
                      <img
                        src={currentlyActiveQuestion?.optionCImage}
                        alt="option_C_image"
                        className="image__style"
                      />
                    </div>
                  )}
              </Option>
            )}

          {currentlyActiveQuestion?.optionD &&
            currentlyActiveQuestion?.optionD != "NULL" &&
            currentlyActiveQuestion?.optionD.trim() !== "" && (
              <Option
                onClick={() => handleOptionClick("d")}
                className={` ${
                  currentlyActiveQuestion?.userAnswer === "d" && "selected"
                } `}
              >
                <div className="option-char">
                  <FontAwesomeIcon icon={faD} className="icon" />
                </div>
                <span>{currentlyActiveQuestion?.optionD}</span>
                {currentlyActiveQuestion?.optionDImage &&
                  currentlyActiveQuestion?.optionDImage !== "null_url" && (
                    <div className="image__container">
                      <img
                        src={currentlyActiveQuestion?.optionDImage}
                        alt="option_D_image"
                        className="image__style"
                      />
                    </div>
                  )}
              </Option>
            )}

          {currentlyActiveQuestion?.optionE &&
            currentlyActiveQuestion?.optionE != "NULL" &&
            currentlyActiveQuestion?.optionE.trim() !== "" && (
              <Option
                onClick={() => handleOptionClick("e")}
                className={` ${
                  currentlyActiveQuestion?.userAnswer === "e" && "selected"
                } `}
              >
                <div className="option-char">
                  <FontAwesomeIcon icon={faE} className="icon" />
                </div>
                <span>{currentlyActiveQuestion?.optionE}</span>
                {currentlyActiveQuestion?.optionEImage &&
                  currentlyActiveQuestion?.optionEImage !== "null_url" && (
                    <div className="image__container">
                      <img
                        src={currentlyActiveQuestion?.optionEImage}
                        alt="option_E_image"
                        className="image__style"
                      />
                    </div>
                  )}
              </Option>
            )}
        </OptionsContainer>
      </QuestionWrapper>
    </div>
  );
};

export default McqAttempt;
