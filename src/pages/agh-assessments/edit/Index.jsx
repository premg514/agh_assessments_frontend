import React from "react";
import CreateAGHAssessment from "../create-form/Index";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../services/apiconnector";
import { useSelector } from "react-redux";
import BulbAnimation from "../../../component/BulbAnimation";
import { format } from "date-fns";

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

const AssessmentEditForm = () => {
  const { assessmentId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const { data, isLoading, error } = useQuery({
    queryKey: ["agh-assessment", assessmentId, token, "edit"],
    queryFn: fetchAGHAssessment,
    enabled: !!assessmentId,
    select: (res) => {
      let data = res.data.data;
      return {
        ...data,
        isSectionWise: data.timerRunType === "Section" ? "yes" : "no",
        timerRunType: undefined,
        startDateTime: format(
          new Date(data.startDateTime),
          "yyyy-MM-dd'T'HH:mm",
        ),
        endDateTime: format(new Date(data.endDateTime), "yyyy-MM-dd'T'HH:mm"),
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
      <CreateAGHAssessment edit={true} data={data} />
    </div>
  );
};

export default AssessmentEditForm;
