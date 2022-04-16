import tw from "tailwind-styled-components";
import { FaFileCode } from "react-icons/fa";

const StyledFileLabel = tw.div`flex`;
const StyledFileName = tw.p`hover:cursor-pointer text-lg`;

const File = ({ file, setSelectedFile }) => {
  return (
    <StyledFileLabel>
      <FaFileCode />{" "}
      <StyledFileName onClick={() => setSelectedFile(file)}>
        {`${file.name}.${file.ext}`}
      </StyledFileName>
    </StyledFileLabel>
  );
};

export default File;
