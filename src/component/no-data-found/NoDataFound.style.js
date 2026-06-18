import styled from "styled-components";

export const NoDataFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
`;

export const MessageBox = styled.div`
  padding: 40px;
  border-radius: 10px;
  text-align: center;
`;

export const Heading = styled.h4`
  font-size: 24px;
  color: ${({ theme }) => theme.text.secondary};
  margin-bottom: 10px;
`;

export const Description = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text.secondary};
`;
