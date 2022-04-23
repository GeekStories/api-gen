import tw from "tailwind-styled-components";
import { useState, useEffect } from "react";

const StyledSearchModal = tw.div`
${(p) => (p.$state ? "grid" : "hidden")}
border-2
bg-gray-300
gap-1
fixed
top-[5rem]
z-10
h-56
overflow-y-scroll
w-[20rem]
p-1`;

const StyledMain = tw.div`col-span-2 flex flex-col border-r-2 border-b-2 border-black text-center p-1`;
const StyledDependencySearchResult = tw.div`border-2 p-1`;
const StyledAddDependencyButton = tw.button`border-2 px-2`;
const StyledListTitle = tw.h1`text-lg font-medium underline`;
const StyledInputWrapper = tw.div`border-2 p-1`;
const StyledInput = tw.input`border-2 p-1 text-lg w-full`;
const StyledClearInputButton = tw.button`fixed top-[2.8rem] left-[15.8rem] z-10 border-2 px-4`;
const StyledListWrapper = tw.ol`h-full p-1`;
const StyledListItem = tw.li`flex justify-between border-2 p-1 my-1`;
const StyledDeleteButton = tw.button`border-2 px-3`;

const Dependencies = ({ dependencies, UpdateForm }) => {
  const [dependencyInput, setDependencyInput] = useState("");
  const [searchResultsOpen, setSearchResultsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleAddDependency = (name, version) => {
    UpdateForm({
      UPDATE_TYPE: "new_dependency",
      DEPENDENCY_NAME: name,
      DEPENDENCY_VERSION: version,
    });

    setDependencyInput("");
  };

  const handleSearchDependency = async (e) => {
    const newValue = e.target.value;
    setDependencyInput(newValue);

    try {
      if (dependencyInput.length < 3) return;

      const response = await fetch(
        `https://registry.npmjs.org/-/v1/search?text=${newValue}`
      );
      const data = await response.json();
      setSearchResults(data.objects);
    } catch (error) {}
  };

  useEffect(() => {
    if (dependencyInput.length > 3 && !searchResultsOpen)
      setSearchResultsOpen(true);
    if (dependencyInput.length === 0 && searchResultsOpen)
      setSearchResultsOpen(false);
  }, [dependencyInput, searchResultsOpen]);

  return (
    <>
      <StyledSearchModal $state={searchResultsOpen}>
        {searchResults.map((item, index) => (
          <StyledDependencySearchResult key={index}>
            {item.package.name} - {item.package.version} |{" "}
            <StyledAddDependencyButton
              onClick={(e) =>
                handleAddDependency(item.package.name, item.package.version)
              }
            >
              Add
            </StyledAddDependencyButton>
          </StyledDependencySearchResult>
        ))}
      </StyledSearchModal>
      <StyledMain>
        <StyledListTitle>Dependencies</StyledListTitle>
        <StyledInputWrapper>
          <StyledInput
            type="text"
            placeholder="axios"
            value={dependencyInput}
            onChange={(e) => handleSearchDependency(e)}
          />
          <StyledClearInputButton onClick={() => setDependencyInput("")}>
            X
          </StyledClearInputButton>
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
    </>
  );
};

export default Dependencies;
