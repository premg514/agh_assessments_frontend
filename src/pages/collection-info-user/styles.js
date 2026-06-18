import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
export const AptitudeTopicsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 24px;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export const TopicCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(102, 126, 234, 0.3);
  }

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  ${(props) =>
    props.$subscribtion &&
    `
    filter: blur(3px);
    pointer-events: none;
  `}
`;

export const TopicHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const TopicTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    font-size: 24px;
  }
`;

export const TopicStats = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

export const StatBadge = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    font-size: 16px;
  }
`;

export const ProgressBarContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 12px;
`;

export const ProgressBarLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 6px;
  opacity: 0.9;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.body.secondary.hover};
  border-radius: 10px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #4ade80 0%, #22c55e 100%);
  border-radius: 10px;
  transition: width 0.5s ease;
  width: ${(props) => props.$progress}%;
`;

export const QuestionsList = styled.div`
  margin-top: 16px;
  max-height: 250px;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

export const QuestionItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-bottom: 8px;
  text-decoration: none;
  color: white;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(5px);
  }
`;

export const QuestionNumber = styled.div`
  min-width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
`;

export const QuestionText = styled.div`
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const QuestionDifficulty = styled.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background: ${(props) => {
    switch (props.$difficulty?.toLowerCase()) {
      case "easy":
        return "rgba(52, 211, 153, 0.3)";
      case "medium":
        return "rgba(251, 191, 36, 0.3)";
      case "hard":
        return "rgba(239, 68, 68, 0.3)";
      default:
        return "rgba(255, 255, 255, 0.2)";
    }
  }};
  color: white;
  text-transform: capitalize;
`;

export const StartButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
  background: rgba(255, 255, 255, 0.9) !important;
  color: #667eea !important;
  font-weight: 600;
  padding: 12px;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: white !important;
    transform: scale(1.02);
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;

  h3 {
    font-size: 24px;
    margin-bottom: 12px;
    color: #333;
  }

  p {
    font-size: 16px;
    color: #999;
  }
`;

export const BackButton = styled.button`
  cursor: pointer;
  margin: 0.25rem 0;
  width: fit-content;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text.primary};
`;

export const ViewProblemSetStyle = styled.div`
  padding: 1rem 1.5rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & .top-details {
    display: flex;
    gap: 1.5rem;
    justify-content: space-between;
    flex-wrap: wrap;

    & > .info-container {
      display: flex;
      gap: 1rem;
      flex-grow: 1;
      flex-wrap: wrap;

      & > div:first-of-type {
        max-width: 300px;
        width: 100%;
      }
    }
  }

  .greet_container {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;

    & > *:first-child {
      flex-grow: 1;
    }
  }

  .problem_set_info_section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex-grow: 1;
    h1 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    & > div {
      p.update_time {
        display: inline-block;
        margin-right: 0.5rem;
      }
    }

    & .social_actions {
      display: flex;
      gap: 1rem;
      & > button {
        border: none;
        background: none;
        cursor: pointer;

        & > * {
          color: ${({ theme }) => theme.text.primary};
        }
      }
    }
  }

  @media screen and (max-width: 920px) {
    margin-bottom: 28px;
    padding: 0.75rem;
  }
`;

export const ProblemSetGroupStyle = styled.div`
  width: 100%;
  position: relative;

  table {
    box-shadow: 0 0 4px 0 ${({ theme }) => theme.shadow.opacity_20};
    overflow: hidden;
    border-radius: 8px;
    width: 100%;
    border-collapse: collapse;

    td,
    th,
    tr,
    tbody,
    thead {
      padding: 1rem 0.5rem;
      text-align: left;
    }

    thead {
      border-radius: 8px 8px 0 0;
    }

    tbody {
      border-radius: 0 0 8px 8px;
    }

    tr > th {
      padding-left: 2rem;
      font-weight: 500;
      background-color: ${({ theme }) => theme.body.secondary.base};
    }

    tr {
      background-color: ${({ theme }) => theme.body.primary.base};
    }

    tr:hover {
      background-color: ${({ theme }) => theme.body.primary.hover};
    }
  }
`;

export const ProblemSetGroupProblemRowStyle = styled.tr`
  &.active {
    td {
      background-color: ${({ theme }) => theme.body.primary.active};
    }
  }
  .problem-title {
    color: ${({ theme }) => theme.link_sky_blue};
    text-decoration: none;
  }

  td.checkbox,
  td.difficulty {
    width: 100px;
  }

  td.checkbox {
    text-align: center;
  }
`;

export const CongratsGreeting = styled.div`
  background-image: linear-gradient(to right, #ffe8d0, #fff4e8);
  border-left: 4px solid #ff7243;
  border-right: 4px solid #ff7243;
  border-radius: 8px;
  text-align: center;
  padding: 0.5rem;
  color: #333333;
`;

export const MCQSetGroupStyle = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 4px 0 ${({ theme }) => theme.shadow.opacity_20};

  & > * {
    padding: 1rem 2rem;
  }

  & > .title {
    background-color: ${({ theme }) => theme.body.secondary.base};
  }
`;

export const TabsStyle = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  & > button {
    width: 100%;
    border-bottom: 2px solid #c5c5c5;
    color: #828282;
    cursor: pointer;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;

    &.active {
      color: #fd6a7f;
      border-bottom: 3px solid #fd6a7f;
    }
  }
`;
