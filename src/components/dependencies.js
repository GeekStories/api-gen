import tw from "tailwind-styled-components";
import { useState } from "react";

const StyledMain = tw.div`
  col-span-2
  flex
  flex-col
  border-r-2
  border-b-2
  border-black
  gap-1
  text-center
  p-1
`;

const StyledListTitle = tw.h1`
  text-lg
  font-medium
  underline
`;

const StyledInputWrapper = tw.div`
  grid
  grid-cols-6
  gap-1
`;

const StyledInput = tw.input`
  col-span-5
  border-2
`;

const StyledAddButton = tw.button`
  col-span-1;
  border-2
  text-sm
`;

const StyledListWrapper = tw.ol`
  h-full
  p-1
`;

const StyledListItem = tw.li`
  flex
  justify-between
  border-2
  p-1
  my-1
`;

const StyledDeleteButton = tw.button`
  border-2
  px-3
`;

const Dependencies = ({
  dependencies,
  handleNewDependency,
  handleRemoveDependency,
}) => {
  const [dependencyInput, setDependencyInput] = useState("");
  return (
    <StyledMain>
      <StyledListTitle>Dependencies</StyledListTitle>
      <StyledInputWrapper>
        <StyledInput
          type="text"
          placeholder="cors"
          value={dependencyInput}
          onChange={(e) => setDependencyInput(e.target.value)}
        />
        <StyledAddButton onClick={() => handleNewDependency(dependencyInput)}>
          Add
        </StyledAddButton>
      </StyledInputWrapper>
      <StyledListWrapper>
        {dependencies.map((dependency) => {
          return (
            <StyledListItem key={dependency.id}>
              {dependency.name}
              <StyledDeleteButton
                onClick={() => handleRemoveDependency(dependency.id)}
              >
                X
              </StyledDeleteButton>
            </StyledListItem>
          );
        })}
      </StyledListWrapper>
    </StyledMain>
  );
};

export default Dependencies;
