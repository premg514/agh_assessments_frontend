// testFieldsData.js


const testQuestionDetailsFields = [
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




