import { useRef, useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../../../pages/user/login/user-login-style";
import {
  faBars,
  faTimes,
  faFileAlt,
  faGraduationCap,
  faArrowRightFromBracket,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  HeaderTopSection,
  Logo,
  HamburgerButton,
  MobileDrawer,
  MobileNavLinks,
  MobileNavLink,
  MobileUserProfile,
  MobileUserAvatar,
  MobileUserInfo,
  MobileUserName,
  MobileUserCollege,
  ButtonBox,
  HighLightDot,
} from "./style.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeToggleButton from "../../theme-toggle-button/themeToggleButton.jsx";
import AssessmentTimer from "../../assessment-timer.jsx";
import { AppContext } from "../../../context/AppContext.js";

const AdminLinks = ({ handleLogout }) => {
  const { user } = useSelector((state) => state.profile);
  return (
    <>
      <MobileUserProfile>
        <MobileUserAvatar
          src={
            user?.profileImage ||
            `https://api.dicebear.com/9.x/initials/svg?seed=${user?.firstName}`
          }
          alt={user?.firstName}
        />
        <MobileUserInfo>
          <MobileUserName>{user?.firstName}</MobileUserName>
          <MobileUserCollege>{user?.collegeName}</MobileUserCollege>
        </MobileUserInfo>
      </MobileUserProfile>
      <MobileNavLinks>
        <MobileNavLink>
          <Link className="link" to="/agh-assessments">
            <FontAwesomeIcon className="icon" icon={faFileAlt} />
            <span> AGH Assessments</span>
          </Link>
        </MobileNavLink>
      </MobileNavLinks>
      <ButtonBox>
        <Button $primary className="w-fit" onClick={handleLogout}>
          Logout
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </Button>
      </ButtonBox>
    </>
  );
};

const UserLinks = ({ handleLogout }) => {
  const { user } = useSelector((state) => state.profile);
  const { remainingTime } = useContext(AppContext);

  return (
    <>
      <MobileUserProfile>
        <MobileUserAvatar
          src={
            user?.profileImage ||
            `https://api.dicebear.com/9.x/initials/svg?seed=${user?.firstName}`
          }
          alt={user?.firstName}
        />
        <MobileUserInfo>
          <MobileUserName>{user?.firstName}</MobileUserName>
          <MobileUserCollege>{user?.collegeName}</MobileUserCollege>
        </MobileUserInfo>
      </MobileUserProfile>
      <AssessmentTimer />
      <MobileNavLinks>
        <MobileNavLink>
          <Link className="link" to="/agh-tests">
            <FontAwesomeIcon className="icon" icon={faGraduationCap} />
            <span> AGH Tests</span>
          </Link>
        </MobileNavLink>
      </MobileNavLinks>
      <ButtonBox>
        <Button $primary className="w-fit" onClick={handleLogout}>
          Logout
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </Button>
      </ButtonBox>
    </>
  );
};

const MobileSidebar = ({ handleLogout, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const mobileSidebarRef = useRef(null);
  const { user } = useSelector((state) => state.profile);
  const { remainingTime } = useContext(AppContext);
  const remaining = useSelector((state) => state.assessment.timer.remaining);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileSidebarRef.current && !mobileSidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <Nav>
      <HeaderTopSection>
        <Logo
          className="company__logo"
          src={name === "LIGHT" ? "/agh-logo.png" : "/agh-dark-logo.png"}
          alt="Logo"
        />
        <div className="flex_container">
          <ThemeToggleButton />
          <HamburgerButton
            ref={mobileSidebarRef}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <FontAwesomeIcon icon={faTimes} className="icon" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="icon" />
            )}
            {(remaining > 0 || remainingTime > 0) && (
              <HighLightDot>
                <FontAwesomeIcon icon={faCircle} size="xs" />
              </HighLightDot>
            )}
          </HamburgerButton>
        </div>
      </HeaderTopSection>

      {isOpen && (
        <MobileDrawer>
          {user?.accountType === "User" ? (
            <UserLinks handleLogout={handleLogout} />
          ) : (
            <AdminLinks handleLogout={handleLogout} />
          )}
        </MobileDrawer>
      )}
    </Nav>
  );
};

export default MobileSidebar;
