import tw from "tailwind-styled-components";
import { useState, useEffect } from "react";

const SearchModal = tw.div`${(p) => (p.$state ? "grid" : "hidden")} 
  border-2 bg-gray-300 gap-1 fixed top-[5rem] z-10 h-56 overflow-y-scroll w-[20rem] p-1`;
const Main = tw.div`col-span-2 flex flex-col text-center p-1 border-b-[1px] border-black`;
const DependencySearchResult = tw.p`text-lg text-center hover:cursor-pointer hover:underline`;
const ListTitle = tw.h1`text-lg font-medium underline`;
const InputWrapper = tw.div`flex justify-between p-2`;
const DependencyInput = tw.input`border-b-2 w-full bg-gray-100 rounded-bl-lg border-gray-300 p-1 text-lg focus:outline-none`;
const ClearInput = tw.button`text-lg text-gray-400 border-b-2 border-l-transparent border-gray-300 rounded-r-lg bg-gray-100 pr-4 hover:border-l-[1px] active:bg-gray-200 active:text-gray-500`;
const ListWrapper = tw.ol`h-full flex flex-col gap-1`;
const ListItem = tw.li`flex justify-between border-2 p-1`;
const DependencyLabel = tw.p`text-lg hover:line-through hover:cursor-pointer`;

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
      <SearchModal $state={searchResultsOpen}>
        {searchResults.map((item, index) => (
          <DependencySearchResult
            key={index}
            onClick={() =>
              handleAddDependency(item.package.name, item.package.version)
            }
          >
            {item.package.name} - {item.package.version}
          </DependencySearchResult>
        ))}
      </SearchModal>
      <Main>
        <ListTitle>Dependencies</ListTitle>
        <InputWrapper>
          <DependencyInput
            type="text"
            placeholder="axios"
            value={dependencyInput}
            onChange={(e) => handleSearchDependency(e)}
          />
          <ClearInput onClick={() => setDependencyInput("")}>X</ClearInput>
        </InputWrapper>
        <ListWrapper>
          {dependencies.map((dependency) => {
            return (
              <ListItem key={dependency.id}>
                <DependencyLabel
                  onClick={() =>
                    UpdateForm({
                      UPDATE_TYPE: "remove_dependency",
                      DEPENDENCY_ID: dependency.id,
                      DEPENDENCY_NAME: dependency.name,
                    })
                  }
                >
                  {dependency.name}@{dependency.version}
                </DependencyLabel>
              </ListItem>
            );
          })}
        </ListWrapper>
      </Main>
    </>
  );
};

export default Dependencies;
