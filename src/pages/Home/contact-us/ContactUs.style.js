import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 350px;
`;

export const CrossContainer = styled.div`
  position: absolute;
  cursor: pointer;
  right: 0;
  top: 0;
  background-color: #eee;
  padding: 0.25rem;
  width: 50px;
  height: 40px;
  align-items: center;
  justify-content: center;
  display: flex;
  transition: background-color 100ms linear;

  &:hover {
    background-color: #ddd;
  }

  &.relative {
    position: relative;
  }
`;

export const ContactDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  .contact_details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.5rem;
    align-items: center;
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid #ddd;

    p {
      width: 100%;
      word-break: break-all;
      text-align: center;
    }

    .text-lg {
      font-size: 1rem;
    }
  }
`;

export const Form = styled.form`
  display: grid;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Heading = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-top: 1.25rem;
  line-height: 1.3;
  letter-spacing: 0.5px;
`;

export const SubText = styled.p`
  font-size: 0.875rem;
`;

export const TabContainer = styled.div`
  display: flex;

  & button {
    background-color: #fff;
    border: none;
    width: 100%;
    padding: 0.5rem;
    color: #1a1a1d;
    font-size: 1.125rem;
    text-align: center;
    border-bottom: 1px solid #ccc;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    cursor: pointer;
  }

  & button.hover {
    &:hover {
      background-color: #fafafa;
    }
  }

  & .active {
    background-color: #eee;
  }
`;
