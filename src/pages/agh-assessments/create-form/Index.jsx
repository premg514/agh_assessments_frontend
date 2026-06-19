import React, { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import {
  Button,
  InputContainerWithOutIcon,
} from "../../user/login/user-login-style";
import ChooseCodingQuestiions from "../../aptitude-test/admin/technical/chooseCodingQuestions";
import { useSelector } from "react-redux";
import {
  AGH_Assessment_form,
  AGH_Assessment_form_section_container,
} from "./styles";
import { ErrorMessage } from "../../super-admin/explore/create-problem-set/style";
import { InputWrapper } from "../../admin/login/admin-login-style";
import { WarningText } from "../../admin/common.style";
import axiosInstance from "../../../services/apiconnector";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import UsersSelection from "../../../component/users-selection-component/Index";
import toast from "react-hot-toast";
import AddQuestionForm from "../../add-question/add-question-component";
import { addQuestionFormDefaultObject } from "../../aptitude-test/data";
import { useIsThemeDark } from "../../../hooks/useIsThemeDark";

const MCQ_IMAGE_FIELDS = [
  "questionImage",
  "optionAImage",
  "optionBImage",
  "optionCImage",
  "optionDImage",
];

const isImageFile = (value) => value instanceof File;

const imageValueForInlineMcq = (image) => {
  if (isImageFile(image)) {
    return image;
  }

  return typeof image === "string" && image.trim() ? image : "null_url";
};

const getInlineMcqImageFieldName = (sectionIndex, mcqIndex, imageField) =>
  `sections_${sectionIndex}_newMcqProblems_${mcqIndex}_${imageField}`;

const buildAssessmentFormData = (payload) => {
  const formData = new FormData();
  const payloadWithoutFiles = {
    ...payload,
    sections: (payload.sections || []).map((section, sectionIndex) => ({
      ...section,
      newMcqProblems: (section.newMcqProblems || []).map((mcq, mcqIndex) => {
        const normalizedMcq = { ...mcq };

        MCQ_IMAGE_FIELDS.forEach((imageField) => {
          const imageValue = normalizedMcq[imageField];

          if (isImageFile(imageValue)) {
            formData.append(
              getInlineMcqImageFieldName(sectionIndex, mcqIndex, imageField),
              imageValue,
            );
            normalizedMcq[imageField] = "";
          }
        });

        return normalizedMcq;
      }),
    })),
  };

  formData.append("assessmentData", JSON.stringify(payloadWithoutFiles));
  return formData;
};

const mapFormQuestionToInlineMcq = (question) => ({
  question: question?.question?.statement || "",
  questionImage: imageValueForInlineMcq(question?.question?.image),
  optionA: question?.options?.[0]?.statement || "",
  optionAImage: imageValueForInlineMcq(question?.options?.[0]?.image),
  optionB: question?.options?.[1]?.statement || "",
  optionBImage: imageValueForInlineMcq(question?.options?.[1]?.image),
  optionC: question?.options?.[2]?.statement || "",
  optionCImage: imageValueForInlineMcq(question?.options?.[2]?.image),
  optionD: question?.options?.[3]?.statement || "",
  optionDImage: imageValueForInlineMcq(question?.options?.[3]?.image),
  correctAnswer: String(question?.answerKey || "")
    .trim()
    .toLowerCase(),
  questionLevel: question?.difficulty || "",
  difficulty: question?.difficulty || "",
  explanation: question?.explanation || "",
});

const hasManualMcqValue = (value) => {
  if (isImageFile(value)) {
    return true;
  }

  if (typeof value !== "string") {
    return Boolean(value);
  }

  const normalizedValue = value.trim();
  return normalizedValue !== "" && normalizedValue !== "null_url";
};

const hasManualMcqContent = (mcq) =>
  [
    mcq?.question,
    mcq?.questionImage,
    mcq?.optionA,
    mcq?.optionAImage,
    mcq?.optionB,
    mcq?.optionBImage,
    mcq?.optionC,
    mcq?.optionCImage,
    mcq?.optionD,
    mcq?.optionDImage,
    mcq?.correctAnswer,
    mcq?.questionLevel,
    mcq?.difficulty,
    mcq?.explanation,
  ].some(hasManualMcqValue);

const isCompleteManualMcq = (mcq) => {
  const correctAnswer = String(mcq?.correctAnswer || "")
    .trim()
    .toLowerCase();

  return (
    Boolean(mcq?.question?.trim()) &&
    Boolean(mcq?.optionA?.trim()) &&
    Boolean(mcq?.optionB?.trim()) &&
    Boolean(mcq?.optionC?.trim()) &&
    Boolean(mcq?.optionD?.trim()) &&
    ["a", "b", "c", "d"].includes(correctAnswer) &&
    Boolean(mcq?.questionLevel || mcq?.difficulty)
  );
};

const getFilledManualMcqs = (mcqs) =>
  (mcqs || []).filter(hasManualMcqContent).map((mcq) => ({
    ...mcq,
    correctAnswer: String(mcq.correctAnswer || "")
      .trim()
      .toLowerCase(),
    questionLevel: mcq.questionLevel || mcq.difficulty,
    difficulty: mcq.difficulty || mcq.questionLevel,
  }));

const mapInlineMcqToFormQuestion = (mcq) => ({
  question: {
    statement: mcq?.question || "",
    image: null,
  },
  difficulty: mcq?.questionLevel || mcq?.difficulty || "",
  options: [
    { statement: mcq?.optionA || "", image: null },
    { statement: mcq?.optionB || "", image: null },
    { statement: mcq?.optionC || "", image: null },
    { statement: mcq?.optionD || "", image: null },
  ],
  answerKey: String(mcq?.correctAnswer || "")
    .trim()
    .toLowerCase(),
  explanation: mcq?.explanation || "",
});

const getManualMcqDefaultValues = (mcqs) => {
  if (Array.isArray(mcqs) && mcqs.length > 0) {
    return {
      questions: mcqs.map(mapInlineMcqToFormQuestion),
    };
  }

  return {
    questions: [addQuestionFormDefaultObject],
  };
};

const ManualMcqSelectedList = ({ mcqs }) => {
  const visibleMcqs = mcqs.filter((mcq) => mcq.question?.trim());

  return (
    <div className="manual_mcq_selected_preview">
      <div className="manual_mcq_selected_header">
        <h3>MCQs added through form</h3>
        <span>Total: {visibleMcqs.length}</span>
      </div>

      {visibleMcqs.length === 0 ? (
        <div className="manual_mcq_empty_state">
          Added MCQs will show here as you fill the form.
        </div>
      ) : (
        <div className="manual_mcq_preview_table_wrapper">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Question</th>
                <th>Difficulty</th>
                <th>Answer</th>
              </tr>
            </thead>
            <tbody>
              {visibleMcqs.map((mcq, mcqIndex) => (
                <tr key={`${mcq.question}-${mcqIndex}`}>
                  <td>{mcqIndex + 1}</td>
                  <td>{mcq.question}</td>
                  <td>{mcq.questionLevel || "Not selected"}</td>
                  <td>{mcq.correctAnswer?.toUpperCase() || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const ManualMcqProblemsForm = ({ mcqs, setMcqs, type, subType }) => {
  const methods = useForm({
    defaultValues: getManualMcqDefaultValues(mcqs),
  });

  useEffect(() => {
    const subscription = methods.watch((value) => {
      setMcqs((value.questions || []).map(mapFormQuestionToInlineMcq));
    });

    setMcqs(
      (methods.getValues("questions") || []).map(mapFormQuestionToInlineMcq),
    );

    return () => subscription.unsubscribe();
  }, [methods, setMcqs]);

  return (
    <div className="manual_mcq_form">
      <FormProvider {...methods}>
        <AddQuestionForm type={type} subType={subType} />
      </FormProvider>
    </div>
  );
};

const AssessmentSection = ({
  field,
  index,
  register,
  token,
  remove,
  setValue,
  formState,
  watch,
  isSectionWise, // NEW PROP
  type,
  subType,

  // when edit true
  initialMCQs,
  initialProblems,
  initialSQLProblems,
}) => {
  const { errors } = formState;
  const [selectedProblems, setSelectedProblems] = useState(
    initialProblems || [],
  );
  const [selectedMCQs, setSelectedMCQs] = useState(initialMCQs || []);
  const [mcqInputMode, setMcqInputMode] = useState("select");
  const [manualMCQs, setManualMCQs] = useState([]);
  const [selectedSQLProblems, setSelectedSQLProblems] = useState(
    initialSQLProblems || [],
  );

  const countDifficulty = (problems) =>
    problems.reduce(
      (acc, cur) => {
        const difficulty = cur.difficulty || cur.questionLevel;
        if (difficulty === "Easy") acc.easy++;
        else if (difficulty === "Medium") acc.medium++;
        else if (difficulty === "Hard") acc.hard++;
        return acc;
      },
      { easy: 0, medium: 0, hard: 0 },
    );

  const {
    easy: easyCount,
    medium: mediumCount,
    hard: hardCount,
  } = countDifficulty(selectedProblems);
  const {
    easy: easyMCQCount,
    medium: mediumMCQCount,
    hard: hardMCQCount,
  } = countDifficulty([...selectedMCQs, ...manualMCQs]);
  const {
    easy: easySQLCount,
    medium: mediumSQLCount,
    hard: hardSQLCount,
  } = countDifficulty(selectedSQLProblems);

  useEffect(() => {
    setValue(`sections.${index}.codingProblems`, selectedProblems);
  }, [selectedProblems.length]);

  useEffect(() => {
    setValue(`sections.${index}.mcqProblems`, selectedMCQs);
    setValue(`sections.${index}.newMcqProblems`, manualMCQs);
  }, [selectedMCQs.length, manualMCQs]);

  useEffect(() => {
    setValue(`sections.${index}.sqlProblems`, selectedSQLProblems);
  }, [selectedSQLProblems.length]);

  const easyQuestions =
    watch(`sections.${index}.codingProblemsGetOnTest.easy`) || 0;
  const mediumQuestions =
    watch(`sections.${index}.codingProblemsGetOnTest.medium`) || 0;
  const hardQuestions =
    watch(`sections.${index}.codingProblemsGetOnTest.hard`) || 0;

  const easyMark =
    watch(`sections.${index}.codingProblemsMarkConfig.easy`) || 0;
  const mediumMark =
    watch(`sections.${index}.codingProblemsMarkConfig.medium`) || 0;
  const hardMark =
    watch(`sections.${index}.codingProblemsMarkConfig.hard`) || 0;

  const totalEasyMarks = easyQuestions * easyMark;
  const totalMediumMarks = mediumQuestions * mediumMark;
  const totalHardMarks = hardQuestions * hardMark;

  const totalMarks = totalEasyMarks + totalMediumMarks + totalHardMarks;

  const easyMCQQuestions =
    watch(`sections.${index}.mcqProblemsGetOnTest.easy`) || 0;
  const mediumMCQQuestions =
    watch(`sections.${index}.mcqProblemsGetOnTest.medium`) || 0;
  const hardMCQQuestions =
    watch(`sections.${index}.mcqProblemsGetOnTest.hard`) || 0;

  const easyMCQMark =
    watch(`sections.${index}.mcqProblemsMarkConfig.easy`) || 0;
  const mediumMCQMark =
    watch(`sections.${index}.mcqProblemsMarkConfig.medium`) || 0;
  const hardMCQMark =
    watch(`sections.${index}.mcqProblemsMarkConfig.hard`) || 0;

  const totalMCQEasyMarks = easyMCQQuestions * easyMCQMark;
  const totalMCQMediumMarks = mediumMCQQuestions * mediumMCQMark;
  const totalMCQHardMarks = hardMCQQuestions * hardMCQMark;

  const totalMCQMarks =
    totalMCQEasyMarks + totalMCQMediumMarks + totalMCQHardMarks;

  const easySQLQuestions =
    watch(`sections.${index}.sqlProblemsGetOnTest.easy`) || 0;
  const mediumSQLQuestions =
    watch(`sections.${index}.sqlProblemsGetOnTest.medium`) || 0;
  const hardSQLQuestions =
    watch(`sections.${index}.sqlProblemsGetOnTest.hard`) || 0;

  const easySQLMark =
    watch(`sections.${index}.sqlProblemsMarkConfig.easy`) || 0;
  const mediumSQLMark =
    watch(`sections.${index}.sqlProblemsMarkConfig.medium`) || 0;
  const hardSQLMark =
    watch(`sections.${index}.sqlProblemsMarkConfig.hard`) || 0;

  const totalSQLEasyMarks = easySQLQuestions * easySQLMark;
  const totalSQLMediumMarks = mediumSQLQuestions * mediumSQLMark;
  const totalSQLHardMarks = hardSQLQuestions * hardSQLMark;

  const totalSQLMarks =
    totalSQLEasyMarks + totalSQLMediumMarks + totalSQLHardMarks;

  return (
    <AGH_Assessment_form_section_container>
      <h3>Section {index + 1}</h3>
      <InputWrapper>
        <label htmlFor={`section_name_${field.id}`}>Section Name*</label>
        <InputContainerWithOutIcon>
          <input
            id={`section_name_${field.id}`}
            {...register(`sections.${index}.name`, {
              required: "This field is required",
            })}
            type="text"
          />
        </InputContainerWithOutIcon>

        {errors?.sections?.[index]?.name && (
          <ErrorMessage>
            {errors?.sections?.[index]?.name?.message}
          </ErrorMessage>
        )}
      </InputWrapper>

      {/* ── SECTION TIMER (only when isSectionWise = "yes") ── */}
      {isSectionWise === "yes" && (
        <InputWrapper>
          <label htmlFor={`section_duration_${field.id}`}>
            Section Duration* (in minutes)
          </label>
          <InputContainerWithOutIcon>
            <input
              id={`section_duration_${field.id}`}
              {...register(`sections.${index}.sectionDuration`, {
                required: "Section duration is required",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Duration must be at least 1 minute",
                },
                validate: (value) =>
                  Number.isInteger(value) || "Only integer values allowed",
              })}
              type="number"
            />
          </InputContainerWithOutIcon>

          {errors?.sections?.[index]?.sectionDuration && (
            <ErrorMessage>
              {errors?.sections?.[index]?.sectionDuration?.message}
            </ErrorMessage>
          )}
        </InputWrapper>
      )}

      <div className="flex_col_box">
        <div className="problems_choose">
          <div>Coding Problems</div>

          <ChooseCodingQuestiions
            selectedProblems={selectedProblems}
            setSelectedProblems={setSelectedProblems}
            token={token}
            questions_type="CODING"
          />
          <div className="counts_container">
            <div>Selected Easy Problems: {easyCount}</div>
            <div>Selected Medium Problems: {mediumCount}</div>
            <div>Selected Hard Problems: {hardCount}</div>
          </div>

          <div>
            <div>
              Questions Config (Questions user will get on assessment by
              difficulty)
            </div>
            <div className="question_config_inputs_container">
              <InputWrapper>
                <label htmlFor={`${field.id}.codingProblemsGetOnTest.easy`}>
                  Easy Questions
                </label>
                <InputContainerWithOutIcon>
                  <input
                    id={`${field.id}.codingProblemsGetOnTest.easy`}
                    {...register(
                      `sections.${index}.codingProblemsGetOnTest.easy`,
                      {
                        valueAsNumber: true,
                        step: "1",
                        max: {
                          value: easyCount,
                          message:
                            "Value can't be more then selected easy questions",
                        },
                        min: {
                          value: easyCount > 0 ? 1 : 0,
                          message: `Value can't be less than ${easyCount > 0 ? 1 : 0}`,
                        },
                        validate: (value) =>
                          Number.isInteger(value) ||
                          "Only integer values allowed",
                      },
                    )}
                    type="number"
                  />
                </InputContainerWithOutIcon>

                {errors?.sections?.[index]?.codingProblemsGetOnTest?.easy && (
                  <ErrorMessage>
                    {
                      errors?.sections?.[index]?.codingProblemsGetOnTest?.easy
                        ?.message
                    }
                  </ErrorMessage>
                )}
              </InputWrapper>
              <InputWrapper>
                <label htmlFor={`${field.id}.codingProblemsGetOnTest.medium`}>
                  Medium Questions
                </label>
                <InputContainerWithOutIcon>
                  <input
                    id={`${field.id}.codingProblemsGetOnTest.medium`}
                    {...register(
                      `sections.${index}.codingProblemsGetOnTest.medium`,
                      {
                        valueAsNumber: true,
                        max: {
                          value: mediumCount,
                          message:
                            "Value can't be more then selected medium questions",
                        },
                        min: {
                          value: mediumCount > 0 ? 1 : 0,
                          message: `Value can't be less than ${mediumCount > 0 ? 1 : 0}`,
                        },
                        validate: (value) =>
                          Number.isInteger(value) ||
                          "Only integer values allowed",
                      },
                    )}
                    type="number"
                  />
                </InputContainerWithOutIcon>

                {errors?.sections?.[index]?.codingProblemsGetOnTest?.medium && (
                  <ErrorMessage>
                    {
                      errors?.sections?.[index]?.codingProblemsGetOnTest?.medium
                        ?.message
                    }
                  </ErrorMessage>
                )}
              </InputWrapper>
              <InputWrapper>
                <label htmlFor={`${field.id}.codingProblemsGetOnTest.hard`}>
                  Hard Questions
                </label>
                <InputContainerWithOutIcon>
                  <input
                    id={`${field.id}.codingProblemsGetOnTest.hard`}
                    {...register(
                      `sections.${index}.codingProblemsGetOnTest.hard`,
                      {
                        valueAsNumber: true,
                        max: {
                          value: hardCount,
                          message:
                            "Value can't be more then selected hard questions",
                        },
                        min: {
                          value: hardCount > 0 ? 1 : 0,
                          message: `Value can't be less than ${hardCount > 0 ? 1 : 0}`,
                        },
                        validate: (value) =>
                          Number.isInteger(value) ||
                          "Only integer values allowed",
                      },
                    )}
                    type="number"
                  />
                </InputContainerWithOutIcon>

                {errors?.sections?.[index]?.codingProblemsGetOnTest?.hard && (
                  <ErrorMessage>
                    {
                      errors?.sections?.[index]?.codingProblemsGetOnTest?.hard
                        ?.message
                    }
                  </ErrorMessage>
                )}
              </InputWrapper>
            </div>
          </div>
          <div>
            <div>
              Marks Config (Marks user will get on solving questions by
              difficulty)
            </div>
            <div className="question_config_inputs_container">
              <InputWrapper>
                <label htmlFor={`${field.id}.codingProblemsMarkConfig.easy`}>
                  Easy Questions Mark
                </label>
                <InputContainerWithOutIcon>
                  <input
                    id={`${field.id}.codingProblemsMarkConfig.easy`}
                    {...register(
                      `sections.${index}.codingProblemsMarkConfig.easy`,
                      {
                        valueAsNumber: true,
                      },
                    )}
                    type="number"
                  />
                </InputContainerWithOutIcon>

                {errors?.sections?.[index]?.codingProblemsMarkConfig?.easy && (
                  <ErrorMessage>
                    {
                      errors?.sections?.[index]?.codingProblemsMarkConfig?.easy
                        ?.message
                    }
                  </ErrorMessage>
                )}
              </InputWrapper>
              <InputWrapper>
                <label htmlFor={`${field.id}.codingProblemsMarkConfig.medium`}>
                  Medium Questions Mark
                </label>
                <InputContainerWithOutIcon>
                  <input
                    id={`${field.id}.codingProblemsMarkConfig.medium`}
                    {...register(
                      `sections.${index}.codingProblemsMarkConfig.medium`,
                      {
                        valueAsNumber: true,
                      },
                    )}
                    type="number"
                  />
                </InputContainerWithOutIcon>

                {errors?.sections?.[index]?.codingProblemsMarkConfig
                  ?.medium && (
                  <ErrorMessage>
                    {
                      errors?.sections?.[index]?.codingProblemsMarkConfig
                        ?.medium?.message
                    }
                  </ErrorMessage>
                )}
              </InputWrapper>
              <InputWrapper>
                <label htmlFor={`${field.id}.codingProblemsMarkConfig.hard`}>
                  Hard Questions Mark
                </label>
                <InputContainerWithOutIcon>
                  <input
                    id={`${field.id}.codingProblemsMarkConfig.hard`}
                    {...register(
                      `sections.${index}.codingProblemsMarkConfig.hard`,
                      {
                        valueAsNumber: true,
                      },
                    )}
                    type="number"
                  />
                </InputContainerWithOutIcon>

                {errors?.sections?.[index]?.codingProblemsMarkConfig?.hard && (
                  <ErrorMessage>
                    {
                      errors?.sections?.[index]?.codingProblemsMarkConfig?.hard
                        ?.message
                    }
                  </ErrorMessage>
                )}
              </InputWrapper>
            </div>
          </div>

          <div className="section_marks_summary">
            <p>
              Easy Marks: {easyQuestions} × {easyMark} = {totalEasyMarks}
            </p>
            <p>
              Medium Marks: {mediumQuestions} × {mediumMark} ={" "}
              {totalMediumMarks}
            </p>
            <p>
              Hard Marks: {hardQuestions} × {hardMark} = {totalHardMarks}
            </p>

            <hr />

            <p>
              <strong>Total Coding Questions Mark: {totalMarks}</strong>
            </p>
          </div>
        </div>

        <div className="problems_choose">
          <div className="problem_header">
            <div>Mcq Problems</div>
            <Button
              type="button"
              className="w-fit"
              onClick={() =>
                setMcqInputMode((prev) =>
                  prev === "select" ? "form" : "select",
                )
              }
            >
              {mcqInputMode === "select"
                ? "Add MCQ By Form"
                : "Select Existing MCQs"}
            </Button>
          </div>

          {mcqInputMode === "select" ? (
            <ChooseCodingQuestiions
              selectedProblems={selectedMCQs}
              setSelectedProblems={setSelectedMCQs}
              token={token}
              apiEndPoint="code/sa/mcq-problems"
              questions_type="MCQ"
            />
          ) : (
            <ManualMcqProblemsForm
              mcqs={manualMCQs}
              setMcqs={setManualMCQs}
              type={type}
              subType={subType}
            />
          )}
          {mcqInputMode === "select" && manualMCQs.length > 0 && (
            <ManualMcqSelectedList mcqs={manualMCQs} />
          )}
          <div className="counts_container">
            <div>Selected Easy Problems: {easyMCQCount}</div>
            <div>Selected Medium Problems: {mediumMCQCount}</div>
            <div>Selected Hard Problems: {hardMCQCount}</div>
          </div>

          <div>
            <div>
              Questions Config (Questions user will get on assessment by
              difficulty)
            </div>
            <div className="question_config_inputs_container">
              <InputWrapper>
                <label htmlFor={`${field.id}.mcqProblemsGetOnTest.easy`}>
                  Easy Questions
                </label>
                <InputContainerWithOutIcon>
                  <input
                    id={`${field.id}.mcqProblemsGetOnTest.easy`}
                    {...register(
                      `sections.${index}.mcqProblemsGetOnTest.easy`,
                      {
                        valueAsNumber: true,
                        max: {
                          value: easyMCQCount,
                          message:
                            "Value can't be more then selected easy MCQ questions",
                        },
                        min: {
                          value: easyMCQCount > 0 ? 1 : 0,
                          message: `Value can't be less than ${easyMCQCount > 0 ? 1 : 0}`,
                        },
                        validate: (value) =>
                          Number.isInteger(value) ||
                          "Only integer values allowed",
                      },
                    )}
                    type="number"
                  />
                </InputContainerWithOutIcon>

                {errors?.sections?.[index]?.mcqProblemsGetOnTest?.easy && (
                  <ErrorMessage>
                    {
                      errors?.sections?.[index]?.mcqProblemsGetOnTest?.easy
                        ?.message
                    }
                  </ErrorMessage>
                )}
              </InputWrapper>
              <InputWrapper>
                <label htmlFor={`${field.id}.mcqProblemsGetOnTest.medium`}>
                  Medium Questions
                </label>
                <InputContainerWithOutIcon>
                  <input
                    id={`${field.id}.mcqProblemsGetOnTest.medium`}
                    {...register(
                      `sections.${index}.mcqProblemsGetOnTest.medium`,
                      {
                        valueAsNumber: true,
                        max: {
                          value: mediumMCQCount,
                          message:
                            "Value can't be more then selected medium MCQ questions",
                        },
                        min: {
                          value: mediumMCQCount > 0 ? 1 : 0,
                          message: `Value can't be less than ${mediumMCQCount > 0 ? 1 : 0}`,
                        },
                        validate: (value) =>
                          Number.isInteger(value) ||
                          "Only integer values allowed",
                      },
                    )}
                    type="number"
                  />
                </InputContainerWithOutIcon>

                {errors?.sections?.[index]?.mcqProblemsGetOnTest?.medium && (
                  <ErrorMessage>
                    {
                      errors?.sections?.[index]?.mcqProblemsGetOnTest?.medium
                        ?.message
                    }
                  </ErrorMessage>
                )}
              </InputWrapper>
              <InputWrapper>
                <label htmlFor={`${field.id}.mcqProblemsGetOnTest.hard`}>
                  Hard Questions
                </label>
                <InputContainerWithOutIcon>
                  <input
                    id={`${field.id}.mcqProblemsGetOnTest.hard`}
                    {...register(
                      `sections.${index}.mcqProblemsGetOnTest.hard`,
                      {
                        valueAsNumber: true,
                        max: {
                          value: hardMCQCount,
                          message:
                            "Value can't be more then selected hard MCQ questions",
                        },
                        min: {
                          value: hardMCQCount > 0 ? 1 : 0,
                          message: `Value can't be less than ${hardMCQCount > 0 ? 1 : 0}`,
                        },
                        validate: (value) =>
                          Number.isInteger(value) ||
                          "Only integer values allowed",
                      },
                    )}
                    type="number"
                  />
                </InputContainerWithOutIcon>

                {errors?.sections?.[index]?.mcqProblemsGetOnTest?.hard && (
                  <ErrorMessage>
                    {
                      errors?.sections?.[index]?.mcqProblemsGetOnTest?.hard
                        ?.message
                    }
                  </ErrorMessage>
                )}
              </InputWrapper>
            </div>
          </div>
          <div>
            <div>
              Marks Config (Marks user will get on solving questions by
              difficulty)
            </div>
            <div className="question_config_inputs_container">
              <InputWrapper>
                <label htmlFor={`${field.id}.mcqProblemsMarkConfig.easy`}>
                  Easy Questions Mark
                </label>
                <InputContainerWithOutIcon>
                  <input
                    id={`${field.id}.mcqProblemsMarkConfig.easy`}
                    {...register(
                      `sections.${index}.mcqProblemsMarkConfig.easy`,
                      {
                        valueAsNumber: true,
                      },
                    )}
                    type="number"
                  />
                </InputContainerWithOutIcon>

                {errors?.sections?.[index]?.mcqProblemsMarkConfig?.easy && (
                  <ErrorMessage>
                    {
                      errors?.sections?.[index]?.mcqProblemsMarkConfig?.easy
                        ?.message
                    }
                  </ErrorMessage>
                )}
              </InputWrapper>
              <InputWrapper>
                <label htmlFor={`${field.id}.mcqProblemsMarkConfig.medium`}>
                  Medium Questions Mark
                </label>
                <InputContainerWithOutIcon>
                  <input
                    id={`${field.id}.mcqProblemsMarkConfig.medium`}
                    {...register(
                      `sections.${index}.mcqProblemsMarkConfig.medium`,
                      {
                        valueAsNumber: true,
                      },
                    )}
                    type="number"
                  />
                </InputContainerWithOutIcon>

                {errors?.sections?.[index]?.mcqProblemsMarkConfig?.medium && (
                  <ErrorMessage>
                    {
                      errors?.sections?.[index]?.mcqProblemsMarkConfig?.medium
                        ?.message
                    }
                  </ErrorMessage>
                )}
              </InputWrapper>
              <InputWrapper>
                <label htmlFor={`${field.id}.mcqProblemsMarkConfig.hard`}>
                  Hard Questions Mark
                </label>
                <InputContainerWithOutIcon>
                  <input
                    id={`${field.id}.mcqProblemsMarkConfig.hard`}
                    {...register(
                      `sections.${index}.mcqProblemsMarkConfig.hard`,
                      {
                        valueAsNumber: true,
                      },
                    )}
                    type="number"
                  />
                </InputContainerWithOutIcon>

                {errors?.sections?.[index]?.mcqProblemsMarkConfig?.hard && (
                  <ErrorMessage>
                    {
                      errors?.sections?.[index]?.mcqProblemsMarkConfig?.hard
                        ?.message
                    }
                  </ErrorMessage>
                )}
              </InputWrapper>
            </div>
          </div>

          <div className="section_marks_summary">
            <p>
              Easy Marks: {easyMCQQuestions} × {easyMCQMark} ={" "}
              {totalMCQEasyMarks}
            </p>
            <p>
              Medium Marks: {mediumMCQQuestions} × {mediumMCQMark} ={" "}
              {totalMCQMediumMarks}
            </p>
            <p>
              Hard Marks: {hardMCQQuestions} × {hardMCQMark} ={" "}
              {totalMCQHardMarks}
            </p>

            <hr />

            <p>
              <strong>Total MCQ Questions Mark: {totalMCQMarks}</strong>
            </p>
          </div>
        </div>

        <div className="problems_choose">
          <div>SQL Problems</div>
          <ChooseCodingQuestiions
            selectedProblems={selectedSQLProblems}
            setSelectedProblems={setSelectedSQLProblems}
            token={token}
            apiEndPoint="code/sa/sql-problems"
            questions_type="SQL"
          />
          <div className="counts_container">
            <div>Selected Easy Problems: {easySQLCount}</div>
            <div>Selected Medium Problems: {mediumSQLCount}</div>
            <div>Selected Hard Problems: {hardSQLCount}</div>
          </div>

          <div>
            <div>
              Questions Config (Questions user will get on assessment by
              difficulty)
            </div>
            <div className="question_config_inputs_container">
              <InputWrapper>
                <label htmlFor={`${field.id}.sqlProblemsGetOnTest.easy`}>
                  Easy Questions
                </label>
                <InputContainerWithOutIcon>
                  <input
                    id={`${field.id}.sqlProblemsGetOnTest.easy`}
                    {...register(
                      `sections.${index}.sqlProblemsGetOnTest.easy`,
                      {
                        valueAsNumber: true,
                        max: {
                          value: easySQLCount,
                          message:
                            "Value can't be more then selected easy questions",
                        },
                        min: {
                          value: easySQLCount > 0 ? 1 : 0,
                          message: `Value can't be less than ${easySQLCount > 0 ? 1 : 0}`,
                        },
                        validate: (value) =>
                          Number.isInteger(value) ||
                          "Only integer values allowed",
                      },
                    )}
                    type="number"
                  />
                </InputContainerWithOutIcon>

                {errors?.sections?.[index]?.sqlProblemsGetOnTest?.easy && (
                  <ErrorMessage>
                    {
                      errors?.sections?.[index]?.sqlProblemsGetOnTest?.easy
                        ?.message
                    }
                  </ErrorMessage>
                )}
              </InputWrapper>
              <InputWrapper>
                <label htmlFor={`${field.id}.sqlProblemsGetOnTest.medium`}>
                  Medium Questions
                </label>
                <InputContainerWithOutIcon>
                  <input
                    id={`${field.id}.sqlProblemsGetOnTest.medium`}
                    {...register(
                      `sections.${index}.sqlProblemsGetOnTest.medium`,
                      {
                        valueAsNumber: true,
                        max: {
                          value: mediumSQLCount,
                          message:
                            "Value can't be more then selected medium questions",
                        },
                        min: {
                          value: mediumSQLCount > 0 ? 1 : 0,
                          message: `Value can't be less than ${mediumSQLCount > 0 ? 1 : 0}`,
                        },
                        validate: (value) =>
                          Number.isInteger(value) ||
                          "Only integer values allowed",
                      },
                    )}
                    type="number"
                  />
                </InputContainerWithOutIcon>

                {errors?.sections?.[index]?.sqlProblemsGetOnTest?.medium && (
                  <ErrorMessage>
                    {
                      errors?.sections?.[index]?.sqlProblemsGetOnTest?.medium
                        ?.message
                    }
                  </ErrorMessage>
                )}
              </InputWrapper>
              <InputWrapper>
                <label htmlFor={`${field.id}.sqlProblemsGetOnTest.hard`}>
                  Hard Questions
                </label>
                <InputContainerWithOutIcon>
                  <input
                    id={`${field.id}.sqlProblemsGetOnTest.hard`}
                    {...register(
                      `sections.${index}.sqlProblemsGetOnTest.hard`,
                      {
                        valueAsNumber: true,
                        max: {
                          value: hardSQLCount,
                          message:
                            "Value can't be more then selected hard questions",
                        },
                        min: {
                          value: hardSQLCount > 0 ? 1 : 0,
                          message: `Value can't be less than ${hardSQLCount > 0 ? 1 : 0}`,
                        },
                        validate: (value) =>
                          Number.isInteger(value) ||
                          "Only integer values allowed",
                      },
                    )}
                    type="number"
                  />
                </InputContainerWithOutIcon>

                {errors?.sections?.[index]?.sqlProblemsGetOnTest?.hard && (
                  <ErrorMessage>
                    {
                      errors?.sections?.[index]?.sqlProblemsGetOnTest?.hard
                        ?.message
                    }
                  </ErrorMessage>
                )}
              </InputWrapper>
            </div>
          </div>
          <div>
            <div>
              Marks Config (Marks user will get on solving questions by
              difficulty)
            </div>
            <div className="question_config_inputs_container">
              <InputWrapper>
                <label htmlFor={`${field.id}.sqlProblemsMarkConfig.easy`}>
                  Easy Questions Mark
                </label>
                <InputContainerWithOutIcon>
                  <input
                    id={`${field.id}.sqlProblemsMarkConfig.easy`}
                    {...register(
                      `sections.${index}.sqlProblemsMarkConfig.easy`,
                      {
                        valueAsNumber: true,
                      },
                    )}
                    type="number"
                  />
                </InputContainerWithOutIcon>

                {errors?.sections?.[index]?.sqlProblemsMarkConfig?.easy && (
                  <ErrorMessage>
                    {
                      errors?.sections?.[index]?.sqlProblemsMarkConfig?.easy
                        ?.message
                    }
                  </ErrorMessage>
                )}
              </InputWrapper>
              <InputWrapper>
                <label htmlFor={`${field.id}.sqlProblemsMarkConfig.medium`}>
                  Medium Questions Mark
                </label>
                <InputContainerWithOutIcon>
                  <input
                    id={`${field.id}.sqlProblemsMarkConfig.medium`}
                    {...register(
                      `sections.${index}.sqlProblemsMarkConfig.medium`,
                      {
                        valueAsNumber: true,
                      },
                    )}
                    type="number"
                  />
                </InputContainerWithOutIcon>

                {errors?.sections?.[index]?.sqlProblemsMarkConfig?.medium && (
                  <ErrorMessage>
                    {
                      errors?.sections?.[index]?.sqlProblemsMarkConfig?.medium
                        ?.message
                    }
                  </ErrorMessage>
                )}
              </InputWrapper>
              <InputWrapper>
                <label htmlFor={`${field.id}.sqlProblemsMarkConfig.hard`}>
                  Hard Questions Mark
                </label>
                <InputContainerWithOutIcon>
                  <input
                    id={`${field.id}.sqlProblemsMarkConfig.hard`}
                    {...register(
                      `sections.${index}.sqlProblemsMarkConfig.hard`,
                      {
                        valueAsNumber: true,
                      },
                    )}
                    type="number"
                  />
                </InputContainerWithOutIcon>

                {errors?.sections?.[index]?.sqlProblemsMarkConfig?.hard && (
                  <ErrorMessage>
                    {
                      errors?.sections?.[index]?.sqlProblemsMarkConfig?.hard
                        ?.message
                    }
                  </ErrorMessage>
                )}
              </InputWrapper>
            </div>
          </div>

          <div className="section_marks_summary">
            <p>
              Easy Marks: {easySQLQuestions} × {easySQLMark} ={" "}
              {totalSQLEasyMarks}
            </p>
            <p>
              Medium Marks: {mediumSQLQuestions} × {mediumSQLMark} ={" "}
              {totalSQLMediumMarks}
            </p>
            <p>
              Hard Marks: {hardSQLQuestions} × {hardSQLMark} ={" "}
              {totalSQLHardMarks}
            </p>

            <hr />

            <p>
              <strong>Total SQL Questions Mark: {totalSQLMarks}</strong>
            </p>
          </div>
        </div>
      </div>

      {index === 0 ? null : (
        <Button
          type="button"
          $primary
          className="w-fit remove_btn"
          onClick={() => remove(index)}
        >
          Remove Section
        </Button>
      )}
    </AGH_Assessment_form_section_container>
  );
};

const difficultyConfig = {
  easy: 0,
  medium: 0,
  hard: 0,
};

const defaultObejectOfArrayField = {
  name: "",
  sectionDuration: 0, // NEW
  codingProblems: [],
  codingProblemsMarkConfig: difficultyConfig,
  codingProblemsGetOnTest: difficultyConfig,

  mcqProblemsMarkConfig: difficultyConfig,
  mcqProblems: [],
  newMcqProblems: [],
  mcqProblemsGetOnTest: difficultyConfig,

  sqlProblems: [],
  sqlProblemsMarkConfig: difficultyConfig,
  sqlProblemsGetOnTest: difficultyConfig,
};

const CreateAGHAssessment = ({ edit, data, type, subType, successRedirect }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedStudents, setSelectedStudents] = useState(
    data?.scheduledForUsers || [],
  );
  const { token } = useSelector((state) => state.auth);
  const assessmentId = data?._id;
  const { user } = useSelector((state) => state.profile);

  // Extract adminId and collegeName from URL search parameters (for Super Admin)
  const urlSearchParams = new URLSearchParams(window.location.search);
  const adminIdFromUrl = urlSearchParams.get("adminId");
  const adminId = adminIdFromUrl || user?._id;
  // When superadmin creates for a college, filter students by that college
  const collegeNameFromUrl = urlSearchParams.get("collegeName") || "";
  const effectiveCollegeName = adminIdFromUrl ? collegeNameFromUrl : undefined;

  const isDarkTheme = useIsThemeDark();

  const {
    register,
    formState,
    watch,
    control,
    handleSubmit,
    setValue,
    getValues,
  } = useForm({
    defaultValues: data
      ? data
      : {
          name: "",
          duration: 0,
          isSectionWise: "yes", // NEW
          sections: [defaultObejectOfArrayField],
        },
  });
  const { errors } = formState;
  const { append, remove, fields } = useFieldArray({
    name: "sections",
    control,
  });

  // NEW — watch the dropdown value
  const isSectionWise = watch("isSectionWise");
  const sections = watch("sections");

  const totalSectionDuration = sections?.reduce((sum, section) => {
    return sum + (Number(section.sectionDuration) || 0);
  }, 0);

  // Auto-set duration field when isSectionWise is yes
  useEffect(() => {
    if (isSectionWise === "yes") {
      setValue("duration", totalSectionDuration);
    }
  }, [totalSectionDuration, isSectionWise, setValue]);
  const onValid = (data) => {
    if (selectedStudents.length === 0) {
      toast.error("Select atleast one user");
      return;
    }

    // ✅ NEW — validate section durations sum
    if (data.isSectionWise === "yes") {
      const sumOfSections = data.sections.reduce((sum, section) => {
        return sum + (Number(section.sectionDuration) || 0);
      }, 0);

      if (sumOfSections === 0) {
        toast.error("Please set duration for all sections");
        return;
      }

      if (Number(data.duration) !== sumOfSections) {
        toast.error(
          `Total duration (${data.duration} min) must equal sum of all section durations (${sumOfSections} min)`,
        );
        return;
      }
    }

    const sectionsWithFilledManualMcqs = data.sections.map((section) => ({
      ...section,
      newMcqProblems: getFilledManualMcqs(section.newMcqProblems),
    }));

    for (const section of sectionsWithFilledManualMcqs) {
      const invalidManualMcq = section.newMcqProblems.find(
        (mcq) => !isCompleteManualMcq(mcq),
      );

      if (invalidManualMcq) {
        toast.error(
          `Please complete all required MCQ fields in section "${section.name}"`,
        );
        return;
      }
    }

    const payload = {
      ...data,
      adminId,
      scheduledForUsers: selectedStudents.map((s) => s._id),
      sections: sectionsWithFilledManualMcqs.map((section) => ({
        ...section,
        codingProblems: section.codingProblems.map((p) => p._id),
        mcqProblems: section.mcqProblems.map((p) => p._id),
        newMcqProblems: section.newMcqProblems,
        sqlProblems: section.sqlProblems.map((p) => p._id),
      })),
    };

    mutate(buildAssessmentFormData(payload));
  };

  const createAssessment = async (data) => {
    const res = await axiosInstance.post(
      `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments`,
      data,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data;
  };

  const editAssessment = async (data) => {
    const res = await axiosInstance.put(
      `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/${assessmentId}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return res.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: edit ? editAssessment : createAssessment,
    onSuccess: () => {
      toast.success("Assessment created successfully");
      queryClient.invalidateQueries(["agh-assessment-by-admin"]);
      if (successRedirect) {
        navigate(successRedirect, { replace: true });
      } else {
        navigate(-1, { replace: true });
      }
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
      console.error(error);
    },
  });

  return (
    <AGH_Assessment_form>
      <h2>Form</h2>
      <form onSubmit={handleSubmit(onValid)} className="">
        <InputWrapper>
          <label htmlFor="assessment_type">Assessment Type*</label>
          <InputContainerWithOutIcon>
            <select
              id="assessment_type"
              {...register("assessmentType", {
                required: "Please select an option",
              })}
            >
              <option value="Main Assessment">Main Assessment</option>
              <option value="Company Specific Assessment">
                Company Specific Assessment
              </option>
            </select>
          </InputContainerWithOutIcon>
          {errors?.assessmentType && (
            <ErrorMessage>{errors?.assessmentType?.message}</ErrorMessage>
          )}
        </InputWrapper>

        <InputWrapper>
          <label htmlFor="assessment_name">Assessment Name*</label>
          <InputContainerWithOutIcon>
            <input
              id="assessment_name"
              {...register(`name`, { required: "This field is required" })}
              type="text"
            />
          </InputContainerWithOutIcon>
          {errors?.name && <ErrorMessage>{errors?.name?.message}</ErrorMessage>}
        </InputWrapper>

        {/* ── NEW: Section Wise Assessment dropdown ── */}
        <InputWrapper>
          <label htmlFor="isSectionWise">Will timer run Section Wise ?*</label>
          <InputContainerWithOutIcon>
            <select
              id="isSectionWise"
              {...register("isSectionWise", {
                required: "Please select an option",
              })}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </InputContainerWithOutIcon>
          {errors?.isSectionWise && (
            <ErrorMessage>{errors?.isSectionWise?.message}</ErrorMessage>
          )}
        </InputWrapper>

        <InputWrapper>
          <label htmlFor="duration">Duration* (in minutes)</label>
          <InputContainerWithOutIcon>
            <input
              id="duration"
              {...register("duration", {
                required: true,
                valueAsNumber: true,
              })}
              type="number"
            />
          </InputContainerWithOutIcon>
          {errors?.duration && (
            <ErrorMessage>{errors?.duration?.message}</ErrorMessage>
          )}
        </InputWrapper>

        <div className="form_sections">
          <div>
            <h2>Sections</h2>
          </div>

          <div className="sections_container">
            {fields.map((field, index) => (
              <AssessmentSection
                key={field.id}
                field={field}
                index={index}
                register={register}
                token={token}
                remove={remove}
                setValue={setValue}
                formState={formState}
                watch={watch}
                isSectionWise={isSectionWise} // NEW PROP
                type={type}
                subType={subType}
                initialMCQs={(data?.sections[index]?.mcqProblems || []).map(
                  (mp) => ({
                    ...mp,
                    title: mp.question,
                    difficulty: mp.questionLevel,
                  }),
                )}
                initialProblems={data?.sections[index]?.codingProblems || []}
                initialSQLProblems={data?.sections[index]?.sqlProblems || []}
              />
            ))}
          </div>

          <Button
            className="w-fit"
            type={"button"}
            onClick={() =>
              append(defaultObejectOfArrayField, { focusName: "sectionName" })
            }
          >
            Add Section
          </Button>
        </div>

        <div>
          <div>
            Select Students
            {effectiveCollegeName && (
              <span style={{ marginLeft: "8px", fontSize: "13px", color: "#667085", fontWeight: "normal" }}>
                — Showing students from: <strong>{effectiveCollegeName}</strong>
              </span>
            )}
          </div>
          <div style={{ border: "1px solid" }}>
            <UsersSelection
              collegeName={effectiveCollegeName}
              selectedUsers={selectedStudents}
              setSelectedUsers={setSelectedStudents}
            />
          </div>
        </div>

        <div>
          <div>Scheduled Details</div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <InputWrapper>
              <label htmlFor="startDateTime">Start Date and Time</label>
              <InputContainerWithOutIcon>
                <input
                  type="datetime-local"
                  id="startDateTime"
                  {...register("startDateTime", {
                    required: "Enter Start Date and Time",
                    valueAsDate: true,
                    validate: (value) => {
                      const end = getValues("endDateTime");
                      if (!end) return true;
                      return (
                        value < end || "Start time must be before End time"
                      );
                    },
                  })}
                />
              </InputContainerWithOutIcon>
              {errors.startDateTime && (
                <WarningText>
                  <p>{errors.startDateTime.message}</p>
                </WarningText>
              )}
            </InputWrapper>

            <InputWrapper>
              <label htmlFor="endDateTime">End Date and Time</label>
              <InputContainerWithOutIcon>
                <input
                  type="datetime-local"
                  id="endDateTime"
                  {...register("endDateTime", {
                    required: "Enter End Date and Time",
                    valueAsDate: true,
                    validate: (value) => {
                      const start = getValues("startDateTime");
                      if (!start) return true;
                      return (
                        value > start || "End time must be after Start time"
                      );
                    },
                  })}
                />
              </InputContainerWithOutIcon>
              {errors.endDateTime && (
                <WarningText>
                  <p>{errors.endDateTime.message}</p>
                </WarningText>
              )}
            </InputWrapper>
          </div>
        </div>

        <div className="">
          <Button $primary className="w-fit" type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Submit"}
          </Button>
        </div>
      </form>
    </AGH_Assessment_form>
  );
};
export default CreateAGHAssessment;
