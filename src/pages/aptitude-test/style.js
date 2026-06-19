import styled from "styled-components";










export const QuestionLableWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.body.primary.base};
  border: 1px solid ${({ theme }) => theme.border.primary};
  border-radius: 8px;
  gap: 10px;
  margin-top: 0.5rem;

  & > * {
    padding: 0.5rem;
  }

  .cross_icon_wrapper {
    border-left: 1px solid #ddd;
    border-radius: 0 8px 8px 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: red;
      & > * {
        color: white;
      }
    }
  }

  .label__style {
    font-size: 22px;
    font-weight: 500;
    @media (max-width: 920px) {
    }
  }
`;
