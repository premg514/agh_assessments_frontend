import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleDown,
  faChevronCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import spiral from "../../../assets/Spiral.png";
import {
  FaqSection,
  FaqTitle,
  FaqColumns,
  FaqColumn,
  FaqItem,
  FaqQuestion,
  FaqIcon,
  FaqAnswer,
  SpiralIconBottom,
  SpiralIconTop,
  FaqContentWrapper,
} from "./FAQ.styles";
import { FAQs_data } from "./faqs_data";

const FAQ = ({ disableCircleStyle }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const leftFAQs = FAQs_data.slice(0, Math.ceil(FAQs_data.length / 2));
  const rightFAQs = FAQs_data.slice(Math.ceil(FAQs_data.length / 2));

  return (
    <FaqSection>
      <FaqContentWrapper>
        <FaqTitle>Frequently Asked Questions</FaqTitle>
        <FaqColumns>
          {[leftFAQs, rightFAQs].map((column, colIdx) => (
            <FaqColumn key={colIdx}>
              {column.map((faq, index) => {
                const actualIndex =
                  colIdx === 0 ? index : index + leftFAQs.length;
                const isOpen = openIndex === actualIndex;
                return (
                  <FaqItem
                    key={actualIndex}
                    onClick={() => toggleFAQ(actualIndex)}
                  >
                    <FaqQuestion>
                      <p>{faq.ques}</p>
                      <FaqIcon>
                        <FontAwesomeIcon
                          size="lg"
                          icon={
                            isOpen ? faChevronCircleUp : faChevronCircleDown
                          }
                        />
                      </FaqIcon>
                    </FaqQuestion>
                    {isOpen && <FaqAnswer>{faq.ans}</FaqAnswer>}
                  </FaqItem>
                );
              })}
            </FaqColumn>
          ))}
        </FaqColumns>
      </FaqContentWrapper>
      {!disableCircleStyle ? (
        <SpiralIconBottom src={spiral} alt="spiral" />
      ) : null}
      {!disableCircleStyle ? <SpiralIconTop src={spiral} alt="spiral" /> : null}
    </FaqSection>
  );
};

export default FAQ;
