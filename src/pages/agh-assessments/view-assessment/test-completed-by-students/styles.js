import styled from "styled-components";

// ─── Layout ────────────────────────────────────────────────────────────────

export const Wrap = styled.div``;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 10px;
`;

export const TitleBlock = styled.div``;

export const Title = styled.h1`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.primary};
`;

export const Subtitle = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.text.secondary};
  margin-top: 3px;
`;

// ─── Badge ─────────────────────────────────────────────────────────────────

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 3px 12px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 500;

  background: ${({ variant, theme }) =>
    variant === "green"
      ? theme.difficulty.easy.bg
      : variant === "red"
        ? theme.difficulty.hard.bg
        : variant === "amber"
          ? theme.difficulty.medium.bg
          : variant === "blue"
            ? theme.percentage_bg
            : theme.body.secondary.base};

  color: ${({ variant, theme }) =>
    variant === "green"
      ? theme.difficulty.easy.text
      : variant === "red"
        ? theme.difficulty.hard.text
        : variant === "amber"
          ? theme.difficulty.medium.text
          : variant === "blue"
            ? theme.text.primary
            : theme.text.secondary};
`;

// ─── Stats ─────────────────────────────────────────────────────────────────

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 1.5rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.body.primary.base};
  border: 0.5px solid ${({ theme }) => theme.border.secondary};
  border-radius: 10px;
  padding: 14px 16px;
`;

export const StatLabel = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.text.secondary};
  margin-bottom: 4px;
`;

export const StatValue = styled.p`
  font-size: 22px;
  font-weight: 500;
  color: ${({ color, theme }) => color || theme.text.primary};
`;

// ─── Filters ───────────────────────────────────────────────────────────────

export const Filters = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

export const FilterLabel = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.text.secondary};
`;

export const FilterBtn = styled.button`
  padding: 5px 14px;
  border-radius: 99px;
  font-size: 12px;
  border: 0.5px solid
    ${({ active, theme }) =>
      active ? theme.text.primary : theme.border.secondary};

  background: ${({ active, theme }) =>
    active ? theme.text.primary : theme.body.primary.base};

  color: ${({ active, theme }) =>
    active ? theme.body.primary.base : theme.text.secondary};

  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: ${({ active, theme }) =>
      active ? theme.text.primary : theme.body.secondary.base};
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

export const Th = styled.th`
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 10px 14px;
  background: ${({ theme }) => theme.body.secondary.base};
  text-align: left;
  border-bottom: 0.5px solid ${({ theme }) => theme.border.secondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Tr = styled.tr`
  &:hover td {
    background: ${({ theme }) => theme.body.secondary.base};
  }
`;

export const Td = styled.td`
  padding: 11px 14px;
  font-size: 13px;
  color: ${({ theme }) => theme.text.primary};
  border-bottom: ${({ last, theme }) =>
    last ? "none" : `0.5px solid ${theme.border.secondary}`};
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// ─── Student ───────────────────────────────────────────────────────────────

export const StudentName = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.text.primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StudentId = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.text.secondary};
  margin-top: 1px;
`;

// ─── Rank ──────────────────────────────────────────────────────────────────

export const RankText = styled.span`
  font-weight: 500;
  font-size: 13px;

  color: ${({ rank, theme }) =>
    rank === 1
      ? theme.difficulty.medium.text
      : rank === 2
        ? theme.text.secondary
        : rank === 3
          ? theme.difficulty.hard.text
          : theme.text.secondary};
`;

// ─── Percentage Bar ────────────────────────────────────────────────────────

export const PctBarWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PctBar = styled.div`
  flex: 1;
  height: 5px;
  background: ${({ theme }) => theme.body.secondary.base};
  border-radius: 3px;
  overflow: hidden;
`;

export const PctFill = styled.div`
  height: 100%;
  border-radius: 3px;
  width: ${({ pct }) => pct}%;

  background: ${({ pct, theme }) =>
    pct >= 70
      ? theme.difficulty.easy.text
      : pct >= 40
        ? theme.difficulty.medium.text
        : theme.difficulty.hard.text};

  transition: width 0.3s ease;
`;

export const PctLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  min-width: 34px;
  text-align: right;

  color: ${({ pct, theme }) =>
    pct >= 70
      ? theme.difficulty.easy.text
      : pct >= 40
        ? theme.difficulty.medium.text
        : theme.difficulty.hard.text};
`;

// ─── Violations ────────────────────────────────────────────────────────────

export const ViolText = styled.span`
  font-size: 12px;
  font-weight: ${({ level }) => (level === "high" ? "500" : "400")};

  color: ${({ level, theme }) =>
    level === "high"
      ? theme.difficulty.hard.text
      : level === "mid"
        ? theme.difficulty.medium.text
        : theme.difficulty.easy.text};
`;
