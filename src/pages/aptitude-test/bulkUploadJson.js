import {
  addQuestionFormDefaultObject,
  codingQuestionFormDefaultObject,
} from "./data";

const LETTER_TO_INDEX = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
};

const defaultVerificationStatus = () => ({
  cpp: false,
  c: false,
  java: false,
  python: false,
});

export const getBulkUploadVariant = (type, subType, isCoding = false) => {
  if (type === "Technical" && subType === "eLearning") {
    return "technical-elearning";
  }

  if (type === "Technical") {
    return "technical";
  }

  if (isCoding) {
    return "technical";
  }

  if (subType === "eLearning") {
    return "aptitude-elearning";
  }

  return "aptitude";
};

const isObject = (value) =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const pickFirst = (sources, keys, fallback = undefined) => {
  for (const source of sources) {
    if (!source || typeof source !== "object") {
      continue;
    }

    for (const key of keys) {
      if (source[key] !== undefined && source[key] !== null) {
        return source[key];
      }
    }
  }

  return fallback;
};

const normalizeString = (value, fallback = "") => {
  if (value === undefined || value === null) {
    return fallback;
  }

  return String(value).trim();
};

const normalizeNumber = (value, fallback = 0) => {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeDifficulty = (value) => {
  const normalized = normalizeString(value).toLowerCase();

  if (normalized === "easy") return "Easy";
  if (normalized === "medium") return "Medium";
  if (normalized === "hard") return "Hard";

  return "";
};

const normalizeSimpleMcqQuestion = (rawQuestion = {}) => {
  const options = normalizeOptions(rawQuestion);

  // Map correctAnswer index to letter (a, b, c, d)
  const correctIndex = normalizeNumber(rawQuestion.correctAnswer, -1);
  const answerKey =
    correctIndex >= 0 && correctIndex < 4
      ? Object.keys(LETTER_TO_INDEX)[correctIndex]
      : "";

  // Handle explanation - can be string or array
  let explanation = rawQuestion.explanation;
  if (Array.isArray(explanation)) {
    explanation = explanation.join("\n");
  }
  explanation = normalizeString(explanation);

  return {
    ...addQuestionFormDefaultObject,
    question: {
      statement: normalizeString(rawQuestion.question),
      image: null,
    },
    options,
    difficulty: normalizeDifficulty(rawQuestion.questionLevel),
    answerKey,
    explanation,
  };
};

const normalizeAnswerKey = (value, options = []) => {
  const normalized = normalizeString(value).toLowerCase();

  if (LETTER_TO_INDEX[normalized] !== undefined) {
    return normalized;
  }

  const matchedIndex = options.findIndex(
    (option) => normalizeString(option?.statement).toLowerCase() === normalized,
  );

  return matchedIndex >= 0 ? Object.keys(LETTER_TO_INDEX)[matchedIndex] : "";
};

const normalizeOptions = (rawQuestion) => {
  const optionArray = Array.isArray(rawQuestion?.options)
    ? rawQuestion.options
    : [
        rawQuestion?.optionA,
        rawQuestion?.optionB,
        rawQuestion?.optionC,
        rawQuestion?.optionD,
      ];

  return optionArray.slice(0, 4).map((option) => {
    if (isObject(option)) {
      return {
        statement: normalizeString(
          option.statement ?? option.text ?? option.value,
        ),
        image: null,
      };
    }

    return {
      statement: normalizeString(option),
      image: null,
    };
  });
};

const normalizeMcqQuestion = (rawQuestion = {}) => {
  const options = normalizeOptions(rawQuestion);

  return {
    ...addQuestionFormDefaultObject,
    question: {
      statement: normalizeString(
        pickFirst(
          [rawQuestion.question, rawQuestion],
          ["statement", "question", "text", "title"],
          rawQuestion.question,
        ),
      ),
      image: null,
    },
    options,
    difficulty: normalizeDifficulty(rawQuestion.difficulty),
    answerKey: normalizeAnswerKey(
      pickFirst([rawQuestion], ["answerKey", "correctAnswer", "answer"]),
      options,
    ),
    explanation: normalizeString(rawQuestion.explanation),
  };
};

const normalizeTestcases = (testcases) => {
  if (!Array.isArray(testcases) || testcases.length === 0) {
    return [{ input: "", output: "" }];
  }

  return testcases.map((testcase) => ({
    input: normalizeString(testcase?.input),
    output: normalizeString(testcase?.output),
  }));
};

const normalizeCodingQuestion = (rawQuestion = {}) => ({
  ...codingQuestionFormDefaultObject,
  questiontopic: normalizeString(
    pickFirst([rawQuestion], ["questiontopic", "questionTopic", "topic"]),
  ),
  question: normalizeString(
    pickFirst(
      [rawQuestion.question, rawQuestion],
      ["statement", "question", "text"],
      rawQuestion.question,
    ),
  ),
  testcase1: normalizeString(rawQuestion.testcase1),
  output1: normalizeString(rawQuestion.output1),
  explanation1: normalizeString(rawQuestion.explanation1),
  testcaseCompilation1: normalizeString(rawQuestion.testcaseCompilation1),
  outputCompilation1: normalizeString(rawQuestion.outputCompilation1),
  testcase2: normalizeString(rawQuestion.testcase2),
  output2: normalizeString(rawQuestion.output2),
  explanation2: normalizeString(rawQuestion.explanation2),
  task: normalizeString(rawQuestion.task),
  constrains: normalizeString(
    rawQuestion.constrains ?? rawQuestion.constraints,
  ),
  difficulty: normalizeDifficulty(rawQuestion.difficulty),
  rulefortestcase: normalizeString(rawQuestion.rulefortestcase),
  testcases: normalizeTestcases(rawQuestion.testcases),
  topicTags: normalizeTopicTags(rawQuestion.topicTags),
  workingcode: normalizeString(rawQuestion.workingcode),
  partialcode: normalizeString(rawQuestion.partialcode),
  workingcodeC: normalizeString(rawQuestion.workingcodeC),
  partialcodeC: normalizeString(rawQuestion.partialcodeC),
  workingcodeJava: normalizeString(rawQuestion.workingcodeJava),
  partialcodeJava: normalizeString(rawQuestion.partialcodeJava),
  workingcodePython: normalizeString(rawQuestion.workingcodePython),
  partialcodePython: normalizeString(rawQuestion.partialcodePython),
});

const getRootPayload = (raw) => {
  if (!isObject(raw) && !Array.isArray(raw)) {
    throw new Error("JSON must contain an object or array at the root.");
  }

  if (Array.isArray(raw)) {
    return { _isSimpleFormat: true, questions: raw };
  }

  if (raw.data && isObject(raw.data)) {
    return raw.data;
  }

  return raw;
};

const isSimpleFormat = (root) => {
  return root._isSimpleFormat === true;
};

export const normalizeBulkUploadJson = (raw, variant) => {
  const root = getRootPayload(raw);

  if (isSimpleFormat(root)) {
    const questions = Array.isArray(root.questions)
      ? root.questions.map(normalizeSimpleMcqQuestion)
      : [];

    const normalized = {
      questions,
    };

    if (variant === "technical" || variant === "technical-elearning") {
      normalized.questions2 = [];
    }

    return {
      values: normalized,
      verificationStatus: [],
    };
  }

  const details = isObject(root.testDetails) ? root.testDetails : {};
  const sources = [root, details];

  const mcqRaw = pickFirst(sources, ["questions", "mcqQuestions", "mcqs"], []);
  const codingRaw = pickFirst(
    sources,
    ["questions2", "codingquestions", "codingQuestions"],
    [],
  );

  const questions = Array.isArray(mcqRaw)
    ? mcqRaw.map(normalizeMcqQuestion)
    : [];
  const codingQuestions = Array.isArray(codingRaw)
    ? codingRaw.map(normalizeCodingQuestion)
    : [];

  const normalized = {
    questions,
  };

  if (variant === "technical" || variant === "technical-elearning") {
    normalized.questions2 = codingQuestions;
  }

  return {
    values: normalized,
    verificationStatus: codingQuestions.map(() => defaultVerificationStatus()),
  };
};
