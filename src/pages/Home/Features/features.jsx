import React, { forwardRef } from "react";
import {
  UnveilSection,
  RedStar,
  SpiralLeft,
  SpiralRight,
  TextSection,
  BigText,
  HighlightRed,
  HighlightBlue,
  SubContentText,
  UnveilContainer,
  SubContainer,
  SubContainer1,
  SubContainer2,
  ImageContainer,
  UnveilContainer1,
  SubContainer3,
  SubContainer4,
  SubHeading,
  SubContent,
  NeedleImg,
  StreakImg,
  BadgesImg,
  HeatSheetImg,
  AptImg,
} from "./features.styles";

import i3 from "../../../assets/hero-image/lms-h1.png";
import i4 from "../../../assets/hero-image/lms-h4.png";
import i5 from "../../../assets/hero-image/lms-h5.png";
import i6 from "../../../assets/hero-image/lms-h2.png";
import i7 from "../../../assets/hero-image/lms-h3.png";
import redStar from "../../../assets/Star.png";
import spiral from "../../../assets/Spiral.png";

const Features = forwardRef(function Features(props, ref) {
  return (
    <UnveilSection ref={ref}>
      <RedStar loading={"lazy"} src={redStar} alt="red_star" />
      <SpiralLeft loading={"lazy"} src={spiral} alt="spiral_left" />
      <SpiralRight loading={"lazy"} src={spiral} alt="spiral_right" />

      <TextSection>
        <BigText>
          Unveiling Our <HighlightRed>AGH</HighlightRed>
          <HighlightBlue> LMS</HighlightBlue> Best Features
        </BigText>
        <SubContentText>
          Experience firsthand the thoughtfulness and ingenuity woven into every
          aspect of our feature-rich platform.
        </SubContentText>
      </TextSection>

      <UnveilContainer>
        <SubContainer>
          <SubHeading>Real Time Progress Tracking with Analytics</SubHeading>
          <SubContent>
            Track student performance in real time for smarter, faster
            decisions.
          </SubContent>
          <NeedleImg loading={"lazy"} src={i3} alt="analytics" />
        </SubContainer>

        <div>
          <SubContainer2>
            <ImageContainer>
              <StreakImg loading={"lazy"} src={i5} alt="streak" />
              <BadgesImg loading={"lazy"} src={i4} alt="badges" />
            </ImageContainer>

            <SubHeading>Stay Motivated with Streaks and Badges</SubHeading>
            <SubContent>
              Celebrate consistency and milestones with badges and streak
              rewards.
            </SubContent>
          </SubContainer2>
          <br />
          <SubContainer1 />
        </div>
      </UnveilContainer>

      <br />
      <UnveilContainer1>
        <SubContainer3>
          <SubHeading>Personalized Learning Profile</SubHeading>
          <SubContent>
            Track your journey, view achievements, and manage your courses—all
            in one place.
          </SubContent>
          <HeatSheetImg loading={"lazy"} src={i7} alt="heatmap" />
        </SubContainer3>

        <SubContainer4>
          <AptImg loading={"lazy"} src={i6} alt="modules" />
          <SubHeading>Interactive Learning Modules</SubHeading>
          <SubContent>
            Explore topics at your own pace and reinforce your learning with
            hands-on activities.
          </SubContent>
        </SubContainer4>
      </UnveilContainer1>
    </UnveilSection>
  );
});

export default Features;
