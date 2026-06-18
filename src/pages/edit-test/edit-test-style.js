import styled from "styled-components";

export const EditTestStyle = styled.div`
  .section__three {
    background: ${({ theme }) => theme.body.secondary.base};
    border-radius: 8px;
    padding: 20px;
    width: 60vw;
    max-width: 600px;
    height: 600px;
    overflow: auto;
    position: relative;

    .xmark {
      position: absolute;
      top: 15px;
      right: 20px;
      cursor: pointer;

      &:hover {
        color: #fc2947;
      }
    }

    .section__three__child {
      text-align: center;
      h2 {
        font-size: 1.5rem;
        color: ${({ theme }) => theme.text.primary};
        font-weight: 500;
      }
      h3 {
        font-size: 1.2rem;
        color: ${({ theme }) => theme.text.primary};
        font-weight: 500;
        margin-bottom: 20px;
        cursor: pointer;
      }
    }

    .answer__container {
      margin: 20px 0;

      h3 {
        font-size: 1rem;
        color: ${({ theme }) => theme.text.primary};
        font-weight: 500;
        margin: 0.25rem 0;
      }
    }

    .button__box {
      text-align: center;
      margin-top: 20px;

      button.button__style {
        background-color: #007bff;
        color: #fff;
        padding: 10px 20px;
        font-size: 1rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }

      button.button__style:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
      }

      button.button__style:hover {
        background-color: #0056b3;
      }
    }
  }
`;

export default EditTestStyle;
