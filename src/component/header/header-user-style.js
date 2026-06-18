import styled from "styled-components";
export const HeaderStyled = styled.div`
  position: sticky;
  border-bottom: 1px solid ${({ theme }) => theme.border.primary};
  background-color: ${({ theme }) => theme.body.primary.base};
  top: 0;
  z-index: 100;
  display: block;
  padding-top: 4px;
  height: 58px;

  @media (max-width: 920px) {
    display: none;
    padding: 10px 20px 10px 10px;
  }
  & > section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
    img.company__logo {
      width: 150px;
      object-fit: contain;
      @media (max-width: 920px) {
        width: 120px;
      }
    }

    .element {
      display: flex;
      align-items: center;
      gap: 0px;
    }

    .element__item {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 40px;
      @media (max-width: 920px) {
      }
    }
    .test__element {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      @media (max-width: 920px) {
      }
    }
    .time__text {
      font-weight: 700;
      font-size: 16px;
      @media (max-width: 920px) {
      }
    }
    .timer__bar {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: red;
      color: white;
      padding: 8px;
      border-radius: 10px;
      margin-right: 10px;
      min-width: 70px;
      @media (max-width: 920px) {
      }
    }

    .profile-btn {
      width: 40px;
      height: 40px;
      border: none;
      border-radius: 50px;
      overflow: hidden;
    }

    .button__box {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      @media (max-width: 920px) {
      }
    }

    .login__button__text {
      color: black;
      font-weight: 700;
      @media (max-width: 920px) {
      }
    }

    .navbar {
      position: relative;
      display: flex;
      @media (max-width: 920px) {
        top: 0;
        left: 0;
        height: 100%;
        width: 50%;
        position: fixed;
        padding: 100px 20px 20px 20px;
        z-index: 1;
        background-color: ${({ theme }) => theme.body.primary.base};
        transform: translate(${(props) => props.value});
        transition: transform 0.2s ease-out;
      }
    }
    .icon__style {
      margin-left: 5px;
      @media (max-width: 920px) {
      }
    }
    ul {
      display: flex;
      gap: 1.25rem;
      margin: 0;
      list-style-type: none;
      @media (max-width: 920px) {
        min-height: auto;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
      }
    }
    .link__style {
      text-decoration: none;
      cursor: pointer;
    }
    li {
      display: flex;
      cursor: pointer;
      position: relative;

      @media (max-width: 920px) {
        padding: 20px;
      }
    }
    li:hover {
      .link {
        text-decoration: none;
        position: relative;
        @media (max-width: 920px) {
          font-size: 10px;
        }
      }
    }
    /* 
    .click__box:hover .sublist__box {
      animation: fadeIn 0.5s ease forwards;
    } */

    .link {
      text-decoration: none;
      color: ${({ theme }) => theme.text.primary};
      display: flex;
      font-size: 16px;
      padding: 0.25rem 0;
      font-weight: 500;
      position: relative;
      border-bottom: 2px solid;
      border-color: transparent;
      transition: border-color 300ms linear ease-in-out;
      @media (max-width: 920px) {
        font-size: 10px;
      }
    }

    .active_navlink {
      border-color: ${({ theme }) => theme.primary.base};
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
        // transform: translateY(-60px);
      }
      100% {
        opacity: 1;
        // transform: translateY(0);
      }
    }
    @media (max-width: 920px) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .dropdown {
    position: relative;
    @media (max-width: 920px) {
    }
    .dropdown__content {
      display: none;
      position: absolute;
      z-index: 1;
      @media (max-width: 920px) {
      }
    }
  }
  .dropdown:hover {
    position: relative;
    @media (max-width: 920px) {
    }
    .dropdown__content {
      position: absolute;
      display: block;
      z-index: 1;
      @media (max-width: 920px) {
      }
    }
  }
  .dropdown__box {
    @media (max-width: 920px) {
    }
  }
  .hover__box {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    @media (max-width: 920px) {
    }
  }
  .totalsublist__box {
    position: absolute;
    top: 100%;
    display: flex;
    gap: 0px;
    align-items: flex-start;
    z-index: 100;
    max-height: 1000px;
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
    @media (max-width: 920px) {
    }
  }
  .totalsublist__box__big {
    position: absolute;
    top: 100%;
    display: flex;
    gap: 1px;
    align-items: flex-start;
    z-index: 100;
    max-height: 1000px;
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
    @media (max-width: 920px) {
      /* Additional styling for smaller screens if needed */
    }
  }
  .totalsublist__box__big__college {
    position: absolute;
    top: 100%;
    display: flex;
    gap: 1px;
    align-items: flex-start;
    z-index: 100;
    max-height: 1000px;
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
    @media (max-width: 920px) {
      /* Additional styling for smaller screens if needed */
    }
  }
  .sublist__box {
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.body.primary.base};
    transition: opacity 0.7s ease-in-out;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.border.primary};
    @media (max-width: 920px) {
    }
  }
  .sublist__black {
    @media (max-width: 920px) {
    }
  }
  .sublist__box__two {
    display: flex;
    flex-direction: column;

    background-color: ${({ theme }) => theme.body.primary.base};
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.border.primary};
    animation: fadeIn 0.5s ease forwards;
    @media (max-width: 920px) {
    }
  }
  .sublist__box__two__one {
    display: flex;
    flex-direction: column;
    border: 1px solid ${({ theme }) => theme.border.primary};
    padding: 5px;
    background-color: ${({ theme }) => theme.body.primary.base};
    border-radius: 4px;
    box-sizing: border-box;
    animation: fadeIn 0.5s ease forwards;
    @media (max-width: 920px) {
    }
  }

  .sublist__box__three {
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.body.primary.base};
    border: 1px solid ${({ theme }) => theme.border.primary};
    border-radius: 4px;
    @media (max-width: 920px) {
    }
  }
  .sublist__design {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    gap: 0.5rem;
    justify-content: space-between;
    cursor: pointer;
    @media (max-width: 920px) {
    }
  }

  .hove:hover {
    background-color: ${({ theme }) => theme.body.primary.hover};
  }

  .design__text {
    font-weight: 500;
    font-size: 16px;
    white-space: nowrap;
    @media (max-width: 920px) {
    }
  }
  .mega-menu {
    position: absolute;
    top: 100%;
    left: 0;
    max-width: 650px;
    background-color: ${({ theme }) => theme.body.primary.base};
    padding: 16px;
    border-radius: 10px;
    box-shadow: 0 4px 16px ${({ theme }) => theme.shadow.opacity_15};
    z-index: 100;
  }

  .section-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.text.primary};
    margin-bottom: 8px;
  }

  .menu-section {
    margin-bottom: 16px;
  }

  .menu-title {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.text.primary};
    margin-bottom: 8px;
  }

  .menu-items {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }

  .menu-items__with-3-child {
    display: grid;
    grid-template-columns: repeat(2, minmax(180px, 200px));

    @media screen and (min-width: 1200px) {
      grid-template-columns: repeat(3, minmax(180px, 200px));
    }
  }

  .menu-items__with-2-child {
    display: grid;
    grid-template-columns: repeat(2, minmax(180px, 200px));
  }

  .menu-item {
    display: flex;
    align-items: flex-start;
    gap: .75rem;
    padding: 8px;
    border-radius: 8px;
    transition: background-color 0.2s ease;
    cursor: pointer;
  }

  .menu-item:hover {
    background-color: ${({ theme }) => theme.body.primary.hover};
  }

  .icon {
    color: #ef4444;
    font-size: 20px;
    margin-top: 2px;
  }

  .text-content .title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: ${({ theme }) => theme.text.primary};
  }

  .text-content .subtitle {
    font-size: 12px;
    color: ${({ theme }) => theme.text.secondary};
  }
  .mega-menu::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 10%;
    transform: translateX(-50%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${({ theme }) => theme.body.primary.base};
  }
`;
export const MobileHeaderStyled = styled.div`
  display: none;
  box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.1);
  position: sticky;
  background-color: ${({ theme }) => theme.body.primary.base};
  top: 0px;
  z-index: 1000;
  @media (max-width: 920px) {
    padding: 8px 12px 8px 0px;
    display: block;
  }

  .flex-align_center {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .close__icon,
  .ham__icon {
    display: none;
    color: ${({ theme }) => theme.text.primary};
    @media (max-width: 920px) {
      border: none;
      color: ${({ theme }) => theme.text.primary};
      background-color: ${({ theme }) => theme.body.primary.base};
      display: block;
      margin-left: auto;
      color: ${({ theme }) => theme.text.primary};
    }
  }
  .mobile__section {
    @media (max-width: 920px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .company__logo {
      width: 120px;
      object-fit: contain;
    }
  }
  .navbar {
    height: 100vh;
    box-shadow: 2px 0px 3px 1px ${({ theme }) => theme.shadow.opacity_10};
    display: flex;
    flex-direction: column;
    gap: 20px;
    top: 0;
    right: 0;
    min-width: 260px;
    max-width: 275px;
    position: fixed;
    z-index: 1000;
    overflow: hidden;
    background-color: ${({ theme }) => theme.body.primary.base};
    transform: translate(${(props) => props.value});
    transition: transform 0.2s ease-out;

    .nav-top-container {
      display: flex;
      flex-direction: column-reverse;
      position: sticky;
      top: 0px;
      padding: 14px 10px;
      background-color: ${({ theme }) => theme.body.primary.base};

      & > .close_icon {
        align-self: flex-end;
      }
    }

    ul {
      display: flex;
      flex-direction: column;
      list-style-type: none;
      flex-grow: 1;
    }
    .click__box {
      animation: slideDown 300ms ease-in-out forwards;
      @media (max-width: 920px) {
      }
    }
    @keyframes slideDown {
      0% {
        opacity: 0;
        transform: translateY(-60px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .sub__title {
      font-weight: 700;
      font-size: 16px;
      padding-bottom: 10px;
      @media (max-width: 920px) {
      }
    }

    .link {
      display: flex;
      text-decoration: none;
      padding: 10px;
      font-size: 17px;
      cursor: pointer;
      transition: background-color 200ms linear;
      color: ${({ theme }) => theme.text.primary};

      &:hover {
        background-color: ${({ theme }) => theme.body.primary.hover};
      }
      @media (max-width: 920px) {
        font-size: 17px;
      }
    }
    .create__test__child {
      overflow: hidden;
      opacity: 1;
      color: ${({ theme }) => theme.text.primary};
      transition: max-height 0.5s ease, opacity 0.5s ease;
      @media (max-width: 920px) {
      }
    }

    .create__test__mobile {
      display: flex;

      flex-direction: column;
      @media (max-width: 920px) {
      }
    }
    .create__test__mobile__child {
    }
    .create__test__word__box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5px;
      cursor: pointer;
      padding: 10px;
      color: ${({ theme }) => theme.text.primary};
      transition: background-color 200ms linear;

      &:hover {
        background-color: ${({ theme }) => theme.body.primary.hover};
      }

      &.open {
        background-color: ${({ theme }) => theme.body.primary.hover};
      }
    }

    .create__test__word__box__child {
      display: flex;
      align-items: center;
      gap: 5px;
      justify-content: space-between;
      padding: 10px 10px 10px 20px;
      cursor: pointer;
      transition: background-color 200ms linear;
      &:hover {
        background-color: ${({ theme }) => theme.body.primary.hover};
      }

      &.open {
        background-color: ${({ theme }) => theme.body.primary.hover};
      }
    }
    .button__box {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0.5rem 0;
      @media (max-width: 920px) {
        flex-direction: column;
      }
    }

    .cta__button {
      cursor: pointer;
      text-decoration: none;
      border-radius: 8px;
      border: none;
      padding: 12px 0px;
      width: 120px;
      font-size: 1rem;
      font-weight: 500;
      &.login {
        border: 2px solid #fc2947;
        background-color: #fc2947;
        color: white;
      }

      &.signup {
        border: 1px solid #ff5e79;
        background-color: white;
        color: #fc2947;
      }
    }

    .link__style {
      text-decoration: none;
      cursor: pointer;
    }

    .profile__container {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      gap: 0.5rem;
    }

    .image__style {
      border-radius: 50px;
    }

    .profile__name {
      text-transform: capitalize;
      color: ${({ theme }) => theme.text.primary};
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .profile__item {
      display: flex;
      gap: 0.25rem;
      flex-direction: column;
    }
    .profile__designation {
      word-break: break-all;
      color: ${({ theme }) => theme.text.secondary};
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      font-size: 14px;
    }
    .profile__size {
      width: 50px;
      height: 50px;
    }
  }
  .right-align {
    text-align: right;
  }
  .right-align__element {
    padding: 10px 10px 10px 30px;
    transition: background-color 200ms linear;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.body.primary.hover};
    }
  }
`;
