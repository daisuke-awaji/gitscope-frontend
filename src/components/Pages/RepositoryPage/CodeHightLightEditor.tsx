import React from "react";
import Editor from "react-simple-code-editor";
import "./style.css";
const { highlight, languages } = require("prismjs/components/prism-core");
require("prismjs/components/prism-clike");
require("prismjs/components/prism-javascript");
require("prismjs/components/prism-json");
require("prismjs/themes/prism.css");

const hightlightWithLineNumbers = (input: string, language: any) =>
  highlight(input, language)
    .split("\n")
    .map(
      (line: any, i: number) =>
        `<span class='editorLineNumber'>${i + 1}</span>${line}`
    )
    .join("\n");

type CodeHightLightEditorProps = {
  code: any;
  setCode: any;
};
export const CodeHighLightEditor: React.FC<CodeHightLightEditorProps> = (
  props
) => {
  const { code, setCode } = props;
  return (
    <Editor
      value={code}
      onValueChange={(code) => setCode(code)}
      highlight={(code) => hightlightWithLineNumbers(code, languages.json)}
      padding={10}
      tabSize={4}
      textareaId="codeArea"
      className="editor"
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 16,
        outline: 0,
      }}
    />
  );
};
