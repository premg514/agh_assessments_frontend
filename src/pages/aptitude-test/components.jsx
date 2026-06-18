import {
  InputContainerWithIcon,
  InputContainerWithOutIcon,
  InputContainerWithOutIconCode,
} from "../user/login/user-login-style";
import { InputWrapper } from "../admin/login/admin-login-style";
import { OptionContainer } from "../add-question/add-question-style";
import { WarningText } from "../admin/common.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faAngleDown,
  faXmark,
  faCircleExclamation,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { QuestionLableWrapper } from "./style";
import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Controller } from "react-hook-form";

export const QuestionHeader = ({
  index,
  handleDelete,
  heading,
  arrayFields,
}) => (
  <QuestionLableWrapper>
    <div className="label__style">
      {`${heading} ${index + 1}`}
      <span className="dot__box">*</span>
    </div>

    <div className="cross_icon_wrapper" onClick={() => handleDelete(index)}>
      <FontAwesomeIcon icon={faXmark} size="xl" />
    </div>
  </QuestionLableWrapper>
);
export const TextField = ({
  index,
  label,
  placeholder,
  fieldName,
  register,
  error,
  errorMessage,
  prefix,
  onButtonClick,
  buttonLabel = "Verify",
  codingQuestion,
  checkVerified,
  onChangeHandle,
  testtypeCodingQuestion,
}) => {
  const { onChange: reactHookFormOnChange, ...restRegisterProps } = register(
    `${prefix}.${index}.${fieldName}`,
    {
      required: true,
    }
  );
  const handleChange = useCallback(
    (e) => {
      reactHookFormOnChange(e);
      if (testtypeCodingQuestion === "true") {
        onChangeHandle?.(e);
      }
    },
    [reactHookFormOnChange, onChangeHandle]
  );

  return (
    <InputWrapper>
      <label htmlFor={`${prefix}.${index}.${fieldName}`}>
        {label}
        <span className="dot__box">*</span>
        {codingQuestion === "true" && checkVerified === true && (
          <FontAwesomeIcon
            icon={faCheckCircle}
            style={{ color: "green", fontSize: "20px", marginLeft: "10px" }}
          />
        )}
      </label>
      <InputContainerWithOutIconCode>
        <textarea
          id={`${prefix}.${index}.${fieldName}`}
          placeholder={placeholder}
          onChange={handleChange}
          {...restRegisterProps}
        ></textarea>
      </InputContainerWithOutIconCode>
      {codingQuestion === "true" && (
        <button
          type="button"
          onClick={onButtonClick}
          style={{
            marginTop: "8px",
            padding: "6px 12px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {buttonLabel}
        </button>
      )}
      {error && (
        <WarningText>
          <p>{errorMessage}</p>
        </WarningText>
      )}
    </InputWrapper>
  );
};

export const SelectField = ({
  index,
  label,
  fieldName,
  options,
  register,
  error,
  errorMessage,
  prefix,
}) => (
  <InputWrapper>
    <label htmlFor={`${prefix}.${index}.${fieldName}`}>{label}</label>
    <InputContainerWithIcon $isRight>
      <select
        id={`${prefix}.${index}.${fieldName}`}
        {...register(`${prefix}.${index}.${fieldName}`, { required: true })}
      >
        <option value="" hidden disabled>
          Select difficulty
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </InputContainerWithIcon>
    {error && (
      <WarningText>
        <p>{errorMessage}</p>
      </WarningText>
    )}
  </InputWrapper>
);

export const OptionField = ({
  questionIndex,
  optionIndex,
  register,
  errors,
  handleDeleteOption,
  name,
  iName,
  control,
  prefix,
}) => (
  <OptionContainer>
    <div className="icon__box">
      <label htmlFor={name}>{`Option ${optionIndex + 1}`}</label>
      {optionIndex > 1 && (
        <FontAwesomeIcon
          icon={faCircleXmark}
          color="red"
          size="xl"
          onClick={() => handleDeleteOption(questionIndex, optionIndex)}
        />
      )}
    </div>
    <InputContainerWithOutIcon>
      <input
        type="text"
        id={name}
        placeholder="Enter the Option"
        {...register(name, {
          required: true,
        })}
      />
    </InputContainerWithOutIcon>
    {errors && (
      <WarningText>
        <FontAwesomeIcon icon={faCircleExclamation} />
        <p>Please enter the Option</p>
      </WarningText>
    )}
    <Controller
      name={iName}
      control={control}
      defaultValue={null}
      render={({ field: { onChange, onBlur, value } }) => (
        <ImageDropzone onChange={onChange} onBlur={onBlur} value={value} />
      )}
    />
  </OptionContainer>
);
export const InputField = ({
  register,
  error,
  name,
  placeholder,
  labelText,
  style,
  onChange,
}) => {
  const { onChange: rhfOnChange, ...restRegister } = register;
  return (
    <InputWrapper>
      {labelText && <label htmlFor={name}>{labelText}</label>}
      <InputContainerWithOutIcon>
        <input
          type="text"
          id={name}
          placeholder={placeholder}
          {...restRegister}
          onChange={(e) => {
            rhfOnChange(e);
            onChange?.(e);
          }}
          style={style}
        />
      </InputContainerWithOutIcon>
      {error && (
        <WarningText>
          <p>{error?.message || "This field is required"}</p>
        </WarningText>
      )}
    </InputWrapper>
  );
};
export const TextFieldCode = ({
  register,
  error,
  name,
  placeholder,
  labelText,
  style,
  onChange,
}) => (
  <InputWrapper>
    {labelText && <label htmlFor={name}>{labelText}</label>}
    <InputContainerWithOutIcon>
      <textarea
        type="text"
        id={name}
        placeholder={placeholder}
        {...register}
        onChange={onChange}
        style={style}
      />
    </InputContainerWithOutIcon>
    {error && (
      <WarningText>
        <p>{error?.message || "This field is required"}</p>
      </WarningText>
    )}
  </InputWrapper>
);

const StyledDropzone = styled.div`
  border: 2px dashed ${({ theme }) => theme.border.primary};
  padding: 20px;
  text-align: center;
  cursor: pointer;
  color: #666666;
  background-color: ${({ theme }) => theme.body.primary.base};
`;

const StyledImagePreview = styled.img`
  margin-top: 10px;
  width: 100%;
  max-height: 220px;
  object-fit: contain;
`;

export function ImageDropzone({ onChange, onBlur, value }) {
  const [preview, setPreview] = useState(value);

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    onChange(null); // Clear the value in react-hook-form
    setPreview(null); // Clear the preview image
  };

  useEffect(() => {
    if (value && (value instanceof File || value instanceof Blob)) {
      const previewUrl = URL.createObjectURL(value);
      setPreview(previewUrl);
      return () => {
        URL.revokeObjectURL(previewUrl);
      };

    }

    if (typeof value === "string" && value.trim()) {
      setPreview(value);
      return undefined;
    }

    setPreview(null);
    return undefined;
  }, [value]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/jpeg": [".jpeg", ".jpg"], "image/png": [".png"] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      onChange(file);
      onBlur();
      // Generate a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    },
  });

  return (
    <StyledDropzone {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here ...</p>
      ) : (
        <>
          {preview ? (
            <>
              <StyledImagePreview src={preview} alt="Preview" />
              <button
                type="button"
                className="remove-image-button"
                onClick={handleRemoveImage}
              >
                <FontAwesomeIcon icon={faX} />
              </button>
            </>
          ) : (
            <div className="upload-placeholder">
              <FiUpload className="upload-icon" />
              <p>
                Drag & Drop or Click to Upload Image <br />
                {"(accepted *.png and *.jpeg)"}
              </p>
            </div>
          )}
        </>
      )}
      {value && value?.name}
    </StyledDropzone>
  );
}
