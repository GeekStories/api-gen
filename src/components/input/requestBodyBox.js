import tw from "tailwind-styled-components";
import CodeEditor from "@uiw/react-textarea-code-editor";
import beautify from "js-beautify";
import { useState, useEffect } from "react";

const BodyWrapper = tw.div`h-[9rem]`;
const OptionLabel = tw.p`font-medium underline underline-offset-1`;

const defaultFormatOptions = { indent_size: 2, space_in_empty_paren: true };
const placeHolderBody = JSON.stringify(
  {
    name: "string",
    email: "email",
    mobile: "number",
  },
  null,
  1
);

const MethodBodyBox = ({ selectedMethodBody, handleChangeMethodBody }) => {
  const [body, setBody] = useState(selectedMethodBody);

  useEffect(() => {
    setBody(beautify(selectedMethodBody, defaultFormatOptions));
  }, [selectedMethodBody]);

  return (
    <BodyWrapper>
      <OptionLabel>Request Body</OptionLabel>
      <CodeEditor
        value={body}
        placeholder={placeHolderBody}
        language="webmanifest"
        onChange={(e) => handleChangeMethodBody(e.target.value)}
        style={{
          backgroundColor: "#f5f5f5",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          boxShadow: "inset 0px 0px 15px -6px rgba(0,0,0,0.5)",
          borderRadius: "7px",
          height: "80%",
        }}
      />
    </BodyWrapper>
  );
};

export default MethodBodyBox;
