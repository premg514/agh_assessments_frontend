import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TimerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  background: #ffffff;

  cursor: pointer;
  font-weight: 500;
  color: #111827;

  transition: all 0.2s ease;

  &:active {
    transform: scale(0.98);
  }

  & > span {
    font-weight: 600;
  }
`;

const TimerText = styled.span`
  display: flex;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  justify-content: center;
  align-items: center;
  padding: 0.25rem;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  width: 60px;
  text-align: right;
  font-weight: 600;
  font-variant-numeric: tabular-nums;

  color: ${({ isWarning }) => (isWarning ? "#ef4444" : "#111827")};
`;

const AssessmentTimer = () => {
  const remaining = useSelector((state) => state.assessment.timer.remaining);
  const navigate = useNavigate();
  const { scheduledTestId } = useSelector((state) => state.assessment);
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  if (remaining <= 0) {
    return null;
  }

  return (
    <TimerButton
      className="work-sans-medium"
      onClick={() => navigate(`/agh-tests/instructions/${scheduledTestId}`)}
    >
      <span>AGH Assessment</span>

      <TimerText isWarning={remaining < 60 * 5}>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </TimerText>
    </TimerButton>
  );
};

export default AssessmentTimer;
