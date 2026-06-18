import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Button,
  InputContainerWithOutIcon,
} from "../user/login/user-login-style";
import ChooseCodingQuestiions from "../aptitude-test/admin/technical/chooseCodingQuestions";
import { useSelector } from "react-redux";
import {
  AGH_Assessment_form,
  AGH_Assessment_form_section_container,
} from "../agh-assessments/create-form/styles";
import { ErrorMessage } from "../super-admin/explore/create-problem-set/style";
import { InputWrapper } from "../admin/login/admin-login-style";
import { WarningText } from "../admin/common.style";
import axiosInstance from "../../services/apiconnector";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ConfirmationComponent from "../../component/confirmation/confirmation-component";
import { useParams } from "react-router-dom";
import UsersSelection from "../../component/users-selection-component/Index";

const AssessmentSection = ({
  field,
  index,
  register,
  token,
  remove,
  setValue,
  formState,
  watch,
  isSectionWise,
  initialMCQs,
  initialProblems,
  initialSQLProblems,
}) => {
  const { errors } = formState;
  const [selectedProblems, setSelectedProblems] = useState(initialProblems || []);
  const [selectedMCQs, setSelectedMCQs] = useState(initialMCQs || []);
  const [selectedSQLProblems, setSelectedSQLProblems] = useState(initialSQLProblems || []);

  const countDifficulty = (problems) =>
    problems.reduce(
      (acc, cur) => {
        if (cur.difficulty === "Easy" || cur.questionLevel === "Easy") acc.easy++;
        else if (cur.difficulty === "Medium" || cur.questionLevel === "Medium") acc.medium++;
        else if (cur.difficulty === "Hard" || cur.questionLevel === "Hard") acc.hard++;
        return acc;
      },
      { easy: 0, medium: 0, hard: 0 }
    );

  const { easy: easyCount, medium: mediumCount, hard: hardCount } = countDifficulty(selectedProblems);
  const { easy: easyMCQCount, medium: mediumMCQCount, hard: hardMCQCount } = countDifficulty(selectedMCQs);
  const { easy: easySQLCount, medium: mediumSQLCount, hard: hardSQLCount } = countDifficulty(selectedSQLProblems);

  useEffect(() => {
    setValue(`sections.${index}.codingProblems`, selectedProblems);
  }, [selectedProblems, index, setValue]);

  useEffect(() => {
    setValue(`sections.${index}.mcqProblems`, selectedMCQs);
  }, [selectedMCQs, index, setValue]);

  useEffect(() => {
    setValue(`sections.${index}.sqlProblems`, selectedSQLProblems);
  }, [selectedSQLProblems, index, setValue]);

  const watchSection = watch(`sections.${index}`);
  
  const codingGet = watchSection?.codingProblemsGetOnTest || { easy: 0, medium: 0, hard: 0 };
  const codingMark = watchSection?.codingProblemsMarkConfig || { easy: 0, medium: 0, hard: 0 };
  const mcqGet = watchSection?.mcqProblemsGetOnTest || { easy: 0, medium: 0, hard: 0 };
  const mcqMark = watchSection?.mcqProblemsMarkConfig || { easy: 0, medium: 0, hard: 0 };
  const sqlGet = watchSection?.sqlProblemsGetOnTest || { easy: 0, medium: 0, hard: 0 };
  const sqlMark = watchSection?.sqlProblemsMarkConfig || { easy: 0, medium: 0, hard: 0 };

  const totalCodingMarks = (codingGet.easy * codingMark.easy) + (codingGet.medium * codingMark.medium) + (codingGet.hard * codingMark.hard);
  const totalMCQMarks = (mcqGet.easy * mcqMark.easy) + (mcqGet.medium * mcqMark.medium) + (mcqGet.hard * mcqMark.hard);
  const totalSQLMarks = (sqlGet.easy * sqlMark.easy) + (sqlGet.medium * sqlMark.medium) + (sqlGet.hard * sqlMark.hard);

  return (
    <AGH_Assessment_form_section_container>
      <h3>Section {index + 1}</h3>
      <InputWrapper>
        <label>Section Name*</label>
        <InputContainerWithOutIcon>
          <input
            {...register(`sections.${index}.name`, { required: "Required" })}
            type="text"
          />
        </InputContainerWithOutIcon>
        {errors?.sections?.[index]?.name && <ErrorMessage>{errors.sections[index].name.message}</ErrorMessage>}
      </InputWrapper>

      {isSectionWise === "yes" && (
        <InputWrapper>
          <label>Section Duration* (mins)</label>
          <InputContainerWithOutIcon>
            <input
              {...register(`sections.${index}.sectionDuration`, { required: "Required", valueAsNumber: true })}
              type="number"
            />
          </InputContainerWithOutIcon>
        </InputWrapper>
      )}

      <div className="flex_col_box">
        <div className="problems_choose">
          <div>Coding Problems</div>
          <ChooseCodingQuestiions
            selectedProblems={selectedProblems}
            setSelectedProblems={setSelectedProblems}
            token={token}
            questions_type="CODING"
          />
          <div className="counts_container">
            <div>Easy: {easyCount}, Medium: {mediumCount}, Hard: {hardCount}</div>
          </div>
          <div className="question_config_inputs_container">
             <InputWrapper>
                <label>Easy Qs</label>
                <input type="number" {...register(`sections.${index}.codingProblemsGetOnTest.easy`, { valueAsNumber: true })} />
             </InputWrapper>
             <InputWrapper>
                <label>Medium Qs</label>
                <input type="number" {...register(`sections.${index}.codingProblemsGetOnTest.medium`, { valueAsNumber: true })} />
             </InputWrapper>
             <InputWrapper>
                <label>Hard Qs</label>
                <input type="number" {...register(`sections.${index}.codingProblemsGetOnTest.hard`, { valueAsNumber: true })} />
             </InputWrapper>
          </div>
          <div className="question_config_inputs_container">
             <InputWrapper>
                <label>Easy Mark</label>
                <input type="number" {...register(`sections.${index}.codingProblemsMarkConfig.easy`, { valueAsNumber: true })} />
             </InputWrapper>
             <InputWrapper>
                <label>Medium Mark</label>
                <input type="number" {...register(`sections.${index}.codingProblemsMarkConfig.medium`, { valueAsNumber: true })} />
             </InputWrapper>
             <InputWrapper>
                <label>Hard Mark</label>
                <input type="number" {...register(`sections.${index}.codingProblemsMarkConfig.hard`, { valueAsNumber: true })} />
             </InputWrapper>
          </div>
          <div className="section_marks_summary">
            <strong>Total Coding Mark: {totalCodingMarks}</strong>
          </div>
        </div>

        <div className="problems_choose">
          <div>MCQ Problems</div>
          <ChooseCodingQuestiions
            selectedProblems={selectedMCQs}
            setSelectedProblems={setSelectedMCQs}
            token={token}
            apiEndPoint="code/sa/mcq-problems"
            questions_type="MCQ"
          />
          <div className="counts_container">
            <div>Easy: {easyMCQCount}, Medium: {mediumMCQCount}, Hard: {hardMCQCount}</div>
          </div>
          <div className="question_config_inputs_container">
             <InputWrapper><label>Easy Qs</label><input type="number" {...register(`sections.${index}.mcqProblemsGetOnTest.easy`, { valueAsNumber: true })} /></InputWrapper>
             <InputWrapper><label>Med Qs</label><input type="number" {...register(`sections.${index}.mcqProblemsGetOnTest.medium`, { valueAsNumber: true })} /></InputWrapper>
             <InputWrapper><label>Hard Qs</label><input type="number" {...register(`sections.${index}.mcqProblemsGetOnTest.hard`, { valueAsNumber: true })} /></InputWrapper>
          </div>
          <div className="question_config_inputs_container">
             <InputWrapper><label>Easy Mark</label><input type="number" {...register(`sections.${index}.mcqProblemsMarkConfig.easy`, { valueAsNumber: true })} /></InputWrapper>
             <InputWrapper><label>Med Mark</label><input type="number" {...register(`sections.${index}.mcqProblemsMarkConfig.medium`, { valueAsNumber: true })} /></InputWrapper>
             <InputWrapper><label>Hard Mark</label><input type="number" {...register(`sections.${index}.mcqProblemsMarkConfig.hard`, { valueAsNumber: true })} /></InputWrapper>
          </div>
          <div className="section_marks_summary">
            <strong>Total MCQ Mark: {totalMCQMarks}</strong>
          </div>
        </div>
        
        <div className="problems_choose">
          <div>SQL Problems</div>
          <ChooseCodingQuestiions
            selectedProblems={selectedSQLProblems}
            setSelectedProblems={setSelectedSQLProblems}
            token={token}
            apiEndPoint="code/sa/sql-problems"
            questions_type="SQL"
          />
          <div className="counts_container">
            <div>Easy: {easySQLCount}, Medium: {mediumSQLCount}, Hard: {hardSQLCount}</div>
          </div>
          <div className="question_config_inputs_container">
             <InputWrapper><label>Easy Qs</label><input type="number" {...register(`sections.${index}.sqlProblemsGetOnTest.easy`, { valueAsNumber: true })} /></InputWrapper>
             <InputWrapper><label>Med Qs</label><input type="number" {...register(`sections.${index}.sqlProblemsGetOnTest.medium`, { valueAsNumber: true })} /></InputWrapper>
             <InputWrapper><label>Hard Qs</label><input type="number" {...register(`sections.${index}.sqlProblemsGetOnTest.hard`, { valueAsNumber: true })} /></InputWrapper>
          </div>
          <div className="question_config_inputs_container">
             <InputWrapper><label>Easy Mark</label><input type="number" {...register(`sections.${index}.sqlProblemsMarkConfig.easy`, { valueAsNumber: true })} /></InputWrapper>
             <InputWrapper><label>Med Mark</label><input type="number" {...register(`sections.${index}.sqlProblemsMarkConfig.medium`, { valueAsNumber: true })} /></InputWrapper>
             <InputWrapper><label>Hard Mark</label><input type="number" {...register(`sections.${index}.sqlProblemsMarkConfig.hard`, { valueAsNumber: true })} /></InputWrapper>
          </div>
          <div className="section_marks_summary">
            <strong>Total SQL Mark: {totalSQLMarks}</strong>
          </div>
        </div>
      </div>

      {index > 0 && (
        <Button type="button" $primary onClick={() => remove(index)}>Remove Section</Button>
      )}
    </AGH_Assessment_form_section_container>
  );
};

const EditAGHAssessmentComponent = ({ data, testId, type, handleClickClose, targetAdminId, collegeName }) => {
  const { token } = useSelector((state) => state.auth);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingData, setPendingData] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState(data?.scheduledForUsers || []);
  const {assessmentId} = useParams();
  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: data.name,
      isSectionWise: data.timerRunType === "Section" ? "yes" : "no",
      duration: data.duration,
      sections: data.sections || []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections"
  });

  const isSectionWise = watch("isSectionWise");
  const watchedSections = watch("sections");

  useEffect(() => {
    if (isSectionWise === "yes") {
      const total = (watchedSections || []).reduce((sum, s) => sum + (Number(s.sectionDuration) || 0), 0);
      setValue("duration", total);
    }
  }, [watchedSections, isSectionWise, setValue]);

  const onSubmit = (formData) => {
    setPendingData(formData);
    setShowConfirm(true);
  };

  const executeSubmit = async (formData) => {
    const toastId = toast.loading("Assigning and creating assessment...");
    try {
      const payload = {
        adminId: targetAdminId,
        sourceAssessmentId: testId,
        overrides: {
          ...formData,
          timerRunType: formData.isSectionWise === "yes" ? "Section" : "Assessment",
          scheduledForUsers: selectedStudents.map((s) => s._id || s),
          sections: formData.sections.map(s => ({
            ...s,
            codingProblems: (s.codingProblems || []).map(p => p._id || p),
            mcqProblems: (s.mcqProblems || []).map(p => p._id || p),
            sqlProblems: (s.sqlProblems || []).map(p => p._id || p),
          }))
        }
      };

      const res = await axiosInstance.post(
        `${import.meta.env.VITE_BASE_URL}/v1/superadmin-assessments/agh/assign-edit`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message);
      if (handleClickClose) handleClickClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to assign assessment");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <AGH_Assessment_form style={{ maxHeight: "80vh", overflowY: "auto", padding: "20px" }}>
      {showConfirm && (
        <ConfirmationComponent
          title="Confirm Assignment"
          detail="Assign this AGH assessment to the college?"
          confirmLabel="Yes, Assign"
          handleClickCancel={() => setShowConfirm(false)}
          onClick={() => {
            setShowConfirm(false);
            executeSubmit(pendingData);
          }}
        />
      )}
      <h2>Assign & Edit AGH Assessment</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <label>Assessment Name*</label>
          <InputContainerWithOutIcon>
            <input {...register("name", { required: "Name is required" })} />
          </InputContainerWithOutIcon>
        </InputWrapper>

        <InputWrapper>
          <label>Section Wise Timer?*</label>
          <select {...register("isSectionWise")}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </InputWrapper>

        <InputWrapper>
          <label>Total Duration (mins)*</label>
          <InputContainerWithOutIcon>
            <input type="number" {...register("duration", { required: true, valueAsNumber: true })} readOnly={isSectionWise === "yes"} />
          </InputContainerWithOutIcon>
        </InputWrapper>

        <div style={{ marginTop: "20px" }}>
          {fields.map((field, index) => (
            <AssessmentSection
              key={field.id}
              field={field}
              index={index}
              register={register}
              token={token}
              remove={remove}
              setValue={setValue}
              formState={{ errors }}
              watch={watch}
              isSectionWise={isSectionWise}
              initialMCQs={field.mcqProblems}
              initialProblems={field.codingProblems}
              initialSQLProblems={field.sqlProblems}
            />
          ))}
          <Button type="button" onClick={() => append({ name: "", sectionDuration: 0, codingProblems: [], mcqProblems: [], sqlProblems: [] })}>
            Add Section
          </Button>
        </div>

        <div style={{ marginTop: "24px" }}>
          <div style={{ fontWeight: 600, marginBottom: "8px" }}>
            Select Students
            {collegeName && (
              <span style={{ marginLeft: "8px", fontSize: "13px", color: "#667085", fontWeight: "normal" }}>
                — Students from: <strong>{collegeName}</strong>
              </span>
            )}
          </div>
          <div style={{ border: "1px solid #d0d5dd", borderRadius: "8px", overflow: "hidden" }}>
            <UsersSelection
              collegeName={collegeName}
              selectedUsers={selectedStudents}
              setSelectedUsers={setSelectedStudents}
            />
          </div>
        </div>

        <div style={{ marginTop: "30px", display: "flex", gap: "10px" }}>
          <Button $primary type="submit">Assign to College</Button>
          <Button type="button" onClick={handleClickClose}>Cancel</Button>
        </div>
      </form>
    </AGH_Assessment_form>
  );
};

export default EditAGHAssessmentComponent;
