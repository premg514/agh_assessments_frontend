import React, { useState, useEffect, useRef } from "react";
import { BsStopwatch } from "react-icons/bs";
import { Button } from "../../../user/login/user-login-style";
import {
  pulse,
  NavbarContainer,
  Title,
  TimerContainer,
  TimerMobileContainer,
  TimerText,
} from "./TopSection.styles";

// const Navbar = ({ category, timeRemaining, handleSubmitClick }) => {
//   const formatTime = (seconds) => {
//     const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
//     const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
//     const s = String(seconds % 60).padStart(2, "0");
//     return `${h}H : ${m}M : ${s}S`;
//   };

//   const isWarning = timeRemaining <= 5 * 60;

//   return (
//     <>
//       <NavbarContainer>
//         <Title>{category}</Title>

//         <TimerContainer>
//           <BsStopwatch style={{ fontSize: "1.25rem", marginRight: "0.5rem" }} />
//           <TimerText warning={isWarning}>{formatTime(timeRemaining)}</TimerText>
//         </TimerContainer>

//         <Button onClick={handleSubmitClick} $primary className="w-fit">
//           Submit
//         </Button>
//       </NavbarContainer>

//       <TimerMobileContainer>
//         <BsStopwatch style={{ fontSize: "1.25rem", marginRight: "0.5rem" }} />
//         <TimerText warning={isWarning}>{formatTime(timeRemaining)}</TimerText>
//       </TimerMobileContainer>
//     </>
//   );
// };
const Navbar = ({
  category,
  timeRemaining,
  handleSubmitClick,
  submitLabel,
}) => {
  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}H : ${m}M : ${s}S`;
  };

  const isWarning = timeRemaining <= 5 * 60;

  return (
    <>
      <NavbarContainer>
        <Title>{category}</Title>

        <TimerContainer>
          <BsStopwatch style={{ fontSize: "1.25rem", marginRight: "0.5rem" }} />
          <TimerText warning={isWarning}>{formatTime(timeRemaining)}</TimerText>
        </TimerContainer>

        <Button onClick={handleSubmitClick} $primary className="w-fit">
          {submitLabel || "Submit"} {/* FIXED */}
        </Button>
      </NavbarContainer>

      <TimerMobileContainer>
        <BsStopwatch style={{ fontSize: "1.25rem", marginRight: "0.5rem" }} />
        <TimerText warning={isWarning}>{formatTime(timeRemaining)}</TimerText>
      </TimerMobileContainer>
    </>
  );
};
export default Navbar;
