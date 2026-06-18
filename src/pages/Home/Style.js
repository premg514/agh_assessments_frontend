import styled from "styled-components";

export const HeaderStyle = styled.nav`
  height: 60px;
  padding-inline: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.body.primary.base};

  img {
    width: 120px;
    object-fit: contain;
  }

  .flex_container {
    display: flex;
    align-items: center;
  }

  .button__container {
    display: flex;
    gap: 0.625rem;
    align-items: center;
  }

  @media screen and (min-width: 540px) {
    img {
      width: 150px;
    }
  }
`;
