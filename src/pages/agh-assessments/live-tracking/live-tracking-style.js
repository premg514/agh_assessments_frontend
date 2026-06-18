import styled, { keyframes, css } from "styled-components";

/* ================================================================== */
/* COLOR SYSTEM                                                       */
/* ================================================================== */
export const COLORS = {
  // Cell statuses
  correct: "#10b981", // emerald
  wrong: "#ef4444", // red
  partial: "#f59e0b", // amber
  skipped: "#94a3b8", // slate
  none: "#f1f5f9", // light gray

  // Performance tiers
  excellent: { accent: "#10b981", soft: "#d1fae5" },
  good: { accent: "#3b82f6", soft: "#dbeafe" },
  average: { accent: "#f59e0b", soft: "#fef3c7" },
  poor: { accent: "#ef4444", soft: "#fee2e2" },
};

export const getTier = (pct) => {
  if (pct >= 75) return "excellent";
  if (pct >= 50) return "good";
  if (pct >= 25) return "average";
  return "poor";
};

const AVATAR_COLORS = [
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#84cc16",
  "#f97316",
  "#a855f7",
];

export const getAvatarColor = (name = "") => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

export const getInitials = (name = "") =>
  name
    .replace(/\.+/g, "")
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/* ================================================================== */
/* ANIMATIONS                                                         */
/* ================================================================== */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.45); }
  70%  { box-shadow: 0 0 0 6px rgba(59, 130, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

/* ================================================================== */
/* LAYOUT                                                             */
/* ================================================================== */
export const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 32px 40px;
  background:
    radial-gradient(circle at 0% 0%, #eef2ff 0%, transparent 40%),
    radial-gradient(circle at 100% 0%, #fef3f2 0%, transparent 40%), #f8fafc;
  font-family:
    -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif;
  color: #0f172a;

  @media (max-width: 640px) {
    padding: 20px 16px;
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

export const Title = styled.div`
  h1 {
    font-size: 26px;
    font-weight: 700;
    margin: 0;
    letter-spacing: -0.5px;
  }
  p {
    color: #64748b;
    margin: 6px 0 0;
    font-size: 14px;
  }
  .back-btn {
    width: fit-content;
    padding: 10px 20px;
    border-radius: 12px;
    background: #0f172a;
    color: #ffffff;
    font-size: 14px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transition:
      background 0.2s ease,
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .back-btn:hover {
    background: #1e293b;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
  }

  .back-btn:active {
    transform: scale(0.96);
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LiveBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #fef2f2;
  color: #b91c1c;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ef4444;
    animation: ${pulse} 1.6s infinite;
  }
`;

export const RefreshInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #64748b;
`;

export const RefreshBtn = styled.button`
  background: white;
  border: 1px solid #e2e8f0;
  color: #0f172a;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.15s;

  &:hover {
    border-color: #0f172a;
    background: #f8fafc;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .spinner {
    width: 12px;
    height: 12px;
    border: 2px solid #e2e8f0;
    border-top-color: #0f172a;
    border-radius: 50%;
    animation: ${spin} 0.6s linear infinite;
  }
`;

/* ================================================================== */
/* SUMMARY STATS                                                      */
/* ================================================================== */
export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 24px;

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StatCard = styled.div`
  background: white;
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
  transition: transform 0.15s;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${({ accent }) => accent || "#0f172a"};
  }

  &:hover {
    transform: translateY(-2px);
  }

  .label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: #64748b;
    font-weight: 600;
  }
  .value {
    font-size: 28px;
    font-weight: 700;
    margin-top: 6px;
    color: #0f172a;
    line-height: 1;
  }
  .hint {
    font-size: 11px;
    color: #94a3b8;
    margin-top: 6px;
  }
`;

/* ================================================================== */
/* FILTERS                                                            */
/* ================================================================== */
export const FilterBar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  align-items: center;
  flex-wrap: wrap;
`;

export const FilterChip = styled.button`
  background: ${({ active }) => (active ? "#0f172a" : "white")};
  color: ${({ active }) => (active ? "white" : "#475569")};
  border: 1px solid ${({ active }) => (active ? "#0f172a" : "#e2e8f0")};
  padding: 7px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #0f172a;
  }
`;

export const SortSelect = styled.select`
  padding: 7px 12px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  background: white;
  font-size: 12px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s;

  &:hover,
  &:focus {
    border-color: #0f172a;
  }
`;

export const CountIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 8px 14px;
  background: #f1f5f9;
  border-radius: 10px;
  font-size: 12px;
  color: #475569;

  .count {
    font-weight: 600;
    color: #0f172a;
  }

  .show-all-btn {
    background: white;
    border: 1px solid #cbd5e1;
    color: #0f172a;
    padding: 4px 12px;
    border-radius: 14px;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;

    &:hover {
      border-color: #0f172a;
      background: #0f172a;
      color: white;
    }
  }
`;

export const SearchInput = styled.input`
  padding: 8px 14px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  font-size: 13px;
  width: 220px;
  margin-left: auto;
  outline: none;
  background: white;
  transition: border-color 0.15s;

  &:focus {
    border-color: #0f172a;
  }

  @media (max-width: 640px) {
    margin-left: 0;
    width: 100%;
  }
`;

/* ================================================================== */
/* CARDS                                                              */
/* ================================================================== */
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;

export const Card = styled.div`
  background: white;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.2s ease;
  position: relative;
  animation: ${fadeUp} 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ tier }) => COLORS[tier].accent};
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
    border-color: ${({ tier }) => COLORS[tier].accent};
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 16px 14px;
  gap: 10px;
`;

export const UserInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  min-width: 0;
  flex: 1;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 13px;
  flex-shrink: 0;
  letter-spacing: 0.3px;
  box-shadow: 0 2px 6px ${({ color }) => color}40;
`;

export const NameBlock = styled.div`
  min-width: 0;
  flex: 1;

  .name {
    font-size: 13px;
    font-weight: 600;
    color: #0f172a;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: capitalize;
  }
  .email {
    font-size: 11px;
    color: #64748b;
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .time {
    font-size: 11px;
    color: #94a3b8;
    margin-top: 3px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

export const ProgressRing = styled.div`
  position: relative;
  width: 52px;
  height: 52px;
  flex-shrink: 0;

  svg {
    transform: rotate(-90deg);
  }

  .pct {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    color: ${({ color }) => color};
  }
`;

/* ================================================================== */
/* SECTION PROGRESS                                                   */
/* ================================================================== */
export const SectionBar = styled.div`
  padding: 4px 16px 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SectionLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #64748b;
  font-weight: 600;

  .current {
    color: #0f172a;
    font-weight: 700;
  }
`;

export const SectionPills = styled.div`
  display: flex;
  gap: 4px;
`;

const sectionStateStyles = {
  completed: css`
    background: #10b981;
    color: white;
    border: 1px solid #10b981;
  `,
  active: css`
    background: #dbeafe;
    color: #1e40af;
    border: 1px solid #3b82f6;
    animation: ${pulse} 1.6s infinite;
    font-weight: 700;
  `,
  pending: css`
    background: white;
    color: #94a3b8;
    border: 1px dashed #cbd5e1;
  `,
};

export const SectionPill = styled.div`
  flex: 1;
  min-width: 0;
  padding: 5px 8px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ state }) => sectionStateStyles[state]};

  .icon {
    margin-right: 4px;
  }
`;

/* ================================================================== */
/* PER-SECTION QUESTION GRIDS                                         */
/* ================================================================== */
export const SectionGroup = styled.div`
  padding: 8px 16px 0;

  & + & {
    border-top: 1px dashed #e2e8f0;
    margin-top: 6px;
    padding-top: 10px;
  }
`;

export const SectionGridLabel = styled.button`
  /* clickable header — toggles the grid below */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: ${({ expanded }) => (expanded ? "#f8fafc" : "transparent")};
  border: none;
  font-family: inherit;
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 6px;
  padding: 6px 8px;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #f1f5f9;
    color: #0f172a;
  }

  .name-part {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .chevron {
    display: inline-block;
    font-size: 10px;
    color: #94a3b8;
    transition: transform 0.2s ease;
    transform: rotate(${({ expanded }) => (expanded ? "90deg" : "0deg")});
    flex-shrink: 0;
  }

  .indicator {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
    background: ${({ state }) =>
      state === "completed"
        ? "#10b981"
        : state === "active"
          ? "#3b82f6"
          : "#cbd5e1"};
  }

  .count {
    color: #94a3b8;
    font-size: 10px;
    font-weight: 600;
    text-transform: none;
    letter-spacing: 0;
    flex-shrink: 0;
    margin-left: 8px;
  }

  /* tiny preview swatches when collapsed (subtle status hint) */
  .preview {
    display: flex;
    gap: 2px;
    margin-left: 8px;
  }
`;

export const PreviewDot = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${({ status }) =>
    status === "correct"
      ? "#10b981"
      : status === "wrong"
        ? "#ef4444"
        : status === "partial"
          ? "#f59e0b"
          : status === "skipped"
            ? "#94a3b8"
            : "#e2e8f0"};
`;

export const CollapsibleArea = styled.div`
  overflow: hidden;
  transition:
    max-height 0.25s ease,
    opacity 0.2s ease;
  max-height: ${({ expanded }) => (expanded ? "1200px" : "0")};
  opacity: ${({ expanded }) => (expanded ? "1" : "0")};
`;

export const ExpandAllBtn = styled.button`
  background: ${({ expanded }) => (expanded ? "#0f172a" : "white")};
  color: ${({ expanded }) => (expanded ? "white" : "#0f172a")};
  border: 1px solid ${({ expanded }) => (expanded ? "#0f172a" : "#e2e8f0")};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 8px;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  justify-content: center;
  margin: 6px 16px;
  width: calc(100% - 32px);

  &:hover {
    border-color: #0f172a;
    background: ${({ expanded }) => (expanded ? "#1e293b" : "#f8fafc")};
  }
`;

/* ================================================================== */
/* CELL GRID                                                          */
/* ================================================================== */
export const CellGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 5px;
`;

export const Cell = styled.div`
  aspect-ratio: 1 / 1;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  background: ${({ status }) => COLORS[status]};
  color: ${({ status }) => (status === "none" ? "#94a3b8" : "white")};
  border: ${({ status }) => (status === "none" ? "1px solid #e2e8f0" : "none")};
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
  position: relative;

  &:hover {
    transform: scale(1.12);
    z-index: 2;
    box-shadow: 0 4px 10px rgba(15, 23, 42, 0.15);
  }
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 14px 16px;
  margin-top: 14px;
  border-top: 1px solid #f1f5f9;
  background: #fafbfc;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #475569;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ color }) => color};
  }
`;

export const ViolationBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ severe }) => (severe ? "#fee2e2" : "#fef3c7")};
  color: ${({ severe }) => (severe ? "#b91c1c" : "#92400e")};
  font-size: 10px;
  font-weight: 700;
  padding: 3px 7px;
  border-radius: 6px;
  z-index: 2;
`;

/* ================================================================== */
/* LEGEND + STATES                                                    */
/* ================================================================== */
export const Legend = styled.div`
  margin-top: 28px;
  padding: 16px 20px;
  background: white;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;

  .legend-title {
    font-size: 12px;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-right: 8px;
  }
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #475569;

  .swatch {
    width: 16px;
    height: 16px;
    border-radius: 5px;
    background: ${({ color }) => color};
    ${({ border }) => border && "border: 1px solid #e2e8f0;"}
  }
`;

/* ================================================================== */
/* PAGINATION                                                         */
/* ================================================================== */
export const PaginationBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding: 16px 20px;
  background: white;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  flex-wrap: wrap;
`;

export const PageBtn = styled.button`
  background: ${({ primary }) => (primary ? "#0f172a" : "white")};
  color: ${({ primary }) => (primary ? "white" : "#0f172a")};
  border: 1px solid ${({ primary }) => (primary ? "#0f172a" : "#e2e8f0")};
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 100px;
  justify-content: center;

  &:hover:not(:disabled) {
    border-color: #0f172a;
    background: ${({ primary }) => (primary ? "#1e293b" : "#f8fafc")};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const PageInfo = styled.div`
  font-size: 13px;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 10px;

  .current {
    font-weight: 700;
    color: #0f172a;
    font-size: 14px;
  }

  .range {
    font-size: 11px;
    color: #94a3b8;
    margin-left: 4px;
  }
`;

export const PageNumberInput = styled.input`
  width: 60px;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  outline: none;
  color: #0f172a;

  &:focus {
    border-color: #0f172a;
  }
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 20px;
  color: #64748b;
  font-size: 14px;
  background: white;
  border-radius: 14px;
  border: 1px dashed #e2e8f0;
`;

export const ErrorBanner = styled.div`
  margin-bottom: 16px;
  padding: 12px 16px;
  background: #fee2e2;
  color: #991b1b;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid #fecaca;
`;
