import tw from "tailwind-styled-components";

const StyledQueriesWrapper = tw.div`p-1 h-44`;
const StyledList = tw.ol`p-1 h-20 overflow-y-scroll border-2`;
const StyledListItem = tw.li`grid grid-cols-12 gap-1 border-2 p-1 my-1`;
const StyledOptionLabel = tw.p`font-medium underline underline-offset-1`;
const StyledListItemText = tw.p`col-span-10 font-thin`;
const StyledEditListItem = tw.button`col-span-1 border-2`;
const StyledDeleteListItem = tw.button`col-span-1 border-2`;
const StyledNewItemButton = tw.button`flex mt-1 ml-auto border-2 px-5 py-1`;

const RouteQueriesBox = ({ queries, routeName, handleOpenQueriesModal }) => {
  return (
    <StyledQueriesWrapper>
      <StyledOptionLabel>Queries</StyledOptionLabel>
      <StyledList>
        {queries
          ? queries.map((query) => (
              <StyledListItem key={query.id}>
                <StyledListItemText>
                  {routeName === ""
                    ? `../:${query.name}`
                    : `/${routeName}/:${query.name}`}
                </StyledListItemText>
                <StyledEditListItem>Edit</StyledEditListItem>
                <StyledDeleteListItem>X</StyledDeleteListItem>
              </StyledListItem>
            ))
          : null}
      </StyledList>
      <StyledNewItemButton onClick={handleOpenQueriesModal}>
        New
      </StyledNewItemButton>
    </StyledQueriesWrapper>
  );
};

export default RouteQueriesBox;
