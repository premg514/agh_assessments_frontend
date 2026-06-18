import React from "react";
import styled from "styled-components";

const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  flex-grow: 1;
  max-width: 100px;
  text-align: center;
`;

const StepIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${({ isActive }) => (isActive ? "#3498db" : "#ccc")};
  color: #fff;
  border-radius: 50%;
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StepTitle = styled.div`
  font-size: 1em;
  color: ${({ theme }) => theme.text.primary};
`;

const StepValue = styled.div`
  font-size: 0.9em;
  color: #888;
  margin-top: 5px;
`;

const StepConnector = styled.div`
  flex: 1;
  height: 2px;
  background-color: ${({ isCompleted }) => (isCompleted ? "#3498db" : "#ccc")};
  margin: 0 10px;
`;

const Stepper = ({ stepperData, currentStep }) => {
  return (
    <StepperContainer>
      {stepperData.map((data, index) => (
        <React.Fragment key={index}>
          <Step>
            <StepIndicator isActive={index + 1 <= currentStep}>
              {data.value}
            </StepIndicator>
            <StepTitle>{data.title}</StepTitle>
            <StepValue>{data.description}</StepValue>
          </Step>
          {index + 1 < stepperData.length && (
            <StepConnector isCompleted={index + 1 < currentStep} />
          )}
        </React.Fragment>
      ))}
    </StepperContainer>
  );
};

export default Stepper;
