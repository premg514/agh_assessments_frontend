import React from "react";
import spiralLeft from "../../../assets/Spiral.png";
import school from "../../../assets/impact/school.png";
import books from "../../../assets/impact/books.png";
import bag from "../../../assets/impact/bag.png";
import people from "../../../assets/impact/people.png";

import {
  ImpactWrapper,
  SpiralDecorLeft,
  ImpactHeading,
  RedText,
  WrapDiv,
  ColorDiv,
  SectionHeading,
  SectionCount,
  IconSection,
} from "./Impact.styles";

const Impact = () => {
  return (
    <ImpactWrapper>
      <SpiralDecorLeft src={spiralLeft} alt="spiral" />
      <ImpactHeading>
        Impact at a <RedText>Glance</RedText>
      </ImpactHeading>

      <div>
        <WrapDiv>
          <ColorDiv className="pink">
            <div>
              <SectionHeading>Colleges</SectionHeading>
              <SectionCount>100+</SectionCount>
            </div>
            <IconSection loading={"lazy"} src={school} alt="Colleges" />
          </ColorDiv>
          <ColorDiv className="blue">
            <div>
              <SectionHeading>Students</SectionHeading>
              <SectionCount>1,00,000</SectionCount>
            </div>
            <IconSection loading={"lazy"} src={bag} alt="Students" />
          </ColorDiv>
        </WrapDiv>
        <br />
        <br />

        <WrapDiv>
          <ColorDiv className="green">
            <div>
              <SectionHeading>Study Materials</SectionHeading>
              <SectionCount>1000+</SectionCount>
            </div>
            <IconSection loading={"lazy"} src={books} alt="Study Materials" />
          </ColorDiv>
          <ColorDiv className="orange">
            <div>
              <SectionHeading>Professional Trainers</SectionHeading>
              <SectionCount>150</SectionCount>
            </div>
            <IconSection loading={"lazy"} src={people} alt="Professional Trainers" />
          </ColorDiv>
        </WrapDiv>
      </div>
      <br />
    </ImpactWrapper>
  );
};

export default Impact;
