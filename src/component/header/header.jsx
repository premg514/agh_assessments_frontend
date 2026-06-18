import React, { useRef, useState, useEffect, useContext } from "react";
import { HeaderStyled, MobileHeaderStyled } from "./header-user-style";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { WallStyle } from "../profile/profile-style";
import ProfileComponent from "../profile/profile-component";
import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../context/AppContext";
import MobileSidebar from "./mobile_sidebar";
import ThemeToggleButton from "../theme-toggle-button/themeToggleButton";
import AssessmentTimer from "../assessment-timer";

const Header = () => {
  const { remainingTime } = useContext(AppContext);
  const [showHeader, setShowHeader] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { name } = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.clear();
    toast.success("Logged Out");
    navigate("/");
  };

  function handleClickOutside(e) {
    if (profileRef.current && !profileRef.current.contains(e.target)) {
      setShowProfile(false);
    }
  }

  useEffect(() => {
    const handleSidebar = () => {
      if (window.innerWidth > 920 && showHeader) setShowHeader(false);
    };
    window.addEventListener("resize", handleSidebar);
    return () => window.removeEventListener("resize", handleSidebar);
  });

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showProfile]);

  return (
    <>
      <HeaderStyled value={showHeader ? "0" : "-100%"}>
        <section>
          <div className="element">
            <Link to="/">
              <img
                className="company__logo"
                src={name === "LIGHT" ? "/agh-logo.png" : "/agh-dark-logo.png"}
                width={150}
                height={50}
                alt="agh-logo"
              />
            </Link>
          </div>

          <div className="navbar">
            <ul>
              {user?.accountType === "User" && (
                <li>
                  <Link
                    to="/agh-tests"
                    className={`link ${
                      location.pathname.startsWith("/agh-tests")
                        ? "active_navlink"
                        : ""
                    }`}
                  >
                    AGH Tests
                  </Link>
                </li>
              )}
              {(user?.accountType === "Admin" ||
                user?.accountType === "JuniorCollegeAdmin") && (
                <li>
                  <Link
                    to="/agh-assessments"
                    className={`link ${
                      location.pathname.startsWith("/agh-assessments")
                        ? "active_navlink"
                        : ""
                    }`}
                  >
                    AGH Assessments
                  </Link>
                </li>
              )}
              {user?.accountType === "SuperAdmin" && (
                <li>
                  <Link
                    to="/superadmin-homepage"
                    className={`link ${
                      location.pathname.startsWith("/superadmin-homepage") ||
                      location.pathname.startsWith("/college-course-details")
                        ? "active_navlink"
                        : ""
                    }`}
                  >
                    Colleges
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="element__item">
            <div className="button__box">
              <AssessmentTimer />

              <ThemeToggleButton />

              {token !== null && (
                <button
                  ref={profileRef}
                  className="profile-btn"
                  onClick={() => setShowProfile(!showProfile)}
                >
                  <img
                    src={
                      user?.profileImage ||
                      `https://api.dicebear.com/9.x/initials/svg?seed=${user?.firstName}`
                    }
                    alt={user?.firstName}
                    width={40}
                    height={40}
                  />
                </button>
              )}
              {showProfile && (
                <WallStyle>
                  <ProfileComponent logout={logout} />
                </WallStyle>
              )}
            </div>
          </div>
        </section>
      </HeaderStyled>

      {user?.accountType === "User" ||
      user?.accountType === "Admin" ||
      user?.accountType === "JuniorCollegeAdmin" ? (
        <MobileSidebar name={name} handleLogout={logout} />
      ) : (
        <MobileHeaderStyled value={showHeader ? "0" : "100%"}>
          <div className="mobile__section">
            <img
              src={name === "LIGHT" ? "/agh-logo.png" : "/agh-dark-logo.png"}
              alt="logo"
              className="company__logo"
            />
            <div className="navbar">
              <div className="nav-top-container">
                {token ? (
                  <div className="profile__container">
                    <img
                      src={
                        user?.profileImage ||
                        `https://api.dicebear.com/9.x/initials/svg?seed=${user?.firstName}`
                      }
                      alt={user?.firstName}
                      width={60}
                      height={60}
                      className="image__style"
                    />
                    <div className="profile__item">
                      <div className="profile__name work-sans-semibold">
                        {user?.firstName} {`(${user?.accountType}`})
                      </div>
                      <div className="profile__designation work-sans-regular">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                ) : null}
                <FontAwesomeIcon
                  onClick={() => setShowHeader(false)}
                  className="close__icon"
                  role="button"
                  tabIndex="0"
                  icon={faClose}
                  size="xl"
                  aria-label="Close Header"
                />
              </div>
              <ul>
                <li>
                  {user?.accountType === "SuperAdmin" ? (
                    <Link className="link" to="/superadmin-homepage">
                      Colleges
                    </Link>
                  ) : (
                    <Link className="link" to="/agh-assessments">
                      AGH Assessments
                    </Link>
                  )}
                </li>
              </ul>
              <div className="button__box">
                {token ? (
                  <button
                    className="cta__button login"
                    onClick={() => {
                      logout();
                      setShowHeader(false);
                    }}
                  >
                    Log out
                  </button>
                ) : null}
              </div>
            </div>
            <div className="flex-align_center">
              <ThemeToggleButton />
              <button onClick={() => setShowHeader(true)} className="ham__icon">
                <FontAwesomeIcon icon={faBars} role="button" tabIndex="0" size="xl" />
              </button>
            </div>
          </div>
        </MobileHeaderStyled>
      )}
    </>
  );
};

export default Header;
