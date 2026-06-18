import styled from "styled-components";

export const AlumniWrapper = styled.div`
  padding: 2rem 1rem;
  max-width: 1600px;
  width: 95%;
  margin: 0 auto;
  @media (max-width: 1300px) {
    margin: 0;
  }
`;

export const AlumniHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
`;

export const RedStar = styled.img`
  width: 20px;
  height: 20px;
`;

export const AlumniHeading = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
`;

export const RedText = styled.span`
  color: red;
`;

export const AlumniScroll = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 20px;
  scroll-behavior: smooth;
  padding-bottom: 1rem;

  /* Hide scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export const AlumniCard = styled.div`
  min-width: 300px;
  max-width: 320px;
  background-color: ${({ theme }) => theme.body.secondary.base};
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
`;

export const Comment = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.text.neutral_gray_900};
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const AlumniInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const Name = styled.p`
  font-weight: bold;
  font-size: 0.95rem;
`;

export const Role = styled.p`
  font-size: 0.8rem;
  color: gray;
`;

export const AlumniScrollInner = styled.div`
  display: flex;
  gap: 20px;
  animation: scrollAlumni 30s linear infinite;
  width: max-content;

  @keyframes scrollAlumni {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;
