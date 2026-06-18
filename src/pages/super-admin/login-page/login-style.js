import styled from "styled-components";
export const UserLoginStyle = styled.div`
  .container {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    align-items: center;
    background-color: #f0f2f5;
    padding: 40px;
    @media (max-width: 920px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 10px;
      gap: 20px;
    }
  }
  .image__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    @media (max-width: 920px) {
      align-items: center;
    }
  }
  .image__style {
    height: 106px;
    @media (max-width: 920px) {
    }
  }
  .sub__title {
    text-align: left;
    bottom: 70px;
    margin-left: 35px;
    max-width: 380px;
    font-weight: 700;
    font-size: 20px;
    @media (max-width: 920px) {
      text-align: center;
    }
  }
  h1 {
    color: red;
  }
  .form {
    display: flex;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    background-color: white;
    padding: 20px;

    border-radius: 8px;
    gap: 36px;

    @media (max-width: 920px) {
 
      order: 2;
      justify-content: center;
      align-items: center;
      padding: 15px;
    }
  }
  .class__one {
    grid-column: 1 / span 3;
    @media (max-width: 920px) {
      grid-column: 1 / span 6;
    }
  }
  .class__two {
    grid-column: 4 / span 3;
    @media (max-width: 920px) {
      grid-column: 1 / span 6;
    }
  }
  .class__three {
    grid-column: 1 / span 6;
    max-width: 300px;
    @media (max-width: 920px) {
      grid-column: 1 / span 6;
      width: 400px;
    }
  }
  .form__container {
    display: grid;
    grid-gap: 10px;

    @media (max-width: 920px) {
    }
  }
  .form__box {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding-top: 0px;
    position: relative;
    min-width: 360px;
    label {
      font-weight: 400;
      padding-top: 5px;
    }
    input {
      box-shadow: inset 0px -1px 0px rgba(255, 255, 255, 0.18);
      border: 1px solid #dddfe2;
      border-radius: 5px;
      padding: 20px 16px;
    }
    @media (max-width: 920px) {
      label {
      }
      input {
        box-shadow: inset 0px -1px 0px rgba(255, 255, 255, 0.18);
        border-radius: 8px;
        padding: 15px 8px 15px 8px;
      }
      min-width: 270px;
    }
  }
  .form__box input::placeholder {
    font-weight: 400 !important;
    color: grey !important;
    font-size: 16px !important;
  }

  .eye__container {
    position: absolute;
    left: 330px;
    top: 43px;
    @media (max-width: 920px) {
      left: 270px;
      top: 13px;
    }
  }
  .user__eye__container {
    position: absolute;
    left: 330px;
    top: 20px;
    @media (max-width: 920px) {
      left: 270px;
      top: 13px;
    }
  }
  .dot__box {
    font-weight: 700;
    color: red;
    font-size: 15px;
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
  .image__container {
    position: relative;
    @media (max-width: 920px) {
    }
  }
  .background__image {
    width: 500px;
    height: 504px;
    @media (max-width: 920px) {
      width: 270px;
      height: 240px;
    }
  }
  .student__image {
    width: 500px;
    height: 504px;
    position: absolute;
    left: -12px;
    top: -12px;
    @media (max-width: 920px) {
      width: 270px;
      height: 240px;
      left: -6px;
      top: -6px;
    }
  }
  .button__style {
    font-weight: 700;
    font-size: 20px;
    border-radius: 6px;
    border: 1.5px solid red;
    background-color: #ffffff;
    color: red;
    min-height: 48px;
    min-width: 360px;
    @media (max-width: 920px) {
      font-size: 15px;
      min-width: 300px;
    }
  }
  .button__style__two {
    cursor: pointer;
    width: 160px;
    border: 1px solid red;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    font-weight: 700;
    background-color: white;
    color: red;
    padding: 15px 0px 15px 0px;
    @media (max-width: 920px) {
    }
  }
`;
