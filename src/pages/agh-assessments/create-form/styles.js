import styled from "styled-components";

export const AGH_Assessment_form = styled.div`
  max-width: 1440px;
  margin: 0 auto;

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

  .problem_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }

  .manual_mcq_form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .manual_mcq_selected_preview {
    border: 1px solid ${({ theme }) => theme.border.primary};
    border-radius: 0.5rem;
    padding: 0.75rem;
    background-color: ${({ theme }) => theme.body.primary.base};
  }

  .manual_mcq_selected_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }

  .manual_mcq_selected_header h3 {
    margin: 0;
    font-size: 1rem;
  }

  .manual_mcq_empty_state {
    color: ${({ theme }) => theme.text.secondary};
    padding: 0.75rem 0;
  }

  .manual_mcq_preview_table_wrapper {
    overflow-x: auto;
  }

  .manual_mcq_preview_table_wrapper table {
    width: 100%;
    border-collapse: collapse;
  }

  .manual_mcq_preview_table_wrapper th,
  .manual_mcq_preview_table_wrapper td {
    border-bottom: 1px solid ${({ theme }) => theme.border.primary};
    padding: 0.625rem;
    text-align: left;
    vertical-align: top;
  }

  .manual_mcq_preview_table_wrapper th:first-child,
  .manual_mcq_preview_table_wrapper td:first-child {
    width: 70px;
  }

  .manual_mcq_preview_table_wrapper th:nth-child(3),
  .manual_mcq_preview_table_wrapper td:nth-child(3),
  .manual_mcq_preview_table_wrapper th:nth-child(4),
  .manual_mcq_preview_table_wrapper td:nth-child(4) {
    width: 120px;
  }

  .manual_mcq_card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.75rem;
    border: 1px solid ${({ theme }) => theme.border.primary};
    border-radius: 0.5rem;
  }

  textarea {
    width: 100%;
    min-height: 80px;
    resize: vertical;
  }

  .question_config_inputs_container {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .counts_container {
    margin-top: 1rem;
  }

  .remove_btn {
    align-self: flex-end;
    margin-top: 0.75rem;
  }
`;
