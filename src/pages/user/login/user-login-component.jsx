import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import {
  UserLoginStyle,
  Note,
  Button,
  InputContainerWithIcon,
} from "./user-login-style";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setToken } from "../../../slices/authSlice";
import {
  setElearningAccess,
  setTestAccess,
  setUser,
  setCompanyAccess, //this is for the company access
} from "../../../slices/profileSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Header } from "../../Home/Home";
import { loginSchema } from "../../../Schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const UserLoginComponent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitSuperadmin = async (data) => {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/v1/auth/userLogin",
        {
          email: data.email,
          password: data.password,
        },
      );
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      dispatch(setTestAccess(response.data.user.testProvidedByCollege));
      dispatch(
        setElearningAccess(response.data.user.elearningProvidedByCollege),
      );
      dispatch(setCompanyAccess(response.data.user.companySpecificTest));

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      if (response?.data?.loginHistoryId) {
        sessionStorage.setItem(
          "currentLoginHistoryId",
          response.data.loginHistoryId,
        );
        sessionStorage.removeItem(
          `location_prompted_${response.data.loginHistoryId}`,
        );
      }

      toast.success(response?.data?.message);
      navigate("/user-home-page", {
        replace: true,
      });
    } catch (err) {
      toast.error(err?.response?.data?.message);
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
    navigate("/forgot-password", { state: { type: "User" } });
  };
  return (
    <>
      <Header />
      <UserLoginStyle className="max_w_380">
        <div className="container">
          <h1 className="heading">
            <span className="blue">Welcome to</span>
            <br />
            Aptitude Guru Hem <span className="red">LMS</span>
          </h1>
          <form onSubmit={handleSubmit(submitSuperadmin)} className="form">
            <div className="form__container">
              <div className="input_container">
                <label htmlFor="email">Email</label>
                <InputContainerWithIcon>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="linda@framcreative.com"
                    {...register("email")}
                  />
                  <div className="icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                </InputContainerWithIcon>

                {errors?.email && (
                  <div className="warning__text">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    <p>{errors?.email?.message}</p>
                  </div>
                )}
              </div>
              <div className="input_container">
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
                    {...register("password")}
                  />
                  <div className="icon">
                    <FontAwesomeIcon icon={faLock} />
                  </div>
                </InputContainerWithIcon>
                {errors?.password && (
                  <div className="warning__text">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    <p>{errors?.password?.message}</p>
                  </div>
                )}
              </div>
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
                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Login"}
              </Button>
            </div>
          </form>
          <Note>
            If you don't have an account yet, you can create by click{" "}
            <span
              onClick={() => {
                navigate("/userSignup");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  navigate("/userSignup");
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
      </UserLoginStyle>
    </>
  );
};
export default UserLoginComponent;
