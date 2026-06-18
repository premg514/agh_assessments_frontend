import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import styled from "styled-components";
import { forwardRef } from "react";

const AnimationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ $height }) => $height};
  flex-direction: column;
  background-color: ${({ theme }) => theme.body.primary.base};

  & p {
    position: relative;
    top: -40px;
    font-size: 20px;
    color: ${({ theme }) => theme.text.primary};
  }
`;

const BulbAnimation = forwardRef(function BulbAnimation({ $height }, ref) {
  return (
    <AnimationWrapper ref={ref} $height={$height || "100vh"}>
      <DotLottieReact
        src="https://lottie.host/4a58a9f1-820e-45f7-8aed-d2d523bec2b9/W1fZiRDM4d.lottie"
        loop
        autoplay
        style={{
          width: "200px",
          height: "200px",
        }}
      />
      <p className="work-sans-medium">Loading...</p>
    </AnimationWrapper>
  );
});

export default BulbAnimation;
