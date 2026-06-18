import React from "react";
import {
  Wrapper,
  Container,
} from "../../../../Coding_problem_compiler/description/styles";
import MDEditor from "@uiw/react-md-editor";
import { useIsThemeDark } from "../../../../../hooks/useIsThemeDark";
import { TopTitleHeading } from "../../../../admin/common.style";

const DescriptionUI = (props) => {
  const { title, description } = props;
  const isDarkTheme = useIsThemeDark();

  return (
    <Wrapper className="work-sans-regular">
      <Container>
        <div className="flex-row-start">
          <TopTitleHeading>{title}</TopTitleHeading>
        </div>
        <div data-color-mode={isDarkTheme ? "dark" : "light"}>
          <MDEditor.Markdown
            className="markdown-body"
            source={description}
            style={{ whiteSpace: "pre-wrap" }}
          />
        </div>
      </Container>
      {/* Topic tags */}
    </Wrapper>
  );
};

export default DescriptionUI;
