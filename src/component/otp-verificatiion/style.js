import styled from "styled-components";
export const OtpPageStyle = styled.div`
  display: flex;
  justify-content: center;

  .container {
    width: 90%;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  h2 {
    color: ${({ theme }) => theme.text.secondary};
    font-size: 24px;
    font-weight: 500;
  }
  .form__element {
    display: flex;
    flex-direction: column;
    gap: 28px;
    border-radius: 8px;
    padding: 15px;
    border: 1px solid ${({ theme }) => theme.border.secondary};
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
    border: 1px solid ${({ theme }) => theme.border.secondary};
    background-color: ${({ theme }) => theme.body.primary.base};
    color: ${({ theme }) => theme.text.primary};
    filter: drop-shadow(0 1px 2px 0px rgba(16, 24, 40, 0.5));

    &:focus {
      outline: 2px solid #5bdcc6;
    }
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
      width: 2.5rem !important;
      height: 2.5rem !important;
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
