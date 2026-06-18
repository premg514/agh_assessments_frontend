import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  Heading,
  Wrapper,
  ContactDetailsContainer,
  CrossContainer,
  SubText,
  TabContainer,
} from "./ContactUs.style";
import {
  Button,
  InputContainerWithOutIcon,
  InputContainerWithIcon,
  UserLoginStyle,
} from "../../user/login/user-login-style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCross,
  faEnvelope,
  faPaperPlane,
  faPhone,
  faPlane,
  faXmark,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";
import ReactModal from "react-modal";

const ContactUs = ({ setShowContactModal }) => {
  const {
    register,
    formState: { errors, isSubmitting, isSubmitted },
    handleSubmit,
    reset,
  } = useForm();
  const [activeTab, setActiveTab] = useState("form");
  const onSubmit = async (data) => {
    const toastId = toast.loading("Loading...");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/v1/auth/contact`,
        data
      );
      toast.success(res?.data?.message || "Query submitted successfully");
      setShowContactModal(false);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      toast.dismiss(toastId);
      reset();
    }
  };

  return (
    <Wrapper>
      <CrossContainer
        onClick={() => {
          setShowContactModal(false);
        }}
      >
        <FontAwesomeIcon icon={faXmark} size="xl" />
      </CrossContainer>
      <div>
        <Heading className="poppins-medium">
          Get in touch with us for more information
        </Heading>
        <SubText className="poppins-regular ">
          Reach out and we'll get in touch Soon
        </SubText>
      </div>

      <TabContainer>
        <button
          onClick={() => setActiveTab("form")}
          className={`${
            activeTab === "form" ? "active" : "hover"
          } poppins-medium `}
        >
          Form
        </button>
        <button
          onClick={() => setActiveTab("details")}
          className={`${
            activeTab === "details" ? "active" : "hover"
          } poppins-medium `}
        >
          Details
        </button>
      </TabContainer>

      {activeTab === "form" && (
        <UserLoginStyle>
          <div className="container">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form__container">
                <div className="input_container">
                  <label htmlFor="firstName">First name</label>
                  <InputContainerWithOutIcon>
                    <input
                      type="text"
                      className="poppins-regular"
                      placeholder="First Name"
                      {...register("firstName", {
                        required: "This field is required",
                        maxLength: {
                          value: 50,
                          message: "Length should not exceed 50 character",
                        },
                      })}
                    />
                  </InputContainerWithOutIcon>

                  {errors.firstName && (
                    <div className="warning__text">
                      <FontAwesomeIcon icon={faCircleExclamation} />
                      <p>Please enter your first name</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="input_container">
                <label htmlFor="lastName">Last name</label>
                <InputContainerWithOutIcon>
                  <input
                    type="text"
                    className="poppins-regular"
                    placeholder="Last Name"
                    {...register("lastName", {
                      required: "This field is required",
                      maxLength: {
                        value: 50,
                        message: "Length should not exceed 50 character",
                      },
                    })}
                  />
                </InputContainerWithOutIcon>

                {errors.lastName && (
                  <div className="warning__text">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    <p>Please enter your last name</p>
                  </div>
                )}
              </div>

              <div className="input_container">
                <label htmlFor="email">Email</label>
                <InputContainerWithOutIcon>
                  <input
                    type="email"
                    className="poppins-regular"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                      maxLength: {
                        value: 54,
                        message: "Email cannot exceed 54 characters",
                      },
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        message: "Invalid email format",
                      },
                    })}
                  />
                </InputContainerWithOutIcon>

                {errors.email && (
                  <div className="warning__text">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    <p>Please enter your Email</p>
                  </div>
                )}
              </div>

              <div className="input_container">
                <InputContainerWithOutIcon>
                  <textarea
                    rows={5}
                    style={{
                      resize: "none",
                    }}
                    className="poppins-regular"
                    placeholder="Message"
                    {...register("message", {
                      required: "This field is required",
                      maxLength: {
                        value: 500,
                        message: "Length should not exceed 500 character",
                      },
                    })}
                  ></textarea>
                </InputContainerWithOutIcon>
                {errors.message && (
                  <div className="warning__text">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                    <p className="poppins-regular">{errors.message.message}</p>
                  </div>
                )}
              </div>

              <Button $primary disabled={isSubmitting}>
                Send Message <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            </form>
          </div>
        </UserLoginStyle>
      )}

      {activeTab === "details" && (
        <ContactDetailsContainer>
          <div className="contact_details">
            <FontAwesomeIcon icon={faPhone} size="xl" color="#0D92F4" />
            <p>Call Support</p>
            <p className="text-lg poppins-semibold">+91 8667515240</p>
          </div>
          <div className="contact_details">
            <FontAwesomeIcon color="#0D92F4" icon={faEnvelope} size="xl" />
            <p>Email Support</p>
            <p className="text-lg poppins-semibold">
              aptitudeguruhemchandar@gmail.com
            </p>
          </div>
        </ContactDetailsContainer>
      )}
    </Wrapper>
  );
};

const ContactUsModal = ({ setShowContactModal, showContactModal }) => {
  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={showContactModal}
      contentLabel="Contact Modal"
      style={{
        overlay: {
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(255, 255, 255, 0.75)",
          zIndex: 999,
        },
        content: {
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          border: "1px solid #bbb",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          maxWidth: "540px",
          width: "95%",
          outline: "none",
        },
      }}
    >
      <ContactUs setShowContactModal={setShowContactModal} />
    </ReactModal>
  );
};

export default ContactUsModal;
