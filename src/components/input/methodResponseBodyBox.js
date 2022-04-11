import tw from "tailwind-styled-components";

const StyledBodyWrapper = tw.div`p-1 my-1`;
const StyledBodyTextArea = tw.textarea`min-w-full border-2 rounded resize-none`;
const StyledOptionLabel = tw.p`font-medium underline underline-offset-1`;

const BodyDefaultValue = JSON.stringify(
  [{ id: "int", item: "some-product", price: "1500" }],
  null,
  "\t"
);

const MethodResponseBox = () => {
  return (
    <StyledBodyWrapper>
      <StyledOptionLabel>Response Body</StyledOptionLabel>
      <StyledBodyTextArea rows="7" defaultValue={BodyDefaultValue} />
    </StyledBodyWrapper>
  );
};

export default MethodResponseBox;
