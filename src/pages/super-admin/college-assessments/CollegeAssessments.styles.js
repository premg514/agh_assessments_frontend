import styled from "styled-components";

export const Layout = styled.main`
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 28px 0 48px;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #d9e1ec;
  background: #fff;
  color: #26364d;
  border-radius: 8px;
  padding: 10px 14px;
  cursor: pointer;
`;

export const Meta = styled.p`
  margin: 6px 0 0;
  color: #667085;
  font-size: 14px;
`;

export const Tabs = styled.div`
  display: flex;
  gap: 8px;
  margin: 24px 0;
  overflow-x: auto;
`;

export const TabButton = styled.button`
  border: 1px solid #d9e1ec;
  background: #fff;
  color: #344054;
  border-radius: 8px;
  padding: 10px 14px;
  cursor: pointer;
  white-space: nowrap;

  &.active {
    background: #1f5eff;
    border-color: #1f5eff;
    color: #fff;
  }
`;

export const Section = styled.section`
  margin-top: 24px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
  flex-wrap: wrap;

  h2 {
    margin: 0;
    font-size: 20px;
    color: #172033;
  }
`;

export const ActionBar = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const AssessmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

export const AssessmentCard = styled.article`
  position: relative;
  border: 1px solid #d9e1ec;
  border-radius: 8px;
  background: #fff;
  padding: 16px;

  h3 {
    margin: 0;
    font-size: 17px;
    line-height: 1.35;
    color: #101828;
  }

  .unassign-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    background: transparent;
    border: none;
    color: #f44336;
    font-size: 18px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover .unassign-btn {
    opacity: 1;
  }
`;

export const CardActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 16px;

  .wide {
    grid-column: 1 / -1;
  }

  button {
    grid-column: 1 / -1;
  }
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #475467;
  font-size: 13px;
`;

export const Input = styled.input`
  width: 100%;
  min-height: 40px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  padding: 8px 10px;
  color: #101828;
  background: #fff;
`;

export const PaginationBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 28px;
  flex-wrap: wrap;
`;

export const PaginationButton = styled.button`
  min-height: 38px;
  border: 1px solid #d0d5dd;
  background: #fff;
  color: #344054;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover:not(:disabled) {
    background: #f9fafb;
    border-color: #98a2b3;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.08);
  }

  &:disabled {
    color: #98a2b3;
    background: #f9fafb;
    cursor: not-allowed;
  }
`;

export const PaginationStatus = styled.span`
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  border: 1px solid #eaecf0;
  background: #f9fafb;
  color: #475467;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
`;

export const DeleteConfirmationHint = styled.p`
  color: #64748b;
  font-size: 13px;
  margin: 0 0 8px;
`;

export const DeleteConfirmationInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  color: #0f172a;
  font-size: 14px;
  margin-bottom: 16px;
  padding: 10px 12px;

  &:focus {
    border-color: #2563eb;
    outline: none;
  }
`;
