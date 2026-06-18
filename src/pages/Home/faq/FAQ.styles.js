import styled from "styled-components";

export const FaqSection = styled.div`
  padding: 4rem 0px;
  position: relative;
  overflow-x: hidden;
`;

export const FaqContentWrapper = styled.div`
  max-width: 1800px;
  margin: 0 auto;
  width: 95%;
`;

export const FaqTitle = styled.p`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 2.5rem;
  font-family: "Work Sans", sans-serif;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const FaqColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0rem;
  }
`;

export const FaqColumn = styled.div`
  margin-bottom: 1rem;
`;

export const FaqItem = styled.div`
  cursor: pointer;
  margin-bottom: 2rem;
`;

export const FaqQuestion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.text.secondary};

  & > p {
    font-size: 1.25rem;
    font-weight: 500;
  }
`;

export const FaqIcon = styled.span`
  color: #6a5acd;
  font-size: 1rem;
`;

export const FaqAnswer = styled.p`
  margin-top: 0.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.text.secondary};
  font-size: 1.125rem;
  line-height: 1.4;
`;

export const SpiralIconBottom = styled.img`
  position: absolute;
  bottom: -80px;
  left: -140px;
  transform: translateX(
    -50%
  ); /* Keep it visually to the left but prevent overflow */
  width: 170px;
  rotate: 90deg;

  @media (max-width: 950px) {
    display: none;
  }
`;

export const SpiralIconTop = styled.img`
  position: absolute;
  top: 50px;
  right: -70px;
  transform: translateX(
    50%
  ); /* Push inward visually while preventing overflow */
  width: 120px;
  rotate: -90deg;

  @media (max-width: 950px) {
    display: none;
  }
`;
