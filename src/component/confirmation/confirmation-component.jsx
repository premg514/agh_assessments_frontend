import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import {
  ModalButton,
  ModalButtons,
  ModalContent,
  ModalOverlay,
  ModalText,
  ModalTitle,
  ModalCrossButton,
} from "../../styles/modal.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
const ConfirmationComponent = ({
  title,
  detail,
  onClick,
  handleClickCancel,
  children,
  confirmDisabled = false,
  confirmLabel = "Submit",
}) => {
  const { setPopupbox, loading } = useContext(AppContext);
  return (
    <ModalOverlay>
      <ModalCrossButton
        onClick={() => {
          handleClickCancel ? handleClickCancel() : setPopupbox(false);
        }}
      >
        <FontAwesomeIcon size="lg" icon={faXmark} className="icon" />
      </ModalCrossButton>
      <ModalContent>
        <ModalTitle>{title ? title : "Confirmation"}</ModalTitle>
        <ModalText>{detail}</ModalText>
        {children}
        <ModalButtons>
          <ModalButton
            theme={{
              buttonBackground: "#f44336",
              buttonText: "#fff",
            }}
            disabled={loading}
            // because handleClickCancel is not passed from every use of comfimation component.
            onClick={() => {
              handleClickCancel ? handleClickCancel() : setPopupbox(false);
            }}
          >
            Cancel
          </ModalButton>
          <ModalButton
            theme={{
              buttonBackground: "#4caf50",
              buttonText: "#fff",
            }}
            disabled={loading || confirmDisabled}
            onClick={onClick}
          >
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : confirmLabel}
          </ModalButton>
        </ModalButtons>
      </ModalContent>
    </ModalOverlay>
  );
};
export default ConfirmationComponent;
