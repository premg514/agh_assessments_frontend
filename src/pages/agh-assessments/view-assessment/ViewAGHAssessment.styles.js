import styled from "styled-components";

// ─── Layout ────────────────────────────────────────────────────────────────

export const Wrapper = styled.div`
  padding: 1rem;
  max-width: 1600px;
  margin: 0 auto;
`;

// ─── Tabs ──────────────────────────────────────────────────────────────────

export const TabsWrap = styled.div`
  display: flex;
  gap: 4px;
  background: ${({ theme }) => theme.body.secondary.base};
  border: 0.5px solid ${({ theme }) => theme.border.secondary};
  border-radius: 10px;
  padding: 4px;
  width: fit-content;
  margin-bottom: 1.25rem;
  overflow-x: auto;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const TabButton = styled.button`
  padding: 7px 16px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: ${({ active }) => (active ? "600" : "400")};
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;

  background: ${({ active, theme }) =>
    active ? theme.body.primary.base : "transparent"};

  color: ${({ active, theme }) =>
    active ? theme.text.primary : theme.text.secondary};

  box-shadow: ${({ active, theme }) =>
    active ? `0 1px 3px ${theme.shadow.opacity_10}` : "none"};

  &:hover {
    color: ${({ theme }) => theme.text.primary};
    background: ${({ active, theme }) =>
      active ? theme.body.primary.base : theme.body.primary.hover};
  }

  @media (max-width: 480px) {
    flex: 1;
    text-align: center;
  }
`;

// ─── Table ─────────────────────────────────────────────────────────────────

export const TableWrap = styled.div`
  background: ${({ theme }) => theme.body.primary.base};
  border: 0.5px solid ${({ theme }) => theme.border.secondary};
  border-radius: 12px;
  overflow: hidden;
`;

export const TableScroll = styled.div`
  overflow-x: auto;
  width: 100%;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  min-width: 520px;
`;

export const Thead = styled.thead`
  background: ${({ theme }) => theme.body.secondary.base};
  border-bottom: 0.5px solid ${({ theme }) => theme.border.secondary};
`;

export const Th = styled.th`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 10px 16px;
  text-align: left;
  white-space: nowrap;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-bottom: 0.5px solid ${({ theme }) => theme.border.secondary};
  transition: background 0.12s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.body.secondary.base};
  }
`;

export const Td = styled.td`
  padding: 12px 16px;
  font-size: 13px;
  color: ${({ theme }) => theme.text.primary};
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const NameCell = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// ─── Badges ────────────────────────────────────────────────────────────────

export const RollBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 9px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 600;
  font-family: "DM Mono", monospace;

  background: ${({ theme }) => theme.percentage_bg};
  color: ${({ theme }) => theme.text.primary};
`;

export const DeptText = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.text.primary};
`;

export const YearBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 9px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 6px;

  background: ${({ theme }) => theme.difficulty.medium.bg};
  color: ${({ theme }) => theme.difficulty.medium.text};
`;

// ─── Empty State ───────────────────────────────────────────────────────────

export const EmptyState = styled.div`
  padding: 2.5rem 1rem;
  text-align: center;
  font-size: 13px;
  color: ${({ theme }) => theme.text.secondary};
`;

export const SectionTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-bottom: 1.5rem;
`;

export const SectionStyledTable = styled.table`
  width: 100%;
  min-width: 500px;
  border-collapse: collapse;
  background: ${({ theme }) => theme.body.primary.base};
  color: ${({ theme }) => theme.text.primary};
  border-radius: 10px;
  overflow: hidden;
`;

export const SectionHeader = styled.th`
  padding: 14px;
  text-align: center;
  background: ${({ theme }) => theme.body.secondary.base};
  border-bottom: 1px solid ${({ theme }) => theme.border.primary};
  color: ${({ theme }) => theme.text.primary};
  font-size: 15px;
  font-weight: 600;
`;

export const SectionTh = styled.th`
  padding: 12px 14px;
  text-align: left;
  background: ${({ theme }) => theme.body.secondary.base};
  color: ${({ theme }) => theme.text.primary};
  font-weight: 600;
  font-size: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.border.primary};
`;

export const SectionTd = styled.td`
  padding: 12px 14px;
  font-size: 14px;
  color: ${({ theme }) => theme.text.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.border.primary};
`;

export const SectionTr = styled.tr``;
