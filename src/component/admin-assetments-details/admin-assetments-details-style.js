import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.body.secondary.base};
  border-radius: 16px;
  margin: 1rem auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 100%;

  @media (min-width: 768px) {
    padding: 2rem;
    margin: 2rem auto;
  }
`;















// export const SearchInput = styled.input`
//   padding: 0;
//   border-radius: 8px;
//   border: none;
//   background-color: #f8f9fa;
//   outline: none;
//   font-size: 0.9rem; // Adjusted font size
//   color: #a0a0a0;
//   width: 100%; // Ensure input takes available space in its container
//   &::placeholder {
//     color: #a0a0a0;
//   }
//   @media (min-width: 576px) {
//     font-size: 1rem;
//   }
// `;







const Row = styled.div`
  background-color: ${({ theme }) => theme.body.primary.base};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  div.table_item {
    margin: 0;
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
  }

  div.table_item > strong {
    color: #555;
  }

  .action-container {
    display: flex;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(6, 1fr); // Match the header
    padding: 1rem;
    border-bottom: 1px solid #eee;
    border-radius: 0;
    margin-bottom: 0;
    align-items: center;
    gap: 0;

    div.table_item {
      display: block;
      font-size: 1rem;
    }

    div.table_item > strong {
      display: none;
    }

    .action-container {
      flex-direction: row;
      gap: 1rem;
      align-items: center;
      margin-top: 0;
    }
  }
`;


