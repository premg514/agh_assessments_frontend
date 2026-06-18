import styled, { css } from "styled-components";

export const StatusWrapper = styled.div`
  padding: 1.5rem 1rem; /* px-4 py-6 */
  border-bottom: 1px solid #e5e7eb; /* border-b */
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 2rem; /* gap-y-4 gap-x-8 */
`;

export const Column = styled.div``;

export const Item = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => (props.$last ? "0" : "1rem")};
`;

export const Badge = styled.span`
  border: 1px solid #e5e7eb; /* border-gray-200 */
  border-radius: 0.375rem; /* rounded-md */
  margin-right: 0.75rem; /* mr-3 */
  padding: 0.5rem 1rem; /* px-4 py-2 */
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  ${(props) => css`
    background-color: ${props.$bgColor};
    color: ${props.$textColor};
  `}
`;

export const Label = styled.span`
  font-size: 1rem; /* text-base */
`;
