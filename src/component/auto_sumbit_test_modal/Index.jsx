import React from "react";
import { TestAutoSubmitLoading } from "./style";

function TestAutoSubmitModal({ reason }) {
  return (
    <div
      style={{
        backgroundColor: "inherit",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "18px",
        textAlign: "center",
        padding: "1rem",
        maxWidth: "320px",
      }}
    >
      <TestAutoSubmitLoading />

      <h2 style={{ margin: 0 }}>Submitting Your Test</h2>

      <p style={{ opacity: 0.7 }}>
        {reason || "Time is up. Please wait while we securely submit your assessment."}
      </p>
    </div>
  );
}

export default TestAutoSubmitModal;
