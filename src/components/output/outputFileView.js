import tw from "tailwind-styled-components";

import File from "./file";
import { FcFolder } from "react-icons/fc";

const Main = tw.div`col-span-3 grid grid-rows-6 max-h-full overflow-y-scroll border-t-2 border-r-2 border-black p-1`;
const RootFolder = tw.div`row-span-5 text-xl`;
const FolderLabel = tw.label`flex items-center`;
const Folder = tw.div`flex flex-col`;
const Files = tw.div`pl-10`;
const DirectoryControls = tw.div`row-span-1 grid grid-cols-2 gap-1 w-full p-2`;
const Button = tw.button`border-2 border-gray-400 px-3 py-2 font-medium transition-all ease-in-out delay-150 hover:bg-gray-300 hover:border-gray-400 rounded`;

const OutputFileView = ({
  dir,
  setSelectedFile,
  handleGenerateFiles,
  handleDownloadFiles,
}) => {
  return (
    <Main>
      <RootFolder>
        <Folder>
          <FolderLabel>
            <FcFolder />
            middleware
          </FolderLabel>
          <Files>
            {dir.middleware.map((item) => (
              <File
                key={item.id}
                file={item}
                setSelectedFile={setSelectedFile}
              />
            ))}
          </Files>
        </Folder>
        <Folder>
          <FolderLabel>
            <FcFolder />
            routes
          </FolderLabel>
          <Files>
            {dir.routes.map((item) => (
              <File
                key={item.id}
                file={item}
                setSelectedFile={setSelectedFile}
              />
            ))}
          </Files>
        </Folder>
        <Folder>
          <FolderLabel>
            <FcFolder />
            repositories
          </FolderLabel>
          <Files>
            {dir.repositories.map((item) => (
              <File
                key={item.id}
                file={item}
                setSelectedFile={setSelectedFile}
              />
            ))}
          </Files>
        </Folder>
        {dir.defaults.map((item) => (
          <File key={item.id} file={item} setSelectedFile={setSelectedFile} />
        ))}
      </RootFolder>
      <DirectoryControls>
        <Button onClick={handleGenerateFiles}>Generate File Contents</Button>
        <Button onClick={handleDownloadFiles}>Download Project!</Button>
      </DirectoryControls>
    </Main>
  );
};

export default OutputFileView;
