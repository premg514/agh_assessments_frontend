import React from "react";
import {
  StatusWrapper,
  Grid,
  Column,
  Item,
  Badge,
  Label,
} from "./Status.styles";

const statusCodes = [
  {
    id: 1,
    value: 1,
    description: "Not Visited",
    textColor: "#000000",
    bgColor: "#ffffff",
  },
  {
    id: 2,
    value: 1,
    description: "Not Answered",
    textColor: "#ffffff",
    bgColor: "#ef4444", // red-500
  },
  {
    id: 3,
    value: 1,
    description: "Answered",
    textColor: "#ffffff",
    bgColor: "#22c55e", // green-500
  },
  {
    id: 4,
    value: 1,
    description: "Mark for Review",
    textColor: "#ffffff",
    bgColor: "#fb923c", // orange-400
  },
  {
    id: 5,
    value: 1,
    description: "Marked and Answered",
    textColor: "#ffffff",
    bgColor: "#2563eb", // blue-600
  },
];

const Status = ({ answers, questionsLength, markedQuestionsForReview }) => {
  return (
    <StatusWrapper>
      <Grid>
        {/* Left column */}
        <Column>
          <Item>
            <Badge
              $bgColor={statusCodes[0].bgColor}
              $textColor={statusCodes[0].textColor}
            >
              {questionsLength - answers}
            </Badge>
            <Label>{statusCodes[0].description}</Label>
          </Item>

          <Item>
            <Badge
              $bgColor={statusCodes[2].bgColor}
              $textColor={statusCodes[2].textColor}
            >
              {answers}
            </Badge>
            <Label>{statusCodes[2].description}</Label>
          </Item>

          {/* <Item $last>
            <Badge
              $bgColor={statusCodes[4].bgColor}
              $textColor={statusCodes[4].textColor}
            >
              {answers}
            </Badge>
            <Label>{statusCodes[4].description}</Label>
          </Item> */}
        </Column>

        {/* Right column */}
        <Column>
          <Item>
            <Badge
              $bgColor={statusCodes[1].bgColor}
              $textColor={statusCodes[1].textColor}
            >
              {questionsLength - answers}
            </Badge>
            <Label>{statusCodes[1].description}</Label>
          </Item>

          <Item $last>
            <Badge
              $bgColor={statusCodes[3].bgColor}
              $textColor={statusCodes[3].textColor}
            >
              {markedQuestionsForReview}
            </Badge>
            <Label>{statusCodes[3].description}</Label>
          </Item>
        </Column>
      </Grid>
    </StatusWrapper>
  );
};

export default Status;
