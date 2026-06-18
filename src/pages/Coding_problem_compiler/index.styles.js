// layout
import styled from "styled-components";

const headerHeight = 58;

export const TopHeader = styled.div`
  height: ${headerHeight - 10 + "px"};
  border-bottom: 1px solid ${({ theme }) => theme.border.primary};

  @media screen and (min-width: 920px) {
    height: ${headerHeight + "px"};
  }
`;

export const Layout = styled.div`
  height: ${({ $additionHeight }) =>
    `calc(100vh - ${headerHeight + parseInt($additionHeight || "0")}px)`};
  display: flex;
  padding: 0.5rem;

  @media (max-width: 920px) {
    flex-direction: column;
    gap: 1rem;
    height: 100%;
  }
`;

export const LeftPartContainer = styled.div`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border.primary};
  height: auto;
  display: grid;
  grid-template-rows: 40px 1fr;

  @media (max-width: 920px) {
    height: 100%;
  }
`;

export const RightPartContainer = styled.div``;

export const HorizontalSlider = styled.div`
  width: 4px;
  background-color: transparent;
  margin: 0 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  height: 100%;
  &:hover {
    cursor: ew-resize;
    background-color: rgb(41, 132, 252);
    & > span {
      background-color: transparent;
    }
  }

  & > span {
    width: 4px;
    height: 20px;
    background-color: #aaa;
    border-radius: 10px;
  }
`;
