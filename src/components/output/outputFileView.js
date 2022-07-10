import tw from "tailwind-styled-components";

import File from "./file";
import { FcFolder } from "react-icons/fc";
import {
  TiSocialTwitter,
  TiSocialGithub,
} from "react-icons/ti";
import { GrContactInfo } from "react-icons/gr";
import { CgWebsite } from "react-icons/cg";

const Main = tw.div`min-w-[20.07rem] max-w-[40rem] grid grid-rows-6 p-1 border-r-[1px] border-black`;
const RootFolder = tw.div`row-span-5 h-96 text-xl overflow-y-scroll`;
const FolderLabel = tw.label`flex items-center`;
const Folder = tw.div`flex flex-col`;
const Files = tw.div`pl-10 ${(p) =>
  p.$selected ? "bg-gray-200" : "bg-white"}`;
const ControlsSocialsWrapper = tw.div`row-span-2`;
const DirectoryControls = tw.div`row-span-2 m-auto grid grid-cols-3 gap-1 w-full px-2`;
const Button = tw.button`border-2 border-gray-400 px-3 text-sm font-medium transition-all ease-in-out delay-150 hover:bg-gray-300 hover:border-gray-400 rounded`;
const HiddenInput = tw.input`hidden`;

const SocialPlugs = tw.div`row-span-1 grid grid-cols-4 p-1`;
const SocialLink = tw.a`m-auto`;

const OutputFileView = ({
  projectFiles,
  setSelectedFile,
  selectedFile,
  handleOpenContact,
  handleGenerateFiles,
  handleDownloadFiles,
  handleImportFile,
  inputFileRef,
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
            {projectFiles &&
              projectFiles.middleware.map((item) => (
                <File
                  key={item.id}
                  file={item}
                  setSelectedFile={setSelectedFile}
                  $selected={selectedFile.name === item.name}
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
            {projectFiles &&
              projectFiles.routes.map((item) => (
                <File
                  key={item.id}
                  file={item}
                  setSelectedFile={setSelectedFile}
                />
              ))}
          </Files>
        </Folder>
        {projectFiles &&
          projectFiles.defaults.map((item) => (
            <File key={item.id} file={item} setSelectedFile={setSelectedFile} />
          ))}
      </RootFolder>
      <ControlsSocialsWrapper>
        <DirectoryControls>
          <Button onClick={handleGenerateFiles}>Generate File Contents</Button>
          <Button onClick={handleDownloadFiles}>Download Project!</Button>
          <Button onClick={() => inputFileRef.current.click()}>
            Import Apispec!
          </Button>
          <HiddenInput
            type="file"
            ref={inputFileRef}
            onChange={handleImportFile}
            id="file"
            accept=".yaml"
          />
        </DirectoryControls>
        <SocialPlugs>
          <SocialLink
            href="https://twitter.com/geek_stories"
            target="_blank"
            rel="noreferrer"
          >
            <TiSocialTwitter size="2em" />
          </SocialLink>

          <SocialLink
            href="https://github.com/geekstories"
            target="_blank"
            rel="noreferrer"
          >
            <TiSocialGithub size="2em" />
          </SocialLink>

          <SocialLink
            href="https://damonpitkethley.com"
            target="_blank"
            rel="noreferrer"
          >
            <CgWebsite size="2em" />
          </SocialLink>
          <SocialLink href="#" onClick={handleOpenContact}>
            <GrContactInfo size="2em" />
          </SocialLink>
        </SocialPlugs>
      </ControlsSocialsWrapper>
    </Main>
  );
};

export default OutputFileView;
