import tw from "tailwind-styled-components";

const StyledMain = tw.div`
  col-span-9
  border-2
  border-black
`;

const SelectedFileView = () => {
  return <StyledMain>Code of the selected file</StyledMain>;
};

export default SelectedFileView;
