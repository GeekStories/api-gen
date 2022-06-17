import tw from "tailwind-styled-components";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { add, remove } from "../../store/api/dependencies";
import SearchPackage from "../../utils/searchPackage";
import SearchResults from "./searchResults";

const Main = tw.div`col-span-2 flex flex-col text-center p-1 border-b-[1px] border-black`;
const ListTitle = tw.h1`text-lg font-medium underline`;
const InputWrapper = tw.form`flex justify-between p-2`;
const DependencyInput = tw.input`border-b-2 w-full bg-gray-100 rounded-lg border-gray-300 p-2 text-lg focus:outline-none`;
const ListWrapper = tw.ol`h-full flex flex-col gap-1`;
const ListItem = tw.li`flex justify-between border-2 p-1`;
const DependencyLabel = tw.p`text-lg hover:line-through hover:cursor-pointer`;

const Dependencies = ({ dependencies }) => {
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
    setSearchResults([]);
  };

  const handleSearchDependency = async (e) => {
    const newValue = e.target.value;
    setDependencyInput(newValue);
    if (dependencyInput.length < 3) return;

    const results = await SearchPackage(newValue);
    setSearchResults(results);
  };

  useEffect(() => {
    if (dependencyInput.length > 3 && !searchResultsOpen) {
      setSearchResultsOpen(true);
    }
    if (dependencyInput.length === 0 && searchResultsOpen) {
      setSearchResults([]);
      setSearchResultsOpen(false);
    }
  }, [dependencyInput, searchResultsOpen]);

  return (
    <>
      {searchResults.length > 0 && (
        <SearchResults
          handleAddNewDependency={handleAddNewDependency}
          results={searchResults}
        />
      )}

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
                  data-testid="dependenciesListItem"
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
