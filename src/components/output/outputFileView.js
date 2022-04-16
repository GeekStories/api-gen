import tw from "tailwind-styled-components";

import File from "./file";
import { FcFolder } from "react-icons/fc";

const StyledMain = tw.div`col-span-3 max-h-full overflow-y-scroll border-t-2 border-r-2 border-black p-1`;

const StyledRootFolder = tw.div`text-xl`;
const StyledFolderLabel = tw.label`flex items-center`;

const StyledMiddlewareFolder = tw.div`flex flex-col`;
const StyledMiddlewareFiles = tw.div`pl-10`;

const StyledRoutesFolder = tw.div``;
const StyledRoutesFiles = tw.div`pl-10`;

const StyledRepositoryFolder = tw.div``;
const StyledRepositoryFiles = tw.div`pl-10`;

const OutputFileView = ({ dir, setSelectedFile }) => {
  return (
    <StyledMain>
      <StyledRootFolder>
        <StyledMiddlewareFolder>
          <StyledFolderLabel>
            <FcFolder />
            middleware
          </StyledFolderLabel>
          <StyledMiddlewareFiles>
            {dir.middleware.map((item) => (
              <File key={item.id} file={item} setSelectedFile={setSelectedFile} />
            ))}
          </StyledMiddlewareFiles>
        </StyledMiddlewareFolder>
        <StyledRoutesFolder>
          <StyledFolderLabel>
            <FcFolder />
            routes
          </StyledFolderLabel>
          <StyledRoutesFiles>
            {dir.routes.map((item) => (
              <File key={item.id} file={item} setSelectedFile={setSelectedFile} />
            ))}
          </StyledRoutesFiles>
        </StyledRoutesFolder>
        <StyledRepositoryFolder>
          <StyledFolderLabel>
            <FcFolder />
            repositories
          </StyledFolderLabel>
          <StyledRepositoryFiles>
            {dir.repositories.map((item) => (
              <File key={item.id} file={item} setSelectedFile={setSelectedFile} />
            ))}
          </StyledRepositoryFiles>
        </StyledRepositoryFolder>
        {dir.defaults.map((item) => (
          <File key={item.id} file={item} setSelectedFile={setSelectedFile} />
        ))}
      </StyledRootFolder>
    </StyledMain>
  );
};

export default OutputFileView;
