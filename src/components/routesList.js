import tw from "tailwind-styled-components";

const StyledMain = tw.div`
  col-span-2
  border-black
  border-2
  p-2
`;

const StyledRoutesTitle = tw.h1`
  text-lg
  text-center
  font-medium
  underline
`;

const StyledRoutesList = tw.div`
  list-none
`;

const StyledRoutesListItem = tw.li`
  text-lg
  font-mono

  &:hover {
    cursor-pointer
  }

  my-2
`;

const RoutesList = () => {
  return (
    <StyledMain>
      <StyledRoutesTitle>Routes</StyledRoutesTitle>
      <StyledRoutesList>
        <StyledRoutesListItem>GET /products</StyledRoutesListItem>
        <StyledRoutesListItem>POST /products</StyledRoutesListItem>
        <StyledRoutesListItem>GET /users</StyledRoutesListItem>
        <StyledRoutesListItem>POST /users</StyledRoutesListItem>
      </StyledRoutesList>
    </StyledMain>
  );
};

export default RoutesList;
