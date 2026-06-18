import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AdminLoginStyle, InputWrapper } from "./admin-login-style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import {
  faCircleExclamation,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  InputContainerWithIcon,
  Button,
  Note,
} from "../../user/login/user-login-style";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Header } from "../../Home/Home";
const AdminLoginComponent = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const submitSuperadmin = async (data) => {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/v1/auth/adminLogin",
        {
          email: data.email,
          password: data.password,
        }
      );
      toast.success(response.data.message);
      navigate("/otp-login-page", {
        state: { data, type: "AdminLogin" },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        password: "",
      });
    }
  }, [reset, isSubmitSuccessful]);
  const forgotPasswordFunction = () => {
    navigate("/forgot-password", { state: { type: "Admin" } });
  };
  return (
    <>
      {/* Add Header Component in this place (if required) */}
      <Header />
      <AdminLoginStyle>
        <div className="container max_w_380">
          <h1 className="heading">
            <span className="blue">Welcome to</span>
            <br />
            Aptitude Guru Hem <span className="red">LMS</span>
            <br />
          </h1>
          <form onSubmit={handleSubmit(submitSuperadmin)} className="form">
            <div className="form__container">
              <InputWrapper>
                <label htmlFor="email">Email</label>
                <InputContainerWithIcon>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="linda@framcreative.com"
                    {...register("email", { required: true })}
                  />
                  <div className="icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                </InputContainerWithIcon>

                {errors.email && (
                  <div className="warning__text">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    <p>Please enter your Email</p>
                  </div>
                )}
              </InputWrapper>
              <InputWrapper>
                <div className="label_with_icon">
                  <label htmlFor="password">Password</label>
                  <div
                    className="hide_show"
                    onClick={() => setShowPassword(!showPassword)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setShowPassword(!showPassword);
                      }
                    }}
                    role="button"
                    tabIndex="0"
                  >
                    {showPassword ? (
                      <>
                        <FontAwesomeIcon icon={faEyeSlash} size="xs" />
                        <p>Hide</p>{" "}
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faEye} size="xs" />
                        <p>Show</p>
                      </>
                    )}
                  </div>
                </div>
                <InputContainerWithIcon>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Your Password"
                    {...register("password", { required: true })}
                  />
                  <div className="icon">
                    <FontAwesomeIcon icon={faLock} />
                  </div>
                </InputContainerWithIcon>
                {errors.password && (
                  <div className="warning__text">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    <p>Please enter your password</p>
                  </div>
                )}
              </InputWrapper>
            </div>
            <p
              className="forget_password"
              onClick={forgotPasswordFunction}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  forgotPasswordFunction();
                }
              }}
              role="button"
              tabIndex="0"
            >
              Forgot password
            </p>
            <div className="button_Container">
              <Button $primary type="submit" disabled={loading}>
                {loading ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  "Admin Login"
                )}
              </Button>
            </div>
          </form>
          <Note>
            If you don't have an account yet, you can create by click{" "}
            <span
              onClick={() => {
                navigate("/adminSignup");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  navigate("/adminSignup");
                }
              }}
              role="button"
              tabIndex="0"
              style={{ cursor: "pointer" }}
            >
              Create Account
            </span>{" "}
            Button.
          </Note>
        </div>
      </AdminLoginStyle>
    </>
  );
};
export default AdminLoginComponent;
