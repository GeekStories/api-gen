import tw from "tailwind-styled-components";
import { useState } from "react";

const StyledMain = tw.div`col-span-2 flex flex-col border-r-2 border-b-2 border-black gap-1 text-center p-1`;
const StyledListTitle = tw.h1`text-lg font-medium underline`;
const StyledInputWrapper = tw.div`grid grid-cols-6 gap-1`;
const StyledInput = tw.input`col-span-5 border-2`;
const StyledAddButton = tw.button`col-span-1 border-2 text-sm`;
const StyledListWrapper = tw.ol`h-full p-1`;
const StyledListItem = tw.li`flex justify-between border-2 p-1 my-1`;
const StyledDeleteButton = tw.button`border-2 px-3`;

const Dependencies = ({ dependencies, UpdateForm }) => {
  const [dependencyInput, setDependencyInput] = useState("");
  const [versionInput, setVersionInput] = useState("");

  const handleAddDependency = () => {
    UpdateForm({
      UPDATE_TYPE: "new_dependency",
      DEPENDENCY_NAME: dependencyInput,
      DEPENDENCY_VERSION: versionInput,
    });

    setDependencyInput("");
  };

  const handleChangeVersion = (e) => {
    const invalidChars = e.target.value.match(/[^0-9.]/gi);
    if (!invalidChars) setVersionInput(e.target.value);
  };

  return (
    <StyledMain>
      <StyledListTitle>Dependencies</StyledListTitle>
      <StyledInputWrapper>
        <StyledInput
          type="text"
          placeholder="axios"
          value={dependencyInput}
          onChange={(e) => setDependencyInput(e.target.value)}
        />
        <StyledInput
          type="text"
          placeholder="2.0.1"
          value={versionInput}
          onChange={handleChangeVersion}
        />
        <StyledAddButton onClick={handleAddDependency}>Add</StyledAddButton>
      </StyledInputWrapper>
      <StyledListWrapper>
        {dependencies.map((dependency) => {
          return (
            <StyledListItem key={dependency.id}>
              {dependency.name}@{dependency.version}
              <StyledDeleteButton
                onClick={() =>
                  UpdateForm({
                    UPDATE_TYPE: "remove_dependency",
                    DEPENDENCY_ID: dependency.id,
                    DEPENDENCY_NAME: dependency.name,
                  })
                }
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
