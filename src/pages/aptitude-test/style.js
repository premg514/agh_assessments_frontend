import styled from "styled-components";
export const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: #007bff;
  color: white;
  gap: 0.5rem;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: fit-content;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }

  &.primary {
    background-color: #fc2947;
  }

  span {
    font-weight: 500;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 95%;
  padding: 10px;
`;

export const FancyDropdown = styled.select`
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: linear-gradient(to right, #f9f9f9, #ffffff);
  font-size: 14px;
  font-weight: 500;
  color: #333;
  appearance: none;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='14' viewBox='0 0 24 24' width='14' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 14px;

  &:hover {
    border-color: #999;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  }

  &:focus {
    outline: none;
    border-color: #4facfe;
    box-shadow: 0 0 0 2px rgba(79, 172, 254, 0.3);
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const OtpPageStyle = styled.div`
  display: flex;
  justify-content: center;
  padding: 3rem 0;

  .container {
    width: 90%;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    transform: translate(0, -10%);
    align-items: flex-start;
  }

  h2 {
    color: #4f5a6f;
    font-size: 24px;
    font-weight: 700;
  }
  .form__element {
    display: flex;
    flex-direction: column;
    gap: 28px;
    border-radius: 8px;
    padding: 15px;
    border: 1px solid #d0d5dd;
  }

  .otp-container {
    display: flex;
    align-items: center;
    align-self: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .description {
    font-size: 14px;

    & > span {
      color: #0b5fff;
    }
  }

  .otp-input {
    width: 2.5rem !important;
    height: 2.5rem !important;
    text-align: center;
    font-size: 18px;
    border-radius: 4px;
    border: 1px solid #d0d5dd;
    filter: drop-shadow(0 1px 2px 0px rgba(16, 24, 40, 0.5));

    &:focus {
      outline: 2px solid #5bdcc6;
    }
  }

  .button-container {
    display: flex;
    align-items: center;
    gap: 10px;
    align-self: flex-end;
  }

  button {
    --font-size-16: 16px;
    background-color: #333;
    font-size: var(--font-size-16);
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }

  .primary-btn {
    color: #fff;
    background-color: #fc2947;
    border: 1px solid #fc2947;
    letter-spacing: 1px;
  }

  .secondary-btn {
    color: #4f5a6f;
    background-color: #fbf9f9;
    border: 1px solid #d0d5dd;
    letter-spacing: 1px;
  }

  .resend-otp {
    all: unset;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;

    & > p {
      font-weight: 500;
      color: #0b5fff;
      text-decoration: underline;
      text-underline-offset: 2px;
      font-size: 14px;
    }
  }

  .resend-otp.disabled {
    pointer-events: none; /* Prevent clicks */
    opacity: 0.5; /* Dim the button */
  }

  @media screen and (min-width: 640px) {
    .container {
      gap: 24px;
      align-items: center;
      max-width: 420px;
    }

    h2 {
      font-size: 28px;
    }

    .form__element {
      gap: 24px;
    }

    .description {
      font-size: 16px;
    }

    .otp-input {
      width: 3rem !important;
      height: 3rem !important;
      font-size: 20px;
    }

    button {
      font-size: 18px;
      padding: 9px 18px;
    }

    .resend-otp {
      align-self: flex-start;
      & > p {
        font-size: 16px;
      }
    }
  }
`;
export const TestCreatePageStyle = styled.div`
  .container {
  }
  .title {
    font-weight: 500;
    font-size: 20px;
    @media (max-width: 920px) {
      font-size: 12px;
    }
  }
  .form__style {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 15px;
    @media (max-width: 920px) {
    }
  }

  .form__box {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .flex_box {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    & > * {
      flex-grow: 1;
    }

    @media screen and (min-width: 640px) {
      flex-direction: row;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }

  .questions_form_container {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;

    & .button_box {
      align-self: flex-end;
      display: flex;
      gap: 1rem;
    }
  }

  .questions_container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .button {
    display: flex;
    align-items: center;
    background-color: #007bff;
    color: white;
    gap: 0.5rem;
    padding: 10px 15px;
    margin-top: 0.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: fit-content;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }

    &:focus {
      outline: none;
    }

    &.primary {
      background-color: #fc2947;
    }

    span {
      font-weight: 500;
    }
  }
  .icon__box {
    display: flex;
    justify-content: space-between;
    background-color: #fafafa;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 0.5rem 0;
    padding: 0.5rem;
    gap: 10px;
    @media (max-width: 920px) {
      gap: 5px;
    }
  }

  .question__title {
    font-size: 30px;
    font-weight: 700;
    @media (max-width: 920px) {
      font-size: 10px;
    }
  }

  .warning__text {
    color: red;
    font-weight: 700;
    font-size: 15px;
    @media (max-width: 920px) {
      font-size: 9px;
    }
  }
`;
export const QuestionformContainerStyle = styled.div`
  .questions_form_container {
    padding: 20px;
    background: ${({ theme }) => theme.body.primary.base};
    border-radius: 8px;
  }

  .testcase_card {
    background: ${({ theme }) => theme.body.secondary.base};
    border: 1px solid ${({ theme }) => theme.border.primary};
    border-radius: 6px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .testcase_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .testcase_label {
    font-weight: bold;
    font-size: 16px;
  }

  .testcase_input_group {
    margin-bottom: 10px;
    // height: 100px;
  }

  .input_field {
    width: 100%;
    padding: 10px;
    background: ${({ theme }) => theme.body.primary.base};
    border: 1px solid ${({ theme }) => theme.border.primary};
    color: ${({ theme }) => theme.text.primary};
    border-radius: 4px;
    font-size: 14px;
  }

  .error_text {
    color: red;
    font-size: 12px;
    margin-top: 4px;
    display: block;
  }

  .button_box {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 20px;
  }

  .primary_button {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 14px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
  }

  .primary_button:hover {
    background-color: #0056b3;
  }

  .delete_button {
    background: #dc3545;
    color: white;
    border: none;
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
  }

  .delete_button:hover {
    background: #c82333;
  }

  .cancel_button {
    background: #6c757d;
    color: white;
    border: none;
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 12px;
    margin-top: 8px;
    cursor: pointer;
  }

  .selected_file_info {
    margin-top: 12px;
    font-size: 14px;
  }
`;

export const QuestionLableWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.body.primary.base};
  border: 1px solid ${({ theme }) => theme.border.primary};
  border-radius: 8px;
  gap: 10px;
  margin-top: 0.5rem;

  & > * {
    padding: 0.5rem;
  }

  .cross_icon_wrapper {
    border-left: 1px solid #ddd;
    border-radius: 0 8px 8px 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: red;
      & > * {
        color: white;
      }
    }
  }

  .label__style {
    font-size: 22px;
    font-weight: 500;
    @media (max-width: 920px) {
    }
  }
`;
