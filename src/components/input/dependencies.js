import tw from "tailwind-styled-components";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "../../store/api/dependencies";

const SearchModal = tw.div`${(p) => (p.$state ? "grid" : "hidden")} 
  border-2 bg-gray-300 gap-1 fixed top-[5rem] z-10 h-56 overflow-y-scroll w-[20rem] p-1`;
const Main = tw.div`col-span-2 flex flex-col text-center p-1 border-b-[1px] border-black`;
const DependencySearchResult = tw.p`text-lg text-center hover:cursor-pointer hover:underline`;
const ListTitle = tw.h1`text-lg font-medium underline`;
const InputWrapper = tw.form`flex justify-between p-2`;
const DependencyInput = tw.input`border-b-2 w-full bg-gray-100 rounded-lg border-gray-300 p-2 text-lg focus:outline-none`;
const ListWrapper = tw.ol`h-full flex flex-col gap-1`;
const ListItem = tw.li`flex justify-between border-2 p-1`;
const DependencyLabel = tw.p`text-lg hover:line-through hover:cursor-pointer`;

const Dependencies = () => {
  const dependencies = useSelector((state) => state.dependencies);
  const dispatch = useDispatch();

  const [dependencyInput, setDependencyInput] = useState("");
  const [searchResultsOpen, setSearchResultsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleAddNewDependency = (name, version) => {
    dispatch(
      add({
        name: name,
        version: version,
      })
    );

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
    } catch (error) {console.log(error)}
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
              handleAddNewDependency(item.package.name, item.package.version)
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
            type="search"
            placeholder="axios"
            value={dependencyInput}
            onChange={(e) => handleSearchDependency(e)}
          />
        </InputWrapper>
        <ListWrapper>
          {dependencies.map((dependency) => {
            return (
              <ListItem key={dependency.id}>
                <DependencyLabel
                  onClick={() =>
                    dispatch(
                      remove({
                        name: dependency.name,
                        id: dependency.id,
                      })
                    )
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
