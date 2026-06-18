import styled from "styled-components";

const headerHeight = 48; // in px;

export const Nav = styled.nav`
  background-color: ${({ theme }) => theme.body.primary.base};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  /* Reduced padding for lower navbar height */
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  position: sticky;
  top: 0;
  z-index: 200;

  .flex_container {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  @media (min-width: 920px) {
    display: none;
  }
`;

export const HeaderTopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  padding: 0 0.5rem;
  height: ${headerHeight + "px"};

  @media (min-width: 920px) {
    gap: 1.5rem;
  }
`;

export const Logo = styled.img`
  width: 150px;
  object-fit: contain;
  @media (max-width: 920px) {
    width: 120px;
  }
`;

export const HamburgerButton = styled.button`
  display: block;
  border: none;
  background-color: ${({ theme }) => theme.body.primary.base};
  color: ${({ theme }) => theme.text.primary};
  position: relative;

  & > .icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  @media (min-width: 920px) {
    display: none;
  }
`;

export const HighLightDot = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  color: #eb6363;
`;

export const MobileDrawer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;

  width: 260px;
  max-width: 100vw; /* Prevent horizontal overflow */
  height: calc(100vh - ${headerHeight + "px"}); /* Full height minus navbar */
  background: ${({ theme }) => theme.body.primary.base};
  box-shadow: 0 8px 16px ${({ theme }) => theme.shadow.opacity_10};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-bottom: 40px;
  z-index: 1000;
  overflow-y: auto; /* Allow scrolling within the drawer if content is long */

  @media (min-width: 920px) {
    display: none;
  }
`;

export const MobileNavLinks = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const MobileNavLink = styled.li`
  cursor: pointer;
  font-size: 1rem;
  color: ${({ theme }) => theme.text.primary};
  display: flex;
  align-items: center;
  justify-content: space-between; /* Changed from gap to space-between */
  border-bottom: 1px solid #dddddd;
  padding: 1rem 0;

  &:last-child {
    border-bottom: none;
  }

  .link {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  span {
    color: ${({ theme }) => theme.text.primary};
  }

  & svg {
    color: ${({ theme }) => theme.text.secondary};
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const MobileUserProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
`;

export const MobileUserAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

export const MobileUserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MobileUserName = styled.span`
  font-weight: 600;
  text-transform: capitalize;
  color: ${({ theme }) => theme.text.primary};
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export const MobileUserCollege = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text.secondary};
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export const AssessmentMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AssessmentHeader = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text.primary};
`;

export const AssessmentSection = styled.h4`
  font-size: 1rem;
  color: ${({ theme }) => theme.text.primary};
  font-weight: 500;
  margin-top: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #dddddd;
`;

export const AssessmentItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
  cursor: pointer;
`;

export const IconWrapper = styled.div`
  color: ${(props) => props.color || "#000"};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
`;

export const AssessmentItemText = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text.primary};
`;

export const AssessmentItemSubText = styled.span`
  font-size: 0.8rem;
  padding-top: 0.25rem;
  color: ${({ theme }) => theme.text.secondary};
`;

export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
