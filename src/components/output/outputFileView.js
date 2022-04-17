import tw from "tailwind-styled-components";

import File from "./file";
import { FcFolder } from "react-icons/fc";

const StyledMain = tw.div`col-span-3 max-h-full overflow-y-scroll border-t-2 border-r-2 border-black p-1`;

const StyledRootFolder = tw.div`text-xl`;
const StyledFolderLabel = tw.label`flex items-center`;

const StyledFolder = tw.div`flex flex-col`;
const StyledFiles = tw.div`pl-10`;

const StyledGenerateContentButton = tw.button`border-2 border-gray-400 rounded px-3 py-1`;

const OutputFileView = ({ dir, setSelectedFile, handleGenerateFiles }) => {
  return (
    <StyledMain>
      <StyledRootFolder>
        <StyledFolder>
          <StyledFolderLabel>
            <FcFolder />
            middleware
          </StyledFolderLabel>
          <StyledFiles>
            {dir.middleware.map((item) => (
              <File
                key={item.id}
                file={item}
                setSelectedFile={setSelectedFile}
              />
            ))}
          </StyledFiles>
        </StyledFolder>
        <StyledFolder>
          <StyledFolderLabel>
            <FcFolder />
            routes
          </StyledFolderLabel>
          <StyledFiles>
            {dir.routes.map((item) => (
              <File
                key={item.id}
                file={item}
                setSelectedFile={setSelectedFile}
              />
            ))}
          </StyledFiles>
        </StyledFolder>
        <StyledFolder>
          <StyledFolderLabel>
            <FcFolder />
            repositories
          </StyledFolderLabel>
          <StyledFiles>
            {dir.repositories.map((item) => (
              <File
                key={item.id}
                file={item}
                setSelectedFile={setSelectedFile}
              />
            ))}
          </StyledFiles>
        </StyledFolder>
        {dir.defaults.map((item) => (
          <File key={item.id} file={item} setSelectedFile={setSelectedFile} />
        ))}
      </StyledRootFolder>
      <StyledGenerateContentButton onClick={handleGenerateFiles}>
        Generate File Contents
      </StyledGenerateContentButton>
    </StyledMain>
  );
};

export default OutputFileView;
