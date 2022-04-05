import tw from "tailwind-styled-components";
import OutputFileView from "./outputFileView";
import SelectedFileView from "./selectedFileView";

const StyledMain = tw.div`
  grid
  grid-cols-12
  gap-1
  rounded-sm
`;

const Output = () => {
  return (
    <StyledMain>
      <OutputFileView />
      <SelectedFileView />
    </StyledMain>
  );
};

export default Output;
