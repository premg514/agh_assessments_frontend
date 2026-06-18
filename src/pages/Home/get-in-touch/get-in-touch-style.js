import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 3rem;
  background-color: #fc2947df;
  position: relative;
  overflow: hidden;
`;

// Styled components
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  max-width: 1400px;
  width: 95%;
  z-index: 10;
  margin: 0 auto;
  color: white;
  padding: 2rem 0;
  flex-direction: column;
  text-align: center;
  gap: 50px; /* Adjust space between text and image */

  @media screen and (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 50px;
    text-align: left;
  }
`;

export const TextSection = styled.div`
  max-width: 600px;
  text-align: center;

  @media (min-width: 1024px) {
    text-align: left;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;

  @media screen and (min-width: 540px) {
    font-size: 3.5rem; /* Smaller font size for extra small screens */
  }
  @media screen and (min-width: 1200px) {
    font-size: 5rem; /* Smaller font size for extra small screens */
  }
`;

export const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  max-width: 420px;

  @media (max-width: 480px) {
    font-size: 1rem; /* Smaller font size for extra small screens */
  }
`;

export const Button = styled.button`
  background-color: white;
  color: #161616;
  border: none;
  padding: 10px 20px;
  font-family: "Work Sans", sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 21.11px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  @media (max-width: 768px) {
    align-self: center; /* Center the button on smaller screens */
  }
`;
export const ImageSection = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  max-width: 720px;
  flex: 1;
  & > .blob {
    position: absolute;
    transform: translate(0%, 40px);
    width: 420px;
    height: 280px;
    z-index: -1;
    background-image: url("./Polygon.png");
    background-position: right top;
    background-size: contain;
    background-repeat: no-repeat;
    rotate: 15deg;
  }

  img {
    width: 300px;
    height: 300px;
    z-index: 100;
    position: relative;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }

  @media screen and (min-width: 540px) {
    img {
      width: 340px;
      height: 340px;
    }
  }

  @media screen and (min-width: 1024px) {
    img {
      width: 360px;
      height: 360px;
    }

    & > .blob {
      transform: translate(0%, -100px);
      width: 700px;
      height: 500px;
    }
  }

  @media screen and (min-width: 1200px) {
    img {
      width: 400px;
      height: 400px;
    }
  }
`;
