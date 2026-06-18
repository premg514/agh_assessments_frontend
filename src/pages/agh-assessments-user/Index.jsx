import React, { useState } from "react";
import Select from "react-select";
import ScheduledAssessmentsUser from "./scheduled-assessments/Index";
import NotAttendedAssessmentsUser from "./not-attended-assessments/NotAttendedAssessment";
import CompletedAssessmentsUser from "./completed-assessments/CompletedAssessment";
import { AGHAssessmentWrapper } from "./styles";
import { TopTitleHeading } from "../admin/common.style";
import { reactSelectTheme } from "../../theme";
import { useIsThemeDark } from "../../hooks/useIsThemeDark";

const options = [
  { value: "scheduled", label: "Scheduled Tests" },
  { value: "missed", label: "Not Attended Tests" },
  { value: "completed", label: "Completed Tests" },
];

const AGHAssessmentsIndex = () => {
  const [selected, setSelected] = useState(options[0]);
  const isDarkTheme = useIsThemeDark();
  const renderComponent = () => {
    switch (selected.value) {
      case "scheduled":
        return <ScheduledAssessmentsUser />;

      case "missed":
        return <NotAttendedAssessmentsUser />;

      case "completed":
        return <CompletedAssessmentsUser />;

      default:
        return <ScheduledAssessmentsUser />;
    }
  };

  return (
    <AGHAssessmentWrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        <TopTitleHeading>AGH Assessments</TopTitleHeading>

        <div style={{ width: "250px" }}>
          <Select
            options={options}
            value={selected}
            onChange={setSelected}
            isSearchable={false}
            theme={reactSelectTheme(isDarkTheme)}
          />
        </div>
      </div>

      {renderComponent()}
    </AGHAssessmentWrapper>
  );
};

export default AGHAssessmentsIndex;
