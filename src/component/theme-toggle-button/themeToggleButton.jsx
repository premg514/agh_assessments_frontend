import React from "react";
import {
  ToggleButton,
  ToggleCircle,
  IconWrapper,
} from "./themeToggleButton.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../../slices/themeSlice";

const ThemeToggleButton = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.theme);
  const toggleTheme = (name) => {
    dispatch(setTheme(name));
  };
  return (
    <ToggleButton
      onClick={() => {
        console.log("name", name);
        toggleTheme(name === "LIGHT" ? "DARK" : "LIGHT");
      }}
    >
      <ToggleCircle isToggled={name === "LIGHT" ? false : true}>
        <IconWrapper visible={!(name === "LIGHT" ? false : true)}>
          <FontAwesomeIcon icon={faSun} color="#fbbf24" />
        </IconWrapper>
        <IconWrapper
          visible={name === "LIGHT" ? false : true}
          style={{ position: "absolute" }}
        >
          <FontAwesomeIcon icon={faMoon} color="#000000ff" />
        </IconWrapper>
      </ToggleCircle>
    </ToggleButton>
  );
};

export default ThemeToggleButton;
