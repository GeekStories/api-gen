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
`;

const StyledRoutesListItem = tw.li`
  grid
  grid-cols-5
  my-2
  text-lg
  font-mono
  text-center

  &:hover {
    cursor-pointer
  }
`;

const StyledNewRouteButton = tw.button`
  w-full
  border-2
`;

const StyledRouteMethodLabel = tw.p`col-start-2`;
const StyledRoutePathLabel = tw.p``;

const RoutesList = () => {
  return (
    <StyledMain>
      <StyledRoutesTitle>Routes</StyledRoutesTitle>
      <StyledRoutesList>
        <StyledRoutesListItem>
          <StyledRouteMethodLabel>GET</StyledRouteMethodLabel>
          <StyledRoutePathLabel>/products</StyledRoutePathLabel>
        </StyledRoutesListItem>
        <StyledRoutesListItem>
          <StyledRouteMethodLabel>POST</StyledRouteMethodLabel>
          <StyledRoutePathLabel>/products</StyledRoutePathLabel>
        </StyledRoutesListItem>
        <StyledRoutesListItem>
          <StyledRouteMethodLabel>GET</StyledRouteMethodLabel>
          <StyledRoutePathLabel>/users</StyledRoutePathLabel>
        </StyledRoutesListItem>
        <StyledRoutesListItem>
          <StyledRouteMethodLabel>POST</StyledRouteMethodLabel>
          <StyledRoutePathLabel>/users</StyledRoutePathLabel>
        </StyledRoutesListItem>
      </StyledRoutesList>
      <StyledNewRouteButton>New</StyledNewRouteButton>
    </StyledMain>
  );
};

export default RoutesList;
