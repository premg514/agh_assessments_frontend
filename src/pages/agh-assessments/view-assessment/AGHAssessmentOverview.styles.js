import styled from "styled-components";

// ─── Layout ────────────────────────────────────────────────────────────────

export const PageWrap = styled.div``;

// ─── Header ────────────────────────────────────────────────────────────────

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 1.75rem;
  .element {
    display: flex;
    gap: 10px;
    align-items: center;
  }
`;

export const TitleGroup = styled.div``;

export const AssessmentTitle = styled.h1`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
  letter-spacing: -0.3px;
`;

export const AssessmentMeta = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.text.secondary};
  margin-top: 4px;
  font-family: "DM Mono", monospace;
`;

export const BadgeGroup = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  align-items: center;
`;

// ─── Badge (Theme Based) ───────────────────────────────────────────────────

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;

  background: ${({ variant = "gray", theme }) =>
    variant === "green"
      ? theme.difficulty.easy.bg
      : variant === "red"
        ? theme.difficulty.hard.bg
        : variant === "amber"
          ? theme.difficulty.medium.bg
          : variant === "blue"
            ? theme.percentage_bg
            : variant === "purple"
              ? theme.body.secondary.base
              : theme.body.secondary.base};

  color: ${({ variant = "gray", theme }) =>
    variant === "green"
      ? theme.difficulty.easy.text
      : variant === "red"
        ? theme.difficulty.hard.text
        : variant === "amber"
          ? theme.difficulty.medium.text
          : variant === "blue"
            ? theme.text.primary
            : variant === "purple"
              ? theme.text.primary
              : theme.text.secondary};
`;

// ─── Stats ─────────────────────────────────────────────────────────────────

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 1.5rem;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.body.primary.base};
  border: 0.5px solid ${({ theme }) => theme.border.secondary};
  border-radius: 12px;
  padding: 14px 16px;
`;

export const StatLabel = styled.p`
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
`;

export const StatValue = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${({ $color, theme }) => $color || theme.text.primary};
  line-height: 1;
`;

// ─── Info ──────────────────────────────────────────────────────────────────

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 1.5rem;
`;

export const InfoCard = styled.div`
  background: ${({ theme }) => theme.body.primary.base};
  border: 0.5px solid ${({ theme }) => theme.border.secondary};
  border-radius: 12px;
  padding: 14px 16px;
`;

export const InfoCardTitle = styled.p`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 10px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  font-size: 13px;
  border-bottom: 0.5px solid ${({ theme }) => theme.border.secondary};

  &:last-child {
    border-bottom: none;
  }
`;

export const InfoKey = styled.span`
  color: ${({ theme }) => theme.text.secondary};
`;

export const InfoVal = styled.span`
  font-weight: 500;
  color: ${({ $color, theme }) => $color || theme.text.primary};
`;

// ─── Sections ──────────────────────────────────────────────────────────────

export const SectionLabel = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 10px;
`;

export const SectionCard = styled.div`
  background: ${({ theme }) => theme.body.primary.base};
  border: 0.5px solid ${({ theme }) => theme.border.secondary};
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 10px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 16px;
  cursor: pointer;
  user-select: none;
  border-bottom: ${({ $open, theme }) =>
    $open ? `0.5px solid ${theme.border.secondary}` : "none"};
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.body.secondary.base};
  }

  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 8px;
  }
`;

export const SectionName = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.text.primary};
`;

export const SectionHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Chevron = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.text.secondary};
  transition: transform 0.2s ease;
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
  display: inline-block;
`;

export const SectionBody = styled.div`
  padding: ${({ $open }) => ($open ? "16px" : "0")};
  max-height: ${({ $open }) => ($open ? "800px" : "0")};
  overflow: hidden;
  transition:
    max-height 0.3s ease,
    padding 0.2s ease;
`;

// ─── Problem Grid ──────────────────────────────────────────────────────────

export const ProbGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 560px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 360px) {
    grid-template-columns: 1fr;
  }
`;

export const ProbBlock = styled.div`
  background: ${({ theme }) => theme.body.secondary.base};
  border: 0.5px solid ${({ theme }) => theme.border.secondary};
  border-radius: 10px;
  padding: 12px 14px;
`;

export const ProbTypeLabel = styled.p`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding-bottom: 8px;
  margin-bottom: 6px;
  border-bottom: 0.5px solid ${({ theme }) => theme.border.secondary};
`;

export const DiffGroup = styled.p`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 8px 0 3px;
`;

export const DiffRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 2px 0 2px 8px;
  color: ${({ theme }) => theme.text.secondary};
`;

export const DiffVal = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 2px 0;
  color: ${({ theme }) => theme.text.secondary};
`;

export const TotalVal = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
`;

// ─── Modal / User Selection ────────────────────────────────────────────────

export const UserSelectionEditStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  max-width: 1000px;
  width: 80vw;

  .footer_user_selection {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    padding-top: 1rem;

    @media (max-width: 480px) {
      flex-direction: column-reverse;

      button {
        width: 100%;
        justify-content: center;
      }
    }
  }
`;
