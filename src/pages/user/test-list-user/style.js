import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  transition: margin-left 300ms linear;

  /* @media screen and (min-width: 1280px) {
    &.open {
      margin-left: 350px;
    }
    &.close {
      // margin-left: 0px;
    }
    width: calc(95vw - 350px);
  } */
  .fullscreen-blocker {
    position: fixed;
    inset: 0;
    z-index: 999999;
    display: flex;
    align-items: center;
    justify-content: center;

    /* EVEN MORE TRANSPARENT */
    background: ${({ theme }) =>
      theme.mode === "dark"
        ? "rgba(0, 0, 0, 0.4)"
        : "rgba(255, 255, 255, 0.4)"};

    backdrop-filter: blur(3px);
  }

  .blocker-content {
    padding: 32px;
    border-radius: 14px;
    text-align: center;
    max-width: 520px;

    /* GLASS — VERY LIGHT */
    background: ${({ theme }) =>
      theme.mode === "dark"
        ? "rgba(20, 20, 20, 0.6)"
        : "rgba(255, 255, 255, 0.6)"};

    color: ${({ theme }) => (theme.mode === "dark" ? "#ffffff" : "#111111")};

    backdrop-filter: blur(10px);

    box-shadow: ${({ theme }) =>
      theme.mode === "dark"
        ? "0 6px 24px rgba(0,0,0,0.5)"
        : "0 6px 24px rgba(0,0,0,0.12)"};
  }

  .blocker-content p {
    margin-top: 12px;
    line-height: 1.6;
    color: ${({ theme }) => (theme.mode === "dark" ? "#e0e0e0" : "#444444")};
  }

  .blocker-content button {
    margin-top: 20px;
    padding: 12px 24px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 8px;

    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #ffffff;
  }

  .blocker-content button:hover {
    opacity: 0.9;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  flex-direction: column;
  display: flex;
`;

export const PassageSection = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #e9ecef;
`;

export const PassageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  color: #495057;
  margin-bottom: 15px;

  svg {
    color: #0d8bff;
  }
`;

export const PassageDescription = styled.p`
  color: #6c757d;
  font-size: 14px;
  margin-bottom: 15px;
  line-height: 1.6;
`;

export const PassageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 10px;
  color: #495057;

  svg {
    color: #0d8bff;
  }
`;
export const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  position: sticky;
  top: 0px;
  z-index: 100;

  & .icon {
    visibility: hidden;

    @media screen and (max-width: 920px) {
      visibility: visible;
    }
  }
`;

export const Button = styled.button`
  border: none;
  background-color: #fff;
  padding: 0.4rem 0.8rem;
  font-size: 18px;
  background-color: ${({ $bgColor }) => {
    return $bgColor ? $bgColor : "#0b5fff";
  }};
  color: white;
  border-radius: 4px;
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

  @media screen and (min-width: 640px) {
    font-size: 20px;
  }
`;

export const PreviewButtonStyle = styled.div`
  padding: 0.4rem 0.8rem;
  font-size: 16px;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background-color: ${({ theme }) => theme.body.primary.base};
  cursor: pointer;
  color: ${({ theme }) => theme.text.primary};
`;

export const TimerWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 4px;
  & > .timer {
    display: flex;
    align-items: center;

    & > .hour,
    .minutes,
    .seconds {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0rem 0.5rem;
      font-weight: 400;
      font-family: "Work Sans", sans-serif;

      & div {
        font-size: 22px;
        span {
          color: #000;
        }
      }

      @media screen and (min-width: 640px) {
      }
    }
  }
`;

export const Question = styled.div`
  padding: 0.625rem;
  /* font-size: 20px; */
  border: 2px solid ${({ theme }) => theme.border.primary};
  background-color: ${({ theme }) => theme.body.secondary.base};
  border-radius: 5px;

  .image__container {
    display: flex;
    justify-content: center;
    align-items: center;
    & > img {
      width: 95%;
      max-width: 400px;
      object-fit: contain;
    }
  }

  & > .textarea_input {
    width: 100%;
    border: none;
    resize: none;
    background-color: inherit;
    color: inherit;
    font-size: 16px;

    &:focus {
      outline: none;
    }
  }

  @media screen and (min-width: 640px) {
    padding: 1.25rem;
  }
`;

export const OptionsContainer = styled.div`
  display: grid;
  gap: 0.625rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

export const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.25rem 0rem;
  overflow-y: auto;
  flex-grow: 1;

  &.correct {
    border: 2px solid #02a486;
    background-color: #97f8c0;
  }

  &.wrong {
    border: 2px solid #db242d;
    background-color: #ff8383;
  }

  .image__container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    & > img {
      width: 90%;
      object-fit: contain;
    }
  }
`;

export const Explain = styled.div`
  border: 2px solid ${({ theme }) => theme.border.primary};
  border-radius: 5px;
  position: relative;
  margin-top: 1rem;

  & > div {
    font-size: 1.25rem;
    padding: 1.25rem;
    border-radius: 5px;
    position: absolute;
    background-color: #4d8eff;
    color: white;
    line-height: 0;
    transform: translateY(-50%);
    left: 1rem;
  }

  p {
    font-size: 1.125rem;
    margin-top: 0.5rem;
    padding: 1rem;
    width: 100%;
  }
`;

export const Option = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: flex-start;
  border: 2px solid ${({ theme }) => theme.border.secondary};
  background-color: ${({ theme }) => theme.body.secondary.base};
  border-radius: 5px;
  gap: 0.5rem;

  &.correct {
    border: 2px solid #02a486;
    background-color: #97f8c0;

    span {
      color: #02a486;
    }

    & > .option-char {
      background-color: #02a486;
      & > .icon {
        color: #fff;
      }
    }
  }

  &.wrong {
    border: 2px solid #db242d;
    background-color: #ff8383;

    span {
      color: #db242d;
    }

    & > .option-char {
      background-color: #db242d;
      & > .icon {
        color: #fff;
      }
    }
  }

  &:hover {
    cursor: pointer;
  }

  &.selected {
    border: 2px solid #0b5fff;
    background-color: #b1d8fc;

    span {
      color: #0b5fff;
    }

    & > .option-char {
      background-color: #0b5fff;
      & > .icon {
        color: #fff;
      }
    }
  }

  & > .option-char {
    aspect-ratio: 1/1;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.25rem;
    border-radius: 50%;
    color: black;
    background-color: #d9d9d9;

    & > .icon {
      width: 18px;
      height: 18px;
      aspect-ratio: 1/1;
      color: #0f0f0f;
    }
  }

  @media screen and (min-width: 640px) {
    padding: 1rem;
    & > .option-char {
      width: 28px;
      height: 28px;
      padding: 0.5rem;

      & > .icon {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.border.primary};
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  position: sticky;
  bottom: 0px;
  z-index: 100;

  & > .flex {
    display: flex;
    gap: 0.5rem;
    width: fit-content;

    @media screen and (min-width: 640px) {
      flex-direction: row;
      gap: 1rem;
    }
  }
`;

export const CheckBoxContainer = styled.div`
  border: 1px solid #cac7c7;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0 0.5rem;
  height: inherit;
  user-select: none;
  white-space: nowrap;
  &:hover > {
    cursor: pointer;
  }
`;

export const QuestionSummary = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem;
  align-items: center;

  &.padding-bottom-8 {
    padding-bottom: 0.5rem;
  }

  .highlighted {
    color: #0b5fff;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`;

export const SavingIndicator = styled.div`
  z-index: 1000;
  position: fixed;
  right: 20px;
  bottom: 60px;
  opacity: 0.8;
`;

export const AudioPlayer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;

  audio {
    width: 100%;
    max-width: 400px;
    border: 1px solid ${({ theme }) => theme.border.primary || "#ccc"};
    border-radius: 5px;
    outline: none;
  }
`;
