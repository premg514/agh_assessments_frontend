import styled from "styled-components";

export const UsersSelectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .buttons_container {
      display: flex;
      align-items: center;
      gap: 1rem;
      .select-btn,
      .remove-btn {
        width: fit-content;
        color: ${({ theme }) => theme.link_sky_blue};
        cursor: pointer;

        &:disabled {
          opacity: 0.7;
        }
      }
    }
  }
`;


export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 400px;
  background: ${({ theme }) => theme.body.primary.base};
`;

export const TableHead = styled.thead`
  background: ${({ theme }) => theme.body.secondary.base};
`;

export const Th = styled.th`
  text-align: left;
  padding: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.text.primary};
  border-bottom: 1px solid ${({ theme }) => theme.border.primary};
`;

export const Tr = styled.tr`
  &:hover {
    background: ${({ theme }) => theme.body.primary.hover};
  }
`;

export const Td = styled.td`
  padding: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.text.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.border.secondary};
`;

export const CheckboxCell = styled(Td)`
  cursor: pointer;
  width: 40px;
`;

export const LoaderRow = styled.tr`
  td {
    text-align: center;
    padding: 10px;
    color: ${({ theme }) => theme.text.secondary};
  }
`;