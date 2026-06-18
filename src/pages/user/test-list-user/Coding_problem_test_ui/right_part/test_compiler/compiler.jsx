import React, { useMemo } from "react";
import CodeMirror, {
  EditorState,
  EditorView,
  StateField,
  Decoration,
} from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { autocompletion } from "@codemirror/autocomplete";
import { vscodeDark, vscodeLight } from "@uiw/codemirror-theme-vscode";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { monokai } from "@uiw/codemirror-theme-monokai";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { duotoneDark, duotoneLight } from "@uiw/codemirror-theme-duotone";
import { solarizedDark, solarizedLight } from "@uiw/codemirror-theme-solarized";
import { nord } from "@uiw/codemirror-theme-nord";
import { CompilerContainer } from "../../../../../Coding_problem_compiler/compiler/compilerSection.style";

const Compiler = ({
  handleValueChange,
  code,
  setCode,
  isMobileScreenSize,
  topHeight,
  language,
  width,
  theme,
  font,
  submitted,
}) => {
  const blockEditAfterMain = (state) => {
    const docText = state.doc.toString();
    const builder = [];

    // 1. Java / C++ / C — main() detection using braces
    const javaCppPattern =
      /(?:int|void|public\s+static\s+void)\s+main\s*\([^)]*\)\s*\{/g;
    let match;

    while ((match = javaCppPattern.exec(docText)) !== null) {
      const startIdx = match.index;
      const openBraceIdx = docText.indexOf("{", startIdx);
      if (openBraceIdx === -1) continue;

      let i = openBraceIdx + 1;
      let braceCount = 1;

      while (i < docText.length && braceCount > 0) {
        const char = docText[i];
        if (char === "{") braceCount++;
        else if (char === "}") braceCount--;
        i++;
      }

      if (braceCount === 0) {
        builder.push({
          from: startIdx,
          to: i,
          deco: Decoration.mark({
            attributes: { class: "cm-noneditable" },
            editable: false,
          }),
        });
      }
    }

    // 2. Python — detect `def main():` and lock until next def/class
    const pythonDefPattern = /def\s+main\s*\(\s*\)\s*:/g;
    while ((match = pythonDefPattern.exec(docText)) !== null) {
      const startIdx = match.index;
      const remainingText = docText.slice(startIdx);
      const endMatch = remainingText.search(/\n(?=def\s|\s*class\s)/);
      const endIdx = endMatch !== -1 ? startIdx + endMatch : docText.length;

      builder.push({
        from: startIdx,
        to: endIdx,
        deco: Decoration.mark({
          attributes: { class: "cm-noneditable" },
          editable: false,
        }),
      });
    }

    // 3. Python — lock from `t = int(input())` to final `print("~")`
    const pythonInputPattern = /t\s*=\s*int\(input\(\)\)/g;
    while ((match = pythonInputPattern.exec(docText)) !== null) {
      const startIdx = match.index;
      const printEndPattern = /print\s*\(\s*["']~["']\s*\)/g;
      const printMatch = printEndPattern.exec(docText.slice(startIdx));
      if (printMatch) {
        const endIdx = startIdx + printMatch.index + printMatch[0].length;
        builder.push({
          from: startIdx,
          to: endIdx,
          deco: Decoration.mark({
            attributes: { class: "cm-noneditable" },
            editable: false,
          }),
        });
      }
    }

    // ✅ Sort and apply
    const sorted = builder.sort((a, b) => a.from - b.from);

    return {
      decorations: Decoration.set(
        sorted.map((item) => item.deco.range(item.from, item.to)),
      ),
    };
  };
  const blockEditAfterMainExtention = StateField.define({
    create(state) {
      return blockEditAfterMain(state);
    },
    update(value, tr) {
      return blockEditAfterMain(tr.state);
    },
    provide(field) {
      return EditorView.decorations.from(field, (value) => value.decorations);
    },
  });

  const blockHiddenEdits = EditorState.transactionFilter.of((tr) => {
    let field = tr.startState.field(blockEditAfterMainExtention, false);
    if (!field || !field.decorations) return tr;

    let isBlocked = false;

    tr.changes.iterChanges((from, to) => {
      field.decorations.between(from, to, () => {
        isBlocked = true;
      });
    });

    return isBlocked ? [] : tr;
  });

  const customFontSize = EditorView.theme({
    "&": {
      fontSize: font, // You can change this to any desired size
      fontFamily: "monospace",
    },
  });

  const languageExtension = useMemo(() => {
    if (language?.value === 54 || language?.value === 50) return cpp();
    if (language?.value === 62) return java();
    return python();
  }, [language?.value]);

  const extensions = useMemo(() => {
    return [
      languageExtension,
      autocompletion(),
      customFontSize,
      blockEditAfterMainExtention,
      blockHiddenEdits,
    ];
  }, [
    languageExtension,
    customFontSize,
    blockEditAfterMainExtention,
    blockHiddenEdits,
  ]);

  const themeMap = {
    vscodeDark,
    vscodeLight,
    dracula,
    monokai,
    githubDark,
    githubLight,
    duotoneDark,
    duotoneLight,
    solarizedDark,
    solarizedLight,
    nord,
  };
  const actualTheme = themeMap[theme];

  return (
    <CompilerContainer>
      <CodeMirror
        value={code || ""}
        theme={actualTheme}
        editable={!submitted}
        height={`${isMobileScreenSize ? "340px" : topHeight - 18 + "vh"}`}
        width={width || "100%"}
        extensions={extensions}
        onChange={(currentValue) => {
          handleValueChange(language.label, currentValue);
        }}
      />
    </CompilerContainer>
  );
};

export default Compiler;
