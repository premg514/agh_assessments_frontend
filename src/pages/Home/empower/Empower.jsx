import React from "react";
import empower from "../../../assets/empower.png";
import spiral from "../../../assets/Spiral.png";
import {
  EmpowerWrapper,
  SpiralDecor,
  EmpowerMain,
  TextContainer,
  BigContent,
  RedText,
  SubContent,
  EmpowerImage,
} from "./Empower.styles";

const Empower = () => {
  return (
    <EmpowerWrapper>
      <SpiralDecor src={spiral} alt="spiral" />
      <div className="content_container">
        <EmpowerMain>
          <div>
            <EmpowerImage src={empower} alt="empower illustration" />
          </div>
          <TextContainer>
            <BigContent>
              Empower Your Learning Journey with{" "}
              <RedText>Personalized Courses</RedText> and Expert Support
            </BigContent>
            <SubContent>
              AGH LMS is dedicated to providing exceptional learning experiences
              tailored to your individual needs.
            </SubContent>
            <SubContent>
              Our platform offers personalized learning paths, expert support,
              and a vast library of courses to help you achieve your goals.
            </SubContent>
          </TextContainer>
        </EmpowerMain>
      </div>
    </EmpowerWrapper>
  );
};

export default Empower;
