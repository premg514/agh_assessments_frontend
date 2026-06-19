import styled from "styled-components";



export const AddQuestionStyle = styled.div`
  .bulk__upload__element {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    @media (max-width: 1265px) {
    }
  }
  .button__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }
  .title {
    font-weight: 700;
    font-size: 20px;
    @media (max-width: 920px) {
      font-size: 12px;
    }
  }
  .form__box {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    position: relative;
    padding: 10px;
  }

  .class__three {
    grid-column: 1 / span 6;
    @media (max-width: 920px) {
      grid-column: 1 / span 6;
    }
  }

  .label__style {
    font-size: 22px;
    font-weight: 700;
    @media (max-width: 920px) {
    }
  }
  .question__title {
    font-size: 30px;
    font-weight: 700;
    @media (max-width: 920px) {
      font-size: 10px;
    }
  }
  .button__box {
    display: flex;
    align-items: center;
    margin-left: 0px;
    gap: 10px;
    @media (max-width: 920px) {
    }
  }
  .xmark__position {
    margin-left: auto;
    cursor: pointer;
    position: relative;
    top: -5px;
    &:hover {
      color: #fc2947;
    }
  }

  .fields_container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const OptionContainer = styled(OptionsContainer)`
  .icon__box {
    display: flex;
    align-items: center;
    gap: 10px;
    display: flex;
    justify-content: space-between;
    color: ${({ theme }) => theme.text.primary};
    background-color: ${({ theme }) => theme.body.primary.base};
    @media (max-width: 920px) {
      gap: 5px;
    }
  }
`;

export const OneSetFieldContainer = styled(OptionsContainer)``;
