import tw from "tailwind-styled-components";

const StyledBodyWrapper = tw.div`p-1 my-1`;
const StyledBodyTextArea = tw.textarea`min-w-full border-2 rounded resize-none`;
const StyledOptionLabel = tw.p`font-medium underline underline-offset-1`;

const BodyDefaultValue = JSON.stringify(
  { name: "string", age: "number", password: "string" },
  null,
  "\t"
);

const MethodBodyBox = () => {
  return (
    <StyledBodyWrapper>
      <StyledOptionLabel>Request Body</StyledOptionLabel>
      <StyledBodyTextArea rows="5" defaultValue={BodyDefaultValue} />
    </StyledBodyWrapper>
  );
};

export default MethodBodyBox;
