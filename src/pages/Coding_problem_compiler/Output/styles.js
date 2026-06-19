// TestCases.styles.jsx
import styled from "styled-components";

export const Wrapper = styled.div`
  border-radius: 0.5rem;
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
  gap: 0;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.border.primary};
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  flex-shrink: 0;
  width: 100%;
  box-sizing: border-box;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none; 
  }

  & > div {
    display: flex;
    align-items: center;
    min-width: max-content;
    flex-wrap: nowrap;
  }

  @media (min-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
  }
`;

export const ContantContainer = styled.div`
  padding: 0.5rem;
  overflow: auto;
  height: 100%;
`;

export const TabButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  border: none;
  background-color: ${({ theme }) => theme.body.primary.base};
  padding: 0 0.5rem 0.25rem;
  border-bottom: ${(props) =>
    props.active ? `2px solid ${props.theme.text.primary}` : "none"};
  color: ${(props) => (props.active ? props.theme.text.primary : "#9ca3af")};
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;

  svg {
    font-size: 0.875em;
  }

  @media (min-width: 768px) {
    display: inline-flex;
  }
`;

export const TabDivider = styled.span`
  margin: 0 0.5rem;
  color: #374151;
  display: inline;
`;

export const TestCaseBox = styled.div`
  background: ${({ theme }) => theme.body.secondary.base};
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
  color: ${({ theme }) => theme.text.secondary};
  resize: vertical;
  min-height: 90px;
  width: 100%;
`;

// test cases count























// simple display output style

// Styled Components
export const TestCaseContainer = styled.div`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
`;

export const ResultHeader = styled.h2`
  font-size: 18px;
  color: ${({ theme }) => theme.text.secondary};

  span {
    color: ${(props) => {
      const status = props.status?.toLowerCase();
      if (status?.includes("accepted") || status?.includes("success"))
        return "#28a745";
      if (status?.includes("wrong") || status?.includes("error"))
        return "#dc3545";
      return "#fd7e14";
    }};
    font-weight: 700;
  }
`;

export const OutputText = styled.pre`
  border: 1px solid ${({ theme }) => theme.border.secondary};
  border-radius: 4px;
  padding: 12px;
  margin: 0 0 16px 0;
  font-size: 13px;
  line-height: 1.4;
  color: ${({ theme }) => theme.text.secondary};
  white-space: pre-wrap;
  overflow-x: auto;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.text.secondary};
  font-style: italic;
  padding: 40px 20px;
  border-radius: 6px;
`;
