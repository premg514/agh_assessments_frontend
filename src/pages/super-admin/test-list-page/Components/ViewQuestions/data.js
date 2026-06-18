export const urlMap = {
  Aptitude: {
    eLearning: {
      SuperAdmin: "createElearning/getallQuestionAptitudeElearning",
      SuperAdminJunior: "createElearning/getallQuestionAptitudeElearning",
      Admin: "url-for-aptitude-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/getallquestionsaptitude",
      SuperAdminJunior: "createTest/getallquestionsaptitude",
      Admin: "url-for-aptitude-nonelearning-admin",
    },
    companySpecific: {
      SuperAdmin: "getAllQuestionAptitudeCompanyspecific",
      Admin: "createTest/editAptitudeTestAdmin",
    },
  },
  Technical: {
    eLearning: {
      SuperAdmin: "createTest/getallQuestionCodingElearningTests",
      SuperAdminJunior: "createTest/getallQuestionCodingElearningTests",
      Admin: "url-for-technical-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/getallQuestionCodingTests",
      SuperAdminJunior: "createTest/getallQuestionCodingTests",
      Admin: "url-for-technical-nonelearning-admin",
    },
    companySpecific: {
      SuperAdmin: "getAllQuestionCodingMcqCompanyspecific",
      SuperAdminJunior: "getAllQuestionCodingMcqCompanyspecific",
      Admin: "createTest/editAptitudeTestAdmin",
    },
  },
  Logical: {
    eLearning: {
      SuperAdmin: "createElearning/getallQuestionAptitudeElearning",
      SuperAdminJunior: "createElearning/getallQuestionAptitudeElearning",
      Admin: "url-for-logical-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/getallquestionsaptitude",
      SuperAdminJunior: "createTest/getallquestionsaptitude",
      Admin: "url-for-logical-nonelearning-admin",
    },
  },
  Verbal: {
    eLearning: {
      SuperAdmin: "createElearning/getallQuestionAptitudeElearning",
      SuperAdminJunior: "createElearning/getallQuestionAptitudeElearning",
      Admin: "url-for-verbal-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/getallquestionsaptitude",
      SuperAdminJunior: "createTest/getallquestionsaptitude",
      Admin: "url-for-verbal-nonelearning-admin",
    },
  },
};

export const urlMapForFetchingCodingQuestions = {
  Technical: {
    eLearning: {
      SuperAdmin: "createTest/getallQuestionElearningCoding",
      Admin: "url-for-technical-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/getallQuestionCoding",
      Admin: "url-for-technical-nonelearning-admin",
    },
    companySpecific: {
      SuperAdmin: "getAllQuestionCodingQuestionsCompanyspecific",
      Admin: "createTest/editAptitudeTestAdmin",
    },
  },
};

export const urlMapForDeleteCodingQuestions = {
  Technical: {
    eLearning: {
      SuperAdmin: "createTest/deleteCodingElearningQuestion",
      SuperAdminJunior:
        "super-admin-junior/deleteRejectedTechnicalELearningCodingQuestionSuperAdminJunior",
      Admin: "url-for-technical-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/deleteCodingQuestion",
      SuperAdminJunior:
        "super-admin-junior/deleteRejectedTechnicalCodingQuestionSuperAdminJunior",
      Admin: "createTest/deleteTechnicalCodingQuestionAdmin",
    },
    companySpecific: {
      SuperAdmin: "deleteCodingQuestionCompanyspecific",
      Admin: "createTest/editAptitudeTestAdmin",
    },
  },
  Lab: {
    Lab: {
      Admin: "createTest/deleteLabCodingQuestionAdmin",
    },
  },
};

export const urlMapForAddCodingQuestion = {
  Technical: {
    eLearning: {
      SuperAdmin: "createTest/addSingleCodingElearningQuestion",
      Admin: "url-for-technical-elearning-admin",
    },

    nonELearning: {
      SuperAdmin: "createTest/addSingleCodingQuestion",
      Admin: "createTest/addTechnicalCodingQuestionsAdmin",
    },
    companySpecific: {
      SuperAdmin: "addCodingquestionforcodingtest",
      Admin: "createTest/editAptitudeTestAdmin",
    },
  },
  Lab: {
    Lab: {
      Admin: "createTest/addLabCodingQuestionsAdmin",
    },
  },
};

export const urlMapForDeleteQuestion = {
  Aptitude: {
    eLearning: {
      SuperAdmin: "createElearning/deleteAptitudeElearningQuestionSuperadmin",
      SuperAdminJunior:
        "super-admin-junior/deleteRejectedRequestAptitudeELearningTestQuestionSuperAdminJunior",
      Admin: "url-for-aptitude-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/deleteAptitudeTestQuestionSuperadmin",
      SuperAdminJunior:
        "super-admin-junior/deleteRejectedRequestAptitudeTestQuestionSuperAdminJunior",
      Admin: "createTest/deleteAptitudeTestQuestionAdmin",
    },
    companySpecific: {
      SuperAdmin: "deleteAptitudequestionCompanyspecific",
      Admin: "createTest/editAptitudeTestAdmin",
    },
  },
  Technical: {
    eLearning: {
      SuperAdmin: "createTest/deleteCodingTestElearningQuestionSuperadmin",
      SuperAdminJunior:
        "super-admin-junior/deleteRejectedTechnicalELearningMCQQuestionSuperAdminJunior",
      Admin: "url-for-technical-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/deleteCodingTestQuestionSuperadmin",
      SuperAdminJunior:
        "super-admin-junior/deleteRejectedTechnicalMCQQuestionSuperAdminJunior",
      Admin: "createTest/deleteTechnicalMCQAdmin",
    },
    companySpecific: {
      SuperAdmin: "deleteMcqCodingCompanyspecific",
      Admin: "createTest/editAptitudeTestAdmin",
    },
  },
  Logical: {
    eLearning: {
      SuperAdmin: "createElearning/deleteLogicalElearningQuestionSuperadmin",
      Admin: "url-for-logical-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/deleteLogicalTestQuestionSuperadmin",
      Admin: "url-for-logical-nonelearning-admin",
    },
  },
  Verbal: {
    eLearning: {
      SuperAdmin: "createElearning/deleteVerbalElearningQuestionSuperadmin",
      Admin: "url-for-verbal-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/deleteVerbalTestQuestionSuperadmin",
      Admin: "url-for-verbal-nonelearning-admin",
    },
  },
  Lab: {
    Lab: {
      Admin: "createTest/deleteLabMCQAdmin",
    },
  },
};

export const urlMapForAddQuestion = {
  Aptitude: {
    eLearning: {
      SuperAdmin: "createElearning/addaptitudeElearningquestion",
      Admin: "url-for-aptitude-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/addaptitudequestion",
      SuperAdminJunior: "super-admin-junior/addAptitudeSuperadminJunior",
      Admin: "createTest/addaptitudequestionAdmin",
    },
    companySpecific: {
      SuperAdmin: "addAptitudeQuestionCompanyspecific",
      Admin: "createTest/editAptitudeTestAdmin",
    },
  },
  Technical: {
    eLearning: {
      SuperAdmin: "createTest/addcodingtechnicalquestion",
      Admin: "createTest/addTechnicalMCQsAdmin",
    },

    nonELearning: {
      SuperAdmin: "createTest/addcodingquestion",
      Admin: "createTest/addTechnicalMCQsAdmin",
    },
    companySpecific: {
      SuperAdmin: "addMcqquestionforcodingtest",
      Admin: "createTest/editAptitudeTestAdmin",
    },
  },
  Logical: {
    eLearning: {
      SuperAdmin: "createElearning/addlogicalElearningquestion",
      Admin: "url-for-logical-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/addlogicalquestion",
      Admin: "url-for-logical-nonelearning-admin",
    },
  },
  Verbal: {
    eLearning: {
      SuperAdmin: "createElearning/addverbalElearningquestion",
      Admin: "url-for-verbal-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/addverbalquestion",
      Admin: "url-for-verbal-nonelearning-admin",
    },
  },
  Lab: {
    Lab: {
      Admin: "createTest/addLabMCQsAdmin",
    },
  },
};

export const urlMapForGetTestQuestionDetails = {
  Aptitude: {
    eLearning: {
      SuperAdmin: "createTest/getelearningtestforediting",
      Admin: "url-for-aptitude-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/getaptitudetestforediting",
      Admin: "createTest/addaptitudequestionAdmin",
    },
    companySpecific: {
      SuperAdmin: "getCompanyAptitude",
      Admin: "createTest/editAptitudeTestAdmin",
    },
  },
  Technical: {
    eLearning: {
      SuperAdmin: "createTest/getcodingtestforeditingelearning",
      Admin: "url-for-technical-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/getcodingtestforediting",
      Admin: "url-for-technical-nonelearning-admin",
    },
    companySpecific: {
      SuperAdmin: "getCompanyTechnical",
      Admin: "createTest/editAptitudeTestAdmin",
    },
  },
  Logical: {
    eLearning: {
      SuperAdmin: "createTest/getlogicalelearningtestforediting",
      Admin: "url-for-logical-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/getlogicaltestforediting",
      Admin: "url-for-logical-nonelearning-admin",
    },
  },
  Verbal: {
    eLearning: {
      SuperAdmin: "createTest/getverbalelearningtestforediting",
      Admin: "url-for-verbal-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/getverbaltestforediting",
      Admin: "createTest/getaptitudetestadminforediting",
    },
  },
};

export const urlMapForEditTestQuestionDetails = {
  Aptitude: {
    eLearning: {
      SuperAdmin: "createTest/editAptitudeElearning",
      Admin: "url-for-aptitude-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/editAptitudeTest",
      Admin: "createTest/editAptitudeTestAdmin",
    },
    companySpecific: {
      SuperAdmin: "editCompanySpecificAptitude",
      Admin: "createTest/editAptitudeTestAdmin",
    },
  },
  Technical: {
    eLearning: {
      SuperAdmin: "createTest/editCodingElearningTests",
      Admin: "url-for-technical-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/editCodingTests",
      Admin: "createTest/editTechnicalTestAdmin",
    },
    companySpecific: {
      SuperAdmin: "editCompanySpecificTechnical",
      Admin: "createTest/editAptitudeTestAdmin",
    },
  },
  Logical: {
    eLearning: {
      SuperAdmin: "createTest/editAptitudeElearning",
      Admin: "url-for-logical-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/editAptitudeTest",
      Admin: "url-for-logical-nonelearning-admin",
    },
  },
  Verbal: {
    eLearning: {
      SuperAdmin: "createTest/editAptitudeElearning",
      Admin: "url-for-verbal-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/editAptitudeTest",
      Admin: "url-for-verbal-nonelearning-admin",
    },
  },
  Lab: {
    Lab: {
      Admin: "createTest/editLabTestAdmin",
    },
  },
};

export const urlMapForUpdateMCQQuestion = {
  Aptitude: {
    eLearning: {
      SuperAdmin: "createElearning/updateAptitudeElearningSuperadmin",
      Admin: "url-for-aptitude-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/updateAptitudeTestSuperadmin",
      SuperAdminJunior: "createTest/updateAptitudeTestSuperadmin",
      Admin: "createTest/updateAptitudeTestAdmin",
    },
    companySpecific: {
      SuperAdmin: "updateQuestionCompanySpecificQuestion",
      Admin: "createTest/editAptitudeTestAdmin",
    },
  },
  Technical: {
    eLearning: {
      SuperAdmin: "createTest/updateCodingTestElearningSuperadmin",
      Admin: "url-for-technical-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/updateCodingTestSuperadmin",
      SuperAdminJunior: "createTest/updateAptitudeTestSuperadmin",
      Admin: "createTest/updateAptitudeTestAdmin",
    },
    companySpecific: {
      SuperAdmin: "updateQuestionCompanySpecificQuestion",
      Admin: "createTest/editAptitudeTestAdmin",
    },
  },
  Logical: {
    eLearning: {
      SuperAdmin: "createElearning/updateAptitudeElearningSuperadmin",
      Admin: "url-for-logical-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/updateAptitudeTestSuperadmin",
      Admin: "url-for-logical-nonelearning-admin",
    },
  },
  Verbal: {
    eLearning: {
      SuperAdmin: "createElearning/updateAptitudeElearningSuperadmin",
      Admin: "url-for-verbal-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/updateAptitudeTestSuperadmin",
      Admin: "url-for-verbal-nonelearning-admin",
    },
  },
  Lab: {
    Lab: {
      Admin: "createTest/updateAptitudeTestAdmin",
    },
  },
};

export const urlMapForUpdateCodingQuestion = {
  Technical: {
    eLearning: {
      SuperAdmin: "createTest/updateCodingTestQuestionElearning",
      SuperAdminJunior: "createTest/updateCodingTestQuestionElearning",
      Admin: "url-for-technical-elearning-admin",
    },
    nonELearning: {
      SuperAdmin: "createTest/updateCodingTestQuestion",
      SuperAdminJunior: "createTest/updateCodingTestQuestion",
      Admin: "createTest/updateCodingTestQuestion",
    },
    companySpecific: {
      SuperAdmin: "updateCodingQuestionCompanySpecificQuestion",
      Admin: "createTest/editAptitudeTestAdmin",
    },
  },
  Lab: {
    Lab: {
      Admin: "createTest/updateCodingTestQuestion",
    },
  },
};
