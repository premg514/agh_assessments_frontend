import styled from "styled-components";

export const BackButton = styled.button`
  cursor: pointer;
  margin: 0.25rem 0;
  width: fit-content;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text.primary};
`;

export const ViewProblemSetStyle = styled.div`
  padding: 0.75rem;
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

  .problem_set_info_section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
      button {
        border: none;
        background-color: transparent;
        cursor: pointer;
        color: ${({ theme }) => theme.primary.base};
      }
    }
  }
`;

export const CollectionsOfProblemSetStyle = styled.div`
  border: 1px solid ${({ theme }) => theme.border.primary};
  border-radius: 8px;
  box-shadow: 0px 0px 4px 0px ${({ theme }) => theme.shadow.opacity_15};
  padding: 1rem;

  & > .collection-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  & .collections_list_container {
    table {
      border-top: 2px solid ${({ theme }) => theme.border.primary};
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

      tr > th {
        background-color: ${({ theme }) => theme.body.secondary.base};
      }

      tr {
        background-color: ${({ theme }) => theme.body.primary.base};
      }

      tr:hover {
        background-color: ${({ theme }) => theme.body.primary.hover};
      }

      & td.actions,
      th.actions {
        width: 80px;
      }

      & td.actions {
        text-align: center;
        button {
          border: none;
          background-color: transparent;
          cursor: pointer;
          color: ${({ theme }) => theme.text.primary};
        }

        button:hover {
          color: ${({ theme }) => theme.primary.base};
        }

        button:first-of-type {
          margin-right: 0.5rem;
        }
      }
    }
  }
`;
