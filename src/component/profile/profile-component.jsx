import React from "react";
import { ProfileStyle } from "./profile-style";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCube,
  faUser,
  faUserCircle,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
const ProfileComponent = ({ logout }) => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);

  return (
    <ProfileStyle>
      <div className="container">
        <div className="sub_container">
          <img
            src={
              user?.profileImage ||
              `https://api.dicebear.com/9.x/initials/svg?seed=${user?.firstName}`
            }
            alt={user?.firstName}
            width={40}
            height={40}
            className="image__style"
          />

          <div className="details_container">
            <h2 className="text capitalize">{user.firstName}</h2>
            <p className="text">{user.email}</p>
          </div>
        </div>

        {user?.accountType === "User" ? (
          <div
            className="sub_container text"
            onClick={() => {
              navigate("/profile-page", { state: { id: user?._id } });
            }}
          >
            <FontAwesomeIcon icon={faUser} size="lg" /> <div>Profile</div>
          </div>
        ) : null}

        {user?.accountType === "User" ? (
          <div
            className="sub_container text"
            onClick={() => {
              navigate("/login-history", { state: { id: user?._id } });
            }}
          >
            <FontAwesomeIcon icon={faClockRotateLeft} size="lg" />{" "}
            <div>Login History</div>
          </div>
        ) : null}

        <div
          className="sub_container items-center text  color-red "
          onClick={logout}
        >
          <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" />
          <div>Log out</div>
        </div>
      </div>
    </ProfileStyle>
  );
};
export default ProfileComponent;
