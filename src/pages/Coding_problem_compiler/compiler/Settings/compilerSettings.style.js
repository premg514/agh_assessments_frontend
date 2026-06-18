import styled from "styled-components";

// Close Button
export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(239, 68, 68, 0.8);
    border-color: #ef4444;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Settings Container
export const SettingsContainer = styled.div`
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border-radius: 4px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  color: #fff;
  min-width: 400px;
  max-width: 500px;
  position: relative;
  animation: slideUp 0.3s ease-out;
  overflow: hidden;

  @media (max-width: 480px) {
    min-width: 90vw;
    margin: 0 10px;
  }
`;

// Settings Title
export const SettingsTitle = styled.div`
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  padding: 20px 25px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: #fff;
  letter-spacing: 0.5px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
`;

// Settings Element Container
export const SettingsElement = styled.div`
  padding: 25px;
  overflow: hidden;
`;

// Tab Navigation
export const SettingsItem = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  margin-bottom: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

// Tab Button
export const SettingsSection = styled.button`
  flex: 1;
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
      : "transparent"};
  border: none;
  padding: 12px 20px;
  color: ${(props) => (props.active ? "#fff" : "#94a3b8")};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;

  &:hover {
    background: ${(props) =>
      props.active
        ? "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)"
        : "rgba(255, 255, 255, 0.1)"};
    color: #fff;
  }

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    right: 0;
    top: 20%;
    height: 60%;
    width: 1px;
    background: rgba(255, 255, 255, 0.2);
  }
`;

// Options List Container
export const OptionsListContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;

    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }
`;

// Option Item
export const OptionItem = styled.div`
  padding: 12px 16px;
  margin: 8px 0;
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
      : "rgba(255, 255, 255, 0.05)"};
  border: 1px solid
    ${(props) => (props.active ? "#10b981" : "rgba(255, 255, 255, 0.1)")};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  color: ${(props) => (props.active ? "#fff" : "#cbd5e1")};
  position: relative;

  &:hover {
    background: ${(props) =>
      props.active
        ? "linear-gradient(135deg, #059669 0%, #047857 100%)"
        : "rgba(255, 255, 255, 0.1)"};
    border-color: ${(props) =>
      props.active ? "#059669" : "rgba(255, 255, 255, 0.3)"};
    color: #fff;
  }

  ${(props) =>
    props.active &&
    `
    &::before {
      content: '✓';
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      font-weight: bold;
      color: #fff;
    }
  `}
`;
