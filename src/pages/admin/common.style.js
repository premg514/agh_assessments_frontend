import styled from "styled-components";

export const TopTitleHeading = styled.h1`
  font-size: 1.35rem;
  color: ${({ theme }) => theme.text.primary};
  text-transform: capitalize;
  margin: 6px 0;

  &.text-center {
    text-align: center;
  }
`;

export const WarningText = styled.div`
  --gray-400: #98a2b3;
  --gray-500: #667085;
  --gray-700: #344054;
  --gray-900: #101828;
  --error-500: #ff3932;
  --success-700: #338213;
  color: var(--error-500);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  & p {
    font-size: 14px;
  }
`;
