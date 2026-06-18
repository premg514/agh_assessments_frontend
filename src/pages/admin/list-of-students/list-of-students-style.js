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

export const ListOfStudentsStyle = styled.div`
  display: flex;
  flex-direction: column;
  transition: margin-left 200ms ease-in-out;
  .button__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    /* flex-direction: column; */
    gap: 10px;
    @media (max-width: 920px) {
    }
  }

  .heading_container {
    padding: 1rem;
  }

  .top_box {
    background-color: ${({ theme }) => theme.body.primary.base};
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
  }

  .after_heading {
    padding: 1rem;
    margin: 0rem 1rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0px 0px 80px 0px rgba(0, 0, 0, 0.07);
    border-radius: 1.5rem;
  }

  .total_students {
    float: right;
    white-space: nowrap;
  }

  .no-data {
    text-align: center;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
  }

  /* Base badge styling */
  .badge {
    font-size: 0.75rem;
    border-radius: 20px;
    padding: 0.25rem 0.75rem;
    width: fit-content;
    letter-spacing: 1px;
    color: white;
    text-transform: capitalize;
  }

  /* Green Badge */
  .badge-green {
    background-color: #00b90f; /* Nice green shade */
  }

  /* Red Badge */
  .badge-red {
    background-color: #dc3545; /* Nice red shade */
  }

  .button__style__one {
    background-color: #ffffff;
    border: 1.5px solid red;
    color: red;
    padding: 7px;
    width: 130px;
    font-weight: 700;
    border-radius: 20px;
    cursor: pointer;
  }

  @media screen and (min-width: 640px) {
    & {
      .top_box {
        flex-direction: row;
      }
    }
  }

  @media screen and (min-width: 1024px) {
    margin-left: ${({ $filterVisible }) => ($filterVisible ? "260px" : "0px")};
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto; /* Enable horizontal scrolling */

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1em;
    overflow: x;
    min-width: 1000px;
  }

  thead {
    background-color: #e2e2e2;

    & th:first-of-type {
      border-radius: 1rem 0 0 1rem;
    }

    & th:last-of-type {
      border-radius: 0 1rem 1rem 0;
    }
  }

  th {
    color: #5c5c5c;
    font-size: 16px;
    text-align: center;
    padding: 18px 15px;
    font-weight: 500;
    text-transform: capitalize;
    letter-spacing: 0.03em;
  }

  td {
    text-align: center;
    color: ${({ theme }) => theme.text.secondary};
    padding: 18px 15px;
    font-size: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.border.secondary};
  }
  .name__style {
    max-width: 200px;
    & > button {
      border: none;
      background-color: inherit;
      color: inherit;
      font-family: inherit;
    }
  }
  .col-100px {
    width: 100px;
  }

  .actions_container {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
  }
`;

export const ButtonWithIcon = styled.button`
  padding: 0.5rem 0.75rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.875rem;
  width: fit-content;
  border-radius: 0.5rem;
  cursor: pointer;
`;

export const ActiveFitlersContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .filter__button {
    border: 1px solid ${({ theme }) => theme.border.primary};
    color: ${({ theme }) => theme.text.secondary};
    background-color: ${({ theme }) => theme.body.primary.base};
    border-radius: 40px;
    transition: background-color 200ms linear;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.body.primary.hover};
    }
  }

  .active__filters {
    flex-grow: 1;
    display: flex;
    flex-wrap: nowrap;
    gap: 0.5rem;
    align-items: center;
    overflow-x: auto;
    white-space: nowrap;
  }

  .active__filter {
    display: flex;
    flex-wrap: nowrap;
    gap: 0.5rem;
    align-items: center;
    padding: 0.25rem 0.75rem;
    background-color: ${({ theme }) => theme.body.primary.base};
    border-radius: 2rem;
    color: ${({ theme }) => theme.text.primary};
    border: 1px solid ${({ theme }) => theme.border.primary};

    button {
      all: unset;
      cursor: pointer;
    }
    & span {
      line-height: none;
    }

    & .cross {
      position: relative;
      top: 1px;
    }
  }

  .btn__clear__all__filters {
    background-color: ${({ theme }) => theme.body.primary.base};
    border: none;
    margin-left: 0.5rem;
    color: ${({ theme }) => theme.text.primary};
    font-weight: 500;
  }
`;

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

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(2px);
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.body.primary.base};
  color: ${({ theme }) => theme.text.primary};
  border-radius: 16px;
  width: 100%;
  max-width: 960px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow:
    0 20px 25px -5px ${({ theme }) => theme.shadow.opacity_25},
    0 10px 10px -5px ${({ theme }) => theme.shadow.opacity_15};
  font-family: "Work Sans", sans-serif;

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 28px;
    border-bottom: 1px solid ${({ theme }) => theme.border.primary};

    h2 {
      font-size: 20px;
      font-weight: 600;
      margin: 0;
      color: ${({ theme }) => theme.text.primary};
    }

    button {
      background: ${({ theme }) => theme.body.secondary.base};
      border: 1px solid ${({ theme }) => theme.border.primary};
      width: 36px;
      height: 36px;
      border-radius: 8px;
      font-size: 18px;
      cursor: pointer;
      color: ${({ theme }) => theme.text.secondary};
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;

      &:hover {
        background: ${({ theme }) => theme.body.primary.hover};
        color: ${({ theme }) => theme.text.primary};
      }
    }
  }

  .modal-body {
    padding: 24px 28px;
    overflow-y: auto;
    flex: 1;
  }

  .modal-footer {
    padding: 16px 28px;
    border-top: 1px solid ${({ theme }) => theme.border.primary};
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
  }

  .modal-steps {
    padding: 16px 28px 0;
  }

  .modal-centered-step {
    text-align: center;
    padding: 64px 24px;

    .modal-step-icon {
      font-size: 56px;
      color: ${({ theme }) => theme.link_sky_blue};
      margin-bottom: 28px;
    }

    h3 {
      color: ${({ theme }) => theme.text.primary};
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    p {
      color: ${({ theme }) => theme.text.secondary};
      font-size: 14px;
      max-width: 340px;
      margin: 0 auto;
      line-height: 1.6;
    }
  }

  @media screen and (max-width: 500px) {
    max-width: 100%;
    .modal-header,
    .modal-body,
    .modal-footer {
      padding-left: 16px;
      padding-right: 16px;
    }
    .modal-footer {
      gap: 8px;
    }
  }
`;

export const StepsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
  padding: 8px 0 4px;
  overflow-x: auto;
`;

export const StepDot = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
  transition: all 0.25s;
  background: ${({ $active, $completed, theme }) =>
    $completed
      ? theme.submissionStatus.success
      : $active
        ? theme.link_sky_blue
        : theme.body.secondary.base};
  color: ${({ $active, $completed, theme }) =>
    $completed || $active ? "#ffffff" : theme.text.secondary};
  border: 2px solid
    ${({ $active, $completed, theme }) =>
      $completed
        ? theme.submissionStatus.success
        : $active
          ? theme.link_sky_blue
          : theme.border.primary};
  box-shadow: ${({ $active, theme }) =>
    $active ? `0 0 0 4px ${theme.background_link_sky_blue}` : "none"};
`;

export const StepLine = styled.div`
  width: 48px;
  height: 3px;
  background: ${({ $active, theme }) =>
    $active ? theme.submissionStatus.success : theme.border.primary};
  margin-top: 14px;
  flex-shrink: 0;
  border-radius: 2px;
  transition: background 0.3s;

  @media (max-width: 600px) {
    width: 24px;
  }
`;

export const StepLabel = styled.span`
  font-size: 14px;
  margin-top: 6px;
  color: ${({ $active, $completed, theme }) =>
    $completed
      ? theme.submissionStatus.success
      : $active
        ? theme.link_sky_blue
        : theme.text.secondary};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  white-space: nowrap;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

export const FileDropZone = styled.div`
  border: 2px dashed
    ${({ theme, $isDragActive }) =>
      $isDragActive ? theme.link_sky_blue : theme.border.secondary};
  border-radius: 12px;
  padding: 48px 24px;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
  background: ${({ theme, $isDragActive }) =>
    $isDragActive
      ? isDarkMode(theme)
        ? theme.body.secondary.base
        : theme.background_link_sky_blue
      : theme.body.primary.base};

  &:hover {
    border-color: ${({ theme }) => theme.link_sky_blue};
    background: ${({ theme }) =>
      isDarkMode(theme)
        ? theme.body.secondary.base
        : theme.background_link_sky_blue};
  }

  .dropzone-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .dropzone-icon {
    font-size: 52px;
    color: ${({ theme }) => theme.link_sky_blue};
    opacity: ${({ $isDragActive }) => ($isDragActive ? 1 : 0.75)};
    margin-bottom: 16px;
    transition: all 0.2s;
  }

  .dropzone-title {
    margin: 0 0 8px 0;
    color: ${({ theme }) => theme.text.primary};
  }

  .dropzone-description {
    color: ${({ theme }) => theme.text.secondary};
    margin: 0 0 16px 0;
    font-size: 14px;
  }

  .dropzone-columns-label {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.text.secondary};
    margin-top: 20px;
    margin-bottom: 8px;
  }

  .dropzone-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: center;
    max-width: 500px;
  }

  .dropzone-chip {
    font-size: 12px;
    font-family: "Courier New", monospace;
    padding: 3px 10px;
    border-radius: 4px;
    background: ${({ theme }) => theme.body.secondary.base};
    color: ${({ theme }) => theme.text.secondary};
    border: 1px solid ${({ theme }) => theme.border.primary};
    white-space: nowrap;

    &.dropzone-chip--optional {
      border-style: dashed;
      opacity: 0.65;
    }
  }

  .template-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: 1px solid ${({ theme }) => theme.submissionStatus.success};
    color: ${({ theme }) => theme.submissionStatus.success};
    cursor: pointer;
    margin-top: 20px;
    font-size: 13px;
    padding: 7px 18px;
    border-radius: 20px;
    font-family: "Work Sans", sans-serif;
    transition: all 0.2s;

    &:hover {
      background: ${({ theme }) => theme.difficulty.easy.bg};
    }
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 12px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const StudentCard = styled.div`
  border: 1px solid
    ${({ $hasError, $deleted, theme }) =>
      $deleted
        ? theme.border.primary
        : $hasError
          ? theme.option.wrong.border
          : theme.border.secondary};
  border-radius: 10px;
  padding: 12px;
  background: ${({ $hasError, $deleted, theme }) =>
    $deleted
      ? theme.body.secondary.base
      : $hasError
        ? theme.difficulty.hard.bg
        : theme.body.primary.base};
  opacity: ${({ $deleted }) => ($deleted ? 0.6 : 1)};
  transition: all 0.15s;

  &:hover {
    box-shadow: 0 2px 8px ${({ theme }) => theme.shadow.opacity_10};
  }
`;

export const ResultsSummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 28px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 20px;
  border-radius: 12px;
  border: 1px solid transparent;

  .summary-icon {
    font-size: 30px;
    margin-bottom: 14px;
    color: ${({ $variant, theme }) => {
      switch ($variant) {
        case "success":
          return theme.difficulty.easy.text;
        case "skipped":
          return theme.difficulty.medium.text;
        case "failed":
          return theme.difficulty.hard.text;
        default:
          return theme.text.secondary;
      }
    }};
  }

  .count {
    font-size: 36px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 6px;
  }

  .label {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.text.secondary};
  }

  background: ${({ $variant, theme }) => {
    switch ($variant) {
      case "success":
        return theme.difficulty.easy.bg;
      case "skipped":
        return theme.difficulty.medium.bg;
      case "failed":
        return theme.difficulty.hard.bg;
      default:
        return theme.body.secondary.base;
    }
  }};

  border-color: ${({ $variant, theme }) => {
    switch ($variant) {
      case "success":
        return theme.difficulty.easy.text;
      case "skipped":
        return theme.difficulty.medium.text;
      case "failed":
        return theme.difficulty.hard.text;
      default:
        return theme.border.primary;
    }
  }};

  .count {
    color: ${({ $variant, theme }) => {
      switch ($variant) {
        case "success":
          return theme.difficulty.easy.text;
        case "skipped":
          return theme.difficulty.medium.text;
        case "failed":
          return theme.difficulty.hard.text;
        default:
          return theme.text.primary;
      }
    }};
  }
`;

export const ErrorTableContainer = styled.div`
  margin-bottom: 24px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 12px 0;
    color: ${({ theme }) => theme.text.primary};
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .badge {
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 999px;
    font-weight: 600;
    background: ${({ $variant, theme }) =>
      $variant === "skipped"
        ? theme.difficulty.medium.bg
        : theme.difficulty.hard.bg};
    color: ${({ $variant, theme }) =>
      $variant === "skipped"
        ? theme.difficulty.medium.text
        : theme.difficulty.hard.text};
  }
`;

export const ErrorTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  background: ${({ theme }) => theme.body.primary.base};
  border: 1px solid ${({ theme }) => theme.border.primary};
  border-radius: 8px;
  overflow: hidden;

  thead {
    background: ${({ theme }) => theme.body.secondary.base};
  }

  th {
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    color: ${({ theme }) => theme.text.primary};
    font-size: 13px;
    border-bottom: 1px solid ${({ theme }) => theme.border.primary};
  }

  td {
    padding: 12px 16px;
    color: ${({ theme }) => theme.text.secondary};
    border-bottom: 1px solid ${({ theme }) => theme.border.primary};
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background: ${({ theme }) => theme.body.primary.hover};
  }

  .reason-text {
    color: ${({ theme }) => theme.submissionStatus.failed};
    font-size: 13px;
  }
`;

export const NoErrorsMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.difficulty.easy.text};
  font-weight: 500;
  padding: 20px;
  background: ${({ theme }) => theme.difficulty.easy.bg};
  border-radius: 8px;
  margin-bottom: 0;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;

  .card-index {
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme.text.secondary};
  }

  .auto-corrected-badge {
    font-size: 11px;
    background: ${({ theme }) =>
      isDarkMode(theme)
        ? theme.body.secondary.base
        : theme.background_link_sky_blue};
    color: ${({ theme }) => theme.link_sky_blue};
    padding: 2px 8px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: auto;
    margin-right: 8px;
  }

  .restore-btn {
    background: ${({ theme }) => theme.submissionStatus.success};
    color: #ffffff;
    border: none;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
    font-size: 12px;
  }
`;

export const CardFieldGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 8px;

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

export const CardField = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 11px;
    font-weight: 500;
    color: ${({ theme }) => theme.text.secondary};
    margin-bottom: 2px;
  }
`;

export const CardError = styled.div`
  margin-top: 8px;
  background: ${({ theme }) => theme.difficulty.hard.bg};
  border: 1px solid ${({ theme }) => theme.option.wrong.border};
  border-radius: 6px;
  padding: 8px 10px;

  .error-item {
    font-size: 12px;
    color: ${({ theme }) => theme.difficulty.hard.text};
    line-height: 1.4;

    strong {
      text-transform: capitalize;
    }
  }
`;

export const CardActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

export const DeletedRecordMessage = styled.div`
  padding: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text.secondary};
  font-style: italic;
`;

export const EditableInput = styled.input`
  width: 100%;
  padding: 6px 8px;
  border: 1px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.option.wrong.border : theme.border.secondary};
  border-radius: 6px;
  font-size: 13px;
  font-family: "Work Sans", sans-serif;
  color: ${({ theme }) => theme.text.primary};
  background: ${({ $hasError, theme }) =>
    $hasError ? theme.difficulty.hard.bg : theme.body.primary.base};
  transition: border-color 0.15s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.link_sky_blue};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.shadow.opacity_10};
  }

  &::placeholder {
    color: ${({ theme }) => theme.text.secondary};
  }
`;

export const EditableSelect = styled.select`
  width: 100%;
  padding: 6px 8px;
  border: 1px solid
    ${({ $hasError, theme }) =>
      $hasError ? theme.option.wrong.border : theme.border.secondary};
  border-radius: 6px;
  font-size: 13px;
  font-family: "Work Sans", sans-serif;
  color: ${({ theme }) => theme.text.primary};
  background: ${({ $hasError, theme }) =>
    $hasError ? theme.difficulty.hard.bg : theme.body.primary.base};
  transition: border-color 0.15s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.link_sky_blue};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.shadow.opacity_10};
  }
`;

export const DeleteRowButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.submissionStatus.failed};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.15s;

  &:hover {
    background: ${({ theme }) => theme.difficulty.hard.bg};
  }
`;

export const ModalPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.border.primary};

  button {
    padding: 6px 14px;
    border: 1px solid ${({ theme }) => theme.border.secondary};
    border-radius: 6px;
    background: ${({ theme }) => theme.body.primary.base};
    color: ${({ theme }) => theme.text.primary};
    cursor: pointer;
    font-size: 13px;
    font-family: "Work Sans", sans-serif;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.body.primary.hover};
      border-color: ${({ theme }) => theme.link_sky_blue};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  span {
    font-size: 13px;
    color: ${({ theme }) => theme.text.secondary};
  }
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 6px;

  background: ${({ $variant, theme }) => getUploadVariant($variant).bg(theme)};
  color: ${({ $variant, theme }) => getUploadVariant($variant).text(theme)};
  border: 1px solid
    ${({ $variant, theme }) => getUploadVariant($variant).border(theme)};
`;

export const EditableTableWrapper = styled.div`
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.border.primary};
  border-radius: 8px;
`;

export const EditableTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  thead {
    background: ${({ theme }) => theme.body.secondary.base};
  }

  th {
    padding: 10px 12px;
    text-align: left;
    font-weight: 600;
    color: ${({ theme }) => theme.text.primary};
    font-size: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.border.primary};
    white-space: nowrap;
  }

  td {
    padding: 6px 8px;
    border-bottom: 1px solid ${({ theme }) => theme.border.primary};
    vertical-align: top;
    color: ${({ theme }) => theme.text.secondary};
  }

  tbody tr:hover {
    background: ${({ theme }) => theme.body.primary.hover};
  }

  tbody tr.error-row {
    background: ${({ theme }) => theme.difficulty.hard.bg};
  }

  tbody tr.deleted-row {
    opacity: 0.4;
    text-decoration: line-through;
  }
`;

export const RecordErrorRow = styled.tr`
  background: ${({ theme }) => theme.difficulty.hard.bg};

  td {
    padding: 4px 12px;
    font-size: 12px;
    color: ${({ theme }) => theme.difficulty.hard.text};
    border-bottom: 1px solid ${({ theme }) => theme.option.wrong.border};
  }
`;
