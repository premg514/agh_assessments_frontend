import styled from "styled-components";

export const ToggleButton = styled.button`
  position: relative;
  width: 60px;
  height: 32px;
  background-color: ${(props) => props.theme.body.primary.base};
  border: 2px solid ${(props) => props.theme.border.secondary};
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;

  &:active {
    transform: translateY(0);
  }
`;

export const ToggleCircle = styled.div`
  position: absolute;
  top: 2px;
  left: ${(props) => (props.isToggled ? "30px" : "2px")};
  width: 24px;
  height: 24px;
  background-color: #ffffff;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: ${(props) => (props.visible ? "rotate(0deg)" : "rotate(180deg)")};
`;
