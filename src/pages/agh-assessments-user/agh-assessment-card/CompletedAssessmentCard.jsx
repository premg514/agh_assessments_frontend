import React from "react";
import { Card, Header, Title } from "./styles";
import { Table, Th, Td, Tr, Thead, Tbody } from "./styles";
import { format } from "date-fns";
import { Button } from "../../user/login/user-login-style";
import { useNavigate } from "react-router-dom";

const CompletedAssessmentCard = ({ assessment }) => {
  const navigate = useNavigate();

  const startedAt = new Date(assessment.startedAt);
  const completedAt = new Date(assessment.completedAt);

  return (
    <Card>
      <Header>
        <Title>{assessment.name}</Title>
      </Header>

      <Table>
        <Thead>
          <Tr>
            <Th>Started At</Th>
            <Th>Submitted At</Th>
            <Th>Score</Th>
            <Th>Percentage</Th>
            {assessment?.isResultPublished && <Th>Action</Th>}
          </Tr>
        </Thead>

        <Tbody>
          <Tr>
            <Td>{format(startedAt, "dd MMM yyyy, hh:mm a")}</Td>
            <Td>{format(completedAt, "dd MMM yyyy, hh:mm a")}</Td>
            <Td>
              {assessment.obtainedMarks} / {assessment.totalMarks}
            </Td>
            <Td>{assessment.percentage}%</Td>
            {assessment?.isResultPublished && (
              <Td>
                <Button
                  className="w-fit"
                  onClick={() =>
                    navigate(`/agh-tests/results/${assessment._id}`)
                  }
                >
                  View Result
                </Button>
              </Td>
            )}
          </Tr>
        </Tbody>
      </Table>
    </Card>
  );
};

export default CompletedAssessmentCard;
