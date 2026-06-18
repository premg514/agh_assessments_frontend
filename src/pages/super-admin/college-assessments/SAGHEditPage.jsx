import React from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { FiChevronLeft } from "react-icons/fi";
import { format } from "date-fns";
import axiosInstance from "../../../services/apiconnector";
import BulbAnimation from "../../../component/BulbAnimation";
import EditAGHAssessmentComponent from "../../edit-test/EditAGHAssessmentComponent";
import CreateAGHAssessment from "../../agh-assessments/create-form/Index";
import {
  Layout,
  HeaderRow,
  BackButton,
  Meta,
} from "./CollegeAssessments.styles";

/**
 * SAGHEditPage — full-page edit for SuperAdmin AGH assessments.
 *
 * Modes (from ?mode= query param):
 *   assign-edit  → SA assigns a global/source assessment to a college with custom overrides
 *                  Renders EditAGHAssessmentComponent (which handles the assign-edit API call)
 *   edit-assigned → SA edits an already-assigned local assessment
 *                   Renders CreateAGHAssessment in edit mode (same as college admin edit page)
 */
const SAGHEditPage = () => {
  const { adminId, assessmentId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const mode = searchParams.get("mode") || "edit-assigned";
  const collegeName = decodeURIComponent(searchParams.get("collegeName") || "");

  const backUrl = `/college-course-details/${adminId}/assessments/agh?tab=assigned`;

  const { data: assessmentData, isLoading, error } = useQuery({
    queryKey: ["sa-agh-edit-assessment", assessmentId, token, mode],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/${assessmentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { mode: mode === "assign-edit" ? "view" : "edit" },
        },
      );
      const raw = res.data.data;
      if (mode === "edit-assigned") {
        return {
          ...raw,
          isSectionWise: raw.timerRunType === "Section" ? "yes" : "no",
          timerRunType: undefined,
          startDateTime:
            raw.startDateTime
              ? format(new Date(raw.startDateTime), "yyyy-MM-dd'T'HH:mm")
              : "",
          endDateTime:
            raw.endDateTime
              ? format(new Date(raw.endDateTime), "yyyy-MM-dd'T'HH:mm")
              : "",
        };
      }
      return raw;
    },
    enabled: !!assessmentId && !!token,
  });

  const handleSuccess = () => {
    navigate(backUrl, { replace: true });
  };

  if (isLoading) return <BulbAnimation />;
  if (error)
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#d92d20" }}>
        Failed to load assessment data. Please go back and try again.
      </div>
    );

  return (
    <Layout>
      <HeaderRow>
        <div>
          <BackButton onClick={() => navigate(backUrl)}>
            <FiChevronLeft /> Back to Assessments
          </BackButton>
          <div style={{ marginTop: "16px" }}>
            <h1 style={{ margin: 0, fontSize: "24px", color: "#101828" }}>
              {mode === "assign-edit"
                ? "Assign & Edit AGH Assessment"
                : "Edit AGH Assessment"}
            </h1>
            {collegeName && <Meta>{collegeName}</Meta>}
          </div>
        </div>
      </HeaderRow>

      <div style={{ marginTop: "28px" }}>
        

        {mode === "assign-edit" ? (
          /* Assign-edit: use the existing EditAGHAssessmentComponent with page-style layout */
          <EditAGHAssessmentComponent
            data={assessmentData}
            testId={assessmentId}
            type="agh"
            targetAdminId={adminId}
            collegeName={collegeName}
            handleClickClose={handleSuccess}
          />
        ) : (
          /* Direct edit: reuse CreateAGHAssessment in edit mode */
          <CreateAGHAssessment
            edit={true}
            data={assessmentData}
            successRedirect={backUrl}
          />
        )}
      </div>
    </Layout>
  );
};

export default SAGHEditPage;
