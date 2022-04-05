import tw from "tailwind-styled-components";

const StyledMain = tw.div`
  col-span-2
  border-black
  border-l-2
  border-r-2
  border-b-2
  p-2
`;

const StyledRoutesTitle = tw.h1`
  text-lg
  text-center
  font-medium
  underline
`;

const StyledRoutesList = tw.ol`
  list-none
  h-[24rem]
  overflow-y-scroll
`;

const StyledRoutesListItem = tw.li`
  grid
  grid-cols-6
  text-center
  my-2
  text-lg
  font-mono

  &:hover {
    cursor-pointer
  }
`;

const StyledNewRouteButton = tw.button`
  w-full
  border-2
`;

const StyledRouteMethodLabel = tw.div`col-span-3`;
const StyledRoutePathLabel = tw.div`col-span-3 text-left`;

const RoutesList = ({ routes, handleNewRoute, setSelectedRoute }) => {
  return (
    <StyledMain>
      <StyledRoutesTitle>Routes</StyledRoutesTitle>
      <StyledRoutesList>
        {routes.map((route) => {
          return (
            <StyledRoutesListItem
              key={route.id}
              onClick={() => setSelectedRoute(route)}
            >
              <StyledRouteMethodLabel>{route.method}</StyledRouteMethodLabel>
              <StyledRoutePathLabel>{`/${route.name}`}</StyledRoutePathLabel>
            </StyledRoutesListItem>
          );
        })}
      </StyledRoutesList>
      <StyledNewRouteButton onClick={handleNewRoute}>New</StyledNewRouteButton>
    </StyledMain>
  );
};

export default RoutesList;
