import React, { useContext } from "react";

import Modal from "react-modal";
import { AppContext } from "../../context/AppContext";
const FlashoutPageComponent = ({ component }) => {
  const { popupbox } = useContext(AppContext);

  return (
    component !== null && (
      <Modal
        isOpen={popupbox}
        contentLabel="modal"
        clickOutsideToClose={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          },
          content: {
            position: "relative",
            inset: "0",
            border: "none",
            padding: 0,
            borderRadius: "1rem",
            overflow: "hidden",
          },
        }}
      >
        {component}
      </Modal>
    )
  );
};
export default FlashoutPageComponent;
