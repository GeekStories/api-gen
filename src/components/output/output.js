import tw from "tailwind-styled-components";

import OutputFileView from "./outputFileView";
import SelectedFileView from "./selectedFileView";

const StyledMain = tw.div`h-full flex rounded-sm w-full`;

const Output = ({
  projectFiles,
  handleGenerateFiles,
  selectedFile,
  setSelectedFile,
  handleOpenContact,
  handleDownloadFiles,
  handleImportFile,
  inputFileRef
}) => {
  return (
    <StyledMain>
      <OutputFileView
        projectFiles={projectFiles}
        setSelectedFile={setSelectedFile}
        selectedFile={selectedFile}
        handleOpenContact={handleOpenContact}
        handleGenerateFiles={handleGenerateFiles}
        handleDownloadFiles={handleDownloadFiles}
        handleImportFile={handleImportFile}
        inputFileRef={inputFileRef}
      />
      <SelectedFileView selectedFile={selectedFile} />
    </StyledMain>
  );
};

export default Output;
