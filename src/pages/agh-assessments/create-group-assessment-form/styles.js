import styled from "styled-components";

export const AGH_Assessment_form = styled.div`
  padding: 1rem;
  max-width: 1440px;
  margin: 0 auto;
  width: 95%;

  & .sections_container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const AGH_Assessment_form_section_container = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.border.primary};
  border-radius: 0.5rem;

  .flex_col_box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 0.75rem;
  }

  .problems_choose {
    padding: 0.75rem;
    border: 1px solid ${({ theme }) => theme.border.primary};
    border-radius: 0.5rem;
  }

  .question_config_inputs_container {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .counts_container {
    margin-top: 1rem;
  }

  .remove_btn {
    align-self: flex-end;
    margin-top: 0.75rem;
  }
`;
