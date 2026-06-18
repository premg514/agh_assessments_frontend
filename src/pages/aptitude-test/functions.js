import axios from "axios";

export const sendOTP = async (email, toast, setLoading) => {
  setLoading(true);
  const toastId = toast.loading("loading...");
  try {
    const otpResponse = await axios.post(
      import.meta.env.VITE_BASE_URL + "/v1/auth/sendotp",
      { email: email }
    );
    if (otpResponse.data.success === false) {
      toast.error(otpResponse.data.message);
    }
    toast.dismiss(toastId);
    toast.success("OTP Sent Successfully");
    return true;
  } catch (err) {
    toast.dismiss(toastId);
    console.log("otp error", err);
    toast.error("Something went wrong while sending the OTP");
    return false;
  } finally {
    setLoading(false);
  }
};

export const convertQuestionsImageDataIntoFormData = (data, formData) => {
  data.forEach((item, index) => {
    // Append question image file (if applicable)
    if (item.question?.image?.path) {
      formData.append(
        `question_${index}_image`,
        item.question.image // Replace with actual file if available
      );
    }
    item.options.forEach((option, optionIndex) => {
      // Append option image file (if applicable)
      if (option?.image?.path) {
        formData.append(
          `question_${index}_option_${optionIndex}_image`,
          option.image // Replace with actual file if available
        );
      }
    });
  });

  return formData;
};
