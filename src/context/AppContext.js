import React, { createContext, useRef, useState } from "react";
export const AppContext = createContext();
export default function AppContextProvider({ children }) {
  const [loadingApi, setLoadingApi] = useState(false);
  const [showCompilerComponent, setShowCompilerComponent] = useState(false);
  const [activeButton, setActiveButton] = useState(0);
  const [activeButtonElearning, setActiveButtonElearning] = useState(0);
  const [popupbox, setPopupbox] = useState(false);
  const [componentName, setComponentName] = useState(null);
  const [updateFunctionStatus, setUpdateFunctionStatus] = useState(false);
  const [finalAnswers, setFinalAnswers] = useState([]);
  const [finalCodingAnswers, setFinalCodingAnswers] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [compilerIndex, setCompilerIndex] = useState(0);
  const [collegeCourseAccess, setCollegeCourseAccess] = useState([]);
  const [collegeEditAccess, setCollegeEditAccess] = useState([]);
  const [collegename, setCollegename] = useState([]);
  const [testTypeAptitudeSuperadmin, setTestTypeAptitudeSuperadmin] =
    useState("");
  const [testTopicAptitudeSuperadmin, setTestTopicAptitudeSuperadmin] =
    useState("");
  const [testSubTopicAptitudeSuperadmin, setTestSubTopicAptitudeSuperadmin] =
    useState("");
  const [testQuestionAptitudeSuperadmin, setTestQuestionAptitudeSuperadmin] =
    useState([]);
  const [testImageAptitudeSuperadmin, setTestImageAptitudeSuperadmin] =
    useState([]);
  const [
    testNegativeMarkingAptitudeSuperadmin,
    setTestNegativeMarkingAptitudeSuperadmin,
  ] = useState(0);
  const [
    testMarkforEveryQuestionSuperadmin,
    setTestMarkforEveryQuestionSuperadmin,
  ] = useState(1);
  const [
    testNoOfQuestionsAptitudeSuperadmin,
    setTestNoOfQuestionsAptitudeSuperadmin,
  ] = useState(0);
  const [
    testNoOfEasyQuestionsAptitudeSuperadmin,
    setTestNoOfEasyQuestionsAptitudeSuperadmin,
  ] = useState(0);
  const [
    testNoOfMediumQuestionsAptitudeSuperadmin,
    setTestNoOfMediumQuestionsAptitudeSuperadmin,
  ] = useState(0);
  const [
    testNoOfHardQuestionsAptitudeSuperadmin,
    setTestNoOfHardQuestionsAptitudeSuperadmin,
  ] = useState(0);
  const [testDurationAptitudeSuperadmin, setTestDurationAptitudeSuperadmin] =
    useState(10);
  const [cppCode, setCppcode] = useState([]);
  const [cCode, setcCode] = useState([]);
  const [pythonCode, setPythonCode] = useState([]);
  const [javaCode, setJavaCode] = useState([]);
  const [cppElearningCode, setCppElearningcode] = useState([]);
  const [cElearningCode, setcElearningCode] = useState([]);
  const [pythonElearningCode, setPythonElearningCode] = useState([]);
  const [javaElearningCode, setJavaElearningCode] = useState([]);
  const [Id, setId] = useState([]);
  const [enableEffect, setEnableEffect] = useState(false);
  const [acceptOrDecline, setAcceptOrDecline] = useState(0);
  const [aptitudeTestid, setAptitudetestId] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [testquestionId, setTestquestionId] = useState([]);
  const [getTestId, setTestId] = useState(null);
  const [remainingTestCompanyId, setRemainingTestCompanyId] = useState(null);
  const [hour, setHour] = useState(null);
  const [minute, setMinute] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [milliseconds, setMilliseconds] = useState(0);
  const [evaluatetestlist, setEvaluatetestlist] = useState(null);
  const [testcodingquestionId, setTestcodingquestionId] = useState([]);
  const [testCases, setTestCases] = useState([]);
  const [showtestPageAptitude, setShowtestpageAptitude] = useState(0);
  const [testStartedAptitude, setTestStartedAptitude] = useState(false);
  const [testStartedAptitudeElearning, setTestStartedAptitudeElearning] =
    useState(false);
  const [showtestPageAptitudeElearning, setShowtestpageAptitudeElearning] =
    useState(0);
  const [testStartedAptitudeAdmin, setTestStartedAptitudeAdmin] =
    useState(false);
  const [showtestPageAptitudeAdmin, setShowtestPageAptitudeAdmin] = useState(0);
  const [testStartedTechnical, setTestStartedTechnical] = useState(false);
  const [showtestPageTechnical, setShowtestPageTechnical] = useState(0);
  const [testStartedTechnicalElearning, setTestStartedTechnicalElearning] =
    useState(false);
  const [showtestPageTechnicalElearning, setShowtestPageTechnicalElearning] =
    useState(0);
  const [selectedOptionBackend, setSelectedOptionBackend] = useState("");
  const [testSubject, setTestSubject] = useState(null);
  const [lastFiveMinutes, setLastFiveMinutes] = useState(false);
  const [sectionOneType, setSectionOneType] = useState("QUIZ");
  const [showSideBarListForQuestions, setShowSideBarListForQuestions] =
    useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [verificationStatusElearning, setVerificationStatusElearning] =
    useState(null);
  const [
    singleQuestionVerificationStatus,
    setSingleQuestionVerificationStatus,
  ] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activate, setActivate] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const tabSwitchCount = useRef(0);
  const [testType, settestType] = useState("aptitude");
  const [showSampleData, setShowsampleData] = useState(false);
  const [finalSpokenAnswer, setFinalSpokenAnswer] = useState("");
  const [interviewData, setInterviewData] = useState({
    technicalAnswers: null,
    hrAnswers: null,
    sessionId: null, // ✅ Make sure this exists
  });
  const [malpracticeInfo, setMalpracticeInfo] = useState({
    detected: false,
    reason: null,
    timestamp: null,
  });
  const [partialTestCaseSwitch, setPartialTestCaseSwitch] = useState(false);
  const [adminTechnicalTestDetails, setAdminTechnicalTestDetails] =
    useState(null);
  const value = {
    popupbox,
    setPopupbox,
    updateFunctionStatus,
    setUpdateFunctionStatus,
    finalAnswers,
    setFinalAnswers,
    questionIndex,
    setQuestionIndex,
    collegeCourseAccess,
    setCollegeCourseAccess,
    collegeEditAccess,
    setCollegeEditAccess,
    collegename,
    setCollegename,
    Id,
    setId,
    testTypeAptitudeSuperadmin,
    setTestTypeAptitudeSuperadmin,
    testTopicAptitudeSuperadmin,
    setTestTopicAptitudeSuperadmin,
    testSubTopicAptitudeSuperadmin,
    setTestSubTopicAptitudeSuperadmin,
    testNegativeMarkingAptitudeSuperadmin,
    setTestNegativeMarkingAptitudeSuperadmin,
    testNoOfQuestionsAptitudeSuperadmin,
    testNoOfMediumQuestionsAptitudeSuperadmin,
    testNoOfHardQuestionsAptitudeSuperadmin,
    setTestNoOfMediumQuestionsAptitudeSuperadmin,
    setTestNoOfHardQuestionsAptitudeSuperadmin,
    setTestNoOfQuestionsAptitudeSuperadmin,
    testNoOfEasyQuestionsAptitudeSuperadmin,
    setTestNoOfEasyQuestionsAptitudeSuperadmin,
    testDurationAptitudeSuperadmin,
    setTestDurationAptitudeSuperadmin,
    testQuestionAptitudeSuperadmin,
    setTestQuestionAptitudeSuperadmin,
    testImageAptitudeSuperadmin,
    setTestImageAptitudeSuperadmin,
    testMarkforEveryQuestionSuperadmin,
    setTestMarkforEveryQuestionSuperadmin,
    activeButton,
    setActiveButton,
    activeButtonElearning,
    setActiveButtonElearning,
    finalCodingAnswers,
    setFinalCodingAnswers,
    compilerIndex,
    setCompilerIndex,
    showCompilerComponent,
    setShowCompilerComponent,
    loadingApi,
    setLoadingApi,
    cCode,
    setcCode,
    cppCode,
    setCppcode,
    javaCode,
    setJavaCode,
    pythonCode,
    setPythonCode,
    cppElearningCode,
    setCppElearningcode,
    cElearningCode,
    setcElearningCode,
    pythonElearningCode,
    setPythonElearningCode,
    javaElearningCode,
    setJavaElearningCode,
    enableEffect,
    setEnableEffect,
    acceptOrDecline,
    setAcceptOrDecline,
    aptitudeTestid,
    setAptitudetestId,
    remainingTime,
    setRemainingTime,
    testquestionId,
    setTestquestionId,
    getTestId,
    setTestId,
    hour,
    setHour,
    minute,
    setMinute,
    seconds,
    setSeconds,
    milliseconds,
    setMilliseconds,
    evaluatetestlist,
    setEvaluatetestlist,
    testcodingquestionId,
    setTestcodingquestionId,
    testCases,
    setTestCases,
    showtestPageAptitude,
    setShowtestpageAptitude,
    testStartedAptitude,
    setTestStartedAptitude,
    testStartedAptitudeElearning,
    setTestStartedAptitudeElearning,
    showtestPageAptitudeElearning,
    setShowtestpageAptitudeElearning,
    testStartedAptitudeAdmin,
    setTestStartedAptitudeAdmin,
    showtestPageAptitudeAdmin,
    setShowtestPageAptitudeAdmin,
    testStartedTechnical,
    setTestStartedTechnical,
    showtestPageTechnical,
    setShowtestPageTechnical,
    testStartedTechnicalElearning,
    setTestStartedTechnicalElearning,
    showtestPageTechnicalElearning,
    setShowtestPageTechnicalElearning,
    selectedOptionBackend,
    setSelectedOptionBackend,
    componentName,
    setComponentName,
    testSubject,
    setTestSubject,
    lastFiveMinutes,
    setLastFiveMinutes,
    sectionOneType,
    setSectionOneType,
    showSideBarListForQuestions,
    setShowSideBarListForQuestions,
    selectedTestId,
    setSelectedTestId,
    verificationStatus,
    setVerificationStatus,
    verificationStatusElearning,
    setVerificationStatusElearning,
    remainingTestCompanyId,
    setRemainingTestCompanyId,
    singleQuestionVerificationStatus,
    setSingleQuestionVerificationStatus,
    tabSwitchCount,
    loading,
    setLoading,
    activate,
    setActivate,
    selectedTest,
    setSelectedTest,
    testType,
    settestType,
    showSampleData,
    setShowsampleData,
    finalSpokenAnswer,
    setFinalSpokenAnswer,
    interviewData,
    setInterviewData,
    malpracticeInfo,
    setMalpracticeInfo,
    partialTestCaseSwitch,
    setPartialTestCaseSwitch,
    adminTechnicalTestDetails,
    setAdminTechnicalTestDetails,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
