import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { AppContext } from "../../../context/AppContext";
import { useSelector } from "react-redux";
import { WarningText } from "../common.style";
import { PublishTestEditStyle } from "./publish-test-edit-style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { InputWrapper } from "../login/admin-login-style";
import {
  Button,
  InputContainerWithOutIcon,
} from "../../user/login/user-login-style";
import { TopTitleHeading } from "../common.style";
import axiosInstance from "../../../services/apiconnector";
import { year } from "../publish-test/PublishForm";
import Select from "react-select";
import { reactSelectTheme } from "../../../theme";
import BulbAnimation from "../../../component/BulbAnimation";

// const PublistTestEditComponent = ({ type, testId }) => {
//   const { name } = useSelector((state) => state.theme);
//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const submitScheduledTestEndPoint =
//     type === "Aptitude"
//       ? "/createTest/rescheduletest"
//       : "/createTest/rescheduleTechnicalTestAdmin";
//   const getScheduledTestEndPoint =
//     type === "Aptitude"
//       ? "/createTest/getatheScheduleofTest"
//       : "/createTest/getAdminTechnicalScheduledTest";
//   const [loading, setLoading] = useState(false);
//   const [testDetails, setTestDetails] = useState(null);
//   const { token } = useSelector((state) => state.auth);
//   const { setPopupbox } = useContext(AppContext);
//   const UgorPg = ["UG", "PG"];

//   // ✅ Check scheduling type
//   const isScheduledByBatches =
//     testDetails?.batches && testDetails.batches.length > 0;
//   const isScheduledByDepartments =
//     testDetails?.departments && testDetails.departments.length > 0;

//   const submitQuestion = async (data) => {
//     const toastId = toast.loading("Loading...");
//     setLoading(true);

//     // ✅ Process departments only if scheduled by departments
//     if (isScheduledByDepartments && data.departments) {
//       data.departments = data.departments.map((department) => department.value);
//     }

//     try {
//       const res = await axiosInstance.post(
//         import.meta.env.VITE_BASE_URL + "/v1" + submitScheduledTestEndPoint,
//         {
//           data,
//           testId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       toast.success(res?.data?.message);
//       setPopupbox(false);
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//       toast.dismiss(toastId);
//     }
//   };

//   const getScheduledTest = async () => {
//     setLoading(true);
//     try {
//       const getTest = await axiosInstance.get(
//         import.meta.env.VITE_BASE_URL + "/v1" + getScheduledTestEndPoint,
//         {
//           params: { testId: testId },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       setTestDetails(getTest.data.getAllAptitudeTests);
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getScheduledTest();
//   }, [testId, token]);

//   useEffect(() => {
//     if (testDetails) {
//       const resetData = {
//         startdate: testDetails.startDate || "",
//         enddate: testDetails.endDate || "",
//         starttime: testDetails.startTime || "",
//         endtime: testDetails.endTime || "",
//       };

//       // ✅ Add department fields only if scheduled by departments
//       if (isScheduledByDepartments) {
//         resetData.ugorpg = testDetails.ugorpg || "";
//         resetData.departments =
//           testDetails?.departments?.map((department) => {
//             return { value: department, label: department };
//           }) || [];
//         resetData.year = testDetails.year || "";
//       }

//       reset(resetData);
//     }
//   }, [testDetails, reset, isScheduledByDepartments]);

//   return (
//     <PublishTestEditStyle>
//       <div className="container">
//         <FontAwesomeIcon
//           className="xmark_position"
//           icon={faXmark}
//           size="xl"
//           onClick={() => {
//             setPopupbox(false);
//           }}
//         />
//         {loading === true ? (
//           <BulbAnimation />
//         ) : (
//           <>
//             <TopTitleHeading>Re-Schedule Form</TopTitleHeading>
//             <form className="form__box" onSubmit={handleSubmit(submitQuestion)}>
//               <InputWrapper>
//                 <label htmlFor="startdate">Start Date</label>
//                 <InputContainerWithOutIcon>
//                   <input
//                     type="date"
//                     id="startdate"
//                     name="startdate"
//                     {...register("startdate", {
//                       required: true,
//                     })}
//                     value={testDetails?.startDate || ""}
//                     onChange={(e) =>
//                       setTestDetails((prevDetails) => ({
//                         ...prevDetails,
//                         startDate: e.target.value,
//                       }))
//                     }
//                   />
//                 </InputContainerWithOutIcon>
//                 {errors.startdate && (
//                   <WarningText>
//                     <p>Please Enter the Start Date</p>
//                   </WarningText>
//                 )}
//               </InputWrapper>

//               <InputWrapper>
//                 <label htmlFor="enddate">End Date</label>
//                 <InputContainerWithOutIcon>
//                   <input
//                     type="date"
//                     id="enddate"
//                     name="enddate"
//                     {...register("enddate", {
//                       required: true,
//                     })}
//                     value={testDetails?.endDate || ""}
//                     onChange={(e) =>
//                       setTestDetails((prevDetails) => ({
//                         ...prevDetails,
//                         endDate: e.target.value,
//                       }))
//                     }
//                   />
//                 </InputContainerWithOutIcon>
//                 {errors.enddate && (
//                   <WarningText>
//                     <p>Please Enter the End Date</p>
//                   </WarningText>
//                 )}
//               </InputWrapper>

//               <InputWrapper>
//                 <label htmlFor="starttime">Start Time</label>
//                 <InputContainerWithOutIcon>
//                   <input
//                     type="time"
//                     id="starttime"
//                     name="starttime"
//                     {...register("starttime", {
//                       required: true,
//                     })}
//                     value={testDetails?.startTime || ""}
//                     onChange={(e) =>
//                       setTestDetails((prevDetails) => ({
//                         ...prevDetails,
//                         startTime: e.target.value,
//                       }))
//                     }
//                   />
//                 </InputContainerWithOutIcon>
//                 {errors.starttime && (
//                   <WarningText>
//                     <p>Please Enter the Start Time</p>
//                   </WarningText>
//                 )}
//               </InputWrapper>

//               <InputWrapper>
//                 <label htmlFor="endtime">End Time</label>
//                 <InputContainerWithOutIcon>
//                   <input
//                     type="time"
//                     id="endtime"
//                     name="endtime"
//                     {...register("endtime", {
//                       required: true,
//                     })}
//                     value={testDetails?.endTime || ""}
//                     onChange={(e) =>
//                       setTestDetails((prevDetails) => ({
//                         ...prevDetails,
//                         endTime: e.target.value,
//                       }))
//                     }
//                   />
//                 </InputContainerWithOutIcon>
//                 {errors.endtime && (
//                   <WarningText>
//                     <p>Please Enter the End Time</p>
//                   </WarningText>
//                 )}
//               </InputWrapper>

//               {/* ✅ Show UG/PG, Year, Department if scheduled by departments */}
//               {isScheduledByDepartments && (
//                 <>
//                   <InputWrapper>
//                     <label htmlFor="ugorpg">Select Ug or Pg</label>
//                     <InputContainerWithOutIcon>
//                       <select
//                         disabled={true}
//                         id="ugorpg"
//                         name="ugorpg"
//                         {...register("ugorpg", {
//                           required: true,
//                         })}
//                         value={testDetails?.ugorpg || ""}
//                         onChange={(e) =>
//                           setTestDetails((prevDetails) => ({
//                             ...prevDetails,
//                             ugorpg: e.target.value,
//                           }))
//                         }
//                       >
//                         <option value="" disabled>
//                           Select the Ug or Pg
//                         </option>
//                         {UgorPg.map((item, index) => (
//                           <option key={index} value={item}>
//                             {item}
//                           </option>
//                         ))}
//                       </select>
//                     </InputContainerWithOutIcon>
//                     {errors.ugorpg && (
//                       <WarningText>
//                         <p>Please Select Ug or Pg</p>
//                       </WarningText>
//                     )}
//                   </InputWrapper>

//                   <InputWrapper>
//                     <label htmlFor="year">Select the Year</label>
//                     <InputContainerWithOutIcon>
//                       <select
//                         disabled={true}
//                         id="year"
//                         name="year"
//                         {...register("year", {
//                           required: true,
//                         })}
//                         value={testDetails?.year || ""}
//                         onChange={(e) =>
//                           setTestDetails((prevDetails) => ({
//                             ...prevDetails,
//                             year: e.target.value,
//                           }))
//                         }
//                       >
//                         <option value="" disabled>
//                           Select the year
//                         </option>
//                         {year.map((item, index) => (
//                           <option key={index} value={item}>
//                             {item}
//                           </option>
//                         ))}
//                       </select>
//                     </InputContainerWithOutIcon>
//                     {errors.year && (
//                       <WarningText>
//                         <p>Please Select the Year</p>
//                       </WarningText>
//                     )}
//                   </InputWrapper>

//                   <InputWrapper>
//                     <label htmlFor="department">Select the Department</label>
//                     <InputContainerWithOutIcon>
//                       <Controller
//                         name="departments"
//                         control={control}
//                         rules={{ required: true }}
//                         render={({ field }) => (
//                           <Select
//                             {...field}
//                             theme={reactSelectTheme(
//                               name === "LIGHT" ? false : true,
//                             )}
//                             isDisabled={true}
//                             id="departments"
//                             isMulti
//                             placeholder="Select a Departments"
//                           />
//                         )}
//                       />
//                     </InputContainerWithOutIcon>
//                     {errors?.departments && (
//                       <WarningText>
//                         <p>Please Select the Department</p>
//                       </WarningText>
//                     )}
//                   </InputWrapper>
//                 </>
//               )}

//               {/* ✅ Show batch info if scheduled by batches */}
//               {isScheduledByBatches && (
//                 <InputWrapper>
//                   <label>Scheduled Batches</label>
//                   <InputContainerWithOutIcon>
//                     <p
//                       style={{
//                         padding: "10px",
//                         color: name === "LIGHT" ? "#333" : "#fff",
//                       }}
//                     >
//                       This test is scheduled for {testDetails.batches.length}{" "}
//                       batch(es)
//                     </p>
//                   </InputContainerWithOutIcon>
//                 </InputWrapper>
//               )}

//               <Button type="submit" className="w-fit" disabled={loading}>
//                 {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Submit"}
//               </Button>
//             </form>
//           </>
//         )}
//       </div>
//     </PublishTestEditStyle>
//   );
// };

const PublistTestEditComponent = ({ type, testId, adminId }) => {
  const isAghAssessment = String(type).toLowerCase() === "agh";
  const { name } = useSelector((state) => state.theme);
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const routePrefix = adminId ? "/createTest/super-admin" : "/createTest";
  const submitScheduledTestEndPoint =
    type === "Aptitude"
      ? `${routePrefix}/rescheduletest`
      : type === "Technical"
        ? `${routePrefix}/rescheduleTechnicalTestAdmin`
        : "/superadmin-assessments/agh/schedule";
  const getScheduledTestEndPoint =
    type === "Aptitude"
      ? `${routePrefix}/getatheScheduleofTest`
      : type === "Technical"
        ? `${routePrefix}/getAdminTechnicalScheduledTest`
        : "/superadmin-assessments/agh/get-schedule";

  const [loading, setLoading] = useState(false);
  const [testDetails, setTestDetails] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const { setPopupbox } = useContext(AppContext);
  const UgorPg = ["UG", "PG"];

  const isScheduledByBatches =
    testDetails?.batches && testDetails.batches.length > 0;
  const isScheduledByDepartments =
    testDetails?.departments && testDetails.departments.length > 0;

  const totalQuestionsToAttend = watch("totalQuestionsToAttend");

  const submitQuestion = async (data) => {
    const toastId = toast.loading("Loading...");
    setLoading(true);

    if (isScheduledByDepartments && data.departments) {
      data.departments = data.departments.map((department) => department.value);
    }

    if (type === "Technical") {
      data.storeTestResults = data.storeTestResults === "true";
      data.totalQuestionsToAttend =
        data.totalQuestionsToAttend === "all"
          ? 0
          : Number(data.customTotalQuestionsToAttend || 0);
    }

    console.log("THE SUBMISSION DATA I AM GETTING:", data);

    try {
      const res = await axiosInstance.post(
        import.meta.env.VITE_BASE_URL + "/v1" + submitScheduledTestEndPoint,
        { data, testId, adminId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(res?.data?.message);
      setPopupbox(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };

  const getScheduledTest = async () => {
    setLoading(true);
    try {
      const getTest = await axiosInstance.get(
        import.meta.env.VITE_BASE_URL + "/v1" + getScheduledTestEndPoint,
        {
          params: { testId: testId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setTestDetails(getTest.data.getAllAptitudeTests);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getScheduledTest();
  }, [testId, token]);

  useEffect(() => {
    if (testDetails) {
      const resetData = {
        startdate: testDetails.startDate || "",
        enddate: testDetails.endDate || "",
        starttime: testDetails.startTime || "",
        endtime: testDetails.endTime || "",
      };

      if (isScheduledByDepartments) {
        resetData.ugorpg = testDetails.ugorpg || "";
        resetData.departments =
          testDetails?.departments?.map((department) => ({
            value: department,
            label: department,
          })) || [];
        resetData.year = testDetails.year || "";
      }

      if (type === "Technical") {
        resetData.storeTestResults =
          testDetails.storeTestResults === true ||
          testDetails.storeTestResults === "true"
            ? "true"
            : "false";
        resetData.showPercentage =
          testDetails.showPercentage || "showTestcases";
        resetData.totalQuestionsToAttend =
          testDetails.totalQuestionsToAttend > 0 ? "custom" : "all";
        resetData.customTotalQuestionsToAttend =
          testDetails.totalQuestionsToAttend > 0
            ? testDetails.totalQuestionsToAttend
            : "";
      }

      if (isAghAssessment) {
        resetData.timerRunType = testDetails.timerRunType
          ? { value: testDetails.timerRunType, label: testDetails.timerRunType }
          : { value: "Assessment", label: "Assessment" };
        resetData.maxViolationsAllowed = testDetails.maxViolationsAllowed || 10;
      }
      reset(resetData);
    }
  }, [testDetails, reset, isScheduledByDepartments, isAghAssessment]);

  return (
    <PublishTestEditStyle>
      <div className="container">
        <FontAwesomeIcon
          className="xmark_position"
          icon={faXmark}
          size="xl"
          onClick={() => setPopupbox(false)}
        />
        {loading === true ? (
          <BulbAnimation />
        ) : (
          <>
            <TopTitleHeading>Re-Schedule Form</TopTitleHeading>
            <form className="form__box" onSubmit={handleSubmit(submitQuestion)}>
              {/* Start Date */}
              <InputWrapper>
                <label htmlFor="startdate">Start Date</label>
                <InputContainerWithOutIcon>
                  <input
                    type="date"
                    id="startdate"
                    name="startdate"
                    {...register("startdate", { required: true })}
                    value={testDetails?.startDate || ""}
                    onChange={(e) =>
                      setTestDetails((prevDetails) => ({
                        ...prevDetails,
                        startDate: e.target.value,
                      }))
                    }
                  />
                </InputContainerWithOutIcon>
                {errors.startdate && (
                  <WarningText>
                    <p>Please Enter the Start Date</p>
                  </WarningText>
                )}
              </InputWrapper>

              {/* End Date */}
              <InputWrapper>
                <label htmlFor="enddate">End Date</label>
                <InputContainerWithOutIcon>
                  <input
                    type="date"
                    id="enddate"
                    name="enddate"
                    {...register("enddate", { required: true })}
                    value={testDetails?.endDate || ""}
                    onChange={(e) =>
                      setTestDetails((prevDetails) => ({
                        ...prevDetails,
                        endDate: e.target.value,
                      }))
                    }
                  />
                </InputContainerWithOutIcon>
                {errors.enddate && (
                  <WarningText>
                    <p>Please Enter the End Date</p>
                  </WarningText>
                )}
              </InputWrapper>

              {/* Start Time */}
              <InputWrapper>
                <label htmlFor="starttime">Start Time</label>
                <InputContainerWithOutIcon>
                  <input
                    type="time"
                    id="starttime"
                    name="starttime"
                    {...register("starttime", { required: true })}
                    value={testDetails?.startTime || ""}
                    onChange={(e) =>
                      setTestDetails((prevDetails) => ({
                        ...prevDetails,
                        startTime: e.target.value,
                      }))
                    }
                  />
                </InputContainerWithOutIcon>
                {errors.starttime && (
                  <WarningText>
                    <p>Please Enter the Start Time</p>
                  </WarningText>
                )}
              </InputWrapper>

              {/* End Time */}
              <InputWrapper>
                <label htmlFor="endtime">End Time</label>
                <InputContainerWithOutIcon>
                  <input
                    type="time"
                    id="endtime"
                    name="endtime"
                    {...register("endtime", { required: true })}
                    value={testDetails?.endTime || ""}
                    onChange={(e) =>
                      setTestDetails((prevDetails) => ({
                        ...prevDetails,
                        endTime: e.target.value,
                      }))
                    }
                  />
                </InputContainerWithOutIcon>
                {errors.endtime && (
                  <WarningText>
                    <p>Please Enter the End Time</p>
                  </WarningText>
                )}
              </InputWrapper>
              {isAghAssessment && (
                <>
                  <InputWrapper>
                    <label htmlFor="timerRunType">
                      Timer Run Type<span className="dot__box">*</span>
                    </label>
                    <InputContainerWithOutIcon>
                      <Controller
                        name="timerRunType"
                        control={control}
                        rules={{ required: "Timer Run Type is required" }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            id="timerRunType"
                            theme={reactSelectTheme(name === "LIGHT" ? false : true)}
                            options={[
                              { value: "Assessment", label: "Assessment" },
                              { value: "Section", label: "Section" },
                            ]}
                            placeholder="Select Timer Run Type"
                            isClearable={false}
                          />
                        )}
                      />
                    </InputContainerWithOutIcon>
                    {errors.timerRunType && (
                      <WarningText>
                        <p>{errors.timerRunType.message}</p>
                      </WarningText>
                    )}
                  </InputWrapper>

                  <InputWrapper>
                    <label htmlFor="maxViolationsAllowed">
                      Max Violations Allowed<span className="dot__box">*</span>
                    </label>
                    <InputContainerWithOutIcon>
                      <input
                        type="number"
                        id="maxViolationsAllowed"
                        placeholder="Enter max violations allowed"
                        {...register("maxViolationsAllowed", {
                          required: "Max violations allowed is required",
                          min: { value: 0, message: "Minimum value is 0" },
                        })}
                      />
                    </InputContainerWithOutIcon>
                    {errors.maxViolationsAllowed && (
                      <WarningText>
                        <p>{errors.maxViolationsAllowed.message}</p>
                      </WarningText>
                    )}
                  </InputWrapper>
                </>
              )}

              {/* Department fields */}
              {isScheduledByDepartments && (
                <>
                  <InputWrapper>
                    <label htmlFor="ugorpg">Select Ug or Pg</label>
                    <InputContainerWithOutIcon>
                      <select
                        disabled={true}
                        id="ugorpg"
                        name="ugorpg"
                        {...register("ugorpg", { required: true })}
                        value={testDetails?.ugorpg || ""}
                        onChange={(e) =>
                          setTestDetails((prevDetails) => ({
                            ...prevDetails,
                            ugorpg: e.target.value,
                          }))
                        }
                      >
                        <option value="" disabled>
                          Select the Ug or Pg
                        </option>
                        {UgorPg.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </InputContainerWithOutIcon>
                    {errors.ugorpg && (
                      <WarningText>
                        <p>Please Select Ug or Pg</p>
                      </WarningText>
                    )}
                  </InputWrapper>

                  <InputWrapper>
                    <label htmlFor="year">Select the Year</label>
                    <InputContainerWithOutIcon>
                      <select
                        disabled={true}
                        id="year"
                        name="year"
                        {...register("year", { required: true })}
                        value={testDetails?.year || ""}
                        onChange={(e) =>
                          setTestDetails((prevDetails) => ({
                            ...prevDetails,
                            year: e.target.value,
                          }))
                        }
                      >
                        <option value="" disabled>
                          Select the year
                        </option>
                        {year.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </InputContainerWithOutIcon>
                    {errors.year && (
                      <WarningText>
                        <p>Please Select the Year</p>
                      </WarningText>
                    )}
                  </InputWrapper>

                  <InputWrapper>
                    <label htmlFor="department">Select the Department</label>
                    <InputContainerWithOutIcon>
                      <Controller
                        name="departments"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            theme={reactSelectTheme(
                              name === "LIGHT" ? false : true,
                            )}
                            isDisabled={true}
                            id="departments"
                            isMulti
                            placeholder="Select a Departments"
                          />
                        )}
                      />
                    </InputContainerWithOutIcon>
                    {errors?.departments && (
                      <WarningText>
                        <p>Please Select the Department</p>
                      </WarningText>
                    )}
                  </InputWrapper>
                </>
              )}

              {/* Batch info */}
              {isScheduledByBatches && (
                <InputWrapper>
                  <label>Scheduled Batches</label>
                  <InputContainerWithOutIcon>
                    <p
                      style={{
                        padding: "10px",
                        color: name === "LIGHT" ? "#333" : "#fff",
                      }}
                    >
                      This test is scheduled for {testDetails.batches.length}{" "}
                      batch(es)
                    </p>
                  </InputContainerWithOutIcon>
                </InputWrapper>
              )}

              {/* ✅ Technical only fields */}
              {type === "Technical" && (
                <>
                  {/* Total Questions to Attend */}
                  <InputWrapper>
                    <label htmlFor="totalQuestionsToAttend">
                      Total Questions to Attend
                    </label>
                    <InputContainerWithOutIcon>
                      <select
                        id="totalQuestionsToAttend"
                        {...register("totalQuestionsToAttend")}
                      >
                        <option value="all">All</option>
                        <option value="custom">Custom</option>
                      </select>
                    </InputContainerWithOutIcon>
                  </InputWrapper>

                  {/* ✅ Show only when custom is selected */}
                  {totalQuestionsToAttend === "custom" && (
                    <InputWrapper>
                      <label htmlFor="customTotalQuestionsToAttend">
                        Enter Number of Questions
                      </label>
                      <InputContainerWithOutIcon>
                        <input
                          type="number"
                          id="customTotalQuestionsToAttend"
                          {...register("customTotalQuestionsToAttend", {
                            required: true,
                            valueAsNumber: true,
                          })}
                        />
                      </InputContainerWithOutIcon>
                      {errors.customTotalQuestionsToAttend && (
                        <WarningText>
                          <p>Please enter the number of questions</p>
                        </WarningText>
                      )}
                    </InputWrapper>
                  )}

                  {/* Show Percentage */}
                  <InputWrapper>
                    <label htmlFor="showPercentage">Show Percentage</label>
                    <InputContainerWithOutIcon>
                      <select
                        id="showPercentage"
                        {...register("showPercentage", { required: true })}
                      >
                        <option value="showPercentage">Show Percentage</option>
                        <option value="showTestcases">Show Testcases</option>
                      </select>
                    </InputContainerWithOutIcon>
                    {errors.showPercentage && (
                      <WarningText>
                        <p>Please select an option</p>
                      </WarningText>
                    )}
                  </InputWrapper>

                  {/* Store Test Results */}
                  <InputWrapper>
                    <label htmlFor="storeTestResults">Store Test Results</label>
                    <InputContainerWithOutIcon>
                      <select
                        id="storeTestResults"
                        {...register("storeTestResults", { required: true })}
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </InputContainerWithOutIcon>
                    {errors.storeTestResults && (
                      <WarningText>
                        <p>Please select an option</p>
                      </WarningText>
                    )}
                  </InputWrapper>
                </>
              )}

              <Button type="submit" className="w-fit" disabled={loading}>
                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Submit"}
              </Button>
            </form>
          </>
        )}
      </div>
    </PublishTestEditStyle>
  );
};
export default PublistTestEditComponent;
