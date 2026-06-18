import styled from "styled-components";

export const EmpowerWrapper = styled.div`
  padding: 3rem 0;
  position: relative;
  overflow: hidden;

  .content_container {
    max-width: 1440px;
    margin: 0 auto;
    width: 90%;
  }
`;

export const SpiralDecor = styled.img`
  position: absolute;
  top: 0px;
  right: -20px;
  width: 160px;
  transform: rotateZ(-90deg);
  z-index: -1;
`;

export const EmpowerMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  font-family: "Inter", sans-serif;
  position: relative;
  z-index: 1;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 580px;
`;

export const BigContent = styled.p`
  font-size: 40px;
  font-weight: 600;
  line-height: 50px;

  @media (max-width: 705px) {
    font-size: 24px;
    line-height: 36px;
  }
`;

export const RedText = styled.span`
  color: #fc2947;
`;

export const SubContent = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.text.neutral_gray_600};
  line-height: 32px;

  @media (max-width: 705px) {
    font-size: 16px;
  }
`;

export const EmpowerImage = styled.img`
  width: 450px;
  height: 450px;

  @media (max-width: 705px) {
    width: 320px;
    height: 320px;
  }
`;
