import tw from "tailwind-styled-components";
import { FaFileCode } from "react-icons/fa";

const StyledFileLabel = tw.div`flex`;
const Icon = tw(FaFileCode)`my-auto`;
const StyledFileName = tw.p`${(p) =>
  p.$selected === true
    ? "bg-gray-500"
    : "bg-white"} hover:cursor-pointer text-lg hover:bg-gray-300 rounded-lg p-1`;

const File = ({ file, setSelectedFile, selected }) => {
  return (
    <StyledFileLabel>
      <Icon />{" "}
      <StyledFileName
        onClick={() => setSelectedFile(file)}
        $selected={selected}
      >
        {`${file.name}.${file.ext}`}
      </StyledFileName>
    </StyledFileLabel>
  );
};

export default File;
