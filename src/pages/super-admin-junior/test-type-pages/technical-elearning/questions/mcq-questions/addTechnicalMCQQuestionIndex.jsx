import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../../../services/apiconnector";
import { useSelector } from "react-redux";
import AddTechnicalMCQQuestionFormIndex from "./addTechnicalMCQQuestionFromIndex";
import { TopTitleHeading } from "../../../../../admin/common.style";
import { Section } from "../topicList/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import BulbAnimation from "../../../../../../component/BulbAnimation";

const AddQuestionIndex = () => {
  const { testId } = useParams();
  const [testInfo, setTestInfo] = useState(null);
  const [error, setError] = useState("");
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchTestQuestionDetails = async (testId) => {
      try {
        const getData = await axiosInstance.get(
          import.meta.env.VITE_BASE_URL +
            `/v1/createTest/getcodingtestforeditingelearning`,
          {
            params: { testId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTestInfo(getData.data.getAptitudeTest);
      } catch (err) {
        setError(err?.response?.data?.message);
      }
    };

    if (testId) {
      fetchTestQuestionDetails(testId);
    } else {
      setError("Test ID is required");
    }
  }, [testId, token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!testInfo) {
    return <BulbAnimation />;
  }

  return (
    <>
      <Section>
        <div>
          <span>{testInfo?.type}</span>&nbsp;
          <FontAwesomeIcon icon={faAngleRight} />
          &nbsp;
          <span>{testInfo?.topic}</span>&nbsp;
          <FontAwesomeIcon icon={faAngleRight} />
          &nbsp;
          <span>{testInfo?.subTopic}</span>
        </div>
        <TopTitleHeading>Add MCQ Form</TopTitleHeading>
        <AddTechnicalMCQQuestionFormIndex testId={testId} />
      </Section>
    </>
  );
};

export default AddQuestionIndex;
