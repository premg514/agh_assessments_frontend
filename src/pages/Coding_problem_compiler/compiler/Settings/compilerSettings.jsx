import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { AppContext } from "../../../../context/AppContext";
import {
  CloseButton,
  SettingsContainer,
  SettingsTitle,
  SettingsElement,
  SettingsItem,
  SettingsSection,
  OptionsListContainer,
  OptionItem,
} from "./compilerSettings.style";

const CompilerSettings = ({
  settings,
  setSettings,
  fontSize,
  setFontsize,
  themeType,
  setThemeType,
  fontSizeList = ["12px", "14px", "16px", "18px", "20px"],
  themeColorList = ["Light", "Dark", "Solarized"],
}) => {
  const { setComponentName, setPopupbox } = useContext(AppContext);
  const handleCloseModal = () => {
    setComponentName(null);
    setPopupbox(false);
  };

  return (
    <div>
      <CloseButton onClick={handleCloseModal}>
        <FontAwesomeIcon icon={faXmark} />
      </CloseButton>

      <SettingsContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <SettingsTitle>Editor Settings</SettingsTitle>

        <SettingsElement>
          <SettingsItem>
            <SettingsSection
              active={settings === false}
              onClick={() => setSettings(false)}
            >
              Font Size
            </SettingsSection>
            <SettingsSection
              active={settings === true}
              onClick={() => setSettings(true)}
            >
              Theme
            </SettingsSection>
          </SettingsItem>

          {settings === false ? (
            <OptionsListContainer>
              {fontSizeList.map((item, index) => (
                <OptionItem
                  key={index}
                  active={item === fontSize}
                  onClick={() => setFontsize(item)}
                >
                  {item}
                </OptionItem>
              ))}
            </OptionsListContainer>
          ) : (
            <OptionsListContainer>
              {themeColorList.map((item, index) => (
                <OptionItem
                  key={index}
                  active={item === themeType}
                  onClick={() => setThemeType(item)}
                >
                  {item}
                </OptionItem>
              ))}
            </OptionsListContainer>
          )}
        </SettingsElement>
      </SettingsContainer>
    </div>
  );
};

export default CompilerSettings;
