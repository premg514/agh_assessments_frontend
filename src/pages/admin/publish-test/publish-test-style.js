import styled from "styled-components";
export const PublishTestStyle = styled.div`
  padding: 10px;
  overflow-y: auto;
  max-width: 700px;
  width: 80vw;
  max-height: 600px;
  min-height:300px;
  position: relative;
  background-color: ${({ theme }) => theme.body.secondary.base};

  .xmark_position {
    position: absolute;
    right: 20px;
    top: 15px;
    cursor: pointer;

    &:hover {
      color: #fc2947;
    }
  }

  .container {
    padding: 20px;
    @media (max-width: 920px) {
      padding: 10px;
    }
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
    gap: 0.5rem;
    position: relative;
  }

  .options {
    margin-left: 20px;
    @media (max-width: 920px) {
      margin-left: 10px;
    }
  }
  .class__three {
    grid-column: 1 / span 6;
    @media (max-width: 920px) {
      grid-column: 1 / span 6;
    }
  }
  .icon__box {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    margin-bottom: 10px;
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
`;
