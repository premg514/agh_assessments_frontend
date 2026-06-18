import styled, { css } from "styled-components";
export const FooterWrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.body.primary.base};
`;

export const QuestionList = styled.ul`
  display: flex;
  overflow-x: auto;
  gap: 0.5rem; /* gap-2 */
  align-items: center;
  list-style-type: none;

  /* hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
`;

export const QuestionItem = styled.li``;
