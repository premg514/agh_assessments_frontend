import React, { useState, useContext, useRef, useEffect, useMemo } from "react";
import ConfirmationComponent from "../../../../../../component/confirmation/confirmation-component";
import Select from "react-select";
import CompilerSettings from "../../../../../Coding_problem_compiler/compiler/Settings/compilerSettings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faPlay,
  faRefresh,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useIsThemeDark } from "../../../../../../hooks/useIsThemeDark";
import {
  ButtonGroup,
  CompilerSectionContainer,
  Header,
  IconButton,
  RunButton,
  SubmitButton,
} from "../../../../../Coding_problem_compiler/compiler/compilerSection.style";
import { AppContext } from "../../../../../../context/AppContext";
import FlashoutPageComponent from "../../../../../../component/flash-out-page/flash-out-page-component";
import { reactSelectTheme } from "../../../../../../theme";
import Compiler from "./compiler";
import { useSelector } from "react-redux";
import BulbAnimation from "../../../../../../component/BulbAnimation";

const LANGUAGE_OPTIONS = [
  { label: "C++", value: 54 },
  { label: "Java", value: 62 },
  { label: "Python", value: 71 },
  { label: "C", value: 50 },
];

const themeColorList = [
  "vscodeDark",
  "vscodeLight",
  "dracula",
  "monokai",
  "githubDark",
  "githubLight",
  "duotoneDark",
  "duotoneLight",
  "solarizedDark",
  "solarizedLight",
  "nord",
];
const fontSizeList = [
  "12px",
  "13px",
  "14px",
  "15px",
  "16px",
  "18px",
  "20px",
  "22px",
];

const getCorrectValueOptionObj = (value) => {
  let lanObj;
  switch (value) {
    case "cpp": {
      lanObj = { label: "C++", value: 54 };
      break;
    }
    case "java": {
      lanObj = { label: "Java", value: 62 };
      break;
    }
    case "python": {
      lanObj = { label: "Python", value: 71 };
      break;
    }
    case "c": {
      lanObj = { label: "C", value: 50 };
      break;
    }
  }
  return lanObj;
};

const CompilerTestUI = ({
  isMobileScreenSize,
  topHeight,
  setCompiledOutput,
  codingProblem,
  handleValueChange,
  handleClickSubmitOnEditor,
  handleClickRunOnEditor,
  handleStoreSelectedLanguage,
  handleClickReset,
}) => {
  const isDarkTheme = useIsThemeDark();
  const [fontSize, setFontsize] = useState("12px");
  const [themeType, setThemeType] = useState(themeColorList[0]);
  const [settings, setSettings] = useState(false);
  const [languageChangeLoading, setLanguageChangeLoading] = useState(false);
  // don't change below order
  const { user } = useSelector((state) => state.profile);

  const allowedCodingLanguages = useMemo(() => {
    return LANGUAGE_OPTIONS.filter((lan) => {
      if (!user.languages.length) return true;

      const key = lan.label === "C++" ? "cpp" : lan.label.toLowerCase();
      return user.languages.includes(key);
    });
  }, [user?.languages]);

  const [language, setLanguage] = useState(null);
  // don't change above order

  const [compilationLoading, setCompilationLoading] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(false);

  const handleLanguageChange = async (selectedLangauge) => {
    try {
      setLanguageChangeLoading(true);
      let lan;
      if (selectedLangauge.label === "C++") {
        lan = "cpp";
      } else {
        lan = selectedLangauge.label.toLowerCase();
      }
      await handleStoreSelectedLanguage(lan);
      setLanguage(selectedLangauge);
    } catch (err) {
      toast.error("Something went wrong on language change");
    } finally {
      setLanguageChangeLoading(false);
    }
  };

  const { setPopupbox, componentName, setComponentName, loading, setLoading } =
    useContext(AppContext);

  const currentCode = React.useMemo(() => {
    if (!codingProblem) return "";

    const map = {
      "C++": codingProblem.basicCodeCpp,
      Python: codingProblem.basicCodePython,
      C: codingProblem.basicCodeC,
      Java: codingProblem.basicCodeJava,
    };

    return map[language?.label] || "";
  }, [codingProblem, language?.label]);
  useEffect(() => {
    if (codingProblem?.selectedLanguage) {
      setLanguage(getCorrectValueOptionObj(codingProblem.selectedLanguage));
    }
  }, [codingProblem?.selectedLanguage]);

  return (
    <CompilerSectionContainer>
      <Header>
        <Select
          theme={reactSelectTheme(isDarkTheme)}
          options={allowedCodingLanguages}
          isLoading={languageChangeLoading}
          value={language}
          onChange={handleLanguageChange}
          isDisabled={codingProblem?.submitted || languageChangeLoading}
        />
        <ButtonGroup>
          {!codingProblem?.submitted && (
            <IconButton
              onClick={() => {
                setComponentName("confirmreset");
                setPopupbox(true);
              }}
              aria-label="Refresh"
            >
              <FontAwesomeIcon icon={faRefresh} className="icon__refresh" />
            </IconButton>
          )}
          <IconButton
            onClick={() => {
              setComponentName("CompilerSettings");
              setPopupbox(true);
            }}
            aria-label="Settings"
          >
            <FontAwesomeIcon icon={faCog} className="icon__settings" />
          </IconButton>
        </ButtonGroup>
      </Header>
      <FlashoutPageComponent
        component={
          componentName === "CompilerSettings" ? (
            <CompilerSettings
              settings={settings}
              setSettings={setSettings}
              fontSize={fontSize}
              setFontsize={setFontsize}
              themeType={themeType}
              setThemeType={setThemeType}
              fontSizeList={fontSizeList}
              themeColorList={themeColorList}
            />
          ) : componentName === "confirmreset" ? (
            <ConfirmationComponent
              detail="Do you really want to reset details?"
              onClick={async () => {
                try {
                  setLoading(true);
                  await handleClickReset(codingProblem);
                } catch (err) {
                  console.log(err);
                  // toast.error(err?.response?.data?.message);
                } finally {
                  setPopupbox(false);
                  setComponentName(null);
                  setLoading(false);
                }
              }}
            />
          ) : null
        }
      />

      {/* on reset to partial problem.  */}
      {loading ? (
        <BulbAnimation />
      ) : (
        <Compiler
          key={`${codingProblem?._id}-${language?.label}`}
          handleValueChange={handleValueChange}
          code={currentCode}
          isMobileScreenSize={isMobileScreenSize}
          topHeight={topHeight}
          language={language}
          width={50}
          theme={themeType}
          font={fontSize}
          submitted={codingProblem?.submitted}
        />
      )}

      <div className="element__footer">
        <div></div>
        <div className="button__containers">
          <RunButton
            onClick={async () => {
              try {
                setCompilationLoading(true);
                await handleClickRunOnEditor(codingProblem);
              } catch (err) {
                console.log(err);
                // toast.error(err?.response?.data?.message);
              } finally {
                setCompilationLoading(false);
              }
            }}
            disabled={
              compilationLoading ||
              codingProblem?.compilationResult?.status?.id < 3 ||
              submissionLoading ||
              codingProblem?.submitted
            }
            title="Run Code"
          >
            <FontAwesomeIcon
              icon={
                compilationLoading ||
                codingProblem?.compilationResult?.status?.id < 3
                  ? faSpinner
                  : faPlay
              }
              spin={
                !!(
                  compilationLoading ||
                  codingProblem?.compilationResult?.status?.id < 3
                )
              }
            />
            Run
          </RunButton>
          <SubmitButton
            disabled={submissionLoading || codingProblem?.submitted}
            onClick={async () => {
              try {
                setSubmissionLoading(true);
                await handleClickSubmitOnEditor(codingProblem);
              } catch (err) {
                console.log(err);
                // toast.error(err?.response?.data?.message);
              } finally {
                setSubmissionLoading(false);
              }
            }}
          >
            {submissionLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              "Submit"
            )}
          </SubmitButton>
        </div>
      </div>
    </CompilerSectionContainer>
  );
};

export default CompilerTestUI;
