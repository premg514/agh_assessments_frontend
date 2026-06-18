import React from "react";
import {
  Card,
  Header,
  Title,
  Details,
  Row,
  Value,
  Label,
  Footer,
  Table,
  Th,
  Td,
} from "./styles";
import { format } from "date-fns";
import { Button } from "../../user/login/user-login-style";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Container } from "../../../component/admin-assetments-details/admin-assetments-details-style";

const AssessmentCard = ({ assessment }) => {
  const { scheduledTestId } = useSelector((state) => state.assessment);

  const navigate = useNavigate();

  const start = new Date(assessment.startDateTime);
  const end = new Date(assessment.endDateTime);

  const isMissed = assessment.status === "not_attended";

  return (
    <Container>
      <Header>
        <Title>{assessment.name}</Title>
      </Header>

      <Table>
        <thead>
          <tr>
            <Th>Start</Th>
            <Th>End</Th>
            {assessment.duration && <Th>Duration</Th>}
            <Th>Action</Th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <Td>{format(start, "dd MMM yyyy, hh:mm a")}</Td>
            <Td>{format(end, "dd MMM yyyy, hh:mm a")}</Td>

            {assessment.duration && <Td>{assessment.duration} mins</Td>}

            <Td>
              {isMissed ? (
                <Button className="w-fit" disabled>
                  Missed Test
                </Button>
              ) : scheduledTestId === assessment._id ? (
                <Button
                  className="w-fit"
                  onClick={async () => {
                    navigate(`/agh-tests/instructions/${assessment._id}`);
                  }}
                >
                  Resume Test
                </Button>
              ) : (
                <Button
                  className="w-fit"
                  onClick={() => {
                    navigate(`/agh-tests/instructions/${assessment._id}`);
                  }}
                >
                  Start Test
                </Button>
              )}
            </Td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default AssessmentCard;
