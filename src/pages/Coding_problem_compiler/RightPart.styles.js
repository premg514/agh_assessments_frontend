import styled from "styled-components";

export const RightPartLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  @media (max-width: 920px) {
    gap: 1rem;
  }
`;

export const VerticalSlider = styled.div`
  width: 100%;
  height: 5px;
  cursor: row-resize;
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px 0;

  &:hover {
    cursor: row-resize;
    background-color: rgb(41, 132, 252);
    & > span {
      background-color: transparent;
    }
  }

  span {
    width: 20px;
    height: 4px;
    background-color: #aaa;
    border-radius: 10px;
  }
`;
