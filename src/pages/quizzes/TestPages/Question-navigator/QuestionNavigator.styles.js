import styled, { css } from "styled-components";

// 🔹 Styled Components
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

export const Title = styled.h2`
  font-weight: 600;
  text-transform: capitalize;
`;

export const QuestionList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
  list-style-type: none;
`;

export const QuestionItem = styled.li``;

export const QuestionButton = styled.button`
  border-radius: 0.25rem; /* rounded */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem; /* w-10 */
  height: 2.5rem; /* h-10 */
  font-size: 1.125rem; /* text-lg */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition:
    border 0.2s ease,
    background-color 0.2s ease;
  border: 2px solid transparent;
  color: #1f2937;

  ${(props) => {
    // ✅ Active + Answered + Marked
    if (props.$active && props.$answered && props.$markedForReview) {
      return css`
        border-color: #3b82f6; /* blue-500 */
        background-color: #facc15; /* yellow highlight for review + answered */
      `;
    }

    // ✅ Active + Answered
    if (props.$active && props.$answered) {
      return css`
        border-color: #3b82f6; /* blue-500 */
        background-color: #bbf7d0; /* green but lighter for active */
      `;
    }

    // ✅ Active + Marked
    if (props.$active && props.$markedForReview) {
      return css`
        border-color: #3b82f6; /* blue-500 */
        background-color: #fed7aa; /* orange-200 */
      `;
    }

    // ✅ Answered + Marked
    if (props.$answered && props.$markedForReview) {
      return css`
        border-color: #32eb25ff; /* blue-600 */
        background-color: #fed7aa; /* blue-600 */
      `;
    }

    // ✅ Active only
    if (props.$active) {
      return css`
        border-color: #3b82f6; /* blue-500 */
        background-color: #eff6ff; /* blue-50 */
      `;
    }

    // ✅ Answered only
    if (props.$answered) {
      return css`
        border-color: #22c55e; /* green-500 */
        background-color: #cdfecaff; /* green-100 */
      `;
    }

    // ✅ Marked only
    if (props.$markedForReview) {
      return css`
        border-color: #fb923c; /* orange-400 */
        background-color: #ffedd5; /* orange-100 */
      `;
    }

    // ✅ Default
    return css`
      border-color: #e5e7eb; /* gray-200 */
      background-color: white;

      &:hover {
        border-color: #60a5fa; /* blue-400 */
      }
    `;
  }}
`;
