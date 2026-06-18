// TestCases.styles.jsx
import styled from "styled-components";

export const Wrapper = styled.div`
  border-radius: 0.5rem;
  box-shadow: var(--tw-shadow);
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.border.primary};

  .output__window {
    transition: transform 0.2s ease-out;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    gap: 10px;
    padding: 1rem;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  border-bottom: 1px solid #e5e7eb;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;

  @media (min-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
  }
`;

export const TabButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 0 0.5rem 0.25rem;
  border-bottom: ${(props) => (props.active ? "2px solid #374151" : "none")};
  color: ${(props) => (props.active ? props.theme.text.primary : "#9ca3af")};

  @media (min-width: 768px) {
    display: inline;
  }
`;

export const TabDivider = styled.span`
  margin: 0 0.5rem;
  color: #374151;
  display: none;

  @media (min-width: 768px) {
    display: inline;
  }
`;

export const TestCaseBox = styled.div`
  background: ${({ theme }) => theme.body.primary.base};
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    padding: 1.25rem;
  }
`;

export const Label = styled.div`
  font-weight: 500;
  font-size: 0.875rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

export const TextArea = styled.textarea`
  background: ${({ theme }) => theme.body.secondary.base};
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.text.primary};
  resize: vertical;
  min-height: 90px;
`;

// test cases count

export const OutputContainer = styled.div`
  border-radius: 8px;
  transition: all 0.2s ease;
`;

export const CompileOutput = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  padding: 12px 16px;
  color: #856404;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  overflow-x: auto;

  &:empty::before {
    content: "No compilation output";
    color: #6c757d;
    font-style: italic;
  }
`;

export const TestCasesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TestCasesHeading = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text.secondary};
  letter-spacing: -0.01em;
  margin-bottom: 4px;
`;

export const TestCasesResult = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
`;

export const PassedCount = styled.span`
  color: ${(props) => {
    const passed = parseInt(props.passed) || 0;
    const total = parseInt(props.total) || 0;

    if (passed === total && total > 0) return "#28a745"; // All passed - green
    if (passed > 0) return "#fd7e14"; // Some passed - orange
    return "#dc3545"; // None passed - red
  }};
`;

export const TotalCount = styled.span`
  color: #6c757d;
`;

export const Separator = styled.span`
  color: #dee2e6;
  font-weight: 500;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 8px;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: ${(props) => {
    const percentage = (props.passed / props.total) * 100;
    if (percentage === 100) return "linear-gradient(90deg, #28a745, #20c997)";
    if (percentage > 50) return "linear-gradient(90deg, #fd7e14, #ffc107)";
    return "linear-gradient(90deg, #dc3545, #e74c3c)";
  }};
  width: ${(props) => (props.passed / props.total) * 100}%;
  transition:
    width 0.3s ease,
    background 0.3s ease;
  border-radius: 3px;
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-left: 8px;

  ${(props) => {
    const passed = parseInt(props.passed) || 0;
    const total = parseInt(props.total) || 0;

    if (passed === total && total > 0) {
      return `
        background: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
      `;
    }
    if (passed > 0) {
      return `
        background: #fff3cd;
        color: #856404;
        border: 1px solid #ffeaa7;
      `;
    }
    return `
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    `;
  }}
`;

// simple display output style

// Styled Components
export const TestCaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
`;

export const ResultHeader = styled.h2`
  font-size: 18px;
  font-weight: 600;
  span {
    color: ${(props) => {
      const status = props.status?.toLowerCase();
      if (status?.includes("accepted") || status?.includes("success"))
        return "#28a745";
      if (status?.includes("wrong") || status?.includes("error"))
        return "#dc3545";
      return "#fd7e14";
    }};
    font-weight: 600;
  }
`;

export const OutputText = styled.pre`
  background: ${({ theme }) => theme.body.primary.base};
  border: 1px solid ${({ theme }) => theme.border.primary};
  border-radius: 4px;
  padding: 12px;
  margin: 0 0 16px 0;
  font-size: 13px;
  line-height: 1.4;
  white-space: pre-wrap;
  line-break: anywhere;
  overflow: auto;
  max-height: 300px;

  &:last-child {
    margin-bottom: 0;
  }

  & > span.more_chars {
    background: ${({ theme }) => theme.body.secondary.base};
    border-radius: 0.25rem;
    padding: 0.25rem 0.15rem;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  color: #656d76;
  font-style: italic;
  padding: 40px 20px;
  border-radius: 6px;
`;
