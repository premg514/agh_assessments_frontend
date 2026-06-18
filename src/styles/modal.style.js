import styled from "styled-components";
export const ModalOverlay = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text.secondary};
  background-color: ${({ theme }) => theme.body.primary.base};
`;

export const ModalContent = styled.div`
  padding: 16px;
  max-width: 380px;
`;

export const ModalCrossButton = styled.button`
  border: none;
  align-self: flex-end;
  padding: 0.25rem;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 50px;
  right: 0.5rem;
  top: 0.5rem;

  & > .icon {
    color: ${({ theme }) => theme.text.primary};
  }
`;

export const ModalTitle = styled.h3`
  margin-top: 0;
  font-weight: 500;
  font-size: 1.25rem;
`;

export const ModalText = styled.p`
  margin: 10px 0 20px 0;
`;

export const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ModalButton = styled.button`
  padding: 8px 16px;
  margin-left: 8px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonText};
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
  }
`;
