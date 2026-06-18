import React, { useState } from "react";
import { ButtonSliderContainer } from "../../../../../user/common.style";
import ButtonSlider from "../../../../test-list-page/Components/ButtonSlider";
import TopicList from "./topicList";
import Header from "../../../../../../component/header/header";
import { Section, H1 } from "../../../../../super-admin-junior/test-type-pages/technical/questions/topicList/style";

const AptitudeDataRoute =
  "/v1/super-admin-junior/getListOfAptitudePendingQuestionsRequestsTopics";

const LogicalDataRoute =
  "/v1/super-admin-junior/getListOfLogicalPendingQuestionsRequestsTopics";

const VerbalDataRoute =
  "/v1/super-admin-junior/getListOfVerbalPendingQuestionsRequestsTopics";

const AptitudePendingQuestionTopicListIndex = () => {
  const [active, setActive] = useState(1);
  return (
    <>
      <Header />
      <Section>
        <ButtonSliderContainer>
          <ButtonSlider
            data={["Aptitude", "Logical", "Verbal"]}
            setActive={setActive}
            active={active}
          />
        </ButtonSliderContainer>
        <H1>
          Pending{" "}
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

export default AptitudePendingQuestionTopicListIndex;
