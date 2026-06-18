import styled, { css } from "styled-components";

export const EditCollectionStyle = styled.div`
  .layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    border-radius: 8px;
  }

  .content_container {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    overflow: auto;
    gap: 0.5rem;

    &:first-of-type {
      border-bottom: 1px solid ${({ theme }) => theme.border.primary};
      border-right: none;
    }
  }

  .filter_container {
    margin-top: 0.5rem;
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .select-btn,
  .remove-btn {
    width: fit-content;
    color: ${({ theme }) => theme.link_sky_blue};
    cursor: pointer;

    &:disabled {
      opacity: 0.7;
    }
  }

  .problem_select_footer {
    padding: 0.5rem;
    margin-top: 0.25rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  & .problems {
    margin-top: 1rem;
    height: 60vh;
    overflow: auto;

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

  .save-btn {
    margin-left: auto;
    margin-top: 1rem;
  }

  @media screen and (min-width: 1060px) {
    .layout {
      grid-template-columns: 1fr 1fr;
      gap: 0rem;
    }

    .content_container {
      display: flex;
      flex-direction: column;
      padding: 0.5rem;

      &:first-of-type {
        border-right: 1px solid ${({ theme }) => theme.border.primary};
        border-bottom: none;
      }
    }
  }
`;
