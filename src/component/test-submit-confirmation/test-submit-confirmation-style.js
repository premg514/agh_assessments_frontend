import styled from "styled-components";
export const TestSubmitConfirmationStyle = styled.div`
  max-width: 400px;
  width: inherit;
  padding: 1rem;
  background-color: ${({ theme }) => theme.body.primary.base};
  .container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .detail__style {
    font-weight: 500;
    font-size: 20px;
    text-align: center;
  }

  p {
    font-size: 1.125rem;
    font-weight: 500;
  }

  .button__container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 5px;
  }
`;
