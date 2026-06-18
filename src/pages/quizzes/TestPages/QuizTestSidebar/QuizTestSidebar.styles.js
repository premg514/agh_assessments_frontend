import styled from "styled-components";
export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.body.secondary.base};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .cross_btn {
    position: sticky;
    width: fit-content;
    padding: 0.5rem;
    border: none;
    background-color: ${({ theme }) => theme.body.secondary.base};
    top: 0px;
    z-index: 100;

    & > * {
      width: 32px;
      height: 32px;
      border-radius: 50px;
      cursor: pointer;
    }

    &:hover {
      & > * {
        color: ${({ theme }) => theme.primary.base};
      }
    }
  }

  @media (min-width: 768px) {
    padding-left: 1.5rem; /* md:px-6 */
    padding-right: 1.5rem;
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileImage = styled.img`
  border-radius: 0.75rem; /* rounded-xl */
  height: 2.5rem; /* h-10 */
  width: 2.5rem; /* w-10 */
  margin-right: 0.75rem; /* mr-3 */
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: black;
  display: flex;
  align-items: center;
  position: relative;
  top: 1rem;
  left: 0.5rem;

  &:hover {
    opacity: 0.8;
  }
`;

export const Content = styled.div`
  /* gray-200 */
  flex: 1;
  overflow-y: auto;
`;
