import styled from "styled-components";

export const Card = styled.div`
  padding: 24px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border.primary};
  background: ${({ theme }) => theme.body.primary.base};
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
`;

export const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;

  background: ${({ status, theme }) =>
    status === "Upcoming"
      ? theme.announcement_yellow
      : status === "Running"
        ? theme.difficulty.easy.bg
        : theme.body.secondary.base};

  color: ${({ status, theme }) =>
    status === "Upcoming"
      ? theme.text.primary
      : status === "Running"
        ? theme.difficulty.easy.text
        : theme.text.secondary};
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span:first-child {
    font-size: 13px;
    color: ${({ theme }) => theme.text.secondary};
  }

  span:last-child {
    font-size: 15px;
    font-weight: 500;
    color: ${({ theme }) => theme.text.primary};
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;

  .buttons_container {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .group_header_actions {
    gap: 12px;
  }

  .group_action_button {
    min-width: 72px;
    padding: 10px 18px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    line-height: 1;
    transition: all 0.2s ease;
  }

  .group_edit_button {
    color: #fc2947;
    background: transparent;
  }

  .group_edit_button:hover {
    background: #fff5f7;
  }

  .group_add_button {
    background: #ffeaed;
    color: #fc2947;
    border-radius: 4px;
  }

  .group_add_button:hover {
    background: #ffe3e8;
  }

  .group_action_button svg {
    font-size: 12px;
  }

  .group_download_button {
    background: #00aa72;
  }
`;

export const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SectionCard = styled.div`
  border: 1px solid ${({ theme }) => theme.border.secondary};
  border-radius: 10px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: ${({ theme }) => theme.body.secondary.base};

  .buttons_container {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
  }
`;

export const SectionTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.text.primary};
`;

export const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.text.secondary};
`;
