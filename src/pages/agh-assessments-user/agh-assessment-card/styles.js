import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: left;
  padding: 10px;
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.border.secondary};
  color: ${({ theme }) => theme.text.secondary};
`;

export const Td = styled.td`
  padding: 10px;
  color: ${({ theme }) => theme.text.secondary};

  &:last-child {
    text-align: center;
  }
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.body.secondary};
  border-radius: 12px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.border.secondary};
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: 0.2s;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Label = styled.span`
  color: #666;
  font-size: 14px;
`;

export const Value = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.secondary};
`;

export const Footer = styled.div`
  margin-top: 10px;
`;
