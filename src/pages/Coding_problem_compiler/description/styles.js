import styled from "styled-components";
export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const Container = styled.div`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;

  & .flex-row-start {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    & > .completed-mark {
      position: relative;
      top: 0.5rem;
    }
  }

  // for markdown

  .markdown-body {
    background-color: inherit;
    margin: 0; /* Remove container margins */
    padding: 0;
  }

  .markdown-body p {
    margin: 0; /* Remove paragraph spacing */
  }

  .markdown-body h1,
  .markdown-body h2,
  .markdown-body h3,
  .markdown-body h4,
  .markdown-body h5,
  .markdown-body h6 {
    margin: 0; /* Remove heading spacing */
  }

  .markdown-body ul,
  .markdown-body ol {
    margin: 0;
    padding-left: 1.2rem; /* Optional: keep indentation */
  }

  .markdown-body blockquote {
    margin: 0;
  }

  .markdown-body pre {
    margin: 0;
  }
`;

export const Footer = styled.div`
  border-top: 1px solid #e5e7eb;
  background-color: #fff;
  padding: 0.5rem;
`;
