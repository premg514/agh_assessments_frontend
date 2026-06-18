import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button } from "../user/login/user-login-style";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0px); }
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Card = styled.div`
  text-align: center;
  padding: 50px 40px;
  border-radius: 18px;
  max-width: 520px;
  width: 100%;

  @media (max-width: 500px) {
    padding: 40px 20px;
  }
`;

const Code = styled.h1`
  font-size: 90px;
  margin: 0;
  color: #ef4444;
  animation: ${float} 3s ease-in-out infinite;

  @media (max-width: 500px) {
    font-size: 70px;
  }
`;

const Title = styled.h2`
  margin: 10px 0;
  color: ${({ theme }) => theme.text.primary};
`;

const Message = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  margin-bottom: 30px;
`;

const ErrorPage = ({
  code = "404",
  title = "Page Not Found",
  message = "Oops! The page you're looking for doesn't exist.",
}) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Card>
        <Code>{code}</Code>
        <Title>{title}</Title>
        <Message>{message}</Message>

        <Button onClick={() => navigate(-1, { replace: true })}>Go Back</Button>
      </Card>
    </Wrapper>
  );
};

export default ErrorPage;
