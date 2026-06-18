import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView, Decoration } from "@codemirror/view";
import { StateField } from "@codemirror/state";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.48);
`;

const Dialog = styled.div`
  width: min(860px, 100%);
  max-height: min(880px, calc(100vh - 32px));
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border-radius: 8px;
  background: ${({ theme }) => theme.body?.secondary?.base || "#ffffff"};
  color: ${({ theme }) => theme.text?.primary || "#111827"};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.28);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
`;

const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-size: 24px;
  line-height: 1;
  color: inherit;
  background: transparent;

  &:hover {
    background: rgba(127, 127, 127, 0.14);
  }
`;

const ErrorPanel = styled.div`
  display: flex;
  gap: 12px;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 14px 16px;
  color: #7f1d1d;
  background: #fef2f2;
`;

const ErrorIcon = styled.div`
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  color: #ffffff;
  background: #ef4444;
  font-weight: 800;
`;

const ErrorContent = styled.div`
  display: grid;
  gap: 4px;

  strong {
    font-size: 15px;
  }

  p {
    margin: 0;
    line-height: 1.45;
  }

  small {
    color: #991b1b;
  }
`;

const EditorShell = styled.div`
  overflow: hidden;
  border: 1px solid
    ${({ $hasError }) => ($hasError ? "#fca5a5" : "rgba(127, 127, 127, 0.36)")};
  border-radius: 8px;
  background: ${({ theme }) => theme.body?.primary?.base || "#ffffff"};

  &:focus-within {
    border-color: ${({ $hasError }) => ($hasError ? "#ef4444" : "#3b82f6")};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ActionButton = styled.button`
  min-width: 96px;
  border: 0;
  border-radius: 6px;
  padding: 10px 14px;
  cursor: pointer;
  font-weight: 600;
  color: ${({ $primary }) => ($primary ? "#ffffff" : "inherit")};
  background: ${({ $primary }) => ($primary ? "#2563eb" : "rgba(127, 127, 127, 0.16)")};

  &:hover {
    filter: brightness(0.96);
  }
`;

const DEFAULT_BULK_UPLOAD_JSON_PLACEHOLDER = `Paste JSON here.

Example format:
{
  "questions": [
    {
      "question": {
        "statement": "What is 2 + 2?"
      },
      "options": [
        { "statement": "3" },
        { "statement": "4" },
        { "statement": "5" },
        { "statement": "6" }
      ],
      "difficulty": "Easy",
      "answerKey": "b",
      "explanation": "2 + 2 equals 4."
    }
  ]
}

Simple array format is also accepted:
[
  {
    "question": "What is 2 + 2?",
    "options": ["3", "4", "5", "6"],
    "questionLevel": "Easy",
    "correctAnswer": 1,
    "explanation": "2 + 2 equals 4."
  }
]`;

const getLineAndColumnFromIndex = (text, index) => {
  const safeIndex = Math.max(0, Math.min(index, text.length));
  const beforeIndex = text.slice(0, safeIndex);
  const lines = beforeIndex.split(/\r\n|\r|\n/);

  return {
    line: lines.length,
    column: lines[lines.length - 1].length + 1,
  };
};

const getJsonSyntaxError = (error, text) => {
  const message = error?.message || "Invalid JSON format.";
  const positionMatch = message.match(/position\s+(\d+)/i);
  const lineColumnMatch = message.match(/line\s+(\d+)\s+column\s+(\d+)/i);
  const line = lineColumnMatch ? Number(lineColumnMatch[1]) : null;
  const column = lineColumnMatch ? Number(lineColumnMatch[2]) : null;
  const position = positionMatch ? Number(positionMatch[1]) : null;
  const location =
    line && column
      ? { line, column }
      : Number.isFinite(position)
        ? getLineAndColumnFromIndex(text, position)
        : null;

  return {
    line: location?.line || null,
    column: location?.column || null,
    message: message.replace(/\s*\([^)]*line\s+\d+\s+column\s+\d+[^)]*\)/i, ""),
  };
};

const buildErrorLineDecorations = (state, lineNumber) => {
  if (!lineNumber || lineNumber < 1 || lineNumber > state.doc.lines) {
    return Decoration.none;
  }

  const line = state.doc.line(lineNumber);
  return Decoration.set([
    Decoration.line({
      attributes: { class: "cm-json-error-line" },
    }).range(line.from),
  ]);
};

const createErrorLineExtension = (lineNumber) =>
  StateField.define({
    create(state) {
      return buildErrorLineDecorations(state, lineNumber);
    },
    update(value, transaction) {
      if (!transaction.docChanged) {
        return value;
      }

      return buildErrorLineDecorations(transaction.state, lineNumber);
    },
    provide(field) {
      return EditorView.decorations.from(field);
    },
  });

const editorTheme = EditorView.theme({
  "&": {
    fontSize: "14px",
  },
  ".cm-scroller": {
    fontFamily: 'Consolas, "Courier New", monospace',
  },
  ".cm-content": {
    padding: "12px 0",
  },
  ".cm-gutters": {
    background: "#f8fafc",
    borderRight: "1px solid #e5e7eb",
    color: "#64748b",
  },
  ".cm-line": {
    padding: "0 12px",
  },
  ".cm-json-error-line": {
    backgroundColor: "#fee2e2",
    boxShadow: "inset 3px 0 0 #ef4444",
  },
});

const BulkUploadJsonModal = ({
  isOpen,
  onClose,
  onSubmit,
  placeholder = DEFAULT_BULK_UPLOAD_JSON_PLACEHOLDER,
}) => {
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState(null);
  const editorRef = useRef(null);

  const editorExtensions = useMemo(
    () => [
      javascript(),
      EditorView.lineWrapping,
      editorTheme,
      createErrorLineExtension(jsonError?.line),
    ],
    [jsonError?.line],
  );

  useEffect(() => {
    if (!jsonError?.line || !editorRef.current) {
      return;
    }

    const view = editorRef.current;
    const line = view.state.doc.line(
      Math.min(jsonError.line, view.state.doc.lines),
    );
    const cursorPosition = Math.min(
      line.from + Math.max((jsonError.column || 1) - 1, 0),
      line.to,
    );

    view.dispatch({
      selection: { anchor: cursorPosition },
      effects: EditorView.scrollIntoView(cursorPosition, { y: "center" }),
    });
    view.focus();
  }, [jsonError]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!jsonText.trim()) {
      toast.error("Please paste JSON before submitting.");
      return;
    }

    try {
      JSON.parse(jsonText);
      setJsonError(null);
    } catch (error) {
      setJsonError(getJsonSyntaxError(error, jsonText));
      return;
    }

    const isSubmitted = onSubmit(jsonText);
    if (isSubmitted) {
      setJsonText("");
      setJsonError(null);
      onClose();
    }
  };

  const handleClose = () => {
    setJsonText("");
    setJsonError(null);
    onClose();
  };

  return (
    <Overlay role="dialog" aria-modal="true" aria-labelledby="bulk-json-title">
      <Dialog>
        <Header>
          <Title id="bulk-json-title">Bulk Upload JSON</Title>
          <CloseButton type="button" aria-label="Close" onClick={handleClose}>
            &times;
          </CloseButton>
        </Header>

        {jsonError && (
          <ErrorPanel role="alert">
            <ErrorIcon>!</ErrorIcon>
            <ErrorContent>
              <strong>JSON Format Error</strong>
              <p>{jsonError.message}</p>
              {jsonError.line && jsonError.column && (
                <small>
                  Error found on line {jsonError.line}, character{" "}
                  {jsonError.column}. Character means the exact position within
                  that line.
                </small>
              )}
            </ErrorContent>
          </ErrorPanel>
        )}

        <EditorShell $hasError={Boolean(jsonError)}>
          <CodeMirror
            autoFocus
            value={jsonText}
            height="clamp(420px, 68vh, 640px)"
            basicSetup={{
              foldGutter: false,
              highlightActiveLine: false,
              highlightActiveLineGutter: false,
            }}
            extensions={editorExtensions}
            placeholder={placeholder}
            onChange={(value) => {
              setJsonText(value);
              if (jsonError) {
                setJsonError(null);
              }
            }}
            onCreateEditor={(view) => {
              editorRef.current = view;
            }}
          />
        </EditorShell>

        <Actions>
          <ActionButton type="button" onClick={handleClose}>
            Cancel
          </ActionButton>
          <ActionButton type="button" $primary onClick={handleSubmit}>
            Submit
          </ActionButton>
        </Actions>
      </Dialog>
    </Overlay>
  );
};

export default BulkUploadJsonModal;
