import { useEffect, useRef } from "react";
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AdminLoginComponent from "./pages/admin/login/admin-login-component";
import UserLoginComponent from "./pages/user/login/user-login-component";
import SuperAdminLoginComponent from "./pages/super-admin/login-page/login-component";
import CollegeCourseDetailsComponent from "./pages/super-admin/college-course-details/college-course-details-component";
import ListOfCollegeComponent from "./pages/list-of-colleges/list-of-colleges-component";
import CollegeAssessments from "./pages/super-admin/college-assessments/CollegeAssessments";
import SAGHEditPage from "./pages/super-admin/college-assessments/SAGHEditPage";
import Home from "./pages/Home/Home";
import OtpPageLoginComponent from "./pages/otp-page-login/otp-page-login-component";
import AGHAssessments from "./pages/agh-assessments/Index";
import CreateAGHAssessment from "./pages/agh-assessments/create-form/Index";
import CreateGroupAGHAssessment from "./pages/agh-assessments/create-group-assessment-form/Index";
import AssessmentEditForm from "./pages/agh-assessments/edit/Index";
import AssessmentCreateCopy from "./pages/agh-assessments/create-copy/AssessmentCreateCopy";
import ViewAssessmentDetailsForAdmin from "./pages/agh-assessments/view-assessment/ViewAGHAssessment";
import GroupAssessmentView from "./pages/agh-assessments/group-view/Index";
import StudentProgressDashboard from "./pages/agh-assessments/live-tracking/live-tracking-component";
import EditAGHAssessmentComponent from "./pages/edit-test/EditAGHAssessmentComponent";
import AGHAssessmentsIndex from "./pages/agh-assessments-user/Index";
import AGHAssessmentInstructionsPage from "./pages/agh-assessments-user/agh-instructions-page/AGHAssessmentInstructionsPage";
import AGHAssessmentResultPage from "./pages/agh-assessments-user/result-view-page/AGHAssessmentResult";
import AGHAssessmentTestAttemptPage from "./pages/agh-assessment-test-attempt-page";
import BulbAnimation from "./component/BulbAnimation";
import Header from "./component/header/header.jsx";
import axiosInstance from "./services/apiconnector";
import {
  decreaseTimer,
  initializeAssessment,
  loadNextSection,
  resetAssessment,
} from "./slices/aghAssessmentSlice";
import {
  submitAssessment,
  submitSectionAPI,
} from "./services/operations/agh-assessment-user";

const AppShell = () => <Outlet />;

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const sectionSubmitFiredRef = useRef(false);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile.user);
  const remaining = useSelector((state) => state.assessment.timer.remaining);
  const { assessmentId, timerRunType } = useSelector((state) => state.assessment);

  const getOnProgressAssessment = async () => {
    const res = await axiosInstance.get(
      `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/user/assessments/on-progress`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!assessmentId) return undefined;

    const interval = setInterval(() => {
      dispatch(decreaseTimer());
    }, 1000);

    return () => clearInterval(interval);
  }, [assessmentId, dispatch]);

  const { data, isLoading, isSuccess, error, isError, isFetchedAfterMount } = useQuery({
    queryKey: ["onProgressAssessment", user?.id],
    queryFn: getOnProgressAssessment,
    enabled: !!token && user?.accountType === "User",
    retry: (failureCount, queryError) => {
      if (queryError?.response?.status === 500) return failureCount < 3;
      return false;
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: false,
    staleTime: 10 * 1000,
  });

  useEffect(() => {
    if (data?.data && isSuccess) {
      dispatch(initializeAssessment(data.data));
    }
  }, [data, dispatch, isSuccess]);

  const { mutate: submitAssessmentMutation, isPending } = useMutation({
    mutationFn: ({ reason }) => submitAssessment(token, assessmentId, reason),
    retry: (failureCount, mutationError) => {
      if (mutationError?.response?.status >= 400 && mutationError?.response?.status < 500) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1500 * 2 ** attemptIndex, 5000),
    onSuccess: () => {
      dispatch(resetAssessment());
    },
    onError: (mutationError) => {
      console.error("AGH assessment submission failed", mutationError);
      if (mutationError.code === "ECONNABORTED" || mutationError.message?.includes("timeout")) {
        toast.error("Submission timed out. Please check your internet and try again.");
      } else if (!mutationError.response) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Failed to submit. Please try again.");
      }
    },
  });

  const {
    mutate: submitSectionMutation,
    isPending: isSectionSubmissionPending,
  } = useMutation({
    mutationFn: () => submitSectionAPI(token, assessmentId),
    retry: (failureCount, mutationError) => {
      if (mutationError?.response?.status >= 400 && mutationError?.response?.status < 500) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
    onSuccess: (response) => {
      if (!response?.data?.isLastSection) {
        dispatch(
          loadNextSection({
            nextSection: response.data.nextSection,
            remainingTime: response.data.remainingTime,
            completedSections: response.data.completedSections,
            currentSectionIndex: response.data.currentSectionIndex,
            sectionStartedAt: response.data.sectionStartedAt,
          }),
        );
      }

      if (response?.data?.isLastSection) {
        submitAssessmentMutation({ reason: "timer_expired" });
      }
    },
    onError: (mutationError) => {
      console.error("AGH section submission failed", mutationError);
    },
  });

  useEffect(() => {
    if (
      remaining <= 0 &&
      location?.pathname !== "/agh-tests/attempt" &&
      user?.accountType === "User" &&
      !isPending &&
      assessmentId !== null &&
      timerRunType === "Assessment"
    ) {
      submitAssessmentMutation({ reason: "time_expired" });
    }
  }, [
    remaining,
    location?.pathname,
    user?.accountType,
    isPending,
    assessmentId,
    timerRunType,
    submitAssessmentMutation,
  ]);

  useEffect(() => {
    if (
      remaining <= 0 &&
      location?.pathname !== "/agh-tests/attempt" &&
      user?.accountType === "User" &&
      !isSectionSubmissionPending &&
      !isPending &&
      assessmentId !== null &&
      timerRunType === "Section" &&
      !sectionSubmitFiredRef.current
    ) {
      sectionSubmitFiredRef.current = true;
      submitSectionMutation({ reason: "section_time_expired" });
    }
  }, [
    remaining,
    location?.pathname,
    user?.accountType,
    isSectionSubmissionPending,
    assessmentId,
    timerRunType,
    isPending,
    submitSectionMutation,
  ]);

  useEffect(() => {
    sectionSubmitFiredRef.current = false;
  }, [timerRunType]);

  useEffect(() => {
    if (!isFetchedAfterMount) return;

    if (error?.response?.status === 404 && isError && user?.accountType === "User") {
      dispatch(resetAssessment());
      if (location?.pathname === "/agh-tests/attempt") {
        navigate("/agh-tests", { replace: true });
      }
    }
  }, [
    error,
    isError,
    location?.pathname,
    user?.accountType,
    dispatch,
    isFetchedAfterMount,
    navigate,
  ]);

  if (isLoading) return <BulbAnimation />;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adminLogin" element={<AdminLoginComponent />} />
      <Route path="/userLogin" element={<UserLoginComponent />} />
      <Route path="/otp-login-page" element={<OtpPageLoginComponent />} />
      <Route path="/superadminLogin" element={<SuperAdminLoginComponent />} />

      {user !== null && user.accountType === "SuperAdmin" && (
        <>
          <Route
            path="/superadmin-homepage"
            element={
              <>
                <ListOfCollegeComponent />
              </>
            }
          />
          <Route
            path="/college-course-details/:adminId"
            element={
              <>
                <Header />
                <CollegeCourseDetailsComponent />
              </>
            }
          />
          <Route
            path="/college-course-details/:adminId/assessments/:type"
            element={
              <>
                <Header />
                <CollegeAssessments />
              </>
            }
          />
          <Route
            path="/college-course-details/:adminId/assessments/agh/edit/:assessmentId"
            element={
              <>
                <Header />
                <SAGHEditPage />
              </>
            }
          />
        </>
      )}

      <Route
        path="/agh-assessments"
        element={
          <div>
            <Header />
            <Outlet />
          </div>
        }
      >
        <Route index element={<AGHAssessments />} />
        <Route path="create-group-assessment" element={<CreateGroupAGHAssessment />} />
        <Route path="create-assessment" element={<CreateAGHAssessment />} />
        <Route path="edit/:assessmentId" element={<AssessmentEditForm />} />
        <Route path="create-copy/:assessmentId" element={<AssessmentCreateCopy />} />
        <Route path="edit-assessment/:assessmentId" element={<EditAGHAssessmentComponent />} />
        <Route path="assign-to-college/:assessmentId" element={<AssessmentCreateCopy assignMode />} />
        <Route path="view/:assessmentId" element={<ViewAssessmentDetailsForAdmin />} />
        <Route path="group-view/:groupId" element={<GroupAssessmentView />} />
      </Route>

      <Route
        path="/agh-assessments/live-tracking/:assessmentId"
        element={<StudentProgressDashboard />}
      />

      <Route path="/agh-tests" element={<AppShell />}>
        <Route
          index
          element={
            <>
              <Header />
              <AGHAssessmentsIndex />
            </>
          }
        />
        {assessmentId !== null && (
          <Route path="attempt" element={<AGHAssessmentTestAttemptPage enableProctoring />} />
        )}
        <Route
          path="instructions/:assessmentId"
          element={
            <>
              <Header />
              <AGHAssessmentInstructionsPage />
            </>
          }
        />
        <Route
          path="results/:resultId"
          element={
            <>
              <Header />
              <AGHAssessmentResultPage />
            </>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
