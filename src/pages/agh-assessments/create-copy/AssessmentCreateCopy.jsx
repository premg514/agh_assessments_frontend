import React from "react";
import CreateAGHAssessment from "../create-form/Index";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../services/apiconnector";
import { useSelector } from "react-redux";
import BulbAnimation from "../../../component/BulbAnimation";

const fetchAGHAssessment = ({ queryKey }) => {
  const [_, assessmentId, token, mode] = queryKey;

  return axiosInstance.get(
    `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/admin/assessments/${assessmentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        mode: mode,
      },
    },
  );
};

const AssessmentCreateCopy = ({ assignMode = false }) => {
  const { assessmentId } = useParams();
  const [searchParams] = useSearchParams();
  const adminId = searchParams.get("adminId");
  const { token } = useSelector((state) => state.auth);

  const { data, isLoading, error } = useQuery({
    queryKey: ["agh-assessment", assessmentId, token, "create-copy", assignMode],
    queryFn: fetchAGHAssessment,
    enabled: !!assessmentId,
    select: (res) => {
      let data = res.data.data;
      return {
        ...data,
        _id: undefined,
        admin: undefined,
        groupId: undefined,
        createdBy: undefined,
        startDateTime: undefined,
        endDateTime: undefined,
        isSectionWise: data.timerRunType === "Section" ? "yes" : "no",
        timerRunType: undefined,
        usersWhoNotCompleted: [],
        usersWhoCompleted: [],
        usersWhoAttempting: [],
        isResultPublished: false,
        // When assigning to another college, the previously selected students
        // belong to the original college and must not carry over.
        ...(assignMode ? { scheduledForUsers: [] } : {}),
      };
    },
  });

  if (isLoading) {
    return <BulbAnimation $height={"400px"} />;
  }

  if (error) {
    console.log("error hi", error);
    return <p>Something went wrong</p>;
  }

  return (
    <div>
      {assignMode && (
        <h2 style={{ margin: "0 0 16px", color: "#101828" }}>
          Assign Assessment to College
        </h2>
      )}
      {/* edit false becasue need to create copy */}
      <CreateAGHAssessment
        edit={false}
        data={data}
        successRedirect={
          assignMode && adminId
            ? `/college-course-details/${adminId}/assessments/agh?tab=assigned`
            : undefined
        }
      />
    </div>
  );
};

export default AssessmentCreateCopy;
