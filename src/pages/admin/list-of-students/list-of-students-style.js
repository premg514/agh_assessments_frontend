import styled from "styled-components";

const isDarkMode = (theme) => theme.mode === "DARK";

const uploadVariantStyles = {
  info: {
    bg: (theme) =>
      isDarkMode(theme)
        ? theme.body.secondary.base
        : theme.background_link_sky_blue,
    text: (theme) => theme.link_sky_blue,
    border: (theme) => theme.link_sky_blue,
  },
  success: {
    bg: (theme) => theme.difficulty.easy.bg,
    text: (theme) => theme.difficulty.easy.text,
    border: (theme) => theme.difficulty.easy.text,
  },
  error: {
    bg: (theme) => theme.difficulty.hard.bg,
    text: (theme) => theme.difficulty.hard.text,
    border: (theme) => theme.difficulty.hard.text,
  },
  warning: {
    bg: (theme) => theme.difficulty.medium.bg,
    text: (theme) => theme.difficulty.medium.text,
    border: (theme) => theme.difficulty.medium.text,
  },
  default: {
    bg: (theme) => theme.body.secondary.base,
    text: (theme) => theme.text.secondary,
    border: (theme) => theme.border.primary,
  },
};

const getUploadVariant = (variant) =>
  uploadVariantStyles[variant] || uploadVariantStyles.default;









export const SearchInputContainer = styled.div`
  width: 100%;
  max-width: 300px;
  & label {
    background-color: ${({ theme }) => theme.search_input};
    padding: 0.5rem 0.75rem;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.text.primary};
    border: 1px solid ${({ theme }) => theme.border.primary};
    border-radius: 50px;

    & input {
      padding: 0.05rem 0.5rem;
      border: none;
      background-color: inherit;
      font-family: inherit;
      color: ${({ theme }) => theme.text.primary};
      width: 100%;
      font-size: 1rem;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: ${({ theme }) => theme.text.secondary};
      }
    }
  }
`;
























































