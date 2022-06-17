import tw from "tailwind-styled-components";

const Container = tw.div`border-2 bg-gray-300 gap-1 fixed top-[5rem] z-10 h-56 overflow-y-scroll w-[20rem] p-1`;
const DependencySearchResult = tw.p`text-lg text-center hover:cursor-pointer hover:underline`;

const SearchResults = ({ handleAddNewDependency, results }) => {
  return (
    <Container data-testid="searchResultBox">
      {results.map((item, index) => (
        <DependencySearchResult
          key={index}
          data-testid={`searchResult${index}`}
          onClick={() =>
            handleAddNewDependency(item.package.name, item.package.version)
          }
        >
          {item.package.name} - {item.package.version}
        </DependencySearchResult>
      ))}
    </Container>
  );
};

export default SearchResults;
