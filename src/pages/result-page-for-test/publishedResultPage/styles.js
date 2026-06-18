import styled from "styled-components";

export const ResultPageContainer = styled.div`
  max-width: 1440px;
  width: 90%;
  margin: 0 auto;
  padding: 2rem 0;
`;

// below for TestDetails component
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
`;

export const Card = styled.div`
  width: 100%;
`;

export const Heading = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.text.secondary};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Item = styled.div`
  background: ${({ theme }) => theme.body.secondary.base};
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;

  span {
    font-weight: 600;
    color: ${({ theme }) => theme.text.secondary};
  }
`;

export const Score = styled.div`
  margin-top: 25px;
  padding: 15px;
  background: ${({ theme }) => theme.body.secondary.base};
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  color: #1792d4;
`;
