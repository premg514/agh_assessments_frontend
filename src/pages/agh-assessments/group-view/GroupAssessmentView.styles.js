import styled from "styled-components";

export const Wrapper = styled.div`
  width: 95%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const HeroCard = styled.div`
  border: 1px solid ${({ theme }) => theme.border.secondary};
  background: ${({ theme }) => theme.body.primary.base};
  border-radius: 16px;
  padding: 1.25rem;
`;

export const HeroTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const HeroTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
`;

export const HeroFilters = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  min-width: 560px;

  > div {
    width: 100%;
    max-width: 300px;
    min-width: 240px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    min-width: 0;
    width: 100%;
    flex-direction: column;
    align-items: stretch;

    > div {
      max-width: none;
      min-width: 0;
    }
  }
`;

export const HeroEyebrow = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.text.secondary};
  font-weight: 700;
`;

export const HeroTitle = styled.h1`
  margin: 0;
  font-size: 26px;
  line-height: 1.2;
  color: ${({ theme }) => theme.text.primary};
`;

export const HeroMeta = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.text.secondary};
`;

export const HeroBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  background: ${({ theme }) => theme.body.secondary.base};
  border: 1px solid ${({ theme }) => theme.border.secondary};
`;

export const StatsGrid = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }
`;

const VARIANT_COLOR = {
  scheduled: "90, 167, 222",
  completed: "88, 196, 91",
  notStarted: "255, 179, 64",
  attending: "52, 195, 143",
  suspecious: "253, 82, 82",
};

export const StatCard = styled.div`
  padding: 1rem 1.1rem;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  background: ${({ $variant }) => {
    const rgb = VARIANT_COLOR[$variant] || "100, 116, 139";
    return `rgba(${rgb}, 0.12)`;
  }};

  border: 1px solid
    ${({ $variant }) => {
      const rgb = VARIANT_COLOR[$variant] || "100, 116, 139";
      return `rgba(${rgb}, 0.35)`;
    }};

  @media (max-width: 560px) {
    min-height: 96px;
    padding: 0.95rem 1rem;
  }
`;

export const StatLabel = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text.secondary};
  margin-bottom: 0.9rem;

  @media (max-width: 560px) {
    margin-bottom: 0.65rem;
    font-size: 13px;
  }
`;

export const StatValue = styled.div`
  font-size: 18px;
  line-height: 1;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }

  @media (max-width: 560px) {
    font-size: 1.5rem;
  }
`;

export const StatIconWrap = styled.div`
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  align-self: end;

  background: ${({ $variant }) => {
    if ($variant === "scheduled") return "#5AA7DE";
    if ($variant === "completed") return "#58C45B";
    if ($variant === "notStarted") return "#FFB340";
    if ($variant === "attending") return "#34C38F";
    if ($variant === "suspecious") return "#FD5252";
    return "#5AA7DE";
  }};

  svg {
    display: block;
  }

  @media (max-width: 560px) {
    width: 34px;
    height: 34px;
    min-width: 34px;
  }
`;

export const FiltersCard = styled.div`
  border: 1px solid ${({ theme }) => theme.border.secondary};
  background: ${({ theme }) => theme.body.primary.base};
  border-radius: 16px;
  padding: 1rem;
`;

export const FiltersTitle = styled.h3`
  margin: 0 0 1rem;
  font-size: 16px;
  color: ${({ theme }) => theme.text.primary};
`;

export const FiltersRow = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, 1.2fr) minmax(220px, 220px) minmax(
      200px,
      200px
    );
  gap: 0.9rem;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const FilterField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  label {
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.text.secondary};
  }

  input {
    width: 100%;
    height: 42px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.border.secondary};
    background: ${({ theme }) => theme.body.secondary.base};
    color: ${({ theme }) => theme.text.primary};
    padding: 0 0.9rem;
    outline: none;
  }
`;

export const ClearButton = styled.button`
  height: 42px;
  border-radius: 10px;
  padding: 0 1rem;
  border: 1px solid ${({ theme }) => theme.border.secondary};
  background: ${({ theme }) => theme.body.primary.base};
  color: ${({ theme }) => theme.text.primary};
  cursor: pointer;
  font-weight: 600;
`;

export const PanelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const Panel = styled.div`
  background: ${({ theme }) => theme.body.primary.base};
  overflow: visible;
`;

export const PanelHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.border.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PanelTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: ${({ theme }) => theme.text.primary};
`;

export const TestList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TestItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border.secondary};

  &:last-child {
    border-bottom: none;
  }
`;

export const TestTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const TestName = styled.h4`
  margin: 0 0 0.25rem;
  font-size: 15px;
  color: ${({ theme }) => theme.text.primary};
`;

export const TestMeta = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.text.secondary};
`;

export const TestMetrics = styled.div`
  margin-top: 0.8rem;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.65rem;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const TestMetric = styled.div`
  border: 1px solid ${({ theme }) => theme.border.secondary};
  background: ${({ theme }) => theme.body.secondary.base};
  border-radius: 12px;
  padding: 0.75rem;

  span:first-child {
    display: block;
    font-size: 11px;
    color: ${({ theme }) => theme.text.secondary};
    margin-bottom: 0.2rem;
  }

  span:last-child {
    display: block;
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.text.primary};
  }
`;

export const TabsHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const TabsWrap = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  padding: 3px;
  border: 1px solid ${({ theme }) => theme.border.secondary};
  background: ${({ theme }) => theme.body.secondary.base};
  border-radius: 8px;
`;

export const TabButton = styled.button`
  border: 1px solid
    ${({ active, theme }) => (active ? theme.border.primary : "transparent")};
  background: ${({ active, theme }) =>
    active ? theme.body.primary.base : theme.body.secondary.base};
  color: ${({ theme }) => theme.text.primary};
  border-radius: 8px;
  padding: 0.55rem 0.95rem;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: ${({ active }) =>
    active ? "0px 0.76px 2.27px 0px #0000001A;" : "none"};
`;

export const DownloadButtonWrap = styled.div`
  @media (max-width: 768px) {
    width: 100%;

    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

export const SearchField = styled.div`
  position: relative;

  input {
    width: 100%;
    height: 46px;
    border-radius: 999px;
    border: 1px solid #d9d9d9;
    background: ${({ theme }) => theme.body.secondary.base};
    color: ${({ theme }) => theme.text.primary};
    padding: 0 1rem 0 2.8rem;
    font-size: 15px;
    outline: none;

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #6b7280;
  }
`;

export const TableCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
  background: ${({ theme }) => theme.body.primary.base};
`;

export const TableWrap = styled.div`
  padding: 1rem;
`;

export const TableScroll = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 1180px;
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  background: ${({ theme }) => theme.body.secondary.base};
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-bottom: 1px solid #ececec;

  &:last-child {
    border-bottom: none;
  }
`;

export const Th = styled.th`
  text-align: left;
  padding: 1rem 0.85rem;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.text.secondary};
  white-space: nowrap;
`;

export const Td = styled.td`
  padding: 0.95rem 0.85rem;
  font-size: 14px;
  color: ${({ theme }) => theme.text.primary};
  vertical-align: middle;
  white-space: nowrap;
`;

export const StudentCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

export const StudentName = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
`;

export const ScoreText = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  align-items: baseline;
  gap: 0.3rem;

  span {
    font-size: 18px;
    color: #9ca3af;
    font-weight: 600;
  }
`;

export const MutedText = styled.div`
  color: #a3a3a3;
  font-size: 14px;
`;

export const PercentageWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
`;

export const PercentageBar = styled.div`
  width: 140px;
  height: 6px;
  border-radius: 999px;
  background: #e5e7eb;
  overflow: hidden;

  div {
    height: 100%;
    width: ${({ value = 0 }) => `${value}%`};
    border-radius: 999px;
    background: #11a36a;
  }
`;

export const PercentageText = styled.span`
  color: #11a36a;
  font-size: 14px;
  font-weight: 600;
`;

export const GoodText = styled.span`
  color: #5d8c2f;
  font-weight: 600;
`;

export const BadText = styled.span`
  color: #dc2626;
  font-weight: 600;
`;

export const WarningText = styled.span`
  color: #a16207;
  font-weight: 600;
`;

export const InfoText = styled.span`
  color: #0ea5a4;
  font-weight: 600;
`;

export const StatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  background: #e7faf0;
  color: #10b981;
  font-size: 13px;
  font-weight: 600;
`;

export const ActionButton = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.text.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.3rem;
`;

export const IndexText = styled.span`
  color: #f59e0b;
  font-weight: 700;
`;

export const StudentSub = styled.div`
  margin-top: 0.2rem;
  font-size: 12px;
  color: ${({ theme }) => theme.text.secondary};
`;

export const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  background: ${({ theme }) => theme.body.secondary.base};
  color: ${({ theme }) => theme.text.primary};
  border: 1px solid ${({ theme }) => theme.border.secondary};
`;

export const AssessmentChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

export const AssessmentChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.body.secondary.base};
  color: ${({ theme }) => theme.text.primary};
  border: 1px solid ${({ theme }) => theme.border.secondary};
  font-size: 12px;
`;

export const EmptyState = styled.div`
  padding: 2.5rem 1rem;
  text-align: center;
  color: ${({ theme }) => theme.text.secondary};
  font-size: 14px;
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(360px, 410px) minmax(0, 1fr);
  gap: 1rem;
  align-items: stretch;
  width: 100%;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartCard = styled.div`
  border: 1px solid ${({ theme }) => theme.border.secondary};
  background: ${({ theme }) => theme.body.primary.base};
  border-radius: 8px;
  padding: 1.25rem 1.75rem;
  min-height: 270px;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 560px) {
    padding: 1rem;
    min-height: auto;
  }
`;

export const ChartTitle = styled.h3`
  margin: 0 0 1.2rem;
  font-size: 17px;
  line-height: 1.25;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};

  @media (max-width: 560px) {
    font-size: 15px;
    margin-bottom: 1rem;
  }
`;

export const ProgressChartContent = styled.div`
  display: grid;
  grid-template-columns: 190px minmax(130px, 1fr);
  gap: 1.25rem;
  align-items: center;
  margin: auto;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 0.9rem;
  }
`;

export const DoughnutWrap = styled.div`
  position: relative;
  width: 190px;
  height: 190px;
  flex: 0 0 190px;

  canvas {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 560px) {
    width: 150px;
    height: 150px;
    flex-basis: 150px;
  }
`;

export const DoughnutCenter = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

export const DoughnutValue = styled.div`
  font-size: 22px;
  line-height: 1;
  font-weight: 700;
  color: ${({ theme }) => theme.text.primary};

  @media (max-width: 560px) {
    font-size: 18px;
  }
`;

export const DoughnutLabel = styled.div`
  margin-top: 0.35rem;
  font-size: 12px;
  color: ${({ theme }) => theme.text.secondary};

  @media (max-width: 560px) {
    font-size: 10px;
  }
`;

export const ChartLegend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 138px;

  @media (max-width: 560px) {
    width: 100%;
    max-width: 230px;
    gap: 0.55rem;
  }
`;

export const LegendRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const LegendLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-width: 0;
`;

export const LegendColor = styled.span`
  width: 18px;
  height: 11px;
  flex: 0 0 18px;
  border-radius: 1px;
`;

export const LegendLabel = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.text.primary};
  white-space: nowrap;

  @media (max-width: 560px) {
    font-size: 11px;
  }
`;

export const LegendValue = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.text.primary};
  min-width: 18px;
  text-align: right;

  @media (max-width: 560px) {
    font-size: 11px;
  }
`;

export const SectionChartWrap = styled.div`
  position: relative;
  min-height: 315px;
  width: 100%;
  padding: 0 2.2rem;

  .chart-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    border: none;
    background: transparent;
    color: #b8b8b8;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
  }

  .chart-nav:disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }

  .chart-prev {
    left: 0;
  }

  .chart-next {
    right: 0;
  }

  @media (max-width: 560px) {
    padding: 0 1.4rem;
    min-height: 280px;

    .chart-nav svg {
      width: 30px;
      height: 30px;
    }
  }
`;

export const SectionChartScroll = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
  padding-bottom: 0.25rem;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.border.secondary};
    border-radius: 999px;
  }
`;

export const SectionEmptyState = styled.div`
  min-height: 270px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text.secondary};
  font-size: 14px;

  @media (max-width: 560px) {
    min-height: 220px;
  }
`;
