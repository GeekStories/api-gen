import tw from "tailwind-styled-components";
import RouteItem from "./routeItem";

const StyledMain = tw.div`col-span-2 border-black border-l-2 border-r-2 border-b-2 p-2`;
const StyledRoutesTitle = tw.h1`text-lg text-center font-medium underline`;
const StyledRoutesList = tw.ol`list-none border-2 p-1 h-[24rem] overflow-y-scroll`;
const StyledNewRouteButton = tw.button`my-1 w-full border-2`;

const RoutesList = ({
  routes,
  UpdateForm,
  handleSelectRoute,
  handleSelectMethod,
}) => {
  return (
    <StyledMain>
      <StyledRoutesTitle>Routes</StyledRoutesTitle>
      <StyledRoutesList>
        {routes.map((route) => {
          return (
            <RouteItem
              key={route.id}
              route={route}
              UpdateForm={UpdateForm}
              handleSelectRoute={handleSelectRoute}
              handleSelectMethod={handleSelectMethod}
            />
          );
        })}
      </StyledRoutesList>
      <StyledNewRouteButton
        onClick={() => UpdateForm({ UPDATE_TYPE: "new_route" })}
      >
        New Route
      </StyledNewRouteButton>
    </StyledMain>
  );
};

export default RoutesList;
