import styled from "styled-components";

export const TableRow = styled.tr`
  background: ${({ theme }) => theme.body.primary.hover};
`;

export const PageWrapper = styled.main`
  padding: 1rem;
  max-width: 1600px;
  margin: 0 auto;
`;

export const TopSection = styled.div`
  margin-bottom: 2rem;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  color: #555;
  margin-bottom: 1rem;
  font-weight: 500;
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const Content = styled.div`
  background-color: ${({ theme }) => theme.body.primary.base};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow-x: auto;

  .edit_btn {
    color: ${({ theme }) => theme.text.primary};
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;

  th,
  td {
    padding: 1.2rem 1rem;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.border.primary};
    vertical-align: middle;
    white-space: nowrap;
  }

  th {
    font-weight: 600;
    color: #555;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody > tr {
    border: 1px 1px 1px ${({ theme }) => theme.border.primary};
  }
`;

export const Pill = styled.span`
  display: inline-block;
  background-color: ${({ theme }) => theme.body.secondary.base};
  color: ${({ theme }) => theme.text.primary};
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  margin: 0.2rem;
  font-size: 0.9rem;
`;

export const CompanyAccessCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;
