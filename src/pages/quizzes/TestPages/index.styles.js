import styled from "styled-components";

// ============ FULLSCREEN BLOCKER STYLES ============
const FullscreenBlocker = styled.div`
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





















// ============ START TEST OVERLAY STYLES (UPDATED & IMPROVED) ============






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

