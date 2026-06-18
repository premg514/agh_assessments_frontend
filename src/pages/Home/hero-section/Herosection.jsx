import React, { forwardRef } from "react";
import {
  HeroWrapper,
  LeftSection,
  RightSection,
  Title,
  HighlightRed,
  HighlightBlue,
  SubText,
  RedStar,
  SpiralIcon,
  MobileMockup,
  BrowserMockup,
  SectionWrapper,
} from "./Herosection.styles";
import { Button } from "../../user/login/user-login-style";

import spiral from "../../../assets/Spiral.png";
import redstar from "../../../assets/Star.png";
import hero1 from "../../../assets/hero-image/lms-h9.png";
import hero2 from "../../../assets/hero-image/lms-h12.png";
import { useNavigate } from "react-router-dom";

const HeroSection = forwardRef(function HeroSection(props, ref) {
  const navigate = useNavigate();
  return (
    <HeroWrapper ref={ref}>
      <SpiralIcon src={spiral} alt="spiral" />
      <SectionWrapper>
        <LeftSection>
          {" "}
          <Title>
            Unlock Your <br />
            Potential with <HighlightRed>AGH</HighlightRed>{" "}
            <HighlightBlue>LMS</HighlightBlue>
          </Title>
          <SubText>
            Welcome to AGH LMS, your ultimate learning companion! We're
            delighted to have you embark on this journey of knowledge and growth
            with us
          </SubText>
          <Button
            onClick={() => {
              navigate("/userLogin");
            }}
            $primary
            className="w-fit"
          >
            Start Your Journey
          </Button>
          <RedStar src={redstar} alt="star" />
        </LeftSection>

        <RightSection>
          <BrowserMockup src={hero1} alt="browser" />
          <MobileMockup src={hero2} alt="mobile" />
        </RightSection>
      </SectionWrapper>
    </HeroWrapper>
  );
});

export default HeroSection;
