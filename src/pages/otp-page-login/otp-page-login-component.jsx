import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import OtpInput from "react-otp-input";
import {
  faSpinner,
  faArrowRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { OtpPageStyle } from "../otp-page/otp-page-style";
import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
const OtpPageLoginComponent = () => {
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { state } = useLocation();
  const navigator = useNavigate();
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const thisisFun = async () => {
    setLoading(true);
    if (formData) {
      // TODO: Don't get cookie in response because axios is not called with withCredentials option field.
      if (state.type === "SuperadminLogin") {
        const toastId = toast.loading("Loading...");
        try {
          const response = await axios.post(
            import.meta.env.VITE_BASE_URL + "/v1/auth/otpvalidation",
            {
              email: formData.email,
              otp: formData.otp,
              userType: "SuperAdmin",
            }
          );
          toast.success(response?.data?.message);
          dispatch(setToken(response.data.token));
          dispatch(setUser(response.data.user));
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigator("/agh-assessments");
        } catch (err) {
          toast.error(err.response.data.message || "Something went wrong");
        } finally {
          toast.dismiss(toastId);
        }
      } else if (state.type === "AdminLogin") {
        const toastId = toast.loading("Loading...");
        try {
          const response = await axios.post(
            import.meta.env.VITE_BASE_URL + "/v1/auth/otpvalidation",
            {
              email: formData.email,
              otp: formData.otp,
              userType: "Admin",
            }
          );
          toast.success(response?.data?.message);
          dispatch(setToken(response.data.token));
          dispatch(setUser(response.data.user));
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigator("/agh-assessments");
        } catch (err) {
          toast.error(err.response.data.message || "Something went wrong");
        } finally {
          toast.dismiss(toastId);
        }
      } else if (state.type === "SuperAdminJuniorLogin") {
        const toastId = toast.loading("Loading...");
        try {
          const response = await axios.post(
            import.meta.env.VITE_BASE_URL + "/v1/auth/otpvalidation",
            {
              email: formData.email,
              otp: formData.otp,
              userType: "SuperAdminJunior",
            }
          );
          toast.success(response?.data?.message);
          dispatch(setToken(response.data.token));
          dispatch(setUser(response.data.user));
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigator("/agh-assessments");
        } catch (err) {
          toast.error(err.response.data.message || "Something went wrong");
        } finally {
          toast.dismiss(toastId);
        }
      }
    }
    setLoading(false);
  };
  const generatingOtp = async () => {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + "/v1/auth/sendotp",
        { email: state.data.email }
      );
      toast.success(res?.data?.message);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };
  useEffect(() => {
    thisisFun();
  }, [formData]);

  const submitData = (otp) => {
    setFormData(() => ({
      ...state.data,
      otp: otp,
    }));
  };
  const handleResendOtp = async () => {
    setLoading(true);
    setResendDisabled(true);
    setCountdown(30);
    try {
      const intervalId = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(intervalId);
            setResendDisabled(false);
          }
          return prevCountdown - 1;
        });
      }, 1000);
      setLoading(false);
    } catch (error) {
      console.error("Error resending OTP:", error);
      setResendDisabled(false);
      setLoading(false);
    }
  };
  const handleResendAndValidate = async () => {
    handleResendOtp();
    await generatingOtp();
  };
  return (
    <OtpPageStyle>
      <div className="container">
        <h2>Email OTP Verification</h2>
        <div className="form__element">
          <p className="description">
            Hello! Your one-time password has been to your email address. Enter
            the code here to complete the verification process.
          </p>
          <OtpInput
            value={otp}
            containerStyle={"otp-container"}
            inputStyle={"otp-input"}
            onChange={setOtp}
            numInputs={6}
            inputType={"number"}
            renderInput={(props) => <input {...props} />}
          />
          <div className="button-container">
            <button
              disabled={loading}
              onClick={() => {
                submitData(otp);
              }}
              className="primary-btn"
            >
              {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Submit"}
            </button>

            <button
              onClick={() => {
                navigator(-1);
              }}
              className="secondary-btn"
            >
              Back
            </button>
          </div>
        </div>

        <div
          onClick={() => {
            if (!resendDisabled) {
              handleResendAndValidate();
            }
          }}
          onKeyDown={(event) => {
            if (
              (event.key === "Enter" || event.key === " ") &&
              !resendDisabled
            ) {
              event.preventDefault();
              handleResendAndValidate();
            }
          }}
          role="button"
          tabIndex="0"
          className="resend-otp"
        >
          <FontAwesomeIcon icon={faArrowRotateLeft} color="#0b5fff" />{" "}
          <p>{resendDisabled ? `Resend Otp (${countdown}s)` : "Resend Otp"}</p>
        </div>
      </div>
    </OtpPageStyle>
  );
};
export default OtpPageLoginComponent;
