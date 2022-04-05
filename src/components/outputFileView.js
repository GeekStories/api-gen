import tw from "tailwind-styled-components";
import { FcFolder } from "react-icons/fc";
import { FaFileCode } from "react-icons/fa";

const StyledMain = tw.div`
  col-span-3
  max-h-full
  overflow-y-scroll
  border-t-2
  border-r-2
border-black
  p-1
`;

const StyledRootFolder = tw.div`text-xl`;
const StyledFolderLabel = tw.label`flex items-center`;
const StyledFileLabel = tw(StyledFolderLabel)`pl-10`;
const StyledRootFile = tw(StyledFolderLabel)`pl-5`;

const StyledMiddlewareFolder = tw.div`pl-5`;
const StyledRoutesFolder = tw.div`pl-5`;
const StyledRepositoryFolder = tw.div`pl-5`;

const OutputFileView = () => {
  return (
    <StyledMain>
      <StyledRootFolder>
        <StyledMiddlewareFolder>
          <StyledFolderLabel>
            <FcFolder />
            middleware
          </StyledFolderLabel>
          <StyledFileLabel>
            <FaFileCode />
            users.validation.js
          </StyledFileLabel>
          <StyledFileLabel>
            <FaFileCode />
            users.test.js
          </StyledFileLabel>
          <StyledFileLabel>
            <FaFileCode />
            products.validation.js
          </StyledFileLabel>
          <StyledFileLabel>
            <FaFileCode />
            products.test.js
          </StyledFileLabel>
        </StyledMiddlewareFolder>
        <StyledRoutesFolder>
          <StyledFolderLabel>
            <FcFolder />
            routes
          </StyledFolderLabel>
          <StyledFileLabel>
            <FaFileCode />
            users.route.js
          </StyledFileLabel>
          <StyledFileLabel>
            <FaFileCode />
            users.test.js
          </StyledFileLabel>
          <StyledFileLabel>
            <FaFileCode />
            products.route.js
          </StyledFileLabel>
          <StyledFileLabel>
            <FaFileCode />
            products.test.js
          </StyledFileLabel>
        </StyledRoutesFolder>
        <StyledRepositoryFolder>
          <StyledFolderLabel>
            <FcFolder />
            repositories
          </StyledFolderLabel>
          <StyledFileLabel>
            <FaFileCode />
            users.repository.js
          </StyledFileLabel>
          <StyledFileLabel>
            <FaFileCode />
            users.test.js
          </StyledFileLabel>
          <StyledFileLabel>
            <FaFileCode />
            products.repository.js
          </StyledFileLabel>
          <StyledFileLabel>
            <FaFileCode />
            products.test.js
          </StyledFileLabel>
        </StyledRepositoryFolder>
        <StyledRootFile>
          <FaFileCode />
          app.js
        </StyledRootFile>
        <StyledRootFile>
          <FaFileCode />
          server.js
        </StyledRootFile>
        <StyledRootFile>
          <FaFileCode />
          package.json
        </StyledRootFile>
      </StyledRootFolder>
    </StyledMain>
  );
};

export default OutputFileView;
