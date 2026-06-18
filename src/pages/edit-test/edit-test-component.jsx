import React, { useContext, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { EditTestStyle } from "./edit-test-style";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { AppContext } from "../../context/AppContext";
import { faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  InputContainerWithOutIcon,
} from "../user/login/user-login-style";
import {
  getCorrectUrlForEditTestQuestionDetails,
  convertDataIntoQuestionPreviewFormat,
} from "../super-admin/test-list-page/utils/functions";
import axiosInstance from "../../services/apiconnector";

import ConfirmationComponent from "../../component/confirmation/confirmation-component";

import { InputContainerWithIcon } from "../user/login/user-login-style";
import {
  AptitudeSubTopics,
  AptitudeSubdivisionData,
  AptitudeTopics,
} from "../../data/aptitudeSubdivisionData";
import {
  TechnicalSubTopics,
  TechnicalTopics,
} from "../../data/aptitudeSubdivisionData";
import { WarningText } from "../admin/common.style";

const EditTestComponent = ({
  onbehalfOfAccountType,
  data,
  testId,
  type,
  subType,
  handleClickClose,
  handleUpdateDataState,
  isAssignMode = false,
  targetAdminId = null,
}) => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { setPopupbox, setComponentName } = useContext(AppContext);
  const [submission, setSubmission] = useState(false);
  const [showConfirmAssign, setShowConfirmAssign] = useState(false);
  const [pendingFormData, setPendingFormData] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      topic: data.topic,
      subTopic: data.subTopic,
      name: data.name,
      negativemark: data.negativeMark,
      totalquestions: data.totalQuestions,
      totaleasyquestions: data.totalEasyQuestions,
      totalmediumquestions: data.totalMediumQuestions,
      totalhardquestions: data.totalHardQuestions,
      totalcodingquestions: data.totalCodingQuestions,
      totaleasycodingquestions: data.totalEasyCodingQuestions,
      totalmediumcodingquestions: data.totalMediumCodingQuestions,
      totalhardcodingquestions: data.totalHardCodingQuestions,
      duration: data.duration,
      markforeveryquestion: data.markforquestion,
      markforeverycodingquestion: data.markforcodingquestion,
      totalQuestionsToAttend:
        data.totalQuestionsToAttend > 0 ? "custom" : "all",
      customTotalQuestionsToAttend:
        data.totalQuestionsToAttend > 0 ? data.totalQuestionsToAttend : "",
      showPercentage: data.showPercentage || "showTestcases",
      // ✅ New field
      storeTestResults:
        data.storeTestResults === true || data.storeTestResults === "true"
          ? "true"
          : "false",
      questions: (data.question || []).map((q) => {
        // If it's a backend question object (has optionA, question, etc.)
        // instead of the frontend format (question: { statement: ... }, options: [...])
        if (q && q.optionA !== undefined) {
          return convertDataIntoQuestionPreviewFormat(q);
        }
        return q;
      }),
    },
  });

  const totalQuestionsToAttend = watch("totalQuestionsToAttend");
  const watchedType = watch("topic"); // Actually 'topic' in some forms acts as type
  const watchedTopic = watch("topic");

  const onSubmit = async (formData) => {
    if (isAssignMode && !showConfirmAssign) {
      setPendingFormData(formData);
      setShowConfirmAssign(true);
      return;
    }

    executeSubmit(formData);
  };

  const executeSubmit = async (formData) => {
    setSubmission(true);
    const finalData = {
      ...formData,
      totalQuestionsToAttend:
        formData.totalQuestionsToAttend === "all"
          ? 0
          : Number(formData.customTotalQuestionsToAttend || 0),
      // ✅ Convert string back to boolean
      storeTestResults: formData.storeTestResults === "true",
      questions: (data?.question || []).map((q) => q._id || q), // Send IDs only
    };

    const toastId = toast.loading("Loading...");
    try {
      let getData;
      let accountType = onbehalfOfAccountType || user?.accountType;
      const endPoint = getCorrectUrlForEditTestQuestionDetails(
        type,
        subType,
        accountType,
      );

      if (endPoint === -1) {
        toast.error("Failed to determine the correct endpoint.");
        setSubmission(false);
        toast.dismiss(toastId);
        return;
      }

      getData = await axiosInstance.post(
        import.meta.env.VITE_BASE_URL + `/v1/${endPoint}`,
        { data: finalData, testId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(getData.data.message);
      if (handleUpdateDataState) {
        handleUpdateDataState(getData?.data?.data);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong while updating",
      );
    } finally {
      setSubmission(false);
      toast.dismiss(toastId);
      if (!isAssignMode || handleClickClose) {
        setPopupbox(false);
      }
    }
  };

  return (
    <>
      {showConfirmAssign && (
        <ConfirmationComponent
          title="Confirm Assignment"
          detail="Are you sure you want to assign this test to the college?"
          confirmLabel="Yes, Assign"
          handleClickCancel={() => setShowConfirmAssign(false)}
          onClick={() => {
            setShowConfirmAssign(false);
            if (pendingFormData) executeSubmit(pendingFormData);
          }}
        />
      )}
      <EditTestStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="section__three">
            <FontAwesomeIcon
              onClick={() => {
                if (handleClickClose) {
                  handleClickClose();
                } else {
                  setComponentName(null);
                  setPopupbox(false);
                }
              }}
              icon={faXmark}
              size="xl"
              className="xmark"
            />

            <div className="section__three__child">
              <div className="questiondetail__box">
                {isAssignMode ? "Assign & Edit Test" : "Edit Test"}
              </div>
              <h2>{data.subTopic}</h2>
            </div>

            <div className="answer__container">
              {/* Topic */}
              <h3>Topic</h3>
              <InputContainerWithOutIcon>
                <input
                  type="text"
                  className="solution"
                  {...register("topic", { required: "Topic is required" })}
                />
              </InputContainerWithOutIcon>
              {errors.topic && <p>{errors.topic.message}</p>}

              {/* Sub Topic */}
              <h3>Sub Topic</h3>
              <InputContainerWithOutIcon>
                <input
                  type="text"
                  className="solution"
                  {...register("subTopic", {
                    required: "Sub Topic is required",
                  })}
                />
              </InputContainerWithOutIcon>
              {errors.subTopic && <p>{errors.subTopic.message}</p>}

              {/* Negative Mark */}
              <h3>Negative mark</h3>
              <InputContainerWithOutIcon>
                <input
                  type="number"
                  className="solution"
                  {...register("negativemark", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </InputContainerWithOutIcon>

              {/* Total Questions */}
              <h3>Total Questions</h3>
              <InputContainerWithOutIcon>
                <input
                  type="number"
                  className="solution"
                  {...register("totalquestions", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </InputContainerWithOutIcon>

              {/* Total Easy */}
              <h3>Total Easy Questions</h3>
              <InputContainerWithOutIcon>
                <input
                  type="number"
                  className="solution"
                  {...register("totaleasyquestions", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </InputContainerWithOutIcon>

              {/* Total Medium */}
              <h3>Total Medium Questions</h3>
              <InputContainerWithOutIcon>
                <input
                  type="number"
                  className="solution"
                  {...register("totalmediumquestions", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </InputContainerWithOutIcon>

              {/* Total Hard */}
              <h3>Total Hard Questions</h3>
              <InputContainerWithOutIcon>
                <input
                  type="number"
                  className="solution"
                  {...register("totalhardquestions", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </InputContainerWithOutIcon>

              {/* Coding Questions only for Technical/Lab */}
              {(type === "Technical" || type === "Lab") && (
                <>
                  <h3>Total Coding Questions</h3>
                  <InputContainerWithOutIcon>
                    <input
                      type="number"
                      className="solution"
                      {...register("totalcodingquestions", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </InputContainerWithOutIcon>

                  <h3>Total Coding Easy Questions</h3>
                  <InputContainerWithOutIcon>
                    <input
                      type="number"
                      className="solution"
                      {...register("totaleasycodingquestions", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </InputContainerWithOutIcon>

                  <h3>Total Coding Medium Questions</h3>
                  <InputContainerWithOutIcon>
                    <input
                      type="number"
                      className="solution"
                      {...register("totalmediumcodingquestions", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </InputContainerWithOutIcon>

                  <h3>Total Coding Hard Questions</h3>
                  <InputContainerWithOutIcon>
                    <input
                      type="number"
                      className="solution"
                      {...register("totalhardcodingquestions", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </InputContainerWithOutIcon>

                  <h3>Mark for every coding question</h3>
                  <InputContainerWithOutIcon>
                    <input
                      type="number"
                      className="solution"
                      {...register("markforeverycodingquestion", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </InputContainerWithOutIcon>

                  {/* Total Questions to Attend */}
                  <h3>Total Questions to Attend</h3>
                  <InputContainerWithOutIcon>
                    <select
                      className="solution"
                      {...register("totalQuestionsToAttend")}
                    >
                      <option value="all">All</option>
                      <option value="custom">Custom</option>
                    </select>
                  </InputContainerWithOutIcon>

                  {totalQuestionsToAttend === "custom" && (
                    <>
                      <h3>Enter Number of Questions</h3>
                      <InputContainerWithOutIcon>
                        <input
                          type="number"
                          className="solution"
                          {...register("customTotalQuestionsToAttend", {
                            required: true,
                            valueAsNumber: true,
                          })}
                        />
                      </InputContainerWithOutIcon>
                    </>
                  )}

                  {/* Show Percentage Dropdown */}
                  <h3>Show Percentage</h3>
                  <InputContainerWithOutIcon>
                    <select
                      className="solution"
                      {...register("showPercentage", {
                        required: true,
                      })}
                    >
                      <option value="showPercentage">Show Percentage</option>
                      <option value="showTestcases">Show Testcases</option>
                    </select>
                  </InputContainerWithOutIcon>
                </>
              )}

              {/* Duration */}
              <h3>Duration</h3>
              <InputContainerWithOutIcon>
                <input
                  type="number"
                  className="solution"
                  {...register("duration", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </InputContainerWithOutIcon>

              {/* Mark for every question */}
              <h3>Mark for every question</h3>
              <InputContainerWithOutIcon>
                <input
                  type="number"
                  className="solution"
                  {...register("markforeveryquestion", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </InputContainerWithOutIcon>

              {/* ✅ Store Test Results */}
              <h3>Store Test Results</h3>
              <InputContainerWithOutIcon>
                <select
                  className="solution"
                  {...register("storeTestResults", { required: true })}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </InputContainerWithOutIcon>
            </div>

            {/* Save button */}
            <Button type="submit" className="w-fit" disabled={submission}>
              {submission ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : isAssignMode ? (
                "Assign to College"
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </EditTestStyle>
    </>
  );
};

export default EditTestComponent;
