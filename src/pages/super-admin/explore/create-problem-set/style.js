import styled from "styled-components";

// Define breakpoints for responsive design
const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  laptop: "1024px",
};

export const FormContainer = styled.form`
  width: 100%;
  padding: 0;
  max-width: 600px;
  margin: 100px auto 0 auto;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 0 10px;
  }
`;

export const FormHeading = styled.h2`
  font-size: 32px;
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: 25px;
  font-weight: 500;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 28px;
    margin-bottom: 20px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 15px;
  }

  .checkbox_container {
    display: flex;
    gap: 1rem;
    align-items: center;

     label {
      margin-bottom: 0 !important;
    }
  }
`;

export const StyledLabel = styled.label`
  display: block;
  font-size: 16px;
  color: ${({ theme }) => theme.text.secondary};
  margin-bottom: 10px;
  font-weight: 500;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
    margin-bottom: 8px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.border.primary};
  border-radius: 4px;
  font-size: 15px;
  transition: border 0.3s ease;
  background-color: ${({ theme }) => theme.body.secondary.base};
  color: ${({ theme }) => theme.text.primary};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #aaa;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px;
    font-size: 14px;
  }
`;

export const ImageUploadContainer = styled.div`
  border: 2px dashed
    ${(props) =>
      props.$active === "true" ? "#ff3a5c" : props.theme.border.primary};
  border-radius: 4px;
  padding: 20px;
  min-height: 240px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${(props) =>
    props.$active === "true"
      ? "rgba(255, 58, 92, 0.05)"
      : props.theme.body.secondary.base};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  &:hover {
    border-color: #ff3a5c;
    background-color: rgba(255, 58, 92, 0.05);
  }
`;

export const UploadIcon = styled.div`
  font-size: 30px;
  color: ${({ theme }) => theme.text.secondary};
  margin-bottom: 10px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 24px;
    margin-bottom: 8px;
  }
`;

export const UploadText = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text.secondary};
  margin-bottom: 5px;
  font-weight: 500;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
    margin-bottom: 3px;
  }
`;

export const UploadNote = styled.div`
  font-size: 14px;
  color: #999;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
  }
`;

export const ErrorMessage = styled.p`
  color: #ff3a5c;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 0;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 20px;
    flex-direction: ${(props) =>
      props.$stackButtons ? "column-reverse" : "row"};
    gap: ${(props) => (props.$stackButtons ? "10px" : "0")};
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &.next {
    color: white;
    background-color: #fc2947;
    &:hover {
      background-color: #e62e50;
    }
  }

  &.back {
    color: #313131;
    background-color: #f2f2f2;
    &:hover {
      background-color: #f5f5f5;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px 16px;
    font-size: 14px;
    width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
    justify-content: center;
  }
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const InputRemoveButton = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
`;

export const RemoveIconButton = styled.button`
  background: transparent;
  border: none;
  color: #ff3a5c;
  cursor: pointer;
  padding: 3px 8px;
  display: flex;
  align-items: center;

  &:hover {
    color: #e62e50;
  }
`;

export const StyledAddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 15px;
  font-size: 15px;
  color: white;
  background-color: #0d6efd;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: auto;
  font-weight: 500;

  &:hover {
    background-color: #0b5ed7;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 7px 12px;
    font-size: 14px;
    width: 100%;
    margin-left: 0;
  }
`;

export const ImagePreviewContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  border-radius: 4px;
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

export const ImagePreview = styled.img`
  width: 100%;
  object-fit: contain;
  display: block;
  border-radius: 4px;
`;

export const DeleteImageButton = styled.button`
  background: ${({ theme }) => theme.body.primary.base};
  border: none;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff3a5c;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;
