// testFieldsData.js
export const stepperData = [
  {
    value: 1,
    title: "Form",
  },
  {
    value: 2,
    title: "Preview",
  },
  {
    value: 3,
    title: "Authentication",
  },
];

export const testQuestionDetailsFields = [
  {
    id: "negativemark",
    name: "negativemark",
    label: "Negative Marking",
    placeholder: "Enter the Mark",
    min: "0",
    defaultValue: "0",
    errorMessage: "Please enter the negative mark of test",
  },
  {
    id: "totalquestions",
    name: "totalquestions",
    label: "Total Questions To be taken",
    placeholder: "Enter the Total number of questions",
    min: "0",
    defaultValue: "0",
    errorMessage: "Please Enter the total Number of questions you want",
  },
  {
    id: "totaleasyquestions",
    name: "totaleasyquestions",
    label: "Total Easy Questions To be taken",
    placeholder: "Enter the Total number of Easy questions",
    min: "0",
    defaultValue: "0",
    errorMessage: "Please Enter the total Number of easy questions you want",
  },
  {
    id: "totalmediumquestions",
    name: "totalmediumquestions",
    label: "Total Medium Questions To be taken",
    placeholder: "Enter the Total number of Medium questions",
    min: "0",
    defaultValue: "0",
    errorMessage: "Please Enter the total Number of medium questions you want",
  },
  {
    id: "totalhardquestions",
    name: "totalhardquestions",
    label: "Total Hard Questions To be taken",
    placeholder: "Enter the Total number of Hard questions",
    min: "0",
    defaultValue: "0",
    errorMessage: "Please Enter the total Number of Hard questions you want",
  },
  {
    id: "duration",
    name: "duration",
    label: "Duration",
    placeholder: "Enter the Duration (In minutes)",
    min: "1",
    defaultValue: "10",
    errorMessage: "Please enter the Duration of the test",
  },
  {
    id: "markforquestion",
    name: "markforquestion",
    label: "Mark for every Question",
    placeholder: "Enter the Mark for every question",
    min: "1",
    defaultValue: "1",
    errorMessage: "Please Enter the mark for Every question",
  },
];

export const addQuestionFormDefaultObject = {
  question: { statement: "", image: null },
  difficulty: "",
  options: [
    { statement: "", image: null },
    { statement: "", image: null },
    { statement: "", image: null },
    { statement: "", image: null },
  ],
  answerKey: "",
  explanation: "",
};
//we should be looking for other codes as well dude
export const codingQuestionFormDefaultObject = {
  testcases: [{ input: "", output: "" }],
  questiontopic: "",
  question: "",
  testcase1: "",
  output1: "",
  explanation1: "",
  testcaseCompilation1: "",
  outputCompilation1: "",
  testcase2: "",
  output2: "",
  explanation2: "",
  task: "",
  constrains: "",
  difficulty: "",
  rulefortestcase:"",
};

export const testTechnicalQuestionsDetailsData = [
  ...testQuestionDetailsFields,
  {
    label: "Total Coding Questions To be taken",
    id: "totalcodingquestions",
    name: "totalcodingquestions",
    placeholder: "Enter the Total number of coding questions",
    min: "0",
    defaultValue: "0",
    errorMessage: "Please Enter the total Number of coding questions you want",
  },
  {
    label: "Total Coding Easy Questions To be taken",
    id: "totalcodingeasyquestions",
    name: "totalcodingeasyquestions",
    placeholder: "Enter the Total number of coding easy questions",
    min: "0",
    defaultValue: "0",
    errorMessage:
      "Please Enter the total Number of coding easy questions you want",
  },
  {
    label: "Total Coding Medium Questions To be taken",
    id: "totalcodingmediumquestions",
    name: "totalcodingmediumquestions",
    placeholder: "Enter the Total number of coding medium questions",
    min: "0",
    defaultValue: "0",
    errorMessage:
      "Please Enter the total Number of coding medium questions you want",
  },
  {
    label: "Total Coding Hard Questions To be taken",
    id: "totalcodinghardquestions",
    name: "totalcodinghardquestions",
    placeholder: "Enter the Total number of coding hard questions",
    min: "0",
    defaultValue: "0",
    errorMessage:
      "Please Enter the total Number of coding hard questions you want",
  },
  {
    label: "Mark for every Coding Question",
    id: "markforcodingquestion",
    name: "markforcodingquestion",
    placeholder: "Enter the Mark for every coding question",
    min: "1",
    defaultValue: "1",
    errorMessage: "Please Enter the mark for Every coding question",
  },
];

export const codingFieldsData = [
  {
    label: "Enter the workingCode of cpp",
    id: "workingcode",
    name: "workingcode",
    placeholder: "Enter the workingcode of cpp",
    errorMessage: "Enter the Working code of cpp",
  },
  {
    label: "Enter the partialcode of cpp",
    id: "partialcode",
    name: "partialcode",
    placeholder: "Enter the partialcode of cpp",
    errorMessage: "Enter the partialcode code of cpp",
  },
  {
    label: "Enter the workingCode of C",
    id: "workingcodeC",
    name: "workingcodeC",
    placeholder: "Enter the workingcode of C",
    errorMessage: "Enter the Working code of C",
  },
  {
    label: "Enter the partialcode of C",
    id: "partialcodeC",
    name: "partialcodeC",
    placeholder: "Enter the partialcode of C",
    errorMessage: "Enter the partialcode code of C",
  },
  {
    label: "Enter the workingCode of Java",
    id: "workingcodeJava",
    name: "workingcodeJava",
    placeholder: "Enter the workingcode of Java",
    errorMessage: "Enter the Working code of Java",
  },
  {
    label: "Enter the partialcode of Java",
    id: "partialcodeJava",
    name: "partialcodeJava",
    placeholder: "Enter the partialcode of Java",
    errorMessage: "Enter the partialcode code of Java",
  },
  {
    label: "Enter the workingCode of Python",
    id: "workingcodePython",
    name: "workingcodePython",
    placeholder: "Enter the workingcode of Python",
    errorMessage: "Enter the Working code of Python",
  },
  {
    label: "Enter the partialcode of Python",
    id: "partialcodePython",
    name: "partialcodePython",
    placeholder: "Enter the partialcode of Python",
    errorMessage: "Enter the partialcode code of Python",
  },
];
