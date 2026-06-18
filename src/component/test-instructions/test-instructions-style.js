import styled from "styled-components";
export const ChecklistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`;
export const ChecklistItem = styled.div`
  display: flex;
  //align-items: flex-start;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: ${(props) => (props.$checked ? "#f0fdf4" : "#f8fafc")};
  border: 2px solid ${(props) => (props.$checked ? "#22c55e" : "#e2e8f0")};
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: ${(props) => (props.$checked ? "#22c55e" : "#cbd5e0")};
  }

  &::after {
    content: "✓";
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%)
      scale(${(props) => (props.$checked ? "1" : "0")});
    font-size: 48px;
    color: rgba(34, 197, 94, 0.1);
    font-weight: bold;
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  @media (max-width: 768px) {
    padding: 16px;
    gap: 12px;
  }
`;

export const CustomCheckbox = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  flex-shrink: 0;

  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 2;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    border: 2px solid ${(props) => (props.$checked ? "#22c55e" : "#cbd5e0")};
    border-radius: 6px;
    background: ${(props) => (props.$checked ? "#22c55e" : "#ffffff")};
    transition: all 0.3s ease;
  }

  &::after {
    content: "✓";
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 14px;
    line-height: 1;
    transform: scale(${(props) => (props.$checked ? "1" : "0")});
    transition: transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }

  &:hover::before {
    border-color: #22c55e;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
  }
`;
export const Label = styled.label`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (props.$checked ? "#15803d" : "#334155")};
  line-height: 1.6;
  cursor: pointer;
  user-select: none;
  text-decoration: ${(props) => (props.$checked ? "line-through" : "none")};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 16px;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
  border-radius: 10px;
  transition: width 0.4s ease;
  width: ${(props) => props.$progress}%;
`;

export const ProgressText = styled.p`
  text-align: center;
  font-size: 14px;
  color: #64748b;
  margin-bottom: 16px;
  font-weight: 600;

  span {
    color: #22c55e;
  }
`;

export const WarningBox = styled.div`
  padding: 16px;
  background: #fef3c7;
  border: 2px solid #fbbf24;
  border-radius: 12px;
  margin-bottom: 24px;
  display: flex;
  gap: 12px;
  align-items: flex-start;

  &::before {
    content: "⚠️";
    font-size: 24px;
    flex-shrink: 0;
  }
`;

export const WarningText = styled.p`
  font-size: 14px;
  color: #92400e;
  line-height: 1.5;
  margin: 0;

  strong {
    font-weight: 700;
    color: #78350f;
  }
`;
export const TestInstructionsStyle = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 90%;
  padding-top: 20px;
  padding-bottom: 100px;

  strong {
    font-weight: 600;
  }

  .span__box {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  .test-container {
    padding: 5px 15px;
  }

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .back {
    border: none;
    color: ${({ theme }) => theme.text.primary};
    cursor: pointer;
    background-color: ${({ theme }) => theme.body.primary.base};
  }

  /* ✅ MAIN FLEX LAYOUT */
  .main-content {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
  }

  .image-section {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }

  .image-section img {
    width: 250px;
    max-width: 100%;
  }

  .info-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .test-title {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  .test-meta {
    display: flex;
    gap: 30px;
    font-size: 14px;
    font-weight: 400;
    color: #6b6b6b;
    margin-bottom: 20px;
  }

  .section {
  }

  .section h4 {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 600;
  }

  .section ul {
    padding-left: 20px;
    list-style: disc;
  }

  .section li {
    margin-bottom: 16px;
    line-height: 1.6;
    font-weight: 400;
  }

  .start-button {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
    padding: 20px 0;
  }

  .quiz-btn {
    background-color: #fc2947;
    color: white;
    border: none;
    font-size: 14px;
    border-radius: 8px;
    cursor: pointer;
    width: 197px;
    height: 42px;
  }

  .start_quiz_box {
    position: fixed;
    border-top: 1px solid ${({ theme }) => theme.border.primary};
    background-color: ${({ theme }) => theme.body.primary.base};
    display: flex;
    justify-content: flex-end;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    padding: 1rem;
  }

  .timer__box {
    display: flex;
    gap: 5px;
    align-items: center;
    color: rgb(255, 107, 39);
    font-weight: 600;
    font-size: 28px;
  }
  /* ✅ DESKTOP VIEW — IMAGE LEFT, CONTENT RIGHT */
  @media screen and (min-width: 768px) {
    .main-content {
      flex-direction: row;
      align-items: flex-start;
      gap: 40px;
    }

    .image-section {
      width: 45%;
      justify-content: flex-end;
      padding-right: 20px;
      margin-bottom: 0;
    }

    .image-section img {
      width: 100%;
      max-width: 500px;
      padding-top: 100px;
    }

    .info-section {
      width: 55%;
    }

    .start-button {
      justify-content: flex-start;
    }
  }
`;
