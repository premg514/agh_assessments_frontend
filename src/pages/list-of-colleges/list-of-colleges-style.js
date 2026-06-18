import styled from "styled-components";
export const ListOfCollegeStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
  @media (max-width: 920px) {
    padding: 15px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #ddd;
  }

  th,
  td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
    text-align: left;
    cursor: pointer;
  }

  th {
    background-color: ${({ theme }) => theme.body.primary.base};
    color: ${({ theme }) => theme.text.primary};
    font-weight: bold;
  }

  td:last-child {
    border-right: 1px solid #ddd;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background-color: ${({ theme }) => theme.body.primary.hover};
  }
  .heading__box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 60px;
    @media (max-width: 920px) {
    }
  }
  .heading {
    font-weight: 700;
    font-size: 25px;
    @media (max-width: 920px) {
      font-size: 20px;
    }
  }
`;
