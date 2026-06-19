import styled from "styled-components";





// Checkbox
const Checkbox = styled.input`
  width: 16px;
  height: 16px;
`;

// Problem Title


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


