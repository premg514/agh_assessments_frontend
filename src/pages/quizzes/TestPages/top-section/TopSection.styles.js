import styled, { keyframes, css } from "styled-components";

// 🔴 Animation for warning
export const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
`;

// 🔹 Navbar container
export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  height: 60px;
`;

// 🔹 Title
export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;

// 🔹 Timer container (desktop only)
export const TimerContainer = styled.div`
  display: none;
  align-items: center;

  @media (min-width: 768px) {
    display: flex;
  }
`;

// 🔹 Timer container (mobile only)
export const TimerMobileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

// 🔹 Timer text
export const TimerText = styled.h1`
  font-size: 1.25rem;
  font-family: monospace;

  ${({ warning }) =>
    warning &&
    css`
      color: #dc2626; /* red-600 */
      animation: ${pulse} 1s infinite;
    `}
`;
