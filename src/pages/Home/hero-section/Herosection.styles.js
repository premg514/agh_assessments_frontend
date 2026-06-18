import styled from "styled-components";

export const HeroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.body.primary.base};
  font-family: "Inter", sans-serif;
  position: relative;
  padding: 2rem 2rem;
  padding-right: 0;
`;

export const SectionWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 40px;
    overflow: visible;
  }
`;

export const LeftSection = styled.div`
  flex: 1;
  padding-right: 2rem;
  padding-left: 80px;
  position: relative;
  padding-top: 20px;

  @media (max-width: 768px) {
    padding-right: 0;
    padding-left: 0;
  }
`;

export const RightSection = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-height: 400px;

  @media (max-width: 768px) {
    min-height: 300px;
    padding-bottom: 2rem;
  }
`;

export const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  line-height: 1.2;
  color: ${({ theme }) => theme.text.primary};
  max-width: 400px;
  z-index: 10;
  position: relative;

  @media (max-width: 768px) {
    font-size: 36px;
    max-width: 100%;
  }
`;

export const HighlightRed = styled.span`
  color: #ff2f56;
`;

export const HighlightBlue = styled.span`
  color: #48a4ff;
`;

export const SubText = styled.p`
  color: ${({ theme }) => theme.text.neutral_gray_600};
  font-size: 18px;
  font-weight: 400;
  margin: 1.5rem 0;
  max-width: 450px;
  line-height: 26px;

  @media (max-width: 768px) {
    font-size: 16px;
    max-width: 100%;
  }
`;

export const Button = styled.button`
  background: #ff2f56;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
`;

export const BrowserMockup = styled.img`
  max-width: 500px;
  z-index: 1;
  position: relative;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const MobileMockup = styled.img`
  position: absolute;
  bottom: -120px;
  left: 120px;
  width: 248px;
  z-index: 2;
  border-radius: 16px;
  @media (max-width: 1250px) {
    left: -40px;
  }
  @media (max-width: 768px) {
    width: 136px;
    bottom: -45px;
    left: 0%;
    transform: translateX(-20%);
    padding-left: 20px;
    border-radius: 16px;
  }
`;

export const RedStar = styled.img`
  position: absolute;
  top: 0px;
  right: 150px;
  width: 75px;
  height: 75px;
  z-index: 2;

  @media (max-width: 768px) {
    top: -10px;
    right: 20px;
    width: 60px;
    height: 60px;
  }
`;

export const SpiralIcon = styled.img`
  width: 160px;
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translate(-40%, 40%);
`;
