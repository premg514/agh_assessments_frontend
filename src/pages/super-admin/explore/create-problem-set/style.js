import styled from "styled-components";

// Define breakpoints for responsive design
const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  laptop: "1024px",
};



















export const ErrorMessage = styled.p`
  color: #ff3a5c;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 0;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
  }
`;




















