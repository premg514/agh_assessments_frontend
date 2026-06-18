import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UserLoginStyle } from "./login-style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-hot-toast";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const SuperAdminLoginComponent = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const submitSuperadmin = async (data) => {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/v1/auth/superadminLogin",
        {
          email: data.email,
          password: data.password,
        }
      );
      toast.success(response?.data?.message);
      navigate("/otp-login-page", {
        state: { data, type: "SuperadminLogin" },
      });
    } catch (err) {
      toast.error(err.response.data.message || "Something went wrong");
      console.log("Error occurred", err);
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <UserLoginStyle>
      <div className="container">
        <form onSubmit={handleSubmit(submitSuperadmin)} className="form">
          <h1>Welcome SuperAdmin!</h1>
          <div className="form__container">
            <div className="form__box class__three">
              <label htmlFor="email">
                Email<span className="dot__box">*</span>
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <div className="warning__text">Please enter your Email*</div>
              )}
            </div>
            <div className="form__box class__three">
              <label htmlFor="password">
                Password<span className="dot__box">*</span>
              </label>
              <input
                required
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter the password"
                {...register("password", { required: true })}
              />
              <span
                className="eye__container"
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
                {showPassword === true ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </span>
              {errors.password && (
                <div className="warning__text">Please enter your password*</div>
              )}
            </div>
          </div>
          <button type="submit" className="button__style" disabled={loading}>
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Login"}
          </button>
        </form>
        <div className="image__container">
          <img src="/frame.png" alt="" className="background__image" />
          <img src="/login.webp" alt="" className="student__image" />
        </div>
      </div>
    </UserLoginStyle>
  );
};
export default SuperAdminLoginComponent;
