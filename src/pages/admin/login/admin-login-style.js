import styled from "styled-components";
export const AdminLoginStyle = styled.div`
  --gray-400: #98a2b3;
  --gray-500: #667085;
  --gray-700: #344054;
  --gray-900: #101828;
  --error-500: #ff3932;
  --success-700: #338213;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    width: 95%;
    padding: 20px 0;

    &.max_w_380 {
      max-width: 380px;
      margin: 0 auto;
    }
  }

  .heading {
    font-size: 1.5rem;
    text-align: center;
    font-weight: 500;
    color: #4f5a6f;

    & > span.blue {
      color: #0b5fff;
    }
    & > span.red {
      color: #fc2947;
    }

    @media screen and (min-width: 768px) {
      font-size: 2rem;
    }
  }

  h1 {
    color: red;
  }
  .form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 1.25rem;
    border: 1px solid ${({ theme }) => theme.border.primary};
    border-radius: 5px;
    width: inherit;
    background-color: ${({ theme }) => theme.body.secondary.base};

    .gray {
      color: var(--gray-500);
    }
  }

  .form__container {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;

    @media screen and (min-width: 640px) {
      gap: 0.875rem;
    }
  }

  .forget_password {
    font-size: 12px;
    color: var(--gray-500);
    text-decoration: underline;
    text-underline-offset: 2px;
    text-transform: capitalize;
    width: fit-content;
    &:hover {
      color: #0b5fff;
      cursor: pointer;
    }
  }

  .warning__text {
    color: var(--error-500);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    & p {
      font-size: 14px;
    }
  }
  .button__style {
    font-weight: 700;
    font-size: 20px;
    border-radius: 15px;
    background-color: #ffd60a;
    min-height: 48px;
    @media (max-width: 920px) {
      font-size: 15px;
      width: 200px;
    }
  }

  .button_Container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .label_with_icon {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > .hide_show {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      width: 50px;

      &:hover {
        cursor: pointer;
      }

      & p {
        color: ${({ theme }) => theme.text.secondary};
        font-size: 0.75rem;
      }
    }
  }

  label {
    color: ${({ theme }) => theme.text.secondary};
    display: block;
    font-size: 1rem;
    font-weight: 500;
  }
`;

