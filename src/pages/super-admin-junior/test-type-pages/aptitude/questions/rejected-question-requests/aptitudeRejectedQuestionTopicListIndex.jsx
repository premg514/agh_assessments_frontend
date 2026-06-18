import React, { useState } from "react";
import { ButtonSliderContainer } from "../../../../../user/common.style";
import ButtonSlider from "../../../../../super-admin/test-list-page/Components/ButtonSlider";
import TopicList from "./topicList";
import { Section, H1 } from "../../../technical/questions/topicList/style";

const AptitudeDataRoute =
  "/v1/super-admin-junior/getListOfAptitudeRejectedQuestionsRequestsTopics";

const LogicalDataRoute =
  "/v1/super-admin-junior/getListOfLogicalRejectedQuestionsRequestsTopics";

const VerbalDataRoute =
  "/v1/super-admin-junior/getListOfVerbalRejectedQuestionsRequestsTopics";

const AptitudeRejectedQuestionTopicListIndex = () => {
  const [active, setActive] = useState(1);
  return (
    <>
      <Section>
        <ButtonSliderContainer>
          <ButtonSlider
            data={["Aptitude", "Logical", "Verbal"]}
            setActive={setActive}
            active={active}
          />
        </ButtonSliderContainer>
        <H1>
          Rejected{" "}
          {active === 1 ? "Aptitude" : active === 2 ? "Logical" : "Verbal"}{" "}
          topics
        </H1>
        <div>
          {active === 1 && <TopicList dataRoute={AptitudeDataRoute} />}
          {active === 2 && <TopicList dataRoute={LogicalDataRoute} />}
          {active === 3 && <TopicList dataRoute={VerbalDataRoute} />}
        </div>
      </Section>
    </>
  );
};

export default AptitudeRejectedQuestionTopicListIndex;
