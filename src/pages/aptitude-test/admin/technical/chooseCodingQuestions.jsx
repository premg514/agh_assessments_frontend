import React, { useState, useEffect } from "react";
import {
  AllProblemsSection,
  SelectedProblems,
} from "../../../super-admin/explore/edit-collecion-info/editCollectionInfo";
import { EditCollectionStyle as ChooseCodingQuestionStyle } from "../../../super-admin/explore/edit-collecion-info/styles";

const ChooseCodingQuestiions = ({
  token,
  selectedProblems,
  setSelectedProblems,
  apiEndPoint,
  questions_type,
}) => {
  const [allProblem, setAllProblems] = useState([]);

  return (
    <ChooseCodingQuestionStyle>
      <div className="layout">
        <div className="content_container">
          <AllProblemsSection
            setSelectedProblems={setSelectedProblems}
            selectedProblems={selectedProblems}
            token={token}
            allProblem={allProblem}
            setAllProblems={setAllProblems}
            apiEndPoint={apiEndPoint}
            questions_type={questions_type}
          />
        </div>
        <div className="content_container">
          <SelectedProblems
            selectedProblems={selectedProblems}
            setSelectedProblems={setSelectedProblems}
            setAllProblems={setAllProblems}
          />
        </div>
      </div>
    </ChooseCodingQuestionStyle>
  );
};

export default ChooseCodingQuestiions;
