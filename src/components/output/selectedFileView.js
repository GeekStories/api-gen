import CodeEditor from "@uiw/react-textarea-code-editor";
import beautify from "js-beautify";
import { useState, useEffect } from "react";

const defaultFormatOptions = { indent_size: 2, space_in_empty_paren: true, brace_style: "preserve-inline" };

const SelectedFileView = ({ selectedFile }) => {
  const [code, setCode] = useState(selectedFile.contents);

  useEffect(() => {
    setCode(beautify(selectedFile.contents, defaultFormatOptions));
  }, [selectedFile]);

  return (
      <CodeEditor
        value={code}
        language={selectedFile.ext === "js" ? "js" : "webmanifest"}
        onChange={(e) => setCode(e.target.value)}
        style={{
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          backgroundColor: "#f5f5f5",
          boxShadow: "inset 0px 0px 15px -6px rgba(0,0,0,0.5)",
          borderRadius: "7px",
          maxHeight: "32rem",
          width: "100%",
          overflowY: "scroll"
        }}
      />
  );
};

export default SelectedFileView;
