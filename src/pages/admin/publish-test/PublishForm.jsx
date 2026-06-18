import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormContext, Controller } from "react-hook-form";
import { WarningText } from "../common.style";
import {
  InfoBox,
  InputWrapper,
  ToggleButton,
  ToggleContainer,
  ToggleLabel,
  ToggleWrapper,
} from "../login/admin-login-style";
import Select from "react-select";
import {
  Button,
  InputContainerWithOutIcon,
} from "../../user/login/user-login-style";
import axiosInstance from "../../../services/apiconnector";
import { useSelector } from "react-redux";
import { reactSelectTheme } from "../../../theme";
import { useUserId } from "../../../hooks/useUserId";

export const departments = [
  "CSE",
  "MECH",
  "IT",
  "EEE",
  "ECE",
  "CIVIL",
  "CYBER SECURITY",
  "AI&DS",
];
export const year = [
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
  "2031",
  "2032",
  "2033",
  "2034",
];

const storeTestResultDropdownOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const PublishForm = ({ type, adminId: adminIdProp }) => {
  const isAghAssessment = String(type).toLowerCase() === "agh";
  const UgorPg = ["UG", "PG"];
  const [selectionMode, setSelectionMode] = useState("department");
  const [fetchedDepartments, setDepartments] = useState(null);
  const [fetchedBatches, setFetchedBatches] = useState(null);
  const [isLoadingDepartments, setIsLoadingDepartments] = useState(false);
  const [isLoadingBatches, setIsLoadingBatches] = useState(false);
  const adminId = adminIdProp || useParams()?.adminId || useUserId();

  const {
    register,
    control,
    formState: { errors },
    watch,
    resetField,
    setValue,
  } = useFormContext();

  const watchYear = watch("year");
  const ugorpg = watch("ugorpg");
  const { token } = useSelector((state) => state.auth);
  const { name } = useSelector((state) => state.theme);

  const fetchDepartments = async () => {
    setIsLoadingDepartments(true);
    try {
      const res = await axiosInstance.get(
        `${import.meta.env.VITE_BASE_URL}/v1/createTest/getCollegeDepartments`,
        {
          params: {
            year: watchYear.value,
            ugorpg: ugorpg.value,
            adminId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setDepartments(res.data.data);
    } catch (err) {
      console.error("Error fetching departments:", err);
      setDepartments(null);
    } finally {
      setIsLoadingDepartments(false);
    }
  };

  const fetchBatches = async () => {
    setIsLoadingBatches(true);
    try {
      const res = await axiosInstance.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/v1/admin-batch/getbatches-of-dropdown`,
        {
          params: {
            adminId, // ✅ added
          },

          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setFetchedBatches(res.data.data);
    } catch (err) {
      console.error("Error fetching batches:", err);
      setFetchedBatches(null);
    } finally {
      setIsLoadingBatches(false);
    }
  };

  useEffect(() => {
    if (selectionMode === "department" && watchYear?.value && ugorpg?.value) {
      console.log("Fetching departments with params:", {
        year: watchYear.value,
        ugorpg: ugorpg.value,
        adminId,
        type,
      });
      fetchDepartments();
    } else if (selectionMode === "batch") {
      fetchBatches();
    }
  }, [watchYear, ugorpg, selectionMode, adminId, type]);

  const handleModeSwitch = (mode) => {
    setSelectionMode(mode);
    if (mode === "batch") {
      // Reset and clear department-based fields
      setValue("ugorpg", null);
      setValue("year", null);
      setValue("departments", null);
    } else {
      // Reset and clear batch-based fields
      setValue("batches", null);
    }
  };

  return (
    <div>
      {type === "MockInterview" && (
        <InputWrapper>
          <label htmlFor="testName">
            Mock Interview Name<span className="dot__box">*</span>
          </label>
          <InputContainerWithOutIcon>
            <input
              type="text"
              id="testName"
              placeholder="Enter mock interview name"
              {...register("testName", {
                required: "Mock interview name is required",
              })}
            />
          </InputContainerWithOutIcon>

          {errors.testName && (
            <WarningText>
              <p>{errors.testName.message}</p>
            </WarningText>
          )}
        </InputWrapper>
      )}

      <InputWrapper>
        <label htmlFor="startdate">Start Date</label>
        <InputContainerWithOutIcon>
          <input
            type="date"
            id="startdate"
            name="startdate"
            placeholder="Enter the Start Date"
            {...register("startdate", {
              required: true,
            })}
          />
        </InputContainerWithOutIcon>
        {errors.startdate && (
          <WarningText>
            <p>Please Enter the Start Date</p>
          </WarningText>
        )}
      </InputWrapper>

      <InputWrapper>
        <label htmlFor="enddate">End Date</label>
        <InputContainerWithOutIcon>
          <input
            type="date"
            id="enddate"
            name="enddate"
            placeholder="Enter the End Date"
            {...register("enddate", {
              required: true,
            })}
          />
        </InputContainerWithOutIcon>
        {errors.enddate && (
          <WarningText>
            <p>Please Enter the End Date</p>
          </WarningText>
        )}
      </InputWrapper>

      <InputWrapper>
        <label htmlFor="starttime">Start Time</label>
        <InputContainerWithOutIcon>
          <input
            type="time"
            id="starttime"
            name="starttime"
            placeholder="Enter the Start Time"
            {...register("starttime", {
              required: true,
            })}
          />
        </InputContainerWithOutIcon>
        {errors.starttime && (
          <WarningText>
            <p>Please Enter the Start Time</p>
          </WarningText>
        )}
      </InputWrapper>

      <InputWrapper>
        <label htmlFor="endtime">End Time</label>
        <InputContainerWithOutIcon>
          <input
            type="time"
            id="endtime"
            name="endtime"
            placeholder="Enter the End Time"
            {...register("endtime", {
              required: true,
            })}
          />
        </InputContainerWithOutIcon>
        {errors.endtime && (
          <WarningText>
            <p>Please Enter the End Time</p>
          </WarningText>
        )}
      </InputWrapper>

      {/* Professional Toggle Switch */}
      <ToggleWrapper>
        <ToggleLabel theme={name}>Selection Mode</ToggleLabel>
        <ToggleContainer theme={name}>
          <ToggleButton
            type="button"
            active={selectionMode === "department"}
            theme={name}
            onClick={() => handleModeSwitch("department")}
          >
            Department Based
          </ToggleButton>
          <ToggleButton
            type="button"
            active={selectionMode === "batch"}
            theme={name}
            onClick={() => handleModeSwitch("batch")}
          >
            Batch Based
          </ToggleButton>
        </ToggleContainer>
      </ToggleWrapper>

      {/* Conditional Rendering Based on Selection Mode */}
      {selectionMode === "department" ? (
        <>
          <InputWrapper>
            <label htmlFor="ugorpg">
              Select UG or PG<span className="dot__box">*</span>
            </label>
            <InputContainerWithOutIcon>
              <Controller
                name="ugorpg"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="ugorpg"
                    theme={reactSelectTheme(name === "LIGHT" ? false : true)}
                    options={UgorPg.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                    placeholder="Select UG or PG"
                    isClearable
                  />
                )}
              />
            </InputContainerWithOutIcon>
            {errors.ugorpg && (
              <WarningText>
                <p>Please Select UG or PG</p>
              </WarningText>
            )}
          </InputWrapper>

          <InputWrapper>
            <label htmlFor="year">Select the Year</label>
            <InputContainerWithOutIcon>
              <Controller
                name="year"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="year"
                    theme={reactSelectTheme(name === "LIGHT" ? false : true)}
                    options={year?.map((yearOption) => ({
                      value: yearOption,
                      label: yearOption,
                    }))}
                    placeholder="Select the Year"
                    isClearable
                  />
                )}
              />
            </InputContainerWithOutIcon>
            {errors.year && (
              <WarningText>
                <p>Please Select the Year</p>
              </WarningText>
            )}
          </InputWrapper>

          <InputWrapper>
            <label htmlFor="departments">Select the Departments</label>
            <InputContainerWithOutIcon>
              <Controller
                name="departments"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    theme={reactSelectTheme(name === "LIGHT" ? false : true)}
                    isDisabled={!(watchYear && ugorpg)}
                    isLoading={isLoadingDepartments}
                    id="departments"
                    closeMenuOnSelect={false}
                    isMulti
                    options={fetchedDepartments?.map((department) => ({
                      value: department,
                      label: department,
                    }))}
                    placeholder="Select Departments"
                    isClearable
                  />
                )}
              />
            </InputContainerWithOutIcon>
            {errors.departments && (
              <WarningText>
                <p>Please Select the Departments</p>
              </WarningText>
            )}
          </InputWrapper>
        </>
      ) : (
        <>
          <InputWrapper>
            <label htmlFor="batches">
              Select Batches<span className="dot__box">*</span>
            </label>
            <InputContainerWithOutIcon>
              <Controller
                name="batches"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    theme={reactSelectTheme(name === "LIGHT" ? false : true)}
                    id="batches"
                    isLoading={isLoadingBatches}
                    closeMenuOnSelect={false}
                    isMulti
                    options={fetchedBatches?.map((batch) => ({
                      value: batch.id || batch.name || batch,
                      label: batch.name || batch,
                    }))}
                    placeholder="Select Batches"
                    isClearable
                  />
                )}
              />
            </InputContainerWithOutIcon>
            {errors.batches && (
              <WarningText>
                <p>Please Select at least one Batch</p>
              </WarningText>
            )}
          </InputWrapper>

          <InfoBox theme={name}>
            <span>Note:</span> Batch selection allows you to choose
            pre-configured groups containing specific departments, years, and
            UG/PG combinations.
          </InfoBox>
        </>
      )}

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
                defaultValue={{ value: "Assessment", label: "Assessment" }}
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
                defaultValue={10}
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
    </div>
  );
};

export default PublishForm;
