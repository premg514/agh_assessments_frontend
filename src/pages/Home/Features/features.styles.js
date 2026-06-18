import styled from "styled-components";

export const UnveilSection = styled.div`
  position: relative;
  padding: 2rem 0;
  overflow: hidden;
  background-color: ${({ theme }) => theme.body.primary.base};
`;

export const RedStar = styled.img`
  position: absolute;
  top: 130px;
  right: 90px;
  width: 52px;
  height: 52px;
  z-index: 1;

  @media (max-width: 665px) {
    display: none;
  }
`;

export const SpiralLeft = styled.img`
  position: absolute;
  top: 0;
  left: -130px;
  width: 194px;
  opacity: 0.5;
  z-index: 0;

  @media (max-width: 665px) {
    display: none;
  }
`;

export const SpiralRight = styled.img`
  position: absolute;
  bottom: 520px;
  right: 10px;
  width: 120px;
  opacity: 0.5;
  z-index: 0;

  @media (max-width: 665px) {
    display: none;
  }
`;

export const TextSection = styled.div`
  font-family: "Inter", sans-serif;
  text-align: center;
  z-index: 2;
  position: relative;
`;

export const BigText = styled.p`
  font-size: 48px;
  font-weight: 600;
  margin: 0;
  padding: 20px;
  @media (max-width: 869px) {
    font-size: 24px;
    line-height: 32px;
  }
`;

export const SubContentText = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.text.neutral_gray_600};
  margin: 0;
  padding: 15px;
  padding-bottom: 30px;
  @media (max-width: 869px) {
    font-size: 14px;
    line-height: 26px;
  }
`;

export const HighlightRed = styled.span`
  color: #fc2947;
`;

export const HighlightBlue = styled.span`
  color: #45a7de;
`;

export const UnveilContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
  padding: 0px 25px;
`;

export const SubContainer = styled.div`
  background-color: ${({ theme }) => theme.body.secondary.base};
  padding: 0 10px 32px 32px;
  border-radius: 16px;
`;

export const SubContainer1 = styled.div`
  background-color: ${({ theme }) => theme.body.secondary.base};
  height: 52px;
  padding-left: 32px;
  border-radius: 16px;
`;

export const SubContainer2 = styled.div`
  background-color: ${({ theme }) => theme.body.secondary.base};
  width: 100%;
  max-width: 530px;
  padding: 24px 20px;
  border-radius: 16px;
  gap: 16px;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: nowrap; /* ⚠️ prevent wrapping */

  @media (max-width: 665px) {
    gap: 5px;
  }
`;

export const SubHeading = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin: 16px 0;
`;

export const SubContent = styled.p`
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 400;
  color: #9a9595;
`;

export const NeedleImg = styled.img`
  width: 100%;
  max-width: 580px;
  height: auto;
  border-bottom-left-radius: 16px;
  border-top-left-radius: 16px;

  @media (max-width: 665px) {
    max-width: 90vw;
  }
`;

export const StreakImg = styled.img`
  width: 65%; /* take up majority */
  max-width: 300px;
  height: 273px;
  object-fit: contain;
`;

export const BadgesImg = styled.img`
  width: 70%;
  max-width: 120px;
  height: 273px;
  object-fit: contain;
`;

export const HeatSheetImg = styled.img`
  width: 100%;
  max-width: 580px;
  height: auto;
  display: block;

  @media (max-width: 665px) {
    max-width: 90vw;
  }
`;

export const AptImg = styled.img`
  width: 100%;
  max-width: 580px;
  height: auto;
  display: block;

  @media (max-width: 665px) {
    max-width: 90vw;
  }
`;

export const UnveilContainer1 = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  z-index: 2;
  position: relative;
  padding: 0px 25px;
`;

export const SubContainer3 = styled.div`
  background-color: ${({ theme }) => theme.body.secondary.base};
  width: 100%;
  max-width: 580px;
  padding: 32px;
  border-radius: 16px;
`;

export const SubContainer4 = styled.div`
  background-color: ${({ theme }) => theme.body.secondary.base};
  width: 100%;
  max-width: 580px;
  padding: 20px;
  border-radius: 16px;
`;
