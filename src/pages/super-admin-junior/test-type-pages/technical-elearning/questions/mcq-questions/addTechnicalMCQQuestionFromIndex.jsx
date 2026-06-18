import { useForm, FormProvider } from "react-hook-form";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../../../../../user/login/user-login-style";
import Stepper from "../../../../../aptitude-test/Stepper";
import Verification from "../../../../../../component/otp-verificatiion/verification";
import AddQuestionForm from "../../../../../add-question/add-question-component";
import { sendOTP } from "../../../../../aptitude-test/functions";
import { ButtonContainer } from "../../../../../aptitude-test/style";
import { addQuestionFormDefaultObject } from "../../../../../aptitude-test/data";
import { useSelector } from "react-redux";
import { convertQuestionsImageDataIntoFormData } from "../../../../../aptitude-test/functions";
import axiosInstance from "../../../../../../services/apiconnector";
import { AppContext } from "../../../../../../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const AddTechnicalMCQQuestionFormIndex = ({ testId }) => {
  const methods = useForm({
    defaultValues: {
      questions: [addQuestionFormDefaultObject],
    },
  });
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading, setLoading } = useContext(AppContext);

  const submitQuestion = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Loading...");
    try {
      const formData = new FormData();
      formData.append(
        "questions",
        JSON.stringify(data.questions, (key, value) => {
          // Remove the 'image' property
          if (key === "image") {
            return undefined; // Exclude this property
          }
          return value; // Keep all other properties
        })
      );
      formData.append("otp", data.otp);
      formData.append("testId", testId);
      convertQuestionsImageDataIntoFormData(data.questions, formData);

      const res = await axiosInstance.post(
        import.meta.env.VITE_BASE_URL +
          `/v1/super-admin-junior/addTechnicalQuestionElearningMcqsuperadminJunior`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.dismiss(toastId);
      toast.success(res?.data?.message || "Questions Added Successfully");
      setStep(1); // Reset to the first step after submission
      methods.reset(); // Reset the form
    } catch (err) {
      toast.dismiss(toastId);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const [step, setStep] = useState(1);
  const handleClickBack = (stateFun) => {
    stateFun((prev) => {
      if (prev > 1) {
        return prev - 1;
      }
    });
  };

  const handleClickNext = async (trigger, methods) => {
    const isValid = await trigger(); // Wait for the validation to complete
    if (!isValid) {
      toast.error("Validation failed. Please correct the highlighted errors.");

      return false;
    }
    return true;
  };

  return (
    <>
      <Stepper
        currentStep={step}
        stepperData={[
          {
            value: 1,
            title: "Form",
          },
          {
            value: 2,
            title: "Authentication",
          },
        ]}
      />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitQuestion)}>
          {step === 1 && <AddQuestionForm />}
          {step === 2 && <Verification />}
          <ButtonContainer>
            {step > 1 && (
              <Button
                type="button"
                className="w-fit"
                onClick={() => {
                  handleClickBack(setStep);
                }}
              >
                Back
              </Button>
            )}
            {step < 2 ? (
              <Button
                className="w-fit"
                type={"button"}
                disabled={loading}
                onClick={async () => {
                  const isValid = await handleClickNext(
                    methods.trigger,
                    methods
                  );
                  if (!isValid) return;
                  const isOtpSend = await sendOTP(
                    user?.email,
                    toast,
                    setLoading
                  );
                  if (!isOtpSend) {
                    return;
                  } else {
                    setStep((prev) => {
                      if (prev < 2) {
                        return prev + 1;
                      }
                    });
                  }
                }}
              >
                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Next"}
              </Button>
            ) : (
              <Button
                disabled={loading}
                $primary
                type={"submit"}
                className="w-fit"
              >
                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Submit"}
              </Button>
            )}
          </ButtonContainer>
        </form>
      </FormProvider>
    </>
  );
};

export default AddTechnicalMCQQuestionFormIndex;
