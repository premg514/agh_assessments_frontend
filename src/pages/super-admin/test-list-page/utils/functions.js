import {
  urlMap,
  urlMapForFetchingCodingQuestions,
  urlMapForDeleteCodingQuestions,
  urlMapForAddCodingQuestion,
  urlMapForAddQuestion,
  urlMapForDeleteQuestion,
  urlMapForGetTestQuestionDetails,
  urlMapForEditTestQuestionDetails,
  urlMapForUpdateMCQQuestion,
  urlMapForUpdateCodingQuestion
} from "../Components/ViewQuestions/data";
export function convertFetchedDataToSidebarDesiredFormat(data) {
  const prev = {};
  for (let i = 0; i < data?.length; i++) {
    const newObject = {
      title: data[i].subTopic,
      id: data[i]._id,
    };
    let topic = data[i].topic;
    if (!Array.isArray(prev[topic])) {
      prev[topic] = [];
    }
    prev[topic].push(newObject);
  }
  return prev;
}

export function getCorrectUrlForFetchQuestions(type, subType, userAccountType) {
  // Safely access the nested properties
  return urlMap[type]?.[subType]?.[userAccountType] || -1;
}

export function getCorrectUrlForFetchCodingQuestions(
  type,
  subType,
  userAccountType
) {
  // Safely access the nested properties
  return (
    urlMapForFetchingCodingQuestions[type]?.[subType]?.[userAccountType] || -1
  );
}

export function getCorrectUrlForDeleteCodingQuestions(
  type,
  subType,
  userAccountType
) {
  // Safely access the nested properties
  return (
    urlMapForDeleteCodingQuestions[type]?.[subType]?.[userAccountType] || -1
  );
}

export function getCorrectUrlForDeleteQuestion(type, subType, userAccountType) {
  // Safely access the nested properties
  return urlMapForDeleteQuestion[type]?.[subType]?.[userAccountType] || -1;
}

export function getCorrectUrlForAddQuestion(type, subType, userAccountType) {
  // Safely access the nested properties
  return urlMapForAddQuestion[type]?.[subType]?.[userAccountType] || -1;
}

export function getCorrectUrlForAddCodingQuestion(
  type,
  subType,
  userAccountType
) {
  // Safely access the nested properties
  return urlMapForAddCodingQuestion[type]?.[subType]?.[userAccountType] || -1;
}

export function getCorrectUrlForGetTestQuestionDetails(
  type,
  subType,
  userAccountType
) {
  // Safely access the nested properties
  return (
    urlMapForGetTestQuestionDetails[type]?.[subType]?.[userAccountType] || -1
  );
}

export function getCorrectUrlForEditTestQuestionDetails(
  type,
  subType,
  userAccountType
) {
  // Safely access the nested properties
  return (
    urlMapForEditTestQuestionDetails[type]?.[subType]?.[userAccountType] || -1
  );
}

export function getCorrectUrlForUpdateMCQQuestion(
  type,
  subType,
  userAccountType
) {
  // Safely access the nested properties
  return urlMapForUpdateMCQQuestion[type]?.[subType]?.[userAccountType] || -1;
}

export function getCorrectUrlForUpdateCodingQuestion(
  type,
  subType,
  userAccountType
) {
  // Safely access the nested properties
  return urlMapForUpdateCodingQuestion[type]?.[subType]?.[userAccountType] || -1;
}

export function convertDataIntoQuestionPreviewFormat(question) {
  return {
    _id: question._id,
    question: {
      statement: question.question,
      image: question.questionImage,
    },
    options: [
      {
        statement: question.optionA,
        image: question.optionAImage,
      },
      {
        statement: question.optionB,
        image: question.optionBImage,
      },
      {
        statement: question.optionC,
        image: question.optionCImage,
      },
      {
        statement: question.optionD,
        image: question.optionDImage,
      },
    ],
    difficulty: question?.questionLevel,
    explanation: question?.explanation,
    answerKey: question?.correctAnswer,
  };
}
