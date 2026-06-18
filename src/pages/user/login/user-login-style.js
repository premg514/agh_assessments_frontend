import styled, { css } from "styled-components";

export const UserLoginStyle = styled.div`
  --gray-400: #98a2b3;
  --gray-500: #667085;
  --gray-700: #344054;
  --gray-900: #101828;
  --error-500: #ff3932;
  --success-700: #338213;
  padding: 20px 0;

  &.max_w_380 {
    max-width: 380px;
    width: 95%;
    margin: 0 auto;
  }

  &.max_w_760 {
    max-width: 760px;
    width: 95%;
    margin: 0 auto;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .heading {
    font-size: 1.5rem;
    text-align: center;
    font-weight: 500;
    color: ${({ theme }) => theme.text.primary};

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

  .form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 1.25rem;
    border: 1px solid ${({ theme }) => theme.border.secondary};
    border-radius: 5px;
    width: inherit;
    background-color: ${({ theme }) => theme.body.secondary.base};

    .gray {
      color: var(--gray-500);
    }

    .green {
      color: var(--success-700);
    }

    & .phone_number_container {
      position: relative;
      z-index: 0;
    }

    & .two_column {
      display: grid;
      gap: 0.625rem;
      grid-template-columns: 1fr;
    }

    & .grid_layout {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 1fr 1fr 1fr;
      gap: 0.625rem;

      & > div:nth-child(1) {
        grid-row: 1;
        grid-column: span 2;
      }

      & > div:nth-child(2) {
        order: 1;
        grid-row: 3;
      }

      & div:nth-child(3) {
        grid-row: 2;
        grid-column: span 2;
      }

      & > div:nth-child(4) {
        order: 1;
        grid-row: 3;
      }
    }

    @media screen and (min-width: 640px) {
      & .two_column {
        grid-template-columns: 1fr 1fr;
      }

      & .grid_layout {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: 1fr 1fr;
        gap: 0.625rem;

        & > div:nth-child(1) {
          grid-row: 1;
          grid-column: span 3;
        }

        & > div:nth-child(2) {
          order: 0;
          grid-row: initial;
        }

        & div:nth-child(3) {
          grid-row: 2;
          grid-column: span 3;
        }

        & > div:nth-child(4) {
          order: 0;
          grid-row: initial;
        }
      }
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

  .input_container {
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
          color: ${({ theme }) => theme.text.primary};
          font-size: 0.75rem;
        }
      }
    }

    label {
      color: ${({ theme }) => theme.text.primary};
      font-size: 0.875rem;
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

export const Note = styled.p`
  font-size: 0.875rem;
  width: 95%;
  span {
    text-decoration: underline;
    text-underline-offset: 0.25rem;
    color: #1865e7;
    cursor: pointer;
  }
`;

export const Button = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "work sans";
  gap: 0.5rem;
  padding: 0.75rem;
  font-size: ${({ $fontSize }) => {
    return $fontSize ? `${$fontSize}` : "1rem";
  }};
  font-weight: 500;
  width: 100%;
  background-color: ${({ $primary, $bg_color }) => {
    if ($bg_color) {
      return $bg_color;
    }
    return $primary ? "#FC2947" : "#0b5fff";
  }};
  color: ${({ $color }) => {
    return $color ? $color : "#ffffff";
  }};
  border-radius: 4px;

  &.border_1px {
    border: 1px solid ${({ theme }) => theme.border.primary};
  }

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  &.w-fit {
    width: fit-content;
  }

  &.visible {
    visibility: visible;
  }

  &.invisible {
    visibility: hidden;
  }

  &.border-radius-full {
    border-radius: 100px;
  }

  &.aspect-square {
    height: 50px;
    aspect-ratio: 1 / 1;
  }

  @media screen and (min-width: 768px) {
    font-size: 1.125rem; // 20px
  }

  @media screen and (min-width: 1280px) {
    padding: 0.8rem 1.5rem; // 24px

    .group_add_button {
      background-color: red !important;
    }
  }
`;

export const InputContainerWithOutIcon = styled.div`
  position: relative;
  height: 100%;
  input,
  select,
  textarea {
    width: 100%;
    padding: 7.5px 0.5rem;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.border.primary};
    word-spacing: 16;
    position: relative;
    color: ${({ theme }) => theme.text.primary};
    box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
    background-color: ${({ theme }) => theme.body.primary.base};
    &:focus {
      outline: none;
    }
  }

  textarea {
    resize: vertical;
  }

  #mobile {
    padding-left: 95px;
  }

  &:disabled {
    opacity: 0.7;
  }
`;
//this one we can use for coding
export const InputContainerWithOutIconCode = styled.div`
  position: relative;
  height: 100%;

  input,
  select,
  textarea {
    width: 100%;
    padding: 0.625rem 0.875rem;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.border.secondary};
    word-spacing: 16;
    line-height: 1.5;
    position: relative;
    z-index: 1;
    color: ${({ theme }) => theme.text.primary};
    box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
    background-color: ${({ theme }) => theme.body.primary.base};
    &:focus {
      outline: none;
    }
    ${(props) =>
      props.$isRight &&
      css`
        padding: 0.625rem 2.1rem 0.625rem 0.875rem;
        box-shadow: none;
      `}
    &:focus {
      outline: none;
    }
  }

  textarea {
    resize: vertical;
  }

  #mobile {
    padding-left: 95px;
  }
  position: ${({ $isAbsolute }) => ($isAbsolute ? "absolute" : "relative")};

  ${(props) =>
    props.$isAbsolute &&
    css`
      width: 90px;
      z-index: 100;
      top: 1px;
      left: 1px;
      bottom: 1px;
    `}
`;
export const InputContainerWithIcon = styled.div`
  position: ${({ $isAbsolute }) => ($isAbsolute ? "absolute" : "relative")};
  overflow: hidden;

  input,
  select {
    width: 100%;
    padding: 7.5px 0.5rem 7.5px 2.1rem;
    border-radius: 5px;
    border: ${({ $isBorderNot, theme }) =>
      $isBorderNot ? "none" : `1px solid ${theme.border.primary}`};
    word-spacing: 16;
    position: relative;
    box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
    color: ${({ theme }) => theme.text.primary};
    z-index: ${({ $isAbsolute }) => ($isAbsolute ? 1 : 0)};
    background-color: ${({ theme }) => theme.body.primary.base};
    ${(props) =>
      props.$isRight &&
      css`
        padding: 7.5px 0.625rem 7.5px 0.875rem;
        box-shadow: none;
      `}
    &:focus {
      outline: none;
    }
  }

  input:disabled {
    cursor: not-allowed;
    opacity: 1; /* Optional: override default dimming */
  }

  & .icon {
    position: absolute;
    padding: 7.5px;
    top: 0;
    left: 2px;
    bottom: 0;
    color: var(--gray-400);

    ${(props) =>
      props.$isRight &&
      css`
        right: 0;
        background-color: transparent;
        z-index: 1;
      `}
  }

  ${(props) =>
    props.$isAbsolute &&
    css`
      width: 90px;
      top: 1px;
      left: 1px;
      bottom: 1px;
    `}
`;

export const PasswordErrors = styled.ul`
  display: grid;
  grid-row-gap: 0.5rem;
  grid-column-gap: 1rem;
  padding: 0.5rem;
  font-size: 14px;
  transform: translateX(10px);
  & > li {
  }

  @media screen and (min-width: 420px) {
    grid-template-columns: 1fr 1fr;
  }
`;
