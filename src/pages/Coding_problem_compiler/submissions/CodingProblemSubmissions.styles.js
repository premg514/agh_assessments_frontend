import styled from "styled-components";

export const SubmissionContainerLayout = styled.div`
  height: 100%;
  overflow: auto;
`;

export const SubmissionsGridContainer = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr 1fr 100px 100px;

  .grid-row.header-row > div {
    position: sticky;
    top: 0;
  }

  .grid-row {
    display: contents;
    & > div {
      padding: 0.5rem 0.5rem;
      border-bottom: 1px solid ${({ theme }) => theme.border.primary};
      cursor: pointer;
    }
  }

  .data-row:hover > div {
    background-color: ${({ theme }) => theme.body.primary.hover};
  }

  .status_green {
    color: #28a745;
  }

  .status_red {
    color: #dc3545;
  }
`;

// submission detials

export const SubmissonDetailsContainer = styled.div`
  .top_part {
    border-bottom: 1px solid ${({ theme }) => theme.border.primary};
  }

  .button_back {
    background-color: ${({ theme }) => theme.body.primary.base};
    color: ${({ theme }) => theme.text.secondary};
    border: none;
    padding: 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.body.primary.hover};
    }
  }
`;

export const Container = styled.div`
  padding: 1rem;
`;



export const Status = styled.div`
  font-weight: bold;
  margin-bottom: 1rem;
  color: ${({ status }) => (status === "Accepted" ? "green" : "red")};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StatRow = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const Label = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

export const Pre = styled.p`
  background: ${({ theme }) => theme.body.secondary.base};
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 0.9rem;
  width: 100%;
`;

export const Section = styled.div`
  margin-bottom: 1.5rem;
`;

export const ErrorSection = styled.div`
  color: #c0392b;
`;
