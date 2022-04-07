import tw from "tailwind-styled-components";

const StyledMain = tw.div`
  col-span-9
  border-t-2
  border-l-2
border-black
  w-full
  p-2
`;

const StyledCodeBox = tw.textarea`
  min-w-full
  min-h-full
  resize-none
`;

function SelectedFileView({ formData }) {
  return (
    <StyledMain>
      <StyledCodeBox
      // defaultValue={JSON.stringify(formData, null, "\t")}
      ></StyledCodeBox>
    </StyledMain>
  );
}

export default SelectedFileView;
