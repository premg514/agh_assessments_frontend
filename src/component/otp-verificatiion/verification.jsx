import React, { useState, useEffect } from "react";
import OTPInput from "react-otp-input";
import { useFormContext, Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { OtpPageStyle } from "./style";
import { maskEmail, sendOTP } from "../../utils/functions";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
const Verification = () => {
  const [otpLoading, setOtpLoading] = useState(false);
  const { user } = useSelector((state) => state?.profile);
  const { control, setValue, getValues } = useFormContext();
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const email = user?.email || getValues("email");
  const maskedEmail = email && maskEmail(email);
  useEffect(() => {
    let interval;
    if (timer > 0) {
      setResendDisabled(true);
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);
  const handleResendClick = async () => {
    if (resendDisabled) return;
    const isOTPSend = await sendOTP(email, toast, setOtpLoading);
    if (isOTPSend) {
      setTimer(30);
    }
  };
  return (
    <OtpPageStyle>
      <div className="container">
        <h2>Authentication</h2>
        <div className="form__element">
          <p className="description">
            Hello! One-time password has been sent to your {maskedEmail} email
            address. Enter the code here to complete the verification process.
          </p>
          <Controller
            name="otp"
            control={control}
            rules={{
              required: "OTP is required",
              minLength: {
                value: 6,
                message: "OTP must be 6 digits",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <OTPInput
                  value={field.value}
                  onChange={(otp) => setValue("otp", otp)}
                  numInputs={6}
                  inputType={"number"}
                  renderInput={(props) => <input {...props} />}
                  isInputNum
                  shouldAutoFocus
                  containerStyle={"otp-container"}
                  inputStyle={"otp-input"}
                />
                {fieldState.error && (
                  <p style={{ color: "red", fontSize: "0.9rem" }}>
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <button
          type={"button"}
          onClick={handleResendClick}
          disabled={resendDisabled || otpLoading}
          className={`resend-otp ${
            resendDisabled || otpLoading ? "disabled" : ""
          }`}
        >
          <FontAwesomeIcon icon={faArrowRotateLeft} color="#0b5fff" />{" "}
          <p>{resendDisabled ? `Resend Otp (${timer}s)` : "Resend Otp"}</p>
        </button>
      </div>
    </OtpPageStyle>
  );
};

export default Verification;
