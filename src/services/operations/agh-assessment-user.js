import axiosInstance from "../apiconnector";

export const submitAssessment = async (token, assessmentId, reason) => {
  const res = await axiosInstance.post(
    `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/user/assessments/submit`,
    { assessmentId, reason },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        timeout: 20000,
      },
    },
  );

  return res.data;
};

export const submitSectionAPI = async (token, assessmentId) => {
  const res = await axiosInstance.post(
    `${import.meta.env.VITE_BASE_URL}/v1/agh-assessments/user/assessments/submit-section`,
    { assessmentId },
    // { headers: { Authorization: `Bearer ${token}` } },
    {
      headers: { Authorization: `Bearer ${token}` },
      //  timeout: 10000, // 10 seconds
      timeout: 15000,
      timeoutErrorMessage: "Request took too long. Please try again.",
    },
  );
  return res.data;
};
