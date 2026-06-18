import styled from "styled-components";

export const CompilerSectionContainer = styled.div`
  display: flex;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.border.secondary};
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 8px;

  .element__footer {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-shrink: 0; /* ✅ Prevent footer from shrinking */
    background-color: ${({ theme }) =>
      theme.body.secondary.base}; /* ✅ Add background */
  }

  .button__containers {
    display: flex;
    gap: 1rem;
    flex-shrink: 0; /* ✅ Prevent buttons from shrinking */
  }

  button {
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    border: none;
    font-weight: 500;
  }

  #button__two {
    border: 1px solid;
    background-color: white;
    color: black;
  }

  @media (max-width: 920px) {
    width: 100%;
    height: 100%; /* ✅ Keep full height */
    overflow: hidden; /* ✅ Changed from overflow-y: auto */

    .element__footer {
      padding: 0.75rem 0.5rem; /* ✅ More padding on mobile */
      flex-direction: column; /* ✅ Stack on mobile if needed */
      align-items: stretch;
      gap: 0.5rem;
      position: sticky; /* ✅ Make footer sticky */
      bottom: 0;
      z-index: 10;
      border-top: 1px solid ${({ theme }) => theme.border.secondary}; /* ✅ Add top border */
    }

    .button__containers {
      width: 100%; /* ✅ Full width on mobile */
      justify-content: space-between; /* ✅ Spread buttons */
      gap: 0.5rem;
    }

    button {
      flex: 1; /* ✅ Make buttons equal width */
      min-width: 0; /* ✅ Allow buttons to shrink if needed */
      padding: 10px 12px; /* ✅ Better touch targets */
    }
  }
`;

export const EditorContainer = styled.div`
  background-color: #18181b;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  min-height: 120px;
  height: auto;
  transition: height 0.1s ease-in-out;
`;

export const Header = styled.div`
  background-color: ${({ theme }) => theme.body.secondary.base};
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-bottom: none;
  align-items: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  flex-shrink: 0; /* ✅ Prevent header from shrinking */
`;

export const HeaderTitle = styled.span`
  color: #d4d4d8;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const IconButton = styled.button`
  color: #a1a1aa;
  background-color: transparent;
  transition: color 0.2s;
  &:hover {
    color: #e4e4e7;
  }
`;

export const ControlBar = styled.div`
  padding: 0.5rem 1rem;
  background-color: #18181b;
  border-bottom: 1px solid #27272a;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const EditorBody = styled.div`
  position: relative;
  flex: 1;
  min-height: 80px;
  max-height: 100%;
  overflow: auto;
  width: 100%;
`;

export const OverlayTextarea = styled.textarea`
  position: absolute;
  inset: 0;
  box-sizing: border-box;
  background-color: transparent;
  color: transparent;
  caret-color: white;
  font-family: monospace;
  padding: 1rem;
  outline: none;
  resize: none;
  z-index: 10;
  font-size: 15px;
`;

export const ActionButtons = styled.div`
  position: sticky;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 20;
  float: right;
`;

export const RunButton = styled.button`
  background-color: #00aa72;
  color: white;
  padding: 0.5rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  min-width: 44px;
  min-height: 44px;
  white-space: nowrap; /* ✅ Prevent text wrapping */

  &:hover {
    background-color: #16a34a;
  }

  &:disabled {
    background-color: #6b7280;
    cursor: not-allowed;
  }

  @media (max-width: 920px) {
    font-size: 14px; /* ✅ Slightly smaller text on mobile */
    padding: 0.5rem 0.75rem;
  }
`;

export const SubmitButton = styled.button`
  background-color: #00aa72;
  color: white;
  font-weight: 600;
  padding: 0.375rem 1rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  justify-content: center;
  white-space: nowrap; /* ✅ Prevent text wrapping */

  &:hover {
    background-color: #16a34a;
  }

  &:disabled {
    background-color: #6b7280;
    cursor: not-allowed;
  }

  .submit-label {
    display: none;
    @media (min-width: 768px) {
      display: inline;
    }
  }

  @media (max-width: 920px) {
    font-size: 14px; /* ✅ Slightly smaller text on mobile */
    padding: 0.5rem 0.75rem;
  }
`;

export const CompilerContainer = styled.div`
  border-bottom-left-radius: 8px;
  overflow: hidden;
  flex: 1; /* ✅ Allow it to grow and take available space */
  display: flex;
  flex-direction: column;
  min-height: 0; /* ✅ Important for flex children to scroll properly */
`;

export const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: monospace;
  font-size: 1.1rem;
  font-weight: 600;
  
  color: ${({ $isLight }) => ($isLight ? "#18181b" : "#d4d4d8")};
  background-color: ${({ $isLight }) => ($isLight ? "#ffffff" : "#18181b")};
  border: 1px solid ${({ theme }) => theme.border.secondary};
  
  padding: 4px 16px;
  border-radius: 8px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);

  .time-display {
    min-width: 80px;
    text-align: center;
    letter-spacing: 1px;
  }

  .timer-controls {
    gap: 0.25rem;
  }

  /* Style the buttons specifically inside the timer to look like controls */
  .timer-controls button {
    color: ${({ $isLight }) => ($isLight ? "#52525b" : "#a1a1aa")};
    border-radius: 4px;
    padding: 6px 10px;
    transition: all 0.2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: ${({ $isLight }) => ($isLight ? "#18181b" : "#ffffff")};
      background-color: ${({ $isLight }) => ($isLight ? "#e4e4e7" : "#3f3f46")};
    }
  }

  @media (max-width: 768px) {
    gap: 0.5rem;
    font-size: 0.9rem;
    padding: 4px 10px;
    
    .time-display {
      min-width: 65px;
    }
    
    .timer-controls button {
      padding: 4px 8px;
    }
  }
`;