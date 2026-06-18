import styled from "styled-components";

export const FooterWrapper = styled.footer`
  background-color: #2c2e32;
  padding: 3rem 4rem;
  color: white;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  @media (min-width: 768px) {
    padding: 2rem;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const LeftSection = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.img`
  width: 220px;
  margin-left: -2px;
  margin-bottom: 0.8rem;
  color: white;
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0.2rem 0;
`;

export const Subtitle = styled.p`
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 1rem;

  &.copyright {
    text-align: center;
  }

  @media screen and (min-width: 640px) {
    &.copyright {
      text-align: initial;
    }
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
`;

export const IconLink = styled.a`
  width: 50px;
  height: 50px;
  background-color: #363b4766;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 22px;

  &:hover {
    background-color: #ff3d57;
  }
`;

export const RightSection = styled.div`
  display: flex;
  gap: 3rem;
  flex: 1;
  min-width: 280px;
  justify-content: flex-end;
`;

export const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  align-items: flex-start;
`;

export const LinkTitle = styled.h4`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 0.7rem;
`;

export const LinkItem = styled.a`
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  color: #ccc;
  text-decoration: none;

  &:hover {
    color: white;
  }
`;

export const LinkButton = styled.button`
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  color: #ccc;
  border: none;
  text-decoration: none;
  background-color: inherit;

  &:hover {
    color: white;
  }
`;
