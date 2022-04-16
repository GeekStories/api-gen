import tw from "tailwind-styled-components";
import { useState } from "react";

import OutputFileView from "./outputFileView";
import SelectedFileView from "./selectedFileView";

const StyledMain = tw.div`grid grid-cols-12 gap-1 rounded-sm`;

const Output = ({ formData }) => {
  const [selectedFile, setSelectedFile] = useState({});

  return (
    <StyledMain>
      <OutputFileView dir={formData.dir} setSelectedFile={setSelectedFile} />
      <SelectedFileView selectedFile={selectedFile} />
    </StyledMain>
  );
};

export default Output;
