import styled from "styled-components";

export const TestAutoSubmitLoading = styled.div`
  width: 45px;
  height: 45px;
  border: 4px solid #e5e5e5;
  border-top: 4px solid #4f46e5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
