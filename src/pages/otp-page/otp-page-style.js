import styled from "styled-components";
export const OtpPageStyle = styled.div`
  width: 100vw;
  min-height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;

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
    color: ${({ theme }) => theme.text.primary};
    font-size: 24px;
    font-weight: 700;
  }
  .form__element {
    display: flex;
    flex-direction: column;
    gap: 28px;
    border-radius: 8px;
    padding: 15px;
    background-color: ${({ theme }) => theme.body.secondary.base};
    border: 1px solid ${({ theme }) => theme.border.primary};
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
      background-color: ${({ theme }) => theme.body.primary.base};
      color: ${({ theme }) => theme.text.primary};
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
