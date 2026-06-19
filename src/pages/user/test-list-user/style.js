import styled from "styled-components";














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




