import styled from "styled-components";

// ============ FULLSCREEN BLOCKER STYLES ============
export const FullscreenBlocker = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) =>
    theme.mode === "dark"
      ? "rgba(0, 0, 0, 0.95)"
      : "rgba(255, 255, 255, 0.95)"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000000;
  backdrop-filter: blur(10px);
`;

export const BlockerContent = styled.div`
  text-align: center;
  padding: 3rem 2.5rem;
  max-width: 600px;
  background: ${({ theme }) => (theme.mode === "dark" ? "#111" : "#ffffff")};
  color: ${({ theme }) => (theme.mode === "dark" ? "#ffffff" : "#111111")};
  box-shadow: ${({ theme }) =>
    theme.mode === "dark"
      ? "0 10px 40px rgba(0,0,0,0.8)"
      : "0 10px 40px rgba(0,0,0,0.15)"};
  border-radius: 16px;

  h2 {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 1.5rem 0;
    color: ${({ theme }) => (theme.mode === "dark" ? "#ffffff" : "#111111")};
    line-height: 1.3;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 0 0 2rem 0;
    color: ${({ theme }) => (theme.mode === "dark" ? "#dddddd" : "#444444")};
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    max-width: 90%;

    h2 {
      font-size: 1.5rem;
      margin-bottom: 1.25rem;
    }

    p {
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }
  }
`;

export const BlockerButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1.1rem 2.5rem;
  font-size: 1.15rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  display: inline-block;
  margin: 0 0 2rem 0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
`;

export const WarningText = styled.div`
  background: ${({ theme }) =>
    theme.mode === "dark"
      ? "rgba(255, 68, 68, 0.15)"
      : "rgba(255, 68, 68, 0.08)"};
  border: 2px solid #ff4444;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => (theme.mode === "dark" ? "#ffcccc" : "#aa0000")};
  margin: 0;

  strong {
    color: ${({ theme }) => (theme.mode === "dark" ? "#ff6666" : "#cc0000")};
    font-weight: 700;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.25rem;
    font-size: 0.9rem;
  }
`;

export const BlockerIcon = styled.div`
  font-size: 100px;
  margin-bottom: 24px;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.15);
      opacity: 0.7;
    }
  }

  @media (max-width: 768px) {
    font-size: 80px;
    margin-bottom: 20px;
  }
`;

export const BlockerTitle = styled.h1`
  font-size: 36px;
  margin: 0 0 1rem 0;
  color: #ff4444;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const BlockerMessage = styled.p`
  font-size: 20px;
  margin: 0 0 2rem 0;
  line-height: 1.6;
  color: ${({ theme }) => (theme.mode === "dark" ? "#dddddd" : "#444444")};

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const BlockerWarning = styled.div`
  background: ${({ theme }) =>
    theme.mode === "dark"
      ? "rgba(255, 68, 68, 0.15)"
      : "rgba(255, 68, 68, 0.08)"};
  border: 2px solid #ff4444;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  margin: 0 0 2rem 0;
  font-size: 18px;
  line-height: 1.5;
  color: ${({ theme }) => (theme.mode === "dark" ? "#ffcccc" : "#aa0000")};

  strong {
    color: ${({ theme }) => (theme.mode === "dark" ? "#ff6666" : "#cc0000")};
    font-weight: 700;
  }

  span {
    color: #ff4444;
    font-size: 24px;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.25rem;
    font-size: 16px;

    span {
      font-size: 20px;
    }
  }
`;

export const ReturnButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 18px 56px;
  font-size: 20px;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 30px rgba(102, 126, 234, 0.5);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 40px rgba(102, 126, 234, 0.7);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ViolationCount = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #ffaa00;
  font-weight: 700;

  span {
    color: #ff4444;
    font-size: 24px;
  }
`;

export const TimerWarning = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: #aaaaaa;
  font-style: italic;
`;

// ============ START TEST OVERLAY STYLES (UPDATED & IMPROVED) ============
export const StartTestContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999998; /* One less than FullscreenBlocker */
  backdrop-filter: blur(8px);
`;

export const StartTestCard = styled.div`
  background: white;
  padding: 50px;
  border-radius: 16px;
  text-align: center;
  max-width: 600px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  animation: slideIn 0.5s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  h2 {
    margin: 0 0 20px 0;
    color: #333;
    font-size: 28px;
    font-weight: bold;
  }

  p {
    margin: 0 0 30px 0;
    color: #666;
    line-height: 1.8;
    font-size: 16px;
  }

  small {
    display: block;
    margin-top: 10px;
    color: #f44336;
    font-size: 14px;
    font-weight: 600;
  }

  @media (max-width: 640px) {
    padding: 30px 20px;
    max-width: 90%;

    h2 {
      font-size: 24px;
    }

    p {
      font-size: 14px;
    }
  }
`;

export const StartTestButton = styled.button`
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
  border: none;
  padding: 18px 48px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: linear-gradient(135deg, #45a049 0%, #3d8b40 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(76, 175, 80, 0.5);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(76, 175, 80, 0.4);
  }

  @media (max-width: 640px) {
    padding: 16px 32px;
    font-size: 16px;
  }
`;

// ============ MAIN CONTAINER & LAYOUT STYLES ============
export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color:${({theme}) => theme.body.primary.base};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;

  /* ================= FULLSCREEN BLOCKER ================= */
  .fullscreen-blocker {
    position: fixed;
    inset: 0;
    z-index: 999999;
    display: flex;
    align-items: center;
    justify-content: center;

    /* EVEN MORE TRANSPARENT */
    background: ${({ theme }) =>
      theme.mode === "dark"
        ? "rgba(0, 0, 0, 0.4)"
        : "rgba(255, 255, 255, 0.4)"};

    backdrop-filter: blur(3px);
  }

  .blocker-content {
    padding: 32px;
    border-radius: 14px;
    text-align: center;
    max-width: 520px;

    /* GLASS — VERY LIGHT */
    background: ${({ theme }) =>
      theme.mode === "dark"
        ? "rgba(20, 20, 20, 0.6)"
        : "rgba(255, 255, 255, 0.6)"};

    color: ${({ theme }) => (theme.mode === "dark" ? "#ffffff" : "#111111")};

    backdrop-filter: blur(10px);

    box-shadow: ${({ theme }) =>
      theme.mode === "dark"
        ? "0 6px 24px rgba(0,0,0,0.5)"
        : "0 6px 24px rgba(0,0,0,0.12)"};
  }

  .blocker-content p {
    margin-top: 12px;
    line-height: 1.6;
    color: ${({ theme }) => (theme.mode === "dark" ? "#e0e0e0" : "#444444")};
  }

  .blocker-content button {
    margin-top: 20px;
    padding: 12px 24px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 8px;

    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #ffffff;
  }

  .blocker-content button:hover {
    opacity: 0.9;
  }
`;

export const MainSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  height: calc(100vh - 60px - 48px - 32px - 40px);
  flex: 1;

  @media (min-width: 768px) {
    height: calc(100vh - 60px - 48px - 32px);
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 0.4fr;
    height: 100vh;
  }
`;

export const MainSectionforAssessments = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  width: 100%;
  height: calc(100vh - 60px - 48px);
  overflow: hidden;
  flex: 1;

  @media (min-width: 768px) {
    height: calc(100vh - 60px);
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 0.3fr;
  }
`;

export const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow: hidden;
`;

export const QuestionContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow-y: auto;
  flex: 1;

  @media (min-width: 768px) {
    padding: 1rem;
  }

  /* Better scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const QuestionInfo = styled.p`
  font-family: monospace;
  color: #6b7280;
  font-size: 1.125rem;
  margin-bottom: 0.25rem;

  span {
    color: #10b981;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.border.primary};
  padding: 1rem;
  background-color: ${({ theme }) => theme.body.primary.base};
  flex-shrink: 0;

  @media (min-width: 768px) {
    padding: 1rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const FooterWrapper = styled.div`
  width: 100%;
  border-top: 1px solid #e5e7eb;
  padding: 1rem;
  position: sticky;
  bottom: 0;
  background-color: ${({ theme }) => theme.body.primary.base};

  @media (min-width: 768px) {
    padding: 1rem 2rem;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const SidebarWrapper = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    height: 100%;
    overflow-y: auto;
  }
`;

export const ToggleSidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  height: 100vh;
  overflow-y: auto;
  background-color: #e5e7eb;
  width: 100%;
  max-width: 400px;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);

  @media (min-width: 1024px) {
    display: none;
  }
`;

// ============ SAVING INDICATOR ============
export const SavingIndicator = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(76, 175, 80, 0.9);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
