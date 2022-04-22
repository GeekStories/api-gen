import tw from "tailwind-styled-components";
import CodeEditor from "@uiw/react-textarea-code-editor";
import beautify from "js-beautify";
import { useState, useEffect } from "react";

const StyledBodyWrapper = tw.div`p-1 my-1`;
const StyledOptionLabel = tw.p`font-medium underline underline-offset-1`;

const defaultFormatOptions = { indent_size: 2, space_in_empty_paren: true };
const placeHolderBody = JSON.stringify(
  { name: "string", email: "email", mobile: "number" },
  null,
  "\t"
);

const MethodBodyBox = ({ selectedMethodBody, handleChangeMethodBody }) => {
  const [body, setBody] = useState(selectedMethodBody);

  useEffect(() => {
    setBody(beautify(selectedMethodBody, defaultFormatOptions));
  }, [selectedMethodBody]);

  return (
    <StyledBodyWrapper>
      <StyledOptionLabel>Request Body</StyledOptionLabel>
      <CodeEditor
        value={body}
        placeholder={`example: { key: "type" } \n${placeHolderBody}`}
        language="webmanifest"
        onChange={(e) => handleChangeMethodBody(e.target.value)}
        style={{
          backgroundColor: "#f5f5f5",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          height: "8rem",
          boxShadow: "inset 0px 0px 15px -6px rgba(0,0,0,0.5)",
          borderRadius: "7px",
        }}
      />
    </StyledBodyWrapper>
  );
};

export default MethodBodyBox;
