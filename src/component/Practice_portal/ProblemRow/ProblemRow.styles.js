import styled from "styled-components";

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.border.primary};
  &.highlight {
    background-color: ${({ theme }) => theme.body.primary.active} !important;
  }
`;

export const TableCell = styled.td`
  padding: 12px 16px;

  &.title {
    width: 100%;
  }
`;

// Checkbox
export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
`;

// Problem Title
export const ProblemTitle = styled.span`
  color: ${({ theme }) => theme.link_sky_blue};
  line-clamp: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  max-width: 40ch;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// Difficulty Badge
export const DifficultyBadge = styled.div`
  display: inline-block;
  padding: 4px 0;
  margin-right: 10px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  width: 75px;
  text-align: center;
  color: ${({ difficulty }) =>
    difficulty === "Easy"
      ? "#2e7d32"
      : difficulty === "Medium"
      ? "#f57c00"
      : "#c62828"};

  background-color: ${({ difficulty }) =>
    difficulty === "Easy"
      ? "#e8f5e9"
      : difficulty === "Medium"
      ? "#fff3e0"
      : "#ffebee"};
`;

export const ActionSection = styled.div`
  display: flex;
  gap: 20px;

  & > button {
    background-color: inherit;
    border: none;
    color: #737375;
  }
`;
