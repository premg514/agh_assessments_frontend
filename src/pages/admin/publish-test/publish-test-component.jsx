import React, { useContext, useState } from "react";
import { PublishTestStyle } from "./publish-test-style";
import { toast } from "react-hot-toast";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../../context/AppContext";
import PublishForm from "./PublishForm";
import Stepper from "../../aptitude-test/Stepper";
import Verification from "../../../component/otp-verificatiion/verification";
import { Button } from "../../user/login/user-login-style";
import { TopTitleHeading } from "../common.style";
import { sendOTP } from "../../aptitude-test/functions";
import { ButtonContainer } from "../../aptitude-test/style";
import axiosInstance from "../../../services/apiconnector";
import { useUserId } from "../../../hooks/useUserId";
import { useParams } from "react-router-dom";
const PublistTestComponent = ({ type, testId, adminId: adminIdProp }) => {
  const methods = useForm();
  const { setPopupbox, loading, setLoading } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const adminId = adminIdProp || useParams().adminId || useUserId();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const isSuperAdmin = user?.accountType === "SuperAdmin";
  const prefix = isSuperAdmin ? "/createTest/super-admin" : "/createTest";

  const endpointMap = {
    Aptitude: isSuperAdmin ? `${prefix}/checkScheduledTest` : "/createTest/checkScheduledTest",
    MockInterview: isSuperAdmin ? `${prefix}/checkScheduledTestMockInterview` : "/createTest/checkScheduledTestMockInterview",
    Technical: isSuperAdmin ? `${prefix}/scheduledTechnicalTestAdmin` : "/createTest/scheduledTechnicalTestAdmin",
    LSRW: "/test/lsrw-test/schedule",
  };

  const endPoint = endpointMap[type];

  const submitQuestion = async (data) => {
    let newData;

    // Check which selection mode is active

    //over here we are adjust the options as well
    if (data.batches) {
      // Batch-based selection
      newData = {
        ...data,
        batches: data.batches.map((batch) => batch.value),
        selectionMode: "batch",
        choice: "batches",
      };
    } else {
      // Department-based selection
      newData = {
        ...data,
        departments: data.departments.map((department) => department.value),
        ugorpg: data.ugorpg.value,
        year: data.year.value,
        selectionMode: "department",
        choice: "department",
      };
    }

    const toastId = toast.loading("Loading...");
    setLoading(true);
    const payload = {
      data: newData,
      testId: testId,
      adminId: adminId, // ✅ only for mock interview
    };

    // console.log(payload);
    // return;

    try {
      const res = await axiosInstance.post(
        import.meta.env.VITE_BASE_URL + "/v1" + endPoint,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.dismiss(toastId);
      toast.success(res?.data?.message);
    } catch (err) {
      toast.dismiss(toastId);
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
      setPopupbox(false);
    }
  };

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
      <PublishTestStyle>
        <div className="container">
          <FontAwesomeIcon
            className="xmark_position"
            icon={faXmark}
            size="xl"
            onClick={() => {
              setPopupbox(false);
            }}
          />
          <TopTitleHeading>Test Publish Form</TopTitleHeading>
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
            <form
              className="form__box"
              onSubmit={methods.handleSubmit(submitQuestion)}
            >
              {step === 1 && <PublishForm type={type} adminId={adminId} />}
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
                    onClick={async () => {
                      const isValid = await handleClickNext(
                        methods.trigger,
                        methods,
                      );
                      if (!isValid) return;

                      const isOtpSend = await sendOTP(
                        user?.email,
                        toast,
                        setLoading,
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
                    disabled={loading}
                  >
                    {loading ? (
                      <FontAwesomeIcon icon={faSpinner} spin />
                    ) : (
                      "Next"
                    )}
                  </Button>
                ) : (
                  <Button
                    $primary
                    type={"submit"}
                    className="w-fit"
                    disabled={loading}
                  >
                    {loading ? (
                      <FontAwesomeIcon icon={faSpinner} spin />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                )}
              </ButtonContainer>
            </form>
          </FormProvider>
        </div>
      </PublishTestStyle>
    </>
  );
};
export default PublistTestComponent;
