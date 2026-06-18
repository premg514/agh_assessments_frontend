import React, { useRef, useState } from "react";
import {
  AddQuestionStyle,
  OptionsContainer,
  OneSetFieldContainer,
} from "./add-question-style";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { InputWrapper } from "../admin/login/admin-login-style";
import * as XLSX from "xlsx";
import { Button } from "../user/login/user-login-style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { addQuestionFormDefaultObject } from "../aptitude-test/data";
import {
  normalizeBulkUploadJson,
  getBulkUploadVariant,
} from "../aptitude-test/bulkUploadJson";
import BulkUploadJsonModal from "../aptitude-test/BulkUploadJsonModal";
import {
  TextField,
  QuestionHeader,
  SelectField,
  OptionField,
  InputField,
  ImageDropzone,
} from "../aptitude-test/components";
import toast from "react-hot-toast";

const AddQuestionForm = ({ type, subType, bulkUploadJsonPlaceholder }) => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useFormContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedJsonFile, setSelectedJsonFile] = useState(null);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const { fields, append, remove, insert, replace } = useFieldArray({
    control,
    name: "questions",
  });

  const fileInputRef = useRef(null);

  const handleDeleteOption = (questionsIndex, optionIndex) => {
    let currentQuestions = [...fields];
    // console.log("fields", fields);
    const dataAfterRemoveOption = currentQuestions.map((value, qindex) => {
      // console.log(value);
      if (qindex === questionsIndex) {
        // console.log("options", value?.options);
        let filteredData = value?.options?.filter(
          (ovalue, oindex) => oindex !== optionIndex
        );
        return { ...value, options: filteredData };
      }
      return value;
    });

    setValue("questions", dataAfterRemoveOption);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setSelectedJsonFile(null);

    const reader = new FileReader();

    reader.onload = (event) => {
      const bstr = event.target.result;
      processExcelData(bstr);
    };

    reader.readAsBinaryString(file);
  };

  const handleJsonTextSubmit = (text) => {
    try {
      const parsed = JSON.parse(text);
      const { values } = normalizeBulkUploadJson(
        parsed,
        getBulkUploadVariant(type, subType)
      );

      if (!Array.isArray(values.questions) || values.questions.length === 0) {
        throw new Error("JSON does not contain any questions.");
      }

      replace(values.questions);
      setSelectedJsonFile({ name: "Pasted JSON" });
      setSelectedFile(null);
      toast.success("Questions imported from JSON.");
      return true;
    } catch (error) {
      toast.error(error?.message || "Error while reading the JSON");
      return false;
    }
  };

  const processExcelData = (binaryStr) => {
    try {
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetNames = workbook.SheetNames;
      const worksheet = workbook.Sheets[sheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        raw: true,
        defval: "",
        cellText: true,
      });

      // const updatedImages = createImageObjects(jsonData);
      const updatedQuestions = createQuestionObjects(jsonData);
      updatedQuestions.forEach((question) => {
        question.options = question.options.map((option) =>
          option === "" ? 0 : option
        );
      });

      resetFormFields(fields.length); // Bulk remove fields

      updateQuestions(updatedQuestions);
      // setTempQuestions(updatedQuestions);
      // setImage(updatedImages);
    } catch (error) {
      console.error("Error reading the Excel file:", error);
    }
  };

  const createQuestionObjects = (jsonData) => {
    return jsonData.map((item) => ({
      question: { statement: item.question },
      options: [
        { statement: item.optionA || "" },
        { statement: item.optionB || "" },
        { statement: item.optionC || "" },
        { statement: item.optionD || "" },
      ],
      difficulty: item.difficulty,
      answerKey: item.correctAnswer,
      explanation: item.explanation,
    }));
  };

  const resetFormFields = (length) => {
    for (let i = 0; i < length; i++) {
      remove(0);
    }
  };

  const updateQuestions = (questions) => {
    questions.forEach((item, index) => {
      insert(index, {
        question: item.question,
        options: item.options,
        difficulty: item.difficulty,
        answerKey: item.answerKey,
        explanation: item.explanation,
      });
    });
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleJsonUploadClick = () => {
    setIsJsonModalOpen(true);
  };
  const handleDeleteQuestion = (index) => {
    remove(index);
  };
  const handleAddQuestion = () => {
    append(addQuestionFormDefaultObject, { shouldFocus: false });
  };
  const handleCancelClick = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSelectedJsonFile(null);
    reset();
  };

  return (
    <AddQuestionStyle>
      <div className="button__container">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <Button type="button" className="w-fit" onClick={handleButtonClick}>
          <FontAwesomeIcon icon={faUpload} size="lg" /> Bulk upload
        </Button>
        <Button
          type="button"
          className="w-fit"
          onClick={handleJsonUploadClick}
        >
          <FontAwesomeIcon icon={faUpload} size="lg" /> Bulk Upload JSON
        </Button>
        {selectedFile && (
          <div>
            <p>Selected file: {selectedFile.name}</p>
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        )}
        {selectedJsonFile && (
          <div>
            <p>Selected JSON: {selectedJsonFile.name}</p>
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        )}
        <Button
          type="button"
          className="w-fit"
          $primary
          onClick={handleAddQuestion}
        >
          Add
        </Button>
      </div>
      <BulkUploadJsonModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        onSubmit={handleJsonTextSubmit}
        placeholder={bulkUploadJsonPlaceholder}
      />
      <div className="fields_container">
        {fields?.map((item, index) => {
          return (
            <OneSetFieldContainer key={item.id}>
              <QuestionHeader
                index={index}
                arrayFields={fields}
                handleDelete={handleDeleteQuestion}
                heading={"Question"}
              />
              <TextField
                index={index}
                label="Question Statement"
                placeholder="Enter the question"
                fieldName="question.statement"
                register={register}
                error={errors["questions"]?.[index]?.question?.statement}
                errorMessage="Please enter question"
                prefix={"questions"}
              />

              <InputWrapper className="options">
                <label htmlFor={`questionImage${index}`}>
                  {"Question Image " + (index + 1)}
                </label>
                <Controller
                  name={`questions[${index}].question.image`}
                  control={control}
                  defaultValue={null}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <ImageDropzone
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  )}
                />
              </InputWrapper>

              <SelectField
                index={index}
                label="Question Difficulty"
                fieldName="difficulty"
                options={["Easy", "Medium", "Hard"]}
                register={register}
                error={errors["questions"]?.[index]?.difficulty}
                errorMessage="Please select a difficulty"
                prefix={"questions"}
              />

              <OptionsContainer>
                {fields?.[index]?.options?.map((option, optionIndex) => {
                  return (
                    <OptionField
                      key={optionIndex}
                      questionIndex={index}
                      optionIndex={optionIndex}
                      register={register}
                      control={control}
                      errors={
                        errors?.questions?.[index]?.options?.[optionIndex]
                          ?.statement
                      }
                      name={`questions.${index}.options.${optionIndex}.statement`}
                      iName={`questions.${index}.options.${optionIndex}.image`}
                      handleDeleteOption={handleDeleteOption}
                      prefix={"questions"}
                    />
                  );
                })}
              </OptionsContainer>

              <InputField
                register={register(`questions.${index}.answerKey`, {
                  required: true,
                  pattern: /^[abcd]$/,
                })}
                labelText={"Answer Key"}
                placeholder={"Enter the Option a, b, c, d"}
                name={`questions.${index}.answerKey`}
                error={errors.questions?.[index]?.answerKey}
              />

              <InputField
                register={register(`questions.${index}.explanation`, {
                  required: {
                    value: true,
                    message: "Please enter the Explanation",
                  },
                })}
                labelText={"Explanation"}
                placeholder={"Enter the Explanation"}
                name={`questions.${index}.explanation`}
                error={errors.questions?.[index]?.explanation}
              />
            </OneSetFieldContainer>
          );
        })}
      </div>
    </AddQuestionStyle>
  );
};
export default AddQuestionForm;
