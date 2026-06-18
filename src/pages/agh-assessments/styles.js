import styled from "styled-components";

export const AGHAssessmentWrapper = styled.div`
  max-width: 1440px;
  width: 95%;
  margin: 0 auto;
  padding: 1rem 0;

  .heading-container {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: flex-start;
  }

  .heading-container .assessment-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .assessment-filters {
    display: flex;
    gap: 1rem;
    align-items: flex-end;
    flex-wrap: wrap;
    margin-top: 1rem;
  }

  .filter-item {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .filter-item label {
    font-size: 0.9rem;
    font-weight: 600;
  }
`;
