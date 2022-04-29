import tw from "tailwind-styled-components";

import OutputFileView from "./outputFileView";
import SelectedFileView from "./selectedFileView";

const StyledMain = tw.div`h-full flex rounded-sm w-full`;

const Output = ({
  formData,
  handleGenerateFiles,
  selectedFile,
  setSelectedFile,
  handleDownloadFiles,
}) => {
  return (
    <StyledMain>
      <OutputFileView
        dir={formData.dir}
        setSelectedFile={setSelectedFile}
        handleGenerateFiles={handleGenerateFiles}
        handleDownloadFiles={handleDownloadFiles}
      />
      <SelectedFileView selectedFile={selectedFile} />
    </StyledMain>
  );
};

export default Output;
