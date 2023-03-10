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
  handleOpenHelp,
  handleDownloadFiles,
}) => {
  return (
    <StyledMain>
      <OutputFileView
        projectFiles={projectFiles}
        setSelectedFile={setSelectedFile}
        selectedFile={selectedFile}
        handleOpenContact={handleOpenContact}
        handleOpenHelp={handleOpenHelp}
        handleGenerateFiles={handleGenerateFiles}
        handleDownloadFiles={handleDownloadFiles}
      />
      <SelectedFileView selectedFile={selectedFile} />
    </StyledMain>
  );
};

export default Output;
